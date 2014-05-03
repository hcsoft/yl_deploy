Ext.ns("app");
app.firstvisitPanel = new Ext.tf.HealthPanel({
    title: '第一次产前随访记录',
    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : UserMenuTreeService.findFirstVisitRecords,
    deleteUrl : UserMenuTreeService.removeFirstVisitRecords,
    dataExportUrl : DataExportService.dataExportFirstBabyVisit,
    recordId : 'firstVisit.id',
    recordPk : 'id',
    detailUrl: '/firstvisit.html',
    panelId : 'app.firstvisitPanel',
    isWomanExam : true,
//    Select A.FileNo 编号,B.Name 姓名,C.Birthday 出生日期,Weeks 孕周,A.VisitDate 随访日期,
//    A.NextVisitDate 下次随访日期,A.VisitDoctor 随访医生,D.UserName 录入人from FirstVistBeforeBorn A
//    left join dbo.HealthFile B on A.FileNo = B.FileNo
//    left join PersonalInfo C on A.FileNo = B.FileNo
//    left join sam_taxempcode D on A.inputpersonId = D.loginname
    readerConfig : [
                    {name:'execOrgName', mapping: 'org.name'},
                    {name:'id', mapping: 'firstVisit.id'},
                    {name:'fileNo', mapping: 'file.fileNo'},
                    {name:'name', mapping: 'file.name'},
                    {name:'birthday', mapping: 'person.birthday'},
                    {name:'highRisk', mapping: 'firstVisit.highRisk'},
                    {name:'weeks', mapping: 'firstVisit.weeks'},
                    {name:'visitDate', mapping: 'firstVisit.visitDate'},
                    {name:'nextVisitDate', mapping: 'firstVisit.nextVisitDate'},
                    {name:'visitDoctor', mapping: 'firstVisit.visitDoctor'},
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
                     { "header" : "孕周", "dataIndex" : "weeks" },
                     { "header" : "随访日期", "dataIndex" : "visitDate",
                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
                     { "header" : "下次随访日期", "dataIndex" : "nextVisitDate",
                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
                     { "header" : "随访医生", "dataIndex" : "visitDoctor" },
                     { "header" : "录入人", "dataIndex" : "username" }
                   ]
});
//_tab = ModuleMgr.register(app.firstvisitPanel);
ModuleMgr.register(app.firstvisitPanel);