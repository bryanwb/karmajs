$(document).ready(function() {
	var i,j,flag;
	var clickedObject;    //store the clicked image id
	var correctCounter = 0;
	var totalCounter = 0;
	var objrand = [];
	var randQues = [];
	var currentObj; //store the current object clicked
	var currentQuestion;
	var NUM_OBJECTS = 4; //no of options
	var flag_correct; 
	var TOTAL_QUES = 8;
	var questionsPart1 = new Array(
			'Where is the house',
			'Where is the tree',
			'Where is the mat',
			'Where is the mountain',
			'Where is the sky',
			'Where are the flowers',
			'Where is the table',
			'Where is the gate'			
		);
	
	var answersPart1 = new Array(
			"the mountain",
			"of the house",
			"the varanda",
			"the house",
			"the mountain",
			"the garden",
			"the tree",
			"the tap"		
	);

	//current answer among four stored at first 4 options for each questions
	var answers = new Array('near','behind','inside','outside',
			'infront','in','under','above',
			'on','behind','near','beside',
			'behind','infront','on','under',
			'above','below','on','under',
			'in','behind','below','beside',
			'under','on','above','in',
			'beside','infront','below','under'
			);
	
	var optionImg = new Array('a','b','c','d');
	
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
	var generate_random_options_no = function(){	
		objrand[0] = randNumber(NUM_OBJECTS);
		for(i=1; i<NUM_OBJECTS; i++){
			do{
				flag = 0;
				objrand[i] = randNumber(NUM_OBJECTS);
				for(j=0; j<i; j++){
					if(objrand[i]===objrand[j]){
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
	
	var check_game_over = function(){
		if(totalCounter === TOTAL_QUES){   //show all
			$('#optionSection').html('');
			$('#optionSection').append('<div id="gameOver">Game Over !!!</div>');
			$('#optionSection').append('<div id="gameOverInfo">You got  <span class="specialText">'+correctCounter+
					'</span> correct out of <span class="specialText">'+totalCounter+'</span>   questions .</div>');
		}
	};
	
	var store_clicked_object = function(objectClicked){
		var checked;
		if(objrand[objectClicked] === 0){
			if(flag_correct == 1){   //correct at first attempt
				checked = "correct";
				correctCounter++;				
			}
		}
		else{
				
			flag_correct = 0;
				checked = "wrong";
			}
		
		flag_correct = 0;
		$('#checkans'+objectClicked).html('');
		$('#checkans'+objectClicked).append('<img src="assets/image/'+checked+'.png">');
		$('#answer').html('');	
		if(currentQuestion!=5){
			$('#answer').append("It's ");
		}
		else{
			$('#answer').append("They are ");
		}
		$('#answer').append(answers[currentQuestion*4]).append(' ');
		$('#answer').append(answersPart1[currentQuestion]).append('.');
		
		$('#linkNext').show();	
		totalCounter++;
		display_score();
		check_game_over();
	};

		
	var assignOptions = function (square){	 
		var a = currentQuestion*4;
		var randOption = objrand[square]+a;
		$('#optionSection').append('<div id="checkans'+square+'" class = "check"></div>');
		$('#optionSection').append('<a href="#"></a>');
	    $('#optionSection a:last-of-type').append('<div class="options" id="option'+square+'">'+
	    		'<img src="assets/image/'+optionImg[square]+'.png"></div>');
	    $('#optionSection a:last-of-type').append('<div class="optionText">'+answers[randOption]+'</div>');
	    $('#optionSection a:last-of-type').click(function(){		
	    	if(flag_correct === 1){
		    store_clicked_object(square);
	    	}
		});
	};
		
	var next_sentence = function(){
		flag_correct = 1;
		generate_random_options_no();
		currentQuestion = randQues[totalCounter];
		$('#answer').html('');
		$('#question').html('');
		$('#question').append((totalCounter+1)+'. ').append(questionsPart1[currentQuestion]).append('?');
		if(totalCounter!=5){
			$('#answer').append("It's").append(' ........... ');
		}
		else{
			$('#answer').append("They are").append(' ........... ');
		}
			
		$('#answer').append(answersPart1[currentQuestion]).append('.');
		for(var i = 0; i < NUM_OBJECTS; i++){
		    assignOptions(i);
		}	
	};
	function game(){
		correctCounter = 0;
		totalCounter = 0;
		$('#linkNext').hide();
		$('#optionSection').html('');
		display_score();
		generate_random_questions();
		next_sentence();
	}
	$('#linkNext').click(function(){
		$('#linkNext').hide();
		$('#optionSection').html('');
		next_sentence();
	});
	
	$('#linkStart').click(function(){
		game();
	});

	$('#linkPlayAgain').click(function(){
		game();		
	});
	display_score();
	$('#linkNext').hide();
	

});//end of DOM
