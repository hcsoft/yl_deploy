Ext.ns("Ext.tf");

// /////////////
// 健康档案模板
// /////////////

var isFirst = 1;

Ext.tf.HealthPanel = Ext.extend(Ext.Panel, {
	closable : true,
	currentNode : null, // 当前选择的树节点
	layout : 'fit',
//	title : '档案',
	pageSize : 20,
	recordId : 'id',
	recordPk : 'id',
	panelId : 'app.residentPanel',
	judgeCondId : '',
	judgeCondVal : '',
	storeFileNo : '',
	storeId : '',
	advancedFeatures : false,
	isMaternal : false,
	maternalText : '建立孕产妇保健手册',
	isAlreadyMaternal : false,
	isFinishGestation : false,
	isPrintHealthFile : false,
	isPrintMedicalExam : false,
	isWomanExam : false,
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
	detailUrl : '/personalInfo.html',
	readerConfig : [],
	gridCmConfig : [],
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
		if(getParams == '-1'){
			showInfoObj.Infor('请选择档案');
		}else if(getParams == '-2'){
			var selections = this.grid.getSelections();
			showInfoObj.Infor(selections[0].data.name + '小朋友已经建立了保健手册');
		}else{
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
				height: win.getInnerHeight() ,
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
		var searchCondition =  [ [ 'a.name', '姓名' ], [ 'c.highRisk', '高危筛选' ],
		     					[ 'a.inputDate', '录入日期' ], [ 'a.lastModifyDate', '修改日期' ],
		    					[ 'b.birthday', '出生日期' ], [ 'a.fileNo', '档案编码' ],
		    					[ 'b.idnumber', '身份证号' ], [ 'b.linkman', '联系人' ],
		    					[ 'a.paperFileNo', '纸质档案号' ], [ 'b.workUnit', '工作单位' ] , 
		    					[ 'a.nation', '国籍' ], [ 'b.farmStatus', '是否农业户口' ], 
		    					[ 'b.townStatus', '是否城镇户口' ], 
		    					[ 'a.address', '地址' ], 
		    					[ 'a.residenceAddress', '户籍地址' ]];
		if(this.isAlreadyMaternal){
			searchCondition = [ [ 'a.name', '姓名' ],[ 'b.birthday', '出生日期' ], [ 'a.fileNo', '档案编码' ],
		    					[ 'b.idnumber', '身份证号' ], [ 'a.paperFileNo', '纸质档案号' ], [ 'b.workUnit', '工作单位' ], [ 'a.nation', '国籍' ] ];
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
		
		var orgCondition =  window.orgList;
		var orgstore = new Ext.data.SimpleStore({
			fields : [ 'type', 'display' ],
			data : orgCondition
		});
		this.orgcombo = new Ext.form.ComboBox({
			store : orgstore,
			displayField : 'display',
			valueField : 'type',
			typeAhead : true,
			mode : 'local',
			triggerAction : 'all',
			selectOnFocus : true,
			editable : false,
			minListWidth  : 250,
			value : ''
		});
		this.onlySelfField = new Ext.form.Checkbox({
			boxLabel  : '仅查询自己'
		});
		this.onlyOrgField = new Ext.form.Checkbox({
			boxLabel  : '仅查询所在机构',
			checked : true
		});
		this.noExamField = new Ext.form.Checkbox({
			boxLabel  : '无体检'
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
		
		this. waitnodeexpend = function(node,parent,time){
			that = this;
			if(time<20000){
				if(!this.menu.getNodeById(node) ){
					if(this.menu.getNodeById(parent)){
						this.menu.expandPath(this.menu.getNodeById(parent).getPath());
						setTimeout(function(){that.waitnodeexpend(node,node.substring(0,parent.length+3),time+500)},500);
					}else{
						setTimeout(function(){that.waitnodeexpend(node,parent,time+500)},500);
					}
				}else{
					this.menu.selectPath(this.menu.getNodeById(node).getPath());
				}
			}
		};
		//档案关联行政区划
		var linkbutton = new Ext.Action({
			text : '区划',
			iconCls : 'linkbg',
			handler : function(){
				var selections = this.grid.getSelections();
				if(selections.length >= 1){
					var fileNo = selections[0].data.fileNo;
					var curentid = fileNo.substr(0,12);
					var parentid = fileNo.substr(0,6);
					var len = 6;
					this.waitnodeexpend(curentid,parentid,0);
//					this.menu.expandPath(this.menu.getNodeById(fileNo.substr(0,12)).getPath());
				}
			}.createDelegate(this)
		});
		var printHealthFile = '';
		//打印档案
		if(this.isPrintHealthFile){
			printHealthFile = new Ext.Action({
				text : '打印',
				iconCls : 'printbg',
				handler : function(){
					var selections = this.grid.getSelections();
					if(selections.length == 1){
						var fileNo = selections[0].data.fileNo;
//						PrintHealthFileAndExamClass.printHealthFile(fileNo);
						PrintHealthFileAndExamClass.printHealthFileOther(fileNo);
					}else{
						showInfoObj.Infor('请选择打印的档案！');
					}
				}.createDelegate(this)
			});
		}
		var printMedicalExam = '';
		//打印健康体检记录
		if(this.isPrintMedicalExam){
			printMedicalExam = new Ext.Action({
				text : '打印',
				iconCls : 'printbg',
				handler : function(){
					var selections = this.grid.getSelections();
					if(selections.length == 1){
						var id = selections[0].data.id;
						PrintHealthFileAndExamClass.printMedicalExam(id);
					}else{
						showInfoObj.Infor('请选择打印的健康体检记录！');
					}
				}.createDelegate(this)
			});
		}
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
					if(typeof(this.dataExportUrl)==="function"){
						this.dataExportUrl(disNo, filterKey, filterValue,
								function(data) {
									window.location.href = data;
									// UserMenuTreeService.removeDataExportFile(data);
									Ext.getCmp(id).getEl().unmask();
								});
					}else if(typeof(this.dataExportUrl)==="string"){
						DataExportService.sqlExportCsv(disNo,this.dataExportUrl,filterKey, filterValue,
							function(data) {
								window.location.href = data;
								Ext.getCmp(id).getEl().unmask();
							});
					}
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
		var funcAction = [];
		if(this.isMaternal){
			funcAction = [new Ext.Action({
								text : this.maternalText,
								iconCls : 'c_add',
								handler : function() {
									var selNode = this.getTreeSelNode();
									if (selNode) {
										this.checkLastLevel = false;
										this.f_add();
									}
								}.createDelegate(this)
							}),'-',
							this.combo,
							this.filterField,
							this.onlyOrgField,
							this.orgcombo,
							new Ext.Action({
								text : '查询',
								iconCls : 'c_query',
								handler : function() {
									this.load(true);
								}.createDelegate(this)
							})];
		}else if(this.isAlreadyMaternal){
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
				text : '修改',
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
									}.createDelegate(this)
//									,
//									errorHandler : function(msg) {
//										console.log(msg);
//										showInfoObj.Infor('删除出错！');
//									}
								});
							}
						};
						Ext.MessageBox.confirm("提示", "确认要删除所选择的记录么？", del,
								this);
					}
				}.createDelegate(this)
			}),new Ext.Action({
				text : '终止妊娠',
				iconCls : 'c_add',
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
				text : '特殊情况记录',
				iconCls : 'addBusinessData',
				handler : function() {
					var selections = this.grid.getSelections();
					var judgeId = this.judgeCondId;
					var judgeVal = this.judgeCondVal;
					if (selections.length == 1) {
						if(selections[0].get(judgeId) == judgeVal){
							MethodObj.pregnancyRecordFunc(selections,0,null);
						}
					}
				}.createDelegate(this)
			}),'-',this.combo01,
			this.combo,
			this.filterField,
			this.onlyOrgField,
			this.onlySelfField,
			new Ext.Action({
				text : '查询',
				iconCls : 'c_query',
				handler : function() {
					this.load(true);
				}.createDelegate(this)
			})];
		} else if(this.isFinishGestation){
			funcAction = [
			new Ext.Action({
				text : '撤销终止妊娠档案',
				iconCls : 'c_del',
				handler : function() {
					var selections = this.grid.getSelections();
					if (selections.length > 0) {
						var array = [];
						var pk = this.recordPk;
						Ext.each(selections, function(v) {
							array.push(v.get(pk));
						});

						var del = function(e) {
							if (e == "yes") {
								this.deleteUrl(array, {
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
						Ext.MessageBox.confirm("提示", "确认要撤销所选择的记录么？", del,
								this);
					}
				}.createDelegate(this)
			}),'-',
			this.combo,
			this.filterField,
			this.onlyOrgField,
			this.onlySelfField,
			new Ext.Action({
				text : '查询',
				iconCls : 'c_query',
				handler : function() {
					this.load(true);
				}.createDelegate(this)
			})];
		} else{
			this.addAction = new Ext.Action({
				text : '增加',
				iconCls : 'c_add',
				handler : function() {
					var selNode = this.getTreeSelNode();
					if (selNode) {
						this.f_add();
					}
				}.createDelegate(this)
			});
			if(!this.isWomanExam){
				funcAction.push(this.addAction);
			}
			funcAction.push(this.editAction);
			funcAction.push(new Ext.Action({
								text : '删除',
								iconCls : 'c_del',
								handler : function() {
									var selections = this.grid.getSelections();
									if (selections.length > 0) {
										var array = [];

										var pk = this.recordPk;
										Ext.each(selections, function(v) {
											array.push(v.get(pk));
										});

										var del = function(e) {
											if (e == "yes") {
												this.deleteUrl(array, {
													callback : function(data) {
														Ext.Msg.alert('', '删除成功！');
														this.load();
													}.createDelegate(this)
//													,
//													errorHandler : function(msg) {
//														console.log(msg);
//														Ext.Msg.alert('', '删除出错！');
//													}
												});
											}
										};
										Ext.MessageBox.confirm("提示", "确认要删除所选择的记录么？", del,
												this);
									}
								}.createDelegate(this)
							}));
			funcAction.push(printHealthFile);
			funcAction.push(linkbutton);
			funcAction.push(printMedicalExam);
			funcAction.push('-');
			funcAction.push(this.combo);
			funcAction.push(this.filterField);
			funcAction.push(this.onlyOrgField);
			funcAction.push(this.onlySelfField);
			funcAction.push(this.noExamField);
			funcAction.push('-');
			funcAction.push(new Ext.form.Label({xtype:'lable',text:'选择机构'}));
			funcAction.push(this.orgcombo);
			funcAction.push(new Ext.Action({
								text : '查询',
								iconCls : 'c_query',
								handler : function() {
									this.load(true);
								}.createDelegate(this)
							}));
			funcAction.push(advancedF);
			
		}
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
			var params = {};
			console.log("onlyself ==" +this.onlySelfField && this.onlySelfField.getValue())
			if(this.onlySelfField && this.onlySelfField.getValue()){
				params['onlyself'] = this.onlySelfField.getValue();
			}
			if(this.noExamField && this.noExamField.getValue()){
				params['noexam'] = this.noExamField.getValue();
			}
			console.log("onlyorg ==" +this.onlyOrgField && this.onlyOrgField.getValue())
			if(this.onlyOrgField && this.onlyOrgField.getValue()){
				params['onlyorg'] = this.onlyOrgField.getValue();
			}
			if(this.orgcombo){
				params['org_id'] = this.orgcombo.getValue();
			}
			var cond = {
				district : selNode.id,
				filterKey : filterKey,
				filterValue : filterValue,
				isFirst : isFirst,
				filterVal01 : filterVal01,
				params: params
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
						console.log("getParams: ")
						console.log(o);
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
			viewConfig : this.gridViewConfig,
			sm : sm
		});
		this.grid.getView().on('refresh', function() {
			// 缺省选择grid的第一条记录
			var model = this.grid.getSelectionModel();
			if (model.getCount() == 0) {
				model.selectFirstRow();
			}
		}.createDelegate(this));

// this.grid.on('rowdblclick', this.editFn, this);
		if(!this.isFinishGestation ){
			this.grid.on('rowdblclick', function(){
				var selections = this.grid.getSelections();
				if (selections.length == 1) {
//					console.log(selections[0]);
					if(this.isMaternal){
						this.checkLastLevel = false;
						this.f_add();
					}else{
						this.f_edit(selections[0]);
					}
				}
			}, this);
		}

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
					this.isFirst.setValue(1);
					this.grid.setTitle(n.text);
					this.load();
				}.createDelegate(this)
			},
			dblclick : {
				fn : function(n, e) {
					if(!this.isAlreadyMaternal && !this.isFinishGestation && !this.isWomanExam)
						this.f_add(true);
				}.createDelegate(this)
			}
			// ,
            // render:function(){
                // this.menu.getEl().on(
                    // 'contextmenu' ,function(e,node){
                        // e.stopEvent();
                        // var contextmenu=new Ext.menu.Menu({
                            // id:'leafcontextmeun',
                            // items:[{text:'刷新',
                                    // handler:function(){
                                        // this.menu.getLoader().load(this.menu.root);
                                    // }.createDelegate(this)
                                // }]
                            // }
                        // );
                        // contextmenu.showAt(e.getXY());
                    // }.createDelegate(this)
                // );
            // }.createDelegate(this)
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

/**
 * 行政，组织机构 树形编辑
 */
Ext.tf.OrgTreePanel = Ext.extend(Ext.Panel, {
	title : '未命名',
	closable : true,
	autoScroll : true,
	// height: 100,
	currentNode : null,
	saveFn : Ext.emptyFn,
	deleteFn : Ext.emptyFn,
	formItems : [],

	addEqAction : null,
	addDownAction : null,
	editAction : null,
	delAction : null,

	initComponent : function() {
		this.buildAction();
		this.buildTree();
		this.build();
		Ext.tf.OrgTreePanel.superclass.initComponent.call(this);
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
	/**
	 * 弹出 当节点me不为空，表示是编辑节点 对应几种情况： 1. 新增 2. 编辑非根节点 3.
	 * 编辑根节点（由于根节点没有父亲值，在不与后台交互的情况下，特殊对待）
	 */
	edit : function(sameLevel, parentNode, me) {

		var isEdit = false, parentLevel = null;

		if (me)
			isEdit = true;
		if (!isEdit) {
			parentLevel = parentNode.attributes['data'].level;
			// 如果父亲的级别超过6了，则不能增加子节点
			if (Ext.num(parentLevel) >= 5) {
				return;
			}
			;
		}
		;

		var form = new Ext.form.FormPanel({
			frame : true,
			defaultType : 'textfield',
			items : this.formItems,
			buttons : [ {
				text : '保存',
				handler : function() {
					var formbean = form.getForm().getValues(false);
					this.saveFn(formbean, {
						callback : function(data) {
							Ext.Msg.alert('', '保存成功！');
							console.log(data);
							if (!isEdit) {
								var child = new Ext.tree.TreeNode({
									id : data.id,
									text : data.name,
									cls : 'folder',
									leaf : false
								});
								child.attributes['data'] = data;
								parentNode.appendChild(child);
								this.menu.getSelectionModel().select(child);
							} else {
								me.attributes['data'] = data;
								me.setText(data.name);
							}
							win.close();
						}.createDelegate(this),
						errorHandler : function(msg) {
							console.log(msg);
							Ext.Msg.alert('', '保存出错！');
						}
					});
				}.createDelegate(this)
			}, {
				text : '关闭',
				handler : function() {
					win.close();
				}
			} ]
		});

		var win = new Ext.Window({
			title : this.title,
			modal : true,
			width : 300,
			closeAction : 'close',
			items : [ form ]
		});

		win.show();

		var baseForm = form.getForm();
		if (isEdit) {
			baseForm.loadRecord(new Ext.data.Record(me.attributes['data']));
			baseForm.findField('id').el.dom.readOnly = true;
		} else {
			baseForm.findField('level').setValue(parentLevel + 1);
		}
		;

		var parentNameField = baseForm.findField('parentName');
		if (parentNameField && parentNode) {
			parentNameField.setValue(parentNode.text);
		}
		;

		if (isEdit && !parentNode) {
			form.remove(parentNameField);
		}
		;
	},

	buildAction : function() {
		this.addEqAction = new Ext.Action({
			text : '平级增加',
			iconCls : 'c_add',
			handler : function() {
				var node = this.getTreeSelNode();
				if (!node)
					return;
				if (node.isRoot)
					return;
				this.edit(true, node.parentNode);
			}.createDelegate(this)
		});
		this.addDownAction = new Ext.Action({
			text : '下级增加',
			iconCls : 'c_add',
			handler : function() {
				var node = this.getTreeSelNode();
				if (!node)
					return;
				this.edit(false, node);
			}.createDelegate(this)
		});
		this.editAction = new Ext.Action({
			text : '编辑',
			iconCls : 'c_edit',
			handler : function() {
				var node = this.getTreeSelNode();
				if (!node)
					return;
				if (node.isRoot) {
					this.edit(true, null, node);
				} else {
					this.edit(true, node.parentNode, node);
				}
			}.createDelegate(this)
		});
		this.delAction = new Ext.Action({
			text : '删除',
			iconCls : 'c_del',
			handler : function() {
				var node = this.getTreeSelNode();
				if (!node)
					return;
				if (node.isRoot)
					return;
				console.log(node.firstChild);
				if (node.firstChild) {
					Ext.Msg.alert('', '有子节点，不能删除！');
					return;
				}
				var del = function(e) {
					if (e == "yes") {
						this.deleteFn(node.id, {
							callback : function(data) {
								Ext.Msg.alert('', '删除成功！');
								if (node.nextSibling) {
									this.menu.getSelectionModel().select(
											node.nextSibling);
								} else {
									this.menu.getSelectionModel().select(
											node.parentNode);
								}
								node.remove();
							}.createDelegate(this),
							errorHandler : function(msg) {
								console.log(msg);
								Ext.Msg.alert('', '删除错误！');
							}
						});
					}
					;
				};

				Ext.MessageBox.confirm("提示", "确认要删除所选择的记录么？", del, this);

			}.createDelegate(this)
		});
	},

	buildTree : function() {
		this.menu = new Ext.tree.TreePanel({
			width : 552,
			height : 450,
			rootVisible : true,
			autoScroll : true,
			lines : false,
			animate : true,
			tbar : [ this.addEqAction, this.addDownAction, this.editAction,
					this.delAction ],
			loader : new Ext.ux.DWRTreeLoader({
				dwrCall : this.treeLoaderFn
			}),
			root : new Ext.tree.AsyncTreeNode({
				text : this.rootNodeData.name,
				hasChildren : true,
				id : this.rootNodeData.id
			})
		});
		var rootNode = this.menu.getRootNode();

		rootNode.attributes['data'] = this.rootNodeData;
		this.menu.on({
			click : {
				stopEvent : true,
				fn : function(n, e) {
					e.stopEvent();
					this.currentNode = n;
				}.createDelegate(this)
			}
		});

	},

	build : function() {
		this.items = [ this.menu ];
	}

});

function addTooltip(value, metadata, record, rowIndex, colIndex, store) {
	if (record.data.name == '') {
		return '<img src="../image/waitingPerfect.png" /><font color="#1900d8" size=2>待完善</font>';
	} else {
		return '<img src="../image/alreadyPerfect.png" /><font color="#000" size=2>已完善</font>';
	}
	return value;
}

function addTooltipImmnue(value, metadata, record, rowIndex, colIndex, store) {
	if (record.data.vaccineImmune == null) {
		return '<img src="../image/waitingPerfect.png" /><font color="#1900d8" size=2>未建卡</font>';
	} else {
		return '<img src="../image/alreadyPerfect.png" /><font color="#000" size=2>已建卡</font>';
	}
	return value;
}
