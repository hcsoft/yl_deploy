Ext.ns("app");

app.statPanel = new Ext.tf.HealthPanel({
    title: '工作月报表',
    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : UserMenuTreeService.findStats,
    deleteUrl : UserMenuTreeService.removeStats,

    recordId : 'id',
    recordPk : 'id',
    detailUrl: '/stat.html',
    panelId : 'app.statPanel',
    checkLastLevel: false,

    readerConfig : [
                    {name:'id', mapping: 'id'},
                    {name:'reportMonth', mapping: 'reportMonth'},
                    {name:'org', mapping: 'org'},
                    {name:'reporter', mapping: 'reporter'}
                   ],
    gridCmConfig :
                   [
                     { "header" : "报告月份", "dataIndex" : "reportMonth" }, 
                     { "header" : "填报单位", "dataIndex" : "org" }, 
                     { "header" : "填报人", "dataIndex" : "reporter" }
                   ]
});
_tab = ModuleMgr.register(app.statPanel);
