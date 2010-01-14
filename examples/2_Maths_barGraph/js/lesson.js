$(document).ready(function() {
	/****  Global Variables  *******/
var objects = new Array('ball','banana','cup','flower','glass');
var currentDragObject;    //store the id of current drag object selected
var currentDropObject;   //store the id of current drop object selected
var dropNumber;         //current drop Area number
var dragNumber;			  //current drop Area number
var dropRow;			 //current row
var dropCol;			//current column
var stackedObjects = [];  //store the value of the stacked objects of particular type if at right
var stacklevel;
var num_objects = 0;
var randPositions = [];   //store the random positions for the generated image numbers
var randImages = new Array("2","3","2","1","2");
var draggedImage = 0; //store the current drag image id i.e. 0 for ball
var dragImgPos = []; 
var barGraphComplete = 0;  //set to 1 bar graph is complete
var currentAnswer;
var currentQuestion = 0;
var questions = new Array(
				"बल कति वटा छन् ?","केरा कति वटा छन् ?","कप  कति वटा छन् ?","फुल कति वटा छन् ?","गिलास  कति वटा छन् ?",
				"केरा फुल भन्दा कति  बढी ?","फुल भन्दा बल कति बढी ?","गिलास केरा भन्दा कति कम ?","कप र फुलमा कुन बढी ?","केरा र बलमा कुन बढी ?");
var answers = new Array("2","3","2","1","2","2","1","1","cup","banana");
          
              /**** Questions ****
               * How Many ? (5 Questions)
               * Which one is greater? 3 questions
               * 
               */
              
            
/*****************************/
//generate_random_number_of_images();	
$('#questionSection').hide();
	generate_objects();
	draw_bar_graph();
	check_bar_graph_completion();
	/*****    Methods        *******/
	
	function generate_questions(){
			if(currentQuestion > 9 ){
				display_game_over();
			}
			else{
				
			$("#questionSection").html("");
			$("#questionSection").append('<div id="question'+currentQuestion+'" class="questions">');	
			$("#questionSection").append(questions[currentQuestion]);
			$("#questionSection").append('</div>');
			}
	}
	
	function check_answer(){
		if(currentAnswer == answers[currentQuestion]){
			currentQuestion += 1;
			generate_questions();
		}
		

	}
	
	function display_game_over(){
		$("#questionSection").html("");
		$("#questionSection").append('<div class="questions">');	
		$("#questionSection").append('बधाई छ तिमीले सबै प्रश्नको  जवाफ दियौ !!! ');
		$("#questionSection").append('</div>');
	}
	
	function checkNumberPressed(pressedNumber){
		if(barGraphComplete === 1){
			currentAnswer = pressedNumber;			
			check_answer();
		}
	}

	
	
	function check_bar_graph_completion(){
		if(num_objects == 10){
			barGraphComplete = 1;
			$('#questionSection').show();
			generate_questions();
		}
	}
	
	/*******************************/
	
	function generate_numbers(x){
		$("#numbersSection").append('<a href="#"></a>');
		$('#numbersSection a:last-of-type').append('<div id="number'+i+'" draggable="false" class="numbers">'+x+'</div>');
		$('#numbersSection a:last-of-type').click(function(){
			checkNumberPressed(x);
		});
	}
	
	function generate_objects_bottom(objectid){
		$("#objectsSection").append('<a href="#"></a>');
		$("#objectsSection a:last-of-type").append('<img src="assets/image/'+objects[objectid]+'.png" draggable="false" class="objects" />');
		$('#objectsSection a:last-of-type').click(function(){
			checkNumberPressed(objects[objectid]);
		});
	}
	
	function draw_bar_graph(){
		$("#barGraph").html("");
		for(var i=0; i<77; i++){
			$("#barGraph").append('<div id="dropObj'+i+'" class="dropObjects"></div>');
		}		
		$("#numbersSection").html("");
		for(var i=0; i<7; i++){
			var x= 7-i;
			generate_numbers(x);
		}
		$("#objectsSection").html("");
		for(var i=0; i<5; i++){
			generate_objects_bottom(i);
		}
		num_objects = 0;
	}
	
	function generate_random_number()	{                //generate random number include 0
		var rand_no = Math.floor(10*Math.random());
		return rand_no;
	}

	function generate_random_positions(){	
		randPositions[0] = generate_random_number(); 
		for(i=1; i<10; i++){
			do{
				flag = 0;
				randPositions[i] = generate_random_number();
				for(j=0; j<i; j++){
					if(randPositions[i]===randPositions[j]){
						flag++;
					}
				}
			}while(flag != 0 );  //end of do while loop	
		}
	}
	
	function generate_objects(){
		generate_random_positions();		
		for(var i=0; i<5; i++){
			stackedObjects[i] = 0;
		}
		$("#imageSection").html("");
		for(var i=0; i<10; i++){
				$("#imageSection").append('<div id="dragImg'+i+'" class="dragObjects">');				
				$("#imageSection").append('</div>');
		}
		var x=0;
		var randImgPos;
		for(var i=0; i<5; i++){
			for(var j=0; j<randImages[i];j++){
				randImgPos = randPositions[x];
				$('#dragImg'+randImgPos).css('background-image','url(assets/image/'+objects[i]+'.png)');
				dragImgPos[x] = randImgPos;
				x++;
			}			
		}
	}
	
	
	
	/**** Drag Handling Functions ***/

	$('.dragObjects').draggable({ containment: '#gameSection', scroll: false });
	$('.dragObjects').bind('dragstart', function(event, ui) {
		currentDragObject = event.target.id;
		$('#'+currentDragObject).css('background-color','#93D7F9');
		
		dragNumber = parseInt(currentDragObject.substring(7));
		//assign the id for the images with dragNumber
		var x = 0; 
		for(var i=0; i<5; i++){
			for(var j=0; j<randImages[i];j++){
				if(dragNumber === dragImgPos[x]){
					draggedImage = i;
				}
				x++;				
			}
		}
	});
		
	/**** Drop Handling Functions ***/
	
	$(".dropObjects").droppable({ tolerance: 'intersect', hoverClass: 'drophover' });
	$('.dropObjects').bind('drop', function(event, ui) {
		currentDropObject = event.target.id;  
		if(currentDropObject == "imageSection"){   //means returned to the prvious image section
		  $('#'+currentDragObject).css('background-color','#CAFFCE');
		}
		
		var topPos,leftPos,stack;
		dropNumber = parseInt(currentDropObject.substring(7));
		dropRow = parseInt(dropNumber/11);     
		dropCol = parseInt(dropNumber%11);
			//revert the dragged image back to its original position if not at correct place
		if(dropCol == 1){ y = 0;  }
		if(dropCol == 3){ y = 1;  }
		if(dropCol == 5){ y = 2;  }
		if(dropCol == 7){ y = 3;  }
		if(dropCol == 9){ y = 4;  }
		
		if(dropCol%2 !=0 && draggedImage == y){
			stacklevel = stackedObjects[y];
			var stack = 6 - stacklevel;
			topPos = -43+(stack*64);
			leftPos = (-52+(dropCol*64))-(62*dragNumber);
			stackedObjects[y]= stacklevel + 1;
			$('#'+currentDragObject).draggable( 'disable' );
			num_objects++;
		}
		else{
			topPos = 5;
			leftPos = 5;
			 $('#'+currentDragObject).css('background-color','#CAFFCE');
		}
		$('#'+currentDragObject).css({'top': topPos+'px','left': leftPos+'px'});  //drop the object to fit the drop area
		check_bar_graph_completion();
		
		  
	});

	
	
});