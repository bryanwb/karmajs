$(document).ready(function(){
	var k = Karma({
		audio: [{'name':'correct','file':'correct.ogg'},
		        {'name':'incorrect','file':'incorrect.ogg'}
		]});
		  
	k.ready(function(){
		var i,j,flag;
		var TOTAL_QUES = 8;
		var TOTAL_LEVEL = 3;
		var currentDragObject;
		var randPositions = [];
		var randImages = [];
		var randOptions = [];
		var totalCounter;
		var correctCounter;
		var currentQuestion;
		var currentDragObject;
		var arrangedAns = [];
		var checked;
		var sectionNum;  //store the current tab num
		var flag_checked;
		var currentQues;  //store the current Animal name
		var currentAnimal; //store the current Animal Image name
		var correctQuest;   //store 1 if the question and image is same
		
		var animals = new Array('tiger','elephant','jackel','bear','rhino','monkey','turtle','snake',
								'duck','cock','pig','cow','goat','horse','sheep','rabbit',
								'parrot','mynah','crow','sparrow','egret','pigeon','owl','eagle'
					);
		var answersOpts = new Array('Yes','No','it','is',"isn't");
		var tabs = new Array('wild','domestic','bird');
		var correctYes = new Array('Yes','it','is');
		var correctNo = new Array('No','it',"isn't");
		
		var scoreboard = $('#score_box').scoreboard({'layout':'horizontal', 
		       'winningScore': 8});
		/*scoreboard.bind('winGame',function(){    //needs total score counter to be checked problem
				$('#gameOver').show();
				$('#dot').hide();
				$('#questionSection').hide();
				$('#gameOver').append('Game Over !!!');
				$('#gameOver').append('<div id="gameOverInfo">You got  <span class="specialText">'+correctCounter+
						'</span> correct out of <span class="specialText">'+totalCounter+'</span>   questions .</div>');
				
		}); 
		*/
		
		var genRandOpts=function (){
			randOptions[0] = k.rand(0,4);
			for(i=1; i<5; i++){
					do{
						flag = 0;
						randOptions[i] = k.rand(0,4);
						for(j=0; j<i; j++){
							if(randOptions[i] === randOptions[j]){
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
		var genRandPosition=function (){
		  	randPositions[0] = k.rand(0,TOTAL_QUES-1);
			for(i=1; i<TOTAL_QUES; i++){
					do{
						flag = 0;
						randPositions[i] = k.rand(0,TOTAL_QUES-1);
						for(j=0; j<i; j++){
							if(randPositions[i] === randPositions[j]){
								flag++;
							}
						}
					}while(flag != 0 );  //end of do while loop	
				}
		};	
		var display_game_over = function(){
			$('#dot').hide();
			$('#gameOver').show();			
			$('#questionSection').html('').append('<div id="gameOver"></div>');
			$('#gameOver').append('Game Over !!!');
			$('#gameOver').append('<div id="gameOverInfo">You got  <span class="specialText">'+correctCounter+
					'</span> correct out of <span class="specialText">'+totalCounter+'</span>   questions .</div>');
			
		};
		var display_control = function(){
			if(checked === 1){
				next_questions();		
			}		
		};
		var delay_correctShow = function(){
			document.delayForm.delayval.value = 1;
			$('#checkAnswer').hide();
			display_control();						
		}
		
		var check_answers = function(){
			$('#checkAnswer').show();
			var correct = 0;
			var correctCheck = 0;
			if(correctQuest === 1){
				for(var i = 0 ; i< 3; i++){
					if(arrangedAns[i] === correctYes[i]){
						correct++;
					}
				}
				if(correct === 3){
					correctCheck = 1;
				}
			}
			else{
				for(var i = 0 ; i< 3; i++){
					if(arrangedAns[i] === correctNo[i]){
						correct++;
					}
				}
				if(correct === 3){
					correctCheck = 1;
				}
			}				
			if(correctCheck === 1){
				if(flag_checked === 0){
					scoreboard.scoreboard('inc');
					correctCounter++;
				}
				k.audio.correct.play();
				$('#checkAnswer').html('<img src="assets/image/correct.png" />');
				checked = 1;
				totalCounter++;
				scoreboard.scoreboard('incTotal');			
			}
			else{
				k.audio.incorrect.play();
				$('#checkAnswer').html('<img src="assets/image/incorrect.png" />');
				checked = 0;
				flag_checked = 1;
			}
			t=setTimeout(function(){delay_correctShow();},1000);
		};
		
		var assignTabs = function (tabId){
			$('#tabs').append('<div id="tabs'+tabId+'" class="tabBox"></div>');
			var tabImgCss = {
					'width': '179px',
					'height': '50px',
					'background-image': 'url("assets/image/'+tabs[tabId]+'.png")',
					'background-repeat': 'no-repeat'
			};
			$('#tabs'+tabId).css(tabImgCss);
			$('#tabs'+tabId).click(function(){
				for(j = 0; j<TOTAL_LEVEL; j++){
					if(tabId === j){
						$('#tabs'+j).addClass('tabSelected');
					}
					else{
						$('#tabs'+j).removeClass('tabSelected');
					}
				}
				sectionNum = tabId;
				game();
			});
		};
		
		var assignAns = function (ansId){
			$('#answerSection').append('<div id="drop'+ansId+'" class="dropObjects"></div>');
			var dropObjCss = { 
					'width':'125px','height': '30px','margin':'1.7em 0.5em 0.2em 0.5em' ,
					'border-bottom': '2px solid black','float':'left'
				};
			$('.dropObjects').css(dropObjCss);			
		};
		
		var assignDragAns = function (optId){
			$('#dragAnswers').append('<div id="drag'+optId+'" class="dragObjects">'+answersOpts[optId]+'</div>');
			var dragObjCss = {
					'float': 'left','cursor': 'move',
					'height':'30px','padding': '0px 1em',
					'font':'20px/25px bold Arial,Verdana,Geneva,Helvetica'
				};
			$('.dragObjects').css(dragObjCss);	
		};
		
		var next_questions = function(){
			if(totalCounter === TOTAL_QUES){
				display_game_over();
			}
			else{
				currentQuestion = totalCounter;
				flag_checked = 0;
				genRandOpts();
				for(i=0; i<3; i++){
					arrangedAns[i] = 0;
				}
				var randImage = randImages[currentQuestion]+(sectionNum*TOTAL_QUES);			
				var randNum = randPositions[currentQuestion]+(sectionNum*TOTAL_QUES);
				currentQues = animals[randNum];
				currentAnimal = animals[randImage];
				$('#questionSection').html('');
				$('#imgAnimals').html('<img class="imgAnim" src = "assets/image/'+currentAnimal+'.png" />');
				$('#questionSection').append('<div id="ques'+currentQuestion+'" class="questions"></div>');
				$('#ques'+currentQuestion).append(totalCounter+1+'.').append(' Is this ');			
				 
				if(currentQues[0] === 'a' || currentQues[0] === 'e' ||currentQues[0] === 'i' ||currentQues[0] === 'o' ||currentQues[0] === 'u'){
					$('#ques'+currentQuestion).append('an ');
				}
				else{
					$('#ques'+currentQuestion).append('a ');
				}
				$('#ques'+currentQuestion).append(currentQues+' ?');	
				if(currentAnimal === currentQues){
					correctQuest = 1;
				}
				else{
					correctQuest = 0;
				}
				$('#questionSection').append('<div id="answerSection"></div>');
				for(i = 0; i<3 ;i++){
					assignAns(i);
				}	
				$('#answerSection').append('<div id="comma"></div>');	
				$('#section').append('<div id="dot"></div>');	
				$('#questionSection').append('<div id="dragAnswers"></div>');
				var randOption;
				for(i = 0; i<5 ;i++){
					randOption = randOptions[i]; 
					assignDragAns(randOption);
				}
				drag_drop();
			}
									
		};
		
		function game(){	
			scoreboard.scoreboard('reset');
			$('#linkNext').hide();
			$('#gameOver').hide();
			correctCounter = 0;
			totalCounter = 0;	
			genRandPosition();
			genRandImages();
			$('#section').html('');
			$('#tabs1').removeClass('tabSelected');
			$('#tabs2').removeClass('tabSelected');
			$('#tabs'+sectionNum).addClass('tabSelected');
			$('#section').append('<div id="imgAnimals"></div>');
			$('#section').append('<div id="questionSection"></div>');
			next_questions();
		}	
		for(i = 0; i< TOTAL_LEVEL; i++){
			assignTabs(i);
		}
		sectionNum = 0;
		
		$('#linkCheck').click(function(){
			check_answers();
		});
		$('#linkStart').click(function(){
			
			sectionNum = 0;
			game();
		});
	
		$('#linkPlayAgain').click(function(){
			game();		
		});
	
		function drag_drop(){
			$('.dragObjects').draggable({ containment: '#content'});	
			$('.dragObjects').bind('dragstart', function(event, ui) {
				currentDragObject = event.target.id;	
			});
			
			$(".dropObjects").droppable({ tolerence: 'intersect' ,hoverClass: 'drophover' });
			$('.dropObjects').bind('drop', function(event, ui) {
				var currentDropObject = event.target.id;
				var droppedWord = parseInt(currentDropObject.substring(4));
				arrangedAns[droppedWord] = $('#'+currentDragObject).text();
			});
		}
		
		
	}); //end of k.ready
});	//end of document.ready