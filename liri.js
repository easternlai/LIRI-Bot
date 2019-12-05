require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var term = process.argv.slice(3).join(" ");

processArg();

function processArg (){
    switch(command){
        case "concert-this":
            axios
            .get("https://rest.bandsintown.com/artists/"+ term +"/events?app_id=codingbootcamp")
            .then(function(response) {
                // If the axios was successful...
                // Then log the body from the site!
                console.log("Band: ", term);
                console.log("Location: ",response.data[0].venue.name);
                console.log("Date: ", moment().format(response.data[0].datetime.slice(0, 10), "MM-DD-YYYY"));
            })
            .catch(function(error) {
                if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                // console.log(error.request);
                } else {
                // Something happened in setting up the request that triggered an Error
                // console.log("Error", error.message);
                }
                // console.log(error.config);
            });

            break;
        case "spotify-this-song":
            spotify
            .search({type: 'track', query: term})
            .then(function(response) {
                console.log(response.tracks.items);
            })
            .catch(function(err) {
                console.log(err);
            });
        
            break;
        case "movie-this":
            axios
            .get("http://http://www.omdbapi.com/?i=" + term + "&apikey=74a7aa11")
            .then(function(response) {
                // If the axios was successful...
                // Then log the body from the site!
                console.log(response.data);
            })
            .catch(function(error) {
                if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("test2");
                } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log("test3");
                } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
                }
                console.log("test4");
            });
        
            break;
        case "do-what-it-says":
            fs.readFile("random.txt", "utf8", function(error, data){
                if(error){
                    return console.log(data);
                }
                var text = data;
            });
            
            break;        

    }
}

