"use strict";
import realTweetArray from "./data/realTweets";
let MarkovChain = require('markovchain');
//Only for text file generation
// let fs = require('fs');


// ----------------------------------------------------------------------------------------
// Markov Chain Trump tweet generator

// Generate the raw REAL tweets file. Only needs to happen once.
// for (let i = 0; i < realTweetArray.length; i++) {
//     const tweet = realTweetArray[i].text;
//     fs.appendFile("realTweetsRaw.txt", tweet);
// }

//Create a fake tweet.

const CreateFakeTweet = () => {

    const randFirstWord = () => {
        const firstWords = ["The", "I", "If", "thank", "you", "America"];
        return firstWords[Math.floor(Math.random() * firstWords.length)];
    }

    const randSentenceLength = () => {
        return Math.floor(Math.random() * 20) + 7;
    }

    let rawTweetsMarkov = new MarkovChain(fs.readFileSync('./data/realTweetsRaw.txt', 'utf8'));
    const tweet = rawTweetsMarkov.start(randFirstWord()).end(randSentenceLength()).process();
    console.log(tweet);
}

export default CreateFakeTweet;
