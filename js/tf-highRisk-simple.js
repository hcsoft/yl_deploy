Ext.ns('Ext.tf')

Ext.tf.HighRiskPanel = Ext.extend(Ext.Panel, {
	layout : 'fit',
	pageSize : 15,
	recordId : 'id',
	recordPk : 'id',
	queryUrl : Ext.emptyFn,
	dataExportUrl : Ext.emptyFn,
	treeLoaderFn : Ext.emptyFn,
	closable : true,
	currentNode : null, // 当前选择的树节点
	readerConfig : [],
	gridCmConfig : [],
	gridViewConfig : {},
	panelId : 'app.highRiskPanel',
	initComponent : function() {
		this.build();
		Ext.tf.HighRiskPanel.superclass.initComponent.call(this);
	},

	build : function() {
		this.items = [ this.createPanel() ];
	},

	getParams : function() {
		var selNode = this.getTreeSelNode();
		if (selNode) {
			var conditions = [{
				filterKey : 'a.name',
				filterVal : Ext.getCmp('a.name' + this.panelId).getValue()
			},{
				filterKey : 'a.fileNo',
				filterVal : Ext.getCmp('a.fileNo' + this.panelId).getValue()
			},{
				filterKey : 'b.idnumber',
				filterVal : Ext.getCmp('b.idnumber' + this.panelId).getValue()
			},{
				filterKey : 'a.paperFileNo',
				filterVal : Ext.getCmp('a.paperFileNo' + this.panelId).getValue()
			},{
				filterKey : 'b.birthday',
				filterVal : Ext.getCmp('b.birthday' + this.panelId).getValue() == '' ? null : printDataExportObj.dateToStr(Ext.getCmp('b.birthday'+ this.panelId).getValue(),'-')
			},{
				filterKey : 'startDate',
				filterVal : Ext.getCmp('startDate' + this.panelId).getValue() == '' ? null : printDataExportObj.dateToStr(Ext.getCmp('startDate'+ this.panelId).getValue(),'-')
			},{
				filterKey : 'endDate',
				filterVal : Ext.getCmp('endDate' + this.panelId).getValue() == '' ? null : printDataExportObj.dateToStr(Ext.getCmp('endDate'+ this.panelId).getValue(),'-')
			}];
			
			var currentManagePerson = Ext.getCmp('currentManagePerson' + this.panelId).getValue();
			var outComePerson = Ext.getCmp('outComePerson' + this.panelId).getValue();
			
			var manPerson = (currentManagePerson ? '1' : '0') + (outComePerson ? '1' : '0')
			
			var cond = {
				district : selNode.id,
				conditions : conditions,
				manPerson : manPerson
			};
//			console.log(cond);
			return cond;
		}
		return null;
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

	load : function(isReset) {
		var selNode = this.getTreeSelNode();
		if (selNode) {
			if (isReset) {
				this.pagingBar.changePage(1);
				return;
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
		
		this.grid = new Ext.grid.GridPanel({
			title : '请选择一个行政区划',
			bbar : this.pagingBar,
			layout : 'fit',
			store : store,
			cm : new Ext.grid.ColumnModel(this.gridCmConfig),
			viewConfig : this.gridViewConfig,
			loadMask : {msg : '正在加载数据...'}
		});
		this.grid.getView().on('refresh', function() {
			// 缺省选择grid的第一条记录
			var model = this.grid.getSelectionModel();
			if (model.getCount() == 0) {
				model.selectFirstRow();
			}
		}.createDelegate(this));

		this.menu = new Ext.tree.TreePanel({
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
					this.load();
				}.createDelegate(this)
			}
		});

		var panel = new Ext.Panel({
			tbar : [ {
				text : '查询',
				iconCls : 'searchbg',
				handler : function() {
					this.load(true);
				}.createDelegate(this)
			}, {
				text : '数据导出',
				iconCls : 'dataExportbg',
				handler : function() {
					 var o = this.getParams();
					 var id = this.panelId;
					 Ext.getCmp(id).getEl().mask('导出数据加载中...');
					 this.dataExportUrl(o,function(data){
						 if(data!=null){
							 window.location.href = data;
							 Ext.getCmp(id).getEl().unmask();
						 }
					 });
				}.createDelegate(this)
			} ],
			layout : 'border',
			autoScroll : true,
			id : this.panelId,
			items : [
					{
						region : 'north',
						height : 110,
						frame : true,
						layout : 'absolute',
						items : [ Component.createFieldset('birthCertifiSearchCond','birthCertifiSearchCond', 0, 0, '查询条件',
								[Component.createLabel('LNameTitle','LNameTitle', 25, 2,'姓名'),
								Component.createTextfield('a.name' + this.panelId, 'a.name' + this.panelId, 50,0, 100),
								Component.createLabel('LFileNoTitle','LFileNoTitle', 150, 2,'档案编号'),
								Component.createTextfield('a.fileNo' + this.panelId, 'a.fileNo' + this.panelId,200, 0, 165),
								Component.createLabel('LIDNumberTitle','LIDNumberTitle', 365,2, '身份证号'),
								Component.createTextfield('b.idnumber' + this.panelId,'b.idnumber' + this.panelId, 415, 0,165),
								Component.createLabel('LBirthdayTitle','LBirthdayTitle', 0,33, '出生日期'),
								Component.createDatefield('b.birthday' + this.panelId,'b.birthday' + this.panelId, 50, 30,'Y-m-d', 100, null),
								Component.createLabel('LDateRangeTitle','LDateRangeTitle', 150,33, '日期范围'),
								Component.createDatefield('startDate' + this.panelId,'startDate' + this.panelId, 200, 30,'Y-m-d', 100, null),
								Component.createLabel('LDateRangeSepTitle','LDateRangeSepTitle', 300,33, '至'),
								Component.createDatefield('endDate' + this.panelId,'endDate' + this.panelId, 310, 30,'Y-m-d', 100, null),
								Component.createLabel('LPageFileNoTitle','LPageFileNoTitle',410, 33, '纸质档案编号'),
								Component.createTextfield('a.paperFileNo' + this.panelId,'a.paperFileNo' + this.panelId, 480,30, 100)],580, 60),
								Component.createFieldset('womanHighRiskSearchObj','womanHighRiskSearchObj',610,0,'查询对象',
							    [Component.createCheckBox('currentManagePerson' + this.panelId,'currentManagePerson' + this.panelId,0,0,'在管人员',true,0,null),
							     Component.createCheckBox('outComePerson' + this.panelId,'outComePerson' + this.panelId,0,30,'转归人员',false,0,null)],70,60)]
					}, {
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