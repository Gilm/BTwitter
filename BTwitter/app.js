
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , mongo = require('mongodb')
  , mongoose = require('mongoose')
  , passport = require('passport')
  , database = require('./database');
//  , LocalStrategy = require('passport-local').Strategy; //niet helemaal begrepen

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

function User(name, password, emailAdress) {
	this.name = name;
	this.password = password;
	this.emailAdress = emailAdress;
};

//homepage
app.get('/', routes.index);
//
app.get('/newuser', function(req, res){
	  res.render('newuser', { title: 'Making an account' })});
app.post('/newuser',
exports.newuser = function AddUser(req, res){
					var name = req.username;
					var password = req.password;
					var cpassword = req.cpassword;
					var email = req.useremail;
					//making User object with info from url "/newuser"
					var userObject = User (name, password, email);
					if (password == cpassword) {
						database.addNewUser(userObject);
					} else { //error not matching password en terugkeren naar de /newuser
						res.send("Error password mismatching");
					}
					//debug
					console.log("User = %s email = %s Password = %s Password2 = %s ", name, email, password, cpassword);
	
})
//app.post('/adduser', routes.addUser(db));
// app.post('/login', routes.login);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
