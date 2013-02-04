var models = require('../models');
var User = models.User;
var Tweet = models.Tweet;


Array.prototype.sortByProp = function(p){
	return this.sort(function(a,b){
		return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
	});
};

exports.home_page = function(req, res) {
	Tweet.find({}).exec(function (err, db_tweets) {
		if (err) {
			console.log("Error: " + err);
		}
		else {
			db_tweets.sortByProp('datetime');
			res.render('home', {title: 'Crappy Twitter', tweets: db_tweets});
		}
	});
};

exports.create_tweet = function(req, res) {
	console.log(req.session.user);
	if (req.body.message.length <= 140) {
		var tweet = new Tweet({ message: req.body.message, datetime:req.body.datetime, user: req.session.user });
		tweet.save(function (err) {
			if (err) {
				console.log("Error: " + err);
			}
		});
	}
	else {
		res.send("Please limit tweets to less than 140 characters.");
	}
};

exports.refresh = function(req, res) {
	Tweet.find({}).exec(function (err, db_tweets) {
		if (err) {
			console.log("Error: " + err);
		}
		else {
			db_tweets.sortByProp('datetime');
			res.render('tweet_div', {tweets: db_tweets});
		}
	});
};