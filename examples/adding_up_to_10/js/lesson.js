$(document).ready(function(){

    var k = $.karma ({container: "#karma-main", lang: "en"});
    
    k.init({
	images: [
	    {id: "ball",   file: "ball37px.png",   localized : false },
	    {id: "balloon", file: "balloon37px.png", localized : false },
	    {id: "banana", file: "banana37px.png", localized : false },
	    {id: "chilli", file: "chilli.png", localized : false },
	    {id: "fish"  , file: "fish64px.png",   localized : false },
	    {id: "flower", file: "flower37px.png", localized : false },
	    {id: "normalChimp", file: "normalChimp_120x125.png", localized : false},
	    {id: "happyChimp", file: "happyChimp_120x125.png", localized: false},
	    {id: "sadChimp", file: "sadChimp_120x125.png", localized : false}
	]
	,
	sounds: [
	    {id: "correct",  file: "correct.ogg"},
	    {id: "incorrect", file: "incorrect.ogg"},
	    {id: "trigger", file: "trigger.ogg"}
	    
	],
	surfaces: [
	    {id:"topLt", canvas:"topLtCanvas"},
	    {id:"topRt", canvas:"topRtCanvas"},
	    {id:"bottomLt", canvas:"bottomLtCanvas"},
	    {id:"bottomMd", canvas:"bottomMdCanvas"},
	    {id:"bottomRt", canvas:"bottomRtCanvas"},
	    {id:"timer", canvas:"timerCanvas"},
	    {id:"scorebox", canvas:"scoreboxCanvas"},
	    {id:"chimp", canvas:"chimpCanvas"}
    
	]	
    });
    
k.main(function() {

    var actionContexts = [ k.surfaces["topLt"].ctx, k.surfaces["topRt"].ctx, 
	k.surfaces["bottomLt"].ctx, k.surfaces["bottomMd"].ctx, 
	k.surfaces["bottomRt"].ctx];


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
	k.surfaces['timer'].clear();

	if ( startTimerY >= endTimerY ){
	    //you didn't answer in time
	    k.library.sounds["trigger"].play();
	    answer(false, true);
	    game();
	} 
	else {
	    k.surfaces['timer'].clear();
	    startTimerY = startTimerY + offsetTimerY;
	    k.surfaces['timer'].ctx.fillStyle = "#fff";
	    k.surfaces['timer'].ctx.fillRect(10, startTimerY, endTimerX, 20);
	}
    };

	
	function game () {
	    $.each(k.surfaces, function () {
		if (this.id != "chimp"){
		this.clear();
		}
	    });
	    
	    
	    writeScore();
	    total = k.math.rand( 2, 10 ); //the total
	    n0 = total - k.math.rand(1, total - 1 ); //first number
	    n1 = total - n0; //second number

	    //chose one option (the correct option) 
	    //and then put the correct value into it 
	    correct = k.math.rand( 0, 2 );	
	    choices[ correct ] = total;
	    
	    for (var i=0; i<3; i++) {
		//generate the two other options
		if ( choices[i] === total) {
		    continue;
		} else {
		    // generate the other options
		    choices[ i ] = k.math.rand( 2, 10 ); 
		    for (var j = 0; j < i; j++){
			if (choices[i] === choices[j]) {
			    choices[ i ] = k.math.rand( 2, 10 );
			}
		    }	    
		}
	    }
	    
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
			    if ( k.geometry.distance2( pos[j], 
				{"x": x, "y": y} )  < 80 ) {
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
	    card(k.surfaces["topLt"].ctx, n0 , 0, 0, d);
	    card(k.surfaces["topRt"].ctx, n1 , 0, 0, d);
	    card(k.surfaces["bottomLt"].ctx, choices[ 0 ] ,  0, 0, d);
	    card(k.surfaces["bottomMd"].ctx, choices[ 1 ] , 0, 0, d);
	    card(k.surfaces["bottomRt"].ctx, choices[ 2 ] , 0, 0, d);
	    
    }

    var writeScore = function (){
	k.surfaces["scorebox"].ctx.save();
	k.surfaces["scorebox"].clear();
	k.surfaces["scorebox"].ctx.font = "bold 50px sans-serif white";
	k.surfaces["scorebox"].ctx.fillStyle = "#fff";
	k.surfaces["scorebox"].ctx.textBaseline = "middle";
	k.surfaces["scorebox"].ctx.fillText("" + score, 30, 100);
	k.surfaces["scorebox"].ctx.restore();
    };

    var answer = function (correct, tooSlow) {

	if ( correct === false) {
	    //answer was incorrect or took too long
	    startTimerY = 10;
	    score = score - 1;
	    writeScore();
	    if (tooSlow === true) {
		k.library.sounds[ "trigger" ].play();
	    } else {
		k.library.sounds[ "incorrect" ].play();
	    }
	    //animate sad monkey
	    animateChimp(false);
	    
	} else {
	    startTimerY = 10;
	    score = score + 1;
	    writeScore();
	    k.library.sounds[ "correct" ].play();
	    animateChimp(true);
	    level = (level+1)% imgNames.length;
	}

    };

    var animateChimp = function (answer) {
	k.surfaces["chimp"].clear();
	if( answer === true){
	    k.library.images["happyChimp"].draw(k.surfaces["chimp"].
					  ctx, 0, 0);
	} else {
	    k.library.images["sadChimp"].draw(k.surfaces["chimp"].
	    				     ctx, 0, 0);
	}

	var restoreChimp = function () {
	    k.surfaces["chimp"].clear();
	    k.library.images["normalChimp"].draw(k.surfaces["chimp"].
	    					 ctx, 0, 0);
	};

	timerId = setTimeout(restoreChimp, 800);


    };

    var reset = function () {
	score = level = 0;
	startTimerY = 10;
	$.each(k.surfaces, function () { 
	    if (this.id != "chimp"){
		this.clear();
	    }
	});
	      
	game();

    };

    document.getElementById('reset').
    addEventListener('click', reset, true);
						      

	//put the buttons
	var buttons=[];
	buttons[ 0 ] = { "canvas": k.surfaces["bottomLt"].canvas, "id": 0};
	buttons[ 1 ] = { "canvas": k.surfaces["bottomMd"].canvas, "id": 1};
	buttons[ 2 ] = { "canvas": k.surfaces["bottomRt"].canvas, "id": 2};
	
	$.each(buttons, function( key, item ) {
		item.canvas.addEventListener('click',  function( ev ) {
		   if ( choices[ item.id ] === total){
		       answer(true);
		   }else { answer(false);	   } 
		    game();
		}, true);
	});
    timerId = setInterval (timerFn, 2000);     
    k.library.images["normalChimp"].draw(k.surfaces["chimp"].ctx, 0, 0);
    game();
//end of Karma.main
});
//end of ready
});