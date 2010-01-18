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
		      this._refresh();
		      if(this._getData('winScore') === this._getData('score')){
			  this.element.trigger('winGame');
		      }
		  },
		  incTotal : function(val){
		      var incVal = parseInt(val) || 1;
		      this._setData('total',  this._getData('total') + incVal);
		      this._refresh();
		  },
		  dec : function(val){
		      var decVal = parseInt(val) || 1;
		      this._setData('score',  this._getData('score') - decVal);
		      this._refresh();
		  },
		  decTotal : function(val){
		      var decVal = parseInt(val) || 1;
		      this._setData('total',  this._getData('total') - decVal);
		      this._refresh();
		  },
		  _init : function(){

		      var divDisplay = "inline";
		      var score = this.options.score;
		      var total = this.options.total;
		      var layoutId = "h";
		      var self = this;
		      
		   
		      this._setData('initialScore', parseInt(this.options.score));
		      this._setData('initialTotal', parseInt(this.options.total));
		      this._setData('score', parseInt(this.options.score));
		      this._setData('total', parseInt(this.options.total)); 
		      this._setData('winScore', parseInt(this.options.winningScore) || 0); 

		      if(this.options.layout === "vertical"){
			  layoutId = "v";
		      } 


		      this.element.addClass('ui-scoreboard-container-' + layoutId +
			      ' ui-widget ui-widget-content ui-corner-all');

		      var clone = $('<div>')
		          .addClass('ui-scoreboard-spacing-' + layoutId);
		      this._scoreText = $("<div>Score</div>")
			  .addClass('ui-scoreboard-spacing-'+ layoutId +
				    ' ui-corner-all ui-scoreboard-text')
			  .appendTo(this.element);
		      this._score = $("<div>" + score + "</div>")
		          .addClass('ui-scoreboard-spacing-' + layoutId +
				    ' ui-scoreboard-number-' + layoutId)
			  .appendTo(this.element);
		     $("<div>Total</div>")
			  .addClass('ui-scoreboard-spacing-' + layoutId +
				    ' ui-corner-all ' + 
				    'ui-scoreboard-text')
			  .appendTo(this.element);
		      this._total = $("<div>" + total + "</div>")
		          .addClass('ui-scoreboard-spacing-' + layoutId +
				    ' ui-scoreboard-number-' + layoutId)
			  .appendTo(this.element);
		      var playAgainDiv = $('<button>Play Again</button>')
			      .addClass('ui-scoreboard-spacing-' + layoutId + 
					' ui-scoreboard-button ' +
				        'ui-corner-all ui-state-default')
			  .click(function(){ self.reset();})
		          .hover(
			      function(){ 
				  $(this).addClass("ui-state-hover"); 
			      },
			      function(){ 
				  $(this).removeClass("ui-state-hover"); 
			      })
			  .appendTo(this.element);
		      var playAgainIcon = $('<span></span>')
			  .addClass('ui-icon ui-icon-arrowreturnthick-1-s '
				    + 'ui-scoreboard-icon')
			  .appendTo(playAgainDiv);

		  },
		  _refresh : function(){
		      this._score.text(this._getData('score'));
		      this._total.text(this._getData('total'));
		  },
		  destroy : function(){
		      this.element.remove();
		      $.widget.prototype.destroy.apply(this, arguments);
		  }

		  
	      });

	      $.ui.scoreboard.getter = ['getScore', 'getTotal'];
	      $.ui.scoreboard.defaults = {
		  score: 0, total: 0, layout: "horizontal", winningScore: 0
	      };

 })(jQuery);