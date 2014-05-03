Ext.ns("app");

app.orgPanel = new Ext.tf.OrgTreePanel({
  title: '组织机构维护',
  rootNodeData: Ext.tf.currentUser.org,
  
  saveFn: UserMenuTreeService.saveOrg,
  deleteFn: UserMenuTreeService.removeOrg,
  treeLoaderFn: UserMenuTreeService.getOrgs,
  formItems : [
     { fieldLabel: '父级ID', name: 'parentId'},
     { fieldLabel: '层级', name: 'level'},
     { fieldLabel: 'ID', name: 'id', readOnly: true},
     { fieldLabel: 'flag', name: 'flag',xtype:'hidden',value:'0'},
     { fieldLabel: '名称', name: 'name' },
     { fieldLabel: '地址', name: 'address' },
     { fieldLabel: '邮编', name: 'postcode' },
     { fieldLabel: '电话', name: 'telNumber' },
     { fieldLabel: '传真', name: 'faxNumber' },
     { fieldLabel: '描述', name: 'description', xtype:'textarea', width: 160},
     { fieldLabel: '助记码', name: 'namePng' },
     { fieldLabel: '行政区域', name:'district.name', refName: 'districtNumber', 
         xtype: 'popselect',
         queryUrl : UserMenuTreeService.findDistricts.createDelegate(this),
         queryConfig : [
           { xtype: 'hidden', name : 'id', value: Ext.tf.currentUser.districtId },
           { fieldLabel : '行政区域名称', name : 'name' }
         ],
         readerConfig : [
           { name : 'id', mapping : 'id' },
           { name : 'name', mapping : 'name' }
         ],
         gridCm : [
           { "header" : "ID", "dataIndex" : "id" },
           { "header" : "名称", "dataIndex" : "name" }
         ]
     },
     { fieldLabel: '行政区域ID', name: 'districtNumber', xtype: 'hidden'}

   ]
});
_tab = ModuleMgr.register(app.orgPanel);

