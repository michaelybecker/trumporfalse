// Website

var generateTweets = function() {

var chosenTweet = falseTweetArr[Math.floor(Math.random() * falseTweetArr.length)]
  document.getElementById('fake-tweet').innerText = chosenTweet;
}

window.onload = function(){
document.getElementById("generate-button").addEventListener('click', generateTweets);
}
