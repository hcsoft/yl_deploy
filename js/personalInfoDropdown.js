function selectHover(select,show){
	$('#' + select).hover(function(){
		$('#' + show).css("display","inline");
	});
}

function showHover(select,show){
	$('#' + select).hover(function(){
		$('#' + show).css("display","inline");
	},function(){
		$('#' + show).css("display","none");
	});
}

function getDoctors(hospId,unit){
	PersonalInfoService.getDoctors(hospId,function(data){
		if(data != null){
			$html = '';
			for(var i = 0;i<data.length;i++){
				$html += '<span>' + data[i][0] + '</span><a><font>' + data[i][1] + '</font></a><br/>';
			}
			$('#showBuildPerson').html($html);
			$('#showDoctor').html($html);
			$('#showBuildPerson span').css("display","none");
			$('#showDoctor span').css("display","none");
			selectHover('selectBuildPerson','showBuildPerson');
			showHover('showBuildPerson','showBuildPerson');
			selectHover('selectDoctor','showDoctor');
			showHover('showDoctor','showDoctor');
			$('#showBuildPerson font').click(function(){
				var person = $(this).html();
				$('#buildPerson input').val(person);				
				$('#showBuildPerson').css("display","none");
			});
			$('#showDoctor font').click(function(){
				var doctor = $(this).html();
				$('#doctor input').val(doctor);
				$('#showDoctor').css("display","none");
			});
		}else{
			var msg = unit + '没有设置建档人或医生,请问需求添加建档人或医生吗？';
			Ext.Msg.show({
				title : '提示',
				msg : msg,
				buttons : Ext.Msg.YESNO,
				animEl: 'elId',
				icon: Ext.MessageBox.QUESTION,
				width : 250,
				fn : function(e){								
					if(e == 'yes'){									
						var doctorPanel = new Ext.Panel({
							frame : true,
							width : 300,
							height : 280,
							autoLoad : 'addDoctors.html'										
						});
						
						var win = new Ext.Window({
							modal : true,
						    autoHeight : true,
						    title : '新增',
							width : 300,
							height : 300,
							frame : true,
							items : [doctorPanel],
							buttonAlign : 'left',
							buttons : [{
								text : '关闭',
								handler : function(){
									getDoctors(hospId,unit);
									win.close();
								}
							}]
						});
						
						win.show();
					}
				}
			});
		}
	});
}

$(document).ready(function(){
	selectHover('selectBuildUnit','showSelectUnit');
	showHover('showSelectUnit','showSelectUnit');
	PersonalInfoService.getCurrentOrg(function(data){
		if(data != null){
			var $html = '';
			for(var i = 0;i<data.length;i++){
				$html += '<span>' + data[i][0] + '</span><a><font>' + data[i][1] + '</font></a><br/>';
			}
			$('#showSelectUnit').html($html);
			$('#showSelectUnit span').css("display","none");
			$('#showSelectUnit font').click(function(){
				var unit = $(this).html();
				$('#buildUnit input').val(unit);
				$('#buildPerson input').val('');
				$('#doctor input').val('');
				$('#showSelectUnit').css("display","none");
				var hospId = $(this).parent('a').prev('span').html();
				getDoctors(hospId,unit);
			});
		}
	});
});