
    var services = {
        get : DiabetesVisitService.get,
        save : DiabetesVisitService.save,
        propValidate : DiabetesVisitService.hasAllThese,
        tableName : 'DiabetesVisit'
    };
    
    var cfg = [
        {
            id : "name",
            xtype : "input",
            setting : {
                maxlen : 18,
                size : 18,
                showOnly: true,
                readonly : true,
                width:60
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
                writeback : [{id:"name", col: 1},{id:"barCode", col: 6}],
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
                format: "date",
                maxlen: 8,
                size : 10
            },
            required : [true, "随访日期"] 
        },
        {
            id : "visitKind",
            xtype : "list",
            setting : {
            	ds : "86"
            },
            required : [true, "随访方式"] 
        },
        {
            id : "diabetesSymptom",
            xtype : "list",
            setting : {
                ds : "164",
                multi : true,
                save : "id",
                mapping : {
                        value : 'diabetesSymptomId'  
                },
                newlineStep : 7,
                controlShow : 0,
                isDefaultVal : true,
                defaultVal : 0
            },
            requires : { valEq : 10 , fields : ['symptomOther'] }
        },
        {
            id : "symptomOther",
            xtype : "input",
            setting : {
                maxlen : 50,
                disabled : true,
                size : 18,
                caption : "其他症状描述"
            }
        },
         {
            id : "diastolicPressure",
            xtype : "input",
            setting : {
              format: 'num',
                size : 10
            }
        },
         {
            id : "systolicPressure",
            xtype : "input",
            setting : {
              format: 'num',
                size : 10
            }
        },
        {
            id : "weight",
            xtype : "input",
            setting : {
              format: 'num',
                size : 10
            }
        },
        {
            id : "habitus",
            xtype : "input",
            setting : {
              format: 'num',
                size : 10
            }
        },
        {
            id : "heartRate",
            xtype : "input",
            setting : {
              format: 'int',
                size : 10
            }
        },
         {
            id : "exam06",
            xtype : "list",
            setting : {
                ds : "165",
                isDefaultVal : true,
                defaultVal : 0
            }
        },
         {
            id : "other",
            xtype : "input",
            setting : {
                maxlen : 50,
                size : 10
            }
        },
        {
            id : "smoke",
            xtype : "input",
            setting : {
              format: 'int',
                size : 10
            }
        },
        {
            id : "drink",
            xtype : "input",
            setting : {
                maxlen : 20,
                size : 10
            }
        },
         {
            id : "sportTimes",
            xtype : "input",
            setting : {
              format: 'int',
                size : 10
            }
        },
         {
            id : "sportDuration",
            xtype : "input",
            setting : {
              format: 'int',
                size : 10
            }
        },
         {
            id : "food",
            xtype : "input",
            setting : {
              format: 'int',
                size : 10
            }
        },
         {
            id : "mindStatus",
            xtype : "list",
            setting : {
                ds : "104",
                isDefaultVal : true,
                defaultVal : 0
            }
        },
        {
            id : "action",
            xtype : "list",
            setting : {
                ds : "147",
                isDefaultVal : true,
                defaultVal : 0
            }
        },
         {
            id : "exam01",
            xtype : "input",
            setting : {
              format: 'num',
                size : 10
            },
            required : [true, "空腹血糖值"] 
        },
        {
            id : "exam02",
            xtype : "input",
            setting : {
              format: 'num',
                size : 10
            } 
        },
        {
            id : "exam03",
            xtype : "input",
            setting : {
                format: "date",
                maxlen: 8,
                size : 10
            }
        },
        {
            id : "exam04",
            xtype : "input",
            setting : {
                maxlen : 50,
                size : 10
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
                forceNewline : true,
                isDefaultVal : true,
                defaultVal : 0
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
            id : "exam05",
            xtype : "list",
            setting : {
                ds : "12",
                isDefaultVal : true,
                defaultVal : 0
            }
        },
         {
            id : "visitType",
            xtype : "list",
            setting : {
                ds : "163",
                isDefaultVal : true,
                defaultVal : 0
            }
        },
        
          {
            id : "diabetesMedications",
            xtype : "grid",
            setting : {
                ds : "DiabetesMedications",
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
            id : "transReason",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 30
            }
        },
        {
            id : "transUnit",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 30
            }
        },
        
         {
            id : "nextVistDate",
            xtype : "input",
            setting : {
                format: 'date',
                size : 10,
                maxlen : 8
            }
        },
        {
            id : "visitDoctor",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 10
            }
        }
        
    ];




