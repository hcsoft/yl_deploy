Ext.ns("app");

app.childexam3Panel = new Ext.tf.HealthPanel({
    title: '3岁儿童体检记录',
    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : UserMenuTreeService.findChildExam3Records,
    deleteUrl : UserMenuTreeService.removeChildExam3Records,

    recordId : 'child.id',
    recordPk : 'id',
    detailUrl: '/childexam3.html',

    readerConfig : [
                    {name:'id', mapping: 'child.id'},
                    {name:'fileNo', mapping: 'file.fileNo'},
                    {name:'name', mapping: 'file.name'},
                    {name:'sex', mapping: 'person.sex'},
                    {name:'birthday', mapping: 'person.birthday'},
                    {name:'visitDate', mapping: 'child.visitDate'},
                    {name:'visitDoctor', mapping: 'child.visitDoctor'},
                    {name:'username', mapping: 'samTaxempcode.username'}
                   ],
    gridCmConfig :
                   [
                     { "header" : "编号", "dataIndex" : "fileNo", "width":130 }, 
                     { "header" : "姓名", "dataIndex" : "name" }, 
                     { "header" : "性别", "dataIndex" : "sex" }, 
                     { "header" : "出生日期", "dataIndex" : "birthday", 
                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') }, 
                     { "header" : "随访日期", "dataIndex" : "visitDate", 
                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') }, 
                     { "header" : "随访医生", "dataIndex" : "visitDoctor" },
                     { "header" : "录入人", "dataIndex" : "username" }
                   ]
});
//_tab = ModuleMgr.register(app.childexam3Panel);
ModuleMgr.register(app.childexam3Panel);
