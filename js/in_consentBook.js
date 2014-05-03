var services = {
	get : DiseaseAndHearScreenConsentService.get,
	save : DiseaseAndHearScreenConsentService.save,
	propValidate : DiseaseAndHearScreenConsentService.hasAllThese,
	tableName : 'DiseaseAndHearScreenConsent'
};

var cfg = [ {
	id : "pregnantWomanName",
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
			id : "pregnantWomanName",
			col : 1
		} ],
		mCodePrefixCtrlId : 'districtNumber',
		displayCols : [ 1, 2, 3, 7 ],
		displayColNames : [ "编号", "", "", "" ]
	},
	required : [ true, "编号" ]
}, {
	id : "hospitalNumber",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "agreeConsentItems",
	xtype : "list",
	setting : {
		ds : "1537",
		multi : true,
		save : "id",
		mapping : {
			value : 'agreeId'
		},
		newlineStep : 1
	}
}, {
	id : "signature",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "linkTel",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "agreeTime",
	xtype : "input",
	setting : {
	    maxlen : 8,
		format : 'date'
	}
} ];
