/*
*	Karma Framework
*	http://karmaeducation.org
*	
*	Copyright (c)  2009
*	Felipe López Toledo	zer.subzero@gmail.com
*	Bryan W Berry		bryan@olenepal.org
*      
*	Under MIT License
*/

/**
* @fileOverview Contains karma library
* @version 0.2
* @authors Felipe Lopez Toledo <zer.subzero@gmail.com>, Bryan Berry <bryan@karmaeducation.org>
*/

 
/**
 * See <a href="http://jquery.com">jQuery</a>.
 * @name jQuery
 * @exports $ as jQuery
*/


 var Karma = function (options) {
     var karmaRoot;
     var karma; 
     
     return Karma.create(Karma.karma).init(options);

 };

 //helper functions, all in the Karma namespace

 //This emulates the Object.create method in ecmascript 5 spec
 //This isn't a full implementation as it doesn't support
 //Object.defineProperty
 //This has the same functionality as Crockford's beget method
 //and this primary building block for prototypal inheritance in
 //this library
 Karma.create = function (object){
     function F () {};
     F.prototype = object;
     return new F();
 };

 //this is a shallow copy
 Karma.clone = function (object){
     var copy = {};
     for ( var i in object ) {
	 copy[i] = object[i];
     }
     return copy;
 };

 Karma.objectPlus = function (){};

 Karma.newObjectPlus = function (){};


 Karma.karma = {
     
     
     
     init: function(options) {
	 this.name = "karma";
	 this.valid();
	 return this;
     },
     valid: function(options){
	 print('foo');
     }
 };


