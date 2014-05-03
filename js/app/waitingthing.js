Ext.ns('app')
var currentNode = null;

function currentTabpanel(){
	var index = currentTabpanelIndex();
	if(index == 0){//未处理
		Ext.getCmp('wtGrid').getStore().reload();
	}else if(index == 1){//已处理
		Ext.getCmp('yclGrid').getStore().reload();
	}
}
function currentTabpanelIndex(){
	if(Ext.getCmp('wtTabpanel').getActiveTab() == null) return 0;//默认值为0
	var id = Ext.getCmp('wtTabpanel').getActiveTab().id;
	if(id == 'wclpanel'){//未处理
		return 0;
	}else if(id == 'yclpanel'){//已处理
		return 1;
	}
}

function returnWT(v,type){
	showInfoObj.askInfo('确定回退吗?',function(e){
		if(e == 'yes'){
			waitingThingService.returnWT(v,type,function(){
				showInfoObj.Infor('回退成功'); 
			});
		}
	});
}

app.waitingthingPanelFrame = Ext.extend(Ext.Panel, {
	layout : 'fit',
	pageSize : 20,
	recordId : 'id',
	queryUrl : Ext.emptyFn,
	readerConfig : [],
	gridCmConfig : [],
	readerConfig01 : [],
	gridCmConfig01 : [],
	
	initComponent : function() {
		this.build();
		app.waitingthingPanelFrame.superclass.initComponent.call(this);
	},

	build : function() {
		this.items = [ this.createPanel() ];
	},

	load : function(isReset) {
//		if (isReset) {
//			this.pagingBar.changePage(1);
//		}
		this.grid.getStore().reload();
		this.doLayout(true);
	},
	
	getParams : function() {
		var id = null;
		if(currentNode != null){
			id = currentNode.id;
		}
		var cond = {
			type : id,
			status : currentTabpanelIndex()
		}
		return cond;
	},

	createPanel : function() {
		var reader = new Ext.data.JsonReader({
			totalProperty : "totalSize",
			root : "data",
			id : this.recordId
		}, Ext.data.Record.create(this.readerConfig));

		var store = new Ext.data.Store({
			proxy : new Ext.ux.data.DWRProxy({
				dwrFunction : this.queryUrl,
				listeners : {
					'beforeload' : function(dataProxy, params) {
						var o = this.getParams();
						if (!params.limit)
							params.limit = this.pageSize;
						params[dataProxy.loadArgsKey] = [ o, params ];
					}.createDelegate(this)
				}
			}),
			reader : reader
		});

		this.pagingBar = new App.PagingToolbar({
			pageSize : this.pageSize,
			store : store,
			displayInfo : true,
			displayMsg : '{0} - {1} 共 {2}',
			emptyMsg : "没有记录"
		});
		var sm = new Ext.grid.CheckboxSelectionModel();
		this.gridCmConfig.unshift(sm);
		this.grid = new Ext.grid.GridPanel({
			id : 'wtGrid',
//			title : '未处理的待办事项',
			tbar : [{
				text : '批量处理',
				iconCls : 'c_add',
				handler : function(){
					var rs= Ext.getCmp('wtGrid').getSelectionModel().getSelections();
					if(rs.length > 0) {
						execDealWaitingThing(rs);
					}
				}
			}],
			bbar : this.pagingBar,
//			layout : 'fit',
			store : store,
			cm : new Ext.grid.ColumnModel(this.gridCmConfig),
			viewConfig : {
				forceFit : true
			},
			sm : sm
		});
		this.grid.getView().on('refresh', function() {
			// 缺省选择grid的第一条记录
			var model = this.grid.getSelectionModel();
			if (model.getCount() == 0) {
				model.selectFirstRow();
			}
		}.createDelegate(this));
		
		var reader01 = new Ext.data.JsonReader({
			totalProperty : "totalSize",
			root : "data",
			id : this.recordId
		}, Ext.data.Record.create(this.readerConfig01));

		var store01 = new Ext.data.Store({
			proxy : new Ext.ux.data.DWRProxy({
				dwrFunction : this.queryUrl,
				listeners : {
					'beforeload' : function(dataProxy, params) {
						var o = this.getParams();
						if (!params.limit)
							params.limit = this.pageSize;
						params[dataProxy.loadArgsKey] = [ o, params ];
					}.createDelegate(this)
				}
			}),
			reader : reader01
		});

		this.pagingBar01 = new App.PagingToolbar({
			pageSize : this.pageSize,
			store : store01,
			displayInfo : true,
			displayMsg : '{0} - {1} 共 {2}',
			emptyMsg : "没有记录"
		});
		this.grid01 = new Ext.grid.GridPanel({
			id : 'yclGrid',
			bbar : this.pagingBar01,
			store : store01,
			cm : new Ext.grid.ColumnModel(this.gridCmConfig01),
			viewConfig : {
				forceFit : true
			}
		});
		this.grid01.getView().on('refresh', function() {
			// 缺省选择grid的第一条记录
			var model = this.grid01.getSelectionModel();
			if (model.getCount() == 0) {
				model.selectFirstRow();
			}
		}.createDelegate(this));
//		this.load(true);
		
		this.catamenu = new Ext.tree.TreePanel({
	        region: 'west',
	        title: '待办事宜归类',
	        width: 200,
	        autoScroll: true,
//	        lines : false,
	        split: true,
	        collapsible : true,
	        loader : new Ext.ux.DWRTreeLoader({
				dwrCall : waitingThingService.getWaitCatagery
			}),
			root : new Ext.tree.AsyncTreeNode({
				text : 'root',
				draggable : false,
				id : 'waiting'
			}),
	        rootVisible: false,
	        listeners: {
	            click: function(n) {
	            	currentNode = n;
	            	currentTabpanel();
	            }
	        },
	        tbar : [{
	        	text : '全部',
	        	iconCls : 'c_add',
	        	handler : function(){
	        		currentNode = null;
	        		currentTabpanel();
	        	}
	        }]
		});
		this.catamenu.getRootNode().on({
			append : {
				stopEvent : true,
				fn : function(t, me, n, index) {
					// 自动展开根节点的第一个孩子
					if (index == 0) {
						if (!n.leaf)
							n.expand();
					}
				}.createDelegate(this)
			}
		});
		var panel = new Ext.Panel({
			layout : 'border',
			autoScroll : true,
			items : [this.catamenu, {
				region : 'center',
//				layout : 'fit',
				id : 'wtTabpanel',
				frame : false,
				border : false,
				xtype : 'tabpanel',
				activeTab: 0,
				listeners : {
					'tabchange' : function(){
						currentTabpanel();
					}.createDelegate(this)
				},
				items : [{
			        title : '未处理的待办事项',
			        layout : 'fit',
			        id : 'wclpanel',
			        items : [this.grid]
			    },{
			        title: '已处理的待办事项',
			        layout : 'fit',
			        id : 'yclpanel',
			        items : [this.grid01]
			    } ]
			} ]
		});	
		return panel;
	}
});

