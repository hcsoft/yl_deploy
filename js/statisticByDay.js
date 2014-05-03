//获得日报表数据
function getDataByDay(day){
	$("#statisticByDay").css('display','none');
	$('#container').append('<div id="showInfor"><img src="image/BigFlower.gif" height="16px" width="16px"/>正在加载数据...</div>');
	ReportService.getDataInfoByDay(day,function(data){
		$("#statisticByDay>tbody").remove();
		var tbody = '<tbody>'
		for(var j = 0;j<data.length;j++){
			var d = data[j];
			tbody = tbody + '<tr><td>' + d[0] + '</td>' 
			for(var i = 1;i<d.length;i++){
				var tmpData = d[i];
				if(tmpData == 0)
					tmpData = "&nbsp;";
				tbody = tbody + '<td style="text-align:center;">' + tmpData + '</td>'
			}
			tbody = tbody + '</tr>'
		}
		tbody = tbody + '</tbody>'
		$("#statisticByDay").append(tbody);
		$("#statisticByDay").css('display','block');
		$("#showInfor").remove();
		Ext.getCmp('print').setDisabled(false);
	});
}

Ext.onReady(function() {
	var researchPanel = new Ext.FormPanel({
		region : 'north',
		height : 35,
		frame : true,
		layout:'absolute', 
		id : 'test',
		items : [{
			xtype : 'panel',
			labelAlign : 'right',
			layout : 'form',
			x : -30,
			y : 0,
			items : [{
				xtype : 'datefield',
				fieldLabel : '日报日期',
				name : 'startDate',
				id : 'startDate',
				emptyText : '请选择...',
				format : 'Y-m-d',
				labelWidth : 50,
				layout: 'form',
				width : 120,
				value:new Date()
			}]		
		},{
			xtype : 'panel',
			x : 210,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'research',
				text : '查询',
				width : 50,
				handler : function(){
					var day = Ext.getCmp("startDate").getValue();
					if(day != null && day != ''){
						if(statisticObj.compareDateWithCurrent(day)){
							day = new Date(day).format("Y-m-d");
							getDataByDay(day);
						}else{
							var msg = '选择的日报表日期不能超过当前日期';
							statisticObj.showErrorMsg(msg);
						}
					}else{
						var msg = '请选择日报表日期';
						statisticObj.showErrorMsg(msg);
					}
				}
			}]
		},{
			xtype : 'panel',
			x : 270,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'print',
				id : 'print',
				disabled : true,
				text : '打印',
				width : 50,
				handler : function(){
					statisticObj.printDateReport();
				}
			}]
		},{
			xtype : 'panel',
			layout : 'form',
			x : 330,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'dataExport',
				text : '数据导出',
				width : 80,
				handler : function(){
					var day = Ext.getCmp("startDate").getValue();
					if(day != null && day != ''){
						if(statisticObj.compareDateWithCurrent(day)){
							day = new Date(day).format("Y-m-d");
							DataExportService.dataExportByDay(day,function(data){
								if(data != null){
									window.location.href = data;
								}
							});
						}else{
							var msg = '选择的日报表日期不能超过当前日期';
							statisticObj.showErrorMsg(msg);
						}
					}else{
						var msg = '请选择日报表日期';
						statisticObj.showErrorMsg(msg);
					}
				}
			}]
		}]
	});
	
	new Ext.Viewport({
//	    layout: 'frame',
	    items: [researchPanel]
	});
});