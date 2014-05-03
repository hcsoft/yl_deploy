Ext.ns("Ext.tf");

Ext.tf.PrintHealthFileExamPanel = Ext.extend(Ext.Panel, {
	closable : true,
	currentNode : null, // 当前选择的树节点
	layout : 'fit',
	pageSize : 10,
	pageSize01 : 10,
	recordId : 'id',
	recordPk : 'id',
	panelId : 'app.PrintHealthFileExamPanel',
	judgeCondId : '',
	judgeCondVal : '',
	storeFileNo : '',
	storeId : '',
	// height:700,
	// 是否需要在最末级才能增加？
	checkLastLevel : true,

	// 设置查询url
	queryUrl : Ext.emptyFn,
	queryUrl01 : Ext.emptyFn,
	deleteUrl : Ext.emptyFn,
	deleteUrl01 : Ext.emptyFn,
	dataExportUrl : Ext.emptyFn,
	treeLoaderFn : Ext.emptyFn,
	diseaseId : null,
	visitDoctor : null,
	getAddParams : function() {
		var node = this.getTreeSelNode();
		var districtNumber = node.id;
		var param = '?districtNumber=' + districtNumber;
		return param;
	},

	// 设置查询用的类别，比如档案，高血压等。。
	queryType : 'demo',
	readerConfig : [],
	gridCmConfig : [],
	readerConfig01 : [],
	gridCmConfig01 : [],
	gridViewConfig : {},
	initComponent : function() {
		this.build();
		Ext.tf.PrintHealthFileExamPanel.superclass.initComponent.call(this);
	},

	build : function() {
		// this.tbar = this.createActions();
		this.items = [ this.createPanel() ];
	},

	getTreeSelNode : function() {
		var selNode = this.currentNode;
		if (selNode) {
			// Ext.Msg.alert('', selNode.text);
		} else {
			Ext.Msg.show({
				icon : Ext.Msg.WARNING,
				buttons : Ext.Msg.OK,
				msg : '请先选择一个行政区域！'
			});
		}
		;
		return selNode;
	},
	createActions : function() {
		var searchCondition = [ [ 'a.name', '姓名' ], [ 'b.birthday', '出生日期' ],
				[ 'a.fileNo', '档案编码' ], [ 'b.idnumber', '身份证号' ],
				[ 'a.paperFileNo', '纸质档案号' ], [ 'b.workUnit', '工作单位' ] ];

		var store = new Ext.data.SimpleStore({
			fields : [ 'type', 'display' ],
			data : searchCondition
		});
		this.combo = new Ext.form.ComboBox({
			store : store,
			displayField : 'display',
			valueField : 'type',
			typeAhead : true,
			mode : 'local',
			triggerAction : 'all',
			selectOnFocus : true,
			editable : false,
			width : 100,
			value : 'a.name'
		});
		this.filterField = new Ext.form.TextField({
			fieldLabel : '',
			enableKeyEvents : true,
			listeners : {
				'keypress' : function(field, event) {
					if (event.getKey() == 13) {
						this.load(true);
					}
					;
				}.createDelegate(this)
			}
		});

		this.isFirst = new Ext.form.TextField({
			fieldLabel : '',
			id : 'isFirst',
			hidden : true
		});

		var funcAction;
		funcAction = [ this.combo, this.filterField, new Ext.Action({
			text : '查询',
			iconCls : 'c_query',
			handler : function() {
				this.load(true);
			}.createDelegate(this)
		}) ];
		return funcAction;
	},

	/*
	 * 取得行政树的节点 如果节点没有选中，提示信息，返回空 如果选中，再取得过滤条件，组合成查询条件，并返回之
	 */
	getParams : function() {
		var selNode = this.getTreeSelNode();
		if (selNode) {
			var filterKey = this.combo.getValue();
			var filterValue = this.filterField.getValue();
			var filterVal01 = '';
			if (this.combo01) {
				filterVal01 = this.combo01.getValue();
			}
			var cond = {
				district : selNode.id,
				filterKey : filterKey,
				filterValue : filterValue,
				filterVal01 : filterVal01
			};
			return cond;
		}
		return null;
	},
	/*
	 * 查询数据, 如果树没有选择了节点，不执行
	 */
	load : function(isReset) {
		var selNode = this.getTreeSelNode();
		if (selNode) {
			if (isReset) {
				this.pagingBar.changePage(1);
			}
			this.grid.getStore().reload();
			this.doLayout(true);
		}
	},
	load01 : function(isReset) {
		if (isReset) {
			this.pagingBar01.changePage(1);
		}
		this.gridother.getStore().reload();
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

		this.pagingBar = new App.PagingToolbar({
			pageSize : this.pageSize,
			store : store,
			displayInfo : true,
			displayMsg : '{0} - {1} of {2}',
			emptyMsg : "没有记录"
		});

		var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
		this.gridCmConfig.unshift(sm);

		this.grid = new Ext.grid.GridPanel({
			title : '请选择一个行政区划',
			bbar : this.pagingBar,
			layout : 'fit',
			store : store,
			cm : new Ext.grid.ColumnModel(this.gridCmConfig),
			viewConfig : this.gridViewConfig,
			sm : sm,
			tbar : [ new Ext.Action({
				text : '打印',
				iconCls : 'printbg',
				handler : function() {
					var selections = this.grid.getSelections();
					var fileNo = '';
					if (selections.length == 1) {
						fileNo = selections[0].data.fileNo;
						PrintHealthFileAndExamClass.printHealthFile(fileNo);
					}
				}.createDelegate(this)
			}) ]
		});

		this.grid.getView().on('refresh', function() {
			// 缺省选择grid的第一条记录
			var model = this.grid.getSelectionModel();
			if (model.getCount() == 0) {
				model.selectFirstRow();
			}
		}.createDelegate(this));

		this.grid.on('rowclick', function() {
			this.load01(true);
		}.createDelegate(this), this);

		var reader01 = new Ext.data.JsonReader({
			totalProperty : "totalSize",
			root : "data",
			id : "id"
		}, Ext.data.Record.create(this.readerConfig01));

		var store01 = new Ext.data.Store({
			proxy : new Ext.ux.data.DWRProxy({
				dwrFunction : this.queryUrl01,
				listeners : {
					'beforeload' : function(dataProxy, params) {
						var selections = this.grid.getSelections();
//						var o = {};
						var fileNo = '';
						if (selections.length == 1) {
							fileNo = selections[0].data.fileNo;
						}
						var o = {
							filterKey : 'a.fileNo',
							filterValue : fileNo
						};
						if (!params.limit)
							params.limit = this.pageSize01;
						params[dataProxy.loadArgsKey] = [ o, params ];
					}.createDelegate(this)
				}
			}),
			reader : reader01
		});

		this.pagingBar01 = new App.PagingToolbar({
			pageSize : this.pageSize01,
			store : store01,
			displayInfo : true,
			displayMsg : '{0} - {1} of {2}',
			emptyMsg : "没有记录"
		});
		var sm01 = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
		this.gridCmConfig01.unshift(sm01);
		this.gridother = new Ext.grid.GridPanel({
			title : '健康体检记录',
			bbar : this.pagingBar01,
			layout : 'fit',
			store : store01,
			cm : new Ext.grid.ColumnModel(this.gridCmConfig01),
			sm : sm01,
			tbar : [ new Ext.Action({
				text : '打印',
				iconCls : 'printbg',
				handler : function() {
					var selections = this.gridother.getSelections();
					var id = '';
					if (selections.length == 1) {
						id = selections[0].data.id;
						PrintHealthFileAndExamClass.printMedicalExam(id);
					}
				}.createDelegate(this)
			}) ]
		});
		this.gridother.getView().on('refresh', function() {
			// 缺省选择grid的第一条记录
			var model = this.gridother.getSelectionModel();
			if (model.getCount() == 0) {
				model.selectFirstRow();
			}
		}.createDelegate(this));

		this.menu = new Ext.tree.TreePanel({
			// height : 465,
			layout : 'fit',
			animate : true,
			enableDD : false,
			loader : new Ext.ux.DWRTreeLoader({
				dwrCall : this.treeLoaderFn
			}),
			lines : true,
			autoScroll : true,
			border : false,
			root : new Ext.tree.AsyncTreeNode({
				text : 'root',
				draggable : false,
				id : 'org'
			}),
			rootVisible : false
		});

		this.menu.getRootNode().on({
			append : {
				stopEvent : true,
				fn : function(t, me, n, index) {
					// 自动展开根节点的第一个孩子
					if (index == 0) {
						if (!n.leaf)
							n.expand();
						this.currentNode = n;
						// this.load();
					}
				}.createDelegate(this)
			}
		});

		this.menu.on({
			click : {
				stopEvent : true,
				fn : function(n, e) {
					e.stopEvent();
					this.currentNode = n;
					this.grid.setTitle(n.text);
					this.load();
					this.load01(true);
				}.createDelegate(this)
			}
		});

		var panel = new Ext.Panel({
			layout : 'border',
			autoScroll : true,
			id : this.panelId,
			tbar : this.createActions(),
			items : [ {
				region : 'west',
				layout : 'fit',
				frame : false,
				title : '行政区划',
				split : true,
				collapsible : true,
				layoutConfig : {
					animate : true
				},
				width : 200,
				minSize : 100,
				maxSize : 400,
				border : false,
				items : [ this.menu ]
			}, {
				region : 'center',
				layout : 'border',
				frame : false,
				border : false,
				items : [ {
					region : 'center',
					layout : 'fit',
					frame : false,
					border : false,
					items : [ this.grid ]
				}, {
					region : 'south',
					layout : 'fit',
					frame : false,
					border : false,
					height : 400,
					items : [ this.gridother ]
				} ]
			} ]
		});
		return panel;
	}
});
