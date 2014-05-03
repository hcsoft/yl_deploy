tfMoney = function(v,sign){
	if ( ! sign ) sign = ''; 
    v = (Math.round((v-0)*100))/100;
    v = (v == Math.floor(v)) ? v + ".00" : ((v*10 == Math.floor(v*10)) ? v + "0" : v);
    v = String(v);
    var ps = v.split('.');
    var whole = ps[0];
    var sub = ps[1] ? '.'+ ps[1] : '.00';
    var r = /(\d+)(\d{3})/;
    while (r.test(whole)) {
        whole = whole.replace(r, '$1' + ',' + '$2');
    }
    v = whole + sub;
    if(v.charAt(0) == '-'){
        return '-' + sign + v.substr(1);
    }
    return sign +  v;
}

Ext.apply(Ext.form.VTypes, {
    daterange : function(val, field) {
        var date = field.parseDate(val);

        if(!date){
            return;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = Ext.getCmp(field.startDateField);
            start.setMaxValue(date);
            start.validate();
            this.dateRangeMax = date;
        }
        else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = Ext.getCmp(field.endDateField);
            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
        /*
         * Always return true since we're only using this vtype to set the
         * min/max allowed values (these are tested for after the vtype test)
         */
        return true;
    },

    password : function(val, field) {
        if (field.initialPassField) {
            var pwd = Ext.getCmp(field.initialPassField);
            return (val == pwd.getValue());
        }
        return true;
    },

    passwordText : 'Passwords do not match'
});

Ext.grid.CheckColumn = function(config){
  Ext.apply(this, config);
  if(!this.id){
      this.id = Ext.id();
  }
  this.renderer = this.renderer.createDelegate(this);
};

Ext.grid.CheckColumn.prototype ={
  init : function(grid){
      this.grid = grid;
      this.grid.on('render', function(){
          var view = this.grid.getView();
          view.mainBody.on('mousedown', this.onMouseDown, this);
      }, this);
  },

  onMouseDown : function(e, t){
      if(t.className && t.className.indexOf('x-grid3-cc-'+this.id) != -1){
          e.stopEvent();
          var index = this.grid.getView().findRowIndex(t);
          var record = this.grid.store.getAt(index);
          record.set(this.dataIndex, !record.data[this.dataIndex]);
      }
  },

  renderer : function(v, p, record){
      p.css += ' x-grid3-check-col-td';
      return '<div class="x-grid3-check-col'+(v?'-on':'')+' x-grid3-cc-'+this.id+'">&#160;</div>';
  }
};

Ext.namespace('Ext.tf.util');

/**
 * Compiles a selector/xpath query into a reusable function. The returned function
 * takes one parameter "root" (optional), which is the context node from where the query should start.
 * @param {Ext.form.FormPanel} formPanel 包含主数据的FormPanel
 * @param {Ext.grid.GridPanel/Ext.grid.EditorGridPanel} gridPanel 包含细节数据的GridPanel
 * @param {Array} excludes gridPanel中不需要获取的列, 数组中加入需要摈弃的grid.store.fields中
 * @param {Array} resultPropNames (可选) 定义返回的json对象的属性名，缺省为["formData", "gridData"]
 * @return {Object} 缺省为{formData:masterData, gridData:detailData}
 *           masterData为json对象,
 *           detailData为[json对象], detailData数组中的json对象的属性名与grid.store的fields定义相同
 */
Ext.tf.util.gatherData = function(formPanel, gridPanel, excludes, resultPropNames) {
    var store = gridPanel.store;
    var gridDataList = [];
    var formData = formPanel.getForm().getValues(false);

    store.each(function(rec){
        for ( var i=excludes.length-1; i>=0; --i ){
            delete rec.data[excludes[i]];
        };
        gridDataList.push(rec.data)
    });
    if (resultPropNames) {
        var result = {};
        result[resultPropNames[0]] = formData;
        result[resultPropNames[1]] = gridDataList;
        return result;
    } else
        return {formData: formData, gridData:gridDataList};
}

Ext.tf.util.debug = function(msg) {
    if (typeof(console) != "undefined") {
        console.debug(msg);
    }
}

/*
   Usage :
      var lable = Ext.tf.util.OptCache.getLabel("Nationality", "1");

*/

Ext.tf.util.OptCache = {};
Ext.tf.util.OptCache.data = {};
Ext.tf.util.OptCache.getOptions = function(optName) {
            var util = Ext.tf.util;
            if (! util.OptCache.data[optName]) {
                OptionProvider.getOptions(optName,{
                    async: false,
                    callback: function(list){
                        var opt = {};
                        for ( var i=list.length-1; i>=0; --i ){
                            opt[list[i].id] = list[i].name;
                        };
                        util.OptCache.data[optName] = opt;
                    }
                });
            } else {
                util.debug("util.OptCache.getOptions: using cache");
            }
            return util.OptCache.data[optName];
      };

