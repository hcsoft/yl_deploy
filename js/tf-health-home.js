Ext.ns("Ext.tf");

///////////////
//  健康档案模板
///////////////
Ext.tf.HealthPanelHome = Ext.extend(Ext.Panel, {
  closable : true,
  currentNode : null, //当前选择的树节点
  layout: 'fit',
  title: '档案',
  pageSize : 20,
  recordId: 'id',
  recordPk: 'id',
  
  //是否需要在最末级才能增加？
  checkLastLevel : true,
  
  //设置查询url
  queryUrl : Ext.emptyFn,
  deleteUrl : Ext.emptyFn,
  treeLoaderFn : Ext.emptyFn,
  
  getAddParams: function() {
    var node = this.getTreeSelNode();
    var districtNumber = node.id;
    var param = '?districtNumber=' + districtNumber;
    return param;
  },
  
  //设置查询用的类别，比如档案，高血压等。。
  queryType : 'demo',
  detailUrl : '/personalInfo.html',
  readerConfig : [],
  gridCmConfig : [],

  initComponent: function() {
    this.build();
    Ext.tf.HealthPanel.superclass.initComponent.call(this);
  },

  build : function() {
    this.tbar = this.createActions();
    this.items = [ this.createPanel() ];
  },

  /**
   * 编辑功能
   */
  f_edit : function(record) {
    var fileNo = record.get(this.recordPk);
    var param = '?' + this.recordPk + '=' + fileNo;
    param = this.detailUrl + param;
    this.openWin( param );
  },
  
  /**
   * 增加功能
   */
  f_add : function( isSlient ) {

    if ( this.checkLastLevel ) {
      //判断是否是第五级别
      var node = this.getTreeSelNode();
      
      var level = node.attributes['data'].level;
      if ( level != 6 ) {
        if ( ! isSlient ) {
          Ext.Msg.alert('', '只有第六级行政区域才能增加记录！');
        }
        return;
      }
    }

    param = this.detailUrl + this.getAddParams();
    console.log( param );
    this.openWin( param );

  },

  /**
   * 打开编辑窗口
   */
  openWin : function( targetUrl ) {
      
    var win = new Ext.Window({
      modal: true,
      title: '录入记录',
      border: false,
      bodyStyle :'top:0px;bottom:0px;'
    });
    
    win.show();
    win.maximize();
    
    console.log(win.getInnerHeight())
    console.log(win)
    win.add( {
      xtype: 'iframepanel',
      defaultSrc : targetUrl,
      width: win.getInnerWidth(),
      height: win.getInnerHeight() - 10,
      style:'top:0px;bottom:10px',
      title : '',
      loadMask : true,
      autoScroll: true,
      listeners:{
        message : function(f,data) {
          console.log("receive message...");
          console.log(data);
          if ( data.data == 'quit' ) {
            win.close();
          } else if ( data.data == 'saved' ) {
            this.load();
          }
        }.createDelegate(this)
      }
    }
    );
    win.doLayout(true);
  },
  
  getTreeSelNode : function() {
    var selNode = this.currentNode;
    if ( selNode ) {
      //Ext.Msg.alert('', selNode.text);
    } else {
      Ext.Msg.show({
        icon : Ext.Msg.WARNING,
        buttons: Ext.Msg.OK,
        msg : '请先选择一个行政区域！'
      });
    };
    return selNode;
  },
  createActions : function() {
    var store = new Ext.data.SimpleStore({
        fields: ['type', 'display'],
        data : [['a.fileNo','编码'],['b.idnumber','身份证号'],['b.workUnit','工作单位']]
    });
    this.combo = new Ext.form.ComboBox({
        store: store,
        displayField:'display',
        valueField: 'type',
        typeAhead: true,
        mode: 'local',
        triggerAction: 'all',
        selectOnFocus:true,
        editable: false,
        width: 100,
        value: 'a.fileNo'
    });
    this.filterField = new Ext.form.TextField({
      fieldLabel:'',
      enableKeyEvents : true,
      listeners: {
        'keypress' : function(field, event) {
          if(event.getKey() == 13){
            this.load(true);
          };
        }.createDelegate(this)
      }
    });

    this.editFn = function() {
      var selections = this.grid.getSelections();
      if ( selections.length == 1 ) {
        console.log( selections[0] );
        this.f_edit( selections[0]);
      }
    };

    this.editAction = new Ext.Action({
        text: '修改',
        iconCls: 'c_edit',
        handler: this.editFn.createDelegate(this)
      });
    
    return [
      new Ext.Action({
        text: '增加',
        iconCls: 'c_add',
        handler: function(){
            var selNode = this.getTreeSelNode();
            if (selNode) {
              this.f_add();
            }
          }.createDelegate(this)
      }),
      this.editAction,
      new Ext.Action({
        text: '删除',
        iconCls: 'c_del',
        handler: function(){
          var selections = this.grid.getSelections();
          if ( selections.length > 0 ) {
            var array = [];
            
            var pk = this.recordPk;
            Ext.each(selections, function(v) {
              array.push(v.get( pk ));
            });
            
            var del = function(e) {
              if ( e == "yes") {
                this.deleteUrl( array, {
                  callback: function(data) {
                    Ext.Msg.alert('', '删除成功！');
                    this.load();
                  }.createDelegate(this),
                  errorHandler : function(msg) {
                    console.log(msg);
                    Ext.Msg.alert('', '删除出错！');
                  }
                });
              }
            };
            Ext.MessageBox.confirm("提示", "确认要删除所选择的记录么？", del, this);
          }
        }.createDelegate(this)
      }),
      '-',
      this.combo,
      this.filterField,
      new Ext.Action({
        text: '查询',
        iconCls: 'c_query',
        handler: function(){
            this.load(true);
          }.createDelegate(this)
      })
    ];
  },

  /*
   * 取得行政树的节点
   *   如果节点没有选中，提示信息，返回空
   *   如果选中，再取得过滤条件，组合成查询条件，并返回之
   */
  getParams : function() {
    var selNode = this.getTreeSelNode();
    if ( selNode ) {
      var filterKey = this.combo.getValue();
      var filterValue = this.filterField.getValue();

      var cond = {
        district : selNode.id,
        filterKey : filterKey,
        filterValue : filterValue
      };
      console.log(cond);
      return cond;
    }
    return null;
  },

  /*
   * 查询数据, 如果树没有选择了节点，不执行
   */
  load : function(isReset) {
    var selNode = this.getTreeSelNode();
    if ( selNode ) {
      if ( isReset ) {
        this.pagingBar.changePage(1);
      }
      this.grid.getStore().reload();
      this.doLayout(true);
    }
  },

  createPanel : function() {
    var reader = new Ext.data.JsonReader( {
        totalProperty : "totalSize",
        root : "data",
        id : this.recordId
      }, Ext.data.Record.create( this.readerConfig )
    );

    var store = new Ext.data.Store( {
      proxy : new Ext.ux.data.DWRProxy( {
        dwrFunction : this.queryUrl,
        listeners : {
          'beforeload' : function(dataProxy, params) {
            var o = this.getParams();
            console.log("getParams: ")
            console.log(o);
            if (!params.limit)
              params.limit = this.pageSize;
            params[dataProxy.loadArgsKey] = [ o, params ];
          }.createDelegate(this)
        }
      }),
      reader : reader
    });

    this.pagingBar = new Ext.PagingToolbar( {
      pageSize : this.pageSize,
      store : store,
      displayInfo : true,
      displayMsg : '{0} - {1} of {2}',
      emptyMsg : "没有记录"
    });

    this.grid = new Ext.grid.GridPanel({
      title : '请选择一个行政区划',
      bbar : this.pagingBar,
      layout: 'fit',
      store: store,
      cm : new Ext.grid.ColumnModel( this.gridCmConfig )
    });
    this.grid.getView().on('refresh', function() {
        //缺省选择grid的第一条记录
        var model = this.grid.getSelectionModel();
        if ( model.getCount() == 0 ) {
          model.selectFirstRow();
        }
      }.createDelegate(this)
    );

   this.grid.on('rowdblclick', this.editFn, this);
    
    this.menu = new Ext.tree.TreePanel( {
      //height : 465,
      layout: 'fit',
      animate : true,
      enableDD : false,
      loader: new Ext.ux.DWRTreeLoader({
        dwrCall: this.treeLoaderFn
      }),
      lines : true,
      autoScroll : true,
      border : false,
      root : new Ext.tree.AsyncTreeNode( {
        text : 'root',
        draggable : false,
        id : 'org'
      }),
      rootVisible : false
    });

    this.menu.getRootNode().on({
      append: {
        fn: function(t, me, n, index) {
          //自动展开根节点的第一个孩子
          if ( index == 0 ) n.expand();
        }
      }
    });

    this.menu.on({
      click : {
        stopEvent : true,
        fn : function(n,e) {
          e.stopEvent();
          this.currentNode = n;
          this.grid.setTitle(n.text);
          this.load();
        }.createDelegate(this)
      }
      ,
      dblclick : {
        fn : function(n, e) {
          this.f_add(true);
        }.createDelegate(this)
      }
    });

    var panel = new Ext.Panel({
      layout : 'border',
      autoScroll: true,
      items: [{
          region: 'west',
          layout: 'fit',
          frame : false,
          title : '行政区划',
          split : true,
          collapsible:true,
          layoutConfig : {
            animate : true
          },
          width : 200,
          minSize : 100,
          maxSize : 400,
          border : false,
          items : [ this.menu ]
        }, {
          region:'center',
          layout:'fit',
          frame:false,
          border:false,
          items:[ this.grid ]
        }
      ]
    });
    return panel;
  }
}
);

