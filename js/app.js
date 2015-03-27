//todo remove these global dependencies
//window.meta = {};
function trim(x) {
	if(x && x.replace){
		return x.replace(/^\s+|\s+$/gm,'');
	}else{
		return x;
	}
}
/** 增加dwr统一的异常处理**/
function dwrExceptionHandler(errorString, error){
	if (error) {
		if(error.javaClassName === "cn.net.tongfang.web.util.TimeoutException" ){
			if(!window.errorShowing){
				var exceptionwin = new Ext.Window({
					title:'重新登录',
					id:'relogin_exceptionwin',
					width:420,
					height:170,
					layout:'fit',
					modal :true,
					listeners:{
						beforeclose:function ( panel){
							window.errorShowing = false;
						},
						afterlayout:function (container,layout){
							window.errorShowing = true;
						}
					},
					items:[{
					       xtype:'form',
					       id:'relogin_form',
					       url:'/j_spring_security_check',
					       width:320,
					       bodyStyle:'font-size: 10px !important;',
					       style:'font-size: 10px !important;',
					       height:150,
					       layout:'table',
					       monitorValid:true,
					        buttonAlign:'center',
							layoutConfig: {
						        columns: 2
						    },
							buttons:[{
								style:'font:normal 12px  宋体 !important;',
								bodyStyle:'font-size: 10px !important;',
								text:'重新登录',
								id:'bt_submit',
								formBind: true,
								handler:function(){
									Ext.getCmp("relogin_form").getForm().submit({
										method:'POST',
										url:'/j_spring_security_check',
										success:function(){
											Ext.getCmp("relogin_message").setText("登录成功!");
											Ext.getCmp("relogin_exceptionwin").close();
											window.saving = false;
//											Ext.Msg.show({
//											   title:'登录成功!',
//											   msg: '登录成功!点击【确定】返回操作界面!',
//											   buttons: Ext.Msg.OK,
//											   fn: function(btn, text){
//												    if (btn == 'ok'){
//												    	Ext.getCmp("relogin_exceptionwin").close();
////												    	if(!window.saving){
////															sendMessage('quit');
////														}
//												    }
//												    window.saving = false;
//												},
//											   animEl: 'elId'
//											});
										},
										failure:function(form, action){
											Ext.Msg.alert('登录失败!',"登录失败!用户名或密码错误!");
											Ext.getCmp("relogin_message").setText("登录失败!用户名或密码错误");
										}
									});
								}
							}],
							buttonAlign:'center',
							items:[
								{
									xtype:'label',
									text : '您的登录已经超时，请输入用户名和密码重新登录！',
									style :'padding-left:5px;padding-top:0px;color:red;font:normal 12px  宋体 !important;',
									bodyStyle:'font-size: 10px !important;',
									id : 'relogin_message',
									columnWidth: 1 ,
									colspan: 2,
									height:25
								},
								{
									xtype:'label',
									html : '用&nbsp;户&nbsp;名：',
									style :'padding-left:5px;margin:5px 0px 0px 0px;font:normal 12px 宋体 !important;',
									bodyStyle:'font-size: 10px !important;',
									layoutConfig:{
			                            animate:true
			                        },
									width:50,
									height:25
								},
								{
									xtype:'textfield',
									fieldLabel : '用户名',
									id : 'j_username',
									style :'text-indent:5px;margin:5px 0px 0px 0px;width:90%;font:normal 12px  宋体 !important;',
									bodyStyle:'font-size: 10px !important;',
									height:25,
									allowBlank:false,
	                                listeners:{
	                                    render:function(){
	                                        $("#j_username").bind("keypress", function(e,el){
	                                            if(e.charCode ===Ext.EventObject.ENTER){
	                                                $("#j_password").focus();
	                                            }
	                                        });
	                                    }
	                                }
								},
								{
									xtype:'label',
									html:'密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：',
									style :'padding-left:5px;margin:5px 0px 0px 0px;font:normal 12px  宋体 !important;',
									bodyStyle:'font-size: 10px !important;',
									height:25
								},{
									xtype:'textfield',
									//width:100,
									style :'text-indent:5px;margin:5px 0px 0px 0px;width:90%;font:normal 12px  宋体 !important;',
									bodyStyle:'font-size: 10px !important;',
									fieldLabel : '密码',
									inputType : 'password',
									id : 'j_password',
									height:25,
									allowBlank:false,
	                                listeners:{
	                                    render:function(){
	                                        $("#j_password").bind("keypress", function(e,el){
	                                            if(e.charCode ===Ext.EventObject.ENTER){
	                                                $("#bt_submit").click();
	                                            }
	                                        });
	                                    }
	                                }
								}
								,{
									xtype:'hidden',
									id : 'spring-security-redirect',
									value :'/js/auth/ajaxlogin_success.js',
									columnWidth: 1  ,
									height:25,
									colspan: 2,
									allowBlank:false
								},
								{
									xtype:'hidden',
									id : 'authentication-failure-url',
									value :'/js/auth/ajaxlogin_fail.js',
									columnWidth: .85  ,
									height:25,
									allowBlank:false
								}
							]
					}
					 ]
				});
				$.unblockUI();
				exceptionwin.show(this);
			}
		}else if(error.javaClassName === "java.lang.RuntimeException" ){
			window.saving = false;
			$.unblockUI();
			top.Ext.Msg.alert("错误", error.message);
		}else{
			window.saving = false;
			$.unblockUI();
			console.log(error)
			if(error.javaClassName){
		        msg = error.javaClassName+":"+error.message;
		            if(error.stackTrace!=null){
		                for(var i = 0 ; i <error.stackTrace.length ; i++)
		                    msg= msg+"\n\tat "+ error.stackTrace[i].className+"."+error.stackTrace[i].methodName+"("+error.stackTrace[i].fileName+":"+error.stackTrace[i].lineNumber+")";
		            }
		        console.log(msg)
		        top.Ext.Msg.alert("错误", error.message);
			}else{
				console.log(error.stack)
				throw error;
			}
		}
    }
}
dwr.engine.setErrorHandler(dwrExceptionHandler);

