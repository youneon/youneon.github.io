$(function(){
    $(".bar:hover").hover(function(){
      $(this).addClass("spin");
  
    });
    $(".bar:hover").mouseout(function(){
      $(this).removeClass("spin");
  
    });
  
  });