
		$(document).ready(function(){
		    var classes = ["invisible-style", "size-style", "all-style", "none-style"];

		    $("#text-wrap div.add-text-style").each(function(){
		        $(this).addClass(classes[~~(Math.random()*classes.length)]);
	    	});

	    	$(function(){
			$(".class-remove-btn").click(function(){
				$("div.add-text-style").addClass("show-all");
			});
})


	});
