Ext.ns("app");

app.getTelRulePanel = new Ext.tf.SimplePanel({
	 title : '更新规则管理',
	border : false,
	pageSize : 20,
	//queryUrl : SmsService.findRules.createDelegate(this),
	queryUrl : SmsService.findRules.createDelegate(this),
	editUrl : SmsService.editRule.createDelegate(this),
	deleteUrl : SmsService.removeRule.createDelegate(this),
	// 查询条件Form
	queryConfig : [ {
		columnWidth : 1,
		fieldLabel : '名称',
		name : 'name'
	}],
	// 编辑详细，包括新增和修改的Form
	editConfig : [ {
		fieldLabel : 'id',
		name : 'id',
		xtype : 'hidden'
	}, {
		fieldLabel : '名称',
		allowBlank : false,
		name : 'name'
	}, {
		fieldLabel : '表名',
		allowBlank : false,
		name : 'tablename'
	}, {
		fieldLabel : '列名',
		allowBlank : false,
		name : 'col'
	}, {
		fieldLabel : '顺序',
		allowBlank : false,
		name : 'ord'
	} ],

	// Grid 读取数据时的reader
	readerConfig : [ {
		name : 'id',
		mapping : 'id'
	}, {
		name : 'name',
		mapping : 'name'
	}, {
		name : 'tablename',
		mapping : 'tablename'
	}, {
		name : 'col',
		mapping : 'col'
	}, {
		name : 'ord',
		mapping : 'ord'
	}],

	// Grid的列
	gridCm : [ {
		"header" : "名称",
		"sortable" : true,
		"dataIndex" : "name"
	}, {
		"header" : "表名",
		"dataIndex" : "tablename"
	}, {
		"header" : "列名",
		"dataIndex" : "col"
	}, {
		"header" : "顺序",
		"dataIndex" : "ord"
	} ]
});


ModuleMgr.register(app.getTelRulePanel);