//Copyright (c) 2015 Benjamin Vellacott and ForceAdapter.js contributors
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

// Dependecy checks
if(!$)
	throw 'jQuery version 1.11.3 is required';
if(!Ember)
	throw 'Ember version 1.11.1 is required';
if(!Ember)
	throw 'Ember data version 1.13.4 is required';
if(!Papu)
	var Papu = {};
Papu.SF = {
	// Constants and methods for salesforce custom entity ending handling and conversions
	_sfRelExt : '__r',
	_sfNameExt : '__c',
	_emRelExt : 'rrr',
	_emNameExt : 'ccc',
	endsWith : function(str, ending) { return str.indexOf(ending, str.length - ending.length) > -1; },
	hasCustomSfRelationExtension : function(name) { return Papu.SF.endsWith(name, Papu.SF._sfRelExt); },
	hasCustomSfNameExtension : function(name) { return Papu.SF.endsWith(name, Papu.SF._sfNameExt); },
	hasCustomEmberRelationExtension : function(name) { return Papu.SF.endsWith(name, Papu.SF._emRelExt); },
	hasCustomEmberNameExtension : function(name) { return Papu.SF.endsWith(name, Papu.SF._emNameExt); },
	emberiseExtension : function(sfName) {
		if(Papu.SF.hasCustomSfNameExtension(sfName))
			return sfName.substring(0, sfName.length - Papu.SF._sfNameExt.length) + Papu.SF._emNameExt;
		else if(Papu.SF.hasCustomSfRelationExtension(sfName))
			return sfName.substring(0, sfName.length - Papu.SF._sfRelExt.length) + Papu.SF._emRelExt;
		return sfName;
	},
	sfriseExtension : function(emName) {
		if(Papu.SF.hasCustomEmberNameExtension(emName))
			return emName.substring(0, emName.length - Papu.SF._emNameExt.length) + Papu.SF._sfNameExt;
		else if(Papu.SF.hasCustomEmberRelationExtension(emName))
			return emName.substring(0, emName.length - Papu.SF._emRelExt.length) + Papu.SF._sfRelExt;
		return emName;
	},
	emberiseRefs : function(refs) {
		if(typeof refs === 'string') return Papu.SF.emberiseExtension(refs);
		else if($.isArray(refs)) {
			var emberRefs = [];
			for(var i = 0; i < refs.length; i++)
				emberRefs.push(Papu.SF.emberiseExtension(refs[i]));
			return emberRefs;
		}
		else
			return null;
	},
	sfriseRefs : function(refs) {
		if(typeof refs === 'string') return Papu.SF.sfriseExtension(refs);
		else if($.isArray(refs)) {
			var sfRefs = [];
			for(var i = 0; i < refs.length; i++)
				sfRefs.push(Papu.SF.sfriseExtension(refs[i]));
			return sfRefs;
		}
		else
			return null;
	},
	// A type map to convert javascript datatypes used by salesforce to datatypes used in ember
	// see : https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/field_types.htm
	sforceToEmberTypeMap : {
		id : 'string',
		boolean : 'boolean',
		string : 'string',
		datetime : 'date',
		currency : 'number',
		date : 'date',
		email : 'string',
		int : 'number',
		double : 'number',
		percent : 'number',
		location : 'string',
		phone : 'string',
		picklist : 'string',
		multipicklist : 'string',
		textarea : 'string',
		encryptedstring : 'string',
		url : 'string',
		address : 'string',
		calculated : 'string',
		combobox : 'string',
		datacategorygroupreference : 'string',
		encryptedstring : 'string',
		junctionidlist : 'string',
		masterrecord : 'string',
	},
	// One of the main methods. Used to read the salesforce schema using the sObjectReader and create
	// matching ember models. Pass in a typeFilter function to limit the models created.
	// For example if you only want to create a model for a salesforce Account sobject:
	//
	// typeFilter = function(obj) { return obj.name === 'Account'; }. If the typeFilter isn't used 
    // all the salesforce object definitions are converted into ember models.
	createModelsForSObjects : function(emberApp, sObjectMetaMap, sObjectReader, typeFilter) {
		var modelExtensionMap = Papu.SF.createEmberModelDefinitions(sObjectMetaMap, sObjectReader, typeFilter);
		Papu.SF.createModelsFromExtensionMap(emberApp, modelExtensionMap);
	},
	// One of the main methods. Used to create the ember models from ember model definitions in a js object.
	// Use createEmberModelDefinitions to create the ember model definitions.
	createModelsFromExtensionMap : function(emberApp, modelExtensionMap) {
		var evaluatedMap = {};
		for(var sObjectName in modelExtensionMap) {
			var model = modelExtensionMap[sObjectName];
			evaluatedModel = {};
			for(var key in model) {
				if(typeof model[key] === 'string')
					evaluatedModel[key] = eval(model[key]);
				else
					evaluatedModel[key] = model[key];
			}
			var eon = Papu.SF.emberiseExtension(sObjectName);
			emberApp[eon] = DS.Model.extend(evaluatedModel);
		}
	},
	// One of the main methods. Used to read the salesforce schema using the sObjectReader and create
	// matching ember model definitions into a js object. See createModelsForSObjects method for the typeFilter
	// definition. If the typeFilter isn't used all the salesforce object definitions are converted into ember 
	// models.
	//
	// Use this method to create a static definition of the objects you use in your app so that you don't have
	// to dynamically recreate it every time, which is slow, requires the use of a callback and prevents
	// proper route handling when you land on the page/initialise the app.
	createEmberModelDefinitions : function(sObjectMetaMap, sObjectReader, typeFilter) {
		var modelExtensionMap = {};
		var cache = new Papu.SF.factory.Cache();
		
		for(var sObjectName in sObjectMetaMap) {
			if(typeFilter && !typeFilter(sObjectMetaMap[sObjectName]))
				continue;
			Papu.SF.recordInverses(sObjectName, sObjectReader, cache, typeFilter);
		}
		
		for(var sObjectName in sObjectMetaMap) {
			if(typeFilter && !typeFilter(sObjectMetaMap[sObjectName]))
				continue;
			var modelExtension = {};
			modelExtensionMap[sObjectName] = modelExtension;
			Papu.SF.createFieldModelForSObject(modelExtension, sObjectName, sObjectReader, cache, typeFilter);
		}
		
		for(var sObjectName in sObjectMetaMap) {
			if(typeFilter && !typeFilter(sObjectMetaMap[sObjectName]))
				continue;
			var modelExtension = modelExtensionMap[sObjectName];
			Papu.SF.createRelationshipModelForSObject(modelExtension, sObjectName, sObjectReader, cache, typeFilter);
		}
		return modelExtensionMap;
	},
	// The first stage of creating the ember model definitions. The model definition creation needs to be divided
	// into three phases due so that the relationships between objects can be properly defined.
	// I.e. first the inverses between relationships then the field definitions and then the relationship definitions 
	// which need the field definitions.
	//
	// See createModelsForSObjects method for the typeFilter definition. If the typeFilter isn't used all the 
	// salesforce object definitions are converted into ember models.
	recordInverses : function(sObjectName, sObjectReader, cache, typeFilter) {
		var relVisitor = { 
			visit : function(rel, object, path, reader){
				if(typeof rel.relationshipName === 'undefined' || typeof rel.childSObject === 'undefined' || cache.isReferencedByMultitypedReference(rel))
					return;
				if(typeFilter && !typeFilter(sObjectReader.completeMetas[rel.childSObject]))
					return;
				cache.logInverses(sObjectName, rel.relationshipName, rel.field)
			}
		};
		
		var obj = sObjectReader.completeMetas[sObjectName];
		sObjectReader.shallowReadMetaChildRelationshipsAbr(obj, relVisitor);
	},
	// The second stage of creating the ember model definitions. The model definition creation needs to be divided
	// into three phases due so that the relationships between objects can be properly defined.
	// I.e. first the inverses between relationships then the field definitions and then the relationship definitions 
	// which need the field definitions.
	//
	// See createModelsForSObjects method for the typeFilter definition. If the typeFilter isn't used all the 
	// salesforce object definitions are converted into ember models.
	createFieldModelForSObject : function(modelExtension, sObjectName, sObjectReader, cache, typeFilter) {
		var fieldVisitor = { 
			visit : function(field, object, path, reader){
				var fn = field.name;
				var updateable = (field.updateable === 'true');
				if(!updateable)
					cache.logNonUpdateableField(sObjectName, fn)
				if(field.type === 'reference') {
					if(typeof field.referenceTo === 'string') {
						var erefs = field.referenceTo;
						if(typeFilter && !typeFilter(sObjectReader.completeMetas[erefs])) {
							modelExtension[fn] = "DS.attr('string', {updateable : " + updateable + "})";
							return;
						}
						if(field.custom == 'true')
							erefs = Papu.SF.emberiseExtension(erefs);
						var inverse = cache.getInverse(sObjectName, fn);
						if(inverse != null)
							modelExtension[fn] = "DS.belongsTo('" + erefs + "', { async : true, updateable : " + updateable + ", inverse : '" + inverse + "' })";
						else
							modelExtension[fn] = "DS.belongsTo('" + erefs + "', { async : true, updateable : " + updateable + ", inverse : null })";
					}
					else if($.isArray(field.referenceTo)){
						cache.logMultitypedReferenceField(sObjectName, fn)
						modelExtension[fn] = "DS.attr('string', { multiRef : true, updateable : " + updateable + " })";
					}
					else {
						//cache.logMultitypedReferenceField(sObjectName, fn)
						modelExtension[fn] = "DS.attr('string', {updateable : " + updateable + "})";
					}
				}
				else if(fn !== 'Id')
					modelExtension[fn] = "DS.attr('" + Papu.SF.sforceToEmberTypeMap[field.type] + "', {updateable : " + updateable + "})";
				console.log(sObjectReader.completeMetas.length + ' : field : ' + fn);
			}
		};
		
		var obj = sObjectReader.completeMetas[sObjectName];
		sObjectReader.shallowReadMetaFieldsAbr(obj, fieldVisitor);
	},
	// The thire stage of creating the ember model definitions. The model definition creation needs to be divided
	// into three phases due so that the relationships between objects can be properly defined.
	// I.e. first the inverses between relationships then the field definitions and then the relationship definitions 
	// which need the field definitions.
	//
	// See createModelsForSObjects method for the typeFilter definition. If the typeFilter isn't used all the 
	// salesforce object definitions are converted into ember models.
	createRelationshipModelForSObject : function(modelExtension, sObjectName, sObjectReader, cache, typeFilter) {
		var relVisitor = { 
				visit : function(rel, object, path, reader){
					if(typeof rel.relationshipName === 'undefined' || typeof rel.childSObject === 'undefined' || cache.isReferencedByMultitypedReference(rel))
						return;
					if(typeFilter && !typeFilter(sObjectReader.completeMetas[rel.childSObject]))
						return;
					var rn = rel.relationshipName;
					var econ = Papu.SF.emberiseExtension(rel.childSObject);
					modelExtension[rn] = "DS.hasMany('" + econ + "', { async : true, inverse : '" + rel.field + "', })";
					console.log('child rel : ' + rn);
				}
			};
		
		var obj = sObjectReader.completeMetas[sObjectName];
		sObjectReader.shallowReadMetaChildRelationshipsAbr(obj, relVisitor);
	},
	// This method creates a soql select statement string to query an object with its fields and relationships
	// using the salesforce soap api - i.e- sforce.connection.query
	createSoqlSelect : function(type, name, whereClause, childSelectCreator){
		var q = 'select Id';
		type.eachAttribute(function(name, meta) {
			q += ', ' + name;
		});
		type.eachRelationship(function(name, descriptor) {
			q += ', ';
			if(descriptor.kind === 'hasMany')
				q += '(' + childSelectCreator(descriptor.type, descriptor.key) + ')';
			else
				q += descriptor.key;
		});
		q += ' from ' + name;
		if(!(typeof whereClause === 'undefined'))
			q += ' where ' + whereClause;
		return q;
	},
	// This method is part of creating a soql select statement. It handles the root select statement generation, 
	// not the child relationship statement generation
	createRootSoqlSelect : function(type, name, whereClause){
		return Papu.SF.createSoqlSelect(type, name, whereClause, Papu.SF.createIdSoqlSelect)
	},
	// Child relationships are passed to ember as a list of ids in the payload. This method is for child
	// relationship select statement generation.
	createIdSoqlSelect : function(type, name, whereClause){
		var q = 'select Id from ' + name;
		if(!(typeof whereClause === 'undefined'))
			q += ' where ' + whereClause;
		return q;
	},
	// In a soql select statement an array doesn't look like a serialised javascript array. This method 
	// handles the conversion.
	//
	// [1,2,"hello world"] -> (1,2,"hello world")
	toSoqlArray : function(array) {
		var soqlAry = "(";
		for(var i = 0; i < array.length; i++) {
			if(i > 0)
				soqlAry += ",'";
			else
				soqlAry += "'";
			soqlAry += array[i] + "'";
		}
		soqlAry += ")";
		return soqlAry;
	},
	// Salesforce, naturally doesn't return it's results in the format that the ember rest adapter would like.
	// This method reformats a salesforce payload into an ember payload.
	formatPayload : function(type, pl) {
		var formattedPl = {};
		var plural = Em.Inflector.inflector.pluralize(type.modelName);
		if($.isArray(pl.records)) {
			for(var i = 0; i < pl.records.length; i++)
				Papu.SF.formatRecord(pl.records[i]);
			formattedPl[plural] = pl.records;
		}
		else {
			Papu.SF.formatRecord(pl.records);
			formattedPl[plural] = [ pl.records ];
		}
		return formattedPl;
	},
	// This is a sub method to formatPayload. It formats a single record result returned by salesforce
	// into a payload expected by the ember rest adapter.
	formatRecord : function(rec) {
		if(!rec) {
			console.log('rec is undefined');
			return;
		}
		for(var fieldName in rec) {
			var field = rec[fieldName];
			if(field != null && !(typeof field.records === 'undefined'))
				rec[fieldName] = Papu.SF.formatToIdArray(field.records);
		}
		if(!(typeof rec.Id === 'undefined')) {
			rec.id = rec.Id;
			delete rec.Id;
		}
	},
	// This is a sub method to formatRecord. It formats a child relationship result, returned within a record
	// result, into an id array expected by the ember rest adapter.
	formatToIdArray : function(records) {
		var idArr = [];
		if($.isArray(records))
			for(var i = 0; i < records.length; i++)
				idArr.push(records[i].Id)
		else
			idArr.push(records.Id)
		return idArr;
	},
	// This method formats an ember Snapshot object, into a javascript representation of an SObject, ready for
	// sending to the server using the salesforce soap api i.e. sforce.connection.create/update
	sfFormatSnapshot : function(snapshot, type) {
		var sfName = Papu.SF.sfriseExtension(type.modelName);
		var so = new sforce.SObject(sfName);
		if(snapshot.id != null)
			so.Id = snapshot.id;
		snapshot.eachAttribute(function(name, meta){
			var metaOptions = type.metaForProperty(name).options;
			if(metaOptions.updateable)
				so[name] = snapshot.attr(name);
		});	
		snapshot.eachRelationship(function(name, meta){
			if(meta.kind === 'belongsTo') {
				var metaOptions = type.metaForProperty(name).options;
				if(metaOptions.updateable)
					so[name] = snapshot.belongsTo(name, { id: true });
			}
		});
		return so;
	},
	// This is the general query method used to execute a soap api query to a salesforce org.
	// See: sforce.connection.query(q, cbSuccess, cbErr);
	query : function(store, type, query, cbSuccess, cbErr) {
		var q = null;
		try {
			var sfName = Papu.SF.sfriseExtension(type.modelName);
			q = Papu.SF.createRootSoqlSelect(type, sfName, query);
			sforce.connection.query(q, cbSuccess, cbErr);
		} catch(e) {
			console.log(q);
			throw e;
		}
    },
    // This is an initialisation method to dynamically create the ember models, used by an ember app, by
    // reading the salesforce schema via the salesforce soap api. If this initialisation method is used,
    // app initialisation should happen in the callback: cb
    //
    // See the createModelsForSObjects method for the typeFilter definition. If the typeFilter isn't used 
    // all the salesforce object definitions are converted into ember models
    createEmberModels : function(typeFilter, cb){
		var w = new Papu.SF.SchemaReader(100, function(){ 
	    	if(typeof App === 'undefined')
	    		App = Ember.Application.create({});
			Papu.SF.createModelsForSObjects(App, w.completeMetas, w, typeFilter);
			cb();
		});
	},
    // This is an initialisation method for creating the ember model definitions and downloading them in a 
	// serialised js object. Once the static js object has been created it can be used to initialise
    // the models by using the createModelsFromExtensionMap method. If you use this method to initialise, your
    // app will start up faster and you won't need to initialise your app in a callback. Bear in mind that any
	// model changes on salesforce will mean that you'll have to regenerate the serialised js object into a file.
    //
    // See the createModelsForSObjects method for the typeFilter definition. If the typeFilter isn't used 
    // all the salesforce object definitions are converted into ember models.
	downloadEmberModels : function(typeFilter){
		var w = new Papu.SF.SchemaReader(100, function(){ 
			var serialised = JSON.stringify(Papu.SF.createEmberModelDefinitions(w.completeMetas, w, typeFilter), null, 1);
			window.open('data:text/plain,' + encodeURIComponent('var modelDefinitions = ' + serialised + ';'));
		});
	},
}

