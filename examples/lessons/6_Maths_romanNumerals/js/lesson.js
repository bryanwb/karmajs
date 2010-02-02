$(document).ready(function() {
	var i,j,flag;
	var clickedObject;    //store the clicked image id
	var correctCounter = 0;
	var totalCounter = 0;
	var randQues = [];
	var currentQuestion;
	var TOTAL_QUES = 10;
	var flag_correct; 
	var sectionNum = 0; //store the current section of game 
	var firstClickObj;
	var flag_questionClick; //if set to 0, question is clicked so disable click in image
	var imgCurrent;
	var play = 0;
	var restart = 0;//pause the timer
	var s,h,m;
	var t;

	var questions1 = new Array(3,16,62,59,127,355,400,757,935,1205);
	var questions2 = new Array(10,2,150,50,500,1500,12,120,250,40);
	
	var startTimer = function(){
		s=checkTime(s);					
		m=checkTime(m);
		h=checkTime(h);
		$('#timerBox1').html(s);
		$('#timerBox2').html(m);
		$('#timerBox3').html(h);
	};
	
	var increaseTime = function(){
		if(play === 1){
			if(restart === 1){
				s = 0;
				m = 0;
				h = 0;
				restart = 0;
			}
			clearTimeout(t);
		s++;
		if(s>60){
		    m++;
		    m=checkTime(m);
		    $('#timerBox2').html(m);
		    s = 0;
		}
		if(m>60){
		    h++; 
		    h=checkTime(h);
		    $('#timerBox3').html(h);
		    m=0;
		    
		}				
		s=checkTime(s);	
		$('#timerBox1').html(s);
		var t=setTimeout(function(){increaseTime();},1000);
	
		}
	};
	
	function checkTime(timePara){
		if (timePara<10 ){
		timePara="0" + timePara;
		}
		return timePara;
	};

	var hide_textboxAnswers = function(){
		for(var i=0; i< TOTAL_QUES;i++){
			$('#checkFirst'+i).html('');
			$('#checkSecond'+i).html('');
			$('#ansBoxCorrect'+i).hide();
		}
	};
	
	function delay(){		
		document.delayForm.delayval.value = 1;
		hide_textboxAnswers();
	}
	

	var randNumber = function(limit){   //generate random number between any two ranges
			var rand_no = Math.floor(limit*Math.random());
			return rand_no;
		};

		var generate_random_questions = function(){
			randQues[0] = randNumber(TOTAL_QUES);
			for(i=1; i<TOTAL_QUES; i++){
				do{
					flag = 0;
					randQues[i] = randNumber(TOTAL_QUES);
					for(j=0; j<i; j++){
						if(randQues[i]===randQues[j]){
							flag++;
						}
					}
				}while(flag != 0 );  //end of do while loop	
			}
		};
		
	
		// Convert from Roman Numerals
		function deromanize( roman ) {
			  var roman = roman.toUpperCase(),
			      lookup = {I:1,V:5,X:10,L:50,C:100,D:500,M:1000},
			      arabic = 0,
			      i = roman.length;
			  while (i--) {
			    if ( lookup[roman[i]] < lookup[roman[i+1]] )
			      arabic -= lookup[roman[i]];
			    else
			      arabic += lookup[roman[i]];
			  }
			  return arabic;
			}
		
		//Convert to roman numerals
		function romanize(num) {
			  var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
			      roman = '',
			      i;
			  for ( i in lookup ) {
			    while ( num >= lookup[i] ) {
			      roman += i;
			      num -= lookup[i];
			    }
			  }
			  return roman;
			}
		
		                  
	
	var display_game_over = function(){
		$('#section').show();
		$('#section').addClass('gameOverShow');
		$('#gameOver').show();
		$('#gameOver').html('<img src="assets/image/gameOver.png');
		$('#gameOver').append('<div class="specialText">Click Play Again to play the game again or next/back to different game.</div>');
	};


	var check_answers = function(){
		var counter = 0;
		var ques;
		var flag_correct = 0;
		for(var i = 0; i< TOTAL_QUES;i++){
			if(sectionNum === 1){
				ques = questions1[i];
			}
			else{
				ques = questions2[i];
			}
			var x = $('#ansBox'+i).val();
			$('#checkFirst'+i).html('');
			$('#checkSecond'+i).html('');
			$('#ansBoxCorrect'+i).hide();
			if(ques === deromanize(x) && x!= ""){
				$('#checkFirst'+i).append('<img src = "assets/image/correct.png">');
				counter++;
				flag_correct = 1;
			}
			else{
				flag_correct = 0;
				$('#checkFirst'+i).append('<img src = "assets/image/incorrect.png">');
			}
			if(flag_correct === 0){
				$('#ansBoxCorrect'+i).show();
				$('#checkSecond'+i).html('<img src = "assets/image/correct.png">');
				$('input#ansBoxCorrect'+i).val(romanize(ques));
			}
		}
		if(counter != TOTAL_QUES){
			t=setTimeout(function(){delay();},3000);  //give chance to see for 3 sec if incorrect
		}
		else{
			play = 0;
			display_game_over();
		}
			
	};

	var assignQuestions = function (square){	 
		//var question = randQues[square];
		var ques;
		
		if(sectionNum === 1){
			ques = questions1[square];
		}
		else{
			ques = questions2[square];
		}
		
		$('#gameArea').append('<div id="imageArea'+square+'" class="imgArea"></div>');
		$('#imageArea'+square).append('<div id="ques'+square+'" class="quesBox"></div>');
		$('#ques'+square).html(ques);
		$('#imageArea'+square).append('<input id="ansBox'+square+'" type="text" class="textBox" maxlength="10" size="10">');
		$('#imageArea'+square).append('<div id="checkFirst'+square+'" class="check"></div>');
		$('#imageArea'+square).append('<input id="ansBoxCorrect'+square+'" type="text" style="display:none" class="textBox" maxlength="10" size="10">');		
		$('#imageArea'+square).append('<div id="checkSecond'+square+'" class="check"></div>');
	};

	function game(){

		$('#frontDisplay').show();
		$('#imgStory').hide();
		$('#topText').hide();
		$('#gameOver').hide();
		$('#section').hide();
		$('#linkBack').hide();
		$('#confirmBtn').hide();
		$('#linkNext').show();
		$('#timerBar').hide();
		sectionNum = 0;
	}
	function game_start(){
		clearTimeout(t);
		if(sectionNum === 1){
			$('#linkNext').show();
			$('#linkBack').show();
		}
		else{
			$('#linkNext').hide();
			$('#linkBack').show();
		}
		//alert(sectionNum);
		play = 1;
		s = 0; h = 0; m = 0;
		startTimer();
		increaseTime();
		$('#imgStory').show();
		$('#frontDisplay').hide();
		$('#gameOver').hide();
		$('#confirmBtn').show();
		$('#timerBar').show();
		$('#currentTitle').html('').append('तिम्रो सम्झने शक्ति को जाँच');
		$('#section').show();
		$('#section').removeClass('gameOverShow');
		$('#gameArea').html('').append('<div id="topText"></div>');
	
		for(var i = 0; i < TOTAL_QUES; i++){			
			assignQuestions(i);
		}	
		focus_blur();
	}
	$('#confirmBtn').click(function(){
		check_answers();
	});
	$('#linkStart').click(function(){
		sectionNum = 1;
		game_start();		
		
	});

	$('#linkPlayAgain').click(function(){
		restart = 0;
		game_start();	
		
	});
	$('#linkBack').click(function(){
		if(sectionNum === 1){
			game();		
		}
		else if(sectionNum === 2){
			sectionNum = 1;
			game_start();
		}
		
	});
	$('#linkNext').click(function(){
		sectionNum += 1;
		game_start();
		
	});
	function focus_blur(){
		$('input[type="text"]').focus(function() {
		    $(this).addClass("focus");
		});
		$('input[type="text"]').blur(function() {
		    $(this).removeClass("focus");    
		});
	}

	game();

	

});//end of DOM
