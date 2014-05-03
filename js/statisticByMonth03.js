Ext.onReady(function() {
	var researchPanel = new Ext.FormPanel({
		region : 'north',
		height : 35,
		frame : true,
		layout:'absolute', 
		id : 'test',
		items : [{
			xtype : 'panel',
			layout : 'form',
			x : 0,
			y : 0,
			labelAlign : 'right',
			items : [{
				xtype : 'datefield',
				fieldLabel : '月报起始日期',
				name : 'startDate',
				id : 'startDate',
				emptyText : '请选择',
				format : 'Y-m-d',
				width : 120,
				value:statisticObj.getFirstDayOnMonth()
			}]		
		},{
			xtype : 'panel',
			layout : 'form',
			x : 225,
			y : 0,
			labelAlign : 'right',
			items : [{
				xtype : 'datefield',
				fieldLabel : '月报结束日期',
				name : 'endDate',
				id : 'endDate',
				emptyText : '请选择',
				format : 'Y-m-d',
				width : 120,
				value:statisticObj.getLastDayOnMonth()
			}]		
		},{
			xtype : 'panel',
			layout : 'form',
			x : 455,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'research',
				text : '查询',
				width : 50,
				handler : function(){
					var startDay = Ext.get("startDate").getValue();
					var endDay = Ext.get("endDate").getValue();
					var service = ReportService.getDataInfoByMonth03;
					statisticObj.queryMonthReport(startDay,endDay,service);
				}
			}]
		},{
			xtype : 'panel',
			layout : 'form',
			x : 515,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'print',
				text : '打印',
				width : 50,
				handler : function(){
					statisticObj.printMonthReport('月统计报表（表三）');
				}
			}]
		}]
	});
	
	new Ext.Viewport({
	    items: [researchPanel]
	});
});