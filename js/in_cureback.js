
    var services = {
        get : CureBackService.get,
        save : CureBackService.save,
        propValidate : CureBackService.hasAllThese,
        tableName : 'CureBack'
    };
    
    var cfg = [
         {
             id : "name",
             xtype : "input",
             setting : {
               maxlen : 18,
               size : 18,
               showOnly: true,
               asLabel: true,
               classes : 'thin'
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
                maxlen : 50,
                size : 30,
                classes : 'thin'
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
            id : "result",
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
            id : "recordNumber",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 20,
                width : "140px",
                classes : 'thin'
            }
        },
        {
            id : "checkResult",
            xtype : "input",
            setting : {
                multiline: true,
                maxlen : 200,
                width : '400px',
                height : '100px',
                size : 100
            }
        },
        {
            id : "cureAdvice",
            xtype : "input",
            setting : {
                multiline: true,
                maxlen : 300,
                width : '400px',
                height : '100px',
                size : 100
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
          id : "fromOrg",
          xtype : "input",
          setting : {
              maxlen : 50,
              size : 30,
              width : '140px',
              classes : 'thin'
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
            required: [true, '转诊日期']
        }
    ];




