Ext.ns("app");
app.furiousVisitPanel = new Ext.tf.HealthPanel({
    title: '重性精神疾病患者随访',
    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : UserMenuTreeService.findFuriousVisitRecords,
    deleteUrl : UserMenuTreeService.removeFuriousVisitRecords,
    recordId : 'furiousVisit.id',
    recordPk : 'id',
    detailUrl: '/furious_visit.html',
    panelId : 'app.furiousVisitPanel',
    readerConfig : [
                    {name:'execOrgName', mapping: 'org.name'},
                    {name:'id', mapping: 'furiousVisit.id'},
                    {name:'fileNo', mapping: 'file.fileNo'},
                    {name:'name', mapping: 'file.name'},
                    {name:'sex', mapping: 'person.sex'},
                    {name:'birthday', mapping: 'person.birthday'},
                    {name:'visitDate', mapping: 'furiousVisit.visitDate'},
                    {name:'nextVistDate', mapping: 'furiousVisit.nextVistDate'},
                    {name:'visitDoctor', mapping: 'furiousVisit.visitDoctor'},
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
                     { "header" : "随访日期", "dataIndex" : "visitDate",
                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
                     { "header" : "下次随访日期", "dataIndex" : "nextVistDate",
                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
                     { "header" : "随访医生", "dataIndex" : "visitDoctor" },
                     { "header" : "录入人", "dataIndex" : "username" }
                   ]
});
_tab = ModuleMgr.register(app.furiousVisitPanel);