var childOtherValJson = {};
(function(){
	var json = Utils.parseParams(window.location.search);
	var fileNo = unescape(json.fileNo);
	HealthFileChildrenService.getChildrenOtherInfo(fileNo,function(data){
		console.log(data);
		var fatherName = '';
		var motherName = '';
		var weight = '';
		var height = '';
		var weekly = '';
		var bormWays = '';
		var birthOrgName = '';
		var fatherAge = '';
		var fatherNation = '';
		var motherAge = '';
		var motherNation = '';
		if(data != null){
			fatherName = data[0].fatherName;
			motherName = data[0].motherName;
			weight = data[0].weight;
			height = data[0].height;
			weekly = data[0].borthWeekly;
			birthOrgName = data[0].borthOrganization;
			fatherAge = data[0].fatherAge;
			fatherNation = data[0].fatherNation;
			motherAge = data[0].motherAge;
			motherNation = data[0].motherNation;
			if(data.length == 2){
				bormWays = data[1].childbirthWay;
			}
		}

		childOtherValJson = {
			'fatherName' : fatherName,
			'motherName' : motherName,
			'weight' : weight,
			'height' : height,
			'weekly' : weekly,
			'bormWays' : bormWays,
			'birthOrgName' : birthOrgName,
			'fatherAge' : fatherAge,
			'fatherNation' : fatherNation,
			'motherAge' : motherAge,
			'motherNation' : motherNation			
		};
	});
})();

var services = {
	get : HealthFileChildrenService.get,
	save : HealthFileChildrenService.save,
	propValidate : HealthFileChildrenService.hasAllThese,
	tableName : 'HealthFileChildren'
};

var cfg = [ {
	id : "name",
	xtype : "input",
	setting : {
		maxlen : 30
	}
},
/* {
	id : "fileNo",
	xtype : "input",
	setting : {
		readonly : true
	}
}*/
{
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
            id : "sex",
            col : 2
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
        }],
        mCodePrefixCtrlId : 'districtNumber',
        displayCols : [ 1, 2, 3, 7 ],
        displayColNames : [ "编号", "疾病", "", "" ]
    },
    required : [ true, "编号" ]
}

, {
	id : "sex",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "allergiesHistory",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "fatherName",
	xtype : "input",
	setting : {
		size : 20
	}
}, {
	id : "motherName",
	xtype : "input",
	setting : {
		size : 20
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
	id : "tel",
	xtype : "input",
	setting : {
		maxlen : 11
	}
}, {
	id : "birthday",
	xtype : "input",
	setting : {
	    maxlen : 8,
		format : 'date'
	}
}, {
	id : "weight",
	xtype : "input",
	setting : {
		format : 'num'
	}
}, {
	id : "height",
	xtype : "input",
	setting : {
		format : 'num'
	}
}, {
	id : "apgarOneMinuts",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "apgarFiveMinuts",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "abo",
	xtype : "input"
}, {
	id : "rh",
	xtype : "input"
}, {
	id : "weekly",
	xtype : "input"
}, {
	id : "gravidity",
	xtype : "input",
	setting : {
		format : 'int'
	}
}, {
	id : "parity",
	xtype : "input",
	setting : {
		format : 'int'
	}
}, {
	id : "numberOfBirths",
	xtype : "list",
	setting : {
		ds : '2013'
	}
}, {
	id : "bormWays",
	xtype : "list",
	setting : {
		ds : '1376'
	}
}, {
	id : "birthOrgName",
	xtype : "input",
	setting : {
		size : 40
	}
}, {
	id : "fatherAge",
	xtype : "input",
	setting : {
		format : 'int'
	}
}, {
	id : "fatherNation",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "fatherEducational",
	xtype : "input"
}, {
	id : "fatherOccupation",
	xtype : "input"
}, {
	id : "motherAge",
	xtype : "input",
	setting : {
		format : 'int'
	}
}, {
	id : "motherNation",
	xtype : "input",
	setting : {
		size : 10
	}
}, {
	id : "motherEducational",
	xtype : "input"
}, {
	id : "motherOccupation",
	xtype : "input"
}, {
	id : "montherExceptions",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : "2",
		fields : [ "montherException" ]
	}
// 
}, {
	id : "montherException",
	xtype : "list",
	setting : {
		disabled : true,
		ds : "2014",
		newlineStep : 4,
		multi: true,
        save: "id",
        mapping: {
          value: "montherExceptionId"
        }
	},
	requires : {
		valEq : "7",
		fields : [ "montherExceptionOhter" ]
	}
}, {
	id : "montherExceptionOhter",
	xtype : "input",
	setting : {
		disabled : true,
		caption : '说明'
	}
}, {
	id : "childrenExceptions",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : "2",
		fields : [ "childrenException" ]
	}
}, {
	id : "childrenException",
	xtype : "list",
	setting : {
		ds : "2015",
		disabled : true,
		multi: true,
        save: "id",
        mapping: {
          value: "childrenExceptionId"
        }
	},
	requires : [{
		valEq : "1",
		fields : [ "childrenException1" ]
	},{
		valEq : "4",
		fields : [ "childrenExceptionOhter" ]
	}]
}, {
	id : "childrenException1",
	xtype : "list",
	setting : {
		ds : "2009",
		disabled : true
	}
}, {
	id : "childrenExceptionOhter",
	xtype : "input",
	setting : {
		disabled : true,
		caption : '说明'
	}
}, {
	id : "birthDefect",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : "2",
		fields : [ "birthDefectOther" ]
	}
}, {
	id : "birthDefectOther",
	xtype : "input",
	setting : {
		disabled : true,
		caption : '说明'
	}
}, {
	id : "childIllScreening",
	xtype : "list",
	setting : {
		ds : "35",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : "2",
		fields : [ "childIllScreeningOther" ]
	}
}, {
	id : "childIllScreeningOther",
	xtype : "input",
	setting : {
		disabled : true,
		caption : '说明'
	}
}, {
	id : "childHereditary",
	xtype : "list",
	setting : {
		ds : "151",
		isDefaultVal : true,
		defaultVal : 0
	},
	requires : {
		valEq : "2",
		fields : [ "childHereditaryOther" ]
	}
}, {
	id : "childHereditaryOther",
	xtype : "input",
	setting : {
		disabled : true,
		caption : '说明'
	}
}  ];