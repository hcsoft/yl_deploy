Ext.ns("Ext.tf");
///////////////
//  统计查询模板
///////////////
Ext.tf.StatisticPanel = Ext.extend(Ext.Panel, {
  closable : true,
  currentNode : null, //当前选择的树节点
  layout: 'fit',
  title: '统计查询',
  pageSize : 20,
  recordId: 'id',
  recordPk: 'id',
  //height:700,
  
  
  //设置查询url
  queryUrl : Ext.emptyFn,
  deleteUrl : Ext.emptyFn,
  diseaseId : null,
  
  //设置查询用的类别，比如档案，高血压等。。
  readerConfig : [],
  gridCmConfig : [],

  initComponent: function() {
    this.build();
    Ext.tf.QueryByHomePanel.superclass.initComponent.call(this);
  },

  build : function() {
    this.items = [ this.createPanel() ];
  },
  
  /*
   * 查询数据, 如果树没有选择了节点，不执行
   */
  load : function(isReset) {
      if ( isReset ) {
        this.pagingBar.changePage(1);
      }
      this.grid.getStore().reload();
      this.doLayout(true);
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
            var o = '';
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

    this.pagingBar = new App.PagingToolbar( {
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
      height:300,
//      store: store,
      cm : new Ext.grid.ColumnModel( this.gridCmConfig )
    });
        
    this.grid.getView().on('refresh', function() {
        //缺省选择grid的第一条记录
        var model = this.grid.getSelectionModel();
      }.createDelegate(this)
    );

    
    var panel = new Ext.Panel({
      layout : 'border',
      autoScroll: true,
      items: [{
          layout:'border',
          region:'center',
          items :[{
        	  region:'north',
              layout:'fit',
              frame:false,
              border:false,
              items:[ this.grid]
          }]
        }]
    });
    return panel;
  }
});