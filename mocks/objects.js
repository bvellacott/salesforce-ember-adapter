//Copyright (c) 2015 Benjamin Vellacott
//
//Permission is hereby granted, free of charge, to any person obtaining a copy of
//this software and associated documentation files (the "Software"), to deal in
//the Software without restriction, including without limitation the rights to
//use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
//of the Software, and to permit persons to whom the Software is furnished to do
//so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in all
//copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//SOFTWARE.

// This file contains mocks to test ForceAdapter.js

// A mock of the ember Snapshot object 
var Snapshot = function(instance) {
	this._model = instance._model;
	this._instance = instance;
	this.id = instance.id;
	this.eachAttribute = function(cb) { return this._model.eachAttribute(cb); };
	this.eachRelationship = function (cb) { return this._model.eachRelationship(cb); }
	this.attr = function(name) { return this._instance[name]; };
	this.belongsTo = function(name, opts) {
		return (opts.id ? this._instance[name].id : new Snapshot(this._instance[name]));
	};
};

// A mock of part of the salesforce soap api including stripped down javascript mock of
// a database with query parsing
var sforce = {
	// Normalises a json string to a valid deserialisable json string
	normalise : function(val) {
		var trimmed = val.trim();
		if(trimmed.indexOf("'") === 0 && trimmed.lastIndexOf("'") === (trimmed.length - 1))
			return '"' + trimmed.substring(1, trimmed.length - 1) + '"';
		return val;
	},
	// A mock of the salesforce SObject object
	SObject : function(typeName, obj) {
		this.type = typeName;
		if(typeof obj !== 'undefined')
			for(var key in obj) 
				this[key] = obj[key];
	},
	// A stripped down mock of the salesforce soap api database
	connection : {
		create : function(objAry, cbSuccess, cbErr) {
			return sforce.db.create(objAry, cbSuccess, cbErr);
		},
		query : function(q, cbSuccess, cbErr) {
			return sforce.db.query(q, cbSuccess, cbErr);
		},
		deleteIds : function(idAry, cbSuccess, cbErr) {
			return sforce.db.del(idAry, cbSuccess, cbErr);
		},
		update : function(objAry, cbSuccess, cbErr) {
			return sforce.db.update(objAry, cbSuccess, cbErr);
		},
	},
	// The underying javascript database used to mock the salesforce db
	db : {
		// faking a salesforce id
		_idTemplate : 'abc000000000000000',
		id : 0,
		// The schema to work against - the database won't work without this being set.
		// See the file schemas.js
		schema : {},
		// The store for created/modified SObjects
		sobjects : {},
		// Clear the database - used in testing
		clear : function() { sforce.db.sobjects = {}; },
		// Set this to true if you wan't do decide the id's to use instead of generating them.
		// This is handy for testing.
		useGivenIds : false,
		// Generates a new fake salesforce id
		newId : function() {
			var idStr = '' + sforce.db.id++;
			return sforce.db._idTemplate.substring(0, 18 - idStr.length) + idStr;
		},
		// Returns an antlr4 parse tree for a select query string
		getParseTree : function(select) {
			var chars = new antlr4.InputStream(input);
			var lexer = new antlr4.SelectLexer(chars);
			var tokens  = new antlr4.CommonTokenStream(lexer);
			var parser = new antlr4.SelectParser(tokens);
			parser.buildParseTrees = true;
			return parser.select();
		},
		// Validates a given objects against the schema
		validateSobject : function(obj) {
			var schema = sforce.db.schema;
			var objDesc = schema[obj.type];
			if(typeof objDesc === 'undefined')
				throw 'No type exists by the name: ' + obj.type;
			for(var key in obj) {
				if({ Id:false, type:true }[key])
					continue;
				var fieldDesc = null;
				for(var i = 0; i < objDesc.fields.length; i++) {
					var fd = objDesc.fields[i];
					if(fd.name === key) {
						fieldDesc = fd;
						break;
					}
				}
				if(fieldDesc == null)
					throw 'No field exists by the name: ' + key + 'in the type: ' + obj.type;
			}
		},
		// Validates a list of field names against a type in the schema
		validateFields : function(type, fields) {
			for(var i = 0; i < fields.length; i++)
				sforce.db.validateField(type, fields[i]);
		},
		// Validates a field name against a type in the schema
		validateField : function(type, field) {
			var objDesc = sforce.db.schema[type];
			for(var i = 0; i < objDesc.fields.length; i++)
				if(objDesc.fields[i].name === field)
					return;
			throw 'No field exists by the name: ' + field + 'in the type: ' + type;
		},
		// Validates a relationship name against a type in the schema
		validateRelationship : function(type, rel) {
			var objDesc = sforce.db.schema[type];
			for(var i = 0; i < objDesc.childRelationships.length; i++)
				if(objDesc.childRelationships[i].relationshipName === rel)
					return;
			throw 'No child relationship exists by the name: ' + rel + 'in the type: ' + type;
		},
		// Get all SObjects of the given type
		getSobjects : function(type) {
			var sos = sforce.db.sobjects;
			if(typeof sos[type] !== 'object')
				sos[type] = {};
			return sos[type];
		},
		// Create the objects in the array in the database and call success(...) or err(...)
		// on success/failure
		create : function(objAry, success, err) {
			var result = [];
			for(var i = 0; i < objAry.length; i++) {
				var obj = objAry[i];
				try {
					sforce.db.validateSobject(obj);
					obj = $.extend({}, obj);
					var objs = sforce.db.getSobjects(obj.type);
					obj.Id = ((!sforce.db.useGivenIds || typeof obj.Id === 'undefined') ? sforce.db.newId() : obj.Id);
					objs[obj.Id] = obj;
					result.push({success : 'true', id : obj.Id});
				} catch(e) {
					result.push({success : 'false', id : obj.Id});
				}
			}
			if(success) 
				success(result);
			return result;
		},
		// Update all objects in the given array and call success(...) or err(...)
		// on success/failure
		update : function(objAry, success, err) {
			var result = [];
			for(var i = 0; i < objAry.length; i++) {
				var obj = objAry[i];
				var Id = obj.Id;
				var existingObj = sforce.db.getSobjects(obj.type)[Id];
				if(!existingObj) {
					result.push({success : 'false', id : Id});
					continue;
				}
				try {
					obj = $.extend({}, existingObj, obj);
					sforce.db.validateSobject(obj);
					sforce.db.getSobjects(obj.type)[Id] = obj;
					result.push({success : 'true', id : obj.Id});
				} catch(e) {
					result.push({success : 'false', id : obj.Id});
				}
			}
			if(success) 
				success(result);
			return result;
		},
		// Delete all objects with thi id's in the id array and call success(...) or err(...)
		// on success/failure
		del : function(idAry, success, err) {
			var result = [];
			for(var i = 0; i < idAry.length; i++) {
				var found = false;
				var Id = idAry[i];
				for(var type in this.schema) {
					var allOfType = sforce.db.getSobjects(type);
					if(Id in allOfType) {
						delete allOfType[Id];
						found = true;
						result.push({success : 'true', id : Id});
						break;
					}
				}
				if(!found)
					result.push({success : 'false', id : Id});
			}
			if(success) 
				success(result);
			return result;
		},
		// Run a select query on the database and call success(...) or err(...)
		// on success/failure
		query : function(select, success, err) {
			try {
				var chars = new antlr4.InputStream(select);
				var lexer = new antlr4.SelectLexer(chars);
				var tokens  = new antlr4.CommonTokenStream(lexer);
				var parser = new antlr4.SelectParser(tokens);
				parser.buildParseTrees = true;
				var tree = parser.select();
				console.log(tree.toStringTree());
				var listener = new QueryBuilderListener(sforce.db);
				antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);
				var result = listener.query.getResult();
				if(success) 
					success(result);
				return result;
			} catch(e) {
				if(err) 
					err(e);
				return e;
			}
		},
		// Creates a wrapped result in the form that you would expect the salesforce soap
		// api to return a result
		wrapResult : function(resultAry, isRoot) {
			if(resultAry.length == 0) {
				if(isRoot)
					return {
						done : 'true',
						queryLocator : null,
						size : 0,
					};
				return null;
			}
			var records = null;
			if(resultAry.length == 1)
				records = resultAry[0];
			else
				records = resultAry;
			return {
				done : 'true',
				queryLocator : null,
				records : records,
				size : resultAry.length,
			};
		},
	},
};

