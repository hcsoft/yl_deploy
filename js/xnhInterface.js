Ext.ns("app");
Ext.MessageBox.minWidth = 200;
function medialOption() {
	return [{
				id : 11,
				name : "11--普通门诊"
			}, {
				id : 13,
				name : "13--门诊慢性病"
			}, {
				id : 14,
				name : "14--门诊特殊病"
			}, {
				id : 16,
				name : "16--急诊抢救"
			}];
}

function departOption() {
	return [{
				id : 01,
				name : "01--外科"
			}, {
				id : 02,
				name : "02--内科"
			}, {
				id : 02,
				name : "03--耳鼻喉科"
			}, {
				id : 03,
				name : "04--骨伤科"
			}];
}

function docOption() {
	return [{
				id : 01,
				name : "01--张国庆"
			}, {
				id : 02,
				name : "02--李梅"
			}, {
				id : 03,
				name : "03--王光康"
			}, {
				id : 04,
				name : "04--赵承龙"
			}];
}
function drugTypeOption() {
	return [{
				id : 0,
				name : "药品"
			}, {
				id : 2,
				name : "手术"
			}];
}

function diseaseOption() {
	return [{
				id : 11,
				name : "99--门诊常见疾病"
			}];
}

function inputcodeOption() {
	return [{
				id : "5309221012110051705",
				name : "5309221012110051705"
			},
			{
				id : "5309221012130052707",
				name : "5309221012130052707"
			},
			{
				id : "5309221012150052709",
				name : "5309221012150052709"
			}];
}

// 保存数据
function cf_savedate(ref, index, value) {
	var ttt = ref.getComponent(0).getComponent(index).getComponent(0);
	ref.getComponent(0).getComponent(index).getComponent(0).setValue(value);
}

function createDWRCombo(x, y, labelWidth, fieldLabel, xtype, width, data,
		hiddenName, minListWidth, disabled) {
	return {
		xtype : "panel",
		layout : "form",
		// anchor : "30% 30%",
		x : x,
		y : y,
		bodyStyle : 'padding:5px',
		labelWidth : labelWidth,
		border : true,
		items : [{
					fieldLabel : fieldLabel,
					xtype : xtype,
					mode : 'local',
					minChars : 1,
					selectOnFocus : false,
					typeAhead : true,
					optionName : data,
					hiddenName : hiddenName,
					id : hiddenName + "_id",
					hasEmptyHeader : true,
					minListWidth : minListWidth,
					width : width,
					disabled : disabled,
					editable : true
		}]
	};
}
function createTextfield(x, y, labelWidth, fieldLabel, xtype, width, id,
		disabled, labelSeparator) {
	return {
		xtype : "panel",
		layout : "form",
		// anchor : "30% 30%",
		width : 700,
		x : x,
		y : y,
		bodyStyle : 'padding:5px',
		labelWidth : labelWidth,
		border : true,
		items : [{
					fieldLabel : fieldLabel,
					xtype : xtype,
					width : width,
					disabled : disabled,
					labelSeparator : labelSeparator,
					name : id,
					id : id
				}]
	};
}
function createDatefield(x, y, labelWidth, fieldLabel, xtype, width, id,
		disabled) {
	return {
		xtype : "panel",
		layout : "form",
		// anchor : "30% 30%",
		x : x,
		y : y,
		bodyStyle : 'padding:5px',
		labelWidth : labelWidth,
		border : true,
		items : [{
					fieldLabel : fieldLabel,
					xtype : 'datefield',
					format : 'Y-m-d',
					width : width,
					disabled : disabled,
					name : id,
					id : id
				}]
	};
}
function createPanel(x, y, title, xtype, height) {
	return {
		xtype : xtype,
		title : title,
		// anchor : "45% 65%",
		x : x,
		y : y,
		height : height
	};
}
function createButton(x, y, minWidth, text, xtype, handler, iconCls, icon) {
	return {
		xtype : "panel",
		layout : "form",
		// anchor : "30% 30%",
		x : x,
		y : y,
		bodyStyle : 'padding:5px',
		border : true,
		items : [{
					text : text,
					minWidth : minWidth,
					xtype : xtype,
					handler : handler,
					iconCls : iconCls,
					icon : icon
				}]
	};
}

