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


Ext.task.TaskQuery = new Ext.Panel({
// layout : 'anchor',
    layout : 'border',
    defaults:{
        style : "float:left",
    },
    tbar : [ '任务类型：', {
        xtype : 'combo',
        id : 'TaskQuery.query.combo.type',
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
			                  　　Ext.getCmp("TaskQuery.query.combo.type").setValue(Ext.getCmp("TaskQuery.query.combo.type").store.getAt(0).data.id);
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
        id : 'TaskQuery.query.combo.isSended',
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
        id : 'TaskQuery.msgsender.query.startdatefield',
        format : 'Y-m-d',
        value :new Date()
    },"至", {
        xtype : 'datefield',
        id : 'TaskQuery.msgsender.query.enddatefield',
        format : 'Y-m-d',
        value :new Date()
    }, "-", {
        text : '查询任务',
        iconCls : 'c_refresh',
        handler : function(obj) {
            // obj.disable();
            Ext.getCmp("TaskQuery.msgsender.grid").getStore().reload();
        }
    }],
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
            width:200,
// anchor: "18% 100%",
// layout : 'anchor',
            region : 'west',
            items:[
                {
            		xtype:'treepanel',
        			layout : 'fit',
        			animate : true,
        			title : '行政区划',
        			id:'TaskQuery.query.district',
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
            region : 'center',
            id : 'TaskQuery.msgsender.grid',
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
                            console.log(Ext.getCmp("TaskQuery.query.district").getSelectionModel().getSelectedNode());
                            var root = Ext.getCmp("TaskQuery.query.district").getSelectionModel().getSelectedNode();
                            if(!root){
                            	root = Ext.getCmp("TaskQuery.query.district").getRootNode().firstChild;
                            }
                            cond.district = root.id;
                            while(cond.district.substr(cond.district.length-2,2)=='00'){
                            	cond.district = cond.district.substr(0,cond.district.length-2);
                            }
                            if(!Ext.isEmpty(Ext.getCmp("TaskQuery.msgsender.query.startdatefield").getValue())){
                                cond.conditions[cond.conditions.length] = {filterKey:"vo.smsdate",filterVal:Ext.getCmp("TaskQuery.msgsender.query.startdatefield").getValue(),opt:">="};
                            }
                            if(!Ext.isEmpty(Ext.getCmp("TaskQuery.msgsender.query.enddatefield").getValue())){
                                cond.conditions[cond.conditions.length] = {filterKey:"vo.smsdate",filterVal:Ext.getCmp("TaskQuery.msgsender.query.enddatefield").getValue(),opt:"<="};
                            }
                            if(!Ext.isEmpty(Ext.getCmp("TaskQuery.query.combo.type").getValue())){
                            	cond.conditions[cond.conditions.length] = {filterKey:"vo.examname",filterVal:Ext.getCmp("TaskQuery.query.combo.type").getValue(),opt:"<="};
                            }
                            if(!Ext.isEmpty(Ext.getCmp("TaskQuery.query.combo.isSended").getValue())){
                                cond.conditions[cond.conditions.length] = {filterKey:"vo.status",filterVal:Ext.getCmp("TaskQuery.query.combo.isSended").getValue(),opt:"="};
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
                "header" : "内容",
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
ModuleMgr.register(Ext.task.TaskQuery);
