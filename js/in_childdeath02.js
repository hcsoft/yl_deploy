//   var services = {
//        get : BabyVisitService.get,
//        save : BabyVisitService.save,
//        propValidate : BabyVisitService.hasAllThese,
//        tableName : 'BabyVisit'
//    };

var cfg = [ {
	id : "dbabyName",
	xtype : "input",
	setting : {
		maxlen : 30,
		size : 10,
		showOnly : true,
		readonly : true
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
			id : "dbabyName",
			col : 1
		}, {
			id : "barCode",
			col : 6
		} ],
		mCodePrefixCtrlId : 'districtNumber',
		displayCols : [ 1, 2, 3, 7 ],
		displayColNames : [ "编号", "", "", "" ]
	},
	required : [ true, "编号" ]
}, {
	id : "barCode",
	xtype : "input",
	setting : {
		showOnly : true,
		readonly : true,
		size : 15
	}
}, {
	id : "fmotherAge",
	xtype : "input",
	setting : {
		format : 'int'
	}
}, {
	id : "fmotherFolk",
	xtype : "list",
	setting : {
		ds : "57"
	},
	requires : {
		valEq : "2",
		fields : [ "fmotherFolkOther" ]
	}
}, {
	id : "fmotherFolkOther",
	xtype : "input",
	setting : {
		disabled : true
	}
}, {
	id : "fmotherEducation",
	xtype : "list",
	setting : {
		ds : "99"
	}
}, {
	id : "fmotherOccupation",
	xtype : "list",
	setting : {
		ds : "2015"
	}
}, {
	id : "fmotherLocalResidence",
	xtype : "list",
	setting : {
		ds : "171"
	}
}, {
	id : "favgIncome",
	xtype : "input",
	setting : {
		format : 'num'
	}
}, {
	id : "faddress",
	xtype : "list",
	setting : {
		ds : "2001"
	},
	requires : {
		valEq : "4",
		fields : [ "faddressOther" ]
	}
}, {
	id : "faddressOther",
	xtype : "input",
	setting : {
		disabled : true
	}
}, {
	id : "mbeforeExam",
	xtype : "list",
	setting : {
		ds : "171"
	},
	requires : [ {
		valEq : "1",
		fields : [ "mbeforeExamTime" ]
	}, {
		valEq : "2",
		fields : [ "munBeforeExamReason" ]
	} ]
}, {
	id : "mbeforeExamTime",
	xtype : "input",
	setting : {
		disabled : true,
		format : 'int',
		size : 10,
		caption : '接受产前检查总次数'
	}
}, {
	id : "munBeforeExamReason",
	xtype : "input",
	setting : {
		disabled : true,
		caption : '未接受产前检查的原因',
		size : 30
	}
}, {
	id : "mcomplication",
	xtype : "list",
	setting : {
		ds : "151"
	},
	requires : {
		valEq : "2",
		fields : [ "mcomplicationRemarks" ]
	}
}, {
	id : "mcomplicationRemarks",
	xtype : "input",
	setting : {
		disabled : true,
		multiline : true,
		width : '500px',
		height : '50px',
		size : 50
	}
}, {
	id : "mchildFetal",
	xtype : "input",
	setting : {
		size : 10,
		format : 'int'
	}
}, {
	id : "mchildYeild",
	xtype : "input",
	setting : {
		size : 10,
		format : 'int'
	}
}, {
	id : "mchildWeekly",
	xtype : "input",
	setting : {
		size : 10,
		format : 'int'
	}
}, {
	id : "mbirthWay",
	xtype : "list",
	setting : {
		ds : "1376"
	}
}, {
	id : "mbirthAddress",
	xtype : "list",
	setting : {
		ds : "2002"
	},
	requires : [ {
		valEq : "5",
		fields : [ "mbirthAddressReason" ]
	}, {
		valEq : "6",
		fields : [ "mbirthAddressReason" ]
	} ]
}, {
	id : "mbirthAddressReason",
	xtype : "input",
	setting : {
		disabled : true,
		size : 30,
		caption : "生于家中或途中的原因是"
	}
}, {
	id : "mchildDoctor",
	xtype : "list",
	setting : {
		ds : "2017"
	}
}, {
	id : "mchokeHistory",
	xtype : "list",
	setting : {
		ds : "171"
	}
}, {
	id : "mexception",
	xtype : "list",
	setting : {
		ds : "151"
	}
}, {
	id : "misHealth",
	xtype : "list",
	setting : {
		ds : "151"
	},
	requires : {
		valEq : "2",
		fields : [ "munHealthRemarks" ]
	}
}, {
	id : "munHealthRemarks",
	xtype : "input",
	setting : {
		disabled : true,
		multiline : true,
		width : '500px',
		height : '50px',
		size : 50
	}
}, {
	id : "dbuexception",
	xtype : "input",
	setting : {
		multiline : true,
		width : '500px',
		height : '50px',
		size : 50
	}
}, {
	id : "dbucontinuedDay",
	xtype : "input",
	setting : {
		size : 10,
		format : 'int'
	}
}, {
	id : "dbustep",
	xtype : "input",
	setting : {
		multiline : true,
		width : '500px',
		height : '50px',
		size : 50
	}
}, {
	id : "dbureason",
	xtype : "list",
	setting : {
		ds : '2019'
	},
	requires : [ {
		valEq : "5",
		fields : [ "dbureasonCustom" ]
	}, {
		valEq : "7",
		fields : [ "dbureasonOther" ]
	} ]
}, {
	id : "dbureasonCustom",
	xtype : "input",
	setting : {
		disabled : true,
		size : 20
	}
}, {
	id : "dbureasonOther",
	xtype : "input",
	setting : {
		disabled : true,
		size : 20
	}
}, {
	id : "dbufhelp",
	xtype : "list",
	setting : {
		ds : "2020"
	},
	requires : {
		valEq : "7",
		fields : [ "dbufhelpOther" ]
	}
}, {
	id : "dbufhelpOther",
	xtype : "input",
	setting : {
		disabled : true,
		size : 10
	}
}, {
	id : "dbuhelp",
	xtype : "list",
	setting : {
		ds : "2021"
	},
	requires : {
		valEq : "5",
		fields : [ "dbuhelpOther" ]
	}
}, {
	id : "dbuhelpOther",
	xtype : "input",
	setting : {
		disabled : true,
		size : 10
	}
}, {
	id : "dbfirstSelectHosp",
	xtype : "list",
	setting : {
		ds : "2022",
		newlineStep : 4
	}
}, {
	id : "dbcontinuedTime",
	xtype : "input",
	setting : {
		size : 10,
		format : 'int'
	}
}, {
	id : "dbdiagnoseHosp",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "dbdiagnose",
	xtype : "input",
	setting : {
		size : 40
	}
}, {
	id : "dbcureDay",
	xtype : "input",
	setting : {
		size : 10,
		format : 'int'
	}
}, {
	id : "dbcommunityReason",
	xtype : "list",
	setting : {
		ds : "2023"
	},
	requires : {
		valEq : "3",
		fields : [ "dbcommunityReasonOther" ]
	}
}, {
	id : "dbcommunityReasonOther",
	xtype : "input",
	setting : {
		disabled : true,
		size : 10
	}
}, {
	id : "dbquitCureReason",
	xtype : "list",
	setting : {
		ds : "2024"
	},
	requires : {
		valEq : "3",
		fields : [ "dbquitCureReasonOther" ]
	}
}, {
	id : "dbquitCureReasonOther",
	xtype : "input",
	setting : {
		disabled : true,
		size : 10
	}
}, {
	id : "tdcontinueDay",
	xtype : "input",
	setting : {
		size : 10,
		format : 'int'
	}
}, {
	id : "tisNeedTrans",
	xtype : "list",
	setting : {
		ds : "151"
	}
}, {
	id : "tfirstRemainTime",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "tfirstRouteRemainTime",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "tsecondRemainTime",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "tsecondRouteRemainTime",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "tsecondTranReason",
	xtype : "list",
	setting : {
		ds : "2018",
		newlineStep : 1
	}
}, {
	id : "tdfhelp",
	xtype : "list",
	setting : {
		ds : "2020"
	},
	requires : {
		valEq : "7",
		fields : [ "tdfhelpOther" ]
	}
}, {
	id : "tdfhelpOther",
	xtype : "input",
	setting : {
		disabled : true,
		size : 10
	}
}, {
	id : "tdhelp",
	xtype : "list",
	setting : {
		ds : "2021"
	},
	requires : {
		valEq : "5",
		fields : [ "tdhelpOther" ]
	}
}, {
	id : "tdhelpOther",
	xtype : "input",
	setting : {
		disabled : true,
		size : 10
	}
}, {
	id : "bdtime",
	xtype : "input",
	setting : {
		size : 10,
		maxlen : 8,
		format : 'date'
	}
}, {
	id : "dbage",
	xtype : "input",
	setting : {
		size : 10,
		format : 'int'
	}
}, {
	id : "bdaddress",
	xtype : "list",
	setting : {
		ds : "2025"
	},
	requires : {
		valEq : "3",
		fields : [ "bdaddressOther" ]
	}
}, {
	id : "bdaddressOther",
	xtype : "input",
	setting : {
		disabled : true,
		size : 10
	}
}, {
	id : "bddiagnose",
	xtype : "input",
	setting : {
		size : 40
	}
}, {
	id : "bdbaseByDiagnose",
	xtype : "list",
	setting : {
		ds : "2026"
	}
}, {
	id : "tunit",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "toptPerson",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "tdate",
	xtype : "input",
	setting : {
	    maxlen : 8,
		format : 'date'
	}
} ];
