Ext.ns("Ext.tf");

Ext.tf.SmsPanel = Ext.extend(Ext.Panel, {
	closable : true,
	currentNode : null, // 当前选择的树节点
	layout : 'fit',
	title : '档案',
	pageSize : 20,
	recordId : 'id',
	recordPk : 'id',
	panelId : 'Ext.tf.SmsPanel',
	judgeCondId : '',
	judgeCondVal : '',
	advancedFeatures : false,
	isMaternal : false,
	isAlreadyMaternal : false,
	isFinishGestation : false,
	// height:700,
	// 是否需要在最末级才能增加？
	checkLastLevel : true,

	// 设置查询url
	queryUrl : Ext.emptyFn,
	deleteUrl : Ext.emptyFn,
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
	gridCm : [],
	gridViewConfig : {},
	dblclickToggle : true,
	contextmenuToggle : true,
	
	initComponent : function() {
		this.build();
		Ext.tf.SmsPanel.superclass.initComponent.call(this);		
	},

	build : function() {
		this.items = [ this.createPanel() ];		
	},
	afterlayout: function(obj,layout){
		alert(obj.panel.getInnerHeight());
		obj.grid.setHeight(obj.panel.getInnerHeight()  + 10);
	},
	
	/**
	 * 编辑功能
	 */
	f_edit : function() {
		var selections = this.grid.getSelections();
		if (selections.length == 0) {
			Ext.MessageBox.alert("提示", "请选择一条的记录！");
			return;
		} else if (selections.length != 1) {
			Ext.MessageBox.alert("提示", "不能选择多行编辑！");
			return;
		}
		this.editWin.show();
		this.editForm.getForm().loadRecord(selections[0]);
    },
    del : function() { },
	/**
	 * 增加功能
	 */
	f_add : function(isSlient) {

		if (this.checkLastLevel) {
			// 判断是否是第五级别
			var node = this.getTreeSelNode();

			var level = node.attributes['data'].level;
			if (level != 5) {
				if (!isSlient) {
					Ext.Msg.alert('', '只有第五级行政区域才能增加记录！');
				}
				return;
			}
		}
		var getParams = this.getAddParams();
		if(getParams != '-1'){
			param = this.detailUrl + getParams;
//			console.log(param);
			if (this.visitDoctor != null) {
				param = param + '&' + this.visitDoctor + '='
						+ escape(Ext.tf.currentUser.taxempname);
			}
			if (this.diseaseId != null) {
				// param = param +"&diseaseId="+this.diseaseId;
				this.openWin(param, {
					'diseaseId' : this.diseaseId,
					"confirmDate" : new Date()
				});
			} else {
				this.openWin(param);
			}
		}else{
			showInfoObj.Infor('请选择档案');
		}
	},
	/**
	 * 打开编辑窗口
	 */
	openWin : function(targetUrl, param) {
		var win = new Ext.Window({
			modal : true,
			title : '录入记录',
			border : false
		});
		if (param != null) {
			window.other_init_param = param;
		}
		win.show();
		win.maximize();
		win.add({
			xtype : 'iframepanel',
			defaultSrc : targetUrl,
			title : '',
			loadMask : true,
			autoScroll : false,
			listeners : {
				message : function(f, data) {
					if(data.data == 'quit') {
						win.close();
					} else if (data.data == 'saved') {
						this.load();
					}
				}.createDelegate(this)
			}
		});
		win.doLayout(true);
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
		var store = new Ext.data.SimpleStore({
			fields : [ 'type', 'display' ],
			data : [    [ 'vo.name', '姓名' ], ['vo.fileNo', '档案编码' ],
						[ 'vo.tel', '电话号码' ] ]
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
			value : 'vo.name'
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

		this.editAction = new Ext.Action({
			text : '修改',
			iconCls : 'c_edit',
			handler : this.f_edit.createDelegate(this)
		});

		var advancedF = null;
		var dataExport = new Ext.Action({
			text : '数据导出',
			iconCls : 'c_add',
			handler : function() {
				var selNode = this.getTreeSelNode();
				if (selNode) {
					var disNo = selNode.id;
					var id = this.panelId;
					Ext.getCmp(id).getEl().mask('导出数据加载中...');
					var filterKey = this.combo.getValue();
					var filterValue = this.filterField.getValue();
					this.dataExportUrl(disNo, filterKey, filterValue,
							function(data) {
								window.location.href = data;
								// UserMenuTreeService.removeDataExportFile(data);
								Ext.getCmp(id).getEl().unmask();
							});
				}
			}.createDelegate(this)
		});
		advancedF = dataExport;
		var funcAction;
		var store01 = new Ext.data.SimpleStore({
			fields : [ 'type', 'display' ],
			data : [ [ '0', '已更新电话' ], [ '1', '未更新电话' ]]
		});
		this.combo01 = new Ext.form.ComboBox({
			store : store01,
			displayField : 'display',
			valueField : 'type',
			typeAhead : true,
			mode : 'local',
			triggerAction : 'all',
			selectOnFocus : true,
			editable : false,
			width : 100,
			value : '0'
		});
		funcAction = [
		new Ext.Action({
			text : '修改',
			iconCls : 'c_edit',
			handler : function() {
				var selections = this.grid.getSelections();
				if (selections.length == 1) {
					this.f_edit(selections[0]);
				}
			}.createDelegate(this)
		}),'-',new Ext.Action({
			text : '生成联系电话',
			iconCls : 'c_del',
			handler : function(obj) {
			    obj.disable();
				this.deleteUrl(null, {
					callback : function(data) {
						showInfoObj.Infor(data);
						this.load();
						obj.enable();
					}.createDelegate(this),
					errorHandler : function(msg) {
						console.log(msg);
						showInfoObj.Infor('出错！错误信息:'+msg);
						obj.enable();
					}
				});
			}.createDelegate(this)
		}),'-',this.combo01,
		this.combo,
		this.filterField,
		new Ext.Action({
			text : '查询',
			iconCls : 'c_query',
			handler : function() {
				this.load();
			}.createDelegate(this)
		})];
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
			var isFirst = this.isFirst.getValue();
			var filterVal01 = '';
			if(this.combo01){
				filterVal01 = this.combo01.getValue();
			}
			var cond = {
				district : selNode.id,
				filterKey : filterKey,
				filterValue : filterValue,
				isFirst : isFirst,
				filterVal01 : filterVal01
			};
//			console.log(cond);
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

	createPanel : function() {
		Ext.applyIf(this, {
			pageSize : 10
		});

		this.reader = new Ext.data.JsonReader({
			totalProperty : "totalSize", // 总记录数
			root : "data", // 分页对象中的数据集
			id : "id" //
		}, Ext.data.Record.create(this.readerConfig));

		this.store = new Ext.data.Store({
			proxy : new Ext.ux.data.DWRProxy({
				dwrFunction : this.queryUrl,
				listeners : {
                    'beforeload' : function(dataProxy, params) {
                        var selNode = this.getTreeSelNode();
                        var cond = {};
                        if (selNode) {
                            cond = {
                                district : selNode.id,
                                type : '0',
                                conditions : []
                            };
                            if(this.combo1 && !Ext.isEmpty(this.combo1.getValue())){
                                //cond.conditions["type"] = this.combo1.getValue();
                                cond.conditions[cond.conditions.length] = {filterKey:"type",filterVal:this.combo1.getValue()};
                            }
                            if(this.combo && !Ext.isEmpty(this.filterField.getValue()))
                                cond.conditions[cond.conditions.length] = {filterKey:this.combo.getValue(),filterVal:this.filterField.getValue()};
                            console.log(cond);
                        }
                        
                        var o = cond;
                        console.log("getParams: ")
                        console.log(o);
                        if (!params.limit)
                            params.limit = this.pageSize;
                        params[dataProxy.loadArgsKey] = [ o, params ];
                    }.createDelegate(this)
                }
			}),
			
			reader : this.reader
		});

		this.pagingBar = new App.PagingToolbar({
			pageSize : this.pageSize,
			store : this.store,
			displayInfo : true,
			displayMsg : '{0} - {1} of {2}',
			emptyMsg : "没有记录"
		});

		this.grid = new Ext.tf.SimpleGridPanel({
			gridConfigEx : this.readerConfig,
			edit : this.f_edit.createDelegate(this),
			del : this.del.createDelegate(this),
			store : this.store,
			cm : new Ext.grid.ColumnModel(this.gridCm),
			dblclickToggle : this.dblclickToggle,
			contextmenuToggle : this.contextmenuToggle,
			bbar : this.pagingBar
		});
		this.editForm = new Ext.tf.SimpleFormPanel({
			items : this.editConfig,
			
			close : function() {
				this.editWin.hide();
			}.createDelegate(this),

			saveFn : function() {
				var formBean = this.editForm.getForm().getValues(false);
				this.editUrl(formBean, function() {
					Ext.MessageBox.alert("提示", "保存成功！");
					this.editWin.hide();
					this.store.reload();
				}.createDelegate(this));
			}.createDelegate(this)
		});
		this.editWin = new Ext.Window({
			title : '',
			// closeAction : 'hide',
			modal : true,
			autoHeight : true,
			// autoWidth : true,
			width : 300,
			close : function() {
				this.hide();
			},
			items : [ this.editForm ]
		});
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
						this.isFirst.setValue(0);
						this.load();
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
					this.isFirst.setValue(1);
					this.grid.setTitle(n.text);
					this.load();
				}.createDelegate(this)
			},
			dblclick : {
				fn : function(n, e) {
					//this.f_add(true);
				}.createDelegate(this)
			}
		});

		this.panel = new Ext.Panel({
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
				layout : 'fit',
				frame : false,
				border : false,
				items : [ this.grid ]
			} ]
		});
		return this.panel;
	}
});
