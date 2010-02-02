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
		var TOTAL_QUES = 6;
		var flag_correct;
		var randPositions = [];
		var check_num;
		
		var variableName = new Array('x','p','y','x','x','r');	
		var perPack = new Array('16','80','25','30','15','70');	
		var quantity = new Array('4','1','2','3','2','1');
		var finishedQty = new Array('8','30','16','7','7','22'); 
		
		var answers = new Array('58','50','34','97','37','48');
		
	
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
			if(totalCounter === TOTAL_QUES){
				t=setTimeout(function(){delay_gameOver();},1000);
			}
			else{
				currentQuestion = randPositions[totalCounter];
				currentQuestion = totalCounter;
				flag_correct = 1;
				check_num = 0;
				var sign;
				$('#linkCheck').show();
				$('#left-side').html('<img id="img'+currentQuestion+'" src="assets/image/img'+currentQuestion+'.png" />');
				//$('#left-side').html('<img id="img'+currentQuestion+'" src="assets/image/img0.png" />');
				
				$('#rightBack').css({'background':'url(assets/image/ques'+currentQuestion+'.png)'});
				$('.bgCalculation').html('').append('<div id="textQues1"></div>');
				$('.bgCalculation').append('<div id="textQues2"></div>');
				
				if(currentQuestion ===3 || currentQuestion === 4){
					sign = '+';
				}
				else{
					sign = '-';
		
				}
				for( i = 0; i< quantity[currentQuestion]; i++){
					$('#textQues1').append(variableName[currentQuestion]);
					$('#textQues2').append('<span class="blankBoxes"></span>');
					if(i != quantity[currentQuestion]-1){
						$('#textQues1').append('+');
						$('#textQues2').append('+');
					}
					else{						
					
						if(parseInt(quantity[currentQuestion]) === 1){
							$('#textQues1').append(sign+''+finishedQty[currentQuestion]);
							$('#textQues1').append(' = ').append(variableName[currentQuestion]);
							$('#textQues1').append(sign+''+finishedQty[currentQuestion]);
							$('#textQues2').append(sign+''+finishedQty[currentQuestion]);
							$('#textQues2').append(' = ').append('<input type="text" id="text1" class="textBox" maxLength="2"/>');						
							$('#textQues2').append(sign+''+finishedQty[currentQuestion]);
						}
						else{
							$('#textQues1').append(sign+''+finishedQty[currentQuestion]);
							$('#textQues1').append(' = ').append(quantity[currentQuestion]+' * '+variableName[currentQuestion]);
							$('#textQues1').append(sign+''+finishedQty[currentQuestion]);
							$('#textQues2').append(sign+''+finishedQty[currentQuestion]);
							$('#textQues2').append(' = ').append(quantity[currentQuestion]+' *'+'<input type="text" id="text1" class="textBox" maxLength="2"/>');							
							$('#textQues2').append(sign+''+finishedQty[currentQuestion]);
						}
						
						
					}
					$("input#text1").focus();
				}
			
	
				foucs_blur();
				
			}
			
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
			correctCounter = 0;
			$('#section').html('').append('<div id="left-side"></div>');
			$('#section').append('<div id="right-side"></div>');
			$('#right-side').append('<div id="rightBack"></div>');
			$('#right-side').append('<div class="bgCalculation"></div>');
			$('#help').hide();
			$('#linkCheck').hide();
			$('#gameOver').hide();
		}
		
		game();
		
		var delay_nextQues = function(){
			document.delayForm.delayval.value = 1;
			next_question();
		};
		
		var delay_gameOver = function(){
			document.delayForm.delayval.value = 1;
			$('#section').addClass('backOpaque');
			$('#linkCheck').hide();
			$('#gameOver').show();			
		};
	
		var check_answer = function(){			
			if(check_num === 0){
				var textVal = $('#text1').val();
				if(textVal === perPack[currentQuestion]){  // first one is correct
					k.audio.correct.play();
					$('.bgCalculation').append('<div id="textQues3"></div>');
					$('.bgCalculation').append('<div id="textQues4"></div>');
					$('#textQues3').append(' = &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;').append('<input type="text" id="text2" class="textBox" maxLength="3"/>');
					$('#text1').attr("disabled", true);
					$('.blankBoxes').css({'padding':'0'}).html(perPack[currentQuestion]);
					check_num++;
					$("input#text2").focus();
					foucs_blur();
				}		
				else{
					k.audio.incorrect.play();
					flag_correct = 0;
				}
			}
			else{
				textVal =  $('#text2').val();
				//if(textVal === perPack[currentQuestion] * quantity[currentQuestion]){
				if(textVal === answers[currentQuestion]){
					k.audio.correct.play();
					if(flag_correct === 1){
						scoreboard.scoreboard('inc');
						correctCounter++;
					}
					scoreboard.scoreboard('incTotal');
					totalCounter++;
					t=setTimeout(function(){delay_nextQues();},1000);					
				}					
				else{
					flag_correct = 0;
					k.audio.incorrect.play();
				}
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