function denc(str){
	return str;
//	if(! str || !str.length){
//		return "";
//	}
//	var denclist = '$&@*!.:=>}€‚ƒˆ‰Š‹ŒŽ‘’•–àáâãäæççèéêëìßÞÝÜÛÜÛÚÙØÖÕÔÓÒÑÐÏÊÉÇÆÄÃ£Á';
//	var enclist =  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//	var result = "";
//	var tmpStr = "";
//	for (var i = 0; i < str.length; i++) {
//		tmpStr = str.substr(i,1);
//		if (tmpStr !== "%") {
//			var index = denclist.indexOf(tmpStr);
//			if (index<0) {
//				tmpStr = String.fromCharCode(tmpStr.charCodeAt(0) ^ 'c'.charCodeAt(0));
//			} else {
//				tmpStr = enclist.substr(index,1);
//			}
//		}
//		result = result + tmpStr;
//	}
//	return result;
}

var meta = parent.meta
function getData(key) {
    return meta[key];
}

function qryStrParser(qryStr){
    var res = {}; 
    qryStr.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
            function($0, $1, $2, $3) { res[$1] = unescape($3); }); 
    return res;
}   
function isEmpty(obj) {
    if (obj){
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    } else {
        return true;
    }
}

var msgBox = '<span id="msgbox">页面初始化中</span>';


var toolbar = '<div id="round" class="container toolbar">'+
	'<button class="save img"><img title="保存" src="../image/save.png"/> 保存</button>' + 
	'<button class="cancel img" ><img title="取消" src="../image/cancel.png"/> 取消</button>'+
	'<button class="quit img"><img title="退出" src="../image/quit.png"/> 退出</button></div>';

