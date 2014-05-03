
    var services = {
        get : HealthEducatService.get,
        save : HealthEducatService.save,
        propValidate : HealthEducatService.hasAllThese
    };
    
    var cfg = [
//        {
//            id : "name",
//            xtype : "input",
//            setting : {
//		readonly : true
//            }
//        },
//        {
//            id : "fileNo",
//            xtype : "input",
//            setting : {
//		readonly : true
//            }
//        },
        {
            id : "date",
            xtype : "input",
            setting : {
                format: 'date',
                maxlen : 8,
                size : 10
            },
            required: [true, '活动时间']
        },
        {
            id : "place",
            xtype : "input",
            setting : {
		maxlen : 50,
                size : 30
            }
        },
        {
            id : "way",
            xtype : "input",
            setting : {
            	maxlen : 30,
                size : 100
            }
        },
        {
            id : "unit",
            xtype : "input",
            setting : {
            	maxlen : 50,
                size : 30
            }
        },
        {
            id : "collaborator",
            xtype : "input",
            setting : {
            	maxlen : 50,
                size : 100
            }
        },
        {
            id : "catagory",
            xtype : "input",
            setting : {
            	maxlen : 50
            }
        },
        {
            id : "joinPersonNum",
            xtype : "input",
            setting : {
              format: 'int'
            }
        },
        {
            id : "publicizeInfo",
            xtype : "input",
            setting : {
		maxlen : 50,
                size : 30
            }
        },
        {
            id : "subject",
            xtype : "input",
            setting : {
            	maxlen : 300,
                size : 100
            }
        },
        {
            id : "propagator",
            xtype : "input",
            setting : {
		maxlen : 50,
                size : 30
            }
        },
        {
            id : "conclude",
            xtype : "input",
            setting : {
		maxlen : 300,
                size : 30
            }
        },
        {
            id : "judge",
            xtype : "input",
            setting : {
            	maxlen : 200,
                size : 200,
                width : '400px',
                height : '100px',
                multiline: true
            }
        },
        {
            id : "documentSave",
            xtype : "list",
            setting : {
                ds : "152",
                multi : true,
                save : "id",
                mapping : {
                        value : 'documentId'
                },
                forceNewline : true
            }
        },
        {
            id : "principal",
            xtype : "input",
            setting : {
            	maxlen : 30,
                size : 30
            }
        },
        {
            id : "inputPersonName",
            xtype : "input",
            setting : {
            	maxlen : 30,
                size : 30
            }
        },
        {
            id : "writeDate",
            xtype : "input",
            setting : {
                format: 'date',
                maxlen : 8,
                size : 10
            }
        },{
        	id : "content",
            xtype : "input",
            setting : {
            	maxlen : 200,
                size : 200,
                width : '400px',
                height : '100px',
                multiline: true
            }
        }
    ];




