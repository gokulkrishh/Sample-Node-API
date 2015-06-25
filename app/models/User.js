var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;

var schema = new Schema({
	firstName: String,
	lastName: String,
	email: { 
		type: String,
		unique: true
	},
	password: String
});

//TODO 1: Create UID, Role, Password reset token, Password reset expiration, Email confirmation, Password Hash, User active record

//TODO 2: Create pre method to store date on which user is created



module.exports = mongoose.model('user', schema);