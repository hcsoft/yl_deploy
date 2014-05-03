Ext.ns("Ext.tf");

Ext.tf.HealthBookRecordsPanel = Ext.extend(Ext.Panel, {
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
	isMaternal : false,
	isAlreadyMaternal : false,
	isFinishGestation : false,
	isAlreadyChild : false,
	funType : 0,//功能标记
	service : null,
	serviceType : -1,
	
	addHealthBooksText : '新增孕产妇保健手册',
	delHealthBooksText : '撤销孕产妇保健手册',
	editHealthBooksText : '修改孕产妇保健手册',
		
	
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
	contextmenuToggle : true,
	examActiveTab : 0,
	
	examHtmlContainerId : 'woman_tabpanel',
	examShowParams :[ {
		title : '第一次产前随访',
		url : '/firstvisit.html',
		modName:'第一次产前随访记录'
	},{
		title : '第2~5次产前随访',
		url : '/VisitBeforeBorn.html',
        modName:'第2至5次产前随访记录'
	},{
		title : '产后访视',
		url : '/visitAfterBorn.html',
        modName:'产后访视记录'
	},{
		title : '产后42天访视',
		url : '/visitAfterBorn42.html',
        modName:'产后42天健康检查记录'
	}],
	
	
	getAddParams : function() {
		var node = this.getTreeSelNode();
		var districtNumber = node.id;
		var param = '?districtNumber=' + districtNumber;
		return param;
	},
	/*
	listeners:{
	    afterlayout : function(){
	        console.log(this.modId)
	        
	    }.createDelegate(this),
	    beforerender : function(){
	        console.log(window.global_modId)
            if(this.modId == null && !Ext.isEmpty(window.global_modId)){
                this.modId = window.global_modId;
            } 
	    }.createDelegate(this)
	},*/

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
		Ext.tf.HealthBookRecordsPanel.superclass.initComponent.call(this);
		
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
					if (data.data == 'quit') {
						win.close();
					} else if (data.data == 'saved') {
						this.load();
					}
				}.createDelegate(this)
			}
		};
	},
	
	openExamWin : function(examParam, param){
		var win = new Ext.Window({
			modal : true,
			border : false,
			layout : 'fit',
			html : '<div id="' + this.examHtmlContainerId + '" "></div>'
		});
		if (param != null) {
			window.other_init_param = param;
		}
		win.show();
		win.maximize();
		var tabs = new Ext.TabPanel({
		    renderTo: this.examHtmlContainerId,
		    activeTab: this.examActiveTab,
		    items : [{
				title : this.examShowParams[0].title,
				layout : 'fit',
				height : win.getInnerHeight() - 30,
				border : false,
				items : [this.generalItems(win,this.examShowParams[0].url + examParam )]
			},{
				title : this.examShowParams[1].title,
				layout : 'fit',
				height : win.getInnerHeight() - 30,
				border : false,
				items : [this.generalItems(win,this.examShowParams[1].url + examParam )]
			},{
				title : this.examShowParams[2].title,
				layout : 'fit',
				height : win.getInnerHeight() - 30,
				border : false,
				items : [this.generalItems(win,this.examShowParams[2].url + examParam)]
			},{
				title : this.examShowParams[3].title,
				layout : 'fit',
				height : win.getInnerHeight() - 30,
				border : false,
				items : [this.generalItems(win,this.examShowParams[3].url + examParam)]
			}]
		});
		win.doLayout(true);
	},
	
	openWin : function(targetUrl, param) {
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
	
	getExamAddParam : function(isSlient){
		if (this.checkLastLevel) {
			// 判断是否是第五级别
			var node = this.getTreeSelNode();
			
			var level = node.attributes['data'].level;
			if (level != 5) {
				if (!isSlient) {
					Ext.Msg.alert('', '只有第五级行政区域才能增加体检记录！');
				}
				return;
			}
		}
		var params = this.getAddParams();
//		params = params.replace('?','');
		return params;
	},
	
	createExamBtnActions : function(){
		return new Ext.Button({
			text: '体检及随访记录',
			iconCls: 'c_save',
			menu: new Ext.menu.Menu({
				items : [{
					text : this.examShowParams[0].title,
					handler : function() {
						var param = this.getExamAddParam();
						if(param){
							this.examActiveTab = 0;
							this.openExamWin(param);
						}
					}.createDelegate(this),
					listeners :{
					    render:function(obj,position){
					        UserMenuTreeService.hasCatInfoName(this.examShowParams[0].modName,function(data){
                                if(!data){
                                    obj.disable();
                                }
                            });
					    }.createDelegate(this)
					}
				},{
					text : this.examShowParams[1].title,
					handler : function() {
						this.examActiveTab = 1;
						var param = this.getExamAddParam();
						if(param){
							this.openExamWin(param);
						}
					}.createDelegate(this),
                    listeners:{
                        render:function(obj,position){
                            UserMenuTreeService.hasCatInfoName(this.examShowParams[1].modName,function(data){
                                if(!data){
                                    obj.disable();
                                }
                            });
                        }.createDelegate(this)
                    }
				},{
					text : this.examShowParams[2].title,
					handler : function() {
						this.examActiveTab = 2;
						var param = this.getExamAddParam();
						if(param){
							this.openExamWin(param);
						}
					}.createDelegate(this),
                    listeners:{
                        render:function(obj,position){
                            UserMenuTreeService.hasCatInfoName(this.examShowParams[2].modName,function(data){
                                if(!data){
                                    obj.disable();
                                }
                            });
                        }.createDelegate(this)
                    }
				},{
					text : this.examShowParams[3].title,
					handler : function() {
						this.examActiveTab = 3;
						var param = this.getExamAddParam();
						if(param){
							this.openExamWin(param);
						}
					}.createDelegate(this),
                    listeners:{
                        render:function(obj,position){
                            UserMenuTreeService.hasCatInfoName(this.examShowParams[3].modName,function(data){
                                if(!data){
                                    obj.disable();
                                }
                            });
                        }.createDelegate(this)
                    }
				}]
			})
		});
	},
	
	
	contextmenu : function(grid, rowIndex, e) {
		e.preventDefault();
		e.stopEvent();
		
		var record = grid.getStore().getAt(rowIndex);
//		var selections = grid.getSelections();
		if(record != null && record != undefined){
			this.storeId = record.data.id;
			this.storeFileNo = record.data.fileNo;
		}else{
			//Exception....???
		}
		var params = '?fileNo=' + this.storeFileNo + '&foreignId=' + this.storeId;
		var menu01 = new Ext.menu.Item({
			text : this.examShowParams[0].title,
			handler : function(){
				this.examActiveTab = 0;
				this.openExamWin(params);
			}.createDelegate(this),
			listeners :{
                    render  :function(obj,position){
                        UserMenuTreeService.hasCatInfoName(this.examShowParams[0].modName,function(data){
                            if(!data){
                                obj.disable();
                            }
                        });
                    }.createDelegate(this)
                }
		});

		var menu02 = new Ext.menu.Item({
			text : this.examShowParams[1].title,
			handler : function(){
				this.examActiveTab = 1;
				this.openExamWin(params);
			}.createDelegate(this),
			listeners :{
                    render  :function(obj,position){
                        UserMenuTreeService.hasCatInfoName(this.examShowParams[1].modName,function(data){
                            if(!data){
                                obj.disable();
                            }
                        });
                    }.createDelegate(this)
                }
		});
		var menu03 = new Ext.menu.Item({
			text : this.examShowParams[2].title,
			handler : function(){
				this.examActiveTab = 2;
				this.openExamWin(params);
			}.createDelegate(this),
			listeners :{
                        render  :function(obj,position){
                            UserMenuTreeService.hasCatInfoName(this.examShowParams[2].modName,function(data){
                                if(!data){
                                    obj.disable();
                                }
                            });
                        }.createDelegate(this)
                    }
		});
		var menu04 = new Ext.menu.Item({
			text : this.examShowParams[3].title,
			handler : function(){
				this.examActiveTab = 3;
				this.openExamWin(params);
			}.createDelegate(this),
			listeners :{
                        render :function(obj,position){
                            UserMenuTreeService.hasCatInfoName(this.examShowParams[3].modName,function(data){
                                if(!data){
                                    obj.disable();
                                }
                            });
                        }.createDelegate(this)
                    }
		});
		var menuList = [ menu01, menu02, menu03, menu04 ];

		this.grid_menu = new Ext.menu.Menu({
			items : menuList
		});
		var coords = e.getXY();
		grid.getSelectionModel().selectRow(rowIndex);
		this.grid_menu.showAt([ coords[0], coords[1] ]);
	},
	
	createActions : function() {
		var searchCondition = null;
		if(this.funType == 0){
			searchCondition = [ [ 'a.name', '姓名' ],[ 'b.birthday', '出生日期' ], [ 'a.fileNo', '档案编码' ],
		    					[ 'b.idnumber', '身份证号' ], [ 'a.paperFileNo', '纸质档案号' ], [ 'b.workUnit', '工作单位' ], [ 'c.edc', '预产期' ],['b.inputDate','建册日期'] ];
		}
		if(this.funType == 1){
			searchCondition = [ [ 'a.name', '姓名' ],[ 'b.birthday', '出生日期' ], [ 'a.fileNo', '档案编码' ],
		    					[ 'b.idnumber', '身份证号' ], [ 'a.paperFileNo', '纸质档案号' ], [ 'b.workUnit', '工作单位' ], ['b.inputDate','建册日期'] ];
        }

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
				}.createDelegate(this)
			}
		});

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
		var advancedF = dataExport;
		
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
			value : '0'
		});
		var store02 = new Ext.data.SimpleStore({
            fields : [ 'type', 'display' ],
            data : [ [ '100', '全部' ], [ '0', '未结案' ], [ '1', '已结案' ] ]
        });
        this.combo02 = new Ext.form.ComboBox({
            store : store02,
            displayField : 'display',
            valueField : 'type',
            typeAhead : true,
            mode : 'local',
            triggerAction : 'all',
            selectOnFocus : true,
            editable : false,
            width : 80,
            value : '0',
            id : 'child_status'
        });
		var funcAction = [];
		
		var healthBooksBtn = new Ext.Button({
			text: '保健手册',
			iconCls: 'addBusinessData',
			menu: new Ext.menu.Menu({
				items: [new Ext.Action({
					text : this.addHealthBooksText,
					handler : function() {
						this.f_add();
					}.createDelegate(this)
				}),new Ext.Action({
					text : this.editHealthBooksText,
					handler : function() {
						var selections = this.grid.getSelections();
						if (selections.length == 1) {
							this.storeId = selections[0].data.id;
							this.storeFileNo = selections[0].data.fileNo;
							this.f_edit(selections[0]);
						}
					}.createDelegate(this)
				}),new Ext.Action({
					text : this.delHealthBooksText,
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
				})]
			})
		});
        if(!Ext.isEmpty(window.global_modId)){
            UserMenuTreeService.hasCatInfoId(window.global_modId,function(data){
                if(!data){
                    healthBooksBtn.disable();
                }
            });
        }
		var examBtn = this.createExamBtnActions();
		var terminationBirthBtn = new Ext.Button({
			text: '终止妊娠',
			iconCls: 'c_del',
			menu: new Ext.menu.Menu({
		        items: [new Ext.Action({
					text : '终止',
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
					handler : function() {
						var selections = this.grid.getSelections();
						if (selections.length > 0) {
							var array = [];
							var pk = this.recordPk;
							Ext.each(selections, function(v) {
								if(v.data.isClosed == '2'){
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
		});
		funcAction.push(healthBooksBtn);
		funcAction.push(examBtn);
		if(this.funType == 0){
			funcAction.push(terminationBirthBtn);
		}
		funcAction.push('-');
		if(this.funType == 0){
			funcAction.push(this.combo01);
		}
		if(this.funType == 1){
            funcAction.push(this.combo02);
        }
		funcAction.push(this.combo);
		funcAction.push(this.filterField);
		funcAction.push(new Ext.Action({
			text : '查询',
			iconCls : 'c_query',
			handler : function() {
				this.load(true);
			}.createDelegate(this)
		}));
//		funcAction.push(advancedF);
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
			var params = {};
			if(this.combo02){
                params [this.combo02.id] = this.combo02.getValue();
            }
			var cond = {
				district : selNode.id,
				filterKey : filterKey,
				filterValue : filterValue,
				filterVal01 : filterVal01,
				params : params
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
//								console.log(dataItems[row]);
								if(dataItems[row] != undefined && dataItems[row].data.isClosed == '2'){
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
				onRender : onRenderGrid,
				contextmenuToggle : this.contextmenuToggle
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
		
		/**
		 * 右键事件
		 */
		this.contextmenuToggle && this.grid.on('rowcontextmenu',this.contextmenu,this); 

		
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
			},
			dblclick : {
				stopEvent : true,
				fn : function(n, e) {
					e.stopEvent();
					this.currentNode = n;
					this.f_add();
				}.createDelegate(this)
			},
			'contextmenu' :function(node,e){
                e.preventDefault();
                node.select();
                var contextmenu=new Ext.menu.Menu({
                    id:'leafcontextmeun',
                    items:[{text:'刷新',
                            handler:function(){
                                this.menu.getLoader().load(this.menu.root);
                            }
                        }]
                    }
                );
                leafcontextmenu.showAt(e.getXY());
                
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
