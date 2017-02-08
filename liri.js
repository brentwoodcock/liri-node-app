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

	var client = new Twitter (keys.twitterKeys)

	if (username === undefined) {
		username = 'realDonaldTrump';
	}

	var params = {screen_name: username};
	client.get('statuses/user_timeline', params, function(err, tweets, response) {
		if (err){
			console.log(err);
			return;
		}

		for (var i = 0; i < tweets.length; i++) {
			console.log(tweets[i].text);
			console.log(tweets[i].created_at);
			console.log();
		}
	})
}

var getSong = function(songName) {

	if (songName === undefined) {
		songName = 'The Sign';
	}

	spotify.search({ type: 'track', query: songName }, function(err, data) {
		if (err) {
			console.log(err);
			return;
		}

		var results = data.tracks.items;

		for (var i = 0; i < results.length; i++) {
			console.log('Result ' + (i + 1));
			console.log('Song Name: ' + results[i].name);
			console.log('Artist: ' + results[i].artists[0].name);
			console.log('Preview URL: ' + results[i].preview_url);
			console.log('Album: ' + results[i].album.name);
			console.log();
		}
	})
}

var getMovie = function(movieName) {

	if (movieName === undefined) {
		movieName = 'Mr Nobody';
	}

	request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&r=json", function(err, response, body) {
		if(err) {
			console.log(err);
			return;
		}

		body = JSON.parse(body);
		console.log('Title: ' + body.Title);
		console.log('Year: ' + body.Year);
		console.log('IMDB Rating: ' + body.imdbRating);
		console.log('Country: ' + body.Country);
		console.log('Language: ' + body.Language);
		console.log('Plot: ' + body.Plot);
		console.log('Actors: ' + body.Actors);
		console.log('Rotten Tomatoes Rating: ' + body.tomatoRating);
		console.log('Rotten Tomatoes URL: ' + body.tomatoURL);
	})
}

var getRandom = function() {
	console.log('random requested');
}

selectCommand(process.argv[2], process.argv[3])