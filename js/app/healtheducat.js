Ext.ns("app");

app.healtheducatPanel = new Ext.tf.HealthPanel({
    title: '健康教育活动记录',
    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : UserMenuTreeService.findHealtheducatRecords,
    deleteUrl : UserMenuTreeService.removeHealtheducatRecords,
    panelId : 'app.healtheducatPanel',
    recordId : 'healthEducat.id',
    recordPk : 'id',
    detailUrl: '/healtheducat.html',
//    Select B.Name 组织单位,A.Date 活动时间,A.Place 活动地点,A.Unit 主办单位,C.UserName 录入人from HealthEducat A
//    left join Organization B on A.OrgID = B.ID
//    left join sam_taxempcode C on A.inputpersonId = C.loginname
    checkLastLevel: false,

    readerConfig : [
                    {name:'id', mapping: 'healthEducat.id'},
                    {name:'date', mapping: 'healthEducat.date'},
                    {name:'place', mapping: 'healthEducat.place'},
                    {name:'orgName', mapping: 'samTaxorgcode.name'},
                    {name:'unit', mapping: 'healthEducat.unit'},
                    {name:'username', mapping: 'samTaxempcode.username'}
                   ],
    gridCmConfig :
                   [
                     { "header" : "组织单位", "dataIndex" : "orgName" }, 
                     { "header" : "活动时间", "dataIndex" : "date", "renderer": Ext.util.Format.dateRenderer('Y-m-d') }, 
                     { "header" : "活动地点", "dataIndex" : "place" }, 
                     { "header" : "主办单位", "dataIndex" : "unit" }, 
                     { "header" : "录入人", "dataIndex" : "username" }
                   ]
});
_tab = ModuleMgr.register(app.healtheducatPanel);
