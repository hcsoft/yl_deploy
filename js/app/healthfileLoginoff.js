Ext.ns("app");

app.healthfileLoginoffPanel = new Ext.tf.HealthTransferLoginOffPanel({
	treeLoaderFn : UserMenuTreeService.getUserDistrictNodes,
	queryUrl : UserMenuTreeService.HealthFileLoginOff,
	panelId : 'healthfileLoginOff',
	type : 1,
	gridId : 'healthfileLoginOffGridId',
	title : '居民健康档案',
	readerConfig : [ {
		name : 'id',
		mapping : 'loginoff.id'
	}, {
		name : 'fileNo',
		mapping : 'file.fileNo'
	}, {
		name : 'name',
		mapping : 'file.name'
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
	}, {
		name : 'status',
		mapping : 'basicInfo.name'
	}, {
		name : 'loginoffDate',
		mapping : 'loginoff.loginOffDate'
	} ],
	gridCmConfig : [ {
		"header" : "注销原因",
		"dataIndex" : "status",
		"width" : 120
	},{
		"header" : "注销时间",
		"dataIndex" : "loginoffDate",
		"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
	}, {
		"header" : "档案编号",
		"dataIndex" : "fileNo",
		"width" : 200
	}, {
		"header" : "姓名",
		"dataIndex" : "name"
	}, {
		"header" : "性别",
		"dataIndex" : "personalInfo_sex",
		"width" : 50
	}, {
		"header" : "生日",
		"dataIndex" : "personalInfo_birthday",
		"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
	}, {
		"header" : "身份证号",
		"dataIndex" : "personalInfo_idnumber"
	}, {
		"header" : "住址",
		"dataIndex" : "address"
	} ]
});

_tab = ModuleMgr.register(app.healthfileLoginoffPanel);
