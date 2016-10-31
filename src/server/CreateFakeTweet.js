"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var corpus = require("./rawTweetCorpus.js");
import realTweetArray from "./rawTweets";
var MarkovChain = require('markovchain');
var _ = require("underscore")

var ranNum = function(max) {
  return Math.floor(Math.random() * max)
}

var CreateFakeTweet = function CreateFakeTweet() {
    //Creates a fake tweet.

    var randFirstWord = function randFirstWord() {
        var firstWords = ["The", "I", "If", "thank", "you", "America"];
        // const firstWords = ["Hillary", "Crooked", "media", "CNN", "you", "fat"];
        return firstWords[Math.floor(Math.random() * firstWords.length)];
    };

    var randSentenceLength = function randSentenceLength() {
        return Math.floor(Math.random() * 30) + 20;
    };

    var rawTweetsMarkov = new MarkovChain(corpus.default);
    var tweet = rawTweetsMarkov.start(randFirstWord()).end(randSentenceLength()).process();
    return _.shuffle([
      realTweetArray[ranNum(3200)],
      { text: tweet, isReal: false }
    ]);
};

//test
exports.default = CreateFakeTweet;
