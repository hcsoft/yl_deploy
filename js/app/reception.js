Ext.ns("app");

app.receptionPanel = new Ext.tf.HealthPanel({
    title: '接诊记录',
    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : UserMenuTreeService.findReceptionRecords,
    deleteUrl : UserMenuTreeService.removeReceptionRecords,
    panelId : 'app.receptionPanel',
    recordId : 'reception.id',
    recordPk : 'id',
    detailUrl: '/reception.html',
//    Select B.FileNo 编号,B.Name 姓名,C.Sex 性别,C.Birthday 出生日期,A.Date 接诊日期,
//    E.Name 医疗机构,A.Doctor 接诊医生,D.UserName 录入人from Reception A
    readerConfig : [
                    {name:'execOrgName', mapping: 'org.name'},
                    {name:'id', mapping: 'reception.id'},
                    {name:'fileNo', mapping: 'file.fileNo'},
                    {name:'name', mapping: 'file.name'},
                    {name:'sex', mapping: 'person.sex'},
                    {name:'birthday', mapping: 'person.birthday'},
                    {name:'date', mapping: 'reception.date'},
                    {name:'orgName', mapping: 'org.name'},
                    {name:'doctor', mapping: 'reception.doctor'},
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
                     { "header" : "接诊日期", "dataIndex" : "date", 
                                           "renderer": Ext.util.Format.dateRenderer('Y-m-d') },  
                     { "header" : "医疗机构", "dataIndex" : "orgName" },
                     { "header" : "接诊医生", "dataIndex" : "doctor" },
                     { "header" : "录入人", "dataIndex" : "username" }
                   ]
});
_tab = ModuleMgr.register(app.receptionPanel);
