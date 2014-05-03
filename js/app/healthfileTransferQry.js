Ext.ns("app");

app.healthfileTransferQryPanel = new Ext.tf.HealthTransferLoginOffPanel({
	treeLoaderFn : UserMenuTreeService.getUserDistrictNodes,
	queryUrl : UserMenuTreeService.getTransferHealthfile,
	panelId : 'healthfileTransferQry',
	type : 2,
	flowType : '1',
	gridId : 'healthfileTransferQryGridId',
	title : '居民健康档案',
	contextmenuToggle : true,
	readerConfig : [ {
		name : 'id',
		mapping : 'trans.id'
	}, {
		name : 'fromFileNo',
		mapping : 'trans.fromFileNo'
	}, {
		name : 'name',
		mapping : 'trans.name'
	}, {
		name : 'personalInfo_sex',
		mapping : 'trans.sex'
	}, {
		name : 'personalInfo_birthday',
		mapping : 'trans.birthday'
	}, {
		name : 'personalInfo_idnumber',
		mapping : 'trans.idNumber'
	}, {
		name : 'address',
		mapping : 'trans.address'
	},{
		name : 'isSure',
		mapping : 'trans.isSure'
	},{
		name : 'toFileNo',
		mapping : 'trans.toFileNo'
	},{
		name : 'districtVillage',
		mapping : 'district.name'
	},{
		name : 'districtTownship',
		mapping : 'district.parentName'
	} ],
	gridCmConfig : [ {
		"header" : "状态",
		"dataIndex" : "isSure",
		"renderer" : function(v){
			if(v == '0' || v == null){
				return '未审核';
			}else if(v == '1'){
				return '已审核';
			}else{
				return '已退回';
			}
		},
		"width" : 80
	}, {
		"header" : "老档案编号",
		"dataIndex" : "fromFileNo",
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
	}, {
		"header" : "新档案编号",
		"dataIndex" : "toFileNo",
		"width" : 200
	}]
});

_tab = ModuleMgr.register(app.healthfileTransferQryPanel);