function createReaderConfig(name, mapping) {
	return {
		name : name,
		mapping : mapping
	}
}

function createGridCm(header, dataIndex, sortable, hidden) {
	return {
		"header" : header,
		"sortable" : sortable,
		"dataIndex" : dataIndex,
		"hidden" : hidden
	};
}

app.xnhinterfacePanel = new Ext.tf.XnhInterfacePanel({
	title : '门诊收费',
	pageSize : 10,
	width : 700,
	gridfirst : false,
	queryUrl : ModuleService.findModules.createDelegate(this),
	editUrl : ModuleService.editModule.createDelegate(this),
	deleteUrl : ModuleService.removeModules.createDelegate(this),
	confirmUrl : XnhInterfaceService.findSick.createDelegate(this),
	// private
	// 查询条件Form
	queryConfig : [{
		layout : "absolute",
		title : "信息",
		xtype : "panel",
		height : 232,
		items : [
				createDWRCombo("0", "-4", 60, "医疗类别", "DWROptionCombo", 90,
						medialOption(), 'mdtype_query', "120"),
				createDWRCombo("180", "-4", 80, "医疗待遇类别", "DWRInitcodeCombo",
						180, 'BKC021', 'mdlevel', "200"),
				createDatefield("470", "-4", 90, "结算(审核)日期", "datefield", 90,"paydate",false),
				createDWRCombo("0", "18", 60, "诊断疾病", "DWROptionCombo", 380,
						diseaseOption(), 'disease', "200"),
				createDWRCombo("480", "18", 80, "中药处方类型", "DWRInitcodeCombo",
						90, 'BKC127', 'cmedicine', "100"),
				createPanel("0", "45", "个人信息", "panel", 100),
				createTextfield("0", "66", 32, "姓名", "textfield", 80, "name",
						true),
				createDWRCombo("130", "66", 32, "性别", "DWRInitcodeCombo", 40,
						"AAC004", 'sex', "30", true),
				createDatefield("220", "66", 60, "出生日期", "datefield", 85,
						"birthday", true),
				createTextfield("400", "66", 60, "个人编号", "textfield", 90,
						"personno", true),
				createButton("560", "66", 110, "账户信息", "button", function() {
							app.xnhinterfacePanel.accountInfoWin.show();
						}.createDelegate(this)),
				createTextfield("20", "88", 80, "家庭账户余额", "textfield", 60,
						"money1", true),
				createTextfield("168", "88", 80, "本年住院次数", "textfield", 60,
						"count", true),
				createTextfield("320", "88", 80, "门诊统筹费用", "textfield", 60,
						"money2", true),
				createTextfield("470", "88", 103, "门诊统筹支付累计", "textfield", 60,
						"money3", true),
				createTextfield("20", "110", 80, "进入统筹累计", "textfield", 60,
						"money4", true),
				createTextfield("168", "110", 80, "统筹支付累计", "textfield", 60,
						"money5", true),
				createTextfield("320", "110", 80, "进入大额累计", "textfield", 60,
						"money6", true),
				createTextfield("470", "110", 103, "本年大额支付累计", "textfield", 60,
						"money7", true),
				createTextfield("20", "132", 80, "账户支付累计", "textfield", 60,
						"money8", true),
				createTextfield("168", "132", 80, "&nbsp;&nbsp;&nbsp;医疗费累计",
						"textfield", 60, "money9", true),
				createPanel("0", "160", "本次就诊信息", "panel", 100),
				createTextfield("0", "182", 60, "处 方 号", "textfield", 80,
						"prescno"),
				createDWRCombo("160", "182", 60,
						"医&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;生",
						"DWROptionCombo", 63, docOption(), 'doc', "120"),
				createDWRCombo("320", "182", 60, "就诊科室", "DWROptionCombo", 85,
						departOption(), 'depart', "120"),
				// createTextfield("320", "182", 60, "就诊科室", "textfield", 85),
				createTextfield("490", "182", 45, "登记号", "textfield", 128,
						"regno"),
				createTextfield("0", "204", 60, "经 办 人", "textfield", 80,
						"query_empcode"),
				createTextfield("160", "204", 60, "处方金额", "textfield", 80,
						"prescAmount"),
				createDatefield("320", "204", 60, "就诊时间", "datefield", 85,
						"treatdate_query", false),
				createButton("500", "132", 80, "结算", "button", function() {
					// 检查是否选择了人员
					var queryform = app.xnhinterfacePanel.queryForm;
					var sickname = queryform.findById("name").getValue();
					if (sickname == null || sickname == "") {
						Ext.MessageBox.alert("提示", "请选择账户信息！");
						return;
					}
					var count = app.xnhinterfacePanel.grid.store.getCount();
					if (count <= 0) {
						Ext.MessageBox.alert("提示", "请录入处方信息！");
						return;
					}

					var allmoney = 0;
					for (var index = 0; index < count; index++) {
						var row = app.xnhinterfacePanel.grid.store.getAt(index);
						// alert("price"+row.data.price + ",,,num=="
						// +row.data.num)
						allmoney = allmoney + row.data.price * row.data.num;
					}
					// 获得人员编码
					// ------登记接口------
					// 个人编号
					var sickcode = queryform.findById("personno").getValue();
					// 医疗类别
					var mdtype_query = queryform.findById("mdtype_query_id").getValue();
					// 入院日期
					var treatdate = queryform.findById("treatdate_query").getValue().format("YmdHis");
					// 入院诊断疾病编码
					var diseasecode = queryform.findById("disease_id").getValue();
					// 入院诊断疾病名称
					var diseasename = queryform.findById("disease_id").getValue();
					// 出院日期 treatdate
					// 出院原因 9
					// 出院诊断疾病编号 diseasecode
					// 出院诊断疾病名称 diseasename
					// 医疗待遇类别 mdlevel_id
					var mdlevel = queryform.findById("mdlevel_id").getValue();
					// 审批编号 null
					// 科室名称
					var departcode = queryform.findById("depart_id").getValue();
					// 床位号 null
					// 医生编号
					var doc = queryform.findById("doc_id").getValue();
					// 医生姓名
					var docname = queryform.findById("doc_id").getValue();
					// 住院门诊号(医院) null

					// 备注，可以记录病历信息 null
					// 经办人
					var empcode = queryform.findById("query_empcode").getValue();
					// 发票号 null
					var inputparam = sickcode + "|" + mdtype_query + "|" + treatdate + "|"
							+ diseasecode + "|" + diseasename + "|" + treatdate
							+ "|" + "9" + "|" + diseasecode + "|" + diseasename
							+ "|" + mdlevel + "||" + departcode + "||" + doc
							+ "|" + doc + "|111||" + empcode + "||";
					var regbill = XnhInterfaceService.comBussines(inputparam,"2210", function(data) {
								if(data.returncode =="0"){
									var store = app.xnhinterfacePanel.grid.store;
									var count = store.getCount();
									var form = app.xnhinterfacePanel.queryForm;
									// 科室名称
									var departcode = form.findById("depart_id").getValue();
									// 经办人
									var empcode = form.findById("query_empcode").getValue();
									//处方号
									var billno = form.findById("prescno").getValue();
									//单复方
									var billno =  form.findById("prescno").getValue();
									var detail="";
									for(var i = 0; i<count ; i++){
										var record = store.getAt(i).data;
										//====费用明细上报==
										//2310
										//个人编号sickcode
										var sickcode = form.findById("personno").getValue();
										//报审单号
										var checkno = data.returnParamMap.value_0;
										//药品编码  record.drugcode
										//药品名称  record.drugname
										//医院收费项目内码 record.drugcode
										//医院收费项目名称 record.drugname
										//处方日期 
										var treatdate = form.findById("treatdate_query").getValue().format("YmdHis");
										//收费项目种类 1 药品 2 诊疗项目 3 服务设施 4 费用大项
										//收费类别  11 西药 12 中成药 13 草药 21 检查费 22 特殊检查费 23 输氧费 24 手术费 25 化验费 26 输血费 27 诊察费 28 处置费
										//单价 record.price
										//数量 record.num
										//金额 record.price * record.num
										//审批编号 null
										//剂型  null
										//药品剂量单位 null
										//规格 record.spec
										//处方医师编号 
										var doc = form.findById("doc_id").getValue();
										//处方医师姓名
										var docname = form.findById("doc_id").getValue();
										//每次用量 null
										//使用频次 null
										//用法 null
										//单位 record.unit
										//科室名称 departcode
										//执行天数 null
										//经办人 empcode
										//医院端处方号  billno
										//费用大项  record.drugcode
										//单方、复方标志 cmedicine_id
										var cmedicine_id = form.findById("cmedicine_id").getValue();
										var UploadClassID = record.uploadClassID;
										var uploadItemCode = record.uploadItemCode;
										var UploadFeeTypeID = record.uploadFeeTypeID;
										detail = detail+sickcode+"|"+checkno+"|"+uploadItemCode
											+"|"+record.drugname+"|"+record.drugcode+"|"+record.drugname
											+"|"+treatdate+"|"+UploadClassID+"|"+UploadFeeTypeID+"|"+record.price+"|"+record.num+"|"+record.price * record.num
											+"||||"+record.spec+"|"+doc+"|"+doc+"||||"+ record.unit+"|急症室|0|系统管理员|"+billno+"|"+uploadItemCode+"|$";
									}
//									alert(detail);
									XnhInterfaceService.comBussines( detail,"2310", function(data) {
										if(data.returncode =="0"){
											//结算参数
											//医疗类别
											var mdtype_query = app.xnhinterfacePanel.queryForm
													.findById("mdtype_query_id").getValue();
											// 入院日期
											var treatdate = app.xnhinterfacePanel.queryForm
													.findById("treatdate_query").getValue().format("YmdHis");
											var prepayparam = sickcode+"|"+data.returnParamMap["value_0"]+"|"+mdtype_query+"|"+treatdate+"|0|系统管理员";
											//预结算
											XnhInterfaceService.comBussines(prepayparam ,"2420", function(prePaydata) {
												if(prePaydata.returncode =="0"){
//													for (var ttt in prePaydata.returnParamMap){
//														alert(ttt+"===="+prePaydata.returnParamMap[ttt]);
//													}
													var query_form = app.xnhinterfacePanel.queryForm;
													var sickname = query_form.findById("name").getValue();
													var payForm = app.xnhinterfacePanel.payForm;
													payForm.findById("prepayparam_pay").setValue(prepayparam);
													payForm.findById("name_pay").setValue(sickname);
													payForm.findById("sex_pay").setValue(query_form.findById("sex_id").getValue());
													payForm.findById("personno_pay").setValue(query_form.findById("personno").getValue());
													payForm.findById("amount1_pay").setValue(prePaydata.returnParamMap["value_1"]);
													payForm.findById("amount2_pay").setValue(prePaydata.returnParamMap["value_2"]);
													payForm.findById("amount3_pay").setValue(prePaydata.returnParamMap["value_3"]);
													payForm.findById("amount4_pay").setValue(prePaydata.returnParamMap["value_4"]);
													payForm.findById("amount5_pay").setValue(prePaydata.returnParamMap["value_5"]);
													payForm.findById("amount6_pay").setValue(prePaydata.returnParamMap["value_6"]);
													payForm.findById("amount7_pay").setValue(prePaydata.returnParamMap["value_7"]);
													payForm.findById("amount8_pay").setValue(prePaydata.returnParamMap["value_8"]);
													payForm.findById("amount9_pay").setValue(prePaydata.returnParamMap["value_9"]);
													payForm.findById("amount10_pay").setValue(prePaydata.returnParamMap["value_10"]);
													payForm.findById("amount11_pay").setValue(prePaydata.returnParamMap["value_11"]);
													payForm.findById("amount12_pay").setValue(prePaydata.returnParamMap["value_14"]);
													payForm.findById("amount13_pay").setValue(prePaydata.returnParamMap["value_0"]);
													payForm.findById("amount14_pay").setValue(prePaydata.returnParamMap["value_12"]);
													payForm.findById("amount15_pay").setValue(prePaydata.returnParamMap["value_13"]);
													payForm.findById("amount16_pay").setValue(prePaydata.returnParamMap["value_15"]);
													app.xnhinterfacePanel.payWin.show();
												}else{
													Ext.MessageBox.alert("错误",prePaydata.msg);
												}
											});
										}else{
											Ext.MessageBox.alert("错误",data.msg);
										}
									});
								}else{
									Ext.MessageBox.alert("错误",data.msg);
								}
							}.createDelegate(this));

//					cf_savedate(app.xnhinterfacePanel.payForm, 0, "sickname");
//					cf_savedate(app.xnhinterfacePanel.payForm, 3, "0.00");
//					cf_savedate(app.xnhinterfacePanel.payForm, 4, "0.00");
//					cf_savedate(app.xnhinterfacePanel.payForm, 5, "0.00");
//					cf_savedate(app.xnhinterfacePanel.payForm, 6, allmoney);
//					cf_savedate(app.xnhinterfacePanel.payForm, 7, "0.00");
//					cf_savedate(app.xnhinterfacePanel.payForm, 8, "0.00");
//					cf_savedate(app.xnhinterfacePanel.payForm, 9, "0.00");
//					cf_savedate(app.xnhinterfacePanel.payForm, 10, "0.00");
//					cf_savedate(app.xnhinterfacePanel.payForm, 11, "0.00");
//					cf_savedate(app.xnhinterfacePanel.payForm, 12, "0.00");
//					cf_savedate(app.xnhinterfacePanel.payForm, 13, "0.00");
//					cf_savedate(app.xnhinterfacePanel.payForm, 14, "0.00");
//					cf_savedate(app.xnhinterfacePanel.payForm, 15, "0.00");
//					cf_savedate(app.xnhinterfacePanel.payForm, 16, "0.00");
//					cf_savedate(app.xnhinterfacePanel.payForm, 17, "0.00");
//					cf_savedate(app.xnhinterfacePanel.payForm, 18, "0.00");
					

				}, "button_ico", "/css/plugins/buttons/icons/tick.png"),
				createButton("590", "132", 80, "取消", "button", function() {
							app.xnhinterfacePanel.queryForm.getForm().reset();
							app.xnhinterfacePanel.grid.getStore().removeAll();
							
						}, "button_ico", "/css/plugins/buttons/icons/cross.png"),
				createButton("500", "206", 80, "录入药方", "button", function() {
							app.xnhinterfacePanel.drugForm.getForm().reset();
							app.xnhinterfacePanel.drugWin.show();
						}, "button_ico", "/css/plugins/buttons/icons/tick.png"),
				{
					xtype : "hidden",
					name : "personno",
					id : "personno"
				}
				
				]
	}],
	// 编辑详细，包括新增和修改的Form
	editConfig : [{
				layout : "absolute",
				title : "信息",
				xtype : "panel",
				height : 232,
				items : []

			}],
	// 账户信息详细，包括新增和修改的Form
	accountInfoConfig : [{
		layout : "absolute",
		xtype : "panel",
		height : 232,
		items : [
				createButton("0", "0", 150, "读卡器/输入证号", "button", function() {
							app.xnhinterfacePanel.CardForm.inputCard();
						}, "button_ico", "/css/plugins/buttons/icons/tick.png"),
				createButton("170", "0", 150, "查看个人信息", "button", function() {
							app.xnhinterfacePanel.accountGrid.f_rowclick();
						}, "button_ico", "/css/plugins/buttons/icons/cross.png"),
				createButton("340", "0", 150, "选择当前人员", "button", function() {
							app.xnhinterfacePanel.accountGrid.f_rowdblclick();
						}, "button_ico", "/css/plugins/buttons/icons/cross.png"),
				createButton("510", "0", 150, "关闭窗体", "button", function() {
							app.xnhinterfacePanel.accountInfoForm.close();
						}, "button_ico", "/css/plugins/buttons/icons/cross.png"),
				createTextfield("0", "30", 80, "个人参合代码", "textfield", 120,
						"personmdno_1"),
				createTextfield("220", "30", 80,
						"&nbsp;&nbsp;&nbsp;&nbsp;家庭编号", "textfield", 120,
						"familycardno_1"),
				createTextfield("440", "30", 80, "合作医疗证号", "textfield", 120,
						"mdcardno_1"),

				createDatefield("0", "54", 80, "首次参合时间", "datefield", 120,
						"firstdate_1"),
				createDWRCombo("220", "54", 80, "与户主关系", "DWRInitcodeCombo",
						120, 'AAC069', 'relation_1', "200"),
				createDWRCombo("440", "54", 80, "医疗待遇类别", "DWRInitcodeCombo",
						120, 'BKC021', 'mdlevel_account', "200"),

				createTextfield("20", "88", 80, "家庭账户余额", "textfield", 60,
						"money_1"),
				createTextfield("168", "88", 80, "本年住院次数", "textfield", 60,
						"count_1"),
				createTextfield("320", "88", 80, "门诊统筹费用", "textfield", 60,
						"money_2"),
				createTextfield("470", "88", 103, "门诊统筹支付累计", "textfield", 60,
						"money_3"),
				createTextfield("20", "110", 80, "进入统筹累计", "textfield", 60,
						"money_4"),
				createTextfield("168", "110", 80, "统筹支付累计", "textfield", 60,
						"money_5"),
				createTextfield("320", "110", 80, "进入大额累计", "textfield", 60,
						"money_6"),
				createTextfield("470", "110", 103, "本年大额支付累计", "textfield", 60,
						"money_7"),
				createTextfield("20", "132", 80, "账户支付累计", "textfield", 60,
						"money_8"),
				createTextfield("168", "132", 80, "&nbsp;&nbsp;&nbsp;医疗费累计",
						"textfield", 60, "money_9")]

	}],
	// 账户信息详细，包括新增和修改的Form
	payConfig : [{
		layout : "absolute",
		xtype : "panel",
		height : 400,
		items : [
				createTextfield("0", "0", 80, "姓名/性别", "textfield", 120, "name_pay"),
				createTextfield("190", "0", 10, "", "textfield", 40, "sex_pay",
						false, ""),
				createTextfield("260", "0", 80, "个人编号", "textfield", 120,
						"personno_pay"),
				createTextfield("0", "54", 80, "自费金额", "textfield", 120,
						"amount1_pay"),
				createTextfield("220", "54", 80, "自理金额", "textfield", 120,
						"amount2_pay"),
				createTextfield("440", "54", 80, "符合补偿费用", "textfield", 120,
						"amount3_pay"),
				createTextfield("0", "80", 80, "进入统筹费用", "textfield", 120,
						"amount4_pay"),
				createTextfield("220", "80", 80, "进入大额费用", "textfield", 120,
						"amount5_pay"),
				createTextfield("440", "80", 80, "起付标准自付", "textfield", 120,
						"amount6_pay"),
				createTextfield("0", "110", 80, "统筹分段自付", "textfield", 120,
						"amount7_pay"),
				createTextfield("220", "110", 80, "统筹支付金额", "textfield", 120,
						"amount8_pay"),
				createTextfield("440", "110", 80, "大额分段自付", "textfield", 120,
						"amount9_pay"),
				createTextfield("0", "140", 80, "大额支付金额", "textfield", 120,
						"amount10_pay"),
				createTextfield("220", "140", 80, "超封顶线自付", "textfield", 120,
						"amount11_pay"),
				createTextfield("440", "140", 80, "超标准床位费", "textfield", 120,
						"amount12_pay"),
				createTextfield("0", "170", 80, "医疗费用总额", "textfield", 140,
						"amount13_pay"),
				createTextfield("300", "170", 80, "个人现金支付", "textfield", 140,
						"amount14_pay"),
				createTextfield("0", "200", 80, "家庭账户支付", "textfield", 140,
						"amount15_pay"),
				createTextfield("300", "200", 80, "实际补偿金额", "textfield", 140,
						"amount16_pay"),
				createPanel(
						"0",
						"230",
						"说明:" +
						"<br>&nbsp;&nbsp;&nbsp;&nbsp;医疗费总额 = 个人现金支付金额 + 家庭账户支付金额 + 统筹支付金额 + 大额支付金额" +
						"<br>&nbsp;&nbsp;&nbsp;&nbsp;实际补偿金额 = 统筹支付金额 + 大额支付金额" +
						"<br>&nbsp;&nbsp;&nbsp;&nbsp;实际现金支付 = 个人现金支付金额" +
						"<br>&nbsp;&nbsp;&nbsp;&nbsp;个人现金支付金额 = 自费金额 + 起付线 + 统筹分段自付 + 超封顶线金额" +
						"<br>&nbsp;&nbsp;&nbsp;&nbsp;起付标准自付金额 = 起付线" +
						"<br>&nbsp;&nbsp;&nbsp;&nbsp;超标准住院床位费是批床位费中超过支付标准的费用<br>",
						"panel", 150),
				createButton("200", "350", 80, "结算", "button", function() {
							var prepayparam = app.xnhinterfacePanel.payForm.findById("prepayparam_pay").getValue();
							XnhInterfaceService.comBussines(prepayparam,"2410", function(data) {
								if(data.returncode =="0"){
									//cf_savedate(app.xnhinterfacePanel.payForm, 0, "sickname");
									//结算
									Ext.MessageBox.alert("成功","结算成功!");
									app.xnhinterfacePanel.payWin.hide();
									app.xnhinterfacePanel.queryForm.getForm().reset();
									app.xnhinterfacePanel.grid.getStore().removeAll();
								}else{
									Ext.MessageBox.alert("错误",data.msg);
								}
							});
						}, "button_ico", "/css/plugins/buttons/icons/tick.png"),
				createButton("300", "350", 80, "取消", "button", function() {
							app.xnhinterfacePanel.payWin.hide();
						}, "button_ico", "/css/plugins/buttons/icons/cross.png"),
				{
					xtype : "hidden",
					name : "prepayparam_pay",
					id : "prepayparam_pay"
				}
					]

	}],
	// 账户信息详细，包括新增和修改的Form
	cardConfig : [
			{
				fieldLabel : "输入证号",
				xtype : "DWROptionCombo",
				mode : 'local',
				minChars : 1,
				selectOnFocus : false,
				typeAhead : true,
				optionName : inputcodeOption(),
				hiddenName : "cardNo",
//				id : "cardNo",
				hasEmptyHeader : true,
				minListWidth : 200,
				width : 160,
				disabled : false,
				editable : true
			}
			],

	// Grid 读取数据时的reader
	readerConfig : [createReaderConfig("index", "index"),
			createReaderConfig("drugcode", "drugcode"),
			createReaderConfig("drugname", "drugname"),
			createReaderConfig("spec", "spec"),
			createReaderConfig("unit", "unit"),
			createReaderConfig("price", "price"),
			createReaderConfig("num", "num"),
			createReaderConfig("uploadItemCode", "uploadItemCode"),
			createReaderConfig("relatename", "drugname"),
			
			createReaderConfig("type_id", "type_id"),
			createReaderConfig("uploadClassID", "uploadClassID"),
//			createReaderConfig("uploadItemCode", "uploadItemCode"),
			createReaderConfig("uploadFeeTypeID", "uploadFeeTypeID")
			],
	// Grid 读取数据时的reader
	accountReaderConfig : [createReaderConfig("personno", "personno"),
			createReaderConfig("name", "name"),
			createReaderConfig("sex", "sex"),
			createReaderConfig("idcard", "idcard"),
			createReaderConfig("type", "type"),
			createReaderConfig("birthday", "birthday"),
			createReaderConfig("marrystate", "marrystate"),
			createReaderConfig("personmdno", "personmdno"),
			createReaderConfig("familycardno", "familycardno"),
			createReaderConfig("mdcardno", "mdcardno"),
			createReaderConfig("firstdate", "firstdate"),
			createReaderConfig("relation", "relation"),
			createReaderConfig("money1", "money1"),
			createReaderConfig("count", "count"),
			createReaderConfig("money2", "money2"),
			createReaderConfig("money3", "money3"),
			createReaderConfig("money4", "money4"),
			createReaderConfig("money5", "money5"),
			createReaderConfig("money6", "money6"),
			createReaderConfig("money7", "money7"),
			createReaderConfig("money8", "money8"),
			createReaderConfig("money9", "money9")],
	// Grid的列
	gridCm : [
			createGridCm("项目编号", "index", true),
			createGridCm("项目代码", "drugcode", true, true),
			createGridCm("项目名称", "drugname", true),
			createGridCm("项目规格", "spec", true),
			createGridCm("单位", "unit", true),
			createGridCm("价格", "price", true), createGridCm("数量", "num", true),
			createGridCm("对照编码", "uploadItemCode", true),
			createGridCm("对照名称", "relatename", true),
			createGridCm("项目代码", "type_id", true, true),
			createGridCm("项目代码", "uploadClassID", true, true),
//			createGridCm("项目代码", "uploadItemCode", true, true),
			createGridCm("项目代码", "uploadFeeTypeID", true, true)
			],
	// Grid的列
	accountgridCm : [createGridCm("个人编号", "personno", true),
			createGridCm("姓名", "name", true), createGridCm("性别", "sex", true),
			createGridCm("身份证号", "ordinal", true),
			createGridCm("民族", "type", true),
			createGridCm("出生日期", "birthday", true),
			createGridCm("婚姻状况", "ordinal", true),
			createGridCm("在院状态", "connect", true),
			createGridCm("个人参合编码", "personmdno", true, true),
			createGridCm("家庭编号", "familycardno", true, true),
			createGridCm("合作医疗证号", "mdcardno", true, true),
			createGridCm("首次参合时间", "firstdate", true, true),
			createGridCm("与户主关系", "relation", true, true),
			createGridCm("医疗待遇类别", "mdlevel", true, true),
			createGridCm("家庭账户余额", "money1", true, true),
			createGridCm("本年住院次数", "count", true, true),
			createGridCm("门诊统筹费用", "money2", true, true),
			createGridCm("门诊统筹支付累计", "money3", true, true),
			createGridCm("进入统筹累计", "money4", true, true),
			createGridCm("统筹支付累计", "money5", true, true),
			createGridCm("进入大额累计", "money6", true, true),
			createGridCm("本年大额支付累计", "money7", true, true),
			createGridCm("账户支付累计", "money8", true, true),
			createGridCm("医疗费累计", "money9", true, true)],
	// Grid的列
	drugConfig : [{
				fieldLabel : "序号",
				xtype : "hidden",
				name : "index",
				id : "index"
			}, {
				fieldLabel : "药品代码",
				xtype : "hidden",
				name : "drugcode",
				id : "drugcode"
			}, {
				fieldLabel : "药品名称",
				xtype : "DWRDrugCombo",
				hiddenName : "drugname",
				id : "drugname_id",
				hasEmptyHeader : true,
				minListWidth : "200",
				width : 170,
				allowBlank : false
			}, {
				fieldLabel : "类型",
				xtype : "DWROptionCombo",
				hiddenName : "type",
				id : "type_id",
				mode : 'local',
				minChars : 1,
				optionName : drugTypeOption(),
				width : 170,
				readOnly : true
			}, {
				fieldLabel : "单价",
				xtype : "textfield",
				name : "price",
				id : "price",
				width : 170,
				readOnly : true
			}, {
				fieldLabel : "数量",
				xtype : "textfield",
				name : "num",
				id : "num",
				width : 170,
				allowBlank : false
			}, {
				fieldLabel : "单位",
				xtype : "textfield",
				name : "unit",
				id : "unit",
				width : 170,
				readOnly : true
			}, {
				fieldLabel : "规格",
				xtype : "textfield",
				name : "spec",
				id : "spec",
				width : 170,
				readOnly : true
			},{
				fieldLabel : "上传类型",
				xtype : "hidden",
				name : "uploadClassID",
				id : "uploadClassID"
			},{
				fieldLabel : "上传代码",
				xtype : "hidden",
				name : "uploadItemCode",
				id : "uploadItemCode"
			},{
				fieldLabel : "上传种类",
				xtype : "hidden",
				name : "uploadFeeTypeID",
				id : "uploadFeeTypeID"
			}
			
	// {fieldLabel : "金额",xtype : "textfield",hiddenName : "money",width :
	// 170,disabled :true}
	]
});

//_tab = ModuleMgr.register(app.xnhinterfacePanel);
//app.xnhinterfacePanel.load();
ModuleMgr.register(app.xnhinterfacePanel);

