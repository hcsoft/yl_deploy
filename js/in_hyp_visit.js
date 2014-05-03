
    var services = {
        get : HypertensionVisitService.get,
        save : HypertensionVisitService.save,
        propValidate : HypertensionVisitService.hasAllThese,
        tableName : 'HypertensionVisit'
    };
    
    var cfg = [
        {
            id : "name",
            xtype : "input",
            setting : {
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
                format: 'date',
                maxlen : 8,
                size : 10
            },
            required : [true, "随访日期"]
        },
        {
            id : "visitKind",
            xtype : "list",
            setting : {
                ds : "86"
            }
        },
        {
            id : "hypertensionSymptom",
            xtype : "list",
            setting : {
                ds : "136",
                multi : true,
                save : "id",
                mapping : {
                  value : 'hypertensionSymptomId'  
                },
                forceNewline : true,
                newlineStep : 7,
                controlShow : 0,
                isDefaultVal : true,
                defaultVal : 0
            },
            requires : { valEq : 10 , fields : ["symptomOther"] }
        },
        {
            id : "symptomOther",
            xtype : "input",
            setting : {
               disabled : true,
                caption: "症状其他描述"
            }
        },
        {
            id : "diastolicPressure",
            xtype : "input",
            setting: {
              format: 'num'
            }
        },
        {
            id : "systolicPressure",
            xtype : "input",
            setting: {
              format: 'num'
            }
        },
        {
            id : "weight",
            xtype : "input",
            setting: {
              format: 'num'
            }
        },
        {
            id : "habitus",
            xtype : "input",
            setting: {
              format: 'num'
            }
        },
        {
            id : "heartRate",
            xtype : "input",
            setting: {
              format: 'int'
            }
        },
        {
            id : "other",
            xtype : "input"
        },
        {
            id : "smoke",
            xtype : "input",
            setting: {
              format: 'int'
            }
        },
        {
            id : "drink",
            xtype : "input"
        },
        {
            id : "sportTimes",
            xtype : "input",
            setting: {
              format: 'int',
              size : 15
            }
        },
        {
            id : "sportDuration",
            xtype : "input",
            setting: {
              format: 'int',
              size : 15
            }
        },
        {
            id : "salt",
            xtype : "list",
            setting: {
            	ds : "1343"
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
            id : "assistantExam",
            xtype : "input"
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
            },
            requires : { valEq : 2 , fields : ["adrother"] }
        },
        {
            id : "adrother",
            xtype : "input",
            setting : {
               disabled : true,
                caption: "不良反应描述"
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
            id : "hypertensionMedications",
            xtype : "grid",
            setting : {
                ds : "HypertensionMedications",
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
            xtype : "input"
        },
        {
            id : "transUnit",
            xtype : "input"
        },
        {
            id : "nextVistDate",
            xtype : "input",
            setting : {
                format: 'date',
                maxlen : 8,
                size : 10
            }
        },
        {
            id : "visitDoctor",
            xtype : "input"
        }
    ];




