require("dotenv").config();

var keys = require("./keys.js");

// var spotify = new spotify(key.spotify);

var action = process.argv[2];
var search = process.argv[3];

switch (action) {
    case "concert-this":
        console.log("Concert Test");
        break;

    case "spotify-this-song":
        console.log("Spotify Test");
        break;

    case "movie-this":
        console.log("Movie Test");
        break;

    case "do-what-it-says":
        console.log("Bossy Test");
        break;

    default:
        break;

}