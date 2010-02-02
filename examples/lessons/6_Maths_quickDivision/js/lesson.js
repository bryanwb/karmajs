$(document).ready(function(){
	var k = Karma({
		audio: [{'name':'correct','file':'correct.wav'},
			{'name':'incorrect','file':'incorrect.wav'}
		]});
		  
	k.ready(function(){
		var i,j;
		var totalCounter;
		var currentQuestion;
		var TOTAL_QUES = 16;
		var randPositions = [];
		var numFst;
		var num2nd;
		var s = 0; var play = 0; var restart = 0;
		
		var checkTime = function(timePara){
		    if (timePara<10 )
		    {
			timePara="0" + timePara;
		    }
		    return timePara;
		};
		
		var startTimer = function(){
					s=checkTime(s);					
					$('#timerBox1').html(s);
					increaseTime();					
		};
		
		var increaseTime = function(){
		    if(play == 1){
				if(restart == 1){
				s = 0;
				}
			s++;
			s=checkTime(s);				
			$('#timerBox1').html(s);
			var t=setTimeout(function(){increaseTime();},1000);			
		    }
		};

		var genRandPosition=function (){correctCounter = 0;
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
		var isInteger = function(s)
		{
		      var i;
			s = s.toString();
		      for (i = 0; i < s.length; i++)
		      {
		         var c = s.charAt(i);
		         if (isNaN(c)) 
			   {
		
				return false;
			   }
		      }
		      return true;
		};

		var next_question = function (){			
		
				var flag_done = 0;
				numFst = k.rand(12,99);
				num2nd = k.rand(2,12);	
				do{
					numFst = k.rand(20,99);
					if(isInteger(numFst/num2nd)){
						flag_done = 1;
					}
				}while(flag_done!=1);
				$('#calcSection').html('').append(numFst +' &#247; '+num2nd+' = ');
				$('#calcSection').append('<input type="text" class="textBox" maxlength="3" />');
				foucs_blur();				
				$('.textBox').focus();

		};

		function game_start(){			
			genRandPosition();
			play = 1;
			startTimer();
			next_question();		
		}
		
		function game() {
			totalCounter = 0;	
			s = 0; play = 0; restart = 0;
			$('#section').html('').append('<div id="left-side"></div>');
			$('#left-side').append('<div id="tv"></div>');
			$('#tv').append('<div id="tvLayer"></div>');
			$('#tvLayer').addClass('tvOff');
			$('#left-side').append('<div id="cupBoard"></div>');			
			$('#section').append('<div id="right-side"></div>');
			$('#right-side').append('<div id="borderWall"></div>');
			$('#borderWall').append('<div id="imgDisplay"></div>');			
			for(var i = 0; i< TOTAL_QUES; i++){
				$('#imgDisplay').append('<div id="img'+i+'></div>');
				$('#img'+i).addClass('default');				
			}			
			$('#right-side').append('<div id="calcSection"></div>');
			
			$('#help').hide();
			
		}
		game();
		var delay_nextQues = function(){
			document.delayForm.delayval.value = 1;
			next_question();
		};
		
		var delay_gameOver = function(){
			document.delayForm.delayval.value = 1;
			$('#calcSection').html('');
			play = 0;
			for(var i = 0; i< TOTAL_QUES; i++){
				$('#imgDisplay').append('<div id="img'+i+'></div>');
				$('#img'+i).removeClass('correct').addClass('default');				
			}
			$('#tvLayer').addClass('tvOn').append('खेल खत्तम।');
						
		};
	
		var check_answer = function(){	
			textVal = $('.textBox').val();
			if((numFst/num2nd) == textVal){
				totalCounter++;
				k.audio.correct.play();
				$('#img'+randPositions[totalCounter]).removeClass('default').addClass('correct');
				if(totalCounter === TOTAL_QUES){
					t=setTimeout(function(){delay_gameOver();},1000);
				}
				else{
					t=setTimeout(function(){delay_nextQues();},1000);
				}
			}
			else{
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
			
		}
		
		$('#linkStart').click(function(){
			game_start();
		});
	
		$('#linkPlayAgain').click(function(){
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