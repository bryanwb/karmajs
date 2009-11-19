$(document).ready(
    function(){

	var k = Karma({
			  images: [
			      {name: "ball",   file: "ball37px.png"},
			      {name: "balloon", file: "balloon37px.png"},
			      {name: "banana", file: "banana37px.png"},
			      {name: "chilli", file: "chilli.png"},
			      {name: "fish"  , file: "fish64px.png"},
			      {name: "flower", file: "flower37px.png"},
			      {name: "normalChimp", file: "normalChimp_120x125.png"},
			      {name: "happyChimp", file: "happyChimp_120x125.png"},
			      {name: "sadChimp", file: "sadChimp_120x125.png"}
			  ]
			  ,
			  sounds: [
			      {name: "correct",  file: "correct.ogg"},
			      {name: "incorrect", file: "incorrect.ogg"},
			      {name: "trigger", file: "trigger.ogg"}
			  ],
			  canvases: [
			      {name:"topLt", domId:"topLtCanvas"},
			      {name:"topRt", domId:"topRtCanvas"},
			      {name:"bottomLt", domId:"bottomLtCanvas"},
			      {name:"bottomMd", domId:"bottomMdCanvas"},
			      {name:"bottomRt", domId:"bottomRtCanvas"},
			      {name:"timer", domId:"timerCanvas"},
			      {name:"scorebox", domId:"scoreboxCanvas"},
			      {name:"chimp", domId:"chimpCanvas"}
			  ]	
		      });
	
	
	k.ready(function() {
		    
		    k.canvases["topLt"].drawImage(k.images.ball, 5, 10);
		    
		  /*
                    k.canvases['timer'].ctx.fillStyle = "#fff";
		    k.canvases['timer'].ctx.fillRect(10, startTimerY, endTimerX, 20);
		    k.canvases['timer'].clear();
		    k.sounds["trigger"].play();
		    k.rand( 2, 10 );

		    k.canvases["scorebox"].save().
			clear().
			font("bold 50px sans-serif white").
			fillStyle("#fff").
			textBaseline("middle").
			fillText("" + score, 30, 100).
			restore();
                   */

/*
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

		    var timerFn = function () {
			k.canvases['timer'].clear();

			if ( startTimerY >= endTimerY ){
			    //you didn't answer in time
			    k.sounds["trigger"].play();
			    answer(false, true);
			    game();
			} 
			else {
			    k.canvases['timer'].clear();
			    startTimerY = startTimerY + offsetTimerY;
			    k.canvases['timer'].ctx.fillStyle = "#fff";
			    k.canvases['timer'].ctx.fillRect(10, startTimerY, endTimerX, 20);
			}
		    };

		    
		    function game () {
			$.each(k.canvases, function () {
				   if (this.name != "chimp"){
				       this.clear();
				   }
			       });
			
			
			writeScore();
			total = k.rand( 2, 10 ); //the total
			n0 = total - k.rand(1, total - 1 ); //first number
			n1 = total - n0; //second number

			//chose one option (the correct option) 
			//and then put the correct value into it 
			correct = k.rand( 0, 2 );	
			choices[ correct ] = total;
			
			for (var i=0; i<3; i++) {
			    //generate the two other options
			    if ( choices[i] === total) {
				continue;
			    } else {
				// generate the other options
				choices[ i ] = k.rand( 2, 10 ); 
				for (var j = 0; j < i; j++){
				    if (choices[i] === choices[j]) {
					choices[ i ] = k.rand( 2, 10 );
				    }
				}	    
			    }
			}
			
			var imgId = imgNames[ level ] ;

			
			var card = function (surface, n, minx, miny, d ) {
			    surface.save();
			    //var r = k.rectangle({x:minx, y:miny, width:maskd, height:maskd,
				//		 stroke:false,fill:false}).draw(surface);
			    
			   // var r = surface.rectangle({x:minx, y:miny, width:maskd, height:maskd,
				//	  stroke:false,fill:false} );

			    //do the clip
			    //surface.clip();
			    var pos = [];
			    var x, y, flag;


			    for (var i=0; i<n; i++) {
				do {
				    flag = false;
				    x = k.rand( 0, d );
				    y = k.rand( 0, d );
				    for ( var j=0; j<pos.length; j++) {
					if ( k.distance2( pos[j], 
							  {"x": x, "y": y} )  < 120 ) {
							      flag = true;
							      break;
							  }
				    }
				    
				}while ( flag === true );
				pos.push( { "x":x, "y": y } ); 
				//k.images[ imgId ].draw(surface, x, y )
				surface.drawImage(k.images[imgId], x, y);
			    }
			    
			    
			    
			    surface.restore();
			}


			//put the cards
			card(k.canvases["topLt"], n0 , 0, 0, d);
			card(k.canvases["topRt"], n1 , 0, 0, d);
			card(k.canvases["bottomLt"], choices[ 0 ] ,  0, 0, d);
			card(k.canvases["bottomMd"], choices[ 1 ] , 0, 0, d);
			card(k.canvases["bottomRt"], choices[ 2 ] , 0, 0, d);
			
		    }

		    var writeScore = function (){
			k.canvases["scorebox"].save().
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
				k.sounds[ "trigger" ].play();
			    } else {
				k.sounds[ "incorrect" ].play();
			    }
			    //animate sad monkey
			    animateChimp(false);
			    
			} else {
			    score = score + 1;
			    playerCorrect = playerCorrect + 1;
			    writeScore();
			    k.sounds[ "correct" ].play();
			    animateChimp(true);
			    if (playerCorrect === 5){
				level = (level+1)% imgNames.length;
				speed = speed - 300;
				playerCorrect = 0;
			    }
			}

			changeTimer('start');

		    };

		    var animateChimp = function (answer) {
			var timerChimp;	
			k.canvases["chimp"].clear();
			if( answer === true){
			    //k.images["happyChimp"].draw(k.canvases["chimp"], 0, 0);
			    k.canvases["chimp"].drawImage(k.images["happyChimp"], 0, 0);
			} else {
			    k.canvases["chimp"].drawImage(k.images["sadChimp"], 0, 0);
			}

			var restoreChimp = function () {
			    k.canvases["chimp"].clear();
			    k.canvases["chimp"].drawImage(k.images["normalChimp"], 0, 0);
			};

			timerChimp = setTimeout(restoreChimp, 800);


		    };
		    
		    var changeTimer = function (status){
			startTimerY = 10;
			k.canvases["timer"].clear();
			clearInterval(timerId);

			if (status === 'start'){
			    timerId = setInterval(timerFn, speed);
			}

		    };

		    var startStop = function (start) {
			score = level = 0;
			startTimerY = 10;
			$.each(k.canvases, function () { 
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



		    

		    //put the buttons
		    var buttons=[];
		    buttons[ 0 ] = { "surface": k.canvases["bottomLt"], "id": 0};
		    buttons[ 1 ] = { "surface": k.canvases["bottomMd"], "id": 1};
		    buttons[ 2 ] = { "surface": k.canvases["bottomRt"], "id": 2};
		    
		    $.each(buttons, function( key, item ) {
			       item.surface.node.addEventListener('click',  function( ev ) {
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
		    
		    k.canvases["chimp"].drawImage(k.images["normalChimp"], 0, 0);

		    //end of Karma.main
		});
*/

	//end of ready
		});
    });