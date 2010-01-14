$(document).ready(function() {
	var i,j,flag;
	var clickedObject;    //store the clicked image id
	var correctCounter = 0;
	var totalCounter = 0;
	var randQues = [];
	var currentQuestion;
	var TOTAL_QUES = 5;
	var flag_correct; 
	var done;
	var firstClickObj;
	var flag_questionClick; //if set to 0, question is clicked so disable click in image
	var imgCurrent;

	var questionsPart1 = new Array('Have you seen','I am eating','The little boy is eating',
						'She saw','The hen just laid');
	var answers = new Array('a','a','an','an','an');
	var questionsPart2 = new Array('tiger?','banana.','ice-cream.','insect on her arm.','egg.');
	var optionImg = new Array('a','an');
	
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
		
	
	var display_score = function(){
		document.scoreForm.score.value = correctCounter;
		document.scoreForm.full_mark.value = totalCounter;
	};
	
	var display_game_over = function(){
		$('#section').hide();
		$('#gameOver').show();
		$('#gameOver').html();
		$('#gameOver').append('<div id="gameOver">Game Over !!!</div>');
		if(correctCounter === totalCounter){		
		$('#gameOver').append('<div id="gameOverInfo">Congratulations !!! You got all correct.</div>');
		}
		else{
			$('#gameOver').append('<div id="gameOverInfo">Good Attempt !!! Try Again !!!<br /> You Got <span class="specialText">'+correctCounter+
					'</span> correct out of <span class="specialText">'+totalCounter+'</span>   questions .</div>');
		}
	};
	
	var delay_question_delete = function(){	
		
		document.delayForm.delayval.value = 1;
		$('#articleImages #quest'+imgCurrent).hide();
		$('#question').html('');
		};
	var delay_check_out = function(){	
		document.delayForm.delayval.value = 1;
		$('#answerCheck').html('');
	};
	var delay = function(){	
		document.delayForm.delayval.value = 1;
		display_game_over();
	};
	var check_game_over = function(){
		if(totalCounter === TOTAL_QUES){   //show all
			t=setTimeout(function(){delay();},1000);
		}
	};
	
	var store_clicked_object = function(objectClicked){
		var checked;			
		if(optionImg[objectClicked] === answers[currentQuestion]){			
			if(flag_correct == 1){   //correct at first attempt
				correctCounter++;				
			}
			checked = "correct";				
			done = 1;
		}
		else{				
				flag_correct = 0;
				firstClickObj = objectClicked;
				checked = "incorrect";
				$('#checkans'+objectClicked).html('');
				$('#checkans'+objectClicked).append('<img src="assets/image/try_again.png">');
		}
		
		$('#answerCheck').html('');
		$('#answerCheck').append('<img src="assets/image/'+checked+'.png">');
		t=setTimeout(function(){delay_check_out();},1000);
		
		if(done ===1){			
			$('#checkans'+firstClickObj).html('');
			$('#question').html('');
			$('#question').append(questionsPart1[currentQuestion]).append(' ');
			$('#question').append(answers[currentQuestion]).append(' ');
			$('#question').append(questionsPart2[currentQuestion]);
			totalCounter++;
			display_score();
			t=setTimeout(function(){delay_question_delete();},1000);
			flag_questionClick = 1;
			$('#optionSection').hide();
			check_game_over();
		}
		
	};

	var store_clicked_image = function(imageClicked){
		currentQuestion = randQues[imageClicked];
		imgCurrent = imageClicked;
		flag_questionClick = 0;
		done = 0; //if is set to 1, corrected
		$('#optionSection').show();
		$('#question').html('');
		$('#question').append(questionsPart1[currentQuestion]);
		$('#question').append('<div id="blankSpaces">   </div>');
		$('#question').append(questionsPart2[currentQuestion]);
		
	};
	
	var assignOptions = function (square){	 		
		$('#optionSection').append('<a href="#"></a>');
	    $('#optionSection a:last-of-type').append('<div class="options" id="option'+square+'">'+
	    		'<img src="assets/image/article_'+optionImg[square]+'.png"></div>');
	    $('#optionSection').append('<div id="checkans'+square+'" class = "check"></div>');
	    $('#optionSection a:last-of-type').click(function(){
	    	if(flag_questionClick === 0 && done != 1){
	    		store_clicked_object(square);
	    	}
		});
	};
	
	var assignQuestions = function (square){	 
		var question = randQues[square];
		$('#articleImages').append('<a href="#"></a>');
		$('#articleImages a:last-of-type').append('<img id="quest'+square+'" class="imgStory" src="assets/image/'+question+'.png">');
	    $('#articleImages a:last-of-type').click(function(){		
	    	if(flag_questionClick === 1){
	    		store_clicked_image(square);
	    	}
		});
	};

	function game(){
		$('#frontDisplay').show();
		$('#gameOver').hide();
		$('#section').hide();
	}
	function game_start(){
		$('#frontDisplay').hide();
		$('#gameOver').hide();
		$('#section').show();
		$('#optionSection').hide();
		$('#optionSection').html('');
		$('#question').html('');
		$('#answer').html('');
		$('#articleImages').html('');
		display_score();
		flag_correct = 1;
		flag_questionClick = 1;
		correctCounter = 0;
		totalCounter = 0;		
		generate_random_questions();		
				
		for(var i = 0; i < TOTAL_QUES; i++){
			assignQuestions(i);
		}	
		for(var i = 0; i < 2; i++){
			assignOptions(i);
		}
		
	}
	$('#linkStart').click(function(){
		game_start();
	});

	$('#linkPlayAgain').click(function(){
		game();		
	});
	$('#linkNext').hide();
	display_score();
	

});//end of DOM
