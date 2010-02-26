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

	    var score = 0;
	    var names = [];
	    var namesUsed = [];
	    var correctIndex = 0;
	    var $img = $('#imgObject');
	    var $options = $('.option');
	   
 
	    var populateListNames = function() {
		var i = 0;
		$.each(k.image, function (img){
			   names[i] = img;
			   i++;
		       });
	    };	 

		
	    var checkSelection = function(selectedOption){
		if(selectedOption === correctIndex){

		    score++;
		    kFooter.kFooter('inc');  
		    kFooter.kFooter('incTotal');

		    if (score === 6){
			$feedback.feedback('win');
		    } else{
			$feedback.feedback('correct');
			game();
		    }
		}
		else {
		    $feedback.feedback('incorrect');
		    kFooter.kFooter('incTotal');
		}
	    };    

	    var shuffleGlobal = function (list) {
		var i = 0, j = 0, t = 0;
		for (i = list.length - 1; i > 0; i -= 1) {
		    j = Karma.rand(0, i);
		    t = list[i];
		    list[i] = list[j];
		    list[j] = t;
		}
	    };

	    var game = function(){
		correctIndex = 0;
		
		var pickCorrect = function(){
		    var correct = 0;

		    var used = function(index){
			var name = names[index];
			for (var i = 0; i < namesUsed.length; i++){
			    if (namesUsed[i] === name){
				return true;
			    }
			}
			return false;
		    };

		    var getUnusedName = function(){
			correct = k.rand(0,3);
			while(used(correct)){
			    shuffleGlobal(names);
			    correct = k.rand(0,3);
			}
			return correct;
		    };

		    shuffleGlobal(names);
		    correct = getUnusedName();
		    namesUsed.push(names[correct]);
		    
		    return correct;
		};
		
		correctIndex = pickCorrect();

		for (var i = 0; i < 4; i++){
		    $($options[i]).text(k.image[names[i]].name);
		}
		
		$img.attr('src', k.image[names[correctIndex]].src)
		    .css('visibility', 'visible');
		
	    };


	    kFooter.bind('kFooterWinGame', 
			 function(){
			     $('.optImg').hide();
			     $('.imageBox').hide();
			     $('#gameOver').show();
			 });  
	    kFooter.bind('kFooterRestart',
			 function() {
			     namesUsed = [];
			     correctIndex = 0;
			     score = 0;
			     game();     
			 }
			);

	    $options.click(
		function(e){
		    checkSelection(parseInt(e.target.id.slice(-1)));
		}
	    );

	    
	    populateListNames();
	    game();     //let the game begin
	    

	}); //end of games	

}); 