//{
var itemRec = new Ext.data.Record.create([ {
	name : 'code',
	mapping : 'id'
}, {
	name : 'desc',
	mapping : 'name'
} ]);

/**
 * 取得所有角色
 */
var fromStoreAll = new Ext.data.Store({
	proxy : new Ext.ux.data.DWRProxy({
		dwrFunction : UserService.findAllRoles
	}),
	reader : new Ext.data.ArrayReader({}, itemRec)
});

var formSubmiter = function() {
	userGrid.selModel.clearSelections();
	store.load();
}

var addUser = function() {

	var saveNewUser = function() {
		var formBean = editForm.getForm().getValues(false);
		if (formBean.password != formBean.dupPassword) {
			Ext.Msg.alert('校验错误', '两次密码不一致');
			editForm.getComponent('password').markInvalid();
			editForm.getComponent('DupPassword').markInvalid();
			return false;
		}

		if (formBean.validFlag)
			formBean.validFlag = 1;
		else
			formBean.validFlag = 0;
		
		if (formBean.isLookAuthority)
			formBean.isLookAuthority = 1;
		else
			formBean.isLookAuthority = 0;

		formBean.user = {};
		formBean.user = formBean;
		if (!Ext.isEmpty(formBean.typeList) && !Ext.isArray(formBean.typeList)) {
			formBean.user.typeList = [ formBean.typeList ];
		}
		var rolesArray = formBean.roles.split(",");
		formBean.roles = rolesArray;

		if (editForm.getForm().isValid()) {
			UserService.saveNewUser(formBean, function(res) {
				Ext.Msg.alert('', '保存完成');
			});

		}
	}

	var editForm = new Ext.FormPanel({
		// width:auto,
		title : '',
		defaultType : 'textfield',
		autoHeight : true,
		border : false,
		hidden : false,
		frame : true,
		monitorValid : true,
		items : [ {
			fieldLabel : '用户ID',
			name : 'loginname',
			allowBlank : false
		}, {
			fieldLabel : '用户名称',
			name : 'username',
			allowBlank : false
		}, {
			fieldLabel : '密码',
			name : 'password',
			id : 'password',
			inputType : 'password',
			allowBlank : false
		}, {
			fieldLabel : '重复密码',
			name : 'dupPassword',
			id : 'DupPassword',
			inputType : 'password',
			allowBlank : false
		}, {
			fieldLabel : '是否有效',
			name : 'validFlag',
			xtype : 'checkbox'
		}, {
			fieldLabel : '人员属性',
			xtype : 'checkboxgroup',
			columns : [ 200, 150, 150, 200 ],
			items : [ {
				boxLabel : '一般操作人员',
				name : 'typeList',
				inputValue : 1
			}, {
				boxLabel : '医生',
				name : 'typeList',
				inputValue : 2
			}, {
				boxLabel : '护士',
				name : 'typeList',
				inputValue : 4
			}, {
				boxLabel : '公卫医师',
				name : 'typeList',
				inputValue : 8
			} ]
		}, {
			fieldLabel : '所属组织机构',
			xtype : 'popselect',
			allowBlank : false,
			refName : 'orgId',
			queryUrl : UserMenuTreeService.findOrgs.createDelegate(this),
			queryConfig : [ {
				fieldLabel : '组织机构名称',
				name : 'name'
			} ],
			readerConfig : [ {
				name : 'id',
				mapping : 'id'
			}, {
				name : 'name',
				mapping : 'name'
			} , {
                name : 'district.name',
                mapping : 'district.name'
            }, {
                name : 'district.parentName',
                mapping : 'district.parentName'
            } ],
			gridCm : [ {
				"header" : "ID",
				"dataIndex" : "id",
                "sortable" : "true"
			}, {
				"header" : "名称",
				"dataIndex" : "name",
                "sortable" : "true"
			} , {
                "header" : "上级机构",
                "dataIndex" : "district.name",
                "sortable" : "true"
            } , {
                "header" : "上上级机构",
                "dataIndex" : "district.parentName",
                "sortable" : "true"
            }  ],
			name : 'org.name'
		}, {
			name : 'orgId',
			xtype : 'hidden'
		}, {
			fieldLabel : '行政区域',
			name : 'district.name',
			refName : 'districtId',
			xtype : 'popselect',
			queryUrl : UserMenuTreeService.findDistricts.createDelegate(this),
			queryConfig : [ {
				fieldLabel : '行政区域名称',
				name : 'name'
			} ],
			readerConfig : [ {
				name : 'id',
				mapping : 'id'
			}, {
				name : 'name',
				mapping : 'name'
			} ],
			gridCm : [ {
				"header" : "ID",
				"dataIndex" : "id"
			}, {
				"header" : "名称",
				"dataIndex" : "name"
			} ]
		}, {
			fieldLabel : '行政区域ID',
			name : 'districtId',
			xtype : 'hidden'
		}, {
			fieldLabel : '特殊权限',
			name : 'isLookAuthority',
			xtype : 'checkbox',
			boxLabel : '查看下级机构统计数据'
		}, {
			xtype : "itemselector",
			name : "roles",
			fieldLabel : "用户角色",
			dataFields : [ "code", "desc" ],
			toData : [],
			msWidth : 250,
			msHeight : 200,
			valueField : "code",
			displayField : "desc",
			imagePath : "/resources/multiselect/",
			toLegend : "当前角色",
			fromLegend : "可用角色",
			fromStore : fromStoreAll,
			drawUpIcon : false,
			drawDownIcon : false,
			drawTopIcon : false,
			drawBotIcon : false,
			toTBar : [ {
				text : "清除",
				handler : function() {
					var i = editForm.getForm().findField("roles");
					i.reset.call(i);
				}
			} ]
		} ],
		buttons : [ {
			text : '保存',
			formBind : true,
			scope : this,
			keys : [ {
				key : [ 10, 13 ],
				fn : saveNewUser
			} ],
			handler : saveNewUser
		}, {
			text : '取消',
			scope : this,
			handler : function() {
				// editWin.close();
				editWin.hide();
			}
		} ]
	});

	var editWin = new Ext.Window({
		title : '新增用户',
		closeAction : 'close',
		modal : true,
		autoHeight : true,
		width : 750,
		items : [ editForm ]
	})

	editWin.show();
	fromStoreAll.load();

}

