
    var services = {
        get : InfectionReportService.get,
        save : InfectionReportService.save,
        propValidate : InfectionReportService.hasAllThese,
        tableName : 'InfectionReport'
    };
    
    var cfg = [
        {
            id : "reportId",
            xtype : "input",
            setting : {
                maxlen : 50,
                size : 50
            }
        },
        {
            id : "reportType",
            xtype : "list",
            setting : {
                ds : "170"
            }
        },
        {
            id : "name",
            xtype : "input",
            setting : {
                maxlen : 20,
                size : 20
            },
            required: [true, '姓名']
        },
        {
            id : "genearchName",
            xtype : "input",
            setting : {
                maxlen : 20,
                size : 20
            }
        },
        {
            id : "cardId",
            xtype : "input",
            setting : {
                maxlen : 20,
                size : 20,
                defaultVal : "530628"
            }
        },
        {
            id : "sex",
            xtype : "list",
            setting : {
                ds : "111",
                newlineStep : 3
            }
        },
        {
            id : "birthday",
            xtype : "input",
            setting : {
                format: 'date',
                maxlen : 8,
                size : 10
            }
        },
        {
            id : "age",
            xtype : "input"
        },
        {
            id : "ageUnit",
            xtype : "list",
            setting : {
                ds : "180"
            }
        },
        {
            id : "collaborator",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 30
            }
        },
        {
            id : "unit",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 30
            }
        },
        {
            id : "phone",
            xtype : "input",
            setting : {
                maxlen : 300,
                size : 20
            }
        },
        {
            id : "area",
            xtype : "list",
            setting : {
                ds : "181"
            }
        },
        {
            id : "address",
            xtype : "input",
            setting : {
                maxlen : 80,
                size : 80
            }
        },
        {
            id : "occupation",
            xtype : "list",
            setting : {
                ds : "182"
            }
        },
        {
            id : "sickKind",
            xtype : "list",
            setting : {
                ds : "183"
            }
        },
        {
            id : "beginDate",
            xtype : "input",
            setting : {
                format: 'date',
                maxlen : 8,
                size : 10
            }
        },
        {
            id : "cureDate",
            xtype : "input",
            setting : {
                format: 'date',
                maxlen : 8,
                size : 10
            }
        },
        {
            id : "dieDate",
            xtype : "input",
            setting : {
                format: 'date',
                maxlen : 8,
                size : 10
            }
        },
        {
            id : "firstInfection",
            xtype : "list",
            setting : {
                ds : "184"
            }
        },
        {
            id : "secondInfection",
            xtype : "list",
            setting : {
                ds : "185"
            }
        },
        {
            id : "thirdInfection",
            xtype : "list",
            setting : {
                ds : "186"
            }
        },
        {
            id : "otherInfection",
            xtype : "input",
            setting : {
                maxlen : 80,
                size : 80
            }
        },
        {
            id : "confirmInfection",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 30
            }
        },
        {
            id : "reason",
            xtype : "input",
            setting : {
                maxlen : 40,
                size : 30
            }
        },
        {
            id : "linkPhone",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 10
            }
        },
        {
            id : "reportPerson",
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
            }
        },
        {
            id : "remark",
            xtype : "input",
            setting : {
                maxlen : 50,
                size : 50
            }
        }
    ];




