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
                ds :  {search:FileNumSearch.listCodePage, get:FileNumSearch.getItem},
                local : false,
                width : 200,
                model : {
                    id : 0,
                    code : 0,
                    display : 1
                },
                showDisplay: false,
                roWhenSet : true,
                writeback : [{id:"mname", col: 1},{id:"motherName", col: 1},{id:"motherAge", col: 4},{id:"barCode", col:6}],
                mCodePrefixCtrlId : 'districtNumber',
                displayCols : [1,2,3,7],
                displayColNames : ["编号","","",""]
            },
            required : [true, "编号"]
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
                defaultVal : ((new Date()).getMonth() + 1) < 10 ? '0' + ((new Date()).getMonth() + 1) : (new Date()).getMonth() + 1
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
                defaultVal : (new Date()).getDate() < 10 ? '0' + (new Date()).getDate() : (new Date()).getDate()
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
          required : [true, "产后出血"]
        },
        {
            id : "childbirthAddress",
            xtype : "list",
            setting : {
            	ds : "1370",
            	isDefaultVal : true,
                defaultVal : 0
            },
            required : [true, "分娩地点"]
          },
        {
            id : "borthWeekly",
            xtype : "input",
            setting : {
            	defaultVal : 40
            },
            required : [true, "分娩孕周"]
        },
        {
            id : "childbirthWay",
            xtype : "list",
            setting : {
                ds : "1376",
                isDefaultVal : true,
                defaultVal : 0
            },
            required : [true, "分娩方式"]
        },
        {
            id : "deliverWay",
            xtype : "list",
            setting : {
            	ds : "1382",
            	isDefaultVal : true,
                defaultVal : 3
            },
            required : [true, "接生方式"]
        },
        {
            id : "lacerationOfPerineum",
            xtype : "list",
            setting : {
                ds : "1387",
                isDefaultVal : true,
                defaultVal : 0
            },
            required : [true, "会阴撕裂"]
        },
        {
            id : "outerFissure",
            xtype : "input",
            setting : {
                maxlen : 8,
                size : 10,
                defaultVal : '0'
            },
            required : [true, "缝合情况外缝"]
        },
        {
            id : "bloodPressure",
            xtype : "input",
            setting : {
                maxlen : 8,
                size : 10
            },
            required : [true, "缝合情况产后血压"]
        },
        {
            id : "deal",
            xtype : "list",
            setting : {
                ds : "1393",
                isDefaultVal : true,
                defaultVal : 4
            },
            required : [true, "产后处理"]
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
            required : [true, "产时合并症"],
            requires : { valEq : "7" , fields : ["comorbidityOther"] }  // 
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
            required : [true, "危急孕产妇"]
        },
        {
            id : "criticalSymptom",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 18,
                defaultVal : '无'
            },
            required : [true, "危急症状"]
        },
        {
          id : "sex",
          xtype : "list",
          setting : {
              ds : "1411",
            showOnly : true,
            readonly : true
          },
          required : [true, "新生儿性别"] 
        },
        {
            id : "weight",
            xtype : "input",
            setting : {
                format : "num",
                readonly : true
            },
            required : [true, "体重"] 
          },
        {
            id : "babySurvive",
            xtype : "list",
            setting : {
                ds : "1414",
                isDefaultVal : true,
                defaultVal : 0
            },
            required : [true, "新生儿存活情况"] 
        },
        {
            id : "babyBirth",
            xtype : "list",
            setting : {
               ds : '1417',
               isDefaultVal : true,
               defaultVal : 0
            },
            required : [true, "新生儿出生情况"],
            requires : { valEq : "7" , fields : ["babyBirthOther"] }  // 
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
            required : [true, "新生儿并发症"],
            requires : { valEq : "6" , fields : ["babyComorbidityOther"] } 
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
            required : [true, "开奶时间"]
        }, 
        {
            id : "diagnosis",
            xtype : "input",
            setting : {
            	maxlen : 20,
                size : 20,
                defaultVal : 'G1P1孕足月单胎头位顺产'
            },
            required : [true, "产后诊断"]
        },
        {
            id : "borthOrganization",
            xtype : "input",
            setting : {
            	maxlen : 20,
                size : 20,
                readonly : true
            },
            required : [true, "接生单位"]
        },
        {
            id : "widwife",
            xtype : "input",
            setting : {
            	maxlen : 20,
                size : 20,
                readonly : true
            },
            required : [true, "接生人员"] 
        },
        {
            id : "certifiId",
            xtype : "input",
            setting : {
                maxlen : 20,
                size : 20,
                readonly : true
            }
        }
    ];




