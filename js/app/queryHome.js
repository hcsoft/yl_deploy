Ext.ns("app");

app.QueryHonePanel = new Ext.tf.QueryHomeParentPanel({
	treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : UserMenuTreeService.getHomeResidents
});

_tab = ModuleMgr.register(app.QueryHonePanel);

