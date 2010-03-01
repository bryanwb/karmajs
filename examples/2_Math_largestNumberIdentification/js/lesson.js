$(document).ready(function() {
	//initialize the variables used and display initial value
	var selected_box = "not selected";
	var score_value = 0;
	var greatest;
	var imgrand=[];
	var flag, i ,j;
	var volValue = 1;     //value of volume 1  means volume on 0 means volume off
	var score_sign = 1;    //0 means the sign is negative and 1 means it is positive
	
	/*
	document.display.selectedBox.value = selected_box;
	document.display.droppedBox.value = "not dropped";
	document.display.score.value = score_value;
	*/
	document.getElementById("scoreDisplay").src = "assets/images/drag_images/"+score_value+".png";
	game();
	
	function playSound(surl) {
		document.getElementById('dummyspan').innerHTML="<embed src='assets/sounds/en/"+surl+".ogg' height=0 width=0 autostart=true loop=false>";
		}
	
	$('a#anchorInfo').click(function(){              //Show the info of game
		$('#gameInfo').toggle(5000);
	});
	
	$('a#exitNow').click(function(){                 //Restart The Game
		var confirmVal = confirm("Do you really want to restart the game.");
		if(confirmVal == true)
			location.reload(true);
	});
	$('a#volControl').click(function(){              //Show the info of game
		$('.imgVolume').toggle();
		if(volValue == 1)
			volValue = 0;
		else
			volValue = 1;
		if(volValue == 1){
			playSound('trigger');
			alert("Volume On");
			
		}
		else{
			playSound('trigger');
			alert("Volume is Off");
		}
	});
	
	

	function generate_random_no()	{                //generate random number
		var rand_no = Math.ceil(99*Math.random());
		return rand_no;
	}

	function sortNumber(a,b){                       //find the greatest number
		return a - b;
	}
	
	
	function getRadioCheckedValue(radio_name) {
		var oRadio = document.diffLevel.elements[radio_name];
		for(var i = 0; i < oRadio.length; i++) {
			if(oRadio[i].checked) {
				return oRadio[i].value;
			}

		}

		return '';
	}
	
	function displayNumbers(){
		for(i=0; i<4; i++){
			document.getElementById("imgdrag"+i+"").src = "assets/images/drag_images/"+imgrand[i]+".png";
	
		}
	}

		
	function game(){               //draws the necessary random numbers for the game 
	    
		//var selected_radio = getRadioCheckedValue("levelBtn");
		//alert(selected_radio);
		
		//generate random numbers w/o repitition
		imgrand[0]=generate_random_no();   //1 number generated, 3 different numbers to be generated
		for(i=1; i<4; i++){
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
		displayNumbers();   //display the random numbers in the respective boxes.
	}    //end of game()
		
		// Set up the dragable element.
		$('#feedback_image .drag_delegates').bind('dragstart', function(ev) {
	         if (!$(ev.target).hasClass('dragme'))
	        	 return true;
	         switch (ev.target.id) {
	                case 'imgdrag0':
	                	selected_box = imgrand[0];                //the box is selected
	                	break;
	                case 'imgdrag1':
	                	selected_box = imgrand[1];                //the box is selected
	                	break;
	                case 'imgdrag2':
	                	selected_box = imgrand[2];                //the box is selected
	                	break;
	                case 'imgdrag3':
	                	selected_box = imgrand[3];                //the box is selected
	                	break;
	         }
	         //document.display.selectedBox.value = selected_box;
	         
	         return true;
	        });
		
	    // Set up the drop zone.
	    $('#drop_area .drophere').bind('dragenter', function(ev) {  // Update the drop zone class on drag enter/leave
	        if (!$(ev.target).hasClass('drophere')) return true;
	            $(ev.target).addClass('dragover');  return false;
	        })
		
	        .bind('dragleave', function(ev) {
	            if (!$(ev.target).hasClass('drophere')) return true;
	            $(ev.target).removeClass('dragover');   return false;
	        })
	
	        // Allow drops of any kind into the zone.
	        .bind('dragover', function(ev) {
	            if (!$(ev.target).hasClass('drophere')) return true;
	            return false;
	        })
	
	        // Handle the final drop...
	        .bind('drop', function(ev) {
	            if (!$(ev.target).hasClass('drophere')) return true;
	            
	            /** the box is dropped and now the calculation begins **/
	           // document.display.droppedBox.value = selected_box;
	            
	            //finding the greatest among the 4 random numbers
	            imgrand.sort(sortNumber);
	            greatest = imgrand[3];
	            if(selected_box < greatest){
	            	score_value -=1;
	            	if(volValue==1)
	            		playSound('incorrect');
	            }
	            else{
	            	score_value +=1;
	            	if(volValue==1)
	            		playSound('correct');
	            }
	            
	            //NEgative number display technique
	            if(score_value<0)
	            	document.getElementById("minussign").style.display = 'block';
	            else
	            	document.getElementById("minussign").style.display = 'none';
	            
	            resultval = Math.abs(score_value);   //change the negative value to positive 
	            document.getElementById("scoreDisplay").src = "assets/images/drag_images/"+resultval+".png";
	            if(score_value == 99){
	               	alert("Congratulations!!! You have won the game. Press Ok to Continue...");
	            	var gameVal = confirm("Press Ok To restart or Cancel to stay in page.");
	            	if(gameVal == true){
	            		location.reload(true);
	            	score_value =0;
	            	}
	            }
	           // document.display.score.value = score_value;
	            game();	                      
	           
	            ev.stopPropagation();
	            return false;
	           });
	    
    	
});    //end of document.ready
