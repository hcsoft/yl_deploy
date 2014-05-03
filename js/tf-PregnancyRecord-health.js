Ext.ns("Ext.tf");

Ext.tf.HealthPregnancyRecordPanel = Ext.extend(Ext.Panel, {
	closable : true,
	currentNode : null, // 当前选择的树节点
	layout : 'fit',
	pageSize : 15,
	pageSize01 : 10,
	recordId : 'id',
	recordPk : 'id',
	panelId : 'app.residentPanel',
	judgeCondId : '',
	judgeCondVal : '',
	storeFileNo : '',
	storeId : '',
	advancedFeatures : false,
	isMaternal : false,
	isAlreadyMaternal : false,
	isFinishGestation : false,
	isAlreadyChild : false,
	service : null,
	serviceType : -1,
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
	detailUrl : '/personalInfo.html',
	readerConfig : [],
	gridCmConfig : [],
	readerConfig01 : [],
	gridCmConfig01 : [],
	gridViewConfig : {},
	initComponent : function() {
		this.build();
		Ext.tf.HealthPanel.superclass.initComponent.call(this);
	},

	build : function() {
// this.tbar = this.createActions();
		this.items = [ this.createPanel() ];
	},

	/**
	 * 编辑功能
	 */
	f_edit : function(record) {
		var fileNo = record.get(this.recordPk);
		var param = '?' + this.recordPk + '=' + fileNo;
		param = this.detailUrl + param;
		if (this.visitDoctor != null) {
			param = param + '&' + this.visitDoctor + '='
					+ escape(Ext.tf.currentUser.taxempname);
		}
		this.openWin(param);
	},

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
	generalItems : function(win,targetUrl){
		console.log(targetUrl);
		console.log(this.storeId);
		
		return {
			xtype : 'iframepanel',
			defaultSrc : targetUrl,
			layout : 'fit',
			width: win.getInnerWidth(),
			height: win.getInnerHeight() - 10,
			title : '',
			loadMask : true,
			autoScroll : false,
			listeners : {
				message : function(f, data) {
//					console.log("receive message...");
					console.log(data);
					if (data.data == 'quit') {
						win.close();
					} else if (data.data == 'saved') {
						this.load();
					}else{
						var d = data.data;
						console.log(d.indexOf(':'));
						if(d.indexOf(':') > 0){
							var retVal = d.split(':');
							if(retVal[0] == 'retId'){
								this.storeId = retVal[1];
								Ext.getCmp('woman_generalItems_tabpanel').remove('firstvisit_tabpanel_id');
								Ext.getCmp('woman_generalItems_tabpanel').remove('visitBeforeBorn_tabpanel_id');
								Ext.getCmp('woman_generalItems_tabpanel').remove('visitAfterBorn_tabpanel_id');
								Ext.getCmp('woman_generalItems_tabpanel').remove('visitAfterBorn42_tabpanel_id');
								Ext.getCmp('woman_generalItems_tabpanel').add({
									title : '第一次产前随访',
									layout : 'fit',
									id : 'firstvisit_tabpanel_id',
									height : win.getInnerHeight() - 30,
									border : true,
									items : [this.generalItems(win,'/firstvisit.html?fileNo=' + this.storeFileNo + '&foreignId=' + this.storeId)]
								});
								Ext.getCmp('woman_generalItems_tabpanel').add({
									title : '第2~5次产前随访',
									layout : 'fit',
									height : win.getInnerHeight() - 30,
									border : true,
									id : 'visitBeforeBorn_tabpanel_id',
									items : [this.generalItems(win,'/VisitBeforeBorn.html?fileNo=' + this.storeFileNo + '&foreignId=' + this.storeId)]
								});
								Ext.getCmp('woman_generalItems_tabpanel').add({
									title : '产后访视',
									layout : 'fit',
									height : win.getInnerHeight() - 30,
									border : true,
									id : 'visitAfterBorn_tabpanel_id',
									items : [this.generalItems(win,'/visitAfterBorn.html?fileNo=' + this.storeFileNo + '&foreignId=' + this.storeId)]
								});
								Ext.getCmp('woman_generalItems_tabpanel').add({
									title : '产后42天访视',
									layout : 'fit',
									height : win.getInnerHeight() - 30,
									border : true,
									id : 'visitAfterBorn42_tabpanel_id',
									items : [this.generalItems(win,'/visitAfterBorn42.html?fileNo=' + this.storeFileNo + '&foreignId=' + this.storeId)]
								});
							}
						}
					}
				}.createDelegate(this)
			}
		};
	},
	openWin : function(targetUrl, param) {
		if(this.isMaternal){
			var win = new Ext.Window({
				modal : true,
//				title : '录入记录',
				border : false,
				layout : 'fit',
				html : '<div id="woman_tabpanel" style="width:830px;margin:0 auto;"></div>'
			});
			if (param != null) {
				window.other_init_param = param;
			}

			win.show();
			win.maximize();
			var tabs = new Ext.TabPanel({
				activeTab: 0,
				id : 'woman_generalItems_tabpanel',
				renderTo: 'woman_tabpanel',
				items : [{
					title : '孕产妇保健手册',
					layout : 'fit',
					height : win.getInnerHeight() - 30,
					border : true,
					items : [this.generalItems(win,targetUrl)]
				}]
			});
//			win.add({
//				xtype : 'tabpanel',
//				activeTab: 0,
//				id : 'woman_generalItems_tabpanel',
//				items : [{
//					title : '孕产妇保健手册',
//					layout : 'fit',
//					items : [this.generalItems(win,targetUrl)]
//				}]
//			});
			win.doLayout(true);
		}else if(this.isAlreadyMaternal){
			var win = new Ext.Window({
				modal : true,
//				title : '录入记录',
				border : false,
				layout : 'fit',
				html : '<div id="woman_tabpanel" style="width:830px;margin:0 auto;"></div>'
			});
			if (param != null) {
				window.other_init_param = param;
			}

			win.show();
			win.maximize();
			var tabs = new Ext.TabPanel({
			    renderTo: 'woman_tabpanel',
			    activeTab: 0,
			    items : [{
					title : '孕产妇保健手册',
					layout : 'fit',
					height : win.getInnerHeight() - 30,
					border : true,
					items : [this.generalItems(win,targetUrl)]
				},{
					title : '第一次产前随访',
					layout : 'fit',
					height : win.getInnerHeight() - 30,
					border : false,
					items : [this.generalItems(win,'/firstvisit.html?fileNo=' + this.storeFileNo + '&foreignId=' + this.storeId)]
				},{
					title : '第2~5次产前随访',
					layout : 'fit',
					height : win.getInnerHeight() - 30,
					border : false,
					items : [this.generalItems(win,'/VisitBeforeBorn.html?fileNo=' + this.storeFileNo + '&foreignId=' + this.storeId)]
				},{
					title : '产后访视',
					layout : 'fit',
					height : win.getInnerHeight() - 30,
					border : false,
					items : [this.generalItems(win,'/visitAfterBorn.html?fileNo=' + this.storeFileNo + '&foreignId=' + this.storeId)]
				},{
					title : '产后42天访视',
					layout : 'fit',
					height : win.getInnerHeight() - 30,
					border : false,
					items : [this.generalItems(win,'/visitAfterBorn42.html?fileNo=' + this.storeFileNo + '&foreignId=' + this.storeId)]
				}]
			});
			win.doLayout(true);
		}else{
			var win = new Ext.Window({
				modal : true,
				title : '录入记录',
				border : false
			// autoScroll : true
			});
			if (param != null) {
				window.other_init_param = param;
			}

			win.show();
			win.maximize();

			win.add({
				xtype : 'iframepanel',
				defaultSrc : targetUrl,
				// width: win.getInnerWidth() - 380,
				height: win.getInnerHeight(),
				title : '',
				loadMask : true,
				autoScroll : false,
				listeners : {
					message : function(f, data) {
//						console.log("receive message...");
//						console.log(data);
						if (data.data == 'quit') {
							win.close();
						} else if (data.data == 'saved') {
							this.load();
						}
					}.createDelegate(this)
				}
			});
			win.doLayout(true);
		}
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
		var searchCondition = [ [ 'a.name', '姓名' ],[ 'b.birthday', '出生日期' ], [ 'a.fileNo', '档案编码' ],
		    					[ 'b.idnumber', '身份证号' ], [ 'a.paperFileNo', '纸质档案号' ], [ 'b.workUnit', '工作单位' ] ];

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

		this.editFn = function() {
			var selections = this.grid.getSelections();
			if (selections.length == 1) {
//				console.log(selections[0]);
				this.f_edit(selections[0]);
			}
		};

		this.editAction = new Ext.Action({
			text : '修改',
			iconCls : 'c_edit',
			handler : this.editFn.createDelegate(this)
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
		if(this.advancedFeatures){
			advancedF = new Ext.Button({
				text: '高级功能',
				iconCls: 'addBusinessData',
				menu: new Ext.menu.Menu({
			        items: [dataExport,new Ext.Action({
						text : '档案转移',
						iconCls : 'c_edit',
						handler : function() {
							var selections = this.grid.getSelections();
							if(selections.length > 0){
								UserMenuTreeService.getSelectedUserDistrict(function(data){
									MethodObj.openSelectedDistrictWin(selections,data);
			            		});
							}else{
								showInfoObj.Infor('请选择需要转移的档案！');
							}
						}.createDelegate(this)
					}),new Ext.Action({
						text : '档案注销',
						iconCls : 'c_del',
						handler : function() {
							var selections = this.grid.getSelections();
							if(selections.length > 0){
								MethodObj.logOffHealthfile(selections);
							}else{
								showInfoObj.Infor('请选择需要注销的档案！');
							}
						}.createDelegate(this)
					})]
			   	})
			})
		}else{
			advancedF = dataExport;
		}
		var funcAction;
		var store01 = new Ext.data.SimpleStore({
				fields : [ 'type', 'display' ],
				data : [ [ '100', '全部' ], [ '0', '未结案' ], [ '1', '已结案' ],
						[ '2', '终止妊娠' ] ]
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
				width : 80,
				value : '100'
			});
			funcAction = [
			new Ext.Action({
				text : '修改孕产妇保健手册',
				iconCls : 'c_edit',
				handler : function() {
					var selections = this.grid.getSelections();
					if (selections.length == 1) {
//						console.log(selections[0]);
						this.storeId = selections[0].data.id;
						this.storeFileNo = selections[0].data.fileNo;
						this.f_edit(selections[0]);
					}
				}.createDelegate(this)
			}),new Ext.Action({
				text : '撤销孕产妇保健手册',
				iconCls : 'c_del',
				handler : function() {
					var selections = this.grid.getSelections();
					if (selections.length > 0) {
						var array = [];
						var pk = this.recordPk;
						var judgeId = this.judgeCondId;
						var judgeVal = this.judgeCondVal;
						Ext.each(selections, function(v) {
							if(v.get(judgeId) == judgeVal){
								array.push(v.get(pk));
							}
						});

						var del = function(e) {
							if (e == "yes") {
								this.deleteUrl(array, {
									callback : function(data) {
										showInfoObj.Infor('删除成功！');
										this.load();
									}.createDelegate(this),
									errorHandler : function(msg) {
										console.log(msg);
										showInfoObj.Infor('删除出错！');
									}
								});
							}
						};
						Ext.MessageBox.confirm("提示", "确认要删除所选择的记录么？", del,
								this);
					}
				}.createDelegate(this)
			}),new Ext.Button({
				text: '终止妊娠',
				iconCls: 'addBusinessData',
				menu: new Ext.menu.Menu({
			        items: [new Ext.Action({
						text : '终止',
						iconCls : 'c_del',
						handler : function() {
							var selections = this.grid.getSelections();
							var judgeId = this.judgeCondId;
							var judgeVal = this.judgeCondVal;
							if (selections.length == 1) {
								if(selections[0].get(judgeId) == judgeVal){
									MethodObj.finishGestation(selections,this.grid);
								}
							}
						}.createDelegate(this)
					}),new Ext.Action({
						text : '撤销',
						iconCls : 'c_edit',
						handler : function() {
							var selections = this.grid.getSelections();
							if (selections.length > 0) {
								var array = [];
								var pk = this.recordPk;
								console.log(selections);
								Ext.each(selections, function(v) {
									console.log(v);
									if(v.data.isClosed == '2'){
										console.log(true);
										array.push(v.get(pk));
									}
								});
								var del = function(e) {
									if (e == "yes") {
										UserMenuTreeService.removeHealthfilesFinishGestation(array, {
											callback : function(data) {
												showInfoObj.Infor('撤销成功！');
												this.load();
											}.createDelegate(this),
											errorHandler : function(msg) {
												console.log(msg);
												showInfoObj.Infor('撤销出错！');
											}
										});
									}
								};
								console.log(array);
								if(array.length > 0){
									Ext.MessageBox.confirm("提示", "确认要撤销所选择的记录么？", del,
											this);
								}else{
									showInfoObj.Infor('请选择终止妊娠的记录进行撤销！');
								}
								
							}
						}.createDelegate(this)
					})]
			   	})
			}),'-',this.combo01,
			this.combo,
			this.filterField,
			new Ext.Action({
				text : '查询',
				iconCls : 'c_query',
				handler : function() {
					this.load(true);
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
			var filterVal01 = '';
			if(this.combo01){
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
		Ext.ToolTip.prototype.onTargetOver = Ext.ToolTip.prototype.onTargetOver
			.createInterceptor(function(e) {
				this.baseTarget = e.getTarget();
		});
		Ext.ToolTip.prototype.onMouseMove = Ext.ToolTip.prototype.onMouseMove
			.createInterceptor(function(e) {
				this.onTargetOver(e);
		});
		var onRenderGrid = function(){};
		
			onRenderGrid = function() {
				Ext.grid.GridPanel.prototype.onRender.apply(this, arguments);
				this.addEvents("beforetooltipshow");
				this.tooltip = new Ext.ToolTip({
					renderTo : Ext.getBody(),
					target : this.view.mainBody,
					listeners : {
						beforeshow : function(qt) {
								var v = this.getView();
								var store = this.getStore();
								var row = v.findRowIndex(qt.baseTarget);
								var cell = v.findCellIndex(qt.baseTarget);
								this.fireEvent("beforetooltipshow", this, row, cell);
								var dataItems = store.data.items;
		//						console.log(dataItems[row].data);
								qt.body.dom.innerHTML = '<div style="width:200px;height:30px;color:red;font-size:12px;">未发生终止妊娠</div>';
								if(dataItems[row].data.isClosed == '2'){
									UserMenuTreeService.getFinishGestation(dataItems[row].data.id,function(data){
										if(data != null){
											var $tipHtml = '<div style="width:200px;height:30px;">终止妊娠原因：' + data.finishReason + '</div>';
											qt.body.dom.innerHTML = $tipHtml;
										}
									});
								}			
								
						},
						scope : this
					}
				});
			}
		
		var sm = new Ext.grid.CheckboxSelectionModel();
		this.gridCmConfig.unshift(sm);
		this.grid = null;
		if(!this.isAlreadyChild){
			this.grid = new Ext.grid.GridPanel({
				title : '请选择一个行政区划',
				bbar : this.pagingBar,
				layout : 'fit',
				store : store,
				cm : new Ext.grid.ColumnModel(this.gridCmConfig),
				viewConfig : this.gridViewConfig,
				sm : sm,
				stripeRows: true,
				onRender : onRenderGrid
			});
		}else{
			this.grid = new Ext.grid.GridPanel({
				title : '请选择一个行政区划',
				bbar : this.pagingBar,
				layout : 'fit',
				store : store,
				cm : new Ext.grid.ColumnModel(this.gridCmConfig),
				viewConfig : this.gridViewConfig,
				sm : sm
			});
		}
		
		this.grid.getView().on('refresh', function() {
			// 缺省选择grid的第一条记录
			var model = this.grid.getSelectionModel();
			if (model.getCount() == 0) {
				model.selectFirstRow();
			}
		}.createDelegate(this));

		this.grid.on('rowclick', function(){
			this.load01(true);
		}.createDelegate(this), this);
		if(!this.isFinishGestation){
			this.grid.on('rowdblclick', function(){
				var selections = this.grid.getSelections();
				if (selections.length == 1) {
//					console.log(selections[0]);
					if(this.isMaternal){
						this.checkLastLevel = false;
						this.f_add();
					}else{
						this.storeId = selections[0].data.id;
						this.storeFileNo = selections[0].data.fileNo;
						this.f_edit(selections[0]);
					}
				}
			}, this);
		}
		var reader01 = new Ext.data.JsonReader({
			totalProperty : "totalSize",
			root : "data",
			id : this.recordId
		}, Ext.data.Record.create(this.readerConfig01));

		var store01 = new Ext.data.Store({
			proxy : new Ext.ux.data.DWRProxy({
				dwrFunction : this.queryUrl01,
				listeners : {
					'beforeload' : function(dataProxy, params) {
						var selections = this.grid.getSelections();
						var o = {};
						var healthFileMaternalId = '';
						if (selections.length == 1) {
							healthFileMaternalId = selections[0].get(this.recordId)
						}
						
						if(!this.isAlreadyChild){
							o = {healthFileMaternalId : healthFileMaternalId};
						}else{
							o = {healthFileChildrenId : healthFileMaternalId};
						}
						
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
		var sm01 = new Ext.grid.CheckboxSelectionModel();
		this.gridCmConfig01.unshift(sm01);
		this.gridother = new Ext.grid.GridPanel({
			title : '特殊情况记录',
			bbar : this.pagingBar01,
			layout : 'fit',
			store : store01,
			cm : new Ext.grid.ColumnModel(this.gridCmConfig01),
			sm : sm01,
			tbar : [new Ext.Action({
						text : '增加',
						iconCls : 'addBusinessData',
						handler : function() {
							var selections = this.grid.getSelections();
							var judgeId = this.judgeCondId;
							var judgeVal = this.judgeCondVal;
							if (selections.length == 1) {
								if(selections[0].get(judgeId) == judgeVal || this.isAlreadyChild){
									MethodObj.pregnancyRecordFunc(selections,0,this.gridother,this.service,this.serviceType);
								}
							}
						}.createDelegate(this)
				}),new Ext.Action({
					text : '修改',
					iconCls : 'c_edit',
					handler : function() {
						var selections = this.gridother.getSelections();
						if (selections.length == 1) {
							MethodObj.pregnancyRecordFunc(selections,1,this.gridother,this.service,this.serviceType);
						}
					}.createDelegate(this)
				}),new Ext.Action({
								text : '删除',
								iconCls : 'c_del',
								handler : function() {
									var selections = this.gridother.getSelections();
									if (selections.length > 0) {
										var array = [];
										var pk = this.recordPk;
										Ext.each(selections, function(v) {
											array.push(v.get(pk));
										});
										var del = function(e) {
											if (e == "yes") {
												this.deleteUrl01(array, {
													callback : function(data) {
														showInfoObj.Infor('删除成功！');
														this.load01();
													}.createDelegate(this),
													errorHandler : function(msg) {
														console.log(msg);
														showInfoObj.Infor('删除出错！');
													}
												});
											}
										};
										Ext.MessageBox.confirm("提示", "确认要删除所选择的记录么？", del,
												this);
									}
								}.createDelegate(this)
							})]
		});
		this.gridother.getView().on('refresh', function() {
			// 缺省选择grid的第一条记录
			var model = this.gridother.getSelectionModel();
			if (model.getCount() == 0) {
				model.selectFirstRow();
			}
		}.createDelegate(this));
		this.gridother.on('rowdblclick', function(){
			var selections = this.gridother.getSelections();
			if (selections.length == 1) {
				MethodObj.pregnancyRecordFunc(selections,1,this.gridother,this.service,this.serviceType);
			}
		}.createDelegate(this), this);
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
				},{
					region : 'south',
					layout : 'fit',
					frame : false,
					border : false,
					height : 300,
					items : [ this.gridother ]
				} ]
			} ]
		});
		return panel;
	}
});
