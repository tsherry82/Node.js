require("dotenv").config();
var fs = require("fs")

var axios = require('axios');

var keys = require("./keys.js");

var moment = require("moment");

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
        runSpotify(search);
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
// concert ====================================

function concert() {
    var BandsURL = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp"

    axios.get(BandsURL)
        .then(function (response) {
            var data = response.data
            for (var i = 0; i < data.length; i++) {
                console.log("\nName of the venue: " + data[i].venue.name);
                console.log("City: " + data[i].venue.city);
                var showTime = moment(data[i].datetime).format("MM/DD/YYYY");
                console.log("Time of event: " + showTime + "\n");
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

}
// spotify ============================================
function runSpotify(search) {
    spotify.search({ type: 'track', query: search, limit: 1 })
        .then(function (response) {
            var spotifyInfo = response.tracks.items
            // console.log(response.tracks.items)
            for (var i = 0; i < spotifyInfo.length; i++) {
                console.log("\nArtist: " + spotifyInfo[i].album.artists[0].name)
                console.log("Song Name: " + spotifyInfo[i].name)
                console.log("Preview Link: " + spotifyInfo[i].external_urls.spotify)
                console.log("Album: " + spotifyInfo[i].album.name + "\n")
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}
// omdb ==============================
function movie() {
    var omdbURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + search;
    axios.get(omdbURL)
        .then(function (response) {
            var movieData = response.data

            console.log("\nTitle: " + movieData.Title);
            console.log("Year: " + movieData.Year);
            console.log("imdb Rating: " + movieData.imdbRating);
            console.log("Rotten Tomatoes Rating: " + movieData.Metascore);
            console.log("Country: " + movieData.Country);
            console.log("Language: " + movieData.Language);
            console.log("Plot: " + movieData.Plot);
            console.log("Actors: " + movieData.Actors + "\n");
        })
}
// do-what-it-says =====================================
function bossy() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArray = data.split(",");

        action = dataArray[0];
        search = dataArray[1];
        console.log(action);
        console.log(search);

        runSpotify(search)
    })
}
