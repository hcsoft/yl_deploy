/**
 * dwrloader - jQuery EasyUI
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2012 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($){
	/**
	 * get default json loader
	 */
	function getJsonLoader(pluginName){
		return function(param, success, error){
			var opts = $(this)[pluginName]('options');
			console.log(opts);
			if (!opts.url) return false;
			$.ajax({
				type:opts.method,
				url:opts.url,
				data:param,
				dataType:'json',
				success:function(data){
				    console.log(data)
					success(data);
				},
				error:function(e1,e2){
				    console.log(e1)
				    console.log(e2)
					error.apply(this, arguments);
				}
			});
		}
	}
	
	/**
	 * get dwr data loader
	 */
	function getDwrLoader(pluginName){
		return function(param, success, error){
			var opts = $(this)[pluginName]('options');
			console.log(opts);
			if (!opts.url) return false;
			var dwrFunc = eval(opts.url);
			dwrFunc(param, {
				callback: function(data){
				    console.log(data)
					success(data);
				},
				exceptionHandler: function(){
					error.apply(this, arguments);
					console.log(error)
				}
			});
		}
	}
	
	$.fn.combobox.defaults.loader = getDwrLoader('combobox');
	$.fn.tree.defaults.loader = getDwrLoader('tree');
	$.fn.treegrid.defaults.loader = getDwrLoader('treegrid');
	//$.fn.datagrid.defaults.loader = getDwrLoader('datagrid');
	$.fn.propertygrid.defaults.loader = getDwrLoader('propertygrid');
})(jQuery);
