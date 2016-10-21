"use strict";
import corpus from "./data/rawTweetCorpus.js";
const fs = require("fs");

let corpusSplit = corpus.split(" ");

let sorted = corpusSplit.filter((key, idx) => corpusSplit.lastIndexOf(key) === idx).sort((a, b) => a < b ? -1 : 1);
fs.writeFile("./sortedOccurrence.js", sorted);
console.log("donezo!");
// let wordDic = {};
// console.log("creating word frequency dictionary..");
// for (let word in corpusSplit) {
//     let currWord = corpusSplit[word];
//
//     if (!(currWord in wordDic)) {
//         wordDic[currWord] = 1;
//         // console.log("doesn't exist! " + currWord + " Added!");
//     } else {
//         // console.log("exists! +1 to " + currWord + ", now " + wordDic[currWord] + " occurrences!");
//         wordDic[currWord] = wordDic[currWord] + 1;
//     }
// }
// console.log("word frequency dictionary finished, onwards to sorting");
//
// let sortedWordDic = wordDic.sort(function(a, b) {
//     return wordDic[a] - wordDic[b]
// });

// console.log(sortedWordDic);
