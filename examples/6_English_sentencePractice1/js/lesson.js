$(document).ready(function() {
	var i,j,flag;
	var clickedObject;    //store the clicked image id
	var correctCounter = 0;
	var totalCounter = 0;
	var objrand = [];
	var currentObj; //store the current object clicked
	var NUM_OBJECTS = 4; //no of options
	var flag_correct;  
	var questionsPart1 = new Array(
			'The teachers and the students are',
			'They are',
			'One bus is',
			'Another bus is',
			'A car is',
			'The school building is',
			'It is a',
			'The sun is',
			'The teacher is',
			'They teacher says "Let the bus come"'
		);
	
	//current answer among four stored at first 4 options for each questions
	var answers = new Array(
			'standing','sleeping','running','eating',
			'waiting','walking','crying','under',
			'leaving','running','going','coming',
			'coming','parked','carrying','waiting',
			'parked','walking','crying','under',
			'behind','below','beside','in',
			'sunny','rainy','windy','shadow',
			'shining','crying','hiding','lightening',
			'carrying','playing','throwing','hiding',
			'come','go','run','coming'
	);

	var questionsPart2 = new Array(
			'at the bus stop',
			'bus',
			'the school',
			'towards the children',
			'on the other side of the road',
			'the tree',
			'day',
			'in the sky',
			'an umbrella',
			'to the stand still'
	);
	var optionImg = new Array('a','b','c','d');
	
	var randNumber = function(){   //generate random number between any two ranges
		var rand_no = Math.floor(NUM_OBJECTS*Math.random());
		return rand_no;
	};

	
	var generate_random_options_no = function(){	
		objrand[0] = randNumber();
		for(i=1; i<NUM_OBJECTS; i++){
			do{
				flag = 0;
				objrand[i] = randNumber();
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
		if(totalCounter === 10){   //show all
			$('#optionSection').html('');
			$('#optionSection').append('<div id="gameOver">Game Over !!!</div>');
			$('#optionSection').append('<div id="gameOverInfo">You got  <span class="specialText">'+correctCounter+
					'</span> correct out of <span class="specialText">'+totalCounter+'</span>   questions .</div>');
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
		$('#question').html('');
		$('#question').append(questionsPart1[totalCounter]+' ');
		$('#question').append(answers[totalCounter*4]+' ');
		$('#question').append(questionsPart2[totalCounter]);
		$('#question').append('.');
		$('#linkNext').show();	
		totalCounter++;
		display_score();
		check_game_over();
	};

		
	var assignOptions = function (square){	 
		var a = totalCounter*4;
		//var b = totalCounter+3;
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
		$('#question').html('');
		$('#question').append(questionsPart1[totalCounter]);
		$('#question').append(' .......... ');
		$('#question').append(questionsPart2[totalCounter]);
		$('#question').append('.');
		for(var i = 0; i < 4; i++){
		    assignOptions(i);
		}	
	};
	function game(){
		correctCounter = 0;
		totalCounter = 0;
		$('#linkNext').hide();
		$('#optionSection').html('');
		display_score();
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
