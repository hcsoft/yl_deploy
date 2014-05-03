/**
 * 押金管理
 * version 1.0
 */
 //科室信息
 var departmentData = [["01","住院部"],
 					   ["02","护理部"],
 					   ["03","急诊科"],
 					   ["04","儿科"],
 					   ["05","口腔科"],
 					   ["06","骨科"],
 					   ["07","眼科"],
 					   ["08","心血管内科"],
 					   ["09","神经内科"],
 					   ["10","神经外科"],
 					   ["11","体检中心"],
 					   ["12","麻醉科"],
 					   ["13","妇产科"]
 					  ];
 //在院病人信息
 var personBaseInfoData = [["2009000458","杨希贤","男","78岁","2009-04-25","400.00","09"],
  					   	   ["2009000459","李姝涵","女","2岁","2009-04-26","100.00","12"],
  					   ["2009000462","刘汝兰","女","76岁","2009-04-27","1200.00","08"],
  					   ["2009000494","杨竹英","女","70岁","2009-05-03","800.00","04"],  
  					   ["2009000495","马烨","女","7岁","2009-05-03","100.00","05"],   	
  					   ["2009000496","glmn","男","20岁","2009-05-05","600.00","07"], 
  					   ["2009000497","陈芳","女","30","2009-05-21","0.00","10"],  	
  					   ["2009000502","地方","男","20岁","2009-08-27","0.00","07"],  	
  					   ["2009000505","JJ","男","20岁","2009-08-27","0.00","06"],  	
  					   ["2010000040","董必志","女","23","2010-11-03","0.00","06"]	  					   
 						];

 //在院病人数据存储器 						
var BaseInfoStore = new Ext.data.SimpleStore({
        fields: [
           {name: 'serialNo'},
           {name: 'name'},
           {name: 'sex'},
           {name: 'age'},
           {name: 'enterDate', type: 'date', dateFormat: 'Y-m-d'},
           {name: 'amount', type: 'float'},
           {name: 'sickbedNo'}
        ],
        data : personBaseInfoData
    });
// create the Grid
var BaseInfoGrid = new Ext.grid.GridPanel({
        store: BaseInfoStore,
        region : 'center',
        width : '100%',
        columns: [
            {id:'serialNo',header: "住院号", width: 75, sortable: true, dataIndex: 'serialNo'},
            {header: "姓名", width: 75, sortable: true, dataIndex: 'name'},
            {header: "性别", width: 75, sortable: true, dataIndex: 'sex'},
            {header: "年龄", width: 75, sortable: true, dataIndex: 'age'},
            {header: "入院日期", width: 85, sortable: true, renderer: Ext.util.Format.dateRenderer('Y-m-d'), dataIndex: 'enterDate'},
            {header: "累计预交金", width: 75, sortable: true, renderer: 'usMoney', dataIndex: 'amount'},
            {header: "病床号", width: 75,sortable: true, dataIndex: 'sickbedNo'}
        ],
        stripeRows: true,
        height:500,
        layout:"fit",
        autoExpandColumn: 'serialNo',
        title:'在院病人信息',
       tbar : new Ext.Toolbar({ 
				items:[{ 
							id : "query",
							text : '收款',
							cls : 'x-btn-text-icon',
							handler:function(){
								var view = BaseInfoGrid.getView();
								var rsm = BaseInfoGrid.getSelectionModel();
								if(!rsm.getSelected()){
									Ext.MessageBox.alert("提示框","对不起！您没有选中记录！");
									return;
								}
								var serialno =rsm.getSelected().get("serialNo");
								Ext.getCmp("serialNo").setValue(serialno);
								win.show();
							}
						}
					] 
				}),
			bbar: new App.PagingToolbar({
				pageSize : 15,
				store : BaseInfoStore,
				displayInfo : true,
				displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
				emptyMsg : "没有检索到相关记录,请调整你的检索条件"
			})
    });
var mainform = new Ext.FormPanel({
	id:"gatheringForm",
    labelWidth:100,
    labelAlign:'right',
    frame:true,
   title: "收款信息录入",
    items: [
    new Ext.Panel({
			    layout:'form',
			    items: [
			   		{columnWidth:1.,
	    			layout: 'form',
			        items:[
			        		new Ext.form.TextField({
								id : 'serialNo',
								fieldLabel : '住院号',
								emptyText : '-/-', // 为空时显示的文本
								readOnly : true,
								width:'90%'
		                    })
		                    
			        ]}, 
				    {columnWidth:1.,
	    			layout: 'form',
			        items:[
			        		new Ext.form.DateField({
								id : 'payDate',
								fieldLabel : '缴款日期',
								emptyText : '-/-', // 为空时显示的文本
								readOnly : true,
								width:'90%'
		                    })
		                    
			        ]}, 
			        {columnWidth:1.,
			    	layout: 'form',
			        items:[
			        		new Ext.form.TextField({
								id : 'payWay',
								fieldLabel : '缴款方式',
								emptyText : '-/-', // 为空时显示的文本
								width:'90%'
		                    })
			        ]},
			        {columnWidth:1.,
			    	layout: 'form',
			        items:[
			        		new Ext.form.NumberField({
								id : 'payAcount',
								fieldLabel : '缴款金额',
								emptyText : '-/-', // 为空时显示的文本
								width:'90%'
		                    })
			        ]},
			        {columnWidth:1.,
			    	layout: 'form',
			        items:[
		                    new Ext.form.TextField({
								id : 'payer',
								fieldLabel : '收款人',
								emptyText : '-/-', // 为空时显示的文本
								width:'90%'
		                    })
			        ]}
			    ],
			     buttons: [{
			            text: '提交',
			            handler:function(){
			             	Ext.MessageBox.confirm("提交","请您选择相应操作！",function(btn){
			             		if("yes"==btn){
			             			Ext.MessageBox.alert("提示框","提交成功！");
			             			win.hide();
			             		}
			             	});
			             }
			        },{
			            text: '取消',
			             handler:function(){
			             	win.hide();
			             }
			        }]
			    })
    ]
});
var win = new Ext.Window({
                layout      : 'fit',
                width       : 500,
                height      : 300,
                closeAction :'hide',
                plain       : true,
                items:[mainform]
            });
//科室数据存储器 
var departmentStore = new Ext.data.SimpleStore({
    fields: ['code', 'name'],
    data : departmentData
});
var departmentCombo = new Ext.form.ComboBox({
    store: departmentStore,
    mode: 'local',
    triggerAction: 'all',
    fieldLabel: '所属科室',
    emptyText:'选择科室',
    displayField:"name",
    valueField:"code",
    readOnly : true,
    selectOnFocus:true,
    width: 100
});
		var comboForm = new Ext.FormPanel({
			layout: 'form',
			width : 100,
			region :'north',
			height: 50,
			items : [departmentCombo]
		})
		view_cash = new Ext.Panel({
			width: 1000,
			title : '押金管理',
			frame: true,
			height: 700,
			autoScroll: true,
			closable: true,
//			border : true,
			layout: 'border',
			items: [comboForm,BaseInfoGrid]
		});

			//_tab = ModuleMgr.register(view_cash);
			ModuleMgr.register(view_cash);			