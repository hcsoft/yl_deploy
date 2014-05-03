function labelOpt(){
	$('label').each(function(){
		$(this).bind('click',function(){
			$(this).parent('div').children('label').each(function(){
				if($(this).hasClass('list-selected'))
					$(this).removeClass('list-selected');
			});
			$(this).addClass('list-selected');
			
			if($(this).parent('div').attr('id') == 'borthAddressCategory'){
				if($(this).html() == '其它'){
					$('#otherBorthAddressCategory').css('display','inline');
				}else{
					$('#otherBorthAddressCategory').css('display','none');
				}
			}
		});
	});
}

function getServiceData(certifiId){
	BirthCertificateMsgService.getBirthCertificateInfo(certifiId,function(data){
		if(data != null){					
			for(var obj in data){
				if(obj == 'birthday'){
					var birthdays = data[obj].dateFormat('Y-m-d H:i:s');
					$('#' + obj).val(birthdays);
				}else if(obj == 'issuingDate'){
					var issuingDates = data[obj].dateFormat('Y-m-d H:i:s');
					$('#' + obj).val(issuingDates);
				}else{
					var len = $('#' + obj).children('label').length;
					if(len != 0){
						var flag = true;
						$('#' + obj).children('label').each(function(){
							if(data[obj] == $(this).html()){
								$(this).addClass('list-selected');
							}
							
							if($(this).parent('div').attr('id') == 'borthAddressCategory' && flag){
								if($(this).html() == '其它'){
									$('#otherBorthAddressCategory').css('display','inline');
								}else{
									$('#otherBorthAddressCategory').css('display','none');
									flag = false;
								}
							}
						});
					}else{
						var val = data[obj];
						if(val == null)
							val = '';
						$('#' + obj).val(val);
					}
				}
			}
		}
	});
}
function readOnly(){
	$('input').each(function(){
		$(this).attr('readonly','readonly');
	});
	
	$('label').each(function(){
		$(this).unbind('click');
	});
}
function visibleTfoot(){
	var $tfoot = $('.certifiInfor tfoot')
	$tfoot.remove();
}

