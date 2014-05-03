Ext.ns('app')

app.VaccineImmnuePanel = new Ext.tf.VaccineImmnuePanel({
	queryUrl : UserMenuTreeService.findVaccineImmune,

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
		name : 'address'
	}, {
		name : 'personalInfo_linkman',
		mapping : 'personalInfo.linkman'
	}, {
		name : 'personalInfo_tel',
		mapping : 'personalInfo.tel'
	}, {
		name : 'vaccineImmune',
		mapping : 'vaccineImmune'
	}, {
		name : 'personalInfo',
		mapping : 'personalInfo'
	}, {
		name : 'township'
	}, {
		name : 'village'
	}, {
		name : 'residenceAddress'
	}, {
		name : 'idnumber',
		mapping : 'personalInfo.idnumber'
	} ],
	gridCmConfig : [ {
		"header" : "状态",
		renderer : addTooltipImmnue,
		"width" : 80
	}, {
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
		"header" : "出生日期",
		"dataIndex" : "personalInfo_birthday",
		"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
	}, {
		"header" : "住址",
		"dataIndex" : "address"
	}, {
		"header" : "联系人",
		"dataIndex" : "personalInfo_linkman"
	}, {
		"header" : "联系电话",
		"dataIndex" : "personalInfo_tel"
	}, {
		"header" : "发证日期",
		"dataIndex" : "vaccineImmune",
		"renderer" : function(v) {
			if (v != null) {
				if (v.vbuildCardDate != null)
					return v.vbuildCardDate.format('Y-m-d');
			}
		}
	}]
});
ModuleMgr.register(app.VaccineImmnuePanel);