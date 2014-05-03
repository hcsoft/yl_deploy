{
    var myData = [
        ['z201012120001','a1001','张三','男','32','肺结核','2011-01-03','传染科','张三','10000','2000']
    ];
    var store = new Ext.data.SimpleStore({
        fields: [
           {name: 'a', type: 'string'},
           {name: 'b', type: 'string'},
           {name: 'c', type: 'string'},
           {name: 'd', type: 'string'},
           {name: 'e', type: 'string'},
           {name: 'f', type: 'string'},
           {name: 'g', type: 'string'},
           {name: 'h', type: 'string'},
           {name: 'i', type: 'string'},
           {name: 'j', type: 'string'},
           {name: 'k', type: 'string'}                                 
        ]
    });
    store.loadData(myData);
    // create the Grid
    var grid = new Ext.grid.GridPanel({
        store: store,
        region : 'center',
        columns: [
            {header: "住院号", width: 100, sortable: true, dataIndex: 'a'},
            {header: "床号", width: 75, sortable: true,  dataIndex: 'b'},
            {header: "患者姓名", width: 75, sortable: true, dataIndex: 'c'},
            {header: "性别", width: 75, sortable: true, dataIndex: 'd'},
            {header: "年龄", width: 30, sortable: true,dataIndex: 'e'},
            {header: "入院诊断", width: 75, sortable: true, dataIndex: 'f'},
            {header: "入院日期", width: 85, sortable: true,dataIndex: 'g'},
            {header: "入院科室", width: 75, sortable: true, dataIndex: 'h'},
            {header: "主治医生", width: 85, sortable: true,dataIndex: 'i'},
            {header: "预交金", width: 75, sortable: true, dataIndex: 'j'},
            {header: "当前费用", width: 85, sortable: true,dataIndex: 'k'}                                 
        ],
        stripeRows: true,
        height:350,
        width:1000,
        title:'住院病人管理'
    });
		var detailWidget =	new Ext.form.FieldSet({
				id:'declare_fs22333334',
	            title: "住院病人管理明细",
	            height:90,
	            autoScroll:true,
	            items :[
				                    new Ext.form.TextField({
										id : 'z1',
										fieldLabel : '住院号'
				                    }),
				                    new Ext.form.TextField({
										id : 'z2',
										fieldLabel : '床号'
				                    }),	  
				                    new Ext.form.TextField({
										id : 'z3',
										fieldLabel : '患者姓名'
				                    }),	   	
				                    new Ext.form.TextField({
										id : 'z4',
										fieldLabel : '性别'
				                    }),	  
				                    new Ext.form.TextField({
										id : 'z5',
										fieldLabel : '年龄'
				                    }),				                    			                     	
				                    new Ext.form.TextField({
										id : 'z6',
										fieldLabel : '入院诊断'
				                    }),	  
				                    new Ext.form.TextField({
										id : 'z7',
										fieldLabel : '入院日期'
				                    }),
				                    new Ext.form.TextField({
										id : 'z8',
										fieldLabel : '入院科室'
				                    }),	  
				                    new Ext.form.TextField({
										id : 'z9',
										fieldLabel : '主治医生'
				                    }),
				                    new Ext.form.TextField({
										id : 'z10',
										fieldLabel : '预交金'
				                    }),	  
				                    new Ext.form.TextField({
										id : 'z11',
										fieldLabel : '当前费用'
				                    })			                    				                    				                    				                    
	            ]}) 
	
	
    var action1 = new Ext.Action({
        text: '入院登记',
        handler: function(){



var detail_window = new Ext.Window({
		title:"添加住院病人信息",
		width:300, 			
		height:380,
		modal:true,
		resizable:false,
		maximizable:false,
		resizable:true,
		closable:true,
		buttons: [
				  {
						text: '确定',
						id:'confirmButton',
						handler: function() {

							var z1 = Ext.getCmp('z1').getValue();
							var z2 = Ext.getCmp('z2').getValue();
							var z3 = Ext.getCmp('z3').getValue();
							var z4 = Ext.getCmp('z4').getValue();
							var z5 = Ext.getCmp('z5').getValue();
							var z6 = Ext.getCmp('z6').getValue();
							var z7 = Ext.getCmp('z7').getValue();
							var z8 = Ext.getCmp('z8').getValue();
							var z9 = Ext.getCmp('z9').getValue();
							var z10 = Ext.getCmp('z10').getValue();
							var z11 = Ext.getCmp('z11').getValue();
							//var name = Ext.getCmp('name').getValue();
							var record = [[
								z1,z2,z3,z4,z5,z6,z7,z8,z9,z10,z11
							]];  
							store.loadData(record, true);
							detail_window.destroy();
						}
				  }	
				  ,		
				  {
						text: '关闭',
						handler: function() {
							detail_window.destroy();
						}
				  }			
				],   	
		items: new Ext.form.FormPanel({	
			id:"declareDetailFormPanel",
			frame:true,
			layout:"form", 
			labelAlign: "right",
			keys:[
				{key:[13,32],
				fn:function(e){event.srcElement.blur();}
				}
			],
			items: [

				                    new Ext.form.TextField({
										id : 'z1',
										fieldLabel : '住院号'
				                    }),
				                    new Ext.form.TextField({
										id : 'z2',
										fieldLabel : '床号'
				                    }),	  
				                    new Ext.form.TextField({
										id : 'z3',
										fieldLabel : '患者姓名'
				                    }),	   	
				                    new Ext.form.TextField({
										id : 'z4',
										fieldLabel : '性别'
				                    }),	  
				                    new Ext.form.TextField({
										id : 'z5',
										fieldLabel : '年龄'
				                    }),				                    			                     	
				                    new Ext.form.TextField({
										id : 'z6',
										fieldLabel : '入院诊断'
				                    }),	  
				                    new Ext.form.TextField({
										id : 'z7',
										fieldLabel : '入院日期'
				                    }),
				                    new Ext.form.TextField({
										id : 'z8',
										fieldLabel : '入院科室'
				                    }),	  
				                    new Ext.form.TextField({
										id : 'z9',
										fieldLabel : '主治医生'
				                    }),
				                    new Ext.form.TextField({
										id : 'z10',
										fieldLabel : '预交金'
				                    }),	  
				                    new Ext.form.TextField({
										id : 'z11',
										fieldLabel : '当前费用'
				                    })	
			]
		})
	});






		detail_window.show();













        }
    });

    var action2 = new Ext.Action({
        text: '分配床位',
        handler: function(){
            //Ext.example.msg('Click','You clicked on "Action 1".');
        }
    });

    var action3 = new Ext.Action({
        text: '出院通知',
        handler: function(){
            //Ext.example.msg('Click','You clicked on "Action 1".');
        }
    });

hospitalPanel = {
    title : '住院病人管理',
    closable : true,
    width : 1000,
    layout: 'border',
    items : [ grid ],
    tbar: [
        action1,action2,action3
    ]
  }

  _tab = ModuleMgr.register(hospitalPanel);
  
}