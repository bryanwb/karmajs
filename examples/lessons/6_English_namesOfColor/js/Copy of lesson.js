$(document).ready(function(){
	var k = Karma({
		audio: [{'name':'correct','file':'correct.ogg'},
			    {'name':'incorrect','file':'incorrect.ogg'},
			    {'name':'One fish','file':'one_fish.wav'},
			    {'name':'One house','file':'one_house.wav'},
			    {'name':'Two fish','file':'two_fish.wav'},
			    {'name':'Red fish','file':'red_fish.wav'},
			    {'name':'Blue fish','file':'blue_fish.wav'},
			    {'name':'One mouse','file':'one_mouse.wav'},
			    {'name':'Red house','file':'red_house.wav'},
			    {'name':'Blue mouse','file':'blue_mouse.wav'},
			    {'name':'One head','file':'one_head.wav'},
			    {'name':'One bed','file':'one_bed.wav'},
			    {'name':'Red head','file':'red_head.wav'},
			    {'name':'Blue bed','file':'blue_bed.wav'},
			    {'name':'Green','file':'green.wav'},
			    {'name':'Brown','file':'brown.wav'},
			    {'name':'Purple','file':'purple.wav'},
			    {'name':'turtle','file':'turtle.wav'},
			    {'name':'bean','file':'bean.wav'},
			    {'name':'uncle','file':'uncle.wav'},
			    {'name':'red','file':'red.wav'}
			]});
	
	k.ready(function(){
		var i,j;
		var currentLesson;
		var TOTAL_QUES = 6;
		var currentLessonStart;
		var num;
		var numLessonClicks = new Array(8,4);
		var sounds = new Array('One fish','Two fish','Red fish','Blue fish','One house','One mouse','Red house','Blue mouse',
								'One head','One bed','Red head','Blue bed','Green','Brown','Purple','turtle','Purple','Brown','uncle',
								'bean','green','bed','red'
					);
		var lesson3texts = new Array('See the little','The turtle is','His name is Punckle','He has a','The turtle ate a',
							'He became','The turtle went to','He became'
					);
		
		var assignImages = function(lessonId){
			var lessonIdNew;				
			lessonId = currentLessonStart+lessonId;
			if(currentLesson === 0){
				lessonIdNew = lessonId-2;
			}
			else{
				lessonIdNew = lessonId;
			}
			if(currentLesson === 0 ){
				$('#bindImg'+lessonIdNew).append('<div id="img'+lessonId+'"></div>');
				$('#img'+lessonId).html('<img src="assets/image/'+sounds[lessonId]+'.png">');
			}
		};
		
		var assignLesson =  function(lessonId){
			lessonId = currentLessonStart+lessonId;
			var bindImgCss = {
					'float':'left',
					'width': '210px',
					'text-align':'center',
					'padding-bottom':'1em'
	
				};
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="imgBind"></div>');
			$('#bindImg'+lessonId).css(bindImgCss);
			if(currentLesson === 1){
				$('#bindImg'+lessonId).append('<div id="img'+lessonId+'"></div>');
				$('#img'+lessonId).html('<img src="assets/image/'+sounds[lessonId]+'.png">');
			}
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange large"></div>');
			$('#click'+lessonId).append(sounds[lessonId]).addClass('default');			
			
			$('#click'+lessonId).bind({
				mouseover: function(){
					$(this).addClass('hoverClick');
				},
				mouseout: function(){
					$(this).removeClass('hoverClick');
				},
				click: function(){
					$(this).addClass('clicked');
					var curSound = sounds[lessonId];
					if(currentLesson === 1){
						if(lessonId === 10 || lessonId === 11){
							$('#img'+lessonId).html('<img src="assets/image/'+sounds[lessonId]+'_Clicked.png" />');
						}
					}
					else{
						$('#img'+lessonId).html('<img src="assets/image/'+sounds[lessonId]+'_Clicked.png" />');
					}
					k.audio[curSound].play();					
				}			
			});		
		};
		
		
		var assignColorBoxes = function(lessonId){
			$('#bindImg'+currentLessonStart).append('<div id = "click'+lessonId+'" class="clicktoChange medium border"></div>');
			$('#click'+lessonId).append(sounds[lessonId]).addClass(sounds[lessonId]);	
			
			$('#click'+lessonId).bind({
				mouseover: function(){
					$(this).removeClass(sounds[lessonId]);	
					$(this).addClass('hoverClick');					
				},
				mouseout: function(){
					$(this).removeClass('hoverClick');
					$(this).addClass(sounds[lessonId]);								
				},
				click: function(){
					$(this).addClass(sounds[lessonId]);	
					var curSound = sounds[lessonId];
					k.audio[curSound].play();					
				}					
			});
		};
		
		var assignTexts = function(lessonId){			
			var bindImgCss = {
					'float':'left',
					'width': '450px',
					'height':'40px',
					'text-align':'center',
					'padding-bottom':'0.3em'		
				};
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="imgBind"></div>');
			$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> '+lesson3texts[num]+' </span>');
			
			if(num != 2){				
					
				
				
						$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border"></div>');
						
						if(lessonId === 16){
							$('#click'+lessonId).append(sounds[lessonId]).addClass('Purple');
						}
						if(lessonId === 18){
							$('#bindImg'+lessonId).append('<div id = "clickBrown" class="clicktoChange small border"></div>');
							$('#clickBrown').append('brown').addClass('Brown');
						}
						else if(lessonId === 20){
							$('#click'+lessonId).append(sounds[lessonId]).addClass('Green');
						}
						
						else if(lessonId === 22){
							$('#click'+lessonId).append(sounds[lessonId]).addClass('red');
						}
						else{
							$('#click'+lessonId).append(sounds[lessonId]).addClass('Yellow');
						}
			
				
			$('#bindImg'+lessonId).css(bindImgCss);
			$('#click'+lessonId).bind({
				click: function(){			
					$(this).addClass('clicked');	
					var curSound = sounds[lessonId];
					alert(curSound);
					k.audio[curSound].play();					
				}					
			});
			$('#clickBrown').bind({
				click: function(){			
					$(this).addClass('clicked');	
					var curSound = sounds[lessonId];
					alert(curSound);
					k.audio[curSound].play();					
				}					
			});		
			}
			num++;
	
		};
		
		var startLesson3 = function(){
			var lessonCss = {
					'margin': '1em  0 0  10em',
					'float':'left',
					'width': '600px',
					'height': '520px',
					'text-align':'center'						
				};
				$('#lesson').css(lessonCss);
				currentLessonStart = 12;
				var lessonId = currentLessonStart;
				$('#lesson').append('<div id="bindImg'+currentLessonStart+'" class="imgBind"></div>');
				var bindImgCss = {
						'float':'left',
						'width': '500px',
						'height':'100px',
						'text-align':'center',
						'padding-bottom':'1em'		
					};
				$('#bindImg'+currentLessonStart).css(bindImgCss);
				for(i = currentLessonStart; i< 15; i++){
					assignColorBoxes(i);
				}
				
				lessonId = 15;
				num = 0;
				for(i = lessonId;i<23;i++){
					assignTexts(i);
				}
			 
						
     	};		
		
		var nextLesson = function(){
			$('#content').html('').append('<div id="lesson"></div>');	
			
			if(currentLesson === 2){
				startLesson3();
			}
			
			if(currentLesson < 2){    // for being same interface for lesson 0 and 1
				var lessonCss = {
					'margin': '1em  0 0  18em',
					'float':'left',
					'width': '600px',
					'height': '520px',
					'text-align':'center'			
				};
				clickId = 0;
				$('#lesson').css(lessonCss);
				
				currentLessonStart = 0;
				for(j = 0; j< currentLesson;j++){
					currentLessonStart += numLessonClicks[j];
					if(currentLesson === 0){
						currentLessonStart = 0;
					}
					
				}			
				for(i = 0;i<numLessonClicks[currentLesson];i++){
					assignLesson(i);
				}
				for(i = 0;i<numLessonClicks[currentLesson];i++){
					if(currentLesson === 0){
						if(i === 2|| i === 3 || i === 6||i === 7){
							assignImages(i);	
						}
					}
					else{
						assignImages(i);
					}
				}
			}
			
		};
		
		function gameStart(){
			currentLesson = 2;
			nextLesson();
		}
		
		function game(){
			$('#linkPrevLesson').hide();
			gameStart();
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
			

