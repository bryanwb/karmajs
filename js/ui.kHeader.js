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
	      {	  _ : function(val, loc){
		      if($.i18n){
			  return $.i18n.call($.ui.kHeader, val, loc);
		      }
		      return val;
		  },
		  _n : function(val, loc){
		      if ($.i18n){
			  return $._n(val, loc);
		      }
		      return val;
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
			      "<span>" + options.title + 
			      "</span></li>")
			      .appendTo($kHeader);
		      
		      

		      if (options.lessonPlan || options.teacherNote){
			  
			  var $dropDownArrow = $("<span class='kHeader-kDoc right'>" +
			      "</span>")
			      .appendTo($lessonTitle);

			  var $dropDownArea = $("<div class='drop-down'></div>");
			  
			  if (options.lessonPlan){
			      $("<div>" + 
				"<a href='./kDoc.html?back=index.html&doc=lessonPlan'>" + 
				this._("Lesson Plan") + "</a></div>")
				.appendTo($dropDownArea);
			  }

			  if (options.teachersNote){
			      $("<div>" + 
				"<a href='./kDoc.html?back=index.html&doc=teachersNote'>" + 
				this._("Teacher's Note") + "</a></div>")
				.appendTo($dropDownArea);
			  }
			  
			  $dropDownArea.appendTo($dropDownArrow);
			  
			   $dropDownArrow.hover(
			      function(){				  
				  $dropDownArea.show();
			      },
			      function(){
				  $dropDownArea.hide();
			      }
			      );
			  
		      }

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

		      //0-width divs that hold hover imgs for pre-loading
		      var $preloadImgDivs = $("<div class='kHeader-preload-img " +
					      "kHeader-preload-back'></div>" +
					     "<div class='kHeader-preload-img " +
					      "kHeader-preload-zoom-in'></div>" +
					     "<div class='kHeader-preload-img " +
					      "kHeader-preload-zoom-out'></div>" +
					     "<div class='kHeader-preload-img " +
					      "kHeader-preload-ole'></div>" +
					     "<div class='kHeader-preload-img " +
					      "kHeader-preload-help'></div>" +
					     
					     );
					       .appendTo($kHeader);
		      
		  },
		  /** Removes the kHeader widget and all related data from the DOM */
		  destroy : function(){
		      this.element.remove();
		      $.widget.prototype.destroy.apply(this, arguments);
		  }

		  
	      });

	      $.ui.kHeader.getter = [];
     
	      $.ui.kHeader.i18n = {};
     
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
		  /** Creates drop-down with link to lesson plan
		   * @type boolean or string file path to lesson plan
		   * @default false
		   */
		  lessonPlan: false,
		  /** Creates drop-down with link to teachersNote
		   * @type boolean or string file path to teachersNote
		   * @default false
		   */
		  teachersNote: false,
		  /** Id of element containing help text
		   * @type String 
		   * @default "kHelp"
		   */
		  help: "kHelp"
	      };

 })(jQuery);