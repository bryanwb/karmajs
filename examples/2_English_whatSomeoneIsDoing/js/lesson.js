/***** Functions for the game *****/
var i,j,flag;
var box_size = 25;   //size of the drop box for the word banks of exercise
var dragPosition;
var dropPosition;
var randOptions = [];   //store the rand Options for the 15 images
var wordBankNames=new Array("drinking","studying","swimming","singing","chasing","riding","crying","looking","flying","pouring","talking","sweeping","teaching","fighting","dancing");
var lessonImgAnswers = new Array(
						"Preeti is cleaning the house",
						"Preeti is making tea",
						"Preeti is teaching her children",
						"Preeti is cooking food",
						"Preeti is eating",
						"Preeti is working",
						"Preeti is collecting grass",
						"Preeti is feeding cows",
						"Preeti is playing with her children",
						"Preeti is helping her children do school work",
						"Preeti is eating",
						"Preeti is preparing dinner",
						"Preeti is reading a book",
						"Preeti is telling a story to her children",
						"Preeti is sleeping"	
						);
var correctCounter=0;
var box_size = 25;
var exercise_num;   //store the exercise number
var lesson_num;     //store the lesson number
var correctCounter;
var selectedOptionBox;   //value of selectedOptionBox
var lessonImageNo;
var t;

function playSound(surl) {
	document.getElementById('dummyspan').innerHTML="<embed src='assets/audio/"+surl+".ogg' height=0 width=0 autostart=true loop=false>";
}

function delay(){	
	document.delayForm.delayval.value = 1;
	$('#lessonAns').show();
	var soundNo	= lessonImageNo+1;
	playSound(soundNo);
	document.getElementById("lessonAnswers").innerHTML = lessonImgAnswers[lessonImageNo];
}

function lesson_display(lessonImgNo){
	//alert(lessonImgAnswers[lessonImgNo]);
	lessonImageNo = lessonImgNo;
	$('#lessonDisplay').show();   
	$('#lessonAns').hide();
	playSound('what_is_preeti_doing');
	t=setTimeout('delay()',2000);
	//delay for next sound
	
	   
}

function show_gaps(size){
	for(i=0;i<size;i++){
		document.write('&nbsp;');
	}
	
}

function generate_random_no()	{                //generate random number
	var rand_no = Math.floor(15*Math.random());
	return rand_no;
}
function generate_random_positions(){
	randOptions[0]=generate_random_no();  
	for(i=1; i<15; i++){
		do{
			flag = 0;
			randOptions[i] = generate_random_no();
			for(j=0; j<i; j++){
				if(randOptions[i]===randOptions[j]){
					flag++;
				}
			}
		}while(flag != 0 );  //end of do while loop	
	}
	
}
function control_display_exercises(){   //controls the displaying of lesson
	
	if(correctCounter == 3){
		$('a#anchorNext').show();
	}
	if(correctCounter == 6){
		$('a#anchorNext').show();
	}
	if(correctCounter == 9){
		$('a#anchorNext').hide();
		$('a#anchorPrev').hide();
		$('a#anchorPlayAgain').show();
   	}
}

function load_images(){
	generate_random_positions();
	//alert(randOptions);
	var	x;
	for(i=0; i<15; i++){
		x= randOptions[i];
		document.getElementById("imgdrag"+i).innerHTML = wordBankNames[x];
	}
}

