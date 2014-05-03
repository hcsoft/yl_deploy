Ext.ns("app");

app.childexam36Panel = new Ext.tf.HealthPanel({
	title : '3~6岁儿童体检记录',
	treeLoaderFn : UserMenuTreeService.getUserDistrictNodes,
	queryUrl : UserMenuTreeService.findChildExam36Records,
	deleteUrl : UserMenuTreeService.removeChildExam36Records,
	dataExportUrl : DataExportService.dataExportChildExam36,
	recordId : 'child.id',
	recordPk : 'id',
	detailUrl : '/childexam3_6.html',
	visitDoctor : 'visitDoctor',
	panelId : 'app.childexam36Panel',
	readerConfig : [ {
		name : 'execOrgName',
		mapping : 'org.name'
	}, {
		name : 'id',
		mapping : 'child.id'
	}, {
		name : 'fileNo',
		mapping : 'file.fileNo'
	}, {
		name : 'name',
		mapping : 'file.name'
	}, {
		name : 'sex',
		mapping : 'person.sex'
	}, {
		name : 'birthday',
		mapping : 'person.birthday'
	}, {
		name : 'highRisk',
		mapping : 'child.highRisk'
	}, {
		name : 'visitDate',
		mapping : 'child.visitDate'
	}, {
		name : 'visitDoctor',
		mapping : 'child.visitDoctor'
	}, {
		name : 'hemoglobin',
		mapping : 'child.hemoglobin'
	}, {
		name : 'username',
		mapping : 'samTaxempcode.username'
	} ],
	gridCmConfig : [ {
		"header" : "执行机构",
		"dataIndex" : "execOrgName"
	}, {
		"header" : "编号",
		"dataIndex" : "fileNo",
		"width" : 130
	}, {
		"header" : "姓名",
		"dataIndex" : "name"
	}, {
		"header" : "性别",
		"dataIndex" : "sex"
	}, {
		"header" : "出生日期",
		"dataIndex" : "birthday",
		"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
	},

	{
		"header" : "高危",
		"dataIndex" : "highRisk"
	}, {
		"header" : "血红蛋白值",
		"dataIndex" : "hemoglobin"
	}, {
		"header" : "随访日期",
		"dataIndex" : "visitDate",
		"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
	}, {
		"header" : "随访医生",
		"dataIndex" : "visitDoctor"
	}, {
		"header" : "录入人",
		"dataIndex" : "username"
	} ]
});
// _tab = ModuleMgr.register(app.childexam3Panel);
ModuleMgr.register(app.childexam36Panel);
