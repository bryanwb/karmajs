/*
*	Karma Framework
*	http://karmaeducation.org
*       
*       This code is licensed under the MIT open-source license	
*	Copyright (c)  2009
*	Felipe López Toledo	zer.subzero@gmail.com
*	Bryan W Berry		bryan@olenepal.org
*      
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

//this.exports is used by narwhal but undefined in other contexts
if(!this.exports) {
    exports = {};
}
    
var Karma = exports.Karma = function (options) {
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

 //this copies all the enumerable properties in source to target
 Karma.objectPlus = function (target, source){
     for ( var i in source){
	 if (source.hasOwnProperty(i)){
	     target[i] = source[i];
	 }
     }
     return target;
 };

 //Creates a new object that is a prototype of the first argument
 // then extends it with the properties of the second argument
 Karma.copyObjectPlus = function (parent1, parent2){
     function F () {};
     F.prototype = parent1;
     var G = new F();
     return Karma.objectPlus(G, parent2);
 };

 Karma.checkLocalised = function ( localised ) {
	 if ( typeof localised === "boolean" ) {
	     return localised;
	 }
     };
     

 

 Karma.karma = {     
     
     init: function(options) {
	 this.name = "karma";
	 this.valid();
	 return this;
     },
     valid: function(options){
     }
 };


