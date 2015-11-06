QUnit.test( 'new sforce.SObject()', function( assert ) {
	var so = new sforce.SObject('SomeObjectType');
	assert.equal(so.type, 'SomeObjectType', 'The type parameter of the new sobject wasn\'t set correctly');
});

QUnit.test( 'sforce.connection.create', function( assert ) {
	// Setup
	sforce.db.clear();
	sforce.db.schema = houseSchema.sfSchema;
	
	var sos = [new sforce.SObject('houseObj__c')];
	var result;
	sforce.connection.create(sos, function(res){ result = res; }, function(err) { console.log(err); });
	assert.equal(result[0].success, 'true', 'Failed to create a new houseObj__c' );
	assert.ok(result[0].id, 'No id was returned');
	
	sos = [new sforce.SObject('houseObj__c'), 
	       new sforce.SObject('noTypeByThisName'), 
	       new sforce.SObject('houseObj__c', { noFieldByThisName : 'any value' }),
	       new sforce.SObject('houseObj__c', { Name : 'A valid object' })];
	var syncResult = sforce.connection.create(sos, function(res){ result = res; }, function(err) { console.log(err); });
	
	assert.deepEqual(syncResult, result, 'Sychronous and asynchronous results missmatch')
	
	assert.equal(result[0].success, 'true', 'Failed to create a valid object' );
	assert.ok(result[0].id, 'No id was returned');
	
	assert.equal(result[1].success, 'false', 'Didn\'t fail on invalid object creation' );
	assert.notOk(result[1].id, 'Returned an id for an invalid object');
	
	assert.equal(result[2].success, 'false', 'Didn\'t fail on invalid object creation' );
	assert.notOk(result[2].id, 'Returned an id for an invalid object');
	
	assert.equal(result[3].success, 'true', 'Failed to create a valid object' );
	assert.ok(result[3].id, 'No id was returned');
});

QUnit.test( 'sforce.connection.create with sforce.db.useGivenIds = true', function( assert ) {
	// Setup
	sforce.db.clear();
	sforce.db.useGivenIds = true;
	sforce.db.schema = houseSchema.sfSchema;
	
	var sos = [new sforce.SObject('houseObj__c', {Id : 'abc000000000001xyz'})];
	var result;
	sforce.connection.create(sos, function(res){ result = res; }, function(err) { console.log(err); });
	assert.equal(result[0].success, 'true', 'Failed to create a new houseObj__c' );
	assert.equal(result[0].id, 'abc000000000001xyz', 'The given Id wasn\'t used');
	sforce.db.useGivenIds = false;
});

QUnit.test( 'sforce.connection.query', function( assert ) {
	// Setup
	sforce.db.clear();
	sforce.db.schema = houseSchema.sfSchema;
	
	var sos = [new sforce.SObject('houseObj__c', { Name : 'Obj 1' }), 
	       new sforce.SObject('noTypeByThisName')]; // Making sure invalid objects aren't getting into the db
	sforce.connection.create(sos);

	var result;
	sforce.connection.query("select Id, Name from houseObj__c", function(res) { result = res; }, function(err) { console.log(err); });
	assert.equal(result.done, 'true', 'Result is implying that not all objects have yet been fetched' );
	assert.equal(result.size, '1', 'An incorrect amount of objects was returned' );
	
	// A single result is not returned as an array
	assert.ok(result.records.Id, 'No Id value was returned');
	assert.ok(result.records.Name, 'No Name value was returned');
	
	sforce.connection.create([new sforce.SObject('houseObj__c', { Name : 'Obj 2' })]);
	sforce.connection.query("select Id, Name from houseObj__c", function(res) { result = res; }, function(err) { console.log(err); });
	
	assert.equal(result.done, 'true', 'Result is implying that not all objects have yet been fetched' );
	assert.equal(result.size, '2', 'An incorrect amount of objects was returned' );
	
	//  But multiple results naturally are returned as an array
	assert.ok(result.records[0].Id, 'No Id value was returned');
	assert.ok(result.records[0].Name, 'No Name value was returned');
	
	assert.ok(result.records[1].Id, 'No Id value was returned');
	assert.ok(result.records[1].Name, 'No Name value was returned');
	
	assert.notEqual(result.records[0].Id, result.records[1].Id, 'Duplicate Id\'s');
	assert.notEqual(result.records[0].Name, result.records[1].Name, 'Duplicate fields');
	
	sos = [new sforce.SObject('doorObj__c', { house__c : result.records[0].Id, Name : 'door 1' }), 
	       new sforce.SObject('doorObj__c', { house__c : result.records[0].Id, Name : 'door 2' }),
	       new sforce.SObject('doorObj__c', { house__c : result.records[1].Id, Name : 'door 3' })];
	sforce.connection.create(sos);

	var relResult;
	var q = "select Id, Name, (select Id, Name from doors__r) from houseObj__c where Id = '" + result.records[0].Id + "'";
	sforce.connection.query(q, function(res) { relResult = res; }, function(err) { console.log(err); });
	var doorsRes = relResult.records.doors__r;
	assert.ok(doorsRes, 'No subquery result returned');
	assert.equal(doorsRes.size, '2', 'Incorrect number of child objects returned');
	
	assert.ok(doorsRes.records[0].Id, 'No Id value was returned');
	assert.ok(doorsRes.records[0].Name, 'No Name value was returned');
	
	assert.ok(doorsRes.records[1].Id, 'No Id value was returned');
	assert.ok(doorsRes.records[1].Name, 'No Name value was returned');

	q = "select Id, Name, (select Id, Name from doors__r) from houseObj__c where Id = '" + result.records[1].Id + "'";
	sforce.connection.query(q, function(res) { relResult = res; }, function(err) { console.log(err); });
	doorsRes = relResult.records.doors__r;
	assert.ok(doorsRes, 'No subquery result returned');
	assert.equal(doorsRes.size, '1', 'Incorrect number of child objects returned');
	
	assert.ok(doorsRes.records.Id, 'No Id value was returned');
	assert.ok(doorsRes.records.Name, 'No Name value was returned');
});

