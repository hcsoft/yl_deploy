Ext.ns("app");

function medialOption(){
	return [{id:11,name:"11--普通门诊"},
		{id:13,name:"13--门诊慢性病"},
		{id:14,name:"14--门诊特殊病"},
		{id:16,name:"16--急诊抢救"}
		];
}

function departOption(){
	return [{id:01,name:"01--外科"},
		{id:02,name:"02--内科"},
		{id:02,name:"03--耳鼻喉科"},
		{id:03,name:"04--骨伤科"}
		];
}

function docOption(){
	return [{id:01,name:"01--张国庆"},
		{id:02,name:"02--李梅"},
		{id:03,name:"03--王光康"},
		{id:04,name:"04--赵承龙"}
		];
}
function drugTypeOption(){
	return [{id:0,name:"药品"},
		{id:2,name:"手术"}
		];
}

function diseaseOption(){
	return [{id:11,name:"99--门诊常见疾病"}
		];
}

//保存数据
function cf_savedate(ref,index ,value){
	var ttt = ref.getComponent(0);
	for(var aaa in ttt){
		alert(aaa+"==="+ttt[aaa])
	}
	//alert(ttt.xtype);
	
	ref.getComponent(0).getComponent(index)
							.getComponent(0).setValue(value);
}

function createDWRCombo(x, y, labelWidth, fieldLabel, xtype, width, data,
		hiddenName,minListWidth,disabled) {
	return {
		xtype  : "panel",
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
					minChars:1, 
          			selectOnFocus:true,
          			typeAhead: true, 
					optionName : data,
					hiddenName : hiddenName,
					hasEmptyHeader : true,
					minListWidth : minListWidth,
					width : width,
					disabled  : disabled ,
					editable  : true
				}]
	};
}
function createTextfield(x, y, labelWidth, fieldLabel, xtype, width,disabled ,labelSeparator ) {
	return {
		xtype  : "panel",
		layout : "form",
// anchor : "30% 30%",
		width :700,
		x : x,
		y : y,
		bodyStyle : 'padding:5px',
		labelWidth : labelWidth,
		border : true,
		items : [{
					fieldLabel : fieldLabel,
					xtype : xtype,
					width : width,
					disabled :disabled ,
					labelSeparator  : labelSeparator 
				}]
	};
}
function createDatefield(x, y, labelWidth, fieldLabel, xtype, width,disabled ) {
	return {
		xtype  : "panel",
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
					disabled :disabled 
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
		xtype  : "panel",
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

function createGridCm(header, dataIndex, sortable,hidden) {
	return {
		"header" : header,
		"sortable" : sortable,
		"dataIndex" : dataIndex,
		"hidden" : hidden
	};
}
app.modPanel = new Ext.tf.XnhInterfacePanel({
	title : '新农合接口处方',
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
				medialOption(), 'mdtype',"120"),
				createDWRCombo("180", "-4", 80, "医疗待遇类别", "DWRInitcodeCombo", 180,
						'BKC021', 'mdlevel',"200"),
				createDatefield("470", "-4", 90, "结算(审核)日期", "datefield", 90),
				createDWRCombo("0", "18", 60, "诊断疾病", "DWROptionCombo", 380,
						diseaseOption(), 'disease',"200"),
				createDWRCombo("480", "18", 80, "中药处方类型", "DWRInitcodeCombo", 90,
						'BKC127', 'cmedicine',"100"),
				createPanel("0", "45", "个人信息", "panel", 100),
				createTextfield("0", "66", 32, "姓名", "textfield", 80,true),
				createDWRCombo("130", "66", 32, "性别", "DWRInitcodeCombo", 40,
				 "AAC004", 'sex',"30",true),
// createTextfield("130", "66", 32, "性别", "textfield", 40,true),
				createDatefield("220", "66", 60, "出生日期", "datefield", 85,true),
				createTextfield("400", "66", 60, "个人编号", "textfield", 90,true),
				createButton("560", "66", 110, "账户信息", "button", 
				
				//app.modPanel.superclass.accountInfo.createDelegate(this)),
				function() {
						app.modPanel.accountInfoWin.show();
						// this.ownerCt.ownerCt.ownerCt.ownerCt.accountInfo();
						}.createDelegate(this)),
				createTextfield("20", "88", 80, "家庭账户余额", "textfield", 60,true),
				createTextfield("168", "88", 80, "本年住院次数", "textfield", 60,true),
				createTextfield("320", "88", 80, "门诊统筹费用", "textfield", 60,true),
				createTextfield("470", "88", 103, "门诊统筹支付累计", "textfield", 60,true),
				createTextfield("20", "110", 80, "进入统筹累计", "textfield", 60,true),
				createTextfield("168", "110", 80, "统筹支付累计", "textfield", 60,true),
				createTextfield("320", "110", 80, "进入大额累计", "textfield", 60,true),
				createTextfield("470", "110", 103, "本年大额支付累计", "textfield", 60,true),
				createTextfield("20", "132", 80, "账户支付累计", "textfield", 60,true),
				createTextfield("168", "132", 80, "&nbsp;&nbsp;&nbsp;医疗费累计",
						"textfield", 60,true),
				createPanel("0", "160", "本次就诊信息", "panel", 100),
				createTextfield("0", "182", 60, "处 方 号", "textfield", 80),
				createDWRCombo("160", "182", 60, "医&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;生", "DWROptionCombo", 63,
				docOption(), 'doc',"120"),
				createDWRCombo("320", "182", 60, "就诊科室", "DWROptionCombo", 85,
					departOption(), 'depart',"120"),
//				createTextfield("320", "182", 60, "就诊科室", "textfield", 85),
				createTextfield("490", "182", 45, "登记号", "textfield", 128),
				createTextfield("0", "204", 60, "经 办 人", "textfield", 80),
				createTextfield("160", "204", 60, "处方金额", "textfield", 80),
				createDatefield("320", "204", 60, "就诊时间", "datefield", 85),
				createButton("500", "132", 80, "结算", "button", function() {
							app.modPanel.payWin.show();
							var count = app.modPanel.grid.store.getCount();
							var allmoney = 0;
							for (var index = 0 ; index <count ; index++){
								var row = app.modPanel.grid.store.getAt(index);
								alert("price"+row.data.price + ",,,num==" +row.data.num)
								allmoney = allmoney + row.data.price * row.data.num;
							}
							alert(allmoney);
							cf_savedate( app.modPanel.queryForm, 4,"0.00");
							cf_savedate( app.modPanel.queryForm, 5,"0.00");
							cf_savedate( app.modPanel.queryForm, 6,allmoney);
							cf_savedate( app.modPanel.queryForm, 7,"0.00");
							cf_savedate( app.modPanel.queryForm, 8,"0.00");
							cf_savedate( app.modPanel.queryForm, 9,"0.00");
							cf_savedate( app.modPanel.queryForm, 10,"0.00");
							cf_savedate( app.modPanel.queryForm, 11,"0.00");
							cf_savedate( app.modPanel.queryForm, 12,"0.00");
							cf_savedate( app.modPanel.queryForm, 13,"0.00");
							cf_savedate( app.modPanel.queryForm, 14,"0.00");
							cf_savedate( app.modPanel.queryForm, 15,"0.00");
							cf_savedate( app.modPanel.queryForm, 16,"0.00");
							cf_savedate( app.modPanel.queryForm, 17,"0.00");
							cf_savedate( app.modPanel.queryForm, 18,"0.00");
							cf_savedate( app.modPanel.queryForm, 19,"0.00");
							
						}, "button_ico", "/css/plugins/buttons/icons/tick.png"),
				createButton("590", "132", 80, "取消", "button", function() {
							app.modPanel.accountInfo();
						}, "button_ico", "/css/plugins/buttons/icons/cross.png"),
				createButton("500", "206", 80, "开药", "button", function() {
							app.modPanel.drugForm.getForm().reset();
							app.modPanel.drugWin.show();
						}, "button_ico", "/css/plugins/buttons/icons/tick.png")]

	}],
	// 编辑详细，包括新增和修改的Form
	editConfig : [{
		layout : "absolute",
		title : "信息",
		xtype : "panel",
		height : 232,
		items : [
// createDWRCombo("0", "-4", 60, "医疗类别", "DWRCombo", 90,
// 'ModuleCategory', 'categoryId'),
// createDWRCombo("180", "-4", 80, "医疗待遇类别", "DWRCombo", 180,
// 'ModuleCategory', 'categoryId'),
// createDatefield("470", "-4", 90, "结算(审核)日期", "datefield", 90),
// createDWRCombo("0", "18", 60, "诊断疾病", "DWRCombo", 380,
// 'ModuleCategory', 'categoryId'),
// createDWRCombo("480", "18", 80, "中药处方类型", "DWRCombo", 90,
// 'ModuleCategory', 'categoryId'),
// createPanel("0", "45", "个人信息", "panel", 100),
// createTextfield("0", "66", 32, "姓名", "textfield", 80),
// createTextfield("130", "66", 32, "性别", "textfield", 40),
// createDatefield("220", "66", 60, "出生日期", "datefield", 85),
// createTextfield("400", "66", 60, "个人编号", "textfield", 80),
// createButton("550", "66", 110, "账户信息", "button", function() {
// this.ownerCt.ownerCt.ownerCt.ownerCt.accountInfo();
// }),
// createTextfield("20", "88", 80, "家庭账户余额", "textfield", 60),
// createTextfield("168", "88", 80, "本年住院次数", "textfield", 60),
// createTextfield("320", "88", 80, "门诊统筹费用", "textfield", 60),
// createTextfield("470", "88", 103, "门诊统筹支付累计", "textfield", 60),
// createTextfield("20", "110", 80, "进入统筹累计", "textfield", 60),
// createTextfield("168", "110", 80, "统筹支付累计", "textfield", 60),
// createTextfield("320", "110", 80, "进入大额累计", "textfield", 60),
// createTextfield("470", "110", 103, "本年大额支付累计", "textfield", 60),
// createTextfield("20", "132", 80, "账户支付累计", "textfield", 60),
// createTextfield("168", "132", 80, "&nbsp;&nbsp;&nbsp;医疗费累计",
// "textfield", 60),
// createPanel("0", "160", "本次就诊信息", "panel", 100),
// createTextfield("0", "182", 60, "处 方 号", "textfield", 80),
// createTextfield("160", "182", 60,
// "医&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;生",
// "textfield", 80),
// createTextfield("320", "182", 60, "就诊科室", "textfield", 85),
// createTextfield("490", "182", 45, "登记号", "textfield", 128),
// createTextfield("0", "204", 60, "经 办 人", "textfield", 80),
// createTextfield("160", "204", 60, "处方金额", "textfield", 80),
// createDatefield("320", "204", 60, "就诊时间", "datefield", 85),
// createButton("500", "206", 80, "结算", "button", function() {
// this.ownerCt.ownerCt.ownerCt.ownerCt.accountInfo();
// }, "button_ico", "/css/plugins/buttons/icons/tick.png"),
// createButton("590", "206", 80, "取消", "button", function() {
// this.ownerCt.ownerCt.ownerCt.ownerCt.accountInfo();
// }, "button_ico", "/css/plugins/buttons/icons/cross.png")
		]

	}],
	// 账户信息详细，包括新增和修改的Form
	accountInfoConfig : [{
		layout : "absolute",
		xtype : "panel",
		height : 232,
		items : [
				createButton("0", "0", 150, "读卡器/输入证号", "button", function() {
							app.modPanel.CardForm.inputCard();
						}, "button_ico", "/css/plugins/buttons/icons/tick.png"),
				createButton("170", "0", 150, "查看个人信息", "button", function() {
							app.modPanel.accountGrid.f_rowclick();
						}, "button_ico", "/css/plugins/buttons/icons/cross.png"),
				createButton("340", "0", 150, "选择当前人员", "button", function() {
							app.modPanel.accountGrid.f_rowdblclick();
						}, "button_ico", "/css/plugins/buttons/icons/cross.png"),
				createButton("510", "0", 150, "关闭窗体", "button", function() {
							app.modPanel.accountInfoForm.close();
						}, "button_ico", "/css/plugins/buttons/icons/cross.png"),
				createTextfield("0", "30", 80, "个人参合代码", "textfield", 120),
				createTextfield("220", "30", 80, "&nbsp;&nbsp;&nbsp;&nbsp;家庭编号", "textfield", 120),
				createTextfield("440", "30", 80, "合作医疗证号", "textfield", 120),
				
				createDatefield("0", "54", 80, "首次参合时间", "datefield", 120),
				createTextfield("220", "54", 80, "与户主关系", "textfield", 120),
				createTextfield("440", "54", 80, "医疗待遇类别", "textfield", 120),
				
				createTextfield("20", "88", 80, "家庭账户余额", "textfield", 60),
				createTextfield("168", "88", 80, "本年住院次数", "textfield", 60),
				createTextfield("320", "88", 80, "门诊统筹费用", "textfield", 60),
				createTextfield("470", "88", 103, "门诊统筹支付累计", "textfield", 60),
				createTextfield("20", "110", 80, "进入统筹累计", "textfield", 60),
				createTextfield("168", "110", 80, "统筹支付累计", "textfield", 60),
				createTextfield("320", "110", 80, "进入大额累计", "textfield", 60),
				createTextfield("470", "110", 103, "本年大额支付累计", "textfield", 60),
				createTextfield("20", "132", 80, "账户支付累计", "textfield", 60),
				createTextfield("168", "132", 80, "&nbsp;&nbsp;&nbsp;医疗费累计",
						"textfield", 60)
		]

	}],
	// 账户信息详细，包括新增和修改的Form
	payConfig : [{
		layout : "absolute",
		xtype : "panel",
		height : 500,
		items : [
				createTextfield("0", "0", 80, "姓名/性别", "textfield", 120),
				createTextfield("190", "0", 10, "", "textfield", 40 ,false ," "),
				createTextfield("260", "0", 80, "个人编号", "textfield", 120),
				createTextfield("0", "54", 80, "自费金额", "textfield", 120),
				createTextfield("220", "54", 80, "自理金额", "textfield", 120),
				createTextfield("440", "54", 80, "符合补偿费用", "textfield", 120),
				createTextfield("0", "80", 80, "进入统筹费用", "textfield", 120),
				createTextfield("220", "80", 80, "进入大额费用", "textfield", 120),
				createTextfield("440", "80", 80, "起付标准自付", "textfield", 120),
				createTextfield("0", "110", 80, "统筹分段自付", "textfield", 120),
				createTextfield("220", "110", 80, "统筹支付金额", "textfield", 120),
				createTextfield("440", "110", 80, "大额分段自付", "textfield", 120),
				createTextfield("0", "140", 80, "大额支付金额", "textfield", 120),
				createTextfield("220", "140", 80, "超封顶线自付", "textfield", 120),
				createTextfield("440", "140", 80, "超标准床位费","textfield", 120),
				createTextfield("0", "170", 80, "医疗费用总额","textfield", 140),
				createTextfield("300", "170", 80, "个人现金支付","textfield", 140),
				createTextfield("0", "200", 80, "家庭账户支付","textfield", 140),
				createTextfield("300", "200", 80, "实际补偿金额","textfield", 140),
				createPanel("0", "230", "说明:<br>&nbsp;&nbsp;&nbsp;&nbsp;<br><br><br><br><br><br><br><br>", "panel", 150),
				createButton("200", "400", 80, "确定", "button", function() {
							app.modPanel.CardForm.inputCard();
						}, "button_ico", "/css/plugins/buttons/icons/tick.png"),
				createButton("300", "400", 80, "取消", "button", function() {
							app.modPanel.accountInfoForm.close();
						}, "button_ico", "/css/plugins/buttons/icons/cross.png")
		]

	}],
	// 账户信息详细，包括新增和修改的Form
	cardConfig : [{
					fieldLabel : "输入证号",
					xtype : "textfield",
// labelWidth: 30,
					name : "cardNo",
					width : 160,
					allowBlank : false,
					minLength : 10
				}],

	// Grid 读取数据时的reader
	readerConfig : [
			createReaderConfig("index", "index"),
			createReaderConfig("drugcode", "drugcode"),
			createReaderConfig("drugname", "drugname"),
			createReaderConfig("spec", "spec"),
			createReaderConfig("unit", "unit"),
			createReaderConfig("price", "price"),
			createReaderConfig("num", "num"),
			createReaderConfig("relatecode", "relatecode"),
			createReaderConfig("relatename", "relatename")
			],
