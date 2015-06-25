var should 	= require('should'),
	request 	= require('supertest'),
	mongoose 	= require('mongoose'),
	config 		= require('../config-debug');


describe('User', function () {

	var url = 'http://localhost:4000';

	//Before testing, connect to test DB
	before(function (done) {
		mongoose.connect(config.db.mongodb);
		done();
	});

	describe('GET', function() { 
		it('All user details', function (done) {	

			request(url)
				.get('/api/user')
				.end(function (err, res) {
					if (err) throw err;

					res.should.have.property('status', 200);
					done();
				});
		});
	});

	describe('POST', function() { 
		it('Create user', function (done) {
			var signUpParams = {
				firstName : 'Gokuldd',
				lastName 	: 'Krishhdddd',
				email 		: 'dddd@gmadail.com',
				password 	: 'ddd'
			};

			request(url)
				.post('/api/user')
				.send(signUpParams)
				.end(function (err, res) {
					if (err) throw err;

					res.should.have.property('status', 201);
					done();
				});
		});
	});


	describe('PUT', function() { 
		it('Update user details', function (done) {
			
			var putUrl = '/api/user/558a98f7f59962b35d000002';

			var updateParams = {
				firstName : 'Gokul',
				lastName 	: 'Krishh',
				email 		: '123asds@gmail.com',
				password 	: '123'
			};

			request(url)
				.put(putUrl)
				.send(updateParams)
				.end(function (err, res) {
					if (err) throw err;

					res.should.have.property('status', 200);
					done();
				});
		});
	});

	describe('DELETE', function() { 
		it('Remove user account', function (done) {
			
			var putUrl = '/api/user/558a98f7f59962b35d000002';

			request(url)
				.delete(putUrl)
				.end(function (err, res) {
					if (err) throw err;

					res.should.have.property('status', 200);
					done();
				});
		});
	});
});
