require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

var inquirer = require("inquirer");
var response = process.argv[2];

processAnswer();

function firstQuestion(){
    inquirer.prompt([
        {
        name: "question",
        message: "Enter a command"
        }
    ]).then(function(input){
        console.log(input.question);
        response = input.question;
        processAnswer();
        
    });
};

function processAnswer (){
    switch(response){
        case "concert-this":
            axios
            .get("https://rest.bandsintown.com/artists/queen/events?app_id=codingbootcamp")
            .then(function(response) {
                // If the axios was successful...
                // Then log the body from the site!
                console.log(response.data);
            })
            .catch(function(error) {
                if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
                } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
                }
                console.log(error.config);
            });

            break;
        case "spotify-this-song":
            console.log(response);
            spotify
            .search({ type: 'track', query: 'All the Small Things' })
            .then(function(response) {
                console.log(response);
            })
            .catch(function(err) {
                console.log(err);
            });
        
            break;
        case "movie-this":
            axios
            .get("http://http://www.omdbapi.com/?i=tt0485947&apikey=74a7aa11")
            .then(function(response) {
                // If the axios was successful...
                // Then log the body from the site!
                console.log("test");
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
                console.log(text);
            });
            
            break;        
        default:
            if(response!==undefined){
                console.log("incorrect syntax!");
            }
            firstQuestion();


    }
}

