/*
 * Pure JavaScript Browser Environment
 *   By John Resig <http://ejohn.org/>
 * Copyright 2008 John Resig, under the MIT License
 */


// The Window Object
var __this__ = this;
this.__defineGetter__('window', function(){
  return __this__;
});

try{
(function($w, $env){
        