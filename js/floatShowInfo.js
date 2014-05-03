$(document).ready(function(){
	var browerName = navigator.appName;
	var browerVersion = navigator.appVersion;
	if(browerName == "Microsoft Internet Explorer" && browerVersion.indexOf("MSIE 6.0") > 0){
		$(".showInfo_Child_Woman").css("position","absolute");
	}
	$(".showInfo_Child_Woman").css("top",(document.documentElement.clientHeight - 200)/2 + document.body.scrollTop + "px");
	
	$('.showInfo_close').click(function(){
		$('.showInfo_Child_Woman').css('display','none');
	});
})