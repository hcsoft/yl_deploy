Ext.ns('app')

$(document).ready(function(){
	InitMainDataService.getWaitDoingData(function(data){
		var ds = data.split(';')
		var params = '/js/app/hyp_visit.js';
		$('div').html('<a id="aaa" href="#">' + ds[0] + '</a>');
	});
});