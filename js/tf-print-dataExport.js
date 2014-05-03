(function(){
	printDataExportObj = {
		printBirth : printBirth,
		printGrid : printGrid,
		initDateRange : initDateRange,
		dateToStr : dateToStr
	}
	
	function dateToStr(d,seperate){
		return d.getFullYear() + seperate + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1))
			+ seperate + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate());
	}

	function initDateRange(startDate,endDate){
		var startDate = Ext.getCmp(startDate).getValue();
		startDate = (startDate == '') ? '' : dateToStr(startDate,'-') + ' 00:00:00';
		var endDate = Ext.getCmp(endDate).getValue();
		endDate = (endDate == '') ? '' : dateToStr(endDate,'-') + ' 23:59:59';
		var date = '';
		if(startDate != '' && endDate != ''){
			date = startDate + ' 至  ' + endDate;
		}
		return date;
	}
	
	function initGridHeader(grid){
		var columns = grid.getColumnModel().config;
		var header = [];
		var data = []; 
		Ext.each(columns, function(column) {
			if(!column.hidden){
				header[column.dataIndex] = column.header;
			}
		}, this);
		data.push(header)
		return data;
	}
	
	function initGridData(grid){
		var columns = grid.getColumnModel().config;
		var data = [];
		grid.store.data.each(function(item){
			var convertedData = [];
			for (var key in item.data) {
		        var value = item.data[key];
		        Ext.each(columns, function(column) {
		          if (column.dataIndex == key) {
		            convertedData[key] = column.renderer ? column.renderer(value) : value;
		          }
		        }, this);
		    }
			data.push(convertedData);
		});
		return data;
	}
	
	function printGrid(grid,date){
		var header = initGridHeader(grid);
		var data = initGridData(grid);
		var minTitleHtml = '<tr>';
		var titleCss = 'border: 1px solid #000;font-size: 14px;line-height:25px;';
		$.each(header,function(n,v){
			for(var p in header[n]){
				if(p != 'remove'){
					minTitleHtml = minTitleHtml + '<td style="' + titleCss + '">' + header[n][p] + '</td>';	
				}
			}
		});
		minTitleHtml = minTitleHtml + '</tr>';
//		console.log(minTitleHtml);
		var tbodyCss = 'border: 1px solid #000;font-size: 12px;text-align:left;padding-left:5px;line-height:20px;';
		var tbodyHtml = '<tbody>';
		$.each(data,function(n,v){
			tbodyHtml = tbodyHtml + '<tr>';
			var obj = data[n];
			for(var p in obj){
				if(p != 'remove'){
					$.each(header,function(hn,hv){
						var hObj = header[hn];
						for(var hp in hObj){
							if(p == hp){
								tbodyHtml = tbodyHtml + '<td style="' + tbodyCss + '">' + obj[p] + '</td>';
							}
						}
					});
				}
			}
			tbodyHtml = tbodyHtml + '</tr>';
		});
		tbodyHtml = tbodyHtml + '</tbody>';
//		console.log(tbodyHtml);
		var html = '<table class="birthMonthReport" style="{border-collapse: collapse;text-align: center;width: 100%;}"><thead>' +
			minTitleHtml + '</thead>' + tbodyHtml + '</table>';
		statisticObj.printBirthMonthReport('工作业务统计报表',html,date);
	}
	
	function printBirth(data,type,date){
		var title = '出生医学证明月报表';
		var currentUserInfo = Ext.tf.currentUser;
		var username = currentUserInfo.taxempname;
		var orgname = currentUserInfo.org.name;
		var now = new Date();
		var reportDate = now.getFullYear() + '年' + ((now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1)) + '月' +
					(now.getDate() < 10 ? '0' + now.getDate() : now.getDate()) + '日';
		var bigTitle = '医疗保健机构出生登记月报表';
		var middleTitle = ['接生单位','填表人','填表日期'];
		var minTitle = ["出生医学证明编号","新生儿姓名","性别","出生日期",
		                "孕周","新生儿出生状况","母亲姓名","母亲身份证号码",
		                "父亲姓名","父亲身份证号码","家庭住址"];
		var minTitleHtml = '<tr>';
		var minTitleCss = 'border: 1px solid #000;font-size: 14px;line-height:25px;'
		for(var i = 0;i < minTitle.length;i++){
			minTitleHtml = minTitleHtml + '<td style="' + minTitleCss + '">' + minTitle[i] + '</td>';
		}
		minTitleHtml = minTitleHtml + '</tr>';
		var footRemarks = '注：1、新生儿姓名：若无则填“父亲姓名+新生儿与父亲关系”，如“XXX长子”、“XXX次子”。 <br />2、新生儿出生状况永良好、一般、差和有无畸形描述。<br/>3、本表接生单位自行印制，一份留底，一份于次月5日前报县卫生监督所。';
		var tbodyHtml = '<tbody>';
		var tbodyCss = 'border: 1px solid #000;font-size: 12px;text-align:left;padding-left:5px;line-height:20px;';
		for(var i = 0;i<data.length;i++){
			var birthday = data[i].birthday;
			if(type == 1 ){
				birthday = dateToStr(birthday,'-');
			}
			tbodyHtml = tbodyHtml + '<tr>' +
					'<td style="' + tbodyCss + '">' + data[i].certifiId + '</td>' +
					'<td style="' + tbodyCss + '">' + data[i].name + '</td>' +
					'<td style="' + tbodyCss + '">' + data[i].sex + '</td>' +
					'<td style="' + tbodyCss + '">' + birthday  + '</td>' +
					'<td style="' + tbodyCss + '">' + data[i].borthWeekly + '</td>' +
					'<td style="' + tbodyCss + '">' + data[i].healthStatus + '</td>' +
					'<td style="' + tbodyCss + '">' + data[i].motherName + '</td>' +
					'<td style="' + tbodyCss + '">' + data[i].motherIdCard + '</td>' +
					'<td style="' + tbodyCss + '">' + data[i].fatherName + '</td>' +
					'<td style="' + tbodyCss + '">' + data[i].fatherIdCard + '</td>' +
					'<td style="' + tbodyCss + '">' + data[i].familyAddress + '</td>' +
				'</tr>';
		}
		tbodyHtml = tbodyHtml + '</tbody>'; 	
		var html = '<table class="birthMonthReport" style="{border-collapse: collapse;text-align: center;width: 100%;}"><thead>' +
				'<tr><td class="bigTitle" style="font-size: 20px;font-weight: bolder;line-height:40px;" colspan="11">' + bigTitle + '</td></tr>' +
				'<tr><td>' + middleTitle[0] + '</td><td colspan="4">' + orgname + 
					'(公章)</td><td>' + middleTitle[1] + '</td><td colspan="2">' + 
					username + '</td><td>' + middleTitle[2] + '</td><td colspan="2">' +
					reportDate + '</td></tr>' + minTitleHtml +
				'</thead>' + tbodyHtml + '<tfoot><tr><td style="color : red;text-align:left;font-size: 12px;" colspan="11" class="footRemarks">' + footRemarks + '</td></tr></tfoot></table>';
		statisticObj.printBirthMonthReport(title,html,date);
	}
})();