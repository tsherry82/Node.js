require("dotenv").config();

var axios = require('axios');

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

// function definitions

var action = process.argv[2];
var search = process.argv[3];

switch (action) {
    case "concert-this":
        concert();
        break;

    case "spotify-this-song":
        spotify();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        bossy();
        break;

    default:
        console.log("does not match any case")
        break;

}
// Find concerts using API

function concert() {
    var BandsURL = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp"

    axios.get(BandsURL)
        .then(function (response) {
            var data = response.data
            console.log(data)
            for (var i = 0; i < data.length; i++){
            console.log("Name of the venue: " + data[i].venue.name);
            console.log("City: " + data[i].venue.city);
            console.log("Time of event: " + data[i].datetime);
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

    console.log("concert", search)
}

function spotify() {

    spotify.search({ type: 'track', query: search })
        .then(function (response) {
        })
        .catch(function (err) {
            console.log(err);
        });
    console.log("spotify", search)
}

function movie() {
    var omdbURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + search;
    axios.get(omdbURL)
    .then(function (response){
        var movieData = response.data

        console.log("Title: " + movieData.Title);
        console.log("Year: " + movieData.Year);
        console.log("imdb Rating: " + movieData.imdbRating);
        console.log("Rotten Tomatoes Rating: " + movieData.Metascore);
        console.log("Country: " + movieData.Country);
        console.log("Language: " + movieData.Language);
        console.log("Plot: " + movieData.Plot);
        console.log("Actors: " + movieData.Actors);
    })
}

function bossy() {
    console.log("do what it says")
}