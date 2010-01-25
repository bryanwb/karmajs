/**
* @fileOverview a scoreboard widget
* @author Bryan Berry <bryan@olenepal.org> 
*  uses MIT License
*/



(function($){

     // This is a dummy function, just here as placeholder to
     // to make the jsdoc tool happy
     /** @name $.ui.kFooter
      * @namespace KFooter widget
      */
     $.ui.kFooter = function(){};

     $.widget('ui.kFooter',
	      /** @lends $.ui.kFooter.prototype */
	      {
		  /** Gets the current score
		   * @returns {Number} current score
		   */
		  getScore : function(){
		      return this._getData('score');
		  },
		   /** Sets the current score
		   * @param {Number} newScore new score
		   */
		  setScore : function(newScore){
		      this._setData('score', parseInt(newScore));
		      this._refresh();
		  },
		  /** Gets the current total
		   * @returns {Number} current total
		   */
		  getTotal : function(){
		      return this._getData('total');
		  },
		  /** Sets the current total
		   * @param {Number} newTotal new score
		   */
		  setTotal : function(newTotal){
		      this._setData('total', parseInt(newTotal));
		      this._refresh();  
		  },
		  /**
		   * Restarts the kFooter and triggers the "kFooterRestart" event
		   */
		  restart : function(){
		      this.element.trigger('kFooterRestart');
		      this._setData('score', this._getData('initialScore'));
		      this._setData('total', this._getData('initialTotal'));
		      this._refresh();
		  },
		  /** Increments the score by 1 or by the supplied numeric argument
		   * @param {Number} [val] increment value
		   */
		  inc : function(val){
		      var incVal = parseInt(val) || 1;
		      this._setData('score',  this._getData('score') + incVal);
		      this._refresh();
		      if(this._getData('winScore') === this._getData('score')){
			  this.element.trigger('kFooterWinGame');
		      }
		  },
		   /** Increments the total by 1 or by the supplied numeric argument
		   * @param {Number} [val] increment value
		   */
		  incTotal : function(val){
		      var incVal = parseInt(val) || 1;
		      this._setData('total',  this._getData('total') + incVal);
		      this._refresh();
		  },
		   /** Decrements the score by 1 or by the supplied numeric argument
		   * @param {Number} [val] decrement value
		   */
		  dec : function(val){
		      var decVal = parseInt(val) || 1;
		      this._setData('score',  this._getData('score') - decVal);
		      this._refresh();
		  },
		   /** Decrements the total by 1 or by the supplied numeric argument
		   * @param {Number} [val] decrement value
		   */
		  decTotal : function(val){
		      var decVal = parseInt(val) || 1;
		      this._setData('total',  this._getData('total') - decVal);
		      this._refresh();
		  },
		  _ : function(val){
		      var self = this;
		      var convertNumLocale = function(num){
			  //48 is the base for western numerals
			  var convertDigit = function(digit){
			  
			      var numBase = 48;
			      var prefix = "u00";
			      
			      if (self._getData('locale') === "ne"){
				  prefix = "u0";
				  numBase = 2406;
			      }
			 
			      return '\\' + prefix + 
			      		  (numBase + parseInt(digit)).toString(16);
			  };
			  
			  var charArray = num.toString().split("").map(convertDigit);
			  return eval('"' + charArray.join('') + '"');
		      };
		      
		      var convertStringLocale = function (str){
			  if (self._getData('locale') === "ne"){
			      switch(str){
				  case "Score":
				      return "अङ्क";
				  case "Total":
				      return "जम्मा";
				  case "Play Again":
				      return "फेरी खेलौ";
				  case "Pause":
				      return "खेल रोकौ";
				  case "Start":
				      return "सुरु गरौ";
				  default:
				      return "string not translated";
			      }
			  }
			      return "String really not translated";
		      };    
			  
		      
		      
		      if (typeof val === "number"){
			  return convertNumLocale(val);
		      }
		      
		      if (this._getData('locale') !== "en"){
			  return convertStringLocale(val);
		      }else {
			  return val;
		      }

	  
		  },
		  _init : function(){

		      var divDisplay = "inline";
		      var score = this.options.score;
		      var total = this.options.total;
		      var self = this;
		      
		      var options = $.extend({}, $.ui.kFooter.defaults, this.options);

		      this._setData('initialScore', parseInt(options.score));
		      this._setData('initialTotal', parseInt(options.total));
		      this._setData('score', parseInt(options.score));
		      this._setData('total', parseInt(options.total)); 
		      this._setData('winScore', parseInt(options.winningScore)); 
		      this._setData('locale', options.locale);

		     
		      this.element.addClass('ui-widget ui-widget-content ' +
			      ' ui-kFooter-container');

		      var $parent = $('<div>')
			  .addClass('ui-kFooter-spacing');
		     
		      this._scoreText = $('<div><span>' + this._("Score") + 
					  "</span></div>")
			  .addClass('ui-kFooter-spacing ui-kFooter-left ui-kFooter-text')
			  .appendTo($parent);

		      this._score = $("<div><span>" + this._(score) + "</span></div>")
		          .addClass('ui-kFooter-spacing ui-kFooter-left' +
				    ' ui-kFooter-text ui-kFooter-number')
			  .find('span')
		          .addClass('ui-corner-all')
			  .end()
			  .appendTo($parent)
			  .find('span:first');


		     $("<div><span>" + this._("Total") + "</span></div>")
			  .addClass('ui-kFooter-spacing ui-kFooter-left' +
				    ' ui-corner-all ui-kFooter-text')
			  .appendTo($parent);

		      this._total = $("<div><span>" + this._(total) + "</span></div>")
		          .addClass('ui-kFooter-spacing ui-kFooter-left' +
				    ' ui-kFooter-text ui-kFooter-number')
			  .find('span')
		          .addClass('ui-corner-all')
			  .end()
			  .appendTo($parent)
			  .find('span:first');


		      var $templateBtn = $('<button></button>')
			      .addClass('ui-kFooter-spacing ui-corner-all ' +
				  ' ui-state-default ui-kFooter-right ui-kFooter-button')
			      .append(
				  $('<span></span>')
				      .addClass('ui-icon ui-kFooter-icon')
			      )
			      .append( 
				      $('<span></span>')
					  .addClass('ui-kFooter-button-text')
			      );
		       
		      if(options.restartButton){
			  var $restartBtn = $templateBtn.clone()
			      .find('span:first')
			      .addClass('ui-icon-arrowrefresh-1-w') 
			      .end()
			      .find('span:last') 
			      .text(this._('Play Again'))
			      .end()
			      .click(function(){ self.restart();})
			      .appendTo($parent);	  
		      }   


		      if(options.pauseButton){

			  var $pauseBtn = $templateBtn.clone()
			    .find('span:first') //
			    .removeClass('ui-icon-arrowrefresh-1-w')
			    .addClass('ui-icon-pause') 
			    .end()
			    .find('span:last') 
			    .text(this._('Pause'))
			    .end()
			    .click(function(){ 
				       self.element.trigger('kFooterPause'); 
				   })
			    .appendTo($parent);
		      }

		      if(options.startButton){
			  var $startBtn = $templateBtn.clone()
			      .find('span:first')
		              .addClass('ui-icon-play')
		              .end()
			      .find('span:last')
			      .text(this._('Start'))
		              .end()
			      .click(function(){ 
				       self.element.trigger('kFooterStart'); 
				   })
			      .appendTo($parent);
		      }


		      $parent.find('button').hover(
			      function(){ 
				  $(this).addClass("ui-state-hover"); 
			      },
			      function(){ 
				  $(this).removeClass("ui-state-hover"); 
			      });

		      this.element.append($parent);

		  },
		  _refresh : function(){
		      this._score.text(this._(this._getData('score')));
		      this._total.text(this._(this._getData('total')));
		  },
		  /** Removes the kFooter widget and all related data from the DOM */
		  destroy : function(){
		      this.element.remove();
		      $.widget.prototype.destroy.apply(this, arguments);
		  }

		  
	      });

	      $.ui.kFooter.getter = ['getScore', 'getTotal', '_convertNumLocale'];
		
		/** Default settings for the kFooter widget
		 * @namespace Default settings for the kFooter widget
		 * @extends $.ui.kFooter
		 */			   
	      $.ui.kFooter.defaults = {
                  /** Initial score
		   * @type Number 
		   * @default 0
		   */
		  score: 0, 
		  /** Initial total
		   * @type Number
		   * @default 0
		   */
		  total: 0, 
		  /** The score that will win the game
		   * @type Number
		   * @default 0
		   */
		  winningScore: 0,
		  /** Default locale, valid options are "en" and "ne" 
		   * @type String
		   * @default "en"
		   */
		  locale: "ne",
		  /** Display the Start Button
		   * @type boolean
		   * @default false
		   */
		  startButton: true,
		  /** Display the Retart Button
		   * @type boolean
		   * @default true
		   */
		  restartButton: true,
		  /** Display the Pause Button
		   * @type boolean
		   * @default false
		   */
		  pauseButton: true
	      };

 })(jQuery);