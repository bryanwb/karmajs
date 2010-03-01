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
			    {'name':'bed','file':'bed.wav'},
			    {'name':'Red','file':'red.wav'},
			    {'name':'Blue','file':'blue.wav'},
			    {'name':'Yellow','file':'yellow.wav'},
			    {'name':'dead','file':'dead.wav'},
			    {'name':'fellow','file':'fellow.wav'},
			    {'name':'flew','file':'flew.wav'},
			    {'name':'zoo','file':'zoo.wav'},
			    {'name':'Orange','file':'orange.wav'},
			    {'name':'White','file':'white.wav'},
			    {'name':'back','file':'back.wav'},
			    {'name':'November','file':'november.wav'},
			    {'name':'spots','file':'spots.wav'},
			    {'name':'Black','file':'black.wav'},
			    {'name':'Gray','file':'grey.wav'},
			    {'name':'Pink','file':'pink.wav'},
			    {'name':'drink','file':'drink.wav'},
			    {'name':'ink','file':'ink.wav'},
			    {'name':'think','file':'think.wav'},
			    {'name':'sink','file':'sink.wav'},
			    {'name':'stink','file':'stink.wav'}
			    
			]});
	
	k.ready(function(){
		var i,j;
		var currentLesson;
		var TOTAL_QUES = 6;
		var currentLessonStart;
		var num;
		var numLessonClicks = new Array(8,4);
		var sounds = new Array('One fish','Two fish','Red fish','Blue fish','One house','One mouse','Red house','Blue mouse',
								'One head','One bed','Red head','Blue bed',
								'Green','Brown','Purple','turtle','Purple','Brown','uncle','bean','Green','bed',  //23
								'Red','Yellow','Blue','zoo','dead','Red','Yellow','fellow','flew','Blue',  //32
								'Orange','White','Black','back','Orange','Green','Green','Orange','November', //42
								'White','Black','spots','White','Black',
								'Black','Gray','Pink','drink','Black','ink','Black','Black','sink','Gray','stink','Pink','think'
								
					);
		var lesson3texts = new Array('See the little','The turtle is','His name is Punckle','He has a','The turtle ate a',
							'He became','The turtle went to','He became'
					);
		var lesson4texts = new Array('We go the little','One animal is','Its color is','This animal is','She is tall',
							'We go to see the birds','A bird just','Its color is' 
		);
		var lesson5texts = new Array('From the zoo we came','Let us go to see the orange tree','An orange is','Have you seen an orange that is',
				'An orange on a','It becomes'
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
		
		
		var assignColorBoxes = function(lessonId){  //for lesson 3 and 4
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

		var bindSounds = function(lessonId){
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
					//$(this).addClass(sounds[lessonId]);	
					var curSound = sounds[lessonId];
					//alert(curSound);
					k.audio[curSound].play();	
					if(lessonId === 16){
						$('#img0').html('<img src="assets/image/turtle_Clicked.png" />');
					}
					if(lessonId === 22){
						$('#img3').html('<img src="assets/image/red_bed_Clicked.png" />');
					}
					if(lessonId === 27){
						$('#img5').html('<img src="assets/image/dead_Clicked.png" />');
					}
					if(lessonId === 28){
						$('#img6').html('<img src="assets/image/giraffe_Clicked.png" />');
					}
					if(lessonId === 31){
						$('#img7').html('<img src="assets/image/bird_Clicked.png" />');
					}
					if(lessonId === 37 || lessonId === 38 ){
						$('#img9').html('<img src="assets/image/orange_Clicked.png" />');
					}
					if(lessonId === 39 || lessonId === 36){
						$('#img9').html('<img src="assets/image/orange.png" />');
					}
					if(lessonId === 41 || lessonId === 44){
						$('#img11').html('<img src="assets/image/cat.png" />');
					}
					if(lessonId === 42 || lessonId === 45){
						$('#img11').html('<img src="assets/image/cat_black.png" />');
					}
					if(lessonId === 43){
						$('#img11').html('<img src="assets/image/cat_strip.png" />');
					}
				}					
			});
			
		}
		
		
		
		
		
	var assignImagesAbsolute = function(imgId,topPos,leftPos,imgName){
		$('#lesson').append('<div id="img'+imgId+'"></div>')
		$('#img'+imgId).html('<img src="assets/image/'+imgName+'.png" />');
		var imgCss = {
				'position':'absolute',
				'top':topPos+'px',
				'left':leftPos+'px'
		};			
		$('#img'+imgId).css(imgCss);
		bindSounds(imgId);
	};	
	
	var startLesson7 = function(){		
		var lessonCss = {
				'position':'relative',
				'margin': '1em  0 0  1em',
				'float':'left',
				'width': '800px',
				'height': '520px',
				
			};
			$('#lesson').html('').css(lessonCss);
			currentLessonStart = 46;
			var lessonId = currentLessonStart;
			$('#lesson').append('<div id="bindImg'+currentLessonStart+'" class="imgBind"></div>');
			var bindImgCss = {
					'position':'relative',
					'float':'left',
					'width': '500px',
					'height':'40px',
					'text-align':'center',
					'padding-bottom':'1em',
					'margin-left':'5em'
				};
			$('#bindImg'+currentLessonStart).css(bindImgCss);
			for(i = currentLessonStart; i< 49; i++){
				assignColorBoxes(i);
			}
			
			lessonId = 49;
			num = 0;
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson7css marginSmall"></div>');
			$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> Which would you like to </span>');
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border yellow"></div>');
			$('#click'+lessonId).append('drink ?');
			bindSounds(lessonId);
			lessonId++;
			
			$('#lesson').append('<div id="bindImgGlasses" class="lesson7css marginSmall"></div>');
			$('#bindImgGlasses').append('<img src="assets/image/black_glass.png" />');
			$('#bindImgGlasses').append('<img src="assets/image/gray_glass.png" />');
			$('#bindImgGlasses').append('<img src="assets/image/pink_glass.png" />');
			
			$('#lesson').append('<div id="bindImgGlassTexts" class="lesson7css marginSmall"></div>');
			$('#bindImgGlassTexts').append('<span class = "clickTextInfo">           This     this  or   this? </span>');
			 
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson7css marginSmall"></div>');
			$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> That one is </span>');
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border black"></div>');
			$('#click'+lessonId).append('black');
			bindSounds(lessonId);
			lessonIdNew = lessonId+1;	
			$('#bindImg'+lessonId).append('<span class = "smallclickTextInfo"></span>');
			$('#bindImg'+lessonId).append('<div id = "click'+lessonIdNew+'" class="clicktoChange small border yellow"></div>');
			$('#click'+lessonIdNew).append('ink');
			bindSounds(lessonIdNew);
			lessonId+=2;
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson7css marginSmall"></div>');
			$('#bindImg'+lessonId).append("<span class = 'clickTextInfo'> Don't drink</span>");
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border black"></div>');
			bindSounds(lessonId);
			$('#bindImg'+lessonId).append('<span class = "smallclickTextInfo">ink</span>');
			lessonId+=2;
			
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson7css marginSmall"></div>');
			$('#bindImg'+lessonId).append("<span class = 'clickTextInfo'> It will make you</span>");
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border yellow"></div>');
			$('#click'+lessonId).append('sink');
			bindSounds(lessonId);
			lessonId++;
			
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson7css marginMedium"></div>');
			$('#bindImg'+lessonId).append("<span class = 'clickTextInfo'> That is </span>");
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border gray"></div>');
			$('#click'+lessonId).append('gray');
			bindSounds(lessonId);
			$('#bindImg'+lessonId).append('<span class = "smallclickTextInfo">ink</span>');
			lessonId++;
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson7css marginMedium"></div>');
			$('#bindImg'+lessonId).append("<span class = 'clickTextInfo'> It will make you</span>");
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border yellow"></div>');
			$('#click'+lessonId).append('stink');
			bindSounds(lessonId);
			lessonId++;
			
			
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson7css marginLarge"></div>');
			$('#bindImg'+lessonId).append("<span class = 'clickTextInfo'> That is </span>");
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border pink"></div>');
			$('#click'+lessonId).append('pink');
			bindSounds(lessonId);
			$('#bindImg'+lessonId).append('<span class = "smallclickTextInfo">ink</span>');
			lessonId++;
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson7css marginLarge"></div>');
			$('#bindImg'+lessonId).append("<span class = 'clickTextInfo'> It will make you</span>");
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border yellow"></div>');
			$('#click'+lessonId).append('think');
			bindSounds(lessonId);
				
			assignImagesAbsolute(5,135,450,'sink');
			assignImagesAbsolute(6,280,550,'stink');
			assignImagesAbsolute(7,375,800,'think');
		
 	};		

	
	var startLesson6 = function(){		
		var lessonCss = {
				'position':'relative',
				'margin': '6em  0 0  10em',
				'float':'left',
				'width': '600px',
				'height': '400px',
				'text-align':'center'						
			};
			$('#lesson').html('').css(lessonCss);
			currentLessonStart = 41;
			var lessonId = currentLessonStart;
				
			$('#lesson').append('<div id="bindImg211" class="lesson6css"></div>');
			$('#bindImg211').append('<span class = "clickTextInfo"> Look at cat</span>');
			
			$('#lesson').append('<div id="img11"></img>');
			$('#img11').append('<img src="assets/image/cat.png />');
			
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson6css"></div>');
			$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> It is </span>');
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border white"></div>');
			$('#click'+lessonId).append('white');
			bindSounds(lessonId);
			$('#bindImg'+lessonId).append('<span class = "smallclickTextInfo"> and fat.</span>');
			lessonId++;
			
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson5css"></div>');
			$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> Make the white cat </span>');
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border black"></div>');
			$('#click'+lessonId).append('black');
			bindSounds(lessonId);
			lessonId++;
			
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson5css"></div>');
			$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> Give that black cat  spots </span>');
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border yellow"></div>');
			$('#click'+lessonId).append('white');
			bindSounds(lessonId);
			lessonId++;
			
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson5css"></div>');
			$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> Now is the cat </span>');
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border white"></div>');
			$('#bindImg'+lessonId).append('<span class = "smallclickTextInfo">,</span>');
			bindSounds(lessonId);
			lessonIdNew = lessonId+1;			
			$('#bindImg'+lessonId).append('<div id = "click'+lessonIdNew+'" class="clicktoChange small border black"></div>');
			bindSounds(lessonIdNew);
			$('#bindImg'+lessonId).append('<span class = "smallclickTextInfo"> or fat.</span>');
		
	}
		
	var startLesson5 = function(){		
		var lessonCss = {
				'position':'relative',
				'margin': '1em  0 0  10em',
				'float':'left',
				'width': '700px',
				'height': '520px',
				'text-align':'center'						
			};
			$('#lesson').html('').css(lessonCss);
			currentLessonStart = 32;
			var lessonId = currentLessonStart;
			$('#lesson').append('<div id="bindImg'+currentLessonStart+'" class="imgBind"></div>');
			var bindImgCss = {
					'position':'relative',
					'float':'left',
					'width': '700px',
					'height':'100px',
					'text-align':'center',
					'padding-bottom':'1em'		
				};
			$('#bindImg'+currentLessonStart).css(bindImgCss);
			for(i = currentLessonStart; i< 35; i++){
				assignColorBoxes(i);
			}
			
			lessonId = 35;
			num = 0;
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson5css"></div>');
			$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> '+lesson5texts[num]+' </span>');
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border yellow"></div>');
			$('#click'+lessonId).append(sounds[lessonId]);
			bindSounds(lessonId);
			num++;
			$('#lesson').append('<div id="bindImg120" class="lesson5css"></div>');
			$('#bindImg120').append('<span class = "clickTextInfo"> '+lesson5texts[num]+'</span>');
			lessonId++;
			num++;
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson5css"></div>');
			$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> '+lesson5texts[num]+' </span>');
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border orange"></div>');
			$('#click'+lessonId).append('orange');
			bindSounds(lessonId);
			lessonId++;
			num++;
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson5css"></div>');
			$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> '+lesson5texts[num]+' </span>');
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border yellow"></div>');
			$('#click'+lessonId).append('green ?');
			bindSounds(lessonId);
			lessonId++;
			num++;
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson5css"></div>');
			$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> '+lesson5texts[num]+' </span>');	
			$('#bindImg'+lessonId).append('<span class = "lesson5tree"></span>');
			$('#bindImg'+lessonId).append('<span class = "clickTextInfo">is</span>');	
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border green"></div>');
			$('#click'+lessonId).append('green');
			bindSounds(lessonId);
			lessonId++;
			num++;
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson5css"></div>');
			$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> '+lesson5texts[num]+' </span>');
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border orange"></div>');
			bindSounds(lessonId);
			lessonIdNew = lessonId+1;
			$('#bindImg'+lessonId).append('<span class = "smallclickTextInfo"> in </span>');
			$('#bindImg'+lessonId).append('<div id = "click'+lessonIdNew+'" class="clicktoChange small border yellow"></div>');
			$('#click'+lessonIdNew).append('November');
			bindSounds(lessonIdNew);
		
			assignImagesAbsolute(9,190,600,'orange');
			assignImagesAbsolute(10,350,320,'tree');
			
 	};
	
	
 	var startLesson4 = function(){		
		var lessonCss = {
				'position':'relative',
				'margin': '1em  0 0  10em',
				'float':'left',
				'width': '700px',
				'height': '520px',
				'text-align':'center'						
			};
			$('#lesson').html('').css(lessonCss);
			currentLessonStart = 22;
			var lessonId = currentLessonStart;
			$('#lesson').append('<div id="bindImg'+currentLessonStart+'" class="imgBind"></div>');
			var bindImgCss = {
					'position':'relative',
					'float':'left',
					'width': '500px',
					'height':'100px',
					'text-align':'center',
					'padding-bottom':'1em'		
				};
			$('#bindImg'+currentLessonStart).css(bindImgCss);
			for(i = currentLessonStart; i< 25; i++){
				assignColorBoxes(i);
			}
			
			lessonId = 25;
			num = 0;
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson3css"></div>');
			$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> '+lesson4texts[num]+' </span>');
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border yellow"></div>');
			$('#click'+lessonId).append(sounds[lessonId]);
			bindSounds(lessonId);
			lessonId++;
			num++;
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson3css"></div>');
			$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> '+lesson4texts[num]+' </span>');
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border yellow"></div>');
			$('#click'+lessonId).append(sounds[lessonId]);
			bindSounds(lessonId);
			lessonId++;
			num++;
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson3css"></div>');
			$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> '+lesson4texts[num]+' </span>');
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border red "></div>');
			bindSounds(lessonId);
			lessonId++;
			num++;
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson3css"></div>');
			$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> '+lesson4texts[num]+' </span>');
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border yellow"></div>');
			$('#click'+lessonId).append(sounds[lessonId]);
			bindSounds(lessonId);
			lessonId++;
			num++;
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson3css"></div>');
			$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> '+lesson4texts[num]+' </span>');
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border yellow"></div>');
			$('#click'+lessonId).append(sounds[lessonId]);
			bindSounds(lessonId);
			
			
			num++;
			$('#lesson').append('<div id="bindImg120" class="lesson3css"></div>');
			$('#bindImg120').append('<span class = "clickTextInfo"> '+lesson4texts[num]+' </span>');
			lessonId++;
			num++;
			
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson3css"></div>');
			$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> '+lesson4texts[num]+' </span>');
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border yellow"></div>');
			$('#click'+lessonId).append(sounds[lessonId]);
			bindSounds(lessonId);
			lessonId++;
			num++;
			$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson3css"></div>');
			$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> '+lesson4texts[num]+' </span>');
			$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border blue"></div>');
			$('#click'+lessonId);
			bindSounds(lessonId);


			assignImagesAbsolute(4,20,450,'zoo');
			assignImagesAbsolute(5,135,425,'dead');
			assignImagesAbsolute(6,180,0,'giraffe');
			assignImagesAbsolute(7,250,500,'bird');
			assignImagesAbsolute(8,280,550,'cage');
			
 	};		

 	
		
	var startLesson3 = function(){
			var lessonCss = {
					'position':'relative',
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
						'position':'relative',
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
				$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson3css"></div>');
				$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> '+lesson3texts[num]+' </span>');
				$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border yellow"></div>');
				$('#click'+lessonId).append(sounds[lessonId]);
				bindSounds(lessonId);
				lessonId++;
				num++;
				$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson3css"></div>');
				$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> '+lesson3texts[num]+' </span>');
				$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border purple"></div>');
				$('#click'+lessonId).append(sounds[lessonId]);
				bindSounds(lessonId);
				lessonId++;
				num++;
				$('#lesson').append('<div id="bindImg100" class="lesson3css"></div>');
				$('#bindImg100').append('<span class = "clickTextInfo"> '+lesson3texts[num]+' </span>');

				num++;
				$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson3css"></div>');
				$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> '+lesson3texts[num]+' </span>');
				$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border brown"></div>');
				$('#click'+lessonId).append('brown');
				bindSounds(lessonId);
				lessonId++;
				$('#bindImg'+(lessonId-1)).append('<div id = "click'+lessonId+'" class="clicktoChange small border yellow"></div>');
				$('#click'+lessonId).append('uncle');
				bindSounds(lessonId);
				lessonId++;
				num++;
				$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson3css"></div>');
				$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> '+lesson3texts[num]+' </span>');
				$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border yellow"></div>');
				$('#click'+lessonId).append(sounds[lessonId]);
				bindSounds(lessonId);
				lessonId++;
				num++;
				$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson3css"></div>');
				$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> '+lesson3texts[num]+' </span>');
				$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border green"></div>');
				$('#click'+lessonId).append('');
				bindSounds(lessonId);
				lessonId++;
				num++;
				$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson3css"></div>');
				$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> '+lesson3texts[num]+' </span>');
				$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border yellow"></div>');
				$('#click'+lessonId).append(sounds[lessonId]);
				bindSounds(lessonId);
				lessonId++;
				num++;
				$('#lesson').append('<div id="bindImg'+lessonId+'" class="lesson3css"></div>');
				$('#bindImg'+lessonId).append('<span class = "clickTextInfo"> '+lesson3texts[num]+' </span>');
				$('#bindImg'+lessonId).append('<div id = "click'+lessonId+'" class="clicktoChange small border red"></div>');
				$('#click'+lessonId).append(sounds[lessonId]);
				bindSounds(lessonId);

				assignImagesAbsolute(0,75,0,'turtle');
				assignImagesAbsolute(1,150,500,'brown_uncle');
				assignImagesAbsolute(2,275,450,'bean');
				assignImagesAbsolute(3,400,450,'bed');
				
     	};		
		
     	
     	
		var nextLesson = function(){
			$('#content').html('').append('<div id="lesson"></div>');	
			if(currentLesson === 2){
				startLesson3();
			}
			if(currentLesson === 3){
				startLesson4();
			}
			if(currentLesson === 4){
				startLesson5();
			}
			if(currentLesson === 5){
				startLesson6();
			}
			if(currentLesson === 6){
				startLesson7();
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
			nextLesson();
		}
		
		function game(){
			$('#linkPrevLesson').hide();
			currentLesson = 0;
			gameStart();
		}
		$('#linkPrevLesson').hide();
		currentLesson = 0;
		
		$('#linkNextLesson').click(function(){
			currentLesson++;
			if(currentLesson === 6){
				$('#linkNextLesson').hide();
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
			

