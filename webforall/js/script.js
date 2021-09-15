$(document).ready(function(){
	var classes = ["white-text", "small-line-height", "hard-of-hearing", "none-style"];

	$(".artwork-content").each(function(){
		$(this).addClass(classes[~~(Math.random()*classes.length)]);
	});
});

