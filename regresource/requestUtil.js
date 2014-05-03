
/**
 * doRequest call the url to service
 * e.q. doParameterRequest(url);
 */
function doRequest(url) {
	var ajaxRequest = new AjaxRequest(arguments[0]);
	ajaxRequest.setUsePOST(); //post��ʽ
	//ajaxRequest.setBeforeSend(doStart); //����֮ǰ
	//ajaxRequest.setComplete(doEnd);
	ajaxRequest.setSuccess(parserXML); //����ɹ�
	ajaxRequest.setError(doError); //����ʧ��

	ajaxRequest.sendRequest();
}
/**
 * doParameterRequest submit the parameters of the specify elementName to service
 * e.q. doParameterRequest(url,elementName1,elementName2,elementName3.....);
 */
function doParameterRequest() {
    var ajaxRequest = new AjaxRequest(arguments[0]);
   ajaxRequest.setUsePOST(); //post��ʽ
	//ajaxRequest.setBeforeSend(doStart); //����֮ǰ
	//ajaxRequest.setComplete(doEnd);
	ajaxRequest.setSuccess(parserXML); //����ɹ�
	ajaxRequest.setError(doError); //����ʧ��

	for(var i = 1; i < arguments.length; i++) {
		ajaxRequest.addNamedFormElements(arguments[i]);
	}
   //ajaxRequest.setEchoDebugInfo();
    ajaxRequest.sendRequest();
}

/**
e.q. doParameterRequest(url,formId);
*/
function doFormRequest(){

	var ajaxRequest = new AjaxRequest(arguments[0]);
	ajaxRequest.setUsePOST();
	//ajaxRequest.setBeforeSend(doStart);
	//ajaxRequest.setComplete(doEnd);
	ajaxRequest.setSuccess(parserXML);
	ajaxRequest.setError(doError);
	ajaxRequest.addFormElements(arguments[1]);
	
	ajaxRequest.sendRequest();
	
	//alert(ajaxRequest.getQueryString());
}

function doStart(){
	//alert('start');
	$("#message").innerTHML="";
}

function doEnd(){
	
}

function doError(){
   $("#message").ajaxError(function(event, request, settings){
   $(this).append("<li>Error requesting page " + settings.data + "</li>");
 });
}

 /**
   ����response��xml
   */
  function parserXML(xml, textStatus){
  	
  	$(xml).find("response").each(function(i){
  		var mode=$(this).attr("mode");
  		if(mode=='text'){
  			var contextID=$(this).attr("contentID");
  			var context=$(this).children("content").text();
  			$("#"+contextID).text(context);
  		}
  		else if(mode=='script'){
  			var js=$(this).children("content").text();
  			eval(js);
  		}
  	});
  }
