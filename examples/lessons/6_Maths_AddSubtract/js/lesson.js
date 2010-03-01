$(document).ready(function(){     
	var k = Karma({
		audio: [{'name':'correct','file':'correct.wav'},
			    {'name':'incorrect','file':'incorrect.wav'},
			  ]});
	
	k.ready(function(){
		var i,j,s,t;
		var checked;
		var TOTAL_QUES = 16;
		var TOTAL_LEVEL = 3;
		var currentLevel;
		var click1Counter;
		var click2Counter; 
		var correctAns;
		var flag_correct;
		var flag_start = 0;   //for play again but not to throw error
		var totalCounter;
		var correctCounter;
		var randNumbers = [];
		var randImg = [];
		var signs = ['+','-'];
		var correctSigns = [];  //array to store the correct signs
		
		var nepaliNumbers = ['०','१','२','३','४','५','६',' ७','८','९']; 
		var scoreboard = $('#score_box').scoreboard({'layout':'horizontal', 
		       'winningScore': TOTAL_QUES});
		var clickValues = [];  //store the clicks couting index 0 for click 1st and index 1 for 2nd clickbox
		
		var checkTime = function(timePara){
		    if (timePara<10 ){
		    	timePara="00" + timePara;
		    }
		    else if (timePara<100 ){
		    	timePara="0" + timePara;
		    }
		    return timePara;
		};

		var stopTimer = function(){
			s = 0;
			clearTimeout(t);
		};
		var startTimer = function(){
			s = 0;
			s=checkTime(s);					
			$('#timerBox1').html(s);
			increaseTime();					
		};
		

		var increaseTime = function(){
		    s++;
			s=checkTime(s);				
			$('#timerBox1').html(s);
			if(s === 300){
				play = 0;
				$('#gameInformation').html('!!!  फेरी खेलौ बटन मा क्लिक गर    !!! ');
		    }else{
		    	t=setTimeout(function(){increaseTime();},1000);
		    }
		    
		};
		
		var genRandImages=function (){correctCounter = 0;
	  	randImg[0] = k.rand(0,TOTAL_QUES-1);
		for(i=1; i<TOTAL_QUES; i++){
				do{
					flag = 0;
					randImg[i] = k.rand(0,TOTAL_QUES-1);
					for(j=0; j<i; j++){
						if(randImg[i] === randImg[j]){
							flag++;
						}
					}
				}while(flag != 0 );  //end of do while loop	
			}
	};
		
		var convertIntoNepali = function(num){   //convert the english number sent as string to Nepali
			var convertedNum = '';
			for(i = 0;i<num.length;i++){
				convertedNum += nepaliNumbers[num[i]];
			}
			return convertedNum;
		};
	
	
		var nextQuestion = function(){
			flag_correct = 1;
			var num1,num2,num3;
			clickValues = [0,0];
			click1Counter = 0;
			click2Counter = 0;
			$('#questionInfo').html('').append('<div id="checkAnswer"></div>');
			$('#questionInfo').append('<div id="number1" class="numberBox"></div>');
			$('#questionInfo').append('<div id="click0" class="clickBox yellow"></div>');
			$('#questionInfo').append('<div id="number2" class="numberBox"></div>');
			$('#questionInfo').append('<div id="click1" class="clickBox yellow"></div>');
			$('#questionInfo').append('<div id="number3" class="numberBox"></div>');
			$('#questionInfo').append('<div id="equals" class="numberBox"></div>');
			$('#questionInfo').append('<div id="total" class="numberBox"></div>');
			$('.clickBox').append('#');
			$('#equals').append('=');
			
			//Generate 3 random numbers
			
			var startNum;				//1-10 for level 1   1-20 for level 2 and 1-30 for level 3
			var endNum;               //Variables for the level numbers to set the difficulty levels
			
			startNum = (currentLevel+1);
			endNum = (currentLevel+1)*10;
			
			num1 = k.rand(startNum,endNum);
			num2 = k.rand(startNum,endNum);
			num3 = k.rand(startNum,endNum);			
			
			var total;
			var randSign;			
			do{
				randSign = k.rand(0,1);
				correctSigns[0] = signs[randSign];
				if(randSign === 0){
					total = num1 + num2;
				}
				else{
					total = num1 - num2;
				}
				randSign = k.rand(0,1);
				correctSigns[1] = signs[randSign];
				if(randSign === 0){
					total = total+num3;
				}
				else{
					total = total-num3;
				}
			}while(total < 0);
			correctAns = total;
		//	alert(num1 +' '+signs[randSign]+ num2 +' '+signs[randSign]+' '+num3 +' = '+ num1+signs[randSign]+num2);
			
			$('#number1').append(convertIntoNepali(''+num1+''));
			$('#number2').append(convertIntoNepali(''+num2+''));
			$('#number3').append(convertIntoNepali(''+num3+''));
			
			$('#total').append(convertIntoNepali(''+total+''));
			
			$('.clickBox').click(function(){
				var clickedBox = $(this).attr('id');
				var clickId = parseInt(clickedBox.substring(5));
				if(click1Counter === 2){
					click1Counter = 0;
				}
				if(click2Counter === 2){
					click2Counter = 0;
				}	
				
				if(clickId === 0){
					clickValues[clickId] = click1Counter;
					if(click1Counter === 0){
						$(this).html('+');
					}else{
						$(this).html('-');
					}
					click1Counter++;
				} 
				else{
					clickValues[clickId] = click2Counter;
					if(click2Counter === 0){
						$(this).html('+');
					}else{
						$(this).html('-');
					}
					click2Counter++;
				}			
			});
			levelControl();
		};
		
		var startLevel = function(){
			checked = 0;
			scoreboard.scoreboard('reset');
			genRandImages();
			stopTimer();
			startTimer();
			level = currentLevel+1;
			totalCounter = 0;
			correctCounter = 0;
			$('#content').html('').append('<div id="imageDisplayBox"></div>');
			for(var i = 0; i< TOTAL_QUES; i++){
				$('#imageDisplayBox').append('<div id="img'+i+'"></div>');
				$('#img'+i).html('<img class="float-left" src="assets/image/level'+level+'Img'+i+'.png" />').html('');   //preloads the images
				$('#img'+i).addClass('default');
			}
			
			$('#content').append('<div id="questionSection"></div>');
			$('#questionSection').append('तलका कोठामा  "+" वा "-" जुन ठिक हुन्छ राख र "पक्का हो" थिच  । ');
			$('#questionSection').append('<div id="questionInfo"></div>');
			$('#content').append('<div id="levelShow"></div>');
			$('#levelShow').append('<img id="levelUp" class="levelImages" src="assets/image/levelUp.png"/>');
			$('#levelShow').append('<div class="levelText">तह '+convertIntoNepali(''+level+'')+'</div>');
			$('#levelShow').append('<img id="levelDown" class="levelImages" src="assets/image/levelDown.png"/>');
			$('#content').append('<div id="gameInformation"></div>');
			$('#gameInformation').html('');
			nextQuestion();		
		};
		
		
		function game(){
			currentLevel = 0;
			startLevel();
		};
		
		var delayShow = function(){
			document.delayForm.delayval.value = 1;
			$('#checkAnswer').html('');
			if(checked === 1 && currentLevel <3){
				currentLevel++;
				startLevel();
			}else if(checked === 0){
				nextQuestion();
			}					
		};
		
		function levelControl(){
			$('.levelImages').click(function(){
				var clickedLevel = $(this).attr('id');
				var clickedLevel = clickedLevel.substring(5);
				if(clickedLevel === 'Up'){
					if(currentLevel != 2){
						currentLevel++;
						startLevel();
					}
				}else{
					if(currentLevel != 0){
						currentLevel--;
						startLevel();	
					}
				}
			});
		}
		
		$('#linkCheck').click(function(){
			var signFst = $('#click0').text();
			var sign2nd = $('#click1').text();
			if(signFst === correctSigns[0] && sign2nd === correctSigns[1]){
				k.audio.correct.play();
				$('#checkAnswer').html('<img src="assets/image/correct.png" />');
				$('#img'+randImg[totalCounter]).html('<img class="float-left" src="assets/image/level'+level+'Img'+randImg[totalCounter]+'.png" />')
				if(flag_correct === 1){
					scoreboard.scoreboard('inc');
					correctCounter++;
				}					
			}
			else{			
				$('#checkAnswer').html('<img src="assets/image/incorrect.png" />');
				k.audio.incorrect.play();
				flag_correct = 0;
			}
			scoreboard.scoreboard('incTotal');
			totalCounter++;	
			
			if(totalCounter === TOTAL_QUES){
				$('#checkAnswer').html('');
				if(correctCounter === totalCounter){	
						$('#gameInformation').html('!!!  बधाई छ तिमीले सबै प्रश्नको  जवाफ दियौ    !!! ');
						checked = 1;
				}else{
					$('#gameInformation').html('!!! फेरी खेलौ बटन मा क्लिक गर   !!! ');
					checked = 2;
				}
				stopTimer();				
			}
				t=setTimeout(function(){delayShow();},1000);	
			
			
			
			
		});
		
		$('#linkHelp').mouseover(function(){
			$('#help').slideDown(2000);
		})
		.mouseout(function(){
			$('#help').slideUp(2000);
		});	
		
		$('#linkStart').click(function(){
			flag_start = 1;
			game();
		});
		
		$('#linkPlayAgain').click(function(){
			if(flag_start === 1){
				startLevel();
			}
		});
		
	}); //end of k.ready
});	//end of document.read				   
			

