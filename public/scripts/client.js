/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

const createTweetElement = function(tweet) {
  
  const postTime = timeago.format(tweet.created_at);//use imported timeago format for tweets post time
  
// use escape to prevent XSS-cross site scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str)); //add escape in textarea to prevent xss
    return div.innerHTML;  
  };

  //convert html to JQuary syntax
  const $tweet = `
  <article class="tweet-article">
        <header class="tweet-header">
            <div class="tweet-avatar-name">
              <a class="tweet-avatar"><img src="${tweet.user.avatars}"></a>
              <h5 class="avatar-name">${tweet.user.name}</h5>
            </div>
          <h5 class="userID">${tweet.user.handle}</h5>
        </header>
           <div class="tweet-post-container">
             <p class="tweet-post">
             ${escape(tweet.content.text)} 
             </p>
          </div>
        <footer class="tweet-footer">
          <p clas="timeago">${postTime}</p>
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



const renderTweets = function(tweets) {
  for (let eachTweet of tweets) { 
    const $tweet = createTweetElement(eachTweet);// create tweet element for each tweet in the array.
    // Load newest tweets first
    $("#tweets-container").prepend($tweet); // takes return value and appends it to the tweets container
  }
}


//loadTweets is responsible for fetching tweets from the http://localhost:8080/tweets page
//so we can remove hard coded tweet obj
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

loadTweets();


//add an event listener that listens for the submit event
$("#submit-tweet").submit((event) => { 

  event.preventDefault();//prevent the default behaviour of the submit event (data submission and page refresh)

  const $serializedData = $("#tweet-text").serialize();//.serialize() function turns a set of form data into a query string
  const $tweetInput = $("#tweet-text").val();

  if ($tweetInput === '') {
    $(".error-text").slideDown();
    $(".error-text span").text("Say something! Pls say something! Thank you!");
  } else if ($tweetInput.length > 140) {
    $("#tweet-text").val(""); // empty textarea if triggers error msg
    $(".counter").val(140);//refresh count number back to 140
    $(".error-text").slideDown(); //slidedown animation
    $(".error-text span").text("Too long. Pls rspct our abitrary limit of 140 chars! Thank You!");
  } else {
    $.ajax("/tweets", { //create an AJAX POST request in client.js that sends the form data to the server.
      type: "POST",
      data: $serializedData,
    })
    .then(() => {
      $("#tweet-text").val(""); // then empty the tweet textarea
      $(".counter").val(140);
      $("#tweet-text").focus(); // then refocus on textarea
      loadTweets(); // refetch tweet on submission/load tweets without refresh page
    })
    .catch(error => {
      console.log(error);
    });
  }
  $('.error-text').slideUp(3000);//slideup after slidedown;
 
});

});


