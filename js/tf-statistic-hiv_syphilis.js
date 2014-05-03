Ext.ns('Ext.tf')

Ext.tf.HIVAndSyphilisPanel = Ext.extend(Ext.Panel,{
	closable : true,
	pageSize : 10,
	layout : 'fit',
	recordId : 'id',
	readerConfig : [],
	gridCmConfig : [],
	queryUrl : Ext.emptyFn,
	initComponent: function(){
		this.build();
		Ext.tf.HIVAndSyphilisPanel.superclass.initComponent.call(this);
	},
	
	build : function(){
		this.items = [ this.createPanel() ];
	},
	
	getParams : function(){
		var startDate = Ext.getCmp('hiv_syphilis_startdate').getValue();
		var endDate = Ext.getCmp('hiv_syphilis_enddate').getValue();
		var org = Ext.getCmp('statisticByOrg_hiv_syphilis').getValue();
		var inputPerson =  Ext.getCmp('statisticByInputPerson_hiv_syphilis').getValue();
		var year = Ext.getCmp('statisticByYear_hiv_syphilis').getValue();
		var month = Ext.getCmp('statisticByMonth_hiv_syphilis').getValue();
		var day = Ext.getCmp('statisticByDay_hiv_syphilis').getValue();
		var statisticType = (org ? '1' : '0') + (inputPerson ? '1' : '0') +
				(year ? '1' : (month ? '2' : (day ? '3' : 0)));
		
		var colsVisibleFalse = [];
		var colsVisibleTrue = [];
		if(org)
			colsVisibleFalse.push(getColumnsIndexDetail('hivandsyphilis','orgName'));
		else
			colsVisibleTrue.push(getColumnsIndexDetail('hivandsyphilis','orgName'));
		if(inputPerson)
			colsVisibleFalse.push(getColumnsIndexDetail('hivandsyphilis','userName'));
		else
			colsVisibleTrue.push(getColumnsIndexDetail('hivandsyphilis','userName'));
		if(year || day || month)
			colsVisibleFalse.push(getColumnsIndexDetail('hivandsyphilis','groupDate'));
		else
			colsVisibleTrue.push(getColumnsIndexDetail('hivandsyphilis','groupDate'));
		
		Component.setVisibleDetail('hivandsyphilis',colsVisibleTrue,colsVisibleFalse)
		var condition = {
			startDate : startDate,
			endDate : endDate,
			statisticType : statisticType
		};
		return condition;
	},
	
	load : function(isReset){		
//		if (isReset) {
//			this.pagingBar.changePage(1);
//		}
		Ext.getCmp('hivandsyphilis').getStore().reload();
		this.doLayout(true);
	},
	
	createPanel : function(){			
		var reader = new Ext.data.JsonReader({
			totalProperty : 'totalSize',
			root : 'data',
			id : this.recordId
		},Ext.data.Record.create(this.readerConfig));
		
		var store = new Ext.data.Store({
			proxy : new Ext.ux.data.DWRProxy({
				dwrFunction : this.queryUrl,
				listeners : {
					'beforeload' : function(dataProxy, params){
						var o = this.getParams();
						params[dataProxy.loadArgsKey] = [o,params];
					}.createDelegate(this)
				}
			}),
			reader : reader
		});
		
		var grid = new Ext.grid.GridPanel({
			id : 'hivandsyphilis',
			layout : 'fit',
			region : 'center',
			autoScroll : true,
			store: store,
			cm : new Ext.grid.ColumnModel(this.gridCmConfig),
			loadMask : true
		});
		
		var exportButton = new Ext.ux.Exporter.Button({
			component : grid,
			text : "数据导出",
			iconCls : 'dataExportbg'
		});
		
		var topPanel = new Ext.Panel({
			layout : 'fit',
			region : 'north',
			height : 150,
			tbar : [{
				text : '查询',
				iconCls : 'searchbg',
				handler : function(){
					this.load(true);
				}.createDelegate(this)
			},{
				text : '打印',
				iconCls : 'printbg',
				handler : function(){
//					printDataExportObj.printGrid(grid,printDataExportObj.initDateRange(this.idsArray.startDate,this.idsArray.endDate));
				}.createDelegate(this)				
			},exportButton],
			items : [{
				xtype : 'panel',
				layout : 'absolute',
				frame : true,
				items : [createFieldset('dateRange','dateRange',5,0,'统计查询日期范围',
						 [createLabel('dateText','dateText',0,3,'起:'),
						  createDatefield('hiv_syphilis_startdate','hiv_syphilis_startdate',20,0,'Y-m-d',120,new Date()),
						  createLabel('dateTextSeparator','dateTextSeparator',0,43,'止:'),
						  createDatefield('hiv_syphilis_enddate','hiv_syphilis_enddate',20,40,'Y-m-d',120,new Date())],140),
						  createFieldset('statisticType','statisticType',175,0,'统计分类',
									 [createCheckBox('组织机构',true,'statisticByOrg_hiv_syphilis','statisticByOrg_hiv_syphilis',0,0,1,null),
									  createCheckBox('操作员',false,'statisticByInputPerson_hiv_syphilis','statisticByInputPerson_hiv_syphilis',0,25,2,null),
									  createCheckBox('年',false,'statisticByYear_hiv_syphilis','statisticByYear_hiv_syphilis',0,50,3,function(obj,ischecked){
										  if(ischecked){
											  Ext.getCmp('statisticByMonth_hiv_syphilis').setValue(false);
											  Ext.getCmp('statisticByDay_hiv_syphilis').setValue(false);
										  }
									  }),
									  createCheckBox('月',false,'statisticByMonth_hiv_syphilis','statisticByMonth_hiv_syphilis',40,50,4,function(obj,ischecked){
										  if(ischecked){
											  Ext.getCmp('statisticByYear_hiv_syphilis').setValue(false);
											  Ext.getCmp('statisticByDay_hiv_syphilis').setValue(false);
										  }
									  }),
									  createCheckBox('日',false,'statisticByDay_hiv_syphilis','statisticByDay_hiv_syphilis',80,50,5,function(obj,ischecked){
										  if(ischecked){
											  Ext.getCmp('statisticByMonth_hiv_syphilis').setValue(false);
											  Ext.getCmp('statisticByYear_hiv_syphilis').setValue(false);
										  }
									  })],120)]
				 
			}]
		});
		
		var panel = new Ext.Panel({
			autoScroll : true,
			layout : 'border',
			items : [topPanel,grid]
		});

		return panel;
	}
});