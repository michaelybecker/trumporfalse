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
                isReal: true
            })
            textArray.push(tweets[tweet].text)
        }
        console.log(tweetArray.length)
        console.log(tweetArray[tweetArray.length - 1].id)
        if (tweetArray.length < 3200) {
            const newParams = {
                screen_name: "realDonaldTrump",
                count: 200,
                max_id: tweetArray[tweetArray.length - 1].id_str
            }
            getTweets(newParams);
        } else {
            fs.appendFile('src/js/realTweets.js', JSON.stringify(tweetArray), (err) => {
                if (err) throw err;
                console.log("tweet saved!");
            })
            fs.appendFile('rawTweetText.txt', textArray, (err) => {
                if (err) throw err;
                console.log("tweet saved!");
            })
        }
    });
}

getTweets(startParams);




// console.log(response);
