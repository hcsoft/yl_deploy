Ext.ns("app");

app.modMgrPanel = new Ext.tf.SimplePanel({
	title : '模块目录管理',
	pageSize : 10,
	queryUrl : ModuleService.findModuleCategory.createDelegate(this),
	editUrl : ModuleService.editModuleCategory.createDelegate(this),
	deleteUrl : ModuleService.removeModuleCategory.createDelegate(this),

	queryConfig : [ {
		fieldLabel : '名称',
		name : 'name',
		allowBlank : true
	} ],

	editConfig : [ {
		fieldLabel : 'ID',
		name : 'id',
		xtype : 'hidden'
	}, {
		fieldLabel : '模块目录名称',
		name : 'name'
	},{
		fieldLabel : '目录级别',
		store : new Ext.data.SimpleStore({
			fields : [ 'type', 'display' ],
			data : [ [ '0', '一级目录' ], [ '1', '二级目录' ] ]
		}),
		displayField : 'display',
		valueField : 'type',
		typeAhead : true,
		mode : 'local',
		triggerAction : 'all',
		selectOnFocus : true,
		editable : false,
		width : 130,
		value : '0',
		name : 'isDetail',
		xtype : 'combo'
	}, {
		name : 'parentId',
		xtype : 'hidden'
	}, {
		fieldLabel : '上级目录',
		xtype : 'popselect',
		refName : 'parentId',
		title : '上级目录模块',
		queryUrl : ModuleService.findModuleCategory.createDelegate(this),
		queryConfig : [ {
			fieldLabel : '名称',
			name : 'name'
		},{
			name : 'isDetail',
			value : '0',
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
		name : 'parentName'
	}, {
		fieldLabel : '排列顺序',
		name : 'displayOrder',
		xtype : 'numberfield'
	}, {
		fieldLabel : 'clsSetting',
		name : 'clsSetting',
		xtype : 'hidden'
	}, {
		fieldLabel : 'templateId',
		name : 'templateId',
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
	}, {
		name : 'parentId',
		mapping : 'parentId'
	}, {
		name : 'parentName',
		mapping : 'parentName'
	}, {
		name : 'isDetail',
		mapping : 'isDetail'
	},{
		name : 'clsSetting',
		mapping : 'clsSetting'
	},{
		name : 'templateId',
		mapping : 'templateId'
	} ],

	gridCm : [ {
		"hidden" : true,
		"header" : "ID",
		"sortable" : true,
		"dataIndex" : "id"
	}, {
		"header" : "模块目录名称",
		"sortable" : true,
		"dataIndex" : "name"
	}, {
		"header" : "排列顺序",
		"sortable" : true,
		"dataIndex" : "displayOrder"
	}, {
		"header" : "目录级别",
		"sortable" : true,
		"dataIndex" : "isDetail",
		"renderer" : function(v){
			if(v == 0){
				return '<span>一级目录</span>';
			}else if(v == 1){
				return '<span>二级目录</span>';
			}else{
				return '';
			}
		}
	} ]
});
ModuleMgr.register(app.modMgrPanel);
// _tab = ModuleMgr.register(app.modMgrPanel);
// app.modMgrPanel.load();