/**
 * 行政，组织机构 树形编辑
 */
Ext.tf.OrgTreePanel = Ext.extend(Ext.Panel, {
  title: '未命名',
  closable : true,
  autoScroll : true,
  //height: 100,
  width:800,
  currentNode: null,
  saveFn: Ext.emptyFn,
  deleteFn: Ext.emptyFn,
  formItems: [],
  
  addEqAction : null,
  addDownAction: null,
  editAction: null,
  delAction: null,
  
  initComponent: function() {
    this.buildAction();
    this.buildTree();
    this.build();
    Ext.tf.OrgTreePanel.superclass.initComponent.call(this);
  },

  getTreeSelNode : function() {
    var selNode = this.currentNode;
    if ( selNode ) {
      console.log(selNode);
      //Ext.Msg.alert('', selNode.text);
    } else {
      Ext.Msg.alert('', '请先选择一个节点！');
    };
    return selNode;
  },
  
  /**
   * 弹出
   * 当节点me不为空，表示是编辑节点
   * 对应几种情况：
   * 1. 新增
   * 2. 编辑非根节点
   * 3. 编辑根节点（由于根节点没有父亲值，在不与后台交互的情况下，特殊对待）
   */
  edit : function(sameLevel, parentNode, me) {
    
    var isEdit = false, 
        parentLevel = null;
    
    if ( me ) isEdit = true;
    if ( ! isEdit ) {
      parentLevel = parentNode.attributes['data'].level;
      //如果父亲的级别超过6了，则不能增加子节点
      if ( Ext.num( parentLevel ) >= 6 ) {
        return ;
      };
    };
    
    var form = new Ext.form.FormPanel({
       frame: true,
       defaultType : 'textfield',
       items: this.formItems,
       buttons:[{
         text:'保存',
         handler: function() {
           var formbean = form.getForm().getValues(false);
           var new_id = formbean['id'];
           var new_flag = formbean['flag'];
           var new_name = formbean['name'];
           if(new_id == ''){
        	   if(new_flag == 1){
	        	   Ext.Msg.alert('','ID必须填写！');
	        	   return;
        	   }
           }
           if(new_name == ''){
        	   Ext.Msg.alert('','名称必须填写！');
        	   return;
           }
           this.saveFn(formbean, {
             callback: function(data) {
               Ext.Msg.alert('','保存成功！');
               console.log(data);      
               if ( ! isEdit ) {
            	   var cls = 'folder';
            	   var leaf = false;
            	   if(data.level == 5){
            		   cls = 'leaf';
            		   leaf = true;
            	   }
                 var child = new Ext.tree.TreeNode({
                   id: data.id,
                   text: data.name,
                   cls: cls,
                   leaf: leaf
                 });
                 child.attributes['data'] = data;
                 parentNode.appendChild(child);
                 this.menu.getSelectionModel().select(child);
               } else {
                 me.attributes['data'] = data;
                 me.setText( data.name );
               }
               win.close();
             }.createDelegate(this),
             errorHandler: function(msg) {
//               console.log(msg);
            	 alert(msg);
               Ext.Msg.alert('', '保存出错！');
             }
           });
           win.close();
         }.createDelegate(this)
       }, {
         text:'关闭',
         handler: function() {
           win.close();
         }
       }]
    });
   
    var win = new Ext.Window({
     title: this.title,
     modal: true,
     width: 300,
     closeAction: 'close',
     items:[ form ]
    });
   
    win.show();

    var baseForm = form.getForm();
    if ( isEdit ) {
      baseForm.loadRecord( new Ext.data.Record( me.attributes['data'] ) );
      baseForm.findField('id').el.dom.readOnly = true;
    } else {
      baseForm.findField('level').setValue(parentLevel + 1);
    };
    
	var parentIdField = baseForm.findField('parentId');
	if ( parentIdField && parentNode ) {
		parentIdField.setValue( parentNode.id);
	};
	
    var parentNameField = baseForm.findField('parentName');
    if ( parentNameField && parentNode ) {
      parentNameField.setValue( parentNode.text );
    };

    if ( isEdit && ! parentNode ) {
      form.remove(parentNameField);
    };
  },
  
  buildAction: function() {
    this.addEqAction = new Ext.Action({
      text: '平级增加',
      iconCls: 'c_add',
      handler: function(){
          var node = this.getTreeSelNode();
          if ( ! node ) return;
          if ( node.isRoot ) return;
          this.edit(true, node.parentNode);
        }.createDelegate(this)
    });
    this.addDownAction = new Ext.Action({
      text: '下级增加',
      iconCls: 'c_add',
      handler: function(){
        var node = this.getTreeSelNode();
        if ( ! node ) return;
        this.edit(false, node);
      }.createDelegate(this)
    });
    this.editAction = new Ext.Action({
      text: '编辑',
      iconCls: 'c_edit',
      handler: function(){
        var node = this.getTreeSelNode();
        if ( ! node ) return;
        if ( node.isRoot ) {
          this.edit(true, null, node);
        } else {
          this.edit(true, node.parentNode, node);
        }
      }.createDelegate(this)
    });
    this.delAction = new Ext.Action({
      text: '删除',
      iconCls: 'c_del',
      handler: function(){
        var node = this.getTreeSelNode();
        if ( ! node ) return;
        if ( node.isRoot ) return;
        console.log( node.firstChild );
        if ( node.firstChild ) {
          Ext.Msg.alert('','有子节点，不能删除！');
          return;
        }
        var del = function(e) {
          if ( e == "yes") {
            this.deleteFn(node.id, {
              callback: function(data) {
                Ext.Msg.alert('','删除成功！');
                if ( node.nextSibling ) {
                  this.menu.getSelectionModel().select(node.nextSibling);
                } else {
                  this.menu.getSelectionModel().select(node.parentNode);
                }
                node.remove();
              }.createDelegate(this),
              errorHandler: function(msg) {
                console.log(msg);
                Ext.Msg.alert('','删除错误！');
              }
            });
          };
        };
        
        Ext.MessageBox.confirm("提示", "确认要删除所选择的记录么？", del, this);
        
      }.createDelegate(this)
    });
  },

  buildTree: function() {
    this.menu = new Ext.tree.TreePanel( {       	
      rootVisible:true,
      autoScroll:true,
      lines: false,
      animate : true,
      tbar: [
        this.addEqAction,
        this.addDownAction,
        this.editAction,
        this.delAction
      ],
      loader: new Ext.ux.DWRTreeLoader({
        dwrCall: this.treeLoaderFn
      }),
      root: new Ext.tree.AsyncTreeNode({
        text: this.rootNodeData.name,
        hasChildren:true,
        id:   this.rootNodeData.id
      })
    });
    var rootNode = this.menu.getRootNode();
    rootNode.attributes['data'] = this.rootNodeData;
    this.menu.on({
      click : {
        stopEvent : true,
        fn : function(n,e) {
          e.stopEvent();
          this.currentNode = n;
        }.createDelegate(this)
      }
    });
    
  },
  
  build: function() {
    this.items = [this.menu];
  }
  
});

