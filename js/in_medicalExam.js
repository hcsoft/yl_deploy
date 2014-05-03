
    var services = {
        get : MedicalExamService.get,
        save : MedicalExamService.save,
        propValidate : MedicalExamService.hasAllThese,
        tableName : 'MedicalExam'
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
//                newlineStep : 10
            }
        },
        {
          id : "districtNumber",
          xtype : "input",
          setting : {             
              showOnly : true,
              asLabel : true
          }
      },{
          id : "medicalExamSex",
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
                writeback : [{id:"name", col: 1},{id:"medicalExamSex", col: 2},{id:"barCode", col:6}],
                mCodePrefixCtrlId : 'districtNumber',
                displayCols : [1,2,3,7],
                displayColNames : ["编号","姓名","",""]
            },
            required : [true, "编号"]
        },
        {
            id : "barCode",
            xtype : "input",
            setting : {
            	showOnly : true,
                readonly : true
            }
          },
        {
            id : "examDate",
            xtype : "input",
            setting : {
                //defaultVal: new Date(),
                maxlen : 8,
				format: 'date'
            },
            required : [true, "体检日期"]
        },
        {
            id : "doctor",
            xtype : "input",
            setting : {
                maxlen : 18,
                size : 18
            }
        },
        {
            id : "examSymptom",
            xtype : "list",
            setting : {
            	  ds:"149",
            	  multi:true,
            	  mapping : {
            	    value: 'examSymptomId'
            	  },
                save : 'id',
                newlineStep : 7,
                controlShow : 0,
                isDefaultVal : true,
                defaultVal : 0
            },
            requires : { valEq : 25 , fields : ['symptomOther'] }
        },
        {
            id : "symptomOther",
            xtype : "input",
            setting : {
            	disabled: true,
                maxlen : 30,
                size : 30,
                caption : '其它症状'
            }
        },
        {
            id : "general01",
            xtype : "input",
            setting : {
            	format: 'num',
                maxlen : 30,
                size : 5,
                range : 'range',
                minVal : 0,
                maxVal : 40
              }
        },
        {
            id : "general02",
            xtype : "input",
            setting : {
              format: 'int',
                maxlen : 30,
                size : 5 ,
                range : 'range',
                minVal : 0,
                maxVal : 130
              }
        },        
        {
            id : "general03",
            xtype : "input",
            setting : {
              format: 'int',
                maxlen : 30,
                size : 18 
              }
        },
        {
            id : "general04",
            xtype : "input",
            setting : {
              format: 'int',
                maxlen : 30,
                size : 5
              }
        },
        {
            id : "general05",
            xtype : "input",
            setting : {
              format: 'int',
                maxlen : 30,
                size : 5 
              }
        },
        {
            id : "general06",
            xtype : "input",
            setting : {
              format: 'int',
                maxlen : 30,
                size : 5 
              }
        },
{
            id : "general07",
            xtype : "input",
            setting : {
              format: 'int',
                maxlen : 30,
                size : 5 
              }
        },
        {
            id : "general08",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5 
              }
        },
{
            id : "general09",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5 
              }
        },
        {
            id : "general10",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5 
              }
        },
		{
            id : "general11",
            xtype : "input",
            setting : {
//              format: 'num',
                maxlen : 30,
                size : 5,
				readonly : true,
				asLabel : true
              },
		  valFormula : $F('general09').div($F('general08').multi($F('general08')).div($F(10000)))
        },
        {
            id : "general12",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5 
              }
        },
{
            id : "general13",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5,
				asLabel : true
              },
			 valFormula : $F('general10').div($F('general12'))
        },
        {
            id : "general14",
            xtype : "list",
            setting : {
            	  ds:"52"
              }
        },
				{
            id : "general15",
            xtype : "input",
            setting : {
              format: 'int',
                maxlen : 30,
                size : 5 
              }
        },
        {
            id : "general16",
            xtype : "list",
            setting : {
            	  ds:"52"
              }
        },
				{
            id : "general17",
            xtype : "input",
            setting : {
              format: 'int',
                maxlen : 30,
                size : 5 
              }
        },                                        
        {
            id : "life01",
            xtype : "list",
            setting : {
            	  ds:"13",
            	  controlShow : 2,
            	  controlShowVal : 'life02,life03,life04'
            }
        },
        {
            id : "life02",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 5
            }
        },
        {
            id : "life03",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 5
            }
        },
        {
            id : "life04",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 20
            }
        },
        {
            id : "eatHabit",
            xtype : "list",
            setting : {
                ds : "132",
                multi : true,
                save : "id",
                mapping : {
                    value : 'eatHabitId'
                }
            }
        },
        {
            id : "life06",
            xtype : "list",
            setting : {
                ds : "100",
                controlShow : 1,
                controlShowVal : 'life07,life08,life09'
            }
        },
        {
            id : "life07",
            xtype : "input",
            setting : {
              format: 'int',
                maxlen : 30,
                size : 5
            }
        },
        {
            id : "life08",
            xtype : "input",
            setting : {
              format: 'int',
                maxlen : 30,
                size : 5
            }
        },
        {
            id : "life09",
            xtype : "input",
            setting : {
              format: 'int',
                maxlen : 30,
                size : 5
            }
        },
        {
            id : "life10",
            xtype : "list",
            setting : {
                ds : "129",
                controlShow : 1,
                controlShowVal : 'life11,life12,life13,life14,life15,drinkHabit'
            }
        },
        {
            id : "life11",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 5
            }
        },
        {
            id : "life12",
            xtype : "list",
            setting : {
                ds : "78"
            }
        },
        {
            id : "life13",
            xtype : "input",
            setting : {
              format: 'int',
                maxlen : 30,
                size : 5
            }
        },
        {
            id : "life14",
            xtype : "input",
            setting : {
              format: 'int',
                maxlen : 30,
                size : 5
            }
        },
        {
            id : "life15",
            xtype : "list",
            setting : {
              format: 'int',
                ds : "171",
                save: "isInputValue"
            }
        },
        {
            id : "drinkHabit",
            xtype : "list",
            setting : {
            	  ds:"130",
            	  mapping : {
            	    value: 'drinkHabitId'
            	  },
                save : 'id',
            	  multi:true
            },
            requires : { valEq : 5 , fields : ['life16other'] }
        },
        {
            id : "life16other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 20,
                caption:"其它酒类"
            }
        },
        {
            id : "life17",
            xtype : "list",
            setting : {
              format: 'int',
              ds : "151",
              controlShow : 1,
              controlShowVal : 'life20,life21,life22,life23,life24,life25,life26,life27,life28,life29'
            },
            requires : { valEq : 2 , fields : ['life18','life19'] }            
        },
        {
            id : "life18",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 10,
                caption:"工种"
            }
        },
        {
            id : "life19",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 10,
                caption:"从业时间"
            }
        },
        {
            id : "life20",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 10
            }
        },
        {
            id : "life21",
            xtype : "list",
            setting : {
                save: 'isInputValue',
            	  ds:"151"
            },
            requires : { valEq : 2 , fields : ['life21other'] }
        },
        {
            id : "life21other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 10
            }
        },
        {
            id : "life22",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 10
            }
        },
        {
            id : "life23",
            xtype : "list",
            setting : {
              save: 'isInputValue',
            	  ds:"151"
            },
            requires : { valEq : 2 , fields : ['life23other'] }
        },
        {
            id : "life23other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 10
            }
        },
        {
            id : "life24",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 10
            }
        },
        {
            id : "life25",
            xtype : "list",
            setting : {
              save: 'isInputValue',
            	  ds:"151"
            },
            requires : { valEq : 2 , fields : ['life25other'] }
        },
        {
            id : "life25other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 10
            }
        },        
        {
            id : "viscera01",
            xtype : "list",
            setting : {
                ds : "49",
                isDefaultVal : true,
                defaultVal : 0
            }
        }, 
        {
            id : "viscera02",
            xtype : "list",
            setting : {
                ds : "8",
                newlineStep : 3,
                isDefaultVal : true,
                defaultVal : 0
            }
        },
        {
            id : "viscera02description",
            xtype : "input",
            setting : {
            	size : 5
            }
        },
        {
            id : "viscera02description1",
            xtype : "input",
            setting : {
            	size : 5
            }
        },
        {
            id : "viscera02description2",
            xtype : "input",
            setting : {
            	size : 5
            }
        },
        {
            id : "viscera02description3",
            xtype : "input",
            setting : {
            	size : 5
            }
        },
        {
            id : "viscera03",
            xtype : "list",
            setting : {
            	ds : '117',
                maxlen : 30,
                size : 5,
                isDefaultVal : true,
                defaultVal : 0
            }
        },
        {
            id : "viscera04",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5
            }
        },
        {
            id : "viscera05",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5
            }
        },
        {
            id : "viscera06",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5
            }
        },
        {
            id : "viscera07",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5
            }
        },
        {
            id : "viscera08",
            xtype : "list",
            setting : {
            	  ds:"90",
            	  isDefaultVal : true,
                  defaultVal : 0
            }
        },
        {
            id : "viscera09",
            xtype : "list",
            setting : {
            	  ds:"135",
            	  isDefaultVal : true,
                  defaultVal : 0
            }
        },
        {
            id : "body01",
            xtype : "list",
            setting : {
            	  ds:"150",
            	  isDefaultVal : true,
                  defaultVal : 0
            },
            required : [true,'健康体检记录的《查体》选项还没有录！'],
            requires : { valEq : 7 , fields : ['body01other'] }
        },
        {
            id : "body01other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 20
            }
        },
        {
            id : "body02",
            xtype : "list",
            setting : {
            	  ds:"30",
            	  isDefaultVal : true,
                  defaultVal : 0
            },
            requires : { valEq : 4 , fields : ['body02other'] }
        },
        {
            id : "body02other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 20,
                caption:"其它描述"
            }
        },
        {
            id : "body03",
            xtype : "list",
            setting : {
            	  ds:"53",
            	  isDefaultVal : true,
                  defaultVal : 0
            },
            requires : { valEq : 4 , fields : ['body03other'] }
        },
        {
            id : "body03other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 20,
                caption:"其它描述"
            }
        },
        {
            id : "body04",
            xtype : "list",
            setting : {
              format: 'int',
            	  ds:"80",
            	  save:"isInputValue",
            	  isDefaultVal : true,
                  defaultVal : 0
            }
        },
        {
            id : "body05",
            xtype : "list",
            setting : {
            	  ds:"35",
            	  isDefaultVal : true,
                  defaultVal : 0
            },
            requires : { valEq : 2 , fields : ['body05other'] }
        },
        {
            id : "body05other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 20,
                caption:"异常描述"
            }
        },
        {
            id : "body06",
            xtype : "list",
            setting : {
            	  ds:"54",
            	  isDefaultVal : true,
                  defaultVal : 0
            },
            requires : { valEq : 4 , fields : ['body06other'] }
        },
        {
            id : "body06other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 20,
                caption:"其它描述"
            }
        },
        {//心率
            id : "body07",
            xtype : "input",
            setting : {
              format: 'int',
                maxlen : 30,
                size : 5
            }
        },
        {//心律
            id : "body08",
            xtype : "list",
            setting : {
            	  ds:"105",
            	  isDefaultVal : true,
                  defaultVal : 0
            }
        },
        {//杂音
            id : "body09",
            xtype : "list",
            setting : {
            	  ds:"151",
            	  isDefaultVal : true,
                  defaultVal : 0
            },
            requires : { valEq : 2 , fields : ['body09other'] }
        },
        {//杂音其它描述
            id : "body09other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 20,
                caption:"异常描述"
            }
        },
        {//压痛
            id : "body10",
            xtype : "list",
            setting : {
            	  ds:"151",
            	  isDefaultVal : true,
                  defaultVal : 0
            },
            requires : { valEq : 2 , fields : ['body10other'] }
        },
        {//压痛异常描述
            id : "body10other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 20,
                caption:"异常描述"
            }
        },
        {//包块
            id : "body12",
            xtype : "list",
            setting : {
            	  ds:"151",
            	  isDefaultVal : true,
                  defaultVal : 0
            },
            requires : { valEq : 2 , fields : ['body12other'] }
        },
        {//包块异常描述
            id : "body12other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 20,
                caption:"异常描述"
            }
        },
        {//肝大
            id : "body13",
            xtype : "list",
            setting : {
            	  ds:"151",
            	  isDefaultVal : true,
                  defaultVal : 0
            },
            requires : { valEq : 2 , fields : ['body13other'] }
        },
        {//肝大异常描述
            id : "body13other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 20,
                caption:"异常描述"
            }
        },
        {//脾大
            id : "body14",
            xtype : "list",
            setting : {
            	  ds:"151",
            	  isDefaultVal : true,
                  defaultVal : 0
            },
            requires : { valEq : 2 , fields : ['body14other'] }
        },
        {//脾大异常描述
            id : "body14other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 20,
                caption:"异常描述"
            }
        },
        {//移动性浊音
            id : "body15",
            xtype : "list",
            setting : {
            	  ds:"151",
            	  isDefaultVal : true,
                  defaultVal : 0
            },
            requires : { valEq : 2 , fields : ['body15other'] }
        },
        {//移动性浊音异常描述
            id : "body15other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 20,
                caption:"异常描述"
            }
        },
        {//下肢水肿
            id : "body16",
            xtype : "list",
            setting : {
            	  ds:"101",
            	  isDefaultVal : true,
                  defaultVal : 0
            }
        },
        {//足背动脉博动
            id : "body17",
            xtype : "list",
            setting : {
            	  ds:"145",
            	  isDefaultVal : true,
                  defaultVal : 1
            }
        },
        {//肛门指诊
            id : "body18",
            xtype : "list",
            setting : {
            	  ds:"26"
            },
            requires : { valEq : 5 , fields : ['body18other'] }
        },
        {//肛门指诊异常描述
            id : "body18other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 20,
                caption:"异常描述"
            }
        },
        {//乳腺
            id : "galactophore",
            xtype : "list",
            setting : {
            	  ds:"70",
            	  mapping : {
            	    value: 'galactophoreId'
            	  },
                save : 'id',
            	  multi:true,
            	  controlShow : 0
            },
            requires : { valEq : 5 , fields : ['body19other'] }
        },
        {//乳腺异常描述
            id : "body19other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 20,
                caption:"异常描述"
            }
        },
        {//外阴
            id : "body20",
            xtype : "list",
            setting : {
            	  ds:"96"
            },
            requires : { valEq : 2 , fields : ['body20other'] }
        },
        {//外阴异常描述
            id : "body20other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 20,
                caption:"异常描述"
            }
        },
        {//阴道
            id : "body21",
            xtype : "list",
            setting : {
            	  ds:"96"
            },
            requires : { valEq : 2 , fields : ['body21other'] }
        },
        {//阴道异常描述
            id : "body21other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 20,
                caption:"异常描述"
            }
        },
        {//宫颈
            id : "body22",
            xtype : "list",
            setting : {
            	  ds:"96"
            },
            requires : { valEq : 2 , fields : ['body22other'] }
        },
        {//宫颈异常描述
            id : "body22other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 20,
                caption:"异常描述"
            }
        },
        {//宫体
            id : "body23",
            xtype : "list",
            setting : {
            	  ds:"96"
            },
            requires : { valEq : 2 , fields : ['body23other'] }
        },
        {//宫体异常描述
            id : "body23other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 20,
                caption:"异常描述"
            }
        },
        {//附件
            id : "body24",
            xtype : "list",
            setting : {
            	  ds:"96"
            },
            requires : { valEq : 2 , fields : ['body24other'] }
        },
        {//附件异常描述
            id : "body24other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 20,
                caption:"异常描述"
            }
        },
        {//其它
            id : "body25",
            xtype : "input",
            setting : {
                maxlen : 50,
                size : 50,
                defaultVal : '未测'
            }
        },
        {
            id : "exam01",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5,
                defaultVal : '-1'
            }
        },
        {
            id : "exam02",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5,
                defaultVal : '-1'
            }
        },
        {
            id : "exam03",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5,
                defaultVal : '-1'
            }
        },
        {
            id : "exam04",
            xtype : "input",
            setting : {
//              format: 'num',
                maxlen : 30,
                size : 5,
                defaultVal : '-1'
            }
        },
        {
            id : "exam05",
            xtype : "input",
            setting : {
//              format: 'num',
                maxlen : 30,
                size : 5,
                defaultVal : '-1'
            }
        },
        {
            id : "exam06",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 10,
                defaultVal : '未测'
            }
        },
        {
            id : "exam07",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 5,
                defaultVal : '未测'
            }
        },
        {
            id : "exam08",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 5,
                defaultVal : '未测'
            }
        },
        {
            id : "exam09",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 5,
                defaultVal : '未测'
            }
        },
        {
            id : "exam10",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 5,
                defaultVal : '未测'
            }
        },
        {
            id : "exam11",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 20,
                defaultVal : '未测'
            }
        },
        {
            id : "exam12",
            xtype : "input",
            setting : {
                format: 'num',
                maxlen : 30,
                size : 5,
                defaultVal : '-1'
            }
        },
        {
            id : "exam13",
            xtype : "list",
            setting : {
					ds:"11"
            }
        },
        {
            id : "exam14",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5,
                defaultVal : '-1'
            }
        },
        {
            id : "exam15",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5,
                defaultVal : '-1'
            }
        },
        {
            id : "exam16",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5,
                defaultVal : '-1'
            }
        },
        {
            id : "exam17",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5,
                defaultVal : '-1'
            }
        },
        {
            id : "exam18",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5,
                defaultVal : '-1'
            }
        },
        {
            id : "exam19",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5,
                defaultVal : '-1'
            }
        },
        {
            id : "exam20",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5,
                defaultVal : '-1'
            }
        },
        {
            id : "exam21",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5,
                defaultVal : '-1'
            }
        },
        {
            id : "exam22",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5,
                defaultVal : '-1'
            }
        },
        {
            id : "exam23",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5,
                defaultVal : '-1'
            }
        },
        {
            id : "exam24",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5,
                defaultVal : '-1'
            }
        },
        {
            id : "exam25",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5,
                defaultVal : '-1'
            }
        },
        {
            id : "exam26",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5,
                defaultVal : '-1'
            }
        },
        {
            id : "exam27",
            xtype : "input",
            setting : {
              format: 'num',
                maxlen : 30,
                size : 5,
                defaultVal : '-1'
            }
        },
        {
            id : "exam28",
            xtype : "list",
            setting : {
								ds:"11"
            }
        },
        {
            id : "exam29",
            xtype : "list",
            setting : {
            	  ds:"35"
            },
            requires : { valEq : 2 , fields : ['exam29other'] }
        },
        {
            id : "exam29other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 20,
                caption:"异常描述"
            }
            
        },
        {
            id : "exam30",
            xtype : "list",
            setting : {
            	  ds:"35"
            },
            requires : { valEq : 2 , fields : ['exam30other'] }
        },
        {
            id : "exam30other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 10,
                caption:"异常描述"
            }
        },
        {
            id : "exam31",
            xtype : "list",
            setting : {
            	  ds:"35"
            },
            requires : { valEq : 2 , fields : ['exam31other'] }
        },
        {
            id : "exam31other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 10,
                caption:"异常描述"
            }
        },
        {
            id : "exam32",
            xtype : "list",
            setting : {
            	  ds:"35"
            },
            requires : { valEq : 2 , fields : ['exam32other'] }
        },
        {
            id : "exam32other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 10,
                caption:"异常描述"
            }
        },
        {
            id : "exam33",
            xtype : "list",
            setting : {
            	  ds:"35"
            },
            requires : { valEq : 2 , fields : ['exam33other'] }
        },
        {
            id : "exam33other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 10,
                caption:"异常描述"
            }
        },
        {
            id : "exam34",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 50,
                defaultVal : '未测'
            }
        },
        {
            id : "chn01",
            xtype : "list",
            setting : {
            	  ds:"62"
            }
        },
        {
            id : "chn02",
            xtype : "list",
            setting : {
            	  ds:"66"
            }
        },
        {
            id : "chn03",
            xtype : "list",
            setting : {
            	  ds:"66"
            }
        },
        {
            id : "chn04",
            xtype : "list",
            setting : {
            	  ds:"66"
            }
        },
        {
            id : "chn05",
            xtype : "list",
            setting : {
            	  ds:"66"
            }
        },
        {
            id : "chn06",
            xtype : "list",
            setting : {
            	  ds:"66"
            }
        },
        {
            id : "chn07",
            xtype : "list",
            setting : {
            	  ds:"66"
            }
        },
        {
            id : "chn08",
            xtype : "list",
            setting : {
            	  ds:"66"
            }
        },
        {
            id : "chn09",
            xtype : "list",
            setting : {
            	  ds:"66"
            }
        },
        {
            id : "harnsSick",
            xtype : "list",
            setting : {
                ds : "60",
                multi : true,
                save : "id",
                mapping : {
                    value : 'harnsSickId'
                },
                newlineStep : 4,
                controlShow : 0,
                isDefaultVal : true,
                defaultVal : 0
            },
            required : [true,'健康体检记录的《其它》选项还没有录！'],
            requires : { valEq : 6 , fields : ['problem01other'] }
        },
        {
            id : "problem01other",
            xtype : "input",
            setting : {
                maxlen : 30,
                disabled : true,
                size : 30,
                caption: "其他脑血管疾病"
            }
        },
        {
            id : "kidneySick",
            xtype : "list",
            setting : {
                ds : "75",
                multi : true,
                save : "id",
                mapping : {
                    value : 'kidneySickId'
                },
                newlineStep : 4,
                controlShow : 0,
                isDefaultVal : true,
                defaultVal : 0
            },
            requires : { valEq : 6 , fields : ['problem02other'] }
        },
        {
            id : "problem02other",
            xtype : "input",
            setting : {
                maxlen : 30,
                disabled : true,
                size : 30,
                caption: "其他肾脏疾病"
            }
        },
        {
            id : "heartSick",
            xtype : "list",
            setting : {
                ds : "107",
                multi : true,
                save : "id",
                mapping : {
                    value : 'heartSickId'
                },
                newlineStep : 4,
                controlShow : 0,
                isDefaultVal : true,
                defaultVal : 0
            },
            requires : { valEq : 7 , fields : ['problem03other'] }
        },
        {
            id : "problem03other",
            xtype : "input",
            setting : {
                maxlen : 30,
                disabled : true,
                size : 30,
                caption: "其他心脏疾病"
            }
        },
        {
            id : "vasSick",
            xtype : "list",
            setting : {
                ds : "114",
                multi : true,
                save : "id",
                mapping : {
                    value : 'vasSickId'
                },
                controlShow : 0,
                isDefaultVal : true,
                defaultVal : 0
            },
            requires : { valEq : 4 , fields : ['problem04other'] }
        },
        {
            id : "problem04other",
            xtype : "input",
            setting : {
                maxlen : 30,
                disabled : true,
                size : 30,
                caption: "其他血管疾病"
            }
        },
        {
            id : "eyeSick",
            xtype : "list",
            setting : {
                ds : "119",
                multi : true,
                save : "id",
                mapping : {
                    value : 'eyeSickId'
                },
                controlShow : 0,
                isDefaultVal : true,
                defaultVal : 0
            },
            requires : { valEq : 5 , fields : ['problem05other'] }
        },
        {
            id : "problem05other",
            xtype : "input",
            setting : {
                maxlen : 30,
                disabled : true,
                size : 30,
                caption: "其他眼部疾病"
            }
        },
        {
            id : "problem06",
            xtype : "list",
            setting : {
                ds : "74",
                isDefaultVal : true,
                defaultVal : 0
            },
            requires : { valEq : 2 , fields : ['problem06other'] }
        },
        {
            id : "problem06other",
            xtype : "input",
            setting : {
                maxlen : 30,
                disabled : true,
                size : 30,
                caption: "疾病描述"
            }
        },
        {
            id : "problem07",
            xtype : "list",
            setting : {
                ds : "74",
                isDefaultVal : true,
                defaultVal : 0
             },
            requires : { valEq : 2 , fields : ['problem07other'] }
        },
        {
            id : "problem07other",
            xtype : "input",
            setting : {
                maxlen : 30,
                disabled : true,
                size : 30,
                caption: "疾病描述"
            }
        },
        {
            id : "hospitalization",
            xtype : "grid",
            setting : {
                displayCols : ['type','beginDate','endDate','reason','hospital','reportNo'],
                displayColNames : ["住院类型", "入院/建床日期","出院/撤床日期","原因","医疗机构名称","病案号"],
                colXtypes : ['list','input','input','input','input','input'],
                colSettings : [
                    {ds:"187",newLineStep:'1'},
                    {format: 'date',width:"70"},
                    {format: 'date',width:"70"},
                    {width:"70"},
                    {width:"70"},
                    {width:"70"}
                ],
                required : ['type',null, null,null,'hospital']
            },
            errCaption: "住院治疗情况"
        },
        {
            id : "examMedications",
            xtype : "grid",
            setting : {
                displayCols : ['drugName','usageWay','dosage','drugTime','dependency'],
                displayColNames : ["药名", "用法","用量","用药时间","服药依从性"],
                colXtypes : ['input','input','input','input','list'],
                colSettings : [
                    {width:"70"},
                    {width:"70"},
                    {width:"70"},
                    {width:"70"},
                    {ds:"18"}
                ],
                required : ['drugName']
            },
            errCaption: "用药情况"
        },
        {
            id : "vaccinateHistory",
            xtype : "grid",
            setting : {
                displayCols : ['bacterinName','vdate','hostpital'],
                displayColNames : ["名称", "接种日期","接种机构"],
                colXtypes : ['input','input','input'],
                colSettings : [
                    {width:"70"},
                    {width:"70", format: 'date'},
                    {width:"70"}
                ],
                required : ['bacterinName']
            },
            errCaption: "预防接种史"
        },
        {
            id : "judge01",
            xtype : "list",
            setting : {
//              format: 'int',
                ds : "35",
            	controlShow : 1,
            	controlShowVal : 'judge02,judge03,judge04,judge05',
            	isDefaultVal : true,
                defaultVal : 0
//                save: 'isInputValue'
            }
        },        
        {
            id : "judge02",
            xtype : "input",
            setting : {
               maxlen: 10,
               size : 30
            }
        },        
        {
            id : "judge03",
            xtype : "input",
            setting : {
               maxlen: 10,
               size : 30
            }
        },        
        {
            id : "judge04",
            xtype : "input",
            setting : {
               maxlen: 10,
               size : 30
            }
        },        
        {
            id : "judge05",
            xtype : "input",
            setting : {
               maxlen: 10,
               size : 30
            }
        },
        {
            id : "healthDirect",
            xtype : "list",
            setting : {
            	ds:"46",
            	mapping : {
            	    value: 'healthDirectId'
            	},
                save : 'id',
            	multi:true
			}
        },
        {
            id : "dangerControl",
            xtype : "list",
            setting : {
            	  ds:"97",
                mapping : {
                  value: 'dangerControlId'
                },
                save : 'id',
            	  multi:true
						},
            requires :  [
            { valEq : 5 , fields : ['dangerControlOther1'] },            
            { valEq : 6 , fields : ['dangerControlOther2'] },            
            { valEq : 7 , fields : ['dangerControlOther3'] }]
        },
        {
            id : "dangerControlOther1",
            xtype : "input",
            setting : {
                disabled:true,
                maxlen : 30,
                size : 10,
                caption:"减体重目标"
            }
        },
        {
            id : "dangerControlOther2",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 10,
                caption:"建议疫苗接种"
            }
        },
        {
            id : "dangerControlOther3",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 10,
                caption:"其他"
            }
        },
        {
            id : "oldManHealthEstimate",
            xtype : "list",
            setting : {
                ds : "1274"
            }
        },
        {
            id : "oldManLifeEstimate",
            xtype : "list",
            setting : {
                ds : "1280",
                newlineStep : 2
            }
        },
        {
            id : "life26",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 10
            }
        },
        {
            id : "life27",
            xtype : "list",
            setting : {
              save: 'isInputValue',
            	  ds:"151"
            },
            requires : { valEq : 2 , fields : ['life27other'] }
        },
        {
            id : "life27other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 10
            }
        },
        {
            id : "life28",
            xtype : "input",
            setting : {
                maxlen : 30,
                size : 10
            }
        },
        {
            id : "life29",
            xtype : "list",
            setting : {
              save: 'isInputValue',
            	  ds:"151"
            },
            requires : { valEq : 2 , fields : ['life29other'] }
        },
        {
            id : "life29other",
            xtype : "input",
            setting : {
            	  disabled:true,
                maxlen : 30,
                size : 10
            }
        }
    ];




