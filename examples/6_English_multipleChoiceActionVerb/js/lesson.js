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
	var TOTAL_QUES = 10;
	var flag_correct; 

	var questions = new Array('boy','monkey','duck','teacher','man','dog','mother','father','baby','driver');

	//current answer among four stored at first 4 options for each questions
	var answers = new Array(
			'sleeping','running','crying','laughing',
			'climbing','eating','running','walking',
			'swimming','flying','jumping','walking',
			'teaching','singing','dancing','playing',
			'He is riding a bicycle','He is talking','He is singing','He is barking',
			'barking','growling','laughing','jumping',
			'cooking','eating','sleeping','drinking',
			'digging','running','cooking','sleeping',
			'crying','clapping','running','jumping',
			'driving','riding','carrying','reading'			
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
	
	var display_game_over = function(){
		$('#section').hide();
		$('#linkNext').hide();
		$('#gameOver').show();
		$('#gameOver').html();
		$('#gameOver').append('<div id="gameOver">Game Over !!!</div>');
		$('#gameOver').append('<div id="gameOverInfo">You got  <span class="specialText">'+correctCounter+
				'</span> correct out of <span class="specialText">'+totalCounter+'</span>   questions .</div>');	
	};
	
	var delay = function(){	
		document.delayForm.delayval.value = 1;
		display_game_over();
	};
	var check_game_over = function(){
		if(totalCounter === 10){   //show all
			t=setTimeout(function(){delay();},1000);
		}
	};
	
	var store_clicked_object = function(objectClicked){
		var checked;
		if(objrand[objectClicked] ===0){
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
		if(currentQuestion === 4){
			$('#answer').append(answers[currentQuestion*4]).append('.');
		}
		else{
			$('#answer').append('The ').append(questions[currentQuestion]).append(' ');
			$('#answer').append(answers[currentQuestion*4]).append('.');
		}
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
		$('#question').html('');
		$('#answer').html('');
		$('#question').append((totalCounter+1)+'. What is the ');
		$('#question').append(questions[currentQuestion]).append(' doing ?');
		$('#imgStory').html('<img src="assets/image/'+currentQuestion+'.png"');
		for(var i = 0; i < 4; i++){
		    assignOptions(i);
		}	
	};
	function game(){
		$('#gameOver').hide();
		$('#section').show();
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
