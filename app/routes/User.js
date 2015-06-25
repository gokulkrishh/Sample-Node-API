/*
	ROUTES FOR THE API's
--------------------------------------------------------*/
var User = require('../models/User');

var setup = function (router) {

	router.use(function (req, res, next) {
		console.log('\n User requested ----->', req.headers.host);
		next(); //Move to next routes
	});	

	//Default page route setup
	router.get('/', function (req, res) {
		res.json({
			message : 'Welcome to the API'
		});
	});

	/*
		API METHODS DEFAULT

		## PATH: /api
		
		GET  : /<route> - To get all users
		POST : /<route> - To create a new user

			
		## PATH: /api/<route>/:id

		GET  		: /<route>/:id - To get particular user 
		PUT  		: /<route>/:id - To udpate particular user record
		DELETE  : /<route>/:id - To delete particular user record

	------------------------------------------------------------*/
	/*
		USER SIGNUP/LOGIN
	------------------------------------------------------------*/

	router.route('/user')

		.get(function (req, res) {
			User.find(function (err, users) {
				if (err) res.send(err);

				if (users.length !== 0) {
					//TODO: Send only firstname, lastname, email, role 
					res.status(200).json(users);	
				}
				else {
					status(404).json({
						message: 'No record is found.'
					});
				}				
			});
		})

		.post(function (req, res) {

			var user = new User();

			user.firstName 	= req.body.firstName
			user.lastName 	= req.body.lastName
			user.email 			= req.body.email
			user.password 	= req.body.password

			//If user email already exits or not
			User.find({ email: req.body.email }, function (err, isUser) {
				if (err) throw err;

				//If user is not present create, else return err
				if (isUser.length === 0) {
					user.save(function (err) {
						if (err) res.send(err);
					
						res.status(201).json({
							message : 'Account is created.' 
						});
					});
				}
				else {
					res.status(422).json({
						message : 'Account already exist.'
					});
				}
			});
		});


	router.route('/user/:id')

		.get(function (req, res) {	
			User.findById(req.params.id, function (err, user) {
				if (err) res.send(err);
        

				if (user === null) {
					res.json({
						message : 'User doesn\'t exit.'
					});
				}

				res.status(200).json(user);
			});
		})

		.put(function (req, res) {	
			var email = req.body.email;

			//TODO: Update all fields except password for change password API
			var updateUser = { 
				email: email
			};

			User.findByIdAndUpdate(req.params.id, updateUser, function (err, user) {
				if (err) res.send(err);

				res.status(200).json({
					message : 'Updated successfully.',
					data: user
				})
			});
		})

		.delete(function (req, res) {	
			User.remove({
				_id: req.params.id
			}, function (err, req) {
				if (err) res.send(err);

				res.status(200).json({ message : 'Account is deleted successfully.' });
			});
		});	

};

exports.setup = setup;