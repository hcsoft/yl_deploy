
    var services = {
        get : CureSwitchService.get,
        save : CureSwitchService.save,
        propValidate : CureSwitchService.hasAllThese,
        tableName : 'CureSwitch'
    };
    
    var cfg = [
         {
             id : "name",
             xtype : "input",
             setting : {
               maxlen : 18,
               size : 18,
               classes : 'thin',
               asLabel: true
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
               writeback : [{id:"name", col: 1}, {id:"sex", col: 2}],
               mCodePrefixCtrlId : 'districtNumber',
               displayCols : [1,2,3,7],
               displayColNames : ["编号","","",""]
           },
           required : [true, "编号"]
         },
        {
            id : "exportOrg",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 30,
                classes : 'thin'
            }
        },
        {
            id : "exportDepartment",
            xtype : "input",
            setting : {
                maxlen : 50,
                size : 50
            }
        },
        {
            id : "receptionDoctor",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 30
            }
        },
        {
            id : "impress",
            xtype : "input",
            setting : {
                maxlen : 200,
                multiline : true,
                width : '300px',
                height : '50px',
                size : 40
 
            }
        },
        {
            id : "reason",
            xtype : "input",
            setting : {
                maxlen : 100,
                size : 100,
                multiline : true,
                width : '300px',
                height : '50px'
            }
        },
        {
            id : "history",
            xtype : "input",
            setting : {
                maxlen : 200,
                size : 100,
                multiline : true,
                width : '300px',
                height : '50px'
            }
        },
        {
            id : "cureContent",
            xtype : "input",
            setting : {
                maxlen : 300,
                size : 100,
                multiline : true,
                width : '400px',
                height : '50px'
            }
        },
        {
            id : "doctor",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 30,
                width : '70px',
                classes : 'thin'
            }
        },
        {
            id : "tel",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 30,
                width : '70px',
                classes : 'thin'
            }
        },
        {
          id : "age",
          xtype : "input",
          setting : {
              format: "int",
              maxlen : 3,
              size : 3,
              classes : 'thin'
          }
        },
        {
          id : "fromOrg",
          xtype : "input",
          setting : {
            maxlen : 30,
            size : 30,
            width : '140px',
            classes : 'thin'
          }
        },
        {
          id : "sex",
          xtype : "input",
          setting : {
              maxlen : 8,
              size : 8,
              asLabel: true
          }
        },
        {
            id : "date",
            xtype : "input",
            setting : {
                format: 'date',
                maxlen : 8,
                size : 10,
                classes : 'thin',
                defaultVal : new Date()
            },
            required : [true, "转诊日期"]
        }
    ];




