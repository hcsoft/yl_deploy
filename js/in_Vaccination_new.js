var services = {
	get : VaccinationService.get,
	save : VaccinationService.save,
	propValidate : VaccinationService.hasAllThese,
	tableName : 'VaccineImmune'
};

var cfg = [ {
	id : "vname",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "fileNo",
	xtype : "input",
	setting : {
		size : 20,
		readonly : true
	}
}, {
	id : "barCode",
	xtype : "input",
	setting : {
		showOnly : true,
		readonly : true
	}
}, {
	id : "vsex",
	xtype : "input",
	setting : {
		maxlen : 10,
		size : 10
	},
	required : [ true, "性别" ]
}, {
	id : "vbirthday",
	xtype : "datefield",
	setting : {
		size : 20
	// format : 'date'
	}
}, {
	id : "vweight",
	xtype : "input",
	setting : {
		size : 10,
		format : 'num'
	}
}, {
	id : "vcensusAddressCounty",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "vcensusAddressTown",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "vcensusAddressVillage",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "vfamilyAddress",
	xtype : "input",
	setting : {
		size : 40
	}
}, {
	id : "vfatherName",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "vmotherName",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "vfatherWorkUnit",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "vmotherWorkUnit",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "vfatherPhone",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "vmotherPhone",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "vmovedDate",
	xtype : "input",
	setting : {
		format : 'date'
	}
}, {
	id : "vmovedAddress",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "vbuildCardDate",
	xtype : "input",
	setting : {
		format : 'date',
		maxlen : 8,
		defaultVal : new Date()
	}
}, {
	id : "vbuildCardPerson",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "vvacciUnit",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "vcertifiUnit",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "taboo",
	xtype : "input",
	setting : {
		size : 80
	}
}, {
	id : "infectiousHistory",
	xtype : "input",
	setting : {
		size : 80
	}
} ];
