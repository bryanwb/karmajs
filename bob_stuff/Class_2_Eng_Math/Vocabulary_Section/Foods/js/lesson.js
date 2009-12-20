/***** Functions for the game *****/
var i,j,flag;
var randObjects = [];   //store the 8 random image numbers for the birds images
var randOptions = [];
var correctCounter=0;

function generate_random_no()	{                //generate random number
	var rand_no = Math.ceil(8*Math.random());
	return rand_no;
}

function generate_random_positions(){
	randObjects[0]=generate_random_no(); 
	for(i=1; i<8; i++){
		do{
			flag = 0;
			randObjects[i] = generate_random_no();
			for(j=0; j<i; j++){
				if(randObjects[i]===randObjects[j]){
					flag++;
				}
			}
		}while(flag != 0 );  //end of do while loop	
	}
	
	randOptions[0]=generate_random_no();  
	for(i=1; i<8; i++){
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

$(document).ready(function(){
	var selectedOptionBox = 0;    //value of selectedOptionBox
	var droppedOptionBox = 0;     //value of currently dropped box
	var dragPosition;
	var dropPosition;
	$("#gamePlay").hide();
	
	$('a#anchorPlay').click(function(e){
		//$("#imgContainer").html(" ");
		$("#vocabulary").hide();
		$("#gamePlay").fadeIn(1000);
	});
	$('a#anchorMain').click(function(e){
		//$("#imgContainer").html(" ");
		$("#gamePlay").hide();
		$("#vocabulary").fadeIn(1000);
		
	});
	
	load_images();	
	
	/******* Drag and Drop Framework Section *******/
	
	function load_images(){
		generate_random_positions();
		//var x;
	
		for(i=1; i<9; i++){
			x = i-1;
			document.getElementById("img" + i).src ="assets/images/images/" + randObjects[x] + ".png";
			document.getElementById("imgdrag"+ i).src = "assets/images/names/" + randOptions[x] +".png";
		}
	}

	$('#optionArea').bind('dragstart', function(ev) {
        if (!$(ev.target).hasClass('dragImg'))
       	 return true;
        switch (ev.target.id) {
               case 'imgdrag1':
               		selectedOptionBox = randOptions[0] ; dragPosition=1;   break;
               case 'imgdrag2':
                  	selectedOptionBox = randOptions[1] ; dragPosition = 2;   break;
               case 'imgdrag3':
                  	selectedOptionBox = randOptions[2] ; dragPosition = 3;  break;
               case 'imgdrag4':
                  	selectedOptionBox = randOptions[3] ; dragPosition = 4;   break;
               case 'imgdrag5':
                  	selectedOptionBox = randOptions[4] ; dragPosition = 5;   break;
               case 'imgdrag6':
                  	selectedOptionBox = randOptions[5] ;  dragPosition = 6;  break;
               case 'imgdrag7':
                  	selectedOptionBox = randOptions[6] ; dragPosition = 7;   break;
               case 'imgdrag8':
                  	selectedOptionBox = randOptions[7] ;  dragPosition = 8;  break;
               }
       // document.display.selectedBox.value = selectedOptionBox;
         return true;
       });
	
   // Set up the drop zone.
   $('#gameArea #imageArea').bind('dragenter', function(ev) {  // Update the drop zone class on drag enter/leave
	
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
     		case 'imgdrop1':
     			droppedOptionBox = randObjects[0];  	dropPosition = 1;		break;
     		case 'imgdrop2':
     			droppedOptionBox = randObjects[1];  	dropPosition = 2;		break;
     		case 'imgdrop3':
     			droppedOptionBox = randObjects[2];  	dropPosition = 3;		break;
     		case 'imgdrop4':
     			droppedOptionBox = randObjects[3];  	dropPosition = 4;		break;
     		case 'imgdrop5':
     			droppedOptionBox = randObjects[4];  	dropPosition = 5;		break;
     		case 'imgdrop6':
     			droppedOptionBox = randObjects[5];  	dropPosition = 6;		break;
     		case 'imgdrop7':
     			droppedOptionBox = randObjects[6];  	dropPosition = 7;		break;
     		case 'imgdrop8':
     			droppedOptionBox = randObjects[7];  	dropPosition = 8;		break;
           }
           
          //document.display.droppedBox.value = droppedOptionBox;
          
           //alert(droppedOptionBox);
           	/** the box is dropped and now the calculation begins **/
          if(droppedOptionBox == selectedOptionBox){
        	   document.getElementById("imgdrop"+dropPosition+"").src = "assets/images/names/"+selectedOptionBox+".png";
        	   document.getElementById("imgdrag"+dragPosition+"").src = "assets/images/default.png";
        	   correctCounter++;
        	   if(correctCounter == 8){
        		   
        		   $('.dragImg').hide();
        		   
        		   $('#imgGameOver').show();
        	   }
          }
          
           ev.stopPropagation();
           return false;
        });
   
	
});


