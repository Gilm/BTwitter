
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.newUser = function(req, res){
	  res.render('newuser', { title: 'Making an account' });
};

exports.addUser = function(req, res) {

        var userName = req.body.username;
        var userEmail = req.body.useremail;
        var password = req.body.password;
        var confirmPassword = req.body.cpassword;
        var user = User(userName, password, userEmail);
        
        if (password == confirmPassword) {
        	database.addNewUser(user);
        } else { //error not matching password en terugkeren naar de /newuser
        	
        }

        var collection = db.get('usercollection');

        // toevoegen aan de database
        collection.insert({
            "username" : userName,
            "email" : userEmail,
            "password": password
        }, function (err, doc) {
            if (err) {
                // Indien het niet gebeurt
                res.send("There was a problem adding the information to the database.");
            }
            else {
                res.location("userlist");
                // And forward to success page
                res.redirect("index");
            }
        });

    }

exports.login = function(req, res){
	res.render('loging', { title: 'Log in' });
}