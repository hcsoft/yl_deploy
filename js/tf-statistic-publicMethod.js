(function() {
	statisticObj = {
		compareDateWithCurrent : compareDateWithCurrent,
		showErrorMsg : showErrorMsg,
		compareDate : compareDate,
		getFirstDayOnMonth : getFirstDayOnMonth,
		getLastDayOnMonth : getLastDayOnMonth,
		printMonthReport : printMonthReport,
		getDataByMonth : getDataByMonth,
		queryMonthReport : queryMonthReport,
		printDateReport : printDateReport,
		queryHighRiskReport : queryHighRiskReport,
		openWin : openWin,
		queryRegisterReport : queryRegisterReport,
		dataExport : dataExport,
		dataExportRegister : dataExportRegister,
		printBirthMonthReport : printBirthMonthReport
	}

	// 与当前日期比较
	function compareDateWithCurrent(day) {
		var now = new Date();
		if (day > now) {
			return false;
		}
		return true;
	}

	// 显示错误消息
	function showErrorMsg(msg) {
		Ext.Msg.show({
			title : '错误',
			msg : msg,
			buttons : Ext.Msg.OK,
			animEl : 'elId',
			icon : Ext.MessageBox.ERROR
		});
	}

	// 比较两个日期
	function compareDate(startDay, endDay) {
		if (startDay > endDay) {
			return false;
		}
		return true;
	}

	// 获得月份的第一天
	function getFirstDayOnMonth() {
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth();
		return new Date(year, month, 01);
	}

	// 获得月份的最后一天
	function getLastDayOnMonth() {
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth();
		var day = date.getDate();
		return new Date(year, month, day);
	}

	var printCss = '<style>' +	
				'#statisticByDay thead td {border: 1px solid #000;' +
				'font-size: 13px;text-align: center;border-collapse: collapse;height:25px;line-height: 25px;}'+
				'#statisticByDay tfoot td {border: 1px solid #000;}' +
				'#statisticByDay tbody td {border: 1px solid #000;font-size: 12px;'+
				'text-align: left;border-collapse: collapse;word-spacing: 1px;letter-spacing: 2px;height:20px;' +
				'line-height: 20px;}</style>'
	
	// 打印月报表
	function printMonthReport(title) {
		var startDay = Ext.getCmp("startDate").getValue();
		var endDay = Ext.getCmp("endDate").getValue();
		if (startDay != null && startDay != '' && endDay != null
				&& endDay != '') {
			startDay = new Date(startDay).format("Y-m-d 00:00:00");
			endDay = new Date(endDay).format("Y-m-d 23:59:59");
		}
		date = startDay + '至' + endDay;
		var css = printCss;
		var titleHTML = document.getElementById("container").innerHTML;
		printObj.multiPrintProtect(css +"<body>" + titleHTML + "</body>",title,date);
	}
	//出生医学证明月报表（新）
	function printBirthMonthReport(title,html,date){
		printObj.printBirthMonthReport("<body>" + html + "</body>",title,date);
	}
	
	// 打印日报表
	function printDateReport() {
		var head = '<link rel="stylesheet" type="text/css" href="css/printReport.css" />';
		var titleHTML = document.getElementById("container").innerHTML;
		var now = new Date(Ext.getCmp("startDate").getValue());
		var date = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日';
		printObj.multiPrintProtect(head + titleHTML,"日统计报表",date);
	}

	// 获得月报表数据
	function getDataByMonth(json) {
		$("#statisticByDay").css('display', 'none');
		$('#container')
				.append(
						'<div id="showInfor"><img src="image/BigFlower.gif" height="16px" width="16px"/>正在加载数据...</div>');
		var startDay = json.startDay;
		var endDay = json.endDay;
		var service = json.service;
		service(startDay, endDay, function(data) {
			$("#statisticByDay>tbody").remove();
			var tbody = '<tbody>'
			for ( var j = 0; j < data.length; j++) {
				var d = data[j];
				tbody = tbody + '<tr><td>' + d[0] + '</td>'
				for ( var i = 1; i < d.length; i++) {
					var tmpData = d[i];
					if (tmpData == 0)
						tmpData = "&nbsp;";
					tbody = tbody + '<td style="text-align:center;">' + tmpData
							+ '</td>'
				}
				tbody = tbody + '</tr>'
			}
			tbody = tbody + '</tbody>'
			$("#statisticByDay").append(tbody);
			$("#statisticByDay").css('display', 'block');
			$("#showInfor").remove();
			Ext.getCmp('print').setDisabled(false);
		});
	}

	// 月报表查询
	function queryMonthReport(startDay, endDay, service) {
		if (startDay != null && startDay != '' && endDay != null
				&& endDay != '') {
			if (compareDateWithCurrent(startDay)
					&& compareDateWithCurrent(endDay)) {
				if (compareDate(startDay, endDay)) {
					// startDay = new Date(startDay).format("Y-m-d 0:0:0");
					// endDay = new Date(endDay).format("Y-m-d 23:59:59");
					var json = {
						startDay : startDay,
						endDay : endDay,
						service : service
					};
					getDataByMonth(json);
				} else {
					var msg = '月报表起始日期不能超过结束日期';
					showErrorMsg(msg);
				}
			} else {
				var msg = '选择的月报表日期不能超过当前日期';
				showErrorMsg(msg);
			}

		} else {
			var msg = '请选择月报表日期范围';
			showErrorMsg(msg);
		}
	}
	//数据导出
	function dataExport(startDay, endDay, service) {
		if (startDay != null && startDay != '' && endDay != null
				&& endDay != '') {
			if (compareDateWithCurrent(startDay)
					&& compareDateWithCurrent(endDay)) {
				if (compareDate(startDay, endDay)) {
					service(startDay,endDay,function(data){
						if(data!=null){
							window.location.href = data;
						}
					});
				} else {
					var msg = '月报表起始日期不能超过结束日期';
					showErrorMsg(msg);
				}
			} else {
				var msg = '选择的月报表日期不能超过当前日期';
				showErrorMsg(msg);
			}

		} else {
			var msg = '请选择月报表日期范围';
			showErrorMsg(msg);
		}
	}
	
	//出生证明数据导出
	function dataExportRegister(startDay, endDay,orgName,orgId ,service) {
		if (startDay != null && startDay != '' && endDay != null
				&& endDay != '') {
			if (compareDateWithCurrent(startDay)
					&& compareDateWithCurrent(endDay)) {
				if (compareDate(startDay, endDay)) {
					service(startDay,endDay,orgName,orgId,function(data){
						if(data!=null){
							window.location.href = data;
						}
					});
				} else {
					var msg = '月报表起始日期不能超过结束日期';
					showErrorMsg(msg);
				}
			} else {
				var msg = '选择的月报表日期不能超过当前日期';
				showErrorMsg(msg);
			}

		} else {
			var msg = '请选择月报表日期范围';
			showErrorMsg(msg);
		}
	}
	
	//填充空值
	function isNull(val){
		if(val == null || val == '')
			return '&nbsp;';
		return val;
	}
	
	//格式化出生日期
	function formatBirthday(birthday){
		if(birthday == null){
			return '&nbsp;';
		}
		return birthday.getFullYear() + '.' + (birthday.getMonth() + 1) + '.' + birthday.getDate();
	}
	
	//出生登记月报表
	function queryRegisterReport(startDay, endDay, orgName,orgId,service) {
		if (startDay != null && startDay != '' && endDay != null
				&& endDay != '') {
			if (compareDateWithCurrent(startDay)
					&& compareDateWithCurrent(endDay)) {
				if (compareDate(startDay, endDay)) {
					$("#statisticByDay").css('display', 'none');
					$('#container')
							.append(
									'<div id="showInfor"><img src="image/BigFlower.gif" height="16px" width="16px"/>正在加载数据...</div>');
					service(startDay,endDay,orgName,orgId,function(data){
						if(data != null){
							$("#statisticByDay>tbody").remove();
							var orgName = data[0];
							$('.orgName').html(orgName);
							var username = data[1];
							$('.username').html(username);
							var now = new Date();
							$('.inputDate').html(now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日');
							var certifis = data[2];
							var len = certifis.length;
							var $tbody = '<tbody>';
							for(var i = 0;i<len;i++){
								$tbody += '<tr><td>' + certifis[i].certifiId + '</td><td>' + isNull(certifis[i].name) + '</td><td>' + 
									isNull(certifis[i].sex) + '</td><td>' + formatBirthday(certifis[i].birthday) + '</td><td>' + 
									isNull(certifis[i].borthWeekly) + '</td><td>' + isNull(certifis[i].healthStatus) + '</td><td>' +
									isNull(certifis[i].motherName) + '</td><td>' + isNull(certifis[i].motherIdCard) + '</td><td>' +
									isNull(certifis[i].fatherName) + '</td><td>' + isNull(certifis[i].fatherIdCard) + '</td><td>' +
									isNull(certifis[i].familyAddress) + '</td></tr>'
							}
							$tbody += '</tbody>';
							$("#statisticByDay").append($tbody);
							$("#statisticByDay").css('display', 'block');
							$("#showInfor").remove();
							Ext.getCmp('print').setDisabled(false);
						}
					});
				} else {
					var msg = '月报表起始日期不能超过结束日期';
					showErrorMsg(msg);
				}
			} else {
				var msg = '选择的月报表日期不能超过当前日期';
				showErrorMsg(msg);
			}

		} else {
			var msg = '请选择月报表日期范围';
			showErrorMsg(msg);
		}
	}	
	
	// 获得孕产妇儿童高危数据
	function getDataByHighRisk(json) {
		$("#statisticByDay").css('display', 'none');
		$('#container')
				.append(
						'<div id="showInfor"><img src="image/BigFlower.gif" height="16px" width="16px"/>正在加载数据...</div>');
		var startDay = json.startDay;
		var endDay = json.endDay;
		var service = json.service;
		service(
				startDay,
				endDay,
				function(data) {
					$("#statisticByDay>tbody").remove();
					var tbody = '<tbody>'
					for ( var j = 0; j < data.length - 1; j++) {
						var d = data[j];
						tbody = tbody
								+ '<tr><td><span style = "display:none;">'
								+ d[0] + '</span>' + d[1] + '</td>'
						for ( var i = 2; i < d.length; i++) {
							var tmpData = d[i];
							if (tmpData == 0)
								tmpData = "&nbsp;";
							tbody = tbody
									+ '<td style="text-align:center;" class="lookable">'
									+ tmpData + '</td>'
						}
						tbody = tbody + '</tr>'
					}
					var total = data[data.length - 1];
					tbody = tbody + '<tr><td>' + total[1] + '</td>'
					for ( var i = 2; i < total.length; i++) {
						var tmpData = total[i];
						if (tmpData == 0)
							tmpData = "&nbsp;";
						tbody = tbody + '<td style="text-align:center;">'
								+ tmpData + '</td>'
					}
					tbody = tbody + '</tr></tbody>'
					$("#statisticByDay").append(tbody);
					$("#statisticByDay").css('display', 'block');
					$("#showInfor").remove();
					Ext.getCmp('print').setDisabled(false);
					$('.lookable').each(function(index) {
						$(this).bind('dblclick', function() {
							openWin($(this), index);
						}).hover(function() {
							$(this).css('cursor', 'pointer');
						}, function() {

						}).click(function() {
							$('.lookable').each(function() {
								if ($(this).hasClass('selected')) {
									$(this).removeClass('selected');
								}
								$(this).css('background-color', '#FFF');
							});
							$(this).addClass('selected');
							$(this).css('background-color', '#CAE2FE');
						});
					});
				});
	}

	// 月报表查询
	function queryHighRiskReport(startDay, endDay, service) {
		if (startDay != null && startDay != '' && endDay != null
				&& endDay != '') {
			if (compareDateWithCurrent(startDay)
					&& compareDateWithCurrent(endDay)) {
				if (compareDate(startDay, endDay)) {
					// startDay = new Date(startDay).format("Y-m-d 0:0:0");
					// endDay = new Date(endDay).format("Y-m-d 23:59:59");
					var json = {
						startDay : startDay,
						endDay : endDay,
						service : service
					};
					getDataByHighRisk(json);
				} else {
					var msg = '月报表起始日期不能超过结束日期';
					showErrorMsg(msg);
				}
			} else {
				var msg = '选择的月报表日期不能超过当前日期';
				showErrorMsg(msg);
			}

		} else {
			var msg = '请选择月报表日期范围';
			showErrorMsg(msg);
		}
	}

	
	function openWin($this, $index) {
		var orgName = $this.parent('tr').children('td').html();
		var orgId = $this.parent('tr').children('td').children('span').html();
		var indexes = $index % 8;
		var totals = $this.html();
		if (totals == '&nbsp;')
			totals = 0;
		var item = getItems(indexes);
		var titles = orgName + '->' + item + '明细，共有' + totals
				+ '人&nbsp;&nbsp;&nbsp;&nbsp;'
				+ '<span style="color:red">提示：双击可查看此人的明细</span>';

		var reader = new Ext.data.JsonReader({
			totalProperty : "totalSize",
			root : "data",
			id : this.recordId
		}, Ext.data.Record.create([ {
			name : 'fileNo'
		}, {
			name : 'name'
		}, {
			name : 'personalInfo_sex',
			mapping : 'personalInfo.sex'
		}, {
			name : 'personalInfo_birthday',
			mapping : 'personalInfo.birthday'
		}, {
			name : 'personalInfo_idnumber',
			mapping : 'personalInfo.idnumber'
		}, {
			name : 'address'
		}, {
			name : 'personalInfo_workUnit',
			mapping : 'personalInfo.workUnit'
		}, {
			name : 'personalInfo_tel',
			mapping : 'personalInfo.tel'
		} ]));

		var getParams = function() {
		      var filterKey = "";
		      var filterValue = "";
		      var isFirst = 0;
		      var cond = {
		        district : "530100",
		        filterKey : filterKey,
		        filterValue : filterValue,
		        isFirst : isFirst
		      };
		      return cond;
		 }
		var store = new Ext.data.Store({
			proxy : new Ext.ux.data.DWRProxy({
				dwrFunction : UserMenuTreeService.test("530100",10)
//				 listeners : { 
//					 'beforeload' : function(dataProxy, params) {
//						 params[dataProxy.loadArgsKey] = [ "jack" ];
//					 }.createDelegate(this)
//				 }
			}),
			reader : reader
		});

		var pagingBar = new Ext.PagingToolbar({
			pageSize : 10,
			store : store,
			displayInfo : true,
			displayMsg : '{0} - {1} of {2}',
			emptyMsg : "没有记录"
		});
		// create the Grid
		var grid = new Ext.grid.GridPanel({
			store : store,
			columns : [ {
				"header" : "档案编号",
				"dataIndex" : "fileNo"
			}, {
				"header" : "姓名",
				"dataIndex" : "name"
			}, {
				"header" : "性别",
				"dataIndex" : "personalInfo_sex"
			}, {
				"header" : "生日",
				"dataIndex" : "personalInfo_birthday",
				"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
			}, {
				"header" : "身份证号",
				"dataIndex" : "personalInfo_idnumber"
			}, {
				"header" : "住址",
				"dataIndex" : "address"
			}, {
				"header" : "工作单位",
				"dataIndex" : "personalInfo_workUnit"
			}, {
				"header" : "电话",
				"dataIndex" : "personalInfo_tel"
			} ],
			// stripeRows : true,
			layout : 'fit',
			 height : 400,
// width : 600,
			bbar : pagingBar,
			stateful : true,
			stateId : 'grid'
		});

		var win = new Ext.Window({
			modal : true,
			title : titles,
			border : false,
			items : [ grid ]
		});
		win.show();
		win.maximize();
		grid.getStore().load();
	}

	function getItems(index) {
		var items = [ '第1次产前随访', '第2~5次产前随访', '产后访视', '产后42天访视', '新生儿家庭访视记录',
				'1岁以内儿童健康体检', '1~2岁儿童健康体检', '3~6岁儿童健康体检' ];
		if (index >= items.length) {
			return '';
		}
		return items[index];
	}
})();