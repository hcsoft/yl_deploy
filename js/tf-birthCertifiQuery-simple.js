Ext.ns('Ext.tf')

Ext.tf.BirthCertifiQueryPanel = Ext.extend(Ext.Panel,{
	closable : true,
	pageSize : 15,
	layout : 'fit',
	recordId : 'id',
	
	readerConfig : [],
	gridCmConfig : [],
	queryUrl : Ext.emptyFn,
	printUrl : Ext.emptyFn,
	
	initComponent: function(){
		this.build();
		Ext.tf.BirthCertifiQueryPanel.superclass.initComponent.call(this);
	},
	
	build : function(){
		this.items = [ this.createPanel() ];
	},
	
	getParams : function(){
		var certifiId = Ext.getCmp('TCertifiVal').getValue();
		var childName = Ext.getCmp('TChildNameVal').getValue();
		var motherName = Ext.getCmp('TMotherNameVal').getValue();
		var fatherName = Ext.getCmp('TFatherNameVal').getValue();
		var orgId = Ext.getCmp('orgName').getValue();
		var childBirthday = Ext.getCmp('TChildBirthVal').getValue();
		childBirthday = (childBirthday == '') ? null : childBirthday;
		var startDate = Ext.getCmp('TInputDateStartVal').getValue();
		startDate = (startDate == '') ? null : startDate;
		var endDate = Ext.getCmp('TInputDateEndVal').getValue();
		endDate = (endDate == '') ? null : endDate;
		var usedBirth = Ext.getCmp('CUsedBirthCertifi').getValue();
		var destroyBirth = Ext.getCmp('CDestroyedBirthCertifi').getValue();
		var archivedBirth = Ext.getCmp('CArchivedBirthCertifi').getValue();
		var qryType = (usedBirth ? '1' : '0') + (destroyBirth ? '1' : '0') + (archivedBirth ? '1' : '0');
		var condition = {
			certifiId : certifiId,
			childName : childName,
			motherName : motherName,
			fatherName : fatherName,
			orgId : orgId,
			childBirthday : childBirthday,
			startDate : startDate,
			endDate : endDate,
			qryType : qryType
		}
		console.log(condition);
		return condition;
	},
	
	load : function(isReset){
		if(isReset){
			this.pagingBar.changePage(1);
		}
//		this.grid.getStore().reload();
//	    this.doLayout(true);
	},
	
	createPanel : function(){		
		var topPanel = new Ext.Panel({
			region : 'north',
			tbar : [{
				text : '查询',
				iconCls : 'searchbg',
				handler : function(){
					this.load(true);
				}.createDelegate(this)
			},new Ext.Button({
				text : '月报表打印',
				iconCls : 'printbg',
				menu: new Ext.menu.Menu({
			        items: [{
			        	text : '打印当前页',
			        	handler : function(){
							var columns = this.grid.getColumnModel().config;
							var data = [];
							this.grid.store.data.each(function(item){
								var convertedData = [];
								for (var key in item.data) {
							        var value = item.data[key];
							        Ext.each(columns, function(column) {
							          if (column.dataIndex == key) {
							            convertedData[key] = column.renderer ? column.renderer(value) : value;
							          }
							        }, this);
							    }
								data.push(convertedData);
							});
							
							printDataExportObj.printBirth(data,0,printDataExportObj.initDateRange('TInputDateStartVal','TInputDateEndVal'));
						}.createDelegate(this)
			        },{
			        	text : '打印全部',
			        	handler : function(){
			        		var o = this.getParams();
			        		summaryService.printAllBirth(o,function(data){
			        			if(data != null){
			        				printDataExportObj.printBirth(data,1,printDataExportObj.initDateRange('TInputDateStartVal','TInputDateEndVal'));
			        			}
			        		});
			        	}.createDelegate(this)
			        }]
			   	})
			}),{
				text : '数据导出',
				iconCls : 'dataExportbg',
				handler : function(){
	        		var o = this.getParams();
	        		this.printUrl(o,function(data){
	        			if(data!=null){
							window.location.href = data;
						}
	        		});
	        	}.createDelegate(this)
			}],
			layout : 'fit',
			height : 150,
			items : [{
				xtype : 'panel',
				layout : 'absolute',
				frame : true,
				items : [Component.createFieldset('birthCertifiSearchCond','birthCertifiSearchCond',0,0,'查询条件',
							[Component.createLabel('LCertifiTitle','LCertifiTitle',0,2,'出生医学证明编号'),
					         Component.createTextfield('TCertifiVal','TCertifiVal',100,0,100),
					         Component.createLabel('LChildNameTitle','LChildNameTitle',200,2,'儿童姓名'),
					         Component.createTextfield('TChildNameVal','TChildNameVal',250,0,100),
					         Component.createLabel('LMotherNameTitle','LMotherNameTitle',350,2,'母亲姓名'),
					         Component.createTextfield('TMotherNameVal','TMotherNameVal',400,0,100),
					         Component.createLabel('LFatherNameTitle','LFatherNameTitle',500,2,'父亲姓名'),
					         Component.createTextfield('TFatherNameVal','TFatherNameVal',550,0,100),
					         Component.createLabel('LOrgNameTitle','LOrgNameTitle',0,42,'组织机构'),
					         {
								xtype : 'panel',
								id : 'orgPanel',
								name : 'orgPanel',
								x : 50,
								y : 39,
								width : 180,
								items : [{
									xtype : 'DWRCombo',
									id : 'orgName',
									optionName : 'Taxorgcode',
									hiddenName : 'name',
									hasEmptyHeader : true,
									minListWidth : 200,
									width : 150
								}]	
					         },
					         Component.createLabel('LChildBirthTitle','LChildBirthTitle',200,42,'出生日期'),
					         Component.createDatefield('TChildBirthVal','TChildBirthVal',250,40,'Y-m-d',100,null),
					         Component.createLabel('LInputDateRangeStartTitle','LInputDateRangeStartTitle',350,42,'日期范围'),
					         Component.createDatefield('TInputDateStartVal','TInputDateStartVal',400,40,'Y-m-d',100,null),
					         Component.createLabel('LInputDateRangeEndTitle','LInputDateRangeEndTitle',520,42,'至'),
					         Component.createDatefield('TInputDateEndVal','TInputDateEndVal',550,40,'Y-m-d',100,null)],650,70),
				         Component.createFieldset('birthCertifiSearchObj','birthCertifiSearchObj',680,0,'查询对象',
				        	[Component.createCheckBox('CUsedBirthCertifi','CUsedBirthCertifi',0,0,'已使用',false,0,null),
				        	 Component.createCheckBox('CDestroyedBirthCertifi','CDestroyedBirthCertifi',0,25,'已作废',false,0,null),
				        	 Component.createCheckBox('CArchivedBirthCertifi','CArchivedBirthCertifi',0,50,'已归档',true,0,null)],60,70)]
			}]
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
						if(!params.limit)
							params.limit = this.pageSize;
						params[dataProxy.loadArgsKey] = [o,params];
					}.createDelegate(this)
				}
			}),
			reader : reader
		});
		
		this.pagingBar = new Ext.PagingToolbar({
			pageSize : this.pageSize,
			displayMsg : '{0}-{1} of {2}',
			displayInfo : true,
			emptyMsg : '没有记录',
			store : store
		});
		
		this.grid = new Ext.grid.GridPanel({
			id : 'birthCertifiGrid',
			layout : 'fit',
			region : 'center',
			bbar : this.pagingBar,
			autoScroll : true,
			store: store,
			cm : new Ext.grid.ColumnModel(this.gridCmConfig),
			loadMask : true
		});
		var panel = new Ext.Panel({
			autoScroll : true,
			layout : 'border',
			items : [topPanel,this.grid]
		});
		return panel;
	}
});
