var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');

var selectCommand = function(command, request) {
	switch(command) {
		case 'tweets':
			getTweets(request);
			break;
		case 'spotify-this-song':
			getSong(request);
			break;
		case 'movie-this':
			getMovie(request);
			break;
		case 'do-what-it-says':
			getRandom();
			break;
		default:
			console.log("That is not a valid command.");
			break;
	}
}

var getTweets = function(username) {
	console.log('twitter requested');

	var client = new Twitter (keys.twitterKeys)

	if (username == undefined) {
		username = 'realDonaldTrump';
	}

	var params = {screen_name: username};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (error){
			console.log(error);
		} else {
			for (var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].text);
				console.log(tweets[i].created_at);
				console.log();
			}
		}
	})
}

var getSong = function(songName) {
	console.log(songName + ' requested');
}

var getMovie = function(movieName) {
	console.log(movieName + ' requested');
}

var getRandom = function() {
	console.log('random requested');
}

selectCommand(process.argv[2], process.argv[3])