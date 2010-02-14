/**
* @fileOverview a Header widget
* @author Bryan Berry <bryan@olenepal.org> 
*  uses MIT License
*/



(function($){

     // This is a dummy function, just here as placeholder to
     // to make the jsdoc tool happy
     /** @name $.ui.kHeader
      * @namespace kHeader widget 
      * @example  
      */
     $.ui.kHeader = function(){};

     $.widget('ui.kHeader',
	      /** @lends $.ui.kHeader.prototype */
	      {
		   _ : function(val, loc){
		      var self = this;
		      var locale = self._getData('locale') || loc;
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
				  case "":
				      return "";
				  default:
				      return "string not translated";
			      }
			  }
			      return "String really not translated";
		      };    
			  
		      
		      
		      if (typeof val === "number"){
			  return convertNumLocale(val);
		      }
		      
		      if (locale !== "en"){
			  return convertStringLocale(val);
		      }else {
			  return val;
		      }

	  
		  },
		  _init : function(){		      
		      var options = $.extend({}, $.ui.kHeader.defaults, this.options);
		     
		      this.element.addClass('ui-widget ui-widget-content');

		      var $kHeader = $("<ul></ul>");
		      
		      var backLink = "#";
		      var urlParams = window.location.search.slice(1).split('&');
		      if (urlParams){
			  backLink = urlParams[0].split('=')[1];
		      }
			  
		      var $backBtn = $("<li class='left'> <a href='" + backLink + 
			      "' class='kHeader-btn kHeader-back'></a></li>")
			      .appendTo($kHeader);
		      
		      var $lessonTitle = $("<li class='left kHeader-title'>" + 
			      "<span>" + options.title + "</span><span class='ui-widget-header ui-icon " +
			      "ui-icon-carat-1-s'></span></li>")
			      .appendTo($kHeader);

		      if(options.zoom === true){
			  
			  var iframeScale = 1.0;
			  var translateY = 0;
			  var getIframeStyle = function(){
			         return window.frames[0].document.body.style;
			  };

			  var zoomIn = function(){
			      var iframeStyle = getIframeStyle();
			      iframeScale = iframeScale + 0.1;
			      translateY = translateY + 50;
			      var scale = 'scale(' + iframeScale + ')';
			      var translate = "translate(0px, " + translateY + "px)";

			      iframeStyle.MozTransform = scale + ' ' + translate;
			      iframeStyle.WebkitTransform = scale + ' ' + translate;
 			  };

			  var zoomOut = function(){
			      var iframeStyle = getIframeStyle();
			      iframeScale = iframeScale - 0.1;
			      translateY = translateY - 50;
			      
			      var scale = 'scale(' + iframeScale + ')';
			      var translate = "translate(0px, " + translateY + "px)";


			      iframeStyle.MozTransform = scale + ' ' + translate;
			      iframeStyle.WebkitTransform = scale + ' ' + translate;

			  };

			  $("<li class='left kHeader-zoomIn kHeader-btn'>" +
			      " </li>")
			      .click(zoomIn)
			      .appendTo($kHeader);

			  $("<li class='left kHeader-zoomOut " + 
				  "kHeader-btn'> </li>")
			      .click(zoomOut)
			      .appendTo($kHeader);
		      }

		      
		      
		      if($('#' + options.help).length){
			  if($.ui.dialog){
			      var $help = $('#'+ options.help)
					      .dialog({
						  position:[ "right", "top"], 
						  modal:'true',autoOpen:false,width:500,
						  height: 400,
						  dialogClass: 'kHeader-help'
					      });
			  } else {
			      
			      if(console){
				  console.log("You need to add the jQuery UI dialog" +
					      " widget in order to use Help feature.");
			      }
			  }

		      }

		      $("<li class='right'> <a href='#'"  +
			      "' class='kHeader-btn kHeader-help'></a></li>")
			      .click(function(){ 
					 if($.ui.dialog && $help){
					     $help.dialog('open');
					 }
				     })
			      .appendTo($kHeader);
		      

		      $("<li class='right'> <a href='http://olenepal.org'"  +
			      "' class='kHeader-btn kHeader-brand'" +
			      "title='साझा शिक्षा ई-पाटी'></a></li>")
			      .appendTo($kHeader);

		      this.element.append($kHeader);
		      
		  },
		  /** Removes the kHeader widget and all related data from the DOM */
		  destroy : function(){
		      this.element.remove();
		      $.widget.prototype.destroy.apply(this, arguments);
		  }

		  
	      });

	      $.ui.kHeader.getter = [];
		/** Default settings for the kHeader widget
		 * @namespace Default settings for the kHeader widget
		 * @extends $.ui.kHeader
		 */			   
	      $.ui.kHeader.defaults = {
                  /** title
		   * @type String 
		   * @default ""
		   */
		  title: "",
		  /** Turns on zoom buttons
		   * @type boolean 
		   * @default false
		   */
		  zoom: false,
		  /** Id of element containing help text
		   * @type String 
		   * @default "kHelp"
		   */
		  help: "kHelp"
	      };

 })(jQuery);