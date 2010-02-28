/* Copyright Bryan W Berry, 2009, 
 * under the MIT license http://www.opensource.org/licenses/mit-license.php
 * 
 * this library is heavily influenced by the GNU LIBC library
 *  http://www.gnu.org/software/libc/manual/html_node/Locales.html
 */

(function($){
    // PG: Maybe put everything in namespace i18n and rename the following function $.i18n.gettext?

     $.i18n = function(string, locale){
	 var lang = locale || $.i18n.lang;
	 if (!$.i18n[lang] || !$.i18n[lang].strings){
	     return string;
	 }
	 return this.i18n[lang].strings['default'][string]||string;
     };

    $.i18n.cgettext = function(context, string, locale){
	 var lang = locale || $.i18n.lang;
	 if (!this.i18n[lang] || !this.i18n[lang].strings){
	     return string;
	 }
	 return this.i18n[lang].strings[context][string]||string;
     };

    // You can override this in messages.<lang>.json.
    $.i18n.choose_pluralized_msg = function (choices, n) {
        return n == 1 ? choices[0] : choices[1];
    };

    $.i18n.ngettext = function (msgid1, msgid2, n) {
        var lang = $.i18n.lang;
        if (!$.i18n[lang] || !$.i18n[lang].strings) {
            return $.i18n.choose_pluralized_msg([msgid1, msgid2], n);
        }
        // Is using msgid1 as the key ok?
        return $.i18n.choose_pluralized_msg($.i18n[lang].strings[msgid1]
                                            || [msgid1, msgid2],
                                            n);
    };

     $._ = $.i18n;
     $._c = $.i18n.cgettext;

     $.i18n.setLocale = function (locale){
	 $.i18n.lang = locale;
     };

     $.i18n.getLocale = function (){
	 return $.i18n.lang;
     };


     /**
      * Converts a number to numerals in the specified locale. Currently only
      * supports devanagari numerals for Indic languages like Nepali and Hindi
      * @param {Number} Number to be converted
      * @param {locale} locale that number should be converted to
      * @returns {String} Unicode string for localized numeral 
      */
     $.i18n._n = function(num, locale){

	 locale = locale || $.i18n.lang;

	 if (!this.i18n[locale] || !this.i18n[locale].numeralBase ){
	     return num;
	 }


	 //48 is the base for western numerals
	 var numBase = $.i18n[$.i18n.lang].numeralBase || 48;
	 var prefix =  $.i18n[$.i18n.lang].numeralPrefix || "u00";
     
	 var convertDigit = function(digit){	     
	     return '\\' + prefix + 
		 (numBase + parseInt(digit)).toString(16);
	 };
	 
	 var charArray = num.toString().split("").map(convertDigit);
	 return eval('"' + charArray.join('') + '"');
     };

     $._n = $.i18n._n;

     /* ToDo
      * implement sprintf
      * conversion functions for monetary and numeric 
      * sorting functions (collation) for different locales
      */

 })(jQuery);


