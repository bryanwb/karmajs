$(document).ready(function(){

var k = $.karma ({container: "#karma-main"/*, lang: "es-MX"*/});
k.size(1200, 800);
k.init({
	images: [
		{id: "ball",   file: "ball.png",   localized : false },
		{id: "ballon", file: "ballon.png", localized : false },
		{id: "banana", file: "banana.png", localized : false },
		{id: "chilli", file: "chilli.png", localized : false },
		{id: "fish"  , file: "fish.png",   localized : false },
	    {id: "flower", file: "flower.png", localized : false },
	    {id: "plussign", file: "plussign.png", localized : false },
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
	//alert(gk.paths.sounds.localized);
	var imgNames = ["ball", "ballon", "banana", "chilli", "fish", "flower" ];
	//game logic
	var total, level=0, time, n0, n1, correct;
	var maskd=252;
	var d=200;
	var choices=[];
    var startTimerY = 105;
    var endTimerY = 205;
    var offsetTimerY = 20;
    var timerId;

    var timerFn = function () {
	//gk.ctx.fillStyle = "#000";
      	//gk.ctx.fillRect(1000, startTimerY, 175, 20); 
	if ( startTimerY === endTimerY ){
	    //var audioElem = document.getElementById('correct');
	    //audioElem.play();
	    clearInterval(timerId)
	    resetTimer();
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
	timerId = setInterval (timerFn, 300);
    };

	
	function game () {
	gk.ctx.clearRect(0,0,1200,800);
	total = k.math.rand( 3, 9 ); //the total
	n0 = total - k.math.rand(1, total - 1 ); //first number
	n1 = total - n0; //second number

	    gk.ctx.fillStyle = "#fff";
      	    gk.ctx.fillRect(1000, startTimerY, 175, 20); 

	for (var i=0; i<3; i++) {
		choices[ i ] = k.math.rand( 3, 9 ); // generate the 3 options
	}
	//chose one option (the correct option) and then put the correct value into it 
	correct = k.math.rand( 0, 2 );	
	choices[ correct ] = total;
	var imgId = imgNames[ level ] ;

	    // add plus sign, the scorebox, and the happy monkey
	    k.library.images["plussign"].draw(460,200);
	    k.library.images["happyMonkey"].draw(1000,600);
	
	var card = function ( n, minx, miny, d ) {
		gk.ctx.save();
		var r = k.rectangle({x:minx, y:miny, width:maskd, height:maskd,
			stroke:false,fill:false}).draw();
			
		//do the clip
		gk.ctx.clip();
		var pos = [];
		var x, y, flag;
		for (var i=0; i<n; i++) {
			do {
				flag = false;
				x = minx + k.math.rand( 0, d );
				y = miny + k.math.rand( 0, d );
				for ( var j=0; j<pos.length; j++) {
					if ( k.geometry.distance2( pos[j], {"x": x, "y": y} ) 
					< 4000 ) {
						flag = true;
						break;
					}
				}
				
			}while ( flag === true );
			pos.push( { "x":x, "y": y } );
			k.library.images[ imgId ].draw( x, y )
		}
	    
	     
	    
		gk.ctx.restore();
	}
	//put the cards
	
	card( n0 , 165, 100, d);
	card( n1 , 550, 100, d);
	card( choices[ 0 ] ,  65, 480, d);
	card( choices[ 1 ] , 360, 480, d);
	card( choices[ 2 ] , 650, 480, d);
	    if (!timerId){
		timerId = setInterval (timerFn, 300);
	    } else { clearInterval(timerId); resetTimer();}
	}
	
	game();
	//put the buttons
	var buttons=[];
	buttons[ 0 ] = k.button({id: 0, x:65, y:480, width:maskd, height: maskd});
	buttons[ 1 ] = k.button({id: 1, x:360, y:480, width:maskd, height: maskd});
	buttons[ 2 ] = k.button({id: 2, x:650, y:480, width:maskd, height: maskd});
	buttons[0].onClick = buttons[1].onClick = buttons[2].onClick = function() {
		if ( choices[ this.id ] === total){
			
			k.library.sounds[ "correct" ].play();
			level = (level+1)% imgNames.length;
			game();
		}else {
			k.library.sounds[ "incorrect" ].play();
			game();
		} 
	}
	
	
});

});