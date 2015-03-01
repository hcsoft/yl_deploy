Ext.ns("Ext.task");

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

Ext.task.TaskManager = new Ext.Panel({
    layout : 'anchor',
    defaults:{
        style : "float:left",
    },
    listeners :{
        render : function (){
            TaskService.querySendStatus(function(data){
                if(data){
                    if(data === "-1"){
                        Ext.getCmp("task.label.statustext").setText("任务未执行!");
                        Ext.getCmp("task.button.start").enable();
                        Ext.getCmp("task.button.stop").disable();
                    }else if(data ==="0"){
                        Ext.getCmp("task.label.statustext").setText("任务未执行!");
                        Ext.getCmp("task.button.start").enable();
                        Ext.getCmp("task.button.stop").disable();
                    }else if(data === "1"){
                        Ext.getCmp("task.label.statustext").setText("任务已完成!");
                        Ext.getCmp("task.button.start").enable();
                        Ext.getCmp("task.button.stop").disable();
                    }else if(data === "2"){
                        Ext.getCmp("task.label.statustext").setText("任务正在执行!");
                        Ext.getCmp("task.button.start").disable();
                        Ext.getCmp("task.button.stop").enable();
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
                    width:200,
                    anchor: "100% 20%", 
                    title:"自动任务",
                    defaults:{
                        style : "float:left;margin-top:5px;margin-left:5px"
                    }, 
                    tbar : [ {
                            xtype:'button',
                            text : '管理电话号码',
                            iconCls : 'c_set01',
                            id : 'task.button.manageTel',
                            handler : function(obj) {
                                var telRulePanel = new Ext.tf.SimplePanel({
                                    title : '电话更新规则管理',
                                    border : false,
                                    anchor: "40% 100%", 
                                    pageSize : 20,
                                    queryUrl : TaskService.findRules.createDelegate(this),
                                    editUrl : TaskService.editRule.createDelegate(this),
                                    deleteUrl : TaskService.removeRule.createDelegate(this),
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
                                    queryUrl : TaskService.findTels.createDelegate(this),
                                    deleteUrl : TaskService.createTels.createDelegate(this),
                                    editUrl   : TaskService.editTel.createDelegate(this),
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
                                                    { "header" : "档案号"," dataIndex":"fileno"},
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
                            text : '管理任务规则',
                            iconCls : 'c_set01',
                            id : 'task.button.managesendrule',
                            handler : function(obj) {
                                //obj.disable();
                                var sendRulePanel = new Ext.tf.SimplePanel({
                                     title : '任务规则管理',
                                    border : false,
                                    pageSize : 20,
                                    //queryUrl : TaskService.findRules.createDelegate(this),
                                    queryUrl : TaskService.findSendRules.createDelegate(this),
                                    editUrl : TaskService.editSendRule.createDelegate(this),
                                    deleteUrl : TaskService.removeSendRule.createDelegate(this),
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
                            id:"task.label.statustext",
                            text:"任务尚未执行！"
                        },
                        {
                            xtype:'button',
                            text : '刷新',
                            iconCls : 'c_refresh',
                            id : 'task.button.refreshStatus',
                            handler : function(obj) {
                                Ext.getCmp("task.button.refreshStatus").disable();
                                TaskService.querySendStatus(function(data){
                                    if(data){
                                        if(data === "-1"){
                                            Ext.getCmp("task.label.statustext").setText("任务未执行!");
                                            Ext.getCmp("task.button.start").enable();
                                            Ext.getCmp("task.button.stop").disable();
                                        }else if(data ==="0"){
                                            Ext.getCmp("task.label.statustext").setText("任务未执行!");
                                            Ext.getCmp("task.button.start").enable();
                                            Ext.getCmp("task.button.stop").disable();
                                        }else if(data === "1"){
                                            Ext.getCmp("task.label.statustext").setText("任务已完成!");
                                            Ext.getCmp("task.button.start").enable();
                                            Ext.getCmp("task.button.stop").disable();
                                        }else if(data === "2"){
                                            Ext.getCmp("task.label.statustext").setText("任务正在执行!");
                                            Ext.getCmp("task.button.start").disable();
                                            Ext.getCmp("task.button.stop").enable();
                                        }
                                    }
                                    Ext.getCmp("task.button.refreshStatus").enable();
                                });
                            }
                        },
                        {
                            xtype:'button',
                            text : '启动任务生成',
                            iconCls : 'c_start',
                            id : 'task.button.start',
                            handler : function(obj) {
                                Ext.getCmp("task.button.start").disable();
                                Ext.getCmp("task.button.stop").enable();
                                Ext.getCmp("task.label.statustext").setText("任务正在执行!");
                                TaskService.smsStartSend(function(data) {
                                    Ext.getCmp("task.button.start").enable();
                                    Ext.getCmp("task.button.stop").disable();
                                    Ext.getCmp("task.label.statustext").setText("任务执行完成!");
                                });
                            }
                        }, {
                            xtype:'button',
                            text : '停止任务生成',
                            disabled :true,
                            iconCls : 'c_del',
                            id : 'task.button.stop',
                            handler : function(obj) {
                                obj.disable();
                                Ext.getCmp("task.button.start").disable();
                                TaskService.smsStopSend(function(data) {
                                    Ext.getCmp("task.button.start").enable();
                                });
                            }
                        }
                    ]
                },
                {
            		xtype:'treepanel',
        			 anchor: "100% 80%", 
        			 id:"task.TaskManager.query.district",
        			animate : true,
        			title : '行政区划',
        			enableDD : false,
        			loader : new Ext.ux.DWRTreeLoader({
        				dwrCall : UserMenuTreeService.getUserDistrictNodes
        			}),
        			lines : true,
        			autoScroll : true,
        			border : false,
        			root : new Ext.tree.AsyncTreeNode({
        				text : 'root',
        				draggable : false,
        				id : 'org'
        			}),
        			rootVisible : false
                }
            ]
        },{
            xtype : 'grid',
            anchor: '82% 100%',
            id : 'task.TaskManager.grid',
            tbar : [ '任务类型：', {
                xtype : 'combo',
                id : 'task.TaskManager.query.combo.type',
                store :new Ext.data.Store({
                    autoLoad : true,
                    proxy : new Ext.ux.data.DWRProxy({
                        dwrFunction : TaskService.getTaskRuleOption,
                    }),
                    reader : new Ext.data.ArrayReader({
                            id: 0
                        }, Ext.data.Record.create([{name: 'id', mapping: 0}, {name: 'name', mapping: 1}]))
                	,
                	listeners: {
                    	load : function(combo) {
    				                  　　Ext.getCmp("task.TaskManager.query.combo.type").setValue(Ext.getCmp("task.TaskManager.query.combo.type").store.getAt(0).data.id);
                        }  
                    }
                }),
                displayField : 'name',
                valueField :'id',  
                mode:'local',  
                editable : false,
                width : 180,
                allowBlank :false,
                triggerAction : 'all',
                listWidth:250
            },'-','是否完成：', {
                xtype : 'combo',
                id : 'task.TaskManager.query.combo.isSended',
                store : new Ext.data.SimpleStore({
                    fields : [ 'type', 'display' ],
                    data : [ [ '', '全部' ], [ '0', '未完成' ], [ '1', '已完成' ] ]
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
            },'-','任务日期：', {
                xtype : 'datefield',
                id : 'task.TaskManager.query.startdatefield',
                format : 'Y-m-d',
                value :new Date()
            },"至", {
                xtype : 'datefield',
                id : 'task.TaskManager.query.enddatefield',
                format : 'Y-m-d',
                value :new Date()
            }, "-", {
                text : '查询任务',
                iconCls : 'c_refresh',
                handler : function(obj) {
                    //obj.disable();
                    Ext.getCmp("task.TaskManager.grid").getStore().reload();
                }
            }],
            store : new Ext.data.Store({
                // autoLoad : true,
                proxy : new Ext.ux.data.DWRProxy({
                    dwrFunction : TaskService.queryLogs,
                    listeners : {
                        'beforeload' : function(dataProxy, params) {
                            var cond = {
                                district : "",
                                conditions : []
                            };
                            console.log(Ext.getCmp("task.TaskManager.query.district").getSelectionModel().getSelectedNode());
                            var root = Ext.getCmp("task.TaskManager.query.district").getSelectionModel().getSelectedNode();
                            if(!root){
                            	root = Ext.getCmp("task.TaskManager.query.district").getRootNode().firstChild;
                            }
                            cond.district = root.id;
                            while(cond.district.substr(cond.district.length-2,2)=='00'){
                            	cond.district = cond.district.substr(0,cond.district.length-2);
                            }
                            if(!Ext.isEmpty(Ext.getCmp("task.TaskManager.query.startdatefield").getValue())){
                                cond.conditions[cond.conditions.length] = {filterKey:"vo.smsdate",filterVal:Ext.getCmp("task.TaskManager.query.startdatefield").getValue(),opt:">="};
                            }
                            if(!Ext.isEmpty(Ext.getCmp("task.TaskManager.query.enddatefield").getValue())){
                                cond.conditions[cond.conditions.length] = {filterKey:"vo.smsdate",filterVal:Ext.getCmp("task.TaskManager.query.enddatefield").getValue(),opt:"<="};
                            }
                            if(!Ext.isEmpty(Ext.getCmp("task.TaskManager.query.combo.type").getValue())){
                            	cond.conditions[cond.conditions.length] = {filterKey:"vo.examname",filterVal:Ext.getCmp("task.TaskManager.query.combo.type").getValue(),opt:"="};
                            }
//                            if(!Ext.isEmpty(Ext.getCmp("task.TaskManager.query.combo.type").getValue())){
//                                cond.district =Ext.getCmp("task.TaskManager.query.combo.type").getValue();
//                            }
                            if(!Ext.isEmpty(Ext.getCmp("task.TaskManager.query.combo.isSended").getValue())){
                                cond.conditions[cond.conditions.length] = {filterKey:"vo.status",filterVal:Ext.getCmp("task.TaskManager.query.combo.isSended").getValue(),opt:"="};
                            }
                            var o = cond;
                            console.log(cond);
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
                }, {
                    name : 'idnumber',
                    mapping : 'idnumber'
                }, {
                    name : 'birthday',
                    mapping : 'birthday'
                }]))
            }),
            cm : new Ext.grid.ColumnModel([{
                "sortable" : true,
                "header" : "任务日期",
                "sortable" : true,
                "dataIndex" : "smsdate",
                "renderer" : Ext.util.Format.dateRenderer('Y-m-d'),
                width : 80
            }, {
                "sortable" : true,
                "header" : "任务类型",
                "sortable" : true,
                "dataIndex" : "examname",
                
                width : 140
            }, {
                "sortable" : true,
                "header" : "档案号",
                "dataIndex" : "fileno",
                width : 140
            }, {
                "sortable" : true,
                "header" : "姓名",
                "dataIndex" : "name",
                width : 50
            }, {
                "sortable" : true,
                "header" : "身份证号",
                "dataIndex" : "idnumber",
                width : 180
            }, {
                "sortable" : true,
                "header" : "生日",
                "dataIndex" : "birthday",
                width : 90,
                "renderer" : Ext.util.Format.dateRenderer('Y-m-d'),
            }, {
                "sortable" : true,
                "header" : "电话",
                "dataIndex" : "tel",
                width : 90
            }, {
                "sortable" : true,
                "header" : "任务内容",
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
                    if(v == 2){
                        return '已完成';
                    }else if(v == 1){
                        return '未完成';
                    }else if(v == 0){
                        return '正在创建';
                    }else {
                        return '其他';
                    }
                }
            }, {
                "header" : "完成时间",
                "dataIndex" : "sendtime",
                "renderer" : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
                width : 135
            }, {
                "header" : "完成情况",
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
ModuleMgr.register(Ext.task.TaskManager);
