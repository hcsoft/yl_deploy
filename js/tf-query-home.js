Ext.ns("Ext.tf");
var flag = false;
///////////////
//  健康档案模板
///////////////
Ext.tf.QueryByHomePanel = Ext.extend(Ext.Panel, {
  closable : true,
  currentNode : null, //当前选择的树节点
  layout: 'fit',
  title: '档案',
  pageSize : 20,
  recordId: 'id',
  recordPk: 'id',
  //height:700,
  
  //是否需要在最末级才能增加？
  checkLastLevel : true,
  
  //设置查询url
  queryUrl : Ext.emptyFn,
  deleteUrl : Ext.emptyFn,
  treeLoaderFn : Ext.emptyFn,
  diseaseId : null,
  
  getAddParams: function() {
    var node = this.getTreeSelNode();
    var districtNumber = node.id;
    var param = '?districtNumber=' + districtNumber;
    return param;
  },
  
  //设置查询用的类别，比如档案，高血压等。。
  queryType : 'demo',
  detailUrl : '/queryByHome.html',
  readerConfig : [],
  gridCmConfig : [],

  initComponent: function() {
    this.build();
    Ext.tf.QueryByHomePanel.superclass.initComponent.call(this);
  },

  build : function() {
    this.items = [ this.createPanel() ];
  },
  /**
   * 打开编辑窗口
   */
  openWin : function( targetUrl,param ) {
	  var win = new Ext.Window({
	      modal: true,
	      title: '一户式查询',
	      border: false
	    });
	  if(param !=null){
    	window.other_init_param = param;
    }
	win.show();
	win.maximize();
	
	win.add( {
	      xtype: 'iframepanel',
	      defaultSrc : targetUrl,
	      width: win.getInnerWidth(),
	      height: win.getInnerHeight() - 10,
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

  /*
   * 取得行政树的节点
   *   如果节点没有选中，提示信息，返回空
   *   如果选中，再取得过滤条件，组合成查询条件，并返回之
   */
  getParams : function() {
    var selNode = this.getTreeSelNode();
    if ( selNode ) {
      var filterKey = '';
      var filterValue = '';

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
  
  getParamsPersonal : function() {
	   var row = this.grid.getSelectionModel().getSelections();
//	   alert(11);
	   var filterKey = '';
	   var filterValue = '';
	   var district = 'NULL';
	   if ( row.length > 0 && flag) 
		   district = row[0].get('homeId');
	   var cond = {
	      district : district,
	      filterKey : filterKey,
	      filterValue : filterValue
	   };
	   console.log(cond);
	   return cond;
	    
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
      flag = true;
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
      store: store,
      cm : new Ext.grid.ColumnModel( this.gridCmConfig )
    });
    
    var readerPersonal = new Ext.data.JsonReader( {
        totalProperty : "totalSize",
        root : "data",
        id : this.recordId
      }, Ext.data.Record.create( 
    		  [
               {name:'fileNo'},
               {name:'name'},
               {name:'personalInfo_sex', mapping: 'personalInfo.sex'},
               {name:'personalInfo_birthday', mapping: 'personalInfo.birthday'},
               {name:'personalInfo_idnumber', mapping: 'personalInfo.idnumber'},
               {name:'address'},
               {name:'personalInfo_workUnit', mapping: 'personalInfo.workUnit'},
               {name:'personalInfo_tel', mapping: 'personalInfo.tel'}
             ])
    );

    var storePersonal = new Ext.data.Store( {
      proxy : new Ext.ux.data.DWRProxy( {
        dwrFunction : UserMenuTreeService.queryByHome,
        listeners : {
          'beforeload' : function(dataProxy, params) {
            var o = this.getParamsPersonal();
            console.log("getParams: ")
            console.log(o);
            if (!params.limit)
              params.limit = this.pageSize;
            params[dataProxy.loadArgsKey] = [ o, params ];
          }.createDelegate(this)
        }
      }),
      reader : readerPersonal
    });

    
    this.gridByPersonal = new Ext.grid.GridPanel({
    	title : '请选择一记家庭',
        bbar : this.pagingBar,
        layout: 'fit',
        store: storePersonal,
        cm : new Ext.grid.ColumnModel( [

                                        { "header" : "档案编号", "dataIndex" : "fileNo", "width":150 }, 
                                        { "header" : "姓名", "dataIndex" : "name" }, 
                                        { "header" : "性别", "dataIndex" : "personalInfo_sex" }, 
                                        { "header" : "生日", "dataIndex" : "personalInfo_birthday", 
                                                            "renderer": Ext.util.Format.dateRenderer('Y-m-d') }, 
                                        { "header" : "身份证号", "dataIndex" : "personalInfo_idnumber" }, 
                                        { "header" : "住址", "dataIndex" : "address" }, 
                                        { "header" : "工作单位", "dataIndex" : "personalInfo_workUnit" }, 
                                        { "header" : "电话", "dataIndex" : "personalInfo_tel" }
                                      ] )
    });
    
    this.grid.getView().on('refresh', function() {
        //缺省选择grid的第一条记录
        var model = this.grid.getSelectionModel();
        if ( model.getCount() == 0 ) {
          model.selectFirstRow();
          this.gridByPersonal.getStore().reload();
          flag = true; 
        }else{
        	flag = false;
        	if(this.grid.getStore().getTotalCount() == 0){
        		this.gridByPersonal.getStore().reload();
        	}
        }
      }.createDelegate(this)
    );

   this.grid.on('rowclick',function(){
	   var row = this.grid.getSelectionModel().getSelections();
	   this.gridByPersonal.setTitle('户主：' + row[0].get('household'));
	   this.gridByPersonal.getStore().reload();
   }, this);
    
   this.gridByPersonal.on('rowdblclick',function(){
	   var row = this.gridByPersonal.getSelectionModel().getSelections();
	   var fileNo = row[0].get('fileNo');
	   var param = '?fileNo=' + fileNo;
	   param = this.detailUrl + param;
	   this.openWin(param);
   }, this);
   
    this.menu = new Ext.tree.TreePanel( {
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
          layout:'border',
          region:'center',
          items :[{
        	  region:'north',
              layout:'fit',
              frame:false,
              border:false,
              height:280,
              items:[ this.grid]
          },{
        	  region:'center',
              layout:'fit',
              frame:false,
              border:false,
              items:[ this.gridByPersonal]
          }]
        }
      ]
    });
    return panel;
  }
}
);


Ext.tf.QueryHomeParentPanel = Ext.extend(Ext.tf.QueryByHomePanel, {
    title: '居民健康档案',
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
     Ext.tf.QueryHomeParentPanel.superclass.initComponent.call(this);
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