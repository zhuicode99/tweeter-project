/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Fake data taken from initial-tweets.json

/* const data = [
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
] */
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
          <p clas="timeago">${tweet.created_at}</p>
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
    $("#tweets-container").prepend($tweet); // takes return value and appends it to the tweets container
  }
}

/* renderTweets(data); */

const loadTweets = () => {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: 'json',
    success: (data) => {
      console.log(data);
      renderTweets(data);
    },
    error: (error) => {
      console.error(error);
    }
  });
};


//loadTweets is responsible for fetching tweets from the http://localhost:8080/tweets page
//so we can remove hard coded tweet obj
loadTweets();

  $("#submit-tweet").submit((event) => { //add an event listener that listens for the submit event

  event.preventDefault();//prevent the default behaviour of the submit event (data submission and page refresh)

  const $serializedData = $("#tweet-text").serialize();//.serialize() function turns a set of form data into a query string
  
  const $tweetInput = $("#tweet-text").val();

  if ($tweetInput === null) {
    alert('tweets must contain at least one character!')
  } else if ($tweetInput.length > 140) {
    alert('tweets must be 140 character or fewer!')
  } else {
    $.ajax("/tweets", { //create an AJAX POST request in client.js that sends the form data to the server.
      type: "POST",
      data: $serializedData,
    })
    .then(() => {
      loadTweets(); // load tweets without refresh page
    })
    .catch(error => {
      console.log(error);
    });
  }
 
});

});
/* //event default prevent
$( "a" ).click(function( event ) {
  event.preventDefault();
  $( "<div>" )
    .append( "default " + event.type + " prevented" )
    .appendTo( "#log" );
}); */




{/* <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script>
$(function() {
  const $button = $('#load-more-posts');
  $button.on('click', function () {
    console.log('Button clicked, performing ajax call...');
    $.ajax('more-posts.html', { method: 'GET' })
    .then(function (morePostsHtml) {
      console.log('Success: ', morePostsHtml);
      $button.replaceWith(morePostsHtml);
    });
  });
});
</script> */}