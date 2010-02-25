$(document).ready(
    function(){

	
    //preloads assets into karma 'collections'
    var k = Karma({
		audio: [{'name':'correct','file':'correct.ogg'},
			{'name':'incorrect','file':'incorrect.ogg'}
			],
		image: [{'name': 'bear', 'file': 'bear.png'},
			{name : 'goat', file: 'goat.png'},
			{name: 'tiger', file: 'tiger.png'},
			{name: 'elephant', file: 'elephant.png'},
			{name: 'horse', file: 'horse.png'},
			{name: 'cow', file: 'cow.png'}			       
			]
		  });

    //this command will scale down the lesson if the user's browser window
    //is smaller than 950px X 600px
    k.scaleWindow();

    //sets locale, otherwise defaults to English
    $.i18n.setLocale('en');

    //put your main lesson code here
    k.ready(
	function(){ 	      

	    
	    $('#kHeader').kHeader({'title': 'English Animal Identification',
				   lessonPlan: true, teachersNote: true});

	    //Set up feedback widget, this shows the user a correct or incorrect
	    //icon and sound when triggered programmatically
	    var $feedback = $('#feedback').feedback();
	    
	    var kFooter = $('#kFooter').kFooter({'winningScore': 6});

	    var object_counter = 1;
	    var imgNameRand = [];
	    var optPosition = [];
	    var optOtherPos = [];
	    var imageObject = [];
	    var score = 0;
	    var wrong_selected = 0;  //wrong option selected so don't score up
	    var names = [];
	    var namesUsed = [];
	    var current = '';
	    var $img = $('#imgObject');

	    var i = 0;
	    $.each(k.image, function (img){
		       names[i] = img;
		       i++;
		   }
	    );
	    
	    var $options = $('.option');
	   
	    i = 0;
	    for (i = 0; i < $options.length; i++){
		$($options[i]).text(names[i]);
		console.log(names[i]);
	    }
		    
	    

	    load_images();  
	    //game();     


	    kFooter.bind('kFooterWinGame', 
		function(){
		    $('.optImg').hide();
		    $('.imageBox').hide();
		    $('#gameOver').show();
		});  
	    kFooter.bind('kFooterRestart',
		function() {
		    object_counter = 1;
		    imgNameRand = [];
		    optPosition = [];
		    optOtherPos = [];
		    imageObject = [];
		    score = 0;
		    wrong_selected = 0;  //wrong option selected so don't score up
		    
		     load_images();  
		     game();     
	
		}
	    );

	load_images();  //load the image numbers for random display
	game();     //let the game begin

	 
	 function checkDisplay(){   //Displays the correct and incorrect info
	     if(wrong_selected == 1){
		 $feedback.feedback('incorrect');
	     }
	     else if (object_counter === 7 ){
		 $feedback.feedback('win');
	     } else{
		 $feedback.feedback('correct');
	     }
	 }
	 
	 $("#anchorPlayAgain").click(function(){
		 $('#gameOver').hide();
		 $('.optImg').show();
		 $('.imageBox').show();
		 load_images();
		 score = 0;
		 object_counter = 1;
		 wrong_selected = 0;
		 //display_score();
		 kFooter.kFooter('reset');
		 game();
		 
	 });
	 $("#anchorOpt0").click(function(){
		 selected_Option_Process('0');		 
	 });
	 $("#anchorOpt1").click(function(){
		 selected_Option_Process('1');		 
	 });
	 $("#anchorOpt2").click(function(){
		 selected_Option_Process('2');		 
	 });
	 $("#anchorOpt3").click(function(){
		 selected_Option_Process('3');		 
	 });
	 
	
	function load_images(){
	    imageObject = k.shuffle([1, 2, 3, 4, 5, 6]);				
	    imageObject = k.shuffle(names);
	}
	
	function selected_Option_Process(selectedOption){
	    
	    if(selectedOption == correctPosition){
		object_counter++;
		wrong_selected = 0;
		score++;
		kFooter.kFooter('inc');  
		kFooter.kFooter('incTotal');
		checkDisplay();
		game();
	    }
	    else {
		wrong_selected = 1;
		kFooter.kFooter('incTotal');
		checkDisplay();
	    }
	    
	}

	function game(){
		
	    wrong_selected = 0;
	    //current_image = object_counter & 6;
	    currentImg = object_counter % 6;
	    //document.getElementById("imgObject").src = "assets/image/" + 
	    //    imageObject[current_image] + ".png";
	    $img.attr('src', "" + imageObject[currentImg] + '.png');
	      
	    //find correct answer and apply it to the position
	    //imgNameRand[0] = currentImage; 
	    //generate choices
		
	    for(i=1; i<4; i++){
		do{
		    flag = 0;
		    imgNameRand[i] = k.rand(1, 6);
		    for(j=0; j<i; j++){
			if(imgNameRand[i]===imgNameRand[j]){
			    flag++;
			}
		    }
		}while(flag != 0 );  //end of do while loop	
	    }
		
		
		correctPosition = k.rand(0, 3);
		
		optOtherPos[0] = correctPosition;
		
		for(i=1; i<4; i++){
		    do{
			flag = 0;
			optOtherPos[i] = k.rand(0, 3);
			for(j=0; j<i; j++){   //chek repeat within optOtherPos array
			    if(optOtherPos[i] === optOtherPos[j]){
				flag++;
			    }
			}
			
		    }while(flag != 0);
		    
		}
		
		for(i=0; i<4; i++){
		    pos = optOtherPos[i];
		    optPosition[pos] = imgNameRand[i];
		    //optPosition[pos] = imgNames[i];
		}

		

		//random positions are stored in optOtherPos array. Great
		
		
		for(i=0; i<4; i++){
		    document.getElementById("option"+i+"").src = "assets/image/image_name/"+optPosition[i]+".png";
		}
		
		
	    }	    //no change
	}); //end of games
});  //end of DOM