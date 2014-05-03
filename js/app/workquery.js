Ext.ns("app");

	
app.workQueryPanel = new Ext.tf.WorkQueryPanel({
			//title : '模块管理',
			border : false,
			pageSize : 10,
			queryUrl : ModuleService.findModules.createDelegate(this),
			editUrl : ModuleService.editModule.createDelegate(this),

			// 查询条件Form
			queryConfig : [
			 {
						fieldLabel : '模块目录',
						xtype : 'DWRCombo',
						optionName : 'ModuleCategory',
						hiddenName : 'categoryId',
						hasEmptyHeader : true,
						minListWidth : 200
					}],

			// 编辑详细，包括新增和修改的Form
			editConfig : [{
						fieldLabel : 'ID',
						name : 'id',
						xtype : 'hidden'
					}, {
						name : 'categoryId',
						xtype : 'hidden'
					}, {
						fieldLabel : '名称',
						allowBlank : false,
						name : 'name'
					}, {
						fieldLabel : '模块目录',
						xtype : 'popselect',
						refName : 'categoryId',
						title : '所属模块目录选择',

						queryUrl : ModuleService.findModuleCategory
								.createDelegate(this),
						queryConfig : [{
									fieldLabel : '名称',
									name : 'name'
								}],
						readerConfig : [{
									name : 'id',
									mapping : 'id'
								}, {
									name : 'name',
									mapping : 'name'
								}, {
									name : 'displayOrder',
									mapping : 'displayOrder'
								}],
						gridCm : [{
									"header" : "名称",
									"dataIndex" : "name"
								}, {
									"header" : "顺序",
									"dataIndex" : "displayOrder"
								}],

						name : 'category.name'
					}, {
						fieldLabel : 'URL',
						allowBlank : false,
						name : 'url'
					}, {
						fieldLabel : '顺序',
						allowBlank : false,
						name : 'ordinal'
					}],

			// Grid 读取数据时的reader
			readerConfig : [{
						name : 'id',
						mapping : 'id'
					}, {
						name : 'category.name',
						mapping : 'category.name'
					}, {
						name : 'name',
						mapping : 'name'
					}, {
						name : 'categoryId',
						mapping : 'categoryId'
					}, {
						name : 'url',
						mapping : 'url'
					}, {
						name : 'ordinal',
						mapping : 'ordinal'
					}],

			// Grid的列
			gridCm : [{
						"header" : "名称",
						"sortable" : true,
						"dataIndex" : "name"
					}, {
						"header" : "URL",
						"dataIndex" : "url"
					}, {
						"header" : "模块目录",
						"dataIndex" : "category.name"
					}, {
						"header" : "顺序",
						"dataIndex" : "ordinal"
					}]
		});
 ModuleMgr.register(app.workQueryPanel);



