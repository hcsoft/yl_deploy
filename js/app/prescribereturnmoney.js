Ext.namespace('prereturn')

var createTextfield = function(x,y,xtype,fieldLabel,name,width){
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
var data_patient = [];
var form = new Ext.FormPanel({
	title: '查询条件',
	width: 700,
	layout: 'absolute',
	height: 40,
	frame : true,
	border : false,
	labelWidth: 80,
	labelAlign: 'right',
	items:[
		createTextfield(5,5,'textfield','处方号','prescribeID',200),
		{
			xtype: 'panel',
			layout: 'form',
			x: 300,
			y: 5,
			items: [{
				text: '搜索',
				name: 'search',
				xtype : 'button',
				width: 150,
				handler: function(){
					data_patient = [
						{detailID:'1',happenTime:'2011-01-02',itemDetail:'5%GNS葡萄糖氯化钠针/250mlx瓶/昆明南疆制药有限公司',unit:'瓶',number: 2,bluntrednumber: 0,price: 2.49},
						{detailID:'2',happenTime:'2011-01-02',itemDetail:'10%GS葡萄糖注射液/250mlx:5g*支/昆明南疆制药有限公司',unit:'瓶',number: 3,bluntrednumber: 0,price: 2.49},
						{detailID:'3',happenTime:'2011-01-02',itemDetail:'普通挂号费',unit:'次',number: 1,bluntrednumber: 0,price: 0.3}
					];
					patientgrid.getStore().loadData(data_patient);
				}
			}]
		}
	]
});

var cm = new Ext.grid.ColumnModel([{
	header: '明细号', width: 50, sortable:'true',dataIndex:'detailID'},
	{header: '发生日期', width: 100,dataIndex: 'happenTime',dateFormat : 'Y-m-d'},
	{header: '项目明细',dataIndex: 'itemDetail',width: 300},
	{header: '单位',width: 50,dataIndex: 'unit'},
	{header: '数量',width: 50,dataIndex: 'number'},
	{header: '冲红数',width: 50,dataIndex: 'bluntrednumber',editor : new Ext.form.TextField(),css : 'ttt'},
	{header: '价格',width: 100,dataIndex: 'price',id: 'price'}]
);

var proxy_patient = new Ext.data.MemoryProxy(data_patient);
var reader_patient = new Ext.data.JsonReader({},Ext.data.Record.create([
		{name: 'detailID',type: 'string',mapping: 'detailID'},	
		{name: 'happenTime',type: 'string',mapping: 'happenTime'},
		{name: 'itemDetail',type: 'string',mapping: 'itemDetail'},
		{name: 'unit',type: 'string',mapping: 'unit'},
		{name: 'number',type: 'int',mapping: 'number'},
		{name: 'bluntrednumber',type: 'int',mapping: 'bluntrednumber'},
		{name: 'price',type: 'float',mapping: 'price'}]));
		
var store_patient = new Ext.data.Store({
	proxy: proxy_patient,
	reader: reader_patient
});
store_patient.load();

var patientgrid = new Ext.grid.EditorGridPanel({
	width: 700,
	height: 435,
	iconCls : 'icon-grid',
	cm: cm,
	autoScroll: true,
	mode : 'local',
	loadMask: '正在加载数据',
	store: store_patient,
	bbar : [{
		text:'保存',
		icon: '../../resources/icons/save.gif',
		iconCls: 'save',
		handler: function(){
			Ext.Msg.alert('提示','保存成功');
		}
	},{
		text: "刷新",
		icon: '../../resources/images/default/grid/refresh.gif',
		iconCls: "refresh"
	}]
});

prereturn.panels =new Ext.Panel({
	title : '处方退费',
//	frame: true,
	closable: true,
	items: [form,patientgrid]
});

_tab = ModuleMgr.register(prereturn.panels);