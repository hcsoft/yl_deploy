Ext.namespace('prescribe')

//科室数据
var data_depart = [[01,'综合科'],[02,'门诊部'],[03,'住院部']];
var proxy_depart = new Ext.data.MemoryProxy(data_depart);
var reader_depart = new Ext.data.ArrayReader({},[{
		name: 'value'
	},{
		name: 'key'
	}]);
var store_depart = new Ext.data.Store({
	proxy: proxy_depart,
	reader: reader_depart,
	autoLoad: true
});

//医生数据
var data_doctor = [[01,'张三'],[02,'李四'],[03,'王五']];
var proxy_doctor = new Ext.data.MemoryProxy(data_doctor);
var reader_doctor = new Ext.data.ArrayReader({},[{
		name: 'value'
	},{
		name: 'key'
	}]);
var store_doctor = new Ext.data.Store({
	proxy: proxy_doctor,
	reader: reader_doctor,
	autoLoad: true
});

var createForm = function(x,y,xtype,fieldLabel,name,width){
	var element = {
		xtype: 'panel',
		layout: 'form',
		x: x,
		y: y,
		items: [{
			fieldLabel: fieldLabel,
			name: name,
			xtype : xtype,
			width: width
		}]
	};
	return element;
}

var createCombo = function(x,y,xtype,fieldLabel,name,width,store,mode,key,value,emptyText){
	var element = {
		xtype: 'panel',
		layout: 'form',
		x: x,
		y: y,
		items: [{
			fieldLabel: fieldLabel,
			name: name,
			xtype : xtype,
			width: width,
			store : store,
			mode: mode,
			displayField : key,
			valueField: value,
			triggerAction: 'all',
			emptyText : emptyText,
			editable: false
		}]
	};
	return element;
}

var queryform = new Ext.form.FormPanel({
		title: '查询条件',
		width: 700,
		height: 100,
		frame: true,
		collapsible : true,
		labelWidth: 80,
		labelAlign: 'right',
		layout:'absolute',
		items: [
			createForm(5,5,'textfield','处方号','prescribeID',200),
			createCombo(300,5,'combo','科室','depart',200,store_depart,'local','key','value','请选择科室'),
			createForm(5,35,'textfield','患者姓名','patientName',200),
			createCombo(300,35,'combo','医生','doctor',200,store_doctor,'local','key','value','请选择医生'),
			createForm(5,65,'datefield','起始日期','startTime',200),
			createForm(300,65,'datefield','结束日期','endTime',200)
		],
		
		buttonAlign: 'center',
		buttons: [{
			text: '查询'
		}]
	});

	
var cm = new Ext.grid.ColumnModel([{
	header: '处方号', width: 50, sortable:'true',dataIndex:'subscribeID'},
	{header: '患者姓名', width: 100,dataIndex: 'patientName'},
	{header: '性别',width: 50,dataIndex: 'patientSex'},
	{header: '年龄',width: 50,dataIndex: 'patientAge'},
	{header: '处方日期',width: 150,dataIndex: 'entryHosptalTime',dateFormat : 'Y-m-d'},
	{header: '科室',width: 100,dataIndex: 'depart'},
	{header: '医生',width: 100,dataIndex: 'doctor',id: 'doctor'},
	{header: '结算金额',width: 100,dataIndex: 'money',id: 'money'}]
);

var data_patient = [
	{subscribeID:'1',patientName:'张三',patientSex:'男',patientAge:20,entryHosptalTime: '1987-05-05',depart: '综合科',doctor: '张三',money:534},
	{subscribeID:'2',patientName:'王强',patientSex:'男',patientAge:40,entryHosptalTime: '2011-01-01',depart: '综合科',doctor: '张三',money:1293},
	{subscribeID:'3',patientName:'王减',patientSex:'女',patientAge:20,entryHosptalTime: '2000-01-01',depart: '综合科',doctor: '张三',money:5845.6}
];
var proxy_patient = new Ext.data.MemoryProxy(data_patient);
var reader_patient = new Ext.data.JsonReader({},Ext.data.Record.create([
		{name: 'subscribeID',type: 'string',mapping: 'subscribeID'},	
		{name: 'patientName',type: 'string',mapping: 'patientName'},
		{name: 'patientSex',type: 'string',mapping: 'patientSex'},
		{name: 'patientAge',type: 'int',mapping: 'patientAge'},
		{name: 'entryHosptalTime',type: 'string',mapping: 'entryHosptalTime'},
		{name: 'doctor',type: 'string',mapping: 'doctor'},
		{name: 'depart',type: 'string',mapping: 'depart'},
		{name: 'money',type: 'float',mapping: 'money'}]));
		
var store_patient = new Ext.data.Store({
	proxy: proxy_patient,
	reader: reader_patient
});
store_patient.load();

var pagingbar = new App.PagingToolbar({
	pageSize: 2,
	store: store_patient,
	displayInfo: true,
	displayMsg: '{0} - {1} of {2}',
	emptyMsg: '没有记录'
});

var patientgrid = new Ext.grid.GridPanel({
	//id: 'patientgrid',
	width: 700,
//	frame : true ,
//	region: 'center',
	height: 340,
//	autoHeight: true,
	iconCls : 'icon-grid',
	cm: cm,
	loadMask: '正在加载数据',
	store: store_patient,
	autoExpandColumn: 'doctor',
	bbar: pagingbar
});

prescribe.panel = new Ext.Panel({
	title: '处方查询',
	width: 700,
	height: 500,
	closable: true,
	layout: 'form',
	items: [queryform,patientgrid]
});

_tab = ModuleMgr.register(prescribe.panel);