var flag = false;
var allDisabled = false;
var fieldsArray = {};
(function(){

       med.buildForm = function(cfg){
        var med = ns('med');
        var $msgBox = $(msgBox).appendTo($('body'));
        var dataLoaded;
        var qo;
        var reset;

        var form_fields = {};
        var fields_array = [];
        var required = [];
        var checkfuncs = [];

        function showMsg(msg){
            $msgBox.html(msg);
        }
        function hideMsg(){
            $msgBox.hide();
        }

        function showBody(msg){
            var containers = $(".container");
            containers.show();
            hideMsg();
        }
        function isValEmpty(v){
            return ( typeof v == 'undefined' || v == null || v == '');
        }
        
//        $(toolbar).appendTo($('body'));
//        $(toolbar).prependTo($('body'));
        $(toolbar).appendTo($('.showToolbar'));
        
//        $(toolbar).prependTo($('.testToolbar'));
        
        showMsg("获取元数据中..");
        metaCodes = [];    //ignore metaCodes setting is app's JS, notice metaCodes is *Global Var*
        var tmpHash = {};
        $.each(cfg,function(_,v) {
            var dSetting = {};
            if (v.setting ) {
                dSetting = v.setting;
            } else { 
                v.setting = dSetting
            };
            var _ds = dSetting['ds'];
            var cc = med.getCtrl(v.xtype); //control construtor func
            var rawCodes = [];
            if (cc['isComposite'] && cc.isComposite) {
                var childCodes = cc.getChildDSes(dSetting);
                if (childCodes) { rawCodes = rawCodes.concat(childCodes);}
            }
            
            rawCodes.push(_ds);

            var codes = $.map(rawCodes, function(v){
                var t = parseInt(v, 10);
                if (!isNaN(t) && !tmpHash["" + t]) {
                    tmpHash["" + t] = true;
                    return t;
                }
            });
           metaCodes = metaCodes.concat(codes);
        });
        //注释掉,meta改为使用全局变量
//        if (metaCodes.length > 0){
//        	meta = G_ALL_CODE;
//            MetaProvider.get(metaCodes, {callback:function(data){
//                meta = data;
//                console.log(metaCodes);
//                go();
//            }, errorHandler:function(errorString, exception) {
//                    hideDialog();
//                    showDialog("系统发生异常(获取元数据过程)<br/> " + errorString, true);
//            }});
//        } else {
//        	meta = [];
//        	go();
//        }
	      if (metaCodes.length > 0){
	    	  if(meta){
	    		  go();
	    	  }else{
			    	MetaProvider.getAll( {callback:function(data){
			            meta = data;
			            go();
			        }
			    	/**改用admin.js里面设置的统一异常处理
			    	,  errorHandler:function(errorstr, error) {
	                    if (error) {
	                        msg = error.javaClassName+":"+error.message;
                            if(error.stackTrace!=null){
                                for(var i = 0 ; i <error.stackTrace.length ; i++)
                                    msg= msg+"\n\tat "+ error.stackTrace[i].className+"."+error.stackTrace[i].methodName+"("+error.stackTrace[i].fileName+":"+error.stackTrace[i].lineNumber+")";
                            }
	                        console.log(msg)
	                        top.Ext.Msg.alert("错误", "查询数据时发生错误:请查看浏览器log.");
	                        return;
	                    }
                    }
			        **/
			    	});
	    	  }
	    } else {
	    	meta = [];
	    	go();
	    }

        
        function showDialog(msg, clickToClose){
            $.blockUI({ css: { 
                border: 'none', 
                padding: '15px', 
                backgroundColor: '#000', 
                '-webkit-border-radius': '10px', 
                '-moz-border-radius': '10px', 
                opacity: .5, 
                color: '#fff'
            },  message: msg });
            if (clickToClose) {
                $('.blockOverlay').one('click', $.unblockUI);
            }

        }

        function hideDialog(){
            $.unblockUI();
        }

        function info(msg){
            $.growlUI('系统提示', msg); 
        }

        //设置可用链接
        function setEabled(obj){
        	$(obj).removeAttr("disabled");
        	$(obj).parent().hover(function () {
        		$(this).css("background-color","#d3dbb3");
        	  },
        	  function () {
        	    $(this).css("background-color","#f5f5f5");
        	});
        	$(obj).children().css("color","#000");
        }
      //设置不可用链接
        function setDisabled(obj){
        	$(obj).attr("disabled","disabled");
        	$(obj).parent().hover(function () {
        		$(this).css("background-color","#f5f5f5");
        	  },
        	  function () {
        	    $(this).css("background-color","#f5f5f5");
        	});
        	$(obj).children().css("color","#aca899");
        }
        
        window.saving = false;
        
        function doSave(send, updateMode){
            if (saving) {
                console.error("already saving");
                return;
            }
            saving = true;
            if ($.isFunction(services.save)){
                showDialog("<li>正在提交数据...</li>");
                if(storeId != null){
                	send.id = storeId;
                }
                console.log("start...send...",new Date().toLocaleTimeString());
                if($.isFunction(services.beforeSave)){
                	services.beforeSave(send);
                }
                services.save(send,{ callback :function(d){
                	console.log("end...send...",new Date().toLocaleTimeString())
                    if ( typeof sendMessage == 'function' ) {
                          sendMessage('saved');
                    }
                    if (dataLoaded) {
                        dataLoaded = send;
                    }
                    
                    if(typeof(printBirthObj) != 'undefined' && !flag){
                    	printBirthObj.print(d);
                    }
                    if(typeof(immidiatelyLoadObj) != 'undefined'){
                    	immidiatelyLoadObj.immidiatelyLoad(d,send.foreignId);
                    }
                    var personId = $("#fileNo span").html();
                    if(personId == null || personId == '')
                    	personId = d;
                    console.log("start...get...",new Date().toLocaleTimeString())
                   
                    PersonalInfoService.getPersonInfo(personId,function(data){
                    	console.log("end...get...",new Date().toLocaleTimeString())
            			if(data.length > 0){
            				var infos = data[0];
        					var catMods = data[1];
        					if(infos != null && infos != ''){
        						var result = infos.split(",");
            					var personId = result[0];
            					var personName = result[1];
            		            var personBirthday = result[2].substring(0,10);
            		            var personSex = result[3];
            		            var personAge = result[4];
                				$(".personId").html(personId);
                				$(".personName").html(personName);
                				$(".personSex").html(personSex);
                				$(".personBirthday").html(personBirthday);
                				if($.isFunction(services.aftersave)){
                					console.log("start...his...",new Date().toLocaleTimeString())
                            		services.aftersave(personId,send.historyselect,{ callback :function(data){
                            			console.log("end...his...",new Date().toLocaleTimeString())
                            		}});
                            	}
        					}
            			}
            		});
                    if(!updateMode){
                    	$('#districtNumber span').css('display','inline-block');
                        $('.combo').css('display','inline');
                        var districtNumberEmpty = $('#districtNumber span').html();
                        if(districtNumberEmpty != '')
                        	$('#fileNo div').css('display','none');
                    }
                    if(foreignId){
                    	storeId = d;
                    	sendMessage('retId:' + d);
                    }else{
                    	reset();
                    }
                    
					if(typeof(healthBookSingleObj) != 'undefined' && !updateMode){
                    	healthBookSingleObj.singleSave();
                    }
                    if(isNextUrl){
                    	$('#fileNo input').css('display','none');
                    	$('#fileNo div').css('display','inline');
                    }
                    if(quitAfterSave){
                    	showInfoObj.Infor('数据已保存成功',function(e){
                    		if(e == 'ok'){
                    			sendMessage('quit');
                    		}
                    	});
                    }else{
                    	hideDialog();
                        info("数据已保存<br/>" + (updateMode ? "您可以继续修改, 或退出" : "请继续输入下一条" ));
                    }
                    window.saving = false;
                    if(!updateMode){
                		go();
                		info("数据已保存<br/>" + ("请继续输入下一条" ));
                	}else{
                		initButtons();
                	}
                    
                }
                /**改用admin.js里面设置的统一异常处理
                , errorHandler:function(errorstr, error) {
	                    if (error) {
	                        msg = error.javaClassName+":"+error.message;
                            if(error.stackTrace!=null){
                                for(var i = 0 ; i <error.stackTrace.length ; i++)
                                    msg= msg+"\n\tat "+ error.stackTrace[i].className+"."+error.stackTrace[i].methodName+"("+error.stackTrace[i].fileName+":"+error.stackTrace[i].lineNumber+")";
                            }
	                        console.log(msg)
	                        top.Ext.Msg.alert("错误", "保存数据时发生错误:请查看浏览器log.");
	                        return;
	                    }
                    }**/
                });
            } else {
                $.ajax({
                    url: services.save,
                    data: send,
                    dataType : "json",
                    success: function(data) {
                       showDialog("<li>数据已经保存</li>");
                       
                    }//function,
                    /**改用admin.js里面设置的统一异常处理
                	,error: function (XMLHttpRequest, textStatus, errorThrown) {
                	    // 通常 textStatus 和 errorThrown 之中
                	    // 只有一个会包含信息
                		msg = errorThrown.javaClassName+":"+errorThrown.message;
                        if(errorThrown.stackTrace!=null){
                            for(var i = 0 ; i <errorThrown.stackTrace.length ; i++)
                                msg= msg+"\n\tat "+ errorThrown.stackTrace[i].className+error.stackTrace[i].methodName+"("+errorThrown.stackTrace[i].fileName+":"+errorThrown.stackTrace[i].lineNumber+")";
                        }
	                    console.log(msg)
	                    top.Ext.Msg.alert("错误", "解析数据时发生错误:请查看浏览器log.");
                	}
                	**/
                });
            }
        }


        function getCtrl(id){
            return form_fields[id];
        }

        function setFormVal(d) {
            for(var prop in d) {
                if(d.hasOwnProperty(prop)) {
                    var c = form_fields[prop];
                    if (c && c['val']){
                    	if(d[prop] == null)
                    		d[prop] = '';
                    	else if(prop == 'idnumber' && d[prop] == '')
                    		d[prop] = '5301'
                        c.val(d[prop]);
                    }
                }//if
            } //for
            window.scroll(0,0);
        }
        
        function initButtons(){
        	$('.showWhenModify').show();
            $('.hideWhenModify').hide();
            if($('.toolbar .woman').length <= 0 ){
	            $('.toolbar').append($('.woman'));
	            $('.toolbar').append($('.child'));
	        }
	        $('.woman').show();
	        $('.child').show();
            if(typeof(initPrintPage) != 'undefined'){
            	initPrintPage.init();
            }
            if(typeof(printBirthObj) != 'undefined'){
            	printBirthObj.init();
            }
        }


        function go(){
            showMsg("构造页面组件中..");
            var shouldLoad = false;
            qo = qryStrParser(window.location.search);
            console.log(window.location.search)
            console.log(qo)
            if (!isEmpty(qo)){
                shouldLoad = false;
                //detect if we should load data from server -- update mode
                if (typeof loadTriggerParameters == "undefined") {
                    loadTriggerParameters = ['id'];
                }
                $.each(loadTriggerParameters, function(_, v){
                    if (qo[v]) {
                        shouldLoad = true;
                        return false; //break;
                    }
                });
                initListVal = shouldLoad;
            }
            fields_array = [];
            form_fields = [];
            //build controls
            $.each(cfg,function(_,v) {
                var id = v.id;
                var container = $('#' + id );
                var dSetting = {};
                if (v.setting ) {dSetting = v.setting;}
                dSetting.ctx = {getCtrl : getCtrl}; //添加contrl context, 缺省只有一个方法
                try {
                    var ctrl = med.buildControl(v.xtype, dSetting, container, id);
                    form_fields[id] =ctrl;
                    fields_array.push({id:id, ctrl:ctrl});
                    if (v.required && v.required[0]) {
                        required.push({id:id,msg:v.required[1]});
                    }
                    if(dSetting.checkfunc){
                    	checkfuncs.push({id:id,checkfunc:dSetting.checkfunc});
                    }
					if (v.valFormula) {
						v.valFormula.hook(dSetting.ctx, ctrl);
					}
                } catch (e) {
                    alert("build control [" + id + ", " + v.xtype + "] failed. \n" + e.message);
                    showMsg("build control [" + id + ", " + v.xtype + "] failed. \n" + e.message);
                }
            });
			fieldsArray = form_fields;
            //build controls dependencies
            $.each(cfg,function(_,v) {
               if (v.requires){
                    var requires = v.requires;
                    var ctrl = form_fields[v.id];
                    ctrl.valChanged(function(old, newVal){
                        var _tCheck = [];
                        if ($.isArray(requires)) {
                            _tCheck = _tCheck.concat(requires);
                        } else {
                            _tCheck.push(requires);
                        }
                        $.each(_tCheck, function(_,r){
                            var fields = r.fields;
                            var eq = false;
                            var nv =  $.isArray(newVal) ? newVal : [].concat(newVal);
                            $.each(nv, function(_, item){
                                    if (item == r.valEq)
                                    {
                                        eq = true;
                                        return false;
                                    }
                            });
                            var i = 0;
                            var j = 0;
                            if (eq){
                                $.each(r.fields, function(_,v){
                                	j = j + 1;
                                    form_fields[v].enable(true);
                                });
                            } else {
                                $.each(r.fields, function(_,v){
                                	i = i + 1;
                                    form_fields[v].disable(true);
                                    form_fields[v].val('');
                                });
                            }
                        });

                    });
                } //if
            }); //each
            var tabs, tabNum = 0;
            
            var _$tabs= $("ul.tabs");
            if (_$tabs.length > 0){
                tabs = _$tabs.tabs("div.panes > div", {api:true});
                tabNum = tabs.getTabs().length;
            } else {
                tabNum = 0;
            }
            //设置不可用界面
            if(flag){
            	$('input').each(function(){
            		var parentClass = $(this).parent('span').attr('class');
            		var parentClassOther = $(this).parent('div').parent('span').attr('class');
            		if(!((parentClass != undefined && parentClass != 'undefined' && parentClass == 'requiredInput') || 
            				(parentClassOther != undefined && parentClassOther != 'undefined' && parentClassOther == 'requiredDiv'))){
            			$(this).attr('readonly','readonly');
            		}
            		
            		$(this).unbind('focus');
            		if($(this).attr('onfocus') != undefined && $(this).attr('onfocus') != 'undefined'){
            			$(this).attr('onfocus','');
            		}
        		});
            	
            	$('div').each(function(){
            		var parentClass = $(this).parent('span').attr('class');
            		if(!(parentClass != undefined && parentClass != 'undefined' && parentClass == 'requiredDiv')){
            			$(this).addClass('disabled');
            		}
            	});
            }else if(allDisabled){
            	$('input').each(function(){
            		$(this).attr('readonly','readonly');
            		
            		$(this).unbind('focus');
            		if($(this).attr('onfocus') != undefined && $(this).attr('onfocus') != 'undefined'){
            			$(this).attr('onfocus','');
            		}
        		});
            	
            	$('div').each(function(){
            		$(this).addClass('disabled');
            	});
            }
//            var qo = qryStrParser(window.location.search);
//            if (!isEmpty(qo)){
//                var shouldLoad = false;
//              
//                //detect if we should load data from server -- update mode
//                if (typeof loadTriggerParameters == "undefined") {
//                    loadTriggerParameters = ['id'];
//                }
//                $.each(loadTriggerParameters, function(_, v){
//                    if (qo[v]) {
//                        shouldLoad = true;
//                        return false; //break;
//                    }
//                });
//                test = shouldLoad;
                if (shouldLoad) {
                    //要从server端加载数据
                    showMsg("加载数据中.."+window.location.search);
                    services.get(qo, { callback : function(data){
                        dataLoaded = data;
                        setFormVal(dataLoaded);
                        
                        initButtons();
                        if(window.services.afterinit){
                        	window.services.afterinit(shouldLoad);
                        }
                    }
                    /**改用admin.js里面设置的统一异常处理, errorHandler : top.errorProcess **/}); 
                } else {
                    //不需从server端加载，直接set
                    setFormVal(qo);
//                    if(typeof(childOtherValJson) != 'undefined'){
//                    	setFormVal(childOtherValJson);
//                    }
//                    if(typeof(saveBeforeObj) != 'undefined' && qo.fileNo != undefined && qo.fileNo != 'undefined'){
//    					saveBeforeObj.IsAbortionFn(qo.fileNo,'');
//                    }
                    if(window.services.afterinit){
                    	window.services.afterinit(shouldLoad);
                    }
                }
//            }
            
            function focusFirst(){
                if (fields_array[0].ctrl['focus']){
                    fields_array[0].ctrl.focus();
                }
                $(".save")[0].focus();//设置为第一个保存按钮foucs
            }


            function nextTab(step) {
               //var idx = tabs.get 

               if (tabNum > 0 ) {
                   var current = tabs.getIndex();
                   var idx = (current + step) % tabNum;
                   if (idx < 0 ) idx = tabNum - 1;
                   tabs.click(idx);
               }
            }

            function quit(){
                if ( typeof sendMessage == 'function' ) {
                  sendMessage('quit');
                }
            }

            reset = function(){  //todo fixme !! declared at top, caused by doSave
                $.each(fields_array, function(_,v){
                    var rs = v.ctrl['reset'];
                    if (rs) {
                        rs();
                    }
                });
                if (shouldLoad) {
                    //update mode
                    setFormVal(dataLoaded);
                } else {
                    //create mode
                    setFormVal(qo);
                    if (tabNum > 0 ) {
                        tabs.click(0);
                    }
                    focusFirst();
                }
            }

            function save(){
                var model = {};
                $.each(fields_array, function(i,v){
                    var _ccfg =  cfg[i];
                    if (!_ccfg.setting.showOnly) {
                        var key = v.id;
                        var val = v.ctrl['val'] ?  v.ctrl.val() : null;
                        if(typeof(val)==="string"){
                        	model[key] = Ext.util.Format.trim(val);
                        }else{
                        	model[key] = val;
                        }
                        //alert(key +"====="+val+"==="+typeof(val));
                    }
                });

                var r = $.map(required, function(v){
                    var id = v.id;
                    if (isValEmpty(model[id])){
                    //if ( typeof model[id] == 'undefined' || model[id] == null || model[id] == ''){
                        return {id:id, msg:v.msg}; 
                    }
                });

                var compositeR = $.map(fields_array, function(v, i){
                    var _ctrl = med.getCtrl(cfg[i].xtype);
                    if (_ctrl['isComposite'] && _ctrl.isComposite){
                        var cr = v.ctrl.checkRequired();
                        if (cr && cr.length > 0) {
                            return { caption: cfg[i].errCaption, checkRes: v.ctrl.checkRequired()};
                        }
                    }
                });
                
                var checks = $.map(checkfuncs, function(v){
                    var id = v.id;
                    var msg = v.checkfunc(id);
                    if (!isEmpty(msg)){
                    //if ( typeof model[id] == 'undefined' || model[id] == null || model[id] == ''){
                        return {id:id, msg:msg}; 
                    }
                });
                
                if (checks.length > 0){
                    var msg = "";
                    msg += $.map(checks, function(v){
                        return "<li>" + v.msg + "</li>";
                    }).join("");
                    hideDialog();
                    showDialog(msg, true);
                    return;
                }

                if (r.length > 0 || compositeR.length > 0){
                    var msg = "";
                    msg += $.map(r, function(v){
                        return "<li>" + v.msg + " 必需填写</li>";
                    }).join("");

                    msg += $.map(compositeR, function(r){
                       var c = r.caption ?  r.caption : "";
                       return "<li>" + c + "<ul>" +
                       $.map(r.checkRes,function(v){
                           return "<li>第" + (v.line +1) + "行: " +
                               $.map(v.res, function(m) {
                                   return m.msg;
                               }).join(" , ") + "必填</li>";
                        }).join("") + "</ul></li>";
                    });
                    hideDialog();
                    showDialog(msg, true);
                    return;
                }
                
                

                var send = model;
               

                var updateMode = false;
                if (!isEmpty(dataLoaded)){
                    //合并加载的数据(浅拷贝, 防止array中的主键也被保留，如果list需要update, 可以考虑深拷贝)
                     send = $.extend(false, {}, dataLoaded, model);
                     updateMode = true;
                }

                if (services.propValidate){
                    var tobeValid = [];
                    for(var prop in send) {
                        if(send.hasOwnProperty(prop)){
                            tobeValid.push(prop);
                        }
                    }

                    services.propValidate(tobeValid,function(d){
                        if (d.length > 0){
                            alert("prop validation failed\n following properties not exist in serverside:\n" +
                                d.join("\n") );
                        } else {
                            //alert("props ok");
                            doSave(send, updateMode);
                        }
                    });
                } else {
                    doSave(send, updateMode);
                }

            }

            $(document).keyup(function(e){
                    if (e.which == 13 && (e.altKey || e.ctrlKey)) {
                        save();
                    } else if (e.ctrlKey) {
                    //tab移动
                        if (e.which == 37 ) {
                            nextTab(-1);
                        }
                        else if (e.which == 39 ) {
                            nextTab(+1);
                        }
                    } else if (e.altKey) {
                        if (e.which == 67 )  { //alt+c
                            reset();
                        } else if (e.which == 81 ) { //alt+q
                            quit();
                        }
                        else if (e.which == 191) {
                            showHelp(true);
                        }
                    } 
 
            }) //keyup

            $('button.save').click(save);
            $('button.quit').click(quit);
            $('button.cancel').click(go);
         
            showBody();

            function showHelp(force){
                var c = $.cookie('showHelp');
                if (force || !c){
                    $.growlUI('系统提示', '系统快捷键<br/>保存: ctl + enter <br/>'
                            + '取消: atl + c <br/>退出: atl + q <br/>' 
                            + '页框切换: ctl + -> <- <br/> ' 
                            +' <input type="checkbox" id="showHelp"/>不再显示此窗口', 0); 
                    $('.growlUI').one('click',$.unblockUI); 
                    $('#showHelp').click(function(){
                        $.cookie('showHelp', 'Y', {expires: 7000, path: '/'});
                    });
                }
            }
            showHelp();
            focusFirst();
        } //function go
        return {
            getDataLoaded : function(){
                return dataLoaded;
            },
            getCtrl : getCtrl,
            setModel : setFormVal,
            showDialog : showDialog,
            hideDialog : hideDialog
        };
      }
})();
var medObj;
var isNextUrl = false;
var initListVal = false;
function parseParams(url){
	url = url.substring(1,url.length);
	var addressSymble = url.split('&');
	var json = '{';
	for(var i = 0;i<addressSymble.length;i++){
		var equalSymble = addressSymble[i].split('=');
		json = json + equalSymble[0] + ':"' + equalSymble[1] + '",';
	}
	if(json != null){
		return eval('(' + json.substring(0,json.length - 1) + '})');
	}
	return null;
}
var quitAfterSave = false;
var foreignId = false;
var storeId = null;
$(function(){
	var json = parseParams(window.location.search);
//	console.log(json);
	if(json.isNext != undefined){
		isNextUrl = true;
	}
	if(json.histype != undefined){
		$('.i_enter').hide();
		$('.showToolbar').hide();
	}
	if(json.quitAfterSave  != undefined){
		quitAfterSave = json.quitAfterSave;
	}
	if(json.isForeignId != undefined){
		foreignId = true;
	}
	if(json.id != undefined){
//		var id = url.substring(url.indexOf('id') + 3,url.length);
		var id = unescape(json.id);
		MetaProvider.isInputPerson(id,services.tableName,function(data){
			medObj = med.buildForm(cfg);
			if(!data){
				flag = true;
				$('.save').remove();
				$('.cancel').remove();
			}
			if(json.extend_children_woman_param != undefined){
				$('button.quit').remove();
			}
		});
	}else if(json.certifiId != undefined){
		medObj = med.buildForm(cfg);
		var type = json.type;
		if(type == '2'){
			flag = true;
			$('.save').remove();
			$('.cancel').remove();
			$('.child').remove();
		}else if(type == '3' || type == '4'){
			flag = true;
			$('.destroyReason').show();
			$('.child').remove();
		}else if(type == '5'){
			allDisabled = true;
			$('.destroyReason').show();
			$('.save').remove();
			$('.cancel').remove();
			$('.child').remove();
		}
	}else{
		medObj = med.buildForm(cfg);
	}
    window.parent.onbeforeunload = function(){
       return "你确认要离开这个当前操作页面么?";
    };
});
