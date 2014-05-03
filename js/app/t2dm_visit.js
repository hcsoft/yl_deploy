Ext.ns("app");
app.t2dmVisitPanel = new Ext.tf.HealthPanel({
    title: '2型糖尿病患者随访',
    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : UserMenuTreeService.findDiabVisitRecords,
    deleteUrl : UserMenuTreeService.removeDiabVisitRecords,
    recordId : 'diab.id',
    recordPk : 'id',
    detailUrl: '/t2dm_visit.html',
    panelId : 'app.t2dmVisitPanel',
    readerConfig : [
                    {name:'execOrgName', mapping: 'org.name'},
                    {name:'id', mapping: 'diab.id'},
                    {name:'fileNo', mapping: 'file.fileNo'},
                    {name:'name', mapping: 'file.name'},
                    {name:'sex', mapping: 'person.sex'},
                    {name:'birthday', mapping: 'person.birthday'},
                    {name:'visitKind', mapping: 'diab.visitKind'},
                    {name:'visitDate', mapping: 'diab.visitDate'},
                    {name:'nextVistDate', mapping: 'diab.nextVistDate'},
                    {name:'visitDoctor', mapping: 'diab.visitDoctor'},
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
_tab = ModuleMgr.register(app.t2dmVisitPanel);