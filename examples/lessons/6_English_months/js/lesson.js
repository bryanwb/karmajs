$(document).ready(function(){
	var k = Karma({
		audio: [{'name':'correct','file':'correct.ogg'},
			{'name':'incorrect','file':'incorrect.ogg'},
			{'name':'January','file':'January.wav'},
			{'name':'February','file':'February.wav'},
			{'name':'March','file':'March.wav'},
			{'name':'April','file':'April.wav'},
			{'name':'May','file':'May.wav'},
			{'name':'June','file':'June.wav'},
			{'name':'July','file':'July.wav'},
			{'name':'August','file':'August.wav'},
			{'name':'September','file':'September.wav'},
			{'name':'October','file':'October.wav'},
			{'name':'November','file':'November.wav'},
			{'name':'December','file':'December.wav'}		
		]});
		  
	k.ready(function(){
		var i,j,flag;
		var TOTAL_QUES = 12;
		var currentDragObject;
		var randPositions = [];
		var arrangedAns = [];
		var sectionNum;  //store the three levels values 0,1,2
		var currentAlphaNum;  //store the current questions num
		var checked; //store the current checked value
		var num;
		var flag_checked; //status flag for one time correct alpahbetical order
		var currentMonth;
		var currentDragObject;
		var arrangedAns = [];
		var randBoxes = []; //store the random boxes value to check
		// six alphabets given to be ordered 6 steps needed to complete the picture 3 levels too complex
		var months = new Array('January','February','March','April','May','June','July','August',
								'September','October','November','December');
		var monthOrder = new Array('1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th');
				
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
		
		var assignMonthsDisplay = function (monthId){
			$('#section').append('<div id="imageArea'+monthId+'" class="imgArea"></div>');
			$('#imageArea'+monthId).append('<div id="month'+monthId+'" class="monthsName">'+months[monthId]+'</div>');
			$('#imageArea'+monthId).append('<img draggable="false" class = "imgBox" src="assets/image/'+months[monthId]+'.png" width:"75%" height="75%"/>');
			$('#imageArea'+monthId).click(function(){
				k.audio[months[monthId]].play();
			});			
		};
	
		var assignMonths = function (monthId){				
			$('#section').append('<div id="monthArea'+monthId+'" class="dropMonthArea"></div>');
			$('#monthArea'+monthId).append('<img class="imgSmall" src="assets/image/small_'+months[monthId]+'.png" />');
			$('#monthArea'+monthId).append('<div class="orderTxt">'+monthOrder[monthId]+'</div>');
			$('#monthArea'+monthId).append('<div id="drop'+monthId+'" class="dropObjects"></div>');
			$('#monthArea'+monthId).append('<span id="checkMonth'+monthId+'" class="check"></div>');						
			var dropObjCss = { 
					'width':'100px','height': '33px','margin': '10px 0px 10px 100px','border-bottom':'2px solid black'				
				};
			$('.dropObjects').css(dropObjCss);
			
		};
		
		var assignDragMonths = function(monthId){			
			var currentMonth = months[monthId];
			$('#dragMonthArea').append('<div id="drag'+monthId+'" class="dragObjects"></div>');
			var dragObjCss = {
					'float': 'left','cursor': 'move','width':'120px','height':'30px',
					'margin':'0.3em', 
					'font':'20px/25px bold Arial,Verdana,Geneva,Helvetica'
			};
			$('.dragObjects').css(dragObjCss);
			var z;
			var monthLength = currentMonth.length;
			var randNum = k.rand(0,monthLength-1);
			randBoxes[monthId] = randNum;
			for(z = 0; z < monthLength; z++){
				if(z === (randNum)){
					$('#drag'+monthId).append('<input type="text" id="box'+monthId+'" class="blankBox" maxlength="1"/>')
					$('#box'+monthId).Watermark("?");
					//insert text box
				}
				else{
					$('#drag'+monthId).append(currentMonth[z]);
				}
				
			}
		};
			
		function drag_drop(){
			$('.dragObjects').draggable({ containment: '#content'});	
			$('.dragObjects').bind('dragstart', function(event, ui) {
				currentDragObject = event.target.id;	
				currentMonth = parseInt(currentDragObject.substring(4));
				
			});
			
			$(".dropObjects").droppable({ tolerence: 'intersect' ,hoverClass: 'drophover'});
			$('.dropObjects').bind('drop', function(event, ui) {
				var currentDropObject = event.target.id;
				var droppedWord = parseInt(currentDropObject.substring(4));
				arrangedAns[droppedWord] = $('#'+currentDragObject).text();
				
				/*if(arrangedAns[droppedWord] === months[droppedWord]){
					$('#'+currentDragObject).draggable('disable');
				}*/
			});
		}
		
		
		var check_months = function(){
			var correct = 0;
			var d = 0;
			var arrangedMonths = [];
			for(i=0; i<TOTAL_QUES; i++){				
					if(arrangedAns[i].length != 0){
							var boxText = $('#box'+i).val();
							var textStore = "";
							var actText = arrangedAns[i];
							var len = arrangedAns[i].length;
							var flag=0;
							for(var x = 0; x < len+1; x++){
								if(x === randBoxes[i]){
									textStore += boxText;
									flag = 1;
								}
								else{
									if(flag === 1){
										textStore += actText[x-1];
									}
									else{
										textStore += actText[x];
									}
										
								}
							}
							arrangedMonths[i] = textStore;
						}
						
				//check correct or incorrect
				if(arrangedMonths[i] === months[i]){
					$('#checkMonth'+i).html('<img src="assets/image/correct.png">');
					correct++;
				}
				else{
					$('#checkMonth'+i).html('<img src="assets/image/incorrect.png">');
				}
				
			}
			if(correct === 12){
				display_game_over();
			}
			
		};
		
		
		var display_game_over = function(){
				$('#section').hide();
				$('#gameOver').show();
				$('#gameOver').html('');
				$('#gameOver').append('GAME OVER<br/>Congratulations!!!');
		};
		
		
		
		function game_start(){
			$('#linkCheck').show();
			$('#gameOver').hide();
			$('#linkNext').hide();
			$('#section').html('');
			for(var i = 0;i<TOTAL_QUES;i++){
				arrangedAns[i] = 0;
			}
			$('#section').append('<div id="topText">Fill in the blanks and place month in right order.</div>');
			for(i=0; i<TOTAL_QUES; i++){
				assignMonths(i);
			}
			$('#section').append('<div id="dragMonthArea"></div>');
			genRandPosition();
			for(i=0; i<TOTAL_QUES; i++){
				assignDragMonths(randPositions[i]);
			}
			drag_drop();

		}
		function game(){
			$('#linkCheck').hide();
			$('#gameOver').hide();
			$('#linkNext').show();
			$('#linkBack').hide();
			$('#section').html('');
			$('#section').append('<div id="topText">Learn the spelling of each month.</div>');					
			for( i = 0; i<TOTAL_QUES; i++){
				assignMonthsDisplay(i);
			}
		}
		game();
		$('#linkCheck').click(function(){
			check_months();
		});
		$('#linkNext').click(function(){
			game_start();
		});
		$('#linkBack').click(function(){
			game();
		});
		$('#linkStart').click(function(){
			game_start();
		});
	
		$('#linkPlayAgain').click(function(){
			game();		
		});
	}); //end of k.ready
});	//end of document.ready