Ext.ns('app')

app.summaryByDistrict = new Ext.tf.StatisticByDistrict({
	title : '按行政区划汇总统计',
	treeLoaderFn : UserMenuTreeService.getUserDistrictNodes,
	queryUrl : summaryService.statisticByDistrict
});

_tab = ModuleMgr.register(app.summaryByDistrict);