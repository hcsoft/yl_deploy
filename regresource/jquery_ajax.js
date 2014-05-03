
function AjaxRequest(requestURL) {
	//�����URL
	var url = requestURL;
	/**
	��������ַ���
	*/
	var queryString = "";
	/*
	(Ĭ��: true) Ĭ�������£����������Ϊ�첽����;�����Ҫ����ͬ�������뽫��ѡ������Ϊ false
	*/
	var async = true;
	/*
	�������������
	*/
	var cache = false;
	/*
	����ʽ
	*/
	var type = "get";
	/*
	���������ص�����
	*/
	var dataType = "xml";
	/*
	��������ǰ���޸� XMLHttpRequest ����ĺ���
	*/
	var beforeSend = null;
	/*
	(Ĭ��: �Զ��ж� (xml �� html)) ����ʧ��ʱ���ú���
	*/
	var error = null;
	/*
	����ɹ���ص��������������������������ݣ����ݸ�ʽ
	*/
	var success = null;
	/*
	������ɺ�ص����� (����ɹ���ʧ��ʱ������)
	*/
	var complete = null;
	
	/**
	*************************************************
	*/
	
	this.setQueryString=function(qs) {
        queryString = qs;
    }
    
    this.getQueryString=function() {
        return queryString;
    }
    
	this.setUsePOST=function() {
		type = "POST";
	}
	this.setUseGET=function() {
		type = "GET";
	}
	this.setAsync=function(asyncBoolean) {
		async = asyncBoolean;
	}
	this.setBeforeSend=function(func){
		beforeSend=func;
	}
	this.setError=function(func){
		error=func;
	}
	this.setSuccess=function(func){
		success=func;
	}
	this.setComplete=function(func){
		complete=func;
	}
	/**
	ajaxRequest.addNameValuePair(name,value);
	*/
	this.addNameValuePair = function(name, value) {
        var nameValuePair = name + "=" + encodeURIComponent(value);
        accumulateQueryString(nameValuePair);
    }
    /**
     ajaxRequest.addNamedFormElementsByFormID("form-id","element-name-1",
     "element-name-2", "element-name-3");
    */
     this.addNamedFormElementsByFormID = function() {
        var elementName = "";
        var namedElements = null;
        
        for(var i = 1; i < arguments.length; i++) {
            elementName = arguments[i];
            namedElements = document.getElementsByName(elementName);
            var arNamedElements = new Array();
            for(j = 0; j < namedElements.length; j++) {
                if(namedElements[j].form  && namedElements[j].form.getAttribute("id") == arguments[0]){
                    arNamedElements.push(namedElements[j]);				
                }
            }
            if(arNamedElements.length > 0){
                elementValues = toQueryString(arNamedElements);
                accumulateQueryString(elementValues);
            }
        }
    }
    /**
    ajaxRequest.addNamedFormElements("element-name-1");
    or
   ajaxRequest.addNamedFormElements("element-name-1", "element-name-2", "element-name-3");
    */
     this.addNamedFormElements = function() {
        var elementName = "";
        var namedElements = null;
        
        for(var i = 0; i < arguments.length; i++) {
            elementName = arguments[i];
            namedElements = document.getElementsByName(elementName);
            
            elementValues = toQueryString(namedElements);
            
            accumulateQueryString(elementValues);
        }
        
    }
    /**
    ajaxRequest.addFormElementsById("element-id-1");
    or
    ajaxRequest.addFormElementsById("element-id-1", "element-id-2", "element-id-3");
    */
     this.addFormElementsById = function() {
        var id = "";
        var element = null;
        var elements = new Array();
        
        for(var h = 0; h < arguments.length; h++) {
            element = document.getElementById(arguments[h]);
            if(element != null) {
                elements[h] = element;
            }
        }
        elementValues = toQueryString(elements);
        accumulateQueryString(elementValues);
    }
	/*
	����ָ����form���ת����String
    */
	this.addFormElements = function (form) {
		var formElements = new Array();
		if (form != null) {
			if (typeof form == "string") {
				var el = document.getElementById(form);
				if (el != null) {
					formElements = el.elements;
				}
			} else {
				formElements = form.elements;
			}
		}
		var values = toQueryString(formElements);
		accumulateQueryString(values);
	}
	
	/** @private */
    function accumulateQueryString(newValues) {
        if(queryString == "") {
            queryString = newValues; 
        }
        else {
            queryString = queryString + "&" +  newValues;
        }
    }
	/** @private */
	function toQueryString(elements) {
		var node = null;
		var qs = "";
		var name = "";
		var tempString = "";
		for (var i = 0; i < elements.length; i++) {
			tempString = "";
			node = elements[i];
			name = node.getAttribute("name");
            //use id if name is null
			if (!name) {
				name = node.getAttribute("id");
			}
			name = encodeURIComponent(name);
			if (node.tagName.toLowerCase() == "input") {
				if (node.type.toLowerCase() == "radio" || node.type.toLowerCase() == "checkbox") {
					if (node.checked) {
						tempString = name + "=" + encodeURIComponent(node.value);
					}
				}
				if (node.type.toLowerCase() == "text" || node.type.toLowerCase() == "hidden" || node.type.toLowerCase() == "password") {
					tempString = name + "=" + encodeURIComponent(node.value);
				}
			} else {
				if (node.tagName.toLowerCase() == "select") {
					tempString = getSelectedOptions(node);
				} else {
					if (node.tagName.toLowerCase() == "textarea") {
						tempString = name + "=" + encodeURIComponent(node.value);
					}
				}
			}
			if (tempString != "") {
				if (qs == "") {
					qs = tempString;
				} else {
					qs = qs + "&" + tempString;
				}
			}
		}
		return qs;
	}
	
	/** @private */
	function getSelectedOptions(select) {
		var options = select.options;
		var option = null;
		var qs = "";
		var tempString = "";
		for (var x = 0; x < options.length; x++) {
			tempString = "";
			option = options[x];
			if (option.selected) {
				tempString = encodeURIComponent(select.name) + "=" + encodeURIComponent(option.value);
			}
			if (tempString != "") {
				if (qs == "") {
					qs = tempString;
				} else {
					qs = qs + "&" + tempString;
				}
			}
		}
		return qs;
	}

  /**
   send a Ajax Request 
  */
   this.sendRequest = function() {
   		$.ajax(
   		{
   		type:type,
   		url:url,
   		data:queryString+ "&ts=" + new Date().getTime(),
   		dataType:dataType,
   		beforeSend:beforeSend,
   		error:error,
   		success:success,
   		complete:complete
   		}
   		);
   }
   
  
};