// Placeholder for factory methods
Papu.SF.factory = {
	// Produces a cache object used in creating the ember model definitions
	Cache : function() {
		this.nonUpdateableFields = {};
		this.multitypedReferenceFields = {};
		this.inversFields = {};
		var that = this; 
		
		this.logNonUpdateableField = function(objectName, fieldName) {
			that.nonUpdateableFields[objectName.toLowerCase() + '.' + fieldName.toLowerCase()] = true;
		};
		this.isUpdateableField = function(objectName, fieldName) {
			return !that.nonUpdateableFields[objectName.toLowerCase() + '.' + fieldName.toLowerCase()];
		};
		this.logMultitypedReferenceField = function(objectName, fieldName) {
			that.multitypedReferenceFields[objectName.toLowerCase() + '.' + fieldName.toLowerCase()] = true;
		};
		this.isMultitypedReferenceField = function(objectName, fieldName) {
			return that.multitypedReferenceFields[objectName.toLowerCase() + '.' + fieldName.toLowerCase()];
		};
		this.isReferencedByMultitypedReference = function(relationship) {
			return that.isMultitypedReferenceField(relationship.childSObject, relationship.field);
		};
		this.getInversMap = function(objectName) {
			var map = that.inversFields[objectName];
			if(typeof map === 'undefined' || map == null) {
				map = {};
				that.inversFields[objectName] = map;
			}
			return map;
		};
		this.logInverses = function(objectName, field1Name, field2Name) {
			var map = that.getInversMap(objectName);
			map[field1Name] = field2Name;
			map[field2Name] = field1Name;
		};
		this.getInverse = function(objectName, fieldName) {
			var inverse = that.getInversMap(objectName)[fieldName];
			return (typeof inverse === 'undefined' ? null : inverse);
		};
	}
}

