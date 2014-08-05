Ext.onReady(function(){
	$('.onlineTakePhoto').click(function(){
		var onlineTakePhotoPanel = new Ext.Panel({			
			html : '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+
					'id="onlineTakePhoto" width="356" height="340"'+
						'codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab">'+
						'<param name="movie" value="onlineTakePhoto.swf" />'+
						'<param name="quality" value="high" />'+
						'<param name="bgcolor" value="#a6c9e2" />'+
						'<param name="allowScriptAccess" value="sameDomain" />'+
						'<embed src="onlineTakePhoto.swf" quality="high" bgcolor="#a6c9e2"'+
							'width="356" height="340" name="onlineTakePhoto" align="middle"'+
							'play="true"'+
							'loop="false"'+
							'quality="high"'+
							'allowScriptAccess="sameDomain"'+
							'type="application/x-shockwave-flash"'+
							'pluginspage="http://www.adobe.com/go/getflashplayer">'+
						'</embed>'+
					'</object>'
		});
		
		var win = new Ext.Window({
			height : 380,
			frame : true,
			draggable : false,
			modal : true,
			width : 300,
			closable : false,
			draggable : false,
			resizable : false,
			items : [onlineTakePhotoPanel,{
				xtype : 'button',
				text : '关闭窗口',
				handler : function(){
					PersonalInfoService.getHeadPicture(function(data){
					    console.log(data);
						if(data){
							$('#onlinePhoto img').attr('src','headPicture/' + data);
							$('.onlineTakePhoto').hide();
						}
					});
					win.close();
				}
			}]
			
		});
		window.closePhotoWin = function(){
			PersonalInfoService.getHeadPicture(function(data){
			    console.log(data);
				if(data){
					$('#onlinePhoto img').attr('src','headPicture/' + data);
					$('.onlineTakePhoto').hide();
				}
			});
			win.close();
		}
		win.show(this);
		win.doLayout();
	});
});