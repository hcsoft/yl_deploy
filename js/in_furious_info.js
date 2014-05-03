
    var services = {
        get : FuriousInfoService.get,
        save : FuriousInfoService.save,
        propValidate : FuriousInfoService.hasAllThese,
        tableName : 'FuriousInfo'
    };
    
    var cfg = [
        {
            id : "name",
            xtype : "input",
            setting : {
                maxlen : 18,
                size : 18,
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
                writeback : [{id:"name", col: 1},{id:"barCode", col:6}],
                mCodePrefixCtrlId : 'districtNumber',
                displayCols : [1,2,3,7],
                displayColNames : ["编号", "疾病", "", ""]
            },
            required : [true, "编号"]
        }, {
            id : "barCode",
            xtype : "input",
            setting : {
            	showOnly : true,
                readonly : true
            }
          },
        {
            id : "guardianName",
            xtype : "input",
            setting : {
                maxlen : 20,
                size : 10
            },
            required : [true, "监护人姓名"] 
        },
         {
            id : "relation",
            xtype : "input",
            setting : {
                maxlen : 20,
                size : 10
            },
            required : [true, "与患者关系"] 
        },
        {
            id : "guardianAddress",
            xtype : "input",
            setting : {
                 maxlen : 20,
                size : 18
            },
            required : [true, "监护人住址"] 
        }, 
        {
            id : "guardianTel",
            xtype : "input",
            setting : {
                maxlen : 20,
                size : 10
            },
            required : [true, "监护人电话"] 
        },
        {
            id : "contact",
            xtype : "input",
            setting : {
                 maxlen : 50,
                size : 18
            },
            required : [true, "辖区村（居）委会联系人、电话"] 
        },
         {
            id : "firstOccur",
            xtype : "input",
            setting : {
                maxlen : 20,
                size : 10
            },
            required : [true, "初次发病时间"] 
        },
         {
            id : "furiousSymptom",
            xtype : "list",
            setting : {
                ds : "42",
                multi : true,
                save : "id",
                mapping : {
                        value : 'furiousSymptomId'  
                },
//                forceNewline : true,
                newlineStep : 7
            },
            requires : { valEq : 12 , fields : ['symptomOther'] }
        },
        {
            id : "symptomOther",
            xtype : "input",
            setting : {
                maxlen : 30,
                disabled : true,
                size : 10,
                caption : "其他"
            }
        },
        {
            id : "outpatient",
            xtype : "list",
            setting : {
                ds : "41"
            }
        },
        {
            id : "inpatientTimes",
            xtype : "input",
            setting : {
              format: 'int',
                size : 10
            },
            required : [true, "曾住精神专科医院、综合医院精神专科"] 
        },
        {
            id : "recentDiagnose",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 18
            }
        },
        {
            id : "hospital",
            xtype : "input",
            setting : {
                maxlen : 20,
                size : 10
            }
        },
         {
            id : "confirmDate",
            xtype : "input",
            setting : {
              format: "date",
              maxlen: 8,
                size : 10
            },
            required : [true,"确诊日期"]
        },
         {
            id : "recentCure",
            xtype : "list",
            setting : {
                ds : "140"
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
            id : "lockStatus",
            xtype : "list",
            setting : {
                ds : "33"
            }
        },
        {
            id : "inputDate",
            xtype : "input",
            setting : {
               format: "date",
               maxlen: 8,
                defaultVal : new Date()
            },
            required : [true, "填表日期"]
        },
        {
            id : "doctor",
            xtype : "input",
            setting : {
                maxlen : 10,
                size : 10
            }
        },{//签字时间
        	id : "agreeSignDate",
        	xtype : "input",
        	setting : {
        		format : "date",
        		maxlen: 8
        	}
        },{//签字
        	id : "agreeSign",
        	xtype : "input"
        },{//知情同意
        	id : "agree",
        	xtype : "list",
        	setting : {
        		ds : "1324"
        	}
        },{//首次抗精神病药治疗时间
        	id : "outpatientDate",
        	xtype : "input",
        	setting : {
        		format : "date",
        		maxlen: 8,
        	}
        },{//经济情况
        	id : "incomeStatus",
        	xtype : "list",
        	setting : {
        		ds : "1328"
        	}
        },{//专科医生的意见(如果有请记录)
        	id : "doctorAdvice",
        	xtype : "input",
        	setting : {
        		width : '400px',
                height : '100px',
        		multiline: true
        	}
        }
 


        
    ];




