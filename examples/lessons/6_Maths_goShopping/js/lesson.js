$(document).ready(function(){
	var k = Karma({
		audio: [{'name':'correct','file':'correct.wav'},
			{'name':'incorrect','file':'incorrect.wav'}
		]});
	
	k.ready(function(){
		var i,j;
		var checkId;
		var correctCounter;
		var totalCounter;
		var TOTAL_THINGS = 19;
		var TOTAL_MONEYS = 5;
		var TOTAL_QUES = 10;
		var flag_correct;
		var flag_checked;
		var checked;
		var randThings = [];
		var randMoneys = [];
		var totalMoney;
		var totalPrice;
		
		var money = new Array(5,10,25,50,100);
		var things = new Array('roti','pomogranate','pen','pear','papaya','orange','mango','lays','ice',
								'grapes','food','doll','cap','cake','bread','book','balloon','bag','apple'
					);
		var priceThings = new Array(15,5,41,3,7,5,9,19,13,11,45,89,65,33,23,65,25,87,15);
		
		var scoreboard = $('#score_box').scoreboard({'layout':'horizontal', 
		       'winningScore': TOTAL_QUES});
		
		var genRandomThings = function(){
			randThings[0] = k.rand(0,TOTAL_THINGS-1); 
			for(i=1; i<TOTAL_THINGS; i++){
				do{
					flag = 0;
					randThings[i] = k.rand(0,TOTAL_THINGS-1);
					for(j=0; j<i; j++){
						if(randThings[i]===randThings[j]){
							flag++;
						}
					}
				}while(flag != 0 );  //end of do while loop	
			}
		
		};
		
		var genRandomMoneys = function(){
			randMoneys[0] = k.rand(0,TOTAL_MONEYS-1); 
			for(i=1; i<TOTAL_MONEYS; i++){
				do{
					flag = 0;
					randMoneys[i] = k.rand(0,TOTAL_MONEYS-1);
					for(j=0; j<i; j++){
						if(randMoneys[i]===randMoneys[j]){
							flag++;
						}
					}
				}while(flag != 0 );  //end of do while loop	
			}
		
		};
		
		
		
		
		var generatePositions = function(side,posId,topPos,leftPos){
			var side,posIdentify;
			var zindexVal;
			if(side === "left"){
				if(posId === 1){
					zindexVal = 1;
				}
				else if(posId === 3){
					zindexVal = 1;
				}
				else{
					zindexVal = 0;
				}
				$('#left-side').append('<div id="moneyPos'+posId+'" class="moneyPositions"></div>');
				$('#moneyPos'+posId).css({'top':topPos+'px','left':leftPos+'px','z-index':zindexVal});
			}
			else{
				$('#right-side').append('<div id="thingPos'+posId+'" class="thingsPositions"></div>');
				$('#thingPos'+posId).css({'top':topPos+'px','left':leftPos+'px'});
			}		
		};

		var checkAnswer = function(){
			 if(flag_checked != 0){
				 if(checkId == "moneyOk" && totalMoney >= totalPrice){
					 flag_checked = 0;
					 $('#howmuchText').html('<img src="assets/image/howMuchLeft.png" />');
				 }
				 else if(checkId == "moneyNeeded" && totalMoney < totalPrice){
					 flag_checked = 0;
					 $('#howmuchText').html('<img src="assets/image/howMuchNeeded.png" />');
				 }
				 else{  //try again ur score wont increase
					 flag_correct = 0;
				 }
			 }
			 if(flag_checked === 0){
				 $('#textDiv').html('<input type="text" class="textBox" maxlength="3"/>');
				 $('.textBox').val('');
				 foucs_blur();		$('.textBox').focus();
			}
		};
		
		var nextQuestions = function(){		
			$('#howmuchText').html('');			
			$('#textDiv').html('');
			
			totalMoney = 0;
			totalPrice  = 0;
			flag_correct = 1;
			flag_checked = 1;
			$('#left-side').html('').append('<img id="leftText" src="assets/image/leftText.png" />');
			$('#right-side').html('').append('<img id="rightText" src="assets/image/rightText.png" />');

			generatePositions('left',0,25,25);
			generatePositions('left',1,75,325);
			generatePositions('left',2,150,50);
			generatePositions('left',3,180,350);
			
			generatePositions('right',0,50,25);
			generatePositions('right',1,25,220);
			generatePositions('right',2,225,50);
			generatePositions('right',3,200,275);
			
			genRandomMoneys();
			var currentMoneys = k.rand(1,4);
			for(i = 0; i< currentMoneys ;i++){
				var randMoney = randMoneys[i];
				$('#moneyPos'+i).append('<img src = "assets/image/rs'+money[randMoney]+'.png" />');
				totalMoney += money[randMoney];
			}
			genRandomThings();
			var currentThings = k.rand(1,4);
			for(i = 0; i< currentThings ;i++){
				var randThing = randThings[i];
				$('#thingPos'+i).append('<img src = "assets/image/'+things[randThing]+'.png" />');
				totalPrice += priceThings[randThing];
			}

			$('.checkMoney').click(function(){
				checkId = $(this).attr('id');
				checkAnswer();
			});
		};
		

		
		function gameStart(){
			$('#content').removeClass('backOpaque');
			$('#gameOver').hide();
			totalCounter = 0;
			correctCounter = 0;
			nextQuestions();
			
		}
		
		var displayGameOver = function(){
			$('#content').addClass('backOpaque');
			$('#gameOver').show();
			if(correctCounter === totalCounter){		
				$('#gameOver').html('बधाई छ !!!  सबै उत्तर सहि भए !!! ');
			}
			else{
				$('#gameOver').html('<div id="gameOverInfo">किन गलत भयो पत्ता लगाउ र अर्को पटक सहि बनाउने कोशिश गर । <br /> You Got <span class="specialText">'+correctCounter+
				'</span> correct out of <span class="specialText">'+totalCounter+'</span>   questions .</div>');
			}	
		};
		
		var delayCorrectShow = function(){
			document.delayForm.delayval.value = 1;
			if(checked === 1){
				if(totalCounter === 10){
					displayGameOver();
				}
				else{
					nextQuestions();
				}
			}
			$('#checkDisplay').html('');
			 
			
		};	
		
		var checkMoney = function(){
			var flag_correctAns = 1;
			var textVal = $('.textBox').val();
			if( checkId === "moneyOk" && textVal == (totalMoney - totalPrice) ){ 
				flag_correctAns = 1;
			}
			else if(checkId === "moneyNeeded" && textVal == (totalPrice - totalMoney)){
				flag_correctAns = 1;
			}
			else{
				flag_correctAns = 0;
			}
				
			if(flag_correctAns === 1){
				checked = 1;
				k.audio.correct.play();
				if(flag_correct === 1){
					correctCounter++;
					scoreboard.scoreboard('inc');
				}
				totalCounter++;
				scoreboard.scoreboard('incTotal');			
				$('#checkDisplay').html('<img src="assets/image/correct.png" />');
				
			}
			else{
				flag_correct = 0;
				checked = 0;
				k.audio.incorrect.play();
				$('#checkDisplay').html('<img src="assets/image/incorrect.png" />');
				t=setTimeout(function(){delayCorrectShow();},1000);
			}
			t=setTimeout(function(){delayCorrectShow();},1000);
			
		};
		
		function foucs_blur(){
			$('input[type="text"]')
			.focus(function() {
			    $(this).addClass("focus");
			})
			.blur(function() {
			    $(this).removeClass("focus");
			})
			.keypress(function(event) {
				if(event.which === 13){
					checkMoney();
				}
				
			});
			
		}
		
		$('#linkStart').click(function(){
			gameStart();
		});
	
		$('#linkPlayAgain').click(function(){
			gameStart();		
		});
		$('#linkHelp').mouseover(function(){
			$('#help').slideDown(2000);
		})
		.mouseout(function(){
			$('#help').slideUp(2000);
			
		});
			}); //end of k.ready
		});	//end of document.read				   
			
