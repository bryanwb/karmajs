$(document).ready(
    function(){
	var k = Karma({
			  svgs :[    
                              {name:'capitals', domId: 'capitals'},
			      {name:'alien', domId: 'alien'},
			      {name:'spaceship', domId: 'spaceship'},
			      {name: 'help', domId: 'help'}
			  ]
		      });

	k.ready(function() {
	//Program constants
	var MAX_SCREEN_X = 800, MAX_SCREEN_Y = 500;

	var CAPITALS = [{dept:'artigas', capital:'artigas', 
	    deptName:'Artigas', capitalName:'Artigas'}, 
	    {dept:'rivera', capital:'rivera', deptName:'Rivera', capitalName:'Rivera'}, 
	    {dept:'salto', capital:'salto', deptName:'Salto', capitalName:'Salto'},
	    {dept:'paysandu', capital:'paysandu', deptName:'Paysandu', 
	    capitalName:'Paysandu'},
	    {dept:'rioNegro', capital:'frayBentos', deptName:'Rio Negro', 
	    capitalName:'Fray Bentos'},
	    {dept:'tacuarembo', capital:'tacuarembo', deptName:'Tacuarembo', 
	    capitalName:'Tacuarembo'},
	    {dept:'cerroLargo', capital:'melo', deptName:'Cerro Largo', 
	    capitalName:'Melo'},
	    {dept:'durazno', capital:'durazno', deptName:'Durazno', capitalName:'Durazno'},
	    {dept:'treintaYTres', capital:'treintaYTres', deptName:'Treinta Y Tres', 
	    capitalName:'Treinta Y Tres'},
	    {dept:'soriano', capital:'mercedes', deptName:'Soriano', 
	    capitalName:'Mercedes'},
	    {dept:'flores', capital:'trinidad', deptName:'Flores', capitalName:'Trinidad'},
	    {dept:'colonia', capital:'colonia', deptName:'Colonia', capitalName:'Colonia'},
	    {dept:'sanJose', capital:'sanJose', deptName:'San Jose', 
	    capitalName:'San Jose de Mayo'},
	    {dept:'montevideo', capital:'montevideo', deptName:'Montevideo', 
	    capitalName:'Montevideo'},
	    {dept:'lavalleja', capital:'minas', deptName:'Lavalleja', 
	    capitalName:'Minas'},
	    {dept:'rocha', capital:'rocha', deptName:'Rocha', capitalName:'Rocha'},       
	    {dept:'canelones', capital:'canelones', deptName:'Canelones', 
	    capitalName:'Canelones'},		      
	    {dept:'maldonado', capital:'maldonado', deptName:'Maldonado', 
	    capitalName:'Maldonado'}		      
		       ];
	    var parts = ['shipLtWing', 'shipRtWing', 'shipBottom', 'shipBody',
			 'shipCone', 'shipLtJet', 'shipRtJet'];    
	    var fires = ['shipFire1', 'shipFire2'];    

	    //Game Control
	    var isActive = false;
	    var question = [];
	    var questions = CAPITALS;
	    var lastQuestion = '';
	    var capRoot = k.svgs.capitals.root;
	    var alienRoot = k.svgs.alien.root;
	    var spaceshipRoot = k.svgs.spaceship.root;

	    var alienBubble = $('foreignObject #alienQuestion', alienRoot);

	    var hideSpaceship = function() {
		var hideElems = function(id){
		    $("#" + id, spaceshipRoot).css('display','none');
		};
		parts.map(hideElems);
		fires.map(hideElems);
	    };
	    
	    //hideSpaceship();

	    var scaleSvgs = function(svgs) {
		var scaleView = function (svgRoot) {
		    
		
		    var width = window.innerWidth;
		    var height = window.innerHeight; 
		    var newRatio = 1;
		    var xRatio = width/MAX_SCREEN_X;
		    var yRatio = height/MAX_SCREEN_Y;

		    //get the smallest ratio
		    newRatio = xRatio > yRatio ? yRatio : xRatio;

		    if (newRatio < 1) {
			svgRoot.currentScale = newRatio - 0.05;
			return newRatio;	
		    } else {
			//do nothing
			return newRatio;
		    }
		};
		
		for (var svg in svgs){
		    if (svgs.hasOwnProperty(svg)){
			scaleView(svgs[svg].root);
		    }
		}
		 
	    };
   
	    //scaleSvgs(k.svgs);
	   

	    //gameplay functions
	    var changeQuestion = function (questions){
		var index = Math.round(Math.random() * (questions.length - 1));
		var question = questions[index];
		
		//drop the city used from the list of answers
		if (index === 0 ){
		    questions.shift();
		} else {
		    questions.splice(index, 1);
		}
		
		return question;
	    };


	    var askQuestion = function (questions, isWrong) {
		if (isWrong){
		    alienBubble.text(lastQuestion);
		    return;
		}

		question = changeQuestion(questions);		
		alienBubble.text("Where is the \n capital of \n " + 
		question.deptName + "?");
		lastQuestion = "Where is the \n capital of \n " + 
		    question.deptName + "?";
	    };


	    var checkAnswer = function (mapElem) {
		var askNextQuestion = function(){
				var timerID = setTimeout(function() {
				alienBubble.text('');
				askQuestion(questions);
				    }, 3000);
		};

		if(isActive){
		    if ( ("cap" + question.capital).toLowerCase() === 
			 mapElem.id.toLowerCase()){
			
			var part = parts.splice(0,1)[0];
			$('#' + part, spaceshipRoot)[0].style.display = 'block';
			alienBubble.text("Correct! " + question.capitalName +
				  " is the capital of " + question.deptName);
			$('.text.' + question.dept, capRoot)[0].
			    style.display = "block";
			$('.text.' + question.dept, capRoot)[1].
			    style.display = "block";
			
			if (parts.length === 0){
			    // We're done!
			    isActive = false;
			    alienBubble.text("Great Job! I can go home now.");
			    setTimeout(function(){
				    $('#alien').hide();
				    $('#sideTop').hide();	   
				    flyAway();
				}, 1000);
				
			} else {
			    askNextQuestion();
			}
				
		    } else {
			alienBubble.text("Incorrect. Please try again.");
			setTimeout(function(){
			    askQuestion(questions, true);
			    },1000);
		    }
		}
	
	    };

	    var flyAway = function(){
		var isLaunching = true;

		var blastOff = function(){
		var shipFire1 = $('#shipFire1', spaceshipRoot);
		var shipFire2 = $('#shipFire2', spaceshipRoot);
		var toggle = true;		    
		    
		    var toggleFires = function(){			
			if(isLaunching){
			    if(toggle){
				shipFire1[0].style.display = "none";
				shipFire2[0].style.display = "block";
			    }else{
				shipFire1[0].style.display = "block";
				shipFire2[0].style.display = "none";
			    }
			    //toggle fires
			    toggle = !toggle;
			    setTimeout(toggleFires, 400);
			}
		    };

		    toggleFires();	     
		};

		blastOff();

		$('#spaceship').animate({"bottom":"550px"}, 
		{"duration":8000, 
		 "complete": function(){ isLaunching = false;}});
							   
	    };

		    
  	    $.map($('.capital.city', capRoot), function(elem){
		$(elem, capRoot).bind('click', function(event) {
		    checkAnswer(event.target);
				      });
	    });

	    var showHelpMessage = function(){
				      
		$('#overlay').css({"position": "absolute", 
		    "background": "white", "opacity": "0.8",
				   'width': 800, 'height': 500, 
				   'display':'', "z-index": 10});
		$('#help').css({"position": "absolute",
				"width": "420px", "height": "360px",
				'top': '25px', 'left': '20%',
				'z-index' : 20,  'display':'', "opacity": 1});

		//Chromium HACK: for some reason chromium 
		//won't let me bind a click event to the #help SVG
		//so I am using a transparent overlay instead
		$('#helpOverlay').css({"position": "absolute",
				"width": "420px", "height": "360px",
				'top': '25px', 'left': '20%',
				'z-index' : 20,  'display':'', "opacity": 0});		
		$('#helpOverlay')
		    .bind('click', function(){
			console.log('click event fired');      
			if(!isActive){
			    console.log('isActive');
			    $('#overlay,#help,#helpOverlay').css({"display":"none"});
			    isActive = true;
			    askQuestion(questions);
			} else {
			    return;
			}
		    });
			    
	    };

	    showHelpMessage();	
	    //askQuestion(questions);
	    	    

		});

});

