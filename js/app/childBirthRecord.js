Ext.ns("app");

app.birthChildRecordPanel = new Ext.tf.HealthPanel({
    title: '分娩记录',
    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : UserMenuTreeService.findBirthChildRecords,
    deleteUrl : UserMenuTreeService.removeBirthChildRecords,
//    dataExportUrl : DataExportService.dataExportChildExam2,
    recordId : 'birthRecord.id',
    recordPk : 'id',
    detailUrl: '/birthChildRecord.html',
    panelId : 'app.birthChildRecordPanel',
    readerConfig : [
                    {name:'execOrgName', mapping: 'org.name'},
                    {name:'id', mapping: 'birthRecord.id'},
                    {name:'fileNo', mapping: 'file.fileNo'},
                    {name:'name', mapping: 'file.name'},
                    {name:'sex', mapping: 'person.sex'},
                    {name:'birthday', mapping: 'person.birthday'},
                    {name:'highRisk', mapping: 'birthRecord.criticalWoman'},
                    {name:'birthRecordDate', mapping: 'birthRecord.birthRecordDate'},
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

                     { "header" : "高危", "dataIndex" : "highRisk" }, 
                     { "header" : "分娩日期", "dataIndex" : "birthRecordDate" }, 
                     { "header" : "录入人", "dataIndex" : "username" }
                   ]
});
//_tab = ModuleMgr.register(app.childexam2Panel);
ModuleMgr.register(app.birthChildRecordPanel);