QUnit.test( 'sforce.connection.query() conditions', function( assert ) {
	// Setup
	sforce.db.clear();
	sforce.db.schema = houseSchema.sfSchema;
	
	var sos = [new sforce.SObject('houseObj__c', { Name : 'In ground', height__c : -10 }),
	           new sforce.SObject('houseObj__c', { Name : 'At par', height__c : 0 }),
	           new sforce.SObject('houseObj__c', { Name : 'Above ground', height__c : 10 })];
	sforce.connection.create(sos);
	
	var deepRes;
	var shallowRes;
	var parRes1;
	var parRes2;
	var aboveRes;
	var tallRes;
	
	q = "select Name from houseObj__c where height__c < -10";
	sforce.connection.query(q, function(res) { deepRes = res; }, function(err) { console.log(err); });
	q = "select Name from houseObj__c where height__c <= -10";
	sforce.connection.query(q, function(res) { shallowRes = res; }, function(err) { console.log(err); });
	q = "select Name from houseObj__c where height__c < 0";
	sforce.connection.query(q, function(res) { parRes1 = res; }, function(err) { console.log(err); });
	q = "select Name from houseObj__c where height__c <= 0";
	sforce.connection.query(q, function(res) { parRes2 = res; }, function(err) { console.log(err); });
	q = "select Name from houseObj__c where height__c < 10";
	sforce.connection.query(q, function(res) { aboveRes = res; }, function(err) { console.log(err); });
	q = "select Name from houseObj__c where height__c <= 10";
	sforce.connection.query(q, function(res) { tallRes = res; }, function(err) { console.log(err); });
	
	assert.equal(deepRes.size, '0', 'Incorrect result count');
	assert.equal(shallowRes.size, '1', 'Incorrect result count');
	assert.equal(parRes1.size, '1', 'Incorrect result count');
	assert.equal(parRes2.size, '2', 'Incorrect result count');
	assert.equal(aboveRes.size, '2', 'Incorrect result count');
	assert.equal(tallRes.size, '3', 'Incorrect result count');
	
	q = "select Name from houseObj__c where height__c >= -10";
	sforce.connection.query(q, function(res) { deepRes = res; }, function(err) { console.log(err); });
	q = "select Name from houseObj__c where height__c > -10";
	sforce.connection.query(q, function(res) { shallowRes = res; }, function(err) { console.log(err); });
	q = "select Name from houseObj__c where height__c >= 0";
	sforce.connection.query(q, function(res) { parRes1 = res; }, function(err) { console.log(err); });
	q = "select Name from houseObj__c where height__c > 0";
	sforce.connection.query(q, function(res) { parRes2 = res; }, function(err) { console.log(err); });
	q = "select Name from houseObj__c where height__c >= 10";
	sforce.connection.query(q, function(res) { aboveRes = res; }, function(err) { console.log(err); });
	q = "select Name from houseObj__c where height__c > 10";
	sforce.connection.query(q, function(res) { tallRes = res; }, function(err) { console.log(err); });
	
	assert.equal(deepRes.size, '3', 'Incorrect result count');
	assert.equal(shallowRes.size, '2', 'Incorrect result count');
	assert.equal(parRes1.size, '2', 'Incorrect result count');
	assert.equal(parRes2.size, '1', 'Incorrect result count');
	assert.equal(aboveRes.size, '1', 'Incorrect result count');
	assert.equal(tallRes.size, '0', 'Incorrect result count');
	
	sos = [new sforce.SObject('houseObj__c', { Name : 'In ground', height__c : -5 }),
	       new sforce.SObject('houseObj__c', { Name : 'At par two', height__c : 0 }),
	       new sforce.SObject('houseObj__c', { Name : 'Above ground', height__c : 5 })];
	sforce.connection.create(sos);
	
	var andRes; // 1
	var orRes; // 2
	var andOrAndOrRes; // 3
	
	q = "select Name from houseObj__c where height__c = 0 and Name = 'At par two'";
	sforce.connection.query(q, function(res) { andRes = res; }, function(err) { console.log(err); });
	q = "select Name from houseObj__c where Name = 'At par' or Name = 'At par two'";
	sforce.connection.query(q, function(res) { orRes = res; }, function(err) { console.log(err); });
	q = "select Name from houseObj__c where (height__c = 0 and Name = 'At par') or (Name = 'Above ground' and (height__c = 5 or height__c = 10))";
	sforce.connection.query(q, function(res) { andOrAndOrRes = res; }, function(err) { console.log(err); });
	
	assert.equal(andRes.size, '1', 'Incorrect result count');
	assert.equal(orRes.size, '2', 'Incorrect result count');
	assert.equal(andOrAndOrRes.size, '3', 'Incorrect result count');
});

