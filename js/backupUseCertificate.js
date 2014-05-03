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
	var searchVal = Ext.getCmp('certifiId').getValue();
	var result = "<tbody><tr>";
	for(var i=start;i< size;i++){
		var val = data[i];
		if(val == undefined){
			val = '&nbsp;';
			result += '<td>' + val + '</td>';
		}else{
			if(searchVal == val){
				result += '<td class="selected" style="background-color:red;">' + val + '</td>';
			}else{
				result += '<td>' + val + '</td>';
			}
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

function isNull(val){
	if(val == null || val == '')
		val = '&nbsp;';
	return val;
}

function paginationUsed(currentPage,data){
	var len = data.length;
	var pageSize = 10;
	var page = Math.ceil(len / pageSize);
	var size = 0;
	var start = 0;
	if(currentPage < page){
		size = currentPage * pageSize;
	}else{
		size = len;
	}
	start = (currentPage-1) * pageSize;
	var result = "<tbody>";
	
	for(var i=start;i< size;i++){
		result = result + '<tr><td><input type="checkbox" class="checkable"/></td><td>' + isNull(data[i].certifiId) + '</td><td>' + isNull(data[i].name) +
			'</td><td>' + isNull(data[i].motherName) + '</td><td>' + isNull(data[i].fatherName) + 
			'</td><td>' + isNull(data[i].borthOrganization) + '</td><td></tr>'; 
	}
	result = result + '</tbody>';
	return result;
}
function $eachCheckBox(i){
	$('.checkable').each(function(j){
		var check = $(this).attr('checked');
		if(check){
			$(this).attr('checked','');
		}else{
			if(i == j){
				$(this).attr('checked','checked');
			}
		}
	});
}
function checked(){
	$('.checkable').each(function(i){
		$(this).click(function(){
			$eachCheckBox(i);
		});
	});
}

function getCertifiId(){
	var certifiId = '';
	$('.checkable').each(function(){
		var check = $(this).attr('checked');
		if(check){
			certifiId = $(this).parent('td').next().html();
		}
	});
	return certifiId;
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

function controlShow4(currentPage,page){
	if(currentPage == page){
		cssACA899('lastPage4,nextPage4');
		css000('firstPage4,prevPage4');
	}else if(currentPage == 1){
		css000('lastPage4,nextPage4');
		cssACA899('firstPage4,prevPage4');
	}else{
		css000('firstPage4,prevPage4,lastPage4,nextPage4');
	}
}

function tbodyAppend($this,currentPage,data){
	var $tbody = $('#' + $this + ' tbody');
	$tbody.remove();
	result = paginationUsed(currentPage,data);
	$('#' + $this).append(result);
}

function tbodyAppendUnused($this,currentPage,data){
	var $tbody = $('#' + $this + ' tbody');
	$tbody.remove();
	result = pagination(currentPage,data);
	$('#' + $this).append(result);
}

function showMsg(msg){
	Ext.Msg.show({
		title : '提示',
		msg : msg,
		icon: Ext.MessageBox.INFO,
		animEl: 'elId',
		buttons: Ext.Msg.OK
	});
}


Ext.onReady(function(){
	
	BirthCertificateMsgService.getAuthority(function(data){
		if(!data){
			Ext.getCmp('restore').setVisible(false);
			Ext.getCmp('restorePigeonhole').setVisible(false);
		}
	});
	
	function openWin(targetUrl,param) {
	    var win = new Ext.Window({
	      modal: true,
	      title: '录入记录',
	      border: false,
	      bbar : [{
	    	  text : '退出',
	    	  cls : 'c_del',
	    	  handler : function(){
	    		  runTabPanel();
	    		  win.close();
	    	  }
	      }]
//	      closable : false
	    });
	    if(param !=null){
	    	window.other_init_param = param;
	    }
	    win.show();
	    win.maximize();
	    win.add( {
	      xtype: 'iframepanel',
	      defaultSrc : targetUrl,
	      width: win.getInnerWidth(),
	      height: win.getInnerHeight() - 10,
	      title : '',
	      loadMask : true,
	      autoScroll: true
	    });
	    win.doLayout(true);
	  }

	
	
	function selectRow(){
		$('.certifiTable tbody tr').each(function(i){
			$(this).click(function(){
				$eachCheckBox(i);
			}).hover(function(){
				$(this).css('cursor','pointer');
			},function(){
				
			});
		});
	}
	
	var con = 2;
	var currentNode = null;
	
	function services(params){
		if(currentNode != null){
			var certifiId = getCertifiId();
			if(certifiId != ''){
				openWin('/birthCertificateInfo.html','?certifiId=' + certifiId + '&orgName=' + currentNode.text + '&type=' + params);
			}else{
				showMsg('请选择出生证明信息');
			}
		}else{
			showMsg('请选择组织机构');
		}
	}
	
	var handleDistributed = function(tab){
		if(currentNode != null){
			Ext.getCmp('save').setDisabled(false);
			Ext.getCmp('modify').setDisabled(true);
			Ext.getCmp('lookup').setDisabled(true);
			Ext.getCmp('destroy').setDisabled(true);
			Ext.getCmp('pigeonhole').setDisabled(true);
			Ext.getCmp('restore').setDisabled(true);
			Ext.getCmp('restorePigeonhole').setDisabled(true);
			var id = currentNode.id;
			var resTxt = Ext.getCmp('certifiId').getValue();
			BirthCertificateMsgService.getDistributedCertiId(id,resTxt,function(data){
				if(data == null){
					$('#unUsed').html('<font color="red" size="2">暂无分配</font>');
				}else{
					var page = Math.ceil(data.length / 35);
					var currentPage = 1;
					var result = "<table id='tableContainer1' class='container' cellpadding='0' cellspacing='0'>" + 
							pagination(currentPage,data);
					result = result + '<tfoot><tr><td colspan="7"><span>共有' + data.length + '条记录&nbsp;&nbsp;共有' + page + '页&nbsp;&nbsp;当前为第'+
						'<span id="curPage1"></span>页&nbsp;&nbsp;</span><span id="firstPage1" class="paging">首页</span>' +
					 	'&nbsp;<span id="prevPage1" class="paging">上一页</span>&nbsp;<span id="nextPage1" class="paging">下一页</span>'+
					 	'&nbsp;<span id="lastPage1" class="paging">尾页</span></td></tr><tr><td colspan="7">'+
					 	'<font size="2" color="red">注：背景颜色为红色的表示该出生证明编号可以使用</font></td></tr></tfoot></table>';
					
					$('#unUsed').html(result);
					$('#curPage1').html(currentPage);
					controlShow1(currentPage,page);
					$('.paging').click(function(){
						var id = $(this).attr('id');
						if(id == 'firstPage1'){
							currentPage = 1;
							tbodyAppendUnused('tableContainer1',currentPage,data);
						}else if(id == 'nextPage1'){
							currentPage = currentPage + 1;
							if(currentPage <= page){
								tbodyAppendUnused('tableContainer1',currentPage,data);
							}else{
								currentPage = currentPage - 1;
							}
						}else if(id == 'prevPage1'){
							currentPage = currentPage - 1;
							if(currentPage >= 1){
								tbodyAppendUnused('tableContainer1',currentPage,data);
							}else{
								currentPage = currentPage + 1;
							}
						}else if(id == 'lastPage1'){
							currentPage = page;
							tbodyAppendUnused('tableContainer1',currentPage,data);
						}
						controlShow1(currentPage,page);
						$('#curPage1').html(currentPage);
					});
					
					$('.selected').each(function(){
						$(this).hover(function(){
							$(this).css('cursor', 'pointer');
						},function(){
							
//						}).click(function(){
//							$('.selectabled').each(function() {
//								if ($(this).hasClass('selected')) {
//									$(this).removeClass('selected');
//								}
//								$(this).css('background-color', '#FFF');
//							});
//							$(this).addClass('selected');
//							$(this).css('background-color', '#CAE2FE');
						}).bind('dblclick',function(){
							var certifiId = $(this).html();
							openWin('/birthCertificateInfo.html','?certifiId=' + certifiId 
									+ '&orgName=' + currentNode.text +'&type=0');
						});
					});
				}
			});
		}
	}
	
	function handleUsed(tab){
		if(currentNode != null){
			Ext.getCmp('save').setDisabled(true);
			Ext.getCmp('modify').setDisabled(false);
			Ext.getCmp('lookup').setDisabled(false);
			Ext.getCmp('destroy').setDisabled(false);
			Ext.getCmp('pigeonhole').setDisabled(false);
			Ext.getCmp('restore').setDisabled(true);
			Ext.getCmp('restorePigeonhole').setDisabled(true);
			var orgId = currentNode.id;
			var resTxt = Ext.getCmp('certifiId').getValue();
			BirthCertificateMsgService.getUsedCertificate(orgId,resTxt,function(data){
				var result = '<table class="certifiTable" id="tableContainer2" cellpadding="0" cellspacing="0"><thead>'+
					'<td style="width:20px">&nbsp;</td><td>出生医学证明编号</td><td>姓名</td><td>母亲姓名</td><td>父亲姓名</td>'+
					'<td>接生机构</td></thead>';
				var currentPage = 1;
				result = result + paginationUsed(currentPage,data);
				var page = Math.ceil(data.length / 10);
				result = result + '<tfoot><tr><td colspan="5"><span>共有' + data.length + '条记录&nbsp;&nbsp;共有' + page + '页&nbsp;&nbsp;当前为第'+
					'<span id="curPage2"></span>页&nbsp;&nbsp;</span><span id="firstPage2" class="paging">首页</span>' +
				 	'&nbsp;<span id="prevPage2" class="paging">上一页</span>&nbsp;<span id="nextPage2" class="paging">下一页</span>'+
				 	'&nbsp;<span id="lastPage2" class="paging">尾页</span></td></tr></tfoot></table>';
				$('#used').html(result);
				$('#curPage2').html(currentPage);
				controlShow2(currentPage,page);
				selectRow();
				checked();
				$('.paging').click(function(){
					var id = $(this).attr('id');
					if(id == 'firstPage2'){
						currentPage = 1;
						tbodyAppend('tableContainer2',currentPage,data);
					}else if(id == 'nextPage2'){
						currentPage = currentPage + 1;
						if(currentPage <= page){
							tbodyAppend('tableContainer2',currentPage,data);
						}else{
							currentPage = currentPage - 1;
						}
					}else if(id == 'prevPage2'){
						currentPage = currentPage - 1;
						if(currentPage >= 1){
							tbodyAppend('tableContainer2',currentPage,data);
						}else{
							currentPage = currentPage + 1;
						}
					}else if(id == 'lastPage2'){
						currentPage = page;
						tbodyAppend('tableContainer2',currentPage,data);
					}
					controlShow2(currentPage,page);
					selectRow();
					checked();
					$('#curPage2').html(currentPage);
				});
			});			
		}
	}
	
	function handleDestroyed(tab){
		if(currentNode != null){
			Ext.getCmp('save').setDisabled(true);
			Ext.getCmp('modify').setDisabled(true);
			Ext.getCmp('lookup').setDisabled(false);
			Ext.getCmp('destroy').setDisabled(true);
			Ext.getCmp('pigeonhole').setDisabled(true);
			Ext.getCmp('restore').setDisabled(false);
			Ext.getCmp('restorePigeonhole').setDisabled(true);
			var orgId = currentNode.id;
			var resTxt = Ext.getCmp('certifiId').getValue();
			BirthCertificateMsgService.getDestroyedCertiId(orgId,resTxt,function(data){
				if(data == null){
					$('#destroyed').html('<font color="red" size="2">暂无作废</font>');
				}else{
					var currentPage = 1;
					var result = '<table class="certifiTable" id="tableContainer3" cellpadding="0" cellspacing="0"><thead>' +
						'<td style="width:20px">&nbsp;</td><td>出生医学证明编号</td><td>姓名</td><td>母亲姓名</td><td>父亲姓名</td>'+
						'<td>接生机构</td></thead>';
					result = result + paginationUsed(currentPage,data);
					var page = Math.ceil(data.length / 10);
					result = result + '<tfoot><tr><td colspan="7"><span>共有' + data.length + '条记录&nbsp;&nbsp;共有' + page + '页&nbsp;&nbsp;当前为第'+
						'<span id="curPage3"></span>页&nbsp;&nbsp;</span><span id="firstPage3" class="paging">首页</span>' +
					 	'&nbsp;<span id="prevPage3" class="paging">上一页</span>&nbsp;<span id="nextPage3" class="paging">下一页</span>'+
					 	'&nbsp;<span id="lastPage3" class="paging">尾页</span></td></tr></tfoot></table>';
					
					$('#destroyed').html(result);
					$('#curPage3').html(currentPage);
					controlShow3(currentPage,page);
					selectRow();
					checked();
					$('.paging').click(function(){
						var id = $(this).attr('id');
						if(id == 'firstPage3'){
							currentPage = 1;
							tbodyAppend('tableContainer3',currentPage,data);
						}else if(id == 'nextPage3'){
							currentPage = currentPage + 1;
							if(currentPage <= page){
								tbodyAppend('tableContainer3',currentPage,data);
							}else{
								currentPage = currentPage - 1;
							}
						}else if(id == 'prevPage3'){
							currentPage = currentPage - 1;
							if(currentPage >= 1){
								tbodyAppend('tableContainer3',currentPage,data);
							}else{
								currentPage = currentPage + 1;
							}
						}else if(id == 'lastPage3'){
							currentPage = page;
							tbodyAppend('tableContainer3',currentPage,data);
						}
						controlShow3(currentPage,page);
						selectRow();
						checked();
						$('#curPage3').html(currentPage);
					});
				}
			});
		}
	}
	
	function handlePigeonholed(tab){
		if(currentNode != null){
			Ext.getCmp('save').setDisabled(true);
			Ext.getCmp('modify').setDisabled(true);
			Ext.getCmp('lookup').setDisabled(false);
			Ext.getCmp('destroy').setDisabled(true);
			Ext.getCmp('pigeonhole').setDisabled(true);
			Ext.getCmp('restore').setDisabled(true);
			Ext.getCmp('restorePigeonhole').setDisabled(false);
			var orgId = currentNode.id;
			var resTxt = Ext.getCmp('certifiId').getValue();
			BirthCertificateMsgService.getPigeonholedCertiId(orgId,resTxt,function(data){
				if(data.length == null){
					$('#pigeonholed').html('<font color="red" size="2">暂无归档</font>');
				}else{
					var currentPage = 1;
					var result = '<table class="certifiTable" id="tableContainer4" cellpadding="0" cellspacing="0"><thead>' +
						'<td style="width:20px">&nbsp;</td><td>出生医学证明编号</td><td>姓名</td><td>母亲姓名</td><td>父亲姓名</td>'+
						'<td>接生机构</td></thead>';
					result = result + paginationUsed(currentPage,data);
					var page = Math.ceil(data.length / 10);
					result = result + '<tfoot><tr><td colspan="7"><span>共有' + data.length + '条记录&nbsp;&nbsp;共有' + page + '页&nbsp;&nbsp;当前为第'+
						'<span id="curPage4"></span>页&nbsp;&nbsp;</span><span id="firstPage4" class="paging">首页</span>' +
					 	'&nbsp;<span id="prevPage4" class="paging">上一页</span>&nbsp;<span id="nextPage4" class="paging">下一页</span>'+
					 	'&nbsp;<span id="lastPage4" class="paging">尾页</span></td></tr></tfoot></table>';
					
					$('#pigeonholed').html(result);
					$('#curPage4').html(currentPage);
					controlShow4(currentPage,page);
					selectRow();
					checked();
					$('.paging').click(function(){
						var id = $(this).attr('id');
						if(id == 'firstPage4'){
							currentPage = 1;
							tbodyAppend('tableContainer4',currentPage,data);
						}else if(id == 'nextPage4'){
							currentPage = currentPage + 1;
							if(currentPage <= page){
								tbodyAppend('tableContainer4',currentPage,data);
							}else{
								currentPage = currentPage - 1;
							}
						}else if(id == 'prevPage4'){
							currentPage = currentPage - 1;
							if(currentPage >= 1){
								tbodyAppend('tableContainer4',currentPage,data);
							}else{
								currentPage = currentPage + 1;
							}
						}else if(id == 'lastPage4'){
							currentPage = page;
							tbodyAppend('tableContainer4',currentPage,data);
						}
						controlShow4(currentPage,page);
						selectRow();
						checked();
						$('#curPage4').html(currentPage);
					});
				}
			});
		}
	}
	
	var runTabPanel = function(){
		var activeTab = Ext.getCmp('tabOrg').getActiveTab();
		var activeTabId = activeTab.id;
		if(activeTabId == 'tabUnused'){
			handleDistributed(activeTab);
		}else if(activeTabId == 'tabUsed'){
			handleUsed(activeTab);
		}else if(activeTabId == 'tabDestroyed'){
			handleDestroyed(activeTab);
		}else if(activeTabId == 'tabPigeonholed'){
			handlePigeonholed(activeTab);
		}
	}
	
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
				xtype : 'textfield',
				fieldLabel : '出生医学证明编号',
				name : 'certifiId',
				id : 'certifiId',
				listeners :{
	                specialKey :function(field,e){
	                    if (e.getKey() == Ext.EventObject.ENTER){
	                    	if(currentNode != null){
	    						runTabPanel();
	    					}else{
	    						Ext.Msg.alert('提示','请选择组织机构');
	    					}
	                    }
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
				name : 'research',
				id : 'research',
				text : '查询',
				width : 50,
				handler : function(){
					if(currentNode != null){
						runTabPanel();
					}else{
						Ext.Msg.alert('提示','请选择组织机构');
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
				name : 'save',
				text : '使用',
				width : 50,
				id : 'save',
				handler : function(){
					if(currentNode != null){
						var flag = false;
						$('.selected').each(function(){
							flag = true;
						});
						if(flag){
							var certifiId = $('.selected').html();
							openWin('/birthCertificateInfo.html','?certifiId=' + certifiId + '&orgName=' + currentNode.text + '&type=0');
						}else{
							showMsg('请选择出生证明编号');
						}
						
					}else{
						showMsg('请选择组织机构');
					}
				}
			}]
		},{
			xtype : 'panel',
			layout : 'form',
			x : 360,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'modify',
				text : '修改',
				width : 50,
				id : 'modify',
				disabled : true,
				handler : function(){
					services(1);
				}
			}]
		},{
			xtype : 'panel',
			layout : 'form',
			x : 420,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'lookup',
				text : '查看',
				width : 50,
				id : 'lookup',
				disabled : true,
				handler : function(){
					if(currentNode != null){
						var certifiId = getCertifiId();
						if(certifiId != ''){
							var activeTabId = Ext.getCmp('tabOrg').getActiveTab().id;
							var type;
							if(activeTabId == 'tabDestroyed'){
								type = 5;
							}else{
								type = 2;
							}
							openWin('/birthCertificateInfo.html','?certifiId=' + certifiId + '&orgName=' + currentNode.text + '&type=' + type);
						}else{
							showMsg('请选择出生证明信息');
						}
					}else{
						showMsg('请选择组织机构');
					}
				}
			}]
		},{
			xtype : 'panel',
			layout : 'form',
			x : 480,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'destroy',
				text : '作废',
				width : 50,
				id : 'destroy',
				disabled : true,
				handler : function(){
					services(3);
				}
			}]
		},{
			xtype : 'panel',
			layout : 'form',
			x : 540,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'pigeonhole',
				text : '归档',
				width : 50,
				id : 'pigeonhole',
				disabled : true,
				handler : function(){
					if(currentNode != null){
						var certifiId = getCertifiId();
						if(certifiId != ''){
							BirthCertificateMsgService.setPigeonhole(certifiId,0,function(data){
								if(data){
									showMsg('归档成功');
									runTabPanel();
								}
							});
						}else{
							showMsg('请选择出生证明信息');
						}
					}else{
						showMsg('请选择组织机构');
					}
				}
			}]
		},{
			xtype : 'panel',
			layout : 'form',
			x : 600,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'restore',
				text : '作废还原',
				width : 80,
				id : 'restore',
				disabled : true,
				handler : function(){
					services(4);
				}
			}]
		},{
			xtype : 'panel',
			layout : 'form',
			x : 690,
			y : 0,
			items : [{
				xtype : 'button',
				name : 'restore',
				text : '归档还原',
				width : 80,
				id : 'restorePigeonhole',
				disabled : true,
				handler : function(){
					if(currentNode != null){
						var certifiId = getCertifiId();
						if(certifiId != ''){
							BirthCertificateMsgService.setPigeonhole(certifiId,1,function(data){
								if(data){
									showMsg('归档还原成功');
									runTabPanel();
								}
							});
						}else{
							showMsg('请选择出生证明信息');
						}
					}else{
						showMsg('请选择组织机构');
					}
				}
			}]
		}]
	});
	
	
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
		        	expanded : true ,
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
		            title: '未使用',
		            html: '<div id="unUsed"></div>',
		            listeners: {activate: handleDistributed},
		            id : 'tabUnused',
		            name : 'tabUnused'
		        },{
		            title: '已使用',
		            html: '<div id="used"></div>',
		            listeners: {activate: handleUsed},
		            id : 'tabUsed',
		            name : 'tabUsed'
		        },{
		            title: '已作废',
		            html: '<div id="destroyed"></div>',
		            listeners: {activate: handleDestroyed},
		            id : 'tabDestroyed',
		            name : 'tabDestroyed'
		        },{
		            title: '已归档',
		            html: '<div id="pigeonholed"></div>',
		            listeners: {activate: handlePigeonholed},
		            id : 'tabPigeonholed',
		            name : 'tabPigeonholed'
		        }]
		    }]
		});
		
		Ext.getCmp('orgTree').on({
			click : {
				stopEvent : true,
				fn : function(n,e){
					currentNode = n;
					runTabPanel();
				}
			}
		});
	});
});