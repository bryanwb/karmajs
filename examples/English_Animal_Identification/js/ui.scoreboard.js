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
		      var iconPlayAgain = "";

		   
		      this._setData('initialScore', parseInt(this.options.score));
		      this._setData('initialTotal', parseInt(this.options.total));
		      this._setData('score', parseInt(this.options.score));
		      this._setData('total', parseInt(this.options.total)); 

		      if(this.options.layout === "vertical"){
			  divDisplay = "block";
		      } 

		      this.element.css({'max-width':'400px', 'max-height': '400px'});

		      this.valueDiv = $("<div></div>")
			  .addClass('ui-corner-all')
			  .css({border:"2px solid black", background : 'white'});
		      var clone = $('<div>').css({display:divDisplay, padding:'5px'});
				      
		      this._scoreText = clone.clone().text("Score:");
		      //this._scoreText = $("<div>Score:</div>")
		      //  .css({display:divDisplay});
		      this._scoreText.appendTo(this.valueDiv);
		      this._score = $("<div>" + score + "</div>")
			  .css({display:divDisplay, padding:'5px'});
		      this._score.appendTo(this.valueDiv);
		      $("<div>Total:</div>").css({display:divDisplay})
			  .appendTo(this.valueDiv);
		      this._total = $("<div>" + total + "</div>")
			  .css({display:divDisplay});
		      this._total.appendTo(this.valueDiv);
		      $("<div>Play Again</div>").css({display:divDisplay})
			  .appendTo(this.valueDiv);
		      $('<img>').attr({src:iconPlayAgain}).appendTo(this.valueDiv);
				  
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