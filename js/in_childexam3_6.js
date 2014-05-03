var services = {
	get : ChildrenMediExam36Service.get,
	save : ChildrenMediExam36Service.save,
	propValidate : ChildrenMediExam36Service.hasAllThese,
	tableName : 'ChildrenMediExam36'
};

var cfg = [
		{
			id : "name",
			xtype : "input",
			setting : {
				maxlen : 8,
				size : 8,
				width : 60,
				showOnly : true,
				// asLabel: true,
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
				displayColNames : [ "编号", "疾病", "", "" ]
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
			// 检查年龄
			id : "checkItem",
			xtype : "list",
			setting : {
				ds : "190",
				newlineStep : 10
			},
			required : [ true, "项目" ]
		},
		{
			id : "visitDate",
			xtype : "input",
			setting : {
				format : 'date',
				defaultVal : new Date(),
				maxlen : 8,
				size : 10,
				blurFun : true,
				fillField : [ 'textarea', 'fileNo span',
						[ 'earlyDirect', 'dietDirect', 'protectDirect' ] ]
			},
			required : [ true, "随访日期" ]
		},
		{
			id : "weight",
			xtype : "input",
			setting : {
				maxlen : 10,
				size : 10,
				format : "num",
				evaluate : true,
				evaluateItem : 'weight',
				fileInput : [ 'weightScore', 'fileNo', 'height', 'evaluate' ]
			}
		},
		{
			id : 'weightScore',
			xtype : 'list',
			setting : {
				ds : "172",
				disabled : true,
				scoredisable : true
			}
		},
		{
			id : "height",
			xtype : "input",
			setting : {
				maxlen : 10,
				size : 10,
				format : "num",
				evaluate : true,
				evaluateItem : 'height',
				fileInput : [ 'heightScore', 'fileNo', 'weight', 'evaluate' ]
			}
		},
		{
			id : 'heightScore',
			xtype : 'list',
			setting : {
				ds : "172",
				disabled : true,
				scoredisable : true
			}
		},
		{
			id : 'body',
			xtype : 'list',
			setting : {
				ds : "89",
				isDefaultVal : true,
				defaultVal : 0
			}
		},
		{
			id : 'sight',
			xtype : 'input',
			setting : {
				format : 'num'
			}
		},
		{
			id : 'hearing',
			xtype : 'list',
			setting : {
				ds : '188',
				isDefaultVal : true,
				defaultVal : 0
			}
		},
		{
			id : 'tooth',
			xtype : 'input',
			setting : {
				format : 'num',
				size : 10
			}
		},
		{
			id : 'caries',
			xtype : 'input',
			setting : {
				format : 'num',
				size : 10
			}
		},
		{
			id : 'heart',
			xtype : 'list',
			setting : {
				ds : '96',
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "2",
				fields : [ "heartOther" ]
			}
		},
		{
			id : 'heartOther',
			xtype : 'input',
			setting : {
				disabled : true,
				maxlen : 10,
				size : 10
			}
		},
		{
			id : 'venter',
			xtype : 'list',
			setting : {
				ds : '22',
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "2",
				fields : [ "venterOther" ]
			}
		},
		{
			id : 'venterOther',
			xtype : 'input',
			setting : {
				disabled : true,
				maxlen : 10,
				size : 10
			}
		},
		{
			id : 'hemoglobin',
			xtype : 'input',
			setting : {
				format : 'num'
			}
		},
		{
			id : 'other',
			xtype : 'input',
			setting : {
				size : 40,
				maxlen : 50
			}
		},
		{
			id : 'checkSickness',
			xtype : 'list',
			setting : {
				ds : '151',
				save : 'isInputValue',
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "2",
				fields : [ "pneumonia", "scour", "wound", "checkSicknessOther" ]
			}
		},
		{
			id : 'pneumonia',
			xtype : 'input',
			setting : {
				disabled : true,
				format : 'int',
				maxlen : 5,
				size : 5,
				caption : "肺炎（ 次）"
			}
		},
		{
			id : 'scour',
			xtype : 'input',
			setting : {
				disabled : true,
				format : 'int',
				maxlen : 5,
				size : 5,
				caption : "腹泻（ 次）"
			}
		},
		{
			id : 'wound',
			xtype : 'input',
			setting : {
				disabled : true,
				format : 'int',
				maxlen : 5,
				size : 5,
				caption : "外伤（ 次）"
			}
		},
		{
			id : 'checkSicknessOther',
			xtype : 'input',
			setting : {
				disabled : true,
				maxlen : 50,
				size : 50,
				caption : "其它"
			}
		},
		{
			id : 'transfer',
			xtype : 'list',
			setting : {
				ds : '151',
				save : 'isInputValue',
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "2",
				fields : [ "transReason", "transUnit" ]
			}
		},
		{
			id : 'transReason',
			xtype : 'input',
			setting : {
				disabled : true,
				maxlen : 20,
				size : 20,
				caption : "转诊原因"
			}
		},
		{
			id : 'transUnit',
			xtype : 'input',
			setting : {
				disabled : true,
				maxlen : 20,
				size : 20,
				caption : "转诊机构及科室"
			}
		},
		{
			id : "checkDirect36",
			xtype : "list",
			setting : {
				ds : "157",
				multi : true,
				save : "id",
				newlineStep : 5,
				forceNewline : true,
				mapping : {
					value : 'checkDirect36id'
				}
			}
		},
		{
			id : "nextVisitDate",
			xtype : "input",
			setting : {
				format : 'date',
				maxlen : 8,
				size : 10,
				defaultVal : new Date((new Date()).getFullYear() + 1,
						(new Date()).getMonth(), (new Date()).getDate())
			}
		}, {
			id : "visitDoctor",
			xtype : "input",
			setting : {
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
				serviceType : 0,
				isSpecial : true
			}
		}, {// 血压
			id : 'pressure',
			xtype : 'input',
			setting : {
				size : 10
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
		}, {// 前囟1
			id : 'beforeSkull01',
			xtype : 'input',
			setting : {
				size : 5
			}
		}, {// 前囟1
			id : 'beforeSkull02',
			xtype : 'input',
			setting : {
				size : 5
			}

		}, {// 皮肤
			id : 'skins',
			xtype : 'list',
			setting : {
				ds : "96",
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "2",
				fields : [ "skinsOther" ]
			}
		}, {// 异常描述
			id : "skinsOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
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
				size : 20
			}
		}, {// 右眼
			id : 'rightEyes',
			xtype : 'input',
			setting : {
				size : 20
			}
		}, {// 全身浅表淋巴结
			id : 'lymphNode',
			xtype : 'list',
			setting : {
				ds : "1457"
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
			id : 'evaluate',
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
			id : "hearingChild",
			xtype : "list",
			setting : {
				ds : "108",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "3",
				fields : [ "hearingOther" ]
			}
		}, {// 其他遗传代谢病
			id : "hearingOther",
			xtype : "input",
			setting : {
				disabled : true,
				size : 30,
				maxlen : 30,
				caption : ""
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
		}, { // 外生殖器
			id : "genitals",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "genitalsOther" ]
			},
			setting : {
				ds : "96",
				isDefaultVal : true,
				defaultVal : 0
			}
		}, { // 异常描述
			id : "genitalsOther",
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
		}, { // 四肢
			id : "fourLimbs",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "fourLimbsOther" ]
			},
			setting : {
				ds : "96",
				isDefaultVal : true,
				defaultVal : 0
			}
		}, { // 异常描述
			id : "fourLimbsOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		}, {
			id : "foreignId",
			xtype : "input"
		} ];
