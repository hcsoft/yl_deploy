Ext.ns("app");

app.report03Panel = new Ext.tf.SimpleReportPanel({
  title : '乡镇汇总统计表(按建档人员)',
  queryUrl : ReportStat.findReport03.createDelegate(this),
  readerConfig : [
     { name : 'inputPersonName' }
    ,{ name : 'farmCount' }
    ,{ name : 'nonFarmCount' }
    ,{ name : 'childBabyVisit'  }
    ,{ name : 'childFile'  }
	,{ name : 'childVisit'  }
	,{ name : 'pregnantFile'}
	,{ name : 'pregnantBeforeVisit'  }
	,{ name : 'pregnantNatalVisit'  }
	,{ name : 'oldExam'  }
	,{ name : 'hypFile'  }
	,{ name : 'hypVisit'  }
	,{ name : 'diabFile'  }
	,{ name : 'diabVisit'  }
	,{ name : 'furiousFile'  }  
	,{ name : 'furiousVisit'  }    
  ],

  gridCm : [
     { width:60, header : "录入人", dataIndex : "inputPersonName"  }
    ,{ width:60, align: 'center', header : "农业人口<br/>建档数", dataIndex : "farmCount",renderer : function(val){
		if(val == 0)
			return '';
		return val;
	}}
	,{ width:80, align: 'center', header : "城镇人口<br/>建档数", dataIndex : "nonFarmCount",renderer : function(val){
		if(val == 0)
			return '';
		return val;
	} }
//	,{ width:60, align: 'center', header : "健教资料<br/>发放数", dataIndex : "eduPaper"}
//	,{ width:60, align: 'center', header : "健康档案<br/>宣传栏<br/>更新次数", dataIndex : "eduBar"}
//	,{ width:60, align: 'center', header : "健康主题<br/>宣传次数", dataIndex : "eduActivity"}
//	,{ width:60, align: 'center', header : "健教<br/>讲座次数", dataIndex : "eduTalk"}
//	,{ width:70, align: 'center', header : "0-6岁儿童<br/>预防接种数", dataIndex : "vaccBaby"}
//	,{ width:80, align: 'center', header : "15岁以下<br/>儿童补种乙肝<br/>疫苗次数",dataIndex : "vaccHepatitis"}
	,{ width:60, align: 'center', header : "新生儿<br/>访视次数",dataIndex : "childBabyVisit",renderer : function(val){
		if(val == 0)
			return '';
		return val;
	}}
	,{ width:80, align: 'center', header : "0-6岁儿童<br/>档案",dataIndex : "childFile",renderer : function(val){
		if(val == 0)
			return '';
		return val;
	}}
	,{ width:80, align: 'center', header : "0-6岁儿童<br/>保健系统管理<br/>随访次数",dataIndex : "childVisit",renderer : function(val){
		if(val == 0)
			return '';
		return val;
	}}
	,{ width:60, align: 'center', header : "孕产妇<br/>档案",dataIndex : "pregnantFile",renderer : function(val){
		if(val == 0)
			return '';
		return val;
	}}
	,{ width:60, align: 'center', header : "产前访视<br/>随访次数",dataIndex : "pregnantBeforeVisit",renderer : function(val){
		if(val == 0)
			return '';
		return val;
	}}
	,{ width:60, align: 'center', header : "产后访视<br/>随访次数",dataIndex : "pregnantNatalVisit",renderer : function(val){
		if(val == 0)
			return '';
		return val;
	}}
	,{ width:60, align: 'center', header : "65老年人<br/>保健次数",dataIndex : "oldExam",renderer : function(val){
		if(val == 0)
			return '';
		return val;
	}}
	,{ width:60, align: 'center', header : "高血压病<br/>档&nbsp;&nbsp;&nbsp;&nbsp;案",dataIndex : "hypFile",renderer : function(val){
		if(val == 0)
			return '';
		return val;
	}}
	,{ width:60, align: 'center', header : "高血压病<br/>随访次数",dataIndex : "hypVisit",renderer : function(val){
		if(val == 0)
			return '';
		return val;
	}}
	,{ width:60, align: 'center', header : "糖尿病<br/>档&nbsp;&nbsp;&nbsp;&nbsp;案",dataIndex : "diabFile",renderer : function(val){
		if(val == 0)
			return '';
		return val;
	}}
	,{ width:60, align: 'center', header : "糖尿病<br/>随访次数",dataIndex : "diabVisit",renderer : function(val){
		if(val == 0)
			return '';
		return val;
	}}
	,{ width:80, align: 'center', header : "重性精神病<br/>档&nbsp;&nbsp;&nbsp;&nbsp;案",dataIndex : "furiousFile",renderer : function(val){
		if(val == 0)
			return '';
		return val;
	}}
	,{ width:80, align: 'center', header : "重性精神病<br/>随访次数",dataIndex : "furiousVisit",renderer : function(val){
		if(val == 0)
			return '';
		return val;
	}}
  ]
});

_tab = ModuleMgr.register(app.report03Panel);
app.report03Panel.load();
