var trNo = 1000;
var tuberId = '';
function createTextfieldByEnter(x, y, labelWidth, fieldLabel, xtype, formwidth,width, id,
		disabled, v, labelSeparator) {
	return {
		xtype : "panel",
		layout : "form",
		baseCls: "x-plain",
		x : x,
		y : y,
		bodyStyle : 'padding:5px',
		labelWidth : labelWidth,
		labelAlign : 'right',
		width:formwidth,
		border : true,
		items : [{
					fieldLabel : fieldLabel,
					xtype : xtype,
					width:width,
					disabled : disabled,
					labelSeparator : labelSeparator,
					name : id,
					id : id,
					value : v,
					allowBlank : false,
					enableKeyEvents : true,
					initEvents : function() {var keyPress = function(e){  
						        if (e.getKey() == e.ENTER) {  
						            var fileNo = $("#fileNo").val();
						            TuberSuperviseService.getPersonalInfo(fileNo,function(data){				            	
						            	var result = data.split(",");
						            	var name = result[0];
						            	var address = result[1];
						            	var sex = result[2];
						            	var birthday = result[3];
						            	$("#name").val(name);
						            	$("#address").val(address);
						            	$("#sex").val(sex);
						            	var date = new Date();
						            	var year = date.getFullYear();
						            	var birthYear = birthday.substring(0,4);
						            	var age = year - birthYear;
						            	$("#age").val(age);
						            });
						        }  
						    };  
						    this.el.on("keypress", keyPress, this);  
					}
				}]
	};
}

function createTextfield(x, y, labelWidth, fieldLabel, xtype, formwidth,width, id,
		disabled,allowBlank, v,labelSeparator,h) {
	return {
		xtype : "panel",
		layout : "form",
		baseCls: "x-plain",
		x : x,
		y : y,
		bodyStyle : 'padding:5px',
		labelWidth : labelWidth,
		labelAlign : 'right',
		width:formwidth,
		border : true,
		items : [{
					fieldLabel : fieldLabel,
					xtype : xtype,
					width:width,
					disabled : disabled,
					labelSeparator : labelSeparator,
					name : id,
					id : id,
					value : v,
					style: 'color:black;',
					allowBlank : allowBlank
				}]
	};
}

function createDatefield(x, y, labelWidth, fieldLabel, xtype, width, id,
		disabled,v) {
	return {
		xtype : "panel",
		layout : "form",
		x : x,
		y : y,
		width:240,
		baseCls: "x-plain",
		bodyStyle : 'padding:5px',
		labelWidth : labelWidth,
		border : true,
		items : [{
					fieldLabel : fieldLabel,
					xtype : 'datefield',
					format : 'Y-m-d h:m:s',
					width : width,
					disabled : disabled,
					name : id,
					id : id,
					value : v,
					allowBlank : false
				}]
	};
}

