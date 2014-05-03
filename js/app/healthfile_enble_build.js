Ext.ns("app");

app.healthfileEnbleBuildPanel = new Ext.tf.HealthPanel({
	treeLoaderFn : UserMenuTreeService.getUserDistrictNodes,
	queryUrl : UserMenuTreeService.findHealthFilesEnableBuild,
	// deleteUrl : UserMenuTreeService.removeHealthFiles,
	title : '可建妇保手册的档案',
	detailUrl : '/healthfileEnableBuild.html',
	recordId : 'fileNo',
	recordPk : 'fileNo',
	panelId : 'app.healthfileEnbleBuildPanel',
	isMaternal : true,
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
		name : 'personalInfo_linkman',
		mapping : 'personalInfo.linkman'
	}, {
		name : 'paperFileNo',
		mapping : 'paperFileNo'
	}, {
		name : 'personalInfo_tel',
		mapping : 'personalInfo.tel'
	} ],
	gridCmConfig : [ {
		"header" : "档案编号",
		"dataIndex" : "fileNo",
		"width" : 200
	}, {
		"header" : "姓名",
		"dataIndex" : "name"
	}, {
		"header" : "性别",
		"dataIndex" : "personalInfo_sex",
		"width" : 50
	}, {
		"header" : "生日",
		"dataIndex" : "personalInfo_birthday",
		"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
	}, {
		"header" : "身份证号",
		"dataIndex" : "personalInfo_idnumber"
	}, {
		"header" : "联系人",
		"dataIndex" : "personalInfo_linkman"
	}, {
		"header" : "住址",
		"dataIndex" : "address"
	}, {
		"header" : "纸质档案号",
		"dataIndex" : "paperFileNo"
	}, {
		"header" : "电话",
		"dataIndex" : "personalInfo_tel"
	} ],

	getAddParams : function() {
		var selections = this.grid.getSelections();
		console.log(selections);
		if (selections.length > 0) {
			var fileNo = escape(selections[0].data.fileNo);
			var name = escape(selections[0].data.name);
			var birthday = calculateTimeObj.dateToStr(selections[0].data.personalInfo_birthday);
			var tel = escape(selections[0].json.tel);
			var provence = escape('云南');
			var city = escape('昆明');
			var county = escape('');
			var township = escape(selections[0].json.township);
			var village = escape(selections[0].json.village);
//			console.log(Ext.tf.currentUser);
			var buildUnit = escape(Ext.tf.currentUser.org.name);
			var idnumber = escape(selections[0].data.personalInfo_idnumber);
			var workUnit = escape(selections[0].json.personalInfo.workUnit);
			var occupation = escape(selections[0].json.personalInfo.occupation);
			var folk = escape(selections[0].json.personalInfo.folk);
			var folkOther = escape(selections[0].json.personalInfo.folkOther);
			var param = '?fileNo=' + fileNo + '&name=' + name + '&birthday=' + birthday + '&tel=' + tel + 
				'&addressProvence=' + provence + '&addressCity=' + city + '&addressCounty=' + county +
				'&addressTownship=' + township + '&addressVillage=' + village +
				'&residenceProvence=' + provence + '&residenceCity=' + city + '&residenceCounty=' + county +
				'&residenceTownship=' + township + '&residenceVillage=' + village +
				'&recuperateProvence=' + provence + '&recuperateCity=' + city + '&recuperateCounty=' + county +
				'&recuperateTownship=' + township + '&recuperateVillage=' + village +
				'&buildUnit=' + buildUnit + '&idnumber=' + idnumber + '&workUnit=' + workUnit +
				'&occupation=' + occupation + '&folk=' + folk + '&folkOther=' + folkOther ;
//				+ '&quitAfterSave=true';
			return param;
		} else {
			return '-1';
		}
	}
});

_tab = ModuleMgr.register(app.healthfileEnbleBuildPanel);
