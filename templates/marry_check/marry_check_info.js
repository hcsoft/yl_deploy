function enterkey(e,obj){
	if(e.keyCode==13 || e.keyCode==39)
	{
		if(e.data && e.data.next){
			e.data.next.focus();
			return false;
		}
	}
	if(e.keyCode==37)
	{
		if(e.data && e.data.pre){
			e.data.pre.focus();
			return false;
		}
	}
}

$(function(){
	//输入框的回车变为换行,左右键
	var lists = $("input,textarea")
	lists.each(function(i){
		if(i == 0 ){
			$(this).bind("keypress",{"pre":null,"next":lists.get(i+1)},enterkey)
		}else if( i== lists.length-1){
			$(this).bind("keypress",{"pre":lists.get(i-1),"next":null},enterkey)
		}else{
			$(this).bind("keypress",{"pre":lists.get(i-1),"next":lists.get(i+1)},enterkey)
		}
	});
	// $(".select2").each(function(i){
		// $(this).bind("change",function(val,added,removed){
			// console.log("namechange");
			// console.log(val);
			// console.log(added);
			// console.log(removed);
		// });
	// });
//	$(".printtable input:checked").each(function(i){
//		$(this).before("<div class='selectbox' style='left:"+$(this).offset().left+";top:"+$(this).offset().top+"'>√</div>");
//	});
//	$(".printtable input:checkbox,input:radio").not("input:checked").each(function(i){
//		$(this).before("<div class='selectbox' style='left:"+$(this).offset().left+";top:"+$(this).offset().top+"'>&nbsp;</div>");
//	})
		
});
