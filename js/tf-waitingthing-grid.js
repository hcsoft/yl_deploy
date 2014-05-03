Ext.ns('Ext.tf');

Ext.tf.WaitingThingGridPanel = Ext.extend(Ext.Panel, {
	pageSize : 20,
	recordId : 'id',
	recordPk : 'id',
	layout : 'fit',
	queryUrl : Ext.emptyFn,
	readerConfig : [],
	gridCmConfig : [],
	gridId : 'grid',
	defSearchVal : '',
	initComponent : function() {
		this.build();
		Ext.tf.WaitingThingGridPanel.superclass.initComponent.call(this);
	},
	build : function() {
		this.items = [ this.createPanel() ];
	},
	
	getParams : function(){
		var filterKey = Ext.getCmp('condStore').getValue();
		var filterValue = Ext.getCmp('condTxt').getValue();
		var cond = {
			district : Ext.tf.currentUser.districtId,
			filterKey : filterKey,
			filterValue : filterValue
		};
		return cond;
	},
	
	load : function(isReset) {
		this.grid.getStore().reload();
		this.doLayout(true);
	},
	
	createPanel : function(){
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

		this.pagingBar = new App.PagingToolbar({
			pageSize : this.pageSize,
			store : store,
			displayInfo : true,
			displayMsg : '{0} - {1} of {2}',
			emptyMsg : "没有记录"
		});

		var simpleStore = new Ext.data.SimpleStore({
			fields : [ 'type', 'display' ],
			data : [ [ 'a.name', '姓名' ],[ 'a.inputDate', '录入日期' ],
					[ 'b.birthday', '出生日期' ], [ 'a.fileNo', '档案编码' ],
					[ 'b.idnumber', '身份证号' ], [ 'b.workUnit', '工作单位' ] ]
		});
		var sm = new Ext.grid.CheckboxSelectionModel({singleSelect : true});
		this.gridCmConfig.unshift(sm);
		
		this.grid = new Ext.grid.GridPanel({
			id : this.gridId,
			tbar : [
				 Component.createComboBox('condStore','condStore',0,0,simpleStore,'display','type','a.name','local',80,''),
				 Component.createTextfield('condTxt','condTxt',160,0,150,false,this.defSearchVal,{
					 'keypress' : function(field, event) {
						 if (event.getKey() == 13) {
							 this.load(true);
						 }
					}.createDelegate(this)
				 }),
				 {
					 text : '检索',
					 iconCls : 'c_query',
					 handler : function(){
						 this.load(true);
					 }.createDelegate(this)
				 }
			],
			bbar : this.pagingBar,
			layout : 'fit',
			store : store,
			height : 393,
			cm : new Ext.grid.ColumnModel(this.gridCmConfig),
			sm : sm
		});
		
		this.grid.getView().on('refresh', function() {
			// 缺省选择grid的第一条记录
			var model = this.grid.getSelectionModel();
			if (model.getCount() == 0) {
				model.selectFirstRow();
			}
		}.createDelegate(this));
		this.load(false);
		return this.grid;
	}	
});