QUnit.test( 'sforce.connection.query() array conditions', function( assert ) {
	// Setup
	sforce.db.clear();
	sforce.db.schema = houseSchema.sfSchema;
	
	var sos = [new sforce.SObject('houseObj__c', { Name : 'In ground', height__c : -10 }),
	           new sforce.SObject('houseObj__c', { Name : 'At par', height__c : 0 }),
	           new sforce.SObject('houseObj__c', { Name : 'Above ground', height__c : 10 })];
	sforce.connection.create(sos);
	
	var allRes;
	var someRes;
	var noneRes;
	
	q = "select Name from houseObj__c where height__c in (-10, 0, 10)";
	sforce.connection.query(q, function(res) { allRes = res; }, function(err) { console.log(err); });
	q = "select Name from houseObj__c where height__c in (-10, 0, 123, 546, 'Mä oon B')";
	sforce.connection.query(q, function(res) { someRes = res; }, function(err) { console.log(err); });
	q = "select Name from houseObj__c where height__c in (123, 546, 'Mä oon B')";
	sforce.connection.query(q, function(res) { noneRes = res; }, function(err) { console.log(err); });
	
	assert.equal(allRes.size, '3', 'Incorrect result count');
	assert.equal(someRes.size, '2', 'Incorrect result count');
	assert.equal(noneRes.size, '0', 'Incorrect result count');

});

QUnit.test( 'sforce.connection.update', function( assert ) {
	// Setup
	sforce.db.clear();
	sforce.db.schema = houseSchema.sfSchema;
	
	var sos = [new sforce.SObject('houseObj__c')];
	var result;
	sforce.connection.create(sos, function(res){ result = res; }, function(err) { console.log(err); });
	sos[0].Id = result[0].id;
	sos[0].Name = 'updated';
	sforce.connection.update(sos, function(res){ result = res; }, function(err) { console.log(err); });
	
	assert.equal(result[0].success, 'true', 'Failed to update' );
	assert.ok(result[0].id, 'No id was returned');
	
	var result = sforce.connection.query("select Name from houseObj__c where Id = '" + sos[0].Id + "'");
	assert.equal(result.records.Name, 'updated', 'Failed to update field');
	
	sos[1] = new sforce.SObject('houseObj__c');
	sforce.connection.create([sos[1]], function(res){ result = res; }, function(err) { console.log(err); });
	sos[1].Id = result[0].id;
	sos[0].Name = 'updated1';
	sos[1].Name = 'updated2';
	
	sforce.connection.update(sos);
	
	result = sforce.connection.query("select Name from houseObj__c where Name = 'updated1' or Name = 'updated2'");
	var result2 = sforce.connection.query("select Name from houseObj__c");
	assert.equal(result.size, result2.size, 'Update is adding records into the db');
	assert.equal(result.size, '2', 'Update is adding records into the db');
});

QUnit.test( 'sforce.connection.deleteIds', function( assert ) {
	// Setup
	sforce.db.clear();
	sforce.db.schema = houseSchema.sfSchema;
	
	var sos = [new sforce.SObject('houseObj__c', { Name : 'obj1'}),
	           new sforce.SObject('houseObj__c', { Name : 'obj2'}),
	           new sforce.SObject('houseObj__c', { Name : 'obj3'})];
	var result = sforce.connection.create(sos, function(res){ result = res; }, function(err) { console.log(err); });
	
	sforce.connection.deleteIds([result[0].id]);
	assert.equal(sforce.connection.query("select Id from houseObj__c").size, '2', 'Incorrect object count')
	sforce.connection.deleteIds([result[1].id, result[2].id]);
	assert.equal(sforce.connection.query("select Id from houseObj__c").size, '0', 'Incorrect object count')
});

