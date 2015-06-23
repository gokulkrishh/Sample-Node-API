/*
	SERVER SETUP & CONFIGS
========================================================*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//To parse POST req data
app.use(bodyParser.urlencoded({
	extended : true
}));

app.use(bodyParser.json());

var port = process.env.port || 4000; //If env port present take it, else set port as 4000

/*
	ROUTES FOR THE API's
========================================================*/

var router = express.Router();

router.use(function (req, res, next) {

	console.log('User requested ----->', req.headers.host);

	next(); //Move to next routes
})

//Default page route setup
router.get('/', function (req, res) {
	res.json({
		message : 'Welcome to the API'
	});
});

router.route('/sample')
	
	//To get all records in sample
	.get(function (req, res) {
		Sample.find(function (err, sample) {
			if (err) res.send(err); //If no records, send a err

			res.json(sample); //If records found send it
		})
	})

	//To create a new record in sample
	.post(function (req, res) {
		var sample = new Sample(); //Creating new instance for sample model
		
		sample.name = req.body.name; //Set the sample name  

		//Save and check for errors
		sample.save(function (err) {
			if (err) res.send(err);

			res.json({
				message : 'Created.......' 
			});
		});
	});

router.route('/sample/:id')

	.get(function (req, res) {	
		Sample.findById(req.params.id, function (err, sample) {
			if (err) res.json({
				message: 'ID not found',
				err: err
			});

			res.json(sample);
		})
	})


	.put(function (req, res) {	
		Sample.findById(req.params.id, function (err, sample) {
			if (err) res.json({
				message: 'ID not found',
				err: err
			});

			sample.name = req.body.name; //Set the sample name  

			//Save and check for errors
			sample.save(function (err) {
				if (err) res.send(err);

				res.json({
					message : 'Updated.......' 
				});
			});
		})
	})

	.delete(function (req, res) {	
		Sample.remove({
			_id: req.params.id
		}, function (err, req) {
			if (err) res.send(err);

			res.json({ message : 'Deleted successfully' });
		});
	});



//Register app to use '/api' as prefix for our routes
app.use('/api', router);

/*
	START SERVER
========================================================*/

app.listen(port); //Passing port for the server

console.log('Server started ------->', port);

/*
	DB CONNECTION ESTABLISHMENT
========================================================*/

var mongoose = require('mongoose'); //ORM to connect with mongodb

var uri = 'mongodb://test:test@ds061158.mongolab.com:61158/gokulkrishhtest'; //Mongodb uri

mongoose.connect(uri); //Connect to remote database


//Get model
var Sample = require('./app/models/sample');
