Ext.ns("app");


app.MsgManagerPanel = new Ext.tf.SimplePanel({
	 title : '发送规则管理',
	border : false,
	pageSize : 20,
	//queryUrl : SmsService.findRules.createDelegate(this),
	queryUrl : SmsService.findMsgs.createDelegate(this),
	editUrl : SmsService.editMsg.createDelegate(this),
	deleteUrl : SmsService.removeMsg.createDelegate(this),
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
		fieldLabel : '类型',
		allowBlank : false,
		name : 'type'
	}, {
		fieldLabel : '标题',
		allowBlank : false,
		name : 'title'
	}, {
		fieldLabel : '内容',
		allowBlank : false,
		xtype : 'textarea',
		height:100,
		width :130,
		name : 'content'
	}, {
		fieldLabel : '后缀',
		allowBlank : false,
		name : 'after'
	} ],

	// Grid 读取数据时的reader
	readerConfig : [ {
		name : 'id',
		mapping : 'id'
	}, {
		name : 'name',
		mapping : 'name'
	}, {
		name : 'type',
		mapping : 'type'
	}, {
		name : 'title',
		mapping : 'title'
	}, {
		name : 'content',
		
		mapping : 'content'
	}, {
		name : 'after',
		mapping : 'after'
	}],

	// Grid的列
	gridCm : [ {
		"header" : "名称",
		"sortable" : true,
		"dataIndex" : "name"
	}, {
		"header" : "类型",
		"dataIndex" : "type"
	}, {
		"header" : "标题",
		"dataIndex" : "title"
	}, {
		"header" : "内容",
		"dataIndex" : "content"
	}, {
		"header" : "后缀",
		"dataIndex" : "after"
	} ]
});


ModuleMgr.register(app.MsgManagerPanel);