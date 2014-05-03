var valideCode = '';

function getValideCode(){
	var codeArray = ['A','B','C','D','E','F','G','H','I','J',
	                 'K','L','M','N','O','P','Q','R','S','T','U','V',
	                 'W','X','Y','Z'];
	var code = '';
	for(var i = 0;i < 4 ;i++){
		code = code + codeArray[Math.round(Math.random() * 25)]; 
	}
	$('#valideCode').val(code);
	return code;
}

function clearInput(){
	$('#j_username').val('');
	$('#j_password').val('');
	$('#code').val('');
}

function authentication(){
	var code = $('#code').val().toUpperCase();
	var j_username = $('#j_username').val();
	var j_password = $('#j_password').val();
	var msg = '';
	if(j_username == ''){
		msg = '用户名不能为空';
	}
	if(j_password == ''){
		if(msg != '')
			msg = msg + '<br />密码不能为空';
		else
			msg = '密码不能为空';
	}
	if(code != valideCode){
		if(msg != '')
			msg = msg + '<br />验证码错误';
		else
			msg = '验证码错误';
	}
	if(msg == ''){
		formSubmiter();
	}else{
		$(".error").html(msg);
	}
}

function formSubmiter() {
	  loginForm.action = '/j_spring_security_check';
	  loginForm.method = 'POST';
	  loginForm.submit();
	}

$().ready(function(){
	systemInformationUtils.getVal(3,function(data){
		$('.offlineDownload').attr('href',data + '/chrome_installer_552.210.exe');
		$('.pptDownload').attr('href',data + '/公卫培训PPT.rar');
	});
	
	clearInput();
	valideCode = getValideCode();
	$('#valideCode').click(function(){
		valideCode = getValideCode();
	});
	
	$('#login_sure').click(function(){
		authentication();
	});
	
	$("body").keypress(function(event){
        if(event.keyCode == 13 || event.keyCode == 10){    
            $("#login_sure").trigger('click');
        }
    });
	
	$('#login_cancel').click(function(){
		clearInput();
	});
	if(window.location.href.indexOf('login_error')>0){
		$(".error").html('用户名或密码错误!');
	}
});