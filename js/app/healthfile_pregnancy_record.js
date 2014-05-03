Ext.ns("app");

app.healthfilePregnancyRecordPanel = new Ext.tf.HealthPregnancyRecordPanel({
	treeLoaderFn : UserMenuTreeService.getUserDistrictNodes,
	queryUrl : UserMenuTreeService.findHealthfilesAlreadyBuild,
	queryUrl01 : UserMenuTreeService.findhealthfilePregnancyRecord,
	deleteUrl : UserMenuTreeService.removehealthfilePregnancyRecord,
	title : '居民健康档案',
	recordId : 'id',
	recordPk : 'id',
	judgeCondId : 'isClosed',
	judgeCondVal : '0',
	isFinishGestation : true,
	panelId : 'app.healthfilePregnancyRecordPanel',
	readerConfig : [ {
		name : 'id',
		mapping : 'maternal.id'
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
		name : 'isClosed',
		mapping : 'maternal.isClosed'
	} ],
	gridCmConfig : [ {
		"header" : "状态",
		"dataIndex" : "isClosed",
		"renderer" : function(v) {
			if (v == '0') {
				return '<span>未结案</span>';
			} else if (v == '1') {
				return '<span>已结案</span>';
			} else if (v == '2') {
				return '<span>终止妊娠</span>';
			} else {
				return '';
			}
		}
	}, {
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
	} ],
	readerConfig01 : [ {
		name : 'id',
		mapping : 'id'
	}, {
		name : 'recordDate',
		mapping : 'recordDate'
	}, {
		name : 'record',
		mapping : 'record'
	}, {
		name : 'dealOpinion',
		mapping : 'dealOpinion'
	}, {
		name : 'doctor',
		mapping : 'doctor'
	}, {
		name : 'healthFileMaternalId',
		mapping : 'healthFileMaternalId'
	} ],
	gridCmConfig01 : [ {
		"header" : "记录日期",
		"dataIndex" : "recordDate",
		"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
	}, {
		"header" : "特殊情况记录",
		"dataIndex" : "record",
		"width" : 300
	}, {
		"header" : "处理意见",
		"dataIndex" : "dealOpinion",
		"width" : 150
	}, {
		"header" : "医生签名",
		"dataIndex" : "doctor"
	} ]
});

_tab = ModuleMgr.register(app.healthfilePregnancyRecordPanel);