function execDealWaitingThing(rs){
	showInfoObj.askInfo('批量处理看不到待办事宜的具体内容，确定要草率处理吗?',function(e){
		if(e == 'yes'){
			var arrayJson = new Array();
			$.each(rs, function(i, v) {
				arrayJson.push({
					id : v.data.id,
					serviceType : v.data.serviceType,
					fileNo : v.data.fileNo,
					districtNum : v.data.districtNum,
					transDate : v.data.transDate
				});
			});
			if(arrayJson.length > 0){
				waitingThingService.dealWaitingThing(arrayJson,function(){
					Ext.Msg.alert('提示','待办事宜处理成功');
					Ext.getCmp('wtGrid').getStore().reload();
				});
			}
		}
	});
}

function singleDealWaitingThing(v,type,fileNo){
	var rs = Ext.getCmp('wtGrid').getSelectionModel().getSelected();
	if(rs.data.id == v){
//		execDealWaitingThing(rs,1);
		var title = '';
		var items = [];
		var height = 0;
		var width = 0;
		var frame = true;
		var sexStore = new Ext.data.SimpleStore({
			fields : ["text","value"],
			data : [["男",0],["女",1]]
		});
		if(rs.data.serviceType == -1){//-1为新建档案的服务编号
			waitingThingService.getWaitingThingInfo(v,function(data){
				if(data != null){
					items = [Component.createLabel('newHealthFileNameTxt','newHealthFileNameTxt',5,3,'姓<span style="margin-left:24px;">名</span>:'),
				             Component.createTextfield('personName','personName',100,0,170,false,data[0][2].personName),
				             Component.createLabel('newHealthFileSexTxt','newHealthFileSexTxt',5,33,'性<span style="margin-left:24px;">别</span>:'),
				             Component.createComboBox('sex','sex',100,30,sexStore,'text','value',data[0][2].sex,'local',100,'请选择...'),
				             Component.createLabel('newHealthFileBirthdayTxt','newHealthFileBirthdayTxt',5,63,'出生日期:'),
				             Component.createDatefield('birthDay','birthDay',100,60,'Y-m-d',170,data[0][2].birthDay),
				             Component.createLabel('newHealthFileIDNumberTxt','newHealthFileIDNumberTxt',5,93,'身份证号:'),
				             Component.createTextfield('idnumber','idnumber',100,90,170,false,data[0][2].idnumber),
				             Component.createLabel('newHealthFileAddressTxt','newHealthFileAddressTxt',5,123,'家庭住址:'),
				             Component.createTextfield('address','address',100,120,170,false,data[0][2].address),
				             Component.createLabel('newHealthFileOccupationTxt','newHealthFileOccupationTxt',5,153,'职<span style="margin-left:24px;">业</span>:'),
				             Component.createTextfield('occupation','occupation',100,150,170,false,data[0][2].occupation),
				             Component.createLabel('newHealthFileDistrictNumberTxt','newHealthFileDistrictNumberTxt',5,183,'行政区划编码:'),
				             Component.createTextfield('districtNumber','districtNumber',100,180,170,true,data[0][1].districtNumber),
				             Component.createLabel('newHealthFileTownshipTxt','newHealthFileTownshipTxt',5,213,'乡镇(街道)名称:'),
				             Component.createTextfield('township','township',100,210,170,true,data[0][1].township),
				             Component.createLabel('newHealthFileVillageTxt','newHealthFileVillageTxt',5,243,'村(居)委会名称:'),
				             Component.createTextfield('village','village',100,240,170,true,data[0][1].village),
				             Component.createLabel('newHealthFileHospitalNameTxt','newHealthFileHospitalNameTxt',5,273,'上传机构名称:'),
				             Component.createTextfield('hospitalName','hospitalName',100,270,170,true,data[0][2].hospitalName),
				             Component.createLabel('newHealthFileMakePersonTxt','newHealthFileMakePersonTxt',5,303,'上传操作人员:'),
				             Component.createTextfield('makePerson','makePerson',100,300,170,true,data[0][2].makePerson),
				             Component.createButton('btnSave','btnSave',40,335,'c_add',{
	    			        	 'click' : function(){
	    			        		 var formbean = formpanel.getForm().getValues(false);
	    			        		 formbean.id = v;
	    			        		 formbean.districtNumber = data[0][1].districtNumber;
	    			        		 formbean.fileNo = data[0][0].fileNo;
	    			        		 waitingThingService.saveNewHealthFileWt(formbean,function(){
	    			        			 showInfoObj.Infor('保存成功'); 
	    			        			 Ext.getCmp('wtGrid').getStore().reload();
	    			        		 });
	    			        		 this.newWin.close();
	    			        	 }.createDelegate(this)
	    			         },'确认'),
	    			         Component.createButton('btnQuit','btnQuit',110,335,'c_edit',{
	    			        	 'click' : function(){
	    			        		 showInfoObj.askInfo('确定回退吗?',function(e){
	    			        				if(e == 'yes'){
	    			        					waitingThingService.returnWT(v,1,function(){
	    			        						showInfoObj.Infor('回退成功'); 
	    			        					});
	    			        					 this.newWin.close();
	    			        				}
	    			        		});
	    			        	 }.createDelegate(this)
	    			         },'退回'),
	    			         Component.createButton('btnClose','btnClose',180,335,'c_del',{
	    			        	 'click' : function(){
	    			        		 this.newWin.close();
	    			        	 }.createDelegate(this)
	    			         },'关闭')];
					title = '新建档案信息确认';
					height = 405;
					width = 300;
					
					var formpanel = new Ext.form.FormPanel({
						items : items,
						frame : frame,
						layout : 'absolute'
					});
					this.newWin = new Ext.Window({
						modal : true,
						title : title,
						layout : 'fit',
						items : [formpanel],
						width : width,
						height : height,
						resizable : false,
						closable : false
					});
					this.newWin.show();
				}
			});
		}else if(rs.data.serviceType == -2){//-2为比对档案的服务编号
			waitingThingService.getWaitingThingInfo(v,fileNo,function(data){
				if(data != null){
					items = [{
						xtype : 'panel',
						layout : 'border',
						width : '100%',
						height : 405,
						items : [{
							xtype : 'panel',
							region : 'west',
							width : 290,
							frame : true,
							title : '基本信息',
							layout : 'absolute',
							collapsible : true,
							items : [Component.createLabel('newHealthFileNoTxt','newHealthFileNoTxt',5,3,'档案编号:'),
						             Component.createTextfield('fileNo','fileNo',100,0,170,false,data[0][2].fileNo),
							         Component.createLabel('newHealthFileNameTxt','newHealthFileNameTxt',5,33,'姓<span style="margin-left:24px;">名</span>:'),
							         Component.createTextfield('personName','personName',100,30,170,false,data[0][2].personName),
							         Component.createLabel('newHealthFileSexTxt','newHealthFileSexTxt',5,63,'性<span style="margin-left:24px;">别</span>:'),
						             Component.createComboBox('sex','sex',100,60,sexStore,'text','value',data[0][2].sex,'local',100,'请选择...'),
						             Component.createLabel('newHealthFileBirthdayTxt','newHealthFileBirthdayTxt',5,93,'出生日期:'),
						             Component.createDatefield('birthDay','birthDay',100,90,'Y-m-d',170,data[0][2].birthDay),
						             Component.createLabel('newHealthFileIDNumberTxt','newHealthFileIDNumberTxt',5,123,'身份证号:'),
						             Component.createTextfield('idnumber','idnumber',100,120,170,false,data[0][2].idnumber),
						             Component.createLabel('newHealthFileAddressTxt','newHealthFileAddressTxt',5,153,'家庭住址:'),
						             Component.createTextfield('address','address',100,150,170,false,data[0][2].address),
						             Component.createLabel('newHealthFileDistrictNumberTxt','newHealthFileDistrictNumberTxt',5,183,'行政区划编码:'),
						             Component.createTextfield('districtNumber','districtNumber',100,180,170,true,data[0][1].districtNumber),
						             Component.createLabel('newHealthFileTownshipTxt','newHealthFileTownshipTxt',5,213,'乡镇(街道)名称:'),
						             Component.createTextfield('township','township',100,210,170,true,data[0][1].township),
						             Component.createLabel('newHealthFileVillageTxt','newHealthFileVillageTxt',5,243,'村(居)委会名称:'),
						             Component.createTextfield('village','village',100,240,170,true,data[0][1].village),
						             Component.createLabel('newHealthFileHospitalNameTxt','newHealthFileHospitalNameTxt',5,273,'上传机构名称:'),
						             Component.createTextfield('hospitalName','hospitalName',100,270,170,true,data[0][2].hospitalName),
						             Component.createLabel('newHealthFileMakePersonTxt','newHealthFileMakePersonTxt',5,303,'上传操作人员:'),
						             Component.createTextfield('makePerson','makePerson',100,300,170,true,data[0][2].makePerson),
						             Component.createButton('btnSave','btnSave',40,335,'c_add',{
			    			        	 'click' : function(){
			    			        		 var selectRows = Ext.getCmp('watchWTGrid').getSelections();
			    			        		 if(selectRows.length == 1){
			    			        			 var formbean = formpanel.getForm().getValues(false);
				    			        		 formbean.id = v;
				    			        		 var records = selectRows[0];
			    			        			 formbean.fileNo = records.get('fileNo');
			    			        			 waitingThingService.saveMatchHealthFileWT(formbean,function(){
				    			        			 showInfoObj.Infor('保存成功'); 
				    			        			 Ext.getCmp('wtGrid').getStore().reload();
				    			        		 });
			    			        			 this.newWin.close();
			    			        		 }else{
			    			        			 showInfoObj.Infor('请选择与上传档案相符合的居民健康档案');
			    			        		 }
			    			        	 }.createDelegate(this)
			    			         },'确认'),
			    			         Component.createButton('btnQuit','btnQuit',110,335,'c_edit',{
			    			        	 'click' : function(){
			    			        		 showInfoObj.askInfo('确定回退吗?',function(e){
			    			        				if(e == 'yes'){
			    			        					waitingThingService.returnWT(v,0,function(){
			    			        						showInfoObj.Infor('回退成功'); 
			    			        					});
			    			        					 this.newWin.close();
			    			        				}
			    			        		});
			    			        	 }.createDelegate(this)
			    			         },'退回'),
			    			         Component.createButton('btnClose','btnClose',180,335,'c_del',{
			    			        	 'click' : function(){
			    			        		 this.newWin.close();
			    			        	 }.createDelegate(this)
			    			         },'关闭')]
						},{
							region : 'center',
							items : [new Ext.tf.WaitingThingGridPanel({
								defSearchVal : data[0][2].personName,
								queryUrl : UserMenuTreeService.findHealthFiles,
								gridId : 'watchWTGrid',
								readerConfig : [ {
									name : 'fileNo'
								}, {
									name : 'name'
								}, {
									name : 'personalInfo_sex',
									mapping : 'personalInfo.sex'
								}, {
									name : 'personalInfo_birthday',
									mapping : 'personalInfo.birthday'
								}, {
									name : 'personalInfo_idnumber',
									mapping : 'personalInfo.idnumber'
								}, {
									name : 'address'
								}, {
									name : 'township'
								}, {
									name : 'village'
								}],
								gridCmConfig : [ {
									"header" : "档案编号",
									"dataIndex" : "fileNo",
									"width" : 180
								}, {
									"header" : "姓名",
									"dataIndex" : "name"
								}, {
									"header" : "性别",
									"dataIndex" : "personalInfo_sex"
								}, {
									"header" : "生日",
									"dataIndex" : "personalInfo_birthday",
									"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
								}, {
									"header" : "身份证号",
									"dataIndex" : "personalInfo_idnumber"
								}, {
									"header" : "乡镇",
									"dataIndex" : "township"
								}, {
									"header" : "村委会",
									"dataIndex" : "village"
								} ]
							})]
						}]
					}];
					title = '档案信息比对';
					height = 430;
					width = 800;
					frame = false;
					var formpanel = new Ext.form.FormPanel({
						items : items,
						frame : frame,
						layout : 'absolute'
					});
					this.newWin = new Ext.Window({
						modal : true,
						title : title,
						layout : 'fit',
						items : [formpanel],
						width : width,
						height : height,
						resizable : false,
						closable : false
					});
					this.newWin.show();
				}
			});
		}else if(rs.data.serviceType == 1 || rs.data.serviceType == 2 || rs.data.serviceType == 3){
			waitingThingService.getWaitingThingInfo(v,type,fileNo,function(data){
				if(data != null){
					items = [Component.createFieldset('fieldsetBasicInfo','fieldsetBasicInfo',0,0,'基本信息',
							[Component.createLabel('newHealthFileNoTxt','newHealthFileNoTxt',3,3,'档案编号:'),
				             Component.createTextfield('fileNo','fileNo',100,0,170,true,fileNo),
							 Component.createLabel('newHealthFileNameTxt','newHealthFileNameTxt',3,33,'姓<span style="margin-left:24px;">名</span>:'),
				             Component.createTextfield('personName','personName',100,30,170,true,data[0][1].name),
				             Component.createLabel('newHealthFileSexTxt','newHealthFileSexTxt',3,63,'性<span style="margin-left:24px;">别</span>:'),
				             Component.createTextfield('sex','sex',100,60,170,true,data[0][2].sex),
				             Component.createLabel('newHealthFileBirthdayTxt','newHealthFileBirthdayTxt',3,93,'出生日期:'),
				             Component.createDatefield('birthDay','birthDay',100,90,'Y-m-d',170,data[0][2].birthday,true),
				             Component.createLabel('newHealthFileIDNumberTxt','newHealthFileIDNumberTxt',3,123,'身份证号:'),
				             Component.createTextfield('idnumber','idnumber',100,120,170,true,data[0][2].idnumber),
				             Component.createLabel('newHealthFileAddressTxt','newHealthFileAddressTxt',3,153,'家庭住址:'),
				             Component.createTextfield('address','address',100,150,170,true,data[0][1].address),
				             Component.createLabel('newHealthFileTownshipTxt','newHealthFileTownshipTxt',3,183,'乡镇(街道)名称:'),
				             Component.createTextfield('township','township',100,180,170,true,data[0][1].township),
				             Component.createLabel('newHealthFileVillageTxt','newHealthFileVillageTxt',3,213,'村(居)委会名称:'),
				             Component.createTextfield('village','village',100,210,170,true,data[0][1].village)],
							270,240),
							Component.createFieldset('fieldsetInpatientInfo','fieldsetInpatientInfo',300,0,'日志',
									[Component.createLabel('patientDiagnosisTxt','patientDiagnosisTxt',3,3,'诊<span style="margin-left:24px;">断</span>:'),
									 Component.createTextarea('diagnosis','diagnosis',100,0,50,250,data[0][3].diagnosis,true),
									 Component.createLabel('patientSignsTxt','patientSignsTxt',3,65,'体<span style="margin-left:24px;">征</span>:'),
									 Component.createTextarea('signs','signs',100,60,50,250,data[0][3].signs,true),
									 Component.createLabel('patientDoctorTxt','patientDoctorTxt',3,123,'医<span style="margin-left:24px;">生</span>:'),
						             Component.createTextfield('doctor','doctor',100,120,250,true,data[0][3].doctor),
						             Component.createLabel('patientSectionTxt','patientSectionTxt',3,153,'科<span style="margin-left:24px;">室</span>:'),
						             Component.createTextfield('section','section',100,150,250,true,data[0][3].section),
						             Component.createLabel('patientHospitalNameTxt','patientHospitalNameTxt',3,183,'上传机构名称:'),
						             Component.createTextfield('hospitalName','hospitalName',100,180,250,true,data[0][3].hospitalName),
						             Component.createLabel('patientMakePersonTxt','patientMakePersonTxt',3,213,'上传操作人员:'),
						             Component.createTextfield('makePerson','makePerson',100,210,250,true,data[0][3].makePerson)],
									350,240),
									Component.createButton('btnSave','btnSave',230,285,'c_add',{
			    			        	 'click' : function(){
			    			        		 var mb = {};
			    			        		 mb.personId = data[0][2].id;
			    			        		 mb.wtId = data[0][0].id;
			    			        		 mb.patientId = data[0][3].id;
			    			        		 mb.type = data[0][0].status;
			    			        		 mb.serviceType = data[0][0].serviceType;
			    			        		 mb.makeDate = data[0][3].makeDate.getFullYear() + '' + calculateTimeObj.addZero(data[0][3].makeDate.getMonth() + 1) + '' + calculateTimeObj.addZero(data[0][3].makeDate.getDate());
			    			        		 waitingThingService.saveMBInfoWt(mb,function(){
			    			        			 showInfoObj.Infor('保存成功');
			    			        			 Ext.getCmp('wtGrid').getStore().reload();
			    			        		 });
			    			        		 this.newWin.close();
			    			        	 }.createDelegate(this)
			    			         },'确认'),
			    			         Component.createButton('btnQuit','btnQuit',300,285,'c_edit',{
			    			        	 'click' : function(){
			    			        		 showInfoObj.askInfo('确定回退吗?',function(e){
			    			        				if(e == 'yes'){
			    			        					waitingThingService.returnWT(v,0,function(){
			    			        						showInfoObj.Infor('回退成功'); 
			    			        					});
			    			        					 this.newWin.close();
			    			        				}
			    			        		});			    			        		
			    			        	 }.createDelegate(this)
			    			         },'退回'),
			    			         Component.createButton('btnClose','btnClose',370,285,'c_del',{
			    			        	 'click' : function(){
			    			        		 this.newWin.close();
			    			        	 }.createDelegate(this)
			    			         },'关闭')];
					title = '慢病及重性精神病信息确认';
					height = 355;
					width = 700;
					var formpanel = new Ext.form.FormPanel({
						items : items,
						frame : frame,
						layout : 'absolute'
					});
					this.newWin = new Ext.Window({
						modal : true,
						title : title,
						layout : 'fit',
						items : [formpanel],
						width : width,
						height : height,
						resizable : false,
						closable : false
					});
					this.newWin.show();
				}
			});
		}
	}
}

