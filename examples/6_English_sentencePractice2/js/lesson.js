$(document).ready(function() {
	//Random sentences should be shown as in practice I it is already done.
	var i,j,flag;
	var clickedObject;    //store the clicked image id
	var correctCounter = 0;
	var totalCounter = 0;
	var objrand = [];
	var currentObj; //store the current object clicked
	var NUM_WORDS = 20; //no of options
	var flag_correct;  
	var currentDragObject;
	var currentWord;
	var draggedWord;
	var correctDropped = 0;
	var questionsPart1 = new Array(
			'The',
			'They',
			'',
			'',
			'A',
			'The school',
			'The sun is shining',
			'The',
			"They teacher says 'Let the'",
			'There are two'
		);
	
	
	var questionsPart2 = new Array(
			'and the students are standing at the',
			'waiting',
			'bus is already',
			'bus is',
			'is parked on the',
			'is behind the',
			'the',
			'carrying an',
			'come to a',
			'on the'
		);
	var questionsPart3 = new Array(
			'',
			'the bus',
			'the school',
			'towards the children',
			'side of the road',
			'',
			'',
			'',
			"still'",
			''
	);
	
	var wordBank = new Array(
			'teachers','bus stop','are','for','One','leaving',"Another",'coming','car','other',
			'building','tree','in','sky','teacher','umbrella','bus','stand','buses','road'
			);
	
	
	//current answer among four stored at first 4 options for each questions

	
	var optionImg = new Array('a','b','c','d');
	
	var randNumber = function(){   //generate random number between any two ranges
		var rand_no = Math.floor(NUM_WORDS*Math.random());
		return rand_no;
	};

	
	var generate_random_options_no = function(){	
		objrand[0] = randNumber();
		for(i=1; i<NUM_WORDS; i++){
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
	
	var check_game_over = function(){
		if(totalCounter === 10){   //game over
			$('#linkNext').hide();
			$('#gameOverInfo').fadeIn(1000);
		}
	};

		
	var assignOptions = function (square){	 
		var randWord = objrand[square];
		$('#sideBar').append('<div id="word'+square+'" class = "wordBankTxt">'+wordBank[randWord]+'</div>');
	};
		
	var next_sentence = function(){
		flag_correct = 1;
		generate_random_options_no();	
		$('#sideBar').html('');
		$('#question').html('');
		for(var i = 0; i < NUM_WORDS; i++){
		    assignOptions(i);
		}
		$('.wordBankTxt').draggable({ containment: '#content',revert:'invalid'});
		
		$('#question').append(questionsPart1[totalCounter]);
		$('#question').append('<span id="drop0" class="dropBox"></span>');		
		$('#question').append(questionsPart2[totalCounter]);
		$('#question').append('<span id="drop1" class="dropBox"></span>');
		$('#question').append(questionsPart3[totalCounter]);
		$('#question').append('.');				
		drag();
	};
	function game(){
		$('#gameOverInfo').hide();
		correctCounter = 0;
		totalCounter = 0;
		$('#linkNext').hide();
		$('#optionSection').html('');
		next_sentence();
	}
	$('#linkNext').click(function(){
		$('#linkNext').hide();
		correctDropped = 0;
		
		next_sentence();
	});
	
	$('#linkStart').click(function(){
		game();
	});

	$('#linkPlayAgain').click(function(){
		game();		
	});

	$('#linkNext').hide();
	game();

	/***** Drag and Drop Implementation area ***/
	
	function drag(){		
		$('.wordBankTxt').bind('dragstart', function(event, ui) {
			currentDragObject = event.target.id;			
			currentWord = parseInt(currentDragObject.substring(4));
			draggedWord = objrand [currentWord]; 
			if(draggedWord === ((totalCounter*2)+(draggedWord%2))){		
				$('#'+currentDragObject).addClass('correct');
				$('#drop'+(draggedWord%2)).droppable({ tolerence: 'intersect',hoverClass: 'drophover',accept:'.correct'});
			}
			
			drop();
		});
	}
		function drop(){
			$('#drop'+(draggedWord%2)).bind('drop', function(event, ui) {
				currentDropObject = event.target.id;
				var droppedWord = parseInt(currentDropObject.substring(4));
				correctDropped++;
				$('#'+currentDropObject).droppable('disable');
				$('#'+currentDragObject).removeClass('correct');
				$('#'+currentDragObject).draggable('disable');
				if(correctDropped === 2){
					totalCounter++;
					$('#linkNext').show();
				}
				check_game_over();	
				
			});
	}

});//end of DOM
