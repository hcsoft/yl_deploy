//设置不可用链接
function setDisabled(obj){
	$(obj).attr("disabled","disabled");
	$(obj).parent().css("background-color","#f5f5f5");
	$(obj).children().css("color","#aca899");
}
var currentUsername = null;
function toNext(url){
	var fileNo = $(".personId").html();
	if(fileNo == null || fileNo == ''){
		Ext.Msg.show({
			title : '提示',
			msg : '无居民档案编号，不能继续操作。',
			buttons : Ext.Msg.OK,
			icon : Ext.MessageBox.ERROR,
			animEl: 'elId',
			buttonAlign : 'left'
		});
		return;
	}
	var disabled = $(this).parent().attr("disabled");
	if(disabled != 'disabled' && !disabled){
		Ext.MessageBox.confirm("提示", "此页面信息确认已经保存了吗？<br />如未保存，请先进行保存！", function(e){
    		if(e == 'yes'){
    			var currentUsernameParams = (currentUsername == null) ? '' : '&visitDoctor=' + currentUsername;
    			window.location.href = url + '?fileNo=' + fileNo + '&isNext=0' + currentUsernameParams;
    		}
    	}, this);  
	}
}

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

$(function(){
	var bar = '<a tabindex="0" href="#search-engines" class="fg-button fg-button-icon-right ' +
			'ui-widget ui-corner-all ui-state-loading ui-state-default" id="flat">' +
			'<img src="/resources/logo/pmhs_title_other.png"/>&nbsp;<span class="ui-icon ui-icon-triangle-1-s">'+
			'</span><font size=2>其它公卫项目</font></a>'+
			'<div id="search-engines" class="hidden">';
			
	var url = window.location.href;
	if(url.indexOf('personalInfo.html') >= 0 || url.indexOf('?fileNo=') >= 0){		
		if(url.indexOf('?fileNo=') >= 0){
//			var personId = '';
			var json = parseParams(window.location.search);
			var personId = json.fileNo;
			currentUsername = json.visitDoctor;
//			if(url.indexOf('&') > 0)
//				personId = url.substring(url.indexOf('?fileNo=') + 8,url.indexOf('&'));
//			else
//				personId = url.substring(url.indexOf('?fileNo=') + 8,url.length);
			
			PersonalInfoService.getPersonInfo(personId,function(data){
				if(data.length > 0){
					var infos = data[0];
					var catMods = data[1];
					
					var result = infos.split(",");
					var personId = result[0];
					var personName = result[1];
		            var personBirthday = result[2].substring(0,10);
		            var personSex = result[3];
		            var personAge = result[4];
		            var lis = '';
					for(var i = 0;i<catMods.length;i++){
						var isNavigate = catMods[i].module.isNavigate;
						if(isNavigate){
							var inputPage = catMods[i].module.inputPage;
							if(inputPage != null && inputPage != ''){
								var type = catMods[i].module.type;
								var title = catMods[i].module.name;
//								console.log(type);
								if(type >= 0){
									if(personAge <= 10){
										if(type == 0){
											lis = lis + '<li><a href="#" onclick="toNext(\'' + inputPage + '\');"><font size=2>' + title + '</font></a></li>';
										}continue;										
									}else{
										if(type == 1){
											if(personSex == '女'){
												lis = lis + '<li><a href="#" onclick="toNext(\'' + inputPage + '\');"><font size=2>' + title + '</font></a></li>';
											}else{
												continue;
											}
										}else{
											lis = lis + '<li><a href="#" onclick="toNext(\'' + inputPage + '\');"><font size=2>' + title + '</font></a></li>';
										}
									}
								}else{
									lis = lis + '<li><a href="#" onclick="toNext(\'' + inputPage + '\');"><font size=2>' + title + '</font></a></li>';
								}
							}
						}
					}
		            
					bar = bar + '<div><font size=2>编号：<span class="personId">' + personId + '</span></font></div>'+
							'<div><font size=2>姓名：<span class="personName">' + personName + '</span>&nbsp;&nbsp;性别：<span class="personSex">' + personSex + '</span></font></div>'+
							'<div><font size=2>出生日期：<span class="personBirthday">' + personBirthday + '</span></font></div>'+
							'<ul>'+
								lis
							'</ul>'+
						'</div>';
					$('.toolbar').append('<span style="float:right;">' + bar + '</span>');
					$('.toolbarHide span').hide();
			        // BUTTONS
					$('.fg-button').hover(
						function(){ $(this).removeClass('ui-state-default').addClass('ui-state-focus'); },
						function(){ $(this).removeClass('ui-state-focus').addClass('ui-state-default'); }
					);
					
					// MENUS    	
					$('#flat').menu({ 
						content: $('#flat').next().html(), // grab content from this page
						showSpeed: 400 
					});
				}
			});
		}else{
			bar = bar + '<div><font size=2>编号：<span class="personId"></span></font></div>'+
					'<div><font size=2>姓名：<span class="personName"></span>&nbsp;&nbsp;性别：<span class="personSex"></span></font></div>'+
					'<div><font size=2>出生日期：<span class="personBirthday"></span></font></div>'+
					'<ul>'+
						'<li><a href="#" onclick="toNext(\'/medicalExam.html\');"><font size=2>健康体检记录</font></a></li>'+
						'<li><a href="#" onclick="toNext(\'/babyvisit.html\');"><font size=2>新生儿家庭访视记录</font></a></li>'+
						'<li><a href="#" onclick="toNext(\'/childexam1.html\');"><font size=2>1岁以内儿童体检记录</font></a></li>'+
						'<li><a href="#" onclick="toNext(\'/childexam2.html\');"><font size=2>1至2岁儿童体检记录</font></a></li>'+
						'<li><a href="#" onclick="toNext(\'/childexam3_6.html\');"><font size=2>3~6岁儿童体检记录</font></a></li>'+
						'<li><a href="#" onclick="toNext(\'/firstvisit.html\');"><font size=2>第一次产前随访记录</font></a></li>'+
						'<li><a href="#" onclick="toNext(\'/VisitBeforeBorn.html\');"><font size=2>第2至5次产前随访记录</font></a></li>'+
						'<li><a href="#" onclick="toNext(\'/t2dm_visit.html\');"><font size=2>产后访视记录</font></a></li>'+
						'<li><a href="#" onclick="toNext(\'/visitAfterBorn42.html\');"><font size=2>产后42天健康检查记录</font></a></li>'+
						'<li><a href="#" onclick="toNext(\'/hyp_visit.html\');"><font size=2>高血压患者随访</font></a></li>'+
						'<li><a href="#" onclick="toNext(\'/t2dm_visit.html\');"><font size=2>2型糖尿病患者随访</font></a></li>'+
						'<li><a href="#" onclick="toNext(\'/furious_visit.html\');"><font size=2>重性精神疾病患者随访</font></a></li>'+
					'</ul>'+
				'</div>';
			$('.toolbar').append('<span style="float:right;">' + bar + '</span>');
			$('.toolbarHide span').hide();
			// BUTTONS
			$('.fg-button').hover(
				function(){ $(this).removeClass('ui-state-default').addClass('ui-state-focus'); },
				function(){ $(this).removeClass('ui-state-focus').addClass('ui-state-default'); }
			);
			
			// MENUS    	
			$('#flat').menu({ 
				content: $('#flat').next().html(), // grab content from this page
				showSpeed: 400 
			});
		}
	}
});