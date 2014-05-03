function addZero(val){
	if(val < 10){
		return '0' + val;
	}
	return val;
}

function getBasicInfo(){
	var fileNo = $('#fileNo span').html();
	FileNumSearch.getItem(fileNo,function(data){
		$('.name').html(data[0][1]);
		$('.age').html(data[0][4] + '岁');
	});
}

(function(){
	window.initPrintPage = {
		init : init	
	}
	
	function init(){
		var json = UrlParse.parse();
		if(json.id != undefined){			
			var id = unescape(json.id);
			var send = {"id" : id};
			var $printCss = '<style>.printTable{width:17cm;border-bottom : 1px solid #000;'+
					'border-right : 1px solid #000;}  .printTable tbody td{border-left: 1px solid #000;'+
					'border-top: 1px solid #000;height:25px;line-height:25px;} .headerPrint{width:2.5cm;' +
					'padding-left:5px;}'+
					'.contentPrint{width:3cm;padding-left:3px;}</style>';
			$('.firstVisitPrint').click(function(){
				getBasicInfo();
				FirstVistBeforeBornService.getPrintInfo(send,function(data){
					Ext.Msg.show({
						title:'提示',
						msg: '请用16K的打印纸进行打印！',
						buttons: Ext.Msg.OK,
						animEl: 'elId',
						icon: Ext.MessageBox.INFO,
						width :300,
						fn : function(e){
							if(e == 'ok'){
								for(var prop in data){
									var propVal = data[prop];
									if(propVal instanceof Date){
										$('.' + prop).html(propVal.getFullYear() + '-' + addZero(propVal.getMonth() + 1) + '-' + addZero(propVal.getDate())); 
									}else{
										if(propVal == '' && prop == 'highRiskRemark')
											propVal = '无';
										$('.' + prop).html(propVal);
									}
								}
								var $html = $printCss + '<body>' + $('.printContainer').html() + '</body>';
								printObj.womanExamPrintProtect($html,'第1次产前随访服务记录表');	
							}
						}
					});
				});
			});
			
			$('.firstVisitPrint_new').click(function(){
			    getBasicInfo();
                FirstVistBeforeBornService.getPrintInfo_new(send,function(data){
                    if(data){
                        var printpanel = Ext.extend(Ext.Panel, {
                            closable : true,
                            layout : 'fit',
                            border: false,
                            buttonAlign :"center",
                            initComponent : function() {
                                this.build();
                                printpanel.superclass.initComponent.call(this);
                            },
                            build : function() {
                                this.items = [ this.createPanel() ];
                            },
                            load : function(isReset) {
                                this.doLayout(true);
                            },
                            createPanel : function() {
                                var panel = new Ext.Panel({
                                    autoScroll : false,
                                    border:false,
                                    buttons  : [ 
                                        {  xtype:'button',
                                            text:"打印",
                                            handler : function (){
                                                Ext.Msg.show({
                                                    title:'提示',
                                                    msg: '请用放入保健手册【首次产前检查记录】,按下【确定】开始打印！',
                                                    buttons: Ext.Msg.OK,
                                                    animEl: 'elId',
                                                    icon: Ext.MessageBox.INFO,
                                                    width :500,
                                                    fn : function(e){
                                                        if(e == 'ok'){
                                                            var pagenum;
                                                            if(Ext.getCmp("print_radio_rownum1").checked){
                                                                pagenum = 1;
                                                            }else{
                                                                pagenum = 2;
                                                            }
                                                            if(pagenum ==1){
                                                                printObj.printPreview(getPrintCfg03(data),-2);
                                                            }else if(pagenum ==2){
                                                                printObj.printPreview(getPrintCfg04(data),-2);
                                                            }
                                                        }
                                                   }
                                            });        
                                            }.createDelegate(this)
                                        }
                                     ],
                                    items : [{
                                        xtype:'label',
                                        text:'选择页数'
                                    },{
                                        xtype:'radio',
                                        id:"print_radio_rownum1",
                                        name:'print_radio_rownum',
                                        boxLabel:'第一页',
                                        checked:true
                                    },{
                                        xtype:'radio',
                                        id:"print_radio_rownum2",
                                        name:'print_radio_rownum',
                                        boxLabel:'第二页'
                                    }
                                   ]
                                });
                                
                                return panel;
                            }
                        });
                        
                        var ppanel = new printpanel();
                        var win = new Ext.Window(
                            {width:180,height:260,title:"打印",layout : 'fit',items:[ppanel]}
                        );
                        win.show();
                    }else{
                        top.Ext.Msg.alert("错误",'该户没有第一次产前随防记录,无法打印！');
                    }
                }.createDelegate(this))
            });
			
			$('.visitBeforeBornPrint').click(function(){
				getBasicInfo();
				VisitBeforeBornService.getPrintInfo(send,function(data){
					if(data != null){
						Ext.Msg.show({
							title:'提示',
							msg: '请用16K的打印纸进行打印！',
							buttons: Ext.Msg.OK,
							animEl: 'elId',
							icon: Ext.MessageBox.INFO,
							width :300,
							fn : function(e){
								if(e == 'ok'){
									for(var prop in data){
										var propVal = data[prop];
										if(propVal instanceof Date){
											$('.' + prop).html(propVal.getFullYear() + '-' + addZero(propVal.getMonth() + 1) + '-' + addZero(propVal.getDate())); 
										}else{
											if(propVal == '' && prop == 'highRiskRemark')
												propVal = '无';
											$('.' + prop).html(propVal);
										}
									}
									var $html = $printCss + '<body>' + $('.printContainer').html() + '</body>';
									printObj.womanExamPrintProtect($html,'第2至5次产前随访服务记录表');	
								}
							}
						});
					}else{
						Ext.Msg.show({
							title:'提示',
							msg: '您打印的体检记录已经超过5次的报销范围，不能再进行打印！',
							buttons: Ext.Msg.OK,
							animEl: 'elId',
							icon: Ext.MessageBox.ERROR,
							width :350
						});
					}
				});
			});
			
			$('.visitBeforeBornPrint_new').click(function(){
                getBasicInfo();
                VisitBeforeBornService.getPrintInfo_new(send,function(data){
                    if(data){
                        var printpanel = Ext.extend(Ext.Panel, {
                            closable : true,
                            layout : 'fit',
                            border: false,
                            initComponent : function() {
                                this.build();
                                printpanel.superclass.initComponent.call(this);
                            },
                            build : function() {
                                this.items = [ this.createPanel() ];
                            },
                            load : function(isReset) {
                                this.doLayout(true);
                            },
                            createPanel : function() {
                                var panel = new Ext.Panel({
                                    autoScroll : false,
                                    width:400,
                                    border:false,
                                    layout : 'table',
                                    layoutConfig: {
                                        columns: 2
                                    },
                                    buttonAlign :"center",
                                    buttons  : [ 
                                        {  xtype:'button',
                                            text:"打印",
                                            handler : function (){
                                                Ext.Msg.show({
                                                    title:'提示',
                                                    msg: '请用放入保健手册【产前检查记录表】,按下【确定】开始打印！',
                                                    buttons: Ext.Msg.OK,
                                                    animEl: 'elId',
                                                    icon: Ext.MessageBox.INFO,
                                                    width :500,
                                                    fn : function(e){
                                                        if(e == 'ok'){
                                                            var pagenum;
                                                            var item = $("input[name='print_radio_rownum'][checked]").val();
                                                            console.log(item);
                                                            var numbers = item.split(",");
                                                            pagenum = parseInt(numbers[0]);
                                                            rownum = parseInt(numbers[1]);
                                                            printObj.printPreview(getPrintCfg06(data,pagenum,rownum),-2);
                                                        }
                                                   }
                                            });        
                                            }.createDelegate(this)
                                        }
                                     ],
                                    items : [{
                                        xtype:'label',
                                        text:'第一页' ,
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'label',
                                        text:'第二页',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        id:"print_radio_rownum1-1",
                                        inputValue:"1,1",
                                        name:'print_radio_rownum',
                                        boxLabel:'第一行',
                                        style:'float:left',
                                        checked:true,
                                        width:180
                                    },{
                                        xtype:'radio',
                                        id:"print_radio_rownum2-1",
                                        inputValue:"2,1",
                                        name:'print_radio_rownum',
                                        boxLabel:'第一行',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        id:"print_radio_rownum1-2",
                                        inputValue:"1,2",
                                        name:'print_radio_rownum',
                                        boxLabel:'第二行',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        id:"print_radio_rownum2-2",
                                        inputValue:"2,2",
                                        name:'print_radio_rownum',
                                        boxLabel:'第二行',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        id:"print_radio_rownum1-3",
                                        inputValue:"1,3",
                                        name:'print_radio_rownum',
                                        boxLabel:'第三行',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        id:"print_radio_rownum2-3",
                                        inputValue:"2,3",
                                        name:'print_radio_rownum',
                                        boxLabel:'第三行',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        id:"print_radio_rownum1-4",
                                        inputValue:"1,4",
                                        name:'print_radio_rownum',
                                        boxLabel:'第四行',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        id:"print_radio_rownum2-4",
                                        inputValue:"2,4",
                                        name:'print_radio_rownum',
                                        boxLabel:'第四行',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        id:"print_radio_rownum1-5",
                                        inputValue:"1,5",
                                        name:'print_radio_rownum',
                                        boxLabel:'第五行',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        id:"print_radio_rownum2-5",
                                        inputValue:"2,5",
                                        name:'print_radio_rownum',
                                        boxLabel:'第五行',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        colspan:2,
                                        id:"print_radio_rownum1-6",
                                        inputValue:"1,6",
                                        name:'print_radio_rownum',
                                        boxLabel:'第六行',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        colspan:2,
                                        id:"print_radio_rownum1-7",
                                        inputValue:"1,7",
                                        name:'print_radio_rownum',
                                        boxLabel:'第七行',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        colspan:2,
                                        id:"print_radio_rownum1-8",
                                        inputValue:"1,8",
                                        name:'print_radio_rownum',
                                        boxLabel:'第八行',
                                        style:'float:left',
                                        width:180
                                    }
                                   ]
                                });
                                return panel;
                            }
                        });
                        
                        var ppanel = new printpanel();
                        var win = new Ext.Window(
                            {width:400,height:260,title:"打印",layout : 'fit',items:[ppanel]}
                        );
                        win.show();
                    }else{
                        top.Ext.Msg.alert("错误", '该户没有产前检查记录,无法打印！');
                    }
                });
            });
			
			
			$('.visitAfterBorn').click(function(){
				getBasicInfo();
				var btnVal = $(this).val();
				var title = '';
				if(btnVal== 0){
					title = '产后访视记录表';
				}else if(btnVal == 1){
					title = '产后42天访视记录表';
				}
				VisitAfterBornService.get(send,function(data){
					if(data != null){
						Ext.Msg.show({
							title:'提示',
							msg: '请用16K的打印纸进行打印！',
							buttons: Ext.Msg.OK,
							animEl: 'elId',
							icon: Ext.MessageBox.INFO,
							width :300,
							fn : function(e){
								if(e == 'ok'){
									for(var prop in data){
										var propVal = data[prop];
//										console.log(prop + '---' + propVal);
										if(propVal instanceof Date){
											$('.' + prop).html(propVal.getFullYear() + '-' + addZero(propVal.getMonth() + 1) + '-' + addZero(propVal.getDate())); 
										}else{
											if(propVal == '' && prop == 'highRiskRemark')
												propVal = '无';
											$('.' + prop).html(propVal);
										}
									}
									var $html = $printCss + '<body>' + $('.printContainer').html() + '</body>';
									printObj.womanExamPrintProtect($html,title);	
								}
							}
						});
					}
				});
			});
			
			$('.visitAfterBorn_new').click(function(){
                getBasicInfo();
                VisitAfterBornService.getPrintInfo_new(send,function(data){
                    if(data){
                        var printpanel = Ext.extend(Ext.Panel, {
                            closable : true,
                            layout : 'fit',
                            border: false,
                            initComponent : function() {
                                this.build();
                                printpanel.superclass.initComponent.call(this);
                            },
                            build : function() {
                                this.items = [ this.createPanel() ];
                            },
                            load : function(isReset) {
                                this.doLayout(true);
                            },
                            createPanel : function() {
                                var panel = new Ext.Panel({
                                    autoScroll : false,
                                    width:200,
                                    border:false,
                                    buttonAlign :"center",
                                    buttons  : [ 
                                        {  xtype:'button',
                                            text:"打印",
                                            handler : function (){
                                                Ext.Msg.show({
                                                    title:'提示',
                                                    msg: '请用放入保健手册【产后访视记录表】,按下【确定】开始打印！',
                                                    buttons: Ext.Msg.OK,
                                                    animEl: 'elId',
                                                    icon: Ext.MessageBox.INFO,
                                                    width :500,
                                                    fn : function(e){
                                                        if(e == 'ok'){
                                                            var pagenum;
                                                            var item = $("input[name='print_radio_rownum'][checked]").val();
                                                            console.log(item);
                                                            var numbers = item.split(",");
                                                            pagenum = parseInt(numbers[0]);
                                                            rownum = parseInt(numbers[1]);
                                                            printObj.printPreview(getPrintCfg10(data,rownum),-2);
                                                        }
                                                   }
                                            });        
                                            }.createDelegate(this)
                                        }
                                     ],
                                    items : [{
                                        xtype:'label',
                                        text:'第一页' ,
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        id:"print_radio_rownum1-1",
                                        inputValue:"1,1",
                                        name:'print_radio_rownum',
                                        boxLabel:'第一行',
                                        style:'float:left',
                                        checked:true,
                                        width:180
                                    },{
                                        xtype:'radio',
                                        id:"print_radio_rownum1-2",
                                        inputValue:"1,2",
                                        name:'print_radio_rownum',
                                        boxLabel:'第二行',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        id:"print_radio_rownum1-3",
                                        inputValue:"1,3",
                                        name:'print_radio_rownum',
                                        boxLabel:'第三行',
                                        style:'float:left',
                                        width:180
                                    }
                                   ]
                                });
                                return panel;
                            }
                        });
                        
                        var ppanel = new printpanel();
                        var win = new Ext.Window(
                            {width:200,height:260,title:"打印",layout : 'fit',items:[ppanel]}
                        );
                        win.show();
                    }else{
                        top.Ext.Msg.alert("错误", '该户没有产后访视记录记录,无法打印！');
                    }
                });
            });
            
            $('.visitAfterBorn42_new').click(function(){
                getBasicInfo();
                console.log(send)
                VisitAfterBornService.getPrintInfo_new(send,function(data){
                    if(data){
                        Ext.Msg.show({
                            title:'提示',
                            msg: '请用放入保健手册【产后42天检查记录表】,按下【确定】开始打印！',
                            buttons: Ext.Msg.OK,
                            animEl: 'elId',
                            icon: Ext.MessageBox.INFO,
                            width :500,
                            fn : function(e){
                                if(e == 'ok'){
                                    printObj.printPreview(getPrintCfg11(data),-2);
                                }
                            }
                        });
                    }else{
                        top.Ext.Msg.alert("错误", '该户没有产后42天检查记录,无法打印！');
                    }
                });
            });
            $('.birthChildRecord_new').click(function(){
                getBasicInfo();
                ChildBirthService.getPrintInfo_new(send,function(data){
                    if(data){
                        Ext.Msg.show({
                            title:'提示',
                            msg: '请用放入保健手册【分娩记录】,按下【确定】开始打印！',
                            buttons: Ext.Msg.OK,
                            animEl: 'elId',
                            icon: Ext.MessageBox.INFO,
                            width :500,
                            fn : function(e){
                                if(e == 'ok'){
                                    printObj.printPreview(getPrintCfg08(data),-2);
                                }
                            }
                        });
                    }else{
                        top.Ext.Msg.alert("错误", '该户没有分娩记录,无法打印！');
                    }
                });
            });
            $('.womanBirthBuild_cover_new').click(function(){
                getBasicInfo();
                healthfileMaternalService.getPrintInfo_new(send,function(data){
                    if(data){
                        Ext.Msg.show({
                            title:'提示',
                            msg: '请用放入保健手册【封面】,按下【确定】开始打印！',
                            buttons: Ext.Msg.OK,
                            animEl: 'elId',
                            icon: Ext.MessageBox.INFO,
                            width :500,
                            fn : function(e){
                                if(e == 'ok'){
                                    printObj.printPreview(getPrintCfg01(data),-3);
                                }
                            }
                        });
                    }else{
                        top.Ext.Msg.alert("错误", '该户没有孕产妇保健手册,无法打印！');
                    }
                });
            });
            
            $('.womanBirthBuild_file_new').click(function(){
                getBasicInfo();
                healthfileMaternalService.getPrintInfo_new(send,function(data){
                    if(data){
                        Ext.Msg.show({
                            title:'提示',
                            msg: '请用放入保健手册【孕妇基本档案】,按下【确定】开始打印！',
                            buttons: Ext.Msg.OK,
                            animEl: 'elId',
                            icon: Ext.MessageBox.INFO,
                            width :500,
                            fn : function(e){
                                if(e == 'ok'){
                                    printObj.printPreview(getPrintCfg02(data),-2);
                                }
                            }
                        });
                    }else{
                        top.Ext.Msg.alert("错误", '该户没有孕妇基本档案记录,无法打印！');
                    }
                });
            });
            
		}
	}
})();