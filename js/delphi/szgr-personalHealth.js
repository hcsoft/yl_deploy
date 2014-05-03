Ext.ns('Ext.szgr')
var clickType = null;

Ext.szgr.PersonalHealthPanel = Ext.extend(Ext.Panel, {
	closable : true,
	layout : 'fit',
	pageSize : 20,
	recordId : 'id',
	recordPk : 'id',
	bartitle : '',
	queryUrl : Ext.emptyFn,
	fileNo : null,
	readerConfig : [],
	gridCmConfig : [],
//	gridViewConfig : {},
	idsArray : {
		startDate : 'startDate',
		endDate : 'endDate'
	},
	initComponent : function() {
		this.build();
		Ext.szgr.PersonalHealthPanel.superclass.initComponent.call(this);
	},

	build : function() {
		this.items = [ this.createPanel() ];
	},
	
	getParams : function(){
		var startDate = Ext.getCmp(this.idsArray.startDate).getValue();
		var endDate = Ext.getCmp(this.idsArray.endDate).getValue();	
		if(clickType == null){
			clickType = 0;
		}
		var cond = {
			clickType : clickType,
			startDate : calculateTimeObj.dateToStr(startDate),
			endDate : calculateTimeObj.dateToStr(endDate),
			fileNo : this.fileNo
		};
//		console.log(cond);
		return cond;
	},
	
	load : function() {
		this.grid.getStore().reload();
		this.doLayout(true);
	},
	
	createPanel : function() {
		var reader = new Ext.data.JsonReader({
			totalProperty : "totalSize",
			root : "data",
			id : this.recordId
		}, Ext.data.Record.create(this.readerConfig));

		var store = new Ext.data.Store({
			proxy : new Ext.ux.data.DWRProxy({
				dwrFunction : this.queryUrl,
				listeners : {
					'beforeload' : function(dataProxy, params) {
						var o = this.getParams();
						if (!params.limit)
							params.limit = this.pageSize;
						params[dataProxy.loadArgsKey] = [ o, params ];
					}.createDelegate(this)
				}
			}),
			reader : reader
		});
		this.pagingBar = new Ext.PagingToolbar({
			pageSize : this.pageSize,
			store : store,
			displayInfo : true,
			displayMsg : '{0} - {1} of {2}',
			emptyMsg : "没有记录"
		});
		var sm = new Ext.grid.CheckboxSelectionModel();
		this.gridCmConfig.unshift(sm);
		this.grid = new Ext.grid.GridPanel({
			bbar : this.pagingBar,
			layout : 'fit',
			store : store,
			cm : new Ext.grid.ColumnModel(this.gridCmConfig),
			sm : sm,
			height : 400
		});
		this.grid.getView().on('refresh', function() {
			// 缺省选择grid的第一条记录
			var model = this.grid.getSelectionModel();
			if (model.getCount() == 0) {
				model.selectFirstRow();
			}
		}.createDelegate(this));
		var panel = new Ext.Panel({
			layout : 'fit',
			border : false,
			autoScroll : true,
			tbar : [{
				text : this.bartitle,
				iconCls : 'c_lastThirdMonth',
				handler : function(){
					clickType = 0;
					this.load();
				}.createDelegate(this)
			},{
				text : '全部',
				iconCls : 'c_all',
				handler : function(){
					clickType = 1;
					this.load();
				}.createDelegate(this)
			},{
				xtype : 'label',
				text : '日期范围',
				style : 'margin-left:10px'
			},Component.createDatefield(this.idsArray.startDate,this.idsArray.startDate,5,1,'Y-m-d',100,calculateTimeObj.reduceDate(new Date(),3)),
			{
				xtype : 'label',
				text : '至',
				style : 'margin-left:30px'
			}, Component.createDatefield(this.idsArray.endDate,this.idsArray.endDate,5,1,'Y-m-d',100,new Date()),
			{
				text : '查询',
				iconCls : 'c_query',
				style : 'margin-left:10px',
				handler : function(){
					clickType = 2;
					this.load();
				}.createDelegate(this)
			}
			],
			items : [this.grid]
		});
		this.load();
		return panel;
	}
});