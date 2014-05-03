(function() {
	printVacciImmuneInfoObj = {
		init : init
	}
	
	function printInfo($html,$title,$ids,$gridId){
		printObj.VacciImmunePrintProtect($html,$title);
		showInfoObj.askInfo('成功打印了吗？',function(e){
			if(e == 'yes'){
				VaccinationService.printSuccess($ids,function(){
					Ext.getCmp($gridId).getStore().reload();
				});
			}
		});
	}
	
	function init(vaccineImmune,dynamicTab) {
		var fileNos = vaccineImmune.fileNo;
		var tabs = new Ext.TabPanel({
			activeTab : 0,
			items : [ {
				title : '接种登记（一）第15页',
				layout : 'fit',
				height : 410,
				id : 'tabpage15',
				autoScroll : true,
				items : [ new Ext.tf.GridPanel({
					isPaging : false,
					printPage : 15,
					fileNo : fileNos,
					gridId : 'page15Grid',
					queryUrl : VaccinationService.getPrintVacciImmuneInfo,
					readerConfig : [ {
						name : 'id'
					}, {
						name : 'number',
						mapping : 'number'
					}, {
						name : 'fileNo'
					}, {
						name : 'vaccinationName'
					}, {
						name : 'vaccinationDate'
					}, {
						name : 'vaccinationDoctor'
					}, {
						name : 'immuneBatchNum'
					}, {
						name : 'vacciAddress'
					}, {
						name : 'isPrint'
					} ],
					gridCmConfig : [ {
						"header" : "状态",
						"dataIndex" : "isPrint",
						"renderer" : function(v) {
							if (v == null || v == 0) {
								return '<span>未打印</span>';
							}else if(v == 1){
								return '<span style="color:red;">已打印</span>';
							}
							return '';
						},
						"width" : 50
					}, {
						"header" : "疫苗名称",
						"dataIndex" : "vaccinationName"
					}, {
						"header" : "剂数",
						"dataIndex" : "number",
						"renderer" : function(v) {
							if (v != null && v != '') {
								return '<span>第' + v + '剂</span>';
							}
							return '';
						}
					}, {
						"header" : "接种日期",
						"dataIndex" : "vaccinationDate",
						"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
					}, {
						"header" : "接种医生",
						"dataIndex" : "vaccinationDoctor"
					}, {
						"header" : "疫苗批号",
						"dataIndex" : "immuneBatchNum"
					}, {
						"header" : "接种地点",
						"dataIndex" : "vacciAddress"
					} ]
				}) ]
			}, {
				title : '接种登记（二）第16页',
				layout : 'fit',
				height : 410,
				autoScroll : true,
				id : 'tabpage16',
				items : [ new Ext.tf.GridPanel({
					isPaging : false,
					gridId : 'page16Grid',
					printPage : 16,
					fileNo : fileNos,
					isAutoLoad : false,
					queryUrl : VaccinationService.getPrintVacciImmuneInfo,
					readerConfig : [ {
						name : 'id'
					}, {
						name : 'number'
					}, {
						name : 'fileNo'
					}, {
						name : 'vaccinationName'
					}, {
						name : 'vaccinationDate'
					}, {
						name : 'vaccinationDoctor'
					}, {
						name : 'immuneBatchNum'
					}, {
						name : 'vacciAddress'
					}, {
						name : 'isPrint'
					} ],
					gridCmConfig : [ {
						"header" : "状态",
						"dataIndex" : "isPrint",
						"renderer" : function(v) {
							if (v == null || v == 0) {
								return '<span>未打印</span>';
							}else if(v == 1){
								return '<span style="color:red;">已打印</span>';
							}
							return '';
						},
						"width" : 50
					}, {
						"header" : "疫苗名称",
						"dataIndex" : "vaccinationName"
					}, {
						"header" : "剂数",
						"dataIndex" : "number",
						"renderer" : function(v) {
							if (v != null && v !== '') {
								return '<span>第' + v + '剂</span>';
							}
							return '';
						}
					}, {
						"header" : "接种日期",
						"dataIndex" : "vaccinationDate",
						"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
					}, {
						"header" : "接种医生",
						"dataIndex" : "vaccinationDoctor"
					}, {
						"header" : "疫苗批号",
						"dataIndex" : "immuneBatchNum"
					}, {
						"header" : "接种地点",
						"dataIndex" : "vacciAddress"
					} ]
				}) ]
			}],
			listeners : {
				tabchange : function(tp, p) {
					if(p.id == 'tabpage15'){
						Ext.getCmp('page15Grid').getStore().reload();
					}else if(p.id == 'tabpage16'){
						Ext.getCmp('page16Grid').getStore().reload();
					}
				}
			}
		});
		if(dynamicTab == 1){
			tabs.add({
				title : '其它',
				layout : 'fit',
				height : 410,
				html : '待完善...'
			});
			tabs.doLayout();
		}
		var win = new Ext.Window({
			width : 700,
			height : 500,
			modal : true,
			resizable : false,
			title : '预防接种信息打印',
			tbar : [{
				text : '刷新',
				iconCls : 'c_refresh',
				handler : function() {
					var ativeTab = tabs.getActiveTab();
					if(ativeTab.id == 'tabpage15'){
						Ext.getCmp('page15Grid').getStore().reload();
					}else if(ativeTab.id == 'tabpage16'){
						Ext.getCmp('page16Grid').getStore().reload();
					}
				}.createDelegate(this)
			}, {
				text : '打印',
				iconCls : 'c_print',
				handler : function() {
					var ativeTab = tabs.getActiveTab();
					if(ativeTab.id == 'tabpage15'){
						var selections = Ext.getCmp('page15Grid').getSelections();
						if(selections.length > 0){
							var page15Css = '<style type="text/css">.print_container {width: 20.8cm;height: 14cm;}.printVacciTable15Page {margin-left: 10.0cm;margin-top:0.6cm;width: 8.8cm;}.printVacciTable15Page tbody td {font-size:0.33cm;text-align: center;height: 0.6cm;}.printVacciTable15Page thead td {text-align: center;height: 0.4cm;}.IsDisplay {display: none;}.col01 {width: 2.4cm;}.col02 {width: 1.8cm;}.col04 {width: 1.3cm;}.col05 {width: 1.4cm;}</style>';
							var page15 = '<div class="print_container" style="display:none;"><table cellpadding="0" cellspacing="0" class="printVacciTable15Page"><thead><tr><td rowspan="2" colspan="2" class="col01"><span class="IsDisplay">疫苗名称</span></td><td rowspan="2" class="col02"><span class="IsDisplay">疫苗批号</span></td><td colspan="3" class="col03"><span class="IsDisplay">接种日期</span></td><td rowspan="2" class="col04"><span class="IsDisplay">接种医生<br />签名</span></td><td rowspan="2" class="col05"><span class="IsDisplay">家长签名</span></td></tr><tr><td style="width: 0.6cm;"><span class="IsDisplay">年</span></td><td style="width: 0.6cm;"><span class="IsDisplay">月</span></td><td style="width: 0.5cm;"><span class="IsDisplay">日</span></td></tr></thead><tbody><tr><td rowspan="3"><span class="IsDisplay">乙肝疫苗</span></td><td><span class="IsDisplay">第一剂</span></td><td class="Col_1157_1_immuneBatchNum"></td><td class="Col_1157_1_year"></td><td class="Col_1157_1_month"></td><td class="Col_1157_1_day"></td><td class="Col_1157_1_doctor"></td><td></td></tr><tr><td><span class="IsDisplay">第二剂</span></td><td class="Col_1157_2_immuneBatchNum"></td><td class="Col_1157_2_year"></td><td class="Col_1157_2_month"></td><td class="Col_1157_2_day"></td><td class="Col_1157_2_doctor"></td><td></td></tr><tr><td><span class="IsDisplay">第三剂</span></td><td class="Col_1157_3_immuneBatchNum"></td><td class="Col_1157_3_year"></td><td class="Col_1157_3_month"></td><td class="Col_1157_3_day"></td><td class="Col_1157_3_doctor"></td><td></td></tr><tr><td colspan="2"><span class="IsDisplay">卡介苗</span></td><td class="Col_1158_1_immuneBatchNum"></td><td class="Col_1158_1_year"></td><td class="Col_1158_1_month"></td><td class="Col_1158_1_day"></td><td class="Col_1158_1_doctor"></td><td></td></tr><tr><td rowspan="4"><span class="IsDisplay">脊灰疫苗</span></td><td><span class="IsDisplay">第一剂</span></td><td class="Col_1356_1_immuneBatchNum"></td><td class="Col_1356_1_year"></td><td class="Col_1356_1_month"></td><td class="Col_1356_1_day"></td><td class="Col_1356_1_doctor"></td><td></td></tr><tr><td><span class="IsDisplay">第二剂</span></td><td class="Col_1356_2_immuneBatchNum"></td><td class="Col_1356_2_year"></td><td class="Col_1356_2_month"></td><td class="Col_1356_2_day"></td><td class="Col_1356_2_doctor"></td><td></td></tr><tr><td><span class="IsDisplay">第三剂</span></td><td class="Col_1356_3_immuneBatchNum"></td><td class="Col_1356_3_year"></td><td class="Col_1356_3_month"></td><td class="Col_1356_3_day"></td><td class="Col_1356_3_doctor"></td><td></td></tr><tr><td><span class="IsDisplay">第四剂</span></td><td class="Col_1356_4_immuneBatchNum"></td><td class="Col_1356_4_year"></td><td class="Col_1356_4_month"></td><td class="Col_1356_4_day"></td><td class="Col_1356_4_doctor"></td><td></td></tr><tr><td rowspan="4"><span class="IsDisplay">百白破疫苗</span></td><td><span class="IsDisplay">第一剂</span></td><td class="Col_1357_1_immuneBatchNum"></td><td class="Col_1357_1_year"></td><td class="Col_1357_1_month"></td><td class="Col_1357_1_day"></td><td class="Col_1357_1_doctor"></td><td></td></tr><tr><td><span class="IsDisplay">第二剂</span></td><td class="Col_1357_2_immuneBatchNum"></td><td class="Col_1357_2_year"></td><td class="Col_1357_2_month"></td><td class="Col_1357_2_day"></td><td class="Col_1357_2_doctor"></td><td></td></tr><tr><td><span class="IsDisplay">第三剂</span></td><td class="Col_1357_3_immuneBatchNum"></td><td class="Col_1357_3_year"></td><td class="Col_1357_3_month"></td><td class="Col_1357_3_day"></td><td class="Col_1357_3_doctor"></td><td></td></tr><tr><td><span class="IsDisplay">第四剂</span></td><td class="Col_1357_4_immuneBatchNum"></td><td class="Col_1357_4_year"></td><td class="Col_1357_4_month"></td><td class="Col_1357_4_day"></td><td class="Col_1357_4_doctor"></td><td></td></tr><tr><td colspan="2"><span class="IsDisplay">白破疫苗</span></td><td class="Col_1358_1_immuneBatchNum"></td><td class="Col_1358_1_year"></td><td class="Col_1358_1_month"></td><td class="Col_1358_1_day"></td><td class="Col_1358_1_doctor"></td><td></td></tr><tr><td rowspan="2"><span class="IsDisplay">麻疹疫苗</span></td><td><span class="IsDisplay">第一剂</span></td><td class="Col_1359_1_immuneBatchNum"></td><td class="Col_1359_1_year"></td><td class="Col_1359_1_month"></td><td class="Col_1359_1_day"></td><td class="Col_1359_1_doctor"></td><td></td></tr><tr><td><span class="IsDisplay">第二剂</span></td><td class="Col_1359_2_immuneBatchNum"></td><td class="Col_1359_2_year"></td><td class="Col_1359_2_month"></td><td class="Col_1359_2_day"></td><td class="Col_1359_2_doctor"></td><td></td></tr><tr><td rowspan="2"><span class="IsDisplay">麻风疫苗</span></td><td><span class="IsDisplay">第一剂</span></td><td class="Col_1482_1_immuneBatchNum"></td><td class="Col_1482_1_year"></td><td class="Col_1482_1_month"></td><td class="Col_1482_1_day"></td><td class="Col_1482_1_doctor"></td><td></td></tr><tr><td><span class="IsDisplay">第二剂</span></td><td class="Col_1482_2_immuneBatchNum"></td><td class="Col_1482_2_year"></td><td class="Col_1482_2_month"></td><td class="Col_1482_2_day"></td><td class="Col_1482_2_doctor"></td><td></td></tr></tbody></table></div>';
							$(page15).appendTo("body");
							var ids = [];
							var printFlag = false;
							$.each(selections,function(v){
								var obj = selections[v];
								var colNum = obj.json.colNum;
								var number = obj.json.number;
								var doctor = obj.json.vaccinationDoctor;
								var clazz_immuneBatchNum = 'Col_' + colNum + '_' + number + '_immuneBatchNum';
								var examDate = obj.json.vaccinationDate;
								var year = examDate.getFullYear();
								var months = calculateTimeObj.addZero(examDate.getMonth() + 1);
								var day = calculateTimeObj.addZero(examDate.getDate());
								var clazz_year = 'Col_' + colNum + '_' + number + '_year';
								var clazz_month = 'Col_' + colNum + '_' + number + '_month';
								var clazz_day = 'Col_' + colNum + '_' + number + '_day';
								var clazz_doctor = 'Col_' + colNum + '_' + number + '_doctor';
								$('.' + clazz_immuneBatchNum).html(obj.json.immuneBatchNum);
//								$('.' + clazz_immuneBatchNum).html('20101206-2');
								$('.' + clazz_year).html(year);
								$('.' + clazz_month).html(months);
								$('.' + clazz_day).html(day);
								$('.' + clazz_doctor).html(doctor);
								ids.push(obj.json.id);
								console.log(obj.json)
								if(obj.json.isPrint == 1){
									printFlag = true;
								}
							});
							var $html = page15Css + '<body><div class="print_container">' + $('.print_container').html() + '</div></body>';
							var $title = '接种登记（一）第15页';
							if(printFlag){
								showInfoObj.askInfo('选中的打印行存在已经打印过的记录，确定重复打印吗？',function(e){
									if(e == 'no'){
										$('.print_container').remove();
										return;
									}else{
										printInfo($html,$title,ids,'page15Grid');
										$('.print_container').remove();
									}
								});
							}else{
								printInfo($html,$title,ids,'page15Grid');
								$('.print_container').remove();
							}
						}
					}else if(ativeTab.id == 'tabpage16'){
						var selections = Ext.getCmp('page16Grid').getSelections();
						if(selections.length > 0){
							var page16Css = '<style type="text/css">.print_container_16 {width: 19.8cm;height: 13cm;}.printVacciTable16Page {width: 8.8cm;}.printVacciTable16Page tbody td {font-size: 0.33cm;text-align: center;height: 0.6cm;}.printVacciTable16Page thead td {text-align: center;height: 0.4cm;}.IsDisplay {display: none;}.col01 {width: 1.9cm;}.col02 {width: 1.4cm;}.col04 {width: 1.6cm;}.col05 {width: 1.4cm;}</style>';
							var page16 = '<div class="print_container_16"><table cellpadding="0" cellspacing="0" class="printVacciTable16Page"><thead><tr><td rowspan="2" colspan="2" class="col01"><spanclass="IsDisplay">疫苗名称</span></td><td rowspan="2" class="col02"><span class="IsDisplay">疫苗批号</span></td><td colspan="3" class="col03"><span class="IsDisplay">接种日期</span></td><td rowspan="2" class="col04"><span class="IsDisplay">接种医生<br />签名</span></td><td rowspan="2" class="col05"><span class="IsDisplay">家长签名</span></td></tr><tr><td style="width: 0.5cm;"><span class="IsDisplay">年</span></td><td style="width: 0.6cm;"><span class="IsDisplay">月</span></td><td style="width: 0.5cm;"><span class="IsDisplay">日</span></td></tr></thead><tbody><tr><td rowspan="2"><span class="IsDisplay">麻腮风疫苗</span></td><td><span class="IsDisplay">第一剂</span></td><td class="Col_1360_1_immuneBatchNum"></td><td class="Col_1360_1_year"></td><td class="Col_1360_1_month"></td><td class="Col_1360_1_day"></td><td class="Col_1360_1_doctor"></td><td></td></tr><tr><td><span class="IsDisplay">第二剂</span></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td rowspan="2"><span class="IsDisplay">麻腮疫苗</span></td><td><span class="IsDisplay">第一剂</span></td><td class="Col_1483_1_immuneBatchNum"></td><td class="Col_1483_1_year"></td><td class="Col_1483_1_month"></td><td class="Col_1483_1_day"></td><td class="Col_1483_1_doctor"></td><td></td></tr><tr><td><span class="IsDisplay">第二剂</span></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td rowspan="2"><span class="IsDisplay">乙脑减毒活疫苗</span></td><td><span class="IsDisplay">第一剂</span></td><td class="Col_1361_1_immuneBatchNum"></td><td class="Col_1361_1_year"></td><td class="Col_1361_1_month"></td><td class="Col_1361_1_day"></td><td class="Col_1361_1_doctor"></td><td></td></tr><tr><td><span class="IsDisplay">第二剂</span></td><td class="Col_1361_2_immuneBatchNum"></td><td class="Col_1361_2_year"></td><td class="Col_1361_2_month"></td><td class="Col_1361_2_day"></td><td class="Col_1361_2_doctor"></td><td></td></tr><tr><td rowspan="4"><span class="IsDisplay">乙脑灭活疫苗</span></td><td><span class="IsDisplay">第一剂</span></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td><span class="IsDisplay">第二剂</span></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td><span class="IsDisplay">第三剂</span></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td><span class="IsDisplay">第四剂</span></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td rowspan="2"><span class="IsDisplay">A群流脑疫苗</span></td><td><span class="IsDisplay">第一剂</span></td><td class="Col_1362_1_immuneBatchNum"></td><td class="Col_1362_1_year"></td><td class="Col_1362_1_month"></td><td class="Col_1362_1_day"></td><td class="Col_1362_1_doctor"></td><td></td></tr><tr><td><span class="IsDisplay">第二剂</span></td><td class="Col_1362_2_immuneBatchNum"></td><td class="Col_1362_2_year"></td><td class="Col_1362_2_month"></td><td class="Col_1362_2_day"></td><td class="Col_1362_2_doctor"></td><td></td></tr><tr><td rowspan="2"><span class="IsDisplay">A+C流脑疫苗</span></td><td><span class="IsDisplay">第一剂</span></td><td class="Col_1363_1_immuneBatchNum"></td><td class="Col_1363_1_year"></td><td class="Col_1363_1_month"></td><td class="Col_1363_1_day"></td><td class="Col_1363_1_doctor"></td><td></td></tr><tr><td><span class="IsDisplay">第二剂</span></td><td class="Col_1363_2_immuneBatchNum"></td><td class="Col_1363_2_year"></td><td class="Col_1363_2_month"></td><td class="Col_1363_2_day"></td><td class="Col_1363_2_doctor"></td><td></td></tr><tr><td><span class="IsDisplay">甲肝减毒活疫苗</span></td><td><span class="IsDisplay">第一剂</span></td><td class="Col_1364_1_immuneBatchNum"></td><td class="Col_1364_1_year"></td><td class="Col_1364_1_month"></td><td class="Col_1364_1_day"></td><td class="Col_1364_1_doctor"></td><td></td></tr><tr><td rowspan="2"><span class="IsDisplay">甲肝灭活疫苗</span></td><td><span class="IsDisplay">第一剂</span></td><td class="Col_1369_1_immuneBatchNum"></td><td class="Col_1369_1_year"></td><td class="Col_1369_1_month"></td><td class="Col_1369_1_day"></td><td class="Col_1369_1_doctor"></td><td></td></tr><tr><td><span class="IsDisplay">第二剂</span></td><td class="Col_1369_2_immuneBatchNum"></td><td class="Col_1369_2_year"></td><td class="Col_1369_2_month"></td><td class="Col_1369_2_day"></td><td class="Col_1369_2_doctor"></td><td></td></tr></tbody></table></div>';
							$(page16).appendTo("body");
							var ids = [];
							var printFlag = false;
							$.each(selections,function(v){
								var obj = selections[v];
								var colNum = obj.json.colNum;
								var number = obj.json.number;
								var doctor = obj.json.vaccinationDoctor;
								var clazz_immuneBatchNum = 'Col_' + colNum + '_' + number + '_immuneBatchNum';
								var examDate = obj.json.vaccinationDate;
								var year = examDate.getFullYear();
								var months = calculateTimeObj.addZero(examDate.getMonth() + 1);
								var day = calculateTimeObj.addZero(examDate.getDate());
								var clazz_year = 'Col_' + colNum + '_' + number + '_year';
								var clazz_month = 'Col_' + colNum + '_' + number + '_month';
								var clazz_day = 'Col_' + colNum + '_' + number + '_day';
								var clazz_doctor = 'Col_' + colNum + '_' + number + '_doctor';
								$('.' + clazz_immuneBatchNum).html(obj.json.immuneBatchNum);
//								$('.' + clazz_immuneBatchNum).html('20101206-2');
								$('.' + clazz_year).html(year);
								$('.' + clazz_month).html(months);
								$('.' + clazz_day).html(day);
								$('.' + clazz_doctor).html(doctor);
								ids.push(obj.json.id);
								if(obj.json.isPrint == 1){
									printFlag = true;
								}
							});
							var $html = page16Css + '<body><div class="print_container_16">' + $('.print_container_16').html() + '</div></body>';
							var $title = '接种登记（二）第16页';
							if(printFlag){
								showInfoObj.askInfo('选中的打印行存在已经打印过的记录，确定重复打印吗？',function(e){
									if(e == 'no'){
										$('.print_container_16').remove();
										return;
									}else{
										printInfo($html,$title,ids,'page16Grid');
										$('.print_container_16').remove();
									}
								});
							}else{
								printInfo($html,$title,ids,'page16Grid');
								$('.print_container_16').remove();
							}
						}
					}
				}.createDelegate(this)
			}, {
				text : '关闭',
				iconCls : 'c_del',
				handler : function() {
					win.close();
				}.createDelegate(this)
			} ],
			items : [ tabs ]
		});
		win.show();
	}
})();