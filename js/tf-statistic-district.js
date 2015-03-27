Ext.ns("Ext.tf");

Ext.tf.StatisticByDistrict = Ext.extend(Ext.Panel, {
	closable : true,
	layout : 'fit',
	treeLoaderFn : Ext.emptyFn,
	queryUrl : Ext.emptyFn,
	currentNode : null,
	recordId : 'id',
	gridId : 'statisticByDistrict',
	readerConfig : [{
		name : 'id'
	}, {
		name : 'name'
	}, {
		name : 'parentId'
	}, {
		name : 'level'
	}, {
		name : 'isDetail'
	}, {
		name : 'districtNumber'
	}, {
		name : 'vHealthFileCount'
	}, {
		name : 'cHealthFileCount'
	}, {
		name : 'babyVisitCount'
	}, {
		name : 'childrenMediExam01count'
	}, {
		name : 'childrenMediExam02count'
	}, {
		name : 'childrenMediExam36count'
	}, {
		name : 'childrenMdeiExamTotals'
	}, {
		name : 'firstVistBeforeBornCount'
	}, {
		name : 'visitBeforeBornCount'
	}, {
		name : 'visitBeforeBornTotals'
	}, {
		name : 'visitAfterBornCount'
	}, {
		name : 'visitAfterBorn42count'
	}, {
		name : 'hypertensionVisitCount'
	}, {
		name : 'diabetesVisitCount'
	}, {
		name : 'furiousVisitCount'
	}, {
		name : 'medicalExamCount'
	}, {
		name : 'chileHealthFileCount'
	}, {
		name : 'childHighRiskHealthFileCount'
	}, {
		name : 'oldManHeathFileCount'
	}, {
		name : 'hypertensionHealthFileCount'
	}, {
		name : 'diabetesHealthFileCount'
	}, {
		name : 'holergasiaHealthFileCount'
	}, {
		name : 'womanInitBirthHealthFileCount'
	}, {
		name : 'womanAreadyBirthHealthFileCount'
	}, {
		name : 'womanExceptionBirthHealthFileCount'
	}, {
		name : 'womanHighRiskInitBirthHealthFileCount'
	}, {
		name : 'womanHighRiskAreadyBirthHealthFileCount'
	}, {
		name : 'womanHighRiskExceptionBirthHealthFileCount'
	}],
	gridCmConfig : [{
		"header" : "行政区划",
		"dataIndex" : "name",
		"id" : "name",
		"width" : 100,
		"renderer" : function(value, metadata, record, rowIndex, colIndex, store){
			return value;
//			if(record.data.isDetail == 0){
////				console.log(Ext.getCmp('statisticByDistrict')); 
//				return "-" + value;
//			}else if(record.data.isDetail == 1){
//				return "&nbsp;&nbsp;-" + value;
//			}
		}.createDelegate(this)
	}, {
		"header" : "农业人口档案数",
		"dataIndex" : "vHealthFileCount",
		"id" : "vHealthFileCount"
	},{
		"header" : "城镇人口档案数",
		"dataIndex" : "cHealthFileCount",
		"id" : "cHealthFileCount"
	},{
		"header" : "儿童档案数",
		"dataIndex" : "chileHealthFileCount",
		"id" : "chileHealthFileCount"
	},{
		"header" : "高危儿童档案数",
		"dataIndex" : "childHighRiskHealthFileCount",
		"id" : "childHighRiskHealthFileCount"
	},{
		"header" : "未结案孕产妇档案数",
		"dataIndex" : "womanInitBirthHealthFileCount",
		"id" : "womanInitBirthHealthFileCount"
	},{
		"header" : "已结案孕产妇档案数",
		"dataIndex" : "womanAreadyBirthHealthFileCount",
		"id" : "womanAreadyBirthHealthFileCount"
	},{
		"header" : "终止妊娠孕产妇档案数",
		"dataIndex" : "womanExceptionBirthHealthFileCount",
		"id" : "womanExceptionBirthHealthFileCount"
	},{
		"header" : "高危未结案孕产妇档案数",
		"dataIndex" : "womanHighRiskInitBirthHealthFileCount",
		"id" : "womanHighRiskInitBirthHealthFileCount"
	},{
		"header" : "高危已结案孕产妇档案数",
		"dataIndex" : "womanHighRiskAreadyBirthHealthFileCount",
		"id" : "womanHighRiskAreadyBirthHealthFileCount"
	},{
		"header" : "高危终止妊娠孕产妇档案数",
		"dataIndex" : "womanHighRiskExceptionBirthHealthFileCount",
		"id" : "womanHighRiskExceptionBirthHealthFileCount"
	},{
		"header" : "老年人档案数",
		"dataIndex" : "oldManHeathFileCount",
		"id" : "oldManHeathFileCount",
		"hidden" : true
	},{
		"header" : "高血压档案数",
		"dataIndex" : "hypertensionHealthFileCount",
		"id" : "hypertensionHealthFileCount"
	},{
		"header" : "二型糖尿病档案数",
		"dataIndex" : "diabetesHealthFileCount",
		"id" : "diabetesHealthFileCount"
	},{
		"header" : "重性精神病档案数",
		"dataIndex" : "holergasiaHealthFileCount",
		"id" : "holergasiaHealthFileCount"
	}, {
		"header" : "健康体检",
		"dataIndex" : "medicalExamCount",
		"id" : "medicalExamCount"
	}, {
		"header" : "新生儿家庭访视",
		"dataIndex" : "babyVisitCount",
		"id" : "babyVisitCount"
	}, {
		"header" : "1岁以内儿童体检",
		"dataIndex" : "childrenMediExam01count",
		"id" : "childrenMediExam01count"
	}, {
		"header" : "1~2岁儿童体检",
		"dataIndex" : "childrenMediExam02count",
		"id" : "childrenMediExam02count"
	}, {
		"header" : "3~6岁儿童体检",
		"dataIndex" : "childrenMediExam36count",
		"id" : "childrenMediExam36count"
	}, {
		"header" : "儿童体检总和",
		"dataIndex" : "childrenMdeiExamTotals",
		"id" : "childrenMdeiExamTotals"
	}, {
		"header" : "第1次产前随访",
		"dataIndex" : "firstVistBeforeBornCount",
		"id" : "firstVistBeforeBornCount"
	}, {
		"header" : "第2~5次产前随访",
		"dataIndex" : "visitBeforeBornCount",
		"id" : "visitBeforeBornCount"
	}, {
		"header" : "产前随访总和",
		"dataIndex" : "visitBeforeBornTotals",
		"id" : "visitBeforeBornTotals"
	}, {
		"header" : "产后访视",
		"dataIndex" : "visitAfterBornCount",
		"id" : "visitAfterBornCount"
	}, {
		"header" : "产后42天体检",
		"dataIndex" : "visitAfterBorn42count",
		"id" : "visitAfterBorn42count"
	}, {
		"header" : "高血压随访",
		"dataIndex" : "hypertensionVisitCount",
		"id" : "hypertensionVisitCount"
	}, {
		"header" : "糖尿病随访",
		"dataIndex" : "diabetesVisitCount",
		"id" : "diabetesVisitCount"
	}, {
		"header" : "重性精神病随访",
		"dataIndex" : "furiousVisitCount",
		"id" : "furiousVisitCount"
	}],
	
	initComponent : function() {
		this.build();
		Ext.tf.StatisticByDistrict.superclass.initComponent.call(this);
	},
	build : function() {
		this.items = [ this.createPanel() ];
	},
	
	getParams : function(){
		var startDate = Ext.getCmp('district_startDate').getValue();
		var endDate = Ext.getCmp('district_endDate').getValue();
		var statisticMe = Ext.getCmp('statisticMe').getValue();
		var statisticAll = Ext.getCmp('statisticAll').getValue();
		var statisticLower = Ext.getCmp('statisticLower').getValue();
		var statisticLowerAll = Ext.getCmp('statisticLowerAll').getValue();
		var rules = statisticMe ? '0' : (statisticAll ? '1' : (statisticLower ? '2' : (statisticLowerAll ? '3' : '0')));
		var healthfile = Ext.getCmp('healthfile').getValue();
		var children = Ext.getCmp('children').getValue();
		var maternal = Ext.getCmp('maternal').getValue();
		var chronicDisease = Ext.getCmp('chronicDisease').getValue();
		var medicalexam = Ext.getCmp('medicalexam').getValue();
		var qryType = (healthfile ? '1' : '0') + (children ? '1' : '0') +
			(maternal ? '1' : '0') + (chronicDisease ? '1' : '0') + '0' + 
			(medicalexam ? '1' : '0');
		var districtNumber= '';
		if(this.currentNode != null){
			districtNumber = this.currentNode.id;
		}
		
		var isQryWipeOut = Ext.getCmp('isQryWipeOut').getValue();
		isQryWipeOut = isQryWipeOut ? '1' : '0';
		var condition = {
			startDate : startDate,
			endDate : endDate,
			rules : rules,
			qryType : qryType,
			districtNumber : districtNumber,
			isQryWipeOut : isQryWipeOut
		};
		return condition;
	},
	
	load : function(isReset){		
		var healthfile = Ext.getCmp('healthfile').getValue();
		var children = Ext.getCmp('children').getValue();
		var maternal = Ext.getCmp('maternal').getValue();
		var chronicDisease = Ext.getCmp('chronicDisease').getValue();
		var medicalexam = Ext.getCmp('medicalexam').getValue();
		if(healthfile || children || maternal || chronicDisease || medicalexam){
			Ext.getCmp(this.gridId).getStore().reload();
			this.doLayout(true);
			var colsVisibleFalse = [];
			var colsVisibleTrue = [];
//			colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'flag'));
			if(healthfile){
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'vHealthFileCount'));
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'cHealthFileCount'));
				//colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'oldManHeathFileCount'));
			}else{
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'vHealthFileCount'));
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'cHealthFileCount'));
				//colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'oldManHeathFileCount'));
			}
			
			//if(healthfile || children){
			if(children){
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'chileHealthFileCount'));
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'childHighRiskHealthFileCount'));
			}else{
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'chileHealthFileCount'));
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'childHighRiskHealthFileCount'));
			}
			
			if(children){
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'babyVisitCount'));
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'childrenMediExam01count'));
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'childrenMediExam02count'));
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'childrenMediExam36count'));
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'childrenMdeiExamTotals'));
			}else{
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'babyVisitCount'));
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'childrenMediExam01count'));
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'childrenMediExam02count'));
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'childrenMediExam36count'));
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'childrenMdeiExamTotals'));
			}
			
			//if(healthfile || maternal){
			if(maternal){
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'womanInitBirthHealthFileCount'));
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'womanAreadyBirthHealthFileCount'));
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'womanExceptionBirthHealthFileCount'));
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'womanHighRiskInitBirthHealthFileCount'));
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'womanHighRiskAreadyBirthHealthFileCount'));
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'womanHighRiskExceptionBirthHealthFileCount'));
			}else{
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'womanInitBirthHealthFileCount'));
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'womanAreadyBirthHealthFileCount'));
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'womanExceptionBirthHealthFileCount'));
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'womanHighRiskInitBirthHealthFileCount'));
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'womanHighRiskAreadyBirthHealthFileCount'));
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'womanHighRiskExceptionBirthHealthFileCount'));
			}
			
			if(maternal){
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'firstVistBeforeBornCount'));
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'visitBeforeBornCount'));
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'visitAfterBornCount'));
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'visitAfterBorn42count'));
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'visitBeforeBornTotals'));
			}else{
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'firstVistBeforeBornCount'));
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'visitBeforeBornCount'));
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'visitAfterBornCount'));
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'visitAfterBorn42count'));
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'visitBeforeBornTotals'));
			}
			
			//if(healthfile || chronicDisease){
			if(chronicDisease){
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'hypertensionHealthFileCount'));
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'diabetesHealthFileCount'));
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'holergasiaHealthFileCount'));
			}else{
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'hypertensionHealthFileCount'));
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'diabetesHealthFileCount'));
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'holergasiaHealthFileCount'));
			}
			
			if(chronicDisease){
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'hypertensionVisitCount'));
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'diabetesVisitCount'));
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'furiousVisitCount'));
			}else{
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'hypertensionVisitCount'));
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'diabetesVisitCount'));
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'furiousVisitCount'));
			}
			if(medicalexam){
				colsVisibleFalse.push(Utils.getColumnsIndexDetail(this.gridId,'medicalExamCount'));
			}else{
				colsVisibleTrue.push(Utils.getColumnsIndexDetail(this.gridId,'medicalExamCount'));
			}
			console.log(colsVisibleTrue);
			console.log(colsVisibleFalse);
			Utils.setVisibleDetail(this.gridId,colsVisibleTrue,colsVisibleFalse);
		}else{
			showInfoObj.Error('请选择条件!');
		}
	},
	
	createPanel : function() {
		
		this.westPanel = new Ext.tree.TreePanel({
			region : 'west',
			width : 200,
			title: '行政区划',
			layout : 'fit',
			animate : true,
			enableDD : false,
			loader : new Ext.ux.DWRTreeLoader({
				dwrCall : this.treeLoaderFn
			}),
			lines : true,
			autoScroll : true,
			border : false,
			root : new Ext.tree.AsyncTreeNode({
				text : 'root',
				draggable : false,
				id : 'org'
			}),
			rootVisible : false
		});
		this.westPanel.getRootNode().on({
			append : {
				stopEvent : true,
				fn : function(t, me, n, index) {
					// 自动展开根节点的第一个孩子
					if (index == 0) {
						if (!n.leaf)
							n.expand();
						this.currentNode = n;
					}
				}.createDelegate(this)
			}
		});
		this.westPanel.on({
			click : {
				stopEvent : true,
				fn : function(n, e) {
					e.stopEvent();
					this.currentNode = n;
					this.load(true);
				}.createDelegate(this)
			}
		});
		
		var reader = new Ext.data.JsonReader({
			totalProperty : 'totalSize',
			root : 'data',
			id : this.recordId
		},Ext.data.Record.create(this.readerConfig));
		
		var store = new Ext.data.Store({
			proxy : new Ext.ux.data.DWRProxy({
				dwrFunction : this.queryUrl,
				listeners : {
					'beforeload' : function(dataProxy, params){
						var o = this.getParams();
						params[dataProxy.loadArgsKey] = [o];
					}.createDelegate(this)
				}
			}),
			reader : reader
		});
		var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true}); 
		var centerPanel = new Ext.grid.GridPanel({
			layout : 'fit',
			region : 'center',
			id : this.gridId,
			autoScroll : true,
			store: store,
			cm : new Ext.grid.ColumnModel(this.gridCmConfig),
			loadMask : true,
			sm : sm
		});
		
		var exportButton = new Ext.ux.Exporter.Button({
			component : centerPanel,
			text : "数据导出",
			iconCls : 'dataExportbg'
		});
		var topPanel = new Ext.Panel({
			layout : 'fit',
			region : 'north',
			height : 150,
			tbar : [{
				xtype : 'checkbox',
				boxLabel : '报销统计数据',
				id : 'isQryWipeOut',
				name : 'isQryWipeOut'
			},{
				text : '查询',
				iconCls : 'searchbg',
				handler : function(){
					this.load(true);
				}.createDelegate(this)
			},{
				text : '打印',
				iconCls : 'printbg',
				handler : function(){
					
//					printDataExportObj.printGrid(grid,printDataExportObj.initDateRange('startDate','endDate'));
				}.createDelegate(this)				
			},exportButton,{
				text : '刷新',
				iconCls : 'c_refresh',
				handler : function(){
					this.load(true);
				}.createDelegate(this)
			}],
			items : [{
				xtype : 'panel',
				layout : 'absolute',
				frame : true,
				items : [createFieldset('dateRange','dateRange',5,0,'统计查询日期范围',
						 [createLabel('dateText','dateText',0,3,'起:'),
						  createDatefield('district_startDate','district_startDate',20,0,'Y-m-d',120,new Date()),
						  createLabel('dateTextSeparator','dateTextSeparator',0,43,'止:'),
						  createDatefield('district_endDate','district_endDate',20,40,'Y-m-d',120,new Date())],140),
				createFieldset('statisticRule','statisticRule',175,0,'查询规则',
						 [createCheckBox('只显示本级数据',true,'statisticMe','statisticMe',0,0,3,function(obj,ischecked){
							  if(ischecked){
								  Ext.getCmp('statisticLower').setValue(false);
								  Ext.getCmp('statisticLowerAll').setValue(false);
								  Ext.getCmp('statisticAll').setValue(false);
							  }
						  }),createCheckBox('显示所有数据',false,'statisticAll','statisticAll',110,0,3,function(obj,ischecked){
							  if(ischecked){
								  Ext.getCmp('statisticMe').setValue(false);
								  Ext.getCmp('statisticLower').setValue(false);
								  Ext.getCmp('statisticLowerAll').setValue(false);
							  }
						  }),createCheckBox('显示直接下级数据',false,'statisticLower','statisticLower',0,25,3,function(obj,ischecked){
							  if(ischecked){
								  Ext.getCmp('statisticMe').setValue(false);
								  Ext.getCmp('statisticLowerAll').setValue(false);
								  Ext.getCmp('statisticAll').setValue(false);
							  }
						  }),createCheckBox('显示所有下级数据',false,'statisticLowerAll','statisticLowerAll',0,50,3,function(obj,ischecked){
							  if(ischecked){
								  Ext.getCmp('statisticMe').setValue(false);
								  Ext.getCmp('statisticLower').setValue(false);
								  Ext.getCmp('statisticAll').setValue(false);
							  }
						  })],200),		  
				createFieldset('statisticResult','statisticResult',405,0,'统计数据显示',
						 [createCheckBox('居民健康档案',true,'healthfile','healthfile',0,0,1,null),
						  createCheckBox('儿童业务数据',false,'children','children',100,0,2,null),
						  createCheckBox('孕产妇业务数据',false,'maternal','maternal',0,25,3,null),
						  createCheckBox('健康体检数据',false,'medicalexam','medicalexam',110,25,3,null),
						  createCheckBox('慢性病业务数据',false,'chronicDisease','chronicDisease',0,50,4,null)],200)]
			}]
		});
		
		var panel = new Ext.Panel({
			layout : 'border',
			autoScroll : true,
			items : [topPanel,this.westPanel,centerPanel]
		});

		return panel;
	}
});