Ext.ns("app");

app.profilePanel = new Ext.FormPanel({
  title: '修改密码',
  autoHeight: true,
  frame : true,
  monitorValid: true,
  defaultType: 'textfield',
  closable : true,
  items : [{
    fieldLabel: '原密码',
    name: 'password',
    allowBlank: false,
    inputType: 'password'
  }, {
    fieldLabel: '新密码',
    name: 'newPassword',
    allowBlank: false,
    inputType: 'password'
  }, {
    fieldLabel: '再重复一遍新密码',
    name: 'newPassword2',
    allowBlank: false,
    inputType: 'password'
  }],
  buttons : [ {
    text : '确认',
    formBind: true,
    scope: this,
    handler : function() {
      var form = app.profilePanel.getForm();
      var p1 = form.findField("newPassword").getValue();
      var p2 = form.findField("newPassword2").getValue();
      if ( p1 != p2 ) {
        Ext.Msg.alert('','两次输入的新密码不一致，请重新来过！');
        form.findField("newPassword").focus(true);
        return;
      } else {
        var o = form.getValues(false);
        console.log("formbean");
        console.log(o);
        UserMenuTreeService.changePwd(o.password, o.newPassword, o.newPassword2, {
          callback: function(data) {
            console.log(data);
            if ( data == true) {
              Ext.Msg.alert('','更新密码成功！');
              app.profilePanel.getForm().reset();
            } else {
              Ext.Msg.alert('','原密码不正确，更新失败！');
            }
          },
          errorHandler: function(msg) {
            console.warn( msg );
            Ext.Msg.alert('','更新密码错误！');
          }
        });
      }
      
    }
  }],
  listeners: {
    afterlayout: function(){
      app.profilePanel.getForm().clearInvalid();
    }
  }
  
});

_tab = ModuleMgr.register(app.profilePanel);
