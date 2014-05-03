Ext.ns('Ext.tf')

function createLabel(id,name,x,y,text){
	return new Ext.form.Label({
		id : id,
		name : name,
		x : x,
		y : y,
		text : text
	});
}

function createComboBox(id,name,x,y,store,displayField,valueField,defVal){
	return new Ext.form.ComboBox({
		x : x,
		y : y,
		id : id,
		name : name,
		store: store,
        displayField:displayField,
        valueField: valueField,
        typeAhead: true,
        mode: 'local',
        triggerAction: 'all',
        selectOnFocus:true,
        editable: false,
        width: 100,
        value: defVal
	});
}

function createTextField(id,name,x,y,width,keypressFn){
	return new Ext.form.TextField({
		x : x,
		y : y,
		id : id,
		name : name,
		width : width,
		enableKeyEvents : true,
		listeners : {
			'keypress' : keypressFn
		}
	});
}

function createButton(id,name,x,y,text,clickFn){
	return new Ext.Button({
		style : {
			left : x,
			top : y
		},
		id : id,
		name : name,
		text : text,
		listeners : {
			'click' : clickFn
		},
		iconCls : 'searchbg'
	});
}
function addZero(val){
	return val < 10 ? '0' + val : val;
}
function date2String(date){
	return date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate());
}

function genBusinessVal(id,date,type){
	if(date != null){
		return '<span style="display:none;" id="' + id + '">' + type + '</span><span>' + date2String(date) + '<span>';
	}
	return '&nbsp;';
}
function fillVisitAfterBornItem(id,val,type){
	if(val != null){
		return '<span style="display:none;" id="' + id + '">' + type + '</span><span>' + val + '<span>';
	}
	return '&nbsp;';
}
function fillVisitBeforeBornItem(id,val,type){
	if(val != null){
		return '<span style="display:none;" id="' + id + '">' + type + '</span><span>第' + val + '次<span>';
	}
	return '&nbsp;';
}

function openWin(targetUrl,gridId) {
	var win = new Ext.Window({
		modal : true,
		title : '录入记录',
		layout : 'fit',
		border : false
	});

	win.show();
	win.maximize();

	win.add({
		xtype : 'iframepanel',
		defaultSrc : targetUrl,
		title : '',
		loadMask : true,
		autoScroll : false,
		layout : 'fit',
		height: win.getInnerHeight() - 10,
		listeners : {
			message : function(f, data) {
				console.log("receive message...");
				console.log(data);
				if (data.data == 'quit') {
					win.close();
					if(arguments[1]){
						Ext.getCmp(gridId).getStore().reload();
					}
				} else if (data.data == 'saved') {
					this.load();
				}
			}.createDelegate(this)
		}
	});
	win.doLayout(true);
}

function services(id,type){
	var url = '';
	if(type == 0){
		url = '/medicalExam.html';
	}else if(type == 1){
		url = '/babyvisit.html';
	}else if(type == 2){
		url = '/childexam1.html';
	}else if(type == 3){
		url = '/childexam2.html';
	}else if(type == 4){
		url = '/childexam3_6.html';
	}else if(type == 5){
		url = '/firstvisit.html';
	}else if(type == 6){
		url = '/VisitBeforeBorn.html';
	}else if(type == 7){
		url = '/visitAfterBorn.html';
	}else if(type == 8){
		url = '/visitAfterBorn42.html';
	}else if(type == 9){
		url = '/hyp_visit.html';
	}else if(type == 10){
		url = '/t2dm_visit.html';
	}else if(type == 11){
		url = '/furious_visit.html';
	}
	openWin(url + '?id=' + id);
}

var globleFileNo = null;

function redirectToInputUrl(url){
	if(globleFileNo != null){
		openWin(url + '?fileNo=' + globleFileNo);
	}
}

function listenerTDdbClick(){
	$.each($('.table_BusinessData tbody td'),function(){
		$(this).dblclick(function(){
			var firstSpan = $(this).children('span');
			if(firstSpan.length > 0){
				var id = firstSpan.attr('id');
				var type = firstSpan.html();
				services(id,type);
			}
		}).click(function(){
			$.each($('.table_BusinessData tbody td'),function(){
				$(this).css('background-color','#FFF');
				$(this).removeClass('selected');
			});
			$(this).css('background-color','red');
			$(this).addClass('selected');
		}).hover(function(){
			if(!$(this).hasClass('selected'))
				$(this).css('background-color','#d5edf9');
		},function(){
			if(!$(this).hasClass('selected'))
				$(this).css('background-color','#FFF');
		});
	});
}

