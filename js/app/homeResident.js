Ext.ns("app");

app.homeResidentPanel = new Ext.tf.HealthParentPanelByHome({
  treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
  queryUrl : UserMenuTreeService.getHomeResidents,
  deleteUrl : UserMenuTreeService.removeHomeInfos
});

_tab = ModuleMgr.register(app.homeResidentPanel);