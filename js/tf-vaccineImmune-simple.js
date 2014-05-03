Ext.ns('Ext.tf')

function genCenterContent(data,fileNo){
	var $table_vacciProgram = '<table class="vacciProgram_table_cls" cellpadding="0" cellspacing="0">';
	var head_info_vacciProgram = data[0];
	var $thead_vacciProgram = '<thead><tr>';
	for(var i = 1;i < head_info_vacciProgram.length;i++){
		$thead_vacciProgram = $thead_vacciProgram + '<td>' + head_info_vacciProgram[i] + '</td>';
	}
	$thead_vacciProgram = $thead_vacciProgram + '</tr></thead>';
	var $tbody_vacciProgram = '<tbody>';
	for(var i=1;i<data.length;i++){
		$tbody_vacciProgram = $tbody_vacciProgram + '<tr>';
		for(var j=1;j<data[i].length;j++){
			var val = data[i][j];
			var cls = '';
			var attr = '';
			var rowNumber = data[i][0];
			var isSpecail = 0;
			if(val != '' && j != 1){
				var splitVal = val.split(':');
				var colNum = splitVal[1];
				var type = 0;
				if(splitVal.length > 2){
					cls = 'background-color: #b2dece;text-align:left;cursor:pointer;';
					if(colNum.indexOf('~') > 0){
						isSpecail = 1; 
						colNum = colNum.replace('~','');
					}
					var date = splitVal[2];
					date = date.length > 10 ? date.substring(0,10) : date;
					val = '<span>' + splitVal[0] + '<br />' + date + '</span><span class="ColAndRowVal" style="display:none;">' + 
					colNum + ',' + rowNumber + '</span>';
					type = 1;
				}else{
					if(colNum.indexOf('~') > 0){
						isSpecail = 1; 
						colNum = colNum.replace('~','');
					}
					if(colNum.indexOf('$') > 0){
						
						colNum = colNum.replace('$','');
					}
					cls = 'background-color: #f4fba3;cursor:pointer;';
					val = '<span>' + splitVal[0] + '</span><span  class="ColAndRowVal" style="display:none;">' + 
						colNum + ',' + rowNumber + '</span>';
				}
				var id = 'id-' + colNum + '-' + rowNumber;
				attr = 'onclick="TDdbClick(\'' + colNum + '\',\'' + rowNumber + '\',\'' + type + '\',\'' + 
						isSpecail + '\',\'' + fileNo + '\',\'' + id + '\')" id="' + id + '"';
			}
			$tbody_vacciProgram = $tbody_vacciProgram + '<td style="' + cls + '" ' + attr + '>' + val + '</td>';
		}
		$tbody_vacciProgram = $tbody_vacciProgram + '</tr>';
	}
	$tbody_vacciProgram = $tbody_vacciProgram + '</tbody>';
	$tfoot_vacciProgram = '<tfoot><tr><td style="height:30px;line-height: 30px;" colspan="' + (data.length - 1) + '">温馨提示：1、单击即可弹出录入预防接种信息对话框&nbsp;&nbsp;&nbsp;&nbsp;2、黄色背景表示此预防信息还没有录入至系统中&nbsp;&nbsp;&nbsp;&nbsp;3、蓝绿色背景表示此预防接种信息已经录入至系统&nbsp;&nbsp;&nbsp;&nbsp;4、已接种疫苗（列表，可删除）选项卡删除已经录入的预防接种信息</td></tr></tfoot>';
	$table_vacciProgram = $table_vacciProgram + $thead_vacciProgram + $tbody_vacciProgram + $tfoot_vacciProgram + '</table>';
	return $table_vacciProgram;
}

function genBasicInfo(records){
	var fileNo = records.get('fileNo');
	var birthday = records.get('personalInfo_birthday');
	var folk = records.get('personalInfo').folk;
	folk =  folk != '' ? (folk == '少数民族' ? records.get('personalInfo').folkOther : folk ) : '';
	var $table_basicInfo = '<table onselectstart= "return false;" cellpadding="0" cellspacing="0" class="table_BasicInfo">' +
		'<thead>' + 
			'<tr><td>名称</td><td>值</td></tr>'+
		'</thead>' +
		'<tbody>' + 
			'<tr><td>档案编号</td><td>' + fileNo + '</td></tr>' + 
			'<tr><td>姓名</td><td>' + records.get('name') + '</td></tr>' + 
			'<tr><td>性别</td><td>' + records.get('personalInfo_sex') + '</td></tr>' + 
			'<tr><td>民族</td><td>' + folk + '</td></tr>' + 
			'<tr><td>出生日期</td><td>' + birthday.getFullYear() + '年' + (birthday.getMonth() + 1) + '月' + birthday.getDate() + '日' + '</td></tr>' + 
			'<tr><td>身份证号</td><td>' + records.get('idnumber') + '</td></tr>' + 
			'<tr><td>现住址</td><td>' + records.get('address') + '</td></tr>' + 
			'<tr><td>户籍住址</td><td>' + records.get('residenceAddress') + '</td></tr>' + 
		'</tbody>'
	'</table>';
	return $table_basicInfo;
}

