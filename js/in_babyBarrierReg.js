var services = {
	get : babyBarrierRegService.get,
	save : babyBarrierRegService.save,
	propValidate : babyBarrierRegService.hasAllThese,
	tableName : 'BabyBarrierReg'
};

var cfg = [ {
	id : "name",
	xtype : "input",
	setting : {
		maxlen : 20,
		size : 10,
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
			id : "name",
			col : 1
		}, {
			id : "barCode",
			col : 6
		}, {
			id : "sex",
			col : 2
		}, {
			id : "birthday",
			col : 3
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
		readonly : true
	}
}, {
	id : "sex",
	xtype : "input",
	setting : {
		maxlen : 10,
		size : 10
	}
}, {
	id : "nation",
	xtype : "input",
	setting : {
		maxlen : 10,
		size : 10
	}
}, {
	id : "age",
	xtype : "input",
	setting : {
		maxlen : 10,
		size : 4
	}
}, {
	id : "ageMonth",
	xtype : "input",
	setting : {
		maxlen : 10,
		size : 4
	}
}, {
	id : "ageDay",
	xtype : "input",
	setting : {
		maxlen : 10,
		size : 4
	}
}, {
	id : "ageHours",
	xtype : "input",
	setting : {
		maxlen : 10,
		size : 4
	}
}, {
	id : "birthday",
	xtype : "input",
	setting : {
		format : 'date',
		maxlen : 8,
		size : 10
	}
}, {
	id : "familyAddress",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "post",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "tel",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "fatherName",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "fatherAge",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "fatherOccupation",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "motherName",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "motherAge",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "motherOccupation",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "screeningWay",
	xtype : "list",
	setting : {
		ds : "1484",
		newlineStep : 1
	}
}, {
	id : "screeningDate",
	xtype : "input",
	setting : {
		format : 'date',
		size : 10
	}
}, {
	id : "screeningResult",
	xtype : "list",
	setting : {
		ds : "1491"
	}
}, {
	id : "fetalNumber",
	xtype : "input",
	setting : {
		size : 10,
		format : 'int'
	}
}, {
	id : "yieldNumber",
	xtype : "input",
	setting : {
		format : 'int',
		size : 10
	}
}, {
	id : "weight",
	xtype : "input",
	setting : {
		format : 'num',
		size : 10
	}
}, {
	id : "fetalWay",
	xtype : "list",
	setting : {
		ds : "2007",
		isDefaultVal : true,
		defaultVal : 0
	}
}, {
	id : "childBirthWay",
	xtype : "list",
	setting : {
		ds : "1376",
		isDefaultVal : true,
		defaultVal : 0
	}
}, {
	id : "birthDefact",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 2,
		fields : [ 'birthDefactOther' ]
	}
}, {
	id : "birthDefactOther",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 50,
		caption : '详述'
	}
}, {
	id : "birthDistress",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	}
}, {
	id : "apgar",
	xtype : "list",
	setting : {
		ds : "44"
	},
	requires : {
		valEq : 2,
		fields : [ 'apgarOther' ]
	}
}, {
	id : "apgarOther",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 50
	}
}, {
	id : "yieldHurt",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 2,
		fields : [ 'yieldHurtOther' ]
	}
}, {
	id : "yieldHurtOther",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 40,
		caption : "产伤部位"
	}
}, {
	id : "amnioticFluid",
	xtype : "list",
	setting : {
		ds : "1495",
		isDefaultVal : true,
		defaultVal : 0
	}
}, {
	id : "childBirthException",
	xtype : "list",
	setting : {
		ds : "1499",
		isDefaultVal : true,
		defaultVal : 0
	}
}, {
	id : "deformity",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 2,
		fields : [ 'deformityOther' ]
	}
}, {
	id : "deformityOther",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 40,
		caption : "畸形部位"
	}
}, {
	id : "infection",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 2,
		fields : [ "infectionReason", "infectionCourse" ]
	}
}, {
	id : "infectionReason",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 50,
		caption : "病因"
	}
}, {
	id : "infectionCourse",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 50,
		caption : "病程"
	}
}, {
	id : "ill",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 2,
		fields : [ "illReason", "illCourse" ]
	}
}, {
	id : "illReason",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 50,
		caption : "病因"
	}
}, {
	id : "illCourse",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 50,
		caption : "病程"
	}
}, {
	id : "headHurt",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 2,
		fields : [ "headHurtOther" ]
	}
}, {
	id : "headHurtOther",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 50,
		caption : '详述'
	}
}, {
	id : "otitisHistory",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 2,
		fields : [ "otitisHistoryOther" ]
	}
}, {
	id : "otitisHistoryOther",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 50,
		caption : '详述'
	}
}, {
	id : "nicu",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 2,
		fields : [ "nicureason", "nicudate" ]
	}
}, {
	id : "nicureason",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 30,
		caption : "原因"
	}
}, {
	id : "nicudate",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 10,
		caption : "持续时间"
	}
}, {
	id : "ventilator",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 2,
		fields : [ "ventilatorReason", "ventilatorDate" ]
	}
}, {
	id : "ventilatorReason",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 50,
		caption : "原因"
	}
}, {
	id : "ventilatorDate",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 50,
		caption : "持续时间"
	}
}, {
	id : "otherReaction",
	xtype : "list",
	setting : {
		ds : "1504"
	}
}, {
	id : "childBirthAge",
	xtype : "input",
	setting : {
		format : 'int',
		size : 10
	}
}, {
	id : "abortionHistory",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 2,
		fields : [ "abortionDate", "abortionReasion", "abortionWay" ]
	}
}, {
	id : "abortionDate",
	xtype : "input",
	setting : {
		disabled : true,
		display : true,
		maxlen : 50,
		size : 10,
		caption : "流产时间"
	}
}, {
	id : "abortionReasion",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 30,
		caption : "流产原因"
	}
}, {
	id : "abortionWay",
	xtype : "list",
	setting : {
		disabled : true,
		ds : "1507",
		caption : "流产方式"
	}
}, {
	id : "infectionHistory",
	xtype : "list",
	setting : {
		ds : "1511",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 6,
		fields : [ "infectionHistoryOther", "infectionHistoryWeek" ]
	}
}, {
	id : "infectionHistoryOther",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 30,
		caption : '详述'
	}
}, {
	id : "infectionHistoryWeek",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 10,
		caption : "感染时孕周"
	}
}, {
	id : "infectionHistory1",
	xtype : "list",
	setting : {
		ds : "1518",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 5,
		fields : [ "infectionHistory1other", "infectionHistory1week" ]
	}
}, {
	id : "infectionHistory1other",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 30,
		caption : '详述'
	}
}, {
	id : "infectionHistory1week",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 10,
		caption : "感染时孕周"
	}
}, {
	id : "contactHistory",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 2,
		fields : [ "contactHistoryDate", "contactHistoryWeek" ]
	}
}, {
	id : "contactHistoryDate",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 30,
		caption : '详述'
	}
}, {
	id : "contactHistoryWeek",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 10,
		caption : "感染时孕周"
	}
}, {
	id : "appHistory",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 2,
		fields : [ "appHistoryDrugName", "appHistoryDrugDate" ]
	}
}, {
	id : "appHistoryDrugName",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 30,
		caption : "药物名称"
	}
}, {
	id : "appHistoryDrugDate",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 10,
		caption : "用药时间"
	}
}, {
	id : "contactHistory1",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 2,
		fields : [ "contactHistory1date" ]
	}
}, {
	id : "contactHistory1date",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 30,
		caption : "接触时间"
	}
}, {
	id : "smoking",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	}
}, {
	id : "dreaking",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	}
}, {
	id : "drugging",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	}
}, {
	id : "illHistory",
	xtype : "list",
	setting : {
		ds : "1524",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 6,
		fields : [ "illHistoryOther" ]
	}
}, {
	id : "illHistoryOther",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 30,
		caption : '详述'
	}
}, {
	id : "exceptionHistory",
	xtype : "list",
	setting : {
		ds : "1531",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 5,
		fields : [ "exceptionHistoryOther" ]
	}
}, {
	id : "exceptionHistoryOther",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 30,
		caption : '详述'
	}
}, {
	id : "familySmoking",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	}
}, {
	id : "familyDreaking",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	}
}, {
	id : "familyDrugging",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	}
}, {
	id : "deaf",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 2,
		fields : [ "deafRelation", "deafSituation" ]
	}
}, {
	id : "deafRelation",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 30,
		caption : "与儿童的亲属关系"
	}
}, {
	id : "deafSituation",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 30,
		caption : "耳聋情况"
	}
}, {
	id : "intermarriage",
	xtype : "list",
	setting : {
		ds : "171",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 2,
		fields : [ "intermarriageRelation" ]
	}
}, {
	id : "intermarriageRelation",
	xtype : "input",
	setting : {
		disabled : true,
		maxlen : 50,
		size : 30,
		caption : "血缘关系"
	}
}, {
	id : "hearExamResult",
	xtype : "input",
	setting : {
		size : 50
	}
}, {
	id : "diagnosisResult",
	xtype : "input",
	setting : {
		size : 50
	}
}, {
	id : "diagnosisDoctor",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "ototoxicityDrugHistoryId",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : 2,
		fields : [ "ototoxicityDrugHistory" ]
	}
}, {
	id : "ototoxicityDrugHistory",
	xtype : "grid",
	setting : {
		disabled : true,
		displayCols : [ 'drugName', 'drugDose', 'treatment' ],
		displayColNames : [ "药名", "剂量", "疗程" ],
		colXtypes : [ 'input', 'input', 'input' ],
		colSettings : [ {
			width : "120"
		}, {
			width : "70"
		}, {
			width : "150"
		} ],
		required : [ 'drugName' ]
	}
} ];
