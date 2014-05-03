Ext.ns('app')

app.summaryOptPerson = new Ext.tf.SummaryStatisticDetailPanel({
	queryUrl : summaryService.querySummaryStatistics,
	statisticType : '010',
	idsArray : {
		startDate : 'startDate02',
		endDate : 'endDate02',
		healthfile : 'healthfile02',
		children : 'children02',
		maternal : 'maternal02',
		vacciInfo : 'vacciInfo02',
		medicalexam : 'medicalexam02',
		chronicDisease : 'chronicDisease02',
		grid : 'optPersonGrid',
		isQryWipeOut : 'optIsQryWipeOut'
	}
});

_tab = ModuleMgr.register(app.summaryOptPerson);