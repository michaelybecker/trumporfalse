"use strict";

// ----------------------------------------------------------------------------------------
// Markov Chain Trump tweet generator

//Only for text file generation
var fs = require('fs');

// Generate the raw REAL tweets file. Only needs to happen once.
for (var i = 0; i < realTweetArray.length; i++) {
    var tweet = realTweetArray[i].text;
    fs.appendFile("realTweetsRaw.js", tweet);
}

fs.readFile("realTweetsRaw.js", 'utf8', function (err, data) {
    var formattedTweets = 'const corpus = "' + data.replace(/[^\x20-\x7E]/gmi, "").replace(/['"]+/g, '') + '"';
    fs.writeFile("./data/fakeTweets.js", formattedTweets);
    console.log("done!");
});