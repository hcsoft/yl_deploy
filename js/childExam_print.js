function addZero(val){
	if(val < 10){
		return '0' + val;
	}
	return val;
}
var fileNo = '';
function getBasicInfo(){
	fileNo = $('#fileNo span').html();
	FileNumSearch.getItem(fileNo,function(data){
//		console.log(data);
		$('.name').html(data[0][1]);
		$('.sex').html(data[0][2]);
	});
}

function dealData(data,beforeSkull01,beforeSkull02){
	var $printCss = '<style>.printTable{width:17cm;border: 1px solid #000;} '+
		'.printTable td{'+
		'border-top: 1px solid #000;height:25px;line-height:25px;font-size:13px;}'+
		'.printHeaderSpan{color:#10A2D7;}' +
		'.printTable tbody td table td{border:0px;padding-right:20px;}</style>';
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
					var visitDate = '';
//					console.log(data);
					for(var prop in data){
						var propVal = data[prop];
						if(propVal instanceof Date){
							var d = propVal.getFullYear() + '-' + addZero(propVal.getMonth() + 1) + '-' + addZero(propVal.getDate());
							if(prop == 'visitDate'){
								visitDate = d;
							}else{
								$('.' + prop).html(d); 
							}
						}else if(prop == 'onlinePhoto'){
							if(propVal == null || propVal == ''){
								$('.' + prop).hide();
							}else{
								var imgurl = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/' + propVal;
								$('.' + prop).attr('src',imgurl)
							}
						}else if(prop == 'visitDoctor'){
							$('.' + prop).html(propVal);
						}else{
							if(propVal == '' && prop == 'highRiskRemark')
								propVal = '无';
							else if((propVal == null || propVal == '') && $('.' + prop + 'formatnum').length > 0)
								propVal = '0';
							var $title = $('.' + prop).attr('title');
							if($title != undefined && $title != 'undefined' && $title != null && $title != ''){
								var $prev = $('.' + prop).prev('span');
								var preval = $prev.html();
//								console.log(prop + '---' + $title + '---' + preval + '---' + propVal);
//								console.log(prop + ':' + (preval == $title));
								if(propVal != null && propVal != '' && (preval.indexOf($title) > 0)){
									$('.' + prop).html(',' + propVal);
								}
							}else{
								if(propVal == null || propVal == '')
									propVal = '未测';
								$('.' + prop).html(propVal);
							}
						}
					}
					var $html = $printCss + '<body>' + $('.printContainer').html() + '</body>';
					printObj.childExamPrintProtect($html,'儿童体检',visitDate,fileNo);	
				}
			}
		});
	}
}

