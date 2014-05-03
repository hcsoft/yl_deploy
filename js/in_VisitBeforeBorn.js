var services = {
	get : VisitBeforeBornService.get,
	save : VisitBeforeBornService.save,
	propValidate : VisitBeforeBornService.hasAllThese,
	tableName : 'VisitBeforeBorn'
};

var cfg = [ {
	id : "name",
	xtype : "input",
	setting : {
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
			id : "name",
			col : 1
		}, {
			id : "barCode",
			col : 6
		},{
			id : "foreignId",
			col : 8
		} ],
		showHistoryRecord : {
			foreignIdCol : 8,
			foreignIdName : 'foreignId'
		},
		mCodePrefixCtrlId : 'districtNumber',
		displayCols : [ 1, 2, 3, 7,9 ],
		displayColNames : [ "编号", "疾病", "", "地址","建册时间" ]
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
	xtype : "input",
	setting : {
		width : 50,
		format : 'int',
		womanItem : true,
		fileInput : [ 'foreignId input', 'showItemInfo', 'nextVisitDate' ]
	},
	required : [ true, "项目" ]
}, {
	id : "visitDate",
	xtype : "input",
	setting : {
		format : 'date',
		maxlen : 8,
		size : 10,
		defaultVal : new Date()
	}
}, {
	id : "weeks",
	xtype : "input"
}, {
	id : "cc",
	xtype : "input"
}, {
	id : "weight",
	xtype : "input",
	setting : {
		format : 'num'
	}
}, {
	id : "exam01",
	xtype : "input",
	setting : {
		format : 'num'
	}
}, {
	id : "exam02",
	xtype : "input",
	setting : {
		format : 'num'
	}
}, {
	id : "exam03",
	xtype : "input"
// setting: {
// format: 'int'
// }
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
	id : "exam04",
	xtype : "input",
	setting : {
		format : 'num'
	}
}, {
	id : "exam05",
	xtype : "input"
}, {
	id : "exam06",
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
	id : "beforeBornDirect",
	xtype : "list",
	setting : {
		ds : "159",
		multi : true,
		save : "id",
		mapping : {
			value : 'beforeBornDirectId'
		},
		forceNewline : true
	},
	requires : {
		valEq : 8,
		fields : [ "beforeBornDirectOther" ]
	}
}, {
	id : "beforeBornDirectOther",
	xtype : "input",
	setting : {
		disabled : true,
		caption : "其它"
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
		size : "10",
		caption : "原因"
	}
}, {
	id : "transUnit",
	xtype : "input",
	setting : {
		disabled : true,
		caption : "机构及科室"
	}
}, {
	id : "nextVisitDate",
	xtype : "input",
	setting : {
		format : 'date',
		maxlen : 8,
		size : 10
	}
}, {
	id : "visitDoctor",
	xtype : "input"
}, {// 胎位
	id : "exam07",
	xtype : "input"
}, {// 是否高危选项
	id : "highRisk",
	xtype : "list",
	setting : {
		ds : "171",
		isDefaultVal : true,
		defaultVal : 1
	},
	requires : {
		valEq : 1,
		fields : [ 'highRiskRemark', 'highRiskSearch' ]
	}
}, {// 高危描述
	id : "highRiskRemark",
	xtype : "input",
	setting : {
		disabled : true,
		size : 50
	}
}, {// 高危筛选
	id : "highRiskSearch",
	xtype : "input",
	setting : {
		disabled : true,
		caption : "高危筛选",
		maxlen : 30,
		size : 14,
		isFocus : true,
		serviceType : 1,
		isSpecial : true
	}
}
/*, {
	id : "gravidity",
	xtype : "input",
	setting : {
		format : 'int',
		size : 10,
		gravidityEvent : {
			fileNo : 'fileNo span',
			tableName : 'VisitBeforeBorn'
		}
	},
	required : [ true, "孕次" ]
}
*/, {
	id : "edema",
	xtype : "input"
}, {
	id : "diagnosisRemark",
	xtype : "input",
	setting : {
		size : 40
	}
}, {
	id : "bornBirthAddressPlan",
	xtype : "list",
	setting : {
		ds : "2003"
	}
}, {
	id : "pelvis01",
	xtype : "input",
	setting : {
		format : "num"
	}
}, {
	id : "pelvis02",
	xtype : "input",
	setting : {
		format : "num"
	}
}, {
	id : "pelvis03",
	xtype : "input",
	setting : {
		format : "num"
	}
}, {
	id : "pelvis04",
	xtype : "input",
	setting : {
		format : "num"
	}
}, {
	id : "foreignId",
	xtype : "input"
} ];
//(function(){
//	var json = parseParams(window.location.search);
//	console.log(json);
//	if(json.foreignId != undefined){
//		systemInformationUtils.getHistoryExamRecord(json.foreignId,services.tableName,function(data){
//			console.log(data);
//			if(data != null){
////				$("#" + json.foreignId + "div_id").remove();
//				$(".panes").append("<div class='span-22 last' id='" + json.foreignId + "div_id'> </div>");
//				console.log($(".tabs").html());
//		        $(".tabs").append("<li><a href=\"#\" style='color:blue !important;'>历史记录(" + data[0] + "次)</a></li>");
//		        $("ul.tabs").tabs("div.panes > div", {
//		        	api: true
//		        });
//		        var ids = data[1];
//		        console.log($(".outerContainer").html());
//		        console.log('***************1111111111******************');
//			}
//		});
//	}else{
//		console.log('***************在录入界面选择人员******************');
//	}
//}).call(this);