// The SObjectQuery object which is produced as a result of parsing a select query string
// takes a db object as a constructor paramater. Objects are queried from the given db
// object
var SobjectQuery = function(db) {
	this.db = db;
	this.fields = [];
	this.subqueries = [];
};
SobjectQuery.prototype = {
	// A query building method to mark a field to be queried
	addField : function(field) { this.fields.push(field); },
	// A query building method query on a child relationship
	addSubquery : function(subquery){ 
		this.subqueries.push(subquery);
		subquery.setParentQuery(this);
	},
	// A query building method to set the object type to be queried
	setType : function(type) { this.type = type; },
	// A query building method to set the query condition defined in the where clause
	setCondition : function(cond) { this.condition = cond; },
	// A mothod to create a result object out of a resolved object in the db
	_createResultObj : function(obj) {
		var result = {type : this.type};
		this.db.validateFields(this.type, this.fields);
		for(var i = 0; i < this.fields.length; i++) {
			var fName = this.fields[i];
			result[fName] = obj[fName];
		}
		for(var i = 0; i < this.subqueries.length; i++) {
			var sq = this.subqueries[i];
			result[sq.relationship] = sq.getResult(obj);
		}
		return result
	},
	// Runs the query against the db
	getResult : function() {
		var all = this.db.getSobjects(this.type);
		var result = [];
		for(var Id in all) {
			var obj = all[Id];
			if(!this.condition || this.condition.matches(obj))
				result.push(this._createResultObj(obj));
		}
		return this.db.wrapResult(result, true);
	},
};

