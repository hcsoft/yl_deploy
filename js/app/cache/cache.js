Ext.ns("Ext.hc");

Ext.hc.cachePanel = new Ext.Panel({
	layout : 'fit',
	items : [ {
		layout : 'fit',
		xtype : 'panel',
		id : 'cache.panel',
		title : '缓存管理',
		autoWidth : true,
		// height : 700,
		tbar : [ {
			text : '刷新缓存',
			iconCls : 'c_refresh',
			handler : function(obj) {
				obj.disable();
				CacheService.refresh(function(data) {
					obj.enable();
				});
			}
		}, "-", {
			text : '测试掉线',
			iconCls : 'c_query',
			handler : function() {
				CacheService.clearSession();
			}.createDelegate(this)
		} ]

	} ]
});
ModuleMgr.register(Ext.hc.cachePanel);
