
    var services = {
        get : ConsultationService.get,
        save : ConsultationService.save,
        propValidate : ConsultationService.hasAllThese,
        tableName : 'Consultation'
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
              writeback : [{id:"name", col: 1}],
              mCodePrefixCtrlId : 'districtNumber',
              displayCols : [1,2,3,7],
              displayColNames : ["编号","","",""]
          },
          required : [true, "编号"]
        },
        {
            id : "reason",
            xtype : "input",
            setting : {
                size : 100,
                multiline: true,
                width : '650px',
                height : '100px'
            }
        },
        {
            id : "notion",
            xtype : "input",
            setting : {
                size : 100,
                multiline: true,
                width : '650px',
                height : '100px'
            }
        },
        {
            id : "consultationOrg",
            xtype : "grid",
            setting : {
                ds : "ConsultationOrg",
                displayCols : ['orgName','doctor'],
                displayColNames : ["医疗机构名称", "会诊医生签字"],
                colXtypes : ['input', 'input'],
                colSettings : [
                    {size : 30,width:"90px"},
                    {size : 30,width:"90px"}
                ]
            }
        },
        {
            id : "doctor",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 30
            }
        },
        {
            id : "date",
            xtype : "input",
            setting : {
                format: 'date',
                maxlen : 8,
                size : 10
            },
            required : [true, "会诊日期"]
        }
    ];




