/*
Bugs (firefox 3.5.7):
* sometimes mulitple cards are shown
* the image of one of the angles is not showing properly
* if you have a text without a hyphen it doesn't work (e.g. angulo
recto iso angulo-recto)
* the text for angulo-obtuso is not displaying properly
* title in english: 'matching angles with shapes' should maybe be
'matching angles and shapes' 

Questions:
* how do we set locale? cfr beginning of $(document).ready()

Peeves:
* tabs for indenting
* trailing whitespace everywhere

*/

// TBD: use jquery plugin instead, http://plugins.jquery.com/project/psprintf
function format(format_string /*, args*/) {
    var args = [].slice.call(arguments); // arguments is not a real array
    args.shift();
    var result = '';
    for (var i = 0; i < format_string.length; i += 1) {
        var c = format_string.charAt(i);
        if (c == '%') {
            i += 1; // Breaks on format_string ending with %
            var c2 = format_string.charAt(i);
            if (c2 == '%') {
                result += '%'
            } else if (c2 == 'd') {
                result += args.shift();
            } else {
                alert('unsupported format character: ' + c2);
            }
        } else {
            result += c;
        }
    }
    return result;
}


$(document).ready(function() {
    var _ = $._;
	var i = 0, j = 0, flag = 0;
	var s=0, m=0, h=0;   
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
	var shapes_angles = new Array('Acute-Angle','Right-Angle','Obtuse-Angle','Triangle','Square','Rhombus','Rectangle','Parallelogram','Pentagon','Hexagon','Septagon','Octagon',_('Acute-Angle'),_('Right-Angle'),_('Obtuse-Angle'),_('Triangle'),_('Square'),_('Rhombus'),_('Rectangle'),_('Parallelogram'),_('Pentagon'),_('Hexagon'),_('Septagon'),_('Octagon'));
	//var section = $('#section');	
	var $content = $('#content');
	var shapes;  //store the current shape or angle name

		      
	Karma.scaleWindow();
	$('#kHeader').kHeader({title:_("Maths: Matching Angles with Shapes")});
	var $kFooter = $('#kFooter').kFooter({scoreboard: false, startButton: true,
		pauseButton: true, restartButton: true, timer: true});

	$kFooter.bind('kFooterStart', game);  		      
	$kFooter.bind('kFooterRestart', game);


        var checkTime = function(timePara){
	    if (timePara<10 )
	    {
		timePara="0" + timePara;
	    }
	    return timePara;
	};
	


        var generate_random_objects_no = function(){
	    
	    for(i=1; i<NUM_OBJECTS; i++){
		objrand[i] = i;
	    }

	    objrand = Karma.shuffle(objrand);

	    
		
	};
	
    // example of ngettext usage
    alert(function(clickCounter, h, m, s) {
        return format($.i18n.ngettext('You have completed the game in <span class="specialText">%d</span> clicks within <span class="specialText">%d</span> hour,',
                                      'You have completed the game in <span class="specialText">%d</span> clicks within <span class="specialText">%d</span> hours,',
                                      h),
                      clickCounter, h)
            + format($.i18n.ngettext('<span class="specialText">%d</span> minute and ',
                                     '<span class="specialText">%d</span> minutes and ',
                                     m),
                     m)
            + format ($.i18n.ngettext('<span class="specialText">%d</span> second.',
                                      '<span class="specialText">%d</span> seconds.',
                                      s),
                      s);
    }(10, 2, 3, 1));

	var check_game_over = function(){
		if(numMatched === NUM_OBJECTS){   //show all
			play = 0;
			$('#content').html('');
			$('#content').append('<div id="gameOver">GAME OVER<br/>Congratulations!!!</div>');
            $('#content').append($(document.createElement('div'))
                                 .attr({id: 'gameOverInfo'})
                                 // clicks < 2 is impossible
                                 .html(format($.i18n.ngettext('You have completed the game in <span class="specialText">%d</span> clicks within <span class="specialText">%d</span> hour,',
                                                              'You have completed the game in <span class="specialText">%d</span> clicks within <span class="specialText">%d</span> hours,',
                                                              h),
                                              clickCounter, h)
                                       + format($.i18n.ngettext('<span class="specialText">%d</span> minute and ',
                                                                '<span class="specialText">%d</span> minutes and ',
                                                                m),
                                                m)
                                       + format ($.i18n.ngettext('<span class="specialText">%d</span> second.',
                                                                 '<span class="specialText">%d</span> seconds.',
                                                                 s),
                                                 s)));
		}
	};


	var store_clicked_object = function(objectClicked){
			if(play === 1){			
		    clickedObject = objectClicked;
		    var randClick = objrand[clickedObject];
		    clickedObjects[numClicked] = randClick;
		    actualObjects[numClicked]=clickedObject;
		    if(randClick < 12){
		    	$('#object'+clickedObject).removeClass('textColor');
		    	shapes = '<img src="assets/image/'+shapes_angles[randClick]+'.png">';    //if clicked no is less than 12 show image
		    }
		    else{
		    	 $('#object'+clickedObject).addClass('textColor');
		    	shapes =  shapes_angles[randClick];
		    }	    
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
				$('#object'+clickedObject).html(shapes);
			    if(numClicked === 2){
			    	t=setTimeout(function(){delay();},1000);			
			    }
			}
			else{          // If click on image it is incremnted by 1
			      //how many matched      //matched already so don't show
				   numClicked = 0;
			}
	    }
		
	    else if(numClicked == 2){    //process the image after 2 successive clicks
	    	$('#object'+clickedObject).html('');
	    	$('#object'+clickedObject).html(shapes);
	    	t=setTimeout(function(){delay();},1000);
		
	    }
	    else{	
	       $('#object'+clickedObject).html('');
	       $('#object'+clickedObject).html(shapes);
	    }
	};
	
	

	var assignSquares = function (square){	    
	    $content.append('<a href="#"></a>');
	    $('#content a:last-of-type').append('<div class="default" id="object'+square+'"></div>'); 	
	    $('#content a:last-of-type').click(function(){		    
		    store_clicked_object(square);
		});
	};
	

	function game(){
		numClicked = 0;
		numMatched = 0;
		clickCounter = 0;
		matchedObjects = [];
		$('#content').html('');
		$('#clickBox').html('00');
		generate_random_objects_no();
		var square;
		for(i=0; i<NUM_OBJECTS; i++){
		    assignSquares(i);
		}
		play = 1;
		//increaseTime();		
	}

	$('#section').html('');
	$('#clickBox').html('00');
	game();


});//end of DOM

