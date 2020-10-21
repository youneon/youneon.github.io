(() => {

	function randNum() {
		var ALPHA = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9'];
		var rN='';
			for(var i=0; i < 5; i++) {
				var randTnum = Math.floor(Math.random()*ALPHA.length);
				rN += ALPHA[randTnum];
			}
			return rN;
		}
	// function makeid() {
	// 	var text = "";
	// 	var possible = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9'];
	// 			for( var i=0; i < 5; i++ ) {
	// 				text += possible.charAt(Math.floor(Math.random() * possible.length));
	// 			}
	// 			return text;		
	// 	}

	console.log(makeid);

})();