function getMsg(id){
	var msg = '';
	if(id == 'distriNo'){
		msg = '行政区划';
	}else if(id == 'minVal'){
		msg = '流水号范围最小值';
	}else if(id == 'maxVal'){
		msg = '流水号范围最大值';
	}
	return msg;
}
function getDataInfo(){
	var json = '';
	var msg = '';
	$('input').each(function(){
		var id = $(this).attr('id');
		var val = $(this).val();
		var ret = certificateObj.validNull(val);
		if(id.indexOf('-')<0){
			if(!ret){
				msg = msg + getMsg(id) + '不允许为空<br />';
			}else{
				json = json + id + ':' + val + ',';
			}
		}
	});
	if(msg != ''){
		Ext.Msg.alert('提示',msg);
		return '';
	}else{
		json = json + 'years:' + $('#years').val();
		return json;
	}
}
Ext.onReady(function() {
	var years = (new Date()).getFullYear();
	for(var i = -1;i<4;i++){
		var tmpYear = years - i;
		$('#years').append('<option value=' + tmpYear + '>' + tmpYear + '</option>');
	}
	
	certificateObj.validNumber('condition');
	var researchPanel = new Ext.FormPanel({
		region : 'north',
		height : 35,
		frame : true,
		layout : "absolute",
		items : [{
			xtype : 'panel',
			layout : 'form',
			x : 0,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'save',
				text : '保存',
				width : 50,
				handler : function(){
					var json = getDataInfo();
					if(json != ''){
						json = '{' + json + '}';
						BirthCertificateMsgService.barCodeInit(json,function(data){
							certificateObj.clearAllInput('distriNo','barCodeInit');
							$('#distriNo').val('5301');
							Ext.Msg.alert('提示','保存成功');
							$('#showResultInfo').html('<font color=red size=2>您已经成功初始化' + data.successNum + '个条形码编号。</font>')
						});
					}
				}
			}]
		},{
			xtype : 'panel',
			layout : 'form',
			x : 60,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'delete',
				text : '删除',
				width : 50,
				handler : function(){
						var json = getDataInfo();
						if(json != ''){
							json = '{' + json + '}';
							BirthCertificateMsgService.barCodeDel(json,function(data){
								certificateObj.clearAllInput('distriNo','barCodeInit');
								$('#distriNo').val('5301');
								Ext.Msg.alert('提示','删除成功');
								var failureInfo = data.failureStr;
								if(failureInfo != ''){
									$('#showResultInfo').html('<font color=red size=2>您已经成功删除' + data.failureNum + '个条形码编号；'
											+ '但是编号：' + data.failureStr + '没有删除成功。</font>')
								}else{
									$('#showResultInfo').html('<font color=red size=2>您已经成功删除' + data.failureNum + '个条形码编号。</font>')
								}
								
							});
						}
					}
			}]
		},{
			xtype : 'panel',
			layout : 'form',
			x : 120,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'cancel',
				text : '取消',
				width : 50,
				handler : function(){
					certificateObj.clearAllInput('distriNo','barCodeInit');
				}
			}]
		}]
	});
	
	new Ext.Viewport({
	    items: [researchPanel]
	});
});