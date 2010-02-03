$(document).ready(function(){
	var k = Karma({
		audio: [{'name':'correct','file':'correct.wav'},
			{'name':'incorrect','file':'incorrect.wav'}
		]});
		  
	k.ready(function(){
		var i,j;
		var totalCounter;
		var correctCounter;
		var currentQuestion;
		var TOTAL_QUES = 8;
		var flag_correct;
		var randPositions = [];
		
		var question1 = new Array('एउटा झोलामा  x ओटा आपहरु छन ',
				'एउटा बिस्कुटको प्याकेटमा  x ओटा बिस्कुटहरु छन',
				'एउटा प्याकेटमा z ओटा कलमहरु छन', 
				'एउटा झोलामा  y ओटा आपहरु छन',
				'एउटा डालोमा  y ओटा आपहरु छन',
				'एउटा बिस्कुटको प्याकेटमा  x ओटा बिस्कुटहरु छन',
				'एउटा बिस्कुटको प्याकेटमा  x ओटा बिस्कुटहरु छन',
				'एउटा बट्टामा z ओटा कलमहरु छन'			
		);
		var question2 = new Array('x भनेको कति हो खनाएर हेर्दा थाहा हुन्छ',
				'x भनेको कति हो प्याकेट खोलेर  हेर्दा थाहा हुन्छ',
				'z भनेको कति हो प्याकेट खोलेर  हेर्दा थाहा हुन्छ',
				'y भनेको कति हो खनाएर हेर्दा थाहा हुन्छ',
				'y भनेको कति हो खनाएर हेर्दा थाहा हुन्छ',
				'x भनेको कति हो प्याकेट खोलेर  हेर्दा थाहा हुन्छ',
				'x भनेको कति हो प्याकेट खोलेर  हेर्दा थाहा हुन्छ',	
				'z भनेको कति हो बट्टा खोलेर  हेर्दा थाहा हुन्छ'
		);
		var infoQues = new Array('आप खन्याउन झोलामा  क्लिक गर्नुहोस',
				'प्याकेट खोल्न प्याकेटमा  क्लिक गर्नुहोस',
				'प्याकेट खोल्न प्याकेटमा  क्लिक गर्नुहोस',
				'आप खन्याउन झोलामा  क्लिक गर्नुहोस',
				'आप खन्याउन डालोमा  क्लिक गर्नुहोस',
				'प्याकेट खोल्न प्याकेटमा  क्लिक गर्नुहोस',
				'प्याकेट खोल्न प्याकेटमा  क्लिक गर्नुहोस',
				'बट्टा खोल्न बट्टामा  क्लिक गर्नुहोस'				
		);
		var infoQuesClicked = new Array('एउटा झोलामा 12 ओटा आपहरु रहेछन',
				'एउटा प्याकेटमा 10 ओटा बिस्कुटहरु रहेछन',
				'एउटा प्याकेटमा 10 ओटा कलमहरु रहेछन',
				'एउटा झोलामा 9 ओटा आपहरु रहेछन',
				'एउटा डालोमा 10 ओटा आपहरु रहेछन',
				'एउटा प्याकेटमा 15 ओटा बिस्कुटहरु रहेछन',
				'एउटा प्याकेटमा 20 ओटा बिस्कुटहरु रहेछन',
				'एक बट्टामा 4 ओटा कलमहरु छन'
		);	
		
		var answers = new Array('12','10','10','9','10','15','20','4');
		
		var scoreboard = $('#score_box').scoreboard({'layout':'horizontal', 
		       'winningScore': TOTAL_QUES});
		
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
		
		var next_question = function (){
			currentQuestion = randPositions[totalCounter];
			flag_correct = 1;
			$('.bgAns').hide();
			$('#linkCheck').hide();
			$('.bgQues').html('<img id="img'+currentQuestion+'" src="assets/image/img'+currentQuestion+'.png" />');
			$('#question1').addClass('quesText').html(question1[currentQuestion]+' ।');
			$('#question2').addClass('quesText').html(question2[currentQuestion]+' ।');
			$('.bgInfo').addClass('quesText').html(infoQues[currentQuestion]+' ।');

			$('#img'+currentQuestion).click(function(){
				$('#linkCheck').show();
				$('.bgQues').html('<img id="img'+currentQuestion+'" src="assets/image/img'+currentQuestion+'Clicked.png" />');
				$('.bgAns').show();
				$('.bgAns').html('').append('<div id="ans'+currentQuestion+'" class="quesText">तेसो भए यहा  x = </div>');
				$('#ans'+currentQuestion).append('<input type="text" class="textBox" maxlength = "2" />');
				$('#ans'+currentQuestion).append(' हुन्छ ।');
				$('.bgInfo').addClass('quesText').html(infoQuesClicked[currentQuestion]+' ।');
				foucs_blur();
			});
			
		};
		
		function game_start(){
			$('#gameOver').hide();
			$('#linkCheck').show();
			$('#section').removeClass('backOpaque');
			genRandPosition();			
			next_question();	
		}
		
		function game() {
			totalCounter = 0;			
			$('#section').html('').append('<div id="left-side"></div>');
			$('#left-side').append('<div id="topText">चलको मान पत्ता लगाउ </div>');
			$('#left-side').append('<div class="bgQues"></div>');
			$('#left-side').append('<div class="bgAns"></div>');
			$('#section').append('<div id="right-side"></div>');
			$('#right-side').append('<div id="question1" class="bgQuestion"></div>');
			$('#right-side').append('<div id="question2" class="bgQuestion"></div>');
			$('#right-side').append('<div class="bgInfo"></div>');
			$('#help').hide();
			$('.bgAns').hide();
			$('#linkCheck').hide();
			$('#gameOver').hide();
		}
		
		game();
		
		var delay_nextQues = function(){
			document.delayForm.delayval.value = 1;
			next_question();
		}
		
		var delay_gameOver = function(){
			document.delayForm.delayval.value = 1;
			$('#section').addClass('backOpaque');
			$('#linkCheck').hide();
			$('#gameOver').show();
			
		};
		var check_answer = function(){
			var textVal = $('.textBox').val();
			if(answers[currentQuestion] === textVal){
				if(flag_correct === 1){
					correctCounter++;
					scoreboard.scoreboard('inc');
				}
				k.audio.correct.play();
				totalCounter++;
				scoreboard.scoreboard('incTotal');
				if(totalCounter != TOTAL_QUES){
					t=setTimeout(function(){delay_nextQues();},1000);
				}
				else{
					t=setTimeout(function(){delay_gameOver();},1000);
				}				
			}
			else{
				flag_correct = 0;
				k.audio.incorrect.play();
			}
		};
		
		function foucs_blur(){
			$('input[type="text"]')
			.focus(function() {
			    $(this).removeClass('incorrect').addClass("focus");
			})
			.blur(function() {
			    $(this).removeClass("focus");
			})
			.keypress(function(event) {
				if(event.which === 13){
					check_answer();
				}
			});
			
			$('#linkCheck').click(function(){
				check_answer();
			});
		}
		
		$('#linkStart').click(function(){
			game_start();
		});
	
		$('#linkPlayAgain').click(function(){
			scoreboard.scoreboard('reset');
			game_start();		
		});
		$('#linkHelp').click(function(){
			$('#help').slideDown(2000);
		})
		.mouseout(function(){
			$('#help').slideUp(2000);
		});
	}); //end of k.ready
});	//end of document.ready