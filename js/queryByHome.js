function add0(args){
	if(args < 10){
		args = '0' + args;
	}
	return args;
}

function formatDate(date){
	if(date == null || date == '')
		return '&nbsp;';
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	return year + '-' + add0(month) + '-' + add0(day);
}

function removeNull(args){
	if(args == null || args == '')
		args = '&nbsp;';
	return args;
}

function exceptionDescri(args,argsOther){
	if(args == '异常'){
		if(argsOther != null && argsOther != ''){
			args = args + '，异常描述：' + argsOther;
		}
	}
	return args;
}

Ext.onReady(function(){
	var url = window.location.href;
	var fileNo = url.substring(url.indexOf('=')+1,url.length);
	if(fileNo.indexOf('#') > 0){
		fileNo = fileNo.substring(0,fileNo.length - 1);
	}
	var ids = new Array();
	PersonalInfoService.getPersonInfo(fileNo,function(data){
		var result = data.split(",");
		var personName = result[1];
		var birthday = result[2];
		birthday = birthday.split(' ')[0];
		var sex = result[3];
		var panelTitle = '编号：' + result[0] + '&nbsp;&nbsp;&nbsp;&nbsp;姓名：' + personName + '&nbsp;&nbsp;&nbsp;&nbsp;性别：' + sex
			+ '&nbsp;&nbsp;&nbsp;&nbsp;出生日期：' + birthday ;
		var htmlAction = '';
		if(sex == '男'){
			htmlAction = '<div id="actionContainer"><table><tr><td><input type="text" value="1"/><a href="#"><img src="/image/next.gif"/>&nbsp;健康体检记录</a></td></tr>'
				+ '<tr><td><input type="text" value="2"/><a href="#"><img src="/image/next.gif"/>&nbsp;新生儿家庭访视记录</a></td></tr>'
				+ '<tr><td><input type="text" value="3"/><a href="#"><img src="/image/next.gif"/>&nbsp;1岁以内儿童体检记录</a></td></tr>'
				+ '<tr><td><input type="text" value="4"/><a href="#"><img src="/image/next.gif"/>&nbsp;1岁至2岁儿童体检记录</a></td></tr>'
				+ '<tr><td><input type="text" value="5"/><a href="#"><img src="/image/next.gif"/>&nbsp;3岁儿童体检记录</a></td></tr>'
				+ '<tr><td><input type="text" value="10"/><a href="#"><img src="/image/next.gif"/>&nbsp;高血压患者随访记录</a></td></tr>'
				+ '<tr><td><input type="text" value="11"/><a href="#"><img src="/image/next.gif"/>&nbsp;2型糖尿病患者随访记录</a></td></tr>'
				+ '<tr><td><input type="text" value="12"/><a href="#"><img src="/image/next.gif"/>&nbsp;重性精神病患者随访记录</a></td></tr>'
				+ '<tr><td><input type="text" value="13"/><a href="#"><img src="/image/next.gif"/>&nbsp;接诊记录</a></td></tr>'
				+ '<tr><td><input type="text" value="14"/><a href="#"><img src="/image/next.gif"/>&nbsp;会诊记录</a></td></tr>'
				+ '<tr><td><input type="text" value="15"/><a href="#"><img src="/image/next.gif"/>&nbsp;双向转诊记录</a></td></tr>'
				+ '<tr><td><input type="text" value="16"/><a href="#"><img src="/image/next.gif"/>&nbsp;双向转诊回转记录</a></td></tr>'
				+ '<tr><td><input type="text" value="17"/><a href="#"><img src="/image/next.gif"/>&nbsp;预防接种</a></td></tr>'
				+ '</table></div>';
		}else{
			htmlAction = '<div id="actionContainer"><table><tr><td><input type="text" value="1"/><a href="#"><img src="/image/next.gif"/>&nbsp;健康体检记录</a></td></tr>'
				+ '<tr><td><input type="text" value="2"/><a href="#"><img src="/image/next.gif"/>&nbsp;新生儿家庭访视记录</a></td></tr>'
				+ '<tr><td><input type="text" value="3"/><a href="#"><img src="/image/next.gif"/>&nbsp;1岁以内儿童体检记录</a></td></tr>'
				+ '<tr><td><input type="text" value="4"/><a href="#"><img src="/image/next.gif"/>&nbsp;1岁至2岁儿童体检记录</a></td></tr>'
				+ '<tr><td><input type="text" value="5"/><a href="#"><img src="/image/next.gif"/>&nbsp;3岁儿童体检记录</a></td></tr>'
				+ '<tr><td><input type="text" value="6"/><a href="#"><img src="/image/next.gif"/>&nbsp;第一次产前随访记录</a></td></tr>'
				+ '<tr><td><input type="text" value="7"/><a href="#"><img src="/image/next.gif"/>&nbsp;第2至5次产前随访记录</a></td></tr>'
				+ '<tr><td><input type="text" value="8"/><a href="#"><img src="/image/next.gif"/>&nbsp;产后访视记录</a></td></tr>'
				+ '<tr><td><input type="text" value="9"/><a href="#"><img src="/image/next.gif"/>&nbsp;产后42天健康体检记录</a></td></tr>'
				+ '<tr><td><input type="text" value="10"/><a href="#"><img src="/image/next.gif"/>&nbsp;高血压患者随访记录</a></td></tr>'
				+ '<tr><td><input type="text" value="11"/><a href="#"><img src="/image/next.gif"/>&nbsp;2型糖尿病患者随访记录</a></td></tr>'
				+ '<tr><td><input type="text" value="12"/><a href="#"><img src="/image/next.gif"/>&nbsp;重性精神病患者随访记录</a></td></tr>'
				+ '<tr><td><input type="text" value="13"/><a href="#"><img src="/image/next.gif"/>&nbsp;接诊记录</a></td></tr>'
				+ '<tr><td><input type="text" value="14"/><a href="#"><img src="/image/next.gif"/>&nbsp;会诊记录</a></td></tr>'
				+ '<tr><td><input type="text" value="15"/><a href="#"><img src="/image/next.gif"/>&nbsp;双向转诊记录</a></td></tr>'
				+ '<tr><td><input type="text" value="16"/><a href="#"><img src="/image/next.gif"/>&nbsp;双向转诊回转记录</a></td></tr>'
				+ '<tr><td><input type="text" value="17"/><a href="#"><img src="/image/next.gif"/>&nbsp;预防接种</a></td></tr>'
				+ '</table></div>';
		}
		
		this.menuPanel = new Ext.Panel({
			title : '功能区划',
			html : htmlAction
		});
		
		var htmlDetail = '<div id="detailContent"></div>';
		
		this.infoPanel = new Ext.Panel({
			title : panelTitle,
			html : htmlDetail,
			autoScroll : true
		});
		var viewPort = new Ext.Viewport({
			layout:'border',
			renderTo:'body',
			items : [{
				region : 'west',
				layout: 'fit',
		        frame : false,
		        split : true,
		        collapsible:true,
		        layoutConfig : {
		          animate : true
		        },
		        titleCollapse : true,
		        width : 200,
		        items : [this.menuPanel]
			},{
				region : 'center',
				layout : 'fit',
				items : [this.infoPanel]
			}]
		});
		
		$('#actionContainer td').click(function(){
			var selectNo = $(this).children('input').val();
			QueryByHomeService.queryByHomeAtFileNo(fileNo,selectNo,function(data){
				if(selectNo == 1){
					var content = '<table cellpadding="0" cellspacing="0" border="1"><tr><th style="width:100px;">体检日期</th>'
						+ '<th style="width:100px;">录入人</th><th style="width:100px;">责任医生</th><th style="width:300px;"> 健康评价</th>'
						+ '<th style="width:350px;">健康指导</th><th>操作</th></tr>';
					for(var i =0;i<data.length;i++){
						var examDate = formatDate(data[i][2]);
						var inputPersonId = removeNull(data[i][3]);
						var doctor = removeNull(data[i][4]);
						var id = data[i][1];
						var judge01 = data[i][5];
						var judge02 = data[i][6];
						var judge03 = data[i][7];
						var judge04 = data[i][8];
						var judge05 = data[i][9];
						var name = removeNull(data[i][0]);
						
						if(judge01 == '异常'){
							judge01 = judge01 + ':';
							if(judge02 != null && judge02 != '')
								judge01 = judge01 + judge02 + '、';
							if(judge03 != null && judge03 != '')
								judge01 = judge01 + judge03 + '、';
							if(judge04 != null && judge04 != '')
								judge01 = judge01 + judge04 + '、';
							if(judge05 != null && judge05 != '')
								judge01 = judge01 + judge05 + '、';
							judge01 = judge01.substring(0,judge01.length-1);
						}
						if(judge01 == null)
							judge01 = '&nbsp;';
						content = content + '<tr><td>' + examDate + '</td><td>' + inputPersonId +
							'</td><td>' + doctor + '</td><td>' + judge01 + '</td><td>' + name + '</td>' +
							'<td style="text-align:center;"><a href="/medicalExam.html?id=' + id.trim() + '" target="view_window">查看</a></td></tr>';
					}
					var page = '<tr><td colspan="6">共有：' + data.length + '&nbsp;条记录</td></tr>'
					content = content + page + '</table>';
					$("#detailContent").html(content);
				}else if(selectNo == 2){
					var content = '<table cellpadding="0" cellspacing="0" border="1"><tr><th style="width:100px;">本次随访日期</th>'
						+ '<th style="width:100px;">下次随访时间</th><th style="width:100px;">随访医生</th><th style="width:100px;">录入人</th>'
						+ '<th style="width:550px;">指导</th><th>操作</th></tr>';
					for(var i = 0;i<data.length;i++){
						var name = data[i][0];
						if(name == null)
							name = '&nbsp;';
						var inputPersonId = data[i][2];
						var tempVisitDate = data[i][3];
						var visitDate = '&nbsp;';
						if(tempVisitDate != null)
							visitDate = formatDate(tempVisitDate);
						var tempNextVisitDate = data[i][4];
						var nextVisitDate = '&nbsp;';
						if(tempNextVisitDate != null)
							nextVisitDate = formatDate(tempNextVisitDate);
						var id = data[i][1];
						var visitDoctor = data[i][5];
						if(visitDoctor == null)
							visitDoctor = '&nbsp;'
						content = content + '<tr><td>' + visitDate + '</td><td>' + nextVisitDate +
							'</td><td>' + visitDoctor + '</td><td>' + inputPersonId + '</td><td>' + name + '</td>' +
							'<td style="text-align:center;"><a href="/babyvisit.html?id=' + id.trim() + '" target="view_window">查看</a></td></tr>';
					}
					var page = '<tr><td colspan="6">共有：' + data.length + '&nbsp;条记录</td></tr>'
					content = content + page + '</table>';
					$("#detailContent").html(content);
				}else if(selectNo == 3 || selectNo == 4){
					var content = '';
					if(data.length>0){
						var title_child = '';
						if(selectNo == 3)
							title_child = '<div class="title">1岁以内儿童健康检查记录表</div>';
						else if(selectNo == 4)
							title_child = '<div class="title">1～2岁儿童健康检查记录表</div>';
						content = title_child + '<div><span class="showName">姓名：</span><span>' + personName + 
							'</span><span class="showFileNo">编号：</span><span>'+ fileNo + '</span></div><table cellpadding="0" ' +
							'cellspacing="0">';
						var tr_td_01 = '<tr><td style="width:150px;vertical-align: top;"><table  border="1" class="tr_td_table" cellpadding="0" cellspacing="0"><tr><th colspan="2">项目'+
							'</th></tr><tr><td colspan="2">随访日期</td></tr><tr><td colspan="2">体重 （kg）</td></tr><tr><td colspan="2">身长（cm）</td></tr>'+
							'<tr><td rowspan="14" style="width:30px;text-align:center;">体<br/>格<br/>检<br/>查</td><td>面色</td></tr>'+
							'<tr><td>皮肤</td></tr><tr><td>前囟</td></tr><tr><td>眼</td></tr><tr><td>耳</td></tr><tr><td>出牙数(颗)</td></tr>'+
							'<tr><td>心肺</td></tr><tr><td>腹部</td></tr><tr><td>脐部</td></tr><tr><td>四肢</td></tr><tr><td>佝偻病症状</td></tr>'+
							'<tr><td>佝偻病体征</td></tr><tr><td>肛门/外生殖器</td></tr><tr><td>血红蛋白值（g/L）</td></tr>'+
							'<tr><td colspan="2">户外活动（小时/日）</td></tr><tr><td colspan="2">服用维生素D（IU/日）</td></tr>'+
							'<tr><td colspan="2">发育评估</td></tr>'+
							'<tr><td colspan="2">两次随访间患病情况</td></tr><tr><td colspan="2">其他</td></tr><tr><td colspan="2">转诊</td></tr>'+
							'<tr><td colspan="2">指导</td></tr><tr><td colspan="2">下次随访日期</td></tr><tr><td colspan="2">随访医生签名</td></tr></table></td>';
						
						var tr_td_02 = '';
						var td_width = 850/data.length;
						for(var i = 0;i<data.length;i++){
							tr_td_02 = tr_td_02 + '<td style="width:' + td_width + 'px;vertical-align: top;"><table  border="1" class="tr_td_table" cellpadding="0" cellspacing="0">';
							var checkItem = data[i]['checkItem'];//月龄
							var visitDate = formatDate(data[i]['visitDate']);//随访日期
							var height = removeNull(data[i]['height']);//身长
							var heightScore = data[i]['heightScore'];//身高评分结果
							if(heightScore != null && heightScore != '')
								heightScore = '评分结果：' + heightScore;
							else
								heightScore = '';
							height = height + heightScore;
							var weight = removeNull(data[i]['weight']);//体重 （kg）
							var weightScore = data[i]['weightScore'];//体重评分结果
							if(weightScore != null && weightScore != '')
								weightScore = '评分结果：' + weightScore;
							else
								weightScore = '';
							weight = weight + weightScore;
							var face = removeNull(data[i]['face']);//面色
							var eyes = removeNull(data[i]['eyes']);//眼
							var eyesOther = data[i]['eyesOther'];//眼异常
							eyes = exceptionDescri(eyes,eyesOther);
							var ears = removeNull(data[i]['ears']);//耳
							var earsOther = data[i]['earsOther'];//耳异常
							ears = exceptionDescri(ears,earsOther);
							var heart = removeNull(data[i]['heart']);//心肺
							var heartOther = data[i]['heartOther'];//心肺异常
							if(heart == '有'){
								if(heartOther != null && heartOther != ''){
									heart = heart + '，异常描述：' + heartOther;
								}
							}
							var exam01 = removeNull(data[i]['exam01']);//皮肤
							var exam01Other = data[i]['exam01other'];//异常描述
							exam01 = exceptionDescri(exam01,exam01Other);
							var exam02 = removeNull(data[i]['exam02']);//前卤状况
							var exam03 = data[i]['exam03'];//未闭合长
							var exam04 = data[i]['exam04'];//未闭合宽
							if(exam03 != null && exam03 != ''){
								if(exam04 != null && exam04 != ''){
									exam02 = exam02 + '，' + exam03 + 'cm × ' + exam04 + 'cm';
								}
							}
							var exam05 = removeNull(data[i]['exam05']);//出牙数
							var exam06 = removeNull(data[i]['exam06']);//腹部
							var exam06Other = removeNull(data[i]['exam06other']);//腹部异常
							exam06 = exceptionDescri(exam06,exam06Other);
							var exam07 = removeNull(data[i]['exam07']);//脐部
							var exam07Other = removeNull(data[i]['exam07other']);//脐部异常
							exam07 = exceptionDescri(exam07,exam07Other);
							var exam08 = removeNull(data[i]['exam08']);//四肢
							var exam08Other = removeNull(data[i]['exam08other']);//四肢异常
							exam08 = exceptionDescri(exam08,exam08Other);
							var exam09 = removeNull(data[i]['exam09']);//佝偻病症状
							var exam10 = removeNull(data[i]['exam10']);//佝偻病体征
							var exam11 = removeNull(data[i]['exam11']);//肛门及外生殖器
							var exam11Other = removeNull(data[i]['exam11other']);//肛门及外生殖器异常
							exam11 = exceptionDescri(exam11,exam11Other);
							var exam12 = removeNull(data[i]['exam12']);//血红蛋白值
							var transfer = removeNull(data[i]['transfer']);//转 诊
							var transReason = data[i]['transReason'];//转诊原因
							var transUnit = removeNull(data[i]['transUnit']);//机构及科室
							if(transfer == 0){
								transfer = '无';
							}else if(transfer == 1){
								transfer = '有';
								if(transReason != null && transReason != ''){
									transfer = transfer + '，转诊原因：' + transReason;
								}
								if(transUnit != null && transUnit != ''){
									transfer = transfer + '，机构及科室：' + transUnit;
								}
							}
							var nextVisitDate = data[i]['nextVisitDate'];//下次随访日期
							if(nextVisitDate != null && nextVisitDate != ''){
								nextVisitDate = nextVisitDate.substring(0,4) + '-' + nextVisitDate.substring(4,6) + '-' + nextVisitDate.substring(6,8);
							}else{
								nextVisitDate = '&nbsp;';
							}
							var visitDoctor = removeNull(data[i]['visitDoctor']);//随访医生签名
							var activityTime = removeNull(data[i]['activityTime']);//户外活动
							var wdcount = removeNull(data[i]['wdcount']);//服用维生素D
							var evaluate = removeNull(data[i]['evaluate']);//发育评估
							var state = removeNull(data[i]['state']);//两次随访间患病情况
							var other = removeNull(data[i]['other']);//其它
							var direct = '';//指 导
							var directOther = data[i]['directOther'];//其它指导
							if(directOther != null && directOther != ''){
								directOther = '其它指导：' + directOther;
							}
							
							var id = data[i]['id'].trim();
							ids[i] = id;
							tr_td_02 = tr_td_02 + '<tr><th>'+ checkItem +'</th></tr>' + '<tr><td>'+ visitDate +'</td></tr>' + 
								'<tr><td>'+ weight +'</td></tr>'+
								'<tr><td>'+ height +'</td></tr>'+
								'<tr><td>'+ face +'</td></tr>'+
								'<tr><td>'+ exam01 +'</td></tr>'+
								'<tr><td>'+ exam02 +'</td></tr>'+
								'<tr><td>'+ eyes +'</td></tr>'+
								'<tr><td>'+ ears +'</td></tr>'+
								'<tr><td>'+ exam05 +'</td></tr>'+
								'<tr><td>'+ heart +'</td></tr>'+
								'<tr><td>'+ exam06 +'</td></tr>'+
								'<tr><td>'+ exam07 +'</td></tr>'+
								'<tr><td>'+ exam08 +'</td></tr>'+
								'<tr><td>'+ exam09 +'</td></tr>'+
								'<tr><td>'+ exam10 +'</td></tr>'+
								'<tr><td>'+ exam11 +'</td></tr>'+
								'<tr><td>'+ exam12 +'</td></tr>'+
								'<tr><td>'+ activityTime +'</td></tr>'+
								'<tr><td>'+ wdcount +'</td></tr>'+
								'<tr><td>'+ evaluate +'</td></tr>'+
								'<tr><td>'+ state +'</td></tr>'+
								'<tr><td>'+ other +'</td></tr>'+
								'<tr><td>'+ transfer +'</td></tr>'+
								'<tr><td id="' + id + '">'+ direct + directOther +'</td></tr>' +
								'<tr><td>'+ nextVisitDate +'</td></tr>'+
								'<tr><td>'+ visitDoctor +'</td></tr>';
							tr_td_02 = tr_td_02 + '</table></td>';
						}
						content = content + tr_td_01 + tr_td_02 + '</tr></table>'
						//获得指导记录
						QueryByHomeService.queryDirectById(ids,selectNo,function(data){
							var results = data.split(',');
							for(var k=0;k<results.length;k++){
								var result = results[k].split(':');
								var direct = result[1];
								var tempDirect = $('#' + result[0]).html();
								if(direct != null && direct != ''){
									if(tempDirect != null && tempDirect != '')
										direct = direct + tempDirect;
									else
										direct = direct.substring(0,direct.length -1);
									$('#' + result[0]).html(direct);
								}
							}
						});
					}else{
						content = '<div class="noResults">暂无记录</div>'
					}
					$("#detailContent").html(content);
				}else if(selectNo == 5){
					var content = '<table  border="1" cellpadding="0" cellspacing="0"><tr><th style="width:100px;">本次随访日期</th>'
						+ '<th style="width:100px;">随访医生</th><th style="width:100px;">录入人</th>'
						+ '<th style="width:650px;">指导</th><th>操作</th></tr>';
					for(var i = 0;i<data.length;i++){
						var name = data[i][0];
						if(name == null)
							name = '&nbsp;';
						var inputPersonId = data[i][3];
						var tempVisitDate = data[i][2];
						var visitDate = '&nbsp;';
						if(tempVisitDate != null)
							visitDate = formatDate(tempVisitDate);
						var id = data[i][1];
						var visitDoctor = data[i][4];
						if(visitDoctor == null)
							visitDoctor = '&nbsp;'
						var directOther = data[i][5];
						if(directOther != null && directOther != '')
							name = name + '、' + directOther;
						content = content + '<tr><td>' + visitDate + '</td><td>' + visitDoctor + '</td><td>' + inputPersonId + 
							'</td><td>' + name + '</td>' + '<td style="text-align:center;"><a href="/childexam3.html?id=' + 
							id.trim() + '" target="view_window">查看</a></td></tr>';
					}
					var page = '<tr><td colspan="6">共有：' + data.length + '&nbsp;条记录</td></tr>'
					content = content + page + '</table>';
					$("#detailContent").html(content);
				}else if(selectNo == 6){
					var content = '<table  border="1" cellpadding="0" cellspacing="0"><tr><th style="width:100px;">本次随访日期</th>'
						+ '<th style="width:100px;">下次随访时间</th><th style="width:100px;">随访医生</th><th style="width:100px;">录入人</th>'
						+ '<th style="width:550px;">既往史</th><th>操作</th></tr>';
					for(var i = 0;i<data.length;i++){
						var name = data[i][0];
						if(name == null)
							name = '&nbsp;';
						var inputPersonId = data[i][3];
						var tempVisitDate = data[i][2];
						var visitDate = '&nbsp;';
						if(tempVisitDate != null)
							visitDate = formatDate(tempVisitDate);
						var tempNextVisitDate = data[i][5];
						var nextVisitDate = '&nbsp;';
						if(tempNextVisitDate != null)
							nextVisitDate = formatDate(tempNextVisitDate);
						var id = data[i][1];
						var visitDoctor = data[i][4];
						if(visitDoctor == null)
							visitDoctor = '&nbsp;'
						content = content + '<tr><td>' + visitDate + '</td><td>' + nextVisitDate +
							'</td><td>' + visitDoctor + '</td><td>' + inputPersonId + '</td><td>' + name + '</td>' +
							'<td style="text-align:center;"><a href="/firstvisit.html?id=' + id.trim() + '" target="view_window">查看</a></td></tr>';
					}
					var page = '<tr><td colspan="6">共有：' + data.length + '&nbsp;条记录</td></tr>'
					content = content + page + '</table>';
					$("#detailContent").html(content);
				}else if(selectNo == 7){
					var content = '';
					if(data.length > 0){
						content = '<div class="title">第2～5次产前随访服务记录表</div><div><span class="showName">姓名：</span><span>' + personName + 
							'</span><span class="showFileNo">编号：</span><span>'+ fileNo + '</span></div><table  border="1" cellpadding="0" ' +
							'cellspacing="0">';
						var tr_td_01 = '<tr><td style="width:150px;"><table  border="1" class="tr_td_table" cellpadding="0" cellspacing="0"><tr><th colspan="2">项目</th></tr><tr><td colspan="2">随访日期</td></tr>'+
							'<tr><td colspan="2">孕周(周)</td></tr><tr><td colspan="2">主    诉</td></tr><tr><td colspan="2">体重 （kg）</td></tr><tr><td rowspan="3" style="width:30px;text-align:center;">'+
							'产<br/>前<br/>检<br/>查</td><td>宫底高度（cm）</td></tr><tr><td>腹围（cm）</td></tr><tr><td>胎心率（次/分钟）</td></tr>'+
							'<tr><td colspan="2">血压（mmHg）</td></tr><tr><td colspan="2">血红蛋白值（g/L）</td></tr><tr><td colspan="2">尿蛋白</td></tr>'+
							'<tr><td colspan="2">其他检查</td></tr><tr><td colspan="2">分    类</td></tr><tr><td colspan="2">指    导</td></tr>'+
							'<tr><td colspan="2">转    诊</td></tr><tr><td colspan="2">下次随访日期</td></tr><tr><td colspan="2">随访医生签名</td></tr></table></td>';
						
						var tr_td_02 = '';
						var td_width = 850/data.length;
						for(var i = 0;i<data.length;i++){
							tr_td_02 = tr_td_02 + '<td style="width:' + td_width + 'px;"><table  border="1" class="tr_td_table" cellpadding="0" cellspacing="0">';
							var item = '第' + data[i]['item'] + '次';
							var visitDate;//随访日期
							var weeks;//孕周(周)
							var cc;//主 诉
							var weight;//体重 （kg）
							var exam01;//宫底高度（cm）
							var exam02;//腹围（cm）
							var exam03;//胎心率（次/分钟）
							var exam04;//血红蛋白值（g/L）
							var exam05;//尿蛋白
							var exam06;//其他检查
							var result;//分    类
							var resultOther;//分类异常结果
							var direct = '';//指 导
							var transfer;//转 诊
							var transReason;//转诊原因
							var transUnit;//机构及科室
							var nextVisitDate;//下次随访日期
							var visitDoctor;//随访医生签名
							var diastolicPressure;//舒张压
							var systolicPressure;//收缩压
							visitDate = formatDate(data[i]['visitDate']);
							weeks = removeNull(data[i]['weeks']);
							cc = removeNull(data[i]['cc']);
							weight = removeNull(data[i]['weight']);
							exam01 = removeNull(data[i]['exam01']);
							exam02 = removeNull(data[i]['exam02']);
							exam03 = removeNull(data[i]['exam03']);
							exam04 = removeNull(data[i]['exam04']);
							exam05 = removeNull(data[i]['exam05']);
							exam06 = removeNull(data[i]['exam06']);
							result = removeNull(data[i]['result']);
							resultOther = data[i]['resultOther'];
							if(result == '异常'){
								result = result + '，异常原因：' + resultOther;
							}
							transfer = data[i]['transfer'];
							transReason = removeNull(data[i]['transReason']);
							transUnit = removeNull(data[i]['transUnit']);
							if(transfer == 0){
								transfer = '无';
							}else if(transfer == 1){
								transfer = '有，转诊原因：' + transReason + '，转诊科室：' + transUnit;
							}else{
								transfer = '&nbsp;';
							}
							nextVisitDate = formatDate(data[i]['nextVisitDate']);
							visitDoctor = removeNull(data[i]['visitDoctor']);
							diastolicPressure = removeNull(data[i]['diastolicPressure']);
							systolicPressure = removeNull(data[i]['systolicPressure']);
							
							var id = data[i]['id'].trim();
							ids[i] = id;
							tr_td_02 = tr_td_02 + '<tr><th>'+ item +'</th></tr>' + '<tr><td>'+ visitDate +'</td></tr>' + 
								'<tr><td>'+ weeks +'</td></tr>'+
								'<tr><td>'+ cc +'</td></tr>'+
								'<tr><td>'+ weight +'</td></tr>'+
								'<tr><td>'+ exam01 +'</td></tr>'+
								'<tr><td>'+ exam02 +'</td></tr>'+
								'<tr><td>'+ exam03 +'</td></tr>'+
								'<tr><td>'+ diastolicPressure + '/' + systolicPressure +'</td></tr>'+
								'<tr><td>'+ exam04 +'</td></tr>'+
								'<tr><td>'+ exam05 +'</td></tr>'+
								'<tr><td>'+ exam06 +'</td></tr>'+
								'<tr><td>'+ result +'</td></tr>'+
								'<tr><td id="' + id + '">'+ direct +'</td></tr>' +
								'<tr><td>'+ transfer +'</td></tr>'+
								'<tr><td>'+ nextVisitDate +'</td></tr>'+
								'<tr><td>'+ visitDoctor +'</td></tr>';
							tr_td_02 = tr_td_02 + '</table></td>';
						}
						content = content + tr_td_01 + tr_td_02 + '</tr></table>'
						//获得指导记录
						QueryByHomeService.queryDirectById(ids,selectNo,function(data){
							var results = data.split(',');
							for(var k=0;k<results.length;k++){
								var result = results[k].split(':');
								var direct = result[1];
								if(direct != null && direct != '')
									direct = direct.substring(0,direct.length -1);
								else
									direct = '&nbsp;';
								$('#' + result[0]).html(direct);
							}
						});
					}else{
						content = '<div class="noResults">暂无记录</div>'
					}
					$("#detailContent").html(content);
				}else if(selectNo == 9 || selectNo == 8){
					var content = '<table  border="1" cellpadding="0" cellspacing="0"><tr><th style="width:100px;">本次随访日期</th>'
						+ '<th style="width:100px;">随访医生</th><th style="width:100px;">录入人</th>'
						+ '<th style="width:650px;">指导</th><th>操作</th></tr>';
					var url = '';
					if(selectNo == 9){
						url = '/visitAfterBorn42.html';
					}else if(selectNo == 8){
						url = '/visitAfterBorn.html';
					}
					for(var i = 0;i<data.length;i++){
						var name = data[i][0];
						if(name == null)
							name = '&nbsp;';
						var inputPersonId = data[i][3];
						var tempVisitDate = data[i][2];
						var visitDate = '&nbsp;';
						if(tempVisitDate != null)
							visitDate = formatDate(tempVisitDate);
						var id = data[i][1];
						var visitDoctor = data[i][4];
						if(visitDoctor == null)
							visitDoctor = '&nbsp;'
						content = content + '<tr><td>' + visitDate + '</td><td>' + visitDoctor + '</td><td>' + inputPersonId + 
							'</td><td>' + name + '</td>' + '<td style="text-align:center;"><a href="' + url + '?id=' + 
							id.trim() + '" target="view_window">查看</a></td></tr>';
					}
					var page = '<tr><td colspan="6">共有：' + data.length + '&nbsp;条记录</td></tr>'
					content = content + page + '</table>';
					$("#detailContent").html(content);
				}else if(selectNo == 10){
					var content = '';
					if(data.length > 0){
						var width = 200 * data.length;
						if(width < 1000)
							width = 1000;
						content = '<div class="title" style="width:' + width + 'px;">高血压患者随访服务记录表</div><div style="width:' + width 
							+ 'px;"><span class="showName">姓名：</span><span>' + personName + 
							'</span><span style="margin-left:'+ (width-400) + 'px;">编号：</span><span>'+ fileNo + '</span></div>';
						content = content + '<table  border="1" cellpadding="0" cellspacing="0" style="width:' + width + 'px;"><tr><td style="width:200px;vertical-align: top;">'+
							'<table  border="1" cellpadding="0" cellspacing="0" class="tr_td_table"><tr><td colspan="2">随访日期</td></tr>'+
							'<tr><td colspan="2">随访方式</td></tr><tr><td colspan="2">症状</td></tr><tr><td rowspan="5">体征</td>'+
							'<td>血压（mmHg）</td></tr><tr><td>体重（kg)</td></tr><tr><td>体质指数</td></tr><tr><td>心率</td></tr>'+
							'<tr><td>其他</td></tr><tr><td rowspan="6">生活方式指导</td><td>日吸烟量（支）</td></tr>'+
							'<tr><td>日饮酒量（两）</td></tr><tr><td>运 动</td></tr><tr><td>摄盐情况（克/天）</td></tr>'+
							'<tr><td>心理调整</td></tr><tr><td>遵医行为</td></tr><tr><td colspan="2">辅助检查</td></tr>'+
							'<tr><td colspan="2">服药依从性</td></tr><tr><td colspan="2">药物不良反应</td></tr><tr><td colspan="2">此次随访分类</td></tr>'+
							'<tr><td colspan="2" style="height:100px;">用药情况</td></tr><tr><td colspan="2">转诊</td></tr>'+
							'<tr><td colspan="2">下次随访日期</td></tr><tr><td colspan="2">随访医生签名</td></tr></table></td>';
						
						var table_width = (width - 200)/data.length;
							
						for(var i=0;i<data.length;i++){
							var visitDate = formatDate(data[i]['visitDate']);//随访日期
							var visitKind = removeNull(data[i]['visitKind']);//随访方式
							var symptomOther = removeNull(data[i]['symptomOther']);//其它症状
							var diastolicPressure = removeNull(data[i]['diastolicPressure']);//舒张压
							var systolicPressure = removeNull(data[i]['systolicPressure']);//收缩压
							var weight = removeNull(data[i]['weight']);//体重
							var habitus = removeNull(data[i]['habitus']);//体质指数
							var heartRate = removeNull(data[i]['heartRate']);//心率
							var other = removeNull(data[i]['other']);//其它
							var smoke = removeNull(data[i]['smoke']);//日吸烟量
							var drink = removeNull(data[i]['drink']);//日喝酒量
							var sportTimes = data[i]['sportTimes'];//每周运动次数
							if(sportTimes != null && sportTimes != ''){
								sportTimes = sportTimes + '次/周&nbsp;&nbsp;';
							}else{
								sportTimes = '&nbsp;';
							}
							var sportDuration = data[i]['sportDuration'];//每次运动时长
							if(sportDuration != null && sportDuration != ''){
								sportDuration = sportDuration + '分钟/次';
							}else{
								sportDuration = '&nbsp;';
							}
							var salt = removeNull(data[i]['salt']);//摄盐情况
							var mindStatus = removeNull(data[i]['mindStatus']);//心理调整
							var action = removeNull(data[i]['action']);//遵医行为
							var assistantExam = removeNull(data[i]['assistantExam']);//辅助检查
							var compliance = removeNull(data[i]['compliance']);//服药依从性
							var adr = removeNull(data[i]['adr']);//药物不良反应
							var adrother = data[i]['adrother'];//药物不良反应描述
							if(adr == '有'){
								if(adrother != null && adrother != ''){
									adr = adr + '，异常描述：' + adrother;
								}
							}
							var visitType = removeNull(data[i]['visitType']);//此次随访分类
							var transfer = removeNull(data[i]['transfer']);//转诊
							var transReason = data[i]['transReason'];//转诊原因
							if(transReason != null && transReason != ''){
								transReason = '转诊原因：' + transReason + '&nbsp;&nbsp;';
							}else{
								transReason = '&nbsp;';
							}
							var transUnit = data[i]['transUnit'];//转诊科室
							if(transUnit != null && transUnit != ''){
								transUnit = '机构及科别：' + transUnit;
							}else{
								transUnit = '&nbsp;';
							}
							var nextVistDate = formatDate(data[i]['nextVistDate']);//下次随访日期
							var visitDoctor = removeNull(data[i]['visitDoctor']);//随访医生签名
							var id = data[i]['id'].trim();
							ids[i] = id;
							content = content + '<td style="width:' + table_width + 'px;vertical-align: top;"><table border="1" cellpadding="0" cellspacing="0" class="tr_td_table">'+
								'<tr><td>'+ visitDate +'</td></tr>' + 
								'<tr><td>'+ visitKind +'</td></tr>' +
								'<tr><td class="' + id + '">'+ symptomOther + '</td></tr>' +
								'<tr><td>'+ diastolicPressure + '/' + systolicPressure +'</td></tr>' +
								'<tr><td>'+ weight +'</td></tr>' +
								'<tr><td>'+ habitus +'</td></tr>' +
								'<tr><td>'+ heartRate +'</td></tr>' +
								'<tr><td>'+ other +'</td></tr>' +
								'<tr><td>'+ smoke +'</td></tr>' +
								'<tr><td>'+ drink +'</td></tr>' +
								'<tr><td>'+ sportTimes + sportDuration +'</td></tr>' + 
								'<tr><td>'+ salt +'</td></tr>' +
								'<tr><td>'+ mindStatus +'</td></tr>' +
								'<tr><td>'+ action +'</td></tr>' +
								'<tr><td>'+ assistantExam +'</td></tr>' +
								'<tr><td>'+ compliance +'</td></tr>' +
								'<tr><td>'+ adr +'</td></tr>' +
								'<tr><td>'+ visitType +'</td></tr>' +
								'<tr><td style="height:100px;vertical-align: top;" id="' + id + '" >&nbsp;</td></tr>' +
								'<tr><td>'+ transReason + transUnit +'</td></tr>' +
								'<tr><td>'+ nextVistDate +'</td></tr>' +
								'<tr><td>'+ visitDoctor +'</td></tr>' +
								'</table></td>'
						}	
						content = content + '</tr></table>';
						//获得指导记录
						QueryByHomeService.queryDirectById(ids,selectNo,function(data){
							var results = data.split(',');
							for(var k=0;k<results.length;k++){
								var result = results[k].split(':');
								var direct = result[1];
								if(direct != null && direct != '')
									direct = direct.substring(0,direct.length -1);
								else
									direct = '&nbsp;';
								$('.' + result[0]).html(direct);
							}
						});
						//获得用药情况
						QueryByHomeService.queryUseDrugById(ids,selectNo,function(data){
							var results = data.split(',');
							for(var k=0;k<results.length;k++){
								var result = results[k].split(':');
								var drug = result[1].split(';');
								var userDrug = '';
								for(var m = 0;m < drug.length - 1;m++){
									var tempDrug = drug[m].split('、');
									userDrug = userDrug + '药物名称：' + tempDrug[0] + '&nbsp;&nbsp;用法（次/日）：' + tempDrug[1] 
										+ '&nbsp;&nbsp;用量（mg/次）:' +  tempDrug[2] + '<br />'; 
								}
								$('#' + result[0]).html(userDrug);
							}
						});
					}else{
						content = '<div class="noResults">暂无记录</div>'
					}
					$("#detailContent").html(content);
				}else if(selectNo == 11){
					var content = '';
					if(data.length > 0){
						var width = 200 * data.length;
						if(width < 1000)
							width = 1000;
						content = '<div class="title" style="width:' + width + 'px;">2型糖尿病患者随访服务记录表</div><div style="width:' + width 
							+ 'px;"><span class="showName">姓名：</span><span>' + personName + 
							'</span><span style="margin-left:'+ (width-400) + 'px;">编号：</span><span>'+ fileNo + '</span></div>';
						content = content + '<table  border="1" cellpadding="0" cellspacing="0" style="width:' + width + 'px;"><tr><td style="width:200px;vertical-align: top;">'+
							'<table  border="1" cellpadding="0" cellspacing="0" class="tr_td_table"><tr><td colspan="2">随访日期</td></tr>'+
							'<tr><td colspan="2">随访方式</td></tr><tr><td colspan="2">症状</td></tr><tr><td rowspan="6">体征</td>'+
							'<td>血压（mmHg）</td></tr><tr><td>体重（kg)</td></tr><tr><td>体质指数</td></tr><tr><td>心率</td></tr>'+
							'<tr><td>足背动脉搏动</td></tr><tr><td>其他</td></tr><tr><td rowspan="6">生活方式指导</td><td>日吸烟量（支）</td></tr>'+
							'<tr><td>日饮酒量（两）</td></tr><tr><td>运 动</td></tr><tr><td>主食（克/天）</td></tr>'+
							'<tr><td>心理调整</td></tr><tr><td>遵医行为</td></tr><tr><td rowspan="2">辅助检查</td><td>空腹血糖值</td></tr>'+
							'<tr><td style="height:50px;">其他检查</td></tr><tr><td colspan="2">服药依从性</td></tr>'+
							'<tr><td colspan="2">药物不良反应</td></tr><tr><td colspan="2">低血糖反应</td></tr><tr><td colspan="2">此次随访分类</td></tr>'+
							'<tr><td colspan="2" style="height:100px;">用药情况</td></tr><tr><td colspan="2">转诊</td></tr>'+
							'<tr><td colspan="2">下次随访日期</td></tr><tr><td colspan="2">随访医生签名</td></tr></table></td>';
						
						var table_width = (width - 200)/data.length;
							
						for(var i=0;i<data.length;i++){
							var visitDate = formatDate(data[i]['visitDate']);//随访日期
							var visitKind = removeNull(data[i]['visitKind']);//随访方式
							var symptomOther = removeNull(data[i]['symptomOther']);//其它症状
							var diastolicPressure = removeNull(data[i]['diastolicPressure']);//舒张压
							var systolicPressure = removeNull(data[i]['systolicPressure']);//收缩压
							var weight = removeNull(data[i]['weight']);//体重
							var habitus = removeNull(data[i]['habitus']);//体质指数
							var heartRate = removeNull(data[i]['heartRate']);//心率
							var other = removeNull(data[i]['other']);//其它
							var smoke = removeNull(data[i]['smoke']);//日吸烟量
							var drink = removeNull(data[i]['drink']);//日喝酒量
							var sportTimes = data[i]['sportTimes'];//每周运动次数
							if(sportTimes != null && sportTimes != ''){
								sportTimes = sportTimes + '次/周&nbsp;&nbsp;';
							}else{
								sportTimes = '&nbsp;';
							}
							var sportDuration = data[i]['sportDuration'];//每次运动时长
							if(sportDuration != null && sportDuration != ''){
								sportDuration = sportDuration + '分钟/次';
							}else{
								sportDuration = '&nbsp;';
							}
							var food = removeNull(data[i]['food']);//主食
							var mindStatus = removeNull(data[i]['mindStatus']);//心理调整
							var action = removeNull(data[i]['action']);//遵医行为
							var compliance = removeNull(data[i]['compliance']);//服药依从性
							var adr = removeNull(data[i]['adr']);//药物不良反应
							var adrother = data[i]['adrother'];//药物不良反应描述
							if(adr == '有'){
								if(adrother != null && adrother != ''){
									adr = adr + '，异常描述：' + adrother;
								}
							}
							var visitType = removeNull(data[i]['visitType']);//此次随访分类
							var transfer = removeNull(data[i]['transfer']);//转诊
							var transReason = data[i]['transReason'];//转诊原因
							if(transReason != null && transReason != ''){
								transReason = '转诊原因：' + transReason + '&nbsp;&nbsp;';
							}else{
								transReason = '&nbsp;';
							}
							var transUnit = data[i]['transUnit'];//转诊科室
							if(transUnit != null && transUnit != ''){
								transUnit = '机构及科别：' + transUnit;
							}else{
								transUnit = '&nbsp;';
							}
							var nextVistDate = formatDate(data[i]['nextVistDate']);//下次随访日期
							var visitDoctor = removeNull(data[i]['visitDoctor']);//随访医生签名
							
							var exam01 = data[i]['exam01'];//空腹血糖值
							if(exam01 != null && exam01 != ''){
								exam01 = exam01 + 'mmol/L';
							}
							var exam02 = data[i]['exam02'];//糖化血红蛋白
							var exam03 = data[i]['exam03'];//检查日期
							var exam04 = data[i]['exam04'];//其它检查备注
							var otherExam = '';
							if(exam02 != null && exam02 != ''){
								otherExam = '糖化血红蛋白' + exam02 + '%<br />';
							}
							if(exam03 != null && exam03 != ''){
								otherExam = otherExam + '检查日期：' + formatDate(exam03) + '<br />';							
							}
							if(exam04 != null && exam04 != ''){
								otherExam = otherExam + '其他：' +  exam04;
							}
							var exam05 = removeNull(data[i]['exam05']);//低血糖反应
							var exam06 = removeNull(data[i]['exam06']);//足背动脉搏动
							
							
							var id = data[i]['id'].trim();
							ids[i] = id;
							content = content + '<td style="width:' + table_width + 'px;vertical-align: top;"><table  border="1" cellpadding="0" cellspacing="0" class="tr_td_table">'+
								'<tr><td>'+ visitDate +'</td></tr>' + 
								'<tr><td>'+ visitKind +'</td></tr>' +
								'<tr><td class="' + id + '">'+ symptomOther + '</td></tr>' +
								'<tr><td>'+ diastolicPressure + '/' + systolicPressure +'</td></tr>' +
								'<tr><td>'+ weight +'</td></tr>' +
								'<tr><td>'+ habitus +'</td></tr>' +
								'<tr><td>'+ heartRate +'</td></tr>' +
								'<tr><td>'+ exam06 +'</td></tr>' +
								'<tr><td>'+ other +'</td></tr>' +
								'<tr><td>'+ smoke +'</td></tr>' +
								'<tr><td>'+ drink +'</td></tr>' +
								'<tr><td>'+ sportTimes + sportDuration +'</td></tr>' + 
								'<tr><td>'+ food +'</td></tr>' +
								'<tr><td>'+ mindStatus +'</td></tr>' +
								'<tr><td>'+ action +'</td></tr>' +
								'<tr><td>'+ exam01 +'</td></tr>' +
								'<tr><td  style="height:50px;">'+ otherExam +'</td></tr>' +
								'<tr><td>'+ compliance +'</td></tr>' +
								'<tr><td>'+ adr +'</td></tr>' +
								'<tr><td>'+ exam05 +'</td></tr>' +
								'<tr><td>'+ visitType +'</td></tr>' +
								'<tr><td style="height:100px;vertical-align: top;" id="' + id + '" >&nbsp;</td></tr>' +
								'<tr><td>'+ transReason + transUnit +'</td></tr>' +
								'<tr><td>'+ nextVistDate +'</td></tr>' +
								'<tr><td>'+ visitDoctor +'</td></tr>' +
								'</table></td>'
						}	
						content = content + '</tr></table>';
						//获得指导记录
						QueryByHomeService.queryDirectById(ids,selectNo,function(data){
							var results = data.split(',');
							for(var k=0;k<results.length;k++){
								var result = results[k].split(':');
								var direct = result[1];
								if(direct != null && direct != '')
									direct = direct.substring(0,direct.length -1);
								else
									direct = '&nbsp;';
								$('.' + result[0]).html(direct);
							}
						});
						//获得用药情况
						QueryByHomeService.queryUseDrugById(ids,selectNo,function(data){
							var results = data.split(',');
							for(var k=0;k<results.length;k++){
								var result = results[k].split(':');
								var drug = result[1].split(';');
								var userDrug = '';
								for(var m = 0;m < drug.length - 1;m++){
									var tempDrug = drug[m].split('、');
									userDrug = userDrug + '药物名称：' + tempDrug[0] + '&nbsp;&nbsp;用法（次/日）：' + tempDrug[1] 
										+ '&nbsp;&nbsp;用量（mg/次）:' +  tempDrug[2] + '<br />'; 
								}
								$('#' + result[0]).html(userDrug);
							}
						});
					}else{
						content = '<div class="noResults">暂无记录</div>'
					}
					$("#detailContent").html(content);
				}else if(selectNo == 12){
					var content = '<table  border="1" cellpadding="0" cellspacing="0"><tr><th style="width:100px;">本次随访日期</th>'
						+ '<th style="width:100px;">下次随访时间</th><th style="width:100px;">随访医生</th><th style="width:100px;">录入人</th>'
						+ '<th style="width:550px;">目前症状</th><th>操作</th></tr>';
					for(var i = 0;i<data.length;i++){
						var name = data[i][0];
						if(name == null)
							name = '&nbsp;';
						var inputPersonId = data[i][2];
						var tempVisitDate = data[i][3];
						var visitDate = '&nbsp;';
						if(tempVisitDate != null)
							visitDate = formatDate(tempVisitDate);
						var tempNextVisitDate = data[i][4];
						var nextVisitDate = '&nbsp;';
						if(tempNextVisitDate != null)
							nextVisitDate = formatDate(tempNextVisitDate);
						var id = data[i][1];
						var visitDoctor = data[i][5];
						if(visitDoctor == null)
							visitDoctor = '&nbsp;'
						content = content + '<tr><td>' + visitDate + '</td><td>' + nextVisitDate +
							'</td><td>' + visitDoctor + '</td><td>' + inputPersonId + '</td><td>' + name + '</td>' +
							'<td style="text-align:center;"><a href="/furious_visit.html?id=' + id.trim() + '" target="view_window">查看</a></td></tr>';
					}
					var page = '<tr><td colspan="6">共有：' + data.length + '&nbsp;条记录</td></tr>'
					content = content + page + '</table>';
					$("#detailContent").html(content);
				}else if(selectNo == 13){
					var content = '<table  border="1" cellpadding="0" cellspacing="0"><tr><th style="width:100px;">接诊日期</th>'
						+ '<th style="width:100px;">接诊医生</th><th style="width:100px;">录入人</th>'
						+ '<th style="width:650px;">初步诊断</th><th>操作</th></tr>';
					for(var i = 0;i<data.length;i++){
						var inputPersonId = data[i][5];
						if(inputPersonId == null || inputPersonId == '')
							inputPersonId = '&nbsp;'
						var tempVisitDate = data[i][2];
						var visitDate = '&nbsp;';
						if(tempVisitDate != null)
							visitDate = formatDate(tempVisitDate);
						var evaluation = data[i][4];
						if(evaluation == null || evaluation == '')
							evaluation = '&nbsp;'
						var id = data[i][1];
						var visitDoctor = data[i][3];
						if(visitDoctor == null || visitDoctor == '')
							visitDoctor = '&nbsp;'
						content = content + '<tr><td>' + visitDate + '</td><td>' + visitDoctor + '</td><td>' + inputPersonId 
							+ '</td><td>' + evaluation + '</td>' +
							'<td style="text-align:center;"><a href="/reception.html?id=' + id.trim() + '" target="view_window">查看</a></td></tr>';
					}
					var page = '<tr><td colspan="6">共有：' + data.length + '&nbsp;条记录</td></tr>'
					content = content + page + '</table>';
					$("#detailContent").html(content);
				}else if(selectNo == 14){
					var content = '<table  border="1" cellpadding="0" cellspacing="0"><tr><th style="width:100px;">会诊日期</th>'
						+ '<th style="width:100px;">会诊医生</th><th style="width:100px;">录入人</th>'
						+ '<th style="width:650px;">会诊原因</th><th>操作</th></tr>';
					for(var i = 0;i<data.length;i++){
						var inputPersonId = data[i][5];
						if(inputPersonId == null || inputPersonId == '')
							inputPersonId = '&nbsp;'
						var tempVisitDate = data[i][2];
						var visitDate = '&nbsp;';
						if(tempVisitDate != null)
							visitDate = formatDate(tempVisitDate);
						var reason = data[i][4];
						if(reason == null || reason == '')
							reason = '&nbsp;'
						var id = data[i][1];
						var visitDoctor = data[i][3];
						if(visitDoctor == null || visitDoctor == '')
							visitDoctor = '&nbsp;'
						content = content + '<tr><td>' + visitDate + '</td><td>' + visitDoctor + '</td><td>' + inputPersonId 
							+ '</td><td>' + reason + '</td>' +
							'<td style="text-align:center;"><a href="/consultation.html?id=' + id.trim() + '" target="view_window">查看</a></td></tr>';
					}
					var page = '<tr><td colspan="6">共有：' + data.length + '&nbsp;条记录</td></tr>'
					content = content + page + '</table>';
					$("#detailContent").html(content);
				}else if(selectNo == 15 || selectNo == 16){
					var content = '<table  border="1" cellpadding="0" cellspacing="0"><tr><th style="width:100px;">转诊日期</th>'
						+ '<th style="width:100px;">转诊医生</th><th style="width:100px;">录入人</th>'
						+ '<th style="width:325px;">转出机构</th><th style="width:325px;">转入机构</th><th>操作</th></tr>';
					var url = '';
					if(selectNo == 15){
						url = '/cureswitch.html';
					}else if(selectNo == 16){
						url = '/cureback.html';
					}
					for(var i = 0;i<data.length;i++){
						var inputPersonId = data[i][5];
						if(inputPersonId == null || inputPersonId == '')
							inputPersonId = '&nbsp;'
						var tempVisitDate = data[i][2];
						var visitDate = '&nbsp;';
						if(tempVisitDate != null)
							visitDate = formatDate(tempVisitDate);
						var fromOrg = data[i][4];
						if(fromOrg == null || fromOrg == '')
							fromOrg = '&nbsp;'
						var exportOrg = data[i][3];
						if(exportOrg == null || exportOrg == '')
							exportOrg = '&nbsp;'
						var id = data[i][1];
						var visitDoctor = data[i][6];
						if(visitDoctor == null || visitDoctor == '')
							visitDoctor = '&nbsp;'
						content = content + '<tr><td>' + visitDate + '</td><td>' + visitDoctor + '</td><td>' + inputPersonId 
							+ '</td><td>' + fromOrg + '</td><td>' + exportOrg + '</td>' +
							'<td style="text-align:center;"><a href="' + url + '?id=' + id.trim() + '" target="view_window">查看</a></td></tr>';
					}
					var page = '<tr><td colspan="6">共有：' + data.length + '&nbsp;条记录</td></tr>'
					content = content + page + '</table>';
					$("#detailContent").html(content);
				}else if(selectNo == 17){
					var content = '<table  border="1" cellpadding="0" cellspacing="0"><tr><th style="width:100px;">建卡日期</th>'
						+ '<th style="width:100px;">录入人</th><th style="width:300px;">监护人姓名</th>'
						+ '<th style="width:450px;">与儿童关系</th><th>操作</th></tr>';
					for(var i = 0;i<data.length;i++){
						var inputPersonId = data[i][3];
						var tempVisitDate = data[i][2];
						var visitDate = '&nbsp;';
						if(tempVisitDate != null)
							visitDate = formatDate(tempVisitDate);
						var guardian = data[i][4];
						if(guardian == null  || guardian == '')
							guardian = '&nbsp;'
						var id = data[i][1];
						var relation = data[i][5];
						if(relation == null || relation == '')
							relation = '&nbsp;'
						content = content + '<tr><td>' + visitDate + '</td><td>' + inputPersonId +
							'</td><td>' + guardian + '</td><td>' + relation + '</td>' +
							'<td style="text-align:center;"><a href="/Vaccination.html?id=' + id.trim() + '" target="view_window">查看</a></td></tr>';
					}
					var page = '<tr><td colspan="6">共有：' + data.length + '&nbsp;条记录</td></tr>'
					content = content + page + '</table>';
					$("#detailContent").html(content);
				}
			});
			
		});
	});
});