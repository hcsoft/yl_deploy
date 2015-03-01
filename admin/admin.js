ModuleMgr = {};
EasyuiDestroyList = new Array();
function dwrExceptionHandler(errorString, error){
	if (error) {
		if(error.javaClassName === "cn.net.tongfang.web.util.TimeoutException" ){
			if(!window.errorShowing){
				var exceptionwin = new Ext.Window({
					title:'重新登录',
					id:'relogin_exceptionwin',
					width:320,
					height:150,
					layout:'fit',
					modal :true,
					buttonAlign:'center',
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
					       height:150,
					       layout:'table',
					       monitorValid:true,
							layoutConfig: {
						        columns: 2
						    },
							buttons:[{
								text:'重新登录',
								formBind: true,
								id:'bt_submit',
								handler:function(){
									window.saving = false;
									Ext.getCmp("relogin_form").getForm().submit({
										method:'POST',
										url:'/j_spring_security_check',
										success:function(){
											Ext.getCmp("relogin_message").setText("登录成功!");
											Ext.getCmp("relogin_exceptionwin").close();
										},
										failure:function(form, action){
											Ext.Msg.alert('登录失败!',"登录失败!用户名或密码错误!");
											Ext.getCmp("relogin_message").setText("登录失败!用户名或密码错误");
										}
									});
								}
							}],
							buttonAlign:'center',
							bodyStyle:'background-color: transparent !important;',
							items:[
								{
									xtype:'label',
									text : '您的登录已经超时，请输入用户名和密码重新登录！',
									style :'padding-left:5px;padding-top:8px;color:red;',
									id : 'relogin_message',
									columnWidth: .25 ,
									colspan: 2,
									height:25
								},
								{
									xtype:'label',
									html : '用&nbsp;户&nbsp;名：',
									style :'padding-left:5px;margin:4px 0px 4px 0px;',
									columnWidth: .15 ,
									width:50,
									height:25
								},
								{
									xtype:'textfield',
									fieldLabel : '用户名',
									id : 'j_username',
									style :'text-indent:5px;margin:4px 0px 4px 0px;width:90%;',
									columnWidth: .85  ,
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
									style :'padding-left:5px;margin:4px 0px 4px 0px;',
									columnWidth: .15  ,
									height:25
								},{
									xtype:'textfield',
									// width:100,
									style :'text-indent:5px;margin:4px 0px 4px 0px;width:90%',
									fieldLabel : '密码',
									inputType : 'password',
									id : 'j_password',
									columnWidth: .85  ,
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
									columnWidth: .85  ,
									height:25,
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
				exceptionwin.show(this);
			}
		}else if(error.javaClassName === "java.lang.RuntimeException" ){
			$.unblockUI();
			window.saving = false;
			top.Ext.Msg.alert("错误", error.message);
		}else{
			if($.unblockUI)
				$.unblockUI();
			window.saving = false;
			if(error.javaClassName){
		        msg = error.javaClassName+":"+error.message;
		            if(error.stackTrace!=null){
		                for(var i = 0 ; i <error.stackTrace.length ; i++)
		                    msg= msg+"\n\tat "+ error.stackTrace[i].className+"."+error.stackTrace[i].methodName+"("+error.stackTrace[i].fileName+":"+error.stackTrace[i].lineNumber+")";
		            }
		        console.log(msg)
		        top.Ext.Msg.alert("错误",  error.message);
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
}
Ext.ns('App','App.mainframe');
Ext.override(Ext.form.Field,{
	destroy:function(){
		Ext.form.Field.superclass.destroy.call(this);
		if(this.isFormField){
			if(this.el){
   			  Ext.Element.uncache(this.container);
   			  delete this.container.dom;
			  // delete this.el.dom;
			}
		}
	}
});
Ext.override(Ext.Panel,{
	beforeDestroy:function(){
	   if(this.header) {// remove header's listeners.
            this.header.removeAllListeners();
            if (this.headerAsText){
                Ext.Element.uncache(this.header.child('span'));
            }
        }
// ^^^^^^^^^^^^^^^ add by guig
        Ext.Element.uncache(
            this.header,
            this.tbar,
            this.bbar,
            this.footer,
            this.body
            ,this.bwrap // add by guig
        );
        if(this.tools){
            for(var k in this.tools){
                Ext.destroy(this.tools[k]);
            }
        }
        if(this.innerCt){
        	Ext.Element.uncache(this.innerCt);
        }
        if(this.buttons){
        	var len = this.buttons.length;
            for(var i=0;i<len;i++){
                this.buttons[i].destroy();
            }
        }
        Ext.destroy(
            this.topToolbar,
            this.bottomToolbar
        );
        Ext.Panel.superclass.beforeDestroy.call(this);
        if(this.footer){
        	this.footer.removeAllListeners();
        	this.footer.remove();
        	delete this.footer.dom;
        }
   
       
	},
	onDestroy:function(){
		Ext.Panel.superclass.onDestroy.call(this);
		if(this.bwrap && this.bwrap.dom){
          this.bwrap.remove();
          this.bwrap=null;
        }
	}
});
Ext.override(Ext.Button,{
	beforeDestroy: function(){
    	if(this.rendered){
	        var btn = this.el.child(this.buttonSelector);
	        if(btn){
                Ext.Element.uncache(btn);
                if(this.tooltip){
                    if(typeof this.tooltip == 'object'){
                        Ext.QuickTips.unregister(btn);
                    }
                }
	            btn.removeAllListeners();
	        }
	    }
        if(this.menu){
            Ext.destroy(this.menu);
        }
    },
    destroy:function(){
    	Ext.Button.superclass.destroy.call(this);
    	if(this.container){
    		Ext.Element.uncache(this.container);
    		delete this.container;
    		
    	}
    	
    	
    }
});
Ext.override(Ext.form.DateField,{
	beforeDestroy:function(){
	  if(this.menu){
	  	this.menu.hide();
	  } 
	  Ext.Element.uncache(this.container);
	  Ext.Element.uncache(this);
	},
	onDestroy:function(){
		if(this.menu){
		  Ext.destroy(this.menu.picker.mbtn,this.menu.picker.todayBtn);
	      ul = this.menu.ul;
	    }
	    this.container.remove();
	  // if(App.DateField.superclass)
		// App.DateField.superclass.onDestroy.call(this);
		if(this.trigger){
	    	this.trigger.removeAllListeners();
 	  		this.trigger.dom=null;
 	  		this.wrap.dom=null;
 	  		delete this.trigger.dom;	
 	  		if(this.menu){
 	  		 delete this.menu.picker.cells.el.dom;
 	  		 delete this.menu.picker.el.dom;
 	  		 delete this.menu.ul.dom;
 	  		 delete this.menu.el.dom;
 	  		}
 	  		
 	  		delete this.wrap.dom;
 	  		delete this.trigger.dom;
	    }
		if(this.menu){
			
        	if(this.menu.picker.cells.elements){
	        	len =this.menu.picker.cells.elements.length;
	        	for(var i=0;i<len;i++){
	        		delete this.menu.picker.cells.elements[i];
	        	}
	        	delete this.menu.picker.cells.elements;
        	}
            len = this.menu.picker.textNodes.length;
            for(var j=0;j<len;j++){
	        		delete this.menu.picker.textNodes[j];
	       	}
	       	if(this.menu.picker.mpMonths){
		       	len = this.menu.picker.mpMonths.elements.length;
		       	for(var k=0;k<len;k++){
		       		delete this.menu.picker.mpMonths.elements[k];
		       	}
		       	len = this.menu.picker.mpYears.elements.length;
		       	for(var p=0;p<len;p++){
		       		delete this.menu.picker.mpYears.elements[p];
		       	}
	       	}
	       	var picker = this.menu.picker;
	      	Ext.Element.uncache(ul);
	      	Ext.Element.uncache(this.menu.focusEl);
        	delete this.menu.el.dom;
        	delete picker.todayKeyListener.el.dom;
        	delete picker.leftcr.el.dom;
        	delete picker.rightcr.el.dom;
        	delete this.menu.focusEl.dom;
        	delete picker.todayBtn.el.dom;
        	delete picker.mbtn.el.dom;
        	delete picker.todayBtn.el.dom;
        	if(picker.mbtn.container){
        	 delete picker.mbtn.container.dom;
        	}
        	delete picker.container.dom;
        	delete picker.monthPicker.dom;
        	delete this.menu.keyNav.el.dom;
		   
        }
	}
}
);
Ext.override(Ext.form.TriggerField,{
	 onDestroy : function(){
	 	
        if(this.trigger && this.trigger.dom){
        	// 必须先删除此事件，否则控件销毁后还会执行triggerBlur事件导致JS报错
        	
		    Ext.get(Ext.isIE ? document.body : document).un("mousedown", this.mimicBlur,this);
		   	Ext.Element.uncache(this.trigger);
            this.trigger.removeAllListeners();
            this.trigger.remove();
            delete this.trigger.dom;
        }
        if(this.wrap && this.wrap.dom){
        	this.wrap.removeClass('x-trigger-wrap-focus');
        	Ext.Element.uncache(this.wrap);
            this.wrap.remove();
            // delete this.wrap.dom;
        }
        Ext.Element.uncache(this.el);
        Ext.form.TriggerField.superclass.onDestroy.call(this);
        
    }
});
App.PagingToolbar = function(config) {
	App.PagingToolbar.superclass.constructor.call(this,Ext.apply(config));
};
/*
 * 分页工具条，增加释放内存的代码
 */
Ext.extend(App.PagingToolbar, Ext.PagingToolbar, {
   beforeDestroy:function(){
   		if(this.items && this.items.length){
	      var len = this.items.length;
	      for(var i=0;i<len;i++){
	      	if(this.items.items[i].destroy){
	      	   this.items.items[i].destroy();
	      	}
	      }
	    }
      App.PagingToolbar.superclass.beforeDestroy.call(this);	
    },
	destroy : function(){
		
        if(this.fireEvent("beforedestroy", this) !== false){
        	
            this.beforeDestroy();
            var len =this.items.items.length;
            if(this.rendered && !Ext.isIE){// if is ie then do this follow!
											// //change by guig
                this.el.removeAllListeners();
                this.el.remove();
                if(this.actionMode == "container"){
                    this.container.remove();
                }
            }
            this.onDestroy();
            Ext.ComponentMgr.unregister(this);
            this.fireEvent("destroy", this);
            this.purgeListeners();
            if(this.rendered && Ext.isIE){
                this.el.removeAllListeners();
                this.el.remove();
                delete this.el.dom;
                delete this.afterTextEl.el;
                delete this.container.dom;
                delete this.field.dom;
                delete this.first.el.dom;
                delete this.last.el.dom;
                delete this.next.el.dom;
                delete this.prev.el.dom;
                delete this.tr;
                for(i=0;i<len  ;i++){
                	delete this.items.items[i].el;
                	if(this.items.items[i].container){
                	 delete this.items.items[i].container.dom;
                	 
                	}
                	if(this.items.items[i].td){
				     delete this.items.items[i].td;
			     	}
                }
                if(this.actionMode == "container"){
                    this.container.remove();
                }
           }
	       if (this._parentDivForAutoEl) {// remove the parent div for autoEl
                Ext.removeNode(this._parentDivForAutoEl);
                this._parentDivForAutoEl = null;
            }

        }
    }
});
Ext.override(Ext.form.BasicForm,{
	destroy: function() {
		// 改变了BasicForm中的销毁顺序，先销毁ITEMS，此tems里的控件类型都是field的
        this.items.each(function(f){
            Ext.destroy(f);
          
        });
        // 放在FormPanel中的button和label不能自动销毁，只能手动
        // 以下是销毁按钮
        if( this.el && this.el.dom && this.el.dom.length&& this.el.dom.length >0){
        	var btn;
        	while(this.el.dom[0] && this.el.dom[0].nodeName =='BUTTON'){
        		btn = Ext.getCmp(this.el.dom[0].parentNode.parentNode.parentNode.parentNode.parentNode.id);
        		if(btn){
        			btn.destroy();
        			delete btn.el;
        		}
        		
        	}
        }
        
        // 以下是销毁label
        
        if(this.el && this.el.dom){
	        var labels = this.el.dom.getElementsByTagName("label");
	        var len = labels.length;
	        if(len >0){
	        	for(var i=0;i<len;i++){
	        	   if(labels[i] && labels[i].id !=""){
	        	   	 var com = Ext.getCmp(labels[i].id);
	        	   	 if(com){
	        	   	 	 Ext.Element.uncache(com.el);
	        	   	 	 com.el.removeAllListeners();
	                     com.el.remove();
	                     delete com.el;
	        	   	 }
	        	   }	
	        	}
	        }
        }
      
        if(this.el && this.el.dom){
        	Ext.Element.uncache(this.el);
			this.el.removeAllListeners();
			this.el.remove();
        }
		this.purgeListeners();
	}
});
Ext.override(Ext.grid.GridPanel,{
	beforeDestroy:function(){
	    var reader = this.store.reader;
	    if(reader.jsonData){
          reader.getRoot =null;
	      reader.getTotal =null;
	      reader.getId = null;
	      reader.getJsonAccessor =null;
        }
		// 清除grid的模板产生的动态eval代码
		var tpl=this.view.templates;
		tpl.body.compiled=null;
		tpl.cell.compiled=null;
		tpl.hcell.compiled=null;
		tpl.header.compiled=null;
		tpl.master.compiled=null;
		tpl.row.compiled=null;
		if(this.plugins && this.plugins.length >0 && this.plugins[0].cellTpl){
			this.plugins[0].cellTpl.compiled=null;
			this.plugins[0].rowTpl.compiled=null;
			this.store.un('add', this.plugins[0].refreshSummary, this);
		    this.store.un('remove', this.plugins[0].refreshSummary, this);
		    this.store.un('clear', this.plugins[0].refreshSummary, this);
		}
        if(this.buttons){
        	var len = this.buttons.length;
            for(var i=0;i<len;i++){
                this.buttons[i].destroy();
                if(this.buttons[i].container){
                 delete this.buttons[i].container.dom;
                }
                delete this.buttons[i].el.dom;
            }
            this.buttons = null;
        }      
		Ext.grid.GridPanel.superclass.beforeDestroy.call(this);
	},
	onDestroy : function(){
        if(this.rendered){
            if(this.loadMask){
                this.loadMask.destroy();
            }
            var c = this.body;
            c.removeAllListeners();
            this.view.destroy();
           
        }
        this.colModel.purgeListeners();
       	var view=this.view;
    	view.resizeProxy.remove();
    	delete view.resizeProxy.dom;
    	view.resizeMarker.remove();
    	delete view.resizeMarker.dom;
    	view.focusEl.remove();
    	view.focusEl.dom = null;
    	view.mainBody.remove();
    	view.mainBody.dom = null;
    	view.scroller.remove();
    	view.scroller.dom = null;
    	Ext.removeNode(view.innerHd);
    	delete view.innerHd;
    	view.mainHd.remove();
    	view.mainHd.dom = null;
    	view.mainWrap.remove();
    	view.mainWrap.dom = null;
    	
    	delete view.focusEl.dom;
    	delete view.innerHd;
    	delete view.mainBody.dom;
    	delete view.scroller.dom;
    	delete view.mainHd.dom;
    	delete view.mainWrap.dom;
		delete view.el.dom;
		delete this.container.dom;
		delete this.body.dom;
		delete this.bwrap.dom;
		if(this.view.summary){
			this.view.summary.remove();
			delete this.view.summary.dom;
		}
		if(this.view.summaryWrap){
			this.view.summaryWrap.remove();
			delete this.view.summaryWrap.dom;
		}
    }
});
App.TabPagePanel=Ext.extend(Ext.Panel, {
    closable: true,
    autoScroll:true,
    destroy :function(){
// $(this.el).panel("destroy");
    	App.TabPagePanel.superclass.destroy.call(this);
// console.log($(this.el).panel("destroy"));
    	
    	if(!this || !this.items || !this.items.items || !this.items.items.length){
    		return;
    	}
     	var len=this.items.items.length;
    	var items=this.items.items;
    	var bar;
    	if(len && items){
	    	for(var i=0;i<len;i++){
				if(items[i].items){
					var citems = items[i].items.items;
					for(var j=0;j<citems.length;j++){
		          	 citems[j].body.dom=null;	
		             citems[j].el.dom=null;
		             delete citems[j].el.dom;
		          	}
		          	if(citems[0] && citems[0].container){
		              citems[0].container.dom=null;
		     	      delete citems[0].container.dom; 
		          	}
	
				}
				items[i].body.dom=null;
		        items[i].el.dom=null;
		        delete items[i].body.dom;
	            delete items[i].el.dom;
	       
	    	}
    	}
    	
	    this.el.dom=null;
	    this.body.dom=null;
	    delete this.el.dom;
	    delete this.body.dom;
	    var jss = document.getElementsByTagName("script");
	    var hd = document.getElementsByTagName("head")[0];
	    if(this.wins){
	    	for(var p=0;p<this.wins.length;p++){
	    		if(this.wins[p]){
	    		 this.wins[p].destroy();
	    		}
	    	}
	    }
	    var jsArray = this.jscript.split(","); 
	    var nodes = [];
	    for(var i=0;i<jss.length;i++){
	       for(j=0;j<jsArray.length;j++){
	     	if(jss[i].src.indexOf(jsArray[j]) >= 0){
	     		 nodes.push(jss[i]);
	       		
	     	}
	       }
	     }
	     for(var i=0;i<nodes.length;i++){
	     	hd.removeChild(nodes[i]);
	     }
    }  
    ,
    beforeDestroy:function(){
    	if(this.header) {
            this.header.removeAllListeners();
            if (this.headerAsText){
                Ext.Element.uncache(this.header.child('span'));
            }
        }
    

        Ext.Element.uncache(
            this.header,
            this.tbar,
            this.bbar,
            this.footer,
            this.body
            ,this.bwrap 
        );
             
        if(this.tools){
            for(var k in this.tools){
                Ext.destroy(this.tools[k]);
            }
        }
        if(this.buttons){
            for(var b in this.buttons){
                Ext.destroy(this.buttons[b]);
            }
        }
      
        if(this.items && this.items.items && this.items.items.dom && this.items.items.dom.id){
            Ext.destroy.apply(Ext, this.items.items);
        }
        if(this.monitorResize){
            Ext.EventManager.removeResizeListener(this.doLayout, this);
        }
        if (this.layout && this.layout.destroy) {
            this.layout.destroy();
            if(this.layout.innerCt){
              delete this.layout.innerCt.dom;
            }
        }
        if(this.bwrap){
          this.bwrap.remove();
          delete this.bwrap.dom;
          delete this.body.dom;
         
        }
        this.itemTabStrip = null;
        
    }
});



var navigation = new Ext.Panel({
// width : 1000,
	height : 600,
	id : 'navigateContainerPanel',
	title : '当前位置：',
	bodyBorder : false,
	html : '<div class="navigateContainer"></div>',
	autoScroll : true
});

App.mainframe.MainPanel = function() {
	App.mainframe.MainPanel.superclass.constructor.call(this, {
		 region : 'center',
  id:'tabbody',
  activeTab : 0,
  frame : true,
  autoScroll : true,
  enableTabScroll: true,
  plugins : new Ext.ux.TabCloseMenu(),
  items : [ {
    contentEl : 'center2',
    title : '昆明市公共卫生服务管理系统',
    closable : false,
    autoScroll : true,
    items : [navigation]
  	} ]
	});
};
Ext.extend(App.mainframe.MainPanel, Ext.TabPanel, {
	register:function(mod){
		var tab = Ext.getCmp(this.tabid);
	  tab.add(mod);
	  if (tab.layout.innerCt) {
			tab.layout.innerCt.dom.innerHTML = null;
			delete tab.layout.innerCt;
		}
	  // debugger;
	  tab.doLayout();
	  
  }
})

/**
 * 每次加载js模块时，调用这个函数，增加tab
 */


var taskCheckSession;
var menu_tree;
function checkSession() {
  UserService.getCurrentUser(
    {
      callback: function(data) {
        if ( typeof data == 'undefined' || data == null ) {
          Ext.Msg.alert('', '登录状态失效，请退出重新登录！', logout);
        }
      },
      timeout: 120000,
      errorHandler: function(msg) {
// console.log(msg);
        Ext.Msg.alert('', '通讯中断，请退出重新登录！', logout);
      }
    }
  );
};
function stopTask() {
// Ext.TaskMgr.stop(taskCheckSession);
};
function logout() {
  
  window.top.location.href = "/j_spring_security_logout";
// try{
// stopTask();
// }catch(ex){}
}

// 待办事宜消息通知
var changeid = 0;
function changeColor(){
	if(changeid % 2 == 0){
		$('.rc_box2').css('background-color','#FF7F00');
		$('.rc_box3').css('background-color','#FF7F00');
		$('.ov1').css('border-bottom-color','#FF7F10');
		$('.ov2').css('border-bottom-color','#FF7F00');
		$('.rc_box3').css('color','#FFF');
	}else{
		$('.rc_box2').css('background-color','#f3f3f3');
		$('.rc_box3').css('background-color','#f3f3f3');
		$('.ov1').css('border-bottom-color','#ddd');
		$('.ov2').css('border-bottom-color','#f3f3f3');
		$('.rc_box3').css('color','#000');
	}
	changeid = changeid + 1;
}
function redderToPage(){
	clearInterval(changeColor);
	$('.rc_box1').hide();
	var id = "/js/app/waitingthing.js";
	var tab = null;
    var items = tabPanel.find('id', id);
    if (items.length > 0) {
    	tab = items[0];
    }
    if (tab) {
    	tabPanel.setActiveTab(tab);
    }else{
    	var autoLoad = {
    		url : "/autoload.jsp?jsurl=" + id,
    		scripts : true,
    		nocache : true,
    		border : false
    	};
    	tab = new App.TabPagePanel({
    		id : id,
    		autoLoad : autoLoad,
    		title : '待办事宜',
    		autoScroll : true,
    		closable : true,
    		border : false
    	});
    	var p = tabPanel.add(tab);
    	tabPanel.tabid = id;
    	tab.jscript=id;
    	tabPanel.activate(p);
    }
}


function openhelp(){
	if(window.chatwindow && !window.chatwindow.closed){
		window.chatwindow.focus();
	}else{
		window.chatwindow = window.open(
				"http://app.xt800.cn/chat/index.html?c=ADE6BF39373506DA",
				"XT800",
				"height=480, width=605, top=100, left=300, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
		window.chatwindow.document.cookie = 'webchat_token=123456&webchat_uid=abc';
		
	}
}
var tabPanel;

Ext.onReady(function() {
	Ext.QuickTips.init();
	waitingThingService.isNewWaitingThing(function(data){
		if(!data){
			$('.rc_box1').hide();
		}else{
			$('.rc_box1').show();
			// 待办事宜
			$('.rc_box1').click(function(){
				redderToPage();
			});
			setInterval(changeColor,1000);
		}
	});
	
	tabPanel = new App.mainframe.MainPanel();
	tabPanel.on("tabchange", function(tabs, tab) {
		tabPanel.tabid = tab.id;
	});
	
	init = function(data) {
  /*
	 * data的格式样例 var json = [ { "text" : "登记信息管理", "id" : 'regMgr', "leaf" :
	 * false, "cls" : "folder", "children" : [ { "text" : "个人预登记信息审核", "id" :
	 * '/js/app/ireg.js', "leaf" : true, "cls" : "file" }, { "text" :
	 * "个人预登记信息查询", "id" : 'individualQry.js', "leaf" : true, "cls" : "file" } ] } ];
	 */
  menu_tree = new Ext.tree.TreePanel( {
    animate : true,
    enableDD : false,
    icon : 'next.gif',
    loader : new Ext.tree.TreeLoader(),
// lines : false,
    autoScroll : true,
    border : false,
    root : new Ext.tree.AsyncTreeNode( {
      text : 'Autos',
      draggable : false,
      id : 'source',
      icon : 'next.gif',
      children : data
    }),
    rootVisible : false
  });

  menu_tree.on( {
    click : {
      stopEvent : true,
      fn : function(n, e) {
        e.stopEvent();
        if (n.isLeaf()) {
          if (n.id.indexOf('.html') != -1) {
        	  /*
				 * var iframeId = n.text + '_' + n.id; // alert(iframeId); if
				 * (!Ext.get(iframeId)) { var newFrame = tabPanel.add( { xtype :
				 * 'iframepanel', id : iframeId, //title : n.text, loadMask :
				 * true, // frameConfig: {{autoCreate:{id: 'frame1'}},
				 * //optional, give // the frame your own id and name defaultSrc :
				 * n.id, listeners : { domready : function(frame) { // only
				 * raised for "same-origin" // documents // Set the tab Title to
				 * the Document Title var doc = frame.getDocument(); if (doc) {
				 * frame.ownerCt.setTitle(doc.title); } } } });
				 * tabPanel.doLayout(); // if TabPanel is already rendered
				 * tabPanel.setActiveTab(newFrame); }
				 */
            var tab = null;
            var items = tabPanel.find('id', n.id);
            if (items.length > 0) {
              tab = items[0];
            }
            if (tab) {
              tabPanel.setActiveTab(tab);
            } else {
            	// debugger;
            	var autoLoad = {
					url : "/"+n.id,
					scripts : true,
					nocache : true,
					border : false
				};
				tab = new App.TabPagePanel({
					id : n.id,
					autoLoad : autoLoad,
					title : n.text,
					autoScroll : true,
					closable : true,
					// layout : "column",
					border : false
				});
				var p = tabPanel.add(tab);
				tabPanel.tabid = n.id;
			    tabPanel.activate(p);
              /*
				 * new Ext.ux.JSLoader( { url : n.id, onError :
				 * function(options, e) { console.log(e); alert(e.description);
				 * alert('模块加载失败[' + n.id + ']'); } });
				 */
            }
            
          } else {
// console.log("loading " + n.id);
            var tab = null;
            var items = tabPanel.find('id', n.id);
            if (items.length > 0) {
              tab = items[0];
            }
            if (tab) {
              tabPanel.setActiveTab(tab);
            } else {
            	// debugger;
            	var autoLoad = {
								url : "/autoload.jsp?jsurl="+n.id,
								scripts : true,
								nocache : true,
								border : false
							};
							tab = new App.TabPagePanel({
								id : n.id,
								autoLoad : autoLoad,
								title : n.text,
								autoScroll : true,
								closable : true,
								// layout : "column",
								border : false
							});
							var p = tabPanel.add(tab);
							tabPanel.tabid = n.id;
						  tab.jscript=n.id;
			       	tabPanel.activate(p);
              /*
				 * new Ext.ux.JSLoader( { url : n.id, onError :
				 * function(options, e) { console.log(e); alert(e.description);
				 * alert('模块加载失败[' + n.id + ']'); } });
				 */
            }
          }
        }
      }
    }
  });

 
  Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
  var viewport = null;  
  
  UserMenuTreeService.getUserCatInfo(function(data){
// console.log(data);
	  var items = [{title : '功能模块',autoScroll : true,border : false,iconCls : 'settings'}];
	  if(data != null){
		  var catCount = 0;
		  var len = data.length;
		  var lastRootCatId = '';
		  var arrayId = [];
		  var arraycatId = [];
		  var $lastHtmlContent = '';
		  var $lastTemplateId = '';
		  var $lastRootCatName = '';
		  var $lastCatName = '';
		  var $templateId = '';
		  for(var i = 0;i<len;i++){
			  var rootCat = data[i].rootCategory;
			  lastRootCatId = rootCat.id;
			  var rootCatName = rootCat.name;
			  var catItems = '';
			  var $htmlContent = '';
			  var num = 0;
			  if($.inArray(lastRootCatId,arrayId) < 0){
				  arrayId.push(lastRootCatId);
				  for(var j = i;j<len;j++){
					  var catParentId = data[j].category.parentId;
					  var catId = data[j].category.id;
					  var catName = data[j].category.name;
					  if(catParentId == lastRootCatId && ($.inArray(catId,arraycatId) < 0)){
						  arraycatId.push(catId);
						  $htmlContent = '';
						  for(var k = j;k < len;k++){
							  var mod = data[k].module;
							  if(catId == mod.categoryId){
								  var modName = mod.name;
								  var modId = mod.id;
								  var url = mod.url;
								  var modDefaultCls = '5.png';
								  var modCls = mod.clsSetting;
// console.log(modCls);
								  if(modCls != null && modCls != ''){
									  modDefaultCls = modCls;
								  }
								  $htmlContent = $htmlContent + modName + ',' + modId + ',' + url + ',' + modDefaultCls + ':';
							  }
							  
						  }
						  $templateId = data[j].category.templateId;
						  var cls = 'default_second.gif';
						  var clscat = data[j].category.clsSetting;
						  if(clscat != null && clscat != ''){
							  cls = clscat;
						  }
						  catItems = catItems + '<div class="menu_second_div" onclick="navigateContent(\'' + 
					  		$htmlContent + '\',\'' + $templateId + '\',\'' + rootCatName + '\',\'' + catName + '\')"><img src="../image/menu/' + 
					  		cls + '" /><div>' + catName + '</div></div>';
					  }
				  }
			  }
			  if(catItems != ''){
				  catItems = '<div class="menuContainer">' + catItems + '</div>';
				  var itemsPanel = new Ext.Panel({
					  bodyBorder : false,
					  html : catItems,
					  autoScroll : true
				  });
				  var settings = 'settings';
				  var clsSetting = rootCat.clsSetting;
				  if(clsSetting != null && clsSetting != ''){
					  settings = clsSetting;
				  }
				  $lastHtmlContent = $htmlContent;
				  $lastTemplateId = $templateId;
				  $lastRootCatName = rootCatName;
				  $lastCatName = catName;
				  items[catCount] = {title : rootCatName,collapsed:true,autoScroll : true,border : false,iconCls : settings,
						  listeners:{
							  expand : function(){
								  // console.log(this.body.dom.innerHTML)
								  var c = $(this.body.dom.innerHTML).children('div').children('div').children('div').children('div');
								  if($(c[0]) && $(c[0]).triggerHandler)
									  $(c[0]).triggerHandler('click');
// navigateContent($htmlContent,$templateId,rootCatName,$lastCatName);
							  }
						  },
						  items : [itemsPanel]};
// items[catCount].expand(function(){
// alert(1);
// });
				  catCount++;
			  }
		  }
		  items[--catCount].collapsed = false;
	  }
// var items = [{title : data[0].category.name,autoScroll : true,border :
// false,iconCls : 'settings'}];
// items[1] = {title : data[0].category.name,autoScroll : true,border :
// false,iconCls : 'settings'};
	  
	  viewport = new Ext.Viewport( {
		    layout : 'border',
		    items : [ new Ext.BoxComponent( { // raw
		      region : 'north',
		      el : 'north',
		      height : 32
		    }), {
		      region : 'west',
		      id : 'west-panel',
		      title : '菜单',
		      split : true,
		      width : 200,
		      minSize : 175,
		      maxSize : 400,
		      collapseMode:'mini',
		      collapsible : true,
// margins : '0 0 0 5',
		      layout : 'accordion',
		      margins:{left: 10, top: 0, right: 0, bottom: 0},
		      layoutConfig : {
// animate : true,
		    	  titleCollapse: true
// hideCollapseTool : true,
// collapseFirst : true
		      },
		      items : items
		    }, tabPanel,{
		    	region : 'south',
		    	height : 30,
		    	frame : true,
		    	html : '<div style="width:100%;text-align: center;"><span>昆明市卫生信息中心</span><span style="margin-left:10px;">版权所有©2013-2015</span></div>'
		    } ]
		  });
	  navigateContent($lastHtmlContent,$lastTemplateId,$lastRootCatName,$lastCatName);
	  $('.menu_second_div img').hover(function(){
		$(this).attr('style','margin-top:0px;');
		$(this).next('div').attr('style','margin-top:5px;');
		// $(this).attr('style','margin-bottom:20x;');
	  },function(){
		// $(this).attr('style','margin-bottom:10px;');
		$(this).attr('style','margin-top:5px;');
		$(this).next('div').attr('style','margin-top:0px;');
	  });
  });
}
  Ext.BLANK_IMAGE_URL = '/resources/images/default/s.gif';

  var onGotMenuData = function(data) {
    if (data != null && typeof data == 'object') {
      // console.debug(data);
      init(data);
    } else {
      alert("Loading user menu failed.");
    }
  }

  UserMenuTreeService.genUserMenuTree(onGotMenuData);
  var showUserInfo = function(data) {
// console.log(data);
    if ( ! data ) {
      logout();
      return;
    } else {
      Ext.tf.currentUser = data;
      Ext.get('_user_info').dom.innerHTML = "用户：" + data.taxempname;
    }
  }
  UserService.getCurrentUser(showUserInfo);

  // 定时与server通讯，保存永久session哈 :0)
// taskCheckSession = {
// run: checkSession,//执行任务时执行的函数
// interval: 60*1000//任务间隔，毫秒为单位
// }
// Ext.TaskMgr.start(taskCheckSession);//初始化时就启动任务

  TaskService.hasTaskAuth(function(data){
	 if(data.hasauth){
		 $("#_task_info").css("margin",3);
		 TaskService.queryUncompleteTask('curmonth',1,function(data){
			 Ext.get('_task_info').dom.innerHTML = "<a href='javascript:opentaskwindow()'>未完成任务：<span class='badge'>" + data.taskcount+"</span>";
		 })
	 } else{
		 $("#_task_info").css({"margin":5,"color":'red'});
		 Ext.get('_task_info').dom.innerHTML = "<span title='开通联系电话:15752013080!'>未开通任务功能!开通联系电话:15752013080</span>";
	 }
  });
});

function opentaskwindow(){
	window.taskwindow = new Ext.Window({
		closable:true,
		layout :'fit',
		modal:true,
        html:"<iframe id='openwin' src='task.html' scrolling='auto' style='width:100%;height:100%;margin:0;padding:0;border:0;'></iframe>"
	});
	window.taskwindow.show();
	window.taskwindow.maximize();
}

ModuleMgr.register = function(mod) {
	
	/*
	 * var tab = Ext.getCmp(tabPanel.tabid); tab.add(mod); tab.doLayout();
	 */
	if(mod.title)
	mod.title = null;
	if(mod.border)
	mod.border=false;
	// mod.height = '100%';
  // mod.width = Ext.getCmp('tabbody').getActiveTab().getInnerWidth();
  mod.height  = Ext.getCmp('tabbody').getActiveTab().getInnerHeight();
  
  
  // mod.width = '99%';
		Ext.getCmp("tabbody").register(mod);
// if(mod.doLayout){
// mod.doLayout();
// console.log("height===="+mod.height);
// }
	// tabPanel.setActiveTab(tab);
  // var newCmp = tabPanel.add(mod);
  // debugger;
  // newCmp.autoScroll = true,
  // tabPanel.doLayout();
  // tabPanel.setActiveTab(newCmp);
  // return newCmp;
}

var treeArray = new Array();
var count = 0;
function findchildnode(node){
    for(var i=0;i<node.length;i++){  // 从节点中取出子节点依次遍历
        var rootnode = node[i];
        rootnode.expand(true);
// alert(rootnode.text + "---" + rootnode.id + "---" +
// rootnode.childNodes.length);
        if(rootnode.childNodes.length>0){  // 判断子节点下是否存在子节点，个人觉得判断是否leaf不太合理，因为有时候不是leaf的节点也可能没有子节点
// findchildnode(rootnode); //如果存在子节点 递归
        	for(var j = 0;j < rootnode.childNodes.length;j++){
        		var leafNode = rootnode.childNodes[j];
        		if(leafNode.isLeaf()){
        			treeArray[count] = leafNode.id;
        		}else{
        			findchildnode(leafNode);
        		}
        		count++;
        	}
        }
        rootnode.collapse();
    }
}

function idIsExists(id){
	var flag = false;
	for(var i = 0;i < treeArray.length;i++){
		if(treeArray[i] == id){
			flag = true;
			break;
		}
	}
	return flag;
}



function navigateContent($htmlContent,$templateId,$lastRootCatName,$lastCatName){
	// alert($templateId);
	Ext.getCmp('navigateContainerPanel').setTitle("<font color='red'>当前位置：" +　$lastRootCatName + ' >> ' + $lastCatName + '</font>');
// console.log($lastRootCatName + ':' + $lastCatName);
	tabPanel.setActiveTab(0);
	var $ArrayContent = $htmlContent.split(':');
	var modItems = '';
	var flag = true;
	if($templateId == 'fun_mod_template'){
		flag = true;
		modItems = '<div class="div_fun_mod_container">'+
			'<div class="mod fun_mod_01 mod_disable"><img src="../image/menu/4.gif"/><div>功能维护</div><div class="remarks"></div></div>'+
			'<div class="mod fun_mod_02 mod_disable"><img src="../image/menu/8.gif"/><div>功能分组维护</div><div class="remarks"></div></div>'+
			'<div class="mod fun_mod_03 mod_disable"><img src="../image/menu/42.gif"/><div>角色管理</div><div class="remarks"></div></div>'+
			'<div class="mod fun_mod_04 mod_disable"><img src="../image/menu/43.gif"/><div>用户管理</div><div class="remarks"></div></div>'+
			'<div class="mod fun_mod_05 mod_disable"><img src="../image/menu/2.gif"/><div>行政区划维护</div><div class="remarks"></div></div>'+
			'<div class="mod fun_mod_06 mod_disable"><img src="../image/menu/1.gif"/><div>组织机构维护</div><div class="remarks"></div></div>'+
			'<div class="mod fun_mod_07 mod_disable"><img src="../image/menu/45.gif"/><div>出生医学证明初始化</div><div class="remarks"></div></div>'+
			'<div class="mod fun_mod_08 mod_disable"><img src="../image/menu/60.gif"/><div>出生医学证明分配</div><div class="remarks"></div></div>'+
			'<div class="mod fun_mod_09 mod_disable"><img src="../image/menu/score.png"/><div>在线考核</div><div class="remarks"></div></div>'+
			'<div class="mod fun_mod_10 mod_disable"><img src="../image/menu/cache.png"/><div>缓存管理</div><div class="remarks"></div></div>'+
		'</div>';
	}else if($templateId == 'fun_business_child_template'){
		flag = true;
		modItems = '<div class="div_child_business_container div_container">'+
			'<div class="mod child_business_01 mod_disable"><img src="../image/menu/child_business_01.gif"/><div>儿童建册</div><div class="remarks"></div></div>'+
			'<div class="mod child_business_02 mod_disable"><img src="../image/menu/child_business_02.gif"/><div>新生儿家庭访视</div><div class="remarks"></div></div>'+
			'<div class="mod child_business_03 mod_disable"><img src="../image/menu/child_business_03.gif"/><div>1岁以内儿童健康体检</div><div class="remarks"></div></div>'+
			'<div class="mod child_business_04 mod_disable"><img src="../image/menu/child_business_04.gif"/><div>1~2岁儿童健康体检</div><div class="remarks"></div></div>'+
			'<div class="mod child_business_05 mod_disable"><img src="../image/menu/child_business_05.gif"/><div>3~6岁儿童健康体检</div><div class="remarks"></div></div>'+
		'</div>';
	}else if($templateId == 'fun_manage_child_template'){
		flag = true;
		modItems = '<div class="div_container">'+
			'<div class="mod child_manage_01 mod_disable"><img src="../image/menu/child_manage_01.gif"/><div>儿童档案查询</div><div class="remarks"></div></div>'+
			'<div class="mod child_manage_02 mod_disable"><img src="../image/menu/child_manage_02.gif"/><div>高危儿童查询</div><div class="remarks"></div></div>'+
		'</div>';
	}else if($templateId == 'fun_business_female_template'){
		flag = true;
		modItems = '<div class="div_child_business_container div_container">'+
			'<div class="mod female_business_01 mod_disable"><img src="../image/menu/female_business_01.gif"/><div>孕产妇档案</div><div class="remarks"></div></div>'+
			'<div class="mod female_business_02 mod_disable"><img src="../image/menu/female_business_02.gif"/><div>第1次产前随访</div><div class="remarks"></div></div>'+
			'<div class="mod female_business_03 mod_disable"><img src="../image/menu/female_business_03.gif"/><div>第2~5次产前随访</div><div class="remarks"></div></div>'+
			'<div class="mod female_business_04 mod_disable"><img src="../image/menu/female_business_04.gif"/><div>产后访视记录</div><div class="remarks"></div></div>'+
			'<div class="mod female_business_05 mod_disable"><img src="../image/menu/female_business_05.gif"/><div>产后42天随访</div><div class="remarks"></div></div>'+
		'</div>';
	}else if($templateId == 'fun_manage_female_template'){
		flag = true;
		modItems = '<div class="div_female_manage_container div_container">'+
			'<div class="mod female_manage_01 mod_disable"><img src="../image/menu/female_manage_01.gif"/><div>孕产妇档案查询</div><div class="remarks"></div></div>'+
			'<div class="mod female_manage_02 mod_disable"><img src="../image/menu/female_manage_02.gif"/><div>高危孕产妇查询</div><div class="remarks"></div></div>'+
			'<div class="mod female_manage_03 mod_disable"><img src="../image/menu/female_manage_03.gif"/><div>分娩记录</div><div class="remarks"></div></div>'+
			'<div class="mod female_manage_04 mod_disable"><img src="../image/menu/female_manage_04.gif"/><div>终止妊娠</div><div class="remarks"></div></div>'+
			'<div class="mod female_manage_05 mod_disable"><img src="../image/menu/female_manage_05.gif"/><div>特殊情况记录</div><div class="remarks"></div></div>'+
		'</div>';
	}else if($templateId == 'fun_birth_female_template'){
		flag = true;
		modItems = '<div class="div_container">'+
			'<div class="mod child_birth_01 mod_disable"><img src="../image/menu/child_birth_01.gif"/><div>出生医学证明使用</div><div class="remarks"></div></div>'+
			'<div class="mod child_birth_02 mod_disable"><img src="../image/menu/child_birth_02.gif"/><div>出生医学证明查询</div><div class="remarks"></div></div>'+
		'</div>';
	}else if($templateId == 'fun_ill_template'){
		flag = true;
		modItems = '<div class="div_container">'+
			'<div class="mod child_ill_01 mod_disable"><img src="../image/menu/child_ill_01.gif"/><div>预防接种卡</div><div class="remarks"></div></div>'+
			'<div class="mod child_ill_02 mod_disable"><img src="../image/menu/child_ill_02.gif"/><div>预防免疫程序</div><div class="remarks"></div></div>'+
		'</div>';
	}else if($templateId == 'fun_mxb_template'){
		flag = true;
		modItems = '<div class="div_mxb_container div_container">'+
			'<div class="mod mxb_01 mod_disable"><img src="../image/menu/mxb_01.gif"/><div>高血压档案</div><div class="remarks"></div></div>'+
			'<div class="mod mxb_02 mod_disable"><img src="../image/menu/mxb_02.gif"/><div>2型糖尿病档案</div><div class="remarks"></div></div>'+
// '<div class="mod mxb_03 mod_disable"><img
// src="../image/menu/mxb_03.gif"/><div>重性精神病档案</div><div
// class="remarks"></div></div>'+
			'<div class="mod mxb_04 mod_disable"><img src="../image/menu/mxb_04.gif"/><div>高血压患者随访</div><div class="remarks"></div></div>'+
			'<div class="mod mxb_05 mod_disable"><img src="../image/menu/mxb_05.gif"/><div>2型糖尿病患者随访</div><div class="remarks"></div></div>'+
// '<div class="mod mxb_06 mod_disable"><img
// src="../image/menu/mxb_06.gif"/><div>重性精神病患者随访</div><div
// class="remarks"></div></div>'+
// '<div class="mod mxb_07 mod_disable"><img
// src="../image/menu/mxb_07.gif"/><div>重性精神病个人信息补充</div><div
// class="remarks"></div></div>'+
		'</div>';
	}else if($templateId == 'fun_zzjsb_template'){
		flag = true;
		modItems = '<div class="div_zzjsb_container div_container">'+
			'<div class="mod mxb_03 mod_disable"><img src="../image/menu/mxb_03.gif"/><div>重性精神病档案</div><div class="remarks"></div></div>'+
			'<div class="mod mxb_06 mod_disable"><img src="../image/menu/mxb_06.gif"/><div>重性精神病患者随访</div><div class="remarks"></div></div>'+
			'<div class="mod mxb_07 mod_disable"><img src="../image/menu/mxb_07.gif"/><div>重性精神病个人信息补充</div><div class="remarks"></div></div>'+
		'</div>';
	}else if($templateId == 'fun_crb_template'){
		flag = true;
		modItems = '<div class="div_container">'+
			'<div class="mod crb_01 mod_disable"><img src="../image/menu/crb_01.gif"/><div>传染病报告卡</div><div class="remarks"></div></div>'+
		'</div>';
	}else if($templateId == 'fun_statistic_template'){
		flag = true;
		modItems = '<div class="div_statistic_container div_container">'+
			'<div class="mod statistic_01 mod_disable"><img src="../image/menu/statistic_01.gif"/><div>操作人员汇总统计</div><div class="remarks"></div></div>'+
			'<div class="mod statistic_02 mod_disable"><img src="../image/menu/statistic_02.gif"/><div>医疗机构汇总统计</div><div class="remarks"></div></div>'+
			'<div class="mod statistic_03 mod_disable"><img src="../image/menu/statistic_03.gif"/><div>高级查询汇总统计</div><div class="remarks"></div></div>'+
			'<div class="mod statistic_04 mod_disable"><img src="../image/menu/statistic_04.gif"/><div>按年汇总统计</div><div class="remarks"></div></div>'+
			'<div class="mod statistic_05 mod_disable"><img src="../image/menu/statistic_05.gif"/><div>按月汇总统计</div><div class="remarks"></div></div>'+
			'<div class="mod statistic_06 mod_disable"><img src="../image/menu/statistic_06.gif"/><div>按日汇总统计</div><div class="remarks"></div></div>'+
			'<div class="mod statistic_07 mod_disable"><img src="../image/menu/statistic_07.gif"/><div>按区县统计</div><div class="remarks"></div></div>'+
		'</div>';
	}else if($templateId == 'fun_personInfo_template'){
		flag = true;
		modItems = '<div class="div_container">'+
			'<div class="mod personInfo_01 mod_disable"><img src="../image/menu/personInfo_01.gif"/><div>个人健康记录索引</div><div class="remarks"></div></div>'+
		'</div>';
	}
//	else if($templateId == 'fun_complex_template'){
//		flag = true;
//		modItems = '<div class="div_container">'+
//			'<div class="mod complex_01 mod_disable"><img src="../image/menu/complex_01.gif"/><div>出生医学证明查询</div><div class="remarks"></div></div>'+
//			'<div class="mod complex_02 mod_disable"><img src="../image/menu/complex_02.gif"/><div>高危儿童档案查询</div><div class="remarks"></div></div>'+
//			'<div class="mod complex_03 mod_disable"><img src="../image/menu/complex_03.gif"/><div>高危孕产妇档案查询</div><div class="remarks"></div></div>'+
//			'<div class="mod complex_04 mod_disable"><img src="../image/menu/complex_04.gif"/><div>HIV和梅毒项目统计</div><div class="remarks"></div></div>'+
//		'</div>';
//	}
	
	else if($templateId == 'fun_clinics_template'){
		flag = true;
		modItems = '<div class="div_container">'+
			'<div class="mod clinics_01 mod_disable"><img src="../image/menu/clinics_01.gif"/><div>接诊记录</div><div class="remarks"></div></div>'+
			'<div class="mod clinics_02 mod_disable"><img src="../image/menu/clinics_02.gif"/><div>会诊记录</div><div class="remarks"></div></div>'+
			'<div class="mod clinics_03 mod_disable"><img src="../image/menu/clinics_03.gif"/><div>双向转诊记录</div><div class="remarks"></div></div>'+
			'<div class="mod clinics_04 mod_disable"><img src="../image/menu/clinics_04.gif"/><div>双向转诊回转记录</div><div class="remarks"></div></div>'+
		'</div>';
	}else if($templateId == 'fun_transfer_template'){
		flag = true;
		modItems = '<div class="div_transfer_container div_container">'+
			'<div class="mod transfer_01 mod_disable"><img src="../image/menu/transfer_01.gif"/><div>档案转移审核及查询</div><div class="remarks"></div></div>'+
			'<div class="mod transfer_02 mod_disable"><img src="../image/menu/transfer_02.gif"/><div>档案提交申请查询</div><div class="remarks"></div></div>'+
			'<div class="mod transfer_03 mod_disable"><img src="../image/menu/transfer_03.gif"/><div>档案注销查询</div><div class="remarks"></div></div>'+
		'</div>';
	}else if($templateId == 'fun_health_template'){
		flag = true;
		modItems = '<div class="div_health_container div_container">'+
			'<div class="mod health_01 mod_disable"><img src="../image/menu/health_01.gif"/><div>居民健康档案</div><div class="remarks"></div></div>'+
			'<div class="mod health_02 mod_disable"><img src="../image/menu/health_02.gif"/><div>儿童健康档案管理</div><div class="remarks"></div></div>'+
			'<div class="mod health_03 mod_disable"><img src="../image/menu/health_03.gif"/><div>孕产妇档案管理</div><div class="remarks"></div></div>'+
			'<div class="mod health_04 mod_disable"><img src="../image/menu/health_04.gif"/><div>老年人档案</div><div class="remarks"></div></div>'+
			'<div class="mod health_05 mod_disable"><img src="../image/menu/mxb_01.gif"/><div>高血压档案</div><div class="remarks"></div></div>'+
			'<div class="mod health_06 mod_disable"><img src="../image/menu/mxb_02.gif"/><div>2型糖尿病档案</div><div class="remarks"></div></div>'+
			'<div class="mod health_07 mod_disable"><img src="../image/menu/mxb_03.gif"/><div>重性精神病档案</div><div class="remarks"></div></div>'+
			'<div class="mod health_08 mod_disable"><img src="../image/menu/mxb_03.gif"/><div>居民健康档案及健康体检记录打印</div><div class="remarks"></div></div>'+
		'</div>';
	}else if($templateId == 'fun_sms_template'){
		flag = true;
		modItems = '<div class="div_sms_container div_container">'+
			'<div class="mod sms_01 mod_disable"><img src="../image/menu/sms_01.png"/><div>电话提取规则</div><div class="remarks"></div></div>'+
			'<div class="mod sms_02 mod_disable"><img src="../image/menu/sms_02.png"/><div>短信发送规则</div><div class="remarks"></div></div>'+
			'<div class="mod sms_03 mod_disable"><img src="../image/menu/sms_03.png"/><div>已发短信汇总</div><div class="remarks"></div></div>'+
			'<div class="mod sms_04 mod_disable"><img src="../image/menu/sms_04.png"/><div>短信发布</div><div class="remarks"></div></div>'+
			'<div class="mod sms_05 mod_disable"><img src="../image/menu/sms_05.png"/><div>系统自动短信审核</div><div class="remarks"></div></div>'+
			'<div class="mod sms_06 mod_disable"><img src="../image/menu/sms_06.png"/><div>短信常用语维护</div><div class="remarks"></div></div>'+
			'<div class="mod sms_07 mod_disable"><img src="../image/menu/sms_07.png"/><div>电话号码维护</div><div class="remarks"></div></div>'+
		'</div>';
	}else{
		flag = false;
		var modItems = '<div class="navigateContainerOther">';
		
		for(var i=0;i<$ArrayContent.length;i++){
			var str = $ArrayContent[i];
			// console.log(str)
			if(str.trim() != ''){
				var arrayStr = str.split(',');	
				modItems = modItems + '<div class="modContainer"><div class="modother" onclick="toUrl(\'' + arrayStr[1] 
			  		+ '\',\'' + arrayStr[0] + '\',\'' + arrayStr[2] + '\')" id="\'' + arrayStr[2] + 
			  		'\'"><img src="../image/menu/' + arrayStr[3] + '" width="100px" height="100px"/><br/><a>' + arrayStr[0] + '</a></div></div>';
			}
		}
		modItems = modItems + '</div>';
	}
	// alert(modItems)
	$('.navigateContainer').html(modItems);
	if(flag){
		for(var i=0;i<$ArrayContent.length;i++){
			var str = $ArrayContent[i];
			if(str.trim() != ''){
				var arrayStr = str.split(',');	
				$('.' + arrayStr[3]).removeClass('mod_disable');
				$('.' + arrayStr[3] + ' .remarks').html(str);
				$('.' + arrayStr[3]).click(function(){
					var array = $(this).children('.remarks').html().split(',');	
					toUrl(array[1],array[0],array[2]);
				});
			}
		}
	}
	$('.mod').hover(function(){
		var attr = $(this).attr('class');
// console.log(attr.indexOf('mod_disable'));
		if(attr.indexOf('mod_disable') < 0){
			var X = parseInt( $(this).css('marginLeft') ) + 10;
			var Y = parseInt( $(this).css('marginTop') ) - 10;
			$(this).attr('style','margin-left:' + X + 'px;margin-top:' + Y + 'px;');
			$(this).addClass('mod_hover');
		}
	},function(){
		var attr = $(this).attr('class');
		if(attr.indexOf('mod_disable') < 0){
			var X = parseInt( $(this).css('marginLeft') ) - 10;
			var Y = parseInt( $(this).css('marginTop') ) + 10;
			$(this).attr('style','margin-left:' + X + 'px;margin-top:' + Y + 'px;');
			$(this).removeClass('mod_hover');
		}
	});
// $('.navigateContainer').html(modItems);
	
}

function showError(msg){
	Ext.Msg.show({
		title : '错误',
		msg : msg,
		buttons : Ext.Msg.OK,
		animEl: 'elId',
		icon: Ext.MessageBox.ERROR
	});
}

function toUrl(modId,modName,url){
    if (url.indexOf('.html') != -1) {
    	var tab = null;
        var items = tabPanel.find('id', url);
        if (items.length > 0) {
          tab = items[0];
        }
        if (tab) {
          tabPanel.setActiveTab(tab);
        } else {
        	// debugger;
			if(url.indexOf("easyui")==0){
	    		url = url.substr(6);
	    		tab = new Ext.ux.panel.ManagedIframe({
					id : url,
					defaultSrc : url,
					title : '',
					loadMask : true,
					title : modName,
					autoScroll : false,
					closable : true,
					border : false
				});
	    	}else{
	    		var iframeId = modName + '_' + url;
			    if (!Ext.get(iframeId)) {
			    	tab =  new Ext.ux.ManagedIframePanel({
			         xtype : 'iframepanel',
			         id : iframeId,
			         loadMask : true,
			         defaultSrc : url,
			         listeners : {
			           domready : function(frame) { // only raised for
													// "same-origin"
			             var doc = frame.getDocument();
			             if (doc) {
			               frame.ownerCt.setTitle(doc.title);
			             }
			           }
			         }
			       });
			    }
	    	}
			var p = tabPanel.add(tab);
			tabPanel.tabid = url;
		    tabPanel.activate(p);
        }
    } else {
      var tab = null;
      var items = tabPanel.find('id', url);
      if (items.length > 0) {
        tab = items[0];
      }
      if (tab) {
        tabPanel.setActiveTab(tab);
      } else {
      	var autoLoad = {
			url : "/autoload.jsp?jsurl="+url,
			scripts : true,
			nocache : true,
			border : false
		};
		tab = new App.TabPagePanel({
			id : url,
			autoLoad : autoLoad,
			title : modName,
			autoScroll : true,
			closable : true,
			// layout : "column",
			border : false
		});
		var p = tabPanel.add(tab);
		tabPanel.tabid = url;
		tab.jscript=url;
		tab.modId = modId;
		window.global_modId =modId; 
       	tabPanel.activate(p);
        /*
		 * new Ext.ux.JSLoader( { url : n.id, onError : function(options, e) {
		 * console.log(e); alert(e.description); alert('模块加载失败[' + n.id + ']'); }
		 * });
		 */
      }
    }
}

function modifyPassword(){
	var panel = new Ext.form.FormPanel({
		frame : true,
		width : "300px",
		height: "130px",
		labelWidth : 55,
		labelAlign : 'right',
		items : [{
			xtype : 'textfield',
			inputType : 'password',
			name : 'oldPassword',
			fieldLabel : '旧密码',
			id : 'oldPassword',
			width : 200
		},{
			xtype : 'textfield',
			inputType : 'password',
			name : 'newPassword',
			fieldLabel : '新密码',
			id : 'newPassword',
			width : 200
		},{
			xtype : 'textfield',
			inputType : 'password', 
			name : 'sureNewPassword',
			fieldLabel : '确认密码',
			id : 'sureNewPassword',
			width : 200
		}],
		buttons : [{
			text : '修改',
			handler : function(){
				var oldPassword = Ext.getDom('oldPassword').value;
				var newPassword = Ext.getDom('newPassword').value;
				var sureNewPassword = Ext.getDom('sureNewPassword').value;
				if(newPassword != sureNewPassword){
					showError('新输入的两次密码不一致！');
				}else{
					UserService.modifyPassword(oldPassword,newPassword,function(data){
						if(data){
							Ext.Msg.show({
								title : '错误',
								msg : '修改成功',
								buttons : Ext.Msg.OK,
								animEl: 'elId',
								icon: Ext.MessageBox.INFO
							});
							win.close();
						}else{
							showError('旧密码错误！');
							
						}
					})
				}
			}
		},{
			text : '关闭',
			handler : function(){
				win.close();
			}
		}]
	});
	
	var win = new Ext.Window({
		height: 160,
		title : '修改密码',
		width : 300,
		draggable:false,
		resizable:false,
		modal:true,
		items : [panel]
	});
	win.show();
}

function getTreeData(orgid,name){
	var treenodes = [];
	var ret = {};
	var nodes = [];
	var nodemap = {};
// console.log('orgid',orgid);
	var data = AlldistrictMap[orgid];
// CommonExamService.getDistrict(orgid,{callback:function(data){
		if(data){
			for( var i=0 ; i< data.length;i++){
				var treenode = {
					"id": data[i].id,   
					"text": data[i].name,   
					'attributes':data[i],
					'leaf':data[i].isDetail,
					'data':data[i],
					'cls': data[i].isDetail?'file':"folder"
				};
				if(!data[i].isDetail){
					treenode.state = 'closed';
					var subret = getTreeData(data[i].id,data[i].name);
					for(var nod in subret.nodemap){
						nodemap[nod] = subret.nodemap[nod];
					}
					nodes = nodes.concat(subret.nodes);
					treenode.children = subret.treenodes;
					treenode.attributes
				}else{
					var node = {
						"value": data[i].id,   
						"name": data[i].name,   
						"parent":name
					};
					nodemap[data[i].id] = node;
					nodes[nodes.length]=node;
				}
				treenodes[treenodes.length]=treenode;
			}
		}
// },async:false});
	ret.nodes = nodes;
	ret.nodemap = nodemap;
	ret.treenodes = treenodes;
	return ret;
}
function serializeObject(params){  
	console.log(params);
    var obj={};  
    $.each(params,function(index,param){  
       obj[param.name]=param.value;  
    });  
    return obj;  
};  
$(function(){
	CommonExamService.getDistrictMap({callback:function(data){
		window.districtMap = data;
	},async:false});
	CommonExamService.getCurrentRoot({callback:function(data){
		window.currentid = data;
	},async:false});
	CommonExamService.getAllDistrict({callback:function(data){
		window.AlldistrictMap = data;
		var ids = currentid.split(',');
		window.districtdata = {nodemap: {},nodes: [],treenodes: []}
		for(var i=0 ; i<ids.length;i++){
			var nodedata = getTreeData(ids[i]);
			window.districtdata.treenodes = window.districtdata.treenodes.concat( nodedata.treenodes);
			window.districtdata.nodes = window.districtdata.nodes.concat( nodedata.nodes);
			window.districtdata.nodemap = $.extend(window.districtdata.nodemap,  nodedata.nodemap);
		}
	},async:false});
	window.earyuitreedata = window.districtdata.treenodes;
	CommonExamService.getCurrentOrgList({callback:function(data){
		window.orgList = data;
	},async:false});
	CommonExamService.getPersonMap({callback:function(data){
		window.orgPersonList = data;
	},async:false});
	var needquest = true;
	DataExportService.getQuestionsByOrg({callback:function(data){
		console.log(data);
		needquest = data.needquest;
	},async:false});
	if(needquest){
		var questionswin = new Ext.Window({
		    modal: true,
		    title: '公卫平台网络情况问卷调查',
		    width:600,
		    height:540,
		    border: false,
		    closable :false,
		    layout:'fit',
		    items: [
		            { 
		            xtype:'form',
		            id:'questionform',
		    	    border: false,
		    	    closable :false,
		    	    layout:'table',
		    	    baseCls :"question x-window",
		    	    defaults: {
		    	        // applied to each contained panel
		    	    },
		    	    layoutConfig: {
		    	        // The total column count must be specified here
		    	        columns: 2,
		    	    },
		    	    items: [
						{
						    html: '<b><font color="red">提示</font>：请认真填写以下内容，如有不清楚的地方请和您所在机构的系统管理员联系后填写，以下内容将汇报至卫生局。每个机构仅需1人填写，1人填写完毕后其他人将不再显示（已显示的刷新页面或重新登录即可）。</b>',
						    baseCls :'texts x-panel',
						    colspan:2
						},
			    	    {
			    	        html: '<b>宽带运营商：</b>',
			    	        baseCls :'head x-panel',
			    	    },{
			    	    	 baseCls :'texts x-panel',
			    	        html:   '<input type="radio" id="nettype02" name="nettype" value="电信"><label for="nettype02">电信宽带</label>  '+
					    	        '<input type="radio" id="nettype03" name="nettype" value="联通"><label for="nettype03">联通宽带</label>  '+
					    	        '<input type="radio" id="nettype04" name="nettype" value="移动"><label for="nettype04">移动宽带</label>  '+
					    	        '<input type="radio" id="nettype05" name="nettype" value="铁通"><label for="nettype05">铁通宽带</label>  '+
			    	        		'<input type="radio" id="nettype06" name="nettype" value="爱普"><label for="nettype06" >爱普宽带</label>  '+
			    	        		'<input type="radio" id="nettype07" name="nettype" value="长城"><label for="nettype07">长城宽带</label>  '
			    	    },{
			    	        html: '<b>宽带速度：</b>',
			    	        baseCls :'head x-panel'
			    	    },{
			    	    	 baseCls :'texts x-panel',
			    	    	layout:'fit',
			    	        html:   '<input type="radio" id="netspeed02" name="netspeed" value="2"><label for="netspeed02">2M</label>  '+
					    	        '<input type="radio" id="netspeed03" name="netspeed" value="4"><label for="netspeed03">4M</label>  '+
					    	        '<input type="radio" id="netspeed04" name="netspeed" value="6"><label for="netspeed04">6M</label>  '+
					    	        '<input type="radio" id="netspeed05" name="netspeed" value="8"><label for="netspeed05">8M</label>  '+
			    	        		'<input type="radio" id="netspeed06" name="netspeed" value="10"><label for="netspeed06">10M</label>  '+
			    	        		'<input type="radio" id="netspeed07" name="netspeed" value="20"><label for="netspeed07">20M</label>  '+
			    	        		'<input type="radio" id="netspeed08" name="netspeed" value="40"><label for="netspeed08">40M</label>  '+
			    	        		'<input type="radio" id="netspeed09" name="netspeed" value="60"><label for="netspeed09">60M</label>  '+
			    	        		'<input type="radio" id="netspeed10" name="netspeed" value="80"><label for="netspeed10">80M</label>  '+
			    	        		'<input type="radio" id="netspeed11" name="netspeed" value="100"><label for="netspeed11">100M</label>  '+
			    	        		'<input type="radio" id="netspeed12" name="netspeed" value="150"><label for="netspeed12">大于100兆</label>  '
			    	    },{
			    	        html: '<b>宽带使用人数：</b>',
			    	        baseCls :'head x-panel'
			    	    },{
			    	    	 baseCls :'texts x-panel',
			    	    	layout:'fit',
			    	        html:   '<input type="radio" id="usernum02" name="usernum" value="5"><label for="usernum02">少于10人</label>  '+
					    	        '<input type="radio" id="usernum03" name="usernum" value="15"><label for="usernum03">10-20人</label>  '+
					    	        '<input type="radio" id="usernum04" name="usernum" value="25"><label for="usernum04">20-30人</label>  '+
					    	        '<input type="radio" id="usernum05" name="usernum" value="35"><label for="usernum05">30-40人</label>  '+
			    	        		'<input type="radio" id="usernum06" name="usernum" value="75"><label for="usernum06">50-100人</label>  '+
			    	        		'<input type="radio" id="usernum07" name="usernum" value="1000"><label for="usernum07">大于100人</label>  '
			    	    },{
			    	        html: '<b>公卫平台<br>使用速度：</b>',
			    	        baseCls :'head x-panel'
			    	    
			    	    },{
			    	    	baseCls :'texts x-panel',
			    	    	layout:'fit',
			    	        html:   '<input type="radio" id="usespeed02" name="usespeed" value="非常快"><label for="usespeed02">非常快</label>  '+
					    	        '<input type="radio" id="usespeed03" name="usespeed" value="快"><label for="usespeed03">快</label>  '+
					    	        '<input type="radio" id="usespeed04" name="usespeed" value="慢"><label for="usespeed04">慢</label>  '+
					    	        '<input type="radio" id="usespeed05" name="usespeed" value="非常慢"><label for="usespeed05">非常慢</label>  '
			    	    }],
			    	buttons:[
			    	         {
								text:'提交',
								style:{width:"200px"},
								formBind: true,
								id:"question_submit",
								handler:function(){
									if(valid.form()){
										console.log(serializeObject($("#questionform form").serializeArray()));
										DataExportService.saveQuestion(serializeObject($("#questionform form").serializeArray()) ,{callback:function(data){
											console.log(data);
											if(data && data.saved){
												// 用户对话框，用一个回调函数处理结果:
												Ext.Msg.alert('问卷调查', '提交成功!确定后关闭!', function(btn, text){
												    if (btn == 'ok'){
												    	questionswin.close();
												    }
												});
											}else{
												if(!data.saved && data.msg){
													Ext.Msg.alert('问卷调查', '保存失败!'+data.msg);
												}else{
													Ext.Msg.alert('问卷调查', '保存失败!系统错误,请与系统管理员联系!');
												}
											}
										},async:false});
									}
								}
							},{
								text:'稍后填写',
								style:{width:"200px"},
								formBind: true,
								handler:function(){
									if(valid.form()){
										questionswin.close();
									}
								}
							}]
		          }
		        ]
		  });
	
		questionswin.show();
		
		var valid = $("#questionform form").validate({
	        rules: {
	        	nettype:{
	        		required : true
	        	},
	        	netspeed:{
	        		required : true
	        	},
	        	usernum:{
	        		required : true
	        	},
	        	usespeed:{
	        		required : true
	        	}
			  },
	        messages: {
	        	nettype: {
	        		required : "请选择宽带运营商"
	        	},
	        	netspeed: {
	        		required : "请选择宽带速度"
	        	},
	        	usernum: {
	        		required : "请选择使用人数"
	        	},
	        	usespeed: {
	        		required : "请选择公卫平台使用速度"
	        	}
			  },
			  description : {
				  nettype : {
			            required : '<div class="error">Required</div>',
			            pattern : '<div class="error">Pattern</div>',
			            conditional : '<div class="error">Conditional</div>',
			            valid : '<div class="success">Valid</div>'
			        }
			    }
	    });
	}
	
});
