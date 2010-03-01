$(document).ready(function(){
	var k = Karma({
		audio: [{'name':'correct','file':'correct.ogg'},
			    {'name':'incorrect','file':'incorrect.ogg'},
			    {'name':'apple','file':'apple.wav'},
			    {'name':'banana','file':'banana.wav'},
			    {'name':'boat','file':'boat.wav'},
			    {'name':'book','file':'book.wav'},
			    {'name':'bus','file':'bus.wav'},
			    {'name':'cake','file':'cake.wav'},
			    {'name':'car','file':'car.wav'},
			    {'name':'cow','file':'cow.wav'},
			    {'name':'flower','file':'flower.wav'},
			    {'name':'hat','file':'hat.wav'},
			    {'name':'kite','file':'kite.wav'},
			    {'name':'lamp','file':'lamp.wav'},
			    {'name':'pig','file':'pig.wav'},
			    {'name':'pigeon','file':'pigeon.wav'},
			    {'name':'rat','file':'rat.wav'},
			    {'name':'tomato','file':'tomato.wav'},
			    {'name':'tree','file':'tree.wav'}
			]});
	
	k.ready(function(){
		var i,j,topPos,leftPos;   //game is completely based on absolute positioning....
		var TOTAL_QUES = 10;
		var TOTAL_OBJECTS = 17;
		var randObjects = [];    //store only ten random objects among TOTAL_OBJECTS
		var randPositions = [];	 //store the random absolute positions for each object
		var randQues = [];  //store the turns of the pointer to go i.e questions
		var objects = ['apple','banana','boat','book','bus','cake',
		               'car','cow','flower','hat','kite','lamp',
		               'pig','pigeon','rat','tomato','tree'
		        ];
		var pointers = ['ladybird','ant'];
		var pointer;   //which pointer to use
		var currentWord;
		var flag_correct;
		
		var leftPositions = [-20,185,550,800,1025,-20,185,550,800,1025];    //array to store the left positions
		var topPositions = [5,10,50,60,20,350,360,365,240,340];
		var pointerStartTop,pointerStartLeft;
		var pointerStopTop,pointerStopLeft;
		var currentQuestion,totalCounter,correctCounter;
		
		var scoreboard = $('#score_box').scoreboard({'layout':'horizontal', 
		       'winningScore': TOTAL_QUES});
		
		var genRandObjects=function (){
		  	randObjects[0] = k.rand(0,TOTAL_OBJECTS-1);
			for(i=1; i<TOTAL_QUES; i++){
					do{
						flag = 0;
						randObjects[i] = k.rand(0,TOTAL_OBJECTS-1);
						for(j=0; j<i; j++){
							if(randObjects[i] === randObjects[j]){
								flag++;
							}
						}
					}while(flag != 0 );  //end of do while loop	
				}
		};	

		var genRandQues=function (){
		  	randQues[0] = k.rand(0,TOTAL_QUES-1);
			for(i=1; i<TOTAL_QUES; i++){
					do{
						flag = 0;
						randQues[i] = k.rand(0,TOTAL_QUES-1);
						for(j=0; j<i; j++){
							if(randQues[i] === randQues[j]){
								flag++;
							}
						}
					}while(flag != 0 );  //end of do while loop	
				}
		};	
		
		var generateAbsolutePositions = function(id,topPos,leftPos){
			var randNumImg = randObjects[id];
			$('#content').append('<div id="pos'+id+'"></div>');
			var objCss = {
					'position':'absolute',
					'top':topPos+'px',
					'left':leftPos+'px'
			};
			$('#pos'+id).css(objCss).html('<img src="assets/image/'+objects[randNumImg]+'.png" />');
		};
		
		
		var showQuestion = function(){
			//alert('show question');
			$('#content').append('<div id="questionSection"></div>');
			$('#questionSection').html('').append('<div id="question">What is this?</div>');
			$('#questionSection').append("<div id='answers'></div>");
			currentWord = objects[randObjects[currentQuestion]];
			$('#answers').append("It's ");
			if(currentWord[0] === 'a' || currentWord[0] === 'e' ||currentWord[0] === 'i' || currentWord[0] === 'o' || currentWord[0] === 'u'){
				$('#answers').append('an ');
			} else{
				$('#answers').append('a ');
			}
			$('#answers').append('<span id="word'+currentQuestion+'" class="objectWord"></span>');
			$('#answers').append('.');
			
			$('#word'+currentQuestion).append('<input type="text" id="box'+currentQuestion+'" class="blankBox"/>')
			$('#box'+currentQuestion).Watermark("?");
			$('.blankBox').focus();
			foucs_blur();
			
			
		};
		
		var nextQuestion = function(){
			flag_correct = 1;
			currentQuestion = randQues[totalCounter];
			if(totalCounter === 0){
				pointerStartLeft = k.rand(10,1000);
				pointerStartTop = k.rand(5,500);
			} else{
				pointerStartLeft = pointerStopLeft;
				pointerStartTop = pointerStopTop;
			}
			pointerStopLeft =   leftPositions[currentQuestion]+70;
			pointerStopTop =   topPositions[currentQuestion]+70;
				
			$('#content').append('<div id="wordPointer"></div>');
			
			var wordPointerCss = {
					'position':'absolute',
					'top':pointerStartTop+'px',
					'left':pointerStartLeft+'px',
					'background-color':'#F5F29E'
			};
			$('#wordPointer').css(wordPointerCss).addClass('pointerBg').html('<img src="assets/image/'+pointers[pointer]+'.png" />');
			$('#wordPointer').animate(
					{top:pointerStopTop+'px',left:pointerStopLeft+'px'},2000,
					function(ev){    //callback function after the animation is complete
						//alert('animation complete');
						showQuestion();
					}
			);

		};
		
		function game(){
			$('#gameOver').hide();
			$('#content').removeClass('backOpaque');
			correctCounter = 0;
			totalCounter = 0;
			genRandQues();
			genRandObjects();
			pointer = k.rand(0,1);		
			
			//Generate the fixed absolute positions for the random images
			for(i = 0; i<leftPositions.length;i++){
				generateAbsolutePositions(i,topPositions[i],leftPositions[i]);
			}
			
			nextQuestion(); 
		}
		
		$('#linkStart').click(function(){
			game();
		});

		$('#linkPlayAgain').click(function(){
			game();		
		});
		
		var delay_gameOver = function(){
			document.delayForm.delayval.value = 1;
			$('#questionSection').html('');	
			$('#pos'+currentQuestion).html('');
			$('#content').addClass('backOpaque');
			$('#gameOver').show();
			$('#gameOver').html('');
			$('#gameOver').append('Game Over !!!');
			$('#gameOver').append('<div id="gameOverInfo">You got  <span class="specialText">'+correctCounter+
					'</span> correct out of <span class="specialText">'+totalCounter+'</span>   questions .</div>');
			
		};
		
		var delay_nextQues = function(){
			document.delayForm.delayval.value = 1;	
			$('#questionSection').html('');	
			$('#pos'+currentQuestion).html('');		
			nextQuestion();
		};


		var checkAnswer = function(){
	
			if(currentWord === $('.blankBox').val()){
				$('.blankBox').addClass("correct");				
				if(flag_correct === 1){
					correctCounter++;
					scoreboard.scoreboard('inc');
				}
				k.audio[currentWord].play();
				totalCounter++;
				scoreboard.scoreboard('incTotal');
					
				if(totalCounter === TOTAL_QUES){
					t=setTimeout(function(){delay_gameOver();},1000);
				}
				else{	
							
					t=setTimeout(function(){delay_nextQues();},1000);
					
				}			
			} 
			else{ //incorrect
				flag_correct = 0;
				$('.blankBox').addClass("incorrect");
				k.audio.incorrect.play();
								
			}
		};
		
		function foucs_blur(){
			$('input[type="text"]').bind({
				focus: function() {
				    $(this).removeClass('correct').removeClass('incorrect').addClass("focus");
				},
				blur: function(){
					 $(this).removeClass("focus");
				},
				keypress: function(event) {
					if(event.which === 13){
						checkAnswer();
					}	
				}
			});	
		}
		
		$('#linkHelp').mouseover(function(){
			$('#help').slideDown(2000);
		})
		.mouseout(function(){
			$('#help').slideUp(2000);
		});

		game();
		
	}); //end of k.ready
});	//end of document.read				   
			