//The SobjectSubquery object which is produced as a result of parsing a child relationship 
// select query string takes a db object as a constructor paramater. 
// Objects are queried from the given db
var SobjectSubquery = function() {
	this.fields = [];
};
SobjectSubquery.prototype = {
	// A query building method to mark a field to be queried
	addField : function(field) { this.fields.push(field); },
	// A query building method to set the parent SobjectQuery
	setParentQuery : function(parent) { this.parent = parent; },
	// A method to retrieve the underlying db object
	getDb : function() { return this.parent.db; },
	// A method to retrieve the type queried
	getType : function() { return this.parent.type; },
	// A query building method to set the childrelationship name
	setRelationship : function(rel) { this.relationship = rel; },
	// A query building method to set the query condition defined in the where clause
	setCondition : function(cond) { this.condition = cond; },
	// A mothod to create a result object out of a resolved object in the db
	_createResultObj : function(obj) {
		var result = {type : obj.type};
		this.getDb().validateFields(obj.type, this.fields);
		for(var i = 0; i < this.fields.length; i++) {
			var fName = this.fields[i];
			result[fName] = obj[fName];
		}
		return result
	},
	// Runs the query against the db
	getResult : function(parentObj) {
		this.getDb().validateRelationship(this.getType(), this.relationship)
		var objDesc = this.getDb().schema[this.getType()];
		var relDesc = null;
		for(var i = 0; i < objDesc.childRelationships.length; i++)
			if(this.relationship === objDesc.childRelationships[i].relationshipName)
				relDesc = objDesc.childRelationships[i];
		if(relDesc == null)
			throw 'No child relationship by the name: ' + this.relationship + ' exists in the type: ' + this.getType();
		var relObjDesc = this.getDb().schema[relDesc.childSObject];

		var all = this.getDb().getSobjects(relDesc.childSObject);
		var result = [];
		for(var key in all) {
			var obj = all[key];
			if(obj[relDesc.field] === parentObj.Id && (!this.condition || this.condition.matches(obj)))
				result.push(this._createResultObj(obj));
		}
		return this.getDb().wrapResult(result);
	},
};