var queryForm = new Ext.FormPanel({
	region : 'north',
	// autoHeight : true,
	labelWidth : 75,
	height : 100,
	frame : true,
	title : '查询条件',
	bodyStyle : 'padding:5px 5px 0',
	// width : 200,
	defaults : {
		width : 230
	},
	defaultType : 'textfield',
	items : [ {
		columnWidth : 1,
		fieldLabel : '用户ID',
		name : 'loginname',
		allowBlank : true
	} ],

	buttons : [ {
		text : '查询',
		formBind : true,
		scope : this,
		handler : formSubmiter
	}, {
		text : '新增用户',
		handler : addUser
	} ],
	keys : [ {
		key : [ 10, 13 ],
		fn : formSubmiter
	} ]

});

var reader = new Ext.data.JsonReader({
	totalProperty : "totalSize",
	root : "data",
	id : "user.loginname"
}, Ext.data.Record.create([ {
	name : 'validFlag',
	mapping : 'user.validFlag',
	type : 'string'
}, {
	name : 'loginname',
	mapping : 'user.loginname',
	type : 'string'
}, {
	name : 'username',
	mapping : 'user.username',
	type : 'string'
}, {
	name : 'districtId',
	mapping : 'user.districtId',
	type : 'string'
}, {
	name : 'orgId',
	mapping : 'user.orgId',
	type : 'string'
}, {
	name : 'typeList',
	mapping : 'user.typeList'
}, {
	name : 'district',
	mapping : 'user.district'
}, {
	name : 'org',
	mapping : 'user.org'
},{
	name : 'isLookAuthority',
	mapping : 'user.isLookAuthority',
	type : 'int'
} ]));

var store = new Ext.data.Store({
	proxy : new Ext.ux.data.DWRProxy({
		dwrFunction : UserService.findUsers,
		listeners : {
			'beforeload' : function(dataProxy, params) {
				// alert(dwr.util.toDescriptiveString(params, 2));
				var o = queryForm.getForm().getValues(false);
				if (!params.limit)
					params.limit = pagingBar.pageSize;
				params[dataProxy.loadArgsKey] = [ o, params ];
			}
		}
	}),
	reader : reader
});

var pagingBar = new App.PagingToolbar({
	pageSize : 10,
	store : store,
	displayInfo : true,
	displayMsg : '{0} - {1} of {2}',
	emptyMsg : "没有记录"

});

