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
		var check_num;
		var infoQues1 = new Array('एउटा बट्टामा  y ओटा लडडुहरु छन ',
				'एउटा सीसाकलमको  बट्टामा  p ओटा सीसाकलमहरु छन', 
				'एउटा बोरामा r केजी  चामल  छ ',
				'एउटा सिसीमा z लिटर तेल छ ',
				'एउटा कार्टुनमा x प्याकेट चाउचाउ छन ',
				'एउटा डालोमा n ओटा नरिवलहरु छन ',
				'एउटा झोलामा  m केजी  आपहरु छन',
				'यो एउटा  बिस्कुटको प्याकेटमा  x ओटा बिस्कुटहरु छन '
		);
		
		var infoQues2 = new Array('यदि एउटा बट्टामा 20 ओटा लडडुहरु छन भने 5 ओटा  बट्टामा',
				'यदि एउटा बट्टामा 10 ओटा सीसाकलमहरु  छन भने 4 ओटा  बट्टामा',
				'यदि एउटा बोरामा 50  केजी  चामल  छ भने 4 ओटा  बोरामा जम्मा ',
				'यदि एउटा सिसीमा 2 लिटर तेल छ भने  4 ओटा  सिसीमा जम्मा ',
				'यदि एउटा कार्टुनमा 30 प्याकेट चाउचाउ  छन भने  3 ओटा  कार्टुनमा जम्मा ', 
				'यदि एउटा डालोमा 25 ओटा नरिवलहरु छन भने  3 ओटा  डालोमा जम्मा ', 
				'यदि एउटा झोलामा 7 केजी  आपहरु छन भने  2  ओटा  झोलामा जम्मा ',
				'यदि एउटा प्याकेटमा 15 बिस्कुट ओटा बिस्कुट छन भने  3 ओटा  प्याकेटमा जम्मा '	
		);
		
		var infoQues3 = new Array('ओटा लडडुहरु छन','सीसाकलमहरु छन','केजी  चामल  छ','लिटर तेल छ',
				'प्याकेट चाउचाउ छन','ओटा नरिवलहरु छन','केजी  आपहरु छन','बिस्कुटहरु छन'	
		);
		var variableName = new Array('y','p','r','z','x','n','m','x');
		var perPack = new Array('20','10','50','2','30','25','7','15');
		var quantity = new Array('5','4','4','4','3','3','2','3');
		var answers = new Array('100','40','200','8','90','75','14','45');
	
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
				//currentQuestion = totalCounter;
				flag_correct = 1;
				check_num = 0;
				$('#linkCheck').show();
				$('.bgQuesMain').html('<img id="img'+currentQuestion+'" src="assets/image/img'+currentQuestion+'.png" />');
				$('.bgQuesAns').html('<img id="img'+currentQuestion+'" src="assets/image/img'+currentQuestion+'More.png" />');
				$('.bgQuestion').addClass('quesText').html(infoQues1[currentQuestion]+' ।');
				$('.bgCalculation').addClass('quesText').html(infoQues2[currentQuestion]);
				$('.bgCalculation').append('<div id="textQues1"></div>');
				$('.bgCalculation').append('<div id="textQues2"></div>');
				for( i = 0; i< quantity[currentQuestion]; i++){
					$('#textQues1').append(variableName[currentQuestion]);
					$('#textQues2').append('<span class="blankBoxes"></span>');
					if(i != quantity[currentQuestion]-1){
						$('#textQues1').append('+');
						$('#textQues2').append('+');
					}
					else{
						$('#textQues1').append(' = ').append(quantity[currentQuestion]+' * '+variableName[currentQuestion]);
						$('#textQues2').append(' = ').append(quantity[currentQuestion]+' *'+'<input type="text" id="text1" class="textBox" maxLength="2"/>');
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
			$('#left-side').append('<div class="bgQuesMain"></div>');
			$('#left-side').append('<div class="bgQuesAns"></div>');
			$('#section').append('<div id="right-side"></div>');
			$('#right-side').append('<div class="bgQuestion"></div>');
			$('#right-side').append('<div class="bgCalculation"></div>');
			$('#help').hide();
			$('.bgAns').hide();
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
					$('#textQues4').append(infoQues3[currentQuestion]+' ।');	
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