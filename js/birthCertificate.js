function getDataInfo(){
	var json = '';
	var msg = '';
	$('input').each(function(){
		var id = $(this).attr('id');
		var val = $(this).val();
		if(id == 'prefCertificateId'){
			var ret = certificateObj.validNull(val);
			if(!ret){
				msg = '出生医学证明前缀是必须的<br />';
			}else{
				json = json + id + ':' + val + ',';
			}
		}else{
			json = json + id + ':' + val + ',';
		}
	});
	if(msg != ''){
		Ext.Msg.alert('提示',msg);
		return '';
	}else{
		json = json.substring(0,json.length - 1);
		return json;
	}
}
Ext.onReady(function() {
	var con = 2;
	certificateObj.validNumber('condition');
	certificateObj.compareNumber('endConditions','startCondition');
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
				name : 'newCondition',
				text : '新增条件',
				width : 80,
				handler : function(){
					var otherCondition = $('#otherCondition');
					otherCondition.parent('td').parent('tr').before('<tr><td>条件' + con + '：</td>' +
							'<td><input type="text" id="startCondition'+ con + '" class="condition"/>至' +
							'<input type="text" id="endCondition'+ con +'" class="endConditions"/></td></tr>');
					con = con + 1;
					certificateObj.validNumber('condition');
					certificateObj.compareNumber('endConditions','startCondition');
				}
			}]
		},{
			xtype : 'panel',
			layout : 'form',
			x : 90,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'newCondition',
				text : '删除条件',
				width : 80,
				handler : function(){
					if(con > 2){
						con = con - 1;
						$('#startCondition' + con).parent('td').parent('tr').remove();
					}
				}
			}]
		},{
			xtype : 'panel',
			layout : 'form',
			x : 180,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'save',
				text : '保存',
				width : 50,
				handler : function(){
					var json = getDataInfo();
					if(json != ''){
						BirthCertificateMsgService.initCertificateId(json,function(data){
							certificateObj.clearAllInput('prefCertificateId','certificateInit');
							Ext.Msg.alert('提示','保存成功');
							$('#showResultInfo').html('<font color=red size=2>您已经成功初始化' + data.successNum + '个出生证明编号。</font>')
						});
					}
				}
			}]
		},{
			xtype : 'panel',
			layout : 'form',
			x : 240,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'delete',
				text : '删除',
				width : 50,
				handler : function(){
						var json = getDataInfo();
						if(json != ''){
							BirthCertificateMsgService.deleteInitCertificateId(json,function(data){
								certificateObj.clearAllInput('prefCertificateId','certificateInit');
								Ext.Msg.alert('提示','删除成功');
								var failureInfo = data.failureCertificate;
								if(failureInfo != ''){
									$('#showResultInfo').html('<font color=red size=2>您已经成功删除' + data.failureNum + '个出生证明编号；'
											+ '但是编号：' + data.failureCertificate + '没有删除成功。</font>')
								}else{
									$('#showResultInfo').html('<font color=red size=2>您已经成功删除' + data.failureNum + '个出生证明编号。</font>')
								}
								
							});
						}
					}
			}]
		},{
			xtype : 'panel',
			layout : 'form',
			x : 300,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'cancel',
				text : '取消',
				width : 50,
				handler : function(){
					certificateObj.clearAllInput('prefCertificateId','certificateInit');
				}
			}]
		}]
	});
	
	new Ext.Viewport({
	    items: [researchPanel]
	});
});