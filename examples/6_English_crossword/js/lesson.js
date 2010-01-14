$(document).ready(function(){
	var i,j;	
	words = new Array('insect','ewspaper','xe','empo','eanut','ca','liflower','amp','mang','ountain','mbr','lla','go','lp','st','moon');
	var allWords = 'insectewspaperxeempoeanutcaliflowerampmangountainmbrllagolpstmoon';
	var currentWord;  //store the currently stored word
	var correctCounter;
	var wordId = 0;
	
	var generate_crossword = function(word,align,top,left){
		//alert(word+','+align+','+top+','+left);
		$('#crosswordSection').append('<div id="'+word+'" class="'+align+'"></div>');		
		//define the absolute position for it
		var alignHorVal,alignVerVal;
		if(align === "horizontal"){
			alignHorVal = 1;
			alignVerVal = 0;
		}
		else{
			alignHorVal = 0;
			alignVerVal = 1;
		}
		var length = word.length;
		if(word === words[8] || word === words[12] || word === words[10]){ 
			
			//length -= 1;
			alignVerVal = 0.5;
		}
		if(word === words[5]){ 
			
			//length -= 1;
			alignHorVal = 0.3;
		}
		
		
		var position = {
				'position': 'absolute',
				'top': top+'px',
				'left': left+'px',
				'width': 40 + (40*(length)*alignHorVal),
				'height': 35 + (35*(length)*alignVerVal)
		};
		
		$('#'+word).css(position);
		
	
		
		for(i = 0; i< length; i++){
			
			$('#'+word).append('<input type="text" id="word'+wordId+'" class="crossword" size="1" maxlength="1">');
			wordId++;
		}
	};	
	
	var write_number = function(id,top,left){
	$('#crosswordSection').append('<div id="text'+id+'" class="topText">'+id+'</div>');
		
		$('#text'+id).css({
			'top': top+'px',
			'left': left+'px'			
		});
		//write the number to be displayed on top
	};
	
	var crossword_locations = function(){
		write_number(2,138,17);		
		write_number(5,249,17);
		write_number(10,359,38);//cauliflower
		write_number(9,335,387); // moon
		
		generate_crossword(words[0],'vertical',108,28); //insect
		generate_crossword(words[1],'horizontal',136,58); //ewspaper
		generate_crossword(words[2],'vertical',163,182); //xe
		generate_crossword(words[3],'horizontal',248,58);  //empo
		generate_crossword(words[4],'vertical',275,120); //eanut
		generate_crossword(words[5],'horizontal',359,58);//ca
		generate_crossword(words[6],'horizontal',359,150);//uliflower
		generate_crossword(words[7],'vertical',387,243); //amp
		generate_crossword(words[8],'vertical',248,275); //mang
		generate_crossword(words[9],'horizontal',248,305); //ountain
		generate_crossword(words[10],'vertical',275,336); //mbr
		generate_crossword(words[11],'vertical',387,336); //mbr
		generate_crossword(words[12],'vertical',192,429); //go
		generate_crossword(words[13],'vertical',276,429); //lp
		generate_crossword(words[14],'vertical',360,429); //st
		generate_crossword(words[15],'horizontal',332,398); //moon
		
		write_number(3,115,192);  
		write_number(6,228,130); 
		write_number(11,340,250); //lamp
		write_number(7,230,265); //mango + mountain
		write_number(8,228,345); //umbrella
		write_number(4,172,440); // goal post
		write_number(1,88,40); //insect
		
	};
	
	var check_game_over = function(){
		var counter = 0;
		for(var i = 0; i< allWords.length;i++){
			var x = document.getElementById('word'+i).value;
			if(x === allWords[i]){
			  counter++;
			  }	
		}
		
		if(counter === allWords.length){
    		$('#gameOver').show();    		
    		$('#gameOver').html('').append('Game Over');
    		$('#gameOver').append('<div id="gameOverInfo">Congratulations !!! You did It.</div>');
    	}
		else{
			$('#gameOver').hide();
			
		}
    };
    
    
	function foucs_blur(){
		$('input[type="text"]').focus(function() {
		    $(this).removeClass('correct').removeClass('incorrect').addClass("focus");
		});
		$('input[type="text"]').blur(function() {
		    $(this).removeClass("focus");
		    currentWord = $(this).val();
		    var currentObjId = $(this).attr('id');
		    var currentLen = currentObjId.length;

		    if(currentLen <6){
		      currentLen -= 1;
		    }
		    else{
		    	currentLen = currentLen - 2;
		    }
		    var id = parseInt(currentObjId.substring(currentLen));
		    	         
		    if(currentWord === allWords[id]){
		    	$(this).addClass('correct');	
		    	correctCounter+=1;
		    	
		    }
		    else if(currentWord === ""){
		    	$(this).removeClass('correct').removeClass('incorrect').removeClass("focus");
	
		    }
		    else{
		    	$(this).addClass('incorrect');
		    }
		    check_game_over();
		    
		});
	}
	function game(){
		$('#gameOver').hide();
		$('#crosswordSection').html('');
		correctCounter = 0;
		crossword_locations();				
		foucs_blur();
	}

	$('#gameOver').hide();
	$('#linkNext').hide();
	
	$('#linkStart').click(function(){
		game();
	});

	$('#linkPlayAgain').click(function(){
		game();		
	});
});