function edit(rec) {
	console.log("rowselect..");
	var fromStore = new Ext.data.Store({
		proxy : new Ext.ux.data.DWRProxy({
			dwrFunction : UserService.findOtherRoles,
			listeners : {
				'beforeload' : function(dataProxy, params) {
					var loginname = editForm.getForm().findField('loginname')
							.getValue();
					params[dataProxy.loadArgsKey] = [ loginname ];
				}
			}
		}),
		reader : new Ext.data.ArrayReader({}, itemRec)
	});
	var toStore = new Ext.data.Store({
		proxy : new Ext.ux.data.DWRProxy({
			dwrFunction : UserService.findRoles,
			listeners : {
				'beforeload' : function(dataProxy, params) {
					var loginname = editForm.getForm().findField('loginname')
							.getValue();
					params[dataProxy.loadArgsKey] = [ loginname ];
				}
			}
		}),
		reader : new Ext.data.ArrayReader({}, itemRec)
	});

	var editForm = new Ext.FormPanel({
		id : '_editForm',
		// width:auto,
		// labelWidth: 90,
		title : '',
		// defaults: {width: 140}, // Default config options for child items
		defaultType : 'textfield',
		autoHeight : true,
		// bodyStyle: Ext.isIE ? 'padding:0 0 5px 15px;' : 'padding:10px
		// 15px;',
		border : false,
		hidden : false,
		frame : true,

		// style: {
		// "margin-left": "10px", // when you add custom margin in IE 6...
		// "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") :
		// "0" // you have to adjust for it somewhere else
		// },
		items : [ {
			fieldLabel : '用户ID',
			name : 'loginname',
			style : 'border:0; background: #DFE8F6 none repeat scroll 0 0;',
			readOnly : true
		}, {
			fieldLabel : '用户名称',
			name : 'username',
			allowBlank : false
		}, {
			fieldLabel : '密码',
			name : 'password',
			value : '',
			inputType : 'password'
		}, {
			fieldLabel : '是否有效',
			name : 'validFlag',
			xtype : 'checkbox'
		}, {
			fieldLabel : '人员属性',
			xtype : 'checkboxgroup',
			id : 'typeList',
			columns : [ 200, 150, 150, 200 ],
			items : [ {
				boxLabel : '一般操作人员',
				name : 'typeList',
				inputValue : 1
			}, {
				boxLabel : '医生',
				name : 'typeList',
				inputValue : 2
			}, {
				boxLabel : '护士',
				name : 'typeList',
				inputValue : 4
			}, {
				boxLabel : '公卫医师',
				name : 'typeList',
				inputValue : 8
			} ]
		}, {
			fieldLabel : '所属组织机构',
			xtype : 'popselect',
			allowBlank : false,
			refName : 'orgId',
			queryUrl : UserMenuTreeService.findOrgs.createDelegate(this),
			queryConfig : [ {
				fieldLabel : '组织机构名称',
				name : 'name'
			} ],
			readerConfig : [ {
				name : 'id',
				mapping : 'id'
			}, {
				name : 'name',
				mapping : 'name'
			} , {
                name : 'district.name',
                mapping : 'district.name'
            } , {
                name : 'district.parentName',
                mapping : 'district.parentName'
            }],
			gridCm : [ {
				"header" : "ID",
				"dataIndex" : "id",
				"sortable" : "true"
			}, {
				"header" : "名称",
				"dataIndex" : "name",
				"sortable" : "true"
			} , {
                "header" : "上级机构",
                "dataIndex" : "district.name",
                "sortable" : "true"
            } , {
                "header" : "上上级机构",
                "dataIndex" : "district.parentName",
                "sortable" : "true"
            }  ],
			name : 'org.name'
		}, {
			name : 'orgId',
			xtype : 'hidden'
		}, {
			fieldLabel : '行政区域',
			name : 'district.name',
			refName : 'districtId',
			xtype : 'popselect',
			queryUrl : UserMenuTreeService.findDistricts.createDelegate(this),
			queryConfig : [ {
				fieldLabel : '行政区域名称',
				name : 'name'
			} ],
			readerConfig : [ {
				name : 'id',
				mapping : 'id'
			}, {
				name : 'name',
				mapping : 'name'
			} ],
			gridCm : [ {
				"header" : "ID",
				"dataIndex" : "id"
			}, {
				"header" : "名称",
				"dataIndex" : "name"
			} ]
		}, {
			fieldLabel : '行政区域ID',
			name : 'districtId',
			xtype : 'hidden'
		}, {
			fieldLabel : '特殊权限',
			name : 'isLookAuthority',
			xtype : 'checkbox',
			boxLabel : '查看下级机构统计数据'
		}, {
			xtype : "itemselector",
			name : "roles",
			fieldLabel : "用户角色",
			dataFields : [ "code", "desc" ],
			toData : [],
			toStore : toStore,
			msWidth : 250,
			msHeight : 200,
			valueField : "code",
			displayField : "desc",
			imagePath : "/resources/multiselect/",
			toLegend : "当前角色",
			fromLegend : "可用角色",
			fromStore : fromStore,
			fromData : [],
			drawUpIcon : false,
			drawDownIcon : false,
			drawTopIcon : false,
			drawBotIcon : false,
			toTBar : [ {
				text : "清除",
				handler : function() {
					var i = editForm.getForm().findField("roles");
					i.reset.call(i);
				}
			} ]
		} ],
		buttons : [
				{
					text : '保存',
					formBind : true,
					scope : this,
					handler : function() {
						var formBean = editForm.getForm().getValues(false);
						console.log(formBean);
						formBean.user = {};
						if (formBean.validFlag)
							formBean.validFlag = 1;
						else
							formBean.validFlag = 0;
						
						if (formBean.isLookAuthority)
							formBean.isLookAuthority = 1;
						else
							formBean.isLookAuthority = 0;
						
						formBean.user = formBean;
						if (!Ext.isEmpty(formBean.typeList)
								&& !Ext.isArray(formBean.typeList)) {
							formBean.user.typeList = [ formBean.typeList ];
						}
						var rolesArray = formBean.roles.split(",");
						formBean.roles = rolesArray;

						if (editForm.getForm().isValid()) {
							var mask = new Ext.LoadMask(Ext.getBody(), {
								msg : '正在更新数据..'
							});
							mask.show();
							UserService.saveUser(formBean, function(res) {
								mask.hide();
								Ext.Msg.alert('', '保存完成', function() {
									// refresh query
									formSubmiter();
									mask.hide();
								});
							});
						}
						;
					}
				}, {
					text : '取消',
					scope : this,
					handler : function() {
						// editWin.close();
						editWin.hide();
					}
				} ]
	})

	var editWin = new Ext.Window({
		title : '用户信息（密码域为空表示不修改密码）',
		closeAction : 'hide',
		modal : true,
		autoHeight : true,
		width : 700,
		items : [ editForm ]
	})

	editWin.show();
	var mask = new Ext.LoadMask(Ext.getBody(), {
		msg : '正在加载数据..'
	});
	mask.show();

	editForm.getForm().loadRecord(rec);

	var typeListValue = rec.get("typeList");
	var typeList = editForm.getForm().findField("typeList");
	var items = typeList.items;
	items.each(function(v) {
		if (typeListValue.indexOf(v.inputValue) != -1)
			v.setValue(true);
	});
	fromStore.load();
	toStore.load();

	mask.hide();
};

