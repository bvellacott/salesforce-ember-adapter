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

Ember.run.backburner.DEBUG = true;

QUnit.test( "Papu.SF.hasCustomSfRelationExtension()", function( assert ) {
	assert.strictEqual( Papu.SF.hasCustomSfRelationExtension('someName__r'), true, "Expecting true with ending '__r'" );
	assert.strictEqual( Papu.SF.hasCustomSfRelationExtension('someName__r_'), false, "Expecting false with ending '__r_'" );
	assert.strictEqual( Papu.SF.hasCustomSfRelationExtension('someName'), false, "Expecting false with no ending" );
});

QUnit.test( "Papu.SF.hasCustomSfRelationExtension()", function( assert ) {
	assert.strictEqual( Papu.SF.hasCustomSfNameExtension('someName__c'), true, "Expecting true with ending '__c'" );
	assert.strictEqual( Papu.SF.hasCustomSfNameExtension('someName__c_'), false, "Expecting false with ending '__c_'" );
	assert.strictEqual( Papu.SF.hasCustomSfNameExtension('someName'), false, "Expecting false with no ending" );
});

QUnit.test( "Papu.SF.hasCustomEmberRelationExtension()", function( assert ) {
	assert.strictEqual( Papu.SF.hasCustomEmberRelationExtension('someNamerrr'), true, "Expecting true with ending 'rrr'" );
	assert.strictEqual( Papu.SF.hasCustomEmberRelationExtension('someNamerrr_'), false, "Expecting false with ending 'rrr_'" );
	assert.strictEqual( Papu.SF.hasCustomEmberRelationExtension('someName'), false, "Expecting false with no ending" );
});

QUnit.test( "Papu.SF.hasCustomEmberNameExtension()", function( assert ) {
	assert.strictEqual( Papu.SF.hasCustomEmberNameExtension('someNameccc'), true, "Expecting true with ending 'ccc'" );
	assert.strictEqual( Papu.SF.hasCustomEmberNameExtension('someNameccc_'), false, "Expecting false with ending 'ccc_'" );
	assert.strictEqual( Papu.SF.hasCustomEmberNameExtension('someName'), false, "Expecting false with no ending" );
});

QUnit.test( "Papu.SF.emberiseExtension()", function( assert ) {
	assert.equal( Papu.SF.emberiseExtension('someName__c'), 'someNameccc', "Ending '__c' should be converted to 'ccc'" );
	assert.equal( Papu.SF.emberiseExtension('someName__r'), 'someNamerrr', "Ending '__r' should be converted to 'rrr'" );
	assert.equal( Papu.SF.emberiseExtension('someName__a'), 'someName__a', "Any other ending shouldn't be converted" );
});

QUnit.test( "Papu.SF.sfriseExtension()", function( assert ) {
	assert.equal( Papu.SF.sfriseExtension('someNameccc'), 'someName__c', "Ending 'ccc' should be converted to '__c'" );
	assert.equal( Papu.SF.sfriseExtension('someNamerrr'), 'someName__r', "Ending 'rrr' should be converted to '__r'" );
	assert.equal( Papu.SF.sfriseExtension('someNameaaa'), 'someNameaaa', "Any other ending shouldn't be converted" );
});

QUnit.test( "Papu.SF.emberiseRefs()", function( assert ) {
	assert.equal( Papu.SF.emberiseRefs('someName__c'), 'someNameccc', "Ending '__c' should be converted to 'ccc'" );
	assert.equal( Papu.SF.emberiseRefs('someName__r'), 'someNamerrr', "Ending '__r' should be converted to 'rrr'" );
	assert.equal( Papu.SF.emberiseRefs('someName__a'), 'someName__a', "Any other ending shouldn't be converted" );
});

QUnit.test( "Papu.SF.sfriseRefs()", function( assert ) {
	assert.equal( Papu.SF.sfriseRefs('someNameccc'), 'someName__c', "Ending 'ccc' should be converted to '__c'" );
	assert.equal( Papu.SF.sfriseRefs('someNamerrr'), 'someName__r', "Ending 'rrr' should be converted to '__r'" );
	assert.equal( Papu.SF.sfriseRefs('someNameaaa'), 'someNameaaa', "Any other ending shouldn't be converted" );
});

