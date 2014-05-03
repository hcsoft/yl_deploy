function getDataInfo(){
	var json = '';
	var msg = '';
	var tabActiveId = Ext.getCmp('tabOrg').getActiveTab().id;
	if(tabActiveId == 'tabDistributed'){
		$('#restoreCertificateInit input').each(function(){
			var id = $(this).attr('id');
			var val = $(this).val();
			if(id == 'prefCertificateId'){
				var ret = certificateObj.validNull(val);
				if(!ret){
					msg = '出生医学证明前缀是必须的<br />';
				}else{
					json = json + id + ':' + val + ',';
				}
			}else{
				json = json + id + ':' + val + ',';
			}
		});
	}else if(tabActiveId == 'tabUndistribute'){
		
		$('#certificateInit input').each(function(){
			var id = $(this).attr('id');
			var val = $(this).val();
			if(id == 'prefCertificateId'){
				var ret = certificateObj.validNull(val);
				if(!ret){
					msg = '出生医学证明前缀是必须的<br />';
				}else{
					json = json + id + ':' + val + ',';
				}
			}else{
				json = json + id + ':' + val + ',';
			}
		});
	}
	
	if(msg != ''){
		Ext.Msg.alert('提示',msg);
		return '';
	}else{		
		json = json.substring(0,json.length - 1);
		return json;
	}
}

function pagination(currentPage,data){
	var len = data.length;
	var pageSize = 7;
	var limit = 5;
	var page = Math.ceil(len / (pageSize * limit));
	var size = 0;
	var start = 0;
	if(currentPage <= page){
		size = currentPage * pageSize * limit;
		start = (currentPage-1) * pageSize * limit;
	}
	var result = "<tbody><tr>";
	for(var i=start;i< size;i++){
		var val = data[i];
		if(val == undefined){
			val = '&nbsp;';
			result += '<td>' + val + '</td>';
		}else{
			result += '<td class="selectabled">' + val + '</td>';
		}
		var split = i + 1;
		if((split % pageSize) == 0){
			result = result + '</tr><tr>';
		}
	}
	var lastSecondChar = result.substring(result.length-4,result.length);
	if(lastSecondChar == '<tr>'){
		result = result.substring(0,result.length - 4);
	}else{
		result = result + '</tr>';
	}
	result = result + '</tbody>';
	return result;
}

function cssACA899(fields){
	var field = fields.split(',');
	for(var i = 0;i<field.length;i++){
		$('#' + field[i]).css('color','#ACA899');
	}
}
function css000(fields){
	var field = fields.split(',');
	for(var i = 0;i<field.length;i++){
		$('#' + field[i]).css('color','#000');
	}
}
function controlShow(currentPage,page){
	if(currentPage == page){
		cssACA899('lastPage,nextPage');
		css000('firstPage,prevPage');
	}else if(currentPage == 1){
		css000('lastPage,nextPage');
		cssACA899('firstPage,prevPage');
	}else{
		css000('firstPage,prevPage,lastPage,nextPage');
	}
}

function controlShow1(currentPage,page){
	if(currentPage == page){
		cssACA899('lastPage1,nextPage1');
		css000('firstPage1,prevPage1');
	}else if(currentPage == 1){
		css000('lastPage1,nextPage1');
		cssACA899('firstPage1,prevPage1');
	}else{
		css000('firstPage1,prevPage1,lastPage1,nextPage1');
	}
}

function controlShow2(currentPage,page){
	if(currentPage == page){
		cssACA899('lastPage2,nextPage2');
		css000('firstPage2,prevPage2');
	}else if(currentPage == 1){
		css000('lastPage2,nextPage2');
		cssACA899('firstPage2,prevPage2');
	}else{
		css000('firstPage2,prevPage2,lastPage2,nextPage2');
	}
}
function controlShow3(currentPage,page){
	if(currentPage == page){
		cssACA899('lastPage3,nextPage3');
		css000('firstPage3,prevPage3');
	}else if(currentPage == 1){
		css000('lastPage3,nextPage3');
		cssACA899('firstPage3,prevPage3');
	}else{
		css000('firstPage3,prevPage3,lastPage3,nextPage3');
	}
}

function tbodyAppend(result,currentPage,data){
	var $tbody = $('#tableContainer tbody');
	$tbody.remove();
	result = pagination(currentPage,data);
	$('#tableContainer').append(result);
}

