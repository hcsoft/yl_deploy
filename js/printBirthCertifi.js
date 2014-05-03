(function(){
	printBirthObj = {
		print : print,
		init : init
	}
	
	function showPromptPrintSuccess(birthCertifiId){
		Ext.Msg.show({
			title:'提示',
			msg: '编号：' + birthCertifiId + '是否打印成功？<br/>如果成功，则此出生证明将归档！',
			buttons: Ext.Msg.YESNO,
			animEl: 'elId',
			icon: Ext.MessageBox.QUESTION,
			fn : function(e){
				if(e == 'yes'){
					BirthCertificateMsgService.printSuccess(birthCertifiId);
					sendMessage('quit');
				}else if(e == 'no'){
					sendMessage('quit');
				}
			}
		});
		
	}
	
	function init(){
		$('.birthCertificate').click(function(){
			var url = window.location.search;
			if(url.indexOf('certifiId') > 0){
				var json = UrlParse.parse();
				console.log(json);
				if(json != null){
					var birthCertifiId = json.certifiId;
					BirthCertificateMsgService.getBirthCertificate(birthCertifiId,function(data){
						if(data != null){
							printObj.printPreview(generateJson(data),0);
							showPromptPrintSuccess(birthCertifiId);
						}
					});
				}
			}
		});
	}
	
	
	
	//打印数据获取
	function generateJson(data){
		//性别
		var sex = data.sex;
		var male = '';
		var female = '';
		if(sex == '男'){
			male = '√';
		}else if(sex == '女'){
			female = '√';
		}
		
		//出生日期
		var dBirthday = data.birthday;
		var years = dBirthday.getFullYear();
		var month = dBirthday.getMonth() + 1;
		var day = dBirthday.getDate();
		var hour = dBirthday.getHours();
		var minute = dBirthday.getMinutes();
		
		//出生地
		var province = data.province;
		var city = data.city;
		var county = data.county;
		var township = data.township;
		
		//健康状况
		var healthStatus = data.healthStatus;
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
		var borthAddressCategory = data.borthAddressCategory;
		var generalHospital = '';
		var MCHhospital = '';
		var home = '';
		var other = '';
		var otherRemark = '';
		if(borthAddressCategory == '医院'){
			generalHospital = '√';
		}else if(borthAddressCategory == '妇幼保健院'){
			MCHhospital = '√';
		}else if(borthAddressCategory == '家庭'){
			home = '√';
		}else if(borthAddressCategory == '其它'){
			other = data.otherBorthAddressCategory;
			otherRemark = '√';
		}
		
		//签发日期
		var dissuingDate = data.issuingDate;
		var issueYear = dissuingDate.getFullYear();
		var issueMonth = dissuingDate.getMonth() + 1;
		var issueDay = dissuingDate.getDate();
		
		//打印的json串
		var jsonPrint = {
			fullNamfOfbaby : data.name,//新生儿姓名
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
			weeks :data.borthWeekly,//孕周
			well : well,
			normal : normal,
			weak : weak,
			weight : data.weight,//体重
			height : data.height,//身长
			motherName : data.motherName,//母亲姓名
			motherAge : data.motherAge,//母亲年龄
			motherNationality : data.motherNationality,//母亲国籍
			motherNation : data.motherNation,//母亲民族
			motherIdCard : data.motherIdCard,//母亲身份证号
			fatherName : data.fatherName,//父亲姓名
			fatherAge : data.fatherAge,//父亲年龄
			fatherNationality : data.fatherNationality,//父亲国籍
			fatherNation : data.fatherNation,//父亲民族
			fatherIdCard : data.fatherIdCard,//父亲身份证号
			generalHospital : generalHospital,
			MCHhospital : MCHhospital,
			home : home,
			otherRemark : otherRemark,
			other : other,
			nameOfFacility : data.borthOrganization,//接生机构
			issueYear :issueYear,
			issueMonth : issueMonth,
			issueDay : issueDay,
			familyAddress : data.familyAddress,//家庭住址
			widwife : data.widwife// 接生人员
		}
		return jsonPrint;
	}
	
	function print(birthCertifiId){
		Ext.Msg.show({
			title:'提示',
			msg: '保存成功，是否打印出生医学证明？',
			buttons: Ext.Msg.YESNO,
			animEl: 'elId',
			icon: Ext.MessageBox.QUESTION,
			fn : function(e){
				if(e == 'yes'){
					BirthCertificateMsgService.getBirthCertificate(birthCertifiId,function(data){
						if(data != null){
							printObj.printPreview(generateJson(data),0);
							showPromptPrintSuccess(birthCertifiId);
						}
					});
				}else if(e == 'no'){
					sendMessage('quit');
				}
			}
		});
		
	}
})();