var formSubmiter = function() {
  loginForm.getForm().getEl().dom.action = '/j_spring_security_check';
  loginForm.getForm().getEl().dom.method = 'POST';
  loginForm.getForm().submit();
}

var loginForm = new Ext.FormPanel(
    {
      labelWidth : 75,
      frame : true,
      title : '公共卫生服务管理系统',
      bodyStyle : 'padding:5px 5px 0;',
      style : 'text-align:left; margin-left:auto; margin-right:auto; margin-top: 150px;',
      width : 300,
      defaults : {
        width : 120
      },
      defaultType : 'textfield',
      monitorValid : true,
      standardSubmit : true,

      items : [ {
        fieldLabel : '用户名',
        name : 'j_username',
        id : 'j_username',
        allowBlank : false
      }, {
        fieldLabel : '密码',
        name : 'j_password',
        inputType : 'password',
        allowBlank : false
      }, {
        inputType : 'hidden',
        id : 'spring-security-redirect',
        name : 'spring-security-redirect',
        value : '/admin/'
      }, {
        inputType : 'hidden',
        id : 'submitbutton',
        name : 'myhiddenbutton',
        value : 'hiddenvalue'
      } ],
      keys : [ {
        key : [ 10, 13 ],
        fn : formSubmiter
      } ],
      buttons : [ {
        text : '登录',
        formBind : true,
        scope : this,
        handler : formSubmiter
      } ]
    })

var tabPanel = new Ext.Panel( {
  region : 'center',
  deferredRender : false,
  activeTab : 0,
  frame : true,
  style : 'text-align: center',
  baseCls : 'login-img',
  items : [ loginForm ]
});

init = function(data) {
  Ext.QuickTips.init();
  Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
  var viewport = new Ext.Viewport( {
    layout : 'border',
    cls : 'login-img',
    items : [ 
//      new Ext.BoxComponent( {
//        region : 'north',
//        el : 'north',
//        height : 32
//      }), 
      tabPanel ]
  });
}

Ext.onReady(function() {
  Ext.BLANK_IMAGE_URL = '/resources/images/default/s.gif';
  init();
  if (lastUsername != undefined) {
    Ext.get('j_username').dom.value = lastUsername;
  }
});
