
    var services = {
        get : ReceptionService.get,
        save : ReceptionService.save,
        propValidate : ReceptionService.hasAllThese,
        tableName : 'Reception'
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
              writeback : [{id:"name", col: 1}],
              mCodePrefixCtrlId : 'districtNumber',
              displayCols : [1,2,3,7],
              displayColNames : ["编号","","",""]
          },
          required : [true, "编号"]
        },
        {
            id : "subjectiveInformation",
            xtype : "input",
            setting : {
                size : 100,
                multiline: true,
                width : '650px',
                height : '100px'
            }
        },
        {
            id : "impersonalInformation",
            xtype : "input",
            setting : {
                size : 100,
                multiline: true,
                width : '650px',
                height : '100px'
            }
        },
        {
            id : "evaluation",
            xtype : "input",
            setting : {
                size : 100,
                multiline: true,
                width : '650px',
                height : '100px'
            }
        },
        {
            id : "curePlan",
            xtype : "input",
            setting : {
                size : 100,
                multiline: true,
                width : '650px',
                height : '100px'
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
                size : 10,
                defaultVal : new Date()
            },
            required : [true, "接诊日期"]
        }
    ];




