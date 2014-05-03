Ext.namespace('subscribe_hosp')
var subscribe_Hospital = function(){
//	Ext.Msg.alert("OK");
	createSubscribeWin();
}

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

//患者预约
var createSubscribeWin = function(){
	var form = new Ext.FormPanel({
		autoHeight: true,
		defaultType: 'textfield',
		bodyStyle: 'padding: 5px 0 0 0',
		labelAlign: 'right',
		frame: true,
		items: [{
			fieldLabel: '医疗机构',
			allowBlank: false,
			name: 'hospital',
			width: 150
		},{
			fieldLabel: '患者姓名',
			allowBlank: false,
			name: 'patientName',
			width: 150
		},{
			fieldLabel: '性别',
			xtype: 'combo',
			name: 'patientSex',
			width: 80,
			mode: 'local',
			valueField: 'type',
			displayField: 'display',
			triggerAction: 'all',
			editable: false,
			selectOnFocus : true,
			value: '0',
			typeAhead: true,
			store: new Ext.data.SimpleStore({
		        fields: ['type', 'display'],
		        data : [['0','男'],['1','女']]
		    })
		},{
			fieldLabel: '年龄',
			name: 'patientAge',
			xtype: 'numberfield',
			width: 150,
			maxValue : 140,
			minValue : 0
		},{
			fieldLabel: '初步诊断',
			name: 'primaryDiagnosis',
			width: 180
		},{
			fieldLabel: '预约日期',
			name: 'entryHosptalTime',
			xtype: 'datefield',
			width: 180,
			format: 'y/m/d',
			allowBlank : false,
			selectOnFocus : true
		},{
			fieldLabel: '科室',
			xtype: 'combo',
			emptyText: '请选择科室',
			width: 180,
			displayField: 'key',
			valueField: 'value',
			triggerAction: 'all',
			mode: 'local',
			editable: false,
			store: store_depart
		},{
			fieldLabel: '医生',
			xtype: 'combo',
			emptyText: '请选择医生',
			width: 180,
			mode: 'local',
			editable: false,
			displayField: 'key',
			valueField: 'value',
			triggerAction: 'all',
			store: store_doctor
		}],
		buttonAlign: 'center',
		buttons: [{
			text: '登记'
		},{
			text: '取消',
			handler: function(){
				editWin.close();
			}
		}]
	});
	
	var editWin = new Ext.Window( {
      title : '患者预约',
      closeAction : 'close',
      autoHeight : true,
      width : 350,
      items : [ form ]
    })
    editWin.show();
}

var showPatientByCondition = new Ext.form.FormPanel({
	title: '查询条件',
	width: 600,
	frame: true,
	collapsible : true,
	buttonAlign: 'center',
	defaultType: 'textfield',
	labelAlign: 'right',
	labelWidth: 200,
	layout: 'form',
	items: [{
		fieldLabel: '预约ID',
		name: 'subscribeID',
		width: 200
	}],
	buttons: [{
		text: '查询',
		handler : function(){
			Ext.Msg.alert('提示','此功能待完善！');
		}
	},{
		text: '患者预约',
		handler: subscribe_Hospital
	}]
});

var cm = new Ext.grid.ColumnModel([{
	header: 'ID', width: 50, sortable:'true',dataIndex:'subscribeID'},
	{header: '患者姓名', width: 100,dataIndex: 'patientName'},
	{header: '性别',width: 50,dataIndex: 'patientSex'},
	{header: '年龄',width: 50,dataIndex: 'patientAge'},
	{header: '入院日期',width: 150,dataIndex: 'entryHosptalTime',dateFormat : 'Y-m-d'},
	{header: '科室',width: 100,dataIndex: 'depart'},
	{header: '医生',width: 100,dataIndex: 'doctor',id: 'doctor'}]
);

var data_patient = [
	{subscribeID:1,patientName:'张三',patientSex:'男',patientAge:20,entryHosptalTime: '1987-05-05',depart: '综合科',doctor: '张三'},
	{subscribeID:2,patientName:'王强',patientSex:'男',patientAge:40,entryHosptalTime: '2011-01-01',depart: '综合科',doctor: '张三'},
	{subscribeID:3,patientName:'王减',patientSex:'女',patientAge:20,entryHosptalTime: '2000-01-01',depart: '综合科',doctor: '张三'}
];
var proxy_patient = new Ext.data.MemoryProxy(data_patient);
var reader_patient = new Ext.data.JsonReader({},Ext.data.Record.create([
		{name: 'subscribeID',type: 'int',mapping: 'subscribeID'},	
		{name: 'patientName',type: 'string',mapping: 'patientName'},
		{name: 'patientSex',type: 'string',mapping: 'patientSex'},
		{name: 'patientAge',type: 'int',mapping: 'patientAge'},
		{name: 'entryHosptalTime',type: 'string',mapping: 'entryHosptalTime'},
		{name: 'doctor',type: 'string',mapping: 'doctor'},
		{name: 'depart',type: 'string',mapping: 'depart'}]));
		
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
	width: 600,
//	frame : true ,
//	region: 'center',
	height: 390,
//	autoHeight: true,
	iconCls : 'icon-grid',
	cm: cm,
	loadMask: '正在加载数据',
	store: store_patient,
	autoExpandColumn: 'doctor',
	bbar: pagingbar
})

subscribe_hosp.panel = new Ext.Panel({
	title: '住院病人预约',
	width: 600,
	height: 500,
	layout: 'form',
	closable: true,
	items: [showPatientByCondition,patientgrid]
});
_tab = ModuleMgr.register(subscribe_hosp.panel);