var services = {
	get : BabyVisitService.get,
	save : BabyVisitService.save,
	propValidate : BabyVisitService.hasAllThese,
	tableName : 'BabyVisit'
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
					id : "sex",
					col : 2
				}, {
					id : "birthday",
					col : 3
				}, {
					id : "idcardNum",
					col : 5
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
		{// 营养指导
			id : "dietDirect",
			xtype : "input",
			setting : {
				multiline : true,
				width : '400px',
				height : '100px'
			}
		},
		{// 早教指导
			id : "earlyDirect",
			xtype : "input",
			setting : {
				multiline : true,
				width : '400px',
				height : '100px'
			}
		},
		{// 预防接种指导
			id : "protectDirect",
			xtype : "input",
			setting : {
				multiline : true,
				width : '400px',
				height : '100px'
			}
		},
		{
			id : "barCode",
			xtype : "input",
			setting : {
				showOnly : true,
				readonly : true,
				size : 15
			}
		},
		{
			id : "sex",
			xtype : "list",
			setting : {
				ds : "111",
				newlineStep : 3,
				display : "name",
				save : "name",
				multi : false
			}
		},
		{
			id : "birthday",
			xtype : "input",
			setting : {
				disabled : false,
				format : 'date',
				size : 8
			// showOnly : true,
			// readonly : true
			}
		},
		{
			id : "idcardNum",
			xtype : "input",
			setting : {
				maxlen : 18,
				size : 18
			}
		},
		{
			id : "address",
			xtype : "input",
			setting : {
				maxlen : 50,
				size : 30
			}
		},
		{
			id : "fname",
			xtype : "input",
			setting : {
				maxlen : 18,
				size : 10
			}
		},
		{
			id : "foccupation",
			xtype : "input",
			setting : {
				maxlen : 30,
				size : 8
			}
		},
		{
			id : "fphone",
			xtype : "input",
			setting : {
				maxlen : 30,
				size : 10
			}
		},
		{
			id : "fbirthday",
			xtype : "input",
			setting : {
				format : 'date',
				maxlen : 8,
				size : 8
			}
		},
		{
			id : "mname",
			xtype : "input",
			setting : {
				maxlen : 18,
				size : 10
			}
		},
		{
			id : "moccupation",
			xtype : "input",
			setting : {
				maxlen : 30,
				size : 8
			}
		},
		{
			id : "mphone",
			xtype : "input",
			setting : {
				maxlen : 30,
				size : 10
			}
		},
		{
			id : "mbirthday",
			xtype : "input",
			setting : {
				format : 'date',
				maxlen : 8,
				size : 8
			}
		},
		{
			id : "gestationalWeeks",
			xtype : "input",
			setting : {
				maxlen : 30,
				size : 8
			}
		},
		{ // 母亲妊娠患病情况
			id : "pregnantSick",
			xtype : "list",
			setting : {
				ds : "58",
				multi : true,
				newlineStep : 2,
				save : 'id',
				mapping : {
					value : 'kidneySickId'
				}
			},
			requires : {
				valEq : "3",
				fields : [ "pregnantSickOther" ]
			}
		// 
		},
		{ // 其它疾病描述
			id : "pregnantSickOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 50,
				caption : "其它疾病描述"
			}
		},
		{ // 助产机构名称
			id : "hospitalName",
			xtype : "input",
			setting : {
				maxlen : 50,
				size : 50
			}
		},
		{ // 出生情况
			id : "bornStatus",
			xtype : "list",
			requires : {
				valEq : "7",
				fields : [ "bornStatusOther" ]
			},
			setting : {
				ds : "9",
				multi : true,
				maxlen : 50,
				size : 50,
				displayCols : [ 'number', 'name' ],
				displayColNames : [ "编号", "方式" ],
				save : 'id',
				mapping : {
					value : 'bornStatusId'
				},
				isDefaultVal : true,
				defaultVal : 0
			}
		},
		{ // 其它情况描述
			id : "bornStatusOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 50,
				size : 50
			}
		},
		{ // 窒息
			id : "sleepy",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "sleepyState" ]
			},
			setting : {
				ds : "151",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		},
		{ // 窒息描述
			id : "sleepyState",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : '窒息描述',
				isDefaultVal : true,
				defaultVal : 0
			}
		},
		{ // 畸形
			id : "monster",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "monsterOther" ]
			},
			setting : {
				ds : "151",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		},
		{ // 畸形描述
			id : "monsterOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : '畸形描述'
			}
		},
		{ // 新生儿听力筛查
			id : "exam01",
			xtype : "list",
			setting : {
				ds : "108",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		},
		{ // 体重
			id : "exam02",
			xtype : "input",
			setting : {
				maxlen : 20,
				size : 5,
				format : 'num'
			}
		},
		{ // 身长
			id : "exam03",
			xtype : "input",
			setting : {
				maxlen : 20,
				format : 'num',
				size : 5
			}
		},
		{ // 喂养方式
			id : "exam04",
			xtype : "list",
			setting : {
				ds : "98",
				newlineStep : 2

			}
		},
		{ // 体温
			id : "exam05",
			xtype : "input",
			setting : {
				maxlen : 20,
				size : 6,
				format : 'num'
			}
		},
		{ // 呼吸频率
			id : "exam06",
			xtype : "input",
			setting : {
				maxlen : 20,
				format : 'int',
				size : 10
			}
		},
		{ // 脉率
			id : "exam07",
			xtype : "input",
			setting : {
				maxlen : 20,
				format : 'int',
				size : 3
			}
		},
		{ // 面色
			id : "faceColor",
			xtype : "list",
			setting : {
				ds : "153",
				multi : true,
				displayCols : [ 'number', 'name' ],
				displayColNames : [ "编号", "面色" ],
				mapping : {
					value : 'faceColorId'
				},
				save : 'id',
				isDefaultVal : true,
				defaultVal : 0
			},
			requires : {
				valEq : "3",
				fields : [ "faceColorOther" ]
			}
		// 
		},
		{ // 面色其它描述
			id : "faceColorOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				width : 120,
				caption : "其它面色描述"
			}
		},
		{ // 前卤尺寸长
			id : "exam09",
			xtype : "input",
			setting : {
				maxlen : 30,
				format : 'num',
				size : 4
			}
		},
		{ // 前卤尺寸宽
			id : "exam10",
			xtype : "input",
			setting : {
				format : 'num',
				maxlen : 30,
				size : 4
			}
		},
		{ // 前卤形状
			id : "exam11",
			xtype : "list",
			requires : {
				valEq : "4",
				fields : [ "frontSkullOther" ]
			},
			setting : {
				ds : "154",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		},
		{ // 前卤形状其它描述
			id : "frontSkullOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "其它描述"
			}
		},
		{ // 眼
			id : "exam12",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "exam12other" ]
			},
			setting : {
				ds : "96",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		},
		{ // 异常描述
			id : "exam12other",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		},
		{ // 四肢活动度
			id : "exam19",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "exam19other" ]
			},
			setting : {
				ds : "96",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		},
		{ // 异常描述
			id : "exam19other",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		},
		{ // 耳
			id : "exam13",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "exam13other" ]
			},
			setting : {
				ds : "96",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		},
		{ // 异常描述
			id : "exam13other",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		},
		{ // 颈部包块
			id : "exam20",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "exam20other" ]
			},
			setting : {
				ds : "151",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		},
		{ // 异常描述
			id : "exam20other",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		},
		{ // 鼻
			id : "exam14",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "exam14other" ]
			},
			setting : {
				ds : "96",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		},
		{ // 异常描述
			id : "exam14other",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		},
		{ // 皮肤
			id : "babySkin",
			xtype : "list",
			requires : {
				valEq : "4",
				fields : [ "babySkinsOther" ]
			},
			setting : {
				ds : "61",
				multi : true,
				newlineStep : 3,
				save : 'id',
				displayCols : [ 'number', 'name' ],
				displayColNames : [ "编号", "皮肤情况" ],
				mapping : {
					value : 'babySkinId'
				},
				isDefaultVal : true,
				defaultVal : 0
			}
		},
		{ // 异常描述
			id : "babySkinsOther",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		},
		{ // 口腔
			id : "exam15",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "exam15other" ]
			},
			setting : {
				ds : "96",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		},
		{ // 异常描述
			id : "exam15other",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		},
		{ // 肛门
			id : "exam22",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "exam22other" ]
			},
			setting : {
				ds : "96",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		},
		{ // 异常描述
			id : "exam22other",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		},
		{ // 心肺
			id : "exam16",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "exam16other" ]
			},
			setting : {
				ds : "96",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		},
		{ // 异常描述
			id : "exam16other",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		},
		{ // 外生殖器
			id : "exam23",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "exam16other" ]
			},
			setting : {
				ds : "96",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		},
		{ // 异常描述
			id : "exam23other",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		},
		{ // 腹部
			id : "exam17",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "exam17other" ]
			},
			setting : {
				ds : "96",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		},
		{ // 异常描述
			id : "exam17other",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		},
		{ // 脊柱
			id : "exam24",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "exam24other" ]
			},
			setting : {
				ds : "96",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		},
		{ // 异常描述
			id : "exam24other",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "异常描述"
			}
		},
		{ // 脐带
			id : "exam18",
			xtype : "list",
			requires : {
				valEq : "4",
				fields : [ "exam18other" ]
			},
			setting : {
				ds : "65",
				maxlen : 10,
				size : 10,
				isDefaultVal : true,
				defaultVal : 0
			}
		},
		{ // 异常描述
			id : "exam18other",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "其它描述"
			}
		},
		{ // 转诊
			id : "exam25",
			xtype : "list",
			requires : {
				valEq : "2",
				fields : [ "exam26", "exam27" ]
			},
			setting : {
				ds : "151",
				maxlen : 10,
				size : 10,
				save : 'isInputValue',
				isDefaultVal : true,
				defaultVal : 0
			}
		},
		{ // 原因
			id : "exam26",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 20,
				caption : "原因"
			}
		},
		{ // 机构及科室
			id : "exam27",
			xtype : "input",
			setting : {
				disabled : true,
				maxlen : 30,
				size : 30,
				caption : "机构及科室"
			}
		},
		{ // 新生儿访视指导
			id : "babyDirect",
			xtype : "list",
			setting : {
				ds : "155",
				multi : true,
				save : 'id',
				displayCols : [ 'number', 'name' ],
				displayColNames : [ "编号", "方式" ],
				mapping : {
					value : 'babyDirectId'
				}
			}
		},
		{ // 本次方式日期
			id : "visitDate",
			xtype : "input",
			setting : {
				format : 'date',
				size : 10,
				maxlen : 8,
				blurFun : true,
				fillField : [ 'textarea', 'fileNo span',
						[ 'earlyDirect', 'dietDirect', 'protectDirect' ] ]
			},
			required : [ true, "本次随访日期" ]
		}, { // 下次访视日期
			id : "nextVisitDate",
			xtype : "input",
			setting : {
				format : 'date',
				size : 10,
				maxlen : 8
			}
		}, { // 下次随访地点
			id : "nextVisitPlace",
			xtype : "input",
			setting : {
				maxlen : 30,
				size : 30
			}
		}, { // 随访医生
			id : "visitDoctor",
			xtype : "input",
			setting : {
				maxlen : 30,
				size : 30
			}
		}, {// 新生儿疾病筛查
			id : "exam28",
			xtype : "list",
			setting : {
				ds : "1286",
				maxlen : 10,
				size : 10
			},
			requires : {
				valEq : "3",
				fields : [ "exam28Other" ]
			}
		}, {// 其他遗传代谢病
			id : "exam28Other",
			xtype : "input",
			setting : {
				disabled : true,
				size : 30,
				maxlen : 30,
				caption : ""
			}
		}, {// 目前体重
			id : "exam29",
			xtype : "input",
			setting : {
				size : 5,
				maxlen : 20,
				format : "num"
			}
		}, {// 吃奶量
			id : "exam30",
			xtype : "input",
			setting : {
				size : 3,
				maxlen : 20,
				format : "num"
			}
		}, {// 吃奶次数
			id : "exam31",
			xtype : "input",
			setting : {
				size : 5,
				maxlen : 20,
				format : "num"
			}
		}, {// 呕吐
			id : "exam32",
			xtype : "list",
			setting : {
				ds : "151",
				save : 'isInputValue',
				isDefaultVal : true,
				defaultVal : 0
			}
		}, {// 大便
			id : "exam33",
			xtype : "list",
			setting : {
				ds : "1290",
				newlineStep : 1
			}
		}, {// 大便次数
			id : "exam34",
			xtype : "input",
			setting : {
				size : 5,
				maxlen : 20,
				format : "num"
			}
		}, {// 黄疸部位
			id : "exam35",
			xtype : "list",
			setting : {
				ds : "1293"
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
			id : 'heart',
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
				size : 20
			}
		}, {// 综合评估
			id : 'evaluate',
			xtype : 'input',
			setting : {
				size : 20
			}
		}, {
			id : 'onlinePhoto',
			xtype : 'image'
		}, {
			id : "foreignId",
			xtype : "input"
		} ];
