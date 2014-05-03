Ext.ns("app");
app.hypVisitPanel = new Ext.tf.HealthPanel({
    title: '高血压患者随访',
    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : UserMenuTreeService.findHypVisitRecords,
    deleteUrl : UserMenuTreeService.removeHypVisitRecords,
    recordId : 'hyp.id',
    recordPk : 'id',
    detailUrl: '/hyp_visit.html',
    panelId : 'app.hypVisitPanel',
//    Select A.FileNo 编号,B.Name 姓名,C.sex 性别,C.Birthday 出生日期,A.VisitKind 随访方式,
//    A.VisitDate 随访日期,A.NextVistDate 下次随访日期,A.VisitDoctor 随访医生,D.UserName 录入人from HypertensionVisit A
//    left join dbo.HealthFile B on A.FileNo = B.FileNo
//    left join PersonalInfo C on A.FileNo = B.FileNo
//    left join sam_taxempcode D on A.inputpersonId = D.loginname
    readerConfig : [
                    {name:'execOrgName', mapping: 'org.name'},
                    {name:'id', mapping: 'hyp.id'},
                    {name:'fileNo', mapping: 'file.fileNo'},
                    {name:'name', mapping: 'file.name'},
                    {name:'sex', mapping: 'person.sex'},
                    {name:'birthday', mapping: 'person.birthday'},
                    {name:'visitKind', mapping: 'hyp.visitKind'},
                    {name:'visitDate', mapping: 'hyp.visitDate'},
                    {name:'nextVistDate', mapping: 'hyp.nextVistDate'},
                    {name:'visitDoctor', mapping: 'hyp.visitDoctor'},
                    {name:'username', mapping: 'samTaxempcode.username'}
                   ],
    gridCmConfig :
                   [
                    { "header" : "执行机构", "dataIndex" : "execOrgName"}, 
                     { "header" : "编号", "dataIndex" : "fileNo", "width":130 },
                     { "header" : "姓名", "dataIndex" : "name" },
                     { "header" : "性别", "dataIndex" : "sex" },
                     { "header" : "出生日期", "dataIndex" : "birthday",
                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
                     { "header" : "随访方式", "dataIndex" : "visitKind" },
                     { "header" : "随访日期", "dataIndex" : "visitDate",
                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
                     { "header" : "下次随访日期", "dataIndex" : "nextVistDate",
                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
                     { "header" : "随访医生", "dataIndex" : "visitDoctor" },
                     { "header" : "录入人", "dataIndex" : "username" }
                   ]
});
_tab = ModuleMgr.register(app.hypVisitPanel);
