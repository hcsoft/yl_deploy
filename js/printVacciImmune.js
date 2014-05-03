(function(){
	printVacciImmuneObj = {
		print : print,
		printVacciImmune : printVacciImmune
	}
	
	function showPromptPrintSuccess(vacciImmnueId){
		Ext.Msg.show({
			title:'提示',
			msg: '是否打印成功？',
			buttons: Ext.Msg.YESNO,
			animEl: 'elId',
			icon: Ext.MessageBox.QUESTION,
			fn : function(e){
				if(e == 'yes'){
//					BirthCertificateMsgService.printSuccess(vacciImmnueId);
				}
			}
		});
		
	}	
	
	//打印数据获取
	function generateJson(data){
		var fileNo = data.fileNo;
		var name = data.vname;
		var sex = data.vsex;
		var male = '';
		var female = '';
		if(sex == '男'){
			male = '√';
		}else if(sex == '女'){
			female = '√';
		}
		var birthday = data.vbirthday;
		var year = '';
		var month = '';
		var day = '';
		var hours = '';
		var minutes = '';
		if(birthday != null){
			year = birthday.getFullYear();
			month = birthday.getMonth() + 1;
			day = birthday.getDate();
			hours = birthday.getHours();
			minutes = birthday.getMinutes();
		}
		var weight = data.vweight
		var county = data.vcensusAddressCounty;
		var township = data.vcensusAddressTown;
		var village = data.vcensusAddressVillage;
		var address = data.vfamilyAddress;
		var fname = data.vfatherName;
		var mname = data.vmotherName;
		var fworkUnit = data.vfatherWorkUnit;
		var mworkUnit = data.vmotherWorkUnit;
		var ftel = data.vfatherPhone;
		var mtel = data.vmotherPhone;
		var movedDate = data.vmovedDate;
		var moveYear = '';
		var moveMonth = '';
		var moveDay = '';
		if(movedDate != null){
			moveYear = movedDate.getFullYear();
			moveMonth = movedDate.getMonth() + 1;
			moveDay = movedDate.getDate();
		}
		var moveAddress = data.vmovedAddress;
		var buildCardDate = data.vbuildCardDate;
		var cardYear = '';
		var cardMonth = '';
		var cardDay = '';
		if(buildCardDate != null){
			cardYear = buildCardDate.getFullYear();
			cardMonth = buildCardDate.getMonth() + 1;
			cardDay = buildCardDate.getDate();
		}
		var buildCardPerson = data.vbuildCardPerson;
		var unitTel = data.vvacciUnit;
		var unit = data.vcertifiUnit;	
		//打印的json串
		var jsonPrint = {
			fileNo : fileNo,
			name : name,
			male : male,
			female : female,
			year : year,
			month : month,
			day : day,
			hours : hours,
			minutes : minutes,
			weight : weight,
			county : county,
			township : township,
			village : village,
			address : address,
			fname : fname,
			mname : mname,
			fworkUnit : fworkUnit,
			mworkUnit : mworkUnit,
			ftel : ftel,
			mtel : mtel,
			moveYear : moveYear,
			moveMonth : moveMonth,
			moveDay : moveDay,
			moveAddress : moveAddress,
			cardYear : cardYear,
			cardMonth : cardMonth,
			cardDay : cardDay,
			buildCardPerson : buildCardPerson,
			unitTel : unitTel,
			unit : unit
		}
		$.each(jsonPrint,function(key,value){
			if(value == null){
				jsonPrint[key] = '';
			}
		});
		return jsonPrint;
	}
	
	function printVacciImmune(data){
		var jsonPrint = generateJson(data);
		printObj.printPreview(jsonPrint,1);
//		showPromptPrintSuccess(data.id);
	}
	
	function print(vacciImmnueId){
		Ext.Msg.show({
			title:'提示',
			msg: '保存成功，是否打印儿童预防接种证基本信息？',
			buttons: Ext.Msg.YESNO,
			animEl: 'elId',
			icon: Ext.MessageBox.QUESTION,
			fn : function(e){
				if(e == 'yes'){
					VaccinationService.getVaccineImmune(vacciImmnueId,function(data){
						if(data != null){
							printVacciImmune(data);
						}
					});
				}
			}
		});
		
	}
})();