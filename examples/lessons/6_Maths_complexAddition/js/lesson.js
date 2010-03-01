$(document).ready(function(){
	var k = Karma({
		audio: [{'name':'correct','file':'correct.wav'},
			    {'name':'incorrect','file':'incorrect.wav'},
			    ]});
	
	k.ready(function(){
		var TOTAL_NUMS = 5;
		var MAX_NUM = 30;
		var imgCounter;
		var currentNum;  //store the current targeted num id 
		var currentPlayer;
		var players = ['Red','Blue'];
		var randNumbers = [];
		var flag_busy;
		var TIME_LIMIT = 5;  //within this time limit they have to answer the current question
		var stopTimer = function(){
			s = 0;
			clearTimeout(t);
		};
		var startTimer = function(){
			s = 0;
			increaseTime();					
		};
		

		var increaseTime = function(){
		    s++;
			if(s === TIME_LIMIT){
				play = 0;
				$('#content').addClass('backOpaque');
				$('#gameOver').html('!!!  फेरी खेलौ बटन मा क्लिक गर    !!! ');
		    }else{
		    	t=setTimeout(function(){increaseTime();},1000);
		    }
		    
		};
		var genRandomNumbers = function(){
			randNumbers[0] = k.rand(1,MAX_NUM-1); 
			for(i=1; i<TOTAL_NUMS; i++){
				do{
					flag = 0;
					randNumbers[i] = k.rand(1,MAX_NUM-1);
					for(j=0; j<i; j++){
						if(randNumbers[i]===randNumbers[j]){
							flag++;
						}
					}
				}while(flag != 0 );  //end of do while loop	
			}		
		};
		
		function showText(parentDiv,divName,topPos,leftPos,numText,color){ 
			var textCss = {
					'position':'absolute',
					'top':topPos+'em',
					'left':leftPos+'em',
					'font':'2em arial,verdana,geneva,helvetica',
					'color':'#'+color,
					'z-index':'5'
					};
			$('#'+parentDiv).append('<div id="'+divName+'"></div>');
			$('#'+divName).css(textCss).html(numText);
		}
		
		function showPicture(divName,imgName,topPos,leftPos){
			var imgCss = {
					'position':'absolute',
					'top':topPos+'em',
					'left':leftPos+'em',
					'z-index':'2'
				};
			$('#content').append('<div id="'+divName+'"></div>');
			$('#'+divName).css(imgCss).html('<img src="assets/image/'+imgName+'.png" />');
		}
		
		function imgAnimate(divName,topPos,leftPos,duration){
			$('#'+divName).animate(
					{top:topPos+'em',left:leftPos+'em'},duration,
					function(ev){
						flag_busy = 0;
						$('#txtInput'+players[currentPlayer]).focus();
						startTimer();
					}
					);	
		}
		
		var animateBoy = function(){				
			showPicture('imgBoy','blueBoy'+imgCounter,30.7,50);
			if(imgCounter != 4){
				var t=setTimeout(function(){animateBoy();},500);
			}else{
				currentNum = k.rand(0,4);
				var x = 23.5+(currentNum*9.5);
				showPicture('imgBlueRing','blueRing',29.5,50);
				imgAnimate('imgBlueRing',6.2,x,1000);
				showPicture('imgBoy','blueBoy0',30.7,50);
			}
			imgCounter++;
		};
		
		var animateGirl = function(){			
			showPicture('imgGirl','redGirl'+imgCounter,30.7,30);
			if(imgCounter != 4){
				var t=setTimeout(function(){animateGirl();},500);
			}else{
				currentNum = k.rand(0,4);
				var x = 23.5+(currentNum*9.5);
				showPicture('imgRedRing','redRing',29.5,34);
				imgAnimate('imgRedRing',6.2,x,1000);
				showPicture('imgGirl','redGirl0',30.7,30);
			}
			imgCounter++;
		};
		
		var nextQuestion = function(){
			genRandomNumbers();
			flag_busy = 1;
			for(var i = 0; i< 5; i++){
				showText('divNum'+i,'num'+i,2.5,1,randNumbers[i],'E5D700');
			}
			showPicture('imgBoy','blueBoy0',30.7,50);
			showPicture('imgGirl','redGirl0',30.7,30);
			imgCounter = 0;
			if(currentPlayer === 0){
				animateGirl();
			}else{
				animateBoy();
			}
			
			foucs_blur();
		};
		
		function game(){
			$('#content').removeClass('backOpaque').html('');
			for(var i = 0;i<5;i++){
				var x = 22+(i*9.5);
				showPicture('divNum'+i,'imgNumContainer',7,x);
			}
			showPicture('divScoreBox','scoreBox',15.5,22.5);
			
			showPicture('divtitle','title',2,27.5);
			showPicture('txtRedTotal','redTotal',16,24);
			showPicture('txtBlueTotal','blueTotal',16,48);
			showPicture('txtRedNumPlus','redNumPlus',21.5,24);
			showPicture('txtBlueNumPlus','blueNumPlus',21.5,48);
			
			//show current Score of numbers
			showText('txtRedTotal','divRedScore',1.5,2,0,'FFF');
			showText('txtBlueTotal','divBlueScore',1.5,2,0,'FFF');
			
			//text boxes for input
			showText('txtRedNumPlus','textInputRed',1.6,1.5,'<input type="text" id="txtInputRed" class="blankBox">','FFF');
			$('#txtInputRed').css({'color':'red','border':'2px solid #FF0000'});
			showText('txtBlueNumPlus','textInputBlue',1.6,1.5,'<input type="text" id="txtInputBlue" class="blankBox">','FFF');
			$('#txtInputBlue').css({'color':'blue','border':'2px solid #0000FF'});
			currentPlayer = 0;
			nextQuestion();
		};
		
		
		
		
		$('#linkStart').click(function(){
			game();
		});

		$('#linkPlayAgain').click(function(){
			game();		
		});
		
		$('#linkHelp').click(function(){
			$('#help').slideDown(2000);
		})
		.mouseout(function(){
			$('#help').slideUp(2000);
		});

		
		var checkAnswer = function(){
			if(flag_busy === 0){
				var currentScore = parseInt($('#div'+players[currentPlayer]+'Score').text());
				var inputTextVal = $('#txtInput'+players[currentPlayer]).val();
				var totalVal = currentScore + randNumbers[currentNum];
				if(totalVal == inputTextVal){
					stopTimer();
					k.audio.correct.play();
					inputTextVal = $('#txtInput'+players[currentPlayer]).val('');
					$('#div'+players[currentPlayer]+'Score').html(totalVal);
					$('#img'+players[currentPlayer]+'Ring').html('');
					 $('#txtInput'+players[currentPlayer]).blur();
					if(currentPlayer === 0){
						currentPlayer = 1;
					}else{
						currentPlayer = 0;
					}
					
					nextQuestion();
				}else{
					k.audio.incorrect.play();
				}
			}
		};
		
		function foucs_blur(){
			$('input[type="text"]').keypress(function(event) {
					if(event.which === 13){
						checkAnswer();
					}	
				
			});	
		}
		
	}); //end of k.ready
});	//end of document.read				   
			

