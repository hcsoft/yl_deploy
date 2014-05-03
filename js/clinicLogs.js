function booleanToChina(bool){
	if(bool)
		return "是";
	return "否";
}

function queryBasicInfo(){
	ClinicLogsService.getPersonalInfo($("#fileNo INPUT").val(), function(data) {
		if(data.length > 0){
			$("#s_fileNo").html("档案编号：" + $("#fileNo INPUT").val());
			$("#s_name").html("姓名：" + data[0]);
			$("#s_sex").html("性别：" + data[2]);
			$("#s_age").html("年龄：" + ((new Date()).getFullYear() - data[3].getFullYear()) + "岁");
			$("#s_address").html("地址：" + data[1]);
			$("#s_hypertensionVisit").html("高血压：" + booleanToChina(data[4]));
			$("#s_furiousInfo").html("重性精神病：" + booleanToChina(data[5]));
			$("#s_diabetesVisit").html("2型糖尿病：" + booleanToChina(data[6]));
			$("#s_allergies").html("药物过敏史：" + data[7]);
			$("#s_info").show();
		}else{
			Ext.Msg.alert("错误","请输入正确的编号！！！");
		}
	});
}

$(document).ready(function() {
	var url = window.location.href;
	if(url.indexOf("id") > 0){
		$("#fileNo INPUT").attr("disabled","disabled");
	}
	$("#submit").click(function() {
		queryBasicInfo();
	});
	$("#fileNo").keydown(function(event){
		if(event.keyCode == 13){
			queryBasicInfo();
		}
	});
});