Ext.ns("Ext.tf");

Ext.tf.VaccineImmuneGridPanel = Ext.extend(Ext.Panel, {
	recordId : 'id',
	layout : 'fit',
	pageSize : 15,
	gridHeight : null,
	singleSelect : false,
	queryUrl : Ext.emptyFn,
	editFn : Ext.emptyFn,
	gridId : null,
	fileNo : null,
	selModel : false,
	readerConfig : [],
	gridCmConfig : [],
	titleTxt : '<span style="color:red;">注意：双击可选中疫苗</span>',
	queryType : 1,
	initComponent : function() {
		this.build();
		Ext.tf.VaccineImmuneGridPanel.superclass.initComponent.call(this);
	},
	build : function() {
		this.items = [ this.createPanel() ];
	},
	load : function(isReset) {
		if (isReset) {
			this.pagingBar.changePage(1);
		}
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
						// var o = null;
						if (!params.limit)
							params.limit = this.pageSize;
						if(this.fileNo != null){
							params[dataProxy.loadArgsKey] = [ this.fileNo,this.queryType,params ];
						}else{
							params[dataProxy.loadArgsKey] = [ params ];
						}
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
		var sm = null;
		if(this.selModel){
			 sm = new Ext.grid.CheckboxSelectionModel({
				 singleSelect : this.singleSelect
			 });
			 this.gridCmConfig.unshift(sm);
		}
		
		this.grid = new Ext.grid.GridPanel({
			title : this.titleTxt,
			id : this.gridId,
			bbar : this.pagingBar,
			layout : 'fit',
			store : store,
			cm : new Ext.grid.ColumnModel(this.gridCmConfig),
			sm : sm,
			height : this.gridHeight,
			autoWidth : true,
			bodyStyle : 'width:100%'
		});
		this.grid.getView().on('refresh', function() {
			// 缺省选择grid的第一条记录
			var model = this.grid.getSelectionModel();
			if (model.getCount() == 0) {
				model.selectFirstRow();
			}
		}.createDelegate(this));

		this.grid.on('rowdblclick', this.editFn, this);
		this.load(true);
		var panel = new Ext.Panel({
			layout : 'fit',
			autoScroll : true,
			items : [ this.grid ]
		});
		return panel;
	}
});