// This is the actual adapter which plug into ember data.
//
// Put it into use with the followhing line:
// App.ApplicationAdapter = Papu.SF.Adapter;
Papu.SF.Adapter = DS.RESTAdapter.extend({
    find : function(store, type, id, snapshot) {
    	return this.findRecord(store, type, id, snapshot);
    },
    findRecord : function(store, type, id, snapshot) {
    	return this.query(store, type, "Id = '" + id + "'");
    },
	createRecord: function(store, type, snapshot) {
		return new Ember.RSVP.Promise(function(resolve, reject) {
			try {
				var obj = Papu.SF.sfFormatSnapshot(snapshot, type);
				var res = sforce.connection.create([obj], 
				function(res) {
					snapshot.id = res[0].id;
					var pl = {};
					pl[type.modelName] = snapshot;
					Ember.run(null, resolve, pl);
					
					// Update record in the background - in case it has values that are calculated on the server
					Papu.SF.query(store, type, "Id = '" + res[0].id + "'", 
						function(res) {
							var r = Papu.SF.formatPayload(type, res);
							store.pushPayload(type.modelName, r);
						}, 
						function(err) { 
							console.log(err); 
						});
				},
				function(err) { 
					console.log(err); 
					Ember.run(null, reject, err);
				});               
			}catch(e) {
				console.log(e.faultstring);
				console.log(e.message);
				console.log(e);
				Ember.run(null, reject, e);
			}
		});
	},
	updateRecord: function(store, type, snapshot) {
		return new Ember.RSVP.Promise(function(resolve, reject) {
			try {
				var obj = Papu.SF.sfFormatSnapshot(snapshot, type);
				var res = sforce.connection.update([obj], 
				function(res) {
					Papu.SF.formatRecord(obj);
					var pl = {};
					pl[type.modelName] = obj;
					Ember.run(null, resolve, pl);

					// Update record in the background - in case it has values that are calculated on the server
					Papu.SF.query(store, type, "Id = '" + res[0].id + "'", 
						function(res) {
							var r = Papu.SF.formatPayload(type, res);
							store.pushPayload(type.modelName, r);
						}, 
						function(err) { 
							console.log(err); 
						});
				},
				function(err) { 
					console.log(err); 
					Ember.run(null, reject, err);
				});
			}catch(e) {
				console.log(e.faultstring);
				console.log(e.message);
				console.log(e);
				Ember.run(null, reject, e);
			}
		});
	},
	deleteRecord: function(store, type, snapshot) {
		return new Ember.RSVP.Promise(function(resolve, reject) {
			try {
				sforce.connection.deleteIds([snapshot.id], 
				function(res) {
					Ember.run(null, resolve, {});
				},
				function(err) { 
					console.log(err); 
					Ember.run(null, reject, err);
				});
			}catch(e) {
				console.log(e.faultstring);
				console.log(e.message);
				console.log(e);
				Ember.run(null, reject, e);
			}
		});
	},
	findAll: function(store, type, sinceToken) {
    	return this.query(store, type);
	},
    findMany : function(store, type, ids, snapshot) {
    	return this.query(store, type, "Id in " + Papu.SF.toSoqlArray(ids));
    },
    findQuery : function(store, type, query) {
    	return this.query(store, type, query);
    },
    query : function(store, type, query) {
		return new Ember.RSVP.Promise(function(resolve, reject) {
			try {
				Papu.SF.query(store, type, query, 
					function(res) {
						var r = Papu.SF.formatPayload(type, res);
						Ember.run(null, resolve, r);
					}, 
					function(err) { 
						console.log(err); 
						Ember.run(null, reject, err);
					});
			} catch(e) {
				console.log(e.faultstring);
				console.log(e.message);
				console.log(e);
				Ember.run(null, reject, e);
			}
		});
    },
});

