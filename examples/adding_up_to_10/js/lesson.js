$(document).ready(function(){


    var k = $.karma ({container: "#karma-main", lang: "en"});
    
    k.init({
	images: [
	    {name: "ball",   file: "ball37px.png",   localized : false },
	    {name: "balloon", file: "balloon37px.png", localized : false },
	    {name: "banana", file: "banana37px.png", localized : false },
	    {name: "chilli", file: "chilli.png", localized : false },
	    {name: "fish"  , file: "fish64px.png",   localized : false },
	    {name: "flower", file: "flower37px.png", localized : false },
	    {name: "normalChimp", file: "normalChimp_120x125.png", localized : false},
	    {name: "happyChimp", file: "happyChimp_120x125.png", localized: false},
	    {name: "sadChimp", file: "sadChimp_120x125.png", localized : false}

	]
	,
/*	sounds: [

	    {name: "correct",  file: "correct.ogg"},
	    {name: "incorrect", file: "incorrect.ogg"},
	    {name: "trigger", file: "trigger.ogg", localized: false}
 	    
	],
	surfaces: [
	    {name:"topLt", canvas:"topLtCanvas"},
	    {name:"topRt", canvas:"topRtCanvas"},
	    {name:"bottomLt", canvas:"bottomLtCanvas"},
	    {name:"bottomMd", canvas:"bottomMdCanvas"},
	    {name:"bottomRt", canvas:"bottomRtCanvas"},
	    {name:"timer", canvas:"timerCanvas"},
	    {name:"scorebox", canvas:"scoreboxCanvas"},
	    {name:"chimp", canvas:"chimpCanvas"}
    
	]	*/
    });
    
    
k.main(function() {


    var imgNames = ["ball",  "banana", "balloon","chilli", "fish", "flower"];
    //game logic
    var total, level=0, time, n0, n1, correct;
    var maskd=200;
    var d=160;
    var choices=[];
    var score = 0;
    var correct;
    var speed = 2000;
    var playerCorrect = 0;
    var endTimerX = 80;
    var startTimerY = 10;
    var endTimerY = 100;
    var offsetTimerY = 5;
    var timerId;
    var timerPaper, timerRect, chimpPaper, normalChimp, sadChimp,
	happyChimp, 
	topLtBox, topRtBox, bottomLtBox, bottomMdBox, bottomRtBox;

    topLtBox = createBox("topLt");
    topRtBox = createBox("topRt");
    bottomLtBox = createBox("bottomLt");
    bottomMdBox = createBox("bottomMd");
    bottomRtBox = createBox("bottomRt");
//	topLtPaper, topRtPaper, bottomLtPaper, bottomMdPaper, bottomRtPaper;	
//	topLtSet, topRtSet, bottomLtSet, bottomMdSet, bottomRtSet, sets;

/*    topLtPaper = Raphael('topLtPaper', 200, 200);
    topRtPaper = Raphael('topRtPaper', 200, 200);
    bottomLtPaper = Raphael('bottomLtPaper', 200, 200);
    bottomMdPaper = Raphael('bottomMdPaper', 200, 200);
    bottomRtPaper = Raphael('bottomRtPaper', 200, 200);

    topLtBox = { "paper": topLtPaper, "prefix":"topLt", 
		 "set": topLtPaper.set()};
    topRtBox = { "paper": topRtPaper, "prefix":"topRt", 
		 "set": topRtPaper.set()};
    bottomLtBox = { "paper": bottomLtPaper, "prefix":"bottomLt", 
		   "set": bottomLtPaper.set()};
    bottomMdBox = { "paper": bottomMdPaper, "prefix":"bottomMd", 
		   "set": bottomMdPaper.set()};
    bottomRtBox = { "paper": bottomRtPaper, "prefix":"bottomRt", 
		   "set": bottomRtPaper.set()};
*/
    sets =  [topLtBox["set"], topRtBox["set"], bottomLtBox["set"], 
	     bottomMdBox["set"], bottomRtBox["set"]];

    var createBox = function (box, paperName) {
	var set, paper;
	paper = Raphael(paperName, 200, 200);
	set = paper.set();
	return { "paper": paper, "prefix": paperName, "set": set};
    };

/*
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

*/	
/*    function game () {
//	    $.each(sets, function () {
//		this.remove();
//	    });
	    
	    
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

 
	var card = function (paper, prefix, n, d ) {

	//	var r = k.rectangle({x:minx, y:miny, width:maskd, height:maskd,
	//	    stroke:false,fill:false}).draw(surface);
		
		//do the clip
		//surface.clip();
		var pos = [];
		var x, y, flag;
		var imgNames = {};
		var x, y;
		
		imgNames[prefix] = [];

		

		for (var i=0; i<n; i++) {
		   do {
			flag = false;
			x = k.math.rand( 0, d );
			y = k.math.rand( 0, d );
			for ( var j=0; j<pos.length; j++) {
			    if ( k.geometry.distance2( pos[j], 
				{"x": x, "y": y} )  < 120 ) {
				flag = true;
				break;
			    }
			}
			
		    }while ( flag === true );
		    pos.push( { "x":x, "y": y } ); 
		    k.library.images[ imgId ].draw(surface, x, y )
		}
		
		
		
		surface.restore();
	    }

	    

	    //put the cards
	    card(k.surfaces["topLt"], n0 , 0, 0, d);
	    card(k.surfaces["topRt"], n1 , 0, 0, d);
	    card(k.surfaces["bottomLt"], choices[ 0 ] ,  0, 0, d);
	    card(k.surfaces["bottomMd"], choices[ 1 ] , 0, 0, d);
	    card(k.surfaces["bottomRt"], choices[ 2 ] , 0, 0, d);
	    
    }
*/
/*
    var writeScore = function (){
	k.surfaces["scorebox"].save().
	clear().
	font("bold 50px sans-serif white").
	fillStyle("#fff").
	textBaseline("middle").
	fillText("" + score, 30, 100).
	restore();
    };

    var answer = function (correct, tooSlow) {

	if ( correct === false) {
	    //answer was incorrect or took too long
	    score = score - 1;
	    playerCorrect = playerCorrect - 1;
	    writeScore();
	    if (tooSlow === true) {
		k.library.sounds[ "trigger" ].play();
	    } else {
		k.library.sounds[ "incorrect" ].play();
	    }
	    //animate sad monkey
	    animateChimp(false);
	    
	} else {
	    score = score + 1;
	    playerCorrect = playerCorrect + 1;
	    writeScore();
	    k.library.sounds[ "correct" ].play();
	    animateChimp(true);
	    if (playerCorrect === 5){
		level = (level+1)% imgNames.length;
		speed = speed - 300;
		playerCorrect = 0;
	    }
	}

	changeTimer('start');

    };

*/

    var animateChimp = function (answer) {
	var timerChimp;	
	normalChimp.hide();
	if( answer === true){
	    happyChimp.show();
	} else {
	    sadChimp.show();
	}

	
	timerChip = setTimeout(function() { 
	    happyChimp.hide(); 
	    sadChimp.hide(); 
	    normalChimp.show();}, 800);
			       
    };
    
/*    var changeTimer = function (status){
	startTimerY = 10;
	k.surfaces["timer"].clear();
	clearInterval(timerId);

	if (status === 'start'){
	    timerId = setInterval(timerFn, speed);
	}

    };

    var startStop = function (start) {
	score = level = 0;
	startTimerY = 10;
	$.each(k.surfaces, function () { 
	    if (this.name != "chimp"){
		this.clear();
	    }
	});

	changeTimer('start');
	game();
	

    };

    var start = function () {
	startStop(true);
    };

    
    var stop = function () {
	changeTimer('stop');
    };
    
    var reset = function () {
	startStop(true);
    };


*/
						      
/*
	//put the buttons
	var buttons=[];
	buttons[ 0 ] = { "surface": k.surfaces["bottomLt"], "id": 0};
	buttons[ 1 ] = { "surface": k.surfaces["bottomMd"], "id": 1};
	buttons[ 2 ] = { "surface": k.surfaces["bottomRt"], "id": 2};
	
	$.each(buttons, function( key, item ) {
		item.surface.canvas.addEventListener('click',  function( ev ) {
		   if ( choices[ item.id ] === total){
		       answer(true);
		       game();
		   }else {
		       answer(false); 
		       game(); 
		   } 
		    
		}, false);
	});

    document.getElementById('start').
    addEventListener('click', start, false);


    document.getElementById('stop').
    addEventListener('click', stop, false);
    
    document.getElementById('reset').
    addEventListener('click', reset, false);
   
    k.library.images["normalChimp"].draw(k.surfaces["chimp"], 0, 0);
*/

    var addImages = function(paper, set, prefix, img, num){
	var i;
	var imgNames = {};
	var x, y;

	imgNames[prefix] = [];

//	paper.image(img, 0, 20, 100, 100);

	for (i = 0; i < num; i++){
	    x = k.math.rand( 0, 160 );
	    y = k.math.rand( 0, 160 );
	    imgNames[prefix][i] = paper.image(img, x , y, 40, 40);
	    set.push(imgNames[prefix][i]);
	}

    };

    
    timerPaper = Raphael('timerPaper', 100, 150);
    timerRect = timerPaper.rect(10, 25, 85, 20, 3);
    
    timerRect.attr('fill', "#fff");
    timerRect.animate({y: 130}, 2000, function(){ timerRect.attr("y", "25");});
    chimpPaper = Raphael('chimpPaper', 120, 125);
    normalChimp = chimpPaper.image(k.library.images["normalChimp"].src, 0, 20, 100, 100);
    sadChimp = chimpPaper.image(k.library.images["sadChimp"], 0, 20, 100, 100);
    sadChimp.hide();
    happyChimp = chimpPaper.image(k.library.images["happyChimp"].src, 0, 20, 100, 100);
    happyChimp.hide();
    
    topLtBox["paper"] = Raphael('topLtPaper', 200, 200);
    topLtBox["set"] = topLtBox["paper"].set();
//    addImages(topLtPaper, topLtSet, 'topLt',  k.library.images["ball"].src, 7);
//    var ball2 = topLtPaper.image(k.library.images["ball"].src, 0, 50, 40, 90);
//    topLtSet.push(ball1, ball2);
//    var timerId5 = setTimeout(function(){topLtSet.remove();}, 1000);
    topLtBox["set"].remove();
    topLtBox["set"] = topLtBox["paper"].set();
    

//end of Karma.main
});

    


//end of ready
});