var userGrid = new Ext.grid.GridPanel({
	region : 'center',
	id : 'userGrid',
	store : store,
	loadMask : {
		msg : '正在加载数据...'
	},
	cm : new Ext.grid.ColumnModel([ {
		"header" : "用户ID",
		"dataIndex" : "loginname",
		'id' : 'user.loginname',
		"sortable" : "true"
	}, {
		"header" : "用户名称",
		"dataIndex" : "username",
		"sortable" : "true",
		"id" : "username"
	} ]),
	viewConfig : {
		forceFit : true
	},

	width : 500,
	height : 200,
	// autoHeight:true,
	frame : true,
	title : '',
	iconCls : 'icon-grid',
	style : 'position:absolute;top:92px;',
	bbar : pagingBar,
	listeners : {
		'rowdblclick' : function(g, rowIndex, e) {
			var rec = g.getStore().getAt(rowIndex);
			edit(rec);
		}
	},
	sm : new Ext.grid.RowSelectionModel({
		singleSelect : true
	})
});

var userMgrPanel = {
	title : '用户和角色维护',
	closable : true,
	width : 800,
	height : 600,
	layout : 'border',
	items : [ queryForm, userGrid ]
}

// _tab = ModuleMgr.register(panel);
ModuleMgr.register(userMgrPanel);

// store.load();

// }
