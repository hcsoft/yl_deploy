Ext.ns("app");

app.controlPanel = new Ext.tf.SimplePanel( {
  title : 'Demo Form Controls',
  pageSize : 10,
  queryUrl : DemoService.findControls.createDelegate(this),
  editUrl : DemoService.editControl.createDelegate(this),
  deleteUrl : DemoService.removeControls.createDelegate(this),

  queryConfig : [ {
    fieldLabel : '名称',
    name : 'name',
    allowBlank : true
  }, {
    fieldLabel : 'date',
    xtype : 'datefield',
    width : 130,
    format : 'Y-m-d',
    name : 'date'
  } ],

  editConfig : [ {
    fieldLabel : 'ID',
    name : 'id',
    xtype : 'hidden'
  }, {
    fieldLabel : 'textarea',
    xtype : 'textarea',
    width : '150',
    name : 'textarea'
  }, {
    xtype : 'radiogroup',
    fieldLabel : 'radiogroup',
    items : [
      {
        boxLabel : 'radio1',
        inputValue : 'r1',
        value : 'r1',
        name : 'radio'
      }, {
        boxLabel : 'radio2',
        inputValue : 'r2',
        value : 'r2',
        name : 'radio'
      }
    ]
  }, {
    fieldLabel : 'select',
    xtype : 'DWRCombo',
    optionName : 'ModuleCategory',
    hiddenName : 'select'
  }, {
    fieldLabel : 'date',
    xtype : 'datefield',
    format : 'Y-m-d',
    name : 'date'
  }
  ],

  readerConfig : [ {
    name : 'id',
    mapping : 'id'
  }, {
    name : 'textarea',
    mapping : 'textarea'
  }, {
    name : 'radio',
    mapping : 'radio'
  }, {
    name : 'checkbox',
    mapping : 'checkbox'
  }, {
    name : 'select',
    mapping : 'select'
  }, {
    name : 'date',
    type : 'date',
    dateFormat : 'timestamp',
    mapping : 'date'
  } ],

  gridCm : [ {
    "hidden" : true,
    "header" : "ID",
    "sortable" : true,
    "dataIndex" : "id"
  }, {
    "header" : "名称",
    "sortable" : true,
    "dataIndex" : "textarea"
  }, {
    "header" : "dd",
    "sortable" : true,
    renderer : Ext.util.Format.dateRenderer('Y-m-d'),
    "dataIndex" : "date"
  } ]
});

ModuleMgr.register(app.controlPanel);
app.controlPanel.load();
