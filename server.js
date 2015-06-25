/*
	SERVER SETUP
--------------------------------------------------------*/

var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var routes = require('./app/routes/User');

//To parse POST req data
app.use(bodyParser.urlencoded({
	extended : true
}));

app.use(bodyParser.json()); //To handle POST req as JSON

//Register app to use '/api' as prefix for our routes
app.use('/api', router);

/*
	TO START SERVER
--------------------------------------------------------*/

var env = process.env.NODE_ENV || 'development';
var port = process.env.port || 4000; //If env port, else set default port as 4000

//Set up routes and then start the server
function startServer() {
	routes.setup(router); //Set the route
	app.listen(port); //Passing port for the server
	
	console.log('\n Server started \n   Mode: ' + env + ' \n   URL: localhost:' + port);
}

exports.startServer = startServer;