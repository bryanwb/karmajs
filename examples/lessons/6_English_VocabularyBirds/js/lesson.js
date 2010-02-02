$(document).ready(function(){
	var k = Karma({
		audio: [{'name':'correct','file':'correct.ogg'},
		        {'name':'incorrect','file':'incorrect.ogg'},
		        {'name':'bulbul','file':'bulbul.wav'},
				{'name':'crane','file':'crane.wav'},
				{'name':'egret','file':'egret.wav'},
				{'name':'kingfisher','file':'kingfisher.wav'},
				{'name':'penguin','file':'penguin.wav'},
				{'name':'swan','file':'swan.wav'},
				{'name':'swift','file':'swift.wav'},
				{'name':'vulture','file':'vulture.wav'},
				{'name':'woodpecker','file':'woodpecker.wav'},
				{'name':'ostrich','file':'ostrich.wav'}				
		]});
		  
	k.ready(function(){
		var i,j,flag;
		var TOTAL_QUES = 10;
		var TOTAL_LEVEL = 3;
		var currentDragObject;
		var randImages = [];
		var randPositions = [];
		var randOtherImages = [];
		var currentAnimal;  
		var totalCounter;
		var currentQuestion;
		var currentDragObject;
		var arrangedAns = [];
		var correctAnimalParts = [];
		var randTexts = [];  //for the confirmation sections
		var checked;
		var sectionNum;  //store the current tab num
		var flag_checked;
		var currentQues;  //store the current Animal name
		var currentAnimal; //store the current Animal Image name
		var correctQuest;   //store 1 if the question and image is same
		var num;
		var flag_confirm;  //whether confirmation dialog box is on the top or not
		var currentDropObject;
		var droppedWord;
		var zIndex;   //show current dragged Object at top
		
		var birds = new Array('bulbul','crane','egret','kingfisher','ostrich',
								'penguin','swan','swift','vulture','woodpecker'
								);
		
		var genRandTexts=function (){
			randTexts[0] = k.rand(0,TOTAL_QUES-1);
			for(i=1; i<TOTAL_QUES; i++){
					do{
						flag = 0;
						randTexts[i] = k.rand(0,TOTAL_QUES-1);
						for(j=0; j<i; j++){
							if(randTexts[i] === randTexts[j]){
								flag++;
							}
						}
					}while(flag != 0 );  //end of do while loop	
				}
		};	
		
		var genRandImages=function (){
			randImages[0] = k.rand(0,TOTAL_QUES-1);
			for(i=1; i<TOTAL_QUES; i++){
					do{
						flag = 0;
						randImages[i] = k.rand(0,TOTAL_QUES-1);
						for(j=0; j<i; j++){
							if(randImages[i] === randImages[j]){
								flag++;
							}
						}
					}while(flag != 0 );  //end of do while loop	
				}
		};	
		
		var genRandOtherImages = function(){    
			randOtherImages[0] = currentAnimal; 
			for(i=1; i<7; i++){
					do{
						flag = 0;
						randOtherImages[i] = k.rand(0,6);
						for(j=0; j<i; j++){
							if(randOtherImages[i] === randOtherImages[j]){
								flag++;
							}
						}
					}while(flag != 0 );  //end of do while loop	
				}
			
		};
	
		
		var genRandPositions = function(){    // 15 random positions 8 correct
			randPositions[0] = k.rand(0,14);
			for(i=1; i<15; i++){
					do{
						flag = 0;
						randPositions[i] = k.rand(0,14);
						for(j=0; j<i; j++){
							if(randPositions[i] === randPositions[j]){
								flag++;
							}
						}
					}while(flag != 0 );  //end of do while loop	
				}
			
		};
		
		var assignDragTexts = function(txtId){
			randText = randTexts[i];
			$('#dragTxtSection').append('<div id="text'+txtId+'" class="dragObjects">'+birds[randText]+'</div>');
			var dragObjCss = {
					'float': 'left','cursor': 'move','width':'100px','height':'25px',
					'margin':'0.1em','color':'#5B3CD5',
					'font':'20px/30px Helvetica, Geneva, Arial, Verdana, sans-serif'
					};
			$('#text'+txtId).css(dragObjCss);
		};
		
		var confirmAnswer = function(){
			genRandTexts();
			$('#confirmSection').show().html('');
			$('#confirmSection').append('<div id="confirmBox"></div>');
			$('#confirmBox').append('<div id="checkAnswer"></div>');
			$('#confirmBox').append('<div id="word0" class="dropObjects"></div>');
			var dropObjCss = {
					'margin':'7em auto','margin-bottom':'3em','width':'100px','height':'30px',
					'border':'1px solid #FF0000'					
					};
			$('#word0').css(dropObjCss);
			$('#confirmBox').append('<div id="confimBtn"></div>');
			$('#confirmSection').append('<div id="dragTxtSection"></div>');
			
			for(i = 0; i<10; i++){
				assignDragTexts(i);
			}
			drag_drop();
			
		}
		
		var check_puzzle_completion = function(){
			var correct = 0;
			for(i = 0; i< 9 ;i++){
				if(arrangedAns[i] === correctAnimalParts[i]){
					correct++;
				}
			}
			if(correct === 9){
				//alert("great job its time to show some confirmations");
				$('#section').addClass('backOpaque');	
				flag_confirm = 0;
				confirmAnswer();
						
			}
		};
		
		var next_images = function(){			
			currentAnimal = randImages[totalCounter];
			$('#imgAnimalsDisplay').html('<img src="assets/image/'+birds[currentAnimal]+'.png" />');			
			$('#animalText').html('').append('<div class="imgVol"></div>');
			$('#animalText').append(birds[currentAnimal]);
			$('.imgVol').click(function(){
				k.audio[birds[currentAnimal]].play();
			});
		};
		
		var assignDragPuzzle = function(puzzleId,imgName){			
			$('#dragImgSection').append('<div id="drag'+num+'" class="dragObjects"></div>');
			var dragObjCss = {
					'float': 'left','cursor': 'move','width':'100px','height':'100px',
					'border':'1px solid #A8F42D', 
					'background':'url(assets/image/'+birds[imgName]+puzzleId+'.png)'
					};
			$('#drag'+num).css(dragObjCss);
			if(imgName === currentAnimal){
				correctAnimalParts[puzzleId] = $('#drag'+num).attr('id');
			}
			num++;
		};
		
		var assignPuzzle = function(puzzleId){
			$('#imgPuzzleArea').append('<div id="drop'+puzzleId+'" class="dropObjects"></div>');
			var dropObjCss = {
					'float': 'left','width':'100px','height':'100px',
					'border':'1px solid #A8F42D','background': '#C8FFC2'
					};
			$('#drop'+puzzleId).css(dropObjCss);
		};
		
		var display_game_over = function() {
			$('#confirmSection').hide();
			$('#gameOver').show().html('Game Over !!! Congratulations');
			$('#gameOver').append('<div id="gameOverInfo">You have successfully completed all the vocabulary section</div>');
		};
		
		var delay_gameOver = function(){
			document.delayForm.delayval.value = 1;
			display_game_over();
		};
		
		var next_puzzle = function() {
				$('#confirmSection').hide();
				zIndex = 0;
				$('#section').removeClass('backOpaque');
				$('#section').html('').append('<div id="infoText"></div>');
				$('#infoText').append('Listen to the name of the animal.'+
				'And drag and drop the pisces to complete the picture of the animal you just heard the name of.');
				currentAnimal = randImages[totalCounter];
				$('#infoText').append('<div class="imgVol"></div>');
				$('.imgVol').click(function(){
					k.audio[birds[currentAnimal]].play();
				});
				$('#section').append('<div id = "imgPuzzleArea"></div>');
				for(i = 0; i< 9; i++){
					assignPuzzle(i);				
					
				}
				$('#section').append('<div id = "dragImgSection"></div>');
				genRandPositions();
				genRandOtherImages();
				var number = 1;
				num = 0;
				for(i = 0; i< 15; i++){
					var randPos = randPositions[i];  //any random pos between 1-15
					if(randPos<9){
						assignDragPuzzle(randPos,currentAnimal);					
					}
					else{
						randPos = 15-randPos;
						assignDragPuzzle(randPos,randOtherImages[number]);
						number++;
					}
				}	
				flag_confirm = 1;
				drag_drop();
		};
		
		function game_start(){		
			$('#section').removeClass('backOpaque');
			$('#linkNext').hide();
			$('#linkBack').hide();
			sectionNum = 1;
			genRandImages();
			totalCounter = 0;
			next_puzzle();
			
		}		
		
		function game(){	
			$('#help').hide();
			sectionNum = 0;
			totalCounter = 0;
			flag_confirm = 1;
			$('#confirmSection').hide();
			$('#section').removeClass('backOpaque');
			$('#linkNext').show();
			$('#linkBack').hide();
			$('#gameOver').hide();
			$('#section').html('').append('<div id="topText">Click on the speaker and listen to the name of the wild birds</div>');
			$('#section').append('<div id="imgAnimalsDisplay"></div>');
			$('#section').append('<div id="animalText"></div>');
			genRandImages();	
			next_images();
		}	
			
		game();
	
		function drag_drop(){
			$('.dragObjects').draggable({ containment: '#content'});	
			$('.dragObjects').bind('dragstart', function(event, ui) {
				currentDragObject = event.target.id;
				$('#'+currentDragObject).css({'z-index':zIndex});
				currentDragAnimal = parseInt(currentDragObject.substring(4));
				zIndex++;				
			});
			
			$(".dropObjects").droppable({ tolerence: 'intersect' ,hoverClass: 'drophover'});
			$('.dropObjects').bind('drop', function(event, ui) {
				currentDropObject = event.target.id;
				droppedWord = parseInt(currentDropObject.substring(4));
				
				if(flag_confirm != 0){
					arrangedAns[droppedWord] = $('#'+currentDragObject).attr('id');
					check_puzzle_completion();					
				}
					
			});
			$('#confimBtn').click(function(){
				var dragAnimalText = $('#'+currentDragObject).text();
				if(dragAnimalText === birds[currentAnimal]){
					k.audio.correct.play();
					$('#checkAnswer').html('<img src="assets/image/correct.png" />');
					totalCounter++;
					if(totalCounter === TOTAL_QUES){
						t=setTimeout(function(){delay_gameOver();},1000);
					}
					else{
						$('#linkNext').show();
					}
				}
				else{
					k.audio.incorrect.play();
					$('#checkAnswer').html('<img src="assets/image/incorrect.png" />');
				}
				
			});
			
		}
		$('#linkHelp').click(function(){
			$('#help').slideDown(2000);
		})
		.mouseout(function(){
			$('#help').slideUp(2000);
		});
		$('#linkNext').click(function(){
			if(sectionNum === 0){   //first level for knowing the birds
				if(totalCounter === TOTAL_QUES-2){
					$('#linkBack').show();
					$('#linkNext').hide();				
				}
				else{
					$('#linkNext').show();
					$('#linkBack').show();
				}
				totalCounter++;
				next_images();
			}
			else{			
				$('#linkNext').hide();
					next_puzzle();
			}
		});
		$('#linkBack').click(function(){
			if(totalCounter === 1){
				$('#linkBack').hide();
				$('#linkNext').show();				
			}
			else{
				$('#linkNext').show();
				$('#linkBack').show();
			}
			totalCounter--;
			next_images();
		});
		$('#linkCheck').click(function(){
			check_answers();
		});
		$('#linkStart').click(function(){
			game_start();
		});
	
		$('#linkPlayAgain').click(function(){
			game();		
		});
	
	}); //end of k.ready
});	//end of document.ready