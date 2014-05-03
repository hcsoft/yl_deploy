$(document).ready(function(){
	TestService.get(function(data){
		$('div').html(data);
//		alert($('div').html());
	});
});