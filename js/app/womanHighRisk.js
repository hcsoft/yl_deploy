Ext.ns("app");

app.highRiskPanel = new Ext.tf.HighRiskPanel({
  treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
  queryUrl : UserMenuTreeService.findHighRiskRecords,
  dataExportUrl : DataExportService.dataExportByHighRisk,
  gridViewConfig : {
  	forceFit : true,
  	getRowClass : function(record,rowIndex,rowParams,store){ 
  		if(rowIndex % 2 == 0){
  			return 'my_row_odd';
  		}else{
  			return 'my_row_even';
  		}
  	}
  },
  title: '高危孕产妇档案信息',
  recordId : 'file.fileNo',
  recordPk: 'file.fileNo',
  readerConfig : [
                   {name:'fileNo',mapping: 'file.fileNo'},
                   {name:'name',mapping: 'file.name'},
                   {name:'personalInfo_sex', mapping: 'personalInfo.sex'},
                   {name:'personalInfo_birthday', mapping: 'personalInfo.birthday'},
                   {name:'personalInfo_idnumber', mapping: 'personalInfo.idnumber'},
                   {name:'address',mapping: 'file.sex'},
                   {name:'personalInfo_linkman',mapping:'personalInfo.linkman'},
                   {name:'personalInfo_tel', mapping: 'personalInfo.tel'},
                   {name:'lastExamDate', mapping: 'record.lastExamDate'},
                   {name:'highRiskRemarks', mapping: 'record.highRiskRemarks'},
                   {name:'type', mapping: 'record.type'}
                 ],
  gridCmConfig :
                 [{
					"header" : "状态",
					"dataIndex" : "type",
					"id" : "type",
					"renderer": function(v){
						if(v == 0){
							return '转归人员';
						}else if(v == 1){
							return '在管人员';
						}
					}
				},
                   { "header" : "档案编号", "dataIndex" : "fileNo"}, 
                   { "header" : "姓名", "dataIndex" : "name"}, 
                   { "header" : "性别", "dataIndex" : "personalInfo_sex"}, 
                   { "header" : "生日", "dataIndex" : "personalInfo_birthday", 
                                       "renderer": Ext.util.Format.dateRenderer('Y-m-d') }, 
                   { "header" : "身份证号", "dataIndex" : "personalInfo_idnumber","renderer": function(v){
                       return denc(v);
                   } }, 
                   { "header" : "最近一次产检时间", "dataIndex" : "lastExamDate" ,
                	   "renderer": Ext.util.Format.dateRenderer('Y-m-d')}, 
                   { "header" : "高危因素", "dataIndex" : "highRiskRemarks"},
                   { "header" : "联系人", "dataIndex" : "personalInfo_linkman" }, 
                   { "header" : "住址", "dataIndex" : "address" }, 
                   { "header" : "电话", "dataIndex" : "personalInfo_tel"}
                   
                 ]
});

// _tab = ModuleMgr.register(app.highRiskPanel);
ModuleMgr.register(app.highRiskPanel);

