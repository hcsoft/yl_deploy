Ext.ns("app");

Ext.onReady(function(){
	var data = [[1,'男'],[0,'女']];	
	
	var store =  new Ext.data.SimpleStore({
		fields :  ['value', 'text'],
		data : data
	});
	var comboSex = new Ext.form.ComboBox({
		mode : 'local',
		store : store,
		valueField : 'value',
		displayField : 'text',
		fieldLabel : '性别',
		allowBlank : false,
		selectOnFocus : true,
		forceSelection : true,
		editable : false,
		triggerAction : 'all',
		name : 'sex',
		id : 'sex',
		width : 50,
		value : '1',
		listWidth : 50
	});
	
	app.doctorsPanel = new Ext.tf.SimplePanel({
		//title : '模块管理',
		border : false,
		pageSize : 10,
		queryUrl : ModuleService.findDoctors.createDelegate(this),
		editUrl : ModuleService.editDoctors.createDelegate(this),
		deleteUrl : ModuleService.removeDoctors.createDelegate(this),
		
		// 查询条件Form
		queryConfig : [{
					fieldLabel : '卫生院名称',
					xtype : 'DWRCombo',
					optionName : 'Taxorgcode',
					hiddenName : 'hospitalPropId',
					hasEmptyHeader : true,
					minListWidth : 200
				}],

		// 编辑详细，包括新增和修改的Form
		editConfig : [{
					fieldLabel : 'ID',
					name : 'id',
					xtype : 'hidden'
				}, {
					name : 'hospId',
					xtype : 'hidden',
					id : 'hospId'
				},{
					fieldLabel : '姓名',
					allowBlank : false,
					name : 'name'
				},comboSex,{
					xtype : 'datefield',
					id : 'birthday',
					name : 'birthday',
					fieldLabel : '出生日期',
					format : 'Y-m-d',
					width : 100
				}, {
					fieldLabel : '联系电话',
					name : 'tel'
				}, {
					fieldLabel : '联系地址',
					name : 'address'
				},{
					fieldLabel : '卫生院名称',
					xtype : 'DWRCombo',
					optionName : 'Taxorgcode',
					hasEmptyHeader : true,
					minListWidth : 200,
					name : 'hospitalName',
					id : 'hospitalName',
					selectOnFocus : true,
					forceSelection : true,
					editable : false
				}],

		// Grid 读取数据时的reader
		readerConfig : [{
					name : 'id',
					mapping : 'id'
				},{
					name : 'name',
					mapping : 'name'
				}, {
					name : 'sex',
					mapping : 'sex'
				}, {
					name : 'birthday',
					mapping : 'birthday'
				}, {
					name : 'hospitalName',
					mapping : 'hospitalName'
				}],

		// Grid的列
		gridCm : [{
					"header" : "姓名",
					"sortable" : true,
					"dataIndex" : "name"
				}, {
					"header" : "性别",
					"dataIndex" : "sex"
				}, {
					"header" : "出生日期",
					"dataIndex" : "birthday",
					renderer : Ext.util.Format.dateRenderer('Y-m-d')
				}, {
					"header" : "所属机构",
					"dataIndex" : "hospitalName"
				}]
	});
	ModuleMgr.register(app.doctorsPanel);
	Ext.getCmp('hospitalName').on('select',function(){
		Ext.getCmp('hospId').setValue(Ext.getCmp('hospitalName').getValue());
	});
});



	