function addTuber(){
	var url = window.location.search;
	var districtNumber = '';
	var formPanel;
	if(url.indexOf('id') > 0){
		var id = url.substring(url.indexOf('=') + 1, url.length);
		districtNumber = id.substring(0, id.length - 4);
		formPanel = new Ext.Panel({
	        baseCls: "x-plain",
	        layout : "absolute",
	        height : 400,
	        width:400,
			items : [
				createTextfieldByEnter("0", "0", 60, "档案编号", "textfield", 380,300,"fileNo", true,$("#fileNo0").html()),
				createTextfield("0", "30", 60, "姓名", "textfield", 150,70,"name", true,true,$("#name0").html()),
				createTextfield("150", "30", 40, "性别", "textfield",130, 70,"sex", true,true,$("#sex0").html()),
				createTextfield("270", "30", 40, "年龄", "textfield",110,50,"age", true,true,$("#age0").html()),
				createTextfield("0", "60", 60, "地址", "textfield", 380,300,"address", true,true,$("#address0").html()),
				createTextfield("0", "90", 60, "病型", "textfield", 380,300,"typeForSick", true,false,$("#typeForSick0").html()),
				createTextfield("0", "120", 60, "登记号", "textfield",200 ,120,"regNo", true,false,$("#regNo0").html()),
				createTextfield("180", "120", 60, "病历号", "textfield", 200,120,"caseHisNo", true,false,$("#caseHisNo0").html()),
				createTextfield("0", "150", 60, "督导意见", "textarea", 380,300,"judgmentForSupervise", false),
				createDatefield("0", "220", 60, "督导日期", "datefield", 140,"timeForSupervise", false),
				createTextfield("220", "220", 110, "取药次数/品种数量", "numberfield", 160,30,"noForSpecies", false,false),
				createTextfield("0", "250", 60, "漏服原因", "textarea", 380,300,"loseReason", false,false),
				createTextfield("0", "320", 60, "漏服次数", "numberfield", 130,55,"loseTime", false,false),
				createTextfield("126", "320", 60, "补服次数", "numberfield", 130,55,"fillTime", false,false),
				createTextfield("246", "320", 60, "断药次数", "numberfield", 130,55,"stopTime", false,false),
				createTextfield("0", "350", 95, "访视人（单位）", "textfield", 380,265,"visitPerson", false,false)
			]
		});
	}else{
		districtNumber = url.substring(url.indexOf('=') + 1, url.length);
		formPanel = new Ext.Panel({
	        baseCls: "x-plain",
	        layout : "absolute",
	        height : 400,
	        width:400,
			items : [
				createTextfieldByEnter("0", "0", 60, "档案编号", "textfield", 380,300,"fileNo", false,districtNumber),
				createTextfield("0", "30", 60, "姓名", "textfield", 150,70,"name", true),
				createTextfield("150", "30", 40, "性别", "textfield",130, 70,"sex", true),
				createTextfield("270", "30", 40, "年龄", "textfield",110,50,"age", true),
				createTextfield("0", "60", 60, "地址", "textfield", 380,300,"address", true),
				createTextfield("0", "90", 60, "病型", "textfield", 380,300,"typeForSick", false,false),
				createTextfield("0", "120", 60, "登记号", "textfield",200 ,120,"regNo", false,false),
				createTextfield("180", "120", 60, "病历号", "textfield", 200,120,"caseHisNo", false),
				createTextfield("0", "150", 60, "督导意见", "textarea", 380,300,"judgmentForSupervise", false),
				createDatefield("0", "220", 60, "督导日期", "datefield", 140,"timeForSupervise", false),
				createTextfield("220", "220", 110, "取药次数/品种数量", "numberfield", 160,30,"noForSpecies", false,false),
				createTextfield("0", "250", 60, "漏服原因", "textarea", 380,300,"loseReason", false,false),
				createTextfield("0", "320", 60, "漏服次数", "numberfield", 130,55,"loseTime", false,false),
				createTextfield("126", "320", 60, "补服次数", "numberfield", 130,55,"fillTime", false,false),
				createTextfield("246", "320", 60, "断药次数", "numberfield", 130,55,"stopTime", false,false),
				createTextfield("0", "350", 95, "访视人（单位）", "textfield", 380,265,"visitPerson", false,false)
			]
		});
	}
	
	this.clearData = function(){
		$("input:text", document.forms[0]).each(function(){
  		  var ids = '#' + this.id;
  		  $(ids).val('')
  	  }); 
  	  $("textarea", document.forms[0]).each(function(){
  		  var ids = '#' + this.id;
  		  $(ids).val('')
  	  }); 
	}
	this.tuberPanel = new Ext.Window({
		frame:true,
		title:'督导记录',
		resizable: false,
		modal: true,
		width : 400,
		plain: true,
		iconCls: "addicon",
		items : [formPanel],
		buttonAlign : 'center',			
		buttons : [{
	          text : '关闭',
	          handler : function() {
	            this.tuberPanel.close();
	            }.createDelegate(this)
	          },{
	          text : '清除',
	          handler : this.clearData.createDelegate(this)
	          },{
	          text : '确认',
	          handler : function() {
	        	  var data = {};
	        	  $("input:text", document.forms[0]).each(function(){
	        		  var ids = '#' + this.id;
	        		  var val = $(ids).val();
	        		  data[this.id] =  val ;
	        	  });
	        	  $("textarea", document.forms[0]).each(function(){
	        		  var ids = '#' + this.id;
	        		  var val = $(ids).val();
	        		  data[this.id] =  val ;
	        	  });
	        	  data['districtNumber'] = districtNumber;
	        	  TuberSuperviseService.save(data,function(data){
	        		 if(data != ''){
	        			 Ext.MessageBox.show({
	        				 title : '提示',
	        				 msg : '保存成功！',
	        				 buttons : Ext.Msg.OK,
	        				 icon: Ext.MessageBox.INFO
	        			 });
	        			 window.location.reload();
	        			 //数据显示加一行
//	        	      	$("#table02").append("<tr><td id=\"timeForSupervise" + trNo + "\">&nbsp;</td>" +
//	            				"<td style=\"text-align:left;word-break:break-all;width:350px;\" id=\"judgmentForSupervise" + trNo + "\"></td>" +
//	            				"<td id=\"noForSpecies" + trNo + "\"></td>" +
//	            				"<td id=\"loseTime" + trNo + "\"></td>" +
//	            				"<td style=\"text-align:left;word-break:break-all;width:200px;\" id=\"loseReason" + trNo + "\"></td>" +
//	            				"<td id=\"fillTime" + trNo + "\"></td>" +
//	            				"<td id=\"stopTime" + trNo + "\"></td>" +
//	            				"<td id=\"visitPerson" + trNo + "\"></td>" +
//	            				"<td></td>" +
//	            				"<td><span style=\"display:none;\" id=\"id"+  trNo + "\"></span>" +
//	            				"<a href=\"#\" onclick=\"updateDetails(this);\" style=\"color:black;font-weight:normal;\">修改</a>&nbsp;" +
//	            				"<a href=\"#\" onclick=\"deleteDetails(this);\" style=\"color:black;font-weight:normal;\">删除</a></td>" +
//	            			"</tr>");
//	        	      	 
//	        	      	$("#id" + trNo).html(data);
//	        	      	$("input:text", document.forms[0]).each(function(){
//			        		  var ids = '#' + this.id;
//			        		  var val = $(ids).val();
//			        		  if(this.id.toString() == "timeForSupervise"){
//			        			  var temp = val.split(' ');
//								  $("#" + this.id + trNo).html(temp[0]);
//			        		  }else{
//			        			  $("#" + this.id + trNo).html(val);
//			        		  }
//			        	  });
//			        	  $("textarea", document.forms[0]).each(function(){
//			        		  var ids = '#' + this.id;
//			        		  var val = $(ids).val();
//			        		  $("#" + this.id + trNo).html(val);
//			        	  });
//	        	      	trNo = trNo + 1;
//	        	      	
//	        	      	if($("#fileNo0").html() == ''){
//	        		  		$("#name0").html($("#name").val());
//	        		  		$("#sex0").html($("#sex").val());
//	        		  		$("#age0").html($("#age").val());
//	        		  		$("#address0").html($("#address").val());
//	        		  		$("#typeForSick0").html($("#typeForSick").val());
//	        		  		$("#regNo0").html($("#regNo").val());
//	        		  		$("#caseHisNo0").html($("#caseHisNo").val());
//	        		  		$("#timeForStart0").html(function(){
//	        		  			var today = new Date();
//	        		  			var year = today.getFullYear();
//	        		  			var month = today.getMonth();
//	        		  			var day = today.getDay();
//	        		  			var date = year + '-' + month + '-' + day;
//	        		  			return date;
//	        		  		});
//	        	  		}
	        	      	
	        	      //清除数据
//	        			 if($("#fileNo0").html() != ''){
//	        				 $("#judgmentForSupervise").val('');
//	        				 $("#timeForSupervise").val('');
//	        				 $("#noForSpecies").val('');
//	        				 $("#loseReason").val('');
//	        				 $("#loseTime").val('');
//	        				 $("#fillTime").val('');
//	        				 $("#stopTime").val('');
//	        				 $("#visitPerson").val('');
//	        			 }else{
//	        				 $("input:text", document.forms[0]).each(function(){
//	        					 var ids = '#' + this.id;
//	        					 if(this.id.toString() == "fileNo"){
//	        						 $(ids).val($(ids).val().substring(0,districtNumber.length));
//	        					 }else{
//			        	      		  $(ids).val('');
//	        					 }
//		        	      	  }); 
//		        	      	  $("textarea", document.forms[0]).each(function(){
//		        	      		  var ids = '#' + this.id;
//		        	      		  $(ids).val('')
//		        	      	  });
//	        			 }   			
	        	      	
	        		 }
	        	  });
		         }.createDelegate(this)
		       
	          }]
	});
	
	
	
	this.tuberPanel.show(this);
}
//更新督导记录基本信息
function updateTuber(){
	var tuber = new Ext.Panel({
		baseCls: "x-plain",
        layout : "absolute",
        height : 160,
        width:400,
        items : [
					createTextfieldByEnter("0", "0", 60, "档案编号", "textfield", 380,300,"fileNo_u", false,$("#fileNo0").html()),
					createTextfield("0", "30", 60, "姓名", "textfield", 150,70,"name_u", true,true,$("#name0").html()),
					createTextfield("0", "30", 60, "地址", "textfield", 150,70,"address", true,true,$("#address0").html(),":",true),
					createTextfield("150", "30", 40, "性别", "textfield",130, 70,"sex_u", true,true,$("#sex0").html()),
					createTextfield("270", "30", 40, "年龄", "textfield",110,50,"age_u", true,true,$("#age0").html()),
					createTextfield("0", "60", 60, "地址", "textfield", 380,300,"address_u", true,true,$("#address0").html()),
					createTextfield("0", "90", 60, "病型", "textfield", 380,300,"typeForSick_u", false,false,$("#typeForSick0").html()),
					createTextfield("0", "120", 60, "登记号", "textfield",200 ,120,"regNo_u", false,false,$("#regNo0").html()),
					createTextfield("180", "120", 60, "病历号", "textfield", 200,120,"caseHisNo_u", false,false,$("#caseHisNo0").html())
				]
	});
	this.tuberWin = new Ext.Window({
		frame:true,
		title:'修改基本信息',
		resizable: false,
		modal: true,
		width : 400,
		plain: true,
		iconCls: "addicon",
		items : [tuber],
		buttonAlign : 'center',
		buttons : [{
			text : '关闭',
			handler : function(){
				this.tuberWin.close();
			}.createDelegate(this)
		},{
			text : '清除',
			handler : function(){
				$("input:text", document.forms[0]).each(function(){
					 var ids = '#' + this.id;
       	      		 $(ids).val('');
				}); 
			}
		},{
			text : '修改',
			handler : function(){
				var data = {};
	        	$("input:text", document.forms[1]).each(function(){
	        		var ids = '#' + this.id;
	        		var val = $(ids).val();
	        		data[this.id.toString().substring(0,this.id.toString().length - 2)] =  val ;
	        	});
	        	
				TuberSuperviseService.updateTuberInfo(tuberId,data,function(data){
					if(data == 'SUCCESS'){
						Ext.Msg.show({
							title : '提示',
							msg : '修改成功！',
							buttons : Ext.Msg.OK,
	        				icon: Ext.MessageBox.INFO
						});
						$("#name0").html($("#name_u").val());
        		  		$("#sex0").html($("#sex_u").val());
        		  		$("#age0").html($("#age_u").val());
        		  		$("#typeForSick0").html($("#typeForSick_u").val());
        		  		$("#regNo0").html($("#regNo_u").val());
        		  		$("#caseHisNo0").html($("#caseHisNo_u").val());
					}
				});
			}
		}]
		
	});
	this.tuberWin.show();
}

