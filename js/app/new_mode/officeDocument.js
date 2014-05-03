var roots = new Ext.tree.TreeNode({
	id: 'root',
	text: '电子病历',
	expanded : true
});

var zy_level1 = createTreeNode('01','住院病历模板');
roots.appendChild(zy_level1);
var zy_level1_1 = createTreeNode('01_01','首次病历');
var zy_level1_2 = createTreeNode('01_02','住院志');
var zy_level1_3 = createTreeNode('01_03','病程记录');
var zy_level1_4 = createTreeNode('01_04','出院小结');
var zy_level1_5 = createTreeNode('01_05','手术小结');
var zy_level1_6 = createTreeNode('01_06','知情文件');
var zy_level1_7 = createTreeNode('01_07','护理记录');
var zy_level1_8 = createTreeNode('01_08','手术护理记录');
var zy_level1_9 = createTreeNode('01_09','会诊记录');
var zy_level1_10 = createTreeNode('01_10','随访记录');
var zy_level1_11 = createTreeNode('01_11','其他文书');
zy_level1.appendChild([zy_level1_1,zy_level1_2,zy_level1_3,zy_level1_4,zy_level1_8,zy_level1_9,zy_level1_10,zy_level1_11]);
zy_level1_1.appendChild(createTreeNode('E:\\OSTAR\\沙桥病历\\住院病案首页.ost','住院病案首页'));
zy_level1_1.appendChild(createTreeNode('E:\\OSTAR\\贵阳病历模块\\贵阳病历模块\\首次入院记录.ost','首次入院记录'));
zy_level1_1.appendChild(createTreeNode('E:\\OSTAR\\贵阳病历模块\\贵阳病历模块\\首次病程记录.ost','首次病程记录'));
zy_level1_1.appendChild(createTreeNode('E:\\OSTAR\\沙桥病历\\儿科首次病程及病程记录.ost','儿科首次病程及病程记录'));
zy_level1_1.appendChild(createTreeNode('E:\\OSTAR\\沙桥病历\\妇科首次病程记录.ost','妇科首次病程记录'));
zy_level1_2.appendChild(createTreeNode('E:\\OSTAR\\贵阳病历模块\\贵阳病历模块\\入院记录.ost','入院记录'));
zy_level1_3.appendChild(createTreeNode('E:\\OSTAR\\贵阳病历模块\\贵阳病历模块\\病程记录.ost','病程记录'));
zy_level1_3.appendChild(createTreeNode('E:\\OSTAR\\贵阳病历模块\\贵阳病历模块\\术后病程记录.ost','术后病程记录'));
zy_level1_2.appendChild(createTreeNode('E:\\OSTAR\\贵阳病历模块\\贵阳病历模块\\出院记录.ost','出院记录'));
zy_level1_4.appendChild(createTreeNode('E:\\OSTAR\\昭通精神病\\出院小结.ost','出院小结'));
zy_level1_1.appendChild(createTreeNode('E:\\OSTAR\\昭通精神病\\妇科入院记录.ost','妇科入院记录'));
zy_level1_1.appendChild(createTreeNode('E:\\OSTAR\\沙桥病历\\新生儿科科住院病历.ost','新生儿科住院病历'));
zy_level1_9.appendChild(createTreeNode('E:\\OSTAR\\贵阳病历模块\\贵阳病历模块\\会诊记录.ost','会诊记录'));
zy_level1_10.appendChild(createTreeNode('E:\\OSTAR\\贵阳病历模块\\贵阳病历模块\\随访记录.ost','随访记录'));
zy_level1_8.appendChild(createTreeNode('E:\\OSTAR\\贵阳病历模块\\贵阳病历模块\\手术记录.ost','手术记录'));
zy_level1_8.appendChild(createTreeNode('E:\\OSTAR\\贵阳病历模块\\贵阳病历模块\\手术协议书.ost','手术协议书'));
zy_level1_8.appendChild(createTreeNode('E:\\OSTAR\\贵阳病历模块\\贵阳病历模块\\输血协议书.ost','输血协议书'));
zy_level1_11.appendChild(createTreeNode('E:\\OSTAR\\贵阳病历模块\\贵阳病历模块\\死亡记录.ost','死亡记录'));
zy_level1_11.appendChild(createTreeNode('E:\\OSTAR\\贵阳病历模块\\贵阳病历模块\\死亡报告单.ost','死亡报告单'));
zy_level1_11.appendChild(createTreeNode('E:\\OSTAR\\贵阳病历模块\\贵阳病历模块\\退院协议书.ost','退院协议书'));
zy_level1_11.appendChild(createTreeNode('E:\\OSTAR\\贵阳病历模块\\贵阳病历模块\\照片报告单.ost','照片报告单'));
zy_level1_11.appendChild(createTreeNode('E:\\OSTAR\\贵阳病历模块\\贵阳病历模块\\病情治疗方案告知.ost','病情治疗方案告知'));
zy_level1_11.appendChild(createTreeNode('E:\\OSTAR\\贵阳病历模块\\贵阳病历模块\\麻醉药品使用同意书.ost','麻醉药品使用同意书'));
zy_level1_11.appendChild(createTreeNode('E:\\OSTAR\\沙桥病历\\妇科简易病历表.ost','妇科简易病历表'));


//
//var zy_level2 = createTreeNode('02','门诊');
//roots.appendChild(zy_level2);

function createTreeNode(id,text){
	var node = new Ext.tree.TreeNode({
		id : id,
		text : text
	});
	return node;
}

var trees = new Ext.tree.TreePanel({
	title: '办公文档',
	width: 200,
	lines: true,
	root: roots,
	height: 510,
	autoScroll: true,
	region: 'west',
	border : true,
	collapsible : true
});

trees.on({
	click: {
		stopEvent : true,
		fn : function(n,e){
			e.stopEvent();
			var currentNode = n;
			var rootNode = trees.getRootNode();
			if(!currentNode.hasChildNodes()){
				showOffice.setTitle(currentNode.text);
				openOffice(currentNode.id);
			}
		}.createDelegate(this)
	}
});

function openOffice(path){
	document.getElementById("OStarOCX21").bShowBar = true;
	document.getElementById("OStarOCX21").OnOpenFile(path);
}

var showOffice = new Ext.FormPanel({
	title : '请选择文档',
	width: 700,
	height: 510,
	border : true,
	region: 'center',
	html : '<object classid="clsid:9F96D39A-372E-46FE-AEE7-2A6BFE8F6483" id="OStarOCX21" width="100%" height="510">'
				+'<param name="_Version" value="65536">'
				+'<param name="_ExtentX" value="6773">'
				+'<param name="_ExtentY" value="4366">'
				+'<param name="_StockProps" value="0">'
				+'<param name ="bShowBar" value="true">'
			+'</object>'
});

panel = new Ext.Panel({
	title: '行政办公',
	width: 900,
	closable: true,
	layout: 'border',
	items: [trees,showOffice]
});

_tab = ModuleMgr.register(panel);