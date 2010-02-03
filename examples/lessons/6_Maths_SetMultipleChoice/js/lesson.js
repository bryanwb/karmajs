$(document).ready(function() {
	var i,j,flag;
	var clickedObject;    //store the clicked image id
	var correctCounter = 0;
	var totalCounter = 0;
	var objrand = [];
	var randQues = [];
	var currentObj; //store the current object clicked
	var currentQuestion;
	var NUM_OBJECTS = 4; //no of options
	var TOTAL_QUES = 8;
	var flag_correct; 

	var questions = new Array('समूह V = {a,e,i,o,u}लाई  कसरी लेख्दा ठिक हुदैन ',
						      'MISSISSIPPI (नदीको) नाममा भएका अङ्ग्रेजी वर्णमालाका अक्षर हरुको M समुह बनाउदा कसरी लेख्नुपर्छ ',
							     'चिन्ह  &isin; ले के जनाउछ ',
							     'चिन्ह   &notin; ले के जनाउछ',
							     'समुहको गणनात्मकता (cardinal numbers)  भन्नाले के बुझिन्छ ',
							     'बराबर समुह (equal sets)  भन्नाले के बुझिन्छ' ,
							   'समतुल्य समुह (equivalent sets)  भन्नाले के बुझिन्छ',
							    'चिन्ह &empty; ले कस्तो समुह जनाउछ'
					);
			

	//current answer among four stored at first 4 options for each questions
	var answers = new Array(
			'V = {e,a,i,a,u}','V = {e,a,o,i,u}','V = {i,u,a,o,e}','V = {a,e,o,i,u}',
			'M = {M,I,S,I,P,I}','M = {M,I,S,S,I,S,S,I,P,P,I}','M = {M,I,S,P}','M = {M,I,S,S,P}',
			'समुहको सदस्य हो','समुहको सदस्य होइन','उप-समुह हो','उप-समुह होइन ',
			'समुहको सदस्य होइन','समुहको सदस्य हो','उप-समुह हो','उप-समुह होइन ', 
			'समुहमा भएका सदस्यहरुको सङ्ख्या','सङ्ख्याहरु मिलेर बनेको समुह','समुहहरुको सङ्ख्या','समुहलाई गन्ने',
			'दुईओटा  समुहमा उतिकै र उही सदस्यहरु छन् ', 'दुईओटा  समुहमा उतिकै संख्यामा सदस्यहरु छन्',
			      'दुईओटा  समुहमा उतिकै  केहि सदस्यहरु एकअर्कासंग मिल्छन' ,'दुईओटा  समुहमा उतिकै संख्यामा तर सदस्यहरु सबै फरक हुनुपर्छ ',
			'दुईओटा  समुहमा उतिकै संख्यामा सदस्यहरु छन्','दुईओटा  समुहमा उतिकै र उही सदस्यहरु छन् ',
				'दुईओटा  समुहमा उतिकै  केहि सदस्यहरु एकअर्कासंग मिल्छन' ,'दुईओटा  समुहमा उतिकै संख्यामा तर सदस्यहरु सबै फरक हुनुपर्छ ',
			'एउटा पनि सदस्य नभएको  समुह ',' 0 (शून्य) संख्या सदस्य भएको  समुह','सबैभन्दा ठुलो समुह ','उप-समुह'
		);

	
	var nepaliNumbers = new Array('०','१','२','३','४','५','६'); 
	var optionImg = new Array('a','b','c','d');
	
		var randNumber = function(limit){   //generate random number between any two ranges
			var rand_no = Math.floor(limit*Math.random());
			return rand_no;
		};

		var generate_random_questions = function(){
			randQues[0] = randNumber(TOTAL_QUES);
			for(i=1; i<TOTAL_QUES; i++){
				do{
					flag = 0;
					randQues[i] = randNumber(TOTAL_QUES);
					for(j=0; j<i; j++){
						if(randQues[i]===randQues[j]){
							flag++;
						}
					}
				}while(flag != 0 );  //end of do while loop	
			}
		};
		var generate_random_options_no = function(){	
			objrand[0] = randNumber(NUM_OBJECTS);
			for(i=1; i<NUM_OBJECTS; i++){
				do{
					flag = 0;
					objrand[i] = randNumber(NUM_OBJECTS);
					for(j=0; j<i; j++){
						if(objrand[i]===objrand[j]){
							flag++;
						}
					}
				}while(flag != 0 );  //end of do while loop	
			}
			
		};
	
	var display_score = function(){
		document.scoreForm.score.value = nepaliNumbers[correctCounter];
		document.scoreForm.full_mark.value = nepaliNumbers[totalCounter];
	};
	
	var display_game_over = function(){
		$('#section').hide();
		$('#linkNext').hide();
		$('#gameOver').show();
		$('#gameOver').html();
		$('#gameOver').append('Game Over !!!');
		if(correctCounter === totalCounter){		
		$('#gameOver').append('<div id="gameOverInfo">बधाई छ !!!  सबै उत्तर सहि भए !!! </div>');
		}
		else{
			$('#gameOver').append('<div id="gameOverInfo">किन गलत भयो पत्ता लगाउ र अर्को पटक सहि बनाउने कोशिश गर । <br /> You Got <span class="specialText">'+correctCounter+
					'</span> correct out of <span class="specialText">'+totalCounter+'</span>   questions .</div>');
		}	
	};
	
	var delay = function(){	
		document.delayForm.delayval.value = 1;
		display_game_over();
	};
	var check_game_over = function(){
		if(totalCounter === TOTAL_QUES){   //show all
			t=setTimeout(function(){delay();},1000);
		}
	};
	
	var store_clicked_object = function(objectClicked){
		var checked;
		if(objrand[objectClicked] ===0){
			if(flag_correct == 1){   //correct at first attempt
				checked = "correct";
				correctCounter++;				
			}
		}
		else{
				
			flag_correct = 0;
				checked = "wrong";
			}
		
		flag_correct = 0;
		$('#checkans'+objectClicked).html('');
		$('#checkans'+objectClicked).append('<img src="assets/image/'+checked+'.png">');
		$('#answer').show('');
		$('#answer').html('');
		var quesNo =currentQuestion+1;
		$('#answer').append('<img src="assets/image/ques'+quesNo+'def.png">');
		$('#linkNext').show();	
		totalCounter++;
		display_score();
		check_game_over();
	};

		
	var assignOptions = function (square){	 
		var a = currentQuestion*4;
		var randOption = objrand[square]+a;
		$('#optionSection').append('<div id="checkans'+square+'" class = "check"></div>');
		$('#optionSection').append('<a href="#"></a>');
	    $('#optionSection a:last-of-type').append('<div class="options" id="option'+square+'">'+
	    		'<img src="assets/image/'+optionImg[square]+'.png"></div>');
	    $('#optionSection a:last-of-type').append('<div class="optionText">'+answers[randOption]+'</div>');
	    $('#optionSection a:last-of-type').click(function(){		
	    	if(flag_correct === 1){
		    store_clicked_object(square);
	    	}
		});
	};
		
	var next_sentence = function(){
		flag_correct = 1;
		var imgName,topPos;
		generate_random_options_no();
		currentQuestion = randQues[totalCounter];
		$('#question').html('');
		$('#question').append(nepaliNumbers[totalCounter+1]).append(' .');
		$('#question').append(questions[currentQuestion]).append(' ?');
		for(var i = 0; i < 4; i++){
		    assignOptions(i);
		}	
	};
	function game(){
		$('#gameOver').hide();
		$('#section').show();
		$('#answer').hide();
		correctCounter = 0;
		totalCounter = 0;
		$('#linkNext').hide();
		$('#optionSection').html('');
		display_score();
		generate_random_questions();
		next_sentence();
	}
	$('#linkNext').click(function(){
		$('#linkNext').hide();
		$('#optionSection').html('');
		$('#answer').hide('');
		next_sentence();
	});
	
	$('#linkStart').click(function(){
		game();
	});

	$('#linkPlayAgain').click(function(){
		game();		
	});
	$('#answer').hide();	
	display_score();
	$('#linkNext').hide();

});//end of DOM
