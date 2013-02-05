/*
 * GET users listing.
 */
var models = require('../models');
var User = models.User;

//remains from default express install
exports.list = function(req, res) {
	res.send("respond with a resource");
};

//render login form
exports.login = function(req, res) {
	res.render('login', {
		title: 'Login to Twittur'
	});
};

//login or create user
exports.create = function(req, res) {
	User.find({name : req.body.name}).exec(function(err, db_user) {

		console.log(req.body);

		if (db_user.length == 1) {
			req.session.user = db_user[0].name;
			console.log(db_user.name);
			res.redirect('/home');
		}

		else if (!db_user.length) {
			var user = new User({name: req.body.name});
			user.save(function(err) {
				if(err) {
					console.log("Error: ", err);
				}
				req.session.user = user.name;
				console.log(user.name);
				res.redirect('/home');
			});
		}

		else {
			res.send("Twittur is currently experiencing issues.");
		}
	});
};

