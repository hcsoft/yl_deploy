Ext.ns('app')

app.hivAndsyphilis = new Ext.tf.HIVAndSyphilisPanel({
	queryUrl : summaryService.queryHIVAndSyphilis,
	readerConfig : [ {
		name : 'orgName'
	}, {
		name : 'userName'
	}, {
		name : 'groupDate'
	}, {
		name : 'hivnegative'
	}, {
		name : 'hivmasculine'
	}, {
		name : 'hivothers'
	}, {
		name : 'syphilisNegative'
	}, {
		name : 'syphilisMasculine'
	}, {
		name : 'syphilisOthers'
	}],
	gridCmConfig : [ {
		"header" : "组织机构",
		"dataIndex" : "orgName",
		"id" : "orgName",
		locked : true
	}, {
		"header" : "操作员",
		"dataIndex" : "userName",
		"id" : "userName"
	}, {
		"header" : "日期",
		"dataIndex" : "groupDate",
		"id" : "groupDate"
	}, {
		"header" : "HIV阴性",
		"dataIndex" : "hivnegative",
		"id" : "hivnegative"
	}, {
		"header" : "HIV阳性",
		"dataIndex" : "hivmasculine",
		"id" : "hivmasculine"
	}, {
		"header" : "HIV未注明",
		"dataIndex" : "hivothers",
		"id" : "hivothers"
	}, {
		"header" : "梅毒阴性",
		"dataIndex" : "syphilisNegative",
		"id" : "syphilisNegative"
	}, {
		"header" : "梅毒阳性",
		"dataIndex" : "syphilisMasculine",
		"id" : "syphilisMasculine"
	}, {
		"header" : "梅毒未注明",
		"dataIndex" : "syphilisOthers",
		"id" : "syphilisOthers"
	}]
});

_tab = ModuleMgr.register(app.hivAndsyphilis);