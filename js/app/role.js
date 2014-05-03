Ext.ns("app");



app.rolePanel = new Ext.tf.SimplePanel( {
  title : '角色管理',
  pageSize : 10,
  queryUrl : ModuleService.findRoles.createDelegate(this),
  editUrl : ModuleService.editRole.createDelegate(this),
  deleteUrl : ModuleService.removeRoles.createDelegate(this),

  queryConfig : [ {
    fieldLabel : '名称',
    name : 'name',
    allowBlank : true
  } ],

  editConfig : [ {
    fieldLabel : 'ID',
    name : 'id',
    xtype : 'hidden'
  }, {
    fieldLabel : '角色名称',
    name : 'name'
  }, {
    fieldLabel : '描述',
    name : 'descr'
  } ],

  readerConfig : [ {
    name : 'id',
    mapping : 'id'
  }, {
    name : 'name',
    mapping : 'name'
  }, {
    name : 'descr',
    mapping : 'descr'
  } ],

  gridCm : [ {
    "hidden" : true,
    "header" : "ID",
    "sortable" : true,
    "dataIndex" : "id"
  }, {
    "header" : "角色名称",
    "sortable" : true,
    "dataIndex" : "name"
  }, {
    "header" : "描述",
    "sortable" : true,
    "dataIndex" : "descr"
  } ]
});
app.rolePanel.grid.modifyMod = function() {
  var queryRoleMod = ModuleService.findModulesByRole;
  var saveRoleMod = ModuleService.saveRoleModules;

  var selections = this.getSelections();
  if (selections.length == 0) {
      Ext.MessageBox.alert("提示", "请选择一条的记录！");
      return;
  } else if (selections.length != 1) {
      Ext.MessageBox.alert("提示", "不能选择多行设置菜单！");
      return;
  }
  var sel = selections[0];

  var record = Ext.data.Record.create([
    {name:'module.id'},
    {name:'module.name'},
    {name:'module.category.name'},
    {name: 'checked'}
  ]);
  var reader = new Ext.data.JsonReader( {}, record );

  var store = new Ext.data.Store( {
    proxy : new Ext.ux.data.DWRProxy( {
      dwrFunction : queryRoleMod,
      listeners : {
        'beforeload' : function(dataProxy, params) {
          var o = sel.get("id");
          params[dataProxy.loadArgsKey] = [o];
        }
      }
    }),
    reader : reader
  });
  var checkColumn = new Ext.grid.CheckColumn({
    header: "关联",
    dataIndex: 'checked',
    width: 55
  });
  var cm = new Ext.grid.ColumnModel([
    checkColumn,
    {
      header: 'ID',
      hidden : true,
      dataIndex: 'module.id'
    }, {
      header: '模块名称',
      dataIndex: 'module.name'
    }, {
      header: '模块目录名称',
      dataIndex: 'module.category.name'
    }
  ]);

  var grid = new Ext.grid.GridPanel({
    store: store,
    cm: cm,
    width: 490,
    height: 250,
    title: '功能模块对应',
    frame: true,
    plugins: checkColumn,
    tbar: [{
      text: '保存',
      iconCls: 'c_save',
      handler: function() {
        var roleId = sel.get("id");
        var array = [];
        for ( var i=0; i< store.getCount(); i++ ) {
          var record = store.getAt(i);
          var checked = record.get("checked");
          if ( checked ) {
            array.push( record.get("module.id") );
          }
        }
        console.log(array);
        saveRoleMod(
            roleId,
            //Ext.util.JSON.encode(array),
            array,
            function(){
              Ext.MessageBox.alert("提示", "保存完成！");
              store.reload();
            }
        );

      }
    }]
  });

  var win = new Ext.Window( {
    title : '',
    closeAction : 'close',
    modal : true,
    width : 500,
    height : 300,
    items : [ grid ],
    buttons : [ {
      text : '关闭',
      handler : function() {win.close();}
    } ]
  });

  win.show();
  store.load();
};

app.rolePanel.grid.un('rowcontextmenu',app.rolePanel.grid.contextmenu);
app.rolePanel.grid.contextmenu = function(grid, rowIndex, e) {

  e.preventDefault();
  e.stopEvent();

  var updateMenu = new Ext.menu.Item({
    iconCls : 'edit',
    id      : 'updateMenu',
    text    : '修改',
    handler : this.edit.createDelegate(this)
  });

  var deleteMenu = new Ext.menu.Item({
    iconCls : 'delete',
    id      : 'deleteMenu',
    text    : '删除',
    handler : this.del.createDelegate(this)
  });

  var modMenu = new Ext.menu.Item({
    iconCls : 'mod',
    id      : 'modMenu',
    text    : '配置菜单',
    handler : this.modifyMod.createDelegate(this)
  });

  var selections = this.getSelections();

  if (selections.length > 1) {
    updateMenu.disable();
  }

  var menuList = [updateMenu, deleteMenu, modMenu];

  this.grid_menu = new Ext.menu.Menu({
      id    : 'mainMenu',
      items : menuList
  });

  var coords = e.getXY();
  grid.getSelectionModel().selectRow(rowIndex);
  this.grid_menu.showAt([coords[0], coords[1]]);

}.createDelegate(app.rolePanel.grid);
app.rolePanel.grid.on('rowcontextmenu',app.rolePanel.grid.contextmenu,this);

_tab = ModuleMgr.register(app.rolePanel);
app.rolePanel.load();
