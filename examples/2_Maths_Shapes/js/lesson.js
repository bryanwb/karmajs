$(document).ready(function(){
			/***** Global Variables Declaration  ******/

  var i,j,flag;
  var shapes1Path = "assets/image/shapes1/";
  var shapes2Path = "assets/image/shapes2/";
  var shapes3Path = "assets/image/shapes3/";
  var shapes1 = ["quad1","quad2","quad3","quad4","circle1","circle2","circle3","circle4"];
  var shapes2 = ["triangle1","triangle2","triangle3","triangle4","quad1","quad2","quad3","quad4","circle1","circle2","circle3","circle4"];
  var shapes3 = ["triangle1","triangle2","triangle3","triangle4","quad1","quad1","quad2","quad3","quad4","quad4","circle1","circle1","circle2","circle2"];
  var randPositions = [];
  var draggedShape;
  var currentShape;
  var currentSection = 1;  //which section we are currently in
  var img_count = 0; //store for the shapes 3
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
				for(j=0; j<i; j++){currentShape
					if(randPositions[i] === randPositions[j]){
						flag++;
					}
				}
			}while(flag != 0 );  //end of do while loop	
		}
	};	
	
	
	var generate_shapes1 = function (){
		genRandPosition(8);
		$('#shapesSection1').html('');
		$('#shapesSection2').html('');
		$('#shapesSection3').html('');
		$('#dropSection1').html('');
		$('#dropSection2').html('');
		$('#dropSection3').html('');
		var randImgPos;
		
		
		for(i=0 ;i<8; i++){			  
			$("#shapesSection1").append('<div id="dragShape'+i+'"></div>');
			randImgPos = randPositions[i];
			$('#dragShape'+i).append('<img src="'+shapes1Path+shapes1[randImgPos]+'.png">');
			$('#dragShape'+i).addClass('dragObjects');
		}
		$('.dragObjects').css({'float': 'left','cursor': 'move','width':'70px','height':'62px','margin': '0.4em','padding': '2px'});
		
		$('.dragObjects').draggable({ containment: '#gameSection'});
				
		var dropObj = { 'width':'252px','height': '132px','margin': '0.5em','background-image': 'url("assets/image/shapes1/dropHere.png")'};
		
		for(i = 0; i<2; i++){
			$('#dropSection1').append('<div id="dropShape'+i+'" class="dropObjects"/>');
		}
		$('.dropObjects').css(dropObj);
		
		$(".dropObjects").droppable({ tolerence: 'intersect' ,hoverClass: 'drophover' });
		
		$('#dropSection1').append('<div class="dropText">चतुर्भुज</div>');
		$('#dropSection1').append('<div class="dropText"> वृत</div>');
		
	};
	
	var generate_shapes2 = function (){
		genRandPosition(12);
		$('#shapesSection1').html('');
		$('#shapesSection2').html('');
		$('#shapesSection3').html('');
		$('#dropSection1').html('');
		$('#dropSection2').html('');
		$('#dropSection3').html('');
		var randImgPos;
		
		
		for(var i=0 ;i<12; i++){			  
			$("#shapesSection2").append('<div id="dragShape'+i+'"></div>');
			randImgPos = randPositions[i];
			$('#dragShape'+i).append('<img src="'+shapes2Path+shapes2[randImgPos]+'.png">');
			$('#dragShape'+i).addClass('dragObjects');
		}	
		
		$('.dragObjects').css({'position':'relative','float': 'left','cursor': 'move','width':'50px','height':'42px','margin': '1em','padding': '2px'});
		
		$('.dragObjects').draggable({ containment: '#gameSection'});
		
		
		var dropObj = { 'width':'252px','height': '132px','margin': '0.5em','background-image': 'url("assets/image/shapes1/dropHere.png")'};
		
		
		for(i = 0; i<3; i++){
			$('#dropSection2').append('<div id="dropShape'+i+'" class="dropObjects"/>');
		}
		$('.dropObjects').css(dropObj);
		
		$(".dropObjects").droppable({ tolerence: 'intersect' ,hoverClass: 'drophover' });
		
		$('#dropSection2').append('<div class="dropText">त्रिभुज </div>');
		$('#dropSection2').append('<div class="dropText">चतुर्भुज</div>');
		$('#dropSection2').append('<div class="dropText">वृत</div>');		
	};
	
	var gen_absolute_image = function (left,top,width,height){
		var dragObj = {
				'position':'absolute',  'left': left+'px', 'top': top+'px',
				'width': width+'px','height':height+'px',
				'background-image':'url("'+shapes3Path+shapes3[img_count]+'.png")'
		};
		$("#shapesSection3").append('<div id="dragShape'+img_count+'" class="dragObjects"></div>');
		$('#dragShape'+img_count).css(dragObj);
		img_count++;
	};
	
	var generate_shapes3 = function (){
		
		$('#shapesSection1').html('');
		$('#shapesSection2').html('');
		$('#shapesSection3').html('');
		$('#dropSection1').html('');
		$('#dropSection2').html('');
		$('#dropSection3').html('');
		
		$('#shapesSection3').append('<img src="'+shapes3Path+'main.png" draggable="false"');
		
		var a,b;  //increment factor for left and top
		a = 10; b = 0;
		gen_absolute_image(132+a,70+b,56,36);    //	top triangle				left,top,width,height
		gen_absolute_image(404+a,175+b,53,31);     //side tran
		gen_absolute_image(530+a,182+b,36,34);   // glass left		
		gen_absolute_image(652+a,182+b,49,35);   // glass middle right
		gen_absolute_image(252+a,130+b,56,32);  //window1
		gen_absolute_image(358+a,112+b,56,32);  //window 2
		gen_absolute_image(327+a,177+b,57,33);   //door
		gen_absolute_image(332+a,220+b,53,31);  //mat
		gen_absolute_image(566+a,185+b,40,30);   // glass middle 1
		gen_absolute_image(610+a,185+b,40,30);   // glass middle 1
		gen_absolute_image(502+a,245+b,55,35);   //tyre 1
		gen_absolute_image(730+a,242+b,55,35);   //tyre 2
		gen_absolute_image(687+a,112+b,52,42);   // fruit 1
		gen_absolute_image(782+a,170+b,52,42);   // fruit 2
		
		$('.dragObjects').draggable({ containment: '#gameSection', revert: 'invalid' });
		
		
		var dropObj = { 'width':'200px','height': '132px','margin': '0.5em','border': '2px solid #B2F675'};
		
		
		for(i = 0; i<3; i++){
			$('#dropSection3').append('<div id="dropShape'+i+'" class="dropObjects"></div>');
		}	
		$('.dropObjects').css(dropObj);
		
		$(".dropObjects").droppable({ tolerence: 'intersect' ,hoverClass: 'drophover'});
		
		$('#dropSection3').append('<div class="dropText3">त्रिभुज </div>');
		$('#dropSection3').append('<div class="dropText3">चतुर्भुज</div>');
		$('#dropSection3').append('<div class="dropText3">वृत</div>');		
		
	};
	
	var control_game_flow = function(){		
		if(currentSection === 1){ 
			if(number_shapes === 8){
				$("#next").show();
				$("#prev").hide();
				$("#playAgain").hide();
			}
		}
		else if(currentSection === 2){
			if(number_shapes === 12){
				$("#next").show();
				$("#prev").show();
				$("#playAgain").hide();
			}
		}
		else if(currentSection === 3){
			if(number_shapes === 14){
				$("#next").hide();
				$("#prev").show();
				$("#playAgain").show();
			}
		}			
	};
			
	function game(){
	  $('#section1').show();
	  $('#section2').hide();
	  $('#section3').hide();
	  $('#next').hide();
	  $('#prev').hide();
	  $('#playAgain').hide();
	  zIndex = 0;
	  number_shapes = 0;
	  currentSection =  1 ;
	  generate_shapes1();  
	  drag_drop();
	}	
	
	
	/*****************************************************/
	  
			/******** LESSON SECTION  *******/
  game();
 
  $('#playAgain').click(function(){
	  game();
 });
  $('#next').click(function(){
	  if(currentSection === 1){
		  $('#next').hide();
		  $('#prev').hide();
		  $('#playAgain').hide();
		  $('#section1').hide();
		  $('#section2').show();
		  $('#section3').hide();
		  zIndex = 0;
		  number_shapes = 0;
		  currentSection = 2;
		  generate_shapes2();
		  drag_drop();
	
	  }
	  else if(currentSection === 2){
		  $('#prev').hide();
		  $('#next').hide();
		  $('#playAgain').hide();
		  $('#section1').hide();
		  $('#section2').hide();
		  $('#section3').show();
		  zIndex = 0;
		  number_shapes = 0;
		  currentSection = 3;
		  img_count = 0;
		  generate_shapes3();
		  drag_drop();
	  }
	  
  });
  $('#prev').click(function(){
	  if(currentSection === 2){
		  $('#next').hide();
		  $('#prev').hide();
		  $('#playAgain').hide();
		  $('#section1').show();
		  $('#section2').hide();
		  $('#section3').hide();
		  zIndex = 0;
		  number_shapes = 0;
		  currentSection = 1;
		  generate_shapes1();
		  drag_drop();
	  }
	  else if(currentSection === 3){
		  $('#next').hide();
		  $('#prev').hide();
		  $('#playAgain').hide();
		  $('#section1').hide();
		  $('#section2').show();
		  $('#section3').hide();
		  zIndex = 0;
		  number_shapes = 0;
		  currentSection = 2;
		  generate_shapes2();
		  drag_drop();
	  }
	  
  });

  
  
  /**** Drag Handling Functions ***/
