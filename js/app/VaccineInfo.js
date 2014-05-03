Ext.ns("app");

app.vaccineInfoPanel = new Ext.tf.HealthPanel({
    title: '预防免疫程序',
    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : UserMenuTreeService.findVaccineInfoRecords,
    deleteUrl : UserMenuTreeService.removeVaccineInfoRecords,

    recordId : 'vaccineInfo.id',
    recordPk : 'id',
    detailUrl: '/VaccineInfo.html',
    panelId : 'app.vaccineInfoPanel',
    readerConfig : [
                    {name:'id', mapping: 'vaccineInfo.id'},
                    {name:'fileNo', mapping: 'file.fileNo'},
                    {name:'name', mapping: 'file.name'},
                    {name:'sex', mapping: 'person.sex'},
                    {name:'birthday', mapping: 'person.birthday'},
                    {name:'idnumber', mapping: 'person.idnumber'},
                    {name:'address', mapping: 'file.address'}
                   ],
    gridCmConfig :
                   [
                     { "header" : "档案编号", "dataIndex" : "fileNo", "width":130 }, 
                     { "header" : "姓名", "dataIndex" : "name" }, 
                     { "header" : "性别", "dataIndex" : "sex" }, 
                     { "header" : "生日", "dataIndex" : "birthday", 
                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') }, 
                     { "header" : "身份证号", "dataIndex" : "idnumber" }, 
                     { "header" : "住址", "dataIndex" : "address" }
                   ]
});
//_tab = 
ModuleMgr.register(app.vaccineInfoPanel);