//更新督导记录
function updateDetails(obj){
	var detailId = $(obj).parent("td").children("span").html();
	var rowId = $(obj).parent("td").children("span").attr("id");
	rowId = rowId.substring(2,rowId.length);
	var detail = new Ext.Panel({
		baseCls: "x-plain",
        layout : "absolute",
        height : 240,
        width:400,
        items : [
					createTextfield("0", "0", 60, "督导意见", "textarea", 380,300,"judgmentForSupervise_u", false,false,$("#judgmentForSupervise" + rowId).html()),
					createDatefield("0", "70", 60, "督导日期", "datefield", 140,"timeForSupervise_u", false,$("#timeForSupervise" + rowId).html()),
					createTextfield("220", "70", 110, "取药次数/品种数量", "numberfield", 160,30,"noForSpecies_u", false,false,$("#noForSpecies" + rowId).html()),
					createTextfield("0", "100", 60, "漏服原因", "textarea", 380,300,"loseReason_u", false,false,$("#loseReason" + rowId).html()),
					createTextfield("0", "170", 60, "漏服次数", "numberfield", 130,55,"loseTime_u", false,false,$("#loseTime" + rowId).html()),
					createTextfield("126", "170", 60, "补服次数", "numberfield", 130,55,"fillTime_u", false,false,$("#fillTime" + rowId).html()),
					createTextfield("246", "170", 60, "断药次数", "numberfield", 130,55,"stopTime_u", false,false,$("#stopTime" + rowId).html()),
					createTextfield("0", "200", 95, "访视人（单位）", "textfield", 380,265,"visitPerson_u", false,false,$("#visitPerson" + rowId).html())
				]
	});
	this.tuberDetailWin = new Ext.Window({
		frame:true,
		title:'修改督导记录',
		resizable: false,
		modal: true,
		width : 400,
		plain: true,
		iconCls: "addicon",
		items : [detail],
		buttonAlign : 'center',
		buttons : [{
			text : '关闭',
			handler : function(){
				this.tuberDetailWin.close();
			}.createDelegate(this)
		},{
			text : '清除',
			handler : function(){
				$("input:text", document.forms[0]).each(function(){
					 var ids = '#' + this.id;
       	      		 $(ids).val('');
				}); 
				$("textarea", document.forms[0]).each(function(){
  	      		  var ids = '#' + this.id;
  	      		  $(ids).val('')
  	      	  });
			}
		},{
			text : '修改',
			handler : function(){
				var data = {};
	        	$("input:text", document.forms[1]).each(function(){
	        		var ids = '#' + this.id;
	        		var val = $(ids).val();
	        		data[this.id.toString().substring(0,this.id.toString().length - 2)] =  val ;
	        	});
	        	$("textarea", document.forms[0]).each(function(){
	        		  var ids = '#' + this.id;
	        		  var val = $(ids).val();
	        		  data[this.id.toString().substring(0,this.id.toString().length - 2)] =  val ;
	        	  });
				TuberSuperviseService.updateTuberDetailInfo(detailId,data,function(data){
					if(data == 'SUCCESS'){
						Ext.Msg.show({
							title : '提示',
							msg : '修改成功！',
							buttons : Ext.Msg.OK,
	        				icon: Ext.MessageBox.INFO
						});
						$("#judgmentForSupervise" + rowId).html($("#judgmentForSupervise_u").val());
						var tempTime = $("#timeForSupervise_u").val();
						var tempTimes = tempTime.split(" ");
						$("#timeForSupervise" + rowId).html(tempTimes[0]);
						$("#noForSpecies" + rowId).html($("#noForSpecies_u").val());
						$("#loseReason" + rowId).html($("#loseReason_u").val());
						$("#loseTime" + rowId).html($("#loseTime_u").val());
						$("#fillTime" + rowId).html($("#fillTime_u").val());
						$("#stopTime" + rowId).html($("#stopTime_u").val());
						$("#visitPerson" + rowId).html($("#visitPerson_u").val());
					}
				});
			}
		}]
		
	});
	this.tuberDetailWin.show();
	
}
//删除督导记录
function deleteDetails(obj){
	var fn = function(e){
		if(e == "yes"){
			var detailId = $(obj).parent("td").children("span").html();
			TuberSuperviseService.deleteDetailInfo(detailId,function(data){
				if(data == 'SUCCESS'){
					Ext.Msg.show({
						title : '提示',
						msg : '删除成功！',
						buttons : Ext.Msg.OK,
						icon: Ext.MessageBox.INFO
					});
					$(obj).parent().parent().remove();
				}
			});
		}
	}
	Ext.MessageBox.confirm("提示", "确认要删除该记录么？", fn, this);
}

