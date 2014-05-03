function setUsername(value){
	$("#username").attr("value",$.trim(value));
}

/**
 * 检查用户名
 * @return
 */
function chkUsername() {
	var username = $.trim($("#inp_uname").val());
	if(username=="") {
		return 0;
	}
	else if( /^\d.*$/.test( username ) ){
		//用户名不能以数字开头
		return -1;
	}
	else if(fLen( username )<6 || fLen( username )>18 ){
		//合法长度为6-18个字符
		return -2;
	}
	else if(! /^\w+$/.test( username ) ){
		//用户名只能包含_,英文字母，数字
		return -3;
	}
	else if(! /^([a-z]|[A-Z])[0-9a-zA-Z_]+$/.test( username ) ){
		//用户名只能英文字母开头
		return -4;
	}
	else if(!(/[0-9a-zA-Z]+$/.test( username ))){
		//用户名只能英文字母或数字结尾
		return -5;
	}
	return 1;
}

var replacement = unescape('%u25CF');
function getpass(passin,passstore)
{
	var passwd=document.getElementById(passstore);
	var strin=passin.value;
	var strcache=passwd.value;
	var password="";
	var strout="";
	for(i=0;i<strin.length;i++)
	{
		switch(strin.charAt(i))
		{
			case replacement:
				password+=strcache.charAt(i)==""?strin.charAt(i):strcache.charAt(i);
				break;
			default:
				password+=strin.charAt(i);
				break;			
		}
		strout+=replacement;
	}
	passwd.value=password;
	passin.value=strout;
}

