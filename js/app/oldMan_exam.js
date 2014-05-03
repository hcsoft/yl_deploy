Ext.ns("app");
app.oldManExamPanel = new Ext.tf.HealthPanel({
    title: '健康体检记录',
    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : UserMenuTreeService.findOldManExamRecords,
    deleteUrl : UserMenuTreeService.removeMedicalExamRecords,
    recordId : 'medicalExam.id',
    recordPk : 'id',
    detailUrl: '/medicalExam_old.html',
    panelId : 'app.oldManExamPanel',
    readerConfig : [
                    {name:'id', mapping: 'medicalExam.id'},
                    {name:'fileNo', mapping: 'file.fileNo'},
                    {name:'name', mapping: 'file.name'},
                    {name:'sex', mapping: 'person.sex'},
                    {name:'birthday', mapping: 'person.birthday'},
                    {name:'examDate', mapping: 'medicalExam.examDate'},
                    {name:'doctor', mapping: 'medicalExam.doctor'},
                    {name:'username', mapping: 'samTaxempcode.username'}
                   ],
    gridCmConfig :
                   [
                     { "header" : "编号", "dataIndex" : "fileNo", "width":130 },
                     { "header" : "姓名", "dataIndex" : "name" },
                     { "header" : "性别", "dataIndex" : "sex" },
                     { "header" : "出生日期", "dataIndex" : "birthday",
                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
                     { "header" : "体检日期", "dataIndex" : "examDate",
                                           "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
                     { "header" : "责任医生", "dataIndex" : "doctor" },
                     { "header" : "录入人", "dataIndex" : "username" }
                   ]
});
_tab = ModuleMgr.register(app.oldManExamPanel);