QUnit.test( "Papu.SF.emberiseRefs()", function( assert ) {
	assert.deepEqual( Papu.SF.emberiseRefs(['someName__c', 'someName__r', 'someName__a']), ['someNameccc', 'someNamerrr', 'someName__a'], "Ending '__c' should be converted to 'ccc' and '__r' should be converted to 'rrr'" );
	assert.deepEqual( Papu.SF.emberiseRefs(['someName__r', 'someName__a', 'someName__c']), ['someNamerrr', 'someName__a', 'someNameccc'], "Ending '__c' should be converted to 'ccc' and '__r' should be converted to 'rrr'" );
	assert.deepEqual( Papu.SF.emberiseRefs(['someName__a', 'someName__c', 'someName__r']), ['someName__a', 'someNameccc', 'someNamerrr'], "Ending '__c' should be converted to 'ccc' and '__r' should be converted to 'rrr'" );
});

QUnit.test( "Papu.SF.sfriseRefs()", function( assert ) {
	assert.deepEqual( Papu.SF.sfriseRefs(['someNameccc', 'someNamerrr', 'someNameaaa']), ['someName__c', 'someName__r', 'someNameaaa'], "Ending 'ccc' should be converted to '__c' and 'rrr' should be converted to '__r'" );
	assert.deepEqual( Papu.SF.sfriseRefs(['someNamerrr', 'someNameaaa', 'someNameccc']), ['someName__r', 'someNameaaa', 'someName__c'], "Ending 'ccc' should be converted to '__c' and 'rrr' should be converted to '__r'" );
	assert.deepEqual( Papu.SF.sfriseRefs(['someNameaaa', 'someNameccc', 'someNamerrr']), ['someNameaaa', 'someName__c', 'someName__r'], "Ending 'ccc' should be converted to '__c' and 'rrr' should be converted to '__r'" );
});
var mockSchemaReader = new Papu.SF.SchemaReader(100);
var testSchema = function(mockSchema) {
	var runTests = function(mockApp) {
		QUnit.test( "Model creation", function( assert ) {
			for(var sfModelName in mockSchema.modelNameMap) {
				var sfModel = mockSchema.sfSchema[sfModelName];
				var emberModelName = mockSchema.modelNameMap[sfModelName];
				var emberModel = mockApp[emberModelName];
				
				assert.notEqual(typeof mockSchema.emberMetas[emberModelName], 'undefined', 'The model name: ' + emberModelName + ' has been incorrectly converted from the salesforce object name: ' + sfModelName);
				
				var mockMeta = mockSchema.emberMetas[emberModelName];
				
				var attrMetas = {};
				var relMetas = {};
				
				emberModel.eachAttribute(function(name, meta) { attrMetas[name] = meta; });
				
				emberModel.eachRelationship(function(name, meta) { relMetas[name] = meta; });
				
				var sfFields = {};
				for(var i = 0; i < sfModel.fields.length; i++) {
					var f = sfModel.fields[i];
					sfFields[f.name] = f;
				}
				
				for(var name in mockMeta.attributes) {
					var mockAttrMeta = mockMeta.attributes[name];
					var meta = attrMetas[name];
					assert.notEqual(typeof meta, 'undefined', 'The attributes: ' + name + ' meta object wasn\'t found in the model: ' + emberModelName);
					for(var key in mockAttrMeta)
						assert.deepEqual(meta[key], mockAttrMeta[key], 'Meta ' + key + ' mismatch for attribute : ' + name + ' in object: ' + emberModelName);
				}
				
				for(var name in mockMeta.relationships) {
					var mockRelMeta = mockMeta.relationships[name];
					var meta = relMetas[name];
					assert.notEqual(typeof meta, 'undefined', 'The relationships: ' + name + ' meta object wasn\'t found in the model: ' + emberModelName);
					for(var key in mockRelMeta)
						assert.deepEqual(meta[key], mockRelMeta[key], 'Meta ' + key + ' mismatch for relationship : ' + name + ' in object: ' + emberModelName);
				}
				
				for(var name in mockMeta.relationshipsThatShouldntExist)
					assert.equal(typeof relMetas[name], 'undefined', 'The relationship: ' + name + ' shouldn\'t exist in the model: ' + emberModelName);
			}
		});
		
		QUnit.test( "Select statements", function( assert ) {
			for(var sfModelName in mockSchema.modelNameMap) {
				var sfModel = mockSchema.sfSchema[sfModelName];
				var emberModelName = mockSchema.modelNameMap[sfModelName];
				var emberModel = mockApp[emberModelName];
				
				var selectString = Papu.SF.createRootSoqlSelect(emberModel, sfModelName, 'some condition').trim().toLowerCase();
				assert.equal(selectString.substring(0, 6), 'select', 'The select query doesn\'t start with a select statement');
				
				var whereSplit = selectString.substring(6, selectString.length).split(/\swhere\s/gim);
				
				assert.notOk(whereSplit.length < 2, 'No where clause was found in: ' + selectString);
				assert.notOk(whereSplit.length > 2, 'Multiple where clauses were found in: ' + selectString);
				
				var beforeWhere = whereSplit[0];
				var afterWhere = whereSplit[1];
				
				var lastFromIndex = beforeWhere.lastIndexOf('from');
				assert.ok(lastFromIndex > 0, 'No from clause was found in: ' + selectString);
				
				var beforeFrom = beforeWhere.substring(0, lastFromIndex);
				var afterFrom = beforeWhere.substring(lastFromIndex + 4, beforeWhere.length);
				
				var fields = beforeFrom.split(/,/gim);
				
				var expectedParts = mockSchema.selectParts[emberModelName];
				
				assert.equal(fields.length, expectedParts.fields.length, 'The field part count is wrong in the select statement: ' + selectString);
				
				for(var i = 0; i < fields.length; i++)
					fields[i] = fields[i].replace(/\s/gim, '');
				for(var i = 0; i < fields.length; i++)
					assert.ok(fields.indexOf(expectedParts.fields[i].toLowerCase().replace(/\s/gim, '')) >= 0, 'The field element: ' + expectedParts.fields[i] + ' couldn\'t be found in: ' + selectString);
				
				assert.equal(afterFrom.replace(/\s/gim, ''), expectedParts.from.toLowerCase(), 'The from object: ' + expectedParts.from + ' couldn\'t be found in: ' + selectString);
				assert.equal(afterWhere.trim(), 'some condition', 'The where clause is invalid in: ' + selectString);
				
				var selectString = Papu.SF.createRootSoqlSelect(emberModel, sfModelName).toLowerCase() + ' ';
				assert.ok(selectString.indexOf(/\swhere\s/gim) < 0, 'The query string contains a where clause though it shouldn\'t: ' + selectString);
			}
		});
		
		QUnit.test( "Snapshot formatting", function( assert ) {
			for(var emberModelName in mockSchema.snapshots) {
				var emberModel = mockApp[emberModelName];
				emberModel.modelName = emberModelName;
			
				var modelSSs = mockSchema.snapshots[emberModelName];
				var expectedSOs = mockSchema.formattedSObjects[emberModelName];
				for(var i = 0; i < modelSSs.length; i++) {
					var mockInstance = $.extend({ _model : emberModel }, modelSSs[i]);
					var snapshot = new Snapshot(mockInstance);
					var sfObject = Papu.SF.sfFormatSnapshot(snapshot, emberModel);
					
					var expectedSfObject = expectedSOs[i];
					assert.deepEqual(expectedSfObject, sfObject, 'The snapshot formatting into an sobject failed');
				}
			}
		});
		
		QUnit.test( 'Papu.SF.Adapter.createRecord', function( assert ) {
			// Setup
			sforce.db.clear();
			sforce.db.useGivenIds = true;
			sforce.db.schema = houseSchema.sfSchema;
			var fa = new Papu.SF.Adapter();
			var store = new Store();
			
			for(var emberModelName in mockSchema.snapshots) {
				var emberModel = mockApp[emberModelName];
				emberModel.modelName = emberModelName;
			
				var modelSSs = mockSchema.snapshots[emberModelName];
				var payloads = mockSchema.payloads[emberModelName];
				for(var i = 0; i < modelSSs.length; i++) {
					var mockInstance = $.extend({ _model : emberModel }, modelSSs[i]);
					var snapshot = new Snapshot(mockInstance);
					fa.createRecord(store, emberModel, snapshot);
					for(var key in payloads[i]) {
						for(var field in payloads[i][key][0]) {
							if(typeof payloads[i][key][0][field] !== 'object')
								assert.equal(store.payload[key][0][field], payloads[i][key][0][field], 'Object creation failed on the field: ' + field + ' in object list: ' + key);
							else
								assert.deepEqual(store.payload[key][0][field], payloads[i][key][0][field], 'Object creation failed on the field: ' + field + ' in object list: ' + key);
						}
					}
				}
			}
		});
		
		QUnit.test( 'Papu.SF.Adapter.findRecord', function( assert ) {
			// Setup
			sforce.db.clear();
			sforce.db.useGivenIds = true;
			sforce.db.schema = houseSchema.sfSchema;
			var fa = new Papu.SF.Adapter();
			var store = new Store();
			
			for(var emberModelName in mockSchema.snapshots) {
				var emberModel = mockApp[emberModelName];
				emberModel.modelName = emberModelName;
			
				var modelSSs = mockSchema.snapshots[emberModelName];
				var payloads = mockSchema.payloads[emberModelName];
				for(var i = 0; i < modelSSs.length; i++) {
					var mockInstance = $.extend({ _model : emberModel }, modelSSs[i]);
					var snapshot = new Snapshot(mockInstance);
					fa.createRecord(store, emberModel, snapshot);
					fa.findRecord(store, emberModel, snapshot.id);
					for(var key in payloads[i]) {
						for(var field in payloads[i][key][0]) {
							if(typeof payloads[i][key][0][field] !== 'object')
								assert.equal(store.payload[key][0][field], payloads[i][key][0][field], 'Object creation failed on the field: ' + field + ' in object list: ' + key);
							else
								assert.deepEqual(store.payload[key][0][field], payloads[i][key][0][field], 'Object creation failed on the field: ' + field + ' in object list: ' + key);
						}
					}
				}
			}
		});
		
		QUnit.test( 'Papu.SF.Adapter.updateRecord', function( assert ) {
			// Setup
			sforce.db.clear();
			sforce.db.useGivenIds = true;
			sforce.db.schema = houseSchema.sfSchema;
			var fa = new Papu.SF.Adapter();
			var store = new Store();
			
			for(var emberModelName in mockSchema.snapshots) {
				var emberModel = mockApp[emberModelName];
				emberModel.modelName = emberModelName;
			
				var modelSSs = mockSchema.snapshots[emberModelName];
				var payloads = mockSchema.payloads[emberModelName];
				for(var i = 0; i < modelSSs.length; i++) {
					var mockInstance = $.extend({ _model : emberModel }, modelSSs[i]);
					var snapshot = new Snapshot(mockInstance);
					fa.createRecord(store, emberModel, snapshot);
					mockInstance = $.extend({ _model : emberModel }, modelSSs[i], { Name : 'updated' });
					snapshot = new Snapshot(mockInstance);
					fa.updateRecord(store, emberModel, snapshot);
					fa.findRecord(store, emberModel, snapshot.id);
					for(var key in payloads[i])
						assert.equal(store.payload[key][0]['Name'], 'updated', 'Name field didn\'t get updated');
				}
			}
		});
		
		QUnit.test( 'Papu.SF.Adapter.deleteRecord', function( assert ) {
			// Setup
			sforce.db.clear();
			sforce.db.useGivenIds = true;
			sforce.db.schema = houseSchema.sfSchema;
			var fa = new Papu.SF.Adapter();
			var store = new Store();
			
			for(var emberModelName in mockSchema.snapshots) {
				var emberModel = mockApp[emberModelName];
				emberModel.modelName = emberModelName;
			
				var modelSSs = mockSchema.snapshots[emberModelName];
				var payloads = mockSchema.payloads[emberModelName];
				for(var i = 0; i < modelSSs.length; i++) {
					var mockInstance = $.extend({ _model : emberModel }, modelSSs[i]);
					var snapshot = new Snapshot(mockInstance);
					fa.createRecord(store, emberModel, snapshot);
					fa.deleteRecord(store, emberModel, snapshot);
					store.payload = null;
					fa.findRecord(store, emberModel, snapshot.id);
					assert.deepEqual(store.payload, null, 'Delete failed');
				}
			}
		});
		
		QUnit.test( 'Papu.SF.Adapter.findAll', function( assert ) {
			// Setup
			sforce.db.clear();
			sforce.db.useGivenIds = true;
			sforce.db.schema = houseSchema.sfSchema;
			var fa = new Papu.SF.Adapter();
			var store = new Store();
			
			for(var emberModelName in mockSchema.snapshots) {
				var emberModel = mockApp[emberModelName];
				emberModel.modelName = emberModelName;
			
				var modelSSs = mockSchema.snapshots[emberModelName];
				var payloads = mockSchema.payloads[emberModelName];
				for(var i = 0; i < modelSSs.length; i++) {
					var mockInstance = $.extend({ _model : emberModel }, modelSSs[i]);
					var snapshot = new Snapshot(mockInstance);
					fa.createRecord(store, emberModel, snapshot);
				}
				Ember.run(function(){
				fa.findAll(store, emberModel).then(function(result){
					for(var key in result) {
						for(var i = 0; i < result[key].length; i++) {
							Ember.run(function(){
							fa.findRecord(store, mockApp[emberModelName], result[key][i]['id']).then(function(singleRes) {
								assert.deepEqual(result[key][i], singleRes[key][0], 'findAll failed');
							});
							});
						}
					}
				});
				});
			}
		});
		
		QUnit.test( 'Papu.SF.Adapter.findMany', function( assert ) {
			// Setup
			sforce.db.clear();
			sforce.db.useGivenIds = true;
			sforce.db.schema = houseSchema.sfSchema;
			var fa = new Papu.SF.Adapter();
			var store = new Store();
			
			for(var emberModelName in mockSchema.snapshots) {
				var emberModel = mockApp[emberModelName];
				emberModel.modelName = emberModelName;
			
				var modelSSs = mockSchema.snapshots[emberModelName];
				var payloads = mockSchema.payloads[emberModelName];
				var ids = [];
				for(var i = 0; i < modelSSs.length; i++) {
					var mockInstance = $.extend({ _model : emberModel }, modelSSs[i]);
					var snapshot = new Snapshot(mockInstance);
					ids.push(snapshot.id);
					fa.createRecord(store, emberModel, snapshot);
				}
				Ember.run(function(){
				fa.findMany(store, emberModel, ids).then(function(result){
					for(var key in result) {
						for(var i = 0; i < result[key].length; i++) {
							Ember.run(function(){
							fa.findRecord(store, mockApp[emberModelName], result[key][i]['id']).then(function(singleRes) {
								assert.deepEqual(result[key][i], singleRes[key][0], 'findAll failed');
							});
							});
						}
					}
				});
				});
			}
		});
	};
	
	mockSchemaReader.completeMetas = mockSchema.sfSchema;
	mockSchemaReader.isFetching = false;
	var mockApp = {};
	
	Papu.SF.createModelsForSObjects(mockApp, mockSchemaReader.completeMetas, mockSchemaReader, mockSchema.typeFilter);
	runTests(mockApp);

	mockApp = {};
	var modelDefinitions = Papu.SF.createEmberModelDefinitions(mockSchemaReader.completeMetas, mockSchemaReader, mockSchema.typeFilter);
	var serialisedModelDefinitions = JSON.stringify(modelDefinitions);
	Papu.SF.createModelsFromExtensionMap(mockApp, JSON.parse(serialisedModelDefinitions));
	runTests(mockApp);
};