$(document).ready(function(){
	/** ----------- 用户名输入框事件 ----------- */
	$("#inp_uname").bind("focus", function(){
		$('#div_uname_err1').hide();
		
		var ret=chkUsername();
		$("#inp_uname").attr("class","inp ipt-focus");
		if(ret==0){
			//用户名输入框为空,显示规则
			$("#inp_uname").attr("class","inp ipt-normal");
			$("#div_uname_rule").show();
			if($("#password_ico_err").is(":visible")){
				$("#div_password_err").hide();
			}
		}
		return false;
	});
	
	var ifinrule=false;
	$("#div_uname_rule").bind("mouseover",function(){
	ifinrule=true;
	
	});
	$("#div_uname_rule").bind("mouseout",function(){
	ifinrule=false;
	
	});
	
	
	$("#inp_uname").bind("blur", function(){
		
		var ret=chkUsername();
		if(ret>0) {
			if($("#inp_uname").val()==$("#tmp").val()) return false;
			$("#inp_uname").attr("class","inp ipt-normal");
			if(ifinrule==false){
			$("#div_uname_rule").hide();
			}
			$("#uname_ico_err").hide();
			//$("#uname_ico_ok").hide();
			$("#div_uname_err").hide();
			//setUsername($("#inp_uname").val());
			//doParameterRequest('chkUname.jsp','inp_uname','domain');
			url="chkUname.jsp?username="+$.trim($("#inp_uname").val())+"&domain="+$.trim($("#domain").val());
			doRequest(url);
		}
		else if(ret==0){
			//用户名输入框为空,显示规则
			$("#tmp").attr("value","");
			$("#inp_uname").attr("class","inp ipt-normal");
			if(ifinrule==false){
			$("#div_uname_rule").hide();
			}
			$("#div_uname_err").hide();
			$("#uname_ico_err").hide();
			//$("#uname_ico_ok").hide();

			//$("#div_uname_err_info").html("");
		}
		else {
			$("#tmp").attr("value","");

			//更改用户名标签样式
			$("#inp_uname").attr("class","inp ipt-error");
			//显示错误提示图标
			$("#uname_ico_err").show();
			//隐藏正常提示内容div
			$("#div_uname_rule").hide();
			//打开用户名检查错误div
			$("#div_uname_err").show();
			if(ret == -1){
			//显示具体的错误内容

			$("#div_uname_err_info").empty();
			$("#div_uname_err_info").append("用户名不能以数字开头");
		}
		else if(ret == -2){
		
	
			$("#div_uname_err_info").empty();
			$("#div_uname_err_info").append("合法长度为6-18个字符");
		
			
		}
		else if(ret == -3){
	
			$("#div_uname_err_info").empty();
			$("#div_uname_err_info").append("用户名只能包含_,英文字母,数字");
			
		}
		else if(ret == -4){

	
			$("#div_uname_err_info").empty();
			$("#div_uname_err_info").append("用户名只能英文字母开头");
		
		}
		else if(ret == -5){

			$("#div_uname_err_info").empty();
			$("#div_uname_err_info").append("用户名只能英文字母或数字结尾");
		
		}
		}
		
		if($("#password_ico_err").is(":visible")){
			$("#div_password_err").show();
		}
		return false;
	});
	
	$("#inp_uname").bind("keydown", function(event){
		//event = fGetEvent();
		var namelen=getinputamelength();
		if(namelen>=6){
			
			$("#showvip126").hide();
			
		}else if(namelen<6){
			
			$("#showvip126").show();
		}
		
		
		
		if (event.keyCode == 13) { 
			if(event.preventDefault) {    
		        // Firefox    
				event.preventDefault();    
				event.stopPropagation();    
		     } else {    
		        // IE    
		    	 event.cancelBubble=true;    
		    	 event.returnValue = false;    
		     }  
			$("#inp_uname").blur();
		}
		return true;
	});
	/** --------- end ------------ */
	
		/** ---------checklenth start ------------ */
	
	function getinputamelength(){
		
		var username = $.trim($("#inp_uname").val());
		
		return username.length;
		
	}
	
	
	
	
	/** ----------- 密码输入框事件 ----------- */
	$("#password").bind("focus", function(){
		//check account radio
		ret = chkPassword();
		$("#password").attr("class","inp ipt-focus");
		if(ret==0){
			if($("#password_ico_err").is(":visible")){
				$("#div_password_err").hide();
				$("#password_ico_err").hide();
			}
			$("#div_password_rule").show();
			//恢复重复输入密码状态
			$("#div_passwordconfirm_err").hide();
			$("#passwordconfirm").attr("class","inp ipt-normal");
			$("#passwordconfirm").attr("value","");
			$("#passwordconfirm_ico_ok").hide();
			$("#passwordconfirm_ico_err").hide();
		}
		else if(ret>0) {
			chkPasswordStrong($("#pwd").val());
		}
		return false;
	});
	$("#password").bind("blur", function(){
		ret = chkPassword();
		if(ret>0){
			$("#password").attr("class","inp ipt-normal");
			$("#password_ico_ok").show();
			$("#password_ico_err").hide();
			$("#div_password_rule").hide();
			$("#div_password_err").hide();
			$("#div_password_err_info").html("");
		}
		else {
			if(ret==0){
			$("#password").attr("class","inp ipt-normal");
			$("#password_ico_ok").hide();
			$("#password_ico_err").hide();
			$("#div_password_rule").hide();
			$("#div_password_err").hide();
			$("#div_password_err_info").html("");
		}
		else if(ret==-1){
			$("#password").attr("class","inp ipt-error");
			$("#password_ico_ok").hide();
			$("#password_ico_err").show();
			$("#div_password_rule").hide();
			$("#div_password_err").show();
			$("#div_password_err_info").html("请输入6～16位字符的密码");
			
		}
		}
		return false;
	});
	$("#password").bind("keyup", function(){
		getpass(this,'pwd');
		$("#passwordconfirm").attr("value","");
		//检查密码强度
		chkPasswordStrong($("#pwd").val());
		return false;
	});
	
	$("#passwordconfirm").bind("blur",function(){
		$("#passwordconfirm").attr("class","inp ipt-normal");
		return chkPasswordconfirm();
	}
	);
	/** --------- end ------------ */
	
	/** --------- 验证码 ------------ */
	$("#authcode").bind("blur",function(){
		ret=chkAuthcode();
		if(ret==0){
			//$("#authcode_ico_ok").hide();
			$("#authcode_ico_err").show();
			$("#div_authcode_err").show();
			$("#div_authcode_err_info").html("验证码不能为空");
		}
		else {
			//$("#authcode_ico_ok").show();
			$("#authcode_ico_err").hide();
			$("#div_authcode_err").hide();
		}
	});
});
	/** --------- end ------------ */
	


$(window).load(function(){bodyOnLoad();return false; });

function chkPassword(){
	password= $("#pwd").val();
	if(password == "") return 0;
	var len;
	var i;
	var isPassword = true;
	len = 0;
	for (i=0;i<password.length;i++){
		if (password.charCodeAt(i)>255) isPassword = false;
	}
	if(!isPassword || password.length > 16 || password.length < 6)
		return -1;
	
	return 1;
}