Ext.onReady(function(){
	//退出
	function quit(){
        if ( typeof sendMessage == 'function' ) {
          sendMessage('quit');
        }
    }
	$('button.quit').click(quit);
	
	var url = window.location.search;
	if(url.indexOf('id') > 0){
		var id = url.substring(url.indexOf('=') + 1, url.length);
		TuberSuperviseService.get(id,function(data){
			for(var baseTuber in data.baseTuber){
				if(baseTuber.toString() == "timeForStart"){
					var temp = Ext.util.Format.date(data.baseTuber[baseTuber],"Y-m-d");
					$("#" + baseTuber + 0).html(temp);
					continue;
				}
				$("#" + baseTuber + 0).html(data.baseTuber[baseTuber])
			}
			
			for(var i=0;i < data.detailTuber.length;){
				$("#table02").append("<tr><td id=\"timeForSupervise" + i + "\">&nbsp;</td>" +
    				"<td style=\"text-align:left;word-break:break-all;width:350px;\" id=\"judgmentForSupervise" + i + "\"></td>" +
    				"<td id=\"noForSpecies" + i + "\"></td>" +
    				"<td id=\"loseTime" + i + "\"></td>" +
    				"<td style=\"text-align:left;word-break:break-all;width:200px;\" id=\"loseReason" + i + "\"></td>" +
    				"<td id=\"fillTime" + i + "\"></td>" +
    				"<td id=\"stopTime" + i + "\"></td>" +
    				"<td id=\"visitPerson" + i + "\"></td>" +
    				"<td></td>" + 
    				"<td><span style=\"display:none;\" id=\"id"+  i + "\"></span>" +
    				"<a href=\"#\" onclick=\"updateDetails(this);\" style=\"color:black;font-weight:normal;\">修改</a>&nbsp;" +
    				"<a href=\"#\" onclick=\"deleteDetails(this);\" style=\"color:black;font-weight:normal;\">删除</a></td>" +
    			"</tr>");
				for(var detailTuber in data.detailTuber[i]){
					if(detailTuber.toString() == "timeForSupervise"){
						var temp = Ext.util.Format.date(data.detailTuber[i][detailTuber],"Y-m-d");
						$("#" + detailTuber + i).html(temp);
						continue;
					}
					$("#" + detailTuber + i).html(data.detailTuber[i][detailTuber]);
				}
				i = i + 1;
			}
		});
	}
	//打印
	$('.printTuber').click(function(){
		$('#tuberTable').printElement({printMode:'popup'});
	});
	
	//新增督导记录
	
	$('button.addTuberSuper').click(addTuber);
	if(url.indexOf('id') > 0){
		tuberId = url.substring(url.indexOf('=') + 1, url.length);
		$('.updateTuber').show();
	}else{
		$('.updateTuber').hide();
	}

	$('button.updateTuber').click(updateTuber);	
});