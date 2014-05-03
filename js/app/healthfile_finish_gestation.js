Ext.ns("app");

app.healthfileFinishGestationPanelPanel = new Ext.tf.HealthPanel({
	treeLoaderFn : UserMenuTreeService.getUserDistrictNodes,
	queryUrl : UserMenuTreeService.findHealthfilesFinishGestation,
	deleteUrl : UserMenuTreeService.removeHealthfilesFinishGestation,
	title : '居民健康档案',
//	detailUrl : '/healthfileEnableBuild.html',
	recordId : 'id',
	recordPk : 'id',
	isFinishGestation : true,
	panelId : 'app.healthfileFinishGestationPanelPanel',
	readerConfig : [ {
		name : 'id',
		mapping : 'gestation.id'
	}, {
		name : 'fileNo',
		mapping : 'file.fileNo'
	}, {
		name : 'name',
		mapping : 'file.name'
	}, {
		name : 'personalInfo_birthday',
		mapping : 'maternal.birthday'
	}, {
		name : 'personalInfo_idnumber',
		mapping : 'maternal.idnumber'
	}, {
		name : 'personalInfo_tel',
		mapping : 'maternal.tel'
	}, {
		name : 'gravidity',
		mapping : 'maternal.gravidity'
	}, {
		name : 'finishReason',
		mapping : 'gestation.finishReason'
	}, {
		name : 'finishDate',
		mapping : 'gestation.finishDate'
	} ],
	gridCmConfig : [ {
		"header" : "终止原因",
		"dataIndex" : "finishReason",
		"width" : 200
	},{
		"header" : "终止日期",
		"dataIndex" : "finishDate",
		"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
	},{
		"header" : "档案编号",
		"dataIndex" : "fileNo",
		"width" : 200
	}, {
		"header" : "姓名",
		"dataIndex" : "name"
	}, {
		"header" : "生日",
		"dataIndex" : "personalInfo_birthday",
		"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
	}, {
		"header" : "身份证号",
		"dataIndex" : "personalInfo_idnumber"
	}, {
		"header" : "电话",
		"dataIndex" : "personalInfo_tel"
	}, {
		"header" : "孕次",
		"dataIndex" : "gravidity",
		"renderer" : function(v) {
			if (v != null && v != '')
				return '<span>第' + v + '次</span>';
			return '';
		}
	} ]
});

_tab = ModuleMgr.register(app.healthfileFinishGestationPanelPanel);