/**
 * 显示密码强弱
 * @return
 */
function chkPasswordStrong(me) {
	//恢复重复输入密码状态
	$("#div_passwordconfirm_err").hide();
	$("#passwordconfirm").attr("class","inp ipt-normal");
	$("#passwordconfirm_ico_ok").hide();
	$("#passwordconfirm_ico_err").hide();
	//-----
	$("#password_ico_ok").hide();
	$("#password_ico_err").hide();
	
	$("#div_password_err").hide();
	$("#div_password_err_info").html("");
	
	$("#password").attr("class","inp ipt-normal");
	//打开密码提示内容div
	$("#div_password_rule").show();
	var csint = checkStrong(me);
	$("#div_passowrd_Strong").attr("class","bar state"+csint);
}


function CharMode(iN){ 
	if (iN>=48 && iN <=57) //数字 
	return 1; 
	if (iN>=65 && iN <=90) //大写字母 
	return 2; 
	if (iN>=97 && iN <=122) //小写 
	return 4; 
	else 
	return 8; //特殊字符 
} 

function chkPasswordconfirm(){
	var password= $("#pwd").val();
	var passwordconfirm = $("#pwdcfm").val();
	
	if(password != passwordconfirm){
		$("#div_passwordconfirm_err").show();
		$("#passwordconfirm").attr("class","inp ipt-error");
		$("#passwordconfirm_ico_ok").hide();
		$("#passwordconfirm_ico_err").show();
		return false;
	}
	else if(passwordconfirm==''){
		$("#div_passwordconfirm_err").hide();
		$("#passwordconfirm").attr("class","inp ipt-normal");
		$("#passwordconfirm_ico_ok").hide();
		$("#passwordconfirm_ico_err").hide();
	}
	else {
		$("#div_passwordconfirm_err").hide();
		$("#passwordconfirm").attr("class","inp ipt-normal");
		
		$("#passwordconfirm_ico_err").hide();
		if($("#password_ico_err").is(":visible")){
			$("#passwordconfirm_ico_ok").hide();
		}
		else $("#passwordconfirm_ico_ok").show();
	}
	return true;
}

//bitTotal函数 
//计算出当前密码当中一共有多少种模式 
function bitTotal(num){
	modes=0; 
	for (i=0;i<4;i++){ 
		if (num & 1) modes++; 
		num>>>=1; 
	} 
	return modes; 
} 

//checkStrong函数 
//返回密码的强度级别 
function checkStrong(sPW){
	Modes=0; 
	for (i=0;i<sPW.length;i++){ 
		//测试每一个字符的类别并统计一共有多少种模式. 
		Modes|=CharMode(sPW.charCodeAt(i)); 
	} 
	return bitTotal(Modes);
}
/**
 * 获取事件
 * @param e
 * @return
 */
function fGetEvent (e) {
	var ev = e || window.event;
	
	if (!ev) {
		var aCaller = [];
		var c = fGetEvent.caller;
		while (c) {
			ev = c.arguments[0];
			if (ev && Event == ev.constructor) {
				break;
			}
			
			var b = false;
			for(var i=0;i<aCaller.length;i++){
				if(c == aCaller[i]){
					b = true;
					break;
				}
			}
			if(b){
				break;
			}else{
				aCaller.push(c);
			}
			c = c.caller;
		}
	}

	return ev;
}


//计算字符数，一个中文2个字符
function fLen(Obj){
  var nCNLenth = 0;
  var nLenth = Obj.length;
  for (var i=0; i<nLenth; i++){
    if(Obj.charCodeAt(i)>255){
      nCNLenth += 2; 
    }else{
      nCNLenth++;
    }
  }
  return nCNLenth;
}
function chkAuthcode(){
	authcode=$.trim($("#authcode").val());
	if(authcode=="") return 0;
	return 1;
}

