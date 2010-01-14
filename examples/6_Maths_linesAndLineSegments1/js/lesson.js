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
	var TOTAL_QUES = 6;
	var flag_correct; 

	var questions = new Array('चित्रको कुन सरलरेखा (line) हो',
						             'चित्रको कुन भाग रेखाखण्ड (line segment)  हो ',
							      'रुलर (ruler)  के गर्नको लागि प्रयोग गरिन्छ ',
							      'तलका  मध्ये कुन चित्रले समानान्तर रेखाहरु (parallel lines) जनाउछ ',
							      'तलका  मध्ये कुन चित्रले प्रतिच्छेदित रेखाहरु (intersecting lines) जनाउछ',
							      'तलका  मध्ये कुन चित्रले प्रतिच्छेदित लम्बरेखाहरु (perpendicular lines) जनाउछ' 
					);
			

	//current answer among four stored at first 4 options for each questions
	var answers = new Array(
			'AD','BC','BD','AB',
			'BC','AD','BD','AB',
			'रेखाखण्ड नाप्न ','कोण नाप्न ','वर्ग नाप्न ',' रेखा नाप्न ',
			'चित्र ख','चित्र क','चित्र ग','चित्र घ',
			'चित्र ग','चित्र क','चित्र ख','चित्र घ',
			'चित्र क','चित्र ख ','चित्र ग','चित्र घ'				
	);
	var definitions = new Array('न त कतै सुरु हुने ना अन्त्य हुने अनन्त सम्म लम्बिइ रहने र नापेर नसकिने रेखालाइ  सरलरेखा (Line) भनिन्छ ',
						'दुई बिन्दुबिचको निश्चित लम्बाई लाई सिधा पारेर जोड्दा एउटा रेखाखण्ड (Line Segment) बन्छ',
						'रुलर (Scale) का सम्मुख किनाराहरु सिधा र निश्चित लम्बाई भएका हुनाले यसलाई रेखाखण्डको नाप लिन प्रयोग गरिन्छ ',
						'अनन्तसम्म तन्किरहदा पनि प्रतिच्छेदित नहुने र सधै बराबर दुरिमा रहने  दुई अथवा  दुईभन्दाबढी रेखाहरुलाई समानान्तर रेखा (Parallel Lines)  भनिन्छ',
						'कुनै एक बिन्दुमा काट्दै चारैतर्फ लम्बिने दुईवटा रेखाहरुलाई प्रतिच्छेदित (Intersecting Lines) भनिन्छ',
						'आपसमा समकोण परिकन प्रतिच्छेदित भएका रेखाहरुलाई लम्बरेखाहरु  (Perpendicular Lines) भनिन्छ '
						
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
		$('#answer').append(definitions[currentQuestion]).append(' । ');
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
		if(currentQuestion < 2){
			imgName = "line_segment";
			topPos = 40;
		}
		else if(currentQuestion === 2 ){
			imgName = "scale";
			topPos = 40;
		}
		else{
			imgName = "lines";
			topPos = 20;
		}
		$('#imgStory').css({'top':topPos+'%'}).html('<img src="assets/image/'+imgName+'.png"');
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
