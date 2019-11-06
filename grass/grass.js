$(function(){
    $(".bar").hover(function(){
      $(this).addClass("touch-hover");
  
    });
    $(".bar").mouseout(function(){
      $(this).removeClass("touch-hover");
  
    });
  
  });