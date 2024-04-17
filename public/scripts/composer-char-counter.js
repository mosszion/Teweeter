$(document).ready(function() {

  $("#tweet-text").on("input", function() {
  let noChar = $(this).val().length;
   let updatedNo = 140 - noChar;
   if (updatedNo < 0) {

     $(".counter").text(updatedNo).css("color","red") ;
   } else {

     $(".counter").text(updatedNo) ;
   }
  
});


});