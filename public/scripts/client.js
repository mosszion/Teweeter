/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {

////////////////////////////////////////////////////////////////////////
// function createTweetElement
////////////////////////////////////////////////////////////////////////  
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
    <span ><img src="${safeContent.avatar}" class="avatar"></span>
    <span class="username">${safeContent.name}</span>
    </div>
    <div>
    <span class="handle">${safeContent.handle}</span>
    </div>
    </header>
    
    <p>
    ${safeContent.text}
    </p>
    
    <footer >
    <div class="line"></div>
    <div class="day-icon">
    <div class="days">
    <span>${safeContent.created_at}</span>
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

////////////////////////////////////////////////////////////////////////
// function renderTweets 
//create renderTweets function
//loops through a list of tweets
//calls createTweetElement for each tweet
//takes return value and appends to the tweets container
////////////////////////////////////////////////////////////////////////  

  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    //looping through list of tweets
    for(let tweet of tweets) {
       const value = createTweetElement(tweet)
       $('#tweets-container').prepend(value);
    }

}

////////////////////////////////////////////////////////////////////////
// form submission using ajax
////////////////////////////////////////////////////////////////////////  

$("#form").submit(function(event) {
  console.log( "Handler called." );
  event.preventDefault();

   // Get the tweet text from the textarea
   const tweetText = $('#tweet-text').val().trim();

   // Check if the tweet text is empty or exceeds the character limit
   if (tweetText === '' || tweetText === null) {
       alert('Please enter a tweet.');
   } else if (tweetText.length > 140) {
       alert('Tweet exceeds 140 characters.');
   } else {
     // If tweet is valid, submit the form
    //  this.submit();
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
           //remove the text from the text area
           $('#tweet-text').val('');

          },
          error: function(xhr, status, error) {
            // Handle error
            console.error('Error submitting form data:', error);
          }
        });
        }
  
  

        
      })
      
      
      ////////////////////////////////////////////////////////////////////////
      // fetching tweets using ajax
      ////////////////////////////////////////////////////////////////////////  
      
      const loadTweets = () => {
        $.ajax({
          type: 'GET',
          url: '/tweets',
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
      
      loadTweets()
    });
    
    
