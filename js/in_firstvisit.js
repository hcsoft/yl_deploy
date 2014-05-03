var services = {
	get : FirstVistBeforeBornService.get,
	save : FirstVistBeforeBornService.save,
	propValidate : FirstVistBeforeBornService.hasAllThese,
	tableName : 'FirstVistBeforeBorn'
};

var cfg = [
		{
			id : "name",
			xtype : "input",
			setting : {
				maxlen : 20,
				size : 10,
				readonly : true,
				showOnly : true
			}
		},
		{
			id : "bornAge",
			xtype : "input",
			setting : {
				maxlen : 20,
				size : 10
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
					id : "bornAge",
					col : 4
				}, {
					id : "barCode",
					col : 6
				}, {
					id : "foreignId",
					col : 8
				} ],
				showHistoryRecordSingle : {
					foreignIdCol : 8,
					foreignIdName : 'foreignId'
				},
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
			id : "visitDate",
			xtype : "input",
			setting : {
				format : 'date',
				maxlen : 20,
				size : 10,
				defaultVal : new Date()
			},
			required : [ true, "访视日期" ]
		},
		{
			id : "weeks",
			xtype : "input",
			setting : {
				maxlen : 10,
				size : 10
			}
		},
		{
			id : "husbandName",
			xtype : "input",
			setting : {
				maxlen : 10,
				size : 10
			}
		},
		{
			id : "husbandAge",
			xtype : "input",
			setting : {
				format : 'int',
				size : 10
			}
		},
		{
			id : "husbandTel",
			xtype : "input",
			setting : {
				maxlen : 11,
				size : 11
			}
		},
		{
			id : "gravidity",
			xtype : "input",
			setting : {
				format : 'int',
				size : 10,
				gravidityEvent : {
					fileNo : 'fileNo span',
					tableName : 'FirstVistBeforeBorn'
				}
			},
			required : [ true, "孕次" ]
		},
		{
			id : "parity",
			xtype : "input",
			setting : {
				format : 'int',
				size : 5
			}
		},
		{
			id : "parity1",
			xtype : "input",
			setting : {
				format : 'int',
				size : 5
			}
		},
		{
			id : "lastMenses",
			xtype : "input",
			setting : {
				format : 'date',
				maxlen : 8,
				size : 10,
				isCalculateTime : [ [ 'edc', 281 ], [ 'nextVisitDate', 141 ] ]
			}
		},
		{
			id : "edc",
			xtype : "input",
			setting : {
				format : 'date',
				maxlen : 8,
				size : 10
			}
		},
		{
			id : "femePastHistory",
			xtype : "list",
			setting : {
				ds : "158",
				multi : true,
				save : "id",
				mapping : {
					value : 'femePastHistoryId'
				},
				forceNewline : true,
				controlShow : 0,
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : 8,
				fields : [ 'pastHistoryOther' ]
			}
		},
		{
			id : "pastHistoryOther",
			xtype : "input",
			setting : {
				disabled : true,
				caption : "其他既往病史描述",
				maxlen : 50,
				size : 50
			}
		},
		{
			id : "femeFamilyHistory",
			xtype : "list",
			setting : {
				ds : "44",
				multi : true,
				save : "id",
				mapping : {
					value : 'femeFamilyHistoryId'
				},
				// forceNewline : true,
				controlShow : 0,
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : 4,
				fields : [ 'familyHistoryOther' ]
			}
		},
		{
			id : "familyHistoryOther",
			xtype : "input",
			setting : {
				disabled : true,
				caption : "其他家族病史描述",
				maxlen : 50,
				size : 50
			}
		},
		{
			id : "opshistory",
			xtype : "list",
			setting : {
				ds : "151",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : 2,
				fields : [ "opshistoryOther" ]
			}
		},
		{
			id : "opshistoryOther",
			xtype : "input",
			setting : {
				disabled : true,
				caption : "妇科手术史描述",
				maxlen : 50,
				size : 50
			}
		},
		{
			id : "pregnant1",
			xtype : "input",
			setting : {
				format : 'int',
				maxlen : 10,
				size : 15
			}
		},
		{
			id : "pregnant2",
			xtype : "input",
			setting : {
				format : 'int',
				maxlen : 10,
				size : 15
			}
		},
		{
			id : "pregnant3",
			xtype : "input",
			setting : {
				format : 'int',
				maxlen : 10,
				size : 15
			}
		},
		{
			id : "pregnant4",
			xtype : "input",
			setting : {
				format : 'int',
				maxlen : 10,
				size : 15
			}
		},
		{
			id : "pregnant5",
			xtype : "input",
			setting : {
				format : 'int',
				maxlen : 10,
				size : 15
			}
		},
		{
			id : "height",
			xtype : "input",
			setting : {
				format : 'num'
			}
		},
		{
			id : "weight",
			xtype : "input",
			setting : {
				format : 'num'
			}
		},
		{
			id : "habitus",
			xtype : "input",
			setting : {
				// format: 'num'
				maxlen : 30,
				size : 5,
				readonly : true,
				asLabel : true
			},
			valFormula : $F('weight').div(
					$F('height').multi($F('height')).div($F(10000)))
		}, {
			id : "diastolicPressure",
			xtype : "input",
			setting : {
				format : 'num',
				size : 10
			}
		}, {
			id : "systolicPressure",
			xtype : "input",
			setting : {
				format : 'num',
				size : 10
			}
		}, {
			id : "exam01",
			xtype : "list",
			setting : {
				ds : "96",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : 2,
				fields : [ "exam01other" ]
			}
		}, {
			id : "exam01other",
			xtype : "input",
			setting : {
				disabled : true,
				caption : "异常描述",
				maxlen : 20,
				size : 20
			}
		}, {
			id : "exam02",
			xtype : "list",
			setting : {
				ds : "96",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : 2,
				fields : [ "exam02other" ]
			}
		}, {
			id : "exam02other",
			xtype : "input",
			setting : {
				disabled : true,
				caption : "异常描述",
				maxlen : 20,
				size : 20
			}
		}, {
			id : "exam03",
			xtype : "list",
			setting : {
				ds : "96",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : 2,
				fields : [ "exam03other" ]
			}
		}, {
			id : "exam03other",
			xtype : "input",
			setting : {
				disabled : true,
				caption : "异常描述",
				maxlen : 20,
				size : 20
			}
		}, {
			id : "exam04",
			xtype : "list",
			setting : {
				ds : "96",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : 2,
				fields : [ "exam04other" ]
			}
		}, {
			id : "exam04other",
			xtype : "input",
			setting : {
				disabled : true,
				caption : "异常描述",
				maxlen : 20,
				size : 20
			}
		}, {
			id : "exam05",
			xtype : "list",
			setting : {
				ds : "96",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : 2,
				fields : [ "exam05other" ]
			}
		}, {
			id : "exam05other",
			xtype : "input",
			setting : {
				disabled : true,
				caption : "异常描述",
				maxlen : 20,
				size : 20
			}
		}, {
			id : "exam06",
			xtype : "list",
			setting : {
				ds : "96",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : 2,
				fields : [ "exam06other" ]
			}
		}, {
			id : "exam06other",
			xtype : "input",
			setting : {
				disabled : true,
				caption : "异常描述",
				maxlen : 20,
				size : 20
			}
		}, {
			id : "exam07",
			xtype : "list",
			setting : {
				ds : "96",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : 2,
				fields : [ "exam07other" ]
			}
		}, {
			id : "exam07other",
			xtype : "input",
			setting : {
				disabled : true,
				caption : "异常描述",
				maxlen : 20,
				size : 20
			}
		}, {
			id : "exam08",
			xtype : "input",
			setting : {
			// format: 'num'
			}
		}, {
			id : "exam09",
			xtype : "input",
			setting : {
				format : 'num',
				size : 8
			}
		}, {
			id : "exam10",
			xtype : "input",
			setting : {
				format : 'num',
				size : 8
			}
		}, {
			id : "exam11",
			xtype : "input",
			setting : {
				maxlen : 30,
				size : 30
			}
		}, {
			id : "exam12",
			xtype : "input",
			setting : {
				maxlen : 20,
				size : 20
			}
		}, {
			id : "exam13",
			xtype : "input",
			setting : {
				maxlen : 20,
				size : 20
			}
		}, {
			id : "exam14",
			xtype : "input",
			setting : {
				maxlen : 20,
				size : 20
			}
		}, {
			id : "exam15",
			xtype : "input",
			setting : {
				maxlen : 20,
				size : 20
			}
		}, {
			id : "exam16",
			xtype : "input",
			setting : {
				maxlen : 20,
				size : 20
			}
		}, {
			id : "exam17",
			xtype : "input",
			setting : {
				format : 'num',
				size : 10
			}
		}, {
			id : "exam18",
			xtype : "input",
			setting : {
				format : 'num',
				size : 10
			}
		}, {
			id : "exam19",
			xtype : "input",
			setting : {
				format : 'num',
				size : 10
			}
		}, {
			id : "exam20",
			xtype : "input",
			setting : {
				format : 'num',
				size : 10
			}
		}, {
			id : "exam21",
			xtype : "input",
			setting : {
				format : 'num',
				size : 10
			}
		}, {
			id : "exam22",
			xtype : "input",
			setting : {
				format : 'num',
				size : 10
			}
		}, {
			id : "exam23",
			xtype : "input",
			setting : {
				format : 'num',
				size : 10
			}
		}, {
			id : "exam24",
			xtype : "input",
			setting : {
				format : 'num',
				size : 10
			}
		}, {
			id : "exam25",
			xtype : "input",
			setting : {
				format : 'num',
				size : 10
			}
		}, {
			id : "femeSecretion",
			xtype : "list",
			setting : {
				ds : "127",
				multi : true,
				save : "id",
				mapping : {
					value : 'femeSecretionId'
				},
				forceNewline : true,
				controlShow : 0,
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : 5,
				fields : [ 'exam26other' ]
			}
		}, {
			id : "exam26other",
			xtype : "input",
			setting : {
				disabled : true,
				caption : "其他分泌物描述",
				maxlen : 20,
				size : 20
			}
		}, {
			id : "exam27",
			xtype : "list",
			setting : {
				ds : "11",
				isDefaultVal : true,
				defaultVal : 0
			}
		}, {
			id : "exam28",
			xtype : "list",
			setting : {
				ds : "11",
				isDefaultVal : true,
				defaultVal : 0
			}
		}, {
			id : "evaluation",
			xtype : "list",
			setting : {
				ds : "96",
				isDefaultVal : true,
				defaultVal : 0

			},
			requires : {
				valEq : 2,
				fields : [ "beforeBornDirectOther" ]
			}
		}, {
			id : "beforeBornDirectOther",
			xtype : "input",
			setting : {
				disabled : true,
				caption : "异常描述"
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
				caption : "原因",
				maxlen : 30,
				size : 30
			}
		}, {
			id : "transUnit",
			xtype : "input",
			setting : {
				disabled : true,
				caption : "机构及科室",
				maxlen : 30,
				size : 30
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
			xtype : "input",
			setting : {
				maxlen : 20,
				size : 20
			}
		}, {// 个人史
			id : "personalHistory",
			xtype : "list",
			setting : {
				ds : "1300",
				multi : true,
				save : "id",
				mapping : {
					value : 'personalHistoryId'
				},
				forceNewline : true,
				controlShow : 0,
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : 7,
				fields : [ 'personalHistoryOther' ]
			}
		}, {// 其它个人史
			id : "personalHistoryOther",
			xtype : "input",
			setting : {
				disabled : true,
				caption : "其他个人病史描述",
				maxlen : 50,
				size : 50
			}
		}, {// 血型
			id : "bloodTypeAbo",
			xtype : "list",
			setting : {
				ds : "115"
			}
		}, {// RH
			id : "bloodTypeRh",
			xtype : "list",
			setting : {
				ds : "3",
				isDefaultVal : true,
				defaultVal : 0
			}
		}, {// 阴道清结度
			id : "femeClean",
			xtype : "list",
			setting : {
				ds : "1307"
			}
		}, {// 乙型肝炎表面抗原
			id : "hepatitis01",
			xtype : "list",
			setting : {
				ds : "11",
				isDefaultVal : true,
				defaultVal : 0
			}
		}, {// 乙型肝炎表面抗体
			id : "hepatitis02",
			xtype : "list",
			setting : {
				ds : "11",
				isDefaultVal : true,
				defaultVal : 0
			}
		}, {// 乙型肝炎e抗原
			id : "hepatitis03",
			xtype : "list",
			setting : {
				ds : "11",
				isDefaultVal : true,
				defaultVal : 0
			}
		}, {// 乙型肝炎e抗体
			id : "hepatitis04",
			xtype : "list",
			setting : {
				ds : "11",
				isDefaultVal : true,
				defaultVal : 0
			}
		}, {// 乙型肝炎核心抗体
			id : "hepatitis05",
			xtype : "list",
			setting : {
				ds : "11",
				isDefaultVal : true,
				defaultVal : 0
			}
		}, {// B超
			id : "exam29",
			xtype : "input",
			setting : {
				size : 50
			}
		}, {// 血糖
			id : "bloodSugar",
			xtype : "input",
			setting : {
				size : 20,
				format : "num"
			}
		}, {// 保健指导
			id : "beforeBornCheckDirect",
			xtype : "list",
			setting : {
				ds : "1347",
				multi : true,
				save : "id",
				mapping : {
					value : 'beforeBornCheckDirectId'
				},
				// forceNewline : true
				newlineStep : 5
			},
			requires : {
				valEq : 6,
				fields : [ 'beforeBornCheckDirectOther' ]
			}
		}, {// 其它保健指导
			id : "beforeBornCheckDirectOther",
			xtype : "input",
			setting : {
				disabled : true,
				caption : "其它指导",
				maxlen : 10,
				size : 10
			}
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
		}, {
			id : "vacuumExtraction",
			xtype : "input",
			setting : {
				format : 'int',
				size : 5
			}
		}, {
			id : "forceps",
			xtype : "input",
			setting : {
				format : 'int',
				size : 5
			}
		}, {
			id : "breech",
			xtype : "input",
			setting : {
				format : 'int',
				size : 5
			}
		}, {
			id : "presentIllnessHistory",
			xtype : "input",
			setting : {
				size : 80
			}
		}, {
			id : "menarcheAge",
			xtype : "input",
			setting : {
				format : 'int',
				size : 10
			}
		}, {
			id : "cycleOne",
			xtype : "input",
			setting : {
				format : 'num',
				size : 10
			}
		}, {
			id : "cycleTwo",
			xtype : "input",
			setting : {
				format : 'num',
				size : 10
			}
		}, {
			id : "endChildbirthDate",
			xtype : "input",
			setting : {
				format : 'date',
				maxlen : 8,
				size : 10
			}
		}, {
			id : "heartRate",
			xtype : "input",
			setting : {
				format : 'int',
				size : 10
			}
		}, {
			id : "breathingRate",
			xtype : "input",
			setting : {
				format : 'int',
				size : 10
			}
		}, {
			id : "liver",
			xtype : "list",
			setting : {
				ds : "96",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : 2,
				fields : [ "liverOther" ]
			}
		}, {
			id : "liverOther",
			xtype : "input",
			setting : {
				disabled : true,
				caption : "异常描述",
				maxlen : 20,
				size : 20
			}
		}, {
			id : "spleen",
			xtype : "list",
			setting : {
				ds : "96",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : 2,
				fields : [ "spleenOther" ]
			}
		}, {
			id : "spleenOther",
			xtype : "input",
			setting : {
				disabled : true,
				caption : "异常描述",
				maxlen : 20,
				size : 20
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
				caption : "异常描述",
				maxlen : 20,
				size : 20
			}
		}, {
			id : "otherExam",
			xtype : "list",
			setting : {
				ds : "96",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : 2,
				fields : [ "otherExamOther" ]
			}
		}, {
			id : "otherExamOther",
			xtype : "input",
			setting : {
				disabled : true,
				caption : "异常描述",
				maxlen : 20,
				size : 20
			}
		}, {
			id : "hivdetectDate",
			xtype : "input",
			setting : {
			    maxlen : 8,
				format : 'date'
			}
		}, {
			id : "syphilisDetectDate",
			xtype : "input",
			setting : {
			    maxlen : 8,
				format : 'date'
			}
		}, {
			id : "hepatitisBdetectDate",
			xtype : "input",
			setting : {
			    maxlen : 8,
				format : 'date'
			}
		}, {
			id : "diagnosisRemark",
			xtype : "input",
			setting : {
				size : 40
			}
		}, {
			id : "complicationHistory",
			xtype : "input",
			setting : {
				size : 30
			}
		}, {
			id : "survivalMale",
			xtype : "input",
			setting : {
				size : 15,
				format : 'int'
			}
		}, {
			id : "survivalFemale",
			xtype : "input",
			setting : {
				size : 15,
				format : 'int'
			}
		}, {
			id : "prematureBirth",
			xtype : "input",
			setting : {
				size : 15,
				format : 'int'
			}
		}, {
			id : "endAbortionDate",
			xtype : "input",
			setting : {
			    maxlen : 8,
				format : 'date'
			}
		}, {
			id : "contraceptiveHistory",
			xtype : "list",
			setting : {
				ds : "2004",
				multi : true,
				save : "id",
				mapping : {
					value : 'contraceptiveId'
				},
				forceNewline : true
			},
			requires : {
				valEq : 6,
				fields : [ 'contraceptiveHistoryOther' ]
			}
		}, {
			id : "contraceptiveHistoryOther",
			xtype : "input",
			setting : {
				disabled : true,
				// caption : "其他既往病史描述",
				maxlen : 50,
				size : 50
			}
		}, {
			id : "foreignId",
			xtype : "input"
		} ];
