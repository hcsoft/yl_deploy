var services = {
	get : ChildrenMediExamService.get,
	save : ChildrenMediExamService.save,
	propValidate : ChildrenMediExamService.hasAllThese,
	tableName : 'ChildrenMediExam'
};

var cfg = [
		{
			id : "name",
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
		{ // 检查年龄
			id : "checkItem",
			xtype : "list",
			setting : {
				ds : "173",
				newlineStep : 8
			},
			required : [ true, "检查月龄" ]
		},
		{ // 随访日期
			id : "visitDate",
			xtype : "input",
			setting : {
				maxlen : 8,
				size : 10,
				format : 'date',
				blurFun : true,
				fillField : [ 'textarea', 'fileNo span',
						[ 'earlyDirect', 'dietDirect', 'protectDirect' ] ]
			}
		},
		{ // 体重
			id : "weight",
			xtype : "input",
			setting : {
				maxlen : 30,
				size : 10,
				format : 'num',
				evaluate : true,
				evaluateItem : 'weight',
				fileInput : [ 'weightScore', 'fileNo', 'height',
						'evaluateChild' ]
			}
		},
		{ //
			id : "weightScore",
			xtype : "list",
			setting : {
				ds : "172",
				disabled : true,
				scoredisable : true
			}
		},
		{ // 身长
			id : "height",
			xtype : "input",
			setting : {
				maxlen : 30,
				size : 10,
				format : 'num',
				evaluate : true,
				evaluateItem : 'height',
				fileInput : [ 'heightScore', 'fileNo', 'weight',
						'evaluateChild' ]
			}
		}, { //
			id : "heightScore",
			xtype : "list",
			setting : {
				ds : "172",
				disabled : true,
				scoredisable : true
			}
		}, { // 随访日期
			id : "nextVisitDate",
			xtype : "input",
			setting : {
				maxlen : 8,
				size : 10,
				format : 'date'
			}
		}, { // 面色
			id : "face",
			xtype : "list",
			setting : {
				ds : "153",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "3",
				fields : [ "faceOther" ]
			}
		// 
		}, { // 面色其它描述
			id : "faceOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 50,
				caption : "其它面色描述"
			}
		}, { // 皮肤
			id : "exam01",
			xtype : "list",
			setting : {
				ds : "96",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "2",
				fields : [ "exam01other" ]
			}
		// 
		}, { // 皮肤异常描述
			id : "exam01other",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 50,
				caption : "异常描述"
			}
		}, { // 前卤形状
			id : "exam02",
			xtype : "list",
			setting : {
				ds : "68",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		}, { // 前卤尺寸长
			id : "exam03",
			xtype : "input",
			setting : {
				maxlen : 30,
				size : 10,
				format : "num"
			}
		}, { // 前卤尺寸宽
			id : "exam04",
			xtype : "input",
			setting : {
				maxlen : 30,
				size : 10,
				format : "num"
			}
		}, { // 眼
			id : "eyes",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "eyesOther" ]
			},
			setting : {
				ds : "96",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		}, { // 异常描述
			id : "eyesOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		}, { // 耳
			id : "ears",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "earsOther" ]
			},
			setting : {
				ds : "96",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		}, { // 异常描述
			id : "earsOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		}, { // 出牙数
			id : "exam05",
			xtype : "input",
			setting : {
				maxlen : 30,
				size : 20,
				format : "int"
			}
		}, { // 心肺
			id : "heart",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "heartOther" ]
			},
			setting : {
				ds : "96",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		}, { // 异常描述
			id : "heartOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		}, { // 腹部
			id : "exam06",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "exam06other" ]
			},
			setting : {
				ds : "96",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		}, { // 异常描述
			id : "exam06other",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		}, { // 脐部
			id : "exam07",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "exam07other" ]
			},
			setting : {
				ds : "96",
				isDefaultVal : true,
				defaultVal : 0
			}
		}, { // 异常描述
			id : "exam07other",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		}, { // 四肢
			id : "exam08",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "exam08other" ]
			},
			setting : {
				ds : "96",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		}, { // 异常描述
			id : "exam08other",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		}, { // 佝偻病症状
			id : "childrenMediExamExam09",
			xtype : "list",
			setting : {
				ds : "32",
				multi : true,
				save : 'id',
				controlShow : 0,
				displayCols : [ 'number', 'name' ],
				displayColNames : [ "编号", "方式" ],
				mapping : {
					value : 'childrenMediExamExam09id'
				},
				isDefaultVal : true,
				defaultVal : 0
			}
		}, { // 佝偻病体征
			id : "childrenMediExamExam10",
			xtype : "list",
			setting : {
				ds : "31",
				controlShow : 0,
				maxlen : 10,
				size : 10,
				newlineStep : 6,
				multi : true,
				save : 'id',
				displayCols : [ 'number', 'name' ],
				displayColNames : [ "编号", "方式" ],
				mapping : {
					value : 'childrenMediExamExam10id'
				},
				isDefaultVal : true,
				defaultVal : 0
			}
		}, { // 外生殖器
			id : "exam11",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "exam11other" ]
			},
			setting : {
				ds : "96",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		}, { // 异常描述
			id : "exam11other",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		}, { // 血红蛋白值
			id : "exam12",
			xtype : "input",
			setting : {
				maxlen : 30,
				size : 10
			}
		}, { // 户外活动
			id : "activityTime",
			xtype : "input",
			setting : {
				maxlen : 10,
				size : 5,
				format : "num"
			}
		}, { // 维生素D用量
			id : "wdcount",
			xtype : "input",
			setting : {
				maxlen : 30,
				size : 5,
				format : "num"
			}
		}, { // 发育评估
			id : "evaluate",
			xtype : "list",
			setting : {
				ds : "188",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "2",
				fields : [ "evaluateOther" ]
			}
		}, { // 异常描述
			id : "evaluateOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "描述"
			}
		}, { // 两次随访间患病情况
			id : "state",
			xtype : "list",
			setting : {
				ds : "189",
				isDefaultVal : true,
				defaultVal : 0
			}
		}, { // 其它
			id : "other",
			xtype : "input",
			setting : {
				maxlen : 30,
				size : 50
			}
		}, { // 转诊
			id : "transfer",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "transReason", "transUnit" ]
			},
			setting : {
				ds : "151",
				maxlen : 10,
				size : 10,
				save : "isInputValue",
				isDefaultVal : true,
				defaultVal : 0
			},
			required : [ true, "是否转诊" ]
		}, { // 转诊原因
			id : "transReason",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 10,
				caption : "原因"
			}
		}, { // 原因
			id : "transUnit",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "机构及科室"
			}
		}, { // 新生儿访视指导
			id : "checkDirect",
			xtype : "list",
			setting : {
				ds : "155",
				multi : true,
				save : 'id',
				displayCols : [ 'number', 'name' ],
				displayColNames : [ "编号", "方式" ],
				mapping : {
					value : 'checkDirectId'
				}
			}
		}, { // 其它指导描述
			id : "directOther",
			xtype : "input",
			setting : {
				maxlen : 30,
				size : 20
			}
		}, { // 下次访视日期
			id : "nextVisitDate",
			xtype : "input",
			setting : {
				format : 'date',
				maxlen : 8,
				size : 10
			}
		}, { // 随访医生
			id : "visitDoctor",
			xtype : "input",
			setting : {
				maxlen : 30,
				size : 10
			}
		}, {
			id : "dataType",
			xtype : "input",
			setting : {
				disabled : true,
				defaultVal : "0"
			}
		}, {// 头围
			id : "head",
			xtype : "input",
			setting : {
				format : "num",
				size : 10,
				maxlen : 20
			}
		}, {// 颈部包块
			id : "exam13",
			xtype : "list",
			setting : {
				ds : "151",
				save : "isInputValue",
				isDefaultVal : true,
				defaultVal : 0
			}
		}, {// 听力
			id : "exam14",
			xtype : "list",
			setting : {
				ds : "188",
				isDefaultVal : true,
				defaultVal : 0
			}
		}, {// 口腔
			id : "exam15",
			xtype : "list",
			setting : {
				ds : "96",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "2",
				fields : [ "exam15Other" ]
			}
		}, {
			id : "exam15Other",
			xtype : "input",
			setting : {
				disabled : true,
				size : 20,
				maxlen : 40,
				caption : "异常描述"
			}
		}, {
			id : "exam16",
			xtype : "list",
			setting : {
				ds : "96",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "2",
				fields : [ "exam16Other" ]
			}
		}, {
			id : "exam16Other",
			xtype : "input",
			setting : {
				disabled : true,
				size : 20,
				maxlen : 40,
				caption : "异常描述"
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
				serviceType : 0,
				isSpecial : true
			}
		}, {// 血压
			id : 'pressure',
			xtype : 'input',
			setting : {
				size : 10,
				showOnly : true,
				readonly : true
			}
		}, {// 胸廓
			id : 'pleura',
			xtype : 'list',
			setting : {
				ds : "1460",
				newlineStep : 4,
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "6",
				fields : [ "pleuraRemark" ]
			}
		}, {// 胸廓描述
			id : 'pleuraRemark',
			xtype : 'input',
			setting : {
				disabled : true,
				size : 10,
				caption : "其它"
			}
		}, {// 乳牙数
			id : 'mikTooth',
			xtype : 'input',
			setting : {
				size : 20
			}
		}, {// 龋齿
			id : 'decayedTooth',
			xtype : 'input',
			setting : {
				size : 20
			}
		}, {// 咽、扁
			id : 'throatFlat',
			xtype : 'list',
			setting : {
				ds : "1452",
				newlineStep : 3,
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "4",
				fields : [ "throatFlatRemark" ]
			}
		}, {// 咽、扁描述
			id : 'throatFlatRemark',
			xtype : 'input',
			setting : {
				disabled : true,
				size : 10,
				caption : "其它"
			}
		}, {// 左眼
			id : 'leftEyes',
			xtype : 'input',
			setting : {
				size : 20,
				showOnly : true,
				readonly : true
			}
		}, {// 右眼
			id : 'rightEyes',
			xtype : 'input',
			setting : {
				size : 20,
				showOnly : true,
				readonly : true
			}
		}, {// 全身浅表淋巴结
			id : 'lymphNode',
			xtype : 'list',
			setting : {
				ds : "1457",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "2",
				fields : [ "lymphNodeRemark" ]
			}
		}, {// 全身浅表淋巴结描述
			id : 'lymphNodeRemark',
			xtype : 'input',
			setting : {
				disabled : true,
				size : 10,
				caption : "其它"
			}
		}, {// 肺脏
			id : 'lung',
			xtype : 'list',
			setting : {
				ds : "96",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "2",
				fields : [ "lungOther" ]
			}
		}, {// 异常描述
			id : "lungOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		}, {// 心脏
			id : 'heartChild',
			xtype : 'list',
			setting : {
				ds : "96",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "2",
				fields : [ "heartChildOther" ]
			}
		}, {// 异常描述
			id : "heartChildOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		}, {// 肝脏
			id : 'liver',
			xtype : 'list',
			setting : {
				ds : "1467",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "3",
				fields : [ "liverOther" ]
			}
		}, {// 异常描述
			id : "liverOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "其它"
			}
		}, {// 脾脏
			id : 'spleen',
			xtype : 'list',
			setting : {
				ds : "1467",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "3",
				fields : [ "spleenOther" ]
			}
		}, {// 异常描述
			id : "spleenOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "其它"
			}
		}, {// 神经心理
			id : 'nerveMental',
			xtype : 'list',
			setting : {
				ds : "96",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "2",
				fields : [ "nerveMentalOther" ]
			}
		}, {// 异常描述
			id : "nerveMentalOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		}, {// 髋关节外展试验
			id : 'pelvis',
			xtype : 'list',
			setting : {
				ds : "11",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "2",
				fields : [ "pelvisOther" ]
			}
		}, {// 异常描述
			id : "pelvisOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		}, {// 现患疾病
			id : 'illness',
			xtype : 'input',
			setting : {
				size : 50
			}
		}, {// 综合评估
			id : 'evaluateChild',
			xtype : 'input',
			setting : {
				size : 50
			}
		}, {
			id : 'onlinePhoto',
			xtype : 'image'
		}, {// 营养指导
			id : "dietDirect",
			xtype : "input",
			setting : {
				multiline : true,
				width : '400px',
				height : '100px'
			}
		}, {// 早教指导
			id : "earlyDirect",
			xtype : "input",
			setting : {
				multiline : true,
				width : '400px',
				height : '100px'
			}
		}, {// 预防接种指导
			id : "protectDirect",
			xtype : "input",
			setting : {
				multiline : true,
				width : '400px',
				height : '100px'
			}
		}, { // 鼻
			id : "nose",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "noseother" ]
			},
			setting : {
				ds : "96",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		}, { // 异常描述
			id : "noseother",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		}, {// 新生儿疾病筛查
			id : "hearing",
			xtype : "list",
			setting : {
				ds : "108",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		}, { // 脊柱
			id : "backbone",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "backboneOther" ]
			},
			setting : {
				ds : "96",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		}, { // 异常描述
			id : "backboneOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		}, { // 喂养方式
			id : "breastMilk",
			xtype : "list",
			setting : {
				ds : "98"
			}
		}, {
			id : "foreignId",
			xtype : "input"
		} ];