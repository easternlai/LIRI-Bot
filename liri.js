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
            concertThis();
            break;
        case "spotify-this-song":
            spotifyThis (); 
        
            break;
        case "movie-this":
            movieThis();        
            break;
        case "do-what-it-says":
            fs.readFile("random.txt", "utf8", function(error, data){
                if(error){
                     console.log(data);
                }
                var termItems = data.split(",");
                command = termItems[0];
                term = termItems[1];
                processArg();
            });
            break;        
    }
}

function spotifyThis (){
spotify
        .search({type: 'track', query: term})
        .then(function(response) {
            console.log("Artist: ", response.tracks.items[0].artists[0].name);
            console.log("Song: ", response.tracks.items[0].name);
            console.log("Album: ", response.tracks.items[0].album.name);
        })
        .catch(function(err) {
            console.log(err);
        });
}

function concertThis(){
    axios
    .get("https://rest.bandsintown.com/artists/"+ term +"/events?app_id=codingbootcamp")
    .then(function(response) {

        console.log("Band: ", term);
        console.log("Location: ",response.data[0].venue.name);
        console.log("Date: ", moment().format(response.data[0].datetime.slice(0, 10), "MM-DD-YYYY"));
    })
    .catch(function(error) {
    
    });
}

function movieThis(){
    axios
            .get("https://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy")
            .then(function(response) {
                console.log("Title: ", response.data.Title);
                console.log("Year: ", response.data.Year);
                console.log("IMDB: ", response.data.imdbRating);
                console.log("Rotten: ", response.data.Ratings[1].Value);
                console.log("Langauge: ", response.data.Language);
                console.log("Plot: ", response.data.Plot);
                console.log(response.data.Actors);
            })
            .catch(function(error) {
                if (error.response) {

                } else if (error.request) {

                } else {

                console.log("Error", error.message);
                }

            });
}
