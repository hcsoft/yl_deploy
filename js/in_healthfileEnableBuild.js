var services = {
	get : healthfileMaternalService.get,
	save : healthfileMaternalService.save,
	propValidate : healthfileMaternalService.hasAllThese,
	tableName : 'HealthFileMaternal'
};

var cfg = [ {
	id : "name",
	xtype : "input",
	setting : {
		maxlen : 30
	// showOnly : true
	// readonly : true
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
			id : "birthday",
			col : 3
		}, {
			id : "tel",
			col : 8
		}, {
			id : "addressTownship",
			col : 9
		}, {
			id : "addressVillage",
			col : 10
		}, {
			id : "residenceTownship",
			col : 9
		}, {
			id : "residenceVillage",
			col : 10
		}, {
			id : "idnumber",
			col : 5
		}, {
			id : "workUnit",
			col : 11
		}, {
			id : "folk",
			col : 12
		}, {
			id : "folkOther",
			col : 13
		}, {
			id : "education",
			col : 14
		}, {
			id : "occupation",
			col : 15
		} ],
		mCodePrefixCtrlId : 'districtNumber',
		displayCols : [ 1, 2, 3, 7 ],
		displayColNames : [ "编号", "疾病", "", "" ]
	},
	required : [ true, "编号" ]
}, {
	id : "relatedInfoSearch",
	xtype : "combo",
	setting : {
		ds : {
			search : FileNumSearch.listCodePage,
			get : FileNumSearch.getItem
		},
		local : false,
		width : 200,
		model : {
			id : 0,
			code : 0,
			display : 1
		},
		showDisplay : false,
		roWhenSet : false,
		writeback : [ {
			id : "husbandName",
			col : 1
		}, {
			id : "husbandBirthday",
			col : 3
		}, {
			id : "husbandTel",
			col : 8
		}, {
			id : "husbandEducation",
			col : 10
		}, {
			id : "husbandWorkUnit",
			col : 9
		}, {
			id : "husbandOccupation",
			col : 11
		} ],
		// mCodePrefixCtrlId : 'districtNumber',
		relatedInfoSearch : true,
		relatedInfoSearchIds : 'relatedInfoSearch_selectCond',
		relatedInfoSearchValType : '5',
		displayCols : [ 1, 2, 3, 7 ],
		displayColNames : [ "编号", "疾病", "", "" ],
		nothidewhenload:true
	}
}, {
	id : "birthday",
	xtype : "input",
	setting : {
		maxlen : 8,
		format : 'date'
	}
}, {
	id : "tel",
	xtype : "input",
	setting : {
		maxlen : 11
	}
}, {
	id : "firstAidTel",
	xtype : "input",
	setting : {
		maxlen : 11
	}
}, {
	id : "addressProvence",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "addressCity",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "addressCounty",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "addressTownship",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "addressVillage",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "addressGroup",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "residenceProvence",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "residenceCity",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "residenceCounty",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "residenceTownship",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "residenceVillage",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "residenceGroup",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "highRiskCode",
	xtype : "input",
	setting : {
		size : 50,
		maxlen : 30
	}
}, {
	id : "buildUnit",
	xtype : "input",
	setting : {
		size : 30
	}
}, {
	id : "buildDate",
	xtype : "input",
	setting : {
		format : 'date',
		maxlen : 8,
		defaultVal : new Date()
	}
}, {
	id : "idnumber",
	xtype : "input",
	setting : {
		maxlen : 18
	}
}, {
	id : "workUnit",
	xtype : "input",
	setting : {
		size : 30,
		maxlen : 100
	}
}, {
	id : "distance",
	xtype : "input",
	setting : {
		size : 15,
		format : 'num'
	}
}, {
	id : "recuperateProvence",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "recuperateCity",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "recuperateCounty",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "recuperateTownship",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "recuperateVillage",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "recuperateGroup",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "husbandName",
	xtype : "input"
}, {
	id : "husbandBirthday",
	xtype : "input",
	setting : {
		format : 'date'
	}
}, {
	id : "husbandTel",
	xtype : "input",
	setting : {
		maxlen : 11
	}
}, {
	id : "husbandOccupation",
	xtype : "input"
}, {
	id : "husbandOccupationOther",
	xtype : "input"
}, {
	id : "husbandWorkUnit",
	xtype : "input",
	setting : {
		size : 30,
		maxlen : 100
	}
}, {
	id : "gravidity",
	xtype : "input",
	setting : {
		format : 'int'
	},
	required : [ true, "孕次" ]
}, {
	id : "isClosed",
	xtype : "input"
}, {
	id : "areaOfResidence",
	xtype : "list",
	setting : {
		ds : "2010",
		newlineStep : 2
	}
}, {
	id : "nationality",
	xtype : "list",
	setting : {
		ds : "2011",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : "2",
		fields : [ "nationalityOther" ]
	}
// 
}, {
	id : "nationalityOther",
	xtype : "input",
	setting : {
		disabled : true,
		size : 15
	}
}, {
	id : "education",
	xtype : "list",
	setting : {
		ds : "2012"
	}
}, {
	id : "husbandEducation",
	xtype : "list",
	setting : {
		ds : "2012"
	}
}, {
	id : "folk",
	xtype : "list",
	setting : {
		ds : "57"
	},
	requires : {
		valEq : "2",
		fields : [ "folkOther" ]
	}
}, {
	id : "folkOther",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 10,
		size : 10,
		caption : "其他民族"
	}
}, {
	id : "occupation",
	xtype : "list",
	setting : {
		ds : "137",
		newlineStep : 1
	}
}, {
	id : "barCode",
	xtype : "input",
	setting : {
		maxlen : 18,
		size : 18
	}
} ];