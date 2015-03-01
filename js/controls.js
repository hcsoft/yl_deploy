function ns(ns){
     if (! window[ns]){
         window[ns] = {}
     }
     return window[ns];
}

if (!window['console'])
{
    window['console'] = {
    log:function(){},
    error : function(){}
    }
}


(function(){

var hudHtml = 
'<div id="hud" class="formError userformError" style="position:absolute; opacity: 0.9; display:none">'
    + '<div class="formErrorContent">'
    +   ' * This field is required<br>'
    +   ' * No special caracters allowed<br>'
    + '</div>'
    + '<div class="formErrorArrow">'
  + '      <div class="line10"><!-- --></div> '
  + '      <div class="line9"><!-- --></div>'
  + '      <div class="line8"><!-- --></div>'
  + '      <div class="line7"><!-- --></div>'
  + '      <div class="line6"><!-- --></div>'
  + '      <div class="line5"><!-- --></div>'
  + '      <div class="line4"><!-- --></div>'
  + '      <div class="line3"><!-- --></div>'
  + '      <div class="line2"><!-- --></div>'
  + '      <div class="line1"><!-- --></div>'
  + '  </div> </div>';

function showHUD($t, msg, isError) {
    var $hud =  $t.data("hud");
    if (! $hud)
        $hud = $(hudHtml).appendTo('body');
    if (isError) {
        $hud.addClass("no-op-err");
    }
    var pos = $t.position();        
    $('.formErrorContent', $hud).html(msg);
    var selfH = $hud.outerHeight(); 
    $hud.css({ top: pos.top - selfH, left: pos.left})
    .show();
    if (!isError) $hud.click(function(){
        hideHUD($t, true);
        $t.focus();
    });

    $t.data("hud", $hud);

    /*$('body').one('click', function(){
        $hud.remove();
        $t.focus();
        $t.removeData("hud");
    })
    */
}

function hideHUD($t, includeError){
    var h = $t.data("hud");
    if (h) {
        if (h.hasClass('no-op-err') && !includeError) return;
        else {
            h.remove();
            $t.removeData("hud");
        }
    }
}



        var med = ns("med");
        var controls = {};

        med.registerCtrl = function(k, constructor){
            controls[k] = constructor;
        }

        med.getCtrl = function(k){
            return controls[k];
        }

        med.buildControl = function(type, setting, c, fieldName){
           var ctor = med.getCtrl(type); 
           return ctor(c, setting, fieldName);
        }
				
				
		
        function Grid(c, setting, fieldName){
            var val;
            var valChangeListener;
            var data = [];
            var eleStr = "";
            var ele;
            var ctrls = [];
            function buildHeader(){
                return  '<tr>' + 
                   $.map(setting.displayColNames,function(v){
                       return '<td class="gHeader">' + v + '</td>'; 
                   }).join("")
                   + '<td><button class="add gBtn">添加新行</button></td>'
                   + '</tr>';
            }
            
            function buildTr(name){
            	if(name){
            		return  '<tr>' + 
	                   $.map(setting.displayCols,function(v){
	                       return '<td class=""></td>'; 
	                   }).join("")
	                   + '<td></td>'
	                   + '</tr>';
            	}else{
	               return  '<tr>' + 
	                   $.map(setting.displayCols,function(v){
	                       return '<td class=""></td>'; 
	                   }).join("")
	                   + '<td><button class="del gBtn">删除</button></td>'
	                   + '</tr>';
            	}
            }
            
            

            function removeRow(e){
                var tobeDel = $(e.target).closest('tr');
                var prev = tobeDel.prev();
                var next = tobeDel.next();
                var idx = tobeDel.get(0).rowIndex; //warning , 1-based!! table has a header row!
                ctrls.splice((idx -1),1);
                tobeDel.remove();
                var focus = next.length > 0 ? next : prev; 
                $(":input", focus).first().focus();
                
            }

            function initRow(v,params){
                var cs = [];
                $("td", v).each(function(idx, td){
                    if (idx != setting.displayCols.length) { //todo optimise
                        var colCfg = setting.colSettings ? setting.colSettings[idx] : {}; //todo bad!!
//                        console.log(setting.colXtypes[idx]);
//                        console.log(colCfg);
//                        console.log($(td));
                        var ctrl = med.buildControl(setting.colXtypes[idx], colCfg, $(td), "");
                        if(params){
                        	for(var name in params){
		                        if(name && params[name] && setting.displayCols[idx] ==name){
		                        	ctrl.val(params[name]);                      	
		                        }
                        	}
                        }
                        cs.push(ctrl);
                    }
                });
                $('.gBtn', v).css("cursor", "pointer");
                $('.del', v).click(removeRow);
                return cs;
            }
            
 
            function addNewLine(params){
                var row = buildTr();
                var $row = $(row);
                $row.appendTo(ele);
                if(params){
                	ctrls.push(initRow($row,params));
                }else{
                	ctrls.push(initRow($row));
                }
                $(":input", $row).first().focus();
                return $row;
            }
            
            

           var trs ="";
           if (data) {
               trs = $.map(data, function(v, i){
                   return buildTr();
                }).join("");
           }
           var header = "";

           header = buildHeader();
           var displayCss = setting.disabled ? "display:none;" : "";
           ele = $("<table class='tgrid' style='" + displayCss + "'>" + header +  trs + "</table>");
           c.empty().append(ele);
           ele.keydown(function(e){
                   if($(e.target).hasClass("add")) return;

                   if (e.which == 40){
                        addNewLine();
                   }

                   if (e.which == 46 && e.ctrlKey) {
                        removeRow.apply(e.target,[e]);         
                   }
           });

            $('.gBtn', ele).css("cursor", "pointer");

            $('.add', ele).click(function(e){
                    addNewLine();
            });

            $("tr", ele).each(function(i,v){
                    if (i != 0) {
                        initRow(v);
                    }
            });

            function itemCheck(v){
                return function(colKey, idx) {
					if (colKey != null){ //null作为required key 的占位符
						var val = v[colKey];
						var vRes = [];
						//代码重复 app.js
						if ( typeof val == 'undefined' || val == null || val == ''){
							vRes.push( { col: idx, msg : setting.displayColNames[idx]} ); 
						}
						if (vRes.length > 0 ){
							return vRes;
						} else {
							return null;
						}
					} ;
                }
            }

            function check(v,i) {
                var ic = $.map(setting.required, itemCheck(v));
                if (ic.length > 0){
                    return { line: i, 
                        res : ic
                    };
                }

            }

            function val(v) {
                if (arguments.length == 0){
                 return $.map(ctrls, function(v){
                    var res = {};
                    $.each(setting.displayCols, function(i, key){
                        res[key] = v[i]['val'] ? v[i].val() : ""; //buggy?
                    })
                    return res;
                 });
                } else {
                    if ($.isArray(v)){
                        $.each(v,function(i, d){
                            addNewLine();
                            $.each(setting.displayCols, function(_i, key){
                                var ctrl = ctrls[i][_i];
                                if (ctrl['val']){
                                    ctrl.val(d[key]);
                                }
                            });
                        }); //each
                      } //isArray
                 } //else 
            }
            
            if(setting.other_init_param){
            	addNewLine(setting.other_init_param);
            }
            
            return {
                enable : function(effect){
                	ele.attr("disabled", false);
                    ele.removeClass("hidden");
                    ele.attr('style','display:inline;');
//                    caption.removeClass('hidden');
                    if (effect) {
                        ele.addClass("required");
                    }
                },
                disable : function(effect){
                	ele.attr("disabled", true);
                    ele.addClass("hidden");
                    ele.attr('style','display:none;');
                    //caption.addClass('hidden');
                    if (effect) {
                        ele.removeClass("required");
                    }
                },
//                disable : function(){},
                valChanged : function(f) {
                    valChangeListener = f;
                },
                val : val, 
                reset : function() {
                    ctrls = [];    
                    $('tr', ele).not(':first').remove();
                    if(setting.other_init_param){
                    	addNewLine(setting.other_init_param);
                    }
                },
                isComposite : true ,
                checkRequired : function(v) {
                    var tobeChecked = v;
                    if (!tobeChecked) tobeChecked = val();
                    if (setting.required) {
                        return  $.map(tobeChecked, check);
                    } else {
                        return [];
                    }
                }
            }//return

        }
        Grid.isComposite = true ;
        //static method get ds-meta-infor from children controls
        Grid.getChildDSes = function(setting){
            return $.map(setting.colSettings, function(v){
                   var ds = v['ds'];
                   if (ds) {
                        return ds;
                   }
            });
        }
        


       function Input(c,setting, fieldName,cfg){
            var val;
            var attr = "";
            var valChangeListener;
            if (setting.maxlen) {
                attr += " maxlength=" + setting.maxlen;
            }
            if (setting.size) {
                attr += " size=" + setting.size + " ";
            }
            if (setting.disabled) {
                attr += " disabled=" + setting.disabled;
            }
            if (setting.width) {
                attr += ' style="width:' + setting.width + 'px" ';
            }
            if (setting.readonly) {
                attr += " disabled='true' style='background-color:WHITESMOKE;border:1px solid WHITESMOKE' ";
            }
            var ele;
            var units = setting.inputUnits ? '<span>' + setting.inputUnits + '</span>' : '';
            if ( setting.asLabel){
                ele = $('<span></span>');
            } else if (! setting.multiline) {
                ele = $('<input type="text" class="ie6input" '  + attr +  '></input>' + units);
            } else {
                ele = $('<textarea id="' + fieldName + '" class="ie6input" '  + attr + '></textarea>' + units);
            }
            
            c.empty().append(ele);

            var caption = $('<label class="caption" for="' + fieldName +  '"></label>');
            ele.parent().prepend(caption);
            if (setting.caption) {
                caption.text(setting.caption + ":");
            }
            
            if(setting.calculateBirthdayByIDNumber != undefined){
            	$('#' + fieldName + ' input').blur(function(){
            		var val = $(this).val();
            		var input = setting.calculateBirthdayByIDNumber[0];
            		$birthday = $('#' + input + ' input');
            		if(setting.calculateBirthday != undefined && setting.calculateBirthday){
//            			if($birthday.val() == ''){
                			if(val.length == 15){
                				$birthday.val('19' + val.substring(6,12));
                    		}else if(val.length == 18){
                    			$birthday.val(val.substring(6,14));
                    		}
//                		}
            		}else if(setting.calculateAge != undefined && setting.calculateAge){
            			var now = new Date();
            			var year = now.getFullYear();
            			if(val.length == 15){
            				var birthYear = '19' + val.substring(6,8);
            				$birthday.val(year - birthYear);
                		}else if(val.length == 18){
                			var birthYear = val.substring(6,10);
            				$birthday.val(year - birthYear);
                		}
            		}
            	});
            }
            
            //根据末次月经计算预 产 期
            if(setting.isCalculateTime != undefined){
            	$('#' + fieldName + ' input').blur(function(){
            		var val = $(this).val();
            		var len = setting.isCalculateTime.length;
            		for(var i = 0;i<len;i++){
            			$('#' + setting.isCalculateTime[i][0] + ' input').
            				val(calculateTimeObj.calculateWomanPreBirthTime(val,setting.isCalculateTime[i][1]));
            		}
            	});
            }
            //孕次
            if(setting.gravidityEvent != undefined){
            	$('#' + fieldName + ' input').blur(function(){
            		var vals = $(this).val();
            		var fileNo = $('#' + setting.gravidityEvent.fileNo).html();
            		if(vals != '' && fileNo != ''){
            			var tableName = setting.gravidityEvent.tableName;
            			systemInformationUtils.checkWomanGravidity(fileNo,tableName,vals,function(data){
            				if(data){
            					$('#' + fieldName + ' input').val('');
            					showInfoObj.Error('此次怀孕记录已经填写完毕，不允许重复填写。');
            				}
            			});
            		}
            	});
            }
            
            if(setting.blurFun){
            	$('#' + fieldName + ' input').blur(function(){
            		var visitDate = $(this).val();
            		var fileNo = $('#' + setting.fillField[1]).html();
            		if(visitDate != null && visitDate != '' && fileNo != null && fileNo != ''){
            			var htmlType = setting.fillField[0];
            			var fields = setting.fillField[2];
            			var fieldsLen = fields.length;
            			GenDefaultVal.get(fileNo,visitDate,function(data){
            				if(data != null){
            					for(var i=0;i<data.length;i++){
            						if(i < fieldsLen){
            							$('#' + fields[i] + ' ' + htmlType).val(data[i]);
            						}
            					}
            				}
            			});
            		}
            	});
            }
            
            if(setting.evaluate){
            	$('#' + fieldName + ' input').blur(function(){
            		var val = $(this).val();
            		var fileNo = $('#' + setting.fileInput[1] + ' span').html();
            		if(val != null && val != '' && fileNo != null && fileNo != ''){
            			var evaluateItem = setting.evaluateItem;
            			if(evaluateItem == 'height'){
            				if(val < 49){
            					showInfoObj.Error('身高必须大于49，请输入正确的身高');
            					return;
            				}
            			}
            			EvaluateChildService.getEvaluateResult(fileNo,evaluateItem,val,function(data){
            				if(data >= 0){            					
            					var fillInput = setting.fileInput[0];
                    			$('#' + fillInput + ' input').val(data);
                    			$('#' + fillInput + ' input').focus();
            				}
            			});
            			
            			var otherVal = $('#' + setting.fileInput[2] + ' input').val();
            			if(otherVal != null && otherVal != ''){
            				var height = '';
            				var weight = '';
            				if(evaluateItem == 'height'){
            					height = val;
            					weight = otherVal;
            				}else{
            					height = otherVal;
            					weight = val;
            				}
            				EvaluateChildService.getEvaluateChild(fileNo,height,weight,function(data){
            					if(data != null){
                					var fillInput = setting.fileInput[3];
                        			$('#' + fillInput + ' input').val(data);
                				}
            				});
            			}
            		}
            	});
            }
            
            if(setting.womanItem){
            	$('#' + fieldName + ' input').focus(function(){
            		var fileNo = $('#' + setting.fileInput[0]).val();
            		if(fileNo != null){
            			var showItemInfo = setting.fileInput[1];
            			VisitBeforeBornService.getItems(fileNo,function(data){
            				if(data == ''){
            					$('.' + showItemInfo).html('<font color=red size=2>温馨提示：此人暂无体检记录。');
            				}else{
            					$('.' + showItemInfo).html('<font color=red size=2>温馨提示：此人已做的体检有第：<span>' + data + '</span>次。');
            				}
                    		$('.' + showItemInfo).show();
                		});
            		}
            	});
            	$('#' + fieldName + ' input').blur(function(){
            		var showItemInfo = setting.fileInput[1];
            		var str = $('.' + showItemInfo).children('font').children('span').html();
            		var fileNo = $('#' + setting.fileInput[0]).val();
            		var val = $(this).val();
            		if(val != '' && fileNo != ''){
            			if(val > 1){
            				if(str != null && str != '' && str.indexOf(val) >= 0){
                    			showInfoObj.Error('第' + val + '次孕产妇产前随访记录已经录入系统，请不要重复录入。');
                    			$(this).val('');
                    		}else{
                    			VisitBeforeBornService.getLastMensesAndDay(fileNo,val,function(data){
                    				if(data != null){
                    					$('#' + setting.fileInput[2] + ' input').val(data);
                    				}
                    			});
                    		}
            			}else{
            				$(this).val('');
            			}
            		}
            		$('.showItemInfo').hide();
            	});
            }
            
            if(setting.searchDistrict){
            	$('#' + fieldName + ' input').focus(function() {
            		$(this).val('');
            		$('.showDistrictName').html('');
            		UserMenuTreeService.getSelectedUserDistrict(function(data){
            			if(data != null && data.length > 0){
            				var currentNode = null; 
        					this.menu = new Ext.tree.TreePanel({
        						width : 235,
        						height : 380,
        						rootVisible : true,
        						autoScroll : true,
        						lines : false,
        						animate : true,
        						checked : true,
        						loader : new Ext.ux.DWRTreeLoader({
        							dwrCall : UserMenuTreeService.getUserDistrictNodes
        						}),
        						root : new Ext.tree.AsyncTreeNode({
        							text : data[0].name,
        							id : data[0].id
        						})
        					});
        					var rootNode = this.menu.getRootNode();	
        					
        					this.menu.on({
        					      dblclick : {
        					        stopEvent : true,
        					        fn : function(n,e) {
        					          e.stopEvent();
        					          if(n.leaf){
        					        	  $('#' + fieldName + ' input').val(n.id);
        					        	  $('.showDistrictName').html(n.text);
        						          win.close();
        					          }
        					        }.createDelegate(this)
        					      },
        					      click : {
                  					stopEvent : true,
                  					fn : function(n,e){
                  						currentNode = n;
                  					}
                  				  }
        					    });
        					
        					var del_action = new Ext.Action({
                			    text: '关&nbsp;&nbsp;&nbsp;&nbsp;闭',
                			    handler: function(){
                			    	win.close();
                			    },
                			    iconCls: 'del_btn'
                			});
                			
                			var add_action = new Ext.Action({
                			    text: '确&nbsp;&nbsp;&nbsp;&nbsp;认',
                			    handler : function(){
            		        		if(currentNode != null){
            		        			var leaf = currentNode.leaf;
            		        			if(leaf){
            		        				$('#' + fieldName + ' input').val(currentNode.id);
            		        				$('.showDistrictName').html(currentNode.text);
            			        			win.close();
            		        			}
            		        		}else{
            		        			Ext.Msg.show({
            		        				title:'错误',
            		        				msg: '请选择行政区划！',
            		        				buttons: Ext.Msg.OK,
            		        				animEl: 'elId',
            		        				icon: Ext.MessageBox.ERROR
            		        			});
            		        		}
            		        	},
                			    iconCls: 'add_btn'
                			});
        					var win = new Ext.Window({
                				width : 250,
                				height : 500,
                				modal : true,
                				draggable : false,
                				items : [this.menu],
                				title: '组织机构',
                				border : true,
                				buttonAlign : 'left',
                				bbar: new Ext.Toolbar({
                			        items: [new Ext.Button(add_action),'->',new Ext.Button(del_action)]
                			    })
//                				autoScroll: true
                			});
                			win.show(this);
            			}
            		});
				});
            }
            
            if(setting.isFocus){
            	var serviceType = setting.serviceType;
            	var curPage = 1;
            	function close(){
            		$('#highRiskList').remove();
            	}
            	
            	function pagination(currentPage,data){
// alert(currentPage);
            		var len = data.length;
            		var pageSize = 10;
            		var page = Math.ceil(len / (pageSize));
            		var size = 0;
            		var start = 0;
            		if(currentPage < page){
            			size = currentPage * pageSize;
            			start = (currentPage-1) * pageSize;
            		}else if(currentPage == page){
            			size = len;
            			start = (currentPage-1) * pageSize;
            		}
            		$('#highRiskDiv').html('');
            		var $info = '';
            		for(var i=start;i<size;i++){
    					var id = data[i].id;
    					var number = data[i].number;
    					var exception = data[i].exception;
    					$info = $info + "<div><input type='checkbox'/><span style='display:none;'>" + id + 
    							"</span><a href='#' style='text-decoration: none;' class='selectedExceptioin'>"+
    							"<font size='2'>" + number + "、" + exception + "</font></a><div>"
    				}
            		return $info;
            	}
            	
            	function bindSvr(){
            		$('.selectedExceptioin').each(function(){
    					$(this).bind('click',function(){
    						var content = $(this).children('font').html();
    						close();
    						if($('#highRiskRemark input').val() == ''){
    							$('#highRiskRemark input').val(content);
    						}else{
    							$('#highRiskRemark input').val($('#highRiskRemark input').val() + ',' + content);
    						}
    						
    					});
    				});
            	}
            	
            	$('#' + fieldName + ' input').keyup(function(e){
//            		console.log(e);
            		var xPosition;
            		var yPosition;
            		if($.browser.msie && ($.browser.version == "6.0" || $.browser.version == "7.0")){
            			xPosition = $(this).parent('span').scrollLeft() - 115;
            			yPosition = $(this).parent('span').scrollTop() + 28;
            		}else{
            			if(setting.isSpecial){
            				xPosition = $(this).parent('span').offset().left - 260;
                			yPosition = $(this).parent('span').scrollTop() - 5;
            			}else{
            				xPosition = $(this).parent('span').offset().left - 300;
                			yPosition = $(this).parent('span').scrollTop() - 5;
            			}            			
            		}
            		
            		if(e.which == 27){
            			close();
            			return;
            		}
            		
            		var val = $(this).val().trim();
            		
            		HighRiskService.getException(serviceType,val,function(data){
            			close();
            			curPage = 1;
        				$('#' + fieldName).append('<div id="highRiskList" style="position: absolute;margin-left:' + xPosition 
                				+'px;margin-top:'+ yPosition + 'px;border: 1px solid green;z-index: 1000;'
                				+'width: 330px;min-height:50px;background-color:#CAE2FE;"><div id="highRiskDiv"></div>'
                				+'<div id="tbar"></div></div>');
            			if(data != null){
            				var $info = "";
            				$('#highRiskDiv').html(pagination(curPage,data));
            				$info = $info + '<span id="submit" style="cursor:pointer;"><font size="2">确定</font></span>&nbsp;&nbsp;<span id="cancel" style="cursor:pointer;"><font size="2">关闭</font></span>'
            				var len = data.length;
            				var page = Math.ceil(len / 10);
            				$info = $info + '&nbsp;&nbsp;<span id="prevPage" style="cursor:pointer;">'+
            					'<font size="2">上一页</font></span>&nbsp;<span style="cursor:pointer;" id="nextPage">'+
            					'<font size="2">下一页</font></span>&nbsp;<font size=2>共有<span id="totals"></span>页</font>'
            				$('#tbar').html($info);
            				bindSvr();
            				$('#totals').html(page);
            				$('#prevPage').click(function(){
            					if(curPage > 1){
            						curPage = curPage - 1;
            						$('#highRiskDiv').html(pagination(curPage,data));
            						bindSvr();
            					}
            				});
            				
            				$('#nextPage').click(function(){
            					if(curPage < page){
            						curPage = curPage + 1;
            						$('#highRiskDiv').html(pagination(curPage,data));
            						bindSvr();
            					}
            				});
            				
            				$('#cancel').click(function(){
            					close();
            				});
            				$('#submit').click(function(){
            					var tmpContent = "";
            					$('#highRiskList input:checkbox').each(function(){
            						var checked = $(this).attr('checked');
            						if(checked){
            							var content = $(this).next().next().children('font').html();
            							tmpContent += content + ',';
            						}
            					});
            					if(tmpContent != '')
            						tmpContent = tmpContent.substring(0,tmpContent.length -1);
            					alert(tmpContent);
            					if($('#highRiskRemark input').val() == ''){
            						$('#highRiskRemark input').val(tmpContent);
        						}else{
        							$('#highRiskRemark input').val($('#highRiskRemark input').val() + tmpContent);
        						}
            					
            					close();
            				});
            				$('#highRiskShowInfo').css('display','block');
            			}else{
            				$('#highRiskList').append('<div><font size="2">&nbsp;&nbsp;暂无记录</font></div>');
            			}
            		});
            	});
            }
            
            if (setting.disabled) {
                ele.addClass("hidden");
                caption.addClass('hidden');
            }

            if (setting.cols) {
                console.error("setting cols");
                ele.attr("cols", setting.cols);
            }

            if (setting.rows) {
                ele.attr("rows", setting.rows);
            }

            if (setting.classes) {
                ele.addClass(setting.classes);
            }

            if (setting.height) {
                ele.css("height", setting.height);
            }
            
            function validate(){

                if (!setting.asLabel) {
                    val = ele.val();
                } else {
                    val = ele.text();
                }
                var res ;
                if (setting.format){
                    var v = med.validator(setting.format);
                    if (v){
                        res = v.validateVal(ele.val());
                        if (!res.valid ){
                           val = null;
                        }
                    }
                }
              
                return res;
            }

            ele.change(function(e){
                var self = $(this);
				if (self.val() != ''){
					var vRes = validate();
					if (val == null && vRes) {
						showHUD(self, vRes.msg, true);
						//var self = $(this);
						//setTimeout(function() {self.select().focus();},50);
					} else {
						hideHUD(self, true);
					}
				} else {
                    val = null;
					hideHUD(self, true);
				}
                if (valChangeListener)
				{
					valChangeListener(null,val);
				}
            }).blur(function(){
                hideHUD($(this));
            });
            var validator = med.validator(setting.format);
            if (validator && validator.preferCharValidate) {
                ele.keydown(function(e) {
                    var code = e.which;
                    if (code >= 96 && code <= 105) { //numpad
                        code -=48;
                    }
                    if (code == 190 || code == 110) code = ".".charCodeAt(0); //point
                    if (code == 9 || code == 37 
                        || code == 39  || code == 8 || code == 0 || code==18) return; //bypass edit keys
                    var _v = ele.val() + String.fromCharCode(code)
                    var vRes;
                    if (validator['validateChar']){
                        vRes = validator.validateChar(_v);
                    } else {
                        vRes = validator.validateVal(_v);
                    }

                    if (!vRes.valid) {
                        showHUD($(this), vRes.msg);
                        e.preventDefault();
                    } else {
                    	var range =  med.validator(setting.range);
                    	if(range){
                    		vRes = range.validateVal(_v,setting.minVal,setting.maxVal);
                    		if (!vRes.valid) {
                                showHUD($(this), vRes.msg);
                                e.preventDefault();
                    		}else{
                    			hideHUD($(this),true);
                    		}
                    	}else{
                    		hideHUD($(this),true);
                    	}
//                        hideHUD($(this),true);
                    }
                });
            }

            function valFunc(v) {
                if (arguments.length > 0){
                    if (setting.format){ //代码重复
                        var formatter = med.validator(setting.format);
                        if (formatter){
                            v = formatter.format(v);
                        }
                    }
                    val = v;    
                    if (!setting.asLabel){
                        ele.val(val);
                    } else {
                        ele.text(val);
                    }
                } else {
                    validate();
                    return val;
                }
            }

            if (setting.defaultVal) {
                valFunc(setting.defaultVal);
            }
            if(setting.defaultValFunc){
            	console.log(c,setting, fieldName,cfg);
            	valFunc(setting.defaultValFunc(fieldName));
            }

            return {
                enable : function(effect){
                    ele.attr("disabled", false);
                    ele.removeClass("hidden");
                    caption.removeClass('hidden');
                    if (effect) {
                        ele.addClass("required");
                    }
                },
                disable : function(effect){
                    ele.attr("disabled", true);
                    ele.addClass("hidden");
                    caption.addClass('hidden');
                    if (effect) {
                        ele.removeClass("required");
                    }
                },
                valChanged : function(f){ //todo rename this func name
                    if (arguments.length == 0){
                        return valChangeListener;
                    } else {
                        valChangeListener = f;
                    }
                 },
                val : function(v) {

                          if (setting.roWhenSet && arguments.length > 0) {
                             if (val == null || typeof val == 'undefined'){
                                ele.attr("disabled", true);
                                ele.css("border","0");
                             }
                          } 

                          if (arguments.length > 0 ){
                                 valFunc(v);
                          } else {
                        	  return valFunc();
                          }
                      },
                focus : function(){
                    ele.focus();
                },
                reset : function(){
                    if (setting.defaultVal){
                        valFunc(setting.defaultVal);
                        ele.val(val);
                    } else {
                        if ( setting.roWhenSet){
                            //ele.val("");
                            //todo what shall I do ? nothing?
                        } else {
                            if (setting.asLabel) {
                                ele.text("");
                            } else {
                                ele.val("");
                            }
                        }
                    }
                    if(setting.defaultValFunc){
                    	console.log(c,setting, fieldName,cfg);
                    	if (setting.asLabel) {
                            ele.text(setting.defaultValFunc(fieldName));
                        } else {
                            ele.val(setting.defaultValFunc(fieldName));
                        }
                    	valFunc(setting.defaultValFunc(fieldName));
                    }
                    hideHUD(ele); 
                },
                hide : function(){
                    ele.hide();
                },
                show : function(){
                    ele.show();
                }
            }
        }

        function NewCombo(c,cfg){
            var attr = "";
            var changeListener;
            var setting = $.extend({}, NewCombo.defaultCfg, cfg);
            if (setting.maxlen) {
                attr += " maxlength=" + setting.maxlen;
            }
            if (setting.size) {
                attr += " size=" + setting.size;
            }
            if (setting.width) {
                attr += 'style="width:' + setting.width + 'px" ';
            }
            if (setting.disabled) {
                attr += " disabled=" + setting.disabled;
            }
            var ele = $('<input class="combo" type="text" size="2"'  + attr + '/>');
            c.empty().append(ele);
            
            var url = window.location.href;
            if(url.indexOf('districtNumber') > 0){
            	$('#fileNo').parent('td').next().html('<span style="display:none;" id="condVal">0</span>' +
            			'<span style="margin-left:10px;">' + 
            			'<font size=2 color="red">人员检索条件：<select id="selectCond">'+
            			'<option value="0">条形码</option>'+
            			'<option value="1">档案编号</option>'+
            			'<option value="2">姓名</option>'+
            			'<option value="3">身份证号</option>'+
            			'<option value="4">联系人</option>'+
        			'</select></font></span>');
            	$('#districtNumber').hide();
            	$('#selectCond').change(function(){
            		var $thisVal = $(this).val();
            		if($thisVal == 0){
            			$('#districtNumber').hide();
            		}else{
            			$('#districtNumber').show();
            		}
            	});
            	
            	$('#barCode').parent('td').next().html('<span style="margin-left:10px;cursor:pointer;">' +
            			'<font size=2 color="red">跨区域检索设置：<select id="crossRegion">'+
            				'<option value="0">无操作</option>'+
            				'<option value="1">跨区域</option>'+
	            			'<option value="2">撤消</option>'+
        				'</select></font></span>');
            	var params = url.substring(url.indexOf('=') + 1,url.length);
                $('#crossRegion').change(function(){   
                	var $thisVal = $(this).val();
                	if($thisVal == 1){
                		districtId = $('#districtNumber span').html();
        				var crossRegionPanel = new Ext.Panel({
                			border : false,
                			frame : true,
                			layout : "form",
                			items : [{
    								xtype : 'textfield',
    								fieldLabel : '原行政区划',
    								width : 150,
    								id : 'srcDistrictNo',
    								name : 'srcDistrictNo',
    								disabled : true,
    								value : districtId,
    								labelStyle: 'font-weight:normal;width:90px;'
    						},{
    								xtype : 'textfield',
    								fieldLabel : '现行政区划',
    								width : 150,
    								id : 'desDistrictNo',
    								name : 'desDistrictNo',
    								labelStyle: 'font-weight:normal;width:90px;'
    						}],
    						buttonAlign : 'left',
    						buttons : [{
                				text : '确认',
                				handler : function(){
                					var val = Ext.getCmp('desDistrictNo').getValue();
                					FileNumSearch.districtIdIsExists(val,function(data){
                						if(data){
                							$('#districtNumber span').html(val);
                							$('#districtNumber span').css('display','inline');
                							$('#fileNo input').css('display','inline');
                							$('#fileNo div').css('display','none');
                							$('#name input').val('');
                							win.close();
                						}else{
                							Ext.Msg.alert('提示','没有此行政区划，请重新填写。');
                						}
                					});
                				}
                			},{
                				text : '关闭',
                				handler : function(){
                					win.close();
                				}
                			}]
                		});
                		
                		var win = new Ext.Window({
                			title : '跨区域',
                			width : 300,
                			height : 200,
                			items : [crossRegionPanel]
                		});
                		win.show();
                	}else if($thisVal == 2){
                		if(params.indexOf('#') > 0)
        					params = params.substring(0,params.length - 1);
        				$('#districtNumber span').html(params);
                	}
                });
                
                $('#selectCond').change(function(){
                	$('#condVal').html($(this).val());
                });
            }
            
            
            if (setting.local){
                setting.ds = getData(setting.ds);
            }

            var  combo = med.combo(ele, setting);
            
            function wrap(data){
                var res =  {};
                res[setting.mapping.value] = data;
                return res;
            }

            function unwrap(data) {
                return data[setting.mapping.value];
            }

            return {
                enable : function(effect){
                    ele.attr("disabled", false);
                    if (effect)
                        ele.addClass("required");
                },
                
                disable : function(effect){
                    ele.attr("disabled", true);
                    if (effect)
                        ele.removeClass("required");
                },

                valChanged : function(l){
                             changeListener = l;
                             combo.changeListener(l);
                         },

                val : function(v) {
                    if (arguments.length == 0){
                        var res = combo.val();
                        if (setting.mapping){
                            if (setting.multi) {
                                return $.map(res, wrap);
                            } else {
                                return wrap(res);
                            }
                        } else return res;
                    } else {
                        var _v;
                        if (setting.mapping) {
                            if (setting.multi){
                                _v= $.map(v, unwrap);
                            } else {
                                _v = unwrap(v);
                            }
                        }else {
                            _v = v;
                        }
                        combo.val(_v);
                        
                        ele.val(_v);
                        if(!setting.nothidewhenload){
                        	ele.hide();
                        }
                    }
                },
                reset : function(){
//                    combo.val([]);
                    combo.reset();
                }

            }
        }

        NewCombo.defaultCfg = {
                multi : false,
                local : true,
                model: {
                  id : 'number',
                  code : 'number',
                  display : 'name' 
                },
                showDisplay: true,
                displayCols : ['id', 'name'],
                displayColNames : ["编号", "名称"]
        };
        
        function HistoryCombo(c,cfg){
            var attr = "";
            var changeListener;
            var setting = $.extend({}, HistoryCombo.defaultCfg, cfg);
            if (setting.maxlength) {
                attr += " maxlength=" + setting.maxlength;
            }
            if (setting.size) {
                attr += " size=" + setting.size;
            }
            if (setting.width) {
                attr += 'style="width:' + setting.width + 'px" ';
            }
            if (setting.disabled) {
                attr += " disabled=" + setting.disabled;
            }
            if (setting.size) {
                attr += " size=" + setting.size;
            }
            if (setting.cssstyle) {
                attr += " style=\"" + setting.cssstyle+"\"";
            }
            var ele = $('<input class="combo" type="text" '  + attr + '/>');
            c.empty().append(ele);
            
            var url = window.location.href;
            $('#historyselect').parent('td').find("span").remove();
        	$('#historyselect').parent('td').append('<span style="display:none;" id="historyval">1</span>' +
        			'<span style="margin-left:10px;">' + 
        			'<font size=2 color="red">人员检索条件：<select id="selecthistory">'+
        			'<option value="1">身份证号</option>'+
    			'</select></font></span>');
        	$('#selecthistory').change(function(){
        		var $thisVal = $(this).val();
        	});
        	
            $('#selecthistory').change(function(){
            	$('#historyval').html($(this).val());
            });
            if (setting.local){
                setting.ds = getData(setting.ds);
            }
            var  combo = med.historycombo(ele, setting);
            function wrap(data){
                var res =  {};
                res[setting.mapping.value] = data;
                return res;
            }

            function unwrap(data) {
                return data[setting.mapping.value];
            }

            return {
                enable : function(effect){
                    ele.attr("disabled", false);
                    if (effect)
                        ele.addClass("required");
                },
                
                disable : function(effect){
                    ele.attr("disabled", true);
                    if (effect)
                        ele.removeClass("required");
                },

                valChanged : function(l){
                             changeListener = l;
                             combo.changeListener(l);
                         },

                val : function(v) {
                    if (arguments.length == 0){
                        var res = combo.val();
                        if (setting.mapping){
                            if (setting.multi) {
                                return $.map(res, wrap);
                            } else {
                                return wrap(res);
                            }
                        } else return res;
                    } else {
                        var _v;
                        if (setting.mapping) {
                            if (setting.multi){
                                _v= $.map(v, unwrap);
                            } else {
                                _v = unwrap(v);
                            }
                        }else {
                            _v = v;
                        }
                        combo.val(_v);
                        ele.val(_v);
                        ele.hide();
                    }
                },
                reset : function(){
                    //combo.val([]);
                    combo.reset();
                    console.log("do combo reset....................")
                }

            }
        }

        HistoryCombo.defaultCfg = {
                multi : false,
                local : true,
                model: {
                  id : 'number',
                  code : 'number',
                  display : 'name' 
                },
                showDisplay: true,
                displayCols : ['id', 'name'],
                displayColNames : ["编号", "名称"]
        };

        function NewList(c, cfg, fieldName){
            var setting = $.extend({},NewList.defaultCfg, cfg);
            var val = [] ;
            var valChangeListener;
            var data = getData(setting.ds);
            var timer;

            var controlShow = setting.controlShow;
            var controlShowVal;
            
            var _len = data.length - 1;
            var spans = $.map(data, function(v, i){
                var id, label;
                if ($.isArray(v)){
                    id = v[0];
                    label = v[1];
                } else {
                    id = v[setting.value];
                    label = v[setting.display];
                }
                var cr = "";
                if (setting.newlineStep && i != _len)
                     cr = ((i + 1) % setting.newlineStep == 0) ? "<br class='list-sep'/>" : "";
                return "<span><em>" + id + ". </em><em class='list-label'>" +  label + "</em></span>" + cr ; 
            }).join("");
            c.empty();
            var newLine = setting.forceNewline ? "<br/>" : "";
            var disable = true;
            if(setting.scoredisable)
            	disable = false;
            var displayCss = setting.disabled && disable ? "display:none;" : "";
            var caption = setting.caption ? ("<label class='caption' for=" + fieldName + ">" + setting.caption + ":" + "</label>") : "";
            c.html("<div class='list' id='" + fieldName  + "' style='" + displayCss + "'>" + caption + spans + newLine +  "<input class='list-input' type='text' size='1'></div>");
            $(c).find(".list-input").keyup(parseVal);
            var ele = $("div", c);
            var input = $(":input", ele); //first

            var $spans = $("span", c);
            
            function fillInput(self,selfId){
            	if (self.hasClass('list-selected')) {
                    //remove
                        removeSelectionByMetaIdx(selfId);
                        self.removeClass('list-unselecting');
                        removeCandidateMarks(); //todo 偷懒
                        
                        markSelections();
                        if (setting.multi) {
                            var inputs = findInputIndexByVal(data[selfId]);
                            inputs[0].remove();
//                            $.each(inputs, function(_, _input){
//                                _input.remove();});
                        } else {
                            $('input',ele).last().val("");
                        }
                        $('input',ele).last().focus();
                        self.addClass('match');
                    } else {
                        var added = addValByMetaIdx(selfId);
                        var ctrl = $('input',ele).last();
                        if (added) {
                            ctrl.val(added[setting.value]);
                            self.addClass('list-selected');
                            afterValAdded(ctrl, added);
                            if (!setting.multi) {
                                if (val.length != 1)
                                    val.splice(0,1); //bad back todo
                            }
                        }
                        markSelections();
                        self.addClass('list-unselecting');
                        if (valChangeListener)
                            valChangeListener(null,buildNotificationValue(val));
                    }
            }
            if(setting.isDefaultVal && !initListVal){
            	fillInput($('#' + fieldName).children('span'),setting.defaultVal);
            	$('#' + fieldName).children('div').addClass('none-selected');
            }
//            console.log(fieldName + ":::" + (setting.hasOwnProperty('displays')));
            if(setting.disabled){
            	$('#' + fieldName + ' input').attr("readonly","readonly");
        		$('#' + fieldName).parent('td').attr('disabled','disabled');
        		$('#' + fieldName).parent('td').css('color','#ACA899');
        		$('#' + fieldName).children('div').addClass('disabled');
            }
            
            if(fieldName != null && fieldName != ''){
            	$('#' + fieldName + ' input').focus(function(){
                	var $iValue = $(this).val();
                	if($iValue != null && $iValue != ''){
                		fillInput($('#' + fieldName).children('span'),$iValue - 1);
                    	$('#' + fieldName).children('div').addClass('none-selected');
                	}
                });
            }          
            
            $spans.hover(function(){
                var self = $(this);
                if (self.hasClass('list-selected')){
                    self.addClass('list-unselecting');
                } else {
                    self.addClass('match');
                }
            },
            function() {
                $(this)
                .removeClass('list-unselecting')
                .removeClass('match');
            }).click(function(){
                var self = $(this);
                var selfId = $spans.index(this);
                if(controlShow == undefined){
                	var parentTd = $(this).parent('div');
                	if(parentTd.hasClass('disabled'))
                		return;
                	fillInput(self,selfId);
                }else if(controlShow == 0){
                	var isSelected = self.parent('div');
                	if(selfId == 0){
                		if(!isSelected.hasClass('none-selected')){
                			var flag = true;
                       		isSelected.children('span').each(function(){
                       			if($(this).hasClass('list-selected'))
                       				flag = false;
                       		});
                       		if(flag){
                       			isSelected.addClass('none-selected');
                       		}else{
                       			return;
                       		}
                		}else{
                			isSelected.removeClass('none-selected');
                		}
               		}else{
               			if(isSelected.hasClass('none-selected'))
               				return;
               		}
                	fillInput(self,selfId);
                }else if(controlShow == 1){
                	controlShowVal = setting.controlShowVal;
                	var val = controlShowVal.split(',');
                	var parentDiv = $(this).parent('div');
                	if(selfId == 0){
                		if(parentDiv.hasClass('none-selected')){
                			for(var i = 0;i < val.length;i++){
                    			$('#' + val[i] + ' input').removeAttr("readonly");
    	                		$('#' + val[i]).parent('td').removeAttr('disabled');
    	                		$('#' + val[i]).parent('td').css('color','#000');
		                		$('#' + val[i]).children('div').removeClass('disabled');
    	                	}
                			parentDiv.removeClass('none-selected');
                		}else{
		                	for(var i = 0;i < val.length;i++){
		                		$('#' + val[i] + ' input').attr("readonly","readonly");
		                		$('#' + val[i]).parent('td').attr('disabled','disabled');
		                		$('#' + val[i]).parent('td').css('color','#ACA899');
		                		$('#' + val[i]).children('div').addClass('disabled');
		                	}
		                	parentDiv.addClass('none-selected');
                		}
                	}else{
                		for(var i = 0;i < val.length;i++){
                			$('#' + val[i] + ' input').removeAttr("readonly");
	                		$('#' + val[i]).parent('td').removeAttr('disabled');
	                		$('#' + val[i]).parent('td').css('color','#000');
	                		$('#' + val[i]).children('div').removeClass('disabled');
	                	}
                		if(parentDiv.hasClass('none-selected'))
                			parentDiv.removeClass('none-selected');
                	}
                	fillInput(self,selfId);
                }else if(controlShow == 2){
                	controlShowVal = setting.controlShowVal;
                	var val = controlShowVal.split(',');
                	var parentDiv = $(this).parent('div');
                	if(selfId == 3){
                		if(parentDiv.hasClass('none-selected')){
                			for(var i = 0;i < val.length;i++){
                    			$('#' + val[i] + ' input').removeAttr("readonly");
    	                		$('#' + val[i]).parent('td').removeAttr('disabled');
    	                		$('#' + val[i]).parent('td').css('color','#000');
		                		$('#' + val[i]).children('div').removeClass('disabled');
    	                	}
                			parentDiv.removeClass('none-selected');
                		}else{
		                	for(var i = 0;i < val.length;i++){
		                		$('#' + val[i] + ' input').attr("readonly","readonly");
		                		$('#' + val[i]).parent('td').attr('disabled','disabled');
		                		$('#' + val[i]).parent('td').css('color','#ACA899');
		                		$('#' + val[i]).children('div').addClass('disabled');
		                	}
		                	parentDiv.addClass('none-selected');
                		}
                	}else{
                		for(var i = 0;i < val.length;i++){
                			$('#' + val[i] + ' input').removeAttr("readonly");
	                		$('#' + val[i]).parent('td').removeAttr('disabled');
	                		$('#' + val[i]).parent('td').css('color','#000');
	                		$('#' + val[i]).children('div').removeClass('disabled');
	                	}
                		if(parentDiv.hasClass('none-selected'))
                			parentDiv.removeClass('none-selected');
                	}
                	fillInput(self,selfId);
                }else if(controlShow == 3){
                	controlShowVal = setting.controlShowVal;
                	var val = controlShowVal.split(',');
                	var parentDiv = $(this).parent('div');
                	if(selfId == 1){
                		if(parentDiv.hasClass('none-selected')){
                			for(var i = 0;i < val.length;i++){
                    			$('#' + val[i] + ' input').removeAttr("readonly");
    	                		$('#' + val[i]).parent('td').removeAttr('disabled');
    	                		$('#' + val[i]).parent('td').css('color','#000');
		                		$('#' + val[i]).children('div').removeClass('disabled');
    	                	}
                			parentDiv.removeClass('none-selected');
                		}else{
		                	for(var i = 0;i < val.length;i++){
		                		$('#' + val[i] + ' input').attr("readonly","readonly");
		                		$('#' + val[i]).parent('td').attr('disabled','disabled');
		                		$('#' + val[i]).parent('td').css('color','#ACA899');
		                		$('#' + val[i]).children('div').addClass('disabled');
		                	}
		                	parentDiv.addClass('none-selected');
                		}
                	}else{
                		for(var i = 0;i < val.length;i++){
                			$('#' + val[i] + ' input').removeAttr("readonly");
	                		$('#' + val[i]).parent('td').removeAttr('disabled');
	                		$('#' + val[i]).parent('td').css('color','#000');
	                		$('#' + val[i]).children('div').removeClass('disabled');
	                	}
                		if(parentDiv.hasClass('none-selected'))
                			parentDiv.removeClass('none-selected');
                	}
                	fillInput(self,selfId);
                }
            });

            function findInputIndexByVal(v){
                var ctrl = $('input',ele);
                return $.map(ctrl, function(c){
                    var $c = $(c);
                    var s = $c.data('selection');
                    if (s && s[setting.value] == v[setting.value]){
                        return $c;
                    }
                });
            }

            function clearTimer(){
                if (timer) {
                    clearTimeout(timer);
                    timer = undefined;
                }
            }

           function buildNotificationValue(){
               if (val == null) return null; //should not happened?
               return $.map(val, function(v){
                    return v[setting.value];
                });
           }


            function setVal(newval, matchCol, setInput) {
                $('.list-input:not(:last-child)',ele).remove();
                input = $(":input", ele);
                val = [];
                $.each(newval, function(_,v){
                    addVal(v, matchCol, setInput);
                });
            }

            function markSelection(idx, selection){
                $.each(data,function(i,v){
                    if (selection[setting.value] == v[setting.value]){
                        $("span",ele).eq(i).addClass("list-selected");
                    }
                });
            }

            function markSelections() {
                $("span", ele).removeClass("list-selected");
                 $.each(val, markSelection);
            }

            function removeSelectionByMetaIdx(idx){
                removeSelection(data[idx]);
            }

            function removeSelection(item){
                $.each(val,function(i,v){
                    if (item[setting.value] == v[setting.value]){
                        val.splice(i,1);
                        return false;
                    }
                });
                if (valChangeListener)
                        valChangeListener(null,buildNotificationValue(val));
            }

            function hasSelection(item){
                var has  = false;
                $.each(val,function(i,v){
                    if (item[setting.value] == v[setting.value]){
                        has = true;
                        return null;
                    }
                });
                return has;
            }

            function addValByMetaIdx(idx) {
                    var ret; 
                    var _val = data[idx];
                    if (! hasSelection(_val) ) {
                        val.push(_val);
                        ret = _val;
                    } else {
                        ret = false;
                    }
                    return ret;
 
            }
            //matchCol which column of model tobe matched
            //setInput, if we should set input's val when value is set , *NOT* used
            function addVal(newval, matchCol, setInput) { 
                if (!matchCol) matchCol = setting.value; //default match col
                console.log(data,newval, matchCol, setInput);
                var res = $.map(data, function(v,i){
                    if (trim(v[matchCol]) == trim(newval)){
                        return i;
                    } else return null;
                });
                console.log(res);
               // onbeforedeactivate

                var tobeRet;
                if (res.length == 0){
                    //input.addClass("err");
                    if (!setting.multi) {
                        val = [];
                    }
                    tobeRet = false;
                } else {
                    //input.removeClass("err");
                    var idx = res[0];
                    tobeRet = addValByMetaIdx(idx);
                }
                if (valChangeListener)
                        valChangeListener(null,buildNotificationValue(val));
                return tobeRet;

            }

            function keyDownHandler(e){
                var self = $(e.target);
                var newval = self.val();
                var selection = self.data("selection");
                
                if (setting.multi && newval != "" && selection){ //多选, 有合法的选值
                    if (e.which == 46 || e.which == 8 ){
                        removeSelection(selection);
                        if(newval == 1 && setting.controlShow == 0){
                        	self.parent('div').removeClass('none-selected');
                        }
                        var inputs = $(":input", ele);
                        if (inputs.length > 1){
//                        	self.parent('div').removeClass('none-selected')
                            self.remove();
                        }
                        //hideHUD(self);
                        $(":input", ele).last().focus();
                        //e.preventDefault();
                        console("=================keyDownHandler====");
                        markSelections();

                    } else {
                        //showHUD(self, "已经确认选值，仅可删除");
                        //setTimeout(function() {hideHUD(self)}, 3000);
                    }
                    if (e.which != 9){ e.preventDefault(); } //tab放过
                }
            }

            function getCandidates(text) {
                var res,selected = false;
                if (text && text != ""){
                    res = $.map(data, function(v,i){
                        //selected = false;
                        $.each(val,function(idx, _v){
                            if (v[setting.value] == _v[setting.value]){
                                selected = true;
                                return false; //break
                            }
                        });
                        if (!selected && (v[setting.value]+'').indexOf(text) == 0){
                            if (text == v[setting.value]){
                                return {full:true, idx : i};
                            } else {
                                return {full:false, idx : i};
                            }
                        } else return null;
                    });
                }
                return res;
            }

            function removeCandidateMarks(){
                $("span",ele).removeClass("full-match");
                $("span",ele).removeClass("match");
            }

            function markCandidates(cs) {
                $.each(cs,function(_,v){
                    var clazz = (v.full ? "full-match" : "match");
                    var _e = $("span",ele).eq(v.idx).addClass(clazz);
                    if (v.full && cs.length > 1)
                        showHUD(_e, "回车确认此选项，或者继续输入，匹配其他选项");
                        setTimeout(function(){hideHUD(_e);},2000);
                });
            }

            function appendInput(){
                var $newInput = $("<input class='list-input' type='text' size='1'>");
                $newInput.appendTo(ele);
                return $newInput;
            }

            function afterValAdded(inputCtrl, valAdded ){
                if (valAdded && setting.multi){
                    inputCtrl.data('selection', valAdded);
                    var $newInput = appendInput();
                    $newInput.focus();
                    $newInput.keyup(parseVal);
                    inputCtrl.keydown(keyDownHandler);
                }
            }


            function parseVal(e) {

                var self = $(e.target);
                var newval = self.val();
                if(newval == 1 && setting.controlShow == 0){
                	var flag = true;
                	var isSelected = self.parent('div');
//                	console.log(isSelected);
               		isSelected.children('span').each(function(){
//               			console.log($(this));
               			if($(this).hasClass('list-selected'))
               				flag = false;
               		});
               		if(flag){
               			isSelected.addClass('none-selected');
               		}else{
               			return;
               		}
                }else{
                	if(self.parent('div').hasClass('none-selected'))
                    	return;
                }
                //if (newval == "") return; //todo why?
                //if (newval == "" && setting.multi) return; //todo why?
                
                var cans ;
                if (setting.multi){
                    removeCandidateMarks();
                    if (e.which != 13) { //return key
                            cans = getCandidates(newval);
                            if (cans && cans.length > 0) {
                                markCandidates(cans);
                                if (! (cans.length == 1 && cans[0].full)){
                                    return;
                                }
                            }
                    }
                }

                var valAdded = false;

                if (setting.multi){ 
                    valAdded = addVal(newval);
                } else {
                    setVal([newval]);
                }

                if (valAdded && setting.multi){
                    afterValAdded(self, valAdded);
                }

                if (!valAdded && setting.multi) {
                    //showHUD(self, "重复或者无法匹配的选项，请重新输入");
                    //setTimeout(function(){hideHUD(self)},2000);
                }

                //if ((!setting.multi || (setting.multi && !valAdded))
                if ((!setting.multi || 
                        (setting.multi && !valAdded && cans && cans.length != 1))){
                    clearTimer();
                    timer = setTimeout(function() {self.select();},150);
                }
                markSelections();
            }

            input.keyup(parseVal).change(function(e){
                //$(this).focus();
            }).blur(clearTimer);

            return {
                enable : function(effect){
                	ele.attr("disabled", false);
                    ele.removeClass("hidden");
                    ele.attr("style","display:inline;");
                    //caption.removeClass('hidden');
                    if (effect) {
                        ele.addClass("required");
                    }
                },
                disable : function(effect){
                	ele.attr("disabled", true);
                    ele.addClass("hidden");
                    ele.attr("style","display:none;");
                    //caption.addClass('hidden');
                    if (effect) {
                        ele.removeClass("required");
                    }
                },
//                disable : function(){},
                valChanged : function(f) {
                    valChangeListener = f;
                },
                focus : function(){
                   $(":input", ele).focus();
                },
                val : function(v) {
                          //重构，按照combo来
                    if (arguments.length > 0){
                        if (typeof v == 'undefined' || v == null){
                            v = [];
                        }
                        var _val = [];
                        if ($.isArray(v))
                        {
                            _val = v;
                        } else {
                            _val.push(v);
                        }
                        var toSet = _val;
                        if (setting.mapping){ 
                            toSet= $.map(_val, function(_v){
                                    return _v[setting.mapping.value];
                            });
                        }
                        setVal(toSet, setting.save, true);
                        markSelections();
                        var currentInput = input;
                        $.each(val, function(i,v){
                        	
                        	var currentInputVal = v[setting.value];
                        	var controlShow = setting.controlShow;
                        	if(controlShow == undefined){
                        		
                        	}else if(controlShow == 0 && currentInputVal == 1){
                        		currentInput.parent('div').addClass('none-selected');
                        	}else if(controlShow == 1 && currentInputVal == 1){
                        		var controlShowVal = setting.controlShowVal;
                            	var val = controlShowVal.split(',');
            	                for(var i = 0;i < val.length;i++){
            	               		$('#' + val[i] + ' input').attr("readonly","readonly");
            	               		$('#' + val[i]).parent('td').attr('disabled','disabled');
            	               		$('#' + val[i]).parent('td').css('color','#ACA899');
    		                		$('#' + val[i]).children('div').addClass('disabled');
            	               	}
            	                currentInput.parent('div').addClass('none-selected');
                        	}else if(controlShow == 2 && currentInputVal == 4){
                        		var controlShowVal = setting.controlShowVal;
                            	var val = controlShowVal.split(',');
            	                for(var i = 0;i < val.length;i++){
            	               		$('#' + val[i] + ' input').attr("readonly","readonly");
            	               		$('#' + val[i]).parent('td').attr('disabled','disabled');
            	               		$('#' + val[i]).parent('td').css('color','#ACA899');
    		                		$('#' + val[i]).children('div').addClass('disabled');
            	               	}
            	                currentInput.parent('div').addClass('none-selected');
                        	}else if(controlShow == 3 && currentInputVal == 1){
                        		var controlShowVal = setting.controlShowVal;
                            	var val = controlShowVal.split(',');
            	                for(var i = 0;i < val.length;i++){
            	               		$('#' + val[i] + ' input').attr("readonly","readonly");
            	               		$('#' + val[i]).parent('td').attr('disabled','disabled');
            	               		$('#' + val[i]).parent('td').css('color','#ACA899');
    		                		$('#' + val[i]).children('div').addClass('disabled');
            	               	}
            	                currentInput.parent('div').addClass('none-selected');
                        	}
                            currentInput.val(currentInputVal);
                            currentInput.keydown(keyDownHandler);
                            currentInput.data('selection', v);
                            if (setting.multi){
                                var $newInput = $("<input class='list-input' type='text' size='1'>");
                                $newInput.data('selection', v);
                                $newInput.appendTo(ele).focus();
                                $newInput.keyup(parseVal);
                                currentInput = $newInput;
                            }
                        });
                    } else {
                        if (val  && val.length > 0) {
                            if (setting.multi){
                                if (setting.mapping) {
                                    return $.map(val,function(_v){
                                            var _r = {};
                                            _r[setting.mapping.value] = _v[setting.save];
                                            return _r;
                                    });
                                } else {
                                    return val;
                                }
                            }else {
                                if (val.length > 0){
                                    return val[0][setting.save];
                                } else {
                                    return $.map(val, function(_v){
                                            _v[setting.save];
                                    });
                                }
                            }
                        } else {
                            return null;
                        }
                    }
                },
                reset : function(){
                    input.val("");
                    input.removeClass("err");
                    $("span", ele).removeClass("list-selected");
                    val = [];
                    var inputs = $(":input", ele).not(":first").remove();
                }
                		
            }
        }

        NewList.defaultCfg = {
            display: "name",
            value : "number",
            save : "name",
            multi : false
        }

        med.registerCtrl("list", NewList);
        med.registerCtrl("input", Input);
        med.registerCtrl("combo", NewCombo);
        med.registerCtrl("historycombo", HistoryCombo);
        med.registerCtrl("grid", Grid);

        
        function ExtGrid(c,setting){
        	var grid = new Ext.grid.GridPanel(cfg);
        	c.append(grid.getEl());
        	return grid.getEl();
				}
        med.registerCtrl("extgrid", ExtGrid);
        
        function SimplePanel(c,cfg){
        	var simplePanel = new Ext.tf.SimplePanel(cfg);
        	c.append(simplePanel.getEl());
        	return simplePanel.getEl();
        }
        med.registerCtrl("simplePanel", SimplePanel);
        
        
        
        function DateField(c,setting,fieldName){     
        	function addZero(val){
        		if(val < 10){
        			return '0' + val;
        		}
        		return val;
        	}
        	function formatDate(date){
        		return date.getFullYear() + '-' + addZero((date.getMonth() + 1)) + '-' + addZero(date.getDate()) + ' ' +
        			addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds());
        	}
        	var defaultVal = '';
        	if(setting.defaultVal){
        		defaultVal = setting.defaultVal;
        		defaultVal = formatDate(defaultVal);
        	}
        	var datefield = $('<input type="text" class="Wdate" id="' + fieldName + '" value = "' + defaultVal + 
        			'" onfocus="WdatePicker({isShowWeek:true,dateFmt:\'yyyy-MM-dd HH:mm:ss\'})"/>');
        	c.empty().append(datefield);
        	
        	if(setting.disabled){
        		datefield.attr('disabled','disabled');
        		datefield.removeAttr('onfocus');
        	}
        	
        	if(setting.genChildBirthDate != undefined){
        		$('#' + fieldName + ' input').blur(function(){
        			var val = $(this).val();
        			$('#' + setting.genChildBirthDate[0] + ' input').val(val.substring(0,4));
        			$('#' + setting.genChildBirthDate[1] + ' input').val(val.substring(5,7));
        			$('#' + setting.genChildBirthDate[2] + ' input').val(val.substring(8,10));
        		});
        	}
        	
        	var val;
        	function valFunc(v) {
                if (arguments.length > 0){
                	if((typeof v=='object')&&v.constructor==Date){
                		val = formatDate(v);
                	}else{
                		if(v != null && v != ''){
//                			console.log(v);
                			var year = v.substring(0,4);
                			var month = v.substring(4,6);
                			var day = v.substring(6,8);
                			var hour = v.substring(8,10);
                			var minutes = v.substring(10,12);
                			var second = v.substring(12,14);
                			val = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + second;
                		}
                	}
                    if (!setting.asLabel){
                    	datefield.val(val);
                    } else {
                    	datefield.text(val);
                    }
                } else {
                    return val.replace(' ','').replace(/:/g,'').replace(/-/g,'');
                }
            }
        	
        	return {
        		val : function(v) {
                    if (setting.roWhenSet && arguments.length > 0) {
                       if (val == null || typeof val == 'undefined'){
                    	  datefield.attr("disabled", true);
                    	  datefield.css("border","0");
                       }
                    } 

                    if (arguments.length > 0 ){
                           valFunc(v);
                    } else {
                    	val = datefield.val();
                        return valFunc();
                    }
                }
        	};
		}
        med.registerCtrl("datefield", DateField);
        
        function Image(c,setting,fieldName){
        	var image = $('<img width="240px" height="240px"/>');
        	c.empty().append(image);
        	var val;
        	function valFunc(v) {
                if (arguments.length > 0){
                    if (setting.format){ //代码重复
                        var formatter = med.validator(setting.format);
                        if (formatter){
                            v = formatter.format(v);
                        }
                    }
                    val = v;    
                    if (!setting.asLabel){
                    	image.attr("src",val);
                    	$('.onlineTakePhoto').remove();
                    } else {
                    	datefield.text(val);
                    }
                } else {
                    return val;
                }
            }
        	
        	return {
        		val : function(v) {
                    if (setting.roWhenSet && arguments.length > 0) {
                       if (val == null || typeof val == 'undefined'){
                    	   image.attr("disabled", true);
                    	  image.css("border","0");
                       }
                    } 

                    if (arguments.length > 0 ){
                           valFunc(v);
                    } else {
                    	val = image.attr("src");
                        return valFunc();
                    }
                },
                reset : function(){
                	image.removeAttr('src');
                }
        	};
		}
        med.registerCtrl("image", Image);
        
        function Table(c,setting,fieldName){
        	function genHeader(headers){
        		var $headerTr = '<thead><tr>'
        		$.each(headers,function(n,v){
        			$headerTr = $headerTr + '<td>' + v + '</td>';
        		});
        		return $headerTr + '</tr></thead>';
        	}
        	
        	var $header = genHeader(setting.displayHeaders);
        	var tableClass = "table " + setting.tableClass;
        	
        	setting.ds(function(data){
        		function genBody(data){
        			var $body = '<tbody>';
        			var disLen = setting.displayName.length;
        			$.each(data,function(dn,dv){   
        				$body = $body + '<tr>';
            			var i = 0;
            			var obj = data[dn];
            			var dLen = obj.length;
            			$.each(setting.displayName,function(n,v){
            				var flag = true;
            				for(var p in obj){
            					if(p == v){
                       				$body = $body + '<td>' + obj[p] + '</td>';
                      				flag = false;
                      				break;
                       			}
            				}
            				if(flag){
            					$body = $body + '<td><input type="text" /></td>';
            				}
        				});
            			$body = $body + '</tr>';
            		});
        			return $body + '</tbody>';
        		}
        		var $body = genBody(data);
        		
        		var table = $('<table class=' + tableClass + '>' + $header + $body + '</table>');
            	c.empty().append(table);
        	});
		}
        med.registerCtrl("table", Table);
})();