testSchema(houseSchema);

QUnit.test( 'Papu.SF.createIdSoqlSelect()', function( assert ) {
	var idSelect = Papu.SF.createIdSoqlSelect(null, 'anyObjName__c', 'anyWhereClause');
	assert.equal(idSelect.replace(/\s+/gim, ' ').toLowerCase().trim(), 'select id from anyobjname__c where anywhereclause', 'The id select query is invalid: ' + idSelect);
	idSelect = Papu.SF.createIdSoqlSelect(null, 'anyObjName__c');
	assert.equal(idSelect.replace(/\s+/gim, ' ').toLowerCase().trim(), 'select id from anyobjname__c', 'The id select query is invalid: ' + idSelect);
});

QUnit.test( 'Papu.SF.toSoqlArray()', function( assert ) {
	var soqlArray = Papu.SF.toSoqlArray(['somethingA', 'somethingB', true, null, 123, 213.456]);
	assert.equal(soqlArray.trim(), "('somethingA','somethingB','true','null','123','213.456')", 'The soql array is invalid: ' + soqlArray);
});

QUnit.test( 'Papu.SF.formatPayload()', function( assert ) {
	Em.Inflector.inflector.irregular('someObjccc', 'someObjsccc')
	var type = { modelName : 'someObjccc'};
	var payload = {
		records : {
			Id : 'AbC000000000001XyZ',
			relationshipA : {
				records : [
					{ Id : '1', rubbish : 'rubbish'},
					{ Id : '2', rubbish : 'rubbish'},
					{ Id : '3', rubbish : 'rubbish'},
				]
			},
			relationshipB : {
				records : { Id : '4', rubbish : 'rubbish'}
			},
			fieldA : 'somethingA',
			Fieldb : true,
			fiEldC : null,
			fieldD : 123,
			fieldE : 123.456,
		}
	};
	var expectedPl = {
		someObjsccc : [
		    {
		    	id : 'AbC000000000001XyZ',
		    	relationshipA : ['1', '2', '3'],
		    	relationshipB : ['4'],
				fieldA : 'somethingA',
				Fieldb : true,
				fiEldC : null,
				fieldD : 123,
				fieldE : 123.456,
		    }
		]
	};
	
	var formattedPl = Papu.SF.formatPayload(type, payload);
	
	assert.deepEqual(formattedPl, expectedPl, 'The payload wasn\'t formatted correctly');
	

	type = { modelName : 'StandardObj'};
	payload = {
		records : [
		    {
				Id : 'AbC000000000001XyZ',
				relationshipA : {
					records : [
						{ Id : '1', rubbish : 'rubbish'},
						{ Id : '2', rubbish : 'rubbish'},
						{ Id : '3', rubbish : 'rubbish'},
					]
				},
				relationshipB : {
					records : { Id : '4', rubbish : 'rubbish'}
				},
				fieldA : 'somethingA',
				Fieldb : true,
				fiEldC : null,
				fieldD : 123,
				fieldE : 123.456,
			},
		    {
				Id : 'AbC000000000002XyZ',
				relationshipA : {
					records : [
						{ Id : '5', rubbish : 'rubbish'},
						{ Id : '6', rubbish : 'rubbish'},
					]
				},
				relationshipB : {
					records : { Id : '7', rubbish : 'rubbish'}
				},
				fieldA : 'somethingA',
				Fieldb : true,
				fiEldC : null,
				fieldD : 123,
				fieldE : 123.456,
			},
		]
	};
	expectedPl = {
		StandardObjs : [
   		    {
		    	id : 'AbC000000000001XyZ', 
		    	relationshipA : ['1', '2', '3'],
		    	relationshipB : ['4'],
				fieldA : 'somethingA',
				Fieldb : true,
				fiEldC : null,
				fieldD : 123,
				fieldE : 123.456,
		    },
		    {
		    	id : 'AbC000000000002XyZ',
		    	relationshipA : ['5', '6'],
		    	relationshipB : ['7'],
				fieldA : 'somethingA',
				Fieldb : true,
				fiEldC : null,
				fieldD : 123,
				fieldE : 123.456,
		    },
		]
	};
	
	formattedPl = Papu.SF.formatPayload(type, payload);
	
	assert.deepEqual(formattedPl, expectedPl, 'The payload wasn\'t formatted correctly');
});


