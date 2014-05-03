function setDisabledBySex(sex) {
	if (sex == '男') {
		$("#galactophore").css("display", "none");
		$("#body20").css("display", "none");
		$("#body21").css("display", "none");
		$("#body22").css("display", "none");
		$("#body23").css("display", "none");
		$("#body24").css("display", "none");
	} else {
		$("#galactophore").css("display", "block");
		$("#body20").css("display", "block");
		$("#body21").css("display", "block");
		$("#body22").css("display", "block");
		$("#body23").css("display", "block");
		$("#body24").css("display", "block");
	}
}

function isOldMan(date) {
	if(date == null)
		return;
	var now = new Date();
	var age = now.getFullYear() - date.getFullYear();
	var feild_array = [ 'oldManHealthEstimate', 'oldManLifeEstimate',
			'general14', 'general15', 'general16', 'general17' ];
	if (age <= 65) {
		for ( var i = 0; i < feild_array.length; i++) {
			$('#' + feild_array[i]).attr('disabled', 'disabled');
			$('#' + feild_array[i]).children('div').addClass('disabled');
			$('#' + feild_array[i]).css('color', '#ACA899');
			$('#' + feild_array[i] + ' input').attr('readonly', 'readonly');
		}
	}
}
function trim(str){  
    // 用正则表达式将前后空格  
    // 用空字符串替代。  
    return str.replace(/(^\s*)|(\s*$)/g, "");  
}

function data_writeback(_s,setting){
	$.each(setting.writeback, function(i, v) {
		var ctrl = setting.ctx.getCtrl(v.id);
		if (ctrl && ctrl['val']) {
			if(v.force || Ext.isEmpty(ctrl.val())){
				if((v.forcenullvalue && v.nullvalue) || Ext.isEmpty(_s[v.col])){
					if(v.nullvalue){
						var reg = /\$\{([^\}]*)\}/m;
						if(reg.test(v.nullvalue)){
							//var matchs = obj.value.search(reg);
							var teststr = trim(v.nullvalue);
							match = reg.exec(teststr)
							while( match) {
								var strs = match[1].split("|");
								var data = trim(strs[0]);
								var func = trim(strs[1]);
								if(strs.length>1){
									if(data.substr(0,1)=="$"){
										try{
											data = trim(_s[parseInt(data.substr(1))]);
											if(!data){
												data = "";
											}
										}catch(err){
											
										}
									}
									var replacestr  = "data="+func+"('"+data.replace(/\'/g,"\\'")+"')";
									eval (replacestr);
								}
								teststr = teststr.replace(match[0],data);
								match = reg.exec(teststr);
							}
							ctrl.val(teststr);
						}else{
							ctrl.val(v.nullvalue);
						}
					}
				}else{
					ctrl.val(_s[v.col]);
				}
			}
		}
	});
}

