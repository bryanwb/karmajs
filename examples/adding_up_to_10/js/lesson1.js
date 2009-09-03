$(document).ready(function(){

var k = $.karma ({container: "#karma-main"/*, lang: "es-MX"*/});
    k.init({
	images: [
	    {id: "ball",   file: "ball.png",   localized : false },
	    {id: "ballon", file: "ballon.png", localized : false },
	    {id: "banana", file: "banana.png", localized : false },
	    {id: "chilli", file: "chilli.png", localized : false },
	    {id: "fish"  , file: "fish.png",   localized : false },
	    {id: "flower", file: "flower.png", localized : false },
	    {id: "happyMonkey", file: "happyMonkey.jpg", localized : false },
	    {id: "scorebox", file: "scorebox.png", localized : false }
	]
	,
	sounds: [
	    {id: "correct",  file: "correct.ogg"   },
	    {id: "incorrect",file: "incorrect.ogg" }
	]
    });

    k.main(function() {
	var topLtCanvas = document.getElementById("topLtCanvas")
	var topLtCtx = topLtCanvas.getContext('2d');
	var topRtCanvas = document.getElementById("topRtCanvas")
	var topRtCtx = topRtCanvas.getContext('2d');

	var bottomLtCanvas = document.getElementById("bottomLtCanvas")
	var bottomLtCtx = bottomLtCanvas.getContext('2d');
	var bottomMdCanvas = document.getElementById("bottomMdCanvas")
	var bottomMdCtx = bottomMdCanvas.getContext('2d');
	var bottomRtCanvas = document.getElementById("bottomRtCanvas")
	var bottomRtCtx = bottomRtCanvas.getContext('2d');



	var actionContexts = [ topLtCtx, topRtCtx, bottomLtCtx, bottomMdCtx, bottomRtCtx];
	var actionCanvases = [ topLtCanvas, topRtCanvas, bottomLtCanvas, bottomMdCanvas, bottomRtCanvas];
	
	//    for (var i = 0; i < contexts.length; i++) {
	// 
	//	k.library.images["ball"].draw(contexts[i], 20, 30);
	//    }




	var imgNames = ["ball", "ballon", "banana", "chilli", "fish", "flower" ];
	//game logic
	var total, level=0, time, n0, n1, correct;
	var maskd=200;
	var d=140;
	var choices=[];
	var score = 0;
	var startTimerY = 105;
	var endTimerY = 205;
	var offsetTimerY = 20;
	var timerId;

	/*    var timerFn = function () {
	//gk.ctx.fillStyle = "#000";
      	//gk.ctx.fillRect(1000, startTimerY, 175, 20); 
	if ( startTimerY === endTimerY ){
	    //var audioElem = document.getElementById('correct');
	    //audioElem.play();
	    clearInterval(timerId)
	    score = score - 1;
	    //resetTimer();
	    game();
	} 
	else {
	    gk.ctx.fillStyle = "#000";
    	    gk.ctx.fillRect(1000, startTimerY, 175, offsetTimerY);
	    gk.ctx.fillStyle = "#fff";
	    startTimerY = startTimerY + offsetTimerY;
    	    gk.ctx.fillRect(1000, startTimerY, 175, offsetTimerY);
	}
    };

    var resetTimer = function () {
	gk.ctx.fillStyle = "#000";
    	gk.ctx.fillRect(1000, startTimerY, 175, offsetTimerY);
	startTimerY = 105;
	gk.ctx.fillStyle = "#fff";
	gk.ctx.fillRect(1000, startTimerY, 175, offsetTimerY);
	timerId = setInterval (timerFn, 500);
    };

*/
	
	function game () {
	   // $.each(actionCanvases, function () { 
	//	this.setAttribute("width", "100%");});
	    $.each(actionContexts, function () {
		this.clearRect(0, 0, 200, 200);
		this.fillStyle = "#fff";
      	        // what does the following do?
		// this.fillRect(1000, startTimerY, 175, 20); 
	    });

	    total = k.math.rand( 3, 9 ); //the total
	    n0 = total - k.math.rand(1, total - 1 ); //first number
	    n1 = total - n0; //second number

	    

	    for (var i=0; i<3; i++) {
		choices[ i ] = k.math.rand( 3, 9 ); // generate the 3 options
	    }
	    //chose one option (the correct option) and then put the correct value into it 
	    correct = k.math.rand( 0, 2 );	
	    choices[ correct ] = total;
	    var imgId = imgNames[ level ] ;

	    //k.library.images["ball"].draw(bottomLtCtx, 20, 30);	    
	    // add happy monkey
	    // k.library.images["happyMonkey"].draw(1000,600);
	    // gk.ctx.font = "bold 100px sans-serif";
	    // gk.ctx.textBaseline = "middle";
	    // gk.ctx.fillText("" + score, 1050, 460);
            

	    var card = function (ctx, n, minx, miny, d ) {
		ctx.save();
		var r = k.rectangle({x:minx, y:miny, width:maskd, height:maskd,
		    stroke:false,fill:false}).draw(ctx);
		
		//do the clip
		ctx.clip();
		var pos = [];
		var x, y, flag;

		pos.push( { "x":x, "y": y } ); 
		k.library.images[ imgId ].draw(ctx, x, y )

		for (var i=0; i<n; i++) {
		   do {
			flag = false;
			x = k.math.rand( 0, d );
			y = k.math.rand( 0, d );
			for ( var j=0; j<pos.length; j++) {
			    if ( k.geometry.distance2( pos[j], {"x": x, "y": y} ) 
				 < 150 ) {
				flag = true;
				break;
			    }
			}
			
		    }while ( flag === true );
		    pos.push( { "x":x, "y": y } ); 
		    k.library.images[ imgId ].draw(ctx, x, y )
		}
		
		
		
		ctx.restore();
	    }
	    //put the cards
	    
	    card(topLtCtx, n0 , 0, 0, d);
	    card(topRtCtx, n1 , 0, 0, d);
	    card(bottomLtCtx, choices[ 0 ] ,  0, 0, d);
	    card(bottomMdCtx, choices[ 1 ] , 0, 0, d);
	    card(bottomRtCtx, choices[ 2 ] , 0, 0, d);
	    //  if (!timerId){
	    //	timerId = setInterval (timerFn, 500);
	    //  } else { clearInterval(timerId); resetTimer();}

    }
	
	//put the buttons
	var buttons=[];
	buttons[ 0 ] = { "canvas": bottomLtCanvas, "id": 0};
	buttons[ 1 ] = { "canvas": bottomMdCanvas, "id": 1};
	buttons[ 2 ] = { "canvas": bottomRtCanvas, "id": 2};
	$.each(buttons, function() {
	 this["canvas"].addEventListener('click',  function() {
	    if ( choices[ this["id"] ] === total){
		score = score + 1;
		k.library.sounds[ "correct" ].play();
		level = (level+1)% imgNames.length;
		game();
	    }else {
		k.library.sounds[ "incorrect" ].play();
		game();
	    } 
	 }, true);});
	
	game();

    });
	   

});