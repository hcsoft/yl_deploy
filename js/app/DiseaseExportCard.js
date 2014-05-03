Ext.ns('app');
// 常量定义
var exportCardTreeId = 'exportCardMenu';
var exportCardGridId = 'exportCardGrid';
var exportCardLevelNumber = 5;
var exportCardTargetUrl = '/in_exportCard.html';
//公共方法
function f_add_exportCard(currentNode,dataType){
	if (currentNode == null)
		return;
	var level = currentNode.attributes['data'].level;
	if (level != exportCardLevelNumber) {
		showInfoObj.Infor('只有第五级行政区域才能增加记录！');
		return;
	}
	if(!arguments[1]) dataType = 0;
	var examUnit = escape(Ext.tf.currentUser.org.name);
	var districtNumber = currentNode.id;
	var param = '?districtNumber=' + districtNumber + '&dataType=' + dataType + '&examUnit=' + examUnit;
	var url = exportCardTargetUrl + param;
	Utils.openwindow(url, null, exportCardGridId, '新生儿（儿童）听力筛查报告单');
}
function f_edit_exportCard() {
	var selections = Ext.getCmp(exportCardGridId).getSelections();
	if (selections.length == 1) {
		var record = selections[0];
		var id = record.get('id');
		var dataType = record.get('dataType');
		var param = '?id=' + id + '&dataType=' + dataType;
		var url = exportCardTargetUrl + param;
		Utils.openwindow(url, null, exportCardGridId, '新生儿（儿童）听力筛查报告单');
	}
}

app.exportCardPanel = new Ext.tf.DiseaseAndHearPanel({
	treeLoaderFn : UserMenuTreeService.getUserDistrictNodes,
	queryUrl : UserMenuTreeService.findExportCardRecords,
//	deleteUrl : UserMenuTreeService.removeExportCardRecords,
	editFn : f_edit_exportCard,
	f_add : f_add_exportCard,
	treeId : exportCardTreeId,
	gridId : exportCardGridId,
	tbars : [
			new Ext.Button({
				text : '听力筛查报告单',
				iconCls : 'c_add',
				menu : new Ext.menu.Menu({
					width : 145,
					items : [
							{
								text : '初查',
								iconCls : 'addBusinessData',
								handler : function() {
									var node = Ext.getCmp(exportCardTreeId)
											.getSelectionModel()
											.getSelectedNode();//
									f_add_exportCard(node);
								}.createDelegate(this)
							},{
								text : '复查',
								iconCls : 'addBusinessData',
								handler : function() {
									var node = Ext.getCmp(exportCardTreeId)
											.getSelectionModel()
											.getSelectedNode();//
									f_add_exportCard(node,1);
								}.createDelegate(this)
							}, {
								text : '修改',
								iconCls : 'c_edit',
								handler : function() {
									f_edit_exportCard(1);
								}.createDelegate(this)
							}, {
								text : '删除',
								iconCls : 'c_del',
								handler : function() {
									var selections = Ext.getCmp(exportCardGridId).getSelections();
									if (selections.length > 0) {
										var array = [];
										Ext.each(selections, function(v) {
											array.push(v.get('id'));
										});
										var del = function(e) {
											if (e == "yes") {
												UserMenuTreeService.removeExportCardRecords(array, {
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
		mapping : 'exportCard.id'
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
		name : 'babySex',
		mapping : 'exportCard.babySex'
	}, {
		name : 'parentsName',
		mapping : 'exportCard.parentsName'
	}, {
		name : 'examDate',
		mapping : 'exportCard.examDate'
	}, {
		name : 'reviewExamDate',
		mapping : 'exportCard.reviewExamDate'
	}, {
		name : 'dataType',
		mapping : 'exportCard.dataType'
	}, {
		name : 'reportDate',
		mapping : 'exportCard.reportDate'
	} ],
	gridCmConfig : [ {
		"header" : "执行机构",
		"dataIndex" : "execOrgName"
	}, {
		"header" : "档案编号",
		"dataIndex" : "fileNo",
		"width" : 130
	}, {
		"header" : "姓名",
		"dataIndex" : "name"
	}, {
		"header" : "性别",
		"dataIndex" : "babySex"
	}, {
		"header" : "出生日期",
		"dataIndex" : "birthday",
		"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
	}, {
		"header" : "家长姓名",
		"dataIndex" : "parentsName"
	},{
		"header" : "状态",
		"dataIndex" : "dataType",
		renderer : function(value){
			if(value == '0'){
				return '<span>初查</span>';
			}else if(value == '1'){
				return '<span>复查</span>';
			}else{
				return '<span>未查</span>';
			}
		}
	},{
		"header" : "检查日期",
		renderer : function(value, metadata, record, rowIndex, colIndex, store){
			if(record.data.examDate != null){
				return '<span>' + record.data.examDate.format('Y-m-d') + '</span>';
			}else if(record.data.reviewExamDate != null){
				return '<span>' + record.data.reviewExamDate.format('Y-m-d') + '</span>';
			}else{
				return '<span></span>';
			}
		}
	}, {
		"header" : "报告日期",
		"dataIndex" : "reportDate",
		"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
	}]
});
_tab = ModuleMgr.register(app.exportCardPanel);
// ModuleMgr.register(app.firstvisitPanel);
