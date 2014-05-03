Ext.ns("app");

app.infectionReportPanel = new Ext.tf.HealthPanel({
    title: '传染病报告卡',
    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : UserMenuTreeService.findInfectionReportRecords,
    deleteUrl : UserMenuTreeService.removeInfectionReportRecords,

    recordId : 'infectionReport.id',
    recordPk : 'id',
    detailUrl: '/InfectionReport.html',
    panelId : 'app.infectionReportPanel',
//    Select A.ReportID 编号,ReportType 报卡类别,A.Name 姓名,Sex 性别,Birthday 出生日期,GenearchName 家长姓名,CardID 身份证号,
//    A.FirstInfection 甲类传染病,SecondInfection 乙类传染病,ThirdInfection 丙类传染病,
//    A.ConfirmInfection 订正病名,ReportPerson 报告人,D.UserName 录入人,E.Name 上报医疗机构from InfectionReport A
//left join sam_taxempcode D on A.inputpersonId = D.loginname
//left join Organization E on A.OrgID = E.ID

    readerConfig : [
                    {name:'id', mapping: 'infectionReport.id'},
                    {name:'reportId', mapping: 'infectionReport.reportId'},
                    {name:'reportType', mapping: 'infectionReport.reportType'},
                    {name:'name', mapping: 'infectionReport.name'},
                    {name:'sex', mapping: 'infectionReport.sex'},
                    {name:'birthday', mapping: 'infectionReport.birthday'},
                    {name:'genearchName', mapping: 'infectionReport.genearchName'},
                    {name:'cardId', mapping: 'infectionReport.cardId'},
                    {name:'firstInfection', mapping: 'infectionReport.firstInfection'},
                    {name:'secondInfection', mapping: 'infectionReport.secondInfection'},
                    {name:'thirdInfection', mapping: 'infectionReport.thirdInfection'},
                    {name:'confirmInfection', mapping: 'infectionReport.confirmInfection'},
                    {name:'reportPerson', mapping: 'infectionReport.reportPerson'},
                    {name:'username', mapping: 'samTaxempcode.username'},
                    {name:'orgName', mapping: 'samTaxorgcode.name'}
                   ],
    gridCmConfig :
                   [
                     { "header" : "编号", "dataIndex" : "reportId" }, 
                     { "header" : "报卡类别", "dataIndex" : "reportType" }, 
                     { "header" : "姓名", "dataIndex" : "name" }, 
                     { "header" : "性别", "dataIndex" : "sex" }, 
                     { "header" : "出生日期", "dataIndex" : "birthday",
                                               "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
                     { "header" : "家长姓名", "dataIndex" : "genearchName" }, 
                     { "header" : "身份证号", "dataIndex" : "cardId" },
                     { "header" : "甲类传染病", "dataIndex" : "firstInfection" },
                     { "header" : "乙类传染病", "dataIndex" : "secondInfection" },
                     { "header" : "丙类传染病", "dataIndex" : "thirdInfection" },
                     { "header" : "订正病名", "dataIndex" : "confirmInfection" },
                     { "header" : "报告人", "dataIndex" : "reportPerson" },
                     { "header" : "录入人", "dataIndex" : "username" },
                     { "header" : "上报医疗机构", "dataIndex" : "orgName" }
                   ]
});
_tab = ModuleMgr.register(app.infectionReportPanel);
