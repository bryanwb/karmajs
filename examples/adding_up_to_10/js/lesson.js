$(document).ready(function(){

    var k = $.karma ({container: "#karma-main", lang: "es-MX"});
    
/*    k.layer( {id:"topLt", canvas:"topLtCanvas"} );
    k.layer( {id:"topRt", canvas:"topRtCanvas"} );
    k.layer( {id:"bottomLt", canvas:"bottomLtCanvas"} );
    k.layer( {id:"bottomMd", canvas:"bottomMdCanvas"} );
    k.layer( {id:"bottomRt", canvas:"bottomRtCanvas"} );*/
    k.layer( {id:"timer", canvas:"timerCanvas", width:"100", height:"140"} );
//    k.layer( {id:"scorebox", canvas:"scoreboxCanvas"} );
//    k.layer( {id:"chimp", canvas:"chimpCanvas"} );

k.init({
	images: [
		{id: "ball",   file: "ball37px.png",   localized : false },
		{id: "balloon", file: "balloon37px.png", localized : false },
		{id: "banana", file: "banana37px.png", localized : false },
		{id: "chilli", file: "chilli.png", localized : false },
		{id: "fish"  , file: "fish64px.png",   localized : false },
		{id: "flower", file: "flower37px.png", localized : false },
		{id: "happyMonkey", file: "happyMonkey.jpg", localized : false },
		{id: "scorebox", file: "scorebox.png", localized : false } 
	]
	,
	sounds: [
	    {id: "correct",  file: "correct.ogg"},
	    {id: "incorrect", file: "incorrect.ogg"},
	    {id: "trigger", file: "trigger.ogg", localized: false}
	    
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
    var scoreboxCanvas = document.getElementById('scoreboxCanvas');
    var scoreboxCtx = scoreboxCanvas.getContext('2d');
//    var timerCanvas = document.getElementById('timerCanvas');
//    var timerCtx = timerCanvas.getContext('2d');

    var actionContexts = [ topLtCtx, topRtCtx, 
	bottomLtCtx, bottomMdCtx, bottomRtCtx];
    var actionCanvases = [ topLtCanvas, topRtCanvas, 
	bottomLtCanvas, bottomMdCanvas, bottomRtCanvas];


    var imgNames = ["ball",  "banana", "balloon","chilli", "fish", "flower"];
	//game logic
	var total, level=0, time, n0, n1, correct;
	var maskd=200;
	var d=160;
	var choices=[];
	var score = 0;
    var endTimerX = 80;
	var startTimerY = 10;
	var endTimerY = 100;
    var offsetTimerY = 20;
	var timerId;

    var timerFn = function () {
	k.layers['timer'].clear();
	k.layers['timer'].ctx.fillStyle = '#fff';
	k.layers['timer'].ctx.fillRect(10, startTimerY, endTimerX, offsetTimerY);
//	timerCanvas.setAttribute("width", "100%");
//	timerCtx.fillStyle = "#fff";
//      	timerCtx.fillRect(10, startTimerY, endTimerX, offsetTimerY); 
	if ( startTimerY >= endTimerY ){
	    //make trigger sound
	    answer(false);
	    game();
	} 
	else {
//	    timerCanvas.setAttribute("width", "100%");
	    k.layers['timer'].clear();
	    startTimerY = startTimerY + offsetTimerY;
	    //timerCtx.fillStyle = "#fff";
	    k.layers['timer'].ctx.fillStyle = "#fff";
    	    //timerCtx.fillRect(10, startTimerY, endTimerX, offsetTimerY);
	    k.layers['timer'].ctx.fillRect(10, startTimerY, endTimerX, offsetTimerY);
	}
    };

	
	function game () {
	    $.each(actionContexts, function () {
		this.clearRect(0, 0, 200, 200);
		this.fillStyle = "#fff";
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

 
	    var card = function (ctx, n, minx, miny, d ) {
		ctx.save();
		var r = k.rectangle({x:minx, y:miny, width:maskd, height:maskd,
		    stroke:false,fill:false}).draw(ctx);
		
		//do the clip
		ctx.clip();
		var pos = [];
		var x, y, flag;


		for (var i=0; i<n; i++) {
		   do {
			flag = false;
			x = k.math.rand( 0, d );
			y = k.math.rand( 0, d );
			for ( var j=0; j<pos.length; j++) {
			    if ( k.geometry.distance2( pos[j], {"x": x, "y": y} )  < 160 ) {
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
	    timerId = setInterval (timerFn, 1200);
		
    }

    var writeScore = function (){
	scoreboxCanvas.setAttribute("width", "100%");
	scoreboxCtx.font = "bold 50px sans-serif";
	scoreboxCtx.fillStyle = "#fff";
	scoreboxCtx.textBaseline = "middle";
	scoreboxCtx.fillText("" + score, 30, 100);
    };

    var answer = function (correct) {

	if ( correct === false) {
	    //answer was incorrect or took too long
	    clearInterval(timerId);
	    startTimerY = 10;
	    score = score - 1;
	    writeScore();
	    k.library.sounds[ "incorrect" ].play();
	    //animate sad monkey

	} else {
	    //answer was correct
	    clearInterval(timerId);
	    startTimerY = 10;
	    score = score + 1;
	    writeScore();
	    k.library.sounds[ "correct" ].play();
	    //animate happy monkey
	    level = (level+1)% imgNames.length;
	    
	}

    };

/*    var reset = function () {
	score = 0;
	startTimerY = 10;
	$.each( );


    };
*/

    writeScore();
	//put the buttons
	var buttons=[];
	buttons[ 0 ] = { "canvas": bottomLtCanvas, "id": 0};
	buttons[ 1 ] = { "canvas": bottomMdCanvas, "id": 1};
	buttons[ 2 ] = { "canvas": bottomRtCanvas, "id": 2};
	
	$.each(buttons, function( key, item ) {
		item.canvas.addEventListener('click',  function( ev ) {
		   if ( choices[ item.id ] === total){
		       answer(true);
		   }else { answer(false);	   } 
			
		    game();
		}, true);
	});
	game();
//end of Karma.main
});
//end of ready
});