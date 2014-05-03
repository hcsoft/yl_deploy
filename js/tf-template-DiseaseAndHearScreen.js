Ext.ns("Ext.tf");

Ext.tf.DiseaseAndHearPanel = Ext.extend(Ext.Panel, {
	layout : 'fit',
	treeLoaderFn : Ext.emptyFn,
	queryUrl : Ext.emptyFn,
	deleteUrl : Ext.emptyFn,
	editFn : Ext.emptyFn,
	f_add : Ext.emptyFn,
	gridId : null,
	treeId : null,
	filterKeyId : 'comboCondition',
	filterValId : 'textfieldCondition',
	readerConfig : [],
	gridCmConfig : [],
	recordId : 'id',
	currentNode : null,
	pageSize : 20,
	tbars : [],
	checkLastLevel : true,

	initComponent : function() {
		this.build();
		Ext.tf.DiseaseAndHearPanel.superclass.initComponent.call(this);
	},

	build : function() {
		this.items = [ this.createPanel() ];
	},

	getParams : function() {
		if (this.currentNode != null) {
			console.log(this.currentNode);
			var filterKey = Ext.getCmp(this.filterKeyId).getValue();
			var filterValue = Ext.getCmp(this.filterValId).getValue();
			var cond = {
				district : this.currentNode.id,
				filterKey : filterKey,
				filterValue : filterValue
			};
			return cond;
		}
		return null;
	},
	getTreeSelNode : function() {
		var selNode = this.currentNode;
		if (selNode) {
			console.log(selNode);
			// Ext.Msg.alert('', selNode.text);
		} else {
			Ext.Msg.alert('', '请先选择一个节点！');
		}
		;
		return selNode;
	},
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
		var sm = new Ext.grid.CheckboxSelectionModel();
		this.gridCmConfig.unshift(sm);
		this.grid = new Ext.grid.GridPanel({
			title : '请选择一个行政区划',
			bbar : this.pagingBar,
			layout : 'fit',
			store : store,
			cm : new Ext.grid.ColumnModel(this.gridCmConfig),
			id : this.gridId,
			sm : sm
		});
		this.grid.getView().on('refresh', function() {
			// 缺省选择grid的第一条记录
			var model = this.grid.getSelectionModel();
			if (model.getCount() == 0) {
				model.selectFirstRow();
			}
		}.createDelegate(this));

		this.grid.on('rowdblclick', this.editFn, this);

		this.menu = new Ext.tree.TreePanel({
			id : this.treeId,
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
					this.load(true);
				}.createDelegate(this)
			},
			dblclick : {
				fn : function(n, e) {
					this.f_add(n);
				}.createDelegate(this)
			}
		});
		this.tbars.push(new Ext.form.ComboBox({
			store : new Ext.data.SimpleStore({
				fields : [ 'type', 'display' ],
				data : [ [ 'a.name', '姓名' ], [ 'b.birthday', '出生日期' ],
						[ 'a.fileNo', '档案编码' ], [ 'b.idnumber', '身份证号' ],
						[ 'b.linkman', '联系人' ], [ 'a.paperFileNo', '纸质档案号' ],
						[ 'b.workUnit', '工作单位' ] ]
			}),
			displayField : 'display',
			valueField : 'type',
			typeAhead : true,
			mode : 'local',
			triggerAction : 'all',
			selectOnFocus : true,
			editable : false,
			width : 100,
			value : 'a.name',
			id : this.filterKeyId
		}));
		this.tbars.push(new Ext.form.TextField({
			id : this.filterValId,
			fieldLabel : '',
			width : 200,
			enableKeyEvents : true,
			listeners : {
				'keypress' : function(field, event) {
					if (event.getKey() == 13) {
						this.load(true);
					}
				}.createDelegate(this)
			}
		}), new Ext.Action({
			text : '查询',
			iconCls : 'c_query',
			handler : function() {
				this.load(true);
			}.createDelegate(this)
		}));
		var panel = new Ext.Panel({
			layout : 'border',
			autoScroll : true,
			tbar : this.tbars,
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
				layout : 'fit',
				frame : false,
				border : false,
				items : [ this.grid ]
			} ]
		});
		return panel;
	}
});