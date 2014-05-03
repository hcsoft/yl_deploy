/*!
 * Ext JS Library 3.3.0
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */

Ext.onReady(function(){
	 Ext.get('styleswitcher_select').on('change',function(e,select){
	     var name = select[select.selectedIndex].value;
	     setActiveStyleSheet(name);
	     createCookie("style", name, 365);
	 });
    //=============================================================
    // Stylesheet Switcher
    //=============================================================
   
    
    var cookie = readCookie("style");
    var title = cookie ? cookie : getPreferredStyleSheet();
    Ext.get('styleswitcher_select').dom.value=title;
});