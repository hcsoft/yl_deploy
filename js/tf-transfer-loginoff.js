Ext.ns("Ext.tf");

// /////////////
// 转档及档案注销模板
// /////////////

Ext.tf.HealthTransferLoginOffPanel = Ext.extend(Ext.Panel, {
	closable : true,
	currentNode : null, // 当前选择的树节点
	layout : 'fit',
	pageSize : 20,
	panelId : 'healthTransferLoginOff',
	gridId : 'healthTransferLoginOffGrid',
	// 设置查询url
	queryUrl : Ext.emptyFn,
	dataExportUrl : Ext.emptyFn,
	treeLoaderFn : Ext.emptyFn,
	flowType : null,
	// 设置查询用的类别，比如档案，高血压等。。
	readerConfig : [],
	gridCmConfig : [],
	gridViewConfig : {},
	type : -1,
//	contextmenuToggle : false,
	initComponent : function() {
		this.build();
		Ext.tf.HealthTransferLoginOffPanel.superclass.initComponent.call(this);
	},

	build : function() {
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
		this.queryFunc = new Ext.Action({
			text : '查询',
			iconCls : 'c_query',
			handler : function() {
				this.load(true);
			}.createDelegate(this)
		});
		var returnFunc = [];
		if(this.type == 0){
			var store01 = new Ext.data.SimpleStore({
				fields : [ 'type', 'display' ],
				data : [ [ '100', '全部' ], [ '0', '未审核' ], [ '1', '已审核' ],
						[ '2', '退回' ] ]
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
			var store = new Ext.data.SimpleStore({
				fields : [ 'type', 'display' ],
				data : [ [ 'a.name', '姓名' ], [ 'a.birthday', '出生日期' ], [ 'a.fromFileNo', '老档案编码' ], 
				         [ 'a.toFileNo', '新档案编码' ],[ 'a.idNumber', '身份证号' ] ]
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
			returnFunc.push(this.combo01);
			returnFunc.push(this.combo);
			returnFunc.push(this.filterField);
			returnFunc.push(this.queryFunc);
			this.verifyFunc = new Ext.Action({
				text : '审核',
				iconCls : 'c_edit',
				handler : function() {
					this.TransLoginOffWinForm('档案审核',0);
				}.createDelegate(this)
			});
			this.exitFunc = new Ext.Action({
				text : '退回',
				iconCls : 'c_del',
				handler : function() {
					this.TransLoginOffWinForm('档案退回',1);
				}.createDelegate(this)
			});
			returnFunc.push(this.verifyFunc);
			returnFunc.push(this.exitFunc);
		}else if(this.type == 1){
			var store = new Ext.data.SimpleStore({
				fields : [ 'type', 'display' ],
				data : [ [ 'a.name', '姓名' ], [ 'b.birthday', '出生日期' ], [ 'a.fileNo', '档案编码' ],
						[ 'b.idnumber', '身份证号' ] ]
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
			this.combo01 = Component.createDwrCombo(0,0,'BasicInformation','loginOffReason',100,130,0,'LoginOffReason','LoginOffReason',2000);
			returnFunc.push(this.combo01);
			returnFunc.push(this.combo);
			returnFunc.push(this.filterField);
			returnFunc.push(this.queryFunc);
			this.exitFunc = new Ext.Action({
				text : '撤销',
				iconCls : 'c_del',
				handler : function() {
					this.TransLoginOffWinForm('档案注销撤销',2);
				}.createDelegate(this)
			});
			returnFunc.push(this.exitFunc);
		}else if(this.type == 2){
			var store01 = new Ext.data.SimpleStore({
				fields : [ 'type', 'display' ],
				data : [ [ '100', '全部' ], [ '0', '未审核' ], [ '1', '已审核' ],
						[ '2', '退回' ] ]
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
			var store = new Ext.data.SimpleStore({
				fields : [ 'type', 'display' ],
				data : [ [ 'a.name', '姓名' ], [ 'a.birthday', '出生日期' ], [ 'a.fromFileNo', '老档案编码' ], 
				         [ 'a.toFileNo', '新档案编码' ],[ 'a.idNumber', '身份证号' ] ]
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
			returnFunc.push(this.combo01);
			returnFunc.push(this.combo);
			returnFunc.push(this.filterField);
			returnFunc.push(this.queryFunc);
		}
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
								Ext.getCmp(id).getEl().unmask();
							});
				}
			}.createDelegate(this)
		});
		returnFunc.push(dataExport);
		return returnFunc;
	},

	/**
	 * type 0表示审核窗口 1表示退回窗口 2表示撤消窗口
	 */
	TransLoginOffWinForm : function(title,type){
		var selections = this.grid.getSelections();
		if(selections.length > 0){
			var items = [];
			var height = 200;
			if(type == 0){
				var panel = new Ext.FormPanel({
					layout : 'absolute',
					width : 400,
					height : 200,
					frame : true,
					items : [Component.createLabel('addressTxt','addressTxt',3,3,'现住址：'),
					         Component.createTextfield('address','address',60,0,170,false,selections[0].data.address),
					         Component.createLabel('residenceAddressTxt','residenceAddressTxt',3,33,'户籍地址：'),
					         Component.createTextfield('residenceAddress','residenceAddress',60,30,170,false,selections[0].json.trans.residenceAddress),
					         Component.createLabel('fromBuildDoctorTxt','fromBuildDoctorTxt',3,63,'责任医生：'),
					         Component.createTextfield('fromBuildDoctor','fromBuildDoctor',60,60,170,false,selections[0].json.trans.fromBuildDoctor),
					         Component.createLabel('fromBuildUnitTxt','fromBuildUnitTxt',3,93,'建档单位：'),
					         Component.createTextfield('fromBuildUnit','fromBuildUnit',60,90,170,false,selections[0].json.trans.fromBuildUnit),
					         Component.createLabel('fromBuildPersonTxt','fromBuildPersonTxt',3,123,'建档人：'),
					         Component.createTextfield('fromBuildPerson','fromBuildPerson',60,120,170,false,selections[0].json.trans.fromBuildPerson),
					         Component.createButton('transferbtn','transferbtn',3,155,'c_edit',{
					        	 click : function() {
					        		 var formData = panel.getForm().getValues(false);
					        		 formData.id = selections[0].data.id;
					        		 formData.toDistrictNumber = selections[0].json.trans.toDistrictNumber;
					        		 var gId = this.gridId;
					        		 loginOffService.sureTransferService(formData,function(){
					        			 showInfoObj.Infor('档案审核成功！');
					        			 Ext.getCmp(gId).getStore().reload();
					        		 });
					        		 win.close();
//					        		 this.load(true);
					        	 }.createDelegate(this)
					         },'审核'),
					         Component.createButton('transferclosewinbtn','transferclosewinbtn',70,155,'c_del',{
					        	 click : function() {
					        		 win.close();
					        	 }.createDelegate(this)
					         },'关闭窗口')]
				});
				height = 220;
				items.push(panel)
			}else if(type == 1){
				var panel = new Ext.Panel({
					layout : 'absolute',
					width : 300,
					height : 180,
					frame : true,
					items : [Component.createLabel('TranferExitReamarkTxt','TranferExitReamarkTxt',3,0,'退回原因：'),
					         Component.createTextarea('exitReasion','exitReasion',3,20,110,270,''),
					         Component.createButton('transferexitbtn','transferexitbtn',3,135,'c_edit',{
					        	 click : function() {
					        		 if(selections[0].data.isSure == '0'){
					        			 var formData = {
					        				healthFileTransferId : selections[0].data.id,
								        	exitReasion : Ext.getCmp('exitReasion').getValue()
								         };
					        			 var gId = this.gridId;
								         loginOffService.transferExitHealthfile(formData,function(){
								        	 showInfoObj.Infor('档案成功退回！');
								        	 Ext.getCmp(gId).getStore().reload();
								         });
								         win.close();
//								         this.load(true);
					        		 }else{
					        			 showInfoObj.Infor('只有处于未审核的档案才能退回！');
					        		 }
					        		
					        	 }.createDelegate(this)
					         },'退回'),
					         Component.createButton('transferexitclosewinbtn','transferexitclosewinbtn',70,135,'c_del',{
					        	 click : function() {
					        		 win.close();
					        	 }.createDelegate(this)
					         },'关闭窗口')]
				});
				items.push(panel)
			}else if(type == 2){
				var panel = new Ext.Panel({
					layout : 'absolute',
					width : 300,
					height : 180,
					frame : true,
					items : [Component.createLabel('LoginOffExitReamarkTxt','LoginOffExitReamarkTxt',3,0,'撤销原因：'),
					         Component.createTextarea('loginOffExitReasion','loginOffExitReasion',3,20,110,270,''),
					         Component.createButton('loginoffexitbtn','loginoffexitbtn',3,135,'c_edit',{
					        	 click : function() {
					        		var formData = {
					        			healthFileLoginOffId : selections[0].data.id,
					        			loginOffExitReasion : Ext.getCmp('loginOffExitReasion').getValue()
								     };
					        		console.log(formData);
					        		console.log(selections[0]);
					        		 var gId = this.gridId;
								     loginOffService.loginOffExitHealthfile(formData,function(){
								    	 showInfoObj.Infor('档案撤销成功！');
								       	 Ext.getCmp(gId).getStore().reload();
								     });
								     win.close();
					        	 }.createDelegate(this)
					         },'撤销'),
					         Component.createButton('loginoffexitclosewinbtn','loginoffexitclosewinbtn',70,135,'c_del',{
					        	 click : function() {
					        		 win.close();
					        	 }.createDelegate(this)
					         },'关闭窗口')]
				});
				items.push(panel)
			}
			var win = new Ext.Window({
				width : 300,
				height : height,
				modal : true,
				title : title,
				items : items
			});
			win.show();
		}else{
			showInfoObj.Infor('请选择档案！');
		}
		
	},
	
	/*
	 * 取得行政树的节点 如果节点没有选中，提示信息，返回空 如果选中，再取得过滤条件，组合成查询条件，并返回之
	 */
	getParams : function() {
		var selNode = this.getTreeSelNode();
		if (selNode) {
			var filterKey = this.combo.getValue();
			var filterValue = this.filterField.getValue();
			var t = this.combo01.getValue();
			var cond = {
				district : selNode.id,
				filterKey : filterKey,
				filterValue : filterValue,
				type : t,
				flowType : this.flowType
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
//			if (isReset) {
//				this.pagingBar.changePage(1);
//			}
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
		var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
		this.gridCmConfig.unshift(sm);
		Ext.ToolTip.prototype.onTargetOver = Ext.ToolTip.prototype.onTargetOver
			.createInterceptor(function(e) {
				this.baseTarget = e.getTarget();
		});
		Ext.ToolTip.prototype.onMouseMove = Ext.ToolTip.prototype.onMouseMove
			.createInterceptor(function(e) {
				this.onTargetOver(e);
		});
		
		var onRenderGrid = null;
		if(this.type == 0 || this.type == 2){
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
//							console.log(dataItems)
//							if(row != false){
								var $tipHtml = '<div><table class="transfer_loginoff_cls" cellpadding="0" cellspacing="0">' +
									'<tr><td>姓名：</td><td>'+ dataItems[row].data.name + '</td></tr>' +
									'<tr><td>性别：</td><td>'+ dataItems[row].data.personalInfo_sex + '</td></tr>' +
									'<tr><td>出生日期：</td><td>'+ calculateTimeObj.formatDate(dataItems[row].data.personalInfo_birthday) + '</td></tr>' +
									'<tr><td>身份证号：</td><td>'+ dataItems[row].data.personalInfo_idnumber + '</td></tr>' +
									'<tr><td>原住址：</td><td>'+ dataItems[row].data.address + '</td></tr>' +
									'<tr><td>原户籍地址：</td><td>'+ dataItems[row].json.trans.residenceAddress + '</td></tr>' +
									'<tr><td>原乡镇名称：</td><td>'+ dataItems[row].json.trans.fromTown + '</td></tr>' +
									'<tr><td>原村委会名称：</td><td>'+ dataItems[row].json.trans.fromVillage + '</td></tr>' +
									'<tr><td>转档申请原因：</td><td>'+ Utils.formatNullOrEmpty(dataItems[row].json.trans.transferReason) + '</td></tr>' +
									'<tr><td>转档申请时间：</td><td>'+ calculateTimeObj.formatDate(dataItems[row].json.trans.transferTime) + '</td></tr>' +
									'<tr><td>现乡镇名称：</td><td>'+ dataItems[row].data.districtTownship + '</td></tr>' +
									'<tr><td>现村委会名称：</td><td>'+ dataItems[row].data.districtVillage + '</td></tr>' +
									'<tr><td>新档案编号：</td><td>'+ Utils.formatNullOrEmpty(dataItems[row].data.toFileNo) + '</td></tr>' +
//									'<div><span>退回原因：</span><span>'+ Utils.formatDate(dataItems[row].data.buildDate) + '</span></div>' +
									'</table></div>';
								qt.body.dom.innerHTML = $tipHtml;
//							}							
						},
						scope : this
					}
				});
			}
		}else if(this.type == 1){
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
//							console.log(dataItems)
//							if(row != false){
								var $tipHtml = '<table style="width:470px;font-size:12px;height:25px;line-height:25px;" cellpadding="0" cellspacing="0" border="0">' +
										'<tr><td style="width:100px;">姓名：</td><td style="width:370px;">'+ dataItems[row].data.name + '</td></tr>' +
										'<tr><td>性别：</td><td>'+ dataItems[row].data.personalInfo_sex + '</td></tr>' +
										'<tr><td>出生日期：</td><td>'+ calculateTimeObj.formatDate(dataItems[row].data.personalInfo_birthday) + '</td></tr>' +
										'<tr><td>身份证号：</td><td>'+ dataItems[row].data.personalInfo_idnumber + '</td></tr>' +
										'<tr><td>户籍地址：</td><td>'+ Utils.formatNullOrEmpty(dataItems[row].json.file.residenceAddress) + '</td></tr>' +
										'<tr><td>现住址：</td><td>'+ Utils.formatNullOrEmpty(dataItems[row].data.address) + '</td></tr>' +
										'<tr><td>乡镇(街道)名称：</td><td>'+ dataItems[row].json.file.township + '</td></tr>' +
										'<tr><td>村(居)委会名称：</td><td>'+ dataItems[row].json.file.village + '</td></tr>' +
										'<tr><td>建档单位：</td><td>'+ Utils.formatNullOrEmpty(dataItems[row].json.file.buildUnit) + '</td></tr>' +
										'<tr><td>建档人：</td><td>'+ Utils.formatNullOrEmpty(dataItems[row].json.file.buildPerson) + '</td></tr>' +
										'<tr><td>责任医生：</td><td>'+ Utils.formatNullOrEmpty(dataItems[row].json.file.doctor) + '</td></tr>' +
										'<tr><td>建档日期：</td><td>'+ calculateTimeObj.formatDate(dataItems[row].json.file.buildDate) + '</td></tr>' +
									'</table>';
								qt.body.dom.innerHTML = $tipHtml;
//							}							
						},
						scope : this
					}
				});
			}
		}
		
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
			id : this.gridId
		});
		this.grid.getView().on('refresh', function() {
			// 缺省选择grid的第一条记录
			var model = this.grid.getSelectionModel();
			if (model.getCount() == 0) {
				model.selectFirstRow();
			}
		}.createDelegate(this));

//		if(this.contextmenuToggle){
//			this.grid.on('rowcontextmenu', this.contextmenu,this.grid);
//		}
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
				}.createDelegate(this)
			},
			dblclick : {
				fn : function(n, e) {
					this.f_add(true);
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
				layout : 'fit',
				frame : false,
				border : false,
				items : [ this.grid ]
			} ]
		});
		return panel;
	}
});