function showPromptPrintSuccess(){
	Ext.Msg.show({
		title:'提示',
		msg: '是否打印成功？，如果成功，则此出生证明将归档！',
		buttons: Ext.Msg.YESNO,
		animEl: 'elId',
		icon: Ext.MessageBox.QUESTION,
		fn : function(e){
			if(e == 'yes'){
				BirthCertificateMsgService.printSuccess($('#certifiId').val());
				visibleTfoot();
				readOnly();
			}
		}
	});
}
var print = 0;
var LODOP; //声明为全局变量
$(document).ready(function(){
	labelOpt();
	
	
	var certifiInfo = window.parent.other_init_param;
	certifiInfo = certifiInfo.substring(1,certifiInfo.length);
	var certiArray = certifiInfo.split('&');
	var certifiId = certiArray[0].substring(certiArray[0].indexOf('=') + 1,certiArray[0].length);
	var type = certiArray[2].substring(certiArray[2].indexOf('=') + 1,certiArray[2].length);
		if(type == 0){
			var orgName = certiArray[1].substring(certiArray[1].lastIndexOf('=') + 1,certiArray[1].length);
			$('#certifiId').val(certifiId);
			$('#borthOrganization').val(orgName);
			$('#issuingOrganization').val(orgName);
			$('#birthday').val(new Date().dateFormat('Y-m-d H:i:s'));
			$('#issuingDate').val(new Date().dateFormat('Y-m-d H:i:s'));
			$('#motherNationality').val('中国');
			$('#fatherNationality').val('中国');
			BirthCertificateMsgService.getBirthAdress(function(data){
				if(data.length != 0){
					$('#borthAddress').children('input').each(function(i){
						if(i < data.length){
							$(this).val((data[i]));
						}
					});
				}
			});
			print = -1;
		}else{
			if(type == 2){
				visibleTfoot();
				readOnly();
				getServiceData(certifiId);
			}else if(type == 3){
				readOnly();
				$('.cancel').remove();
				$('.printPreview').remove();
				var $tbody = $('.certifiInfor tbody');
				$tr = '<tr><td>作废原因</td>'+
					'<td colspan="7"><div id="reasonRemarks"><label>因打印或填写错误</label>&nbsp;&nbsp;'+
					'<label>遗失</label>&nbsp;&nbsp;<label>其它</label>'+
					'<input id="otherDestroyReason" style="display:none;" type="text"/></div></td></tr>';
				$tbody.append($tr);
				labelOpt();
				getServiceData(certifiId);
				$('#reasonRemarks label').each(function(i){
					var css = '';
					if(i == 2){
						css = 'inline';
					}else{
						css = 'none';
					}
					$(this).click(function(){
						$('#otherDestroyReason').css('display',css)
					});
				});
			}else if(type == 4){
				readOnly();
				$('.cancel').remove();
				var $tbody = $('.certifiInfor tbody');
				$tr = '<tr><td>作废还原原因</td>'+
					'<td colspan="7"><input type="text" id="unReasonRemarks" class="input3"/></td></tr>';
				$tbody.append($tr);
				getServiceData(certifiId);
			}else if(type == 5){
				visibleTfoot();
				var $tbody = $('.certifiInfor tbody');
				$tr = '<tr><td>作废原因</td>'+
					'<td colspan="7"><div id="reasonRemarks"><label>因打印或填写错误</label>&nbsp;&nbsp;'+
					'<label>遗失</label>&nbsp;&nbsp;<label>其它</label>'+
					'<input id="otherDestroyReason" type="text"/></div></td></tr>';
				$tbody.append($tr);
				readOnly();
				BirthCertificateMsgService.getDestroyBirthCertificateInfo(certifiId,function(data){
					if(data != null){	
						var birthCertificate = data[0];
						var birthCertifiDestroyReason = data[1];
						for(var obj in birthCertificate){
							if(obj == 'birthday'){
								var birthdays = birthCertificate[obj].dateFormat('Y-m-d H:i:s');
								$('#' + obj).val(birthdays);
							}else if(obj == 'issuingDate'){
								var issuingDates = birthCertificate[obj].dateFormat('Y-m-d H:i:s');
								$('#' + obj).val(issuingDates);
							}else{
								var len = $('#' + obj).children('label').length;
								if(len != 0){
									var flag = true;
									$('#' + obj).children('label').each(function(){
										if(birthCertificate[obj] == $(this).html()){
											$(this).addClass('list-selected');
										}
										
										if($(this).parent('div').attr('id') == 'borthAddressCategory' && flag){
											if($(this).html() == '其它'){
												$('#otherBorthAddressCategory').css('display','inline');
											}else{
												$('#otherBorthAddressCategory').css('display','none');
												flag = false;
											}
										}
									});
								}else{
									var val = birthCertificate[obj];
									if(val == null)
										val = '';
									$('#' + obj).val(val);
								}
							}
						}
						
						for(var obj in birthCertifiDestroyReason){
							var len = $('#' + obj).children('label').length;
							if(len != 0){
								$('#' + obj).children('label').each(function(){
									if(birthCertifiDestroyReason[obj] == $(this).html()){
										$(this).addClass('list-selected');
									}
								});
							}else{
								var val = birthCertifiDestroyReason[obj];
								if(val == null)
									val = '';
								$('#' + obj).val(val);
							}
							
						}
					}
				});
			}else{
				getServiceData(certifiId);
			}
		}
	
	$('.gbtn').each(function(){
		$(this).hover(function(){
			$(this).css('background-color','#FFF');
		},function(){
			$(this).css('background-color','#a7c7fc');
		});
	});
	
	$('.cancel').click(function(){
		$('label').each(function(){
			if($(this).hasClass('list-selected'))
				$(this).removeClass('list-selected');
		});
		
		$('input').each(function(){
			if($(this).attr('id') != 'certifiId')
				$(this).val('');
		});
	});
	
	$('#districtNum').focus(function(){
		$(this).val('');
		UserMenuTreeService.getSelectedUserDistrictNodes(function(data){
			var tree = new Ext.tree.TreePanel({
				collapsible: true,
				animate:true,
		        title: '组织机构',
				width: 215,
		        autoScroll: true,
		        split: true,
		        id : 'orgTree',
		        name : 'orgTree',
		        lines:true,
		        loader: new Ext.tree.TreeLoader(),
		        root: new Ext.tree.AsyncTreeNode({
		        	text : 'Autos',
		        	expanded : false ,
		            draggable : false,
		            id : 'source',
		            icon : 'next.gif',
		            children : data
		        }),
		        rootVisible: false
			});
			tree.on({
				dblclick : {
					stopEvent : true,
					fn : function(n,e){
						var leaf = n.leaf;
						if(leaf){
							$('#districtNum').val(n.id);
							win.close();
						}
					}
				}
			});
			var win = new Ext.Window({
				width : 250,
				height : 300,
				items : [tree],
				autoScroll: true
			});
			win.show(this);
		});
	});
	
	var isNull = function(val){
		if(val == null || val == '')
			return true;
		return false;
	}
	
	certificateObj.validNumber('valNum');
	function valid(){
		var msg = '';
		$('.validInputNull').each(function(){
			var val = $(this).val();
			if(val == ''){
				msg += $(this).parent('td').prev('td').html() + '、';
				var len = msg.length;
				if(len % 20 == 0)
					msg += '<br/>';
			}
		});
		$('.validLabelSelected').each(function(){
			var flag = true;
			$(this).children('label').each(function(){
				if($(this).hasClass('list-selected')){
					flag = false;
				}
			});
			if(flag){
				msg += $(this).parent('td').prev('td').html() + '、';
				var len = msg.length;
				if(len % 20 == 0)
					msg += '<br/>';
			}
		});
		
		$('.validBorthAddress').each(function(){
			var flag = false;
			$(this).children('input').each(function(){
				if($(this).val() == ''){
					flag = true;
				}
			});
			if(flag){
				msg += $(this).parent('td').prev('td').html() + '、';
				var len = msg.length;
				if(len % 20 == 0)
					msg += '<br/>';
			}
		});
		if(msg != '')
			msg = msg.substring(0,msg.length - 1) + '必须填写';
		return msg;
	}
	
	$('.save').click(function(){
		if(isNull($('#districtNum').val())){
			Ext.Msg.alert('提示','必须选择所属行政区划');
		}else{
			var msg = valid();
			if(msg == ''){
				var json = '{';
				$('input').each(function(){
					var id = $(this).attr('id');
					if(id != ''){
						var val = $(this).val();
						json = json + '"' + id + '":"' + val + '",';
					}
				});
				$('label').each(function(){
					if($(this).hasClass('list-selected')){
						var id = $(this).parent('div').attr('id');
						var val = $(this).html();
						json = json + '"' + id + '":"' + val + '",';
					}
				});
				json = json.substring(0,json.length - 1) + '}';
				BirthCertificateMsgService.save(json,function(data){
					if(data){
						if(type == 3){
							Ext.Msg.show({
								title:'提示',
								msg: '保存成功',
								buttons: Ext.Msg.OK,
								animEl: 'elId',
								icon: Ext.MessageBox.QUESTION
							});
						}else{
							Ext.Msg.show({
								title:'提示',
								msg: '保存成功，是否打印出生证明？',
								buttons: Ext.Msg.YESNO,
								animEl: 'elId',
								icon: Ext.MessageBox.QUESTION,
								fn : function(e){
									if(e == 'yes'){
										printObj.printPreview(generateJson(),0);
										showPromptPrintSuccess();
									}
								}
							});
						}
						print = 0;
					}
				});
			}else{
				Ext.Msg.alert('提示',msg);
			}
		}
	});
	//打印预览
	$('.printPreview').click(function(){
		printObj.printPreview(generateJson(),0);
		showPromptPrintSuccess();
	});
	
	//打印数据获取
	function generateJson(){
		//性别
		var sex = "";
		$("#sex label").each(function(){
			if($(this).hasClass('list-selected')){
				sex = $(this).html();
			}
		});
		var male = '';
		var female = '';
		if(sex == '男'){
			male = '√';
		}else if(sex == '女'){
			female = '√';
		}
		
		//出生日期
		var birthday = $('#birthday').val();
		var dBirthday = new Date(birthday.replace(/-/g, "/"));;
		var years = dBirthday.getFullYear();
		var month = dBirthday.getMonth() + 1;
		var day = dBirthday.getDate();
		var hour = dBirthday.getHours();
		var minute = dBirthday.getMinutes();
		
		//出生地
		var province = $('#province').val();
		var city = $('#city').val();
		var county = $('#county').val();
		var township = $('#township').val();
		
		//健康状况
		var healthStatus = '';
		$('#healthStatus label').each(function(){
			if($(this).hasClass('list-selected')){
				healthStatus = $(this).html();
			}
		});
		var well = '';
		var normal = '';
		var weak = '';
		if(healthStatus == '良好'){
			well = '√';
		}else if(healthStatus == '一般'){
			normal = '√';
		}else if(healthStatus == '差'){
			weak = '√';
		}
		
		//出生机构
		var borthAddressCategory = -1;
		$('#borthAddressCategory label').each(function(i){
			if($(this).hasClass('list-selected')){
				borthAddressCategory = i;
			}
		});
		var generalHospital = '';
		var MCHhospital = '';
		var home = '';
		var other = '';
		var otherRemark = '';
		if(borthAddressCategory == 0){
			generalHospital = '√';
		}else if(borthAddressCategory == 1){
			MCHhospital = '√';
		}else if(borthAddressCategory == 2){
			home = '√';
		}else if(borthAddressCategory == 3){
			other = $('#otherBorthAddressCategory').val();
			otherRemark = '√';
		}
		
		//签发日期
		var issuingDate = $('#issuingDate').val();
		var dissuingDate = new Date(issuingDate.replace(/-/g, "/"));
		var issueYear = dissuingDate.getFullYear();
		var issueMonth = dissuingDate.getMonth() + 1;
		var issueDay = dissuingDate.getDate();
		
		//打印的json串
		var jsonPrint = {
			fullNamfOfbaby : $('#name').val(),//新生儿姓名
			male : male,
			female : female,
			sex : sex,
			years : years,
			months : month,
			day : day,			
			hour : hour,
			minute : minute,
			province :province.replace("省",""),
			city : city.replace("市",""),
			county : county.replace("县",""),
			township : township,
			birthPlace : county + township,
			weeks :$('#borthWeekly').val(),//孕周
			well : well,
			normal : normal,
			weak : weak,
			weight : $('#weight').val(),//体重
			height :$('#height').val(),//身长
			motherName :$('#motherName').val(),//母亲姓名
			motherAge :$('#motherAge').val(),//母亲年龄
			motherNationality :$('#motherNationality').val(),//母亲国籍
			motherNation : $('#motherNation').val(),//母亲民族
			motherIdCard : $('#motherIdCard').val(),//母亲身份证号
			fatherName :$('#fatherName').val(),//父亲姓名
			fatherAge : $('#fatherAge').val(),//父亲年龄
			fatherNationality : $('#fatherNationality').val(),//父亲国籍
			fatherNation : $('#fatherNation').val(),//父亲民族
			fatherIdCard : $('#fatherIdCard').val(),//父亲身份证号
			generalHospital : generalHospital,
			MCHhospital : MCHhospital,
			home : home,
			otherRemark : otherRemark,
			other : other,
			nameOfFacility : $('#borthOrganization').val(),//接生机构
			issueYear :issueYear,
			issueMonth : issueMonth,
			issueDay : issueDay,
			familyAddress : $('#familyAddress').val(),//家庭住址
			widwife : $('#widwife').val()// 接生人员
		}
		return jsonPrint;
	}
});