// Grid 读取数据时的reader
	accountReaderConfig : 
			[
			createReaderConfig("personno", "personno"),
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
			createGridCm("项目代码", "drugcode", true,true),
			createGridCm("项目名称", "drugname", true),
			createGridCm("项目规格", "spec", true),
			createGridCm("单位", "unit", true),
			createGridCm("价格", "price", true),
			createGridCm("数量", "num", true),
			createGridCm("对照编码", "relatecode", true),
			createGridCm("对照名称", "relatename", true)],
	// Grid的列
	accountgridCm : [
			createGridCm("个人编号", "personno", true),
			createGridCm("姓名", "name", true),
			createGridCm("性别", "sex", true),
			createGridCm("身份证号", "ordinal", true),
			createGridCm("民族", "type", true),
			createGridCm("出生日期", "birthday", true),
			createGridCm("婚姻状况", "ordinal", true),
			createGridCm("在院状态", "connect", true),
			createGridCm("个人参合编码", "personmdno", true,true),
			createGridCm("家庭编号", "familycardno", true,true),
			createGridCm("合作医疗证号", "mdcardno", true,true),
			createGridCm("首次参合时间", "firstdate", true,true),
			createGridCm("与户主关系", "relation", true,true),
			createGridCm("医疗待遇类别", "mdlevel", true,true),
			createGridCm("家庭账户余额", "money1", true,true),
			createGridCm("本年住院次数", "count", true,true),
			createGridCm("门诊统筹费用", "money2", true,true),
			createGridCm("门诊统筹支付累计", "money3", true,true),
			createGridCm("进入统筹累计", "money4", true,true),
			createGridCm("统筹支付累计", "money5", true,true),
			createGridCm("进入大额累计", "money6", true,true),
			createGridCm("本年大额支付累计", "money7", true,true),
			createGridCm("账户支付累计", "money8", true,true),
			createGridCm("医疗费累计", "money9", true,true)
			],
	// Grid的列
	drugConfig : [
	{fieldLabel : "序号",xtype : "hidden",name : "index"},
	{fieldLabel : "药品代码",xtype : "hidden",name : "drugcode"},
	{fieldLabel : "药品名称",xtype : "DWRDrugCombo",hiddenName : "drugname",hasEmptyHeader : true,minListWidth : "200",width : 170,allowBlank : false},
	{fieldLabel : "类型",xtype : "DWROptionCombo",hiddenName : "type",mode : 'local',minChars:1,optionName : drugTypeOption() ,width : 170,readOnly:true},
	{fieldLabel : "单价",xtype : "textfield",name : "price",width : 170,readOnly:true},
	{fieldLabel : "数量",xtype : "textfield",name : "num",width : 170 ,allowBlank : false},
	{fieldLabel : "单位",xtype : "textfield",name : "unit",width : 170,readOnly:true},
	{fieldLabel : "规格",xtype : "textfield",name : "spec",width : 170,readOnly:true}
	// {fieldLabel : "金额",xtype : "textfield",hiddenName : "money",width :
	// 170,disabled :true}
	]
});

_tab = ModuleMgr.register(app.modPanel);
app.modPanel.load();
