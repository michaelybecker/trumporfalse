"use strict";

var _rawTweets = require("./rawTweets");

var _rawTweets2 = _interopRequireDefault(_rawTweets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
    value: true
});

var corpus = require("./strippedTweets.js");

var MarkovChain = require('markovchain');
var _ = require("underscore");

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

var ranNum = function ranNum(max) {
    return Math.floor(Math.random() * max);
};

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
    var tweet = rawTweetsMarkov.start(randFirstWord()).end(randSentenceLength()).process().capitalize();

    return _.shuffle([_rawTweets2.default[ranNum(3200)], { text: tweet, isReal: false }]);
};

//test
exports.default = CreateFakeTweet;