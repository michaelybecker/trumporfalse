"use strict";
import corpus from "./data/fakeTweets";
let MarkovChain = require('markovchain');
//Only for text file generation
let fs = require('fs');


// ----------------------------------------------------------------------------------------
// Markov Chain Trump tweet generator

// Generate the raw REAL tweets file. Only needs to happen once.
// for (let i = 0; i < realTweetArray.length; i++) {
//     const tweet = realTweetArray[i].text;
//     fs.appendFile("realTweetsRaw.js", tweet);
// }

// fs.readFile("realTweetsRaw.js", 'utf8', (err, data) => {
//   const formattedTweets = 'const corpus = "' + data.replace(/[^\x20-\x7E]/gmi, "").replace(/['"]+/g, '') + '"';
//   // JSON.parse(formattedTweets);
//   fs.writeFile("./data/fakeTweetsNew.js", formattedTweets);
//   console.log("done!");
// });


const CreateFakeTweet = () => {
    //Creates a fake tweet.

    const randFirstWord = () => {
        const firstWords = ["The", "I", "If", "thank", "you", "America"];
        return firstWords[Math.floor(Math.random() * firstWords.length)];
    }

    const randSentenceLength = () => {
        return Math.floor(Math.random() * 30) + 15;
    }

    let rawTweetsMarkov = new MarkovChain(corpus);
    const tweet = rawTweetsMarkov.start(randFirstWord()).end(randSentenceLength()).process();
    // console.log(tweet);

    return {text: tweet, isReal: false};
}
export default CreateFakeTweet;
