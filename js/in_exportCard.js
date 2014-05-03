var services = {
	get : HearScreenReportCardService.get,
	save : HearScreenReportCardService.save,
	propValidate : HearScreenReportCardService.hasAllThese,
	tableName : 'HearScreenReportCard'
};

var cfg = [ {
	id : "examUnit",
	xtype : "input",
	setting : {		
		size : 20
	}
}, {
	id : "districtNumber",
	xtype : "input",
	setting : {
		showOnly : true,
		asLabel : true
	}
}, {
	id : "fileNo",
	xtype : "combo",
	setting : {
		ds : {
			search : FileNumSearch.listCodePage,
			get : FileNumSearch.getItem
		},
		local : false,
		width : 100,
		model : {
			id : 0,
			code : 0,
			display : 1
		},
		showDisplay : false,
		roWhenSet : true,
		writeback : [ {
			id : "babyName",
			col : 1
		},{
			id : "babySex",
			col : 2
		},{
			id : "babyBirthday",
			col : 3
		} ],
		mCodePrefixCtrlId : 'districtNumber',
		displayCols : [ 1, 2, 3, 7 ],
		displayColNames : [ "编号", "", "", "" ]
	},
	required : [ true, "编号" ]
}, {
	id : "parentsName",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "serialNumber",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "babyName",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "babySex",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "babyBirthday",
	xtype : "input",
	setting : {
		size : 20,
		maxlen : 8,
		format : 'date'
	}
}, {
	id : "examDate",
	xtype : "input",
	setting : {
		size : 20,
		format : 'date'
	}
}, {
	id : "reviewExamDate",
	xtype : "input",
	setting : {
		size : 20,
		format : 'date'
	}
}, {
	id : "examWay",
	xtype : "list",
	setting : {
		ds : "1484"
	}
}, {
	id : "rightEar",
	xtype : "list",
	setting : {
		ds : "188"
	}
}, {
	id : "leftEar",
	xtype : "list",
	setting : {
		ds : "188"
	}
}, {
	id : "suggestion",
	xtype : "list",
	setting : {
		ds : "1487",
		newlineStep : 1
	}
}, {
	id : "examerSign",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "reportDate",
	xtype : "input",
	setting : {
		format : 'date'
	}
}, {
	id : "dataType",
	xtype : "input"
} ];
