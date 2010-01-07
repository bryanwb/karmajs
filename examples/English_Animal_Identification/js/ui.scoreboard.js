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
		      var iconPlayAgain = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oBBg4CK/NuVU0AAAS6SURBVDjLtZVbbFRFGMf/38w5e/bSZdvSK71tW1JIgYhGg4Axpl4ACxoTIWh48AnwUSVc5EFfuDSYkGgCkaCJCb6IogEqPBhuYjW0xpIAQaBttpXet3vfPWfPOfP5soWWYsKLk/xfJt/85ptv/t8MMTP+jyGeJIg2nZRPEte47mC4bu3hUgCgx2Xc3H6gBSR2MlEbK64GQScgDcI4My4o1z1ZPlF2padnqz29punN/ZXKFV2C3bb+zr2RWWAiUFN7x3EmbPb5gx6P36dJqcHj0aAJgF0XlmW56VQybWbzGog6/JncYcsH4QpvNzO3CEkNfad3DWozM21q7/haaPrGUHmFXykFVi50TcCjCRi6Bl0TkKJI6jXlISJGJDK2ZxJqB0DDzeHqhpHRybSVdRQAPAA3th9YIaV82z8vFIhPjCnlukIKibjrMDMcn1fPlpYW+ysr5+uKgZzpYsnieh+rGt9kNBlc3lpPP3ROOJYONevyBIntRDKQjkW5vKKCGpqbzNLqqu8Gzu4STFxp5Z3XRkYnT/Ve/zubjCe5tiKIaNLEZCqP5nAV6VKACSQdmg1m0BrHsWnR4pZY6+LGv/J5JwaoQwAQObs71n9m57X+Mzs3s3JW90eGu3/vvpWpDHlQWx5E141haFJAKTUXDIIRCoXuNzfVfBnye0+AxB2XPbFHHTPQ+XGvctUe27I1n1fH6FQGAGB4JBzXJWnQ7BozOFtSHPw86POeyeeNSbbom2BdRXKuFTuWCYHTL65sNUrmBVBRGsQLy2rg0SXARFlbzAaH02bjpco+dfG9LQoAsLVljr/Da/dXQxPnieG/1HXDUgWrTjuWmT2aL6lmNUjT+o4JBhc9tvMYKQh6Vbr+244x5fuvzuM8G5GfPx1nBj/0MXPx+++2aR79YdmzloPvz12zorHch5HOXdcL0xYAPLvtmA6U+FctfdqcH8yXXP2zd1Vf/9AxZpQ9UmMiw5D48co9MAPrVoTR1X0nF09mj0TO7T7xaHaaClRKQx01fKmfEqYqn5xKbCMp3TmPEBNAIJi2i6YFIUhBGByLAUTLFq7ZVzfn3BLzXFetTKSyW7p7b+6Ix+NhMPc/2HhGhUgIwuqlC3D3nzhuD8XxzobnfZe67758t+/+7cb1B78gxT2QcrAoVKzphvczj3CLf/2t5yXbdlhquu3k1fE5YAIgiCDYxcrWKqRyDm4ORLG0pVa2hKv8A0PjH8VSmVwykRW5VDJgZZLQDQPeQAA+qVF8fMwk0/x2bsaKaGhkik+d70kwsVi+qFZb3hr2j8RN5G0X5eWlWjAUCnINw1WMnOUgazlIZ0xMjo6k4bgfDFz8xHzoJGYQkQy/vt82dC0djXRvSPZdGC1ZsvGN4Pz67Q11ZTVlpSV6oCggNF1DJmcjY9pIpk1EozGViCXybibaMXT50BEAJgCTmfPTYG943YFYLnZv09gfX90E4CvIW9zc9lRR/XObNe+8Z0DC0KWwbVdJZoayM1czw71Hp251XgeQKyjLzNlpMNW/svetwV/2XQbgBWDMkF6QlEZI91UuLLUTEzErMRgDkC/42ipAUwAsZuY5XxMRyRmwaWkAJAAG4BZkF5QH4DCzO5PzL1gVS5MKhAwdAAAAAElFTkSuQmCC";

		   
		      this._setData('initialScore', parseInt(this.options.score));
		      this._setData('initialTotal', parseInt(this.options.total));
		      this._setData('score', parseInt(this.options.score));
		      this._setData('total', parseInt(this.options.total)); 

		      if(this.options.layout === "vertical"){
			  divDisplay = "block";
		      } 

		      this.element.css({'max-width':'400px', 'max-height': '400px'});

		      this.valueDiv = $("<div></div>")
			  .addClass('ui-corner-all ui-widget')
			  .css({border:"2px solid black", background : 'white'});
		      var clone = $('<div>').css({display:divDisplay, padding:'5px'});
				      
		      this._scoreText = clone.clone().text("Score:")
			  .appendTo(this.valueDiv);
		      this._score = clone.clone().text(score).appendTo(this.valueDiv);
		      clone.clone().text("Total:").appendTo(this.valueDiv);
		      this._total = clone.clone().text(total).appendTo(this.valueDiv);
		      var playAgainDiv = clone.clone()
			  .addClass('ui-corner-all ui-state-default')
			  .css({'border':'black solid 2px', 'background-color':'red' })
		          .appendTo(this.valueDiv);
		      $('<img>').attr({src:iconPlayAgain}).appendTo(playAgainDiv);
		      $("<span>Play Again</span>").appendTo(playAgainDiv);
			      

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