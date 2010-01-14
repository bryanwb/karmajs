/***** Check the browser resolution and modify css accordingly ******/
var myWidth;
var myHeight;

//alert(myWidth + ":" + myHeight);

function detect_and_adjust_browser(){
	if( typeof( window.innerWidth ) == 'number' ) { 
		//Non-IE 
		myWidth = window.innerWidth;
		myHeight = window.innerHeight; 

		} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) { 
		//IE 6+ in 'standards compliant mode' 
		myWidth = document.documentElement.clientWidth; 
		myHeight = document.documentElement.clientHeight; 

		} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) { 

		//IE 4 compatible 
		myWidth = document.body.clientWidth; 
		myHeight = document.body.clientHeight; 

		}
$("#imgBackGround").css({ width: myWidth-50, height: myHeight-135});
$("#footerSection").css({ width: myWidth-50, height: 50});
}
/*****   ****/

/**** Global Variables Declaration *****/
var GAME_LEVEL = 1;  //store the level of the game
var randNumbers = [];  //store the two random questions
var randOptions = [];  //store the five random answers including one correct
var optOtherPos = [];   //store the random positions including the right one
var optPosition = [];   //store the correct positions for the answers
var correctPosition;
var pos;
var correctAnswer;
correctCounter = 0;   //store the score of the correct Answer in interval of 5
					   // level is up at 5 correct Answers
var totalCounter = 0;  //
var flag_correct = 1;   //if flag=1, correct at 1st attempt
var NUM_LEVELS = 5;
var selectedOpt;


/***** Methods Declaration and definition ***/
function checkOption(optionSelected){
	pos = optPosition[optionSelected];
	var selectedOpt = randOptions[pos];	
	if(selectedOpt === correctAnswer){
		
		if(flag_correct == 1){   //correct at first attempt
				correctCounter++; 
		}
		totalCounter++;
		$("#scoreBox").html(correctCounter);
		$("#totalBox").html(totalCounter);
		if(correctCounter == 5*GAME_LEVEL){  //Hurray level is up
			GAME_LEVEL++;
		}
		if(GAME_LEVEL > NUM_LEVELS){
			//game over
			game();  //restart the game
		}
		next_numbers();
	}
	else{
		flag_correct = 0;
	}
}

function randomnumber(num1, num2)    //generate random number between any two ranges
{
	var num1 = parseInt(num1);
	var num2 = parseInt(num2);
	var generator = Math.random()*(num2-num1);
	generator = Math.round(num1+generator);
	return generator;
}


function get_random_position()	{                //generate random number include 0
	var rand_no = Math.floor(5*Math.random());
	return rand_no;
}
function generate_game_numbers(){	
	randNumbers[0]=randomnumber((GAME_LEVEL-1)*5,GAME_LEVEL*5);    
	randNumbers[1]=randomnumber((GAME_LEVEL-1)*5,GAME_LEVEL*5);
	correctAnswer = randNumbers[0]+randNumbers[1];
	randOptions[0] = correctAnswer; 
	for(i=1; i<5; i++){
		do{
			flag = 0;
			randOptions[i] = randomnumber((GAME_LEVEL-1)*10,GAME_LEVEL*10);
			for(j=0; j<i; j++){
				if(randOptions[i]===randOptions[j]){
					flag++;
				}
			}
		}while(flag != 0 );  //end of do while loop	
	}

	
	
	correctPosition = get_random_position();
	
	optOtherPos[0] = correctPosition;
	
	for(i=1; i<5; i++){
		do{
			flag = 0;
			optOtherPos[i] = get_random_position();
				for(j=0; j<i; j++){   //chek repeat within optOtherPos array
					if(optOtherPos[i] === optOtherPos[j]){
						flag++;
					}
				}
			
		}while(flag != 0);
			
	}

	for(i=0; i<5; i++){
		var pos = optOtherPos[i];
		optPosition[i] = optOtherPos[pos];
	}
	
	
}
function next_numbers(){
	flag_correct = 1;
	generate_game_numbers();	
	document.getElementById("number1").innerHTML = randNumbers[0];
	document.getElementById("number2").innerHTML = randNumbers[1];
	for(var i=0; i<5; i++){
		var x = i+1;
		pos = optPosition[i];
		document.getElementById("option"+x).innerHTML = randOptions[pos];
	}
	
		
}

function game(){
	correctCounter = 0;
	totalCounter = 0;
	GAME_LEVEL = 1;	
	$("#scoreBox").html(correctCounter);
	$("#totalBox").html(totalCounter);
	next_numbers();
}


/***** DOM READY *******/
$(document).ready(function(){
	$(window).bind("resize", detect_and_adjust_browser);
	$('#plussign').hide();
	$("#linkStart").click(function(){
		$('#plussign').show();
		if(totalCounter === 0){
			game();
		}
	});

	$("#linkPlayAgain").click(function(){
		game();
	});
});