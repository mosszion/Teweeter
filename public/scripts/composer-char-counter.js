$(document).ready(function() {

  $("#tweet-text").on("input", function() {
  let noChar = $(this).val().length;
   let updatedNo = 140 - noChar;
   if (updatedNo < 0) {

     $(".counter").text(updatedNo).addClass("below-zero") ;
   } else {

     $(".counter").text(updatedNo).removeClass("below-zero") ;
   }
  
});


});