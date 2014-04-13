/**
 * 
 */

var express = require('express')
	, mongo = require('mongodb')
	, mongoose = require('mongoose')
	, ID = 1;

//werkt
function newID() {
	var id = ID;
	ID = ID + 1;
	return id;
}

mongoose.connect('mongodb://localhost/data', function(err) {
	  if (err) { throw err; }
	});

var userSchema = new mongoose.Schema({
	id : Number, 
	name : String,
	password :	String,
	emailAdress : String
});

var userModel = mongoose.model('user', userSchema);

exports.addNewUser = function (newUser) {
	var name = newUser.name();
	var password = newUser.password();
	var email = newUser.email();
	var user = new userModel({ name : name });
	user.id = newID();
	user.password = password;
	user.emailAdress = email;
	user.save(function (err) {
		if (err) { throw err; }
		console.log('Insert with success');
	});
};
