Ext.ns("app");

app.modPanel = new Ext.tf.SimplePanel({
	// title : '模块管理',
	border : false,
	pageSize : 10,
	queryUrl : ModuleService.findModules.createDelegate(this),
	editUrl : ModuleService.editModule.createDelegate(this),
	deleteUrl : ModuleService.removeModules.createDelegate(this),

	// 查询条件Form
	queryConfig : [ {
		columnWidth : 1,
		fieldLabel : '名称',
		name : 'name'
	}, {
		fieldLabel : '模块目录',
		xtype : 'DWRCombo',
		optionName : 'ModuleCategory',
		whereParam : ' where isDetail = true ',
		hiddenName : 'categoryId',
		hasEmptyHeader : true,
		minListWidth : 200
	} ],

	// 编辑详细，包括新增和修改的Form
	editConfig : [ {
		fieldLabel : 'ID',
		name : 'id',
		xtype : 'hidden'
	}, {
		name : 'categoryId',
		xtype : 'hidden'
	}, {
		fieldLabel : 'clsSetting',
		name : 'clsSetting',
		xtype : 'hidden'
	}, {
		fieldLabel : '名称',
		allowBlank : false,
		name : 'name'
	}, {
		fieldLabel : '模块目录',
		xtype : 'popselect',
		refName : 'categoryId',
		title : '所属模块目录选择',

		queryUrl : ModuleService.findModuleCategory.createDelegate(this),
		queryConfig : [ {
			fieldLabel : '名称',
			name : 'name'
		}, {
			name : 'isDetail',
			value : '1',
			xtype : 'hidden'
		} ],
		readerConfig : [ {
			name : 'id',
			mapping : 'id'
		}, {
			name : 'name',
			mapping : 'name'
		}, {
			name : 'displayOrder',
			mapping : 'displayOrder'
		} ],
		gridCm : [ {
			"header" : "名称",
			"dataIndex" : "name"
		}, {
			"header" : "顺序",
			"dataIndex" : "displayOrder"
		} ],

		name : 'category.name'
	}, {
		fieldLabel : 'URL',
		allowBlank : false,
		name : 'url'
	}, {
		fieldLabel : '顺序',
		allowBlank : false,
		name : 'ordinal'
	} ],

	// Grid 读取数据时的reader
	readerConfig : [ {
		name : 'id',
		mapping : 'id'
	}, {
		name : 'category.name',
		mapping : 'name'
	}, {
		name : 'name',
		mapping : 'name'
	}, {
		name : 'categoryId',
		mapping : 'categoryId'
	}, {
		name : 'url',
		mapping : 'url'
	}, {
		name : 'ordinal',
		mapping : 'ordinal'
	}, {
		name : 'clsSetting',
		mapping : 'clsSetting'
	} ],

	// Grid的列
	gridCm : [ {
		"header" : "名称",
		"sortable" : true,
		"dataIndex" : "name"
	}, {
		"header" : "URL",
		"dataIndex" : "url"
	}, {
		"header" : "模块目录",
		"dataIndex" : "category.name"
	}, {
		"header" : "顺序",
		"dataIndex" : "ordinal"
	} ]
});

// var panel = new Ext.FormPanel({title:'asdfjkl;'});
// Ext.getCmp("tabbody").register(app.modPanel);
ModuleMgr.register(app.modPanel);
