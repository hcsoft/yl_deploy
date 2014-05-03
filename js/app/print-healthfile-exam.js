Ext.ns("app");

app.printhealthfileAndExam = new Ext.tf.PrintHealthFileExamPanel({
	treeLoaderFn : UserMenuTreeService.getUserDistrictNodes,
	queryUrl : UserMenuTreeService.findHealthFiles,
	queryUrl01 : UserMenuTreeService.findMedicalExamRecords,
	title : '居民健康档案及健康体检记录打印',
	recordId : 'id',
	recordPk : 'id',
	judgeCondId : 'isClosed',
	judgeCondVal : '0',
	panelId : 'app.printhealthfileAndExam',
	readerConfig : [ {
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
	} ],
	gridCmConfig : [ {
		"header" : "状态",
		renderer : addTooltip,
		"width" : 80
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
		"header" : "联系人",
		"dataIndex" : "personalInfo_linkman"
	}, {
		"header" : "住址",
		"dataIndex" : "address"
	}, {
		"header" : "纸质档案号",
		"dataIndex" : "paperFileNo"
	}, {
		"header" : "电话",
		"dataIndex" : "personalInfo_tel"
	}, {
		"header" : "建档医生",
		"dataIndex" : "personalInfo_tel"
	} ],

	readerConfig01 : [  {name:'execOrgName', mapping: 'org.name'},
	                    {name:'id', mapping: 'medicalExam.id'},
	                    {name:'fileNo', mapping: 'file.fileNo',"width" : 200},
	                    {name:'name', mapping: 'file.name'},
	                    {name:'sex', mapping: 'person.sex'},
	                    {name:'birthday', mapping: 'person.birthday'},
	                    {name:'examDate', mapping: 'medicalExam.examDate'},
	                    {name:'doctor', mapping: 'medicalExam.doctor'},
	                    {name:'username', mapping: 'samTaxempcode.username'}],
	gridCmConfig01 : [ { "header" : "执行机构", "dataIndex" : "execOrgName"}, 
	                     { "header" : "编号", "dataIndex" : "fileNo", "width":130 },
	                     { "header" : "姓名", "dataIndex" : "name" },
	                     { "header" : "性别", "dataIndex" : "sex" },
	                     { "header" : "出生日期", "dataIndex" : "birthday",
	                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
	                     { "header" : "体检日期", "dataIndex" : "examDate",
	                                           "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
	                     { "header" : "责任医生", "dataIndex" : "doctor" },
	                     { "header" : "录入人", "dataIndex" : "username" }]
});

_tab = ModuleMgr.register(app.printhealthfileAndExam);
