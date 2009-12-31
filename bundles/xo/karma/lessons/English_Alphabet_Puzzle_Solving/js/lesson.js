$(document).ready(function() {
	var k = Karma({
		audio: [{'name':'correct','file':'correct.ogg'}]});
		  
	k.ready(function(){

	//initialize the variables used and display initial value
	var drag_no = 0;  			//store the current dragged no
	var drop_no = 0;  			//store the current dropped on no
	var imgrand = [];   		//stores the random variables generated
	var imgPosition = [];  		//stores the position of the random variable
	var drag_position = 0;  	//position of dragged object
	var drop_position = 0;  	//position of dropped object
	var flag, i ,j;
	var moves_count = 0;
	var imgPath;

	
	var feedbackImage =  $('#feedback_image');
	for(var i=0; i<16; i++){	      
	    feedbackImage.append("<img class='dragme' id='imgdrag" + 
					i + "' draggable='true' src='' alt='' />");
	}


	game("img1");
	
	$('a#anchorImg1').click(function(){
			$("#"+imgPath+"").hide();
    		$(".dragme").show();
    		game("img1");
      	
		
	});
	
	$('a#anchorImg2').click(function(){
			$("#"+imgPath+"").hide();
    		$(".dragme").show();
    		game("img2");
      	
	});

	$('a#anchorImg3').click(function(){
		    		$("#"+imgPath+"").hide();
    		$(".dragme").show();
    		game("img3");
      	
	});
	
	function generate_random_no()	{                //generate random number
		var rand_no = Math.ceil(16*Math.random());
		return rand_no;
	}

	//update the Random variable number according to the position
	//update number according to the position and the value
	function update_Numbers_position(){         
		imgrand[drag_position] = drop_no;
		imgrand[drop_position] = drag_no;
	}

	//Check the game over 
	function check_game_over(){
		var x = 0;
		for(i=0;i<16;i++){
			if(imgrand[i] == i+1){
				x++;
			}
		}
		if(x == 16){    //puzzle solved . Hurray
			k.audio.correct.play();
			$(".dragme").hide();
			$("#"+imgPath+"").fadeIn(5000);
			
			
		}
	}
		
	function game(imgPuzzle){  //draws the necessary random numbers for the game
		imgPath = imgPuzzle;
	    imgrand[0]=generate_random_no();   //1 number generated, 3 different numbers to be generated
		for(i=1; i<16; i++){
			do{
				flag = 0;
				imgrand[i] = generate_random_no();
				for(j=0; j<i; j++){
					if(imgrand[i]===imgrand[j]){
						flag++;
					}
				}
			}while(flag != 0 );  //end of do while loop	
		}
	
		   for(i=0; i<16; i++){
				imgPosition[i] = i;
				document.getElementById("imgdrag"+i+"").src = "assets/image/"+imgPath+"/"+imgrand[i]+".png";
			}
		
	}    //end of game()
	$('#feedback_image').bind('dragstart', function(ev) {
	     if (!$(ev.target).hasClass('dragme'))
	       	 return true;
	     switch (ev.target.id) {
	         case 'imgdrag0':
	        	 drag_no = imgrand[0];  drag_position = 0;   	break;
	         case 'imgdrag1':
	        	 drag_no = imgrand[1];  drag_position = 1;   	break;
	         case 'imgdrag2':
	        	 drag_no = imgrand[2];  drag_position = 2;   	break;
	         case 'imgdrag3':
	        	 drag_no = imgrand[3];  drag_position = 3;  	break;
	         case 'imgdrag4':
	        	 drag_no = imgrand[4];  drag_position = 4;  	break;
	         case 'imgdrag5':
	        	 drag_no = imgrand[5];  drag_position = 5; 		break;
	         case 'imgdrag6':
	        	 drag_no = imgrand[6];  drag_position = 6; 		break;
	         case 'imgdrag7':
	        	 drag_no = imgrand[7];  drag_position = 7; 		break;
	         case 'imgdrag8':
	        	 drag_no = imgrand[8];  drag_position = 8;		break;
	         case 'imgdrag9':
	        	 drag_no = imgrand[9];  drag_position = 9;		break;
	         case 'imgdrag10':
	        	 drag_no = imgrand[10];  drag_position = 10;	break;
	         case 'imgdrag11':
	        	 drag_no = imgrand[11];  drag_position = 11;	break;
	         case 'imgdrag12':
	        	 drag_no = imgrand[12];  drag_position = 12;	break;
	         case 'imgdrag13':
	        	 drag_no = imgrand[13];  drag_position = 13;	break;
	         case 'imgdrag14':
	        	 drag_no = imgrand[14];  drag_position = 14;	break;
	         case 'imgdrag15':
	        	 drag_no = imgrand[15];  drag_position = 15;	break;
	     }
	   
       //document.display.dragBox.value = drag_no;
       //document.display.dragPos.value = drag_position;
       
       return true;
   });
		
		// Set up the drop zone.
   $('#feedback_image').bind('dragenter', function(ev) {  // Update the drop zone class on drag enter/leave
      if (!$(ev.target).hasClass('dragme')) return true;
      $(ev.target).addClass('dragover');  return false;
      })
	
      .bind('dragleave', function(ev) {
          if (!$(ev.target).hasClass('dragme')) return true;
          $(ev.target).removeClass('dragover');   return false;
      })

      // Allow drops of any kind into the zone.
      .bind('dragover', function(ev) {
          if (!$(ev.target).hasClass('dragme')) return true;
          return false;
      })

      // Handle the final drop...
      .bind('drop', function(ev) {
          if (!$(ev.target).hasClass('dragme')) return true;
             switch (ev.target.id) {
	             case 'imgdrag0':
	  	        	 drop_no = imgrand[0];     	drop_position = 0;   	break;
	  	         case 'imgdrag1':
	  	        	 drop_no = imgrand[1];     	drop_position = 1;   	break;
	  	         case 'imgdrag2':
	  	        	 drop_no = imgrand[2];     	drop_position = 2;   	break;
	  	         case 'imgdrag3':
	  	        	 drop_no = imgrand[3];     	drop_position = 3;   	break;
	  	         case 'imgdrag4':
	  	        	 drop_no = imgrand[4];     	drop_position = 4;   	break;
	  	         case 'imgdrag5':
	  	        	 drop_no = imgrand[5];     	drop_position = 5;   	break;
	  	         case 'imgdrag6':
	  	        	 drop_no = imgrand[6];     	drop_position = 6;   	break;
	  	         case 'imgdrag7':
	  	        	 drop_no = imgrand[7];     	drop_position = 7;   	break;
	  	         case 'imgdrag8':
	  	        	 drop_no = imgrand[8];     	drop_position = 8;   	break;
	  	         case 'imgdrag9':
			       	 drop_no = imgrand[9];     drop_position = 9;  	break;
	  	         case 'imgdrag10':
	  	        	 drop_no = imgrand[10];     drop_position = 10;   	break;
	  	         case 'imgdrag11':
	  	        	 drop_no = imgrand[11];     drop_position = 11;   	break;
	  	         case 'imgdrag12':
	  	        	 drop_no = imgrand[12];     drop_position = 12;   	break;
		  	     case 'imgdrag13':
	  	        	 drop_no = imgrand[13];     drop_position = 13;   	break;
		  	     case 'imgdrag14':
		        	 drop_no = imgrand[14];     drop_position = 14;   	break;
			  	 case 'imgdrag15':
			      	 drop_no = imgrand[15];     drop_position = 15;   	break;
			 }
             
             moves_count++;  
             //document.display.dropBox.value = drop_no;           
             //document.display.dropPos.value = drop_position;
             //document.display.moves.value = moves_count;
              
             document.getElementById("imgdrag"+imgPosition[drag_position]+"").src = "assets/image/"+imgPath+"/"+drop_no+".png";
             document.getElementById("imgdrag"+imgPosition[drop_position]+"").src = "assets/image/"+imgPath+"/"+drag_no+".png";
          
             update_Numbers_position();
             
          
             //Game over condition
             check_game_over();
             
             ev.stopPropagation();
             return false;
         });
	
   });	   
});    //end of document.ready
