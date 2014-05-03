Ext.onReady(function() {
	var currentNode = null;
	
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
					var orgName = '';
					var orgId = '';
					if(currentNode != null){
						orgName = currentNode.text;
						orgId = currentNode.id;
					}
					var service = ReportService.getDataInfoByManageBirthCertifi;
					statisticObj.queryRegisterReport(startDay,endDay,orgName,orgId,service);
				}
			}]
		},{
			xtype : 'panel',
			layout : 'form',
			x : 485,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'print',
				text : '打印',
				id : 'print',
				disabled : true,
				width : 50,
				handler : function(){
					statisticObj.printMonthReport('');
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
					var orgName = '';
					var orgId = '';
					if(currentNode != null){
						orgName = currentNode.text;
						orgId = currentNode.id;
					}
					var service = DataExportService.dataExportRegisterBaby;
					statisticObj.dataExportRegister(startDay,endDay,orgName,orgId,service);
				}
			}]
		}]
	});
	UserMenuTreeService.getOrgMenuTree(function(data){
		var viewport = new Ext.Viewport({
			layout: 'border',
		    items: [{
		        region: 'west',
		        collapsible: true,
		        title: '组织机构',
		        xtype: 'treepanel',
		        width: 200,
		        autoScroll: true,
		        split: true,
		        id : 'orgTree',
		        name : 'orgTree',
		        loader: new Ext.tree.TreeLoader(),
		        root: new Ext.tree.AsyncTreeNode({
		        	text : 'Autos',
		        	expanded : true ,
		            draggable : false,
		            id : 'source',
		            icon : 'next.gif',
		            children : data
		        }),
		        rootVisible: false
		    },researchPanel,{
		    	region: 'center',
		    	xtype : 'panel',
		    	autoLoad : '/statisticByManageBirthCertifi.html'
		    }]
		});
		
		Ext.getCmp('orgTree').on({
			click : {
				stopEvent : true,
				fn : function(n,e){
					currentNode = n;
				}
			}
		});
	});
});