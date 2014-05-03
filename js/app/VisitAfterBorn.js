Ext.ns("app");
app.visitAfterBornPanel = new Ext.tf.HealthPanel({
    title: '产后访视记录',
    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : UserMenuTreeService.findVisitAfterBornRecords,
    deleteUrl : UserMenuTreeService.removeVisitAfterBornRecords,
    dataExportUrl : DataExportService.dataExportVisitAfterBorn,
    recordId : 'visit.id',
    recordPk : 'id',
    detailUrl: '/visitAfterBorn.html',
    panelId : 'app.visitAfterBornPanel',
    isWomanExam : true,
//    Select A.FileNo 编号,B.Name 姓名,C.Birthday 出生日期,A.VisitDate 随访日期,Result 分类,
//    A.NextVisitDate 下次随访日期,A.VisitDoctor 随访医生,D.UserName 录入人from VisitAfterBorn A
//    left join dbo.HealthFile B on A.FileNo = B.FileNo
//    left join PersonalInfo C on A.FileNo = B.FileNo
//    left join sam_taxempcode D on A.inputpersonId = D.loginnam
    readerConfig : [
                    {name:'execOrgName', mapping: 'org.name'},
                    {name:'id', mapping: 'visit.id'},
                    {name:'fileNo', mapping: 'file.fileNo'},
                    {name:'name', mapping: 'file.name'},
                    {name:'birthday', mapping: 'person.birthday'},
                    {name:'highRisk', mapping: 'visit.highRisk'},
                    {name:'visitDate', mapping: 'visit.visitDate'},
                    {name:'result', mapping: 'visit.result'},
                    {name:'nextVisitDate', mapping: 'visit.nextVisitDate'},
                    {name:'visitDoctor', mapping: 'visit.visitDoctor'},
                    {name:'username', mapping: 'samTaxempcode.username'}
                   ],
    gridCmConfig :
                   [
                    { "header" : "执行机构", "dataIndex" : "execOrgName"}, 
                     { "header" : "编号", "dataIndex" : "fileNo", "width":130 },
                     { "header" : "姓名", "dataIndex" : "name" },
                     { "header" : "出生日期", "dataIndex" : "birthday",
                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
                                         { "header" : "高危", "dataIndex" : "highRisk" },
                     { "header" : "随访日期", "dataIndex" : "visitDate",
                                           "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
                     { "header" : "分类", "dataIndex" : "result" },
                     { "header" : "下次随访日期", "dataIndex" : "nextVisitDate",
                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
                     { "header" : "随访医生", "dataIndex" : "visitDoctor" },
                     { "header" : "录入人", "dataIndex" : "username" }
                   ]
});
_tab = ModuleMgr.register(app.visitAfterBornPanel);