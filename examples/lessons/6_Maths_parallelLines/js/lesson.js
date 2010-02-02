$(document).ready(function(){
	var k = Karma({
		audio: [{'name':'correct','file':'correct.wav'},
			{'name':'incorrect','file':'incorrect.wav'}
		]});
	
	k.ready(function(){
		var currentLesson;
		var i,j;
		var flag_correct;
		var TOTAL_QUES = 10; 
		var currentQuestion;
		var correctCounter;
		var totalCounter;
		var imgVal;
		var checked;
		var question = new Array('AB र CB समानान्तर रेखा','MN र PQ समानान्तर रेखा','XY र RS समानान्तर रेखा',
								'AB र CD समानान्तर रेखा','AB र CD समानान्तर रेखा','AB र BC समानान्तर रेखा','AB र CD समानान्तर रेखा',
								'XAY र BC समानान्तर रेखा','AB र BC समानान्तर रेखा','ABC र DE एक आपसमा  समानान्तर रेखा'
								);
		var answers = new Array(1,0,0,0,1,1,0,0,1,1);   //0 for yes and 1 for 1
		var definitions = new Array('Yes','No');
		var scoreboard = $('#score_box').scoreboard({'layout':'horizontal', 
		       'winningScore': TOTAL_QUES});
		
		var displayLessons = function(){
			$('#content').html('').append('<div id="lesson"></div>');
			if(currentLesson === 0){
				var imgDef = "defParallelLines";
				var imgLesson = "imgParallelLines";
				var imgInfo = "infoParallelLines";
			}
			else{
				var imgDef = "defIntersectLines";
				var imgLesson = "imgIntersectLines";
				var imgInfo = "infoIntersectLines";
			}
			$('#lesson').append('<img id="lessonHeader" src="assets/image/'+imgDef+'.png" />');		
			$('#lesson').append('<img id="lessonImage" src="assets/image/'+imgLesson+'.png" />');
			$('#lesson').append('<img id="lessonInfo" src="assets/image/'+imgInfo+'.png" />');
		};		
		
		var assignOptions = function(imgId){
			$('#optionSection').append('<div id="check'+imgId+'" class="checkDisplay"></div><img id="opt'+imgId+'" class="imgOption" src="assets/image/img'+definitions[imgId]+'.png" />');
			$('#opt'+imgId).click(function(){
				checkAnswer(imgId);
			});
		};
		
		var nextQuestions = function(){
			currentQuestion = totalCounter;
			flag_correct = 1;
			$('#content').html('').append('<img src="assets/image/topText.png" />');
			$('#content').append('<div id="quesDisplay"></div>');
			$('#content').append('<div id="questionSection"></div>');
			$('#questionSection').append('<div id="question"></div>');
			$('#questionSection').append('<div id="optionSection"></div>');
			$('#content').append('<div id="defSection"></div>');
			
			$('#quesDisplay').html('<img src="assets/image/ques'+currentQuestion+'.png />');
			$('#question').html(question[currentQuestion]);
			$('#optionSection').html('');
			for(i = 0; i<2; i++){
				assignOptions(i);
			}			
		}; 
		
		var displayGameOver = function(){
			$('#content').addClass('backOpaque');
			$('#gameOver').show();
			if(correctCounter === totalCounter){		
				$('#gameOver').html('बधाई छ !!!  सबै उत्तर सहि भए !!! ');
			}
			else{
				$('#gameOver').html('<div id="gameOverInfo">किन गलत भयो पत्ता लगाउ र अर्को पटक सहि बनाउने कोशिश गर । <br /> You Got <span class="specialText">'+correctCounter+
				'</span> correct out of <span class="specialText">'+totalCounter+'</span>   questions .</div>');
			}	
		};
		
		var delayCorrectShow = function(){
			document.delayForm.delayval.value = 1;
			if(checked === 1){
				if(totalCounter === 10){
					displayGameOver();
				}
				else{
					nextQuestions();
				}
			}
			$('.checkDisplay').html('');			
		};			
		
		var checkAnswer = function(optId){
			if(optId == answers[currentQuestion]){
				checked = 1;
				k.audio.correct.play();
				if(flag_correct === 1){
					correctCounter++;
					scoreboard.scoreboard('inc');
				}
				totalCounter++;
				scoreboard.scoreboard('incTotal');			
				$('#check'+optId).html('<img src="assets/image/correct.png" />');
				
			}
			else{
				flag_correct = 0;
				checked = 0;
				k.audio.incorrect.play();
				$('#check'+optId).html('<img src="assets/image/incorrect.png" />');
				$('#defSection').html('<img src="assets/image/defParallel'+definitions[answers[currentQuestion]]+'.png" />');				
			}
			t=setTimeout(function(){delayCorrectShow();},1000);			
		};
		
		function gameStart(){
			$('#linkNextLesson').hide();
			$('#linkPrevLesson').hide();
			totalCounter = 0;
			correctCounter = 0;
			nextQuestions();			
		}
		
		function game(){
			$('#linkPrevLesson').hide();
			$('#content').removeClass('backOpaque');
			$('#gameOver').hide();
			currentLesson = 0;
			displayLessons();
		}
		
		game();
		
		$('#linkNextLesson').click(function(){
			$('#linkNextLesson').hide();
			$('#linkPrevLesson').show();
			currentLesson = 1;
			displayLessons();
		});
		$('#linkPrevLesson').click(function(){
			$('#linkNextLesson').show();
			$('#linkPrevLesson').hide();
			currentLesson = 0;
			displayLessons();
		});
		$('#linkStart').click(function(){
			gameStart();
		});
	
		$('#linkPlayAgain').click(function(){
			game();		
		});
		$('#linkHelp').mouseover(function(){
			$('#help').slideDown(2000);
		})
		.mouseout(function(){
			$('#help').slideUp(2000);
			
		});
			}); //end of k.ready
		});	//end of document.read				   
			

