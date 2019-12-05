# LIRI-Bot

## Technologies Used

1. Javascript
2. Node JS
3. Axios
4. NPM
5. Git Bash

## Program Description

This is a node program that takes in four possible commands and a search term. It then displays pertinent results based on 
those commands.  

![concert-this](https://github.com/easternlai/LIRI-Bot/blob/master/img/concertthis.JPG)

![movie-this](https://github.com/easternlai/LIRI-Bot/blob/master/img/moviethis.JPG)

![spotify-this](https://github.com/easternlai/LIRI-Bot/blob/master/img/spotify.JPG)

![do-what-it-says](https://github.com/easternlai/LIRI-Bot/blob/master/img/dowhat.JPG)

The last command, "do what it says", actually reads the command and search term from a text file.  Here is the code used to do that.

```
            fs.readFile("random.txt", "utf8", function(error, data){
                if(error){
                     console.log(data);
                }
                var termItems = data.split(",");
                command = termItems[0];
                term = termItems[1];
                processArg();
            });
```
