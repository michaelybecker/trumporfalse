// ----------------------------------------------------------------------------------------
// Markov Chain Trump tweet generator

//Only for text file generation
let fs = require('fs');

// Generate the raw REAL tweets file. Only needs to happen once.
for (let i = 0; i < realTweetArray.length; i++) {
    const tweet = realTweetArray[i].text;
    fs.appendFile("realTweetsRaw.js", tweet);
}

fs.readFile("realTweetsRaw.js", 'utf8', (err, data) => {
    const formattedTweets = 'const corpus = "' + data.replace(/[^\x20-\x7E]/gmi, "").replace(/['"]+/g, '') + '"';
    fs.writeFile("./data/fakeTweets.js", formattedTweets);
    console.log("done!");
});
