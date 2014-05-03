(function(){
	var json = parseParams(window.location.search);
	console.log(json);
	if(json.foreignId != undefined){
		systemInformationUtils.getHistoryExamId(json.foreignId,services.tableName,function(data){
			if(data != null){
				window.location = window.location.pathname + '?id=' + data;
			}
		});
	}
	
	healthBookSingleObj = {
		loadRecord : loadRecord,
		getIsSetForm : getIsSetForm,
		setIsSetForm : setIsSetForm,
		singleSave : singleSave
	}
	function singleSave(){
		document.location.reload();
	}
	
	function setForm(d){
		 for(var prop in d) {
             if(d.hasOwnProperty(prop)) { 
                 var c = fieldsArray[prop];
                 if (c && c['val']){
                 	if(d[prop] == null)
                 		d[prop] = '';
                 	else if(prop == 'idnumber' && d[prop] == '')
                 		d[prop] = '5301'
                     c.val(d[prop]);
                 }
             }//if
         } //for
	}
	var isSetForm = false;
	function getIsSetForm(){
		return isSetForm;
	}
	function setIsSetForm(v){
		isSetForm = v;
	}
	function loadRecord(foreignId,tableName){
		setIsSetForm(true);
		systemInformationUtils.getSimgleHistoryExamRecord(foreignId,tableName,function(d){
			if(d != null){
				setForm(d);
			}else{
				setIsSetForm(false);
			}
		});
	}
})();