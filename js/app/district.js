Ext.ns("app");

app.districtPanel = new Ext.tf.OrgTreePanel({
  title: '行政区域维护',
  rootNodeData: Ext.tf.currentUser.district,
  
  saveFn: UserMenuTreeService.saveDistrict,
  deleteFn: UserMenuTreeService.removeDistrict,
  treeLoaderFn: UserMenuTreeService.getDistricts,
  
  formItems : [
     { fieldLabel: '父级ID', name: 'parentId' },
     { fieldLabel: '父级名称', name: 'parentName', readOnly: true },
     { fieldLabel: '层级', name: 'level', readOnly: true},
     { fieldLabel: 'ID', name: 'id',allowBlank : false},
     { fieldLabel: 'flag', name: 'flag',xtype:'hidden',value:'1'},
     { fieldLabel: '名称', name: 'name' },
     { fieldLabel: '描述', name: 'description', xtype:'textarea', width: 160},
     { fieldLabel: '助记码', name: 'namePng' },
     { fieldLabel: '组织机构', name:'org.name', refName: 'orgId', 
         xtype: 'popselect',
         queryUrl : UserMenuTreeService.findOrgs.createDelegate(this),
         queryConfig : [
           { fieldLabel : '组织机构名称', name : 'name' }
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
     { fieldLabel: '组织机构ID', name: 'orgId', xtype: 'hidden',value :'0'}

   ]
});
//_tab = ModuleMgr.register(app.districtPanel);
ModuleMgr.register(app.districtPanel);

