$(document).ready(function(){

    var k = $.karma ({container: "#karma-main", lang: "es-MX"});
    
    k.layer( {id:"topLt", canvas:"topLtCanvas", width: 200, height: 200});
    k.layer( {id:"topRt", canvas:"topRtCanvas", width: 200, height: 200} );
    k.layer( {id:"bottomLt", canvas:"bottomLtCanvas", width: 200, height: 200} );
    k.layer( {id:"bottomMd", canvas:"bottomMdCanvas", width: 200, height: 200} );
    k.layer( {id:"bottomRt", canvas:"bottomRtCanvas", width: 200, height: 200} );
    k.layer( {id:"timer", canvas:"timerCanvas", width: 100, height: 140} );
    k.layer( {id:"scorebox", canvas:"scoreboxCanvas"} );
    k.layer( {id:"chimp", canvas:"chimpCanvas"} );

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

    var actionContexts = [ k.layers["topLt"].ctx, k.layers["topRt"].ctx, 
	k.layers["bottomLt"].ctx, k.layers["bottomMd"].ctx, 
	k.layers["bottomRt"].ctx];


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
	k.layers['timer'].ctx.fillRect(10, startTimerY, endTimerX, endTimerY);

	if ( startTimerY >= endTimerY ){
	    //make trigger sound
	    answer(false);
	    game();
	} 
	else {
	    k.layers['timer'].clear();
	    startTimerY = startTimerY + offsetTimerY;
	    k.layers['timer'].ctx.fillStyle = "#fff";
	    k.layers['timer'].ctx.fillRect(10, startTimerY, endTimerX, 20);
	}
    };

	
	function game () {
	    $.each(k.layers, function () {
		this.clear();
		this.ctx.fillStyle = "#fff";
	    });
	    
	    
	    writeScore();
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
	    card(k.layers["topLt"].ctx, n0 , 0, 0, d);
	    card(k.layers["topRt"].ctx, n1 , 0, 0, d);
	    card(k.layers["bottomLt"].ctx, choices[ 0 ] ,  0, 0, d);
	    card(k.layers["bottomMd"].ctx, choices[ 1 ] , 0, 0, d);
	    card(k.layers["bottomRt"].ctx, choices[ 2 ] , 0, 0, d);
	    
    }

    var writeScore = function (){
	k.layers["scorebox"].ctx.save();
	k.layers["scorebox"].clear();
	k.layers["scorebox"].ctx.font = "bold 50px sans-serif white";
	k.layers["scorebox"].ctx.strokeStyle = "#fff";
	k.layers["scorebox"].ctx.textBaseline = "middle";
	k.layers["scorebox"].ctx.fillText("" + score, 30, 100);
	k.layers["scorebox"].ctx.restore();
    };

    var answer = function (correct) {

	if ( correct === false) {
	    //answer was incorrect or took too long
	    startTimerY = 10;
	    score = score - 1;
	    writeScore();
	    k.library.sounds[ "incorrect" ].play();
	    //animate sad monkey

	} else {
	    startTimerY = 10;
	    score = score + 1;
	    writeScore();
	    k.library.sounds[ "correct" ].play();
	    //animate happy monkey
	    level = (level+1)% imgNames.length;
	}

    };

    var reset = function () {
	score = level = 0;
	startTimerY = 10;
	$.each(k.layers, function () { this.clear();});
	game();

    };

    document.getElementById('reset').
    addEventListener('click', reset, true);
						      

	//put the buttons
	var buttons=[];
	buttons[ 0 ] = { "canvas": k.layers["bottomLt"].canvas, "id": 0};
	buttons[ 1 ] = { "canvas": k.layers["bottomMd"].canvas, "id": 1};
	buttons[ 2 ] = { "canvas": k.layers["bottomRt"].canvas, "id": 2};
	
	$.each(buttons, function( key, item ) {
		item.canvas.addEventListener('click',  function( ev ) {
		   if ( choices[ item.id ] === total){
		       answer(true);
		   }else { answer(false);	   } 
		    game();
		}, true);
	});
    timerId = setInterval (timerFn, 1200);     
    game();
//end of Karma.main
});
//end of ready
});