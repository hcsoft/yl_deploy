Ext.ns('app')

app.birthCertifiQuery = new Ext.tf.BirthCertifiQueryPanel({
	queryUrl : summaryService.queryBirthCertificate,
	printUrl : DataExportService.dataExportAllRegisterBaby,
	readerConfig : [ {
		name : 'certifiId'
	}, {
		name : 'name'
	}, {
		name : 'sex'
	}, {
		name : 'birthday'
	}, {
		name : 'borthWeekly'
	}, {
		name : 'healthStatus'
	}, {
		name : 'motherName'
	}, {
		name : 'motherIdCard'
	}, {
		name : 'fatherName'
	}, {
		name : 'fatherIdCard'
	}, {
		name : 'familyAddress'
	},{
		name : 'isEffectived'
	},{
		name : 'borthOrganization'
	},{
		name : 'linkmanTel'
	}],
	gridCmConfig : [{
		"header" : "状态",
		"dataIndex" : "isEffectived",
		"id" : "isEffectived",
		"renderer": function(v){
			if(v == 0){
				return '未分配';
			}else if(v == 1){
				return '未使用';
			}else if(v == 2){
				return '已使用';
			}else if(v == 3){
				return '已作废';
			}else if(v == 4){
				return '已归档';
			}
		},
		"width" : 50
	}, {
		"header" : "出生医学证明编号",
		"dataIndex" : "certifiId",
		"id" : "certifiId",
		locked : true,
		"width" : 100
	}, {
		"header" : "新生儿姓名",
		"dataIndex" : "name",
		"id" : "name",
		"width" : 100
	}, {
		"header" : "性别",
		"dataIndex" : "sex",
		"id" : "sex",
		"width" : 100
	}, {
		"header" : "出生日期",
		"dataIndex" : "birthday",
		"renderer": Ext.util.Format.dateRenderer('Y-m-d'),
		"id" : "birthday",
		"width" : 100
	}, {
		"header" : "孕周",
		"dataIndex" : "borthWeekly",
		"id" : "borthWeekly",
		"width" : 100
	}, {
		"header" : "新生儿出生状况",
		"dataIndex" : "healthStatus",
		"id" : "healthStatus",
		"width" : 100
	}, {
		"header" : "母亲姓名",
		"dataIndex" : "motherName",
		"id" : "motherName",
		"width" : 100
	}, {
		"header" : "母亲身份证号码",
		"dataIndex" : "motherIdCard",
		"id" : "motherIdCard",
		"width" : 100
	}, {
		"header" : "父亲姓名",
		"dataIndex" : "fatherName",
		"id" : "fatherName",
		"width" : 100
	}, {
		"header" : "父亲身份证号码",
		"dataIndex" : "fatherIdCard",
		"id" : "fatherIdCard",
		"width" : 100
	}, {
		"header" : "接生单位",
		"dataIndex" : "borthOrganization",
		"id" : "borthOrganization",
		"width" : 100
	},{
		"header" : "联系人电话",
		"dataIndex" : "linkmanTel",
		"id" : "linkmanTel",
	}, {
		"header" : "家庭住址",
		"dataIndex" : "familyAddress",
		"id" : "familyAddress",
		"width" : 100
	}]
});
_tab = ModuleMgr.register(app.birthCertifiQuery);