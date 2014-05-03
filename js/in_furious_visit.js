
    var services = {
        get : FuriousVisitService.get,
        save : FuriousVisitService.save,
        propValidate : FuriousVisitService.hasAllThese,
        tableName : 'FuriousVisit'
    };
    
    var cfg = [
        {
            id : "name",
            xtype : "input",
            setting : {
                maxlen : 18,
                size : 18,
                showOnly: true,
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
                width : 100,
                model : {
                    id : 0,
                    code : 0,
                    display : 1
                },
                showDisplay: false,
                roWhenSet : true,
                writeback : [{id:"name", col: 1},{id:"barCode", col:6}],
                mCodePrefixCtrlId : 'districtNumber',
                displayCols : [1,2,3,7],
                displayColNames : ["编号", "疾病", "", ""]
            },
            required : [true, "编号"]
        },{
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
              maxlen : 8,
              format: 'date',
              size : 10
          }
        },
        {
            id : "furiousVisitSymptom",
            xtype : "list",
            setting : {
                ds : "59",
                multi : true,
                save : "id",
                mapping : {
                    value : 'furiousVisitSymptomId'  
                },
                forceNewline : true,
                newlineStep : 7
            },
            requires : { valEq : 12 , fields : ['symptomOther'] }
        },
        {
            id : "symptomOther",
            xtype : "input",
            setting : {
                maxlen : 50,
                disabled : true,
                size : 18,
                caption : "其他症状描述:"
            }
        },
        {
            id : "status01",
            xtype : "list",
            setting : {
                ds : "143",
                isDefaultVal : true,
                defaultVal : 0
            }
        },
        {
            id : "status02",
            xtype : "list",
            setting : {
                ds : "83",
                isDefaultVal : true,
                defaultVal : 0
            }
        },
        {
            id : "status03",
            xtype : "list",
            setting : {
                ds : "131",
                isDefaultVal : true,
                defaultVal : 0
            }
        },
         {
            id : "status04",
            xtype : "list",
            setting : {
                ds : "27",
                isDefaultVal : true,
                defaultVal : 0
            }
        },
        {
            id : "status05",
            xtype : "list",
            setting : {
                ds : "43",
                isDefaultVal : true,
                defaultVal : 0
            }
        },
        {
            id : "status06",
            xtype : "list",
            setting : {
                ds : "76",
                isDefaultVal : true,
                defaultVal : 0
            }
        },
        {
            id : "status07",
            xtype : "list",
            setting : {
                ds : "113",
                isDefaultVal : true,
                defaultVal : 0
            }
        },
        {
            id : "status08",
            xtype : "list",
            setting : {
                ds : "72",
                isDefaultVal : true,
                defaultVal : 0
            }
        },
        {
            id : "effect1",
            xtype : "input",
            setting : {
              format: 'int',
                size : 10
            }
        },
        {
            id : "effect2",
            xtype : "input",
            setting : {
              format: 'int',
                size : 10
            }
        },
        {
            id : "effect3",
            xtype : "input",
            setting : {
              format: 'int',
                size : 10
            }
        },
        {
            id : "effect4",
            xtype : "input",
            setting : {
              format: 'int',
                size : 10
            }
        },
        {
            id : "effect5",
            xtype : "input",
            setting : {
              format: 'int',
                size : 10
            }
        },
        {
            id : "examine",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 18
            }
        },
        {
            id : "compliance",
            xtype : "list",
            setting : {
                ds : "18",
                isDefaultVal : true,
                defaultVal : 0
            }
        },
        {
            id : "adr",
            xtype : "list",
            setting : {
                ds : "151",
                isDefaultVal : true,
                defaultVal : 0
//                forceNewline : true
            },
            requires : { valEq : 2 , fields : ['adrother'] }
        },
        {
            id : "adrother",
            xtype : "input",
            setting : {
                maxlen : 50,
                disabled : true,
                size : 18,
                caption : "不良反应描述:"
            }
        },
        {
            id : "cureStatus",
            xtype : "list",
            setting : {
                ds : "146",
                isDefaultVal : true,
                defaultVal : 0
            }
        },
        {
            id : "visitType",
            xtype : "list",
            setting : {
                ds : "166",
                isDefaultVal : true,
                defaultVal : 0
            }
        },
        {
            id : "transfer",
            xtype : "list",
            setting : {
                ds : "151",
                save: "isInputValue"
//                forceNewline : true
            },
            requires : { valEq : 2 , fields : ['transReason',"transUnit"] }
        },
        {
            id : "transReason",
            xtype : "input",
            setting : {
                maxlen : 30,
                disabled : true,
                size : 18,
                caption : "原因:"
            }
        },
        {
            id : "transUnit",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 30,
                disabled : true,
                caption : "机构及科室"
            }
        },
        {
            id : "furiousMedications",
            xtype : "grid",
            setting : {
                ds : "FuriousMedications",
                displayCols : ['drugName','usage', 'dosage'],
                displayColNames : ["药物名称", "用法（次/日）", "用量（mg/次）"],
                colXtypes : ['input', 'input', 'input'],
                colSettings : [
                    {},
                    {},
                    {}
                ]
            }
        },
        
         {
            id : "furiousHealing",
            xtype : "list",
            setting : {
                ds : "48",
                multi : true,
                save : "id",
                mapping : {
                        value : 'furiousHealingId'  
                }
//                forceNewline : true
            },
            requires : { valEq : 5 , fields : ['measureOther'] }
        },
        {
            id : "measureOther",
            xtype : "input",
            setting : {
                maxlen : 30,
                disabled : true,
                size : 18,
                caption : "其他康复措施:"
            }
        },
        {
            id : "nextVistDate",
            xtype : "input",
            setting : {
                maxlen : 8,
                format: 'date',
                size : 10
            }
        },
         {
            id : "visitDoctor",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 10
            }
        },{//危险性
        	id : "danger",
        	xtype : "list",
        	setting : {
        		ds : "1332"
        	}
        },{//关锁情况
            id : "lockStatus",
            xtype : "list",
            setting : {
                ds : "33"
            }
        },{//住院情况
        	id : "hospitalCourse",
            xtype : "list",
            setting : {
                ds : "1339"
            }
        },{//末次出院时间
        	id : "hospotalEndDate",
        	xtype : "input",
        	setting : {
        		format : "date",
        		maxlen: 8,
        	}
        }
        
    ];




