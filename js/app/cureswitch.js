Ext.ns("app");

app.cureswitchPanel = new Ext.tf.HealthPanel({
    title: '双向转诊记录',
    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : UserMenuTreeService.findCureswitchRecords,
    deleteUrl : UserMenuTreeService.removeCureswitchRecords,
    panelId : 'app.cureswitchPanel',
    recordId : 'cureswitch.id',
    recordPk : 'id',
    detailUrl: '/cureswitch.html',
//    Select B.FileNo 编号,B.Name 姓名,C.Sex 性别,C.Birthday 出生日期,A.Date 转诊日期,E.Name 转出机构,
//    A.Doctor 转诊医生,A.ExportOrg 转入机构,A.ExportDepartment 转入科室,A.ReceptionDoctor 接诊医生,D.UserName 录入人from CureSwitch A
//left join dbo.HealthFile B on A.FileNo = B.FileNo
//left join PersonalInfo C on A.FileNo = B.FileNo
//left join sam_taxempcode D on A.inputpersonId = D.loginname
//left join Organization E on A.OrgID = E.ID
    readerConfig : [
                    {name:'execOrgName', mapping: 'org.name'},
                    {name:'id', mapping: 'cureswitch.id'},
                    {name:'fileNo', mapping: 'file.fileNo'},
                    {name:'name', mapping: 'file.name'},
                    {name:'sex', mapping: 'person.sex'},
                    {name:'birthday', mapping: 'person.birthday'},
                    {name:'date', mapping: 'cureswitch.date'},
                    {name:'fromOrgName', mapping: 'org.name'},
                    {name:'doctor', mapping: 'cureswitch.doctor'},
                    {name:'exportOrg', mapping: 'cureswitch.exportOrg'},
                    {name:'exportDepartment', mapping: 'cureswitch.exportDepartment'},
                    {name:'receptionDoctor', mapping: 'cureswitch.receptionDoctor'},
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
                     { "header" : "转诊日期", "dataIndex" : "date", 
                                           "renderer": Ext.util.Format.dateRenderer('Y-m-d') }, 
                     { "header" : "转出机构", "dataIndex" : "fromOrgName" },
                     { "header" : "转诊医生", "dataIndex" : "doctor" },
                     { "header" : "转入机构", "dataIndex" : "exportOrg" },
                     { "header" : "转入科室", "dataIndex" : "exportDepartment" },
                     { "header" : "接诊医生", "dataIndex" : "receptionDoctor" },
                     { "header" : "录入人", "dataIndex" : "username" }
                   ]
});
//_tab = ModuleMgr.register(app.cureswitchPanel);
ModuleMgr.register(app.cureswitchPanel);
