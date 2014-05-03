Ext.ns("Ext.hc");
window.score_refresh = function(personid,rowindex){
	var eventObj = event.srcElement;
	eventObj.disabled = true;
	var combobox = Ext.getCmp("score.query.groupcombo");
	var value = combobox.getValue();
	var record = combobox
		.findRecord(combobox.valueField
				|| combobox.displayField, value);
	var index = combobox.store.indexOf(record);
	if (index == -1) {
		Ext.Msg.alert('错误', "请选择培训期数!", function() {
			Ext.getCmp("score.query.groupcombo")
					.focus(true, 10);
		});
		return;
	}
	if (Ext.getCmp("score.query.datefield").value == null) {
		Ext.Msg.alert('错误', "请选择考试时间!", function() {
			Ext.getCmp("score.query.datefield")
					.focus(true, 10);
		});
		return;
	}
	var examdate = Ext.getCmp(
		"score.query.datefield").getValue()
		.format("Y-m-d");
	var param = {
		group : value,
		examdate : examdate,
		personid : personid
	}
	ScoreService.getPersonScore(param, function(data) {
//		alert(rowindex);
		Ext.getCmp("score.grid").getStore().getAt(rowindex).set("allcount", parseFloat(data.allcount));
		Ext.getCmp("score.grid").getStore().getAt(rowindex).set("scorestr",data.scorestr);
		eventObj.disabled = false;
	})
	
}
Ext.hc.printScorePanel = new Ext.Panel(
		{
			layout : 'fit',
			items : [ {
				layout : 'fit',
				xtype : 'grid',
				id : 'score.grid',
				title : '考试打分系统',
				autoWidth : true,
				//height : 700,
				tbar : [
						{
							// text : '--请选择期数--',
							iconCls : 'c_query',
							xtype : 'combo',
							id : 'score.query.groupcombo',
							valueField : 'code',
							displayField : 'name',
							blankText : "请选择期数..",
							fieldLabel : 'name',
							triggerAction : 'all',
							mode : 'local',
							listeners : {
								select : function(combo, newValue, oldValue) {
									Ext.getCmp("score.query.datefield")
											.setValue(
													newValue.data['scoredate']);
								}
							},
							store : new Ext.data.Store({
								fields : [ 'code', 'name', 'scoredate' ],
								autoLoad : true,
								proxy : new Ext.ux.data.DWRProxy({
									dwrFunction : ScoreService.queryGroup,
									listeners : {
										load : function(obj, data, arg) {
											console.log(data);
										}
									}
								}),
								reader : new Ext.data.ArrayReader({
									id : 0
								}, Ext.data.Record.create([ {
									name : 'code',
									mapping : 0
								}, {
									name : 'name',
									mapping : 1
								}, {
									name : 'scoredate',
									mapping : 2
								} ]))
							})
						},
						{
							xtype : 'datefield',
							id : 'score.query.datefield',
							handler : function() {
								console
										.log(Ext
												.getCmp("score.query.groupcombo").store)
							}.createDelegate(this)
						},
						" ",
						{
							iconCls : 'c_query',
							xtype : 'checkbox',
							boxLabel : "考试日期",
							id : 'score.query.datecheckbox',
							handler : function() {
								if (this.checked) {
									Ext.getCmp("score.query.datefield")
											.disable();
									var combobox = Ext
											.getCmp("score.query.groupcombo");
									var value = combobox.getValue();
									var record = combobox.findRecord(
											combobox.valueField
													|| combobox.displayField,
											value);
									var index = combobox.store.indexOf(record);
									if (index >= 0) {
										Ext
												.getCmp("score.query.datefield")
												.setValue(
														record.data['scoredate']);
									}
								} else {
									Ext.getCmp("score.query.datefield")
											.enable();
								}
							}
						},
						/*
						"-",
						{
							text : '查询',
							iconCls : 'c_query',
							handler : function() {
								var combobox = Ext
										.getCmp("score.query.groupcombo");
								var value = combobox.getValue();
								var record = combobox
										.findRecord(combobox.valueField
												|| combobox.displayField, value);
								var index = combobox.store.indexOf(record);
								if (index == -1) {
									Ext.Msg.alert('错误', "请选择培训期数!", function() {
										Ext.getCmp("score.query.groupcombo")
												.focus(true, 10);
									});
									return;
								}
								if (Ext.getCmp("score.query.datefield").value == null) {
									Ext.Msg.alert('错误', "请选择考试时间!", function() {
										Ext.getCmp("score.query.datefield")
												.focus(true, 10);
									});
									return;
								}
								var examdate = Ext.getCmp(
										"score.query.datefield").getValue()
										.format("Y-m-d");
								var param = {
									group : value,
									examdate : examdate
								}
								ScoreService.queryScore(param, function(data) {
									Ext.getCmp("score.grid").getStore()
											.loadData(data);
								})
							}.createDelegate(this)
						},
						*/
						"-",
						{
							text : '打分',
							iconCls : 'c_query',
							id : 'score.query.buttons.makescore',
							handler : function(obj) {
								var combobox = Ext
										.getCmp("score.query.groupcombo");
								var value = combobox.getValue();
								var record = combobox
										.findRecord(combobox.valueField
												|| combobox.displayField, value);
								var index = combobox.store.indexOf(record);
								if (index == -1) {
									Ext.Msg.alert('错误', "请选择培训期数!", function() {
										Ext.getCmp("score.query.groupcombo")
												.focus(true, 10);
									});
									return;
								}
								if (Ext.getCmp("score.query.datefield").value == null) {
									Ext.Msg.alert('错误', "请选择考试时间!", function() {
										Ext.getCmp("score.query.datefield")
												.focus(true, 10);
									});
									return;
								}
								var examdate = Ext.getCmp(
										"score.query.datefield").getValue()
										.format("Y-m-d");
								var param = {
									group : value,
									examdate : examdate
								}
								obj.disable();
								Ext.getCmp("score.grid").getStore().removeAll();
								ScoreService.getScore(param, function(data) {
									Ext.getCmp("score.grid").getStore()
											.loadData(data);
									obj.enable();
								})
								// Ext.getCmp("score.grid").getStore().reload();
							}.createDelegate(this)
						} ],

				store : new Ext.data.Store({
					// autoLoad : true,
					id : 'score.grid.store',
					proxy : new Ext.ux.data.DWRProxy({
						dwrFunction : ScoreService.getScore,
						listeners : {
							'beforeload' : function(dataProxy, params) {

								// var o =
								// this.queryForm.getForm().getValues(false);
								// console.log(o);
								// if (!params.limit)
								// params.limit = this.pageSize;

								// params.limit = 10;
								// params[dataProxy.loadArgsKey] = [{}, params];
								// console.log(params);

							}.createDelegate(this),
							'load' : function(obj, records, options) {
								obj.disable();
							}
						/*
						 * , 'loadexception' : function(obj, options, response,
						 * error) { if (error) { msg =
						 * error.javaClassName+":"+error.message;
						 * if(error.stackTrace!=null){ for(var i = 0 ; i
						 * <error.stackTrace.length ; i++) msg= msg+"\n\tat "+
						 * error.stackTrace[i].className+"."+error.stackTrace[i].methodName+"("+error.stackTrace[i].fileName+":"+error.stackTrace[i].lineNumber+")"; }
						 * console.log(msg) top.Ext.Msg.alert("错误",
						 * "解析数据时发生错误:请查看浏览器log."); return; } }
						 */
						}

					}),
					reader : new Ext.data.JsonReader({
						totalProperty : "totalSize", // 总记录数
						root : "data", // 分页对象中的数据集
						id : "personid" //
					}, Ext.data.Record.create([ {
						name : 'empname',
						mapping : 'empname'
					}, {
						name : 'personid',
						mapping : 'personid'
					}, {
						name : 'name',
						mapping : 'scorename'
					}, {
						name : 'examgroup',
						mapping : 'examgroup'
					}, {
						name : 'allcount',
						mapping : 'allcount',
						type : 'float'
					}, {
						name : 'examdate',
						mapping : 'examdate'
					}, {
						name : 'scorestr',
						mapping : 'scorestr'
					}  ]))
				}),
				cm : new Ext.grid.ColumnModel([ {
					"header" : "姓名",
					"sortable" : true,
					"dataIndex" : "empname",
					width : 80
				}, {
					"header" : "登录名",
					"sortable" : true,
					"dataIndex" : "personid",
					width : 80
				}, {
					"header" : "考试名称",
					"dataIndex" : "name",
					width : 100
				}, {
					"header" : "考试分组",
					"dataIndex" : "examgroup",
					width : 70
				}, {
					"sortable" : true,
					"header" : "总分",
					"dataIndex" : "allcount",
					width : 50
				}, {
					"header" : "考试时间",
					"dataIndex" : "examdate",
					"renderer" : Ext.util.Format.dateRenderer('Y-m-d'),
					width : 80
				}, {
					header : "操作",
					dataIndex : "personid",
					width : 50,
					renderer : function showbutton(value,cellmeta,record,rowIndex,colIndex,store){
						var returnStr = "<INPUT type='button' value='刷新' onclick='score_refresh(\""+value+"\","+rowIndex+")'>";
						return returnStr;
					}
				}, {
					"header" : "以下科目为0分",
					"dataIndex" : "scorestr",
					width : 700
				} ]),
				// viewConfig : {},
				sm : new Ext.grid.CheckboxSelectionModel()

			} ]
		});
ModuleMgr.register(Ext.hc.printScorePanel);
