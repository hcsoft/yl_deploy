Ext.onReady(function() {	
	var researchPanel = new Ext.FormPanel({
		region : 'north',
		height : 35,
		frame : true,
		id : 'test',
		layout : "absolute",
		items : [{
			xtype : 'panel',
			layout : 'form',
			x : -30,
			y : 0,
			labelAlign : 'right',
			items : [{
				xtype : 'datefield',
				fieldLabel : '起始日期',
				name : 'startDate',
				id : 'startDate',
				emptyText : '请选择...',
				format : 'Y-m-d',
				width : 120,
				value:statisticObj.getFirstDayOnMonth()
			}]		
		},{
			xtype : 'panel',
			layout : 'form',
			x : 195,
			y : 0,
			labelAlign : 'right',
			items : [{
				xtype : 'datefield',
				fieldLabel : '结束日期',
				name : 'endDate',
				id : 'endDate',
				emptyText : '请选择...',
				format : 'Y-m-d',
				width : 120,
				value:statisticObj.getLastDayOnMonth()
			}]		
		},{
			xtype : 'panel',
			layout : 'form',
			x : 425,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'research',
				text : '查询',
				width : 50,
				handler : function(){
					var startDay = Ext.get("startDate").getValue();
					var endDay = Ext.get("endDate").getValue();
					var service = ReportService.getHighRiskData;
					statisticObj.queryHighRiskReport(startDay,endDay,service);
				}
			}]
		},/**{
			xtype : 'panel',
			layout : 'form',
			x : 480,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'lookDetails',
				text : '查看明细',
				width : 50,
				handler : function(){
					var flag = true;
					$('.lookable').each(function(index){
						if($(this).hasClass('selected')){
							flag = false;
							statisticObj.openWin($(this),index);	
						}
					});
					if(flag){
						statisticObj.showErrorMsg('请先选择需要查看的乡镇及对应的项目');
					}
				}
			}]
		},**/{
			xtype : 'panel',
			layout : 'form',
			x : 485,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'print',
				id : 'print',
				disabled : true,
				text : '打印',
				width : 50,
				handler : function(){
					statisticObj.printMonthReport('高危汇总统计');
				}
			}]
		},{
			xtype : 'panel',
			layout : 'form',
			x : 545,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'dataExport',
				text : '数据导出',
				width : 80,
				handler : function(){
					var startDay = Ext.get("startDate").getValue();
					var endDay = Ext.get("endDate").getValue();
					var service = DataExportService.dataExportByHighRisk;
					statisticObj.dataExport(startDay,endDay,service);
				}
			}]
		}]
	});
	
	new Ext.Viewport({
	    items: [researchPanel]
	});
});