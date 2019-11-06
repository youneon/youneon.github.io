$(function(){
    $(".bar").hover(function(){
      $(this).addClass("tilted");
  
    });
    $(".bar").mouseout(function(){
      $(this).removeClass("tilted");
  
    });
  
  });