$(function(){
  $(".block").hover(function(){
    $(this).addClass("off");

  });
  $(".block").mouseout(function(){
    $(this).removeClass("off");

  });

});


$(document).ready(function() {
  // $('.block').bind('touchstart', function(e) {
  //     e.preventDefault();
  //     var touches = e.changedTouches;

  //   for (var i = 0; i < touches.length; i++) {
  //       $(this).toggleClass('off');
  //   }
  // });


  $('.block').bind('touchmove', function(e) {
    //e.preventDefault();
    var touches = e.changedTouches;

    for (var i = 0; i < touches.length; i++) {
      e.preventDefault();
        $(this).toggleClass('off');
    }
  });

});