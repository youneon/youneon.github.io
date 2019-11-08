$(function(){
  $(".block").hover(function(){
    $(this).addClass("off");

  });
  $(".block").mouseout(function(){
    $(this).removeClass("off");

  });

});


$(document).ready(function() {
  $('.block').bind('touchstart touchend touchmove', function(e) {
      e.preventDefault();
      $(this).toggleClass('off');
  });
});
