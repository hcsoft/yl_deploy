Ext.ns("Ext.tf");

Ext.tf.RepeatFiles = Ext.extend(Ext.Panel, {
	closable : true,
	layout : 'fit',
	leftQueryUrl : Ext.emptyFn,
	leftDeleteUrl : Ext.emptyFn,
	leftReaderConfig : [],
	leftGridCmConfig : [],
	updateGridCmConfig : [],
	centerQueryUrl : Ext.emptyFn,
	centerDeleteUrl : Ext.emptyFn,
	updateListExamUrl : Ext.emptyFn,
	delListExamUrl : Ext.emptyFn,
	readerConfig : [],
	gridCmConfig : [],
	winReaderConfig : [],
	winLeftGridCmConfig : [],
	winGightGridCmConfig : [],
	winQueryUrl : Ext.emptyFn,
	treeLoaderFn : Ext.emptyFn,
	pageSize : 10,
	currentNode : null,
	fileNos : '',
	tmpStoreFileNos : '',
	winInit : true,
	updateWinInit : true,
	initComponent : function() {
		this.build();
		Ext.tf.RepeatFiles.superclass.initComponent.call(this);
	},

	build : function() {
		this.items = [ this.createPanel() ];
	},
	getTreeSelNode : function() {
	    var selNode = this.currentNode;
	    if ( selNode ) {
	    	//...
	    } else {
	    	Ext.Msg.alert('', '请先选择一个节点！');
	    };
	    return selNode;
	},
	getParams : function() {
		var selNode = this.getTreeSelNode();
	    if ( selNode ) {
	    	var filterKey = this.combo.getValue();
			var filterValue = this.filterField.getValue();
	    	var cond = {
	    		district : selNode.id,
	    		filterKey : filterKey,
	    		filterValue : filterValue
	    	};
	    	return cond;
	    }
	    return null;
	},
	load_search : function(isReset){
		var selNode = this.getTreeSelNode();
	    if ( selNode ) {
	    	if ( isReset ) {
	    		this.pagingBar.changePage(1);
	    	}
	    	this.winLeftgrid.getStore().reload();
	    	this.doLayout(true);
	    }
	},
	fill_details : function(json,ids){
		var $tipHtml = '<table style="width:285px;" cellspacing="0" cellpadding="0" class="tipTableCls">' +
			'<tr><td>档案编号：</td><td>' + json.fileNo + '</td></tr>' +
			'<tr><td>姓名：</td><td>' + json.name + '</td></tr>' +
			'<tr><td>性别：</td><td>' + json.personalInfo.sex + '</td></tr>' +
			'<tr><td>出生日期：</td><td>' + calculateTimeObj.formatDate(json.personalInfo.birthday) + '</td></tr>' +
			'<tr><td>身份证号：</td><td>' + json.personalInfo.idnumber + '</td></tr>' +
			'<tr><td>乡镇：</td><td>' + json.township + '</td></tr>' +
			'<tr><td>村委会：</td><td>' + json.village + '</td></tr>' +
			'<tr><td>家庭地址：</td><td>' + json.address + '</td></tr>' +
		'</table>';
		$('#' + ids).html($tipHtml);
	},
	load_repeatFiles : function(selections){
		this.fileNos = '';
		this.tmpStoreFileNos = '';
		for(var i = 0; i < selections.length ; i++){
			var record = selections[i];
			this.fileNos += record.get('fileNo') + ',';
			this.leftGridPanel.getStore().add(record);
			if(i == 0){
				this.fill_details(record.json,'fileNoDetails');
			}
		}
		if(this.fileNos != '')
			this.fileNos = this.fileNos.substring(0,this.fileNos.length - 1);
		this.load_listExam(true);
		this.tmpStoreFileNos = this.fileNos;
	},
	load_listExam : function(isReset){
		if ( isReset ) {
    		this.centerpagingBar.changePage(1);
    	}
//		this.grid.getStore().reload();
//    	this.doLayout(true);
	},
	openWin : function(){
		var searchCondition =  [[ 'a.name', '姓名' ],[ 'a.inputDate', '录入日期' ], 
			    				[ 'b.birthday', '出生日期' ], [ 'a.fileNo', '档案编码' ],
			    				[ 'b.idnumber', '身份证号' ], [ 'b.linkman', '联系人' ],
			    				[ 'a.paperFileNo', '纸质档案号' ], [ 'b.workUnit', '工作单位' ] ];
		var searchStore = new Ext.data.SimpleStore({
			fields : [ 'type', 'display' ],
			data : searchCondition
		});
		this.combo = new Ext.form.ComboBox({
			store : searchStore,
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
						this.load_search(true);
					}
				}.createDelegate(this)
			}
		});
		this.leftMenu = new Ext.tree.TreePanel({
			layout : 'fit',
			collapsible : true,
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
				id : 'orgIgnoreDistrict'
			}),
			rootVisible : false
		});

		this.leftMenu.getRootNode().on({
			append : {
				stopEvent : true,
				fn : function(t, me, n, index) {
					// 自动展开根节点的第一个孩子
					if (index == 0) {
						if (!n.leaf)
							n.expand();
						// this.load();
						this.currentNode = n;
					}
				}.createDelegate(this)
			}
		});

		this.leftMenu.on({
			click : {
				stopEvent : true,
				fn : function(n, e) {
					e.stopEvent();
					this.winLeftgrid.setTitle(n.text);
//					this.load();
					this.currentNode = n;
				}.createDelegate(this)
			}
		});
		
		var winLeftreader = new Ext.data.JsonReader({
			totalProperty : "totalSize",
			root : "data",
			id : "fileNo"
		}, Ext.data.Record.create(this.winReaderConfig));

		var winLeftstore = new Ext.data.Store({
			proxy : new Ext.ux.data.DWRProxy({
				dwrFunction : this.winQueryUrl,
				listeners : {
					'beforeload' : function(dataProxy, params) {
						var o = this.getParams();
						if (!params.limit)
							params.limit = this.pageSize;
						params[dataProxy.loadArgsKey] = [ o, params ];
					}.createDelegate(this)
				}
			}),
			reader : winLeftreader
		});

		this.pagingBar = new App.PagingToolbar({
			pageSize : this.pageSize,
			store : winLeftstore,
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
		var onRenderGrid = function() {
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
							if(dataItems[row] != null){
								var json = dataItems[row].json;
								var $tipHtml = '<table cellspacing="0" cellpadding="0" class="tipTableCls">' +
										'<tr><td>档案编号：</td><td>' + json.fileNo + '</td></tr>' +
										'<tr><td>姓名：</td><td>' + json.name + '</td></tr>' +
										'<tr><td>性别：</td><td>' + json.personalInfo.sex + '</td></tr>' +
										'<tr><td>出生日期：</td><td>' + calculateTimeObj.formatDate(json.personalInfo.birthday) + '</td></tr>' +
										'<tr><td>身份证号：</td><td>' + json.personalInfo.idnumber + '</td></tr>' +
										'<tr><td>乡镇：</td><td>' + json.township + '</td></tr>' +
										'<tr><td>村委会：</td><td>' + json.village + '</td></tr>' +
										'<tr><td>家庭地址：</td><td>' + json.address + '</td></tr>' +
									'</table>';
								qt.body.dom.innerHTML = $tipHtml;		
							}
							
							
					},
					scope : this
				}
			});
		}
		var winLeftsm = new Ext.grid.CheckboxSelectionModel();
		if(this.winInit)
			this.winLeftGridCmConfig.unshift(winLeftsm);
		this.winLeftgrid = new Ext.grid.GridPanel({
			title : '请选择一个行政区划',
			bbar : this.pagingBar,
			layout : 'fit',
			store : winLeftstore,
			cm : new Ext.grid.ColumnModel(this.winLeftGridCmConfig),
			sm : winLeftsm,
			height : 440,
			autoScroll : true,
			stripeRows: true,
			onRender : onRenderGrid
		});

		this.winLeftgrid.on('rowdblclick', function(grid, rowIndex, e){
			var record = grid.getStore().getAt(rowIndex);
			this.winGightgrid.getStore().add(record);
			grid.getStore().remove(record);
		}, this);
		var winCenterreader = new Ext.data.JsonReader({
			totalProperty : "totalSize",
			root : "data",
			id : "fileNo"
		}, Ext.data.Record.create(this.winReaderConfig));
	
		var winGightstore = new Ext.data.Store({
			reader : winCenterreader
		});
		var winrightsm = new Ext.grid.CheckboxSelectionModel();
		if(this.winInit)
			this.winGightGridCmConfig.unshift(winrightsm);
		this.winGightgrid = new Ext.grid.GridPanel({
			layout : 'fit',
			store : winGightstore,
			cm : new Ext.grid.ColumnModel(this.winGightGridCmConfig),
			sm : winrightsm,
			height : 440,
			autoScroll : true,
			stripeRows: true,
			onRender : onRenderGrid
		});
	
		this.winGightgrid.on('rowdblclick', function(grid, rowIndex, e){
			var record = grid.getStore().getAt(rowIndex);
			this.winLeftgrid.getStore().add(record);
			grid.getStore().remove(record);
		}, this);
		var win = new Ext.Window({
			title : '档案选择',
			modal : true,
			border : false,
			layout : 'fit',
			width : 1000,
			height : 500,
			resizable : false,
			items : [{
				layout : 'border',
				region : 'center',
				tbar : [{
					text : '确定',
					iconCls : 'c_add',
					handler : function(){
						var selections = this.winGightgrid.getStore().data.items;
						this.load_repeatFiles(selections);
						win.close();
					}.createDelegate(this)
				},{
					text : '关闭',
					iconCls : 'c_del',
					handler : function(){
						win.close();
					}.createDelegate(this)
				},'-',this.combo,this.filterField,new Ext.Action({
					text : '查询',
					iconCls : 'c_query',
					handler : function() {
						this.load_search(true);
					}.createDelegate(this)
				})],
				items : [{
					region : 'west',
					width : 200,
					title : '行政区划',
					collapsible : true,
					autoScroll : true,
					items : [this.leftMenu]
				},{
					region : 'center',
					layout : 'border',
					items : [{
						region : 'west',
						width : 350,
//						title : '请选择行政区划',
						items : [this.winLeftgrid]
					},{
						region : 'center',
						layout : 'border',
						items : [{
							region : 'west',
							width : 55,
							frame : true,
							align : 'center',
							defaultType : 'button',
							items : [{
								text : '> ',
								minWidth : 42,
								tooltip : '添加选择的第一个档案',
								handler : function(){
									var selections = this.winLeftgrid.getSelections();
									if(selections.length > 0){
										var record = selections[0];
										this.winGightgrid.getStore().add(record);
										this.winLeftgrid.getStore().remove(record);
									}
								}.createDelegate(this)
							},{
								text : '>>',
								minWidth : 42,
								tooltip : '添加所有选择的档案',
								handler : function(){
									var selections = this.winLeftgrid.getSelections();
									for(var i = 0; i < selections.length ; i++){
										var record = selections[i];
										this.winGightgrid.getStore().add(record);
										this.winLeftgrid.getStore().remove(record);
									}
								}.createDelegate(this)
							},{
								text : '< ',
								minWidth : 42,
								tooltip : '移除选择的第一个档案',
								handler : function(){
									var selections = this.winGightgrid.getSelections();
									if(selections.length > 0){
										var record = selections[0];
										this.winLeftgrid.getStore().add(record);
										this.winGightgrid.getStore().remove(record);
									}
								}.createDelegate(this)
							},{
								text : '<<',
								minWidth : 42,
								tooltip : '移除所有选择的档案',
								handler : function(){
									var selections = this.winGightgrid.getSelections();
									for(var i = 0; i < selections.length ; i++){
										var record = selections[i];
										this.winLeftgrid.getStore().add(record);
										this.winGightgrid.getStore().remove(record);
									}
								}.createDelegate(this)
							}]
						},{
							region : 'center',
							title : '已选择档案',
							items : [this.winGightgrid]
						}]
					}]
				}]
				
			}]
		});
		win.show();
