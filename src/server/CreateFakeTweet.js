"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var corpus = require("./strippedTweets.js");
import realTweetArray from "./rawTweets";
var MarkovChain = require('markovchain');
var _ = require("underscore")

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

var ranNum = function(max) {
  return Math.floor(Math.random() * max)
}

var CreateFakeTweet = function() {
    //Creates a fake tweet.

    var randFirstWord = function() {
        var firstWords = ["The", "I", "If", "thank", "you", "America"];
        // const firstWords = ["Hillary", "Crooked", "media", "CNN", "you", "fat"];
        return firstWords[Math.floor(Math.random() * firstWords.length)];
    };

    var randSentenceLength = function() {
        return Math.floor(Math.random() * 15) + 5;
    };

    var rawTweetsMarkov = new MarkovChain(corpus.default);
    var tweet = rawTweetsMarkov.start(randFirstWord()).end(randSentenceLength()).process().capitalize();

    return _.shuffle([
      realTweetArray[ranNum(3200)],
      { text: tweet, isReal: false }
    ]);
};

//test
exports.default = CreateFakeTweet;
