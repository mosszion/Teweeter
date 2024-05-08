$(document).ready(function() {

  $("#tweetText").on("keydown", function() {
  let noChar = $(this).val().length;
   let updatedNo = 140 - noChar;
   if (updatedNo < 0) {

     $(".counter").text(updatedNo).addClass("belowZero") ;
   } else {

     $(".counter").text(updatedNo).removeClass("belowZero") ;
    } 
  
   
});
$("#tButton").on("click", function() {
let updatedNo = 140;
 $(".counter").text(updatedNo);
});
  


});