function genBusinessFillData(data){
	$('.table_BusinessData tbody').remove();
	var $tbody = '<tbody>';
	var $tbodyTrTd = '';
	$.each(data,function(n,val){
		$tbodyTrTd = $tbodyTrTd + '<tr><td>' + 
				genBusinessVal(val.medicalExamId,val.medicalExamDate,0) + '</td><td>' + 
				genBusinessVal(val.babyVisitId,val.babyVisitDate,1) + '</td><td>' + 
				genBusinessVal(val.childrenMediExam01id,val.childrenMediExam01date,2) + '</td><td>' + 
				genBusinessVal(val.childrenMediExam02id,val.childrenMediExam02date,3) + '</td><td>' + 
				genBusinessVal(val.childrenMediExam36id,val.childrenMediExam36date,4) + '</td><td>' + 
				genBusinessVal(val.firstVistBeforeBornId,val.firstVistBeforeBornDate,5) + '</td><td>' +
				fillVisitBeforeBornItem(val.visitBeforeBornId,val.visitBeforeBornItem,6) + '</td><td>' + 
				genBusinessVal(val.visitBeforeBornId,val.visitBeforeBornDate,6) + '</td><td>' + 
				fillVisitAfterBornItem(val.visitAfterBornId,val.visitAfterBornItem,7) + '</td><td>' + 
				genBusinessVal(val.visitAfterBornId,val.visitAfterBornDate,7) + '</td><td>' + 
				genBusinessVal(val.visitAfterBorn42id,val.visitAfterBorn42date,8) + '</td><td>' + 
				genBusinessVal(val.hypertensionVisitId,val.hypertensionVisitDate,9) + '</td><td>' + 
				genBusinessVal(val.diabetesVisitId,val.diabetesVisitDate,10) + '</td><td>' + 
				genBusinessVal(val.furiousVisitId,val.furiousVisitDate,11) + '</td><td>疾控待完善</td></tr>';
	});
	$tbody = $tbody + $tbodyTrTd + '</tbody>';
	$('.table_BusinessData').append($tbody);
}

function genBusinessHtml(){
	var $table = '<table onselectstart= "return false;" cellpadding="0" cellspacing="0" class="table_BusinessData">' +
					'<thead>' + 
						'<tr><td>健康体检</td><td colspan="4">儿童体检</td><td colspan="6">孕产妇体检</td><td colspan="3">慢性病</td><td>疾控</td></tr>'+
						'<tr><td>健康体检</td><td>新生儿</td><td>1岁以内</td><td>1~2岁</td><td>3~6岁</td><td>第1次</td><td colspan="2">第2~5次</td><td colspan="2">产后</td><td>产后42天</td><td>高血压</td><td>糖尿病</td><td>重性精神病</td><td>疾控</td></tr>'+
						'<tr><td>体检日期</td><td>访视日期</td><td>体检日期</td><td>体检日期</td><td>体检日期</td><td>随访日期</td><td>项目</td><td>随访日期</td><td>项目</td><td>访视日期</td><td>体检日期</td><td>随访日期</td><td>随访日期</td><td>随访日期</td><td>疾控待完善</td></tr>'+
					'</thead>' +
				'</table>';
	return $table;
}

function genBasicInfoHtml(){
	var $table = '<table onselectstart= "return false;" cellpadding="0" cellspacing="0" class="table_BasicInfo">' +
			'<thead>' + 
				'<tr><td>名称</td><td>值</td></tr>'+
			'</thead>' +
		'</table>';
	return $table;
}

function getInfo(fileNo){
	var json = {fileNo : fileNo};
	PersonalInfoService.getBasicInfo(json,function(data){
		var birthday = data.birthday;
		var folk = data.folk;
		folk =  folk != '' ? (folk == '少数民族' ? data.folkOther : folk ) : '';
		$('.table_BasicInfo tbody').remove();
		var $tbody = '<tbody>' + 
						'<tr><td>档案编号</td><td>' + data.fileNo + '</td></tr>' + 
						'<tr><td>姓名</td><td>' + data.name + '</td></tr>' + 
						'<tr><td>性别</td><td>' + data.sex + '</td></tr>' + 
						'<tr><td>民族</td><td>' + folk + '</td></tr>' + 
						'<tr><td>出生日期</td><td>' + birthday.getFullYear() + '年' + (birthday.getMonth() + 1) + '月' + birthday.getDate() + '日' + '</td></tr>' + 
						'<tr><td>身份证号</td><td>' + data.idnumber + '</td></tr>' + 
						'<tr><td>现住址</td><td>' + data.address + '</td></tr>' + 
						'<tr><td>户籍住址</td><td>' + data.residenceAddress + '</td></tr>' + 
					'</tbody>';
		$('.table_BasicInfo').append($tbody);
	});
	summaryService.queryBusinessData(fileNo,function(data){
		if(data != null && data.length > 0){
			genBusinessFillData(data);
			listenerTDdbClick();
		}
	});
}