Ext.tf.util.OptCache.getLabel = function(optName, key) {
            var util = Ext.tf.util;
            var options = util.OptCache.getOptions(optName);
            if (options) {
                return options[key];
            } else {
                return '';
            }
      };

/**
 * 回车对应函数 handler
 */
Ext.tf.util.enterKey = function(handler) {
  return {
    key : [ 10, 13 ],
    fn : handler
  }
};

////////////////////////
Ext.ns("Ext.tf");
Ext.tf.currentUser = null;

Ext.tf.SimpleFormPanel = Ext.extend(Ext.FormPanel, {
  autoHeight : true,
  frame : true,
  defaultType : 'textfield',
  initComponent: function() {
    Ext.applyIf(this, {
      //saveFn : function() {}
    });
    this.build();
    Ext.tf.SimpleFormPanel.superclass.initComponent.call(this);
  },

  build : function() {
    this.buttons = [ {
      text : '确认',
      handler : this.saveFn
    },{
      text : '取消',
      handler : this.close
    } ]
    //this.keys = [ Ext.tf.util.enterKey(this.saveFn) ];
  }

})


Ext.tf.SimpleQueryFormPanel = Ext.extend(Ext.FormPanel, {
  collapsible : true,
  title : '查询',
  labelWidth : 75,
  frame : true,
  bodyStyle : 'padding:5px 5px 0',
  width : 800,
  defaults : {
    width : 230
  },
  defaultType : 'textfield',

  initComponent : function() {
    Ext.apply(this,this.queryConfigEx);
    Ext.tf.SimpleQueryFormPanel.superclass.initComponent.call(this);
  }

});

Ext.tf.SimpleGridPanel = Ext.extend(Ext.grid.GridPanel, {

  loadMask : {
    msg : '正在加载数据...'
  },
  viewConfig : {
    forceFit : true
  },
  width : 800,
  height : 320,
  frame : true,

  // toggle: in grid, whether double click fire edit
  dblclickToggle : true,

  // toggle: in grid, whether right mouse click fire context menu
  contextmenuToggle : true,

  initComponent : function() {
    Ext.apply(this, this.gridConfigEx);
    Ext.tf.SimpleGridPanel.superclass.initComponent.call(this);

    this.dblclickToggle && this.on('rowdblclick', this.edit, this);

    //右键菜单
    this.contextmenuToggle && this.on('rowcontextmenu', this.contextmenu, this);
  },

  contextmenu : function(grid, rowIndex, e) {

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

    var selections = this.getSelections();

    if (selections.length > 1) {
      updateMenu.disable();
    }

    var menuList = [updateMenu, deleteMenu];

    this.grid_menu = new Ext.menu.Menu({
        id    : 'mainMenu',
        items : menuList
    });

    var coords = e.getXY();
    grid.getSelectionModel().selectRow(rowIndex);
    this.grid_menu.showAt([coords[0], coords[1]]);

  }
});


