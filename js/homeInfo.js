	var loadTriggerParameters = ["homeId"];
    var services = {
        get : HomeInfoService.get,
        save : HomeInfoService.save
    };
    
    var cfg = [
        {
            id : "homeId",
            xtype : "input",
            setting : {
//                showOnly: true,
//                asLabel : true,
                maxlen : 3,
                size : 3
            }
        },
        {
            id : "name",
            xtype : "input",
            setting : {
            	maxlen : 20,
                size : 20,
                readonly : true,
				showOnly : true
            }
        },
        {
            id : "sex",
            xtype : "input",
            setting : {
            	maxlen : 20,
                size : 20,
                readonly : true,
				showOnly : true
            }
        },
        {
            id : "birthday",
            xtype : "input",
            setting : {
            	readonly : true,
				showOnly : true,
				maxlen : 8,
                format: 'date'
            }
        },
        {
            id : "fileNo",
            xtype : "combo",
            setting : {
                ds :  {search:FileNumSearch.listCodePage, get:FileNumSearch.getItem},
                local : false,
                width : 140,
                model : {
                    id : 0,
                    code : 0,
                    display : 1
                },
                showDisplay: false,
                roWhenSet : true,
                writeback : [{id:"name", col: 1},{id:"sex", col: 2}, {id:"birthday", col:3}],
                mCodePrefixCtrlId : 'districtNumber',
                displayCols : [0,1,2,3],
                displayColNames : ["编号","","",""]
            }
        },
        {
          id : "household",
          xtype : "input",
          setting : {
            maxlen : 18,
            size : 18
          },
          required : [true, "户主"] 
        },
        {
            id : "personCount",
            xtype : "input",
            setting : {
                maxlen : 18,
                size : 18
            },
            required : [true, "家庭人数"] 
        },
        
        {
            id : "address",
            xtype : "input",
            setting : {
                maxlen : 18,
                size : 18
            }
        },
         {
            id : "residenceAddress",
            xtype : "input",
            setting : {
                maxlen : 18,
                size : 18
            }
        },
         {
            id : "phone",
            xtype : "input",
            setting : {
                maxlen : 18,
                size : 18
            }
        },
         {
            id : "township",
            xtype : "input",
            setting : {
                maxlen : 18,
                size : 18,
                readonly : true
            }
        },
        { id : "village",
            xtype : "input",
            setting : {
                maxlen : 18,
                size : 18,
                readonly : true
            }
        },
         { id : "buildUnit",
            xtype : "input",
            setting : {
                maxlen : 18,
                size : 18
            }
        },
        { id : "buildPerson",
            xtype : "input",
            setting : {}
        },
        { id : "buildDate",
            xtype : "input",
            setting : {
                maxlen: 8,
                format: "date",
                defaultVal : new Date()
            },
            required : [true, "建档日期"]
        },{ id : "districtNumber",
            xtype : "input",
            setting : {
                readonly : true
            }
        },{ id : "personalList",
    		xtype : "simplePanel",
    		setting: {
        		renderTo:'personalList',
        		width:800,
	    		height:450,
	    		pageSize : 5,
	    		recordPk:'fileNo',
	    		recordId : 'healthFile_fileNo',
	    		queryUrl: HomeInfoService.getHealthFile.createDelegate(this),
	    		deleteUrl : HomeInfoService.removeModules.createDelegate(this),
	    		queryConfig : [
	    		               {name : 'id' ,hidden :true,hideLabel :true}
	    		             ],
	    		queryConfigEx:200,
        		readerConfig : [
					{name:'healthFile_fileNo',mapping:'fileNo',"width":250},
					{name:'healthFile_name',mapping:'name',"width":100},
					{name:'personalInfo_sex', mapping: 'personalInfo.sex',"width":100},
					{name:'personalInfo_birthday', mapping: 'personalInfo.birthday',"width":100},
					{name:'healthFile_address',mapping:'address',"width":250}
				] ,	
				gridCm :[{ "header" : "档案编号", "dataIndex" : "healthFile_fileNo", "width":250 }, 
			                     { "header" : "姓名", "dataIndex" : "healthFile_name","width":100}, 
			                     { "header" : "性别", "dataIndex" : "personalInfo_sex","width":100 }, 
			                     { "header" : "生日", "dataIndex" : "personalInfo_birthday", 
			                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d'),"width":100 },
			                     { "header" : "住址", "dataIndex" : "healthFile_address", "width":250 }]
			            
			}
        }
        
    ];
    
    



