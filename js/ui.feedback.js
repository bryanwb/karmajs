/**
* @fileOverview a scoreboard widget
* @author Bryan Berry <bryan@olenepal.org> 
*  uses MIT License
*/



(function($){

     // This is a dummy function, just here as placeholder to
     // to make the jsdoc tool happy
     /** @name $.ui.feedback
      * @namespace Feedback widget
      */
     $.ui.feedback = function(){};

     $.widget('ui.feedback',
	      /** @lends $.ui.feedback.prototype */
	      {
		  /** Displays the correct icon in the center of the screen
		   *  and plays the sound "correct" if loaded
		   */
		  correct: function(){
		      var $correct = this.$correct.css('display','block');
		      setTimeout ( function() {
				       $correct.fadeOut(500);
				   }, 500);
		      if (Karma && Karma.audio && Karma.audio.correct){
			  Karma.audio.correct.play();
		      }
		      
		  },
		  /** Displays the incorrect icon in the center of the screen
		   *  and plays the sound "incorrect" if loaded
		   */
		  incorrect: function(){
		      
		      var $incorrect = this.$incorrect.css('display','block');
		      setTimeout ( function() {
				       $incorrect.fadeOut(500);
				   }, 500);

		      //this.$incorrect.css('display','block').fadeOut(3000);
		      if (Karma && Karma.audio && Karma.audio.incorrect){
			  Karma.audio.incorrect.play();
		      }
		      
		  },
		  /** Display a happy face and text that says "You win!"
		   * 
		   */
		  win: function(){
		      this.$win.show();
		      this.$overlay.show();
		  },
		  /** Display an unhappy face and text that says "You lose!"
		   * 
		   */
		  lose: function(){
		      this.$lose.show();
		      this.$overlay.show();
		  },
		  _init : function(){
		      var self = this;
		      
		      this.element
			  .addClass('ui-feedback')
			  .css({position:'absolute', 
				top: '40%', left: '40%'});
		      
		      this.$correct = $('<div></div>')
			  .addClass('ui-feedback-correct')
			  .appendTo(this.element);

		      this.$incorrect = $('<div></div>')
			  .addClass('ui-feedback-incorrect')
			  .appendTo(this.element);
		      
		      this.$win = $("<div class='ui-feedback-over'>" +
				     "<div class='ui-feedback-win'></div>" +
				     "<div class='ui-feedback-txt'>You win!" +
				     "</div></div>")
				    .click(
					function(){
					    self.$win.hide();
					    self.$overlay.hide();
					}
				    )
				    .appendTo(this.element);

		      this.$lose = $("<div class='ui-feedback-over'>" +
				     "<div class='ui-feedback-lose'></div>" +
				     "<div class='ui-feedback-txt'>You lose!" +
				     "</div></div>")
				     .click(
					 function(){
					     self.$lose.hide();
					     self.$overlay.hide();
					 }
				     )
				     .appendTo(this.element);
		      
		      this.$overlay = $('<div></div>')
			  .addClass('ui-feedback-overlay')
			  .appendTo($('body'));

		      

		      $('body')
			  .bind('feedbackCorrect', function(){
				    self.correct();
				})
			  .bind('feedbackIncorrect', function(){
				    self.incorrect();
				});
		     
		  },
		  /** Removes the feedback widget and all related data from the DOM */
		  destroy : function(){
		      this.element.remove();
		      $.widget.prototype.destroy.apply(this, arguments);
		  }

		  
	      });

	      $.ui.feedback.getter = [];
		
		/** Default settings for the feedback widget
		 * @namespace Default settings for the feedback widget
		 * @extends $.ui.feedback
		 */			   
	      $.ui.feedback.defaults = {
	      };

 })(jQuery);