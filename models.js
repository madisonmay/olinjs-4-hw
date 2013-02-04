var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/twittur');

var userSchema = mongoose.Schema({
	name: String
});

var User = mongoose.model('User', userSchema);

var tweetSchema = mongoose.Schema({
	message: String,
	datetime: Number,
	user: String
});

var Tweet = mongoose.model('Tweet', tweetSchema);

exports.User = User;
exports.Tweet = Tweet;