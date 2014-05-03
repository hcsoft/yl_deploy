Ext.ns("app");

app.consultationPanel = new Ext.tf.HealthPanel({
    title: '会诊记录',
    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : UserMenuTreeService.findConsultationRecords,
    deleteUrl : UserMenuTreeService.removeConsultationRecords,

    recordId : 'consultation.id',
    recordPk : 'id',
    detailUrl: '/consultation.html',
    panelId : 'app.consultationPanel',
    readerConfig : [
                    {name:'execOrgName', mapping: 'org.name'},
                    {name:'id', mapping: 'consultation.id'},
                    {name:'fileNo', mapping: 'file.fileNo'},
                    {name:'name', mapping: 'file.name'},
                    {name:'sex', mapping: 'person.sex'},
                    {name:'birthday', mapping: 'person.birthday'},
                    {name:'idnumber', mapping: 'person.idnumber'},
                    {name:'address', mapping: 'file.address'}
                   ],
    gridCmConfig :
                   [
                    { "header" : "执行机构", "dataIndex" : "execOrgName"}, 
                     { "header" : "档案编号", "dataIndex" : "fileNo", "width":130 }, 
                     { "header" : "姓名", "dataIndex" : "name" }, 
                     { "header" : "性别", "dataIndex" : "sex" }, 
                     { "header" : "生日", "dataIndex" : "birthday", 
                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') }, 
                     { "header" : "身份证号", "dataIndex" : "idnumber" }, 
                     { "header" : "住址", "dataIndex" : "address" }
                   ]
});
//_tab = ModuleMgr.register(app.consultationPanel);
ModuleMgr.register(app.consultationPanel);
