"use strict";
import corpus from "./rawTweetCorpus.js";
const fs = require("fs");

fs.writeFile("./src/server/strippedTweets.js", "")

let corpusSplit = corpus.split(" ");

const urlStripper = (word) => {
  return word.indexOf("http") === -1;
}


let newCorpus = corpusSplit.filter(urlStripper).join(" ");

fs.writeFile("./src/server/strippedTweets.js", JSON.stringify(newCorpus))
