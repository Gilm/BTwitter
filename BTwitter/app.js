
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongo = require('mongodb')
  , mongoose = require('mongoose')
  , passport = require('passport');
//  , LocalStrategy = require('passport-local').Strategy; //niet helemaal begrepen
//  , db = require('localhost:27017/data');

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

//mongo starten?

mongoose.connect('mongodb://localhost/data', function(err) {
	  if (err) { throw err; }
	});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/newuser', routes.newUser);
//app.post('/adduser', routes.addUser(db));
// app.post('/login', routes.login);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