(function(){
	initPrintPage = {
		init : init	
	}
	
	function init(){
		var json = UrlParse.parse();
		if(json.id != undefined){			
			var id = unescape(json.id);
			var send = {"id" : id};
			$('.childBabyVisit').click(function(){
				getBasicInfo();
				BabyVisitService.getPrintInfo(send,function(data){
					dealData(data,'exam09','exam10');
				});
			});
			$('.childBabyVisit_new').click(function(){
                getBasicInfo();
                BabyVisitService.getPrintInfo_new(send,function(data){
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
                                                    msg: '请用放入保健手册【新生儿访视记录表】,按下【确定】开始打印！',
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
                                                            if(pagenum == 1){
                                                                printObj.printPreview(getChildPrintCfg03(data,rownum),-2);
                                                            }else if(pagenum == 2){
                                                                printObj.printPreview(getChildPrintCfg04(data,rownum),-2);
                                                            }
                                                            
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
                                        boxLabel:'第一列',
                                        style:'float:left',
                                        checked:true,
                                        width:180
                                    },{
                                        xtype:'radio',
                                        id:"print_radio_rownum2-1",
                                        inputValue:"2,1",
                                        name:'print_radio_rownum',
                                        boxLabel:'第一列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        id:"print_radio_rownum1-2",
                                        inputValue:"1,2",
                                        name:'print_radio_rownum',
                                        boxLabel:'第二列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        id:"print_radio_rownum2-2",
                                        inputValue:"2,2",
                                        name:'print_radio_rownum',
                                        boxLabel:'第二列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        id:"print_radio_rownum1-3",
                                        inputValue:"1,3",
                                        name:'print_radio_rownum',
                                        boxLabel:'第三列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        id:"print_radio_rownum2-3",
                                        inputValue:"2,3",
                                        name:'print_radio_rownum',
                                        boxLabel:'第三列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        id:"print_radio_rownum1-4",
                                        inputValue:"1,4",
                                        name:'print_radio_rownum',
                                        boxLabel:'第四列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        id:"print_radio_rownum2-4",
                                        inputValue:"2,4",
                                        name:'print_radio_rownum',
                                        boxLabel:'第四列',
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
                        top.Ext.Msg.alert("错误", '该户没有新生儿访视记录,无法打印！');
                    }
                });
            });
			
			
			
			$('.childvisit1').click(function(){
				getBasicInfo();
				ChildrenMediExamService.get(send,function(data){
					dealData(data,'exam03','exam04');
				});
			});
			
			$('.childvisit1_new').click(function(){
                getBasicInfo();
                ChildrenMediExamService.getPrintInfo_new(send,function(data){
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
                                                    msg: '请用放入保健手册【1岁以内儿童儿童健康检查记录表】,按下【确定】开始打印！',
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
                                                            if(pagenum == 1){
                                                                printObj.printPreview(getChildPrintCfg05(data,rownum),-2);
                                                            }else if(pagenum == 2){
                                                                printObj.printPreview(getChildPrintCfg06(data,rownum),-2);
                                                            }
                                                            
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
                                        inputValue:"1,1",
                                        name:'print_radio_rownum',
                                        boxLabel:'第一列',
                                        style:'float:left',
                                        checked:true,
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"2,1",
                                        name:'print_radio_rownum',
                                        boxLabel:'第一列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"1,2",
                                        name:'print_radio_rownum',
                                        boxLabel:'第二列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"2,2",
                                        name:'print_radio_rownum',
                                        boxLabel:'第二列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"1,3",
                                        name:'print_radio_rownum',
                                        boxLabel:'第三列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"2,3",
                                        name:'print_radio_rownum',
                                        boxLabel:'第三列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"1,4",
                                        name:'print_radio_rownum',
                                        boxLabel:'第四列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"2,4",
                                        name:'print_radio_rownum',
                                        boxLabel:'第四列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"1,5",
                                        name:'print_radio_rownum',
                                        boxLabel:'第五列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"2,5",
                                        name:'print_radio_rownum',
                                        boxLabel:'第五列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"1,6",
                                        name:'print_radio_rownum',
                                        boxLabel:'第六列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"2,6",
                                        name:'print_radio_rownum',
                                        boxLabel:'第六列',
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
                        top.Ext.Msg.alert("错误", '该户没有1岁以内儿童体检记录,无法打印！');
                    }
                });
            });
            
            $('.childvisit2_new').click(function(){
                getBasicInfo();
                ChildrenMediExamService.getPrintInfo_new(send,function(data){
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
                                                    msg: '请用放入保健手册【1-2岁儿童儿童健康检查记录表】,按下【确定】开始打印！',
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
                                                            if(pagenum == 1){
                                                                printObj.printPreview(getChildPrintCfg08(data,rownum),-2);
                                                            }else if(pagenum == 2){
                                                                printObj.printPreview(getChildPrintCfg10(data,rownum),-2);
                                                            }
                                                            
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
                                        inputValue:"1,1",
                                        name:'print_radio_rownum',
                                        boxLabel:'第一列',
                                        style:'float:left',
                                        checked:true,
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"2,1",
                                        name:'print_radio_rownum',
                                        boxLabel:'第一列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"1,2",
                                        name:'print_radio_rownum',
                                        boxLabel:'第二列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"2,2",
                                        name:'print_radio_rownum',
                                        boxLabel:'第二列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"1,3",
                                        name:'print_radio_rownum',
                                        boxLabel:'第三列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"2,3",
                                        name:'print_radio_rownum',
                                        boxLabel:'第三列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"1,4",
                                        name:'print_radio_rownum',
                                        boxLabel:'第四列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"2,4",
                                        name:'print_radio_rownum',
                                        boxLabel:'第四列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"1,5",
                                        name:'print_radio_rownum',
                                        boxLabel:'第五列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"2,5",
                                        name:'print_radio_rownum',
                                        boxLabel:'第五列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"1,6",
                                        name:'print_radio_rownum',
                                        boxLabel:'第六列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"2,6",
                                        name:'print_radio_rownum',
                                        boxLabel:'第六列',
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
                        top.Ext.Msg.alert("错误", '该户没有1-2岁以内儿童体检记录,无法打印！');
                    }
                });
            });
			
			$('.childvisit36').click(function(){
				getBasicInfo();
				ChildrenMediExam36Service.get(send,function(data){
					console.log(data);
					dealData(data,'beforeSkull01','beforeSkull02');
				});
			});
			$('.childvisit36_new').click(function(){
                getBasicInfo();
                ChildrenMediExam36Service.getPrintInfo_new(send,function(data){
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
                                                    msg: '请用放入保健手册【3-6岁儿童儿童健康检查记录表】,按下【确定】开始打印！',
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
                                                            printObj.printPreview(getChildPrintCfg12(data,rownum),-2);
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
                                        inputValue:"1,1",
                                        name:'print_radio_rownum',
                                        boxLabel:'第一列',
                                        style:'float:left',
                                        checked:true,
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"1,2",
                                        name:'print_radio_rownum',
                                        boxLabel:'第二列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"1,3",
                                        name:'print_radio_rownum',
                                        boxLabel:'第三列',
                                        style:'float:left',
                                        width:180
                                    },{
                                        xtype:'radio',
                                        inputValue:"1,4",
                                        name:'print_radio_rownum',
                                        boxLabel:'第四列',
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
                        top.Ext.Msg.alert("错误", '该户没有3-6岁儿童体检记录,无法打印！');
                    }
                });
            });
			
			//保健册封面打印
			$('.child_build_cover').click(function(){
                getBasicInfo();
                HealthFileChildrenService.getPrintInfo_new(send,function(data){
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
                                    console.log(data)
                                    printObj.printPreview(getChildPrintCfg01(data),-3);
                                }
                            }
                        });
                    }else{
                        top.Ext.Msg.alert("错误", '该户没有儿童保健手册记录,无法打印！');
                    }
                });
            });
            
            //保健册基本档案打印
            $('.child_build_file').click(function(){
                getBasicInfo();
                HealthFileChildrenService.getPrintInfo_new(send,function(data){
                    if(data){
                        Ext.Msg.show({
                            title:'提示',
                            msg: '请用放入保健手册【儿童基本档案】,按下【确定】开始打印！',
                            buttons: Ext.Msg.OK,
                            animEl: 'elId',
                            icon: Ext.MessageBox.INFO,
                            width :500,
                            fn : function(e){
                                if(e == 'ok'){
                                    printObj.printPreview(getChildPrintCfg02(data),-2);
                                }
                            }
                        });
                    }else{
                        top.Ext.Msg.alert("错误", '该户没有儿童保健手册记录,无法打印！');
                    }
                });
            });
		}
	}
})();