var title_info = '<font color=red size=2>&nbsp;&nbsp;&nbsp;&nbsp;(注:双击日期可查看明细)</font>';

var menuItems = [];

UserMenuTreeService.getUserCatInfo(function(data){
	if(data.length > 0){
		for(var i = 0;i<data.length;i++){
			var isNavigate = data[i].module.isNavigate;
			if(isNavigate){
				var inputPage = data[i].module.inputPage;
				if(inputPage != null && inputPage != ''){
					var title = data[i].module.name;
					var json = {text: title, handler: function(){
			        	redirectToInputUrl(inputPage);
			        }};
					menuItems.push(json);
				}
			}
		}
	}
	Ext.tf.BusinessDataForPerson = Ext.extend(Ext.Panel,{
		closable : true,
		layout : 'fit',
		pageSize : 10,
		currentNode : null, //当前选择的树节点
		readerConfig : [],
		tmpGridCmConfig : [],
		gridViewConfig : {},
		queryUrl : Ext.emptyFn,
		
		storeFileNo : null,
		
		initComponent: function(){
			this.build();
			Ext.tf.BusinessDataForPerson.superclass.initComponent.call(this);
		},

		build : function(){
			this.items = [ this.createPanel() ];
		},
		
		getTreeSelNode : function() {
		    var selNode = this.currentNode;
		    if ( selNode ) {
//		    	console.log(selNode);
		    } else {
		    	Ext.Msg.alert('', '请先选择一个节点！');
		    };
		    return selNode;
		},
		
		getParams : function() {
			var selNode = this.getTreeSelNode();
		    if ( selNode ) {
		    	var filterKey = Ext.getCmp('searchCondition').getValue();
		    	var filterValue = Ext.getCmp('inputCondition').getValue();
		    	var cond = {
		    		district : selNode.id,
		    		filterKey : filterKey,
		    		filterValue : filterValue
		    	};
		    	return cond;
		    }
		    return null;
		},
		
		load : function(isReset){
			var selNode = this.getTreeSelNode();
		    if ( selNode ) {
		    	if ( isReset ) {
		    		this.pagingBar.changePage(1);
		    	}
		    	this.grid.getStore().reload();
		    	this.doLayout(true);
		    }
		},
		
		selectHealthFile : function(){
			var selections = this.grid.getSelections();
			if(selections.length > 0){
				var fileNo = selections[0].get('fileNo');
				getInfo(fileNo);
				globleFileNo = fileNo;
			}
			Ext.getCmp('searchWindow').close();
		},
		
		win : function(){
			this.menu = new Ext.tree.TreePanel({
				layout : 'fit',
				region : 'west',
				width : 180,
				collapsible : true,
				title : '行政区划',
				animate : true,
				enableDD : false,
				loader : new Ext.ux.DWRTreeLoader({
					dwrCall : UserMenuTreeService.getUserDistrictNodes
				}),
				lines : true,
				autoScroll : true,
				border : false,
				root : new Ext.tree.AsyncTreeNode({
					text : 'root',
					draggable : false,
					id : 'orgIgnoreDistrict'
				}),
				rootVisible : false
			});

			this.menu.getRootNode().on({
				append : {
					stopEvent : true,
					fn : function(t, me, n, index) {
						// 自动展开根节点的第一个孩子
						if (index == 0) {
							if (!n.leaf)
								n.expand();
							this.currentNode = n;
						}
					}.createDelegate(this)
				}
			});
			
			this.menu.on({
				click : {
					stopEvent : true,
					fn : function(n,e){
						this.currentNode = n;
						this.grid.setTitle(n.text);
					}.createDelegate(this)
				}
			});
			
			var reader = new Ext.data.JsonReader({
				totalProperty : 'totalSize',
				root : 'data',
				id : this.recordId
			},Ext.data.Record.create([{name:'fileNo'},
			         {name:'name'},
			         {name:'personalInfo_sex', mapping: 'personalInfo.sex'},
			         {name:'personalInfo_birthday', mapping: 'personalInfo.birthday'},
			         {name:'personalInfo_idnumber', mapping: 'personalInfo.idnumber'},
			         {name:'address'}]));
			
			var store = new Ext.data.Store({
				proxy : new Ext.ux.data.DWRProxy({
					dwrFunction : UserMenuTreeService.findHealthFiles,
					listeners : {
						'beforeload' : function(dataProxy, params){
							var o = this.getParams();
							if(!params.limit)
								params.limit = this.pageSize;
							params[dataProxy.loadArgsKey] = [o,params];
						}.createDelegate(this)
					}
				}),
				reader : reader
			});
			
			this.pagingBar = new Ext.PagingToolbar({
				pageSize : this.pageSize,
				displayMsg : '{0}-{1} of {2}',
				displayInfo : true,
				emptyMsg : '没有记录',
				store : store
			});
			
			var sm = new Ext.grid.CheckboxSelectionModel({singleSelect : true});
//		    this.gridCmConfig.unshift(sm);
			this.grid = new Ext.grid.GridPanel({
				title : '请选择行政区划',
				id : 'mygrid',
				layout : 'fit',
				region : 'center',
				bbar : this.pagingBar,
				autoScroll : true,
				store: store,
				cm : new Ext.grid.ColumnModel([sm,{ "header" : "档案编号", "dataIndex" : "fileNo","width" : 200}, 
				    		                   { "header" : "姓名", "dataIndex" : "name"}, 
				    		                   { "header" : "性别", "dataIndex" : "personalInfo_sex"}, 
				    		                   { "header" : "出生日期", "dataIndex" : "personalInfo_birthday", 
				    		                                       "renderer": Ext.util.Format.dateRenderer('Y-m-d') }, 
				    		                   { "header" : "身份证号", "dataIndex" : "personalInfo_idnumber" },  
				    		                   { "header" : "住址", "dataIndex" : "address" }]),
				loadMask : true,
//				viewConfig : this.gridViewConfig,
				sm : sm
			});
			
			this.grid.on('rowdblclick', this.selectHealthFile , this);
			this.grid.getView().on('refresh', function() {
				var model = this.grid.getSelectionModel();
				if (model.getCount() == 0) {
					model.selectFirstRow();
				}
			}.createDelegate(this));
			
			
			var panel = new Ext.Panel({
				height : 400,
				layout : 'border',
				items : [new Ext.Panel({
					region:'north',
					height : 40,
					frame : true,
					bodyBorder : false,
					layout : 'absolute',
					items : [createLabel('searchConditionTitle','searchConditionTitle',0,5,'搜索条件:'),
					         createComboBox('searchCondition','searchCondition',70,2,new Ext.data.SimpleStore({
					        	 fields: ['type', 'display'],
					             data : [['a.name','姓名'],['a.paperFileNo','条形码'],['b.birthday','出生日期'],['a.fileNo','档案编码'],['b.idnumber','身份证号']]
					         }),'display','type','a.name'),
					         createTextField('inputCondition','inputCondition',175,2,150,function(field, event){
					        	 if(event.getKey() == 13){
					        		 this.load(true);
					        	 };
					         }.createDelegate(this)),
					         createButton('searchBtn','searchBtn',330,2,'搜索',function(){
					        	this.load(true);
					         }.createDelegate(this))]
				}),this.menu,new Ext.Panel({
					region:'center',
					layout : 'fit',
					items : [this.grid]
				})]
			});
			
			var win = new Ext.Window({
				id : 'searchWindow',
				name : 'searchWindow',
				width : 650,
				autoHeight : true,
				title : '查询',
				closable : true,
				layout : 'fit',
				modal : true,
				items : [panel],
				buttonAlign : 'center',
				buttons : [{
					text : '确认',
					width : 30,
					handler : function(){
						this.selectHealthFile();
						genBusinessFillData(null);
					}.createDelegate(this)
				},{
					text : '关闭',
					width : 30,
					handler : function(){
						win.close();
					}.createDelegate(this)
				}]
			});
			win.show(this);
		},
		
		createPanel : function(){		
			var westPanel = new Ext.Panel({
				region:'west',
				title : '个人基本信息',
				width : 250,
				autoScroll : true,
				collapsible : true,
				html : genBasicInfoHtml()
			});
			
				
			var gridColPanel = new Ext.Panel({
				title : '业务数据' + title_info,
				layout : 'fit',
				region:'center',
				autoScroll : true,
				html : genBusinessHtml()
			});
			var panel = new Ext.Panel({
				layout : 'border',
				tbar : [{
					text : '查询',
					iconCls : 'searchbg',
					handler : function(){
						this.win();
					}.createDelegate(this)
				},{
					text : '查看',
					iconCls : 'lookupDetailInfo',
					handler : function(){
						var firstSpan = $('.selected').children('span');
						if(firstSpan.length > 0){
							var id = firstSpan.attr('id');
							var type = firstSpan.html();
							services(id,type);
						}
					}.createDelegate(this)
				},{
					text : '刷新',
					iconCls : 'refresh',
					handler : function(){
						if(globleFileNo != null){
							console.log(globleFileNo);
							getInfo(globleFileNo);
						}
					}.createDelegate(this)
				},new Ext.Button({
					text: '业务数据录入入口',
					iconCls: 'addBusinessData',
					menu: new Ext.menu.Menu({
				        items: menuItems
				   	})

				})],
				items : [westPanel,gridColPanel]
			});
			return panel;
		}
	});
});


