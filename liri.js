require("dotenv").config();
var axios = require('axios');

var keys = require("./keys.js");

var spotify = new spotify(keys.spotify);

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

function concert(){
   var BandsURL = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp"

   axios.get(BandsURL)
   .then(function (response) {
     // handle success
     console.log(response);
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

function spotify(){
    console.log("spotify", search)
}

function movie(){
    console.log("movie", search)  
} 

function bossy(){
    console.log("do what it says")
}