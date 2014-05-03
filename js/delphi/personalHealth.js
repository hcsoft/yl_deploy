function addZero(val){
	return val < 10 ? '0' + val : val;
}
function date2String(date){
	return date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate());
}

function genBusinessVal(id,date,type){
	if(date != null){
		return '<span style="display:none;" id="' + id + '">' + type + '</span><span>' + date2String(date) + '<span>';
	}
	return '&nbsp;';
}
function fillVisitAfterBornItem(id,val,type){
	if(val != null){
		return '<span style="display:none;" id="' + id + '">' + type + '</span><span>' + val + '<span>';
	}
	return '&nbsp;';
}
function fillVisitBeforeBornItem(id,val,type){
	if(val != null){
		return '<span style="display:none;" id="' + id + '">' + type + '</span><span>第' + val + '次<span>';
	}
	return '&nbsp;';
}

function genBusinessFillData(data){
	var $tbody = '<tbody>';
	var $tbodyTrTd = '';
	$.each(data,function(n,val){
		$tbodyTrTd = $tbodyTrTd + '<tr><td>' + 
				genBusinessVal(val.medicalExamId,val.medicalExamDate,0) + '</td><td>' + 
				genBusinessVal(val.babyVisitId,val.babyVisitDate,1) + '</td><td>' + 
				genBusinessVal(val.childrenMediExam01id,val.childrenMediExam01date,2) + '</td><td>' + 
				genBusinessVal(val.childrenMediExam02id,val.childrenMediExam02date,3) + '</td><td>' + 
				genBusinessVal(val.childrenMediExam36id,val.childrenMediExam36date,4) + '</td><td>' + 
				genBusinessVal(val.firstVistBeforeBornId,val.firstVistBeforeBornDate,5) + '</td><td>' +
				fillVisitBeforeBornItem(val.visitBeforeBornId,val.visitBeforeBornItem,6) + '</td><td>' + 
				genBusinessVal(val.visitBeforeBornId,val.visitBeforeBornDate,6) + '</td><td>' + 
				fillVisitAfterBornItem(val.visitAfterBornId,val.visitAfterBornItem,7) + '</td><td>' + 
				genBusinessVal(val.visitAfterBornId,val.visitAfterBornDate,7) + '</td><td>' + 
				genBusinessVal(val.visitAfterBorn42id,val.visitAfterBorn42date,8) + '</td><td>' + 
				genBusinessVal(val.hypertensionVisitId,val.hypertensionVisitDate,9) + '</td><td>' + 
				genBusinessVal(val.diabetesVisitId,val.diabetesVisitDate,10) + '</td><td>' + 
				genBusinessVal(val.furiousVisitId,val.furiousVisitDate,11) + '</td><td>疾控待完善</td></tr>';
	});
	$tbody = $tbody + $tbodyTrTd + '</tbody>';
	return $tbody;
}

function services(id,type){
	var url = '';
	if(type == 0){
		url = '/medicalExam.html';
	}else if(type == 1){
		url = '/babyvisit.html';
	}else if(type == 2){
		url = '/childexam1.html';
	}else if(type == 3){
		url = '/childexam2.html';
	}else if(type == 4){
		url = '/childexam3_6.html';
	}else if(type == 5){
		url = '/firstvisit.html';
	}else if(type == 6){
		url = '/VisitBeforeBorn.html';
	}else if(type == 7){
		url = '/visitAfterBorn.html';
	}else if(type == 8){
		url = '/visitAfterBorn42.html';
	}else if(type == 9){
		url = '/hyp_visit.html';
	}else if(type == 10){
		url = '/t2dm_visit.html';
	}else if(type == 11){
		url = '/furious_visit.html';
	}
	return url + '?id=' + id + '&histype=1';
}

