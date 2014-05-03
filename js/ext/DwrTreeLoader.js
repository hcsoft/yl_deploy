Ext.namespace("Ext.ux");
/**
 * @class Ext.ux.DWRTreeLoader
 * @extends Ext.tree.TreeLoader
 * @author Carina Stumpf
 *
 * DWRTreeloader loads tree nodes by calling a DWR service.
 * Version 2.1
 *
 */

/**
 * @constructor
 * @param cfg {Object} config A config object
 *    @cfg dwrCall the DWR function to call when loading the nodes
 */

Ext.ux.DWRTreeLoader = function(config) {
  Ext.ux.DWRTreeLoader.superclass.constructor.call(this, config);
};

Ext.extend(Ext.ux.DWRTreeLoader, Ext.tree.TreeLoader, {
/**
 * Load an {@link Ext.tree.TreeNode} from the DWR service.
 * This function is called automatically when a node is expanded, but may be used to reload
 * a node (or append new children if the {@link #clearOnLoad} option is false.)
 * @param {Object} node node for which child elements should be retrieved
 * @param {Function} callback function that should be called before executing the DWR call
 */
  load : function(node, callback) {
    var cs, i;
    if (this.clearOnLoad) {
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
    }
    if (node.attributes.children && node.attributes.hasChildren) { // preloaded json children
      cs = node.attributes.children;
      for (i = 0,len = cs.length; i<len; i++) {
        node.appendChild(this.createNode(cs[i]));
      }
      if (typeof callback == "function") {
        callback();
      }
    } else if (this.dwrCall) {
      this.requestData(node, callback);
    }
  },

/**
 * Performs the actual load request
 * @param {Object} node node for which child elements should be retrieved
 * @param {Function} callback function that should be called before executing the DWR call
 */
  requestData : function(node, callback) {
    var callParams;
    var success, error, rootId, dataContainsRoot;

    if (this.fireEvent("beforeload", this, node, callback) !== false) {

      callParams = this.getParams(node);

      success = this.handleResponse.createDelegate(this, [node, callback], 1);
      error = this.handleFailure.createDelegate(this, [node, callback], 1);

      callParams.push({callback:success, errorHandler:error});

      this.transId = true;
      this.dwrCall.apply(this, callParams);
    } else {
      // if the load is cancelled, make sure we notify
      // the node that we are done
      if (typeof callback == "function") {
        callback();
      }
    }
  },

/**
 * Override this to add custom request parameters. Default adds the node id as first and only parameter
 */
  getParams : function(node) {
    return [node.id];
  },

/**
 * Handles a successful response.
 * @param {Object} childrenData data that was sent back by the server that contains the child nodes
 * @param {Object} parent parent node to which the child nodes will be appended
 * @param {Function} callback callback that will be performed after appending the nodes
 */
  handleResponse : function(childrenData, parent, callback) {
    this.transId = false;
    this.processResponse(childrenData, parent, callback);
  },

/**
 * Handles loading error
 * @param {Object} response data that was sent back by the server that contains the child nodes
 * @param {Object} parent parent node to which child nodes will be appended
 * @param {Function} callback callback that will be performed after appending the nodes
 */
  handleFailure : function(response, parent, callback) {
    this.transId = false;
    this.fireEvent("loadexception", this, parent, response);
    if (typeof callback == "function") {
      callback(this, parent);
    }
    console.log( response);
    if(response === "登录超时" ){
        if(!window.errorShowing){
            var exceptionwin = new Ext.Window({
                title:'重新登录',
                id:'relogin_exceptionwin',
                width:320,
                height:150,
                layout:'fit',
                modal :true,
                buttonAlign:'center',
                listeners:{
                    beforeclose:function ( panel){
                        window.errorShowing = false;
                    },
                    afterlayout:function (container,layout){
                        window.errorShowing = true;
                    }
                },
                items:[{
                       xtype:'form',
                       id:'relogin_form',
                       url:'/j_spring_security_check',
                       width:320,
                       height:150,
                       layout:'table',
                       monitorValid:true,
                        layoutConfig: {
                            columns: 2
                        },
                        buttons:[{
                            text:'重新登录',
                            formBind: true,
                            id:"bt_submit",
                            handler:function(){
                                window.saving = false;
                                Ext.getCmp("relogin_form").getForm().submit({
                                    method:'POST',
//                                  standardSubmit : true,
                                    url:'/j_spring_security_check',
//                                  headers:{'Content-Type': 'application/json; charset=UTF-8'},
                                    success:function(){
                                        Ext.getCmp("relogin_message").setText("登录成功!");
                                        parent.ownerTree.getLoader().load(parent.ownerTree.root);
                                        Ext.getCmp("relogin_exceptionwin").close();
                                        // Ext.Msg.show({
                                               // title:'登录成功!',
                                               // msg: '登录成功!点击【确定】返回操作界面!',
                                               // buttons: Ext.Msg.OK,
                                               // fn: function(btn, text){
                                                    // if (btn == 'ok'){
                                                        // parent.ownerTree.getLoader().load(parent.ownerTree.root);
                                                        // Ext.getCmp("relogin_exceptionwin").close();
                                                    // }
                                                // },
                                               // animEl: 'elId'
                                            // });
                                    },
                                    failure:function(form, action){
                                        Ext.Msg.alert('登录失败!',"登录失败!用户名或密码错误!");
                                        Ext.getCmp("relogin_message").setText("登录失败!用户名或密码错误");
                                    }
                                });
                            }
                        }],
                        buttonAlign:'center',
                        bodyStyle:'background-color: transparent !important;',
                        items:[
                            {
                                xtype:'label',
                                text : '您的登录已经超时，请输入用户名和密码重新登录！',
                                style :'padding-left:5px;padding-top:8px;color:red;',
                                id : 'relogin_message',
                                columnWidth: .25 ,
                                colspan: 2,
                                height:25
                            },
                            {
                                xtype:'label',
                                html : '用&nbsp;户&nbsp;名：',
                                style :'padding-left:5px;margin:4px 0px 4px 0px;',
                                columnWidth: .15 ,
                                width:50,
                                height:25
                            },
                            {
                                xtype:'textfield',
                                fieldLabel : '用户名',
                                id : 'j_username',
                                style :'text-indent:5px;margin:4px 0px 4px 0px;width:90%;',
                                columnWidth: .85  ,
                                height:25,
                                allowBlank:false,
                                listeners:{
                                    render:function(){
                                        $("#j_username").bind("keypress", function(e,el){
                                            if(e.charCode ===Ext.EventObject.ENTER){
                                                $("#j_password").focus();
                                            }
                                        });
                                    }
                                }
                            },
                            {
                                xtype:'label',
                                html:'密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：',
                                style :'padding-left:5px;margin:4px 0px 4px 0px;',
                                columnWidth: .15  ,
                                height:25
                            },{
                                xtype:'textfield',
                                //width:100,
                                style :'text-indent:5px;margin:4px 0px 4px 0px;width:90%',
                                fieldLabel : '密码',
                                inputType : 'password',
                                id : 'j_password',
                                columnWidth: .85  ,
                                height:25,
                                allowBlank:false,
                                listeners:{
                                    render:function(){
                                        $("#j_password").bind("keypress", function(e,el){
                                            if(e.charCode ===Ext.EventObject.ENTER){
                                                $("#bt_submit").click();
                                            }
                                        });
                                    }
                                }
                            }
                            ,{
                                xtype:'hidden',
                                id : 'spring-security-redirect',
                                value :'/js/auth/ajaxlogin_success.js',
                                columnWidth: .85  ,
                                height:25,
                                allowBlank:false
                            },
                            {
                                xtype:'hidden',
                                id : 'authentication-failure-url',
                                value :'/js/auth/ajaxlogin_fail.js',
                                columnWidth: .85  ,
                                height:25,
                                allowBlank:false
                            }
                        ]
                }
                 ]
            });
            exceptionwin.show(this);
        }
    }
    console.log("DwrTreeLoader: error during tree loading. Received response: " + response);
  },

/**
 * Process the response that was received from server
 * @param {Object} childrenData data that was sent back by the server that contains the attributes for the child nodes to be created
 * @param {Object} parent parent node to which child nodes will be appended
 * @param {Function} callback callback that will be performed after appending the nodes
 */
  processResponse : function(childrenData, parent, callback) {
    var i, n, nodeData;
    try {
      for (var i = 0; i<childrenData.length; i++) {
        var n = this.createNode(childrenData[i]);
        if (n) {
          n.hasChildren = childrenData[i].hasChildren;
          parent.appendChild(n);
        }
      }

      if (typeof callback == "function") {
        callback(this, parent);
      }
    } catch(e) {
      this.handleFailure(childrenData);
    }
  }
});