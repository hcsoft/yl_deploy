UrlParse = function(){
	//URL解析
};
UrlParse.prototype.parse = function(){
	var url = window.location.search;
	url = url.substring(1,url.length);
	var addressSymble = url.split('&');
	var json = '{';
	for(var i = 0;i<addressSymble.length;i++){
		var equalSymble = addressSymble[i].split('=');
		json = json + equalSymble[0] + ':"' + equalSymble[1] + '",';
	}
	if(json != null){
		return eval('(' + json.substring(0,json.length - 1) + '})');
	}
	return null;
}

var UrlParse = new UrlParse();