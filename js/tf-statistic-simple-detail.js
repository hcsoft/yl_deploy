Ext.ns('Ext.tf')

function createCheckBox(boxLabel,checked,id,name,x,y,val,clicks){
	return new Ext.form.Checkbox({
		boxLabel : boxLabel,
		checked : checked,
		id : id,
		name : name,
		x : x,
		y : y,
		value : val,
		listeners : {
			'check' : {
				fn : clicks
			}
		} 
	});
}

function createLabel(id,name,x,y,text){
	return new Ext.form.Label({
		id : id,
		name : name,
		x : x,
		y : y,
		text : text
	});
}

function createDatefield(id,name,x,y,format,width,val){
	return new Ext.form.DateField({
		id : id,
		name : name,
		x : x,
		y : y,
		format : format,
		width : width,
		value : val
	});
}

function createFieldset(id,name,x,y,title,items,width){
	var panel = new Ext.Panel({
		layout : 'absolute',
		items : items,
		height : 70
	});
	return new Ext.form.FieldSet({
		autoHeight:true,
		defaults: {width: width},
		id : id,
		name : name,
		x : x,
		y : y,
		title : title,
		items : panel
	});
}   


function setVisibleDetail(gridName,colsVisibleTrue,colsVisibleFalse){
	console.log(gridName);
	console.log(colsVisibleTrue);
	console.log(colsVisibleFalse);
	for(var i = 0;i< colsVisibleTrue.length;i++){
		Ext.getCmp(gridName).getColumnModel().setHidden(colsVisibleTrue[i], true);
	}
	for(var i = 0;i< colsVisibleFalse.length;i++){
		Ext.getCmp(gridName).getColumnModel().setHidden(colsVisibleFalse[i], false);
	}
}

function getColumnsIndexDetail(gridName,colName){
//	console.log(gridName + ":::" + colName);
//	console.log(Ext.getCmp(gridName).getColumnModel().getIndexById(colName));
//	console.log("***************************************");
	return Ext.getCmp(gridName).getColumnModel().getIndexById(colName)
}

