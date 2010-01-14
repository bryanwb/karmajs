$(document).ready(function(){
			/***** Global Variables Declaration  ******/

  var i,j,flag;
  var shapes1Path = "assets/image/shapes1/";
  var shapes1 = ["fruit1","fruit2","fruit3","fruit4","veg1","veg2","veg3","veg4","other1","other2","other3","other4"];
  var shapes2 = ["चील","परेवा","सुगा","मैना","माछा","गोही","सार्क","डोल्फिंन","मृग"," बाघ","घोडा","खसी"];
  var shapes3 = ["स्केल","कलम","इरेजर","किताब","बल","तास","ब्याट","क्याराम","झोला","बाल्टिन","गाग्रो","डालो"];
  var randPositions = [];
  var draggedShape;
  var currentShape;
  var currentSection = 1;  //which section we are currently in
  var zIndex = 1;
  var number_shapes = 0;
  
  
  /********************************************************************/
	
  			/***** Methods definition *****/

  
  
  function rand ( lower, upper ){    //generate random numbers bet ranges including them
		return Math.round( Math.random() * (upper - lower) + lower );
  }
  var genRandPosition=function (positions){
	  limit = positions - 1;
  	randPositions[0] = rand(0,limit); 
	for(i=1; i<positions; i++){
			do{
				flag = 0;
				randPositions[i] = rand(0,limit);
				for(j=0; j<i; j++){
					if(randPositions[i] === randPositions[j]){
						flag++;
					}
				}
			}while(flag != 0 );  //end of do while loop	
		}
	};	
	
	var generate_shapes = function (){
		genRandPosition(12);
		$('#shapesSection').html('');
		$('#dropSection').html('');
		var randImgPos;		
		for(var i=0 ;i<12; i++){			  
			$("#shapesSection").append('<div id="dragShape'+i+'"></div>');
			randImgPos = randPositions[i];
			$('#dragShape'+i).append('<img src="'+shapes1Path+shapes1[randImgPos]+'.png">');
			$('#dragShape'+i).addClass('dragObjects');
		}	
		
		$('.dragObjects').css({'position':'relative','float': 'left','cursor': 'move',
			'width':'68px','height':'62px','margin-left': '2em','padding-left': '2px'});
		
		$('.dragObjects').draggable({ containment: '#content'});		
		
		var dropObj = { 
				'width':'252px','height': '118px','margin': '0.5em',
				'background-image': 'url("assets/image/icons/dropHere.png")'
				};
				
		for(i = 0; i<3; i++){
			$('#dropSection').append('<div id="dropShape'+i+'" class="dropObjects"/>');
		}
		$('.dropObjects').css(dropObj);
		
		$(".dropObjects").droppable({ tolerence: 'intersect' ,hoverClass: 'drophover' });
		
		$('#dropSection').append('<div class="dropText">फलफूलको  समूह</div>');
		$('#dropSection').append('<div class="dropText">तरकारीको समूह</div>');
		$('#dropSection').append('<div class="dropText">अन्य खानेकुराको समूह</div>');		
	};
	
	var generate_shapes1 = function (){
		genRandPosition(12);
		$('#shapesSection').html('');
		$('#dropSection').html('');
		$('#shapesSection1').html('');
		$('#dropSection1').html('');
		var randImgPos;		
		for(var i=0 ;i<12; i++){			  
			$("#shapesSection1").append('<div id="dragShape'+i+'"></div>');
			randImgPos = randPositions[i];
			//$('#dragShape'+i).append(shapes+currentSection+[randImgPos]);
		    if(currentSection === 2){
		    	$('#dragShape'+i).append(shapes2[randImgPos]);
		    }
		    else if (currentSection === 3){
		    	$('#dragShape'+i).append(shapes3[randImgPos]);
		    }
			$('#dragShape'+i).addClass('dragObjects');
		}	
		
		$('.dragObjects').css({'position':'relative','float': 'left','cursor': 'move',
			'width':'45px','height':'50px','margin-left': '0.5em','padding-left': '2px',
			'font-size':'30px/50px','font-weight':'bold'});
		
		$('.dragObjects').draggable({ containment: '#content'});		
		
		var dropObj = { 
				'width':'252px','height': '118px','margin': '0.5em',
				'background-image': 'url("assets/image/icons/dropHere1.png")'
				};
				
		for(i = 0; i<3; i++){
			$('#dropSection1').append('<div id="dropShape'+i+'" class="dropObjects"/>');
		}
		$('.dropObjects').css(dropObj);
		
		$(".dropObjects").droppable({ tolerence: 'intersect' ,hoverClass: 'drophover' });
		if(currentSection === 2){
			$('#dropSection1').append('<div class="dropText">चराको  समूह</div>');
			$('#dropSection1').append('<div class="dropText">पानीमा पाइने  जनावरको समूह</div>');
			$('#dropSection1').append('<div class="dropText">अन्य जनावरको समूह</div>');
		}
		else if(currentSection === 3 ){
			$('#dropSection1').append('<div class="dropText">पढ्ने सामग्रीको  समूह</div>');
			$('#dropSection1').append('<div class="dropText">खेल्ने सामग्रीको समूह</div>');
			$('#dropSection1').append('<div class="dropText">बोक्ने सामग्रीको समूह</div>');
		}
	};

	

	var control_game_flow = function(){		
		if(currentSection === 1){ 
			if(number_shapes === 12){
				$("#linkNext").show();
				$("#linkBack").hide();
			}
		}
		else if(currentSection === 2){
			if(number_shapes === 12){
				$("#linkNext").show();
				$("#linkBack").show();
			}
		}
		else if(currentSection === 3){
			if(number_shapes === 12){
				$("#linkNext").hide();
				$("#linkBack").show();
			}
		}			
	};
			
	function game(){
	  $('#section1').hide();
	  $('#section').show();
	  $('#help').hide();	 
	  document.paathForm.score.value = "१";
	  document.paathForm.full_mark.value = "३";
	  zIndex = 0;
	  number_shapes = 0;
	  currentSection =  1 ;
	  generate_shapes();  
	  drag_drop();
	}	
	$('#section').hide();
	$('#section1').hide();
	$('#linkNext').hide();
	$('#linkBack').hide();

	document.paathForm.score.value = "";
	document.paathForm.full_mark.value = "";
	/*****************************************************/

			/******** LESSON SECTION  *******/
 $('#linkPlayAgain').click(function(){
	 if(currentSection === 1){
		  $('#linkNext').hide();
		  $('#linkBack').hide();
		  $('#section1').hide();
		  $('#section').show();
		  zIndex = 0;
		  number_shapes = 0;
		  currentSection = 1;
		  document.paathForm.score.value = "१";
		  generate_shapes();
		  drag_drop();
	
	  }
	  else if(currentSection === 2){
		  $('#linkNext').hide();
		  $('#linkBack').hide();
		  $('#section').hide();
		  $('#section1').show();
		  zIndex = 0;
		  number_shapes = 0;
		  currentSection = 2;
		  document.paathForm.score.value = "२";
		  generate_shapes1();
		  drag_drop();
	  }
	  else{
		  $('#linkNext').hide();
		  $('#linkBack').hide();
		  $('#section').hide();
		  $('#section1').show();
		  zIndex = 0;
		  number_shapes = 0;
		  currentSection = 3;
		  document.paathForm.score.value = "३";
		  generate_shapes1();
		  drag_drop();
	  }
 });
  $('#linkStart').click(function(){	  
	  game();  //start from the first
 });

  $('#linkNext').click(function(){
	  if(currentSection === 1){
		  $('#linkNext').hide();
		  $('#linkBack').hide();
		  $('#section').hide();
		  $('#section1').show();
		  zIndex = 0;
		  number_shapes = 0;
		  currentSection = 2;
		  document.paathForm.score.value = "२";
		  generate_shapes1();
		  drag_drop();
	
	  }
	  else if(currentSection === 2){
		  $('#linkBack').hide();
		  $('#linkNext').hide();
		  $('#section').hide();
		  $('#section1').show();
		  zIndex = 0;
		  number_shapes = 0;
		  currentSection = 3;
		  document.paathForm.score.value = "३";
		  generate_shapes1();
		  drag_drop();
	  }
	  
  });
  $('#linkBack').click(function(){
	  if(currentSection === 2){
		  $('#linkNext').hide();
		  $('#linkBack').hide();
		  $('#section1').hide();
		  $('#section').show();
		  zIndex = 0;
		  number_shapes = 0;
		  currentSection = 1;
		  document.paathForm.score.value = "१";
		  generate_shapes();
		  drag_drop();
	  }
	  else if(currentSection === 3){
		  $('#linkNext').hide();
		  $('#linkBack').hide();
		  $('#section').hide();
		  $('#section1').show();
		  zIndex = 0;
		  number_shapes = 0;
		  currentSection = 2;
		  document.paathForm.score.value = "२";
		  generate_shapes1();
		  drag_drop();
	  }
	  
  });

  
  
  /**** Drag Handling Functions ***/
function drag_drop(){
	$('.dragObjects').bind('dragstart', function(event, ui) {
		currentDragObject = event.target.id;			
		currentShape = parseInt(currentDragObject.substring(9));
		draggedShape = randPositions[currentShape]; 
	});
		
	/**** Drop Handling Functions ***/
	
	$('.dropObjects').bind('drop', function(event, ui) {
		currentDropObject = event.target.id;
		var droppedShape = parseInt(currentDropObject.substring(9));
		var topPos,leftPos;
		var pos = currentShape;
			if((draggedShape < 4 && droppedShape != 0) || (draggedShape < 8 && draggedShape>3  && droppedShape != 1) || (draggedShape > 7 && droppedShape != 2)){
				if(pos < 6){ leftPos = -15 + pos*10;	topPos= 5;
				}
				else{	leftPos = -5 + (pos-6)*4;		topPos= 10;	}
				$('#'+currentDragObject).css({'top': topPos+'px','left': leftPos+'px'});  //drop the object to fit the drop area
			}
			else{
				$('#'+currentDragObject).css({'z-index':zIndex});  //drop the object to fit the drop area
				$('#'+currentDragObject).draggable( 'disable' );				
				number_shapes++;
				zIndex++;
			}
		control_game_flow();
		
	});
}  
  
	 
/**************************************************/  
			  		

});   //end of dom