Ext.ns('app')

app.summaryByYear = new Ext.tf.SummaryStatisticDetailPanel({
	queryUrl : summaryService.querySummaryStatistics,
	statisticType : '001',
	idsArray : {
		startDate : 'startDate03',
		endDate : 'endDate03',
		healthfile : 'healthfile03',
		children : 'children03',
		maternal : 'maternal03',
		vacciInfo : 'vacciInfo03',
		medicalexam : 'medicalexam03',
		chronicDisease : 'chronicDisease03',
		grid : 'yearGrid',
		isQryWipeOut : 'yearIsQryWipeOut'
	}
});

_tab = ModuleMgr.register(app.summaryByYear);