function getTitle(type){
	var title = '';
	if(type == 0){
		title = '健康体检';
	}else if(type == 1){
		title = '新生儿访视';
	}else if(type == 2){
		title = '1岁以内儿童体检';
	}else if(type == 3){
		title = '1~2岁儿童体检';
	}else if(type == 4){
		title = '3~6岁儿童体检';
	}else if(type == 5){
		title = '第1次产前随访';
	}else if(type == 6){
		title = '第2~5次产前随访';
	}else if(type == 7){
		title = '产后访视';
	}else if(type == 8){
		title = '产后42天访视';
	}else if(type == 9){
		title = '高血压随访';
	}else if(type == 10){
		title = '糖尿病随访';
	}else if(type == 11){
		title = '重性精神病随访';
	}
	return title;
}

function addTabPanel(id,type,examdate){
	var indexTabPanel = Ext.getCmp('indexPanel');
	var myUrl = services(id, type);
	var gid = Ext.getCmp(id);
	if(gid == null){
		var tp = new Ext.TabPanel({
//			iconCls : 'tab',
			id : id,
			enableTabScroll : true,
			xtype : 'tabpanel',
			closable : true,
			title : getTitle(type),
			html : '<iframe style="width:99%;height:98.5%;" id="text" src="' + myUrl + '"></iframe>'
		});
		indexTabPanel.add(tp);
	}
	
	indexTabPanel.setActiveTab(id);
	indexTabPanel.doLayout();
}

function listenerTDdbClick() {
	$.each($('.table_BusinessData tbody td'), function() {
		$(this).dblclick(function() {
			var firstSpan = $(this).children('span');
			if (firstSpan.length > 0) {
				var id = firstSpan.attr('id');
				var type = firstSpan.html();
				addTabPanel(id,type);
			}
		}).click(function() {
			$.each($('.table_BusinessData tbody td'), function() {
				$(this).css('background-color', '#FFF');
				$(this).removeClass('selected');
			});
			$(this).css('background-color', 'red');
			$(this).addClass('selected');
		}).hover(function() {
			if (!$(this).hasClass('selected'))
				$(this).css('background-color', '#d5edf9');
		}, function() {
			if (!$(this).hasClass('selected'))
				$(this).css('background-color', '#FFF');
		});
	});
}

function parseParams(url){
	url = url.substring(1,url.length);
	var addressSymble = url.split('&');
	var json = '{';
	for(var i = 0;i<addressSymble.length;i++){
		var equalSymble = addressSymble[i].split('=');
		json = json + equalSymble[0] + ':"' + equalSymble[1] + '",';
	}
	if(json != null){
		return eval('(' + json.substring(0,json.length - 1) + '})');
	}
	return null;
}

