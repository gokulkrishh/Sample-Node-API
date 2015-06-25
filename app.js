
var mongoose = require('mongoose'); //ORM to connect with mongodb
var server = require('./server');
var config = require('./config');

/*
	DB CONNECTION ESTABLISHMENT & STARTING SERVER
--------------------------------------------------------*/

mongoose.connect(config.db.mongodb , function (err) {
	if (err) throw err;

	console.log('\n Successfully connected to MongoDB....');
});

server.startServer(); //After DB connection, start the server