Ext.tf.SimplePanel = Ext.extend(Ext.Panel, {
  closable : true,
  hasAdd : true,
  queryUrl : Ext.emptyFn,
  editUrl : Ext.emptyFn,
  deleteUrl : Ext.emptyFn,
  
  // toggle: in grid, whether double click fire edit
  dblclickToggle : true,

  // toggle: in grid, whether right mouse click fire context menu
  contextmenuToggle : true,

  //修改开始
  recordId: 'id',
  recordPk: 'id',
  detailUrl : '/personalInfo-home.html'',
  f_edit : function(record) {
	    var fileNo = record.get(this.recordId);
	    var homeId = $('#id span').html();
	    var param = '?' + this.recordPk + '=' + fileNo + '&homeId=' + homeId;
	    param = this.detailUrl + param;
	    this.openWin( param );
	  },
  //修改结束

  initComponent : function() {
    try {
	    Ext.applyIf(this, {
	      pageSize : 10
	    });
    
    this.reader = new Ext.data.JsonReader( {
        totalProperty : "totalSize", //总记录数
        root : "data", //分页对象中的数据集
        id : "fileNo" //
      }, Ext.data.Record.create( this.readerConfig )
    );
    
    this.store = new Ext.data.Store( {
      proxy : new Ext.ux.data.DWRProxy( {
        dwrFunction : this.queryUrl,
        listeners : {
          'beforeload' : function(dataProxy, params) {
            //alert(dwr.util.toDescriptiveString(params, 2));
    	    //alert(this.queryUrl +"eeeee");
    	  	var homeId = $('#id span').html();
    	  	$("input[name='id']").val(homeId);
            var o = this.queryForm.getForm().getValues(false);
//            alert(o);
            if (!params.limit)
              params.limit = this.pageSize;
            params[dataProxy.loadArgsKey] = [ o, params ];
          }.createDelegate(this)
        }
      }),
      reader : this.reader
    });

    this.pagingBar = new Ext.PagingToolbar( {
      pageSize : this.pageSize,
      store : this.store,
      displayInfo : true,
      displayMsg : '{0} - {1} of {2}',
      emptyMsg : "没有记录"
    });

    this.grid = new Ext.tf.SimpleGridPanel({
      gridConfigEx : this.gridConfigEx,
      edit : this.edit.createDelegate(this),
      del  : this.del.createDelegate(this),
      store: this.store,
      cm : new Ext.grid.ColumnModel( this.gridCm ),
      dblclickToggle : this.dblclickToggle,
      contextmenuToggle : this.contextmenuToggle,
      bbar : this.pagingBar
    });
    
    this.editForm = new Ext.tf.SimpleFormPanel( {
      items : this.editConfig,

      close : function(){
        this.editWin.hide();
      }.createDelegate(this),

      saveFn : function() {
        var formBean = this.editForm.getForm().getValues(false);
        this.editUrl(formBean, function() {
          Ext.MessageBox.alert("提示","保存成功！");
          this.editWin.hide();
          this.store.reload();
        }.createDelegate(this));
      }.createDelegate(this)
    });
    
    this.addRecord = function() {
    	var homeId = $('#id span').html();
    	var districtNumber = $('#districtNumber input').val();
    	var township = escape($('#township input').val());
    	var village = escape($('#village input').val());
        param = this.detailUrl + '?districtNumber=' + districtNumber + '&township=' + township 
        	+ '&village=' + village + '&homeId=' + homeId;
        alert(param);
//    	param = this.detailUrl + '?districtNumber=53062810001';
        console.log( param );
        this.openWin( param );
    };
    this.query = function() {
      this.grid.selModel.clearSelections();
      this.store.reload();
      return true;
    };
    //this.on("render",query);
    this.queryForm = new Ext.tf.SimpleQueryFormPanel( {
      queryConfigEx : this.queryConfigEx,
      
      items : this.queryConfig,
      buttonAlign : 'left',
      buttons : [ {
        text : '查询',
        formBind : true,
        scope : this,
        handler : this.query.createDelegate(this)
      }],
      keys : [ Ext.tf.util.enterKey(this.query.createDelegate(this)) ]
    });
    var tempHomeID = $('#id span').html();
    if(tempHomeID == null || tempHomeID == '')
    	hasAdd = false;
    if ( this.hasAdd ) {
      this.queryForm.addButton('新增', this.addRecord, this);
      this.queryForm.addButton('将已存在的档案指定到户', this.addRecord, this);
    }

    this.items = [this.queryForm, this.grid];

    Ext.tf.SimplePanel.superclass.initComponent.call(this);
    } catch(e) {
      console.log(e);
      throw e;
    }
    
    //this.load("show",this.query);
  },
  
  //修改开始


  /**
   * 增加功能
   */
  f_add : function() {
	var id = $('#id').val()
    param = this.detailUrl + '?districtNumber = ' + id;
    console.log( param );
    this.openWin( param );

  },
  //修改结束
  
  //修改开始
  openWin : function( targetUrl ) {
      
	    var win = new Ext.Window({
	      modal: true,
//	      title: '录入记录',
	      border: false
	    });
	    
	    win.show();
	    win.maximize();
	    
	    win.add( {
	      xtype: 'iframepanel',
	      defaultSrc : targetUrl,
	      width: win.getInnerWidth(),
	      height: win.getInnerHeight(),
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
  //修改结束
  
  //private
  //修改开始
  edit : function() {
      var selections = this.grid.getSelections();
      if ( selections.length == 1 ) {
        console.log( selections[0] );
        this.f_edit( selections[0]);
      }
    },
  //修改结束

  del : function() {
    var selections = this.grid.getSelections();
    if (selections.length == 0) {
      Ext.MessageBox.alert("提示", "请选择一条的记录！");
      return;
    }

    var fn = function(e) {
      if ( e == "yes") {
        var ids = new Array();
        for(var i = 0, len = selections.length; i < len; i++){
            try {
                // 如果选中的record没有在这一页显示，remove就会出问题
                selections[i].get(this.recordId);
                ids[i] = selections[i].get(this.recordId);
            } catch (e) {
              console.log(e);
            }
        }
        this.deleteUrl(ids.join(","), function(){
          Ext.MessageBox.alert("提示", "删除完毕！");
          this.store.reload();
        }.createDelegate(this));
      }
    }

    Ext.MessageBox.confirm("提示", "确认要删除所选择的记录么？", fn, this);

  },

  //public
  load : function() {
	  
	  alert("111111111")
    //return this.store.load({params:{start:0, limit:this.pageSize}});
    return this.store.load();
  }
});

/**
 * 弹出窗口控件
 */
Ext.tf.PopSelect = Ext.extend(Ext.form.TriggerField, {

  triggerClass : 'x-form-date-trigger',
  readOnly: true,

  initComponent : function() {
    Ext.tf.PopSelect.superclass.initComponent(this);
  },

  /**
   *  Find ref element, set value
   */
  setRefName : function(v) {
    var refName = this.refName || ''; // If not refName, then ??
    var form = this.findParentBy(function(v) {
      if ( Ext.type(v.getForm) == 'function' ) return true;
    });
    if ( form != null ) {
      Ext.each(
        form.find("name",refName),
        function(field){ field.setValue(v); }
      );
    }
    return this;
  },

  onDestroy : function() {
    Ext.destroy(this.win, this.panel);
    Ext.tf.PopSelect.superclass.onDestroy.call(this);
  },

  edit : function() {
    var grid = this.panel.grid;
    var store = this.panel.store;
    var view = grid.getView();
    var sm = grid.getSelectionModel();

    for (var i = 0; i < view.getRows().length; i++) {
      if (sm.isSelected(i)) {
        var record = store.getAt(i);
        var id = record.get('fileNo');
        var name = record.get('name');
        this.setValue(name);
        this.setRefName(id);
      };
    };
    this.win.hide();
  },

  //pop select window
  onTriggerClick : function() {
    if (this.win == null) {

      this.panel = new Ext.tf.SimplePanel( {
        title : '',
        pageSize : 10,
        hasAdd : false,

        dblclickToggle : false,
        contextmenuToggle : false,

        gridConfigEx : { height : 200 },

        queryUrl : this.queryUrl,
        //查询条件Form
        queryConfig : this.queryConfig,
        // Grid 读取数据时的reader
        readerConfig : this.readerConfig,
        // Grid的列
        gridCm : this.gridCm
      });

      this.panel.grid.on('rowdblclick', this.edit, this);

      this.win = new Ext.Window({
        title : this.title,
        modal : true,
        width: 520,
        autoHeight : true,
        closeAction : 'hide',
        items : [this.panel],
        buttons : [{
          text : '关闭',
          handler : function() {
            this.win.hide();
            }.createDelegate(this)
          },{
          text : '清除',
          handler : function() {
            this.setValue('');
            this.setRefName('');
            this.win.hide();
            }.createDelegate(this)
          },{
          text : '确认',
          handler : this.edit.createDelegate(this)
          }]
        });
      }
    this.win.show(this);
  }

  });
Ext.reg("popselect", Ext.tf.PopSelect);

/**
 * SimpleReportPanel
 */
Ext.tf.SimpleReportPanel = Ext.extend(Ext.Panel, {
  closable : true,
  
  layout: 'fit',
  autoScroll: true,

  queryUrl : Ext.emptyFn,

  // toggle: in grid, whether double click fire edit
  dblclickToggle : false,

  // toggle: in grid, whether right mouse click fire context menu
  contextmenuToggle : false,

  initComponent : function() {
    try {

      this.reader = new Ext.data.JsonReader({
        totalProperty : "totalSize",
        root : "data",
        id : "fileNo"
      }, Ext.data.Record.create(this.readerConfig));

      this.store = new Ext.data.Store({
        proxy : new Ext.ux.data.DWRProxy({
          dwrFunction : this.queryUrl
        }),
        reader : this.reader
      });

      this.grid = new Ext.tf.SimpleGridPanel({
	        tbar : [{
	          text: '刷新',
	          handler: function(){
	            this.load();
	          }.createDelegate(this)
	        }],
			    viewConfig : {
			      forceFit : ''
			    },
			    width: '',
        gridConfigEx : this.gridConfigEx,
        store : this.store,
        cm : new Ext.grid.ColumnModel(this.gridCm),
        dblclickToggle : this.dblclickToggle,
        contextmenuToggle : this.contextmenuToggle
      });
      
      this.items = [this.grid];

      Ext.tf.SimplePanel.superclass.initComponent.call(this);

    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  // public
  load : function() {
    return this.store.load();
  }
});