Ext.onReady(function(){
//	var fileNo = '530521101204000982';
	var json = parseParams(window.location.search)
	summaryService.queryBusinessDataDelphi(json.fileNo,function(data){
		if(data != null){
			var basicInfo = data[0];
			var detailInfo = data[1];
			var $table_basic = '<table onselectstart= "return false;" cellpadding="0" cellspacing="0" class="table_BasicInfo">' +
				'<thead>' + 
					'<tr><td>名称</td><td>值</td></tr>'+
				'</thead>';
			var birthday = basicInfo.birthday;
			var folk = basicInfo.folk;
			folk =  folk != '' ? (folk == '少数民族' ? basicInfo.folkOther : folk ) : '';
			var $tbody_basic = '<tbody>' + 
							'<tr><td>档案编号</td><td>' + basicInfo.fileNo + '</td></tr>' + 
							'<tr><td>姓名</td><td>' + basicInfo.name + '</td></tr>' + 
							'<tr><td>性别</td><td>' + basicInfo.sex + '</td></tr>' + 
							'<tr><td>民族</td><td>' + folk + '</td></tr>' + 
							'<tr><td>出生日期</td><td>' + birthday.getFullYear() + '年' + (birthday.getMonth() + 1) + '月' + birthday.getDate() + '日' + '</td></tr>' + 
							'<tr><td>身份证号</td><td>' + basicInfo.idnumber + '</td></tr>' + 
							'<tr><td>现住址</td><td>' + basicInfo.address + '</td></tr>' + 
							'<tr><td>户籍住址</td><td>' + basicInfo.residenceAddress + '</td></tr>' + 
						'</tbody>';
			$table_basic = $table_basic + $tbody_basic + '</table>';
			
			var $table_detail = '<table onselectstart= "return false;" cellpadding="0" cellspacing="0" class="table_BusinessData">' +
				'<thead>' + 
					'<tr><td>健康体检</td><td colspan="4">儿童体检</td><td colspan="6">孕产妇体检</td><td colspan="3">慢性病</td><td>疾控</td></tr>'+
					'<tr><td>健康体检</td><td>新生儿</td><td>1岁以内</td><td>1~2岁</td><td>3~6岁</td><td>第1次</td><td colspan="2">第2~5次</td><td colspan="2">产后</td><td>产后42天</td><td>高血压</td><td>糖尿病</td><td>重性精神病</td><td>疾控</td></tr>'+
					'<tr><td>体检日期</td><td>访视日期</td><td>体检日期</td><td>体检日期</td><td>体检日期</td><td>随访日期</td><td>项目</td><td>随访日期</td><td>项目</td><td>访视日期</td><td>体检日期</td><td>随访日期</td><td>随访日期</td><td>随访日期</td><td>疾控待完善</td></tr>'+
				'</thead>';
			var $tbody_detail = '';
			
			if(detailInfo != null){
				$tbody_detail = genBusinessFillData(detailInfo);
				listenerTDdbClick();
			}
			$table_detail = $table_detail + $tbody_detail + '</table>';
			
			function GatherTypeFun(v){
				if(v == 0){
					return '<span>自费</span>';
				}else if(v == 1){
					return '<span>职工医保</span>';
				}else if(v == 2){
					return '<span>新农合</span>';
				}else if(v == 3){
					return '<span>居民医保</span>';
				}
			}
			
			var outpatientPanel = new Ext.szgr.PersonalHealthPanel({
				bartitle : '最近三个月的门诊记录',
				idsArray : {
					startDate : 'outpatientStartDate',
					endDate : 'outpatientEndDate'
				},
				queryType : 0,
				queryUrl : summaryService.getOutpatient,
				fileNo : json.fileNo,
				readerConfig : [ {
					name : 'id'
				}, {
					name : 'hospitalName'
				}, {
					name : 'outpatientdate',
					mapping : 'date'
				}, {
					name : 'section'
				}, {
					name : 'doctor'
				}, {
					name : 'diagnosis'
				}, {
					name : 'signs'
				}, {
					name : 'gatherType'
				}, {
					name : 'allMoney'
				}, {
					name : 'wipeMoney'
				}, {
					name : 'makeDate'
				}, {
					name : 'makePerson'
				} ],
				gridCmConfig : [{
					"header" : "医疗机构",
					"dataIndex" : "hospitalName",
					"align" : "center"
				}, {
					"header" : "诊断",
					"dataIndex" : "diagnosis",
					"align" : "center",
					"width" : 200
				}, {
					"header" : "体征",
					"dataIndex" : "signs",
					"align" : "center",
					"width" : 200
				}, {
					"header" : "就诊日期",
					"dataIndex" : "outpatientdate",
					"renderer" : Ext.util.Format.dateRenderer('Y-m-d'),
					"align" : "center"
				}, {
					"header" : "科室",
					"dataIndex" : "section",
					"align" : "center"
				}, {
					"header" : "医生",
					"dataIndex" : "doctor",
					"align" : "center"
				}, {
					"header" : "结算类型",
					"dataIndex" : "gatherType",
					"align" : "center",
					"renderer" : GatherTypeFun
				}, {
					"header" : "结算金额",
					"dataIndex" : "allMoney",
					"align" : "center"					
				}, {
					"header" : "报销金额",
					"dataIndex" : "wipeMoney",
					"align" : "center"
				}, {
					"header" : "上传日期",
					"dataIndex" : "makeDate",
					"renderer" : Ext.util.Format.dateRenderer('Y-m-d'),
					"align" : "center"
				}, {
					"header" : "操作员",
					"dataIndex" : "makePerson",
					"align" : "center"
				} ]
			});
			
			var inpatientPanel = new Ext.szgr.PersonalHealthPanel({
				bartitle : '最近三个月的住院记录',
				idsArray : {
					startDate : 'inpatientStartDate',
					endDate : 'inpatientEndDate'
				},
				queryType : 1,
				queryUrl : summaryService.getInpatient,
				fileNo : json.fileNo,
				readerConfig : [ {
					name : 'id'
				}, {
					name : 'hospitalName'
				}, {
					name : 'inDate'
				}, {
					name : 'outDate'
				}, {
					name : 'section'
				}, {
					name : 'doctor'
				}, {
					name : 'nurse'
				}, {
					name : 'diagnosis'
				}, {
					name : 'signs'
				}, {
					name : 'gatherType'
				}, {
					name : 'allMoney'
				}, {
					name : 'wipeMoney'
				}, {
					name : 'makeDate'
				}, {
					name : 'makePerson'
				} ],
				gridCmConfig : [{
					"header" : "医疗机构",
					"dataIndex" : "hospitalName",
					"align" : "center"
//					"width" : 200
				}, {
					"header" : "诊断",
					"dataIndex" : "diagnosis",
					"align" : "center",
					"width" : 200
				}, {
					"header" : "体征",
					"dataIndex" : "signs",
					"align" : "center",
					"width" : 200
				}, {
					"header" : "入院日期",
					"dataIndex" : "inDate",
					"renderer" : Ext.util.Format.dateRenderer('Y-m-d'),
					"align" : "center"
				}, {
					"header" : "出院日期",
					"dataIndex" : "outDate",
					"renderer" : Ext.util.Format.dateRenderer('Y-m-d'),
					"align" : "center"
				}, {
					"header" : "科室",
					"dataIndex" : "section",
					"align" : "center"
				}, {
					"header" : "主管医生",
					"dataIndex" : "doctor",
					"align" : "center"
				}, {
					"header" : "责任护士",
					"dataIndex" : "nurse",
					"align" : "center"
				}, {
					"header" : "结算类型",
					"dataIndex" : "gatherType",
					"align" : "center",
					"renderer" : GatherTypeFun
				}, {
					"header" : "住院金额",
					"dataIndex" : "allMoney",
					"align" : "center"
				}, {
					"header" : "报销金额",
					"dataIndex" : "wipeMoney",
					"align" : "center"
				}, {
					"header" : "上传日期",
					"dataIndex" : "makeDate",
					"align" : "center",
					"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
				}, {
					"header" : "操作员",
					"dataIndex" : "makePerson",
					"align" : "center"
				} ]
			});
			
			new Ext.Viewport({
			    layout: 'border',
			    items: [{
			        region: 'west',
			        collapsible: true,
			        title: '基本信息',
			        xtype: 'panel',
			        width: 250,
			        autoScroll: true,
			        split: true,
			        html : $table_basic
			    }, {
			        region: 'center',
			        xtype: 'tabpanel',
			        activeTab: 0,
			        id : 'indexPanel',
			        autoScroll : true,
			        items: [{
			        	xtype : 'panel',
			            title: '服务健康索引',
			            layout : 'border',
			            autoScroll : true,
			            items : [{
//			            	title : '健康体检记录',
			            	html: $table_detail,
			            	layout : 'fit',
							region:'center',
							autoScroll : true
			            }]
			        },{
			        	xtype : 'panel',
			        	title : '门诊信息',
			        	layout : 'fit',
		            	autoScroll : true,
		            	items : [outpatientPanel]
			        },{
			        	xtype : 'panel',
			        	title : '住院信息',
			        	layout : 'fit',
		            	autoScroll : true,
		            	items : [inpatientPanel]
			        }]
			    }]
			});
			listenerTDdbClick();
		}
	});
});