// The conditionset object used to hold a set of conditions and return the boolean result
// of running a collection of conditions and condition sets separated by and/or clauses.
var SobjectConditionSet = function() {
	this.sequence = [];
	this.parent = null;
};
SobjectConditionSet.prototype = {
	// Answers the question, does this condition set have a parent condition set
	hasParent : function() { return this.parent !== null },
	// A condition set building method to set the parent condition set
	setParent : function(conditionSet) { this.parent = conditionSet; },
	// Retrieve the parent condition set
	getParent : function() { return this.parent; },
	// A condition building method to add a condition to the sequence of this condition set
	condition : function(condition) { this.sequence.push(condition); },
	// A condition building method to add an and clause to the sequence of this condition set
	and : function() { this.sequence.push('&'); },
	// A condition building method to add an or clause to the sequence of this condition set
	or : function() { this.sequence.push('|'); },
	// Runs the conditions in the condition set and returns a boolean as a result
	matches : function(obj) {
		var matches = this.sequence[0].matches(obj);
		for(var i = 1; i < this.sequence.length; i += 2) {
			if(this.sequence[i] === '&')
				matches = matches && this.sequence[i+1].matches(obj);
			else
				matches = matches || this.sequence[i+1].matches(obj);
		}
		return matches;
	},
};

// The SobjectCondition object which has two terms separated by an operator
var SobjectCondition = function() {};
SobjectCondition.prototype = {
	// Set the first term to be a field : is passed a field name string
	setFirstField : function(field) { 
		this.firstType = 'f'; 
		this.firstValue = field; 
	},
	// Set the first term to be a constant : is passed any javascript constant
	setFirstConstant : function(constant) { 
		this.firstType = 'c'; 
		this.firstValue = constant; 
	},
	// Set the second term to be a field : is passed a field name string
	setSecondField : function(field) { 
		this.secondType = 'f'; 
		this.secondValue = field; 
	},
	// Set the second term to be a constant : is passed any javascript constant
	setSecondConstant : function(constant) { 
		this.secondType = 'c'; 
		this.secondValue = constant; 
	},
	// Retrieve first term value - if it is a constant the constant is returned. 
	// If it is a field the value of the field is returned from the passed object
	getFirstValue : function(obj) {
		if(this.firstType === 'c')
			return this.firstValue;
		else
			return obj[this.firstValue];
	},
	// Retrieve second term value - if it is a constant the constant is returned. 
	// If it is a field the value of the field is returned from the passed object
	getSecondValue : function(obj) {
		if(this.secondType === 'c')
			return this.secondValue;
		else
			return obj[this.secondValue];
	},
};

// The equals condition object which extends the SobjectCondition object
var SobjectEqCond = function(){};
SobjectEqCond.prototype = $.extend(new SobjectCondition, {
	// Runs an equals (===) check between the two terms
	matches : function(obj) {
		return this.getFirstValue(obj) === this.getSecondValue(obj);
	},
});

var SobjectLTCond = function(){};
SobjectLTCond.prototype = $.extend(new SobjectCondition, {
	// Runs an less than (<) check between the two terms
	matches : function(obj) {
		return this.getFirstValue(obj) < this.getSecondValue(obj);
	},
});

var SobjectLECond = function(){};
SobjectLECond.prototype = $.extend(new SobjectCondition, {
	// Runs an less than or equal (<=) check between the two terms
	matches : function(obj) {
		return this.getFirstValue(obj) <= this.getSecondValue(obj);
	},
});

var SobjectGTCond = function(){};
SobjectGTCond.prototype = $.extend(new SobjectCondition, {
	// Runs an greated than (>) check between the two terms
	matches : function(obj) {
		return this.getFirstValue(obj) > this.getSecondValue(obj);
	},
});

var SobjectGECond = function(){};
SobjectGECond.prototype = $.extend(new SobjectCondition, {
	// Runs an greater than or equal (>=) check between the two terms
	matches : function(obj) {
		return this.getFirstValue(obj) >= this.getSecondValue(obj);
	},
});

var SobjectInCond = function(){};
SobjectInCond.prototype = $.extend(new SobjectCondition, {
	// Runs an in (indexOf >= 0) check between the two terms where the second term
	// must be a list of constants
	matches : function(obj) {
		return this.getSecondValue(obj).indexOf(this.getFirstValue(obj)) >= 0;
	},
});

