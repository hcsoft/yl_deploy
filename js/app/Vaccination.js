Ext.ns("app");

app.vaccinationPanel = new Ext.tf.HealthPanel({
    title: '预防接种卡',
    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : UserMenuTreeService.findVaccinationRecords,
    deleteUrl : UserMenuTreeService.removeVaccinationRecords,

    recordId : 'vaccination.id',
    recordPk : 'id',
    detailUrl: '/Vaccination.html',
    panelId : 'app.vaccinationPanel',
    readerConfig : [
                    {name:'execOrgName', mapping: 'org.name'},
                    {name:'id', mapping: 'vaccination.id'},
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
_tab = ModuleMgr.register(app.vaccinationPanel);
