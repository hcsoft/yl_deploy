
    var services = {
        get : VaccinationService.get,
        save : VaccinationService.save,
        propValidate : VaccinationService.hasAllThese,
        tableName : 'Vaccination'
    };
    
    var cfg = [
        {
            id : "name",
            xtype : "input",
            setting : {
                maxlen : 20,
                size : 18,
            readonly : true
            },
            required : [true, "姓名"] 
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
                writeback : [{id:"name", col: 1}, {id:"sex", col: 2}, {id:"birthday", col:3},{id:"barCode", col:6}],
                mCodePrefixCtrlId : 'districtNumber',
                displayCols : [1,2,3,7],
                displayColNames : ["编号", "", "", ""]
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
            id : "sex",
            xtype : "input",
            setting : {
            	  maxlen : 10,
                size : 10
            },
            required : [true, "性别"] 
        },
        {
            id : "birthday",
            xtype : "input",
            setting : {
                size : 10,
                maxlen : 8,
                format : 'date'
            }
        },
        {
            id : "guardian",
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
            required : [true, "与儿童关系"] 
        },
        {
            id : "tel",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 10
            }
        },
        {
            id : "address",
            xtype : "input",
            setting : {
                 maxlen : 30,
                size : 18
            }
        }, 
        {
            id : "registerAddress",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 18
            }
        },
        {
            id : "inDate",
            xtype : "input",
            setting : {
                size : 10
            }
        },
        {
            id : "outDate",
            xtype : "input",
            setting : {
                size : 10
            }
        }, 
        {
            id : "outReason",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 10
            }
        },
        {
            id : "abnormalHistory",
            xtype : "input",
            setting : {
                maxlen : 50,
                size : 50
            }
        },
        {
            id : "taboo",
            xtype : "input",
            setting : {
                maxlen : 50,
                size : 50
            }
        }, 
        {
            id : "infectiousHistory",
            xtype : "input",
            setting : {
                maxlen : 50,
                size : 50
            }
        },
        {
            id : "buildDate",
            xtype : "input",
            setting : {
                size : 10
            }
        }, 
        {
            id : "inputPersonId",
            xtype : "input",
            setting : {
                size : 10
            }
        },  
        {
            id : "vaccinationRec",
            xtype : "grid",
            setting : {
                ds : "VaccinationRec",
                displayCols : ['vaccineInfoId', 'order','makeDate','position','batch','usefulLife','producer','doctor','description'],
                displayColNames : ["疫苗", "剂次", "接种日期", "接种部位","疫苗批号","有效日期","生产企业","接种医生","备注"],
                colXtypes : ['combo','input','input','input','input','input','input','input','input'],
                colSettings : [
                    {
                    	ds:"167",
                    	multi : false,
                        model: {
                          id : 'number',
                          code : 'number',
                          display : 'name' 
                        },
                        displayCols : ['number', 'name'],
                        displayColNames : ["编号", "疾病"]
                    },
                    {width : 30},
                    {width : 60,format:'date'},
                    {width : 30},
                    {width : 30},
                    {width : 60,format:'date'},
                    {width : 60},
                    {width : 40},
                    {width : 80}
                ],
                required : ['vaccineInfoId','order']
            }
        }  
    
    
    
    

        
    ];




