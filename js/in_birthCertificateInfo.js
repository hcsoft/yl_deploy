//    var loadTriggerParameters = ["fileNo"];
var services = {
	get : ChildBirthService.get,
	save : ChildBirthService.save,
	tableName : 'ChildBirthRecord'
};

var cfg = [
		{
			id : "mname",
			xtype : "input",
			setting : {
				maxlen : 30,
				size : 10,
				showOnly : true,
				readonly : true
			}
		},
		{
			id : "districtNumber",
			xtype : "input",
			setting : {
				showOnly : true,
				asLabel : true
			}
		},
		{
			id : "fileNo",
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
				roWhenSet : true,
				writeback : [ {
					id : "mname",
					col : 1
				}, {
					id : "motherName",
					col : 1
				}, {
					id : "motherAge",
					col : 4
				}, {
					id : "barCode",
					col : 6
				} ],
				mCodePrefixCtrlId : 'districtNumber',
				displayCols : [ 1, 2, 3, 7 ],
				displayColNames : [ "编号", "", "", "" ]
			},
			required : [ true, "编号" ]
		},
		{
			id : "barCode",
			xtype : "input",
			setting : {
				showOnly : true,
				readonly : true
			}
		},
		{
			id : "childbirthYear",
			xtype : "input",
			setting : {
				maxlen : 4,
				size : 5,
				format : 'num',
				readonly : true,
				defaultVal : (new Date()).getFullYear()
			}
		},
		{
			id : "childbirthMonth",
			xtype : "input",
			setting : {
				maxlen : 2,
				size : 5,
				format : 'num',
				readonly : true,
				defaultVal : ((new Date()).getMonth() + 1) < 10 ? '0'
						+ ((new Date()).getMonth() + 1) : (new Date())
						.getMonth() + 1
			}
		},
		{
			id : "childbirthDay",
			xtype : "input",
			setting : {
				maxlen : 2,
				size : 5,
				format : 'num',
				readonly : true,
				defaultVal : (new Date()).getDate() < 10 ? '0'
						+ (new Date()).getDate() : (new Date()).getDate()
			}
		},
		{
			id : "flooding",
			xtype : "input",
			setting : {
				maxlen : 10,
				size : 18,
				format : 'num'
			},
			required : [ true, "产后出血" ]
		},
		{
			id : "childbirthAddress",
			xtype : "list",
			setting : {
				ds : "1370",
				isDefaultVal : true,
				defaultVal : 0
			},
			required : [ true, "分娩地点" ]
		},
		{
			id : "borthWeekly",
			xtype : "input",
			setting : {
				defaultVal : 40
			},
			required : [ true, "分娩孕周" ]
		},
		{
			id : "childbirthWay",
			xtype : "list",
			setting : {
				ds : "1376",
				isDefaultVal : true,
				defaultVal : 0
			},
			required : [ true, "分娩方式" ]
		},
		{
			id : "deliverWay",
			xtype : "list",
			setting : {
				ds : "1382",
				isDefaultVal : true,
				defaultVal : 3
			},
			required : [ true, "接生方式" ]
		},
		{
			id : "lacerationOfPerineum",
			xtype : "list",
			setting : {
				ds : "1387",
				isDefaultVal : true,
				defaultVal : 0
			},
			required : [ true, "会阴撕裂" ]
		},
		{
			id : "outerFissure",
			xtype : "input",
			setting : {
				maxlen : 8,
				size : 10,
				defaultVal : '0'
			},
			required : [ true, "缝合情况外缝" ]
		},
		{
			id : "bloodPressure",
			xtype : "input",
			setting : {
				maxlen : 8,
				size : 10
			},
			required : [ true, "缝合情况产后血压" ]
		},
		{
			id : "deal",
			xtype : "list",
			setting : {
				ds : "1393",
				isDefaultVal : true,
				defaultVal : 4
			},
			required : [ true, "产后处理" ]
		},
		{
			id : "comorbidity",
			xtype : "list",
			setting : {
				ds : "1399",
				newlineStep : 5,
				isDefaultVal : true,
				defaultVal : 7
			},
			required : [ true, "产时合并症" ],
			requires : {
				valEq : "7",
				fields : [ "comorbidityOther" ]
			}
		// 
		},
		{
			id : "comorbidityOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 20,
				size : 10
			}
		},
		{
			id : "criticalWoman",
			xtype : "list",
			setting : {
				ds : "1408",
				isDefaultVal : true,
				defaultVal : 1
			},
			required : [ true, "危急孕产妇" ]
		},
		{
			id : "criticalSymptom",
			xtype : "input",
			setting : {
				maxlen : 30,
				size : 18,
				defaultVal : '无'
			},
			required : [ true, "危急症状" ]
		},
		{
			id : "sex",
			xtype : "list",
			setting : {
				ds : "1411"
			},
			required : [ true, "新生儿性别" ]
		},
		{// 城镇居民
			id : "weight",
			xtype : "input",
			setting : {
				format : "num"
			},
			required : [ true, "体重" ]
		},
		{
			id : "babySurvive",
			xtype : "list",
			setting : {
				ds : "1414",
				isDefaultVal : true,
				defaultVal : 0
			},
			required : [ true, "新生儿存活情况" ]
		},
		{
			id : "babyBirth",
			xtype : "list",
			setting : {
				ds : '1417',
				isDefaultVal : true,
				defaultVal : 0
			},
			required : [ true, "新生儿出生情况" ],
			requires : {
				valEq : "7",
				fields : [ "babyBirthOther" ]
			}
		// 
		},
		{
			id : "babyBirthOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 20,
				size : 20
			}
		},
		{
			id : "babyComorbidity",
			xtype : "list",
			setting : {
				ds : "1425",
				newlineStep : 5,
				isDefaultVal : true,
				defaultVal : 6
			},
			required : [ true, "新生儿并发症" ],
			requires : {
				valEq : "6",
				fields : [ "babyComorbidityOther" ]
			}
		},
		{
			id : "babyComorbidityOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 20,
				size : 20
			}
		},
		{
			id : "nurseTime",
			xtype : "list",
			setting : {
				ds : "1433",
				isDefaultVal : true,
				defaultVal : 1
			},
			required : [ true, "开奶时间" ]
		},
		{
			id : "diagnosis",
			xtype : "input",
			setting : {
				maxlen : 20,
				size : 20,
				defaultVal : 'G1P1孕足月单胎头位顺产'
			},
			required : [ true, "产后诊断" ]
		},
		{
			id : "borthOrganization",
			xtype : "input",
			setting : {
				maxlen : 20,
				size : 20
			},
			required : [ true, "接生单位" ]
		},
		{
			id : "widwife",
			xtype : "input",
			setting : {
				maxlen : 20,
				size : 20
			},
			required : [ true, "接生人员" ]
		},
		{
			id : "name",
			xtype : "input",
			setting : {
				maxlen : 10,
				size : 10
			}
		},
		{
			id : "birthdaybo",
			xtype : "datefield",
			setting : {
				defaultVal : new Date(),
				genChildBirthDate : [ "childbirthYear", "childbirthMonth",
						"childbirthDay" ]
			}
		// required : [true, "出生日期"]
		},
		{
			id : "province",
			xtype : "input",
			setting : {
				maxlen : 10,
				size : 10
			},
			required : [ true, "省" ]
		},
		{
			id : "city",
			xtype : "input",
			setting : {
				maxlen : 10,
				size : 10
			},
			required : [ true, "市" ]
		},
		{
			id : "county",
			xtype : "input",
			setting : {
				maxlen : 10,
				size : 10
			},
			required : [ true, "县" ]
		},
		{
			id : "township",
			xtype : "input",
			setting : {
				maxlen : 10,
				size : 10
			},
			required : [ true, "乡" ]
		},
		{
			id : "healthStatus",
			xtype : "list",
			setting : {
				ds : "1438",
				isDefaultVal : true,
				defaultVal : 0
			},
			required : [ true, "健康状况" ]
		},
		{
			id : "height",
			xtype : "input",
			setting : {
				maxlen : 10,
				size : 10,
				format : 'num'
			},
			required : [ true, "身长" ]
		},
		{
			id : "motherName",
			xtype : "input",
			setting : {
				maxlen : 10,
				size : 10
			},
			required : [ true, "母亲姓名" ]
		},
		{
			id : "motherAge",
			xtype : "input",
			setting : {
				maxlen : 10,
				size : 10,
				format : 'int'
			},
			required : [ true, "年龄" ]
		},
		{
			id : "motherNationality",
			xtype : "input",
			setting : {
				maxlen : 10,
				size : 10
			},
			required : [ true, "国籍" ]
		},
		{
			id : "motherNation",
			xtype : "input",
			setting : {
				maxlen : 10,
				size : 10,
				defaultVal : '汉'
			},
			required : [ true, "民族" ]
		},
		{
			id : "motherIdCard",
			xtype : "input",
			setting : {
				maxlen : 18,
				size : 18,
				calculateAge : true,
				calculateBirthdayByIDNumber : [ 'motherAge' ]
			},
			required : [ true, "身份证号" ]
		},
		{
			id : "fatherName",
			xtype : "input",
			setting : {
				maxlen : 10,
				size : 10
			},
			required : [ true, "父亲姓名" ]
		},
		{
			id : "fatherAge",
			xtype : "input",
			setting : {
				maxlen : 10,
				size : 10,
				format : 'int'
			},
			required : [ true, "年龄" ]
		},
		{
			id : "fatherNationality",
			xtype : "input",
			setting : {
				maxlen : 10,
				size : 10
			},
			required : [ true, "国籍" ]
		},
		{
			id : "fatherNation",
			xtype : "input",
			setting : {
				maxlen : 10,
				size : 10,
				defaultVal : '汉'
			},
			required : [ true, "民族" ]
		},
		{
			id : "fatherIdCard",
			xtype : "input",
			setting : {
				maxlen : 18,
				size : 18,
				calculateAge : true,
				calculateBirthdayByIDNumber : [ 'fatherAge' ]
			},
			required : [ true, "身份证号" ]
		},
		{
			id : "borthAddressCategory",
			xtype : "list",
			setting : {
				ds : "1442",
				isDefaultVal : true,
				defaultVal : 0
			},
			required : [ true, "出生地分类" ],
			requires : {
				valEq : "4",
				fields : [ "otherBorthAddressCategory" ]
			}
		// 
		},
		{
			id : "otherBorthAddressCategory",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 20,
				size : 20
			}
		},
		{
			id : "certifiId",
			xtype : "input",
			setting : {
				maxlen : 20,
				size : 20,
				asLabel : true
			}
		},
		{
			id : "issuingDatebo",
			xtype : "datefield",
			setting : {
				defaultVal : new Date(),
				disabled : true
			}
		// required : [true, "签发日期"]
		},
		{
			id : "issuingOrganization",
			xtype : "input",
			setting : {
				maxlen : 18,
				size : 18
			},
			required : [ true, "签证机构" ]
		},
		{
			id : "familyAddress",
			xtype : "input",
			setting : {
				maxlen : 30,
				size : 30
			},
			required : [ true, "家庭住址" ]
		},
		{
			id : "districtNum",
			xtype : "input",
			setting : {
				maxlen : 18,
				size : 18,
				searchDistrict : true
			},
			required : [ true, "所属行政区划编码" ]
		},
		{
			id : "linkmanTel",
			xtype : "input",
			setting : {
				maxlen : 11,
				size : 10
			},
			required : [ true, "联系电话" ]
		},
		{
			id : "totalLaborHours",
			xtype : "input",
			setting : {
				format : 'num',
				size : 5,
				maxlen : 2
			}
		},{
            id : "totalLaborMinutes",
            xtype : "input",
            setting : {
                format : 'num',
                size : 5,
                maxlen : 2
            }
        },
		{
			id : "oneLaborHours",
			xtype : "input",
			setting : {
				format : 'num',
				size : 5,
                maxlen : 2
			}
		},{
            id : "oneLaborMinutes",
            xtype : "input",
            setting : {
                format : 'num',
                size : 5,
                maxlen : 2
            }
        },
		{
			id : "twoLaborHours",
			xtype : "input",
			setting : {
				format : 'num',
				size : 5,
                maxlen : 2
			}
		},
		{
			id : "twoLaborMinutes",
			xtype : "input",
			setting : {
				format : 'int',
				size : 5,
                maxlen : 2
			}
		},
		{
			id : "threeLaborMinutes",
			xtype : "input",
			setting : {
				format : 'int',
				size : 5,
                maxlen : 2
			}
		},
		{
			id : "placentaParturitionDate",
			xtype : "datefield"
		},
		{
			id : "placentaParturitionWay",
			xtype : "list",
			setting : {
				ds : "2005"
			}
		},
		{
			id : "complication",
			xtype : "list",
			setting : {
				ds : "151",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "2",
				fields : [ "complicationName" ]
			}
		},
		{
			id : "complicationName",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 20,
				size : 20,
				caption : "并发症名称"
			}
		},
		{
			id : "apgar01",
			xtype : "input",
			setting : {
				size : 10
			}
		},
		{
			id : "apgar02",
			xtype : "input",
			setting : {
				size : 10
			}
		},
		{
			id : "birthTrauma",
			xtype : "list",
			setting : {
				ds : "151",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "2",
				fields : [ "birthTraumaOther" ]
			}
		},
		{
			id : "birthTraumaOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 20,
				size : 20,
				caption : "部位名称"
			}
		},
		{
			id : "birthDefects",
			xtype : "list",
			setting : {
				ds : "151",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "2",
				fields : [ "birthDefectsOther" ]
			}
		},
		{
			id : "birthDefectsOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 20,
				size : 20,
				caption : "名称"
			}
		},
		{
			id : "bleeding01",
			xtype : "input",
			setting : {
				format : "num",
				size : 18
			}
		},
		{
			id : "bleeding02",
			xtype : "input",
			setting : {
				format : "num",
				size : 18
			}
		},
		{
			id : "dischargeDiagnosis01",
			xtype : "input",
			setting : {
				maxlen : 200,
				multiline : true,
				width : '300px',
				height : '50px',
				size : 40
			}
		},
		{
			id : "dischargeDiagnosis02",
			xtype : "input",
			setting : {
				maxlen : 200,
				multiline : true,
				width : '300px',
				height : '50px',
				size : 40
			}
		},
		{
			id : "isComplete",
			xtype : "list",
			setting : {
				ds : "2007",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "2",
				fields : [ "isNotComplete" ]
			}
		},
		{
			id : "isNotComplete",
			xtype : "list",
			setting : {
				disabled : true,
				ds : "2008"
			}
		},
		{
			id : "suffocation",
			xtype : "list",
			setting : {
				ds : "151",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "2",
				fields : [ "suffocationOther", "suffocationOther01" ]
			}
		},
		{
			id : "suffocationOther",
			xtype : "list",
			setting : {
				disabled : true,
				ds : "2009",
				caption : "青紫"
			}
		},
		{
			id : "suffocationOther01",
			xtype : "input",
			setting : {
				disabled : true,
				size : 15,
				caption : "苍白"
			}
		},
		{
			id : "cervicalLaceration",
			xtype : "list",
			setting : {
				ds : "151",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "2",
				fields : [ "cervicalLacerationPosition01",
						"cervicalLacerationPosition02" ]
			}
		}, {
			id : "cervicalLacerationPosition01",
			xtype : "input",
			setting : {
				disabled : true,
				size : 15,
				caption : "部位",
				inputUnits : "点"
			}
		}, {
			id : "cervicalLacerationPosition02",
			xtype : "input",
			setting : {
				disabled : true,
				size : 15,
				caption : "缝",
				inputUnits : "针"
			}
		}, {
			id : "diseaseScreening",
			xtype : "list",
			setting : {
				ds : "2006",
				multi : true,
				save : "id",
				mapping : {
					value : 'diseaseScreeningId'
				},
				forceNewline : true
			},
			requires : {
				valEq : 4,
				fields : [ 'diseaseScreeningOther' ]
			}
		}, {
			id : "diseaseScreeningOther",
			xtype : "input",
			setting : {
				disabled : true,
				// caption : "其他既往病史描述",
				maxlen : 50,
				size : 50
			}
		} ];