function drag_drop(){
	$('.dragObjects').bind('dragstart', function(event, ui) {
		currentDragObject = event.target.id;			
		currentShape = parseInt(currentDragObject.substring(9));
		if(currentSection != 3){	
			draggedShape = randPositions[currentShape]; 
			
		}
		else { 
			draggedShape = currentShape;
			
		}
		
	});
		
	/**** Drop Handling Functions ***/
	
	$('.dropObjects').bind('drop', function(event, ui) {
		currentDropObject = event.target.id;
		var droppedShape = parseInt(currentDropObject.substring(9));
		var topPos,leftPos;
		var pos = currentShape;
	
		if(currentSection  === 1){
			if((draggedShape < 4 && droppedShape != 0) || (draggedShape > 3 && droppedShape != 1)){
				if(pos < 4){ leftPos = -10 + pos*10;	topPos= 5;
				}
				else{	leftPos = -10 + (pos-4)*10;		topPos= 10;	}
				$('#'+currentDragObject).css({'top': topPos+'px','left': leftPos+'px'});  //drop the object to fit the drop area
			}
			else{
				$('#'+currentDragObject).css({'z-index':zIndex});  //drop the object to fit the drop area
				$('#'+currentDragObject).draggable( 'disable' );
				
				number_shapes++;
				zIndex++;
			}
		}
		
	
		else if(currentSection  === 2){
			if((draggedShape < 4 && droppedShape != 0) || (draggedShape < 8 && draggedShape>3  && droppedShape != 1) || (draggedShape > 7 && droppedShape != 2)){
				if(pos < 4){ leftPos = -15 + pos*10;	topPos= 5;
				}
				else{	leftPos = -15 + (pos-4)*10;		topPos= 10;	}
				$('#'+currentDragObject).css({'top': topPos+'px','left': leftPos+'px'});  //drop the object to fit the drop area
			}
			else{
				$('#'+currentDragObject).css({'z-index':zIndex});  //drop the object to fit the drop area
				$('#'+currentDragObject).draggable( 'disable' );				
				number_shapes++;
				zIndex++;
			}
		}
		
		else if(currentSection === 3){
			if((draggedShape < 4 && droppedShape != 0) || ((draggedShape < 10 && draggedShape>4)  && droppedShape != 1) || (draggedShape > 10 && droppedShape != 2)){
				
				//alert("incorrect");
				// incorrect so do nth
				
			}
			else{
				
				$('#'+currentDragObject).css({'z-index':zIndex});  //drop the object to fit the drop area
				number_shapes++;
				zIndex++;
			}
		}
		control_game_flow();
		
	});
}  
  
	 
/**************************************************/  
			  		

});   //end of dom