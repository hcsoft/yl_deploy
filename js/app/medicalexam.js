Ext.ns("app");
app.medicalPanel = new Ext.tf.HealthPanel({
    title: '健康体检记录',
    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : UserMenuTreeService.findMedicalExamRecords,
    deleteUrl : UserMenuTreeService.removeMedicalExamRecords,
    recordId : 'medicalExam.id',
    recordPk : 'id',
    detailUrl: '/medicalExam.html',
    dataExportUrl : '健康体检记录导出',
    panelId : 'app.medicalPanel',
    isPrintMedicalExam : true,
//    Select B.FileNo 编号,B.Name 姓名,C.Sex 性别,C.Birthday 出生日期,A.ExamDate 体检日期,
//    A.Doctor 责任医生,D.UserName 录入人from MedicalExam A
//    left join dbo.HealthFile B on A.FileNo = B.FileNo
//    left join PersonalInfo C on A.FileNo = B.FileNo
//    left join sam_taxempcode D on A.inputpersonId = D.loginname

    readerConfig : [
                    {name:'execOrgName', mapping: 'org.name'},
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
                    { "header" : "执行机构", "dataIndex" : "execOrgName"}, 
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
_tab = ModuleMgr.register(app.medicalPanel);