/**
 * 住院医嘱管理
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
 var personBaseInfoData = [["09","2009000458","杨希贤"],
  					   	   ["12","2009000459","李姝涵"],
  					   ["08","2009000462","刘汝兰"],
  					   ["04","2009000494","杨竹英"],  
  					   ["05","2009000495","马烨"],   	
  					   ["07","2009000496","glmn"], 
  					   ["10","2009000497","陈芳"],  	
  					   ["07","2009000502","地方"],  	
  					   ["06","2009000505","JJ"],  	
  					   ["06","2010000040","董必志"]	  					   
 						];
var detailMsg01 = [
					[1,"2010-05-18","参苓健脾胃颗粒","10gX10袋","袋","2","20.0000","g"," ","1","每日三次","2010-05-25","超级用户","超级用户"]
				];				
var detailMsg02 = [
					[1,"2010-05-18","参苓健脾胃颗粒","10gX10袋","袋","2","20.0000","g"," ","1","每日三次","2010-05-25","超级用户","超级用户"],
					[2,"2010-05-18","参苓健脾胃颗粒","10gX10袋","袋","2","20.0000","g"," ","1","每日三次","2010-05-25","超级用户","超级用户"]
				];				
var detailMsg03 = [
					[1,"2010-05-18","参苓健脾胃颗粒","10gX10袋","袋","2","20.0000","g"," ","1","每日三次","2010-05-25","超级用户","超级用户"],
					[2,"2010-05-18","参苓健脾胃颗粒","10gX10袋","袋","2","20.0000","g"," ","1","每日三次","2010-05-25","超级用户","超级用户"],
					[3,"2010-05-18","参苓健脾胃颗粒","10gX10袋","袋","2","20.0000","g"," ","1","每日三次","2010-05-25","超级用户","超级用户"],
					[4,"2010-05-18","参苓健脾胃颗粒","10gX10袋","袋","2","20.0000","g"," ","1","每日三次","2010-05-25","超级用户","超级用户"]
				];				
var detailMsg04 = [];
 //在院病人数据存储器 						
var BaseInfoStore = new Ext.data.SimpleStore({
        fields: [
           {name: 'sickbedNo'},
           {name: 'serialNo'},
           {name: 'name'}
        ],
        data : personBaseInfoData
    });
// create the Grid
var BaseInfoGrid = new Ext.grid.GridPanel({
        store: BaseInfoStore,
        columns: [
 			{header: "病床号", width: 90, sortable: true, dataIndex: 'sickbedNo'},
            {header: "住院号", width: 90, sortable: true, dataIndex: 'serialNo'},
            {header: "姓名", width: 90, sortable: true, dataIndex: 'name'}
        ],
        stripeRows: true,
        autoHeight:true,
        layout:"fit",
        title:'在院病人信息',
			bbar: new App.PagingToolbar({
				pageSize : 15,
				store : BaseInfoStore,
				displayInfo : false,
				emptyMsg : "没有检索到相关记录,请调整你的检索条件"
			})
    });


//科室数据存储器 
var departmentStore = new Ext.data.SimpleStore({
    fields: ['code', 'name'],
    data : departmentData
});
var departmentCombo = new Ext.form.ComboBox({
    store: departmentStore,
    displayField:'state',
    typeAhead: true,
    mode: 'local',
    triggerAction: 'all',
    fieldLabel: '所属科室',
    emptyText:'选择科室',
    displayField:"name",
    valueField:"code",
    readOnly : true,
    selectOnFocus:true
});
//详细信息数据存储器
var detailStore = new Ext.data.SimpleStore({
   fields:[
   {name:'num'},
   	 {name:'startDate', type: 'date', dateFormat: 'Y-m-d'},
   	 {name:'content'},
   	 {name:'standard'},
   	 {name:'unit'},
   	 {name:'count'},
   	 {name:'dosage'},
   	 {name:'dosageStandard'},
   	 {name:'method'},
   	 {name:'group'},
   	 {name:'rate'},
   	 {name:'endDate', type: 'date', dateFormat: 'Y-m-d'},
   	 {name:'doctor'},
   	 {name:'nurse'}
   ],
   data : detailMsg01
});
var unitData = [["袋","袋"],["瓶","瓶"]];
var dosageStandardData = [["g","g"],["mg","mg"],["ug","ug"],["ml","ml"]];
var methodData = [["静注","静注"],["口服","口服"],["外用","外用"],["肌注","肌注"]];
var rateData = [["每日一次","每日一次"],["每日二次","每日二次"],["每日三次","每日三次"],["隔日一次","隔日一次"],["持续","持续"]];
var numb = 0;
//定义详细信息列模型
var detailColumnModel = new Ext.grid.ColumnModel(
	[
		{
           header: "序号",
           dataIndex: 'num',
           width: 75
        },
        {
           header: "开始日期/时间",
           dataIndex: 'startDate',
           width: 90,
           renderer:Ext.util.Format.dateRenderer("Y-m-d"),
           editor: new Ext.form.DateField({format: 'Y-m-d'})
        },
        {

           header: "医嘱内容",
           dataIndex: 'content',
           width: 75,
           editor: new Ext.form.TextField({
               allowBlank: false
           })
        },
        {

           header: "规格",
           dataIndex: 'standard',
           width: 75,
           editor: new Ext.form.TextField({
               allowBlank: false
           })
        },
        {

           header: "单位",
           dataIndex: 'unit',
           width: 75,
           editor: new Ext.form.ComboBox({
			    store: new Ext.data.SimpleStore({
   					 fields: ['code', 'name'],
   					 data:unitData
				}),
			    displayField:'state',
			    typeAhead: true,
			    mode: 'local',
			    triggerAction: 'all',
			    emptyText:'选择科室',
			    displayField:"name",
			    valueField:"code",
			    readOnly : true,
			    selectOnFocus:true
			})
        },
        {

           header: "数量",
           dataIndex: 'count',
           width: 75,
           editor: new Ext.form.TextField({
               allowBlank: false
           })
        },
        {

           header: "用量",
           dataIndex: 'dosage',
           width: 75,
           editor: new Ext.form.TextField({
               allowBlank: false
           })
        },
        {

           header: "用量单位",
           dataIndex: 'dosageStandard',
           width: 75,
           editor:  new Ext.form.ComboBox({
			    store: new Ext.data.SimpleStore({
   					 fields: ['code', 'name'],
   					 data:dosageStandardData
				}),
			    displayField:'state',
			    typeAhead: true,
			    mode: 'local',
			    triggerAction: 'all',
			    emptyText:'选择用量单位',
			    displayField:"name",
			    valueField:"code",
			    readOnly : true,
			    selectOnFocus:true
			})
        },
        {

           header: "用法",
           dataIndex: 'method',
           width: 75,
           editor:  new Ext.form.ComboBox({
			    store: new Ext.data.SimpleStore({
   					 fields: ['code', 'name'],
   					 data:methodData
				}),
			    displayField:'state',
			    typeAhead: true,
			    mode: 'local',
			    triggerAction: 'all',
			    emptyText:'选择用法',
			    displayField:"name",
			    valueField:"code",
			    readOnly : true,
			    selectOnFocus:true
			})
        },
        {

           header: "组别",
           dataIndex: 'group',
           width: 75,
           editor: new Ext.form.TextField({
               allowBlank: false
           })
        },
        {

           header: "频率",
           dataIndex: 'rate',
           width: 75,
           editor: new Ext.form.ComboBox({
			    store: new Ext.data.SimpleStore({
   					 fields: ['code', 'name'],
   					 data:rateData
				}),
			    displayField:'state',
			    typeAhead: true,
			    mode: 'local',
			    triggerAction: 'all',
			    emptyText:'选择频率',
			    displayField:"name",
			    valueField:"code",
			    readOnly : true,
			    selectOnFocus:true
			})
        },
        {

           header: "停止日期/时间",
           dataIndex: 'endDate',
           width: 90,
           renderer:Ext.util.Format.dateRenderer("Y-m-d"),
           editor: new Ext.form.DateField({format: 'Y-m-d'})
        },
        {

           header: "医生",
           dataIndex: 'doctor',
           width: 75,
           editor: new Ext.form.TextField({
               allowBlank: false
           })
        },
        {

           header: "护士",
           dataIndex: 'nurse',
           width: 75,
           editor: new Ext.form.TextField({
               allowBlank: false
           })
        }
    ]
);
//创建详细信息记录
    var detailRecord = Ext.data.Record.create([
           {name: 'num', type: 'int',mapping:"num"},
           {name: 'startDate',type: 'date',dateFormat: 'Y-m-d',mapping:"startDate"},
           {name: 'content', type: 'string',mapping:"content"},
           {name: 'standard', type: 'string',mapping:"standard"},
           {name: 'unit', type: 'string',mapping:"unit"},
           {name: 'count', type: 'string',mapping:"count"},
           {name: 'dosage', type: 'string',mapping:"dosage"},
           {name: 'dosageStandard', type: 'string',mapping:"dosageStandard"},
           {name: 'method', type: 'string',mapping:"method"},
           {name: 'group', type: 'string',mapping:"group"},
           {name: 'group', type: 'string',mapping:"rate"},
           {name: 'endDate',type: 'date',dateFormat: 'Y-m-d',mapping:"endDate"},
           {name: 'doctor', type: 'string',mapping:"doctor"},
           {name: 'nurse', type: 'string',mapping:"nurse"}
      ]);
//详细信息
 var detailMsgEditorGrid = new Ext.grid.EditorGridPanel({
        store: detailStore,
		autoScroll : true,
        cm: detailColumnModel,
        autoHeight:true,
        frame:true,
        clicksToEdit:1,
         layout:"fit",
        title:'医嘱详细信息',
       tbar : new Ext.Toolbar({ 
				items:[{ 
							id : "query",
							text : '新增一行',
							cls : 'x-btn-text-icon',
							handler:function(){
								var store =  detailMsgEditorGrid.getStore();
								var endReNum = store.getCount()-1;
								var tempnum = store.getAt(endReNum).get("num");
								var record = new detailRecord({
				                    num: 1+tempnum,
				                    startDate: new Date(),
				                    content:"",
				                    standard:"",
				                    unit:"",
				                    count:"",
				                    dosage:"",
				                    dosageStandard:"",
				                    method:"",
				                    group:"",
				                    rate:"",
				                    endDate:new Date(),
				                    doctor:"",
				                    nurse:""
				                });
				                detailMsgEditorGrid.stopEditing();
				                store.add(record);
							}
						},
						{
							id:"delete",
							text:"删除一行",
							cls : 'x-btn-text-icon',
							handler:function(){
								var sm = detailMsgEditorGrid.getSelectionModel();
								if(sm.hasSelection()){
									Ext.MessageBox.confirm("提示","真的要删除选中的行吗？",function(btn){
										if("yes"==btn){
											var cellIndex = sm.getSelectedCell();
											var record = detailMsgEditorGrid.getStore().getAt(cellIndex[0]);
											detailMsgEditorGrid.getStore().remove(record);
										}
									});
								}else{
									Ext.MessageBox.alert("提示","请先选择需要删除的行，谢谢！");
								}
							}
						},
						{
							id:"delete",
							text:"保存",
							cls : 'x-btn-text-icon',
							handler:function(){
								Ext.MessageBox.alert("提示","保存成功！");
							}
						}
					] 
				}),
			bbar: new App.PagingToolbar({
				pageSize : 15,
				store : detailStore,
				displayInfo : true,
				displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
				emptyMsg : "没有检索到相关记录,请调整你的检索条件"
			})
    });  
//初始化
    BaseInfoGrid.on('rowclick', function(grid, row, event) {
				var serialno=BaseInfoGrid.getSelectionModel().getSelected().get("serialNo");
			    if(serialno=='2009000458'){detailStore.loadData(detailMsg01)}
				else if(serialno=='2009000459'){detailStore.loadData(detailMsg02)}
				else if(serialno=='2009000462'){detailStore.loadData(detailMsg03)}
				else{detailStore.loadData(detailMsg04)}
				});

			 

			view_doctor =  new Ext.Panel({
			  	  		border: false,
			  	  		width:"auto",
			  	  		height:"auto",
						layout:"border",
						closable : true,
						title : '医嘱管理',
						items:[{region:"west",
						title:"查询",
						collapsible: true,
						width:280,
						items:[
								{
										items:[{
										border: false,
							    			layout: 'form',			
											items:[departmentCombo]
										}],
											buttons:[{
											text:"查询"
											}]
									},
									{border: false,
										items:[BaseInfoGrid]
									}
						]
						},
						{region:"center",
						title:"",
						height:"auto",
						items:[
							{
								autoScroll : true,
								border: false,
								items:[{
											border: false,
							    			layout: 'form',			
											items:[
											{
									            xtype: 'radiogroup',
									                columns: 2,
									                fieldLabel: '请选择',
									                items: [
									                    {boxLabel: '长期医嘱', name: 'rb-col', inputValue: 1},
									                    {boxLabel: '临时医嘱', name: 'rb-col', inputValue: 2, checked: true}
									                ]
									            }
											]
										}]				
									},
									{border: false,
									autoScroll : true,
										items:[detailMsgEditorGrid]
									}
									
						]}
						]
					
			});
			
//			_tab = ModuleMgr.register(view_doctor);
ModuleMgr.register(view_doctor);