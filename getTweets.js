var Twitter = require("twitter");
var fs = require("fs");

var client = new Twitter({
    consumer_key: 'aI7WyG0HgyN7iI9MCOcoqEAcU',
    consumer_secret: 'FOL4gGNzVh83Pvx4qpTAcoRxA7nxvb8chDbWfu3uWwMM5RBgDo',
    access_token_key: '286159351-SlSv4vcxJv55EVP1yWcoiYCI8iLbZrO5cJYCTONk',
    access_token_secret: 'bkFerMWK5MxTPSo5dq4TkVl1yhuOZoRRInYpk1Ax6vOsp'
});


let startParams = {
    screen_name: "realDonaldTrump",
    count: 200
}

let tweetArray = []
let textArray = []

const getTweets = (params) => {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) throw error;

        for (tweet in tweets) {
            tweetArray.push({
                text: tweets[tweet].text,
                id_str: tweets[tweet].id_str,
                id: tweets[tweet].id,
                isReal: true
            })
            textArray.push(tweets[tweet].text)
        }
        console.log(tweetArray.length)
        console.log(tweetArray[tweetArray.length - 1].id)
        // console.log(tweets);
        if (tweetArray.length < 3200) {
            const newParams = {
                screen_name: "realDonaldTrump",
                count: 200,
                max_id: tweetArray[tweetArray.length-1].id
            }
            getTweets(newParams);
        } else {

          //clean up source files for front-end tweet retrieval and raw corpus
          fs.writeFile('src/js/data/rawTweets.js', '');
          fs.writeFile('src/js/data/rawTweetCorpus.js', '');


          //for front-end
          fs.appendFile('src/js/data/rawTweets.js', 'var realTweetArray = ')
            fs.appendFile('src/js/data/rawTweets.js', JSON.stringify(tweetArray), (err) => {
                if (err) throw err;
                console.log("tweet saved!");
            })
          //for Markov corpus
          fs.writeFile('src/js/data/rawTweetCorpus.js', 'const corpus = ')
            fs.appendFile('src/js/data/rawTweetCorpus.js', textArray, (err) => {
                if (err) throw err;
                console.log("tweet saved!");
            })
            //remember to remove whitespace from text file at the end!
        }
    });
}

getTweets(startParams);




// console.log(response);
