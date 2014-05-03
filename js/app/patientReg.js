Ext.ns("app");

app.patientRegPanel = new Ext.tf.ClinicLogs({
    title: '门诊病人登记',
    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : UserMenuTreeService.queryClinicLogs,
//    deleteUrl : UserMenuTreeService.removeChildExamRecords,
    recordId : 'id',
    recordPk : 'id',
    detailUrl: '/clinicLogs.html',
    readerConfig : [
                    
                    {mapping:"inputTime",name:"inputTime"},
                    {mapping:"fileNo",name:"fileNo"},
                    {mapping:"sickInfo.name",name:"name"},
                    {mapping:"sickInfo.sex",name:"sex"},
                    {mapping:"sickInfo.isDiabetesVisit",name:"isDiabetesVisit"},
                    {mapping:"sickInfo.isHypertensionVisit",name:"isHypertensionVisit"},
                    {mapping:"sickInfo.isFuriousInfo",name:"isFuriousInfo"},
                    {mapping:"sickInfo.allergies","width":300,name:"allergies"},
                    {name:"id",mapping:"id"}],
    gridCmConfig : [
                    {"header":"录入时间","dataindex":"inputTime","renderer": Ext.util.Format.dateRenderer('Y-m-d'),"width":100},
                    {"header":"档案编号","dataindex":"fileNo","width":200},
                    {"header":"姓名","dataindex":"name"},
                    {"header":"性别","dataindex":"sex"},
                    {"header":"糖尿病","dataindex":"isDiabetesVisit","renderer" : function(value){
                    	var retVal = "<span>无</span>";
                    	if(value)
                    		retVal="<span>有</span>";
                    	return retVal;
                    }},
                    {"header":"重性精神病","dataindex":"isHypertensionVisit","renderer" : function(value){
                    	var retVal = "<span>无</span>";
                    	if(value)
                    		retVal="<span>有</span>";
                    	return retVal;
                    }},
                    {"header":"高血压","dataindex":"isFuriousInfo","renderer" : function(value){
                    	var retVal = "<span>无</span>";
                    	if(value)
                    		retVal="<span>有</span>";
                    	return retVal;
                    }},
                    {"header":"药物过敏","dataindex":"allergies","renderer" : function(value){
                    	if(value != null && value != ""){
                    		return "<span>"+ value.substring(0,value.length - 1) +"</span>";
                    	}
                    }}]
});
ModuleMgr.register(app.patientRegPanel);
