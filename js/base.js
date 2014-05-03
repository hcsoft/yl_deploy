    var metaCodes = [111, 7, 57,115, 3,99,137,37,123,34,38,148,151,6];

    var services = {
        get : "/Application/getBaseInfo",
        save : HealthFileService.save
    };
    
    var cfg = [
        {
            id : "sex",
            xtype : "list",
            setting : {
                ds : "111",
                display : "name",
                save : "name",
                multi : "false"
            }
        },
        {
            id : "folk",
            xtype : "list",
            setting : {
                ds : "57"
            },
            requires : { valEq : "2" , fields : ["folkOther"] }  // 
        },
        {
            id : "folkOther",
            xtype : "input",
            setting : {
               disabled : true,
               maxlen: 10,
               size : 10
            }
        },
        {
            id : "idnumber",
            xtype : "input",
            setting : {
                maxlen : 18,
                size : 18
            }
        },
        {
            id : "birthday",
            xtype : "input",
            setting : {
                maxlen : 8,
                format: 'date'
            }
        },
        {
            id : "wordUnit",
            xtype : "input",
            setting : {
                maxlen : 19,
                size : 19
            }
        },
        {
            id : "tel",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 30 
        }},
        {
            id : "linkman",
            xtype : "input",
            setting : {
                maxlen : 10,
                size : 10 
        }},
        {
            id : "linkmanTel",
            xtype : "input",
            setting : {
                maxlen : 10,
                size : 10 
            }
        },
        {
            id : "bloodTypeAbo",
            xtype : "list",
            setting : {
                ds : "115"
            }
        },
        {
            id : "maritalStatus",
            xtype : "list",
            setting : {
                ds : "37"
            }
        },
        {
            id : "allergy",
            xtype : "list",
            setting : {
                ds : "34"
            },
            requires : { valEq : 5 , fields : ["allergiesOther"] }
        },
        {
            id : "allergiesOther",
            xtype : "input",
            setting : {
               disabled : true,
               maxlen: 10,
               size : 10
            }
        },

        {
            id : "education",
            xtype : "list",
            setting : {
                ds : "99"
            }
        },
        {
            id : "bloodTypeRh",
            xtype : "list",
            setting : {
                ds : "3",
                multi : "false"
            }
        },
        {
            id : "occupation",
            xtype : "combo",
            setting : {
                ds : "137",
                multi : false,
                model: {
                  id : 'number',
                  code : 'number',
                  display : 'name' 
                },
                displayCols : ['number', 'name'],
                displayColNames : ["编号", "职业"]
            }
        },
        {
            id : "resideType",
            xtype : "list",
            setting : {
                ds : "7"
            }
        },
        {
            id : "opshistory",
            xtype : "grid",
            setting : {
                ds : "operations",
                displayCols : ['opsname','opsdate'],
                displayColNames : ["名称", "时间"],
                colXtypes : ['input', 'input'],
                colSettings : [
                    {},
                    { maxlen : 8,format: 'date'}
                ]
            }
        },
        {
            id : "traumaHistory",
            xtype : "grid",
            setting : {
                ds : "injuries",
                displayCols : ['traumaName','traumaDate'],
                displayColNames : ["名称", "时间"],
                colXtypes : ['input', 'input'],
                colSettings : [
                    {},
                    { maxlen : 8,format: 'date'}
                ]
            }
        },
        {
            id : "transfusion",
            xtype : "grid",
            setting : {
                ds : "transfusion",
                displayCols : [1,2],
                displayColNames : ["原因", "时间"],
                colXtypes : ['input', 'input'],
                colSettings : [
                    {},
                    { maxlen : 8,format: 'date'}
                ]
            }
        },
        {
            id : "disability",
            xtype : "list",
            setting : {
                ds : "6"
            },
            requires : { valEq : 8 , fields : ["disabilityStatusOthers"] }
        },
        {
            id : "deformityOthers",
            xtype : "input",
            setting : {
                maxlen : 10,
                disabled : true,
                size : 10 
            }
        },
        {
            id : "payment",
            xtype : "combo",
            setting : {
                ds : "123",
                multi : true,
                displayCols : ['number', 'name'],
                displayColNames : ["编号", "方式"]
            }
        },
        {
            id : "geneticHistory",
            xtype : "list",
            setting : {
                ds : "151"
            },
            requires : { valEq : 2 , fields : ["geneticHistoryOther"] }
        },
        {
            id : "geneticHistoryOther",
            xtype : "input",
            setting : {
               disabled : true,
               maxlen: 10,
               size : 10
            }
        },
        {
            id : "diseaseHistory",
            xtype : "grid",
            setting : {
                ds : "diseaseHistory",
                displayCols : ['diseaseId','confimDate', 'remark'],
                displayColNames : ["疾病名称", "确诊时间", "疾病说明"],
                colXtypes : ['combo', 'input', 'input'],
                colSettings : [
                   {
                        ds : "38",
                        multi : false,
                        model: {
                          id : 'number',
                          code : 'number',
                          display : 'name' 
                        },
                        displayCols : ['number', 'name'],
                        displayColNames : ["编号", "职业"]
                    },
                    { maxlen : 8,format: 'date'},
                    {}
                ]
            }
        }
 
    ];




