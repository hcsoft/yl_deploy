(function(){
	showInfoObj = {
		Error : Error,
		Infor : Infor,
		askInfo : askInfo
	}
	
	function Error(msg){
		Ext.Msg.show({
			title:'错误',
			msg: msg,
			buttons: Ext.Msg.OK,
			animEl: 'elId',
			icon: Ext.MessageBox.ERROR
		});
	}
	
	function Infor(msg,fn){
		if(!arguments[1]) fn = null;
		Ext.Msg.show({
			title:'提示',
			msg: msg,
			buttons: Ext.Msg.OK,
			animEl: 'elId',
			icon: Ext.MessageBox.INFO,
			fn : fn
		});
	}
	
	function askInfo(msg,fn){
		Ext.Msg.show({
			title:'提示',
			msg: msg,
			buttons: Ext.Msg.YESNO,
			animEl: 'elId',
			icon: Ext.MessageBox.QUESTION,
			fn : fn
		});
	}
})();