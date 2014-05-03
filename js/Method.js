(function() {
	MethodObj = {
		openSelectedDistrictWin : openSelectedDistrictWin,
		logOffHealthfile : logOffHealthfile,
		finishGestation : finishGestation,
		pregnancyRecordFunc : pregnancyRecordFunc
	}
	/**
	 * 特殊情况记录
	 */
	function pregnancyRecordFunc(selections,type,grid,service,serviceType){
//		console.log(selections);
		var recordVal = '';
		var dealOpinionVal = '';
		var recordDateVal = new Date();
		var doctorVal = Ext.tf.currentUser.taxempname;
		if(type == 0){
			//...
		}else if(type == 1){
			recordVal = selections[0].get('record');
			dealOpinionVal = selections[0].get('dealOpinion');
			recordDateVal = selections[0].get('recordDate');
			doctorVal = selections[0].get('doctor');
		}
		var cPanel = new Ext.FormPanel({
			height : 360,
			layout : 'absolute',
			width : 300,
			frame : true,
			items : [Component.createLabel('recordTxt','recordTxt',3,3,'特殊情况记录：'),
			         Component.createTextarea('record','record',3,20,100,270,recordVal),
			         Component.createLabel('dealOpinionTxt','dealOpinionTxt',3,130,'处理意见：'),
			         Component.createTextarea('dealOpinion','dealOpinion',3,150,100,270,dealOpinionVal),
			         Component.createLabel('recordDateTxt','recordDateTxt',3,263,'记录日期：'),
			         Component.createDatefield('recordDate','recordDate',60,260,'Y-m-d',210,recordDateVal),
			         Component.createLabel('doctorTxt','doctorTxt',3,293,'医生签名：'),
			         Component.createTextfield('doctor','doctor',60,290,210,false,doctorVal)]
		});
		var win = new Ext.Window({
			width : 300,
			height : 385,
			modal : true,
			draggable : false,
			items : [cPanel],
			title : '特殊情况记录',
			border : true,			
			bbar : [{
				text : '保存',
				iconCls : 'c_add',
				handler : function(){
					var formData = cPanel.getForm().getValues(false);
					if(type == 0){
						if(serviceType == 0)
							formData.healthFileMaternalId = selections[0].get('id');
						else if(serviceType == 1)
							formData.healthFileChildrenId = selections[0].get('id');
					}else if(type == 1){
						if(serviceType == 0)
							formData.healthFileMaternalId = selections[0].get('healthFileMaternalId');
						else if(serviceType == 1)
							formData.healthFileChildrenId = selections[0].get('healthFileChildrenId');
						formData.id = selections[0].get('id');
						formData.inputPersonId = selections[0].json.inputPersonId;
						formData.inputDate = calculateTimeObj.formatDate(selections[0].json.inputDate);
					}
//					console.log(grid.getStore());
					console.log(service);
					service(formData,function(){
						showInfoObj.Infor('保存成功！');
						if(grid != null)
							grid.getStore().reload();
					});
					win.close();
				}.createDelegate(this)
			},{
				text : '关闭',
				iconCls : 'c_del',
				handler : function(){
					win.close();
				}.createDelegate(this)
			}]

		});
		win.show(this);
	}
	/**
	 * 终止妊娠
	 */
	function finishGestation(selections,grid){
		var cPanel = new Ext.FormPanel({
			height : 170,
			layout : 'absolute',
			width : 300,
			frame : true,
			items : [Component.createLabel('finishGestationReasonTxt','finishGestationReasonTxt',3,3,'终止妊娠原因：'),
			         Component.createTextarea('finishReason','finishReason',3,20,100,270,''),
			         Component.createLabel('finishGestationDateTxt','finishGestationDateTxt',3,133,'终止妊娠时间：'),
			         Component.createDatefield('finishDate','finishDate',85,130,'Y-m-d',190,new Date())]
		});
		var win = new Ext.Window({
			width : 300,
			height : 225,
			modal : true,
			draggable : false,
			items : [cPanel],
			title : '终止妊娠',
			border : true,			
			bbar : [{
				text : '确认',
				iconCls : 'c_add',
				handler : function(){
					showInfoObj.askInfo('确定需要终止妊娠吗？',function(e){
						if(e == 'yes'){
							var formData = cPanel.getForm().getValues(false);
							formData.healthFileMaternalId = selections[0].get('id');
							healthfileMaternalService.finishGestation(formData,function(){
								showInfoObj.Infor('终止妊娠成功！');
								grid.getStore().reload();
							});
							win.close();
						}
					});
					
				}.createDelegate(this)
			},{
				text : '关闭',
				iconCls : 'c_del',
				handler : function(){
					win.close();
				}.createDelegate(this)
			}]

		});
		win.show(this);
	}
	
	function logOffHealthfile(selections){
		var fileNos = [];
		var cPanel = new Ext.FormPanel({
			region : 'west',
			title : '注销',
			layout : 'absolute',
			width : 250,
			frame : true,
			items : [Component.createLabel('logoffReasonTxt','logoffReasonTxt',3,3,'注销原因：'),
			         Component.createDwrCombo(60,0,'BasicInformation','loginOffReason',100,170,0,'LoginOffReason','LoginOffReason',4000),
			         Component.createLabel('logoffDateTxt','logoffDateTxt',3,33,'注销时间：'),
			         Component.createDatefield('loginOffDate','loginOffDate',60,30,'Y-m-d',170,new Date()),
			         Component.createLabel('optPersonTxt','optPersonTxt',3,63,'操作人：'),
			         Component.createTextfield('LoginOffOpt','LoginOffOpt',60,60,170,true,Ext.tf.currentUser.taxempname),
			         Component.createLabel('optPersonHospitalTxt','optPersonHospitalTxt',3,93,'所在单位：'),
			         Component.createTextfield('LoginOffOptOrg','LoginOffOptOrg',60,90,170,true,Ext.tf.currentUser.org.name),
			         Component.createLabel('logoffReamarkTxt','logoffReamarkTxt',3,123,'备注：'),
			         Component.createTextarea('loginOffRemark','loginOffRemark',40,120,100,190,'')]
		});
		var $transferDetailHtml = '<div style="margin:10px;font-size:12px;">';
		for(var i=0;i<selections.length;i++){
			fileNos.push(selections[i].data.fileNo);
			$transferDetailHtml = $transferDetailHtml + 
				'姓名：' + selections[i].data.name + 
				'<br/>性别：' + selections[i].data.personalInfo_sex + 
				'<br/>出生日期：' + calculateTimeObj.formatDate(selections[i].data.personalInfo_birthday) +
				'<br/>身份证号：' + selections[i].data.personalInfo_idnumber +
				'<br/>目前所在乡镇：' + selections[i].json.township + selections[i].json.village;
			if(i != selections.length - 1)
				$transferDetailHtml = $transferDetailHtml + '<div style="color:red;">*****************************************</div>';
		}
		$transferDetailHtml = $transferDetailHtml + '</div>'
		var win = new Ext.Window({
			width : 600,
			height : 500,
//			id : 'loginoffWin',
			modal : true,
			draggable : false,
			layout : "border",
			items : [ {
				region : 'center',
				title : '注销档案信息',
				autoScroll : true,
				html : $transferDetailHtml
			},cPanel],
			title : '档案注销',
			border : true,			
			bbar : [{
				text : '确认',
				iconCls : 'c_add',
				handler : function(){
					var formData = cPanel.getForm().getValues(false);
					if(formData.loginOffReason == '0'){
						showInfoObj.Infor('请选择档案注销原因。');
					}else{
						showInfoObj.askInfo('确定需要注销选所档案吗？',function(e){
							if(e == 'yes'){
								formData.fileNos = fileNos;
								loginOffService.loginOffService(formData,function(){
									showInfoObj.Infor('档案注销成功！');
//									console.log(Ext.getCmp('loginoffWin'));
//									Ext.getCmp('loginoffWin').close();
								});
								win.close();
							}
						});
					}
					
				}.createDelegate(this)
			},{
				text : '关闭',
				iconCls : 'c_del',
				handler : function(){
					win.close();
				}.createDelegate(this)
			}]

		});
		win.show(this);
	}
	/**
	 * 打开行政区划选择对话框
	 */
	function openSelectedDistrictWin(selections,data) {
		var currentNode = null;
		var toAddress = '';
		var fileNos = [];
		this.menu = new Ext.tree.TreePanel({
			layout : 'fit',
			region : 'center',
			title : '组织机构',
			height : 420,
			rootVisible : true,
			autoScroll : true,
			lines : false,
			animate : true,
			checkModel : 'single',
			onlyLeafCheckable : true,
			loader : new Ext.ux.DWRTreeLoader({
				dwrCall : UserMenuTreeService.getUserDistrictNodesDefine
			}),
			root : new Ext.tree.AsyncTreeNode({
				text : data[0].name,
				id : data[0].id,
				checked : false
			})
		});
		this.menu.getRootNode().expand();
		this.menu.on('checkchange', function(node, bool) {
			if (!node.leaf && bool) {
				node.expand();
			} else if (!node.leaf && !bool) {
				node.collapse();
			}
			if (!bool) {
				return;
			}
			currentNode = node;
			if(node.leaf){
				toAddress = node.parentNode.text + node.text;
				$('.remarkCls').html('确定将档案转移到：<span style="font-weight:bolder;">' + toAddress + '</span>下吗？');
			}else{
				toAddress = '';
				$('.remarkCls').html('');
			}
			if (this.checkModel == 'single') {
				var startNode = this.getRootNode();
				var nodes = [];
				var f = function() {
					nodes.push(this);
				};
				startNode.cascade(f);
				if (nodes && nodes.length > 0) {
					for ( var i = 0, len = nodes.length; i < len; i++) {
						if (nodes[i].id != node.id) {
							if (nodes[i].getUI().checkbox) {
								nodes[i].getUI().checkbox.checked = false;
								nodes[i].attributes.checked = false;
							}
						}
					}
				}
			}
		}, this.menu);
		var $transferDetailHtml = '<div style="margin:10px;font-size:12px;">';
		for(var i=0;i<selections.length;i++){
			var name = selections[i].data.name;
			var sex = selections[i].data.personalInfo_sex;
			var idNumber = selections[i].data.personalInfo_idnumber;
			var township = selections[i].json.township;
			var village = selections[i].json.village;
			var transFile = {
				fromFileNo : selections[i].data.fileNo,
				name : name,
				sex : sex,
				birthday : calculateTimeObj.formatDate(selections[i].data.personalInfo_birthday,'-'),
				idNumber : idNumber,
				fromTown : township,
				fromVillage : village,
				fromBuildDoctor : selections[i].json.doctor,
				fromBuildUnit : selections[i].json.buildUnit,
				fromBuildPerson : selections[i].json.buildPerson,
				residenceAddress : selections[i].json.residenceAddress,
				address : selections[i].json.address,
				fromDistrictNumber : selections[i].json.districtNumber
			};
			fileNos.push(transFile);
			
			$transferDetailHtml = $transferDetailHtml + 
				'姓名：' + name + 
				'<br/>性别：' + sex + 
				'<br/>出生日期：' + calculateTimeObj.formatDate(selections[i].data.personalInfo_birthday) +
				'<br/>身份证号：' + idNumber +
				'<br/>目前所在乡镇：' + township + village;
			if(i != selections.length - 1)
				$transferDetailHtml = $transferDetailHtml + '<div style="color:red;">*************************************</div>';
		}
		$transferDetailHtml = $transferDetailHtml + '</div>'
		var win = new Ext.Window({
			width : 700,
			height : 500,
			modal : true,
			draggable : false,
			layout : "border",
			items : [ {
				region : 'east',
				title : '转移的档案信息',
				width : 300,
				autoScroll : true,
				html : $transferDetailHtml
			}, this.menu,{
				region : 'west',
				title : '档案信息转移补充',
				width : 200,
				autoScroll : true,
				layout : 'absolute',
				frame : true,
				items : [Component.createLabel('transferReamarkTxt','transferReamarkTxt',3,0,'转档原因：'),
				         Component.createTextarea('transferReason','transferReason',3,20,100,180,''),
				         Component.createLabel('transferDateTxt','transferDateTxt',3,133,'转档时间：'),
				         Component.createDatefield('transferTime','transferTime',60,130,'Y-m-d',120,new Date()),{
					autoScroll : true,
					x : 3,
					y : 160,
					html : '<div style="color:red;">注：所有选择转移的档案的转档原因及转档时间相同。</div>' +
							'<div class="remarkCls" style="color:red;"></div>'
				}]
			} ],
			title : '档案转移',
			border : true,			
			bbar : [{
				text : '确认',
				iconCls : 'c_add',
				handler : function(){
					if (currentNode != null) {
						var leaf = currentNode.leaf;
						if (leaf) {
							showInfoObj.askInfo('确定将档案转移到' + toAddress,function(e){
								if(e == 'yes'){
									var transferTime = calculateTimeObj.formatDate(Ext.getCmp('transferTime').getValue(),'-');
									var formbean = {
										districtNumber : currentNode.id,
										transferReason : Ext.getCmp('transferReason').getValue(),
										transferTime : transferTime,
										fileNos : fileNos
									};
									loginOffService.transferService(formbean,function(){
										showInfoObj.Infor('档案转移申请提交成功，等待对方确认！');
									});
									win.close();
								}
							});
						}else{
							showInfoObj.Infor('请选择确定选择的行政区划为末级徝区划！！');
						}
					} else {
						showInfoObj.Infor('请选择档案需要转移到哪个行政区划下！');
					}
				}.createDelegate(this)
			},{
				text : '关闭',
				iconCls : 'c_del',
				handler : function(){
					win.close();
				}.createDelegate(this)
			}]

		});
		win.show(this);
	}
})();