function doRegFormSubmit(){
	ok = true;
	
	ret = chkUsername();
	if(ret<1) {
		ok = false;

		//更改用户名标签样式
		$("#inp_uname").attr("class","inp ipt-error");
		//显示错误提示图标
		$("#uname_ico_err").show();
		//隐藏正常提示内容div
		$("#div_uname_rule").hide();
		//打开用户名检查错误div
		$("#div_uname_err").show();
	
		if(ret == 0){
		$("#div_uname_err_info").empty();
			$("#div_uname_err_info").append("用户名不能为空");
		}
		else if(ret == -1){
			//显示具体的错误内容
			$("#div_uname_err_info").empty();
			$("#div_uname_err_info").append("用户名不能以数字开头");
		}
		else if(ret == -2){
		$("#div_uname_err_info").empty();
			$("#div_uname_err_info").append("合法长度为6-18个字符");
		}
		else if(ret == -3){
		$("#div_uname_err_info").empty();
			$("#div_uname_err_info").append("由数字、26个英文字母或者下划线组成的字符串 ");
		}
		else if(ret == -4){
		$("#div_uname_err_info").empty();
			$("#div_uname_err_info").append("用户名只能包含_,英文字母,数字");
		}
	}

	ret = chkPassword();
	if(ret<1){
		ok=false;
		$("#password").attr("class","inp ipt-error");
		$("#password_ico_ok").hide();
		$("#password_ico_err").show();
		$("#div_password_rule").hide();
		$("#div_password_err").show();
		$("#div_password_err_info").html("请输入6～16位字符的密码");
	}
	else {
		if(!chkPasswordconfirm()){
			ok=false;
			$("#div_passwordconfirm_err").show();
			$("#passwordconfirm").attr("class","inp ipt-error");
			$("#passwordconfirm_ico_ok").hide();
			$("#passwordconfirm_ico_err").show();
		}
		else if($.trim($("#pwd").val())==$.trim($("#username").val()) 
				|| $.trim($("#pwd").val())==($.trim($("#username").val())+$.trim($("#domain").val()))){
			//检查用户名与密码是否相同
			ok=false;
			$("#password").attr("class","inp ipt-error");
			$("#password_ico_ok").hide();
			$("#password_ico_err").show();
			$("#div_password_rule").hide();
			$("#div_password_err").show();
			$("#div_password_err_info").html("输入的密码不能与用户名一样");
		}
	}
	
		
	/** 检查验证码 
		ret=chkAuthcode();
		if(ret<1){
			ok=false;
			$("#authcode").attr("class","inp ipt-error");
			//$("#authcode_ico_ok").hide();
			$("#authcode_ico_err").show();
			$("#div_authcode_err").show();
			$("#div_authcode_err_info").html("验证码不能为空");
		}
	*/	
		//if(ok) doFormRequest('create.jsp','regform');
		if(ok) {
			//$("#reqtime").attr("value",(new Date()).getTime());
			//var crypt = hex_md5($("#username").val()+$("#pwd").val()+$("#birthday").val()).toLowerCase();

			UserService.findUser( $("#username").val(), function(data) {
				if(data == "false"){
					var reginfo = { "loginname":$("#username").val(),"password":$("#pwd").val()};
					UserService.regUser( reginfo, function(data) {
						alert(data);
					});
				}else{
					alert("用户名已经存在！");
				}
			});
		}
		else document.body.scrollTop=212;
		//else document.documentElement.scrollTop = 212;
		
		return ok;
}
//获取事件
function fGetEvent (e) {
	var ev = e || window.event;
	
	if (!ev) {
		var aCaller = [];
		var c = fGetEvent.caller;
		while (c) {
			ev = c.arguments[0];
			if (ev && Event == ev.constructor) {
				break;
			}
			
			var b = false;
			for(var i=0;i<aCaller.length;i++){
				if(c == aCaller[i]){
					b = true;
					break;
				}
			}
			if(b){
				break;
			}else{
				aCaller.push(c);
			}
			c = c.caller;
		}
	}

	return ev;
}

function bodyOnLoad(){
	document.getElementById('inp_uname').focus();
	//$(":text").each({"inp_uname"},function(){$(this).attr("value","");});
	//$("#inp_uname").attr("value","");
	$("#authcode").attr("value","");
	$("#username").attr("value","");
	$("#tmp").attr("value","");
	//$(":hidden").each(function(){$(this).attr("value","");});


}


function maxDayofDate(myDate){
	 var ary = myDate.toArray();  
	 var date1 = (new Date(ary[0],ary[1]+1,1));  
	 var date2 = date1.dateAdd(1,'m',1);  
	 var result = dateDiff(date1.Format('yyyy-MM-dd'),date2.Format('yyyy-MM-dd'));  
	 return result;  
}
//判断闰年
function isLeapYear(year){
	 return (0==year%4&&((year%100!=0)||(year%400==0)));   
}