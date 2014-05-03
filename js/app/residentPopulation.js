Ext.ns("app");

Ext.onReady(function(){
	var data = new Array();

	var date = new Date();
	var year = date.getFullYear() + 1;
	for(var i = 0;i<5;i++){
		var tmpData = new Array();
		tmpData[0] = year - i;
		tmpData[1] = tmpData[0] + '年';
		data[i] = tmpData;
	}
	
	var store =  new Ext.data.SimpleStore({
		fields :  ['value', 'text'],
		data : data
	});
	var comboYears = new Ext.form.ComboBox({
		mode : 'local',
		store : store,
		valueField : 'value',
		displayField : 'text',
		fieldLabel : '年份',
		allowBlank : false,
		selectOnFocus : true,
		forceSelection : true,
		editable : false,
		triggerAction : 'all',
		name : 'years',
		id : 'years',
		emptyText : '请选择...'
	});
	
	app.residentPopulationPanel = new Ext.tf.SimplePanel({
		//title : '模块管理',
		border : false,
		pageSize : 10,
		queryUrl : ModuleService.findResidentPopulation.createDelegate(this),
		editUrl : ModuleService.editResidentPopulation.createDelegate(this),
//		deleteUrl : ModuleService.removeResidentPopulation.createDelegate(this),
		
		// 查询条件Form
		queryConfig : [{
					fieldLabel : '卫生院名称',
					xtype : 'DWRCombo',
					optionName : 'Taxorgcode',
					hiddenName : 'name',
					hasEmptyHeader : true,
					minListWidth : 200
				}],

		// 编辑详细，包括新增和修改的Form
		editConfig : [{
					fieldLabel : 'ID',
					name : 'id',
					xtype : 'hidden'
				}, {
					name : 'orgId',
					xtype : 'hidden',
					id : 'orgId'
				},{
					fieldLabel : '卫生院名称',
					xtype : 'DWRCombo',
					optionName : 'Taxorgcode',
					hasEmptyHeader : true,
					minListWidth : 200,
					name : 'name',
					id : 'hospitalName',
					selectOnFocus : true,
					forceSelection : true,
					editable : false
				},comboYears, {
					fieldLabel : '常住居民人口数',
					allowBlank : false,
					name : 'populationNumber'
				}, {
					fieldLabel : '城镇居民人口数',
					allowBlank : false,
					name : 'townNumber'
				}, {
					fieldLabel : '农村居民人口数',
					allowBlank : false,
					name : 'farmNumber'
				}],

		// Grid 读取数据时的reader
		readerConfig : [{
					name : 'id',
					mapping : 'id'
				},{
					name : 'name',
					mapping : 'name'
				}, {
					name : 'years',
					mapping : 'years'
				}, {
					name : 'populationNumber',
					mapping : 'populationNumber'
				}, {
					name : 'townNumber',
					mapping : 'townNumber'
				}, {
					name : 'farmNumber',
					mapping : 'farmNumber'
				}],

		// Grid的列
		gridCm : [{
					"header" : "卫生院名称",
					"sortable" : true,
					"dataIndex" : "name"
				}, {
					"header" : "年份",
					"dataIndex" : "years",
					"sortable" : true,
					width : 50
				}, {
					"header" : "常住居民人口数",
					"dataIndex" : "populationNumber"
				}, {
					"header" : "城镇居民人口数",
					"dataIndex" : "townNumber"
				}, {
					"header" : "农村居民人口数",
					"dataIndex" : "farmNumber"
				}]
	});
	ModuleMgr.register(app.residentPopulationPanel);
	Ext.getCmp('hospitalName').on('select',function(){
		Ext.getCmp('orgId').setValue(Ext.getCmp('hospitalName').getValue());
	});
});



	