function openWinForm(type,data,col,row,isSpecail,id){//type 0 新建 1修改 2规划外的
	var selections = Ext.getCmp('VacciInfoGrid').getSelections();
    if(selections.length > 0){
    	var records = selections[0];
    	var vaccineImmune = records.get('vaccineImmune');
//    	console.log(vaccineImmune);
    	if(vaccineImmune != null){
    		var fileNo = records.get('fileNo');
        	var birthday = records.get('personalInfo_birthday');
        	
        	//应种日期
        	var defPlantedDate = null;
        	//应种时间
        	var defLimitDate = null;
        	var vaccinationDate = new Date();
        	var defVacci,defVacciPosition,defVacciWay,defVacciDose,defVacciDoctor,defVacciAddress,defVacciRemark;
        	defVacci = defVacciPosition = defVacciWay = defVacciDose = defVacciRemark = '';
        	defVacciDoctor = Ext.tf.currentUser.taxempname;
        	defVacciAddress = Ext.tf.currentUser.org.name;
        	var companyId,immuneBatchNum;
        	companyId = 0;
        	immuneBatchNum = '';
        	var vacciInfo = null;
        	if(type == 0 && data != null){
        		if(data.minMonthAge != null){
            		defPlantedDate = new Date(birthday.getFullYear(),birthday.getMonth(),birthday.getDate());
            		defPlantedDate.setMonth(defPlantedDate.getMonth() + data.minMonthAge);
            		defPlantedDate = defPlantedDate.format('Y-m-d');
            	}
        		if(data.monthLimit != null){
            		defLimitDate = new Date(birthday.getFullYear(),birthday.getMonth(),birthday.getDate());
            		defLimitDate.setMonth(defLimitDate.getMonth() + data.monthLimit);
            		defLimitDate = defLimitDate.format('Y-m-d');
            	}
        		defVacci = data.vaccineRemark;
        		defVacciPosition = data.vaccinationPosition; 
        		defVacciWay = data.vaccinationWay;
        		defVacciDose = data.vaccinationDose;
        		defVacciRemark = data.remarks;
        	}else if(type == 1){
        		vacciInfo = data[0];
        		var vacciRules = null;
        		if(data.length > 1){
        			vacciRules = data[1];
        		}
        		defVacci = vacciInfo.vaccinationName;
        		defVacciPosition = vacciInfo.vaccinationPosition; 
        		defVacciWay = vacciInfo.vaccinationWay;
        		defVacciDose = vacciInfo.vacciDose;
        		defVacciRemark = vacciInfo.remarks;
        		defVacciDoctor = vacciInfo.vaccinationDoctor;
        		defVacciAddress = vacciInfo.vacciAddress;
        		companyId = vacciInfo.companyId;
        		immuneBatchNum = vacciInfo.immuneBatchNum;
        		vaccinationDate = calculateTimeObj.formatDate(vacciInfo.vaccinationDate,'-');
        		if(vacciRules != null){
        			if(vacciRules.minMonthAge != null){
                		defPlantedDate = new Date(birthday.getFullYear(),birthday.getMonth(),birthday.getDate());
                		defPlantedDate.setMonth(defPlantedDate.getMonth() + vacciRules.minMonthAge);
                		defPlantedDate = defPlantedDate.format('Y-m-d');
                	}
            		if(vacciRules.monthLimit != null){
                		defLimitDate = new Date(birthday.getFullYear(),birthday.getMonth(),birthday.getDate());
                		defLimitDate.setMonth(defLimitDate.getMonth() + vacciRules.monthLimit);
                		defLimitDate = defLimitDate.format('Y-m-d');
                	}
        		}
        	}

        	if(type == 0 || type == 1){
        		console.log(vaccinationDate);
        		var leftPanel = new Ext.FormPanel({
//        			title : '疫苗接种信息',
        			region : 'west',
        			layout : 'absolute',
        			width : 210,
        			frame : true,
        			items : [Component.createLabel('fileNoText','fileNoText',5,8,'档案编号:'),
        			         Component.createTextfield('fileNo','fileNo',65,5,205,true,fileNo),
        			         Component.createLabel('birthdayText','birthdayText',5,38,'出生日期:'),
        			         Component.createTextfield('birthday','birthday',65,35,205,true,birthday.format('Y-m-d')),
        			         Component.createLabel('plantedDateText','plantedDateText',5,68,'应种日期:'),
        			         Component.createTextfield('plantedDate','plantedDate',65,65,205,true,defPlantedDate),
        			         Component.createLabel('vacciDateText','vacciDateText',5,98,'接种日期:'),
        			         Component.createDatefield('vaccinationDate','vaccinationDate',65,95,'Y-m-d',205,vaccinationDate,false,{
        			        	 'select' : function(){
        			        		 var date = this.getValue().format('Y-m-d');
        			        		 if(defLimitDate != null){
        			        			 if(date > defLimitDate){
        			        				 showInfoObj.Error('不在预防免疫接种规划范围内，请重新选择接种日期或者请到规划外预防免疫录入窗口进行录入');
        			        				 this.setValue(new Date());
        			        			 }
        			        		 }
        			        		 if(date < birthday.format('Y-m-d')){
        			        			 showInfoObj.Infor('接种日期必须大于等于出生日期');
        			        			 this.setValue(new Date());
        			        		 }
        			        	 }
        			         }),
        			         Component.createLabel('limitDateText','limitDateText',5,128,'限制日期:'),
        			         Component.createTextfield('limitDate','limitDate',65,125,205,true,defLimitDate),
        			         Component.createLabel('vacciText','vacciText',5,158,'接种疫苗:'),
        			         Component.createTextfield('vaccinationName','vaccinationName',65,155,205,false,defVacci),
        			         Component.createLabel('vacciAddressText','vacciAddressText',5,188,'接种地点:'),
        			         Component.createTextfield('vacciAddress','vacciAddress',65,185,205,false,defVacciAddress),
//        			         Component.createLabel('vacciRemarkText','vacciRemarkText',5,128,'接种标记:'),
//        			         Component.createTextfield('vacciRemark','vacciRemark',65,125,205),
        			         Component.createLabel('vacciBatchNumText','vacciBatchNumText',5,218,'疫苗批号:'),
        			         Component.createTextfield('immuneBatchNum','immuneBatchNum',65,215,205,false,immuneBatchNum),
        			         Component.createLabel('companyText','companyText',5,248,'生产企业:'),
//        			         Component.createTextfield('company','company',65,155,205),
        			         Component.createDwrCombo(65,245,'Producers','companyId',200,205,companyId),
        			         Component.createLabel('vacciDoctorText','vacciDoctorText',5,278,'接种医师:'),
        			         Component.createTextfield('vaccinationDoctor','vaccinationDoctor',65,275,205,false,defVacciDoctor),
        			         Component.createLabel('vacciPositionText','vacciPositionText',5,308,'接种部位:'),
        			         Component.createTextfield('vaccinationPosition','vaccinationPosition',65,305,205,false,defVacciPosition),
        			         Component.createLabel('vacciWayText','vacciWayText',5,338,'接种途径:'),
        			         Component.createTextfield('vaccinationWay','vaccinationWay',65,335,205,false,defVacciWay),
        			         Component.createLabel('vacciDoseText','vacciDoseText',5,368,'接种剂量:'),
        			         Component.createTextfield('vacciDose','vacciDose',65,365,205,false,defVacciDose),
        			         Component.createLabel('vacciRemarkText','vacciRemarkText',5,398,'备注:'),
        			         Component.createTextarea('remarks','remarks',65,398,60,205,defVacciRemark),
        			         Component.createButton('btnSave','btnSave',60,470,'c_add',{
        			        	 'click' : function(){
        			        		 var formbean = leftPanel.getForm().getValues(false);
        			        		 if(type == 0){
        			        			 formbean.fileNo = fileNo;
            			        		 formbean.colNum = col;
            			        		 formbean.rowNumber = row;
            			        		 formbean.number = data.number;
        			        		 }else if(type == 1){
        			        			 Ext.apply(vacciInfo,formbean);
        			        			 formbean = vacciInfo;
        			        		 }
        			        		 formbean.monthLimit = data.monthLimit;
        			        		 formbean.monthStart = data.monthStart;
        			        		 formbean.plantedDate = defPlantedDate;
        			        		 formbean.limitDate = defLimitDate;
        			        		 formbean.birthday = birthday.format('Y-m-d');
        			        		 formbean.isSpecail = isSpecail; 
//        			        		 console.log(formbean);
        			        		 Ext.getCmp('tabpanel-01-vacci').el.mask('正在重新加载数据...');
        			        		 VaccinationService.saveVaccineImmuneInfo(formbean,function(data){
        			        			 if(data != null){
        			        				 showInfoObj.Infor('保存成功');
            			        			 cls = 'background-color: #b2dece;text-align:left;cursor:pointer;';
            			        			 var date = data.vaccinationDate.format('Y-m-d');
            			        			 var val = '<span>第' + data.number + '剂<br />' + date + '</span><span class="ColAndRowVal" style="display:none;">' + 
            			        			 	data.colNum + ',' + data.rowNumber + '</span>';
            			        			 $('#' + id).html(val);
            			        			 $('#' + id).attr('style',cls);
            			        			 $('#' + id).removeAttr('onclick');
            			        			 $('#' + id).bind("click",function(){
            			        				 TDdbClick(data.colNum,data.rowNumber,'1','0',fileNo,id)
            			        			 }); 
        			        			 }else{
											showInfoObj.Infor('此次预防接种已经保存，无需重复录入。');
										 }
        			        			 Ext.getCmp('tabpanel-01-vacci').el.unmask();
        			        		 });
        			        		 
        			        		 this.win.close();
        			        	 }.createDelegate(this)
        			         },'保存'),
        			         Component.createButton('btnClose','btnClose',140,470,'c_del',{
        			        	 'click' : function(){
        			        		 this.win.close();
        			        	 }.createDelegate(this)
        			         },'关闭窗口')]
        		});
        		
        		this.win = new Ext.Window({
        			title : '疫苗接种',
        			modal : true,
        			width : 300,
        			height : 540,
        			layout : 'fit',
        			items : [leftPanel]
        		});
        		this.win.show();
        	}else if(type == 2){
        		var leftPanel = new Ext.FormPanel({
        			title : '规划外疫苗接种信息',
        			region : 'west',
        			layout : 'absolute',
        			width : 290,
        			frame : true,
        			items : [{
        				xtype : 'textfield',
        				hidden : true,
        				id : 'id',
        				name : 'id'
        			},Component.createLabel('fileNoText','fileNoText',5,8,'档案编号:'),
        			         Component.createTextfield('fileNo','fileNo',65,5,205,true,fileNo),
        			         Component.createLabel('birthdayText','birthdayText',5,38,'出生日期:'),
        			         Component.createTextfield('birthday','birthday',65,35,205,true,birthday.format('Y-m-d')),
        			         Component.createLabel('vacciDateText','vacciDateText',5,68,'接种日期:'),
        			         Component.createDatefield('vaccinationDate','vaccinationDate',65,65,'Y-m-d',205,new Date()),
        			         Component.createLabel('vacciText','vacciText',5,98,'接种疫苗:'),
        			         Component.createTextfield('vaccinationName','vaccinationName',65,95,205),
        			         Component.createLabel('vacciAddressText','vacciAddressText',5,128,'接种地点:'),
        			         Component.createTextfield('vacciAddress','vacciAddress',65,125,205,false,defVacciAddress),
        			         Component.createLabel('vacciBatchNumText','vacciBatchNumText',5,158,'疫苗批号:'),
        			         Component.createTextfield('immuneBatchNum','immuneBatchNum',65,155,205),
        			         Component.createLabel('companyText','companyText',5,188,'生产企业:'),
        			         Component.createDwrCombo(65,185,'Producers','companyId',200,205,companyId,'companyName','companyName'),
        			         Component.createLabel('vacciDoctorText','vacciDoctorText',5,218,'接种医师:'),
        			         Component.createTextfield('vaccinationDoctor','vaccinationDoctor',65,215,205,false,defVacciDoctor),
        			         Component.createLabel('vacciPositionText','vacciPositionText',5,248,'接种部位:'),
        			         Component.createTextfield('vaccinationPosition','vaccinationPosition',65,245,205),
        			         Component.createLabel('vacciWayText','vacciWayText',5,278,'接种途径:'),
        			         Component.createTextfield('vaccinationWay','vaccinationWay',65,275,205),
        			         Component.createLabel('vacciDoseText','vacciDoseText',5,308,'接种剂量:'),
        			         Component.createTextfield('vacciDose','vacciDose',65,305,205),
        			         Component.createLabel('vacciRemarkText','vacciRemarkText',5,338,'备注:'),
        			         Component.createTextarea('remarks','remarks',65,338,60,205),
        			         Component.createButton('btnSave','btnSave',60,410,'c_add',{
        			        	 'click' : function(){
        			        		 showInfoObj.askInfo("规划外疫苗接种需要居民自费，确定继续接种吗？",function(btn,text){
        			        			if(btn == 'yes'){
        			        				var formbean = leftPanel.getForm().getValues(false);	
        			        				formbean.fileNo = fileNo;
        			        				formbean.colNum = '0';
        			        				formbean.colNum = '0';
        			        				formbean.rowNumber = 0;
                                            formbean.number =0;
        			        				formbean.birthday = birthday.getFullYear() + '' + calculateTimeObj.addZero(birthday.getMonth() + 1) + calculateTimeObj.addZero(birthday.getDate());
        			        				VaccinationService.saveVaccineImmuneInfoUnPlaned(formbean,function(){
        	    			        			 showInfoObj.Infor('保存成功');
        	    			        		});
        			        			}
        			        		 });
        			        	 }.createDelegate(this)
        			         },'保存'),
        			         Component.createButton('btnClose','btnClose',140,410,'c_del',{
        			        	 'click' : function(){
        			        		 this.win.close();
        			        	 }.createDelegate(this)
        			         },'关闭窗口')]
        		});
        		
        		var vacciGridPanel = new Ext.tf.VaccineImmuneGridPanel({
        			queryUrl : VaccinationService.queryVacciRulesInfo,
        			singleSelect : true,
        			gridHeight : 430,
        			gridId : 'vacciGrid', 
        			editFn : function(){
        				var vselections = Ext.getCmp(this.gridId).getSelections();
        			    if(vselections.length > 0){
        			    	var vrecords = vselections[0];
        			    	Ext.getCmp('id').setValue('');
        			    	Ext.getCmp('vaccinationName').setValue(vrecords.get('vaccineRemark'));
        			    	Ext.getCmp('vaccinationPosition').setValue(vrecords.get('vaccinationPosition'));
        			    	Ext.getCmp('vaccinationWay').setValue(vrecords.get('vaccinationWay'));
        			    	Ext.getCmp('vacciDose').setValue(vrecords.get('vacciDose'));
        			    	Ext.getCmp('vaccinationDate').setValue(new Date());
//        			    	Ext.getCmp('companyName').setValue(0);
        			    	Ext.getCmp('remarks').setValue('');
        			    }
        			},
        			readerConfig : [ {
        				name : 'vaccineRemark',
        				mapping : 'vaccineRemark'
        			}, {
        				name : 'vaccinationPosition',
        				mapping : 'vaccinationPosition'
        			}, {
        				name : 'vaccinationWay',
        				mapping : 'vaccinationWay'
        			}, {
        				name : 'vacciDose',
        				mapping : 'vaccinationDose'
        			}, {
        				name : 'remarks',
        				mapping : 'remarks'
        			}, {
        				name : 'vaccineName',
        				mapping : 'vaccineName'
        			} ],
        			gridCmConfig : [{
        				"header" : "疫苗名称",
        				"dataIndex" : "vaccineRemark",
        				"width" : 180
        			}, {
        				"header" : "接种部位",
        				"dataIndex" : "vaccinationPosition",
        				"width" : 180
        			}, {
        				"header" : "接种方式",
        				"dataIndex" : "vaccinationWay"
        			} ]
        		});
        		
        		var vacciedGridPanel = new Ext.tf.VaccineImmuneGridPanel({
        			queryUrl : VaccinationService.queryVacciInfo,
        			singleSelect : true,
        			gridHeight : 430,
        			gridId : 'vacciedGrid', 
        			fileNo : fileNo,
        			editFn : function(){
        				var vselections = Ext.getCmp(this.gridId).getSelections();
        			    if(vselections.length > 0){
        			    	var vrecords = vselections[0];
//        			    	console.log(vrecords);
        			    	Ext.getCmp('id').setValue(vrecords.get('id'));
        			    	Ext.getCmp('vaccinationName').setValue(vrecords.get('vaccinationName'));
        			    	Ext.getCmp('vaccinationPosition').setValue(vrecords.get('vaccinationPosition'));
        			    	Ext.getCmp('vaccinationWay').setValue(vrecords.get('vaccinationWay'));
        			    	Ext.getCmp('vacciDose').setValue(vrecords.get('vacciDose'));
        			    	Ext.getCmp('vaccinationDate').setValue(vrecords.get('vaccinationDate'));
        			    	Ext.getCmp('vacciAddress').setValue(vrecords.get('vacciAddress'));
        			    	Ext.getCmp('vaccinationDoctor').setValue(vrecords.get('vaccinationDoctor'));
        			    	Ext.getCmp('remarks').setValue(vrecords.get('remarks'));
//        			    	Ext.getCmp('companyName').setValue(vrecords.get('companyId'));
        			    	Ext.getCmp('immuneBatchNum').setValue(vrecords.get('immuneBatchNum'));
        			    }
        			},
        			readerConfig : [ {
        				name : 'vaccinationName',
        				mapping : 'vaccinationName'
        			}, {
        				name : 'immuneBatchNum',
        				mapping : 'immuneBatchNum'
        			}, {
        				name : 'vaccinationDate',
        				mapping : 'vaccinationDate'
        			}, {
        				name : 'vaccinationDose',
        				mapping : 'vaccinationDose'
        			}, {
        				name : 'vaccinationDoctor',
        				mapping : 'vaccinationDoctor'
        			}, {
        				name : 'vaccinationPosition',
        				mapping : 'vaccinationPosition'
        			}, {
        				name : 'vaccinationWay',
        				mapping : 'vaccinationWay'
        			}, {
        				name : 'remarks',
        				mapping : 'remarks'
        			}, {
        				name : 'vacciAddress',
        				mapping : 'vacciAddress'
        			}, {
        				name : 'vacciDose',
        				mapping : 'vacciDose'
        			}, {
        				name : 'companyId',
        				mapping : 'companyId'
        			}, {
        				name : 'id',
        				mapping : 'id'
        			}, {
        				name : 'colNum',
        				mapping : 'colNum'
        			}, {
        				name : 'inputPersonId',
        				mapping : 'inputPersonId'
        			} ],
        			gridCmConfig : [{
        				"header" : "疫苗名称",
        				"dataIndex" : "vaccinationName",
        				"width" : 180
        			}, {
        				"header" : "疫苗批号",
        				"dataIndex" : "immuneBatchNum"
        			}, {
        				"header" : "接种日期",
        				"dataIndex" : "vaccinationDate",
        				"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
        			}, {
        				"header" : "接种医师",
        				"dataIndex" : "vaccinationDoctor"
        			} ]
        		});
        		
        		this.tabpanel = new Ext.TabPanel({
        			region : 'center',
        			activeTab: 0,
        			autoScroll : true,
        		    items:[{
    		        	xtype : 'panel',
    		        	title : '疫苗',
    		        	layout : 'fit',
    	            	autoScroll : true,
    	            	items : [vacciGridPanel]
    		        },{
    		        	xtype : 'panel',
    		        	title : '已接种疫苗',
    		        	layout : 'fit',
    	            	autoScroll : true,
    	            	id : 'unplanedGrid',
    	            	items : [vacciedGridPanel]
    		        }],
    		        listeners : {
    					'tabchange' : function(){
    						var id = this.tabpanel.getActiveTab().id;
    						if(id == 'unplanedGrid'){
    							Ext.getCmp('vacciedGrid').getStore().reload();
    						}
    					}.createDelegate(this)
    				}
        		});
        		this.win = new Ext.Window({
        			title : '疫苗接种',
        			modal : true,
        			width : 800,
        			height : 500,
        			layout : 'border',
        			items : [leftPanel,this.tabpanel]
        		});
        		this.win.show();
        	}
    	}else{
    		showInfoObj.Infor('请先建证再进入接种疫苗免疫程序');
    	}
    }
}

