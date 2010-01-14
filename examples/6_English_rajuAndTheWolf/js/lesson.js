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
			'Where did the bird live',
			'Where did Raju hide the rope',
			'Where did the wolf come out of',
			'What did the wolf chase',
			'Why was Raju Sad',
			'Whom did Raju lived with',
			'Where did the grandfather go next day',
			'What did the cat do when it saw the wolf',
			'What did Raju do with the loop of rope',
			"Why was Raju's grandfather happy"
		);
	
	var answersPart1 = new Array(
			'The bird lived',
			'Raju hid the rope',
			'The wolf came out of',
			'The wolf chased',
			'Raju was sad because',
			'Raju lived with',
			'The next day grandfather went to',
			'When it saw the wolf the cat',
			'Raju dropped the loop of rope',
			"Raju's grandfather was happy because"
	);

	//current answer among four stored at first 4 options for each questions
	var answers = new Array(
			'in a tree','in a house in the midddle of the forest','on a pond','in the sky',
			'under his bed','in the garden','in the forest','in the tree',
			'the forest','the house','the pond','the tree',
			'the duck','the cat','the boy','the bird',
			'he killed the wolf','he saved three lives','the hunter took away the dead wolf','his grandfather was very happy with him',
			'his grandfather','the cat','the dog','the bird',
			'the garden','the market','the forest','the tree',
			'mewed and ran away','quacked and ran away','flew into the tree','ran into the forest',
			"over the wolf's head","round a strong branch","round the cat's neck","round the duck's feet",
			'Raju saved three lives','Raju hid the rope under his bed','Raju went outside the gate','Raju gave the dead wolf to the hunters'			
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
		$('#answer').html('');	
		$('#answer').append(answersPart1[totalCounter]).append(' ');
		$('#answer').append(answers[totalCounter*4]).append('.');
		$('#linkNext').show();	
		totalCounter++;
		display_score();
		check_game_over();
	};

		
	var assignOptions = function (square){	 
		var a = totalCounter*4;
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
		$('#answer').html('');
		$('#question').append((totalCounter+1)+'. ').append(questionsPart1[totalCounter]).append('?');
		$('#answer').append(answersPart1[totalCounter]).append(' .......... .');
		$('#imgStory').html('<img src="assets/image/'+totalCounter+'.png"');
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
