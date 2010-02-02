$(document).ready(function(){
	var k = Karma({
		audio: [{'name':'correct','file':'correct.ogg'},
			{'name':'incorrect','file':'incorrect.ogg'}
		]});
		  
	k.ready(function(){
		var i,j,flag;
		var TOTAL_QUES = 6;
		var TOTAL_LEVEL = 3;
		var currentDragObject;
		var randPositions = [];
		var arrangedAns = [];
		var sectionNum;  //store the three levels values 0,1,2
		var currentAlphaNum;  //store the current questions num
		var checked; //store the current checked value
		var num;
		var currentAnsArray = [];  //store the current array set of alphabets
		var flag_checked; //status flag for one time correct alpahbetical order
		var imgCounter;
		// six alphabets given to be ordered 6 steps needed to complete the picture 3 levels too complex
		var alphabets = new Array('aeroplane','apple','ant','arrow','audio','axe',
									'eagle','ear','east','egg','elephant','engine',
									'fan','fall','fat','first','fog','fun',
									'egg','goat','ladder','leaf','net','tiger',
									'crocodile','deer','elephant','lion','rhinosorous','tiger',
									'bus','flag','glass','nose','pencil','table',			
									'bag','ball','banana','bat','bed','bone',
									'cat','camera','class','color','country','cream',
									'cat','cow','dog','donkey','hen','rabbit',
									'dam','dark','den','dog','drink','duck',
									'glass','nail','picture','radio','star','watch',
									'bus','flag','glass','nose','pencil','table',									
									'magic','man','many','master','miracle','mouse',
									'pan','pencil','pig','pot','practice','pumpkin',
									'salte','school','short','smile','snake','stick',
									'axe','mountain','plate','umbrella','volley-ball','x-ray',
									'television','temple','toggle','trap','trust','turn',
									'bottle','fish','house','pan','tree','window'										
						);
		var imageDisplay = new Array('ele0','ele1','ele2','ele3','ele4','ele5','house0','house1','house2','house3','house4','house5',
									'ship0','ship1','ship2','ship3','ship4','ship5');
		var scoreboard = $('#score_box').scoreboard({'layout':'horizontal', 
		       'winningScore': alphabets.length});
 
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
		var assignAlphabets = function (alphaId){	
			var alphaCloudId = 1;   //for positioning only
			if(alphaId>2){
				alphaCloudId = 2;
			}		
			var alphaCurId = alphaId + (currentAlphaNum*TOTAL_QUES);
			$('#alphaCloud'+alphaCloudId).append('<div id="drag'+alphaId+'" class="dragObjects">'+alphabets[alphaCurId]+'</div>');
			var dragObjCss = {
					'position':'relative','float': 'left','cursor': 'move',
					'width':'100px','height':'30px','padding-left': '20px',
					'font':'20px/25px bold Arial,Verdana,Geneva,Helvetica'
				};
			$('.dragObjects').css(dragObjCss);	
			
			$('#alphaArrange').append('<div id="drop'+num+'" class="dropObjects"></div>');
			var dropObjCss = { 
					'width':'222px','height': '33px','margin': '0.65em 0.5em'				
				};
			$('.dropObjects').css(dropObjCss);	
			num++;
		};
		
		function drag_drop(){
			$('.dragObjects').draggable({ containment: '#content'});	
			$('.dragObjects').bind('dragstart', function(event, ui) {
				currentDragObject = event.target.id;	
				var currentMonth = parseInt(currentDragObject.substring(4));

			});
			
			$(".dropObjects").droppable({ tolerence: 'intersect' ,hoverClass: 'drophover' });
			$('.dropObjects').bind('drop', function(event, ui) {
				var currentDropObject = event.target.id;
				var droppedWord = parseInt(currentDropObject.substring(4));
				arrangedAns[droppedWord] = $('#'+currentDragObject).text();
			});
		}
		var display_control = function(){
			if(checked === 1){
				$('#disImg'+imgCounter).show();
				imgCounter++;
				next_alphabets();	
			}
			
		};
		var delay_correctShow = function(){
			document.delayForm.delayval.value = 1;
			$('#checkAnswer').hide();
			if(currentAlphaNum%6 === 0 && currentAlphaNum != 0){ //next level
				$('#section').html('');
				$('#linkNext').show();
			}
			else{
			display_control();
			}
		};
		
		var check_alphabets_order = function(){
			var correct = 0;	
			for(i=0; i<TOTAL_QUES; i++){
				//var alpha = i+(currentAlphaNum*TOTAL_QUES);
				if(arrangedAns[i] === currentAnsArray[i] && arrangedAns.length != 0){
					correct++;
				}
			}
			$('#checkAnswer').show();
			if(correct === TOTAL_QUES){
				if(flag_checked === 0){
					scoreboard.scoreboard('inc');
				}
				currentAlphaNum++;
				checked = 1;
				k.audio.correct.play();
				$('#checkAnswer').html('<img src="assets/image/correct.png">');
				scoreboard.scoreboard('incTotal');
			}
			else{
				k.audio.incorrect.play();
				$('#checkAnswer').html('<img src="assets/image/incorrect.png">');
				checked = 0; 
				flag_checked = 1;
			}
			
			t=setTimeout(function(){delay_correctShow();},1000);
			
			
			
			
		};
		var display_game_over = function(){
			
				$('#section').hide();
				$('#gameOver').show();
				$('#gameOver').html('');
				$('#gameOver').append('GAME OVER<br/>Congratulations!!!');
		};
		var next_alphabets = function(){
			if(currentAlphaNum === alphabets.length){   //show all
				display_game_over();
			}
			else{	
					$('#section').html('').append('<div id="alphaCloud1"></div>');
					$('#section').append('<div id="alphaCloud2"></div>');
					$('#section').append('<div id="topText">Rearrange the above words in alphabetical order.</div>');
					$('#section').append('<div id="alphaArrange"></div>');
					genRandPosition();		
					num = 0;
					flag_checked = 0;
					for(i = 0; i< TOTAL_QUES ; i++){
						assignAlphabets(randPositions[i]);			
					}
					for(i = 0;i<TOTAL_QUES;i++){
						var curAlphabet = (currentAlphaNum*TOTAL_QUES)+i;
						currentAnsArray[i] = alphabets[curAlphabet];
					}
					currentAnsArray.sort();					
					drag_drop();
				
			}
		};
		function game_start(){
			$('#gameOver').hide();
			$('#displayImgArea').show();
			$('#displayImgArea').html('');
			imgCounter = 0;
			for(i = 0;i<TOTAL_QUES;i++){
				imgId = i + (sectionNum*TOTAL_QUES);
				$('#displayImgArea').append('<img id="disImg'+i+'" class="imgDisplay" src="assets/image/'+imageDisplay[imgId]+'.png" width="30%" height="50%">');
				$('#disImg'+i).hide();
			}
			next_alphabets();
		}
		$('#linkNext').hide();
		$('#linkCheck').click(function(){
			check_alphabets_order();
		});
		$('#linkNext').click(function(){
			$('#linkNext').hide();
			sectionNum += 1;
			game_start();
		});
		$('#linkStart').click(function(){
			sectionNum = 0;
			currentAlphaNum = 0;
			game_start();
		});
	
		$('#linkPlayAgain').click(function(){
			scoreboard.scoreboard('reset');
			currentAlphaNum = sectionNum*currentAlphaNum;
			game_start();		
		});
	}); //end of k.ready
});	//end of document.ready