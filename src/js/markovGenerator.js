"use strict";
let corpus = require("./data/rawTweetCorpus.js");
let MarkovChain = require('markovchain');

const CreateFakeTweet = () => {
    //Creates a fake tweet.

    const randFirstWord = () => {
        const firstWords = ["The", "I", "If", "Thank", "You", "America"];
        // const firstWords = ["Hillary", "Crooked", "media", "CNN", "you", "fat"];
        return firstWords[Math.floor(Math.random() * firstWords.length)];
    }

    const randSentenceLength = () => {
        return Math.floor(Math.random() * 30) + 20;
    }

    const rawTweetsMarkov = new MarkovChain(corpus.default);
    const tweet = rawTweetsMarkov.start(randFirstWord()).end(randSentenceLength()).process();
    return {text: tweet, isReal: false};
}

//test
exports.default = CreateFakeTweet;
