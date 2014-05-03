Ext.ns('app');
// 常量定义
var consentTreeId = 'consentMenu';
var consentGridId = 'consentGrid';
var LevelNumber = 5;
var consentTargetUrl = '/in_consentBook.html';
//公共方法
function f_add_consent(currentNode){
	if (currentNode == null)
		return;
	var level = currentNode.attributes['data'].level;
	if (level != LevelNumber) {
		showInfoObj.Infor('只有第五级行政区域才能增加记录！');
		return;
	}
	var districtNumber = currentNode.id;
	var param = '?districtNumber=' + districtNumber;
	var url = consentTargetUrl + param;
	Utils.openwindow(url, null, consentGridId, '疾病筛查知情同意书');
}
function f_edit_consent() {
	var selections = Ext.getCmp(consentGridId).getSelections();
	if (selections.length == 1) {
		var record = selections[0];
		var id = record.get('id');
		var param = '?id=' + id;
		var url = consentTargetUrl + param;
		Utils.openwindow(url, null, consentGridId, '疾病筛查知情同意书');
	}
}

app.consentPanel = new Ext.tf.DiseaseAndHearPanel({
	treeLoaderFn : UserMenuTreeService.getUserDistrictNodes,
	queryUrl : UserMenuTreeService.findConsentBookRecords,
//	deleteUrl : UserMenuTreeService.removeConsentBookRecords,
	editFn : f_edit_consent,
	f_add : f_add_consent,
	treeId : consentTreeId,
	gridId : consentGridId,
	tbars : [
			new Ext.Button({
				text : '疾病筛查知情同意书',
				iconCls : 'c_add',
				menu : new Ext.menu.Menu({
					width : 145,
					items : [
							{
								text : '填写',
								iconCls : 'addBusinessData',
								handler : function() {
									var node = Ext.getCmp(consentTreeId)
											.getSelectionModel()
											.getSelectedNode();//
									f_add_consent(node);
								}.createDelegate(this)
							}, {
								text : '修改',
								iconCls : 'c_edit',
								handler : function() {
									f_edit_consent();
								}.createDelegate(this)
							}, {
								text : '删除',
								iconCls : 'c_del',
								handler : function() {
									var selections = Ext.getCmp(consentGridId).getSelections();
									if (selections.length > 0) {
										var array = [];
										Ext.each(selections, function(v) {
											array.push(v.get('id'));
										});
										var del = function(e) {
											if (e == "yes") {
												UserMenuTreeService.removeConsentBookRecords(array, {
													callback : function(data) {
														Ext.Msg.alert('', '删除成功！');
														Ext.getCmp(consentGridId).getStore().reload();
													}.createDelegate(this),
													errorHandler : function(msg) {
														console.log(msg);
														Ext.Msg.alert('', '删除出错！');
													}
												});
											}
										};
										Ext.MessageBox.confirm("提示","确认要删除所选择的记录么？", del,this);
									}
								}.createDelegate(this)
							}, {
								text : '打印',
								iconCls : 'printbg',
								handler : function() {
									showInfoObj.Infor('请使用A4纸！',function(){
										printObj.printUrl('../ConsentBook.html');
									});
								}.createDelegate(this)
							} ]
				})
			}) ],
	readerConfig : [ {
		name : 'execOrgName',
		mapping : 'org.name'
	}, {
		name : 'id',
		mapping : 'consentBook.id'
	}, {
		name : 'fileNo',
		mapping : 'file.fileNo'
	}, {
		name : 'name',
		mapping : 'file.name'
	}, {
		name : 'birthday',
		mapping : 'person.birthday'
	}, {
		name : 'username',
		mapping : 'samTaxempcode.username'
	}, {
		name : 'linkTel',
		mapping : 'consentBook.linkTel'
	}, {
		name : 'hospitalNumber',
		mapping : 'consentBook.hospitalNumber'
	} ],
	gridCmConfig : [ {
		"header" : "执行机构",
		"dataIndex" : "execOrgName"
	}, {
		"header" : "档案编号",
		"dataIndex" : "fileNo",
		"width" : 130
	}, {
		"header" : "产妇姓名",
		"dataIndex" : "name"
	}, {
		"header" : "出生日期",
		"dataIndex" : "birthday",
		"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
	}, {
		"header" : "联系电话",
		"dataIndex" : "linkTel"
	}, {
		"header" : "住院号",
		"dataIndex" : "hospitalNumber"
	} ]
});
_tab = ModuleMgr.register(app.consentPanel);
// ModuleMgr.register(app.firstvisitPanel);