//		win.maximize();
		win.doLayout(true);
		this.winInit = false;
	},
	
	updateListExam : function(ss){
		var updateListReader = new Ext.data.JsonReader({
			totalProperty : "totalSize",
			root : "data",
			id : "fileNo"
		}, Ext.data.Record.create(this.leftReaderConfig));

		var updateStore = new Ext.data.Store({
			reader : updateListReader
		});
		var updatesm = new Ext.grid.CheckboxSelectionModel({ singleSelect : true });
		if(this.updateWinInit){
			this.updateGridCmConfig.unshift(updatesm);
			this.updateWinInit = false;
		}
		this.updateGridPanel = new Ext.grid.GridPanel({
			title : '档案信息',
			layout : 'fit',
			store : updateStore,
			cm : new Ext.grid.ColumnModel(this.updateGridCmConfig),
			sm : updatesm
		});
		
		var win = new Ext.Window({
			width : 615,
			height : 310,
			title : '更新档案选择',
			layout : 'border',
			modal : true,
			items : [{
				region : 'west',
//				title : '档案',
				layout : 'fit',
				width : 300,
				items : [this.updateGridPanel]
			},{
				region : 'center',
				title : '详细信息',
				layout : 'fit',
				frame : true,
				html : '<div id="updateFileNoDetails"></div>'
			}],
			tbar : [{
				text : '确定',
				iconCls : 'c_add',
				handler : function(){
					var update = function(e) {
						var updatess = this.updateGridPanel.getSelections();
						if(updatess.length > 0){
							var array = [];
							var updateFileNo = updatess[0].get('fileNo');
							Ext.each(ss, function(v) {
								array.push({ id : v.get('id'),fileNo : updateFileNo,flag : v.get('flag')});
							});
							if (e == "yes") {
								this.updateListExamUrl(array, {
									callback : function(data) {
										showInfoObj.Infor('更新成功！');
										this.load_listExam(true);
									}.createDelegate(this),
									errorHandler : function(msg) {
										showInfoObj.Infor('更新出错！');
									}
								});
							}
						}
						win.close();
					};
					Ext.MessageBox.confirm("提示", "确认要更新所选择的体检记录么？", update,
							this);
				}.createDelegate(this)
			},{
				text : '关闭',
				iconCls : 'c_del',
				handler : function(){
					win.close();
				}.createDelegate(this)
			}]
		});		
		win.show();
		win.doLayout(true);
		var selections = this.leftGridPanel.getStore().data.items;
		for(var i = 0; i < selections.length ; i++){
			var record = selections[i];
			this.updateGridPanel.getStore().add(record);
			if(i == 0){
				this.fill_details(record.json,'updateFileNoDetails');
			}
		}
		this.updateGridPanel.on('rowclick', function(grid, rowIndex, e){
			var record = grid.getStore().getAt(rowIndex);
			this.fill_details(record.json,'updateFileNoDetails');
		}, this);
	},
	
	createPanel : function() {
		var leftreader = new Ext.data.JsonReader({
			totalProperty : "totalSize",
			root : "data",
			id : "fileNo"
		}, Ext.data.Record.create(this.leftReaderConfig));

		var leftstore = new Ext.data.Store({
			reader : leftreader
		});
		var leftsm = new Ext.grid.CheckboxSelectionModel();
		this.leftGridCmConfig.unshift(leftsm);
		this.leftGridPanel = new Ext.grid.GridPanel({
			title : '档案信息',
			layout : 'fit',
			store : leftstore,
			cm : new Ext.grid.ColumnModel(this.leftGridCmConfig),
			sm : leftsm,
			bbar : [{
				text : '全部',
				iconCls : 'c_edit',
				handler : function(){
					if(this.tmpStoreFileNos != '')
						this.fileNos = this.tmpStoreFileNos;
					this.load_listExam(true);
				}.createDelegate(this)
			 }],
		});
		this.leftGridPanel.on('rowclick', function(grid, rowIndex, e){
			var record = grid.getStore().getAt(rowIndex);
			this.fill_details(record.json,'fileNoDetails');
//			this.tmpStoreFileNos = this.fileNos;
//			this.fileNos = record.get('fileNo');
//			this.load_listExam(true);
		}, this);
		
		var reader = new Ext.data.JsonReader({
			totalProperty : 'totalSize',
			root : 'data',
			id : "id"
		},Ext.data.Record.create(this.readerConfig));
		
		var store = new Ext.data.Store({
			proxy : new Ext.ux.data.DWRProxy({
				dwrFunction : this.centerQueryUrl,
				listeners : {
					'beforeload' : function(dataProxy, params){
						var o = {
							fileNo : this.fileNos
						};
						if(!params.limit)
							params.limit = this.pageSize;
						params[dataProxy.loadArgsKey] = [o,params];
					}.createDelegate(this)
				}
			}),
			reader : reader
		});
		
		this.centerpagingBar = new Ext.PagingToolbar({
			pageSize : this.pageSize,
			displayMsg : '{0}-{1} of {2}',
			displayInfo : true,
			emptyMsg : '没有记录',
			store : store
		});
		var centersm = new Ext.grid.CheckboxSelectionModel();
		this.gridCmConfig.unshift(centersm);
		this.grid = new Ext.grid.GridPanel({
//			id : 'mygrid',
			layout : 'fit',
			region : 'center',
//			bbar : this.centerpagingBar,
			autoScroll : true,
			store: store,
			cm : new Ext.grid.ColumnModel(this.gridCmConfig),
			loadMask : true,
			sm : centersm,
		});
		
		var panel = new Ext.Panel({
			layout : 'border',
			tbar : [ {
				text : '选择档案',
				iconCls : 'c_add',
				handler : function() {
					this.leftGridPanel.getStore().removeAll(); 
					this.grid.getStore().removeAll(); 
					$('#fileNoDetails').html('');
					this.openWin();
				}.createDelegate(this)
			}, {
				text : '删除档案',
				iconCls : 'c_del',
				handler : function() {
					var selections = this.leftGridPanel.getSelections();
					var array = [];
					for(var i = 0;i < selections.length; i++){
						var record = selections[i];
						var ss = this.grid.getStore().data.items;
						var flag = false;
						for(var j = 0;j < ss.length; j++){
							var r = ss[j];
							console.log(r.get('fileNo') + '--------' + record.get('fileNo'));
							if(r.get('fileNo') == record.get('fileNo')){
								showInfoObj.Error('删除的档案还存在体检记录，请先处理体检记录！');
								flag = true;
								break;
							}
						}
						if(flag){
							break;
						}
						array.push(record.get('fileNo'));
					}
					if(array.length > 0){
						var del = function(e) {
							if (e == "yes") {
								this.centerDeleteUrl(array, {
									callback : function(data) {
										showInfoObj.Infor('删除成功！');
										for(var i = 0;i < selections.length; i++){
											var record = selections[i];
											this.leftGridPanel.getStore().remove(record);											
										}
										var ss = this.leftGridPanel.getStore().data.items;
										if(ss.length > 0){
											this.fill_details(ss[0].json,'fileNoDetails');
										}
//										this.load();
									}.createDelegate(this),
									errorHandler : function(msg) {
										console.log(msg);
										showInfoObj.Infor('删除出错！');
									}
								});
							}
						};
						Ext.MessageBox.confirm("提示", "确认要删除所选择的档案么？", del,
								this);
					}
//					
				}.createDelegate(this)
			}, new Ext.Button({
				text : '体检记录',
				iconCls : 'addBusinessData',
				menu : new Ext.menu.Menu({
					items : [ new Ext.Action({
						text : '删除体检记录',
						iconCls : 'c_del',
						handler : function() {
							var selections = this.grid.getSelections();
							var array = [];
							Ext.each(selections, function(v) {
								array.push({ id : v.get('id'),flag : v.get('flag')});
							});
							var del = function(e) {
								if (e == "yes") {
									this.delListExamUrl(array, {
										callback : function(data) {
											showInfoObj.Infor('删除成功！');
											this.load_listExam(true);
										}.createDelegate(this),
										errorHandler : function(msg) {
											console.log(msg);
											showInfoObj.Infor('删除出错！');
										}
									});
								}
							};
							Ext.MessageBox.confirm("提示", "确认要删除所选择的档案么？", del,
									this);
						}.createDelegate(this)
					}), new Ext.Action({
						text : '更改体检记录',
						iconCls : 'c_edit',
						handler : function() {
							var selections = this.grid.getSelections();
							if(selections.length > 0){
								this.updateListExam(selections);
							}else{
								showInfoObj.Infor('请选择要更新的体检记录！');
							}
						}.createDelegate(this)
					}) ]
				})
			}) ],
		 items : [{
			 region : 'west',
			 width : 300,
			 layout : 'border',
			 collapsible : true,
			 border : false,
			 items : [{
				 region : 'north',
				 height : 300,
				 autoScroll : true,
				 layout : 'fit',
				 items : [this.leftGridPanel]
			 },{
				 region : 'center',
				 title : '详细信息',
				 frame : true,
				 html : '<div id="fileNoDetails"></div>'
			 }]
		 },this.grid]
		});
		return panel;
	}
});