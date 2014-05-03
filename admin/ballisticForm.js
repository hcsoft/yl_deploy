function closeForm(obj){
	$("#" + obj).css("display","none");
}

function openForm(obj){
	$("#" + obj).css("display","block");
}

function hideForm(obj){
	$("#" + obj).hide("slow");
}


$(document).ready(function(){
	
	//读取服务器数据
	StatisticService.queryTotalFiles(function(data){
		if(data.length > 0){
			for(var i = 0;i<data.length;i++){
				$("#s" + i).html(data[i] + "&nbsp;");
			}
		}
	});
	StatisticService.queryWorking(function(data){
		if(data.length > 0){
			for(var i = 0;i<data.length;i++){
				$("#as" + i).html("&nbsp;" + data[i] + "&nbsp;");
			}
		}
	});
	//新的弹出窗口布局操作
	//设置弹出窗口显示的位置
	var xScreen_new = document.body.clientWidth - 250;
	var yScreen_new = document.body.clientHeight - 306;
	$("#ballisticForm_new").css("margin-left",xScreen_new + "px");
	$("#ballisticForm_new").css("margin-top",yScreen_new + "px");
	$("#statistic_close").click(function(){
		hideForm("statistic_content");
		hideForm("left_ballisticForm_title");
	});
	
	$("#prompt_close").click(function(){
		closeForm("prompt_content");
	});
	$("#prompt_open").click(function(){
		openForm("prompt_content");
	});
	
	//10秒钟自动关闭窗口
	setTimeout("hideForm('statistic_content')",10000);
	setTimeout("hideForm('left_ballisticForm_title')",10000);
	setTimeout("closeForm('prompt_content')",10000);
});