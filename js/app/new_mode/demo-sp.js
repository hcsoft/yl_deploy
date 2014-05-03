
Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

var subdata={};

var namedata=[
['14747','杨希贤','2009-09-15 16:44:21','28','女','云南省昆明市马街16号','确诊','呼吸科','感冒发烧'],
['14749','马国定','2009-12-03 09:03:35','17','男','云南省昆明市小菜园187号','确诊','呼吸科','咳嗽']
];

var data14747=[
['240601','克感敏 / 25mg x 100','25mg','qd','25mg','口服'],
['240602','安必仙胶囊0.2g x 20','0.2g','qd','0.2g','口服']
];

var data14749=[
['240751','可速停糖浆 250ml/瓶','250ml',"qd","20ml",'口服']
];


subdata.data14747=data14747;
subdata.data14749=data14749;

var editnamedata=[];				//保存新增的基本信息

var editdata=[['','','','','','']];						//保存新增的详细信息

//var editdata=[['','','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','','']];	

 var datastore = new Ext.data.SimpleStore({
        fields: [
           {name: 'detailno'},
           {name: 'detail'},
           {name: 'totalnum'},
           {name: 'pinglv'},
		   {name: 'pernum'},
		   {name: 'type'}
        ]
    });

var editordatastore = new Ext.data.SimpleStore({
        fields: [
           {name: 'detailno'},
           {name: 'detail'},
           {name: 'totalnum'},
           {name: 'pinglv'},
		   {name: 'pernum'},
		   {name: 'type'}
        ]
    });
    
var editgrid = new Ext.grid.EditorGridPanel({
        store: editordatastore,
		clicksToEdit :1,
		border : true,
        columns: [
            {header: "明细号", width: 75, sortable: true, dataIndex: 'detailno',editor:new Ext.form.TextField({})},
            {header: "项目明细", width: 200, sortable: true, dataIndex: 'detail',editor:new Ext.form.TextField({})},
		    {header: "总剂量", width: 75, sortable: true, dataIndex: 'totalnum',editor:new Ext.form.TextField({})},
            {header: "使用频率", width: 75, sortable: true,  dataIndex: 'pinglv',editor:new Ext.form.TextField({})},
            {header: "每次用量", width: 75, sortable: true, dataIndex: 'pernum',editor:new Ext.form.TextField({})},
            {header: "给药方式", width: 75, sortable: true,  dataIndex: 'type',editor:new Ext.form.TextField({})}
        ],
		tbar : new Ext.Toolbar({ 
				items:[{ 
							id : "query",
							text : '新增一行',
							cls : 'x-btn-text-icon',
							handler:function(){
								var hisno = namegrid.getSelectionModel().getSelected().get("hisno");

								if(subdata["data"+hisno]){
									subdata["data"+hisno][subdata["data"+hisno].length] = [];
									editordatastore.loadData(subdata["data"+hisno]);
								}else{
									subdata["data"+hisno]=[];
									editordatastore.loadData(subdata["data"+hisno]);
								}
							}
						},
						{
							id:"delete",
							text:"删除一行",
							cls : 'x-btn-text-icon',
							handler:function(){
								
							}
						}
					] 
				}),
        height:500,
		width:680
    });

   var namestore = new Ext.data.SimpleStore({
        fields: [
           {name: 'hisno'},
           {name: 'name'},
           {name: 'dates'},
			{name: 'age'},
			{name: 'sex'},
			{name: 'address'},
			{name: 'check'},
			{name: 'rooms'},
		   {name: 'remarks'}
        ]
    });
    namestore.loadData(namedata);

var namegrid = new Ext.grid.GridPanel({
        store: namestore,
        columns: [
            {id:'hisno',header: "处方号", width: 50, sortable: true, dataIndex: 'hisno'},
            {header: "患者姓名", width: 80, sortable: true,  dataIndex: 'name'},
            {header: "制单日期", width: 120, sortable: true, dataIndex: 'dates'},
			{header: "年龄", width: 80, sortable: true,  dataIndex: 'age'},
			{header: "性别", width: 80, sortable: true,  dataIndex: 'sex'},
			{header: "地址", width: 80, sortable: true,  dataIndex: 'address'},
			{header: "诊断", width: 80, sortable: true,  dataIndex: 'check'},
			{header: "科室", width: 80, sortable: true,  dataIndex: 'rooms'},
			{header: "备注", width: 120, sortable: true, dataIndex: 'remarks'}
        ],
        height:500,
		width:300
    });

