var services = {
	get : VisitAfterBornService.get,
	save : VisitAfterBornService.save,
	propValidate : VisitAfterBornService.hasAllThese,
	tableName : 'VisitAfterBorn'
};

var cfg = [ {
	id : "name",
	xtype : "input",
	setting : {
		showOnly : true,
		readonly : true,
		width : 60
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
			id : "name",
			col : 1
		}, {
			id : "barCode",
			col : 6
		},{
			id : "foreignId",
			col : 8
		} ],
		mCodePrefixCtrlId : 'districtNumber',
		displayCols : [ 1, 2, 3, 7 ],
		displayColNames : [ "编号", "疾病", "", "" ]
	},
	required : [ true, "编号" ]
}, {
	id : "barCode",
	xtype : "input",
	setting : {
		showOnly : true,
		readonly : true
	}
}, {
	id : "item",
	xtype : "list",
	setting : {
		ds : "1478",
		isDefaultVal : true,
		defaultVal : 0
	}
}, {
	id : "visitDate",
	xtype : "input",
	setting : {
		format : 'date',
		maxlen : 8,
		defaultVal : new Date()
	},
	required : [ true, "随访日期" ]
}, {
	id : "bodyHeat",
	xtype : "input",
	setting : {
		format : 'num'
	}
}, {
	id : "health",
	xtype : "input"
}, {
	id : "mind",
	xtype : "input"
}, {
	id : "diastolicPressure",
	xtype : "input",
	setting : {
		format : 'num'
	}
}, {
	id : "systolicPressure",
	xtype : "input",
	setting : {
		format : 'num'
	}
}, {
	id : "breast",
	xtype : "list",
	setting : {
		ds : "96",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 2,
		fields : [ "breastOther" ]
	}
}, {
	id : "breastOther",
	xtype : "input",
	setting : {
		disabled : true,
		caption : "异常描述"
	}
}, {
	id : "lochia",
	xtype : "list",
	setting : {
		ds : "96",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 2,
		fields : [ "lochiaOther" ]
	}
}, {
	id : "lochiaOther",
	xtype : "input",
	setting : {
		disabled : true,
		caption : "异常描述"
	}
}, {
	id : "metra",
	xtype : "list",
	setting : {
		ds : "96",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 2,
		fields : [ "metraOther" ]
	}
}, {
	id : "metraOther",
	xtype : "input",
	setting : {
		disabled : true,
		caption : "异常描述"
	}
}, {
	id : "wound",
	xtype : "list",
	setting : {
		ds : "96",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 2,
		fields : [ "woundOther" ]
	}
}, {
	id : "woundOther",
	xtype : "input",
	setting : {
		disabled : true,
		caption : "异常描述"
	}
}, {
	id : "other",
	xtype : "input"
}, {
	id : "result",
	xtype : "list",
	setting : {
		ds : "96",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 2,
		fields : [ "resultOther" ]
	}
}, {
	id : "resultOther",
	xtype : "input",
	setting : {
		disabled : true,
		caption : "异常描述"
	}
}, {
	id : "afterBornDirect",
	xtype : "list",
	setting : {
		ds : "160",
		multi : true,
		save : "id",
		newlineStep : 5,
		mapping : {
			value : 'afterBornDirectId'
		}
	},
	requires : {
		valEq : 6,
		fields : [ "afterBornDirectOther" ]
	}
}, {
	id : "afterBornDirectOther",
	xtype : "input",
	setting : {
		disabled : true,
		caption : "其它指导"
	}
}, {
	id : "transfer",
	xtype : "list",
	setting : {
		save : "isInputValue",
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 2,
		fields : [ "transReason", "transUnit" ]
	}
}, {
	id : "transReason",
	xtype : "input",
	setting : {
		disabled : true,
		caption : "原因"
	}
}, {
	id : "nextVisitDate",
	xtype : "input",
	setting : {
		format : 'date',
		maxlen : 8,
	}
}, {
	id : "transUnit",
	xtype : "input",
	setting : {
		disabled : true,
		caption : "机构及科室"
	}
}, {
	id : "visitDoctor",
	xtype : "input"
}, {
	id : "recordType",
	xtype : 'input',
	setting : {
		disabled : true,
		defaultVal : "0"
	}
},
/*
 * {//是否高危选项 id : "highRisk", xtype : "list", setting : { ds : "171",
 * isDefaultVal : true, defaultVal : 1 }, requires : { valEq : 1 , fields :
 * ['highRiskRemark','highRiskSearch'] } },{//高危描述 id : "highRiskRemark", xtype :
 * "input", setting : { disabled : true, size : 50 } },{//高危筛选 id :
 * "highRiskSearch", xtype : "input", setting : { disabled : true, caption:
 * "高危筛选", maxlen : 30, size : 14, isFocus : true, serviceType : 1, isSpecial :
 * true } },
 */
/*{
	id : "parities",
	xtype : "input",
	setting : {
		format : 'int',
		size : 10
	},
	required : [ true, "产次" ]

},*/{
	id : "pulseRate",
	xtype : "input",
	setting : {
		format : 'int'
	}
}, {
	id : "milk",
	xtype : "list",
	setting : {
		ds : "2001"
	}
}, {
	id : "swelling",
	xtype : "list",
	setting : {
		ds : "151"
	}
}, {
	id : "nipple",
	xtype : "list",
	setting : {
		ds : "151"
	}
},{
	id : "palaceHeight",
	xtype : "input",
	setting : {
		format : 'num'
	}
}, {
	id : "woundHealing",
	xtype : "list",
	setting : {
		ds : "2002"
	}
}, {
	id : "foreignId",
	xtype : "input"
} ];
