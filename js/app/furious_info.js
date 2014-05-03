Ext.ns("app");
app.furiousInfoPanel = new Ext.tf.HealthPanel({
    title: '重性精神疾病个人信息补充',
    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : UserMenuTreeService.findFuriousInfoRecords,
    deleteUrl : UserMenuTreeService.removeFuriousInfoRecords,
    recordId : 'furiousInfo.id',
    recordPk : 'id',
    detailUrl: '/furious_info.html',
    panelId : 'app.furiousInfoPanel',
//    Select A.FileNo 编号,B.Name 姓名,C.sex 性别,C.Birthday 出生日期,GuardianName 监护人姓名,
//    A.Relation 与患者关系,A.Doctor 医生,D.UserName 录入人from dbo.FuriousInfo A
//left join dbo.HealthFile B on A.FileNo = B.FileNo
//left join PersonalInfo C on A.FileNo = B.FileNo
//left join sam_taxempcode D on A.inputpersonId = D.loginname
    readerConfig : [
                    {name:'execOrgName', mapping: 'org.name'},
                    {name:'id', mapping: 'furiousInfo.id'},
                    {name:'fileNo', mapping: 'file.fileNo'},
                    {name:'name', mapping: 'file.name'},
                    {name:'sex', mapping: 'person.sex'},
                    {name:'birthday', mapping: 'person.birthday'},
                    {name:'guardianName', mapping: 'furiousInfo.guardianName'},
                    {name:'relation', mapping: 'furiousInfo.relation'},
                    {name:'doctor', mapping: 'furiousInfo.doctor'},
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
                     { "header" : "监护人姓名", "dataIndex" : "guardianName" },
                     { "header" : "与患者关系", "dataIndex" : "relation" },
                     { "header" : "医生", "dataIndex" : "doctor" },
                     { "header" : "录入人", "dataIndex" : "username" }
                   ]
});
_tab = ModuleMgr.register(app.furiousInfoPanel);