$(document).ready(function(){
	lesson_start();
	function lesson_start(){    
		lesson_num =1;
		$('#lessonDisplay').hide();
		$('#lessonArea').show();
		$('#exerciseArea').hide();
		$('a#anchorGoToLesson').hide();
		$('a#anchorGoToExercise').show();
		$('a#anchorPrevLesson').hide();
		$('#lesson2').hide();
		$('#lesson3').hide();
	}
	
	$('a#anchorNextLesson').click(function(){
		if(lesson_num == 1){	
			lesson_num = 2;
			$('a#anchorNextLesson').show();
			$('a#anchorPrevLesson').show();
			$('#lesson1').hide();
			$('#lesson3').hide();
			$('#lesson2').fadeIn(2000);
			
		}
		else if(lesson_num == 2){
			lesson_num = 3;
			$('a#anchorNextLesson').hide();
			$('a#anchorPrevLesson').show();
			$('#lesson1').hide();
			$('#lesson2').hide();
			$('#lesson3').fadeIn(2000);
			
		}
	});

	$('a#anchorPrevLesson').click(function(){
		if(lesson_num == 2){
			lesson_num = 1 ;
			$('a#anchorNextLesson').show();
			$('a#anchorPrevLesson').hide();
			$('#lesson2').hide();
			$('#lesson3').hide();
			$('#lesson1').fadeIn(2000);
		}
		else if(lesson_num == 3){
			lesson_num = 2;
			$('a#anchorNextLesson').show();
			$('a#anchorPrevLesson').show();
			$('#lesson1').hide();
			$('#lesson3').hide();
			$('#lesson2').fadeIn(2000);
		}
	});

	
	
	function exercise_start(){                //Start the exercise
		
		// drop blocks for the wordBank names to drop
		for(i =0; i<9;i++){
			document.getElementById("imgdrop"+i+"").innerHTML = '';
			document.getElementById("imgdrop"+i+"").innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
		}
     	 
		
		
		exercise_num = 1;
		correctCounter = 0;
		selectedOptionBox = 0;    //value of selectedOptionBox
		$('#lessonArea').hide();
		$('#exerciseArea').show();
		$('a#anchorPlayAgain').hide();
		$('a#anchorPrev').hide();
		$('a#anchorNext').hide();
		$('#exercise1').fadeIn(2000);
		$('#exercise2').hide();
		$('#exercise3').hide();
		$('a#anchorGoToExercise').hide();
		$('a#anchorGoToLesson').show();
		load_images();
		}
		
	/******* Display Control Of Exercises *****/
		$('a#anchorGoToExercise').click(function(){
			playSound('trigger');
			exercise_start();
		});
		$('a#anchorGoToLesson').click(function(){
			playSound('trigger');
			lesson_start();
		});
		
		$('a#anchorNext').click(function(){
			if(exercise_num == 1){	
				exercise_num = 2;
				$('a#anchorNext').hide();
				//$('a#anchorPrev').show();
				$('#exercise1').hide();
				$('#exercise3').hide();
				$('#exercise2').fadeIn(2000);
				
			}
			else if(exercise_num == 2){
				exercise_num = 3;
				$('a#anchorNext').hide();
				//$('a#anchorPrev').show();
				$('#exercise1').hide();
				$('#exercise2').hide();
				$('#exercise3').fadeIn(2000);
				
			}
		});
	
		/*
		  $('a#anchorPrev').click(function(){
			if(exercise_num == 2){
				exercise_num = 1 ;
				$('a#anchorNext').show();
				$('a#anchorPrev').hide();
				$('#exercise2').hide();
				$('#exercise3').hide();
				$('#exercise1').fadeIn(2000);
			}
			else if(exercise_num == 3){
				exercise_num = 2;
				$('a#anchorNext').show();
				$('a#anchorPrev').show();
				$('#exercise1').hide();
				$('#exercise3').hide();
				$('#exercise2').fadeIn(2000);
			}
		});
		*/
		$('a#anchorPlayAgain').click(function(){
			exercise_start();
		});
	/******* Drag and Drop Framework Section *******/
	    $('#sideBar .wordBank')
	    
        // Set the element as draggable.
        .attr('draggable', 'true')

        // Handle the start of dragging to initialize.
        .bind('dragstart', function(ev) {
        	switch (ev.target.id) {
        	case 'imgdrag0':
        		selectedOptionBox = randOptions[0] ; dragPosition=0;     break;
          	case 'imgdrag1':
            		selectedOptionBox = randOptions[1] ; dragPosition=1;     break;
            case 'imgdrag2':
               	selectedOptionBox = randOptions[2] ; dragPosition = 2;   break;
            case 'imgdrag3':
               	selectedOptionBox = randOptions[3] ; dragPosition = 3;  break;
            case 'imgdrag4':
               	selectedOptionBox = randOptions[4] ; dragPosition = 4;   break;
            case 'imgdrag5':
               	selectedOptionBox = randOptions[5] ; dragPosition = 5;   break;
            case 'imgdrag6':
               	selectedOptionBox = randOptions[6] ;  dragPosition = 6;  break;
            case 'imgdrag7':
               	selectedOptionBox = randOptions[7] ; dragPosition = 7;   break;
            case 'imgdrag8':
               	selectedOptionBox = randOptions[8] ;  dragPosition = 8;  break;
            case 'imgdrag9':
              	selectedOptionBox = randOptions[9] ;  dragPosition = 9;  break;
            case 'imgdrag10':
             	selectedOptionBox = randOptions[10] ;  dragPosition = 10;  break;
            case 'imgdrag11':
             	selectedOptionBox = randOptions[11] ;  dragPosition = 11;  break;
            case 'imgdrag12':
             	selectedOptionBox = randOptions[12] ;  dragPosition = 12;  break;
            case 'imgdrag13':
             	selectedOptionBox = randOptions[13] ;  dragPosition = 13;  break;
            case 'imgdrag14':
             	selectedOptionBox = randOptions[14] ;  dragPosition = 14;  break;
            }
    // document.display.selectedBox.value = selectedOptionBox;
    //alert(selectedOptionBox);
            //alert(dragPosition);
      
            var dt = ev.originalEvent.dataTransfer;
            dt.setData("Text", "Dropped in zone!");
            return true;
            
            

            

        });

	
	 // Set up the drop zone.
   $('#exerciseArea').bind('dragenter', function(ev) {  // Update the drop zone class on drag enter/leave
	
       if (!$(ev.target).hasClass('dropBox')) return true;
           $(ev.target).addClass('dragover');  return false;
       })
	
       .bind('dragleave', function(ev) {
           if (!$(ev.target).hasClass('dropBox')) return true;
           $(ev.target).removeClass('dragover');   return false;
       })

       // Allow drops of any kind into the zone.
       .bind('dragover', function(ev) {
           if (!$(ev.target).hasClass('dropBox')) return true;
           return false;
       })

       // Handle the final drop...
       .bind('drop', function(ev) {
           if (!$(ev.target).hasClass('dropBox')) return true;
           switch (ev.target.id) {
     		case 'imgdrop0':
      			 	dropPosition = 0;		break;
     		case 'imgdrop1':
     			 	dropPosition = 1;		break;
     		case 'imgdrop2':
     			  	dropPosition = 2;		break;
     		case 'imgdrop3':
     			  	dropPosition = 3;		break;
     		case 'imgdrop4':
     			 	dropPosition = 4;		break;
     		case 'imgdrop5':
     			 	dropPosition = 5;		break;
     		case 'imgdrop6':
     			 	dropPosition = 6;		break;
     		case 'imgdrop7':
     			  	dropPosition = 7;		break;
     		case 'imgdrop8':
 			  		dropPosition = 8;		break;
      
           }
         //  alert("dropped");
          //document.display.droppedBox.value = droppedOptionBox;
          
         //  alert(dropPosition);
           	/** the box is dropped and now the calculation begins **/
              if(dropPosition == selectedOptionBox){
               document.getElementById("imgdrag"+dragPosition+"").innerHTML = "";
               document.getElementById("imgdrop"+dropPosition+"").innerHTML = "";
               document.getElementById("imgdrop"+dropPosition+"").innerHTML = wordBankNames[selectedOptionBox];
        	   //append or prepend can be used to put the image inside the div
        	   correctCounter++;
        	   control_display_exercises();
        	   
        	
        }
          
           ev.stopPropagation();
           return false;
        });
   
	
});


