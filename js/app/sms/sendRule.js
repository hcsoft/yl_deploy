Ext.ns("app");


app.sendRulePanel = new Ext.tf.SimplePanel({
	 title : '发送规则管理',
	border : false,
	pageSize : 20,
	//queryUrl : SmsService.findRules.createDelegate(this),
	queryUrl : SmsService.findSendRules.createDelegate(this),
	editUrl : SmsService.editSendRule.createDelegate(this),
	deleteUrl : SmsService.removeSendRule.createDelegate(this),
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
		fieldLabel : '天数',
		allowBlank : false,
		name : 'days'
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
		name : 'days',
		mapping : 'days'
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
		"header" : "天数",
		"dataIndex" : "days"
	} ]
});


ModuleMgr.register(app.sendRulePanel);