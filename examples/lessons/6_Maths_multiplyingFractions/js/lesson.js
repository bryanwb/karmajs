$(document).ready(function(){     
	var k = Karma({
		audio: [{'name':'correct','file':'correct.wav'},
			    {'name':'incorrect','file':'incorrect.wav'},
			  ]});
	
	k.ready(function(){
		var i,j,s,t;
		var currentLesson;  //variable to keep track of the current lesson
		var clickCounter;  //count the next button clicks for the particular lesson
		var cutCounter;
		var currentTopButton,currentLeftButton;
		var TOTAL_QUES = 10;
		var frac1 = []; //an array to store the fractions
		var frac2 = [];
		var scoreboard;
		var answers = [1311,24,437,8,
		               54,2,27,1,
		               663,42,221,14,
		               13,8,13,8,
		               114,48,57,24,
		               12,48,1,4,
		               1519,132, 1519,132,
		               280,30,28,3,
		               77,4,77,4,
		               300,10,30,1
		               ]; // 4 answers for a question
		var flag_busy; //flag is set set to 1 if it is busy
		var currentAns = []; //array storing the currently set answers
		var animCount;  //to keep track of counting the anim9ations
		
		var assignQuestion = function(quesId,frac1,frac2,flagWhole1,flagWhole2){
			var fracInc = 0;
			var fracCount = 0;
			var symCounter = 0;
			symInc = 10*quesId+symCounter;
			fracInc = 6*quesId+fracCount;
			$('#lessonContainer').append('<div id="ques'+quesId+'" class="quesContainer"></div>');
			if(frac1[fracCount]>9){
				showText('ques'+quesId,'frac1'+fracInc,1,.5,frac1[fracCount]);
			}else{
				showText('ques'+quesId,'frac1'+fracInc,1,1,frac1[fracCount]);
			}	
			fracCount++;fracInc = 6*quesId+fracCount;
			showText('ques'+quesId,'frac1'+fracInc,.3,1.7,frac1[fracCount]);fracCount++;fracInc = 6*quesId+fracCount;
			if(flagWhole1 === 0){
				showText('ques'+quesId,'sym'+symInc,.4,1.7,'_');symCounter++;symInc = 10*quesId+symCounter;
			}
			if(frac1[fracCount]>9){
				showText('ques'+quesId,'frac1'+fracInc,1.6,1.4,frac1[fracCount]);
			}
			else{
				showText('ques'+quesId,'frac1'+fracInc,1.6,1.7,frac1[fracCount]);
			}
			fracCount = 0;fracInc = 6*quesId+fracCount;	
			showText('ques'+quesId,'sym'+symInc,.9,2.7,'x');symCounter++;symInc = 10*quesId+symCounter;			
			showText('ques'+quesId,'frac2'+fracInc,1,3.5,frac2[fracCount]);	fracCount++;fracInc = 6*quesId+fracCount;
			showText('ques'+quesId,'frac2'+fracInc,.3,4.2,frac2[fracCount]);fracCount++;fracInc = 6*quesId+fracCount;
			if(flagWhole2 === 0){
				showText('ques'+quesId,'sym'+symInc,.4,4.2,'_');symCounter++;symInc = 10*quesId+symCounter;
			}
			if(frac2[fracCount]>9){
				showText('ques'+quesId,'frac2'+fracInc,1.6,4,frac2[fracCount]);	
			}
			else{
				showText('ques'+quesId,'frac2'+fracInc,1.6,4.2,frac2[fracCount]);	
			}
			showText('ques'+quesId,'sym'+symInc,.9,5.3,'=');symCounter++;symInc = 10*quesId+symCounter;
			showText('ques'+quesId,'sym'+symInc,.4,6.6,'________');symCounter++;symInc = 10*quesId+symCounter;
			showText('ques'+quesId,'sym'+symInc,.45,6.6,'________');symCounter++;symInc = 10*quesId+symCounter;
			showText('ques'+quesId,'inputTxt1'+quesId,.1,6.8,'<input id="inTxt1'+quesId+'" type="text" class="inputFraction" />');
			showText('ques'+quesId,'inputTxt2'+quesId,1.65,6.8,'<input id="inTxt2'+quesId+'" type="text" class="inputFraction" />');
			showText('ques'+quesId,'sym'+symInc,.9,11.5,'=');symCounter++;symInc =10*quesId+symCounter;
			showText('ques'+quesId,'sym'+symInc,.4,12.6,'________');symCounter++;symInc = 10*quesId+symCounter;
			showText('ques'+quesId,'sym'+symInc,.45,12.6,'________');symCounter++;symInc =10*quesId+symCounter;
			showText('ques'+quesId,'inputTxt3'+quesId,.1,12.8,'<input id="inTxt3'+quesId+'" type="text" class="inputFraction" />');
			showText('ques'+quesId,'inputTxt4'+quesId,1.65,12.8,'<input id="inTxt4'+quesId+'" type="text" class="inputFraction" />');
			showText('ques'+quesId,'symChecked1'+quesId,2,11,'');
			showText('ques'+quesId,'symChecked2'+quesId,2,17,'');
			
			foucs_blur();

		};
		
		var nextLesson = function(){
			$('#linkShowAns').hide();
			$('#linkCheckAns').hide();
			$('#content').removeClass('backOpaque');
			$('#gameOver').hide()
			clickCounter = 0;
			$('#score_box').hide();
			$('#content').html('').append('<div id="lessonContainer"></div>');
			if(currentLesson === 4){
				$('#linkShowAns').show();
				$('#linkCheckAns').show();
				flag_busy = 0;
				$('#currentTitle').html('भिन्नहरुको गुणन');
				$('#score_box').show();
				scoreboard = $('#score_box').scoreboard({'layout':'horizontal', 
				       'winningScore': TOTAL_QUES});
				scoreboard.scoreboard('reset');
				scoreboard.scoreboard('incTotal',10);
				
				showPicture('divImgSimplify1','beforeSimplify',1,17);	
				showPicture('divImgSimplify2','afterSimplify',1,29);
				showPicture('divImgSimplify3','beforeSimplify',1,55);	
				showPicture('divImgSimplify4','afterSimplify',1,68);
				
				frac1[0] = 7; frac1[1] = 1; frac1[2] = 8;
				frac2[0] = 7; frac2[1] = 2; frac2[2] = 3;
				assignQuestion(0,frac1,frac2,0,0);
				
				frac1[0] = 6; frac1[1] = ''; frac1[2] = '';
				frac2[0] = ''; frac2[1] = 9; frac2[2] = 2;
				assignQuestion(1,frac1,frac2,1,0);
				
				frac1[0] = 6; frac1[1] = 3; frac1[2] = 6;
				frac2[0] = 2; frac2[1] = 3; frac2[2] = 7;
				assignQuestion(2,frac1,frac2,0,0);
				
				frac1[0] = 6; frac1[1] = 1; frac1[2] = 2;
				frac2[0] = ''; frac2[1] = 1; frac2[2] = 4;
				assignQuestion(3,frac1,frac2,0,0);
				
				frac1[0] = ''; frac1[1] =6; frac1[2] = 8;
				frac2[0] = 3; frac2[1] = 1; frac2[2] = 6;
				assignQuestion(4,frac1,frac2,0,0);
				
				frac1[0] = ''; frac1[1] =4; frac1[2] = 8;
				frac2[0] = ''; frac2[1] = 3; frac2[2] = 6;
				assignQuestion(5,frac1,frac2,0,0);
				
				frac1[0] = 4; frac1[1] =1; frac1[2] = 12;
				frac2[0] = 2; frac2[1] = 9; frac2[2] =11;
				assignQuestion(6,frac1,frac2,0,0);
				
				frac1[0] = 2; frac1[1] =4; frac1[2] = 5;
				frac2[0] = 3; frac2[1] = 2; frac2[2] =6;
				assignQuestion(7,frac1,frac2,0,0);
				
				frac1[0] = ''; frac1[1] =11; frac1[2] = 2;
				frac2[0] = ''; frac2[1] = 7; frac2[2] =2;
				assignQuestion(8,frac1,frac2,0,0);
				
				frac1[0] = 12; frac1[1] =1; frac1[2] = 2;
				frac2[0] = 2; frac2[1] = 2; frac2[2] =5;
				assignQuestion(9,frac1,frac2,0,0);		
			}
			
			else if(currentLesson === 0){
				currentTopButton = 10;
				currentLeftButton = 80;
				$('#currentTitle').html('भिन्नलाई पूर्ण संख्याले गुणन गर्दा');
				$('#content').append('<div id="imgWhole"></div>');
				$('#imgWhole').append('<img class="float-left" src="assets/image/lesson1ImgPart1.png" />');
				$('#imgWhole').append('<img id="lessonImgAnimate" src="assets/image/lesson1ImgPart2.png" />');
				var lessonImgAnimate = {
					'position':'absolute',
					'top':'1.9em',
					'left': '6.2em'
				};
				$('#lessonImgAnimate').css(lessonImgAnimate);
				$('#content').append('<img class="float-right" src="assets/image/lesson1ImgDef1.png" />');
				imgAnimate('lessonImgAnimate',1.9,10,1000);
			}
			if(currentLesson === 1){
				currentTopButton = 5;
				currentLeftButton = 80;
				$('#currentTitle').html('भिन्नलाई पूर्ण संख्याले गुणन गर्दा');
				$('#content').append('<div id="imgWhole"></div>');
				$('#imgWhole').append('<img class="float-left" src="assets/image/lesson2ImgPart1.png" />');
				$('#imgWhole').append('<img id="lessonImgAnimate" src="assets/image/lesson2ImgPart2.png" />');
				var lessonImgAnimate = {
					'position':'absolute',
					'top':'2.3em',
					'left': '7.4em'
				};
				$('#lessonImgAnimate').css(lessonImgAnimate);
				$('#content').append('<div id="lesson2Div1"></div>');
				$('#lesson2Div1').append('<img class="float-left" src="assets/image/lesson2ImgDef1.png" />');
				imgAnimate('lessonImgAnimate',2.3,11,1000);
			}
			if(currentLesson === 2){
				currentTopButton = 35;
				currentLeftButton = 38;
				showNextButton();
				$('#currentTitle').html('भिन्नलाई भिन्नले गुणन गर्दा');
				$('#content').append('<div id="imgRoti1"></div>');				
				$('#imgRoti1').append('<img class="float-left" src="assets/image/lesson3Img1.png" />');
				$('#imgRoti1').append('<img id="lessonImgAnimate1" src="assets/image/lesson3ImgPart1.png" />');
				var lessonImgAnimate = {
					'position':'absolute',
					'top':'15em',
					'left': '1.2em'
				};
				$('#lessonImgAnimate1').css(lessonImgAnimate);
		
				$('#content').append('<div id="imgRoti2"></div>');
				$('#imgRoti2').append('<img class="float-left" src="assets/image/lesson3Img2.png" />');
				$('#imgRoti2').append('<img id="lessonImgAnimate2" src="assets/image/lesson3ImgPart2.png" />');
				var lessonImgAnimate = {
					'position':'absolute',
					'top':'15.1em',
					'left': '6em'
				};
				$('#lessonImgAnimate2').css(lessonImgAnimate);
				$('#imgRoti2').hide();
				$('#content').append('<div id="imgRoti3"></div>');
				$('#imgRoti3').append('<img class="float-left" src="assets/image/lesson3Img3.png" />');
				$('#imgRoti3').hide();				
				showFractions();
			}
			if(currentLesson === 3){
				currentTopButton = 20;
				currentLeftButton = 38;
				showNextButton();
				$('#currentTitle').html('फरक हर / अंश भएको दुई भिन्न को गुणन ');
				showPicture('divImgDef1','lesson4ImgDef1',0,-2);
				showPicture('divImg1','lesson4Img1',0,70);				
				showFractions();			
			}
			if(currentLesson === 5){
				currentTopButton = 10;
				currentLeftButton = 60;
				showNextButton();
				$('#currentTitle').html('तिमीले बुझ्नु पर्ने कुरा ');
				showPicture('divImgDef1','lesson6ImgDef1',0,-2);
				showPicture('divImg1','lesson6Img1',15,70);		
				showFractions();
						
			}
		
		};
		//function to display the text and fraction symbols inside a div 
		function showText(parentDiv,divName,topPos,leftPos,numText){  //flatTxt   o for text 1 for image
			var textCss = {
					'position':'absolute',
					'top':topPos+'em',
					'left':leftPos+'em',
					'font':'2em arial,verdana,geneva,helvetica'
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
		
		function game(){
			currentLesson = 0;
			$('#linkNextLesson').show();
			$('#linkPrevLesson').hide();
		
			nextLesson();
		}	
		$('#linkNextLesson').hide();
		$('#linkShowAns').hide();
		$('#linkCheckAns').hide();
		$('#linkPrevLesson').hide();
		$('#linkHelp').mouseover(function(){
			$('#help').slideDown(2000);
		})
		.mouseout(function(){
			$('#help').slideUp(2000);
		});	
	
		function delayHideAns(){
			document.delayForm.delayval.value = 1;
			clearTimeout(t);
			for(var i = 0;i<TOTAL_QUES;i++){
				for(var j=0; j< 4; j++){
					var k = j+1;
					$('#inTxt'+k+''+i).val(currentAns[i*4+j]);
				}
			}
			flag_busy = 0;
		}
		$('#linkShowAns').click(function(){
			//alert($('#inTxt10').val());
			
			//first store the current texboxes values
			if(flag_busy === 0){
				flag_busy = 1;				
				for(var i = 0;i<TOTAL_QUES;i++){
					for(var j=0; j< 4; j++){
						var k = j+1;
						currentAns[4*i+j] = $('#inTxt'+k+''+i).val();
					}
				}
						
				for(var i = 0;i<TOTAL_QUES;i++){
					for(var j=0; j< 4; j++){
						var k = j+1;
						$('#inTxt'+k+''+i).val(answers[i*4+j]);
					}
				}
				t=setTimeout(function(){delayHideAns();},5000);  //after 5 seconds goes to the same status as user had put input
			}
		});
		$('#linkCheckAns').click(function(){
			if(flag_busy === 0){
				for(var i = 0;i<TOTAL_QUES;i++){
					for(var j=0; j< 4; j++){
						var k = j+1;
						currentAns[4*i+j] = $('#inTxt'+k+''+i).val();
					}
				}
				var correctCounter = 0;
				scoreboard.scoreboard('reset');
				scoreboard.scoreboard('incTotal',10);
				for(var i = 0;i<TOTAL_QUES;i++){
					var checkCount = 0;		
						if(currentAns[4*i+0] == answers[4*i+0] && currentAns[4*i+1] == answers[4*i+1]){
							$('#symChecked1'+i).html('<img src="assets/image/correct.png" />');
							checkCount++;
						}
						else{
							$('#symChecked1'+i).html('<img src="assets/image/incorrect.png" />');
						}
						if(currentAns[4*i+2] == answers[4*i+2] && currentAns[4*i+3] == answers[4*i+3]){
							$('#symChecked2'+i).html('<img src="assets/image/correct.png" />');
							checkCount++;
						}
						else{
							$('#symChecked2'+i).html('<img src="assets/image/incorrect.png" />');
						}
						if(checkCount == 2){
							scoreboard.scoreboard('inc');
							correctCounter++;
							if(correctCounter === 10){
								$('#content').addClass('backOpaque');
								$('#gameOver').show().html('Great Job !!!');
							}
						}
				}
			}
				
		});
		
		
		//function to be rearranged later
		 function showNextButton(){
				$('#content').append('<div class="nextBtn"></div>');
				$('.nextBtn').show();	
				var nextbtncss = {
					'top': currentTopButton+'em',
					'left': currentLeftButton+'em'				
				};
				
				$('.nextBtn').css(nextbtncss);//html('<img src="assets/image/nextBtn.png"/>');
						
			}
			 function hideNextButton(){
				$('.nextBtn').hide();
			}
				
				function showLesson1ImgFraction(){
					$('#content').append('<div id="lesson1ImgFraction" class="lessonImgFrac"></div>');
					$('#lesson1ImgFraction').append('<img src="assets/image/lesson1ImgFractions.png" />');
					$('#content').append('<div id="lesson1ImgFractionRight"></div>');
					$('#lesson1ImgFractionRight').append('<img src="assets/image/img1FractionTotal.png" />');
					$('#lesson1ImgFractionRight').hide();
					assignLessonImages(0,8.8,6.8,3);
					assignLessonImages(1,8.5,24.4,2);
					assignLessonImages(2,8.7,44,1);
					assignLessonImages(3,8.7,44,1);
					imgAnimateNoNxtBtn('lessonImg0',8.8,58,2000);
					imgAnimateNoNxtBtn('lessonImg1',8.8,65,2000);
					imgAnimateNoNxtBtn('lessonImg2',6,65,2000);
					imgAnimateNoNxtBtn('lessonImg3',10,65,2000);				
				}
				
				function imgAnimateNoNxtBtn(divName,topPos,leftPos,duration){
					$('#'+divName).animate(
							{top:topPos+'em',left:leftPos+'em'},duration,
							function(ev){							
									if(divName == 'lessonImg3'){
										for(i = 0;i<4;i++){
											$('#lessonImg'+i).hide();
										}
										$('#lesson1ImgFractionRight').show();
										showNextButton();
										$('.nextBtn').click(function(){
											$('#content').append('<img src="assets/image/lesson1ImgDef2.png" />');
											$('.nextBtn').hide();
										});
									}
								
							});
					
				}
				
				 function assignLessonImages(imgId,topPos,leftPos,zIndex){
					if(imgId === 3){
						$('#lesson1ImgFraction').append('<img id="lessonImg'+imgId+'" src="assets/image/lesson1ImgDown.png" />');
						
					}
					else{
						$('#lesson1ImgFraction').append('<img id="lessonImg'+imgId+'" src="assets/image/lesson1ImgPart2.png" />');
					}
					var lessonImgAnimate = {
							'position':'absolute',
							'top':topPos+'em',
							'left':leftPos+'em',
							'z-index':zIndex
						};
					$('#lessonImg'+imgId).css(lessonImgAnimate);
					
				}
				
				 function delayCutNext(){	
						document.delayForm.delayval.value = 1;
						if(cutCounter === 0){
							showText('divAnim3','textCutSym1',2.9,7.5,'/');
						}
						else if(cutCounter === 1){
							showText('divAnim3','textCutSym2',3.3,8.1,1);
						}
						else if(cutCounter === 2){
							showText('divAnim3','textCutSym3',1.2,10.2,'/');
						}
						else if(cutCounter === 3){
							showText('divAnim3','textCutSym4',.6,10.6,2);
						}
						else if(cutCounter === 4){
							showText('divAnim3','textCutSym5',2.9,10.2,'/');
						}
						else if(cutCounter === 5){
							showText('divAnim3','textCutSym6',3.3,10.6,1);
						}
						else if(cutCounter === 6){
							showText('divAnim3','textCutSym7',1.2,7.5,'/');
						}
						else if(cutCounter === 7){
							showText('divAnim3','textCutSym8',.6,8.1,7);				
						}
						else if(cutCounter === 8){
							showText('divAnim3','textSym19',2,12,'=');
							
						}
						else if(cutCounter === 9){
							showText('divAnim3','textSym20',2,13,14);
						}
						clearTimeout(t);
						cutCounter++;
						startCuttingProcess();
						
					}
					
					function startCuttingProcess(){
						t=setTimeout(function(){delayCutNext();},500);
					}
					
					function imgAnimate(divName,topPos,leftPos,duration){
						$('#'+divName).animate(
								{top:topPos+'em',left:leftPos+'em'},duration,
								function(ev){    //callback function after the animation is complete
									//alert('animation complete');
									if(currentLesson === 3){
										if(animCount === 0){
											showText('divAnim1','textSym1',.4,4.8,'x');
											imgAnimate('text3Anim',.5,5.5,1000);
										}
										else if(animCount === 1){
											showText('divAnim1','textSym2',.4,3.5,'(');
											showText('divAnim1','textSym3',.4,6.3,')');
											showText('divAnim1','textSym4',.4,6.8,'+');
											imgAnimate('text2Anim',.5,7.4,1500);
										}
										else if(animCount === 2){
											showText('divAnim1','textSym5',.6,3.3,'_________');
											imgAnimate('text4Anim',1.7,5.4,1500);
										}
										else if(animCount === 3){
											showText('divAnim1','text5Anim',1.7,5.4,4);
											showText('divAnim1','textSym6',1,8.5,'=');
											showText('divAnim1','textSym7',.5,9.7,21);
											showText('divAnim1','text6',.55,9.6,'__');								
											imgAnimate('text5Anim',1.7,9.8,1500);
										
										}
										else if(animCount === 4){
											showText('divAnim1','text2frac1',.5,9.7,21);
											showText('divAnim1','text2frac2',.55,9.6,'__');
											showText('divAnim1','text2frac3',1.7,9.8,4);
											
											showFractions();
										}
										else if(animCount === 5){
											showText('divAnim2','textSym8',.4,4.8,'x');
											imgAnimate('text8Anim',.5,5.5,1000);
										}
										else if(animCount === 6){
											showText('divAnim2','textSym9',.4,3.5,'(');
											showText('divAnim2','textSym10',.4,6.3,')');
											showText('divAnim2','textSym11',.4,6.8,'+');
											imgAnimate('text7Anim',.5,7.7,1500);
										}
										else if(animCount === 7){
											showText('divAnim2','textSym13',.6,3.3,'_________');
											imgAnimate('text9Anim',1.7,5.4,1500);
										}
										else if(animCount === 8){
											showText('divAnim2','text10Anim',1.7,5.4,3);
											showText('divAnim2','textSym14',1,8.5,'=');
											showText('divAnim2','textSym15',.5,9.7,8);
											showText('divAnim2','text12',.55,9.6,'__');								
											imgAnimate('text10Anim',1.7,9.8,1500);
											
										}
										else if(animCount === 9){
											showText('divAnim2','text4frac1',.5,9.7,8);
											showText('divAnim2','text4frac2',.55,9.6,'__');
											showText('divAnim2','text4frac3',1.7,9.8,3);								
											showFractions();
										}
										else if(animCount  === 13){
											hideNextButton();
											showText('divAnim3','textSym16',2,2.3,'x');
											imgAnimate('text3frac1',8,-12,1000);
											imgAnimate('text3frac2',7.3,-11.25,1000);
											imgAnimate('text3frac3',7.55,-11.3,1000);
											imgAnimate('text3frac4',8.8,-11.25,1000);
										}
										else if(animCount === 17){
											showText('divAnim3','textSym17',2,5,'=');
											imgAnimate('text2frac1',7.3,20,1000);
											imgAnimate('text2frac2',7.55,20,1000);
											imgAnimate('text2frac3',8.8,20.3,1000);
										}
										else if(animCount === 20){
											showText('divAnim3','textSym18',2,8.5,'X');
											imgAnimate('text4frac1',7.3,-5,1000);
											imgAnimate('text4frac2',7.55,-5.3,1000);
											imgAnimate('text4frac3',8.8,-5,1000);
											
										}
										else if(animCount === 23){
											
											cutCounter = 0;
											startCuttingProcess();
										}
										animCount++;
										
									}
								else{
									showNextButton();
									if(currentLesson === 2){
											if(clickCounter === 0){
												clickCounter++;
												$('#imgRoti2').show();
												showFractions();
											}
											else if(clickCounter === 1){
												clickCounter++;
												$('#imgRoti3').show();
												$('.nextBtn').hide();
											
											}
										
									}
									
									else if(currentLesson === 1){
										if(clickCounter ===0){
											$('#imgWhole').append('<img id="lesson2frac1" src="assets/image/lesson2frac1.png">');
											$('.nextBtn').click(function(){
												$('#lesson2Div1').append('<img src="assets/image/lesson2frac2.png">');
												clickCounter++;
												showFractions();
											});
										} 
										
									}
									else if(currentLesson === 0)	{
										$('#imgWhole').append('<img id="lesson1frac1" src="assets/image/lesson1frac1.png">');
										$('.nextBtn').click(function(){
											showLesson1ImgFraction();
											$('.nextBtn').hide();
										});
									}
							}
							});
								
					}
				
					function showFractions(){
						showNextButton();
						$('.nextBtn').click(function(){
							if(currentLesson === 3){
								if(clickCounter === 0){		
									showPicture('divImg2','lesson4Img2',28,-2);
									showPicture('divImgDef2','lesson4ImgDef2',4,-2);
									clickCounter++;
									showFractions();
								}
								else if(clickCounter === 1){		
									showPicture('divImgDef3','lesson4ImgDef3',8,-2);
									clickCounter++;
									showFractions();
								}
								else if(clickCounter === 2){		
									showPicture('divImg4','lesson4Img3',38,10);
									clickCounter++;
									showFractions();
								}
								else if(clickCounter === 3){		
									showPicture('divImgDef4','lesson4ImgDef4',12,15);
									clickCounter++;
									//hideNextButton();
								}
								else if(clickCounter === 4){	  //next animation stuffs	
									//animation stuffs of fraction great work needs to be done
									hideNextButton();
									makeAnimContainer('divAnim1',18,4,25,7,'8977FE');
									showText('divAnim1','text1',1,.5,5);
									showText('divAnim1','text2',.3,1.25,1);
									showText('divAnim1','text3',.55,1.3,'_');
									showText('divAnim1','text4',1.8,1.25,4);
									showText('divAnim1','text5',1,2.35,'=');
									
									showText('divAnim1','text1Anim',1,.5,5);
									showText('divAnim1','text2Anim',.3,1.25,1);
									showText('divAnim1','text3Anim',1.8,1.25,4);
									showText('divAnim1','text4Anim',1.8,1.25,4);
									// for animating the fractin part
									showText('divAnim1','text1frac1',1,.5,5);
									showText('divAnim1','text1frac2',.3,1.25,1);
									showText('divAnim1','text1frac3',.55,1.3,'_');
									showText('divAnim1','text1frac4',1.8,1.25,4);					
									
									animCount = 0;
									imgAnimate('text1Anim',.5,4,1000);
									clickCounter++;
									
									
								}
								else if(clickCounter === 5){	  //next animation stuffs	
									hideNextButton();
									makeAnimContainer('divAnim2',18,60,25,7,'8977FE');
									
									
									showText('divAnim2','text7',1,.5,2);
									showText('divAnim2','text8',.3,1.25,2);
									showText('divAnim2','text9',.55,1.3,'_');
									showText('divAnim2','text10',1.8,1.25,3);
									showText('divAnim2','text11',1,2.35,'=');
									
									showText('divAnim2','text6Anim',1,.5,2);
									showText('divAnim2','text7Anim',.3,1.25,2);
									showText('divAnim2','text8Anim',1.8,1.25,3);
									showText('divAnim2','text9Anim',1.8,1.25,3);
									imgAnimate('text6Anim',.5,4,1000);
									
									showText('divAnim2','text3frac1',1,.5,2);
									showText('divAnim2','text3frac2',.3,1.25,2);
									showText('divAnim2','text3frac3',.55,1.3,'_');
									showText('divAnim2','text3frac4',1.8,1.25,3);						
									clickCounter++;
								}
								else if(clickCounter === 6){
									makeAnimContainer('divAnim3',30,30,30,8);
									imgAnimate('text1frac1',8,13.5,1000);
									imgAnimate('text1frac2',7.3,14.25,1000);
									imgAnimate('text1frac3',7.55,14.3,1000);
									imgAnimate('text1frac4',8.8,14.25,1000);
									
								}
								
							}
							
							
							else if(currentLesson === 2){
								
								if(clickCounter === 0){		
									imgAnimate('lessonImgAnimate1',15,32.8,1000);
								}
								else if(clickCounter === 1){
									imgAnimate('lessonImgAnimate2',15.3,40,1000);
								}
								
							
							}
							else if(currentLesson === 1){
								
								if(clickCounter ===1){					
									$('#lesson2Div1').append('<img src="assets/image/lesson2frac3.png">');					
									clickCounter++;
									showFractions();
									
								}
								else if(clickCounter ===2){
									$('#content').append('<img class="float-center" src="assets/image/lesson2ImgDef2.png">');
									clickCounter++;
									showFractions();
								}
								else if(clickCounter ===3){
									$('#content').append('<div id="lesson2ImgFraction" class="lessonImgFrac"></div>');
									$('#lesson2ImgFraction').append('<img src="assets/image/lesson2ImgFractions.png" />');
									clickCounter++;
									showFractions();
								}
								else if(clickCounter ===4){
									$('#content').append('<div id="lesson2ImgFractionRight"></div>');
									$('#lesson2ImgFractionRight').append('<img src="assets/image/img2FractionTotal.png" />');
									clickCounter++;
									showFractions();
								}
								else if(clickCounter ===5){
									$('#content').append('<img class="float-left" src="assets/image/lesson2ImgDef3.png" />');
									clickCounter++;
									showFractions();
								}
								else if(clickCounter ===6){
									$('#content').append('<img class="float-right" src="assets/image/lesson2ImgDef4.png" />');
									clickCounter++;
									$('.nextBtn').hide();
								}
								
							}
							else if(currentLesson === 5){
								if(clickCounter === 0){
									showPicture('divImgDef2','lesson6ImgDef2',11,-2);
								}
								else if(clickCounter === 1){
									showPicture('divImgDef3','lesson6ImgDef3',20,-2);
								}
								else if(clickCounter === 2){
									showPicture('divImgDef4','lesson6ImgDef4',27,-2);
								}
								else if(clickCounter === 3){
									showPicture('divImgDef5','lesson6ImgDef5',33,-2);
									hideNextButton();
								}
								clickCounter++;
							}
						});		
					}
					
					
					function foucs_blur(){
						$('input[type="text"]')
						.focus(function() {
						    $(this).addClass("focus");
						})
						.blur(function() {
						    $(this).removeClass("focus");
						})
					}	
					
					$('#linkNextLesson').click(function(){
						currentLesson++;
						if(currentLesson === 5){
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
						currentLesson--;
						if(currentLesson === 0){
							$('#linkPrevLesson').hide();
						}
						else{
							$('#linkNextLesson').show();
							$('#linkPrevLesson').show();
						}			
						
						nextLesson();
					});
							
					
					$('#linkStart').click(function(){
						game();
					});
					
					$('#linkPlayAgain').click(function(){
						nextLesson();
					});
					
					

		
	}); //end of k.ready
});	//end of document.read				   
			

