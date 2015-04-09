Ext.ns("Ext.task");

Ext.grid.GridPanel.prototype.initComponent =
    Ext.grid.GridPanel.prototype.initComponent.createInterceptor(function () {
        if (this.store && this.bbar && this.bbar.xtype == 'paging'
            && !(this.bbar instanceof Ext.PagingToolbar) && !this.bbar.store
        ) {
            if (this.store.xtype && !(this.store instanceof Ext.data.Store)) {
                this.store = Ext.ComponentMgr.create(this.store);
            }
            this.bbar.store = this.store;
            if (this.bbar.xtype && !(this.bbar instanceof Ext.PagingToolbar)) {
                this.bbar = Ext.ComponentMgr.create(this.bbar);
            }
        }
    });
// Ext.QuickTips.init();

var currentnode = null;
var taskoptions = null;
var taskcats = null;
var alloptions = [];
var taskoptmap = {};
function makeoptmap() {
    if (taskoptions && taskcats) {
        for (var i = 0; i < taskoptions.length; i++) {
            var obj = taskoptions[i].data;
            if (obj.parent) {
                if (!taskoptmap[obj.parent]) {
                    taskoptmap[obj.parent] = [];
                }
                taskoptmap[obj.parent].push([obj.id, obj.name, obj.parent, obj.ord]);
                alloptions.push([obj.id, obj.name, obj.parent, obj.ord]);
            }
        }
    }
}
Ext.task.TaskQuery = new Ext.Panel({
// layout : 'anchor',
    layout: 'border',
    defaults: {
        style: "float:left"
    },
    tbar: ['分类：', {
        xtype: 'combo',
        id: 'TaskQuery.query.combo.cat',
        store: new Ext.data.Store({
            autoLoad: true,
            proxy: new Ext.ux.data.DWRProxy({
                dwrFunction: TaskService.getTaskCatOption
            }),
            reader: new Ext.data.ArrayReader({
                id: 0
            }, Ext.data.Record.create([
                {name: 'id', mapping: 0},
                {name: 'name', mapping: 1},
                {name: 'ord', mapping: 2}
            ])),
            listeners: {
                load: function (combo) {
                    taskcats = Ext.getCmp("TaskQuery.query.combo.cat").store.data.items;
                    makeoptmap();
                    Ext.getCmp("TaskQuery.query.combo.cat").setValue(Ext.getCmp("TaskQuery.query.combo.cat").store.getAt(0).data.id);
                }
            }
        }),
        displayField: 'name',
        valueField: 'id',
        mode: 'local',
        editable: false,
        width: 120,
        allowBlank: false,
        triggerAction: 'all',
        listeners: {
            select: function (combo, record, index) {
                if (index == 0) {
                    Ext.getCmp("TaskQuery.query.combo.type").store.loadData([
                        ['', '全部']
                    ].concat(alloptions));
                } else {
                    Ext.getCmp("TaskQuery.query.combo.type").store.loadData([
                        ['', '全部']
                    ].concat(taskoptmap[record.id]));
                }
            }
        }
    }, '任务类型：', {
        xtype: 'combo',
        id: 'TaskQuery.query.combo.type',
        store: new Ext.data.Store({
            autoLoad: true,
            proxy: new Ext.ux.data.DWRProxy({
                dwrFunction: TaskService.getTaskRuleOption
            }),
            reader: new Ext.data.ArrayReader({
                id: 0
            }, Ext.data.Record.create([
                {name: 'id', mapping: 0},
                {name: 'name', mapping: 1},
                {name: 'parent', mapping: 2},
                {name: 'ord', mapping: 3}
            ])),
            listeners: {
                load: function (combo) {
                    taskoptions = Ext.getCmp("TaskQuery.query.combo.type").store.data.items;
                    makeoptmap();
                    Ext.getCmp("TaskQuery.query.combo.type").setValue(Ext.getCmp("TaskQuery.query.combo.type").store.getAt(0).data.id);
                }
            }
        }),
        displayField: 'name',
        valueField: 'id',
        mode: 'local',
        editable: false,
        width: 180,
        allowBlank: false,
        triggerAction: 'all',
        listWidth: 250
    }, '-', '是否完成：', {
        xtype: 'combo',
        id: 'TaskQuery.query.combo.isSended',
        store: new Ext.data.SimpleStore({
            fields: ['type', 'display'],
            data: [
                ['', '全部'],
                ['1', '未完成'],
                ['2', '已完成'],
                ['0', '正在创建']
            ]
        }),
        displayField: 'display',
        valueField: 'type',
        typeAhead: true,
        mode: 'local',
        triggerAction: 'all',
        selectOnFocus: true,
        editable: false,
        width: 80,
        value: ''
    }, '-', '任务日期：', {
        xtype: 'datefield',
        id: 'TaskQuery.msgsender.query.startdatefield',
        format: 'Y-m-d',
        value: '2015-01-01'
    }, "至", {
        xtype: 'datefield',
        id: 'TaskQuery.msgsender.query.enddatefield',
        format: 'Y-m-d',
        value: '2015-12-31'
    }, "-", {
        text: '查询任务',
        iconCls: 'c_refresh',
        handler: function (obj) {
            // obj.disable();
            Ext.getCmp("TaskQuery.msgsender.grid").getStore().reload();
        }
    }],
    items: [
        {
            region: 'west',
            layout: 'fit',
            frame: false,
            title: '行政区划',
            split: true,
            collapsible: true,
            layoutConfig: {
                animate: true
            },
            width: 200,
            minSize: 100,
            maxSize: 400,
            border: false,
            items: [
                {
                    xtype: 'treepanel',
                    layout: 'fit',
                    animate: true,
                    id: 'TaskQuery.query.district',
                    enableDD: false,
                    loader: new Ext.ux.DWRTreeLoader({
                        dwrCall: UserMenuTreeService.getUserDistrictNodes
                    }),
                    lines: true,
                    autoScroll: true,
                    border: false,
                    root: new Ext.tree.AsyncTreeNode({
                        text: 'root',
                        draggable: false,
                        id: 'org'
                    }),
                    rootVisible: false,
                    listeners: {
                        click: {
                            stopEvent: true,
                            fn: function (n, e) {
                                currentnode = n;
                                Ext.getCmp("TaskQuery.msgsender.grid").store.reload();
                            }
                        },
                        'load': function () {
                            Ext.getCmp("TaskQuery.msgsender.grid").store.reload();
                        }
                    }

                }

            ]
        },
        {
            region: 'center',
            layout: 'fit',
            frame: false,
            border: false,
            items: [
                {
                    layout: 'fit',
                    xtype: 'grid',
                    id: 'TaskQuery.msgsender.grid',
                    store: new Ext.data.Store({
//                        autoLoad : true,
                        proxy: new Ext.ux.data.DWRProxy({
                            dwrFunction: TaskService.queryLogs,
                            listeners: {
                                'beforeload': function (dataProxy, params) {
                                    var cond = {
                                        district: "",
                                        conditions: []
                                    };
                                    var root = currentnode;
                                    if (!root) {
                                        root = Ext.getCmp("TaskQuery.query.district").getRootNode().firstChild;
                                    }
                                    cond.district = root.id;
                                    while (cond.district.substr(cond.district.length - 2, 2) == '00') {
                                        cond.district = cond.district.substr(0, cond.district.length - 2);
                                    }
                                    if (!Ext.isEmpty(Ext.getCmp("TaskQuery.msgsender.query.startdatefield").getValue())) {
                                        cond.conditions[cond.conditions.length] = {
                                            filterKey: "vo.smsdate",
                                            filterVal: Ext.getCmp("TaskQuery.msgsender.query.startdatefield").getValue(),
                                            opt: ">="
                                        };
                                    }
                                    if (!Ext.isEmpty(Ext.getCmp("TaskQuery.msgsender.query.enddatefield").getValue())) {
                                        cond.conditions[cond.conditions.length] = {
                                            filterKey: "vo.smsdate",
                                            filterVal: Ext.getCmp("TaskQuery.msgsender.query.enddatefield").getValue(),
                                            opt: "<="
                                        };
                                    }
                                    if (!Ext.isEmpty(Ext.getCmp("TaskQuery.query.combo.type").getValue())) {
                                        cond.conditions[cond.conditions.length] = {
                                            filterKey: "vo.examid",
                                            filterVal: Ext.getCmp("TaskQuery.query.combo.type").getValue(),
                                            opt: "="
                                        };
                                    }
                                    if (!Ext.isEmpty(Ext.getCmp("TaskQuery.query.combo.cat").getValue())) {
                                        cond.conditions[cond.conditions.length] = {
                                            filterKey: "vo.parentid",
                                            filterVal: Ext.getCmp("TaskQuery.query.combo.cat").getValue(),
                                            opt: "="
                                        };
                                    }
                                    if (!Ext.isEmpty(Ext.getCmp("TaskQuery.query.combo.isSended").getValue())) {
                                        cond.conditions[cond.conditions.length] = {
                                            filterKey: "vo.status",
                                            filterVal: Ext.getCmp("TaskQuery.query.combo.isSended").getValue(),
                                            opt: "="
                                        };
                                    }
                                    var o = cond;
                                    if (!params.limit)
                                        params.limit = 20;
                                    params[dataProxy.loadArgsKey] = [o, params];
                                }.createDelegate(this)
                            }
                        }),
                        reader: new Ext.data.JsonReader({
                            totalProperty: "totalSize", // 总记录数
                            root: "data", // 分页对象中的数据集
                            id: "id" //
                        }, Ext.data.Record.create([
                            {
                                name: 'smsdate',
                                mapping: 'smsdate'
                            },
                            {
                                name: 'examname',
                                mapping: 'examname'
                            },
                            {
                                name: 'fileno',
                                mapping: 'fileno'
                            },
                            {
                                name: 'name',
                                mapping: 'personname'
                            },
                            {
                                name: 'examgroup',
                                mapping: 'examgroup'
                            },
                            {
                                name: 'tel',
                                mapping: 'tel'
                            },
                            {
                                name: 'msg',
                                mapping: 'msg'
                            },
                            {
                                name: 'status',
                                mapping: 'status'
                            },
                            {
                                name: 'sendtime',
                                mapping: 'sendtime'
                            },
                            {
                                name: 'error',
                                mapping: 'error'
                            },
                            {
                                name: 'idnumber',
                                mapping: 'idnumber'
                            },
                            {
                                name: 'birthday',
                                mapping: 'birthday'
                            },
                            {
                                name: 'inputpage',
                                mapping: 'inputpage'
                            },
                            {
                                name: 'id',
                                mapping: 'id'
                            }
                        ]))
                    }),
                    cm: new Ext.grid.ColumnModel([
                        {
                            "sortable": true,
                            "header": "任务日期",
                            "sortable": true,
                            "dataIndex": "smsdate",
                            "renderer": Ext.util.Format.dateRenderer('Y-m-d'),
                            width: 80
                        },
                        {
                            "sortable": true,
                            "header": "任务类型",
                            "sortable": true,
                            "dataIndex": "examname",
                            width: 140
                        },
                        {
                            "header": "状态",
                            "dataIndex": "status",
                            width: 140,
                            "renderer": function (v, cell, data, rowindex, colindex) {
                                if (v == 2) {
                                    return '已完成';
                                } else if (v == 1) {
                                    return '<button onclick="opentask(\'' + data.data.inputpage + '\',\'' + data.data.fileno + '\',\'' + data.data.examname + ' 姓名：' + data.data.name + '\',\'' + data.data.id + '\')">处理任务</button>';
                                } else if (v == 0) {
                                    return '正在创建';
                                } else {
                                    return '其他';
                                }
                            }
                        },
                        {
                            "sortable": true,
                            "header": "档案号",
                            "dataIndex": "fileno",
                            width: 140
                        },
                        {
                            "sortable": true,
                            "header": "姓名",
                            "dataIndex": "name",
                            width: 50
                        },
                        {
                            "sortable": true,
                            "header": "身份证号",
                            "dataIndex": "idnumber",
                            width: 180
                        },
                        {
                            "sortable": true,
                            "header": "生日",
                            "dataIndex": "birthday",
                            width: 90,
                            "renderer": Ext.util.Format.dateRenderer('Y-m-d')
                        },
                        {
                            "sortable": true,
                            "header": "电话",
                            "dataIndex": "tel",
                            width: 90
                        },
                        {
                            "sortable": true,
                            "header": "内容",
                            "dataIndex": "msg",
                            width: 300,
                            renderer: function (data, metadata, record, rowIndex, columnIndex, store) {
                                return '<span qtip="' + data + '"/>' + data + '</span>';
                            }
                        },

                        {
                            "header": "完成时间",
                            "dataIndex": "sendtime",
                            "renderer": Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
                            width: 135
                        },
                        {
                            "header": "完成情况",
                            "dataIndex": "error",
                            width: 80
                        }
                    ]),
                    bbar: {
                        xtype: 'paging',
                        pageSize: 20,
                        displayInfo: true,
                        displayMsg: '{0} - {1} of {2}',
                        emptyMsg: "没有记录"
                    },
                    sm: new Ext.grid.CheckboxSelectionModel(),
                    listeners: {
                        rowdblclick: function (grid, rowIndex, e) {
//                            console.log(grid.store.getAt(rowIndex));
                        }
                    }
                }
            ]
        }
    ]
});
function opentask(taskurl, fileno, title, taskid) {

    taskurl = taskurl + '?fileNo=' + fileno + '&isNext=1&loadtaskdefault=true&taskid='+taskid;
    var taskwindow = new Ext.Window({
        closable: true,
        layout: 'fit',
        modal: true,
        title: '任务处理————' + title,
        items: [
            {
                xtype: 'iframepanel',
                defaultSrc: taskurl,
                layout: 'fit',
                style: 'top:0px;bottom:10px',
                loadMask: true,
                autoScroll: true,
                listeners: {
                    message: function (f, data) {
                        if (data.data == 'quit') {
                            taskwindow.close();
                        } else if (data.data == 'saved') {
                            this.load();
                        }
                    }.createDelegate(this)
                }
            }
        ]
    });
//    $.cookie('showHelp', 'Y', {expires: 0, path: '/'});
    taskwindow.show();
    taskwindow.maximize();
}

function opentaskdefault(taskurl, title) {
    taskurl = taskurl + '?loadtaskdefault=true&savetaskdefault=true'
    var taskwindow = new Ext.Window({
        closable: true,
        layout: 'fit',
        modal: true,
        title: '默认值管理————' + title,
        items: [
            {
                xtype: 'iframepanel',
                defaultSrc: taskurl,
                layout: 'fit',
                style: 'top:0px;bottom:10px',
                loadMask: true,
                autoScroll: true,
                listeners: {
                    message: function (f, data) {
                        if (data.data == 'quit') {
                            taskwindow.close();
                        } else if (data.data == 'saved') {
                            this.load();
                        }
                    }.createDelegate(this)
                }
            }
        ]
    });
//    $.cookie('showHelp', 'Y', {expires: 0, path: '/'});
    taskwindow.show();
    taskwindow.maximize();
}
ModuleMgr.register(Ext.task.TaskQuery);
