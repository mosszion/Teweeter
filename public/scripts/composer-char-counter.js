$(document).ready(function() {

  $("#tweetText").on("keyup", function() {
  let noChar = $(this).val().length;
   let updatedNo = 140 - noChar;
   if (updatedNo < 0) {

     $(".counter").text(updatedNo).addClass("belowZero") ;
   } else {

     $(".counter").text(updatedNo).removeClass("belowZero") ;
   }
  
});


});