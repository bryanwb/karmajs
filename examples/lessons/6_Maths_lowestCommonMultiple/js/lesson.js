$(document).ready(function(){     
	var k = Karma({
		audio: [{'name':'correct','file':'correct.wav'},
			    {'name':'incorrect','file':'incorrect.wav'},
			  ]});
	
	k.ready(function(){
		var i,j,s,t,x,flag,y,m,h;
		var currentLesson;  //variable to keep track of the current lesson
		var clickCounter;  //count the next button clicks for the particular lesson
		var cutCounter;
		var currentTopButton,currentLeftButton;
		var TOTAL_QUES = 5;
		var imgFrogCounter,frogJmpCount;
		var imgRabbitCounter,rabbitJmpCount;
		var timeLineLeft,timeLineInsCount;
		var posCounter = [];  // array Storing the positions of the frogs 0- frog and 1- rabbit
 		var scoreboard;
 		var lcmMethCounter;
 		var flag_frog; //flag is set if frog reaches the rabbit point
 		var maxHtFrogTop,maxHtFrogLeft,baseFrogTop,baseFrogLeft;
 		var maxHtRabbitTop,maxHtRabbitLeft,baseRabbitTop,baseRabbitLeft;
 		var currentTopButton,currentLeftButton;
 		var clickCounter; //store the click for the current lesson
 		var currentExercise;
 		var romanNums = ['i','ii','iii','iv','v'];
 		var randNumbers = [];
 		var numNumbers; //number of numbers in each quesBox
 		var levelNumbers = [45,50,3,6,7,4,24,18,15,25,24,2,20,16,8,4,11,17,12,6,7,10,18,5,2,16,5,12,9,15,
 		                    13,65,21,49,37,6,28,84,243,27,248,29,95,25,65,15,25,40,105,35,300,125,900,60,76,30,31,310,225,50,
 		                    17,34,51,27,28,36,6,36,216,9,81,243,2,3,4,5,3,90,64,8,1,2,56,14,12,16,18,6,2,98,70,14,49,65,13,26,78,12,9,69,4,30,60,70,40
 		                    ];
 		var answers = [];
 		var currentSection; //var to store the current section inside a particular exercise
 		var currentInpBox;
 		var flag_section; //flag to show the section is active

 		var checkTime = function(timePara){
		    if (timePara<10 ){
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
			m = 0;
			h = 0;
			s=checkTime(s);					
			$('#timerBox1').html(s);
			increaseTime();					
		};
		

		var increaseTime = function(){		    
			if(s>59){
			    m++;
			    m=checkTime(m);
			    $('#timerBox2').html(m);
			    s = 0;
			}
			if(m>59){
			    h++; 
			    h=checkTime(h);
			    $('#timerBox3').html(h);			    
			    m=0;
			}
				
				s=checkTime(s);				
				$('#timerBox1').html(s);
				s++;
		    	t=setTimeout(function(){increaseTime();},1000);
		   
		    
		};
	function hcf(text1,text2){
		  var gcd=1;
		  if (text1>text2) {text1=text1+text2; text2=text1-text2; text1=text1-text2;}
		  if ((text2==(Math.round(text2/text1))*text1)) {gcd=text1}else {
		   for (var i = Math.round(text1/2) ; i > 1; i=i-1) {
		    if ((text1==(Math.round(text1/i))*i))
		     if ((text2==(Math.round(text2/i))*i)) {gcd=i; i=-1;}
		   }
		  }
		  return gcd;
		}

	function lcm(t1,t2){
	  var cm=1;
	  var f=hcf(t1,t2);
	  cm=t1*t2/f;
	  return cm;
	}	
 	var genRandNumbers=function (level){
	  	var lowerLimit,upperLimit;
 		if(level === 0){
	  		numNumbers = 2;
	  		lowerLimit = 0;
	  		upperLimit = 14;
	  	}else if(level === 1){
	  		numNumbers = 2;
	  		lowerLimit = 15;
	  		upperLimit = 29;
	  	}else{
	  		numNumbers = 3;
	  		lowerLimit = 30;
	  		upperLimit = 74;
	  	}
 		
 		randNumbers[0] = k.rand(0,14);
		
 		for(i=0; i<= 14; i++){
				do{
					flag = 0;
					randNumbers[i] =  k.rand(0,14);
					for(j=0; j<i; j++){
						if(randNumbers[i] === randNumbers[j]){
							flag++;
						}
					}
				}while(flag != 0 );  //end of do while loop	
			}
			
	};	
	var delayObject = function(delayId){
		document.delayForm.delayval.value = 1;
		//clearTimeout(t);
		if(delayId === 0){
			animateFrog();
		}else if(delayId === 1){
			animateRabbit();
		}else if(delayId === 2){
			showLCMmethod();
		}
		else{
			animateFrog();
			animateRabbit();
		}
		
	};
	
	
	var assignLevelButtons = function(imgId){
		var bottomPos = 0.5;
		var leftPos =20+i*15;
		var incI = imgId+1;
		$('#content').append('<div class="exerciseButtons" id="exercise'+incI+'"></div>');
		var exercisebtncss = {
				'bottom': bottomPos+'em',
				'left': leftPos+'em'
				
			};
		$('#exercise'+incI).css(exercisebtncss).bind({
				click : function(){
					currentExercise = imgId;
					startExercise();
		         }
		});
	};
	function assignQuestions(quesId){
		$('#exerciseContainer').append('<div id="ques'+quesId+'" class="questions"></div>');
		$('#ques'+quesId).append('<div class="romanNums">'+romanNums[quesId]+' )</div>');
		$('#ques'+quesId).append('<div id="numbers'+quesId+'" class="numbersBox"></div>');	
		$('#ques'+quesId).append('<div class="inpBox"><input type="text" id="ans'+quesId+'" class="ansBox" /></div>');
		$('#ques'+quesId).append('<div id="display'+quesId+'" class="displayBox"></div>');
		var numCntr = randNumbers[numCounter]*numNumbers;
		for(j = 0; j< numNumbers; j++){
			if(j === numNumbers - 1){
				$('#numbers'+quesId).append(levelNumbers[numCntr]);
			}else{
				$('#numbers'+quesId).append(levelNumbers[numCntr]).append(',');
			}
			numCntr++;
		}
	
		$('#ans'+quesId).addClass('default');
		var ans;
		if(currentExercise === 2){
			ans = lcm(lcm(levelNumbers[numCntr-3],levelNumbers[numCntr-2]),levelNumbers[numCntr-1]);
			
		}else{
			ans = lcm(levelNumbers[numCntr-2],levelNumbers[numCntr-1]);
		}
		answers[numCounter] = ans;
		numCounter++;	
	}
	function nextSection(){
		
		$('#content').html('').append('<div id="exerciseContainer"></div>');
		$('#exerciseContainer').append('<img class="exerciseTitle" src="assets/image/exerciseTitle.png" />');
		if(currentExercise === 0){
			$('#exerciseContainer').append('<img class="exerciseTitle" src="assets/image/exercise1Title.png" />');
		}else{
			$('#exerciseContainer').append('<img class="exerciseTitle" src="assets/image/exerciseRestTitle.png" />');
		}
		//generate the boxes
			
		genRandNumbers(currentExercise);		
	
		scoreboard.scoreboard('reset');
		scoreboard.scoreboard('incTotal',5);

		for(var x = 0; x< TOTAL_QUES;x++){
			assignQuestions(x);
		}
		
		focus_blur();
		$('input[type="text"]:first').focus();
		$('#content').append('<div id="checkButton"></div>');
		showText('checkButton','checkAns3',14,29,'<div id="chckAns3" class="checkAns"></div>');
		showText('checkButton','showAns3',18,0,'<div id="showAns3" class="showAns"></div>');
		showText('checkButton','moreQuesBtn',18,38,'<div id="moreQues"></div>');
		$('#chckAns3').hide();$('#showAns3').hide();$('#moreQues').hide();
		check_show();
		if(currentExercise === 0){
			$('#exerciseContainer').append('<div id="giveOptions"></div>');
			for(var y = 0;y<5;y++){
				$('#giveOptions').append('<div id="opt'+y+'" class="options"></div>');
				var section = (5*currentSection)+y;
				$('#opt'+y).text(answers[section]);
			}
		}
		if(currentExercise != 0){
			$('#timerBar').show();
			startTimer();
		}
	}
	function startExercise(){
		flag_section = 1;
		$('#score_box').show();
		scoreboard = $('#score_box').scoreboard({'layout':'horizontal', 
		       'winningScore': TOTAL_QUES});		
		currentSection = 0;
		numCounter = 0;	
		
		nextSection();
	}
	var nextLesson = function(){
		
		clearTimeout(t);
		flag_section = 0;
		$('#score_box').hide();
		$('#linkShowAns').hide();
		$('#linkCheckAns').hide();
		$('#timerBar').hide();
		$('#content').html('').removeClass('backOpaque');
		$('#gameOver').hide()
		clickCounter = 0;
		
		if(currentLesson === 2){
			showPicture('lesson3ImgDef0','lesson3ImgDef0',0,8);		
			showPicture('lesson3ImgDef1','lesson3ImgDef1',7,25);		
			currentTopButton = 18;
			currentLeftButton = 35;
			showNextButton();
			showText('content','exerciseClickTitle',17,16,'Exercise --- अभ्यास ','FF0000');
			showText('exerciseClickTitle','line',-.5,-3.5,'_____________________');
			for( i = 0;i<3;i++){
				assignLevelButtons(i);
			}
		}
		if(currentLesson === 1){
			showPicture('lesson2ImgDef0','lesson2ImgDef0',0,1);		
			currentTopButton = 5;
			currentLeftButton = 80;
			showNextButton();
		}
		else if(currentLesson === 0){
			$('#linkNextLesson').hide();
			 maxHtFrogTop = .1;
			 baseFrogTop = 2.5;
			 imgFrogCounter = 0;
			 frogJmpCount = 0;
			 
			 maxHtRabbitTop = 9;
			 baseRabbitTop = 10;
			 imgRabbitCounter = 0;
			 rabbitJmpCount = 0;

			 flag_frog = 0;
			 timeLineInsCount = 0;
			showPicture('imgFrogTimeline','timeLine',5,1);
			showPicture('imgFrogAnim','frog0',2.5,2.7);
			
			showPicture('imgRabbitTimeline','timeLine',14.5,1);
			showPicture('imgRabbitAnim','rabbit0',10,2.7);
			
			t=setTimeout(function(){delayObject();},1000);	//gives a complete animation
		}		
	};

	function game(){		
		currentLesson = 0;
		$('#linkNextLesson').show();
		$('#linkPrevLesson').hide();
		nextLesson();
	}	
	
	//function to display the text and fraction symbols inside a div 
	function showText(parentDiv,divName,topPos,leftPos,numText,color){ 
		var textCss = {
				'position':'absolute',
				'top':topPos+'em',
				'left':leftPos+'em',
				'font':'2em arial,verdana,geneva,helvetica',
				'color':'#'+color,
				'z-index':'5',
				'white-space':'pre'
				};
		$('#'+parentDiv).append('<div id="'+divName+'"></div>');
		$('#'+divName).css(textCss).html(numText);
	}
	function makeAnimContainer(divName,topPos,leftPos,width,height,bgColor){
		var fracAnimContainer = {
			'position':'absolute',
			'top': topPos+'em',
			'left': leftPos+'em',
			'width': width+'em',
			'height': height+'em',
			'background-color': '#'+bgColor
		};
		$('#content').append('<div id="'+divName+'"></div>');
		$('#'+divName).css(fracAnimContainer);			
	}
	
	
		//function that keeps the photos at a given place absolute position
	function showPicture(divName,imgName,topPos,leftPos){
		var imgCss = {
				'position':'absolute',
				'top':topPos+'em',
				'left':leftPos+'em',
			};
		$('#content').append('<div id="'+divName+'"></div>');
		$('#'+divName).css(imgCss).html('<img src="assets/image/'+imgName+'.png" />');
	}
	
	 function showNextButton(){
			$('#content').append('<div class="nextBtn"></div>');
			$('.nextBtn').show();	
			var nextbtncss = {
				'top': currentTopButton+'em',
				'left': currentLeftButton+'em'				
			};
			
			$('.nextBtn').css(nextbtncss);//html('<img src="assets/image/nextBtn.png"/>');
			$('.nextBtn').click(function(){
				manageClicks();
			});
					
		}
	 function hideNextButton(){
		$('.nextBtn').hide();
	}
		
		
		function showLCMmethod(){
			if(lcmMethCounter === 0){
				showPicture('lesson2Sign2','lesson2ImgSign',34.1,15);
				showText('lesson2Sign2','lesson2Text2',-.1,-.6,'2   2,4');
			}else if(lcmMethCounter === 1){
				showText('lesson2Sign2','lesson2Text3',1,.8,'1,2');			
			}else if(lcmMethCounter === 2){
				showPicture('lesson2ImgDef7','lesson2ImgDef7',32,25);			
			}else if(lcmMethCounter === 3){
				showPicture('lesson2ImgDef8','lesson2ImgDef8',34.5,25);			
			}else if(lcmMethCounter === 4){
				showPicture('lesson2ImgDef9','lesson2ImgDef9',39,20);			
			}
			lcmMethCounter++;
			t=setTimeout(function(){delayObject(2);},1000);  //text lcm
			
		}
		function animateFrog(){	
			
			baseFrogLeft = 2.7 + frogJmpCount*9;
			showPicture('imgFrogAnim','frog1',baseFrogTop-2,baseFrogLeft);
			baseFrogLeft = 6 + frogJmpCount*9;
			imgAnimateFrog('imgFrogAnim',maxHtFrogTop,baseFrogLeft,1000);
			
		}
		function animateRabbit(){	
			baseRabbitLeft = 4 + rabbitJmpCount*14;
			showPicture('imgRabbitAnim','rabbit1',baseRabbitTop+1,baseRabbitLeft);
			baseRabbitLeft = 10 + rabbitJmpCount*14;
			imgAnimateRabbit('imgRabbitAnim',maxHtRabbitTop,baseRabbitLeft,1000);
		}
		function imgAnimateFrog(divName,topPos,leftPos,duration){
			$('#'+divName).animate(
					{top:topPos+'em',left:leftPos+'em'},duration,
					function(ev){
							if(imgFrogCounter === 0){
								baseFrogLeft = 11.4 + frogJmpCount * 9;
								imgFrogCounter++;
								imgAnimateFrog('imgFrogAnim',baseFrogTop-2,baseFrogLeft,1000);
						
							}else if(imgFrogCounter === 1){
								showPicture('imgFrogAnim','frog0',baseFrogTop,baseFrogLeft);
								showPicture('frogRing'+frogJmpCount,'timeRing',baseFrogTop+1.5,baseFrogLeft+1.2);
								frogJmpCount++;
								imgFrogCounter = 0;
								if(frogJmpCount != 10){
									if(frogJmpCount%3 != 0){
										flag_frog = 0;
										t=setTimeout(function(){delayObject(0);},1000);  //frog
									}
									else{
										flag_frog = 1;
									}	
									if(flag_frog === 1){	
										flag_frog = 0;
										timeLineLeft = 31.5 + timeLineInsCount*27;
										showPicture('imgTimeLineIntersect'+timeLineInsCount,'timeLineIntersect',0,timeLineLeft);
										if(frogJmpCount != 9){
											t=setTimeout(function(){delayObject(0);},2000);  //frog
											t=setTimeout(function(){delayObject(1);},2000); //rabbit
										}
										else{
											//start the lcm defintion process
											currentTopButton = 21;
											currentLeftButton = 80;
											showNextButton();
											showPicture('imgLesson1ImgDef0','lesson1ImgDef0',21,18);
										}
										timeLineInsCount++;
									}
								}
							
							}
					});	
		}
			
		function imgAnimateRabbit(divName,topPos,leftPos,duration){
			$('#'+divName).animate(
					{top:topPos+'em',left:leftPos+'em'},duration,
					function(ev){
							if(imgRabbitCounter === 0){
								baseRabbitLeft = 15.5 + rabbitJmpCount * 13.5;
								imgRabbitCounter++;
								imgAnimateRabbit('imgRabbitAnim',baseRabbitTop,baseRabbitLeft,1000);
							}else if(imgRabbitCounter === 1){
								showPicture('imgRabbitAnim','rabbit0',baseRabbitTop,baseRabbitLeft);
								showPicture('imgRabbitAnim'+rabbitJmpCount,'timeRing',baseRabbitTop+3.5,baseRabbitLeft+1.5);
								rabbitJmpCount++;
								imgRabbitCounter = 0;
								if(rabbitJmpCount%2 != 0 ){
									t=setTimeout(function(){delayObject(1);},1000);  //frog
								}
							}
							
					});	
		}

		function manageClicks(){
			if(currentLesson === 2){
				if(clickCounter === 0){
					showPicture('lesson3ImgDef2','lesson3ImgDef2',9,0);
					showText('lesson3ImgDef2','lesson3inputText1',5,0,'<input type="text" id="lesson3input1" class="inputBox"  />');
					showText('lesson3ImgDef2','symChecked1',5,4,'');
					focus_blur();
					$('#lesson3input1').focus();
					showText('lesson3ImgDef2','checkAns1',6.5,-1,'<div id="chckAns1" class="checkAns"></div>');
					showText('lesson3ImgDef2','shownAns1',6.5,4,'<div id="showAns1" class="showAns"></div>');
					check_show();
					hideNextButton();
				}else if(clickCounter === 1){
					showPicture('lesson3ImgDef3','lesson3ImgDef3',9,65);
					showText('lesson3ImgDef3','lesson3inputText2',5,0,'<input type="text" id="lesson3input2" class="inputBox"  />');
					showText('lesson3ImgDef3','symChecked2',5,4,'');
					focus_blur();
					$('#lesson3input2').focus();				
					showText('lesson3ImgDef3','checkAns2',6.5,-1,'<div id="chckAns2" class="checkAns"></div>');
					showText('lesson3ImgDef3','shownAns2',6.5,4,'<div id="showAns2" class="showAns"></div>');
					check_show();
					hideNextButton();
				}else if(clickCounter === 2){
					showPicture('lesson3ImgDef4','lesson3ImgDef4',22,28);
				}
				else if(clickCounter === 3){
					showPicture('lesson3ImgDef5','lesson3ImgDef5',28,15);
					hideNextButton();
				}
			}
			else if(currentLesson === 1){
				if(clickCounter === 0){
					showPicture('lesson2ImgDef1','lesson2ImgDef1',10,1);
				}else if(clickCounter === 1){
					showPicture('lesson2ImgDef2','lesson2ImgDef2',13,1);
				}else if(clickCounter === 2){
					showPicture('lesson2ImgDef3','lesson2ImgDef3',15.5,1);
				}else if(clickCounter === 3){
					showPicture('lesson2ImgDef4','lesson2ImgDef4',25,1);
				}else if(clickCounter === 4){
					showPicture('lesson2ImgDef5','lesson2ImgDef5',27,1);
				}else if(clickCounter === 5){
					showPicture('lesson2ImgDef6','lesson2ImgDef6',29.5,10);
				}else if(clickCounter === 6){
					lcmMethCounter =0;
					showPicture('lesson2Sign1','lesson2ImgSign',32,15);
					showText('lesson2Sign1','lesson2Text1',-.1,-.6,'2   4,8');
					t=setTimeout(function(){delayObject(2);},1000);  //text lcm
					hideNextButton();
				}			
			}
			
			else if(currentLesson === 0){
				if(clickCounter === 0){
					$('#linkNextLesson').show();
					showPicture('imgLesson1ImgDef1','lesson1ImgDef1',24.5,18);
				}else if(clickCounter === 1){
					showPicture('imgLesson1ImgDef2','lesson1ImgDef2',28,18);
				}else if(clickCounter === 2){
					showPicture('imgLesson1ImgDef3','lesson1ImgDef3',31.5,18);
				}else if(clickCounter === 3){
					showPicture('imgLesson1ImgDef4','lesson1ImgDef4',36,20);
					hideNextButton();
				}
			}
			clickCounter++;
		}
		
		function check_show(){
			$('.checkAns').click(function(){
				var checkId = $(this).attr('id');
				var checkId =  parseInt(checkId.substring(7));;
				if(checkId === 1){
					if($('#lesson3input1').val() == '7'){
						k.audio.correct.play();
						$('#symChecked1').html('<img src="assets/image/correct.png" />');
					}else{
						k.audio.incorrect.play();
						$('#symChecked1').html('<img src="assets/image/incorrect.png" />');
					}
				}else if(checkId === 2){
					if($('#lesson3input2').val() == '1,3,7'){
						k.audio.correct.play();
						$('#symChecked2').html('<img src="assets/image/correct.png" />');
					}else{
						k.audio.incorrect.play();
						$('#symChecked2').html('<img src="assets/image/incorrect.png" />');
					}
				}else if(checkId === 3){
					for( i = 0; i<5;i++){
						var section = (5*currentSection)+i;
						var answer =  $('#ans'+i).val();
						if(answers[section] == answer){
							$('#display'+i).html('<img src="assets/image/correct.png" />');
							scoreboard.scoreboard('inc');
						}else{
							$('#display'+i).html('<img src="assets/image/incorrect.png" />');
						}
					}
					$('#chckAns3').hide();
					$('#showAns3').show();
					if(currentSection != 2){
						$('#moreQues').show();
					}
					stopTimer();
				}
			});
			
			
			$('.showAns').click(function(){
				var showId = $(this).attr('id');
				var showId =  parseInt(showId.substring(7));
				if(showId === 1){	
					$('#lesson3input1').val(7)
					$('#symChecked1').html('<img src="assets/image/correct.png" />');
					showNextButton();
				}else if(showId === 2){
					$('#lesson3input2').val('1,3,7')
					$('#symChecked2').html('<img src="assets/image/correct.png" />');
					showNextButton();
				}else if(showId === 3){				
					for( i = 0; i<5;i++){
						var section = (5*currentSection)+i;
						$('#ans'+i).val(answers[section]);
						$('#display'+i).html('<img src="assets/image/correct.png" />');
					}
					$('#showAns3').hide();
				}
				
			});
			
			$('#moreQues').click(function(){
				currentSection++;
				nextSection();
				$('#moreQues').hide();
			});
		}
		
		
		function focus_blur(){
			$('input[type="text"]')
			.focus(function() {
				
			    $(this).addClass("focus");
			   
			    currentInpBox =  $(this).attr("id");
			    currentInpBox =  parseInt(currentInpBox.substring(3));
			  
			})
			.blur(function() {
				var countBox = 0;
			    $(this).removeClass("focus");
			    for(i = 0;i<5;i++){
					if($('#ans'+i).val() != ''){
						countBox++;
					}
				}
			    if(countBox === 5){
			    	//show check button
			    	$('#chckAns3').show();
			    }
			})
			.keypress(function(event) {
				if(event.which === 13){
					//$(this).removeClass("focus");
					if(currentInpBox != 4){
						$('#ans'+currentInpBox).blur();
					}
					var currentInpBoxnext = currentInpBox+1;
					$('#ans'+currentInpBoxnext).focus();
				}
			});
			
		}
		$('#linkNextLesson').click(function(){
			currentLesson++;
			if(currentLesson === 2){
				$('#linkNextLesson').hide();
				$('#linkPrevLesson').show();
			}
			else{
				$('#linkNextLesson').show();
				$('#linkPrevLesson').show();
			}
		
			nextLesson();
		});
		$('#linkPrevLesson').click(function(){
			
			if(currentLesson === 2 && flag_section === 1){
				currentLesson = 2;	
				nextLesson();
			}else{
				currentLesson--;
				if(currentLesson === 0){					
					$('#linkPrevLesson').hide();
				}
				else{
					$('#linkNextLesson').show();
					$('#linkPrevLesson').show();
				}
				nextLesson();
			}
			
			
		});

		$('#linkStart').click(function(){
			game();
		});
		
		$('#linkPlayAgain').click(function(){
			//nextLesson();
			nextLesson();
		});
				

		
		$('#linkShowAns').hide();
		$('#linkCheckAns').hide();
		$('#linkNextLesson').hide();
		$('#linkPrevLesson').hide();
		$('#linkHelp').click(function(){
			$('#help').slideDown(2000);
		})
		.mouseout(function(){
			$('#help').slideUp(2000);
		});	
		
	
		

			
	}); //end of k.ready
});	//end of document.read				   
			