//绑定事件
namegrid.on('rowclick', function(grid, row, event) {
	var hisno=grid.getSelectionModel().getSelected().get("hisno");
	if(subdata["data"+hisno]){
		editordatastore.loadData(subdata["data"+hisno]);
	}
	});

var form_menzhen = new Ext.form.FormPanel({
        id: 'form_menzhen',
		autoScroll:true,
        frame: true,
        labelAlign: 'left',
        title: '门诊电子处方',
        layout: 'table',
		width:1200,
		closable : true,
		height:550,
		align:"center",
		border : true,
		layoutConfig: {columns:3},
        items: [
			{
			columnWidth:.4,
	    	items:[namegrid]
				},{
			html:'<hr><hr><hr>'},
			{
				columnWidth:.6,
	    		items:[editgrid]
					}
				],

		buttons: [{
            text: '新增患者信息',
            handler: function() {
				editordatastore.loadData(editdata);
				win.show();	
			}
        }]

    });


var win=new Ext.Window({
		title:"实时下账",
		height:300, 
		width:600, 			
		modal:true,
		autoScroll:false,
		resizable:false,
		maximizable:false,
		data:{body:{declaredetailbos:[]}},
		closeAction:"hide",
		items:[
			{layout:'column',
		    	items:[
		    			{columnWidth:.5,
						layout: 'form',
						defaultType: 'textfield',
						labelAlign: 'right',
						border:false,
						items:[
		                    new Ext.form.TextField({
								id : '1',
								anchor:'95%',
								fieldLabel : '处方号'
		                    }),
		                    new Ext.form.TextField({
								id : '2',
								anchor:'95%',
								fieldLabel : '患者姓名'
		                    })
		    			]},
		    			{columnWidth:.5,
						layout: 'form',
						labelAlign: 'right',
						border:false,
						defaultType: 'textfield',
						items:[
							new Ext.form.TextField({
								id : '3',
								anchor:'95%',
								fieldLabel : '年龄'
		                    }),
		                    new Ext.form.TextField({
								id : '4',
								anchor:'95%',
								fieldLabel : '性别'
		                    })
						]},
		    			{columnWidth:.5,
						layout: 'form',
						labelAlign: 'right',
						border:false,
						defaultType: 'textfield',
						items:[
							new Ext.form.TextField({
								id : '5',
								anchor:'95%',
								fieldLabel : '地址'
		                    }),
		                    new Ext.form.TextField({
								id : '6',
								anchor:'95%',
								fieldLabel : '诊断'
		                    })
						]},
		    			{columnWidth:.5,
						layout: 'form',
						labelAlign: 'right',
						border:false,
						defaultType: 'textfield',
						items:[
							new Ext.form.TextField({
								id : '7',
								anchor:'95%',
								fieldLabel : '科室'
		                    }),
		                    new Ext.form.TextField({
								id : '8',
								anchor:'95%',
								fieldLabel : '备注'
		                    })
						]},
		    			{columnWidth:.5,
						layout: 'form',
						labelAlign: 'right',
						border:false,
						defaultType: 'textfield',
						items:[
							new Ext.form.TextField({
								id : '9',
								anchor:'95%',
								fieldLabel : '制单日期'
		                    })
		                   
						]}
		    	]}
		],
		buttons: [{
            text: '保存',
            handler: function() {

			var  hisno=Ext.getCmp("1").getValue();
			var  name=Ext.getCmp("2").getValue();
			var  age=Ext.getCmp("3").getValue();
			var  sex=Ext.getCmp("4").getValue();
			var  address=Ext.getCmp("5").getValue();
			var  check=Ext.getCmp("6").getValue();
			var  rooms=Ext.getCmp("7").getValue();
			var  remarks=Ext.getCmp("8").getValue();
			var  dates=Ext.getCmp("9").getValue();

			namedata[namedata.length]=[hisno,name,dates,age,sex,address,check,rooms,remarks];
			namestore.loadData(namedata);
			win.hide();
			}
        }]	
	})
	
//	form.render("form-panel");
	
		_tab = ModuleMgr.register(form_menzhen);