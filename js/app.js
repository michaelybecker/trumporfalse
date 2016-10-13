
"use strict";
let MarkovChain = require('markovchain');
let fs = require('fs');


// ----------------------------------------------------------------------------------------
// Markov Chain Trump tweet generator

const createTweetsFile = (filename, tweetFile) => {

let mkchainTweets = new MarkovChain(fs.readFileSync(filename, 'utf8'));

const randFirstWord = () => {
    const firstWords = ["The", "I", "If", "thank", "you", "America"]
    return firstWords[Math.floor(Math.random() * firstWords.length)];
}

const randSentenceLength = () => {
  return Math.floor(Math.random() * 20) + 7;
}

let falseTweetArr = [];
fs.writeFile(tweetFile, '');

for (let i = 0; i < 1000; i++) {
  const tweet = mkchainTweets.start(randFirstWord()).end(randSentenceLength()).process();
  const tweetObject = {
    text: tweet,
    isReal: false
  }
falseTweetArr.push(JSON.stringify(tweetObject));
}

fs.appendFile(tweetFile, falseTweetArr + '\n', (err) => {
  if (err) throw err;
});

console.log("tweet saved!");

}

//generate the tweets file
createTweetsFile('./trump.txt', './results.txt');