app.waitingthingPanel = new app.waitingthingPanelFrame({
	queryUrl : waitingThingService.getWaitingThingInfos,
	readerConfig : [ {
		name : 'id',
		mapping : 'waitingthing.id'
	}, {
		name : 'fileNo',
		mapping : 'waitingthing.fileNo'
	}, {
		name : 'districtNum',
		mapping : 'waitingthing.districtNum'
	}, {
		name : 'diagnoseName',
		mapping : 'diagnose.diagnoseName'
	}, {
		name : 'serviceType',
		mapping : 'diagnose.serviceType'
	}, {
		name : 'hospitalName',
		mapping : 'waitingthing.hospitalName'
	}, {
		name : 'transDate',
		mapping : 'waitingthing.transDate'
	}, {
		name : 'type',
		mapping : 'waitingthing.type'
	} ],
	gridCmConfig : [ {
		"header" : "档案编号",
		"dataIndex" : "fileNo",
		width : 200,
		"renderer" : function(v){
			v = v.trim();
			if(v.length == 32 || v.length == 36){
				return '暂无档案编号';
			}
			return v;
		},
		"align" : "center"
	}, {
		"header" : "待办事宜归类",
		"dataIndex" : "diagnoseName",
		width : 100,
		"align" : "center"
	}, {
		"header" : "医院机构名称",
		"dataIndex" : "hospitalName",
		width : 300,
		"align" : "center"
	}, {
		"header" : "上传日期",
		"dataIndex" : "transDate",
		"renderer" : Ext.util.Format.dateRenderer('Y-m-d'),
		width : 100,
		"align" : "center"
	},{
		"header" : "操作",
		"dataIndex" : "id",
		"align" : "center",
		"renderer" : function(v,cellmeta, record, rowIndex, columnIndex, store){
			var type = 0;
			if(record.get('serviceType') == -1)
				type = 1;
			return '<a href="#" style="color:blue;" onclick="singleDealWaitingThing(\''+ v + '\',\'' + record.get('type') + '\',\'' + record.get('fileNo') + '\')">处理</a>' +
				'<a href="#" style="color:blue;margin-left:10px;" onclick="returnWT(\''+ v + '\',\'' + type + '\')">退回</a>';
		}
	} ],
	readerConfig01 : [ {
		name : 'id',
		mapping : 'waitingthing.id'
	}, {
		name : 'fileNo',
		mapping : 'waitingthing.fileNo'
	}, {
		name : 'districtNum',
		mapping : 'waitingthing.districtNum'
	}, {
		name : 'diagnoseName',
		mapping : 'diagnose.diagnoseName'
	}, {
		name : 'serviceType',
		mapping : 'diagnose.serviceType'
	}, {
		name : 'hospitalName',
		mapping : 'waitingthing.hospitalName'
	}, {
		name : 'transDate',
		mapping : 'waitingthing.transDate'
	}, {
		name : 'dealDate',
		mapping : 'waitingthing.dealDate'
	}, {
		name : 'dealPerson',
		mapping : 'waitingthing.dealPerson'
	}, {
		name : 'status',
		mapping : 'waitingthing.status'
	}, {
		name : 'username',
		mapping : 'orguser.username'
	} ],
	gridCmConfig01 : [ {
		"header" : "状态",
		"dataIndex" : "status",
		"align" : "center",
		"renderer" : function(v,cellmeta, record, rowIndex, columnIndex, store){
			if(v == 1){
				return '<span>已处理</span>';
			}else if(v == 2){
				return '<span>已回退</span>';
			}
			return '';
		}
	}, {
		"header" : "档案编号",
		"dataIndex" : "fileNo",
		width : 200,
		"align" : "center"
	}, {
		"header" : "待办事宜归类",
		"dataIndex" : "diagnoseName",
		width : 100,
		"align" : "center"
	}, {
		"header" : "医院机构名称",
		"dataIndex" : "hospitalName",
		width : 300,
		"align" : "center"
	}, {
		"header" : "上传日期",
		"dataIndex" : "transDate",
		"renderer" : Ext.util.Format.dateRenderer('Y-m-d'),
		width : 100,
		"align" : "center"
	}, {
		"header" : "处理日期",
		"dataIndex" : "dealDate",
		"renderer" : Ext.util.Format.dateRenderer('Y-m-d'),
		width : 100,
		"align" : "center"
	}, {
		"header" : "操作人员",
		"dataIndex" : "username",
		width : 100,
		"align" : "center"
	}]
});
_tab = ModuleMgr.register(app.waitingthingPanel);