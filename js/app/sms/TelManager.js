Ext.ns("app");


app.TelManagerPanel = new  Ext.tf.SmsPanel({
    title: '联系电话管理',
    treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
    queryUrl : SmsService.findTels.createDelegate(this),
    deleteUrl : SmsService.createTels.createDelegate(this),
    editUrl   : SmsService.editTel.createDelegate(this),
    dataExportUrl : DataExportService.dataExportFirstBabyVisit,
    recordId : 'id',
    recordPk : 'id',
    panelId : 'app.TelManagerPanel',
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


ModuleMgr.register(app.TelManagerPanel);