Ext.ns("app");

app.repeatFilesPanel = new Ext.tf.RepeatFiles({
	treeLoaderFn : UserMenuTreeService.getUserDistrictNodes,
	winQueryUrl : UserMenuTreeService.findHealthFiles,
	centerQueryUrl : repeatFileNoService.getListExam,
	centerDeleteUrl : UserMenuTreeService.removeHealthFiles,
	updateListExamUrl : repeatFileNoService.updateListExam,
	delListExamUrl : repeatFileNoService.delListExam,
	leftReaderConfig : [ {
		name : 'fileNo'
	}, {
		name : 'name'
	}],
	leftGridCmConfig : [ {
		"header" : "档案编号",
		"dataIndex" : "fileNo",
		"width" : 150
	}, {
		"header" : "姓名",
		"dataIndex" : "name"
	} ],
	updateGridCmConfig : [ {
		"header" : "档案编号",
		"dataIndex" : "fileNo",
		"width" : 150
	}, {
		"header" : "姓名",
		"dataIndex" : "name"
	} ],
	readerConfig : [{
		name : 'id'
	},{
		name : 'fileNo'
	},{
		name : 'name'
	},{
		name : 'examDate'
	},{
		name : 'inputPersonId'
	},{
		name : 'inputPersonName'
	},{
		name : 'orgName'
	},{
		name : 'flag'
	}],
	gridCmConfig : [{
		"header" : "档案编号",
		"dataIndex" : "fileNo",
		"width" : 150
	},{
		"header" : "姓名",
		"dataIndex" : "name"
	},{
		"header" : "体检日期",
		"dataIndex" : "examDate"
	},{
		"header" : "录入人",
		"dataIndex" : "inputPersonName"
	},{
		"header" : "录入单位",
		"dataIndex" : "orgName"
	},{
		"header" : "数据类型",
		"dataIndex" : "flag",
		"renderer" : function(v){
			if(v == '1'){
				return '<span>健康体检记录</span>';
			}else if(v == '2'){
				return '<span>新生儿家庭访视</span>';
			}else if(v == '3'){
				return '<span>1岁以内儿童体检</span>';
			}else if(v == '4'){
				return '<span>1~2岁儿童体检</span>';
			}else if(v == '5'){
				return '<span>3~6岁儿童体检</span>';
			}else if(v == '6'){
				return '<span>第一次产前随访</span>';
			}else if(v == '7'){
				return '<span>第2~5次产前随访</span>';
			}else if(v == '8'){
				return '<span>产后访视</span>';
			}else if(v == '9'){
				return '<span>产后42天访视</span>';
			}else if(v == '10'){
				return '<span>重性精神病随访</span>';
			}else if(v == '11'){
				return '<span>重性精神病信息补充</span>';
			}else if(v == '12'){
				return '<span>高血压随访</span>';
			}else if(v == '13'){
				return '<span>糖尿病随访</span>';
			}else if(v == '14'){
				return '<span>儿童保健册</span>';
			}else if(v == '15'){
				return '<span>孕产妇保健册</span>';
			}else if(v == '16'){
				return '<span>预防接种卡</span>';
			}else if(v == '17'){
				return '<span>疫苗接种信息</span>';
			}else{
				return '';
			}
		}
	}],
	winReaderConfig : [ {
		name : 'fileNo'
	}, {
		name : 'name'
	}, {
		name : 'personalInfo_sex',
		mapping : 'personalInfo.sex'
	}, {
		name : 'personalInfo_birthday',
		mapping : 'personalInfo.birthday'
	}, {
		name : 'personalInfo_idnumber',
		mapping : 'personalInfo.idnumber'
	}, {
		name : 'address'
	}, {
		name : 'personalInfo_linkman',
		mapping : 'personalInfo.linkman'
	}, {
		name : 'paperFileNo',
		mapping : 'paperFileNo'
	}, {
		name : 'personalInfo_tel',
		mapping : 'personalInfo.tel'
	},{
		name : 'township'
	},{
		name : 'village'
	} ],
	winLeftGridCmConfig : [ {
		"header" : "姓名",
		"dataIndex" : "name",
		"width" : 60
	}, {
		"header" : "性别",
		"dataIndex" : "personalInfo_sex",
		"width" : 50
	}, {
		"header" : "生日",
		"dataIndex" : "personalInfo_birthday",
		"renderer" : Ext.util.Format.dateRenderer('Y-m-d'),
		"width" : 80
	}, {
		"header" : "乡镇",
		"dataIndex" : "township",
		"width" : 80
	}, {
		"header" : "村委会",
		"dataIndex" : "village"
	} ],
	winGightGridCmConfig : [ {
		"header" : "姓名",
		"dataIndex" : "name",
		"width" : 60
	}, {
		"header" : "性别",
		"dataIndex" : "personalInfo_sex",
		"width" : 50
	}, {
		"header" : "生日",
		"dataIndex" : "personalInfo_birthday",
		"renderer" : Ext.util.Format.dateRenderer('Y-m-d'),
		"width" : 80
	}, {
		"header" : "乡镇",
		"dataIndex" : "township",
		"width" : 80
	}, {
		"header" : "村委会",
		"dataIndex" : "village"
	} ]
});

_tab = ModuleMgr.register(app.repeatFilesPanel);
