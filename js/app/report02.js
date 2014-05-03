Ext.ns("app");

app.report02Panel = new Ext.tf.SimpleReportPanel({
	title : '乡镇汇总统计表(按责任人)',
	queryUrl : ReportStat.findReport02.createDelegate(this),
	readerConfig : [
     { name : 'orgName' }
    ,{ name : 'doctorName' }
		,{ name : 'vaccBaby'  }
		,{ name : 'vaccHepatitis'  }
		,{ name : 'childBabyVisit'  }
		,{ name : 'childVisit'  }
		,{ name : 'pregnantBeforeVisit'  }
		,{ name : 'pregnantNatalVisit'  }
		,{ name : 'oldExam'  }
		,{ name : 'hypVisit'  }
		,{ name : 'diabVisit'  }
		,{ name : 'furiousVisit'  }    
  ],

	gridCm : [
     { width:60, header : "乡镇", dataIndex : "orgName"  }
    ,{ width:60, header : "责任人", dataIndex : "doctorName"  }
    ,{ width:70, align: 'center', header : "0-6岁儿童<br/>预防接种数", dataIndex : "vaccBaby"}
    ,{ width:80, align: 'center', header : "15岁以下<br/>儿童补种乙肝<br/>疫苗次数",dataIndex : "vaccHepatitis"}
    ,{ width:60, align: 'center', header : "新生儿<br/>访视次数",dataIndex : "childBabyVisit"}
    ,{ width:80, align: 'center', header : "0-3岁儿童<br/>保健系统管理<br/>随访次数",dataIndex : "childVisit"}
    ,{ width:60, align: 'center', header : "产前访视<br/>随访次数",dataIndex : "pregnantBeforeVisit"}
    ,{ width:60, align: 'center', header : "产后访视<br/>随访次数",dataIndex : "pregnantNatalVisit"}
    ,{ width:60, align: 'center', header : "65老年人<br/>保健次数",dataIndex : "oldExam"}
    ,{ width:60, align: 'center', header : "高血压病<br/>随访次数",dataIndex : "hypVisit"}
    ,{ width:60, align: 'center', header : "糖尿病<br/>随访次数",dataIndex : "diabVisit"}
    ,{ width:80, align: 'center', header : "重性精神病<br/>随访次数",dataIndex : "furiousVisit"}		
  ]
});

_tab = ModuleMgr.register(app.report02Panel);
app.report02Panel.load();
