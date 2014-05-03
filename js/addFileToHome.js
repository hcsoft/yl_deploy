var homeId,fileNo;
function getInfo(data){
	homeId = $("#homeId span").html();
	fileNo = $("#fileNo span").html();
	if(homeId == ""){
		Ext.Msg.show({
			title:'提示',
			msg : '请您先创建户籍信息！',
			buttons : Ext.Msg.OK,
			icon : Ext.Msg.ERROR
		});
		return -1;
	}
	
	if(fileNo == null || fileNo == ""){
		var msg;
		if(data == 1)
			msg = '请选择要移除的档案信息！';
		else if(data == 0)
			msg = '请选择要添加到户的档案信息！';
		Ext.Msg.show({
			title:'提示',
			msg : msg,
			buttons : Ext.Msg.OK,
			icon : Ext.Msg.ERROR
		});
		return -1;
	}
}
$(document).ready(function(){
	var url = window.location.search;
	if(url.indexOf("homeId") < 0){
		$("#newHide").hide();
//		$("#newPerson").hide();
	}
	$("#saveToHome").click(function(){
		if(getInfo(0) == -1)
			return;
		HomeInfoService.saveToHome(homeId,fileNo,function(data){
			if(data >= 1){
				Ext.Msg.show({
					title:'提示',
					msg : '添加成功！',
					buttons : Ext.Msg.OK,
					icon : Ext.Msg.INFO
				});
			}else{
				var result = data.split(",");
				var msg = "该档案已经在户编号为：" + result[0] + "，户主为：" + result[1] + "的户籍下不能重复添加！";
				Ext.Msg.show({
					title:'提示',
					msg : msg,
					buttons : Ext.Msg.OK,
					icon : Ext.Msg.ERROR
				});
			}
		});
	});
	
	$("#delFromHome").click(function(){
		if(getInfo(1) == -1)
			return;
		HomeInfoService.delFromHome(homeId,fileNo,function(data){
			var msg;
			if(data == 0){
				Ext.Msg.show({
					title:'提示',
					msg : '移除成功',
					buttons : Ext.Msg.OK,
					icon : Ext.Msg.INFO
				});
				return;
			}else if(data == -1){
				msg = '编号为：' + fileNo + '的档案还没有添加到户';
			}else if(data == -2){
				msg = '编号为：' + fileNo + '的档案不是户编号为：' + homeId + '的档案';
			}else if(data == -3){
				msg = '编号为：' + fileNo + '移除失败';
			}
			Ext.Msg.show({
				title:'提示',
				msg : msg,
				buttons : Ext.Msg.OK,
				icon : Ext.Msg.ERROR
			});
		});
	});
	
	
	$('.districtNumber').html($('#districtNumber INPUT').val());
	var url = window.location.href;
	if(url.indexOf('homeId') > 0){
		$('#homeId>INPUT').attr('disabled','disabled');
		$('#homeId>INPUT').attr('size','18');
	}
});