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
	id : "dbabyHospital",
	xtype : "input",
	setting : {
		size : 40
	}
}, {
	id : "ddataOrigin",
	xtype : "list",
	setting : {
		ds : "2000",
		newlineStep : 3
	},
	requires : {
		valEq : "4",
		fields : [ "ddataOriginOther" ]
	}
}, {
	id : "ddataOriginOther",
	xtype : "input",
	setting : {
		disabled : true,
		size : 40
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
	id : "mgestationTime",
	xtype : "input",
	setting : {
		format : 'int',
		size : 10
	}
}, {
	id : "mbirthTime",
	xtype : "input",
	setting : {
		format : 'int',
		size : 10
	}
}, {
	id : "mmiscarryTime",
	xtype : "input",
	setting : {
		format : 'int',
		size : 10
	}
}, {
	id : "mdeathTime",
	xtype : "input",
	setting : {
		format : 'int',
		size : 10
	}
}, {
	id : "mprmatureTime",
	xtype : "input",
	setting : {
		format : 'int',
		size : 10
	}
}, {
	id : "mabnormal",
	xtype : "list",
	setting : {
		ds : "151"
	},
	requires : {
		valEq : "2",
		fields : [ "mabnormalName" ]
	}
}, {
	id : "mabnormalName",
	xtype : "input",
	setting : {
		disabled : true,
		caption : "名称",
		size : 10
	}
}, {
	id : "mheritable",
	xtype : "list",
	setting : {
		ds : "151"
	},
	requires : {
		valEq : "2",
		fields : [ "mheritableName" ]
	}
}, {
	id : "mheritableName",
	xtype : "input",
	setting : {
		disabled : true,
		caption : "名称",
		size : 10
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
	id : "mbirthStart",
	xtype : "list",
	setting : {
		ds : "2003"
	}
}, {
	id : "mleadWay",
	xtype : "list",
	setting : {
		ds : "2004"
	},
	requires : {
		valEq : "4",
		fields : [ "mleadWayOther" ]
	}
}, {
	id : "mleadWayOther",
	xtype : "input",
	setting : {
		disabled : true
	}
}, {
	id : "mleadSpesia",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "mbirthWeekly",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "mbirthWay",
	xtype : "list",
	setting : {
		ds : "1376"
	}
}, {
	id : "mhelpDoctor",
	xtype : "list",
	setting : {
		ds : "2005"
	},
	requires : {
		valEq : "5",
		fields : [ "mhelpDoctorOther" ]
	}
}, {
	id : "mhelpDoctorOther",
	xtype : "input",
	setting : {
		disabled : true,
		size : 10
	}
}, {
	id : "mbirthComplication",
	xtype : "list",
	setting : {
		ds : "151"
	},
	requires : {
		valEq : "2",
		fields : [ "mbirthComplicationRemarks" ]
	}
}, {
	id : "mbirthComplicationRemarks",
	xtype : "input",
	setting : {
		disabled : true,
		multiline : true,
		width : '500px',
		height : '50px',
		size : 50
	}
}, {
	id : "bbirthday",
	xtype : "input",
	setting : {
	    maxlen : 8,
		size : 10,
		format : 'date'
	}
}, {
	id : "bsex",
	xtype : "list",
	setting : {
		ds : "111",
		newlineStep : 3
	}
}, {
	id : "bweight",
	xtype : "list",
	setting : {
		ds : "2006"
	},
	requires : [ {
		valEq : "1",
		fields : [ "bweightMeasure" ]
	}, {
		valEq : "2",
		fields : [ "bweightEstimate" ]
	} ]
}, {
	id : "bweightMeasure",
	xtype : "input",
	setting : {
		disabled : true,
		size : 10,
		format : 'num'
	}
}, {
	id : "bweightEstimate",
	xtype : "input",
	setting : {
		disabled : true,
		size : 10,
		format : 'num'
	}
}, {
	id : "bfetalNum",
	xtype : "list",
	setting : {
		ds : "2007"
	}
}, {
	id : "bapgarOne",
	xtype : "list",
	setting : {
		ds : "2008"
	},
	requires : {
		valEq : "1",
		fields : [ "bapgarOneMinutes" ]
	}
}, {
	id : "bapgarOneMinutes",
	xtype : "input",
	setting : {
		disabled : true,
		size : 10,
		format : 'num'
	}
}, {
	id : "bapgarFive",
	xtype : "list",
	setting : {
		ds : "2008"
	},
	requires : {
		valEq : "1",
		fields : [ "bapgarFiveMinutes" ]
	}
}, {
	id : "bapgarFiveMinutes",
	xtype : "input",
	setting : {
		disabled : true,
		size : 10,
		format : 'num'
	}
}, {
	id : "bsheepWater",
	xtype : "list",
	setting : {
		ds : "2009"
	}
}, {
	id : "brecovery",
	xtype : "list",
	setting : {
		ds : "151"
	}
}, {
	id : "brecoveryDoctor",
	xtype : "list",
	setting : {
		ds : "2010"
	}
}, {
	id : "benvironmentTemp",
	xtype : "input",
	setting : {
		size : 10,
		format : 'num'
	}
}, {
	id : "brecovOxygen",
	xtype : "list",
	setting : {
		ds : "2016"
	}
}, {
	id : "brecovVentilate",
	xtype : "list",
	setting : {
		ds : "2016"
	}
}, {
	id : "brecovTrachea",
	xtype : "list",
	setting : {
		ds : "2016"
	}
}, {
	id : "brecovPress",
	xtype : "list",
	setting : {
		ds : "2016"
	}
}, {
	id : "brecovGland",
	xtype : "list",
	setting : {
		ds : "2016"
	}
}, {
	id : "brecovOther",
	xtype : "list",
	setting : {
		ds : "2016"
	}
}, {
	id : "bmilk",
	xtype : "list",
	setting : {
		ds : "171"
	},
	requires : {
		valEq : "1",
		fields : [ "bbirthMinutes", "bbirthHours" ]
	}
}, {
	id : "bbirthMinutes",
	xtype : "input",
	setting : {
		disabled : true,
		size : 10,
		format : 'int'
	}
}, {
	id : "bbirthHours",
	xtype : "input",
	setting : {
		disabled : true,
		size : 10,
		format : 'int'
	}
}, {
	id : "bfeedWay",
	xtype : "list",
	setting : {
		ds : "2014"
	},
	requires : {
		valEq : "4",
		fields : [ "bfeedWayOther" ]
	}
}, {
	id : "bfeedWayOther",
	xtype : "input",
	setting : {
		disabled : true
	}
}, {
	id : "bsavingWay",
	xtype : "list",
	setting : {
		ds : "2013"
	},
	requires : {
		valEq : "5",
		fields : [ "bsavingWayOther" ]
	}
}, {
	id : "bsavingWayOther",
	xtype : "input",
	setting : {
		disabled : true
	}
}, {
	id : "etime",
	xtype : "input",
	setting : {
	    maxlen : 8,
		format : 'date',
		size : 10
	}
}, {
	id : "ehospiAndDepart",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "eisTrans",
	xtype : "list",
	setting : {
		ds : "171"
	},
	requires : {
		valEq : "1",
		fields : [ "etransHospiAndDepart" ]
	}
}, {
	id : "etransHospiAndDepart",
	xtype : "input",
	setting : {
		disabled : true,
		caption : '转入医院及科室名称'
	}
}, {
	id : "edealProc",
	xtype : "input",
	setting : {
		multiline : true,
		width : '500px',
		height : '50px',
		size : 50
	}
}, {
	id : "diagnose",
	xtype : "input",
	setting : {
		multiline : true,
		width : '500px',
		height : '50px',
		size : 50
	}
}, {
	id : "cureProc",
	xtype : "input",
	setting : {
		multiline : true,
		width : '500px',
		height : '50px',
		size : 50
	}
}, {
	id : "cureProc",
	xtype : "input",
	setting : {
		multiline : true,
		width : '500px',
		height : '50px',
		size : 50
	}
}, {
	id : "bdhospiTime",
	xtype : "datefield"
}, {
	id : "bddeathTime",
	xtype : "datefield"
}, {
	id : "bdaddress",
	xtype : "list",
	setting : {
		ds : "2011"
	},
	requires : {
		valEq : "3",
		fields : [ "bdaddressOther" ]
	}
}, {
	id : "bdaddressOther",
	xtype : "input",
	setting : {
		disabled : true
	}
}, {
	id : "bddiagnose",
	xtype : "input",
	setting : {
		size : 30
	}
}, {
	id : "bddissect",
	xtype : "list",
	setting : {
		ds : "171"
	}
}, {
	id : "bddiscuss",
	xtype : "list",
	setting : {
		ds : "171"
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
