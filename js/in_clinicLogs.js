var loadTriggerParameters = ["id"];
var services = {
	get : ClinicLogsService.get,
	save : ClinicLogsService.save
};

var cfg = [{
	id : "fileNo",
    xtype : "input",
    setting : {
        maxlen : 30,
        size : 18
    }
},{
	id : "startIll",
    xtype : "input",
    setting : {
        maxlen : 8,
        size : 10,
        format : 'date'
    }
},{
	id : "symptom",
    xtype : "input",
    setting : {
    	multiline: true,
        maxlen : 500,
        size : 30,
        height:"50px",
        width : "200px",
        classes : 'thin'
    }
},{
	id : "temperature",
    xtype : "input",
    setting : {
        maxlen : 30,
        size : 10,
        format : 'num'
        
    }
},{
	id : "presure01",
    xtype : "input",
    setting : {
        maxlen : 30,
        size : 10,
        format : 'num'
        
    }
},{
	id : "presure02",
    xtype : "input",
    setting : {
        maxlen : 30,
        size : 10,
        format : 'num'
        
    }
},{
	id : "diagnose",
    xtype : "input",
    setting : {
    	multiline: true,
        maxlen : 500,
        size : 100,
        width:"200px",
        height:"50px",
        format : 'thin'
        
    }
},{
	id : "suggustion",
    xtype : "input",
    setting : {
    	multiline: true,
        maxlen : 500,
        size : 100,
        width:"200px",
        height:"50px",
        format : 'thin'
        
    }
},{   // 随访医生
    id : "doctor",
    xtype : "input",
    setting : {
        maxlen : 30,
        size : 10
    }
},{
	id : "recepTime",
    xtype : "input",
    setting : {
        maxlen : 8,
        size : 10,
        format : 'date'
    }
},{
	id : "remark",
    xtype : "input",
    setting : {
    	multiline: true,
        maxlen : 500,
        size : 200,
        width:"200px",
        height:"50px"
        
    }
}];