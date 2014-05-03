Ext.ns("app");
Ext.onReady(function() {
	var data = [ [ 1, '儿童' ], [ 0, '妇女' ] ];

	var store = new Ext.data.SimpleStore({
		fields : [ 'value', 'text' ],
		data : data
	});
	var catagory = new Ext.form.ComboBox({
		mode : 'local',
		store : store,
		valueField : 'value',
		displayField : 'text',
		fieldLabel : '所属分类',
		allowBlank : false,
		selectOnFocus : true,
		forceSelection : true,
		editable : false,
		triggerAction : 'all',
		name : 'type',
		id : 'type',
		width : 100,
		value : '1',
		listWidth : 100
	});

	app.highRiskPanel = new Ext.tf.SimplePanel({
		// title : '模块管理',
		border : false,
		pageSize : 10,
		queryUrl : ModuleService.findHighRisk.createDelegate(this),
		editUrl : ModuleService.editHighRisk.createDelegate(this),
		deleteUrl : ModuleService.removeHighRisk.createDelegate(this),

		// 查询条件Form
		queryConfig : [ {
			columnWidth : 1,
			fieldLabel : '异常情况',
			name : 'exception'
		} ],

		// 编辑详细，包括新增和修改的Form
		editConfig : [ {
			fieldLabel : 'ID',
			name : 'id',
			xtype : 'hidden'
		}, {
			fieldLabel : '代号',
			name : 'number',
			allowBlank : false
//			xtype : 'numberfield'
		}, {
			fieldLabel : '异常情况',
			allowBlank : false,
			name : 'exception'
		}, catagory ],

		// Grid 读取数据时的reader
		readerConfig : [ {
			name : 'id',
			mapping : 'id'
		}, {
			name : 'number',
			mapping : 'number'
		}, {
			name : 'exception',
			mapping : 'exception'
		}, {
			name : 'type',
			mapping : 'type'
		} ],

		// Grid的列
		gridCm : [ {
			"header" : "代号",
			"sortable" : true,
			"dataIndex" : "number",
			"width" : "50"
		}, {
			"header" : "异常情况",
			"dataIndex" : "exception",
			"width" : "200"
		}, {
			"header" : "所属分类",
			"dataIndex" : "type",
			"width" : "50"
		} ]
	});
	ModuleMgr.register(app.highRiskPanel);
});
