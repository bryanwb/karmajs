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
    var total, time, n0, n1, correct;
    var level = 0, d=160;
    var choices=[], score = 0, speed = 12000;
    var playerCorrect = 0, endTimerX = 80, startTimerY = 25, 
	endTimerY = 100, offsetTimerY = 5;
    var overlayPaper, timerPaper, timerRect, 
	chimpPaper, normalChimp, sadChimp, happyChimp, 
	overlayBox, topLtBox, topRtBox, bottomLtBox, bottomMdBox, bottomRtBox;
    var buttons=[];
    var stopTimer = false;
    var chooseMe;

    var createBox = function (paperName, width, height) {
	var set, paper, box;
	if(!width || !height){
	    paper = Raphael(paperName+"Paper", 200, 200);
	}
	else {
	    paper = Raphael(paperName+"Paper", width, height);
	}
	set = paper.set();
	return { "paper": paper, "prefix": paperName, "set": set};	
    };


    overlayBox = createBox("overlay", 800, 600);
    topLtBox = createBox("topLt");
    topRtBox = createBox("topRt");
    bottomLtBox = createBox("bottomLt");
    bottomMdBox = createBox("bottomMd");
    bottomRtBox = createBox("bottomRt");


    boxes = [ topLtBox, topRtBox, bottomLtBox, 
	     bottomMdBox, bottomRtBox];

    sets =  [topLtBox["set"], topRtBox["set"], bottomLtBox["set"], 
	     bottomMdBox["set"], bottomRtBox["set"]];


    function game () {
	boxes.forEach(function (box) {
		box.set.remove();
	});
	
	total = k.math.rand( 2, 5 + level ); //the total
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
	    var imgVarNames = {};
	    var prefix = box["prefix"];	
	    imgVarNames[prefix] = [];
	    box["set"] = box["paper"].set();
	    
	    for (var i=0; i<n; i++) {
		do {
		    flag = false;
		    x = k.math.rand( 0, d);
		    y = k.math.rand( 0, d );
		    for ( var j=0; j<pos.length; j++) {
			if ( k.geometry.distance2( pos[j], 
						   {"x": x, "y": y} )  < 135 ) {
			    flag = true;
			    break;
			}
		    }
		    
		}while ( flag === true );
		pos.push( { "x":x, "y": y } ); 
		imgVarNames[prefix][i] = box["paper"].image(k.library.images[imgId].src, x , y, 35, 35);
		box["set"].push(imgVarNames[prefix][i]);		    
	    }
	    
	}

	//put the cards
	card(topLtBox, n0, 160);
	card(topRtBox, n1 , 160);
	card(bottomLtBox, choices[ 0 ], 160);
	card(bottomMdBox, choices[ 1 ] , 160);
	card(bottomRtBox, choices[ 2 ] , 160);
	
    }

    //put the buttons on the cards
    buttons[ 0 ] = { node: $('#bottomLtPaper')[0], num: 0};
    buttons[ 1 ] = { node: $('#bottomMdPaper')[0], num: 1};
    buttons[ 2 ] = { node: $('#bottomRtPaper')[0], num: 2};

    var addButtons = function(){
	buttons.forEach(function(button) {
	    var buttonNum = button.num;
	    button.node.addEventListener('click', function chooseMe(){ 
		var mybutton = buttonNum
		choose (mybutton);}, false);
	});
    };


    var removeButtons = function(){
	buttons.forEach(function(button) {
	    button.node.removeEventListener('click', chooseMe, false);
	});
    };

    var choose = function(buttonNum) {
		if ( choices[buttonNum] === total){
		    //If the player has completed all the levels
		    if (playerCorrect === 4 && level === 5) {
			congrats();
		    } else {
			answer(true, false);
			resetTimer();
			animateTimer();
			game();
		    }
		}else {
		    answer(false, false);
		    resetTimer();
		    animateTimer();
		    game(); 
		} 
    };



    var writeScore = function (newscore){
         $('#scoreboxText')[0].innerHTML = newscore; 
    };


    var answer = function (correct, tooSlow) {

	if ( correct === false) {
	    //answer was incorrect or took too long
	    score = score - 1;
	    playerCorrect = playerCorrect - 1;
	    writeScore(score);
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
	    writeScore(score);
	    k.library.sounds[ "correct" ].play();
	    animateChimp(true);
	    if (playerCorrect == 5){
		level = level + 1;
		speed = speed - 1000;
		playerCorrect = 0;
	    } 
	   
	}
	

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
	boxes.forEach(function (box) {
	    box.set.remove();
	    box.set = box.paper.set();
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
	timerRect.animate({y: 130}, speed, function(){ 
	    timerRect.attr("y", startTimerY);
	    if (stopTimer === false){
		answer(false, true);
		animateTimer();
	    }
	});
    };


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

    var congrats = function () {
	var congratsText;
	stop();

	$('#overlayPaper').css({"position": "absolute",
				"background": "white", "opacity": "0.8",
				"z-index": "100"});
	congratsChimp = overlayBox.paper.image(
	    k.library.images["happyChimp"].src, 200, 100, 300, 400);
	congratsChimp.attr({"fill-opacity": "1", "opacity": "1"});
	congratsText = overlayBox.paper.text(400, 550, "Great Job!");
	congratsText.attr({"font-size": 80});
	overlayBox.set.push(congratsChimp, congratsText);

	congratsChimp.node.addEventListener('click', function(){
	    $('#overlayPaper').css({"opacity": 0});
	    overlayBox.set.remove();
	}, false);

    };
						      
    document.getElementById('start').
    addEventListener('click', start, false);


    document.getElementById('stop').
    addEventListener('click', stop, true);
    
    document.getElementById('reset').
    addEventListener('click', reset, false);
   

    //set up the timer
    timerPaper = Raphael('timerPaper', 100, 150);
    timerRect = timerPaper.rect(7, 25, 85, 20, 3);
    timerRect.attr('fill', "#fff");

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