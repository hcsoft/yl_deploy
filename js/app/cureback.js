Ext.ns("app");

app.curebackPanel = new Ext.tf.HealthPanel({
    title: '双向转诊回转记录',
    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : UserMenuTreeService.findCurebackRecords,
    deleteUrl : UserMenuTreeService.removeCurebackRecords,
    panelId : 'app.curebackPanel',
    recordId : 'cureback.id',
    recordPk : 'id',
    detailUrl: '/cureback.html',
//    Select B.FileNo 编号,B.Name 姓名,C.Sex 性别,C.Birthday 出生日期,A.Date 回转日期,ExportOrg 转回医疗机构,
//    A.ReceptionDoctor 接诊医生,A.RecordNumber 住院病案号,D.UserName 录入人from CureBack A
//left join dbo.HealthFile B on A.FileNo = B.FileNo
//left join PersonalInfo C on A.FileNo = B.FileNo
//left join sam_taxempcode D on A.inputpersonId = D.loginname
    readerConfig : [
                    {name:'execOrgName', mapping: 'org.name'},
                    {name:'id', mapping: 'cureback.id'},
                    {name:'fileNo', mapping: 'file.fileNo'},
                    {name:'name', mapping: 'file.name'},
                    {name:'sex', mapping: 'person.sex'},
                    {name:'birthday', mapping: 'person.birthday'},
                    {name:'date', mapping: 'cureback.date'},
                    {name:'exportOrg', mapping: 'cureback.exportOrg'},
                    {name:'receptionDoctor', mapping: 'cureback.receptionDoctor'},
                    {name:'recordNumber', mapping: 'cureback.recordNumber'},
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
                     { "header" : "回转日期", "dataIndex" : "date", 
                                           "renderer": Ext.util.Format.dateRenderer('Y-m-d') }, 
                     { "header" : "转回医疗机构", "dataIndex" : "exportOrg" },
                     { "header" : "接诊医生", "dataIndex" : "receptionDoctor" },
                     { "header" : "住院病案号", "dataIndex" : "recordNumber" },
                     { "header" : "录入人", "dataIndex" : "username" }
                   ]
});
//_tab = ModuleMgr.register(app.curebackPanel);
ModuleMgr.register(app.curebackPanel);