Ext.tf.HealthParentPanelByHome = Ext.extend(Ext.tf.HealthPanelHome, {
    title: '居民健康档案',
    detailUrl : '/homeInfo.html',
    queryType : 'demo',
    recordId : 'homeId',
    recordPk: 'homeId',
    readerConfig : [
                     {name:'homeId'},
                     {name:'household'},
                     {name:'personCount'},
                     {name:'address'},
                     {name:'phone'}
                   ],
    gridCmConfig :
                   [
                     { "header" : "家庭编号", "dataIndex" : "homeId", "width":130 }, 
                     { "header" : "户主", "dataIndex" : "household" }, 
                     { "header" : "人数", "dataIndex" : "personCount" }, 
                     { "header" : "家庭地址", "dataIndex" : "address"}, 
                     { "header" : "联系电话", "dataIndex" : "phone" }
                   ],
   initComponent: function() {
     Ext.tf.HealthParentPanel.superclass.initComponent.call(this);
   },
   
   getAddParams : function() {
     
     var node = this.getTreeSelNode();

     var districtNumber = node.id;
     var township = '';
     if ( node.parentNode ) {
       township = escape( node.parentNode.text );
     }
     var village = escape( node.text );
     
     var param = '?districtNumber=' + districtNumber + '&township=' + township + '&village=' + village;
     return param;

   }
});