Ext.onReady(function(){
	var con = 2;
	var restoreCon = 2;
	var currentNode = null;
	var researchPanel = new Ext.FormPanel({
		region : 'north',
		height : 35,
		frame : true,
		layout : "absolute",
		items : [{
			xtype : 'panel',
			layout : 'form',
			x : 0,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'newCondition',
				text : '新增条件',
				width : 80,
				handler : function(){
					var tabActiveId = Ext.getCmp('tabOrg').getActiveTab().id;
					if(tabActiveId == 'tabDistributed'){
						var restoreOtherCondition = $('#restoreOtherCondition');
						restoreOtherCondition.parent('td').parent('tr').before('<tr><td>条件' + restoreCon + '：</td>' +
								'<td><input type="text" id="restoreStartCondition'+ restoreCon + '" class="restoreCondition"/>至' +
								'<input type="text" id="restoreEndCondition'+ restoreCon +'" class="restoreEndConditions"/></td></tr>');
						restoreCon = restoreCon + 1;
						certificateObj.validNumber('restoreCondition');
						certificateObj.compareNumber('restoreEndConditions','restoreStartCondition');
					}else if(tabActiveId == 'tabUndistribute'){
						var otherCondition = $('#otherCondition');
						otherCondition.parent('td').parent('tr').before('<tr><td>条件' + con + '：</td>' +
								'<td><input type="text" id="startCondition'+ con + '" class="condition"/>至' +
								'<input type="text" id="endCondition'+ con +'" class="endConditions"/></td></tr>');
						con = con + 1;
						certificateObj.validNumber('condition');
						certificateObj.compareNumber('endConditions','startCondition');
					}
				}
			}]
		},{
			xtype : 'panel',
			layout : 'form',
			x : 90,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'newCondition',
				text : '删除条件',
				width : 80,
				handler : function(){
					var tabActiveId = Ext.getCmp('tabOrg').getActiveTab().id;
					alert(tabActiveId);
					if(tabActiveId == 'tabDistributed'){
						if(restoreCon > 2){
							restoreCon = restoreCon - 1;
							$('#restoreStartCondition' + restoreCon).parent('td').parent('tr').remove();
						}
					}else if(tabActiveId == 'tabUndistribute'){
						if(con > 2){
							con = con - 1;
							$('#startCondition' + con).parent('td').parent('tr').remove();
						}
					}
				}
			}]
		},{
			xtype : 'panel',
			layout : 'form',
			x : 180,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'save',
				id : 'save',
				text : '分配',
				width : 50,
				handler : function(){
					if(currentNode != null){
						var json = getDataInfo();
						if(json != ''){
							var orgId = currentNode.id;
							json = json.substring(0,json.length - 1);
							BirthCertificateMsgService.distriCertificateId(json,orgId,function(data){
								certificateObj.clearAllInput();
								Ext.Msg.alert('提示','分配成功');
								if(data.failureCertificate != ''){
									$('#showResultInfo').html('<font color=red size=2>您已经成功分配' + data.successNum + '个出生证明编号给'+ currentNode.text +'；'+
									'但是有' + data.failureNum + '个没有分配成功，包括：' + data.failureCertificate + '</font>');
								}else{
									$('#showResultInfo').html('<font color=red size=2>您已经成功分配' + data.successNum + '个出生证明编号给'+ currentNode.text +'。'+
									'</font>');
								}
							});
						}
					}else{
						Ext.Msg.alert('提示','请选择组织机构');
					}
				}
			}]
		},{
			xtype : 'panel',
			layout : 'form',
			x : 240,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'cancel',
				text : '取消',
				id : 'cancel',
				width : 50,
				handler : function(){
					var tabActiveId = Ext.getCmp('tabOrg').getActiveTab().id;
					if(tabActiveId == 'tabDistributed'){
						certificateObj.clearAllInput('restorePrefCertificateId','restoreCertificateInit');
					}else if(tabActiveId == 'tabUndistribute'){
						certificateObj.clearAllInput('prefCertificateId','certificateInit');
					}
					
				}
			}]
		},{
			xtype : 'panel',
			layout : 'form',
			x : 300,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'restoreDistri',
				id : 'restoreDistri',
				text : '撤消分配',
				width : 80,
				handler : function(){
					if(currentNode != null){
						var json = getDataInfo();
						if(json != ''){
							var orgId = currentNode.id;
//							alert(currentNode.text);
							json = json.substring(0,json.length - 1);
							BirthCertificateMsgService.restoreDistriCertificateId(json,orgId,function(data){
								certificateObj.clearAllInput();
								Ext.Msg.alert('提示','撤消成功');
								if(data.failureCertificate != ''){
									$('#restoreShowResultInfo').html('<font color=red size=2>您已经成功撤消' + data.successNum + '个出生证明编号给'+ currentNode.text +'；'+
									'但是有' + data.failureNum + '个没有撤消成功，包括：' + data.failureCertificate + '</font>');
								}else{
									$('#restoreShowResultInfo').html('<font color=red size=2>您已经成功撤消' + data.successNum + '个出生证明编号给'+ currentNode.text +'。'+
									'</font>');
								}
							});
						}
					}else{
						Ext.Msg.alert('提示','请选择组织机构');
					}
				}
			}]
		}]
	});
	
	var distributeCertiId = '<table id="certificateInit" class="certificateInitClass" cellpadding="0" cellspacing="0">'+
			'<tbody>'+
				'<tr>'+
					'<td>出生医学证明前缀：</td>'+
					'<td><input type="text" id="prefCertificateId" class="otherCertificateCondotion"/><font color="red">*</font></td>'+
				'</tr>'+
				'<tr>'+
					'<td>条件1：</td>'+
					'<td><input type="text" id="startCondition1" class="condition"/>至<input type="text" id="endCondition1" class="endConditions"/></td>'+
				'</tr>'+
				'<tr>'+
					'<td>其它：</td>'+
					'<td><input type="text" id="otherCondition" class="otherCertificateCondotion"/></td>'+
				'</tr>'+
			'</tbody><tfoot><tr>'+
			'<td colspan="2"><div id="showResultInfo" style="width:350px;height:200px;word-break:break-all;'+
			'overflow: scroll;"></div></td></tr></tfoot>'+
		'</table>';
	
	var restoreDistributeCertiId = '<table id="restoreCertificateInit" class="certificateInitClass"  cellpadding="0" cellspacing="0">'+
		'<tbody>'+
			'<tr>'+
				'<td>出生医学证明前缀：</td>'+
				'<td><input type="text" id="restorePrefCertificateId" class="otherCertificateCondotion"/><font color="red">*</font></td>'+
			'</tr>'+
			'<tr>'+
				'<td>条件1：</td>'+
				'<td><input type="text" id="restoreStartCondition1" class="restoreCondition"/>至<input type="text" id="restoreEndCondition1" class="restoreEndConditions"/></td>'+
			'</tr>'+
			'<tr>'+
				'<td>其它：</td>'+
				'<td><input type="text" id="restoreOtherCondition" class="otherCertificateCondotion"/></td>'+
			'</tr>'+
		'</tbody><tfoot><tr>'+
		'<td colspan="2"><div id="restoreShowResultInfo" style="width:350px;height:200px;word-break:break-all;'+
		'overflow: scroll;"></div></td></tr></tfoot>'+
	'</table>';
	
	UserMenuTreeService.getOrgMenuTree(function(data){
		new Ext.Viewport({
		    layout: 'border',
		    items: [{
		        region: 'north',
		        autoHeight: true,
		        border: false,
		        frame : true,
		        items: [researchPanel]
		    }, {
		        region: 'west',
		        collapsible: true,
		        title: '组织机构',
		        xtype: 'treepanel',
		        width: 200,
		        autoScroll: true,
		        split: true,
		        id : 'orgTree',
		        name : 'orgTree',
		        loader: new Ext.tree.TreeLoader(),
		        root: new Ext.tree.AsyncTreeNode({
		        	text : 'Autos',
		            draggable : false,
		            id : 'source',
		            icon : 'next.gif',
		            children : data
		        }),
		        rootVisible: false
		    }, {
		        region: 'center',
		        xtype: 'tabpanel',
		        id : 'tabOrg',
		        name : 'tabOrg',
		        activeTab : 0,
		        defaults: {autoScroll:true},
		        items: [{
		            title: '已分配',
		            html: '<div id="distributed"></div>',
		            listeners: {activate: handleDistributed},
		            id : 'tabDistributed',
		            name : 'tabDistributed'
		        },{
		        	title: '待分配',
		            html: '<div id="undistribute"></div>',
		            listeners: {activate: handleActivate},
		            id : 'tabUndistribute',
		            name : 'tabUndistribute'
		        }]
		    }]
		});
		
		function handleDistributed(tab){
			if(currentNode != null){
				Ext.getCmp('save').setDisabled(true);
				Ext.getCmp('restoreDistri').setDisabled(false);
				var id = currentNode.id;
				BirthCertificateMsgService.getDistributedCertiId(id,function(data){
					if(data == null){
						$('#distributed').html('<font color="red" size="2">暂无分配</font>');
					}else{
						var page = Math.ceil(data.length / 35);
						var currentPage = 1;
						var result = "<table id='tableContainer1' class='container' cellpadding='0' cellspacing='0'>" + 
								pagination(currentPage,data);
						result = result + '<tfoot><tr><td colspan="7"><span>共有' + data.length + '条记录&nbsp;&nbsp;有' + page + '页&nbsp;&nbsp;当前为第'+
							'<span id="curPage1"></span>页&nbsp;&nbsp;</span><span id="firstPage1" class="paging">首页</span>' +
						 	'&nbsp;<span id="prevPage1" class="paging">上一页</span>&nbsp;<span id="nextPage1" class="paging">下一页</span>'+
						 	'&nbsp;<span id="lastPage1" class="paging">尾页</span></td></tr></tfoot></table>';
						result = result + restoreDistributeCertiId;
						$('#distributed').html(result);
						$('#curPage1').html(currentPage);
						certificateObj.validNumber('restoreCondition');
						certificateObj.compareNumber('restoreEndConditions','restoreStartCondition');
						controlShow1(currentPage,page);
						$('.paging').click(function(){
							var id = $(this).attr('id');
							if(id == 'firstPage1'){
								currentPage = 1;
								tbodyAppend(result,currentPage,data);
							}else if(id == 'nextPage1'){
								currentPage = currentPage + 1;
								if(currentPage <= page){
									tbodyAppend(result,currentPage,data);
								}else{
									currentPage = currentPage - 1;
								}
							}else if(id == 'prevPage1'){
								currentPage = currentPage - 1;
								if(currentPage >= 1){
									tbodyAppend(result,currentPage,data);
								}else{
									currentPage = currentPage + 1;
								}
							}else if(id == 'lastPage1'){
								currentPage = page;
								tbodyAppend(result,currentPage,data);
							}
							controlShow1(currentPage,page);
							$('#curPage1').html(currentPage);
						});
						
						$('.selectabled').each(function(){
							$(this).hover(function(){
								$(this).css('cursor', 'pointer');
							},function(){
								
							}).click(function(){
								$('.selectabled').each(function() {
									if ($(this).hasClass('selected')) {
										$(this).removeClass('selected');
									}
									$(this).css('background-color', '#FFF');
								});
								$(this).addClass('selected');
								$(this).css('background-color', '#CAE2FE');
							});
						});
					}
				});
			}
		}
		
		function handleActivate(tab){
			Ext.getCmp('save').setDisabled(false);
			Ext.getCmp('restoreDistri').setDisabled(true);
			BirthCertificateMsgService.getUnDistributeCertiId(function(data){
				if(data == null){
					$('#undistribute').html('<font color="red" size="2">暂无可分配的出生医学证明</font>');
				}else{
					var page = Math.ceil(data.length / 35);
					var currentPage = 1;
					var result = "<div><font size='2' color='red'>可分配的出生医学证明编号：</font></div>" +
						"<table id='tableContainer' class='container' cellpadding='0' cellspacing='0'>" + 
						pagination(currentPage,data);
					result = result + '<tfoot><tr><td colspan="7"><span>共有' + data.length + '条记录&nbsp;&nbsp;有' + page + '页&nbsp;&nbsp;当前为第'+
						'<span id="curPage"></span>页&nbsp;&nbsp;</span><span id="firstPage" class="paging">首页</span>' +
					 	'&nbsp;<span id="prevPage" class="paging">上一页</span>&nbsp;<span id="nextPage" class="paging">下一页</span>'+
					 	'&nbsp;<span id="lastPage" class="paging">尾页</span></td></tr></tfoot></table>';
					
					result = result + distributeCertiId;
					
					$('#undistribute').html(result);
					$('#curPage').html(currentPage);
					certificateObj.validNumber('condition');
					certificateObj.compareNumber('endConditions','startCondition');
					controlShow(currentPage,page);
					$('.paging').click(function(){
						var id = $(this).attr('id');
						if(id == 'firstPage'){
							currentPage = 1;
							tbodyAppend(result,currentPage,data);
						}else if(id == 'nextPage'){
							currentPage = currentPage + 1;
							if(currentPage <= page){
								tbodyAppend(result,currentPage,data);
							}else{
								currentPage = currentPage - 1;
							}
						}else if(id == 'prevPage'){
							currentPage = currentPage - 1;
							if(currentPage >= 1){
								tbodyAppend(result,currentPage,data);
							}else{
								currentPage = currentPage + 1;
							}
						}else if(id == 'lastPage'){
							currentPage = page;
							tbodyAppend(result,currentPage,data);
						}
						controlShow(currentPage,page);
						$('#curPage').html(currentPage);
					});
				}
			});
	    }
		
		Ext.getCmp('orgTree').on({
			click : {
				stopEvent : true,
				fn : function(n,e){
					var id = n.id;
					currentNode = n;
					var activeTab = Ext.getCmp('tabOrg').getActiveTab();
					var activeTabId = activeTab.id;
					if(activeTabId == 'tabDistributed'){
						handleDistributed(activeTab);
					}
				}
			}
		});
	});
});