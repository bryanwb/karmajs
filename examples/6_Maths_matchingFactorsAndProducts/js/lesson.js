$(document).ready(function() {
	var i,j,flag;
	var s=0;	var m=0;	var h=0;   //varoiables for timer
	var clickedObjects = [];   //array storing the clicks of the two succesive clicks
	var clickedObject = 0;    //store the clicked image id
	var matchedObjects = [];//store the matched images
	var objrand = [];
	var actualObjects = [];
	var numClicked = 0;       // If click on image it is incremnted by 1
	var numMatched = 0;      //how many matched objects
	var currentObj; //store the current object clicked
	var play =0;    //not played yet pause
	var restart = 0;   //not restarted
	var clickCounter = 0;
	var NUM_OBJECTS = 24;  //total number of objects in the game
	var products_words = new Array('3*1','3*2','3*3','3*4','3*5','3*6','3*7','3*8','3*9','3*10','3*11','3*12','3','6','9','12','15','18','21','24','27','30','33','36');
	var section = $('#section');	


	var checkTime = function(timePara){
	    if (timePara<10 )
	    {
		timePara="0" + timePara;
	    }
	    return timePara;
	};

	
	var startTimer = function(){
				s=checkTime(s);					
				m=checkTime(m);
				h=checkTime(h);
				clickCounter = checkTime(clickCounter);
				document.getElementById('clickBox').innerHTML=clickCounter;
				document.getElementById('timerBox1').innerHTML=s;
				document.getElementById('timerBox2').innerHTML=m;
				document.getElementById('timerBox3').innerHTML=h;
				
	};
	
	var increaseTime = function(){
	    if(play == 1){
			if(restart == 1){
			s = 0;
			m = 0;
			h = 0;
			}
		s++;
		if(s>60){
		    m++;
		    m=checkTime(m);
		    document.getElementById('timerBox2').innerHTML=m;
		    s = 0;
		}
		if(m>60){
		    h++; 
		    h=checkTime(h);
		    document.getElementById('timerBox3').innerHTML=h;
		    
		    m=0;
		    
		}				
		s=checkTime(s);					
		
		document.getElementById('timerBox1').innerHTML=s;
		
		var t=setTimeout(function(){increaseTime();},1000);
	    }
	};

	

	

	var generate_random_no = function()	{                //generate random number
		var rand_no = Math.floor(NUM_OBJECTS*Math.random());
		return rand_no;
	};
	
	var generate_random_objects_no = function(){
		
		objrand[0]=generate_random_no();   
		for(i=1; i<NUM_OBJECTS; i++){
			do{
				flag = 0;
				objrand[i] = generate_random_no();
				for(j=0; j<i; j++){
					if(objrand[i]===objrand[j]){
						flag++;
					}
				}
			}while(flag != 0 );  //end of do while loop	
		}
		
	};
	//alert(objrand);
	
	
	var check_game_over = function(){
		if(numMatched === NUM_OBJECTS){   //show all
			play = 0;
			$('#section').html('');
			$('#section').append('<div id="gameOver">GAME OVER<br/>Congratulations!!!</div>');
			$('#section').append('<div id="gameOverInfo">You have completed the game in <span class="specialText">'+clickCounter+
					'</span> clicks within  <span class="specialText">'+h+'</span> hour  <span class="specialText">'+m+
					'</span> minutes and  <span class="specialText">'+s+'</span> seconds .</div>');
		}
	};
	
	var store_clicked_object = function(objectClicked){
		
		if(play === 1){			
		    clickedObject = objectClicked;
		    var randClick = objrand[clickedObject];
		    clickedObjects[numClicked] = randClick;
		    actualObjects[numClicked]=clickedObject;
		    numClicked++;
		    clickCounter++;
		    clickCounter = checkTime(clickCounter);  //for showing format as 1 for 01
		    $("#clickBox").html(clickCounter);
		    show_processed_image();
		    
		    return true;
		}
		else{
		    return false;
			    
		}
			
	};

	var process_object = function(){
		var matchedCondition = 0;  //not matched
		/*
		 alert('Clicked Objects:'+clickedObjects[0]+' & '+clickedObjects[1]+'\n'+
			 'Actual Positions:'+actualObjects[0]+' & '+actualObjects[1]+'\n'+
			 'Rand Objects: '+objrand);
		 */
		
		if(Math.abs(clickedObjects[0]-clickedObjects[1]) === 12 && (clickedObjects[0] != clickedObjects[1])){
			matchedCondition = 1;
		}		
		if(matchedCondition === 1){   //matches		
			//check for the * sign and if it was any one having that then show off all for 2 secs
			// future
			
			document.getElementById('object'+actualObjects[0]).innerHTML='';
			document.getElementById('object'+actualObjects[1]).innerHTML='';
			$("#object"+actualObjects[0]).addClass('matched');
			$("#object"+actualObjects[1]).addClass('matched');
			matchedObjects[numMatched] = actualObjects[0];
			numMatched++;
			matchedObjects[numMatched] = actualObjects[1];
			numMatched++;
			check_game_over();	
			numClicked = 0;			
		}
		else{
			$('#object'+actualObjects[0]).html('');
			$('#object'+actualObjects[1]).html('');
			$("#object"+actualObjects[0]).addClass('default');
			$("#object"+actualObjects[1]).addClass('default');
			numClicked = 0;			
		}
		
		
		};
	
	var delay = function(){	
		document.delayForm.delayval.value = 1;
		process_object();
		
	};
	
	var show_processed_image = function(){    //Show the click Image
	    var t;
	    currentObj = objrand[clickedObject];
	    if (numMatched !=0){   //some pairs has matched so be sure not to show them again
			var flag = 0;  //if matched already it is set to 1
			for(i = 0; i<numMatched; i++){
			    if(clickedObject === matchedObjects[i] ){
			    	flag = 1;
			    }
			}
		
			if(flag === 0){    //no matches found
				$('#object'+clickedObject).html('');
				$("#object"+clickedObject).addClass('default');
				$('#object'+clickedObject).html(products_words[currentObj]);
			    if(numClicked === 2){
			    	t=setTimeout(function(){delay();},1000);			
			    }
			}
			else{          // If click on image it is incremnted by 1
			      //how many matched      //matched already so don't show
				$('#object'+clickedObject).html('object'+actualObjects[0]);
			    numClicked = 0;
			}
	    }
		
	    else if(numClicked == 2){    //process the image after 2 successive clicks
	
	    	  $('#object'+clickedObject).html('');
		       $('#object'+clickedObject).html(products_words[currentObj]);
	    	t=setTimeout(function(){delay();},1000);
		
	    }
	    else{	
	       $('#object'+clickedObject).html('');
	       $('#object'+clickedObject).html(products_words[currentObj]);
	    }
	};

	var assignSquares = function (square){	    
	    section.append('<a href="#"></a>');
	    $('#section a:last-of-type').append('<div class="default" id="object'+square+'"></div>'); 	
	    $('#section a:last-of-type').click(function(){		    
		    store_clicked_object(square);
		});
	};
		
	
	function game(){
		numClicked = 0;
		numMatched = 0;
		clickCounter = 0;
		matchedObjects = [];
		s=0;	m=0;	h=0;   
		$('#section').html('');
		$('#timerBox1').html('');$('#timerBox2').html('');$('#timerBox3').html('');
		$('#clickBox').html('00');
		generate_random_objects_no();
		startTimer();
		var square;
		for(i=0; i<NUM_OBJECTS; i++){
		    assignSquares(i);
		}
		play = 1;
		increaseTime();		
	}
	$('#linkStart').click(function(){
		game();
	});

	$('#linkPlayAgain').click(function(){
		game();
		
	});
	$('#section').html('');
	$('#clickBox').html('00');
	//game();

});//end of DOM
