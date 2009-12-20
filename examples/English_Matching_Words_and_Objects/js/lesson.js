
	var i,j,flag;
	var s=0;	var m=0;	var h=0;   //varoiables for timer
	var clickedObjects = [];   //array storing the clicks of the two succesive clicks
	var clickedObject = 0;    //store the clicked image id
	var matchedObjects = [];//store the matched images
	var objrand = [];
	var numClicked = 0;       // If click on image it is incremnted by 1
	var numMatched = 0;      //how many matched objects
	var play =0;    //not played yet pause
	var restart = 0;   //not restarted
	var clickCounter = 0;
	
	
	generate_random_objects_no();
	
		
	
	function generate_random_no()	{                //generate random number
		var rand_no = Math.ceil(30*Math.random());
		return rand_no;
	}
	
	function generate_random_objects_no(){
		objrand[0]=generate_random_no();   //1 number generated, 3 different numbers to be generated
		for(i=1; i<30; i++){
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
	}
	//alert(objrand);
	
$(document).ready(function() {
var k = Karma({
		audio: [{'name':'correct','file':'correct.ogg'},
			{'name':'incorrect','file':'incorrect.ogg'}
		]});
		  
k.ready(function(){



	$('a#anchorPlay').click(function(){
		play = 1;
		increaseTime();
	});
	$('a#anchorPause').click(function(){
		play = 0;
		increaseTime();
	});
	$('a#anchorRestart').click(function(){
		location.reload(true);
	});
	function load_default_images(){
		for(i=0; i<30; i++){
			document.getElementById("object"+objrand[i]+"").src = "assets/images/default.png";
		}
	}

	load_default_images();

	});	
});//end of DOM

function check_game_over(){
	if(numMatched ==30){   //show all
		for(i = 1; i<31; i++){
			document.getElementById("object"+i+"").src = "assets/images/"+i+".png";
		}
		play = 0;
		
	}
}
	function store_clicked_object(objectClicked){
		if(play == 1){			
			clickedObject = objectClicked;
			clickedObjects[numClicked] = clickedObject;
			numClicked++;
			clickCounter++;
			clickCounter = checkTime(clickCounter);
			document.getElementById('clickBox').innerHTML=clickCounter;
			show_processed_image();
			check_game_over();
		}
		else
			
		   return false;
	}
	function process_object(){
		//alert("test");
		var matchedCondition = 0;  //not matched
		if(clickedObjects[0]%2 == 0 && clickedObjects[1] == clickedObjects[0]-1)  //even 1st number
			 matchedCondition = 1;
		else if(clickedObjects[0]%2 != 0 && clickedObjects[1] == clickedObjects[0]+1)  //odd first number
				matchedCondition = 1;
		else if(clickedObjects[1]%2 == 0 && clickedObjects[0] == clickedObjects[1]-1)  //even 2nd number
			    matchedCondition = 1;
	    else if(clickedObjects[1]%2 != 0 && clickedObjects[0] == clickedObjects[1]+1) //odd 2nd number
				matchedCondition = 1;
		
		
		
		if(matchedCondition!=0){   //matches
			//if even clicked -1
			//if odd clicked +1 should be the answer
			//alert("Matched");
			document.getElementById("object"+clickedObjects[0]+"").src = "assets/images/matched.png";
			document.getElementById("object"+clickedObjects[1]+"").src = "assets/images/matched.png";
			matchedObjects[numMatched] = clickedObjects[0];
			numMatched++;
			matchedObjects[numMatched] = clickedObjects[1];
			numMatched++;
			//alert("Matched,Matched Objects="+matchedObjects+",No.match="+numMatched+"");
			numClicked = 0;
			
			
		}
		else{
			//alert("not matched");
			document.getElementById("object"+clickedObjects[0]+"").src = "assets/images/default.png";
			document.getElementById("object"+clickedObjects[1]+"").src = "assets/images/default.png";
			numClicked = 0;
			
		}
		
		
		}
	
	function delay(){
		
		document.delayForm.delayval.value = 1;
		process_object();
	}
	
	function show_processed_image(){    //Show the click Image
		var t;
		if (numMatched !=0){   //some pairs has matched so be sure not to show them again
			var flag = 0;  //if matched already it is set to 1
			for(i = 0; i<numMatched; i++){
				if(clickedObject == matchedObjects[i] ){
					flag = 1;
				}
			}
			
			if(flag == 0){    //no matches found
				document.getElementById("object"+clickedObject+"").src = "assets/images/"+clickedObject+".png";
				if(numClicked == 2){
				t=setTimeout('delay()',1000);
					
				}
			}
			else{         //matched already so don't show
				document.getElementById("object"+clickedObject+"").src = "assets/images/matched.png";
				numClicked = 0;
			}
			
		}
		
		else if(numClicked == 2){    //process the image after 2 successive clicks
			document.getElementById("object"+clickedObject+"").src = "assets/images/"+clickedObject+".png";
			//window.setTimeout('process_object()', 5000);
			t=setTimeout('delay()',1000);
			
		}
		else{
			document.getElementById("object"+clickedObject+"").src = "assets/images/"+clickedObject+".png";
		}
	