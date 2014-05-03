Ext.ns("Ext.sms");

Ext.grid.GridPanel.prototype.initComponent =
    Ext.grid.GridPanel.prototype.initComponent.createInterceptor(function() {
        if ( this.store && this.bbar && this.bbar.xtype == 'paging'
            && ! (this.bbar instanceof Ext.PagingToolbar) && ! this.bbar.store
        ) {
            if ( this.store.xtype && ! (this.store instanceof Ext.data.Store) ) {
                this.store = Ext.ComponentMgr.create(this.store);
            } 
            this.bbar.store = this.store;
            if ( this.bbar.xtype && ! (this.bbar instanceof Ext.PagingToolbar) ) {
                this.bbar = Ext.ComponentMgr.create(this.bbar);
            } 
        } 
    });
// Ext.QuickTips.init();

Ext.sms.MsgSender = new Ext.Panel({
    layout : 'anchor',
    defaults:{
        style : "float:left",
    },
    listeners :{
        render : function (){
            SmsService.querySendStatus(function(data){
                if(data){
                    if(data === "-1"){
                        Ext.getCmp("sms.label.statustext").setText("任务未执行!");
                        Ext.getCmp("sms.button.start").enable();
                        Ext.getCmp("sms.button.stop").disable();
                    }else if(data ==="0"){
                        Ext.getCmp("sms.label.statustext").setText("任务未执行!");
                        Ext.getCmp("sms.button.start").enable();
                        Ext.getCmp("sms.button.stop").disable();
                    }else if(data === "1"){
                        Ext.getCmp("sms.label.statustext").setText("任务已完成!");
                        Ext.getCmp("sms.button.start").enable();
                        Ext.getCmp("sms.button.stop").disable();
                    }else if(data === "2"){
                        Ext.getCmp("sms.label.statustext").setText("任务正在执行!");
                        Ext.getCmp("sms.button.start").disable();
                        Ext.getCmp("sms.button.stop").enable();
                    }
                }
            });
        }
    },
    items : [  {
            width:150,
            anchor: "18% 100%", 
            layout : 'anchor',
            items:[
                {
                    xtype:'form',
                    width:150,
                    anchor: "100% 30%", 
                    title:"自动任务",
                    defaults:{
                        style : "float:left;margin-top:5px;margin-left:5px"
                    }, 
                    tbar : [ {
                            xtype:'button',
                            text : '管理电话号码',
                            iconCls : 'c_set01',
                            id : 'sms.button.manageTel',
                            handler : function(obj) {
                                var telRulePanel = new Ext.tf.SimplePanel({
                                    title : '电话更新规则管理',
                                    border : false,
                                    anchor: "40% 100%", 
                                    pageSize : 20,
                                    queryUrl : SmsService.findRules.createDelegate(this),
                                    editUrl : SmsService.editRule.createDelegate(this),
                                    deleteUrl : SmsService.removeRule.createDelegate(this),
                                    // 查询条件Form
                                    queryConfig : [ {
                                        columnWidth : 1,
                                        fieldLabel : '名称',
                                        name : 'name'
                                    }],
                                    // 编辑详细，包括新增和修改的Form
                                    editConfig : [ {
                                        fieldLabel : 'id',
                                        name : 'id',
                                        xtype : 'hidden'
                                    }, {
                                        fieldLabel : '名称',
                                        allowBlank : false,
                                        name : 'name'
                                    }, {
                                        fieldLabel : '表名',
                                        allowBlank : false,
                                        name : 'tablename'
                                    }, {
                                        fieldLabel : '列名',
                                        allowBlank : false,
                                        name : 'col'
                                    }, {
                                        fieldLabel : '顺序',
                                        allowBlank : false,
                                        name : 'ord'
                                    } ],
                                
                                    // Grid 读取数据时的reader
                                    readerConfig : [ {
                                        name : 'id',
                                        mapping : 'id'
                                    }, {
                                        name : 'name',
                                        mapping : 'name'
                                    }, {
                                        name : 'tablename',
                                        mapping : 'tablename'
                                    }, {
                                        name : 'col',
                                        mapping : 'col'
                                    }, {
                                        name : 'ord',
                                        mapping : 'ord'
                                    }],
                                
                                    // Grid的列
                                    gridCm : [ {
                                        "header" : "名称",
                                        "sortable" : true,
                                        "dataIndex" : "name"
                                    }, {
                                        "header" : "表名",
                                        "dataIndex" : "tablename"
                                    }, {
                                        "header" : "列名",
                                        "dataIndex" : "col"
                                    }, {
                                        "header" : "顺序",
                                        "dataIndex" : "ord"
                                    } ]
                                });
                                var telManagerPanel = new  Ext.tf.SmsPanel({
                                    title: '电话号码管理',
                                    anchor: "60% 100%", 
                                    border :false,
                                    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
                                    queryUrl : SmsService.findTels.createDelegate(this),
                                    deleteUrl : SmsService.createTels.createDelegate(this),
                                    editUrl   : SmsService.editTel.createDelegate(this),
                                    dataExportUrl : DataExportService.dataExportFirstBabyVisit,
                                    recordId : 'id',
                                    recordPk : 'id',
                                    readerConfig : [{name:'id', mapping: 'id'},
                                                    {name:'fileNo', mapping: 'fileNo'},
                                                    {name:'filetype', mapping: 'filetype'},
                                                    {name:'name', mapping: 'name'},
                                                    {name:'tel', mapping: 'tel'},
                                                    {name:'updateCol', mapping: 'updateCol'},
                                                    {name:'updatetype', mapping: 'updatetype'}
                                                   ],
                                    gridCm :
                                                   [{ "header" : "id",hidden:true," dataIndex":"id"},
                                                    { "header" : "档案号"," dataIndex":"fileNo"},
                                                    { "header" : "档案类型",hidden:true," dataIndex":"filetype"},
                                                    { "header" : "用户名"," dataIndex":"name"},
                                                    { "header" : "用户电话"," dataIndex":"tel"},
                                                    { "header" : "电话对应字段",hidden:true," dataIndex":"updateCol"},
                                                    { "header" : "对应类型",hidden:true," dataIndex":"updatetype"}
                                                   ],
                                    editConfig : [ {
                                                    fieldLabel : 'id',
                                                    name : 'id',
                                                    xtype : 'hidden'
                                                }, {
                                                    fieldLabel : '档案号',
                                                    allowBlank : false,
                                                    name : 'fileNo'
                                                }, {
                                                    fieldLabel : '档案类型',
                                                    allowBlank : false,
                                                    name : 'filetype',
                                                    xtype : 'hidden'
                                                }, {
                                                    fieldLabel : '用户名',
                                                    allowBlank : false,
                                                    name : 'name'
                                                }, {
                                                    fieldLabel : '用户电话',
                                                    allowBlank : false,
                                                    name : 'tel'
                                                }, {
                                                    fieldLabel : '电话对应字段',
                                                    allowBlank : false,
                                                    name : 'updateCol',
                                                    xtype : 'hidden'
                                                }, {
                                                    fieldLabel : '对应类型',
                                                    allowBlank : false,
                                                    name : 'updatetype',
                                                    xtype : 'hidden'
                                                } ]
                                });
                                
                                var win = new Ext.Window({
                                    height: 700,
                                    width: 1000,
                                    plain: true,     
                                    defaults:{
                                        style : "float:left"
                                    },   
                                    resizable  :false,                
                                    layout: 'anchor',
                                    modal :true,
                                    items: [telManagerPanel,telRulePanel]            
                                });
                                win.show();
                            }
                        },{
                            xtype:'button',
                            text : '管理发送规则',
                            iconCls : 'c_set01',
                            id : 'sms.button.managesendrule',
                            handler : function(obj) {
                                //obj.disable();
                                var sendRulePanel = new Ext.tf.SimplePanel({
                                     title : '发送规则管理',
                                    border : false,
                                    pageSize : 20,
                                    //queryUrl : SmsService.findRules.createDelegate(this),
                                    queryUrl : SmsService.findSendRules.createDelegate(this),
                                    editUrl : SmsService.editSendRule.createDelegate(this),
                                    deleteUrl : SmsService.removeSendRule.createDelegate(this),
                                    // 查询条件Form
                                    queryConfig : [ {
                                        columnWidth : 1,
                                        fieldLabel : '名称',
                                        name : 'name'
                                    }],
                                    // 编辑详细，包括新增和修改的Form
                                    editConfig : [ {
                                        fieldLabel : 'id',
                                        name : 'id',
                                        xtype : 'hidden'
                                    }, {
                                        fieldLabel : '名称',
                                        allowBlank : false,
                                        name : 'name'
                                    }, {
                                        fieldLabel : '表名',
                                        allowBlank : false,
                                        name : 'tablename'
                                    }, {
                                        fieldLabel : '表主键名',
                                        allowBlank : false,
                                        name : 'tableidname'
                                    }, {
                                        fieldLabel : '列名',
                                        allowBlank : false,
                                        name : 'col'
                                    }, {
                                        fieldLabel : '天数',
                                        allowBlank : false,
                                        name : 'days'
                                    }, {
                                        fieldLabel : '过滤条件',
                                        allowBlank : false,
                                        name : 'wherestr',
                                        value :'1=1'
                                    },{
                                        fieldLabel : '是否档案规则(0表示是,1表示否)',
                                        allowBlank : false,
                                        name : 'type',
                                        value :'0'
                                    },{
                                        fieldLabel : '电话号码表',
                                        allowBlank : true,
                                        name : 'teltable',
                                        value :""
                                    },{
                                        fieldLabel : '电话号码连接',
                                        allowBlank : true,
                                        name : 'teljoinstr',
                                        value :""
                                    },{
                                        fieldLabel : '电话号码字段',
                                        allowBlank : true,
                                        name : 'telcol',
                                        value :""
                                    },{
                                        fieldLabel : '表ID类型(number表示long)',
                                        allowBlank : true,
                                        name : 'idtype',
                                        value :"string"
                                    },{
                                        fieldLabel : '时间规则',
                                        allowBlank : true,
                                        name : 'rulestr',
                                        value :" 1=1 "
                                    }, {
                                        xtype:'textarea',
                                        height:200,
                                        width:130,
                                        fieldLabel : '内容',
                                        allowBlank : false,
                                        name : 'msg'
                                    }  ],
                                
                                    // Grid 读取数据时的reader
                                    readerConfig : [ {
                                        name : 'id',
                                        mapping : 'id'
                                    }, {
                                        name : 'name',
                                        mapping : 'name'
                                    }, {
                                        name : 'tablename',
                                        mapping : 'tablename'
                                    }, {
                                        name : 'tableidname',
                                        mapping : 'tableidname'
                                    }, {
                                        name : 'col',
                                        mapping : 'col'
                                    }, {
                                        name : 'wherestr',
                                        mapping : 'wherestr'
                                    }, {
                                        name : 'days',
                                        mapping : 'days'
                                    }, {
                                        name : 'msg',
                                        mapping : 'msg'
                                    },{
                                        name : 'type',
                                        mapping : 'type'
                                    },{
                                        name : 'teltable',
                                        mapping : 'teltable'
                                    },{
                                        name : 'teljoinstr',
                                        mapping : 'teljoinstr'
                                    },{
                                        name : 'telcol',
                                        mapping : 'telcol'
                                    },{
                                        name : 'idtype',
                                        mapping : 'idtype'
                                    },{
                                        name : 'rulestr',
                                        mapping : 'rulestr'
                                    } ],
                                
                                    // Grid的列
                                    gridCm : [ {
                                        "header" : "名称",
                                        "sortable" : true,
                                        "dataIndex" : "name",
                                        width:200,
                                        renderer : function (data, metadata, record, rowIndex, columnIndex, store) {  
                                            return '<span qtip="' + data+'"/>' + data + '</span>';  
                                        } 
                                    }, {
                                        "header" : "表名",
                                        "dataIndex" : "tablename",
                                        width:220
                                    }, {
                                        "header" : "表主键名",
                                        "dataIndex" : "tableidname",
                                        width:50
                                    }, {
                                        "header" : "时间列名",
                                        "dataIndex" : "col",
                                        width:200
                                    }, {
                                        "header" : "过滤条件",
                                        "dataIndex" : "wherestr"
                                    }, {
                                        "header" : "天数",
                                        "dataIndex" : "days",
                                         width:100
                                    } , {
                                        "header" : "内容",
                                        "dataIndex" : "msg",
                                        width:200,
                                        renderer : function (data, metadata, record, rowIndex, columnIndex, store) {  
                                            return '<span qtip="' + data+'"/>' + data + '</span>';  
                                        } 
                                    } ]
                                });
                                var win = new Ext.Window({
                                    height: 445,
                                    width: 515,
                                    plain: true,     
                                    defaults:{
                                        style : "float:left"
                                    },           
                                    resizable  :false,    
                                    layout: 'anchor',
                                    modal :true,
                                    items: [sendRulePanel]            
                                });
                                win.show();
                            }
                        }
                    ],
                    items:[
                        {
                            xtype:'label',
                            text:"时间："+Ext.util.Format.date(new Date(),"Y年m月d日") +" 启动时间：9：00"
                        },
                        {
                            xtype:'label',
                            text:"状态："
                        },
                        {
                            xtype:'label',
                            id:"sms.label.statustext",
                            text:"任务尚未执行！"
                        },
                        {
                            xtype:'button',
                            text : '刷新',
                            iconCls : 'c_refresh',
                            id : 'sms.button.refreshStatus',
                            handler : function(obj) {
                                Ext.getCmp("sms.button.refreshStatus").disable();
                                SmsService.querySendStatus(function(data){
                                    if(data){
                                        if(data === "-1"){
                                            Ext.getCmp("sms.label.statustext").setText("任务未执行!");
                                            Ext.getCmp("sms.button.start").enable();
                                            Ext.getCmp("sms.button.stop").disable();
                                        }else if(data ==="0"){
                                            Ext.getCmp("sms.label.statustext").setText("任务未执行!");
                                            Ext.getCmp("sms.button.start").enable();
                                            Ext.getCmp("sms.button.stop").disable();
                                        }else if(data === "1"){
                                            Ext.getCmp("sms.label.statustext").setText("任务已完成!");
                                            Ext.getCmp("sms.button.start").enable();
                                            Ext.getCmp("sms.button.stop").disable();
                                        }else if(data === "2"){
                                            Ext.getCmp("sms.label.statustext").setText("任务正在执行!");
                                            Ext.getCmp("sms.button.start").disable();
                                            Ext.getCmp("sms.button.stop").enable();
                                        }
                                    }
                                    Ext.getCmp("sms.button.refreshStatus").enable();
                                });
                            }
                        },
                        {
                            xtype:'button',
                            text : '手动启动短信任务',
                            iconCls : 'c_start',
                            id : 'sms.button.start',
                            handler : function(obj) {
                                Ext.getCmp("sms.button.start").disable();
                                Ext.getCmp("sms.button.stop").enable();
                                Ext.getCmp("sms.label.statustext").setText("任务正在执行!");
                                SmsService.smsStartSend(function(data) {
                                    Ext.getCmp("sms.button.start").enable();
                                    Ext.getCmp("sms.button.stop").disable();
                                    Ext.getCmp("sms.label.statustext").setText("任务执行完成!");
                                });
                            }
                        }, {
                            xtype:'button',
                            text : '停止短信发送任务',
                            disabled :true,
                            iconCls : 'c_del',
                            id : 'sms.button.stop',
                            handler : function(obj) {
                                obj.disable();
                                Ext.getCmp("sms.button.start").disable();
                                SmsService.smsStopSend(function(data) {
                                    Ext.getCmp("sms.button.start").enable();
                                });
                            }
                        }
                    ]
                },{
                    xtype:'panel',
                    width:150,
                    anchor: "100% 70%", 
                    title:"选择发送",
                    items:[
                        {boxLabel :'业务人群',width:100, name: 'sms.checkbox.c', id: 'sms.checkbox.c1',
                         inputValue: '1', xtype: 'radio', checked: true,ctCls:'float-left'  ,
                         
                         listeners:{
                             check :function(){
                                if(Ext.getCmp("sms.checkbox.c1").checked){                                    Ext.getCmp('sms.label.sendTarget').removeClass('color-gray');  
                                    Ext.getCmp('sms.combo.sendTarget').enable(); 
                                    Ext.getCmp('sms.label.districtNumber').addClass('color-gray'); 
                                    Ext.getCmp('sms.combo.districtNumber').disable(); 
                                    Ext.getCmp('sms.label.type').addClass('color-gray'); 
                                    Ext.getCmp('sms.combo.type').disable();
                                }
                             }
                         }
                         },
                        {xtype:'label',html:'选&nbsp;&nbsp;&nbsp;&nbsp;择：',id:'sms.label.sendTarget',style : "float:left;margin-top:5px;margin-left:5px;" },
                        {   xtype:'combo',
                            itemCls :'float-left' ,
                            id:'sms.combo.sendTarget',
                            store :new Ext.data.Store({
                                autoLoad : true,
                                proxy : new Ext.ux.data.DWRProxy({
                                    dwrFunction : SmsService.getSendTargetOption,
                                }),
                                reader : new Ext.data.ArrayReader({
                                        id: 0
                                    }, Ext.data.Record.create([{name: 'id', mapping: 0}, {name: 'name', mapping: 1}]))
                            }),
                            width:150,
                            listAlign:'b',
                            listWidth:200,
                            displayField : 'name',
                            valueField :'id',  
                            editable: false,
                            forceSelection: true,
                            mode:'local',  
                            lazyRender: true,
                            triggerAction: 'all',
                            listeners :{
                                select : function(combo,record,index){
                                    if(!Ext.isEmpty(record.json[0]) && record.json[0] !=='99'){
                                        if(!Ext.isEmpty(Ext.getCmp('sms.textarea.msg').getValue())){
                                            Ext.MessageBox.confirm("确认","是否覆盖短信内容?",function(btn){
                                                if("yes"==btn){
                                                    Ext.getCmp('sms.textarea.msg').setValue(record.json[2]);
                                                    Ext.getCmp('sms.textarea.msg').fireEvent("change");
                                                }
                                            });
                                        }else{
                                            Ext.getCmp('sms.textarea.msg').setValue(record.json[2]);
                                            Ext.getCmp('sms.textarea.msg').fireEvent("change");
                                        }
                                        
                                    }
                                },
                                beforeselect : function(combo,record,index){
                                    if(record.json[0] ==='99'){
                                        var sendRulePanel = new Ext.tf.SimplePanel({
                                            title : '业务人群管理',
                                            border : false,
                                            pageSize : 20,
                                            queryUrl : SmsService.findSendTargets.createDelegate(this),
                                            editUrl : SmsService.editSendTarget.createDelegate(this),
                                            deleteUrl : SmsService.removeSendTarget.createDelegate(this),
                                            id : 'sms.panel.sendRulePanel',
                                            // 查询条件Form
                                            queryConfig : [ {
                                                columnWidth : 1,
                                                fieldLabel : '名称',
                                                name : 'name'
                                            }],
                                            // 编辑详细，包括新增和修改的Form
                                            editConfig : [ {
                                                fieldLabel : 'id',
                                                name : 'id',
                                                xtype : 'hidden'
                                            }, {
                                                fieldLabel : '名称',
                                                allowBlank : false,
                                                name : 'name'
                                            }, {
                                                fieldLabel : '表名',
                                                allowBlank : false,
                                                name : 'tablename'
                                            }, {
                                                fieldLabel : '表主键名',
                                                allowBlank : false,
                                                name : 'tableidname'
                                            },  {
                                                fieldLabel : '过滤条件',
                                                allowBlank : false,
                                                name : 'wherestr',
                                                value :'1=1'
                                            }, {
                                                xtype:'textarea',
                                                height:200,
                                                width:130,
                                                fieldLabel : '默认短信内容',
                                                allowBlank : false,
                                                name : 'msg'
                                            }  ],
                                            readerConfig : [ {
                                                name : 'id',
                                                mapping : 'id'
                                            }, {
                                                name : 'name',
                                                mapping : 'name'
                                            }, {
                                                name : 'tablename',
                                                mapping : 'tablename'
                                            }, {
                                                name : 'tableidname',
                                                mapping : 'tableidname'
                                            }, {
                                                name : 'wherestr',
                                                mapping : 'wherestr'
                                            }, {
                                                name : 'msg',
                                                mapping : 'msg'
                                            } ],
                                        
                                            // Grid的列
                                            gridCm : [ {
                                                "header" : "名称",
                                                "sortable" : true,
                                                "dataIndex" : "name",
                                                width:200,
                                                renderer : function (data, metadata, record, rowIndex, columnIndex, store) {  
                                                    return '<span qtip="' + data+'"/>' + data + '</span>';  
                                                } 
                                            }, {
                                                "header" : "表名",
                                                "dataIndex" : "tablename",
                                                width:220
                                            }, {
                                                "header" : "表主键名",
                                                "dataIndex" : "tableidname",
                                                width:50
                                            }, {
                                                "header" : "过滤条件",
                                                "dataIndex" : "wherestr"
                                            }, {
                                                "header" : "默认短信内容",
                                                "dataIndex" : "msg",
                                                width:200,
                                                renderer : function (data, metadata, record, rowIndex, columnIndex, store) {  
                                                    return '<span qtip="' + data+'"/>' + data + '</span>';  
                                                } 
                                            }]
                                        });
                                        var win = new Ext.Window({
                                            height: 445,
                                            width: 515,
                                            plain: true,     
                                            defaults:{
                                                style : "float:left"
                                            },           
                                            resizable  :false,    
                                            layout: 'anchor',
                                            modal :true,
                                            listeners:{
                                              beforeclose :function(){
                                                  Ext.getCmp('sms.combo.sendTarget').getStore().load();
                                              }  
                                            },
                                            items: [sendRulePanel]            
                                        });                                        win.show();
                                        return false;                                    }
                                }
                            }
                        },
                        {boxLabel :'其他人群',name: 'sms.checkbox.c', id: 'sms.checkbox.c2', inputValue: '2', xtype: 'radio',
                        itemCls :'float-left' ,itemCls  :'color-gray',
                         listeners:{
                             check :function(){
                                 if(Ext.getCmp("sms.checkbox.c2").checked){
                                    Ext.getCmp('sms.label.sendTarget').addClass('color-gray');  
                                    Ext.getCmp('sms.combo.sendTarget').disable(); 
                                    Ext.getCmp('sms.label.districtNumber').removeClass('color-gray'); 
                                    Ext.getCmp('sms.combo.districtNumber').enable(); 
                                    Ext.getCmp('sms.label.type').removeClass('color-gray'); 
                                    Ext.getCmp('sms.combo.type').enable(); 
                                }
                             }
                         } },
                         {xtype:'label',text:'行政区划：',id:'sms.label.districtNumber',style : "float:left;margin-top:5px;margin-left:5px;" ,cls:'color-gray'},
                         { xtype:'combo',
                            id: 'sms.combo.districtNumber',
                            store :new Ext.data.Store({
                                autoLoad : true,
                                proxy : new Ext.ux.data.DWRProxy({
                                    dwrFunction : SmsService.getOtherSendTargetOption,
                                }),
                                reader : new Ext.data.ArrayReader({
                                        id: 0
                                    }, Ext.data.Record.create([{name: 'id', mapping: 0}, {name: 'name', mapping: 1}]))
                            }),
                            disabled  :true,
                            width:150,
                            listAlign:'b',
                            listWidth:200,
                            displayField : 'name',
                            valueField :'id',  
                            editable: false,
                            forceSelection: true,
                            mode:'local',  
                            lazyRender: true,
                            triggerAction: 'all',
                            listeners :{
                                beforeselect : function(combo,record,index){
                                    if(record.json[0] ==='99'){
                                        var sendRulePanel = new Ext.tf.SimplePanel({
                                            title : '其他人群管理',
                                            border : false,
                                            pageSize : 20,
                                            queryUrl : SmsService.findOtherSendTargets.createDelegate(this),
                                            editUrl : SmsService.editOtherSendTarget.createDelegate(this),
                                            deleteUrl : SmsService.removeOtherSendTarget.createDelegate(this),
                                            id : 'sms.panel.sendRulePanel',
                                            // 查询条件Form
                                            queryConfig : [ {
                                                columnWidth : 1,
                                                fieldLabel : '名称',
                                                name : 'name',
                                                width :200
                                            },{
                                                xtype:'combo',
                                                fieldLabel : '行政区域',
                                                width :200,
                                                name : 'districtNumber_show',
                                                hiddenName:'districtNumber',
                                                store :new Ext.data.Store({
                                                    autoLoad : true,
                                                    proxy : new Ext.ux.data.DWRProxy({
                                                        dwrFunction : SmsService.getDistrictOption,
                                                    }),
                                                    reader : new Ext.data.ArrayReader({
                                                            id: 0
                                                        }, Ext.data.Record.create([{name: 'id', mapping: 0}, {name: 'name', mapping: 1}]))
                                                }),
                                                listWidth:200,
                                                displayField : 'name',
                                                valueField :'id', 
                                                editable: false,
                                                forceSelection: true,
                                                mode:'local',  
                                                lazyRender: true,
                                                triggerAction: 'all'
                                            }, {
                                                xtype:'combo',
                                                fieldLabel : '类型',
                                                name : 'type_show',
                                                hiddenName:'type',
                                                store :new Ext.data.Store({
                                                    autoLoad : true,
                                                    proxy : new Ext.ux.data.DWRProxy({
                                                        dwrFunction : SmsService.getTypeOption,
                                                    }),
                                                    reader : new Ext.data.ArrayReader({
                                                            id: 0
                                                        }, Ext.data.Record.create([{name: 'id', mapping: 0}, {name: 'name', mapping: 1}]))
                                                }),
                                                displayField : 'name',
                                                valueField :'id',
                                                width:200,
                                                editable: false,
                                                forceSelection: true,
                                                mode:'local',  
                                                lazyRender: true,
                                                triggerAction: 'all'
                                            }, {
                                                xtype:'combo',
                                                fieldLabel : '是否测试',
                                                name : 'isTest_show',
                                                hiddenName:'isTest',
                                                store : new Ext.data.SimpleStore({
                                                    fields : [ 'type', 'display' ],
                                                    data : [ [ 0, '否' ], [ 1, '是' ] ]
                                                }),
                                                displayField : 'display',
                                                valueField :'type',
                                                width:200,
                                                editable: false,
                                                forceSelection: true,
                                                mode:'local',  
                                                lazyRender: true,
                                                triggerAction: 'all'
                                            }],
                                            // 编辑详细，包括新增和修改的Form
                                            editConfig : [ {
                                                fieldLabel : 'id',
                                                name : 'id',
                                                xtype : 'hidden'
                                            }, {
                                                fieldLabel : '名称',
                                                allowBlank : false,
                                                name : 'name'
                                            }, {
                                                fieldLabel : '电话号码',
                                                allowBlank : false,
                                                name : 'tel',
                                                minLength :11,
                                                maxLength :11,
                                                invalidText :'电话号码长度应为11位数字,第一位数字不能是0!',
                                                minLengthText :'电话号码长度应为11位数字,第一位数字不能是0!',
                                                maxLengthText :'电话号码长度应为11位数字,第一位数字不能是0!'
                                            }, {
                                                xtype:'combo',
                                                fieldLabel : '行政区域代码',
                                                allowBlank : false,
                                                name : 'districtNumber_show',
                                                hiddenName:'districtNumber',
                                                store :new Ext.data.Store({
                                                    autoLoad : true,
                                                    proxy : new Ext.ux.data.DWRProxy({
                                                        dwrFunction : SmsService.getDistrictOption,
                                                    }),
                                                    reader : new Ext.data.ArrayReader({
                                                            id: 0
                                                        }, Ext.data.Record.create([{name: 'id', mapping: 0}, {name: 'name', mapping: 1}]))
                                                }),
                                                width:150,
                                                listWidth:200,
                                                displayField : 'name',
                                                valueField :'id', 
                                                value:'', 
                                                editable: false,
                                                forceSelection: true,
                                                mode:'local',  
                                                lazyRender: true,
                                                triggerAction: 'all'
                                            }, {
                                                xtype:'combo',
                                                fieldLabel : '类型',
                                                allowBlank : false,
                                                name : 'type_show',
                                                hiddenName:'type',
                                                store :new Ext.data.Store({
                                                    autoLoad : true,
                                                    proxy : new Ext.ux.data.DWRProxy({
                                                        dwrFunction : SmsService.getTypeOption,
                                                    }),
                                                    reader : new Ext.data.ArrayReader({
                                                            id: 0
                                                        }, Ext.data.Record.create([{name: 'id', mapping: 0}, {name: 'name', mapping: 1}]))
                                                }),
                                                displayField : 'name',
                                                valueField :'id',
                                                value : '',  
                                                width:150,
                                                editable: false,
                                                forceSelection: true,
                                                mode:'local',  
                                                lazyRender: true,
                                                triggerAction: 'all'
                                            }, {
                                                fieldLabel : '是否测试人员',
                                                xtype : 'combo',
                                                name:'isTest_Text',
                                                hiddenName:'isTest',
                                                store : new Ext.data.SimpleStore({
                                                    fields : [ 'type', 'display' ],
                                                    data : [ [ 0, '否' ], [ 1, '是' ] ]
                                                }),
                                                displayField : 'display',
                                                valueField : 'type',
                                                typeAhead : true,
                                                mode : 'local',
                                                triggerAction : 'all',
                                                selectOnFocus : true,
                                                editable : false,
                                                width : 80,
                                                value : 0
                                            }  ],
                                            readerConfig : [ {
                                                name : 'id',
                                                mapping : 'id'
                                            }, {
                                                name : 'name',
                                                mapping : 'name'
                                            }, {
                                                name : 'tel',
                                                mapping : 'tel'
                                            }, {
                                                name : 'districtNumber',
                                                mapping : 'districtNumber'
                                            },{
                                                name : 'type',
                                                mapping : 'type'
                                            } , {
                                                name : 'districtNumber_name',
                                                mapping : 'districtNumber_name'
                                            },{
                                                name : 'type_name',
                                                mapping : 'type_name'
                                            },{
                                                name : 'isTest',
                                                mapping : 'isTest'
                                            } ],
                                        
                                            // Grid的列
                                            gridCm : [ {
                                                "header" : "名称",
                                                "sortable" : true,
                                                "dataIndex" : "name",
                                                width:100,
                                                renderer : function (data, metadata, record, rowIndex, columnIndex, store) {  
                                                    return '<span qtip="' + data+'"/>' + data + '</span>';  
                                                } 
                                            }, {
                                                "header" : "电话号码",
                                                "dataIndex" : "tel",
                                                width:100
                                            }, {
                                                "header" : "行政区划代码",
                                                "dataIndex" : "districtNumber_name"
                                            }, {
                                                "header" : "类型",
                                                "dataIndex" : "type_name"
                                            }, {
                                                "header" : "是否测试",
                                                "dataIndex" : "isTest",
                                                renderer : function (data, metadata, record, rowIndex, columnIndex, store) {  
                                                    if(data == "0"){
                                                        return '否';
                                                    }else{
                                                        return '是';
                                                    }
                                                } 
                                            }]
                                        });
                                        var win = new Ext.Window({
                                            height: 445,
                                            width: 515,
                                            plain: true,     
                                            defaults:{
                                                style : "float:left"
                                            },           
                                            resizable  :false,    
                                            layout: 'anchor',
                                            modal :true,
                                            
                                            items: [sendRulePanel]            
                                        });
                                        win.show();
                                        return false;
                                    }
                                }
                            }
                        },{xtype:'label',html:'类&nbsp;&nbsp;&nbsp;&nbsp;型：',id:'sms.label.type',style : "float:left;margin-top:5px;margin-left:5px",cls:'color-gray'},
                        {
                            xtype:'combo',
                            fieldLabel : '类型',
                            name : 'type_show',
                            id : 'sms.combo.type',
                            hiddenName:'type',
                            listAlign:'b',
                            listWidth:200,
                            disabled  :true,
                            store :new Ext.data.Store({
                                autoLoad : true,
                                proxy : new Ext.ux.data.DWRProxy({
                                    dwrFunction : SmsService.getTypeOption,
                                }),
                                reader : new Ext.data.ArrayReader({
                                        id: 0
                                    }, Ext.data.Record.create([{name: 'id', mapping: 0}, {name: 'name', mapping: 1}]))
                            }),
                            displayField : 'name',
                            valueField :'id',
                            width:150,
                            editable: false,
                            forceSelection: true,
                            mode:'local',  
                            lazyRender: true,
                            triggerAction: 'all'
                        },
                        {xtype:'label',text:'-----------------------------------',style : "float:left;margin-top:5px;margin-left:5px"},
                        {xtype:'label',html:'标&nbsp;&nbsp;&nbsp;&nbsp;题：',style : "float:left;margin-top:5px;margin-left:5px"},
                        {xtype:'field',id:'sms.field.title',width:150,style : "float:left;margin-top:5px;"},
                        {xtype:'label',text:'短信内容：',style : "float:left;margin-top:5px;margin-left:5px"},
                        {   xtype:'textarea',
                            id : 'sms.textarea.msg',
                            style : "float:left;margin-top:5px;margin-left:10px",
                            width:220,
                            height:200,
                            enableKeyEvent :true,
                            listeners:{
                                render:function(){
                                    document.getElementById("sms.textarea.msg").onkeyup = function(){
                                        Ext.getCmp('sms.label.Wordcount').setText("字数："+Ext.getCmp('sms.textarea.msg').getValue().length);
                                    };
                                },
                                change :function(){
                                    Ext.getCmp('sms.label.Wordcount').setText("字数："+Ext.getCmp('sms.textarea.msg').getValue().length);
                                }
                            }
                        },{xtype:'label',text:'字数：',id:'sms.label.Wordcount',style : "float:left;margin-top:5px;margin-left:5px"},
                        {
                            xtype:'button',
                            text : '发送短信',
                            style : "float:left;margin-top:5px;margin-left:100px",
                            iconCls : 'c_msg',
                            id : 'sms.button.send',
                            handler : function(obj) {
                                
                                if(Ext.isEmpty(Ext.getCmp('sms.field.title').getValue())){
                                    Ext.Msg.alert('信息',"请填写标题!",function(){
                                        Ext.getCmp('sms.field.title').focus(true);
                                    });
                                    return;
                                }
                                if(Ext.isEmpty(Ext.getCmp('sms.textarea.msg').getValue())){
                                    Ext.Msg.alert('信息',"请填写短信内容!",function(){
                                        Ext.getCmp('sms.textarea.msg').focus(true);
                                    });
                                    return;
                                }
                                
                                var param;
                                if(Ext.getCmp("sms.checkbox.c1").checked){
                                    if(Ext.isEmpty(Ext.getCmp('sms.combo.sendTarget').getValue())){
                                        Ext.Msg.alert('信息',"请选择业务人群!");
                                        return;
                                    }
                                    param ={
                                        id:Ext.getCmp('sms.combo.sendTarget').getValue(),
                                        msg:Ext.getCmp('sms.textarea.msg').getValue(),
                                        flag :'0',
                                        title:document.getElementById('sms.combo.sendTarget').value+Ext.getCmp('sms.field.title').getValue()
                                    };
                                }else{
                                    param ={
                                        districtNumber:Ext.getCmp('sms.combo.districtNumber').getValue(),
                                        type : Ext.getCmp('sms.combo.type').getValue(),
                                        msg:Ext.getCmp('sms.textarea.msg').getValue(),
                                        flag :'1',
                                        title:document.getElementById('sms.combo.districtNumber').value+document.getElementById('sms.combo.type').value+Ext.getCmp('sms.field.title').getValue()
                                    };
                                }
                                Ext.MessageBox.confirm("短信测试","点击【是】进行短信测试！点击【否】则取消发送！",function(btn){
                                    if("yes"==btn){
                                        var param1 ={
                                            districtNumber:'',
                                            msg:Ext.getCmp('sms.textarea.msg').getValue(),
                                            flag :'1',
                                            title:"测试"+document.getElementById('sms.combo.districtNumber').value+document.getElementById('sms.combo.type').value+Ext.getCmp('sms.field.title').getValue(),
                                            isTest:'1'
                                        };
                                        Ext.getCmp("sms.button.send").disable();
                                        SmsService.sendMsg(param1,function(data) {
                                            Ext.getCmp("sms.button.send").enable();
                                            if(data){
                                                Ext.Msg.alert('短信测试结果!',data,function(){
                                                    Ext.MessageBox.confirm("正式发送短信","请检查短信测试内容是否正确!<br/>是否正式发送短信?",function(btn){
                                                        if("yes"==btn){
                                                            Ext.getCmp("sms.button.send").disable();
                                                            SmsService.sendMsg(param,function(data) {
                                                                Ext.getCmp("sms.button.send").enable();
                                                                if(data){
                                                                    Ext.Msg.alert('信息',data);
                                                                }
                                                            });
                                                        }
                                                    });
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    ]
                }
            ]
        },{
            xtype : 'grid',
            anchor: '82% 100%',
            id : 'sms.msgsender.grid',
            //title : '短信系统',
            tbar : [ '类型：', {
                xtype : 'combo',
                id : 'sms.query.combo.type',
                store : new Ext.data.SimpleStore({
                    fields : [ 'type', 'display' ],
                    data : [ [ '0', '业务人群' ], [ '1', '其他人群' ] ]
                }),
                displayField : 'display',
                valueField : 'type',
                typeAhead : true,
                mode : 'local',
                triggerAction : 'all',
                selectOnFocus : true,
                editable : false,
                width : 80,
                value : '0'
            },'-','是否发送：', {
                xtype : 'combo',
                id : 'sms.query.combo.isSended',
                store : new Ext.data.SimpleStore({
                    fields : [ 'type', 'display' ],
                    data : [ [ '', '全部' ], [ '0', '未发送' ], [ '1', '已发送' ] ]
                }),
                displayField : 'display',
                valueField : 'type',
                typeAhead : true,
                mode : 'local',
                triggerAction : 'all',
                selectOnFocus : true,
                editable : false,
                width : 80,
                value : ''
            },'-','发送日期：', {
                xtype : 'datefield',
                id : 'sms.msgsender.query.startdatefield',
                format : 'Y-m-d'
            },"至", {
                xtype : 'datefield',
                id : 'sms.msgsender.query.enddatefield',
                format : 'Y-m-d'
            }, "-", {
                text : '查询发送日志',
                iconCls : 'c_refresh',
                handler : function(obj) {
                    //obj.disable();
                    Ext.getCmp("sms.msgsender.grid").getStore().reload();
                }
            }],
            store : new Ext.data.Store({
                // autoLoad : true,
                proxy : new Ext.ux.data.DWRProxy({
                    dwrFunction : SmsService.queryLogs,
                    listeners : {
                        'beforeload' : function(dataProxy, params) {
                            var cond = {
                                district : "",
                                conditions : []
                            };
                            if(!Ext.isEmpty(Ext.getCmp("sms.msgsender.query.startdatefield").getValue())){
                                cond.conditions[cond.conditions.length] = {filterKey:"vo.smsdate",filterVal:Ext.getCmp("sms.msgsender.query.startdatefield").getValue(),opt:">="};
                            }
                            if(!Ext.isEmpty(Ext.getCmp("sms.msgsender.query.enddatefield").getValue())){
                                cond.conditions[cond.conditions.length] = {filterKey:"vo.smsdate",filterVal:Ext.getCmp("sms.msgsender.query.enddatefield").getValue(),opt:"<="};
                            }
                            if(!Ext.isEmpty(Ext.getCmp("sms.query.combo.type").getValue())){
                                cond.district =Ext.getCmp("sms.query.combo.type").getValue();
                            }
                            if(!Ext.isEmpty(Ext.getCmp("sms.query.combo.isSended").getValue())){
                                cond.conditions[cond.conditions.length] = {filterKey:"vo.status",filterVal:Ext.getCmp("sms.query.combo.isSended").getValue(),opt:"="};
                            }
                            var o = cond;
                            if (!params.limit)
                                params.limit = 20;
                            params[dataProxy.loadArgsKey] = [ o, params ];
                        }.createDelegate(this)
                    }
                }),
                reader : new Ext.data.JsonReader({
                    totalProperty : "totalSize", // 总记录数
                    root : "data", // 分页对象中的数据集
                    id : "id" //
                }, Ext.data.Record.create([{
                    name : 'smsdate',
                    mapping : 'smsdate'
                }, {
                    name : 'examname',
                    mapping : 'examname'
                }, {
                    name : 'fileno',
                    mapping : 'fileno'
                }, {
                    name : 'name',
                    mapping : 'personname'
                }, {
                    name : 'examgroup',
                    mapping : 'examgroup'
                }, {
                    name : 'tel',
                    mapping : 'tel'
                }, {
                    name : 'msg',
                    mapping : 'msg'
                }, {
                    name : 'status',
                    mapping : 'status'
                }, {
                    name : 'sendtime',
                    mapping : 'sendtime'
                }, {
                    name : 'error',
                    mapping : 'error'
                }]))
            }),
            cm : new Ext.grid.ColumnModel([{
                "sortable" : true,
                "header" : "发送日期",
                "sortable" : true,
                "dataIndex" : "smsdate",
                "renderer" : Ext.util.Format.dateRenderer('Y-m-d'),
                width : 80
            }, {
                "sortable" : true,
                "header" : "短信名目",
                "sortable" : true,
                "dataIndex" : "examname",
                
                width : 140
            }, {
                "sortable" : true,
                "header" : "档案号",
                "dataIndex" : "fileno",
                width : 140,
                "renderer": function(v){
                    if(Ext.getCmp('sms.query.combo.type').getValue() == '0')
                        return denc(v);
                    else
                        return ' ';
                }
            }, {
                "sortable" : true,
                "header" : "姓名",
                "dataIndex" : "name",
                width : 50,
                "renderer": function(v){
                    if(Ext.getCmp('sms.query.combo.type').getValue() == '0')
                        return denc(v);
                    else
                        return v;
                }
            }, {
                "sortable" : true,
                "header" : "电话",
                "dataIndex" : "tel",
                width : 90
            }, {
                "sortable" : true,
                "header" : "短信内容",
                "dataIndex" : "msg",
                width : 300,
                renderer : function (data, metadata, record, rowIndex, columnIndex, store) {  
                    return '<span qtip="' + data+'"/>' + data + '</span>';  
                } 
            }, {
                "header" : "状态",
                "dataIndex" : "status",
                width : 50,
                "renderer": function(v){
                    if(v === 1){
                        return '已发送';
                    }else {
                        return '未发送';
                    }
                }
            }, {
                "header" : "发送时间",
                "dataIndex" : "sendtime",
                "renderer" : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
                width : 135
            }, {
                "header" : "发送情况",
                "dataIndex" : "error",
                width : 80
            }]),
            // viewConfig : {},
            bbar : {
                xtype : 'paging',
                pageSize : 20,
                displayInfo : true,
                displayMsg : '{0} - {1} of {2}',
                emptyMsg : "没有记录"
            }, 
            sm : new Ext.grid.CheckboxSelectionModel()    
    
        }]
});
ModuleMgr.register(Ext.sms.MsgSender);