Ext.tf.SummaryStatisticDetailPanel = Ext.extend(Ext.Panel,{
	closable : true,
	pageSize : 10,
	layout : 'fit',
	recordId : 'id',
	statisticType : null,
	idsArray : {},
	currentNode : null,
	readerConfig : [ {
		name : 'orgName'
	}, {
		name : 'userName'
	}, {
		name : 'groupDate'
	}, {
		name : 'vhealthCount'
	}, {
		name : 'chealthCount'
	}, {
		name : 'babyHealthCount'
	}, {
		name : 'babyVisitCount'
	}, {
		name : 'children01count'
	}, {
		name : 'children02count'
	}, {
		name : 'children36count'
	}, {
		name : 'babyAllVisitCount'
	}, {
		name : 'firstVistBeforeBornCount'
	}, {
		name : 'visitBeforeBornCount'
	}, {
		name : 'prenatalVisitCount'
	}, {
		name : 'visitAfterBornCount'
	}, {
		name : 'visitAfterBorn42count'
	}, {
		name : 'hypertensionHealthCount'
	}, {
		name : 'hypertensionVisitCount'
	}, {
		name : 'diabetesHealthCount'
	}, {
		name : 'diabetesVisitCount'
	}, {
		name : 'furiousHealthCount'
	}, {
		name : 'furiousVisitCount'
	}, {
		name : 'vacciInfoCount'
	}, {
		name : 'childHighRiskHealthFileCount'
	}, {
		name : 'oldManHeathFileCount'
	}, {
		name : 'medicalExamCount'
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
	gridCmConfig : [ {
		"header" : "组织机构",
		"dataIndex" : "orgName",
		"id" : "orgName"
	}, {
		"header" : "操作员",
		"dataIndex" : "userName",
		"id" : "userName"
	}, {
		"header" : "日期",
		"dataIndex" : "groupDate",
		"id" : "groupDate"
	}, {
		"header" : "农业人口档案数",
		"dataIndex" : "vhealthCount",
		"id" : "vhealthCount"
	}, {
		"header" : "城镇人口档案数",
		"dataIndex" : "chealthCount",
		"id" : "chealthCount"
	}, {
		"header" : "儿童档案数",
		"dataIndex" : "babyHealthCount",
		"id" : "babyHealthCount"
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
		"dataIndex" : "hypertensionHealthCount",
		"id" : "hypertensionHealthCount"
	},{
		"header" : "二型糖尿病档案数",
		"dataIndex" : "diabetesHealthCount",
		"id" : "diabetesHealthCount"
	},{
		"header" : "重性精神病档案数",
		"dataIndex" : "furiousHealthCount",
		"id" : "furiousHealthCount"
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
		"dataIndex" : "children01count",
		"id" : "children01count"
	}, {
		"header" : "1~2岁儿童体检",
		"dataIndex" : "children02count",
		"id" : "children02count"
	}, {
		"header" : "3~6岁儿童体检",
		"dataIndex" : "children36count",
		"id" : "children36count"
	}, {
		"header" : "儿童体检总和",
		"dataIndex" : "babyAllVisitCount",
		"id" : "babyAllVisitCount"
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
		"dataIndex" : "prenatalVisitCount",
		"id" : "prenatalVisitCount"
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
	}, {
		"header" : "疫苗接种数",
		"dataIndex" : "vacciInfoCount",
		"id" : "vacciInfoCount"
	}],
	queryUrl : Ext.emptyFn,
	
	initComponent: function(){
		this.build();
		Ext.tf.SummaryStatisticDetailPanel.superclass.initComponent.call(this);
	},
	
	build : function(){
		this.items = [ this.createPanel() ];
	},
	
	getParams : function(){
		var startDate = Ext.getCmp(this.idsArray.startDate).getValue();
		var endDate = Ext.getCmp(this.idsArray.endDate).getValue();		
		var healthfile = Ext.getCmp(this.idsArray.healthfile).getValue();
		var children = Ext.getCmp(this.idsArray.children).getValue();
		var maternal = Ext.getCmp(this.idsArray.maternal).getValue();
		var chronicDisease = Ext.getCmp(this.idsArray.chronicDisease).getValue();
		var vacciInfor = Ext.getCmp(this.idsArray.vacciInfo).getValue();
		var medicalexam = Ext.getCmp(this.idsArray.medicalexam).getValue();
		var statisticResult = (healthfile ? '1' : '0') + (children ? '1' : '0') +
			(maternal ? '1' : '0') + (chronicDisease ? '1' : '0') + (medicalexam ? '1' : '0') +
			(vacciInfor ? '1' : '0');
		var isQryWipeOut = Ext.getCmp(this.idsArray.isQryWipeOut).getValue();
		isQryWipeOut = isQryWipeOut ? '1' : '0';
		var containLowerLevel = Ext.getCmp('containLowerLevel').getValue();
		containLowerLevel = containLowerLevel ? '1' : '0';
		var orgId = '';
		if(this.currentNode != null)
			orgId = this.currentNode.id;
		var condition = {
			startDate : startDate,
			endDate : endDate,
			statisticType : this.statisticType,
			statisticResult : statisticResult,
			isQryWipeOut : isQryWipeOut,
			orgId : orgId,
			containLowerLevel : containLowerLevel
		};
		return condition;
	},
	
	load : function(isReset){		
		var healthfile = Ext.getCmp(this.idsArray.healthfile).getValue();
		var children = Ext.getCmp(this.idsArray.children).getValue();
		var maternal = Ext.getCmp(this.idsArray.maternal).getValue();
		var chronicDisease = Ext.getCmp(this.idsArray.chronicDisease).getValue();
		var vacciInfor = Ext.getCmp(this.idsArray.vacciInfo).getValue();
		var medicalexam = Ext.getCmp(this.idsArray.medicalexam).getValue();
		if(healthfile || children || maternal || chronicDisease || medicalexam || vacciInfor){
			Ext.getCmp(this.idsArray.grid).getStore().reload();
			
			var colsVisibleFalse = [];
			var colsVisibleTrue = [];
			var tmpStatisticType = this.statisticType + '';
//			console.log(tmpStatisticType);
			var org = tmpStatisticType.substring(0,1);
			var inputPerson = this.statisticType.substring(1,2);
			var date = this.statisticType.substring(2,3);
			if(org == '1' || inputPerson == '1')
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'orgName'));
			else
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'orgName'));
			
			if(inputPerson == '1')
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'userName'));
			else
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'userName'));
			
			
			if(date == '1' || date == '2' || date == '3')
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'groupDate'));
			else
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'groupDate'));
			
			if(healthfile){
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'vhealthCount'));
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'chealthCount'));
				//colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'oldManHeathFileCount'));
			}else{
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'vhealthCount'));
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'chealthCount'));
				//colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'oldManHeathFileCount'));
			}
			//if(healthfile || children){
			if(children){
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'babyHealthCount'));
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'childHighRiskHealthFileCount'));
			}else{
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'babyHealthCount'));
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'childHighRiskHealthFileCount'));
			}
			if(children){
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'babyVisitCount'));
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'children01count'));
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'children02count'));
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'children36count'));
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'babyAllVisitCount'));
			}else{
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'babyVisitCount'));
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'children01count'));
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'children02count'));
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'children36count'));
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'babyAllVisitCount'));
			}
			
			//if(healthfile || maternal){
			if(maternal){
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'womanInitBirthHealthFileCount'));
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'womanAreadyBirthHealthFileCount'));
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'womanExceptionBirthHealthFileCount'));
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'womanHighRiskInitBirthHealthFileCount'));
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'womanHighRiskAreadyBirthHealthFileCount'));
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'womanHighRiskExceptionBirthHealthFileCount'));
			}else{
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'womanInitBirthHealthFileCount'));
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'womanAreadyBirthHealthFileCount'));
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'womanExceptionBirthHealthFileCount'));
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'womanHighRiskInitBirthHealthFileCount'));
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'womanHighRiskAreadyBirthHealthFileCount'));
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'womanHighRiskExceptionBirthHealthFileCount'));
			}
			
			if(maternal){
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'firstVistBeforeBornCount'));
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'visitBeforeBornCount'));
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'prenatalVisitCount'));
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'visitAfterBornCount'));
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'visitAfterBorn42count'));
			}else{
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'firstVistBeforeBornCount'));
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'visitBeforeBornCount'));
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'prenatalVisitCount'));
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'visitAfterBornCount'));
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'visitAfterBorn42count'));
			}
			//if(healthfile || chronicDisease){
			if(chronicDisease){
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'hypertensionHealthCount'));
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'diabetesHealthCount'));
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'furiousHealthCount'));
			}else{
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'hypertensionHealthCount'));
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'diabetesHealthCount'));
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'furiousHealthCount'));
			}
			if(chronicDisease){
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'hypertensionVisitCount'));
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'diabetesVisitCount'));
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'furiousVisitCount'));
			}else{
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'hypertensionVisitCount'));
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'diabetesVisitCount'));
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'furiousVisitCount'));
			}
			if(vacciInfor){
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'vacciInfoCount'));
			}else{
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'vacciInfoCount'));
			}
			if(medicalexam){
				colsVisibleFalse.push(getColumnsIndexDetail(this.idsArray.grid,'medicalExamCount'));
			}else{
				colsVisibleTrue.push(getColumnsIndexDetail(this.idsArray.grid,'medicalExamCount'));
			}
			setVisibleDetail(this.idsArray.grid,colsVisibleTrue,colsVisibleFalse);
		}else{
			showInfoObj.Error('请选择条件!');
		}
	},
	
	createPanel : function(){			
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
						params[dataProxy.loadArgsKey] = [o,params];
					}.createDelegate(this)
				}
			}),
			reader : reader
		});
		
		var grid = new Ext.grid.GridPanel({
			id : this.idsArray.grid,
			layout : 'fit',
			region : 'center',
			autoScroll : true,
			store: store,
			cm : new Ext.grid.ColumnModel(this.gridCmConfig),
			loadMask : true
		});
		
		var exportButton = new Ext.ux.Exporter.Button({
			component : grid,
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
				id : this.idsArray.isQryWipeOut,
				name : this.idsArray.isQryWipeOut
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
					printDataExportObj.printGrid(grid,printDataExportObj.initDateRange(this.idsArray.startDate,this.idsArray.endDate));
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
						  createDatefield(this.idsArray.startDate,this.idsArray.startDate,20,0,'Y-m-d',120,new Date()),
						  createLabel('dateTextSeparator','dateTextSeparator',0,43,'止:'),
						  createDatefield(this.idsArray.endDate,this.idsArray.endDate,20,40,'Y-m-d',120,new Date())],140),
				 createFieldset('statisticResult','statisticResult',180,0,'统计数据显示',
						 [createCheckBox('居民健康档案',true,this.idsArray.healthfile,this.idsArray.healthfile,0,0,1,null),
						  createCheckBox('儿童业务数据',false,this.idsArray.children,this.idsArray.children,110,0,2,null),
						  createCheckBox('孕产妇业务数据',false,this.idsArray.maternal,this.idsArray.maternal,0,25,3,null),
						  createCheckBox('疫苗接种',false,this.idsArray.vacciInfo,this.idsArray.vacciInfo,110,25,3,null),
						  createCheckBox('慢性病业务数据',false,this.idsArray.chronicDisease,this.idsArray.chronicDisease,0,50,4,null),
						  createCheckBox('健康体检数据',false,this.idsArray.medicalexam,this.idsArray.medicalexam,110,50,3,null)],210)]
			}]
		});
		this.menu = new Ext.tree.TreePanel({
			layout : 'fit',
			animate : true,
			enableDD : false,
			loader : new Ext.ux.DWRTreeLoader({
				dwrCall : UserMenuTreeService.getOrganizationNodes
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
		this.menu.getRootNode().on({
			append : {
				stopEvent : true,
				fn : function(t, me, n, index) {
					// 自动展开根节点的第一个孩子
					if (index == 0) {
						if (!n.leaf)
							n.expand();
						this.currentNode = n;
//						this.isFirst.setValue(0);
						// this.load();
					}
				}.createDelegate(this)
			}
		});
		this.menu.on({
			click : {
				stopEvent : true,
				fn : function(n, e) {
					e.stopEvent();
					this.currentNode = n;
//					console.log(n);
					this.load(true);
				}.createDelegate(this)
			}
		});
		var panel = new Ext.Panel({
			autoScroll : true,
			layout : 'border',
			items : [{
				region : 'west',
				width: 200,
				title: '组织机构',
				collapsible : true,
				autoScroll : true,
				items : [this.menu],
				tbar : [{
					xtype : 'checkbox',
					boxLabel : '全部（包含下级数据）',
					id : 'containLowerLevel',
					name : 'containLowerLevel'
				},{
				text : '图表',
				iconCls : 'c_refresh',
				handler : function(){
					//alert("zzz");
					var o = this.getParams();
					SummaryChartService.querySummaryChartStatistics(o,function(d){
						//alert(d);

						   var chart = new FusionCharts("/Charts/StackedColumn2D.swf", "indiChart333", "1000", "550", "0", "0");
						   chart.setXMLData(d.xmlData);		   
						   chart.render("chartdiv");
						   chartTools.init("indiChart");
						   //alert(d.selectData);
						   document.getElementById("selectdiv").innerHTML = d.selectData;
						   //alert(d.selectData);
						   //if(o.statisticType == "010"){
								
						   //}
							if(d.xmlData == ""){
								document.getElementById("buttondiv").innerHTML = "没有记录";
								
							}

					});
					
					//this.load(true);
				}.createDelegate(this)
			}]
			},topPanel,grid]
		});

		return panel;
	}
});