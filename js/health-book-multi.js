(function(){
	immidiatelyLoadObj = {
		immidiatelyLoad : immidiatelyLoad,
		tabChange : tabChange,
		loadHistoryRecord : loadHistoryRecord,
		reset : reset
	}
	function tabChange(id,foreignId){
		console.log();
		$('#' + foreignId + 'id_container').html('');
		this.panel = new Ext.Panel({
			renderTo : foreignId + 'id_container',
//			layout : 'fit',
			frame : true,
			height : document.documentElement.clientHeight
		});
		var targetUrl = window.location.pathname + '?id=' + id + '&extend_children_woman_param=0';
		this.panel.add({
			xtype : 'iframepanel',
			height : document.documentElement.clientHeight,
			defaultSrc : targetUrl,
			title : '',
			loadMask : true,
			autoScroll : false,
			listeners : {
				message : function(f, data) {
					// console.log("receive message...");
					// console.log(data);
					if (data.data == 'quit') {
						win.close();
					} else if (data.data == 'saved') {
						this.load();
					}
				}.createDelegate(this)
			}
		});
		this.panel.doLayout(true);
	}
	function buildTabs(foreignId,ids){
		$(".panes").append("<div class='span-22 last' id='" + foreignId + "div_id'></div>");
        $(".tabs").append("<li id='" + foreignId + "tabsli'><a href=\"#\" style='color:blue !important;' onclick='immidiatelyLoadObj.tabChange(\"" + ids[0] + "\",\"" + foreignId + "\");'>历史记录(<span id='" + foreignId + "tabNumbers'>" + ids.length + "</span>次)</a></li>");
        $("ul.tabs").tabs("div.panes > div", {
        	api: true
        });
        var i = 0;
        var htmldata = '<div id="' + foreignId + 'id_tabcount"></div>';
       	$("#" + foreignId + "div_id").append(htmldata);
       	$("#" + foreignId + "id_tabcount").addClass("tdspan");
       	i = 0;
       	var htmlstr = "<ul class='middletabs' id='" + foreignId + "middletabs'>";
       	var divstr = "<div id='" + foreignId + "id_container' class='hiddendiv'></div>";
       	while(i < ids.length){
            htmlstr += "<li><a href='#' onclick='immidiatelyLoadObj.tabChange(\"" + ids[i] + "\",\"" + foreignId + "\");'>第" + (i+1) + "次检查记录</a></li>";
//            divstr += "<div style='display:none;' id='" + ids[i].trim() + "'>" + (i+1) + "</div>";
       		i++;
       	}
        htmlstr += "</ul>";
       	$("#" + foreignId + "id_tabcount").append(htmlstr);
        $("#" + foreignId + "id_tabcount").append(divstr);
        $("#" + foreignId + "id_subtabcount ul.subtabs").tabs("#" + foreignId + "div_id tr.trtab");
        $("#" + foreignId + "id_tabcount ul.middletabs").tabs("#" + foreignId + "id_container hiddendiv");
	}
	
	function loadHistoryRecord(foreignId,tableName){
		var where = '';
		if($('.dataType').length > 0){
			where = ' and dataType = ' + $('.dataType').html();
		}else if(tableName == 'VisitAfterBorn'){
			where = ' and recordType = 0 ';
		}
		systemInformationUtils.getHistoryExamRecord(foreignId,tableName,where,function(data){
			if(data != null){
				var ids = data[1];
				buildTabs(foreignId,ids);
//	            tabChange(ids[0],foreignId);
			}
		});
	}
	
	function reset(foreignId){
		$('#' + foreignId + 'tabsli').remove();
	}
	
	function immidiatelyLoad(id,foreignId){
//		console.log($('#' + foreignId + 'tabNumbers'));
		if($('#' + foreignId + 'tabNumbers').length > 0){
			var numbers = parseInt($('#' + foreignId + 'tabNumbers').html());
			var htmlstr = "<li><a href='#' onclick='immidiatelyLoadObj.tabChange(\"" + id + "\",\"" + foreignId + "\");'>第" + (numbers + 1) + "次检查记录</a></li>";
			$('#' + foreignId + 'middletabs').append(htmlstr);
			$('#' + foreignId + 'tabNumbers').html(numbers + 1);
		}else{
			document.location.reload();
		}
		
	}
})();
$(document).ready(function(){	
	var json = parseParams(window.location.search);
	if(json.extend_children_woman_param != undefined){
		$('.showInfo_Child_Woman').hide();
		$('.tabs').hide();
//		$('.showToolbar').hide();
	}
	if(json.foreignId != undefined){
		immidiatelyLoadObj.loadHistoryRecord(json.foreignId,services.tableName);
	}else{
		console.log('***************在录入界面选择人员******************');
	}
});