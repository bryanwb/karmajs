(function($){
     $.widget('ui.scoreboard', 
	      {
		  getScore : function(){
		      return this._getData('score');
		  },
		  setScore : function(newScore){
		      this._setData('score', parseInt(newScore));
		      this._refresh();
		  },
		  getTotal : function(){
		      return this._getData('total');
		  },
		  setTotal : function(newTotal){
		      this._setData('total', parseInt(newTotal));
		      this._refresh();  
		  },
		  reset : function(){
		      this._setData('score', this._getData('initialScore'));
		      this._setData('total', this._getData('initialTotal'));
		      this._refresh();  
		  },
		  inc : function(val){
		      var incVal = parseInt(val) || 1;
		      this._setData('score',  this._getData('score') + incVal);
		      this._setData('total',  this._getData('total') + incVal);
		      this._refresh();
		  },
		  dec : function(val){
		      var decVal = parseInt(val) || 1;
		      this._setData('score',  this._getData('score') - decVal);
		      this._setData('total',  this._getData('total') - decVal);
		      this._refresh();
		  },
		  _init : function(){

		      var divDisplay = "inline";
		      var score = this.options.score;
		      var total = this.options.total;
		      
		   
		      this._setData('initialScore', parseInt(this.options.score));
		      this._setData('initialTotal', parseInt(this.options.total));
		      this._setData('score', parseInt(this.options.score));
		      this._setData('total', parseInt(this.options.total)); 

		      if(this.options.layout === "vertical"){
			  divDisplay = "block";
		      } 

		      this.element.css({'max-width':'400px', 'max-height': '400px'})
		  	  .addClass('ui-widget ui-corner-all');
			//  .css({'margin-top':'1em','padding-bottom':'1em'});

		      this.valueDiv = $("<div></div>")
			  .addClass('ui-corner-all ui-widget-content')
			  .css({border:"2px solid black", background : 'black'});
		      var clone = $('<div>').css({display:divDisplay})
			  .css({'margin-left':'0.2em', 'margin-right':'0.2em'});
		      this._scoreText = clone.clone().text("Score:")
		          .addClass('ui-corner-all')
			  .css({'color':'red', 'font-size':'larger'})
			  .appendTo(this.valueDiv);
		      this._score = clone.clone().text(score)
			  .css({'background-color':'white', 
				'padding-left':'0.4em',
			       	'padding-right':'0.4em',
				'padding-top' : '0em', 'padding-bottom':'0em'})
			  .appendTo(this.valueDiv);
		      this._scoreText.clone().text("Total:").appendTo(this.valueDiv);
		      this._total = this._score.clone().text(total).appendTo(this.valueDiv);
		      var playAgainDiv = $('<button id="myButton" class="ui-corner-all ui-state-default">' + 
			      '<span class="ui-icon ui-icon-arrowreturnthick-1-s" style="float: left; margin-right:0.3em;" >' + '</span>Play Again</button>')
			  .css({'margin-left': '0.5em', 
			      'margin-right': '0.5em',
				'color':'red',
				'float':'right',
				'cursor':'pointer'})
			//  .addClass('ui-corner-all')
			 // .css({'border':'black solid 2px', 'background-color':'red',
			//	display:'inline'})
		        //  .bind('mouseover', function(ev){
			//	    $(ev.target).css({'cursor':'pointer'});
			//	})
		          .appendTo(this.valueDiv);
		      //$('<img>').attr({src:iconPlayAgain}).appendTo(playAgainDiv);
		      /* $("<span></span>")
			  .addClass('ui-icon ui-icon-arrowreturnthick-1-s')
			  .appendTo(playAgainDiv);
		      $("<div>Play Again</div>")
			  .css({'display':'inline'})
			  .appendTo(playAgainDiv);	      
		      *///playAgainDiv.text('Play Again');
		      this.valueDiv.appendTo(this.element);

		  },
		  _refresh : function(){
		      this._score.text(this._getData('score'));
		      this._total.text(this._getData('total'));
		  },
		  destroy : function(){
		      this.valueDiv.remove();
		      $.widget.prototype.destroy.apply(this, arguments);
		  },
		  _setData: function(key, value){
		     
		      switch (key) {
			case 'layout':
			  this.options.layout = value;
			  var divDisplay = "inline";
			   if(this.options.layout === "vertical"){
			       var divDisplay = "block";
			       console.log(this.options.layout);
			   } 
	  
			  this.valueDiv.children().css('display', divDisplay);
			  break;
		      }
		      $.widget.prototype._setData.apply(this, arguments);
		  }

		  
	      });

	      $.ui.scoreboard.getter = ['getScore', 'getTotal'];
	      $.ui.scoreboard.defaults = {
		  score: 0, total: 0, layout: "horizontal"
	      };

 })(jQuery);