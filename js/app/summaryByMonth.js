Ext.ns('app')

app.summaryByMonth = new Ext.tf.SummaryStatisticDetailPanel({
	queryUrl : summaryService.querySummaryStatistics,
	statisticType : '002',
	idsArray : {
		startDate : 'startDate04',
		endDate : 'endDate04',
		healthfile : 'healthfile04',
		children : 'children04',
		maternal : 'maternal04',
		vacciInfo : 'vacciInfo04',
		medicalexam : 'medicalexam04',
		chronicDisease : 'chronicDisease04',
		grid : 'monthGrid',
		isQryWipeOut : 'monthIsQryWipeOut'
	}
});

_tab = ModuleMgr.register(app.summaryByMonth);