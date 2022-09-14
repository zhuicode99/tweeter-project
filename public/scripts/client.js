/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Fake data taken from initial-tweets.json

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(() => {

const createTweetElement = function(tweet) {
  const $tweet = `
  <article class="tweet-article">
        <header class="tweet-header">
            <div class="tweet-avatar-name">
              <div class="tweet-avatar">
                <a class="avatar-img"><img src="${tweet.user.avatars}"></a>
              </div>
              <h5 class="avatar-name">${tweet.user.name}</h5>
            </div>
          <h5 class="userID">${tweet.user.handle}</h5>
        </header>
           <div class="tweet-post-container">
             <p class="tweet-post">
             ${tweet.content.text}
             </p>
          </div>
        <footer class="tweet-footer">
          <p clas="time">${tweet.created_at}</p>
            <div class='icons'>
              <div class="icon1">
                <i class="fa-xs fa-sharp fa-solid fa-flag"></i>
              </div>
              <div class="icon2">
                  <i class="fa-xs fa-solid fa-retweet"></i>
              </div>
              <div class="icon3">
                  <i class="fa-xs fa-solid fa-heart"></i>
              </div>
            </div>  
        </footer>
    </article>
  `;

  return $tweet;
}
/* 
const $tweet = createTweetElement(tweetData);
$('#tweets-container').append($tweet);  */


const renderTweets = function(tweets) {
  // empty/reset the section before loading tweets
  $("#tweet-container").empty();
  for (let eachTweet of tweets) { 
    const $tweet = createTweetElement(eachTweet);// create tweet element for each tweet in the array.
    // Load newest tweets first
    $("#tweets-container").prepend($tweet);
  }


// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
}

renderTweets(data);


});


