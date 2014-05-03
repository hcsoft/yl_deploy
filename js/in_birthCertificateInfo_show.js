    var loadTriggerParameters = ["certifiId"];
    var services = {
        get : BirthCertificateMsgService.get,
        save : BirthCertificateMsgService.save
    };
    
    var cfg = [
        {
            id : "name",
            xtype : "input",
            setting : {
            	maxlen : 10,
                size : 10
            }
        },{
            id : "borthWeekly",
            xtype : "input",
            setting : {
            	maxlen : 10,
                size : 10
            }
        },
        {
          id : "sex",
          xtype : "list",
          setting : {
              ds : "1411"
          },
          required : [true, "新生儿性别"] 
        },
        {
            id : "weight",
            xtype : "input",
            setting : {
                format : "num",
                maxlen : 10,
                size : 10
            },
            required : [true, "体重"] 
          },
       
       
        {
            id : "borthOrganization",
            xtype : "input",
            setting : {
            	maxlen : 20,
                size : 20
            },
            required : [true, "接生单位"]
        },
        {
            id : "widwife",
            xtype : "input",
            setting : {
            	maxlen : 10,
                size : 10
            },
            required : [true, "接生人员"] 
        },
        {
            id : "linkmanTel",
            xtype : "input",
            setting : {
            	maxlen : 12,
                size : 11
            },
            required : [true, "联系电话"] 
        },
        
        {
            id : "birthday",
            xtype : "datefield",
            setting : {
            	defaultVal : new Date()
            }
//            required : [true, "出生日期"] 
        },
        {
            id : "province",
            xtype : "input",
            setting : {
                maxlen : 10,
                size : 10
            },
            required : [true, "省"] 
        },
        {
            id : "city",
            xtype : "input",
            setting : {
                maxlen : 10,
                size : 10
            },
            required : [true, "市"] 
        },
        {
            id : "county",
            xtype : "input",
            setting : {
                maxlen : 10,
                size : 10
            },
            required : [true, "县"] 
        },
        {
            id : "township",
            xtype : "input",
            setting : {
                maxlen : 10,
                size : 10
            },
            required : [true, "乡"] 
        },
        {
            id : "healthStatus",
            xtype : "list",
            setting : {
                ds : "1438"
            },
        	required : [true, "健康状况"] 
        },
        {
            id : "height",
            xtype : "input",
            setting : {
                maxlen : 10,
                size : 10
            },
            required : [true, "身长"] 
        },
        {
            id : "motherName",
            xtype : "input",
            setting : {
            	maxlen : 10,
                size : 10
            },
            required : [true, "母亲姓名"]
        },
        {
            id : "motherAge",
            xtype : "input",
            setting : {
            	maxlen : 10,
                size : 10,
                format : 'int'
            },
            required : [true, "年龄"]
        },
        {
            id : "motherNationality",
            xtype : "input",
            setting : {
            	maxlen : 10,
                size : 10
            },
            required : [true, "国籍"]
        },
        {
            id : "motherNation",
            xtype : "input",
            setting : {
            	maxlen : 10,
                size : 10
            },
            required : [true, "民族"]
        },
        {
            id : "motherIdCard",
            xtype : "input",
            setting : {
            	maxlen : 18,
                size : 20
            },
            required : [true, "身份证号"]
        },
        {
            id : "fatherName",
            xtype : "input",
            setting : {
            	maxlen : 10,
                size : 10
            },
            required : [true, "父亲姓名"]
        },
        {
            id : "fatherAge",
            xtype : "input",
            setting : {
            	maxlen : 10,
                size : 10,
                format : 'int'
            },
            required : [true, "年龄"]
        },
        {
            id : "fatherNationality",
            xtype : "input",
            setting : {
            	maxlen : 10,
                size : 10
            },
            required : [true, "国籍"]
        },
        {
            id : "fatherNation",
            xtype : "input",
            setting : {
            	maxlen : 10,
                size : 10
            },
            required : [true, "民族"]
        },
        {
            id : "fatherIdCard",
            xtype : "input",
            setting : {
            	maxlen : 18,
                size : 20
            },
            required : [true, "身份证号"]
        },
        {
            id : "borthAddressCategory",
            xtype : "list",
            setting : {
               ds : "1442"
            },
            required : [true, "出生地分类"],
            requires : { valEq : "4" , fields : ["otherBorthAddressCategory"] }  // 
        },
        {
            id : "otherBorthAddressCategory",
            xtype : "input",
            setting : {
            	disabled : true,
                maxlen : 20,
                size : 20
            }
        },
         {
            id : "certifiId",
            xtype : "input",
            setting : {
                maxlen : 20,
                size : 20,
                asLabel : true
            }
        },
         {
            id : "issuingDate",
            xtype : "datefield",
            setting : {
            	defaultVal : new Date(),
            	disabled : true
            }
//            required : [true, "签发日期"]
        },
         {
            id : "issuingOrganization",
            xtype : "input",
            setting : {
                maxlen : 20,
                size : 20
            },
            required : [true, "签证机构"]
        },
        { 
        	id : "familyAddress",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 30
            },
            required : [true, "家庭住址"]
        },
         { 
        	id : "districtNum",
            xtype : "input",
            setting : {
                maxlen : 20,
                size : 20,
                searchDistrict : true
            },
            required : [true, "所属行政区划编码"]
        },{
        	id : "reasonRemarks",
        	xtype : "list",
        	setting : {
        		ds : "1447"
        	},
        	requires : { valEq : "3" , fields : ["otherDestroyReason"] }
        },{ 
        	id : "otherDestroyReason",
            xtype : "input",
            setting : {
                maxlen : 20,
                size : 20
            }
        },{
        	id : "type",
            xtype : "input"
        }
    ];