// The QueryBuilderListener parse tree listener used to walk the select parse tree
// and build a SobjectQuery object
var QueryBuilderListener = function(db) {
	this.db = db;
	this.path = [];
};
QueryBuilderListener.prototype = new antlr4.SelectListener();
QueryBuilderListener.prototype.enterSelect = function(ctx) {
	this.path.push('select');
	this.query = new SobjectQuery(this.db);
};
QueryBuilderListener.prototype.exitSelect = function(ctx) {
	this.path.pop();
};
QueryBuilderListener.prototype.enterSubselect = function(ctx) {
	this.path.push('subselect');
	this.subquery = new SobjectSubquery();
	this.query.addSubquery(this.subquery);
};
QueryBuilderListener.prototype.exitSubselect = function(ctx) {
	this.subquery = null;
	this.path.pop();
};
QueryBuilderListener.prototype.enterFrom = function(ctx) {
	var section = this.path[this.path.length - 1];
	if(section === 'select')
		this.query.setType(ctx.FIELD().getText());
	else if(section === 'subselect')
		this.subquery.setRelationship(ctx.FIELD().getText());
};
QueryBuilderListener.prototype.enterFields = function(ctx) {
	var section = this.path[this.path.length - 1];
	var field = ctx.FIELD();
	if(field) {
		if(section === 'select')
			this.query.addField(field.getText());
		else if(section === 'subselect')
			this.subquery.addField(field.getText());
	}
};
QueryBuilderListener.prototype.enterConditionset = function(ctx) {
	this.path.push('conditionset');
	var newConditionSet = new SobjectConditionSet();
	if(this.curConditionSet) {
		newConditionSet.setParent(newConditionSet);
		this.curConditionSet.condition(newConditionSet);
	}
	else
		this.query.setCondition(newConditionSet);
	this.curConditionSet = newConditionSet;
};
QueryBuilderListener.prototype.exitConditionset = function(ctx) {
	if(this.curConditionSet.hasParent())
		this.curConditionSet = this.curConditionSet.getParent();
	this.path.pop();
};
QueryBuilderListener.prototype.enterCondition = function(ctx) {
	var op = ctx.children[1].symbol;
	var condition = null;
	if(op.type === 	antlr4.SelectParser.ARRAYOPERATOR) {
		switch(op.text) {
		case 'in':
		default:
			condition = new SobjectInCond();
		}
		var first = ctx.children[0].symbol;
		var second = ctx.children[2];
		if(first.type === antlr4.SelectParser.FIELD)
			condition.setFirstField(first.text);
		else
			throw 'Only fields are supported as the first term to an array operator';
		if(second instanceof antlr4.SelectParser.ArrayconstantContext) {
			var constant = [];
			for(var i = 0; i < second.getChildCount(); i++) {
				var child = second.getChild(i).symbol;
				if(child.type === antlr4.SelectParser.CONSTANT)
					constant.push(JSON.parse(sforce.normalise(child.text)));
			}
			condition.setSecondConstant(constant);
		}
		else
			throw 'Only array constants are supported as the second term to an array operator';
		this.curConditionSet.condition(condition);
	}
	else if(op.type === antlr4.SelectParser.OPERATOR){
		switch(op.text) {
		case '<': 
			condition = new SobjectLTCond();
			break;
		case '<=': 
			condition = new SobjectLECond();
			break;
		case '>': 
			condition = new SobjectGTCond();
			break;
		case '>=': 
			condition = new SobjectGECond();
			break;
		case '=':
		default:
			condition = new SobjectEqCond();
		}
		var first = ctx.children[0].symbol;
		var second = ctx.children[2].symbol;
		if(first.type === antlr4.SelectParser.FIELD)
			condition.setFirstField(first.text);
		else
			condition.setFirstConstant(JSON.parse(sforce.normalise(first.text)));
		if(second.type === antlr4.SelectParser.FIELD)
			condition.setSecondField(second.text);
		else
			condition.setSecondConstant(JSON.parse(sforce.normalise(second.text)));
		this.curConditionSet.condition(condition);
	}
	else
		throw 'Failed to resolve the operator type';
};
QueryBuilderListener.prototype.enterAnd = function(ctx) {
	this.curConditionSet.and()
};
QueryBuilderListener.prototype.enterOr = function(ctx) {
	this.curConditionSet.or()
};
QueryBuilderListener.prototype.enterArrayconstant = function(ctx) {
	console.log(ctx);
};
QueryBuilderListener.prototype.exitArrayconstant = function(ctx) {
	console.log(ctx);
};

// A mock Ember store object, used to run the ForceAdapter specific tests and retrieve some
// of the results
var Store = function() {};
Store.prototype = {
	pushPayload : function(type, payload) {
		this.type = type;
		this.payload = payload;
	},
};