//Leave onSuccess out if you don't want to populate metadata on construction
Papu.SF.SchemaReader = function(batchSize, onSuccess, onFailure) {
	this.type = 'Papu.SF.SchemaReader';
	this.isFetching = true;
	this.batchSize = (typeof batchSize == 'undefined') ? 100 : batchSize;
	this.skipErrors = (typeof onFailure == 'undefined') ? true : false;
	this.readRelWithUdefNames = false;

	if(typeof onSuccess === 'function')
		this.populate(onSuccess, onFailure);
};

Papu.SF.SchemaReader.prototype = {
	populate : function(onSuccess, onFailure) {
		this.preMetas = [];
		this.completeMetas = {};
		this.nameBatches = [];

		var threadCount = 0;
		var res = sforce.connection.describeGlobal();
		this.preMetas = res.getArray("sobjects");

		// Push batches
		for(var i = 0; i < this.preMetas.length;) {
			var batch = [];
			for(var j = 0; i < this.preMetas.length && j < this.batchSize; i++, j++)
				batch.push(this.preMetas[i].name);
			this.nameBatches.push(batch);
		}
		
		var failed = false;
		var handledFailure = false;
		var that = this;
		var cb = function(err) {
			if(handledFailure) 
				return;
			if(failed) {
				console.log(err);
				onFailure(err);
				handledFailure = true;
				return;
			}
			threadCount--;
			console.log(threadCount);
			if(threadCount <= 0) {
				that.isFetching = false;
				onSuccess();
			}
		};
		var fail = function(err) {
			if(!that.skipErrors) {
				failed = true;
				onFailure(err);
			}
			else
				console.log(err); // Currently only logging the error
			cb(err);
		};
		
		// Get complete metas
		for (var i = 0; i < this.nameBatches.length; i++) {
			console.log('Batch : ' + this.nameBatches[i]);
			threadCount++;
			this.fetchCompleteMeta(this.nameBatches[i], cb, fail);
		}
	},
	// Read the array of pre metas and populate completeMetas
	fetchCompleteMeta : function(objs, success, fail) {
		var that = this;
		var fetchSuccess = function(metas) {
			try {
				for(var i = 0; i < metas.length; i++)
					that.registerMeta(metas[i]);
			} 
			catch(e) { fail(e); }
			finally{ success(); } // call the callback
		}
		sforce.connection.describeSObjects(objs, fetchSuccess, fail);
	},
	registerMeta : function(obj) {
		this.completeMetas[obj.name] = obj;
	},
	// see deepread fields for the visitor definition
	shallowReadFields : function(visitor) {
		this.validateState();
		for(var objName in this.completeMetas)
			if(this.shallowReadMetaFieldsAbr(this.completeMetas[objName], visitor) === 'term') return 'term';
	},
	// see deepread fields for the visitor definition
	shallowReadMetaFields : function(obj, visited, path, visitor) {
		this.validateState();
		if(typeof obj.fields === 'undefined') {
			console.log('The object has no fields defined');
			return;
		}
		for(var i = 0; i < obj.fields.length; i++) {
			var f = obj.fields[i];
			if(typeof f === 'undefined')
				continue;
			var subPath = path.slice(0);
			subPath.push(f);
			if(visitor.visit(f, obj, subPath, this) === 'term') return 'term';
		}
	},
	// An abbreviation (Abr) method to shallow read beginning with the passed object
	// see deepread fields for the visitor definition
	shallowReadMetaFieldsAbr : function(obj, visitor) {
		var visited = {};
		visited[obj.name] = true;
		return this.shallowReadMetaFields(obj, visited, [obj], visitor);
	},
	// visitor definition: visitor.visit(field, object, path, reader) {
	// 		// return 'term' // if you want to terminate the schema read
	// }
	// field : {} - the field description under read,
	// object : {} - the sobject description under read 
	// path : [] - a list of descriptions starting with the sobject description, trailed by 
	//				relationship descriptions and ending with a field description
	// reader : the reader which is currently used to read the schema
	deepReadFields : function(visitor) {
		this.validateState();
		for(var objName in this.completeMetas)
			if(this.deepReadMetaFieldsAbr(this.completeMetas[objName], visitor) === 'term') return 'term';
	},
	// see deepread fields for the visitor definition
	deepReadMetaFields : function(obj, visited, path, visitor) {
		this.validateState();
		if(visited[obj.name] == true)
			return;
		if(typeof obj.fields === 'undefined')
			return;
		visited[obj.name] = true;

		if(path.length == 0)
			path.push(obj);

		for(var i = 0; i < obj.fields.length; i++) {
			var f = obj.fields[i];
			if(typeof f === 'undefined')
				continue;
			var subPath = path.slice(0);
			subPath.push(f);
			if(visitor.visit(f, obj, subPath, this) === 'term') return 'term';
			if(t.type === 'reference')
				if(this.deepReadMetaFields(this.completeMetas[f.referenceTo], visited, subPath, visitor) === 'term') return 'term';
		}
		if(typeof obj.childRelationships == 'undefined')
			return;
		for(var i = 0; i < obj.childRelationships.length; i++) {
			var rel = obj.childRelationships[i];
			if(!this.readRelWithUdefNames && typeof rel.relationshipName === 'undefined')
				continue;
			var subPath = path.slice(0);
			subPath.push(rel);
			if(this.deepReadMetaFields(this.completeMetas[rel.childSObject], visited, subPath, visitor) === 'term') return 'term';
		}
	},
	// An abbreviation (Abr) method to deep read starting with the passed object
	// see deepread fields for the visitor definition
	deepReadMetaFieldsAbr : function(obj, visitor) {
		return this.deepReadMetaFields(obj, [], [], visitor);
	},
	// visitor definition: visitor.visit(field, object, path, reader) {
	// 		// return 'term' // if you want to terminate the schema read
	// }
	// rel : {} - the relationship description under read,
	// object : {} - the sobject description under read 
	// path : [] - a list of descriptions starting with the sobject description, trailed by 
	//				relationship descriptions
	// reader : the reader which is currently used to read the schema
	shallowReadChildRelationships : function(visitor) {
		this.validateState();
		for(var objName in this.completeMetas)
			if(this.shallowReadMetaChildRelationshipsAbr(this.completeMetas[objName], visitor) === 'term') return 'term';
	},
	// see shallowReadChildRelationships fields for the visitor definition
	shallowReadMetaChildRelationships : function(obj, visited, path, visitor) {
		this.validateState();
		if(typeof obj.childRelationships === 'undefined') {
			console.log('The object has no child relationships defined');
			return;
		}
		for(var i = 0; i < obj.childRelationships.length; i++) {
			var r = obj.childRelationships[i];
			if(typeof r === 'undefined')
				continue;
			var subPath = path.slice(0);
			subPath.push(r);
			if(visitor.visit(r, obj, subPath, this) === 'term') return 'term';
		}
	},
	// An abbreviation (Abr) method to shallow read starting with the passed object
	// see shallowReadChildRelationships fields for the visitor definition
	shallowReadMetaChildRelationshipsAbr : function(obj, visitor) {
		var visited = {};
		visited[obj.name] = true;
		return this.shallowReadMetaChildRelationships(obj, visited, [obj], visitor);
	},
	validateState : function() {
		if(this.isFetching)
			throw this.type + " hasn't finished fetching metadata from the server";
	},
};