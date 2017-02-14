"use strict";
import corpus from "./data/rawTweetCorpus.js";
const fs = require("fs");

let corpusSplit = corpus.split(" ");



let wordDic = {};
console.log("creating word frequency dictionary..");

// Populate word dictionary for Markov Chain
for (let word in corpusSplit) {
    let currWord = corpusSplit[word];

    if (!(currWord in wordDic)) {
        wordDic[currWord] = 1;
        // console.log("doesn't exist! " + currWord + " Added!");
    } else {
        // console.log("exists! +1 to " + currWord + ", now " + wordDic[currWord] + " occurrences!");
        wordDic[currWord] = wordDic[currWord] + 1;
    }
}

let sortedDic = [];
for (let word in wordDic) {
    sortedDic.push([word, wordDic[word]])
    sortedDic.sort(
        function(a, b) {
            return b[1] - a[1]
        }
    )
}

// console.log("word frequency dictionary finished, onwards to sorting");
//
// let sortedWordDic = wordDic.sort(function(a, b) {
//     return wordDic[a] - wordDic[b]
// });

// console.log(sortedWordDic);
fs.writeFile("./sortedOccurrence.js", JSON.stringify(sortedDic));
