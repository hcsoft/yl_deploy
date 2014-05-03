Ext.ns('app')

app.summaryByDay = new Ext.tf.SummaryStatisticDetailPanel({
	queryUrl : summaryService.querySummaryStatistics,
	statisticType : '003',
	idsArray : {
		startDate : 'startDate05',
		endDate : 'endDate05',
		healthfile : 'healthfile05',
		children : 'children05',
		maternal : 'maternal05',
		vacciInfo : 'vacciInfo05',
		medicalexam : 'medicalexam05',
		chronicDisease : 'chronicDisease05',
		grid : 'dayGrid',
		isQryWipeOut : 'dayIsQryWipeOut'
	}
});

_tab = ModuleMgr.register(app.summaryByDay);