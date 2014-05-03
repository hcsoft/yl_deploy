	  function formatDight(Dight, How) {
		var value = parseFloat(Dight);
		if (isNaN(Dight)) {
			value = 0;
		}
		value = new Number(Dight).toFixed(How);

		return parseFloat(value);
	};
        function formatNumber(str) {
		var maxValue = (maxValue == null ? 999999999999.99 : maxValue);
		str = (isNaN(str) ? "0.00" : String(formatDight(
				(str > maxValue ? maxValue : str), 2)));

		var point = str.indexOf(".");
		if (point == -1) {
			str = str + ".00";
			point = str.indexOf(".");
		}
		var whole = str.substring(0, point);
		var fraction = str.substring(point + 1, str.length);
		while (fraction.length < 2) {
			fraction += "0";
		}
		return (whole.length == 0 ? "0" : whole) + "." + fraction;
	};
Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
var combodata=[['住院部','01']];
var namedata=[
['09','杨希贤','2009000458'],
['12','柳如兰','2009000459'],
['23','马国定','2009000462']
];
var data09=[
['2011-1-1','长期','5%葡萄糖氯化钠注射液 250ml','瓶',1,2.5,2.5,'乙类'],
['2011-1-1','长期','注射用头孢唑林钠 1g','瓶',4,3,12,'非目'],
['2011-1-1','长期','0.9%氯化钠注射液 100ml','瓶',1,2,2,'非目'],
['2011-1-2','长期','香丹注射液 10ml×5支','支',3,1,3,'非目'],
['2011-1-2','长期','甲硝唑注射液 1.25g×250ml','瓶',1,3,3,'非目'],
['2011-1-3','长期','10%氯化钠注射液 10ml×5','支',2,0.5,1,'乙类'],
['2011-1-3','长期','甲硝唑注射液 1.25g×250ml','瓶',1,3,3,'非目'],
['2011-1-3','临时','复方丹参片 60#','瓶',1,2.5,2.5,'甲类'],
['2011-1-4','长期','10%氯化钠注射液 10ml×5','支',2,0.5,1,'乙类'],
['2011-1-5','长期','10%氯化钠注射液 10ml×5','支',2,0.5,1,'乙类'],
['2011-1-6','长期','10%氯化钠注射液 10ml×5','支',2,0.5,1,'乙类']
];
var data12=[
['2011-1-1','长期','5%葡萄糖氯化钠注射液 250ml','瓶',1,2.5,2.5,'乙类'],
['2011-1-1','长期','注射用头孢唑林钠 1g','瓶',4,3,12,'非目'],
['2011-1-1','长期','0.9%氯化钠注射液 100ml','瓶',1,2,2,'非目'],
['2011-1-2','长期','香丹注射液 10ml×5支','支',3,1,3,'非目'],
['2011-1-3','长期','10%氯化钠注射液 10ml×5','支',2,0.5,1,'乙类'],
['2011-1-3','长期','甲硝唑注射液 1.25g×250ml','瓶',1,3,3,'非目'],
['2011-1-3','临时','复方丹参片 60#','瓶',1,2.5,2.5,'甲类'],
['2011-1-4','长期','10%氯化钠注射液 10ml×5','支',2,0.5,1,'乙类']
];
var data23=[
['2011-1-1','长期','5%葡萄糖氯化钠注射液 250ml','瓶',1,2.5,2.5,'乙类']
];
var combostore = new Ext.data.SimpleStore({
        fields: ['dept','code'],
		data:combodata
    });

 var datastore = new Ext.data.SimpleStore({
        fields: [
           {name: 'date',type: 'date', dateFormat: 'Y-n-j'},
           {name: 'memo'},
           {name: 'name'},
           {name: 'unit'},
           {name: 'num',type:'float'},
	 {name:'price',type: 'float'},
	 {name:'totalprice',type:'float'},
	 {name:'type'}
        ]
    });
		//datastore.loadData(data09);
	
var datagrid = new Ext.grid.GridPanel({
        store: datastore,
        border : true,
        frame : true,
        columns: [
            {header: "日期", width: 100, sortable: true,renderer: Ext.util.Format.dateRenderer('Y-m-d'), dataIndex: 'date'},
            {header: "医嘱", width: 50, sortable: true,  dataIndex: 'memo'},
            {header: "项目明细", width: 280, sortable: true, dataIndex: 'name'},
		    {header: "单位", width: 50, sortable: true, dataIndex: 'unit'},
            {header: "数量", width: 50, sortable: true,  dataIndex: 'num'},
            {header: "价格", width: 50, sortable: true, renderer:formatNumber, dataIndex: 'price'},
		    {header: "金额", width: 50, sortable: true, renderer:formatNumber, dataIndex: 'totalprice'},
            {header: "类别", width: 50, sortable: true, renderer:formatNumber, dataIndex: 'type'}
        ],
        height:550,
		width:700
    });



   var namestore = new Ext.data.SimpleStore({
        fields: [
           {name: 'bedno'},
           {name: 'name'},
           {name: 'hospitolno'}
        ]
//        data : namedata
    });
    namestore.loadData(namedata);
    
var namegrid = new Ext.grid.GridPanel({
        store: namestore,
        border : true,
        frame : true,
        columns: [
            {id:'bedno',header: "床号", width: 50, sortable: true, dataIndex: 'bedno'},
            {header: "病人姓名", width: 80, sortable: true,  dataIndex: 'name'},
            {header: "住院号", width: 120, sortable: true, dataIndex: 'hospitolno'}
        ],
        height:500,
		width:270,
		sm: new Ext.grid.RowSelectionModel({ singleSelect: true })		
    });
		//绑定事件
namegrid.on('rowclick', function(grid, row, event) {
	var bedno=grid.getSelectionModel().getSelected().get("bedno");
    if(bedno=='09')datastore.loadData(data09);
	if(bedno=='12')datastore.loadData(data12);
	if(bedno=='23')datastore.loadData(data23);
	});


formArray2 = new Ext.form.FormPanel({
        id: 'formArray2',
		autoScroll:true,
        frame: true,
        labelAlign: 'left',
        title: '住院费用清单',
        layout: 'table',
		width:1000,
		height:600,
		align:"center",
		border : true,
		closable : true,
		layoutConfig: {columns:3},
        items: [{
				layout:'form',
				xtype : 'panel',
				border : true,
			items:[
	           new Ext.form.ComboBox({
					id:'combo1',
					border : true,
                   store: combostore,
						valueField:'code',
        displayField:'dept',
        mode: 'local',
        forceSelection: true,
        selectOnFocus:true,
		fieldLabel:'部门'
			}),namegrid]
	    	},{
               html:'<span style="width:10"></span>'
				},
			{
				layout:'form',
			 items:[datagrid]
			}
				]
    });
Ext.getCmp("combo1").setValue("01");
_tab = ModuleMgr.register(formArray2);