function TDdbClick(col,row,type,isSpecail,fileNo,id){
	if(type == 0){
		VaccinationService.getVaccineImmuneRules(col,row,isSpecail,function(data){
			if(data != null){
				openWinForm(0,data,col,row,isSpecail,id);
			}
		});
	}else if(type == 1){
		VaccinationService.getVaccineImmuneInfo(col,row,fileNo,isSpecail,function(data){
			if(data != null){
				openWinForm(1,data,null,null,null,null);
			}
		});
	}
}
Ext.tf.VaccineImmnuePanel = Ext.extend(Ext.Panel, {
	layout : 'fit',
	recordId : 'id',
	pageSize : 20,
	closable : true,
	currentNode : null,

	queryUrl : Ext.emptyFn,
	readerConfig : [],
	gridCmConfig : [],

	initComponent : function() {
		this.build();
		Ext.tf.VaccineImmnuePanel.superclass.initComponent.call(this);
	},

	build : function() {
		this.items = [ this.createPanel() ];
	},

	getTreeSelNode : function() {
		var selNode = this.currentNode;
		if (selNode) {
			// Ext.Msg.alert('', selNode.text);
		} else {
			Ext.Msg.show({
				icon : Ext.Msg.WARNING,
				buttons : Ext.Msg.OK,
				msg : '请先选择一个行政区域！'
			});
		}
		return selNode;
	},
	getParams : function() {
		var isCrossDistrict = Ext.getCmp('isCrossDistrict').getValue();
		var selNode = this.getTreeSelNode();
		if (selNode || isCrossDistrict) {
//			console.log(isCrossDistrict);
			var filterKey = Ext.getCmp('combo').getValue();
			var filterValue = Ext.getCmp('filterField').getValue();
			var disNum = isCrossDistrict ? Ext.getCmp('districtNum').getValue() : selNode.id;
			var cond = {
				district : disNum,
				filterKey : filterKey,
				filterValue : filterValue,
				params : []
			};
			return cond;
		}
		return null;
	},

	openWin : function(targetUrl, param) {
		var win = new Ext.Window({
			modal : true,
			title : '预防接种卡',
			border : false,
			layout : 'fit'
		});
		if (param != null) {
			window.other_init_param = param;
		}
		win.show();
		win.maximize();
		win.add({
			xtype : 'iframepanel',
			defaultSrc : targetUrl,
			layout : 'fit',
			width: win.getInnerWidth(),
			height: win.getInnerHeight() - 10,
			title : '',
			loadMask : true,
			autoScroll : false,
			listeners : {
				message : function(f, data) {
//					console.log("receive message...");
//					console.log(data);
					if (data.data == 'quit') {
						win.close();
						this.load(true);
					} else if (data.data == 'saved') {
						this.load();
					}
				}.createDelegate(this)
			}
		});
		win.doLayout(true);
	},
	
	load : function(isReset) {
		var selNode = this.getTreeSelNode();
		if (selNode) {
			if (isReset) {
				this.pagingBar.changePage(1);
			}
			this.grid.getStore().reload();
			this.doLayout(true);
		}
	},
	
	openVacciProgram : function(){
		//注意先建证，后接种（现在还没有控制）
		var selections = this.grid.getSelections();
	    if(selections.length > 0){
	    	var records = selections[0];
	    	var vaccineImmune = records.get('vaccineImmune');
//	    	console.log(vaccineImmune);
	    	if(vaccineImmune != null){
	    		var fileNo = records.get('fileNo');
		    	VaccinationService.vacciProgram(fileNo,function(data){
		    		var $table_basicInfo = genBasicInfo(records);			    	
			    	var vacciedGridghnPanel = new Ext.tf.VaccineImmuneGridPanel({
	        			queryUrl : VaccinationService.queryVacciInfo,
//	        			singleSelect : true,
	        			gridHeight : 430,
	        			gridId : 'vacciedGridghn', 
	        			selModel : true,
	        			titleTxt : '',
	        			queryType : 0,
	        			fileNo : fileNo,
	        			readerConfig : [ {
	        				name : 'vaccinationName',
	        				mapping : 'vaccinationName'
	        			}, {
	        				name : 'immuneBatchNum',
	        				mapping : 'immuneBatchNum'
	        			}, {
	        				name : 'vaccinationDate',
	        				mapping : 'vaccinationDate'
	        			}, {
	        				name : 'vaccinationDose',
	        				mapping : 'vaccinationDose'
	        			}, {
	        				name : 'vaccinationDoctor',
	        				mapping : 'vaccinationDoctor'
	        			}, {
	        				name : 'vaccinationPosition',
	        				mapping : 'vaccinationPosition'
	        			}, {
	        				name : 'vaccinationWay',
	        				mapping : 'vaccinationWay'
	        			}, {
	        				name : 'remarks',
	        				mapping : 'remarks'
	        			}, {
	        				name : 'vacciAddress',
	        				mapping : 'vacciAddress'
	        			}, {
	        				name : 'vacciDose',
	        				mapping : 'vacciDose'
	        			}, {
	        				name : 'companyId',
	        				mapping : 'companyId'
	        			}, {
	        				name : 'id',
	        				mapping : 'id'
	        			}, {
	        				name : 'colNum',
	        				mapping : 'colNum'
	        			}, {
	        				name : 'rowNumber',
	        				mapping : 'rowNumber'
	        			}, {
	        				name : 'fileNo',
	        				mapping : 'fileNo'
	        			}, {
	        				name : 'number',
	        				mapping : 'number'
	        			}, {
	        				name : 'inputPersonId',
	        				mapping : 'inputPersonId'
	        			} ],
	        			gridCmConfig : [{
	        				"header" : "疫苗名称",
	        				"dataIndex" : "vaccinationName",
	        				"width" : 180
	        			}, {
	        				"header" : "疫苗批号",
	        				"dataIndex" : "immuneBatchNum"
	        			}, {
	        				"header" : "剂数",
	        				"dataIndex" : "number",
	        				"renderer" : function(val){
	        					if(val != ''){
	        						return '第' + val + '剂';
	        					}
	        					return '';
	        				}
	        			}, {
	        				"header" : "接种日期",
	        				"dataIndex" : "vaccinationDate",
	        				"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
	        			}, {
	        				"header" : "接种医师",
	        				"dataIndex" : "vaccinationDoctor"
	        			} ]
	        		});
			    	
			    	var win = new Ext.Window({
						title : '云南省免疫规划疫苗免疫程序（一类疫苗）',
						layout: 'border',
					    items: [{
					        region: 'west',
					        collapsible: true,
					        title: '个人基本信息',
					        xtype: 'panel',
					        width: 250,
					        autoScroll: true,
					        split: true,
					        html : $table_basicInfo
					    }, {
					        region: 'center',
					        xtype: 'tabpanel',
					        autoScroll: true,
					        activeTab: 0,
//					        split: true,
					        id : 'tabpanel-xt-vacci',
					        items: [{
					            title: '疫苗免疫程序',
					            tbar : [{
									text : '打印',
						        	iconCls: 'c_print',
						        	handler : function(){					    	
										vaccineImmune.fileNo = records.get('fileNo');
										printVacciImmuneInfoObj.init(vaccineImmune,0);
									}.createDelegate(this)
								}],
								autoScroll: true,
								id : 'tabpanel-01-vacci',
					            html: '<div class="vacciContainer"></div>'
					        },{
					        	title : '已接种疫苗（列表，可删除）',
					        	height : 300,
					        	layout : 'fit',
					        	id : 'tabpanel-02-vacci',
					        	tbar : [{
									text : '删除',
						        	iconCls: 'c_del',
						        	handler : function(){					    	
						        		var selections = Ext.getCmp('vacciedGridghn').getSelections();
						        		if(selections.length > 0){
						        			var ids = [];
						        			for(var i = 0;i<selections.length;i++){
						        				ids.push(selections[i].data);
						        			}
						        			console.log(ids);
						        			VaccinationService.removeVacciInfo(ids,function(){
						        				showInfoObj.Infor('删除成功');
						        				Ext.getCmp('vacciedGridghn').getStore().reload();
						        			});
						        		}
									}.createDelegate(this)
								}],
					        	items : [vacciedGridghnPanel]
					        }],
					        listeners : {
		    					'tabchange' : function(){
		    						var id = Ext.getCmp('tabpanel-xt-vacci').getActiveTab().id;
		    						if(id == 'tabpanel-01-vacci'){
		    							VaccinationService.vacciProgram(fileNo,function(data){
		    								var $table_vacciProgram = genCenterContent(data,fileNo);
		    								$('.vacciContainer').html($table_vacciProgram);
		    							});
		    						}else if(id == 'tabpanel-02-vacci'){
		    							Ext.getCmp('vacciedGridghn').getStore().reload();
		    						}
		    					}.createDelegate(this)
		    				}
					    }]
					});
					win.show(this);
					win.maximize();
		    		Ext.getCmp('tabpanel-01-vacci').el.mask('正在加载数据...');
		    		var $table_vacciProgram = genCenterContent(data,fileNo);
		    		$('.vacciContainer').html($table_vacciProgram);
		    		Ext.getCmp('tabpanel-01-vacci').el.unmask();
		    	});
	    	}else{
	    		showInfoObj.Infor('请先建证再进入接种疫苗免疫程序');
	    	}
	    }
	},
	
	createPanel : function() {
        var store01 = new Ext.data.SimpleStore({
            fields : [ 'type', 'display' ],
            data : [ [ '0', '全部' ], [ '1', '未建卡' ],['2','已建卡']]
        });
        this.combo01 = new Ext.form.ComboBox({
            store : store01,
            displayField : 'display',
            valueField : 'type',
            typeAhead : true,
            mode : 'local',
            triggerAction : 'all',
            selectOnFocus : true,
            editable : false,
            width : 100,
            value : '2'
        });
		var comboBoxStore = new Ext.data.SimpleStore({
			fields : [ 'type', 'display' ],
			data : [ [ 'a.name', '姓名' ], [ 'c.highRisk', '高危筛选' ],
					[ 'a.inputDate', '录入日期' ], [ 'a.lastModifyDate', '修改日期' ],
					[ 'b.birthday', '出生日期' ], [ 'a.fileNo', '档案编码' ],
					[ 'b.idnumber', '身份证号' ], [ 'b.linkman', '联系人' ],
					[ 'a.paperFileNo', '纸质档案号' ] ]
		});
		var tbar = [ new Ext.Button({
			text: '预防接种卡',
			iconCls: 'vaccinateImmune',
			menu: new Ext.menu.Menu({
		        items: [{
					text : '预防接种证',
					iconCls : 'addBusinessData',
					handler : function(){
						var selections = this.grid.getSelections();
					    if(selections.length > 0){
					    	var records = selections[0];
							var vaccineImmune = records.get('vaccineImmune');
							var where = '';
							if(vaccineImmune != null){
								var id = vaccineImmune.id;
								where = 'id=' + id;
								var url = '/Vaccination_New.html?' + where;
								this.openWin(url);
							}else{
								var fileNo = records.get('fileNo');
								where = 'fileNo=' + fileNo;
								VaccinationService.getBirthCertificateInfo(fileNo,function(data){
									var users = Ext.tf.currentUser;
									var vbuildCardPerson = escape(users.taxempname);
									var vcertifiUnit = escape(users.org.name);
									var vfamilyAddress = escape(records.get('address'));
									var vname = escape(records.get('name'));
									var vsex = escape(records.get('personalInfo_sex'));
									var vcensusAddressTown = '';
									var vcensusAddressVillage = '';
									var vweight = '';
									var vbirthday = '';
									var vcensusAddressCounty = '';
									var vfatherName = '';
									var vmotherName = '';
									vcensusAddressTown = escape(records.get('township'));
									vcensusAddressVillage = escape(records.get('village'));
									if(data[0] != null){
										vweight = data[0].weight;
										vcensusAddressCounty = escape(data[0].county);
										vbirthday = escape(data[0].birthday.format('YmdHms'));
										vfatherName = escape(data[0].fatherName);
										vmotherName = escape(data[0].motherName);
									}else if(data[1] != null){
										vcensusAddressCounty = escape(data[1]);
										vbirthday = escape(records.get('personalInfo_birthday').format('Ymd') + '000000');
									}
									where = where + '&vbuildCardPerson=' + vbuildCardPerson + '&vcertifiUnit=' + vcertifiUnit +
										'&vfamilyAddress=' + vfamilyAddress + '&vcensusAddressTown=' + vcensusAddressTown +
										'&vcensusAddressVillage=' + vcensusAddressVillage + '&vweight=' + vweight + 
										'&vname=' + vname + '&vsex=' + vsex + '&vbirthday=' + vbirthday +
										'&vcensusAddressCounty=' + vcensusAddressCounty + '&vfatherName=' + vfatherName +
										'&vmotherName=' + vmotherName;
									where = where + '&quitAfterSave=true';
									var url = '/Vaccination_New.html?' + where;
									this.openWin(url,'VacciInfoGrid');
								});
							}
					    }
					}.createDelegate(this)
				},{
					text : '撤销预防接种证',
		        	iconCls: 'c_del',
		        	handler : function(){
		        		var selections = this.grid.getSelections();
					    if(selections.length > 0){
					    	var records = selections[0];
					    	var vaccineImmune = records.get('vaccineImmune');
					    	if(vaccineImmune != null){
					    		var id = vaccineImmune.id;
					    		var load = this.load;
					    		console.log(load);
					    		VaccinationService.removeVaccineImmune(id,function(data){
					    			showInfoObj.Infor('预防接种证撤销成功!');
					    			Ext.getCmp('VacciInfoGrid').getStore().reload();
					    		});
					    		
							}
					    }
					}.createDelegate(this)
				},{
		        	text : '异常反应',
		        	iconCls: 'prevent_vaccinate_program',
		        	handler : function(){
		        		//...
					}.createDelegate(this)
		        },{
		        	text : '迁入迁出',
//		        	iconCls: 'prevent_vaccinate_program',
		        	handler : function(){
		        		//...
					}.createDelegate(this)
		        },{
		        	text : '打印',
		        	iconCls: 'c_print',
		        	handler : function(){
		        		var selections = this.grid.getSelections();
					    if(selections.length > 0){
					    	var records = selections[0];
							var vaccineImmune = records.get('vaccineImmune');
							if(vaccineImmune != null){
								vaccineImmune.fileNo = records.get('fileNo');
								printVacciImmuneObj.printVacciImmune(vaccineImmune);
							}else{
								showInfoObj.Infor('请先建立预防接种证');
							}
					    }
					}.createDelegate(this)
		        }]
		   	})
		}),new Ext.Button({
			text: '疫苗接种类型',
			iconCls: 'c_add',
			menu: new Ext.menu.Menu({
		        items: [{
		        	text : '规划内免疫程序',
		        	iconCls: 'addBusinessData',
		        	handler : function(){
						this.openVacciProgram();
					}.createDelegate(this)
		        },{
		        	text : '规划外免疫程序',
		        	iconCls: 'prevent_vaccinate_program',
		        	handler : function(){
		        		openWinForm(2,null,null,null,null,null);
					}.createDelegate(this)
		        },{
		        	text : '打印',
		        	iconCls: 'c_print',
		        	handler : function(){
		        		var selections = this.grid.getSelections();
					    if(selections.length > 0){
					    	var records = selections[0];
							var vaccineImmune = records.get('vaccineImmune');
							if(vaccineImmune != null){
								vaccineImmune.fileNo = records.get('fileNo');
								printVacciImmuneInfoObj.init(vaccineImmune,1);
							}else{
								showInfoObj.Infor('请先建立预防接种证');
							}
					    }
					}.createDelegate(this)
		        }]
		   	})
		}),new Ext.form.Label({
			id : 'districtNumText',
			name : 'districtNumText',
			text : '当前行政区划编码：',
			style : 'margin-left:10px;'
		}),new Ext.form.TextField({
			id : 'districtNum',
			disabled : true,
			width : 100,
			style : 'color:red;',
			maxLength : 12
		}),new Ext.form.Checkbox({
			boxLabel : '跨区划',
			id : 'isCrossDistrict',
			width : 80,
			listeners : {
				'check' : {
					fn : function(checkbox,checked){
						//Ext.getCmp('districtNum').setValue('');
						if(checked){
							Ext.getCmp('districtNum').setDisabled(false);
						}else{
							Ext.getCmp('districtNum').setDisabled(true);
						}
						console.log(checkbox.getValue())
					}
				}
			} 
		}),this.combo01, new Ext.form.ComboBox({
			id : 'tf.vaccineImmune.multicombo',
			store : comboBoxStore,
			displayField : 'display',
			valueField : 'type',
			typeAhead : true,
			mode : 'local',
			triggerAction : 'all',
			selectOnFocus : true,
			editable : false,
			width : 100,
			value : 'a.name'
		}),new Ext.form.TextField({
			id : 'tf.vaccineImmune.filterField',
			enableKeyEvents : true,
			listeners : {
				'keypress' : function(field, event) {
					if (event.getKey() == 13) {
						 this.load(true);
					}
				}.createDelegate(this)
			}
		}), {
			text : '查询',
			iconCls : 'searchbg',
			handler : function(){
				this.load(true);
			}.createDelegate(this)
		}];

		this.menu = new Ext.tree.TreePanel({
			layout : 'fit',
			width : 200,
			region : 'west',
			title : '行政区划',
			split : true,
			layoutConfig : {
				animate : true
			},
			collapsible : true,
			border : false,
			animate : true,
			enableDD : false,
			loader : new Ext.ux.DWRTreeLoader({
				dwrCall : UserMenuTreeService.getUserDistrictNodes
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
					if (index == 0) {
						if (!n.leaf){
							n.expand();
						}
						this.currentNode = n;
						if(!Ext.getCmp('isCrossDistrict').getValue())
							Ext.getCmp('districtNum').setValue(n.id);
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
					this.grid.setTitle(n.text);
					this.load();
					if(!Ext.getCmp('isCrossDistrict').getValue())
						Ext.getCmp('districtNum').setValue(n.id);
				}.createDelegate(this)
			}
		});

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
					    var cond = {};
					    var selNode = this.getTreeSelNode();
                        if (selNode) {
                            cond = {
                                district : selNode.id,
                                type : '0',
                                conditions : []
                            };
                            if(Ext.getCmp('isCrossDistrict').getValue()){
                                cond.district = Ext.getCmp('districtNum').getValue();
                            }
                            if(this.combo01 && !Ext.isEmpty(this.combo01.getValue())){
                                cond.conditions[cond.conditions.length] = {filterKey:"type",filterVal:this.combo01.getValue()};
                            }
                            var combo02 = Ext.getCmp("tf.vaccineImmune.multicombo");
                            var value02 = Ext.getCmp("tf.vaccineImmune.filterField");
                            console.log("value02.getValue()==="+value02.getValue())
                            if(combo02 && !Ext.isEmpty(combo02.getValue()) && value02 && !Ext.isEmpty(value02.getValue())){
                                cond.conditions[cond.conditions.length] = {filterKey:combo02.getValue(),filterVal:""+value02.getValue()};
                            }
                        }
                        var o = cond;
						//var o = this.getParams();
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
			displayMsg : '{0} - {1} of {2}',
			emptyMsg : "没有记录"
		});
		var sm = new Ext.grid.CheckboxSelectionModel({singleSelect : true});
		this.gridCmConfig.unshift(sm);
		this.grid = new Ext.grid.GridPanel({
			id : 'VacciInfoGrid',
			title : '请选择一个行政区划',
			bbar : this.pagingBar,
			layout : 'fit',
			region : 'center',
			store : store,
			cm : new Ext.grid.ColumnModel(this.gridCmConfig),
			// viewConfig : this.gridViewConfig,
			sm : sm
		});		
		store.on('load',function(){
			var model = this.grid.getSelectionModel();
			if (model.getCount() == 0) {
				model.selectFirstRow();
			}
		}.createDelegate(this));
		var panel = new Ext.Panel({
			layout : 'border',
			autoScroll : true,
			tbar : tbar,
			items : [ this.menu, this.grid ]
		});
		return panel;
	}
});
