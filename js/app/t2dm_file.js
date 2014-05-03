Ext.ns("app");

app.t2dmFilePanel = new Ext.tf.HealthPanel({
	title : '2型糖尿病患者档案',
	treeLoaderFn : UserMenuTreeService.getUserDistrictNodes,
	queryUrl : UserMenuTreeService.findDiabetesHealthFiles,
	deleteUrl : UserMenuTreeService.removeHealthFiles,
	diseaseId : 3,
	panelId : 'app.t2dmFilePanel',
	dataExportUrl : '2型糖尿病患者档案导出',
	gridViewConfig : {
		forceFit : true,
		getRowClass : function(record, rowIndex, rowParams, store) {
			console.log(rowIndex);
			if (rowIndex % 2 == 0) {
				return 'my_row_odd';
			} else {
				return 'my_row_even';
			}
		}
	},
	title : '居民健康档案',
	detailUrl : '/personalInfo.html',
	queryType : 'demo',
	recordId : 'fileNo',
	recordPk : 'fileNo',

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
		name : 'paperFileNo',
		mapping : 'paperFileNo'
	}, {
		name : 'personalInfo_tel',
		mapping : 'personalInfo.tel'
	} ],
	gridCmConfig : [ {
		"header" : "状态",
		renderer : addTooltip,
		"width" : 80
	}, {
		"header" : "档案编号",
		"dataIndex" : "fileNo",
		"width" : 160
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

		var node = this.getTreeSelNode();

		var districtNumber = node.id;
		var township = '';
		if (node.parentNode) {
			township = escape(node.parentNode.text);
			if (township == 'root')
				township = escape(node.attributes.data.parentName);
		}
		var village = escape(node.text);

		var param = '?districtNumber=' + districtNumber + '&township='
				+ township + '&village=' + village;
		return param;
	}
});

_tab = ModuleMgr.register(app.t2dmFilePanel);
