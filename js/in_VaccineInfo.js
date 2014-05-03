
    var services = {
//        get : PersonalInfoService.get,
//        save : PersonalInfoService.save
    	  get : VaccineInfoService.get,
          save : VaccineInfoService.save
    };
    
    var cfg = [
          {
            id : "vaccineInfo",
            xtype : "grid",
            setting : {
                ds : "vaccineInfo",
                displayCols : ['name','target','times','postion','path','dosage','description'],
                displayColNames : ["疫苗", "接种对象 <br> 月（年）龄", "接种剂次","接种部位","接种途径","接种剂量<br> /剂次","备注"],
                colXtypes : ['combo','input','input','combo','combo','input','input'],
                colSettings : [
                    {ds:"167"},
                    {},
                    {},
                    {ds:"168"},
                    {ds:"169"},
                    {},
                    {}
                ]
            }
        }        
    ];




