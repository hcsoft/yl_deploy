$(function(){    
	var sidea = $( ".side-a" ).overlay({api:true});
	var sideb = $( ".side-b" ).overlay({api:true});

    $('.toolbar').append('<button rel="side-a" class="printPrev gBtn showWhenModify">打印</button>');
	function fillCards(){
        var loaded = {};
        if (medObj){
            loaded = medObj.getDataLoaded();
        }
        var prints = $('.printable');
        //todo optimize this, outter loop is bigger
        for (var p in loaded){
            if (loaded.hasOwnProperty(p)) {
                var val = loaded[p];
                var tgt = prints.find("." + p);
                if (tgt.length == 0) continue;
                if (tgt.hasClass('p-list')){
                    if (!tgt.attr('mapcol')){
                       var cs = $('input[type=checkbox]', tgt);
                        $.each(cs,function(_,v) {
                            if ($(v).val() == val){
                                $(v).attr("checked", true);
                            }
                        });
                    } else {
                        var mc = tgt.attr('mapcol');
                        var cs = $('input[type=checkbox]', tgt);
                        var spans = $('span[displayCol]', tgt);
                        $.each(cs, function(_,v){
                            $.each(val,function(_,vv){
                                if ($(v).val() == vv[mc]){
                                    $(v).attr("checked", true);
                                }
                            });
                       });
                       $.each(spans,function(_,v) {
                            var dc = $(v).attr('displayCol');
                            $.each(val,function(_,vv){
                                if ($(v).attr('valEq') == vv[mc]){
                                    $(v).text(vv[dc]);
                                }
                            });
                        });

                    }
                } else if (tgt.hasClass('p-join')){
                    var meta = getData(tgt.attr('ds'));
                    var lblCol = tgt.attr('dsLabel');
                    var valCol = tgt.attr('dsVal');
                    var mapCol = tgt.attr('mapcol');
                    var res = $.map(meta, function(mv){
                        return $.map(val,function(v){
                                if (v[mapCol] == mv[valCol]){
                                    return mv[lblCol];
                                }
                        });
                    }).join("，");
                    tgt.text(res);
                } else{
                    try {
                        if (val && typeof val == 'object' || typeof val == 'function') {
                            var month = val.getMonth() + 1;
                            var day = val.getDate();
                            var year = val.getFullYear();
                            val = "" + year + "年" + month + "月" + day + "日";
                        }
                        if (p == 'fileNoSub' && val.length > 2) {
                            val = val.substring(0,2) + "-"+ val.substring(2);
                        }
                        tgt.text(val);
                    }catch(e) {
                        console.error(e);
                    }
                }
            }
        }
    }
    $('.printPrev').click(function(){
		fillCards();	
		$('.' + $(this).attr('rel')).data('overlay').load();
	});
	$('#printa').click(function(){
		$('#cardA').printElement({printMode:'popup'});
	});

	$('#printb').click(function(){
		$('#cardB').printElement({printMode:'popup'});
	});
});
