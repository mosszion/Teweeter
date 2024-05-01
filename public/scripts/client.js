/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {

//   // Test / driver code (temporary). Eventually will get this from the server.
// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//   "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//   "created_at": 1461116232227
// }
// Fake data taken from initial-tweets.json
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

//create renderTweets function
//loops through a list of tweets
//calls createTweetElement for each tweet
//takes return value and appends to the tweets container
  const renderTweets = function(tweets) {
    //looping through list of tweets
    for(let tweet of tweets) {
       const value = createTweetElement(tweet)
       $('#tweets-container').prepend(value);
    }
    

}

// const createTweetElement = function (obj) {
//   return 
// }

function createTweetElement(tweet) {
   // Sanitize user input
   function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// Escape user input before constructing HTML
const safeContent = {
    avatar: escape(tweet.user.avatars),
    name: escape(tweet.user.name),
    handle: escape(tweet.user.handle),
    text: escape(tweet.content.text),
    created_at: escape(timeago.format(tweet.created_at))
};
  // Create the article element for the tweet
  const $tweet = $('<article>').addClass('tweet');

  // Construct the HTML structure for the tweet
  const html = `
    <header>
       <div class="name-head">
          <span ><img src="${tweet.user.avatars}" class="avatar"></span>
          <span class="username">${tweet.user.name}</span>
       </div>
       <div>
            <span class="handle">${tweet.user.handle}</span>
       </div>
    </header>

    <p>
      ${tweet.content.text}
    </p>
    
    <footer >
            <div class="line"></div>
            <div class="day-icon">
              <div class="days">
                <span>${timeago.format(tweet.created_at)}</span>
              </div>
              <div class="icons">
               
                <i class="fa-solid fa-flag"></i>
                <i class="fa-solid fa-retweet" ></i>
                <i class="fa-solid fa-heart" ></i>


              </div>
            </div>


          </footer>
  `;

  // Set the HTML content of the tweet article
  $tweet.html(html);

  // Return the created tweet article element
  return $tweet;
}

// const $tweets = renderTweets(data);
// // const $tweet = createTweetElement(tweetData);

// // // Test / driver code (temporary)
// console.log($tweets); // to see what it looks like
//  // to add it to the page so we can make sure it's got all the right elements, classes, etc.

 //Handling the submit button
//  $( "#form" ).on( "submit", function( event ) {
//   console.log( "Handler called." );
//   event.preventDefault();
$("#form").submit(function(event) {
  console.log( "Handler called." );
  event.preventDefault();


  // Get form data
  const formData = $("#form").serialize();
  console.log(formData)

  // Create AJAX request
   // Submit POST request
   $.ajax({
    type: 'POST',
    url: '/tweets',
    data: formData,
    success: function(response) {
        // Handle success response
        console.log('Form data submitted successfully:', response);
        loadTweets()
      },
    error: function(xhr, status, error) {
        // Handle error
        console.error('Error submitting form data:', error);
    }
});


})

// fetching tweets using ajax

const loadTweets = function () {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/tweets',
    dataType:'json',
    success: function(response){
        // Display the fetched data in the data-container
        // $('#data-container').html(response);
        renderTweets(response)
    },
    error: function(xhr, status, error){
        // Handle errors
        console.error(xhr.responseText);
    }
});

};
//call the loadTweets function

// loadTweets()


});


