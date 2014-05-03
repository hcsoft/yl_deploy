Ext.ns("Ext.tf");

Ext.tf.GridPanel = Ext.extend(Ext.Panel, {
	pageSize : 20,
	isPaging : true,
	recordId : 'id',
	layout : 'fit',
	queryUrl : Ext.emptyFn,
	readerConfig : [],
	gridCmConfig : [],
	gridViewConfig : {},
	gridId : 'Ext.tf.GridPanel',
	printPage : 15,
	fileNo : null,
	isAutoLoad : true,
	initComponent : function() {
		this.build();
		Ext.tf.GridPanel.superclass.initComponent.call(this);
	},

	build : function() {
		this.items = [ this.createPanel() ];
	},

	getParams : function() {
		if(this.fileNo != null){
			var cond = {
				fileNo : this.fileNo,
				printPage : this.printPage
			}
			return cond;
		}
		return null;
	},

	load : function(isReset) {
		if (isReset && this.isPaging) {
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
						var o = this.getParams();
						if (this.isPaging) {
							if (!params.limit)
								params.limit = this.pageSize;
							params[dataProxy.loadArgsKey] = [ o, params ];
						} else {
							params[dataProxy.loadArgsKey] = [o];
						}

					}.createDelegate(this)
				}
			}),
			reader : reader
		});
		var pagingBar = null;
		if (this.isPaging) {
			pagingBar = new App.PagingToolbar({
				pageSize : this.pageSize,
				store : store,
				displayInfo : true,
				displayMsg : '{0} - {1} of {2}',
				emptyMsg : "没有记录"
			});
		}
		var sm = new Ext.grid.CheckboxSelectionModel();
		this.gridCmConfig.unshift(sm);
		this.grid = new Ext.grid.GridPanel({
			bbar : pagingBar,
			layout : 'fit',
			store : store,
			cm : new Ext.grid.ColumnModel(this.gridCmConfig),
			viewConfig : this.gridViewConfig,
			sm : sm,
			id : this.gridId
		});
		if(this.isAutoLoad){
			this.load();
		}
		return this.grid;
	}
});