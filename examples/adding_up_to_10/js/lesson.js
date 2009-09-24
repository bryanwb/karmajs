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
	sounds: [

	    {name: "correct",  file: "correct.ogg"},
	    {name: "incorrect", file: "incorrect.ogg"},
	    {name: "trigger", file: "trigger.ogg", localized: false}
 	    
	],

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
    var startTimerY = 25;
    var endTimerY = 100;
    var offsetTimerY = 5;
    var timerId;
    var timerPaper, timerRect, 
	chimpPaper, normalChimp, sadChimp, happyChimp, 
	topLtBox, topRtBox, bottomLtBox, bottomMdBox, bottomRtBox;
    var buttons=[];
    var stopTimer = false;
    var chooseMe;

    var createBox = function (paperName) {
	var set, paper, box;
	paper = Raphael(paperName+"Paper", 200, 200);
	set = paper.set();
	return { "paper": paper, "prefix": paperName, "set": set};	
    };

    topLtBox = createBox("topLt");
    topRtBox = createBox("topRt");
    bottomLtBox = createBox("bottomLt");
    bottomMdBox = createBox("bottomMd");
    bottomRtBox = createBox("bottomRt");

    sets =  [topLtBox["set"], topRtBox["set"], bottomLtBox["set"], 
	     bottomMdBox["set"], bottomRtBox["set"]];

    //put the buttons on the cards
    buttons[ 0 ] = { "node": $('#bottomLtPaper')[0], "id": 0};
    buttons[ 1 ] = { "node": $('#bottomMdPaper')[0], "id": 1};
    buttons[ 2 ] = { "node": $('#bottomRtPaper')[0], "id": 2};

    var addButtons = function(){
	buttons.forEach(function(button) {
	    var thisChoice = choices[ button.id ]; 
	    button.node.addEventListener('click', function chooseMe(){ 
		choose (thisChoice);}, false);
	});
    };


    var removeButtons = function(){
	buttons.forEach(function(button) {
	    button.node.removeEventListener('click', chooseMe, false);
	});
    };

    var choose = function(choice) {
		if ( choice === total){
		    document.write("foofoo");
		//  answer(true);
		    resetTimer();
		    //game();
		}else {
		    //answer(false);
		    resetTimer();
		    //game(); 
		} 
    };

    function game () {
	sets.forEach(function (set) {
	    if(set){
	    set.remove();
	    }
	});
	    
	
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

	
	var card = function (box, n, d) {
	    var pos = [];
	    var x, y, flag;
	    var imgNames = {};
	    var prefix = box["prefix"];	
	    imgNames[prefix] = [];
	    if(!box["set"]){
		box["set"] = box["paper"].set();
	    }
	    
	    for (var i=0; i<n; i++) {
		do {
		    flag = false;
		    x = k.math.rand( 0, d);
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
		imgNames[prefix][i] = box["paper"].image(k.library.images[imgId].src, x , y, 40, 40);
		box["set"].push(imgNames[prefix][i]);		    
	    }
	    
	}

	

	//put the cards
	card(topLtBox, n0, 160);
	card(topRtBox, n1 , 160);
	card(bottomLtBox, choices[ 0 ], 160);
	card(bottomMdBox, choices[ 1 ] , 160);
	card(bottomRtBox, choices[ 2 ] , 160);
	
    }


    var writeScore = function (newscore){
         $('#scoreboxText')[0].innerHTML = newscore; 
    };

    var start = function () {
	score = 0;
	writeScore(score);
	addButtons();
	stopTimer = false;

	//move timer back to start in case it is 
	//already running
	resetTimer();

	//start timer
	animateTimer();

	game();
    };

    var stop = function () {
	writeScore(' ');
	removeButtons();
	//stop timer
	stopTimer = true;
	resetTimer();
	
	//clear the cards
	sets.forEach(function (set) {
	    if(set !== null){
	    set.remove();
	    }
	});
	
    };

    var reset = function () {
	score = 0;
	writeScore(score);
	stopTimer = false;
	resetTimer();
	animateTimer();
	game();
	
    };

    var resetTimer = function () {
    	timerRect.animate({y: startTimerY}, 0);
    };
    
    var animateTimer = function () {
	timerRect.animate({y: 130}, 2000, function(){ 
	    timerRect.attr("y", startTimerY);
	    if (stopTimer === false){
		animateTimer();
	    }
	});
    };

    var tooSlow = function () {

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


/*
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

*/
						      

	


    document.getElementById('start').
    addEventListener('click', start, false);


    document.getElementById('stop').
    addEventListener('click', stop, false);
    
    document.getElementById('reset').
    addEventListener('click', reset, false);
   

    //set up the timer
    timerPaper = Raphael('timerPaper', 100, 150);
    timerRect = timerPaper.rect(7, 25, 85, 20, 3);
    timerRect.attr('fill', "#fff");
//    timerRect.animate({y: 130}, 2000, function(){ 
//	timerRect.attr("y", startTimerY);});

    //Set up the monkeys
    chimpPaper = Raphael('chimpPaper', 120, 125);
    normalChimp = chimpPaper.image(k.library.images["normalChimp"].src, 
				   0, 20, 100, 100);
    sadChimp = chimpPaper.image(k.library.images["sadChimp"].src, 
				0, 20, 100, 100);
    happyChimp = chimpPaper.image(k.library.images["happyChimp"].src, 
				  0, 20, 100, 100);
    happyChimp.hide();
    sadChimp.hide();


//end of Karma.main
});

    


//end of ready
});