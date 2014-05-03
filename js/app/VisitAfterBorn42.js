Ext.ns("app");
app.visitAfterBorn42Panel = new Ext.tf.HealthPanel({
    title: '产后42天健康检查记录',
    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : UserMenuTreeService.findVisitAfterBorn42Records,
    deleteUrl : UserMenuTreeService.removeVisitAfterBornRecords,
    dataExportUrl : DataExportService.dataExportVisitAfterBorn42,
    recordId : 'visit.id',
    recordPk : 'id',
    detailUrl: '/visitAfterBorn42.html',
    panelId : 'app.visitAfterBorn42Panel',
    isWomanExam : true,
    readerConfig : [
                    {name:'execOrgName', mapping: 'org.name'},
                    {name:'id', mapping: 'visit.id'},
                    {name:'fileNo', mapping: 'file.fileNo'},
                    {name:'name', mapping: 'file.name'},
                    {name:'birthday', mapping: 'person.birthday'},
                    {name:'highRisk', mapping: 'visit.highRisk'},
                    {name:'visitDate', mapping: 'visit.visitDate'},
                    {name:'result', mapping: 'visit.result'},
                    {name:'visitDoctor', mapping: 'visit.visitDoctor'},
                    {name:'username', mapping: 'samTaxempcode.username'}
                   ],
    gridCmConfig :
                   [
                    { "header" : "执行机构", "dataIndex" : "execOrgName"},
                     { "header" : "编号", "dataIndex" : "fileNo", "width":130 },
                     { "header" : "姓名", "dataIndex" : "name" },
                     { "header" : "出生日期", "dataIndex" : "birthday",
                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
                                         { "header" : "高危", "dataIndex" : "highRisk" },
                     { "header" : "随访日期", "dataIndex" : "visitDate",
                                           "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
                     { "header" : "分类", "dataIndex" : "result" },
                     { "header" : "随访医生", "dataIndex" : "visitDoctor" },
                     { "header" : "录入人", "dataIndex" : "username" }
                   ]
});
_tab = ModuleMgr.register(app.visitAfterBorn42Panel);