QUnit.test( 'Papu.SF.factory.Cache', function( assert ) {
	var cache = new Papu.SF.factory.Cache();
	cache.logNonUpdateableField('updateObj', 'updateField');
	cache.logMultitypedReferenceField('multirefObj', 'multirefField');
	
	assert.notOk(cache.isUpdateableField('updateObj', 'updateField'), 'The field : updateObj.updateField wasn\'t logged as non-updateable');
	assert.ok(cache.isUpdateableField('multirefObj', 'multirefField'), 'The non logged field multirefObj.multirefField should be presented as updateable');
	
	assert.ok(cache.isMultitypedReferenceField('multirefObj', 'multirefField'), 'The field multirefObj.multirefField wasn\'t logged as a multityped reference field');
	assert.notOk(cache.isMultitypedReferenceField('updateObj', 'updateField'), 'The field updateObj.updateField was falsely logged as a multityped reference field');
	
	assert.ok(cache.isReferencedByMultitypedReference({ childSObject : 'multirefObj', field : 'multirefField'}), 'The multityped relationship wasn\'t resolved');
	assert.notOk(cache.isReferencedByMultitypedReference({ childSObject : 'updateObj', field : 'updateField'}), 'A multityped relationship was falsely resolved');
});

sforce.db.schema = houseSchema.sfSchema;

