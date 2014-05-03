Ext.ns("app");

app.childdeath02Panel = new Ext.tf.HealthPanel({
    title: '5岁以下儿童死亡调查表',
    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : UserMenuTreeService.findChildDeath02Records,
    deleteUrl : UserMenuTreeService.removeChildDeath02Records,
//    dataExportUrl : DataExportService.dataExportBabyVisit,
    recordId : 'child.id',
    recordPk : 'id',
    detailUrl: '/childDeath02.html',
    panelId : 'app.childdeath01Panel',
    readerConfig : [
                    {name:'execOrgName', mapping: 'org.name'},
                    {name:'id', mapping: 'child.id'},
                    {name:'fileNo', mapping: 'file.fileNo'},
                    {name:'name', mapping: 'file.name'},
                    {name:'sex', mapping: 'person.sex'},
                    {name:'birthday', mapping: 'person.birthday'},
                    {name:'tunit', mapping: 'child.tunit'},
                    {name:'toptPerson', mapping: 'child.toptPerson'},
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
                     { "header" : "填表单位", "dataIndex" : "tunit" },
                     { "header" : "填表人", "dataIndex" : "toptPerson" }, 
                     { "header" : "录入人", "dataIndex" : "username" }
                   ]
});
//_tab = ModuleMgr.register(app.babyvisitPanel);
ModuleMgr.register(app.childdeath02Panel);
