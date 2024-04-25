/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {

  // Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

// const createTweetElement = function (obj) {
//   return 
// }

function createTweetElement(tweet) {
  // Create the article element for the tweet
  const $tweet = $('<article>').addClass('tweet');

  // Construct the HTML structure for the tweet
  const html = `
    <header>
      <img src="${tweet.user.avatar}" class="avatar">
      <span class="username">${tweet.user.username}</span>
      <span class="handle">${tweet.user.handle}</span>
    </header>
    <div class="content">
      ${tweet.content}
    </div>
    <footer>
      <span class="timestamp">${tweet.timestamp}</span>
      <div class="actions">
        <!-- Add buttons for liking, retweeting, etc. -->
      </div>
    </footer>
  `;

  // Set the HTML content of the tweet article
  $tweet.html(html);

  // Return the created tweet article element
  return $tweet;
}

const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('article').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.


})
