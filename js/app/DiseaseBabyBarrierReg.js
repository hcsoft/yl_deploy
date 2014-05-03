Ext.ns('app');
// 常量定义
var BabyBarrierRegTreeId = 'BabyBarrierRegMenu';
var BabyBarrierRegGridId = 'BabyBarrierRegGrid';
var BabyBarrierRegLevelNumber = 5;
var BabyBarrierRegTargetUrl = '/in_BabyBarrierReg.html';
//公共方法
function f_add_BabyBarrierReg(currentNode){
	if (currentNode == null)
		return;
	var level = currentNode.attributes['data'].level;
	if (level != BabyBarrierRegLevelNumber) {
		showInfoObj.Infor('只有第五级行政区域才能增加记录！');
		return;
	}
	var districtNumber = currentNode.id;
	var param = '?districtNumber=' + districtNumber;
	var url = BabyBarrierRegTargetUrl + param;
	Utils.openwindow(url, null, BabyBarrierRegGridId, '听力障碍儿童个案登记');
}
function f_edit_BabyBarrierReg() {
	var selections = Ext.getCmp(BabyBarrierRegGridId).getSelections();
	if (selections.length == 1) {
		var record = selections[0];
		var id = record.get('id');
		var param = '?id=' + id;
		var url = BabyBarrierRegTargetUrl + param;
		Utils.openwindow(url, null, BabyBarrierRegGridId, '听力障碍儿童个案登记');
	}
}

app.BabyBarrierRegPanel = new Ext.tf.DiseaseAndHearPanel({
	treeLoaderFn : UserMenuTreeService.getUserDistrictNodes,
	queryUrl : UserMenuTreeService.findBabyBarrierRegRecords,
//	deleteUrl : UserMenuTreeService.removeBabyBarrierRegRecords,
	editFn : f_edit_BabyBarrierReg,
	f_add : f_add_BabyBarrierReg,
	treeId : BabyBarrierRegTreeId,
	gridId : BabyBarrierRegGridId,
	tbars : [
			new Ext.Button({
				text : '听力障碍个案登记',
				iconCls : 'c_add',
				menu : new Ext.menu.Menu({
					width : 145,
					items : [
							{
								text : '登记',
								iconCls : 'addBusinessData',
								handler : function() {
									var node = Ext.getCmp(BabyBarrierRegTreeId)
											.getSelectionModel()
											.getSelectedNode();//
									f_add_BabyBarrierReg(node);
								}.createDelegate(this)
							}, {
								text : '修改',
								iconCls : 'c_edit',
								handler : function() {
									f_edit_BabyBarrierReg();
								}.createDelegate(this)
							}, {
								text : '删除',
								iconCls : 'c_del',
								handler : function() {
									var selections = Ext.getCmp(BabyBarrierRegGridId).getSelections();
									if (selections.length > 0) {
										var array = [];
										Ext.each(selections, function(v) {
											array.push(v.get('id'));
										});
										var del = function(e) {
											if (e == "yes") {
												UserMenuTreeService.removeBabyBarrierRegRecords(array, {
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
							} ]
				})
			}) ],
	readerConfig : [ {
		name : 'execOrgName',
		mapping : 'org.name'
	}, {
		name : 'id',
		mapping : 'babyBarrierReg.id'
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
		name : 'screeningResult',
		mapping : 'babyBarrierReg.screeningResult'
	}, {
		name : 'diagnosisResult',
		mapping : 'babyBarrierReg.diagnosisResult'
	}, {
		name : 'diagnosisDoctor',
		mapping : 'babyBarrierReg.diagnosisDoctor'
	} ],
	gridCmConfig : [ {
		"header" : "执行机构",
		"dataIndex" : "execOrgName"
	}, {
		"header" : "编号",
		"dataIndex" : "fileNo",
		"width" : 130
	}, {
		"header" : "姓名",
		"dataIndex" : "name"
	}, {
		"header" : "出生日期",
		"dataIndex" : "birthday",
		"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
	}, {
		"header" : "筛查结果",
		"dataIndex" : "screeningResult"
	}, {
		"header" : "诊断结果",
		"dataIndex" : "diagnosisResult"
	}, {
		"header" : "诊断医师签名",
		"dataIndex" : "diagnosisDoctor"
	} ]
});
_tab = ModuleMgr.register(app.BabyBarrierRegPanel);
// ModuleMgr.register(app.firstvisitPanel);
