$(document).ready(function() {
/**** Global Variables Declaration *****/
/***   Preload images **/
if (document.images)	{   //if browser supports the image object
	img_hang = new Image();
	// set image url
	image_url= new Array();
	image_url[0] = "assets/image/hangman/hangMan1.png";
	image_url[1] = "assets/image/hangman/hangMan2.png";
	image_url[2] = "assets/image/hangman/hangMan3.png";
	image_url[3] = "assets/image/hangman/hangMan4.png";
	image_url[4] = "assets/image/hangman/hangMan5.png";
	image_url[5] = "assets/image/hangman/hangMan6.png";
	image_url[6] = "assets/image/hangman/hangMan7.png";
	image_url[7] = "assets/image/hangman/hangMan8.png";
	for(var i=0; i<8; i++){ 
	   img_hang.src = image_url[i];
	}
}

var alphakeys = new Array("q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m");
var answers = new Array("kathmandu","bhaktapur","lalitpur","bhairahawa","dharan","biratnagar","solukhumbu","dhangadi","pokhara","janakpur");
var score_numbers = new Array("०","१","२","३","४","५","६","७","८","९","१०"); 

var randQuestions = []; //arry to store the rand questions numbers
var currentQuestion;  //store the id of the current Question
var num_ans_boxes;    //number of the answer boxes required for the current Question
var keySelected;
var alphaAnswers;  //store the answer of the current Question for checking purpose
var selectedKey;  //store the currently pressed selected key
var selectedKeys = [];  //store the selected keys
var num_missed = 0;
var num_keys = 0;  //store the number of keys pressed
var pos;
var correct_alphaKeys=0;  //store the correct alphakeys in a match
var correctCounter = 0;   // increment if the correct answer is done
var totalCounter = 0;  // total hangman played
var flag_miss = 1;   //if flag=0, Missed Answer

var keys1 = $('#keys1');
var keys2 = $('#keys2');
var keys3 = $('#keys3');

/***** Methods Declaration and definition ***/


	var  checkPressedKey = function(keySelected){
		//if correct key is pressed		
		//change the background into white of the selected key
		for(var i=0; i<selectedKeys.length;i++){
			if(selectedKeys[i] === keySelected)
			{
				return false;
			}
		}
		selectedKeys[num_keys] = keySelected;
		num_keys++;
		$('#alpha'+keySelected).css('background-color','white');		
		flag_miss = 1;
		alphaAnswers = answers[currentQuestion];
		selectedKey = alphakeys[keySelected];
		for(var i=0; i<num_ans_boxes; i++){
			if(selectedKey === alphaAnswers[i]){
				flag_miss = 0;
				correct_alphaKeys++; 
				$("#ansBox"+i).html(selectedKey);
			}
		}
		if(correct_alphaKeys === num_ans_boxes){
			correctCounter++;
			totalCounter++;
			show_answers();
			t=setTimeout(function(){next_question();},1000);
			//next_question();
		}
		if(flag_miss != 0 ){
			num_missed++;
			show_hangMan();
			
		}
		if(num_missed === 7){
			totalCounter++;
			$("#keyboard").hide();
			$("#missedText").show();
			$('#linkNext').show();
			show_answers();
			
		}
	};

	var show_answers = function(){
		for(var i=0; i<num_ans_boxes; i++){
			$("#ansBox"+i).html(alphaAnswers[i]);
		}
	};
	
	var assignKeys1 =  function(keys){  
		keys1.append('<a href="#"></a>');
	    $('#keys1 a:last-of-type').append('<div class="alphaKeys" id="alpha'+ keys +'" ></div>');    
	    $('#keys1 a:last-of-type').click(function(){		    
	    	checkPressedKey(keys);
		 });
	};
	var assignKeys2 =  function(keys){  
		keys2.append('<a href="#"></a>');
	    $('#keys2 a:last-of-type').append('<div class="alphaKeys" id="alpha'+ keys +'" ></div>');    
	    $('#keys2 a:last-of-type').click(function(){		    
	    	checkPressedKey(keys);
		});
	};
	
	var assignKeys3 =  function(keys){
		keys3.append('<a href="#"></a>');
	    $('#keys3 a:last-of-type').append('<div class="alphaKeys" id="alpha'+ keys +'" ></div>');    
	    $('#keys3 a:last-of-type').click(function(){		    
	    	checkPressedKey(keys);
		});
	   
	};
	
	var load_alphaKeys = function (){
		for(var i=0; i<26; i++){
			document.getElementById("alpha"+i).innerHTML = alphakeys[i];
		}		
	};
	
	function generate_random_number()	{                //generate random number include 0
		var rand_no = Math.floor(10*Math.random());
		return rand_no;
	};
	
	var generate_random_questions = function(){	
		randQuestions[0] = generate_random_number(); 
		for(i=1; i<10; i++){
			do{
				flag = 0;
				randQuestions[i] = generate_random_number();
				for(j=0; j<i; j++){
					if(randQuestions[i]===randQuestions[j]){
						flag++;
					}
				}
			}while(flag != 0 );  //end of do while loop	
		}
	
	};
	
	var generate_keyboard = function(){
		keys1.html("");
		keys2.html("");
		keys3.html("");
		for(var i=0; i<10; i++){
		    assignKeys1(i);
		}
		for(var i=10; i<19; i++){
		    assignKeys2(i);
		}
		for(var i=19; i<26; i++){
		    assignKeys3(i);
		}
		load_alphaKeys();
	};
	
	var generate_ans_boxes = function(currentQuestion){
		$("#answerSection").html("");
		num_ans_boxes = answers[currentQuestion].length;
		for(var i=0; i<num_ans_boxes; i++){
			$('#answerSection').append('<span class="answerBox" id="ansBox'+i+'">#</span>');			
		}
	};
	
	var show_hangMan = function(){
		$("#hangManSection").html('<img class="imgHang" src="'+image_url[num_missed]+'">');		
	};

	
	var next_question = function(){
		
		selectedKeys = [];
		if(totalCounter === 10){
		//game over
			$("#section").hide();
			$('#linkNext').hide();
			$('#gameOverSection').show();
			$('#gameOverSection').html('');
			
			$('#gameOverSection').append('Game Over<br/>');	
			$('#gameOverSection').append('You got '+correctCounter+' out of '+totalCounter);
			
		}
		else{
			$('#missedText').hide();
			$('#linkNext').hide();
			$("#keyboard").show();
			correct_alphaKeys = 0;
			num_missed = 0;
			generate_keyboard();
			generate_random_questions();	
			currentQuestion = randQuestions[totalCounter];		
			generate_ans_boxes(currentQuestion);		
			show_hangMan();
			document.scoreForm.score.value = score_numbers[correctCounter];
			document.scoreForm.full_mark.value = score_numbers[totalCounter+1];
		}
		
		
	};
	
	function game(){
		$('#gameOverSection').hide();
		$("#section").show();
		correctCounter = 0;
		totalCounter = 0;
		next_question();		
	}
	
	$("#linkStart").click(function(){
		if(totalCounter === 0){
			game();
		}
	});
	
	$("#linkPlayAgain").click(function(){
		game();
	});
	
	$('#linkNext').click(function(){
		next_question();
	});
		$('#gameOverSection').hide();
		$("#section").hide();
});  //end of dom;
