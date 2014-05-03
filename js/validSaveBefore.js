(function(){
	saveBeforeObj = {
		IsAbortionFn : IsAbortionFn 
	}
	
	function IsAbortionFn(fileNo,name){
		var $type = $('.type').html();
		if($type == 'FirstVistBeforeBorn'){
//			var foreignId = $('#foreignId').html();
//			console.log(foreignId);
			systemInformationUtils.getPersonalInfo(fileNo,function(data){
				var bornStatus = data.bornStatus;
				if(bornStatus == '是'){
					$('#fileNo input').css('display','inline-block');
					$('#fileNo div').html('');
					showInfoObj.Error(name + '还处于孕产期，不能重复做第1次产前随访。')
				}
			});
		}else if($type == 'ChildrenMediExam'){
			var $dataType = $('.dataType').html();
			var msg = '';
			if($dataType == 0){
				msg = '的1岁以内的儿童体检已做';
			}else if($dataType == 1){
				msg = '的1~2岁的儿童体检已做';
			}
			systemInformationUtils.childExamInfo(fileNo,$dataType,function(data){
				console.log(data);
				if(data != null){
					$('.promptMsg').html('<font size = 2>' + name + msg + data + '不能重复再做。</font>');
				}else{
					$('.promptMsg').html('');
				}
			});
		}else if($type == 'ChildrenMediExam36'){
			systemInformationUtils.childExam36Info(fileNo,function(data){
				if(data != null){
					$('.promptMsg').html('<font size = 2>' + name + '的3~6岁儿童体检已做' + data+ '不能重复再做。</font>');
				}else{
					$('.promptMsg').html('');
				}
			});
		}else{
			systemInformationUtils.checkWomanMedicalExam(fileNo,function(data){
				if(data != null){
					$('#gravidity input').val(data);
					$('#gravidity input').attr('readonly','readonly');
					$('#gravidity input').unbind('blur');
				}else{
					$('#gravidity input').val('');
					$('#gravidity input').removeAttr('readonly');
					$('#gravidity input').bind('blur',function(){
						var vals = $(this).val();
	            		if(vals != '' && fileNo != ''){
	            			systemInformationUtils.checkWomanGravidity(fileNo,'VisitBeforeBorn',vals,function(data){
	            				if(data){
	            					$('#' + fieldName + ' input').val('');
	            					showInfoObj.Error('此次怀孕记录已经填写，不允许重复填写。');
	            				}
	            			});
	            		}
					});
				}
			});
		}
	}
})();