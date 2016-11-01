"use strict";

var _rawTweetCorpus = require("./data/rawTweetCorpus.js");

var _rawTweetCorpus2 = _interopRequireDefault(_rawTweetCorpus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require("fs");

var corpusSplit = _rawTweetCorpus2.default.split(" ");

var wordDic = {};
console.log("creating word frequency dictionary..");
for (var word in corpusSplit) {
    var currWord = corpusSplit[word];

    if (!(currWord in wordDic)) {
        wordDic[currWord] = 1;
        // console.log("doesn't exist! " + currWord + " Added!");
    } else {
        // console.log("exists! +1 to " + currWord + ", now " + wordDic[currWord] + " occurrences!");
        wordDic[currWord] = wordDic[currWord] + 1;
    }
}

var sortedDic = [];
for (var _word in wordDic) {
    sortedDic.push([_word, wordDic[_word]]);
    sortedDic.sort(function (a, b) {
        return b[1] - a[1];
    });
}

// console.log("word frequency dictionary finished, onwards to sorting");
//
// let sortedWordDic = wordDic.sort(function(a, b) {
//     return wordDic[a] - wordDic[b]
// });

// console.log(sortedWordDic);
fs.writeFile("./sortedOccurrence.js", JSON.stringify(sortedDic));