(function() {

	var med = ns('med');

	med.selector = function(setting) {
		var $comboSelect = $('<div class="chooser hidden" style="position:absolute; border:solid 1px blue; z-index:1000;background-color:white;">'
				+ '请输入助记码'
				+ '<div class="sel-paging hidden">共<span class="totalPages"></span>页，当前第<span class="currentPage"></span>页</div></div>');
		$comboSelect.appendTo($("body"));
		var $selectionPane = $('<div style="width:500px;"></div>').appendTo(
				$comboSelect);
		var keyIdx = 0;
		var selections = [];
		// var selectionKeys ={};
		var indexer = 0;
		var itemsNo = 0;
		var candidates;
		var multi = setting.multi;
		var rowHeader = "";
		var $selectionList;
		if (multi) {
//			console.log("MULTI");
			rowHeader = '<td><input type="checkbox"/></td>';
			$selectionList = $("<ul></ul>").appendTo($comboSelect);
		}

		function makeRowHeader(selected) {
			if (!multi) {
				return '';
			} else {
				return '<td><input type="checkbox" '
						+ (selected ? ' checked ' : '') + '/></td>';
			}
		}

		function getSelection(item) {
			var res = -1;
			var itemId = item[setting.model.id];
			$.each(selections, function(i, v) {
				if (v[setting.model.id] == itemId) {
					res = i;
					return false;// break
				}
			});
			return res;
		}

		function hasSelection(item) {
			return getSelection(item) != -1;
		}

		function addSelection(d) {
			if (!hasSelection(d)) {
				if(typeof(saveBeforeObj) != 'undefined'){
					saveBeforeObj.IsAbortionFn(d[0],d[1]);
                }
				
				selections.push(d);
				// alert(d[2]);
				setDisabledBySex(d[2]);
				var birthday = d[3];
				if (document.getElementById("oldManAge") != null) {
					var year = birthday.getFullYear();
					var now = new Date();
					var age = now.getFullYear() - year;
					if (age >= 65) {
						return true;
					} else {
						Ext.Msg.show({
							title : '警告',
							msg : '档案号为：' + d[0] + "，姓名为：" + d[1] + "的年龄是："
									+ age + "岁，还没有达到老年人建档年龄！",
							buttons : Ext.Msg.OK,
							icon : Ext.MessageBox.WARNING,
							animEl : 'elId',
							width : 350
						});
						removeSelection(d);
						return false;
					}
				}
				$('#fileNo div').css('display', 'inline');
				// return true;
			}
			return false;
		}

		function removeSelection(d) {
			var idx = getSelection(d);
			if (idx != -1) {
				selections.splice(idx, 1);
			}
		}

		function scrollTo(i, container) {
			if (i && i.offset() && i.offset().top) {
				var height = $(window).height();
				var scrollTop = $(window).scrollTop();

				var t = i.offset().top;
				/*
				 * console.error("scrollTop" + scrollTop); console.error("w
				 * height " + height); console.error("line top " + t);
				 */
				var lineBottom = i.outerHeight() + t;
				/*
				 * console.error("lineBottom " + lineBottom);
				 * console.error("window height - scrollTop " +
				 * (height-scrollTop));
				 */
				if ((height - scrollTop) < lineBottom) {
					$('html, body').stop(true).animate({
						scrollTop : t - 100
					}, 100);
				}
			}
		}
		function markLine(i, color) {
			// shit, nth-child is 1-based;
			var t = $("tr:nth-child(" + (i + 1) + ")", $selectionPane).css(
					"background-color", color);
			return t;
		}

		function reload(data, s) {
			candidates = data.res; // meta data, bad name
			selections = [].concat(s);
			var cols = setting.displayCols;
			$comboSelect.show();
			$(".sel-paging", $comboSelect).show();
			$(".totalPages", $comboSelect).text(data.totalPages);
			$(".currentPage", $comboSelect).text(data.currentPage);
			$selectionPane.empty();
			indexer = 0;

			if (candidates.length > 0) {
				itemsNo = candidates.length;
				var tbody = $
						.map(
								candidates,
								function(v) {
									// console.log(selections);
									// console.log("hasSelection " +
									// hasSelection(v));
									return "<tr>"
											+ makeRowHeader(hasSelection(v))
											+ $
													.map(
															cols,
															function(l) {
																// alert(l+"==="+v[l]);
																// alert(typeof(v[l]));
																if (typeof (v[l]) == "object") {
																	if (v[l] && v[l].format
																			&& v[l]
																					.format("Y-m-d")) {
																		return "<td nowrap style='padding-right:5px;'>"
																				+ v[l]
																						.format("Y-m-d")
																				+ "</td>";
																	} else if (v[l] && v[l].toISOString
																			&& v[l]
																					.toISOString()) {
																		return "<td nowrap style='padding-right:5px;'>"
																				+ v[l]
																						.toISOString()
																						.substring(
																								0,
																								10)
																				+ "</td>";
																	} else {
																		if(v[l]){
																			return "<td nowrap style='padding-right:5px;'>"
																					+ v[l]
																					+ "</td>";
																		}else{
																			return "<td nowrap style='padding-right:5px;'>&nbsp;</td>";
																		}
																	}
																} else {
																	return "<td nowrap style='padding-right:5px;'>"
																			+ v[l]
																			+ "</td>";
																}
															}).join("")
											+ "</tr>";
								}).join("\n");
				$selectionPane.html("<table>" + tbody + "</table>");
				markLine(indexer, "red");
				var $trs = $("tr", $selectionPane);
				$trs.mouseover(function() {
					var i = $trs.index(this);
					markLine(indexer, "white");
					indexer = i;
					markLine(indexer, "red");
				}).click(function() {
					if (setting.clickCb) {
						setting.clickCb();
					}
				}).css("cursor", "pointer");
			} else {
				$selectionPane.html("没有匹配");
			}
		}

		function isClosed() { // todo badhack, could be removed
			var res = $comboSelect.is(":hidden");
			return res;
		}

		return {
			isClosed : isClosed,
			next : function() {
				markLine(indexer, "white");
				indexer = (++indexer) % itemsNo;
				var line = markLine(indexer, "red");
				scrollTo(line, $comboSelect);
			},
			prev : function() {
				markLine(indexer, "white");
				indexer = (--indexer) % itemsNo;
				if (indexer < 0) {
					indexer = itemsNo - 1;
				}
				var line = markLine(indexer, "red");
				scrollTo(line, $comboSelect);
			},
			toggleSelect : function() {
				if (!multi) {
					return;
				}
				var line = $("tr:nth-child(" + (indexer + 1) + ")",
						$comboSelect);
				var checkbox = $(":checkbox", line);
				var flag = !checkbox.attr("checked");
				checkbox.attr("checked", flag);
				var item = candidates[indexer];
				var id = item[setting.model.id] + "_id";
				if (flag) {
					if (addSelection(item)) {
						// maybe buggy, id duplicated?
						// buggy, confirmed
						/*
						 * $('<li class="' + id + '">' +
						 * item[setting.model.display] + "</li>").appendTo($selectionList)
						 * .hover(function(){ $(this).css("text-decoration",
						 * "line-through"); }, function(){
						 * $(this).css("text-decoration", "none");
						 * }).click(function(e){ console.log("clicked"); var
						 * thisItem = item; removeSelection(thisItem);
						 * $(this).remove(); }).css("cursor", "pointer");
						 * console.log("appending " + id);
						 */
					}
				} else {
					removeSelection(item);
//					console.log("removing " + id);
					$("." + id).remove();
				}
			},
			select : function(pickCurrent) {
				if (pickCurrent) { // wired!!
//					console.log("selected " + indexer);
					if (!multi) {
						selections = [];
					} else {
						// blah blah
					}

					if (candidates && candidates[indexer]) {
						addSelection(candidates[indexer]);
					}
				}

				return selections;
			},
			close : function() {
				$comboSelect.hide('slow');
			},
			show : function(tgt, _) {
				med.showUnder(tgt, $comboSelect);
			},
			reload : reload
		}
	}

	med.showUnder = function(obj, $shown) {
		var pos = obj.position();
		var css = {
			top : pos.top + obj.outerHeight(true),
			left : pos.left
		};
		$shown.css(css).show();
	}

	med.search = function(dsFunc,setting) {
		return function(cond) {
			var subject = new Rx.AsyncSubject();
			var isWomanRecord = '';
			if ($('.isWomanRecord') != undefined) {
				isWomanRecord = $('.isWomanRecord').html();
			}
			var condVal = $('#condVal').html();
			if(setting.relatedInfoSearch){
				isWomanRecord = setting.relatedInfoSearchValType;
				condVal = $('#' + setting.relatedInfoSearchIds).val();
			}
			dsFunc(cond.pageNo, cond.mcode, cond.startWith,condVal , isWomanRecord, function(result) {
				subject.OnNext(result);
				subject.OnCompleted();
			});
			return subject.AsObservable();// .Select(function(d) { return
											// d.data;});
		}
	}

	med.searchLocal = function(locaDataArray, searchCol) {
		return function(cond) {
			// return Rx.Observable.FromArray(locaDataArray).Do(function(d){
			// console.log( d);});
			return Rx.Observable.Return(locaDataArray).Select(function(d) {
				if (searchCol) {
					return $.map(d, function(v) {
						if (("" + v[searchCol]).indexOf(cond.mcode) != -1) {
							return v;
						} else {
							return null;
						}
					});
				} else {
					return d;
				}
			}).Select(function(d) {
//				console.log("data");
//				console.log(d);
				return {
					res : d,
					totalPages : 1,
					currentPage : 1
				};
			});
		}
	}

	// cl change listener
	med.combo = function(obj, setting) {

		var cl;
		var from = 0, totalPages = -1;
		var selector = med.selector(setting);
		var readonly = false;
		var local_span = {};
		var values = [];
		var editing = false;
		var label = $("<div class='combo-items' style='display:inline'></div>");
		var clearFrom = true;
		label.appendTo($(obj.parent()));
		var searchCode = setting.multi ? undefined : setting.model.code; // 如果是多选，不过滤数据
		var dsObservable = setting.local ? med.searchLocal(setting.ds,
				searchCode) : med.search(setting.ds.search,setting);

		var observer = Rx.Observer.Create(function(results) {
			// if (!obj.is(":hidden")){
			totalPages = results.totalPages;
			selector.show(obj);
			selector.reload(results, values);
			// }
		}, function(exn) {
			console.error(exn);
		});

		function showValues() {
			var html = ""
					+ $
							.map(
									values,
									function(v) {
										// obj.val(values[0][setting.model.code]);
										return '<span>'
												+ v[setting.model.code]
												+ (setting.showDisplay ? ("." + v[setting.model.display])
														: '') + '</span>';
									}).join("");
			label.empty().html(html);
			if (setting.mCodePrefixCtrlId) {
				var ctrl = setting.ctx.getCtrl(setting.mCodePrefixCtrlId);
				if (ctrl['show']) {
					ctrl.show();
				}
			} // todo代码重复
			if (!readonly) {
				obj.show();
				var spans = $('span', label).hover(function() {
					$(this).css("text-decoration", "line-through");
				}, function() {
					$(this).css("text-decoration", "none");
				}).click(combo_click);
				spans.text_disableclick = local_span.text_disableclick;
				local_span = spans;
			}
		}

		function combo_click(element) {
			if (!setting.multi) {
				values = [];
			} else {
				var idx = spans.index(this);
				values.splice(idx, 1);
			}
			showValues();
			obj.show();
			if (setting.mCodePrefixCtrlId) {
				var ctrl = setting.ctx.getCtrl(setting.mCodePrefixCtrlId);
				if (ctrl['show']) {
					ctrl.show();
				}
				if(setting.showHistoryRecord){
					var foreignId = $('#' + setting.showHistoryRecord.foreignIdName + ' input ').val();
					immidiatelyLoadObj.reset(foreignId);
				}
				if(setting.showHistoryRecordSingle && healthBookSingleObj != undefined && healthBookSingleObj.getIsSetForm()){
					healthBookSingleObj.setIsSetForm(false);
					document.location.reload();
				}
				if (setting.writeback) {
					$.each(setting.writeback, function(i, v) {
						var ctrl = setting.ctx.getCtrl(v.id)
						if (ctrl && ctrl['reset']) {
							if(v.force){
								ctrl.reset();
							}else{
							    if(Ext.isEmpty(ctrl.val()))
								     ctrl.reset();
							}
						}
					});
				}
			}
		}

		function pageNav(step) {
			return function(e) {
				if (clearFrom) {
					from = 0;
					clearFrom = false;
				}
				from += step;
//				console.log(from);
				from %= totalPages;
//				console.log(from);
				if (from < 0)
					from = totalPages - 1;
//				console.log(from);
				return {
					mcode : $('#districtNumber span').html() + '%'
							+ $("#fileNo input").val(),
					pageNo : from,
					startWith : true
				}
			}
		}

		function simpleDoLog(msg) {
			return function(e) {
				console.log(msg);
			}
		}

		function buildValue() {
			var res = $.map(values, function(v) {
				return v[setting.model.id];
			});
			if (setting.multi) {
				return res;
			} else {
				return res[0];
			}
		}

		var terms = obj.toObservable("keyup").Where(function(e) {
			return e.which != 13
		}) // 忽略回车,与选择键冲突
		.Where(function(e) {
			if (e.which == 40) {
				return false;
			} else {
				return true;
			}
		}).Where(function(e) {
//			console.log(e.which);
			if (e.which == 39) {
				return false;
			} else {
				return true;
			}
		}).Where(function(e) {
//			console.log(e.which);
			if (e.which == 37) {
				return false;
			} else {
				return true;
			}
		}).Select(function(e) {
			var prefix = "";
			if (setting.mCodePrefixCtrlId) {
				var ctrl = setting.ctx.getCtrl(setting.mCodePrefixCtrlId);
				prefix = ctrl.val();
				if (prefix != null && prefix != "") {
					prefix = prefix + "%";
				}

			}
			clearFrom = true;
			return prefix + $(e.target).val();
		}).Throttle(350).Do(function(e) {
		});
		// .DistinctUntilChanged();

		var keyNext = obj.toObservable("keyup").Where(function(e) {
			return e.which == 39
		}) // ctrl ->
		.Select(pageNav(1)).Select(dsObservable).Switch();

		keyNext.Subscribe(observer);

		var keyPrev = obj.toObservable("keyup").Where(function(e) {
//			console.log(e.which);
			return e.which == 37
		}) // ctrl <-
		.Select(pageNav(-1)).Select(dsObservable).Switch();

		keyPrev.Subscribe(observer);

		var keyDown = obj.toObservable("keydown").Where(function(e) {
			if (e.which == 40 && !selector.isClosed()) {
				e.stopPropagation(); // grid 热键冲突
				return true;
			} else {
				return false;
			}
		}); // Down , with repeats

		var ctrlDel = obj.toObservable("keydown").Where(function(e) {
			return e.which == 46 && e.ctrlKey;
		});

		var keyUp = obj.toObservable("keydown").Where(function(e) {
			return e.which == 38 && !selector.isClosed()
		}); // Up , with repeats

		var keyEsc = obj.toObservable("keyup").Where(function(e) {
			return e.which == 27
		}); // Esc

		var keyRet = obj.toObservable("keyup").Where(function(e) {
			return e.which == 13
		}).Do(function(e) {
			e.preventDefault()
		}); // Return

		var keySpace = obj.toObservable("keydown").Where(function(e) {
			return e.which == 32
		}).Do(function(e) {
			e.preventDefault()
		}); // Space

		ctrlDel.Subscribe(selector.close); // conflictions with grid
		keyDown.Subscribe(selector.next);
		keyUp.Subscribe(selector.prev);
		keyEsc.Subscribe(selector.close);
		setting.clickCb = doSelect; // todo bad hacking
		function doSelect() {
			var pickCurrent = !setting.multi;
			var selection = selector.select(pickCurrent);
			selector.close();
			values = [].concat(selection);
			editing = true;
//			console.log(values);
			if(setting.extendwriteback && selection.length > 0){
				var _s = selection[0];
				if(extendWriteBackObj.set != undefined){
					extendWriteBackObj.set(setting,_s[0]);
				}
			}
			
			if (setting.writeback && selection.length > 0) {
				var _s = selection[0];
//				console.log(_s);
				data_writeback(_s,setting)
//				$.each(setting.writeback, function(i, v) {
//					var ctrl = setting.ctx.getCtrl(v.id);
//					if (ctrl && ctrl['val']) {
//						if(v.force){
//							ctrl.val(_s[v.col]);
//						}else{
//							if(Ext.isEmpty(ctrl.val()))
//								  ctrl.val(_s[v.col]);
//						}
//					    
//					}
//				});
			}
			if(setting.showHistoryRecord && selection.length > 0){
				var _s = selection[0];
				var foreignId = _s[setting.showHistoryRecord.foreignIdCol];
				immidiatelyLoadObj.loadHistoryRecord(foreignId,services.tableName);
			}
			if(setting.showHistoryRecordSingle && selection.length > 0){
				var _s = selection[0];
				var foreignId = _s[setting.showHistoryRecordSingle.foreignIdCol];
				healthBookSingleObj.loadRecord(foreignId,services.tableName);
			}
			if (values.length > 0) {
				obj.val("");
				showValues();
			} else {
				obj.val("");
				// label.text("");
				showValues();
			}
			if (cl) {
//				console.log("listener");
//				console.log(buildValue());
				cl(null, buildValue());
			}
			if (selection.length > 0) {
				obj.hide();
				// obj.blur();
				selector.close();
				if (setting.mCodePrefixCtrlId) {
					var ctrl = setting.ctx.getCtrl(setting.mCodePrefixCtrlId);
					if (ctrl['hide']) {
						ctrl.hide();
					}
				}
			}
			// scrollTo(obj);
		}
		;

		keyRet.Subscribe(doSelect);
		keySpace.Subscribe(selector.toggleSelect);

		var keyNum = obj.toObservable("keyup").Where(function(e) {
			return e.which == 37 && e.ctrlkey
		}).Throttle(50); // number

		var searchObservable = terms.Select(function(term) {
			return {
				mcode : term,
				pageNo : 0,
				startWith : true
			};
		}).Do(simpleDoLog("terms")).Select(dsObservable).Switch();

		var searchSub = searchObservable.Subscribe(observer);

		obj.focus(function(e) {
			// obj.val("");
			// obj.keyup();
			// selector.show(obj,"under");
		});

		obj.blur(function(e) {
			// if e.source element not inside selector todo
			selector.close();
			// obj.val("");
			// showValues(); //影响选择值删除
		});
		function valFunc(v, forceSetVal) {
			var flag = false;
			if(typeof(healthBookSingleObj) != 'undefined'){				
				flag = healthBookSingleObj.getIsSetForm();
//				healthBookSingleObj.setIsSetForm(false);
			}
			if (arguments.length == 0 || flag) {
				return buildValue();
			} else {
				// todo local only
				// setting.ds
				var seles = [];
				if (!$.isArray(v)) {
					seles.push(v);
				} else {
					seles = v
				}
				;

				if (setting.local) {
					values = $.map(seles, function(key) { // todo ds混淆！改个名字！
						return $.map(setting.ds, function(m) {
							return m[setting.model.id] == key ? m : null;
						});
					});
				} else {
//					console.log(setting);
//					console.log(obj);
//					console.log('***************' + readonly);
					if (readonly) {
						obj.hide();
					} else {
						// remote, not readonly, that means....
						values = v;
					}

					if (forceSetVal) { // force setval only
						obj.attr("disabled", true);
						// if (seles.length > 0 do we need this?
						setting.ds.get(seles[0], function(d) {
							values = d;
							obj.attr("disabled", false);
							showValues();
							obj.hide();
							if (setting.writeback) { // todo 代码重复
								var _s = d[0];
//								console.log("=s====="+_s)
								if(_s && _s.length>4){
    								setDisabledBySex(_s[2]);
    								isOldMan(_s[3]);
    								data_writeback(_s,setting);
//    								$.each(setting.writeback, function(i, v) {
//    									var ctrl = setting.ctx.getCtrl(v.id);
//    									if (ctrl && ctrl['val']) {
//    										if(v.force){
//    											if(!Ext.isEmpty(_s[v.col])){
//    												ctrl.val(_s[v.col]);
//    											}else{
//    												if(v.defaultvalue){
//    													ctrl.val(v.defaultvalue);
//        											}
//    											}
//    										}else if(Ext.isEmpty(ctrl.val())){
//    									    	if(!Ext.isEmpty(_s[v.col])){
//    												ctrl.val(_s[v.col]);
//    											}else{
//    												if(v.defaultvalue){
//    													ctrl.val(v.defaultvalue);
//        											}
//    											}
//    									    }
//    									}
//    								});
								}
							}
						});
					} else if (values.length > 0 && setting.writeback) { // 使用原来的值
						var _s = values[0]; // todo duplicated code
						setDisabledBySex(_s[2]);
						isOldMan(_s[3]);
						data_writeback(_s,setting);
//						$.each(setting.writeback, function(i, _v) {
//							var ctrl = setting.ctx.getCtrl(_v.id);
//							if (ctrl && ctrl['val']) {
//								if(_v.force){
//									if(!Ext.isEmpty(_s[v.col])){
//										ctrl.val(_s[v.col]);
//									}else{
//										if(v.defaultvalue){
//											ctrl.val(v.defaultvalue);
//										}
//									}
//									//ctrl.val(_s[_v.col]);
//								}else{
//									if(Ext.isEmpty(ctrl.val())){
//										if(!Ext.isEmpty(_s[v.col])){
//											ctrl.val(_s[v.col]);
//										}else{
//											if(v.defaultvalue){
//												ctrl.val(v.defaultvalue);
//											}
//										}
//									}
//								}
//							    
//							}
//						});
					}
				}
				showValues();
				if (cl) {
					cl(null, buildValue());
				}
			}

		}

		return {
			changeListener : function(c) {
				cl = c;
			},
			val : function(v) {
				if (arguments.length > 0) {
					// seting val
					
					if (setting.roWhenSet && !readonly) {
						readonly = true;
						valFunc(v, true);
					} else if (setting.roWhenSet && readonly) { // todo wired,
																// what am i
																// doing here?
						valFunc(v);
					} else {
						valFunc(v);
					}
				} else {
//					readonly = false;
					return valFunc();
				}
			},
			reset : function() {
				// if (!setting.roWhenSet){
//				readonly = false;
				if (!readonly) {
					valFunc([]);
				}
			},
			span : local_span
		}
	}
	
	med.hissearch = function(dsFunc,setting) {
		return function(cond) {
			console.log("cond=====",cond);
			var subject = new Rx.AsyncSubject();
			var isWomanRecord = '';
			if ($('.isWomanRecord') != undefined) {
				isWomanRecord = $('.isWomanRecord').html();
			}
			var condVal = $('#historyval').html();
			if(setting.relatedInfoSearch){
				isWomanRecord = setting.relatedInfoSearchValType;
				condVal = $('#' + setting.relatedInfoSearchIds).val();
			}
			if(setting.maxlen && setting.maxlen[condVal]){
				var ttt = cond.mcode.split("%");
				if(setting.maxlen[condVal].indexOf(","+ttt[1].length+",")>-1){
					if(med.hissearch.oldval && med.hissearch.oldcode 
							&& med.hissearch.oldval == cond.condVal
							&& med.hissearch.oldcode == cond.mcode
					){
						return ;
					}else{
						med.hissearch.oldval =  cond.mcode;
						med.hissearch.oldval =  cond.condVal;
						dsFunc(cond.pageNo, cond.mcode, cond.startWith,condVal , isWomanRecord, function(result) {
							subject.OnNext(result);
							subject.OnCompleted();
						});
					}
				}
			}else{
				dsFunc(cond.pageNo, cond.mcode, cond.startWith,condVal , isWomanRecord, function(result) {
					subject.OnNext(result);
					subject.OnCompleted();
				});
			}
			return subject.AsObservable();// .Select(function(d) { return
											// d.data;});
		}
	}
	med.historycombo = function(obj, setting) {
		console.log("============new?=========================")
		var cl;
		var from = 0, totalPages = -1;
		var selector = med.selector(setting);
		var readonly = false;
		var local_span = {};
		var values = [];
		var editing = false;
		var label = $("<div class='combo-items' style='display:inline'></div>");
		var clearFrom = true;
		label.appendTo($(obj.parent()));
		var searchCode = setting.multi ? undefined : setting.model.code; // 如果是多选，不过滤数据
		var dsObservable = setting.local ? med.searchLocal(setting.ds,
				searchCode) : med.hissearch(setting.ds.search,setting);
		console.log("dsObservable====",dsObservable);
		var observer = Rx.Observer.Create(function(results) {
			// if (!obj.is(":hidden")){
			totalPages = results.totalPages;
			selector.show(obj);
			selector.reload(results, values);
			// }
		}, function(exn) {
			console.error(exn);
		});

		function showValues() {
			var html = ""
					+ $
							.map(
									values,
									function(v) {
										// obj.val(values[0][setting.model.code]);
										return '<span>'
												+ v[setting.model.code]
												+ (setting.showDisplay ? ("." + v[setting.model.display])
														: '') + '</span>';
									}).join("");
			label.empty().html(html);
			if (setting.mCodePrefixCtrlId) {
				var ctrl = setting.ctx.getCtrl(setting.mCodePrefixCtrlId);
				if (ctrl['show']) {
					ctrl.show();
				}
			} // todo代码重复
			if (!readonly) {
				obj.show();
				var spans = $('span', label).hover(function() {
					$(this).css("text-decoration", "line-through");
				}, function() {
					$(this).css("text-decoration", "none");
				}).click(combo_click);
				spans.text_disableclick = local_span.text_disableclick;
				local_span = spans;
			}
		}

		function combo_click(element) {
			if (!setting.multi) {
				values = [];
			} else {
				var idx = spans.index(this);
				values.splice(idx, 1);
			}
			showValues();
			obj.show();
			if (setting.mCodePrefixCtrlId) {
				var ctrl = setting.ctx.getCtrl(setting.mCodePrefixCtrlId);
				if (ctrl['show']) {
					ctrl.show();
				}
				if(setting.showHistoryRecord){
					var foreignId = $('#' + setting.showHistoryRecord.foreignIdName + ' input ').val();
					immidiatelyLoadObj.reset(foreignId);
				}
				if(setting.showHistoryRecordSingle && healthBookSingleObj != undefined && healthBookSingleObj.getIsSetForm()){
					healthBookSingleObj.setIsSetForm(false);
					document.location.reload();
				}
				if (setting.writeback) {
					$.each(setting.writeback, function(i, v) {
						var ctrl = setting.ctx.getCtrl(v.id)
						if (ctrl && ctrl['reset']) {
//							if(v.force){
//								ctrl.reset();
//							}else{
							    if(Ext.isEmpty(ctrl.val()))
								     ctrl.reset();
//							}
						}
					});
				}
			}
		}

		function pageNav(step) {
			return function(e) {
				if (clearFrom) {
					from = 0;
					clearFrom = false;
				}
				from += step;
//				console.log(from);
				from %= totalPages;
//				console.log(from);
				if (from < 0)
					from = totalPages - 1;
//				console.log(from);
				return {
					mcode : $('#districtNumber span').html() + '%'
							+ $("#historyval").html(),
					pageNo : from,
					startWith : true
				}
			}
		}

		function simpleDoLog(msg) {
			return function(e) {
				console.log(msg);
			}
		}

		function buildValue() {
			var res = $.map(values, function(v) {
				return v[setting.model.id];
			});
			if (setting.multi) {
				return res;
			} else {
				return res[0];
			}
		}

		var terms = obj.toObservable("keyup").Where(function(e) {
			return e.which != 13
		}) // 忽略回车,与选择键冲突
		.Where(function(e) {
			if (e.which == 40) {
				return false;
			} else {
				return true;
			}
		}).Where(function(e) {
//			console.log(e.which);
			if (e.which == 39) {
				return false;
			} else {
				return true;
			}
		}).Where(function(e) {
//			console.log(e.which);
			if (e.which == 37) {
				return false;
			} else {
				return true;
			}
		}).Select(function(e) {
			var prefix = "";
			if (setting.mCodePrefixCtrlId) {
				var ctrl = setting.ctx.getCtrl(setting.mCodePrefixCtrlId);
				prefix = ctrl.val();
				if (prefix != null && prefix != "") {
					prefix = prefix + "%";
				}
			}
			clearFrom = true;
			return prefix + $(e.target).val();
		}).Throttle(350).Do(function(e) {
		});
		// .DistinctUntilChanged();

		var keyNext = obj.toObservable("keyup").Where(function(e) {
			return e.which == 39
		}) // ctrl ->
		.Select(pageNav(1)).Select(dsObservable).Switch();

		keyNext.Subscribe(observer);

		var keyPrev = obj.toObservable("keyup").Where(function(e) {
//			console.log(e.which);
			return e.which == 37
		}) // ctrl <-
		.Select(pageNav(-1)).Select(dsObservable).Switch();

		keyPrev.Subscribe(observer);

		var keyDown = obj.toObservable("keydown").Where(function(e) {
			if (e.which == 40 && !selector.isClosed()) {
				e.stopPropagation(); // grid 热键冲突
				return true;
			} else {
				return false;
			}
		}); // Down , with repeats

		var ctrlDel = obj.toObservable("keydown").Where(function(e) {
			return e.which == 46 && e.ctrlKey;
		});

		var keyUp = obj.toObservable("keydown").Where(function(e) {
			return e.which == 38 && !selector.isClosed()
		}); // Up , with repeats

		var keyEsc = obj.toObservable("keyup").Where(function(e) {
			return e.which == 27
		}); // Esc

		var keyRet = obj.toObservable("keyup").Where(function(e) {
			return e.which == 13
		}).Do(function(e) {
			e.preventDefault()
		}); // Return

		var keySpace = obj.toObservable("keydown").Where(function(e) {
			return e.which == 32
		}).Do(function(e) {
			e.preventDefault()
		}); // Space

		ctrlDel.Subscribe(selector.close); // conflictions with grid
		keyDown.Subscribe(selector.next);
		keyUp.Subscribe(selector.prev);
		keyEsc.Subscribe(selector.close);
		setting.clickCb = doSelect; // todo bad hacking
		function doSelect() {
			var pickCurrent = !setting.multi;
			var selection = selector.select(pickCurrent);
			selector.close();
			values = [].concat(selection);
			editing = true;
//			console.log(values);
			if(setting.extendwriteback && selection.length > 0){
				var _s = selection[0];
				if(extendWriteBackObj.set != undefined){
					extendWriteBackObj.set(setting,_s[0]);
				}
			}
			
			if (setting.writeback && selection.length > 0) {
				var _s = selection[0];
//				console.log(_s);
				data_writeback(_s,setting);
//				$.each(setting.writeback, function(i, v) {
//					var ctrl = setting.ctx.getCtrl(v.id);
//					if (ctrl && ctrl['val']) {
//						if(v.force){
//							ctrl.val(_s[v.col]);
//						}else{
//						    if(Ext.isEmpty(ctrl.val()))
//							  ctrl.val(_s[v.col]);
//						}
//					}
//				});
			}
			if(setting.showHistoryRecord && selection.length > 0){
				var _s = selection[0];
				var foreignId = _s[setting.showHistoryRecord.foreignIdCol];
				immidiatelyLoadObj.loadHistoryRecord(foreignId,services.tableName);
			}
			if(setting.showHistoryRecordSingle && selection.length > 0){
				var _s = selection[0];
				var foreignId = _s[setting.showHistoryRecordSingle.foreignIdCol];
				healthBookSingleObj.loadRecord(foreignId,services.tableName);
			}
			if (values.length > 0) {
				obj.val("");
				showValues();
			} else {
				obj.val("");
				// label.text("");
				showValues();
			}
			if (cl) {
//				console.log("listener");
//				console.log(buildValue());
				cl(null, buildValue());
			}
			if (selection.length > 0) {
				obj.hide();
				// obj.blur();
				selector.close();
				if (setting.mCodePrefixCtrlId) {
					var ctrl = setting.ctx.getCtrl(setting.mCodePrefixCtrlId);
					if (ctrl['hide']) {
						ctrl.hide();
					}
				}
			}
			// scrollTo(obj);
		}
		;

		keyRet.Subscribe(doSelect);
		keySpace.Subscribe(selector.toggleSelect);

		var keyNum = obj.toObservable("keyup").Where(function(e) {
			return e.which == 37 && e.ctrlkey
		}).Throttle(50); // number

		var searchObservable = terms.Select(function(term) {
			return {
				mcode : term,
				pageNo : 0,
				startWith : true
			};
		}).Do(simpleDoLog("terms")).Select(dsObservable).Switch();

		var searchSub = searchObservable.Subscribe(observer);

		obj.focus(function(e) {
			// obj.val("");
			// obj.keyup();
//			selector.show(obj,"under");
		});

		obj.blur(function(e) {
			// if e.source element not inside selector todo
			selector.close();
			// obj.val("");
			// showValues(); //影响选择值删除
		});
		function valFunc(v, forceSetVal) {
			var flag = false;
			if(typeof(healthBookSingleObj) != 'undefined'){				
				flag = healthBookSingleObj.getIsSetForm();
//				healthBookSingleObj.setIsSetForm(false);
			}
			if (arguments.length == 0 || flag) {
				return buildValue();
			} else {
				// todo local only
				// setting.ds
				var seles = [];
				if (!$.isArray(v)) {
					seles.push(v);
				} else {
					seles = v
				}
				;

				if (setting.local) {
					values = $.map(seles, function(key) { // todo ds混淆！改个名字！
						return $.map(setting.ds, function(m) {
							return m[setting.model.id] == key ? m : null;
						});
					});
				} else {
//					console.log(setting);
//					console.log(obj);
//					console.log('***************' + readonly);
					if (readonly) {
						obj.hide();
					} else {
						// remote, not readonly, that means....
						values = v;
					}

					if (forceSetVal) { // force setval only
						obj.attr("disabled", true);
						// if (seles.length > 0 do we need this?
						if (seles.length > 0){
							setting.ds.get(seles[0], function(d) {
								values = d;
								obj.attr("disabled", false);
								showValues();
								obj.hide();
								
								if (setting.writeback) { // todo 代码重复
									var _s = d[0];
	//								console.log("=s====="+_s)
									
									if(_s && _s.length>4){
	    								setDisabledBySex(_s[2]);
	    								isOldMan(_s[3]);
	    								data_writeback(_s,setting);
//	    								$.each(setting.writeback, function(i, v) {
//	    									var ctrl = setting.ctx.getCtrl(v.id);
//	    									if (ctrl && ctrl['val']) {
//	    										if(v.force){
//	    											ctrl.val(_s[v.col]);
//	    										}else{
//		    									    if(Ext.isEmpty(ctrl.val()))
//		    										  ctrl.val(_s[v.col]);
//		    									}
//	    									}
//	    								});
									}
								}
							});
						}
					} else if (values.length > 0 && setting.writeback) { // 使用原来的值
						var _s = values[0]; // todo duplicated code
						setDisabledBySex(_s[2]);
						isOldMan(_s[3]);
						data_writeback(_s,setting);
//						$.each(setting.writeback, function(i, _v) {
//							var ctrl = setting.ctx.getCtrl(_v.id);
//							if (ctrl && ctrl['val']) {
//								if(v.force){
//									ctrl.val(_s[v.col]);
//								}else{
//								    if(Ext.isEmpty(ctrl.val()))
//									  ctrl.val(_s[v.col]);
//								}
//							}
//						});
					}
				}
				showValues();
				if (cl) {
					cl(null, buildValue());
				}
			}

		}

		return {
			changeListener : function(c) {
				cl = c;
			},
			val : function(v) {
				if (arguments.length > 0) {
					// seting val
					
					if (setting.roWhenSet && !readonly) {
						readonly = true;
						valFunc(v, true);
					} else if (setting.roWhenSet && readonly) { // todo wired,
																// what am i
																// doing here?
						valFunc(v);
					} else {
						valFunc(v);
					}
				} else {
//					readonly = false;
					return valFunc();
				}
			},
			reset : function() {
				// if (!setting.roWhenSet){
//				readonly = false;
				if (!readonly) {
					console.log("do med reset....................")
					valFunc([]);
				}
			},
			span : local_span
		}
	}

})();
