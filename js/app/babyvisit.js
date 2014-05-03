Ext.ns("app");

app.babyvisitPanel = new Ext.tf.HealthPanel({
	title : '新生儿家庭访视记录',
	treeLoaderFn : UserMenuTreeService.getUserDistrictNodes,
	queryUrl : UserMenuTreeService.findBabyVisitRecords,
	deleteUrl : UserMenuTreeService.removeBabyVisitRecords,
	dataExportUrl : DataExportService.dataExportBabyVisit,
	recordId : 'child.id',
	recordPk : 'id',
	detailUrl : '/babyvisit.html',
	panelId : 'app.babyvisitPanel',
	// Select A.FileNo 编号,B.Name 姓名,A.Sex 性别,A.Birthday 出生日期,VisitDate 访视日期,
	// A.NextVisitPlace 下次访视地点,A.NextVisitDate 下次访视日期,VisitDoctor 随访医生,
	// D.UserName 录入人from BabyVisit A
	// left join dbo.HealthFile B on A.FileNo = B.FileNo
	// left join sam_taxempcode D on A.inputpersonId = D.loginname
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
		name : 'nextVisitPlace',
		mapping : 'child.nextVisitPlace'
	}, {
		name : 'nextVisitDate',
		mapping : 'child.nextVisitDate'
	}, {
		name : 'visitDoctor',
		mapping : 'child.visitDoctor'
	}, {
		name : 'fname',
		mapping : 'child.fname'
	}, {
		name : 'fphone',
		mapping : 'child.fphone'
	}, {
		name : 'mname',
		mapping : 'child.mname'
	}, {
		name : 'mphone',
		mapping : 'child.mphone'
	}, {
		name : 'address',
		mapping : 'child.address'
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
	}, {
		"header" : "高危",
		"dataIndex" : "highRisk"
	}, {
		"header" : "父亲姓名",
		"dataIndex" : "fname"
	}, {
		"header" : "父亲电话",
		"dataIndex" : "fphone"
	}, {
		"header" : "母亲姓名",
		"dataIndex" : "mname"
	}, {
		"header" : "母亲电话",
		"dataIndex" : "mphone"
	}, {
		"header" : "家庭住址",
		"dataIndex" : "address"
	}, {
		"header" : "访视日期",
		"dataIndex" : "visitDate",
		"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
	}, {
		"header" : "下次访视地点",
		"dataIndex" : "nextVisitPlace"
	}, {
		"header" : "下次访视日期",
		"dataIndex" : "nextVisitDate",
		"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
	}, {
		"header" : "随访医生",
		"dataIndex" : "visitDoctor"
	}, {
		"header" : "录入人",
		"dataIndex" : "username"
	} ]
});
// _tab = ModuleMgr.register(app.babyvisitPanel);
ModuleMgr.register(app.babyvisitPanel);
