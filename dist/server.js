'use strict';

var express = require('express');
var path = require('path');
var app = express();
var markovGenerator = require("./markovGenerator");
// import CreateFakeTweet from "./markovGenerator";
var realTweetArray = require("./data/rawTweets");

app.use(express.static(path.join(__dirname)));

// Listen for requests
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Example app listening on port 3000!");
});

// console.log(markovGenerator.default());
app.get("/fakeTweet", function (req, res) {
  console.log("sending tweet! \n " + markovGenerator.default());
  res.send(markovGenerator.default());
});