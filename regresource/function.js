function setUsername(value){
	$("#username").attr("value",$.trim(value));
}

/**
 * ����û���
 * @return
 */
function chkUsername() {
	var username = $.trim($("#inp_uname").val());
	if(username=="") {
		return 0;
	}
	else if( /^\d.*$/.test( username ) ){
		//�û������������ֿ�ͷ
		return -1;
	}
	else if(fLen( username )<6 || fLen( username )>18 ){
		//�Ϸ�����Ϊ6-18���ַ�
		return -2;
	}
	else if(! /^\w+$/.test( username ) ){
		//�û���ֻ�ܰ���_,Ӣ����ĸ������
		return -3;
	}
	else if(! /^([a-z]|[A-Z])[0-9a-zA-Z_]+$/.test( username ) ){
		//�û���ֻ��Ӣ����ĸ��ͷ
		return -4;
	}
	else if(!(/[0-9a-zA-Z]+$/.test( username ))){
		//�û���ֻ��Ӣ����ĸ�����ֽ�β
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
	/** ----------- �û���������¼� ----------- */
	$("#inp_uname").bind("focus", function(){
		$('#div_uname_err1').hide();
		
		var ret=chkUsername();
		$("#inp_uname").attr("class","inp ipt-focus");
		if(ret==0){
			//�û��������Ϊ��,��ʾ����
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
			//�û��������Ϊ��,��ʾ����
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

			//�����û�����ǩ��ʽ
			$("#inp_uname").attr("class","inp ipt-error");
			//��ʾ������ʾͼ��
			$("#uname_ico_err").show();
			//����������ʾ����div
			$("#div_uname_rule").hide();
			//���û���������div
			$("#div_uname_err").show();
			if(ret == -1){
			//��ʾ����Ĵ�������

			$("#div_uname_err_info").empty();
			$("#div_uname_err_info").append("�û������������ֿ�ͷ");
		}
		else if(ret == -2){
		
	
			$("#div_uname_err_info").empty();
			$("#div_uname_err_info").append("�Ϸ�����Ϊ6-18���ַ�");
		
			
		}
		else if(ret == -3){
	
			$("#div_uname_err_info").empty();
			$("#div_uname_err_info").append("�û���ֻ�ܰ���_,Ӣ����ĸ,����");
			
		}
		else if(ret == -4){

	
			$("#div_uname_err_info").empty();
			$("#div_uname_err_info").append("�û���ֻ��Ӣ����ĸ��ͷ");
		
		}
		else if(ret == -5){

			$("#div_uname_err_info").empty();
			$("#div_uname_err_info").append("�û���ֻ��Ӣ����ĸ�����ֽ�β");
		
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
	
	
	
	
	/** ----------- ����������¼� ----------- */
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
			//�ָ��ظ���������״̬
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
			$("#div_password_err_info").html("������6��16λ�ַ�������");
			
		}
		}
		return false;
	});
	$("#password").bind("keyup", function(){
		getpass(this,'pwd');
		$("#passwordconfirm").attr("value","");
		//�������ǿ��
		chkPasswordStrong($("#pwd").val());
		return false;
	});
	
	$("#passwordconfirm").bind("blur",function(){
		$("#passwordconfirm").attr("class","inp ipt-normal");
		return chkPasswordconfirm();
	}
	);
	/** --------- end ------------ */
	
	/** --------- ��֤�� ------------ */
	$("#authcode").bind("blur",function(){
		ret=chkAuthcode();
		if(ret==0){
			//$("#authcode_ico_ok").hide();
			$("#authcode_ico_err").show();
			$("#div_authcode_err").show();
			$("#div_authcode_err_info").html("��֤�벻��Ϊ��");
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
 * ��ʾ����ǿ��
 * @return
 */
function chkPasswordStrong(me) {
	//�ָ��ظ���������״̬
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
	//��������ʾ����div
	$("#div_password_rule").show();
	var csint = checkStrong(me);
	$("#div_passowrd_Strong").attr("class","bar state"+csint);
}


function CharMode(iN){ 
	if (iN>=48 && iN <=57) //���� 
	return 1; 
	if (iN>=65 && iN <=90) //��д��ĸ 
	return 2; 
	if (iN>=97 && iN <=122) //Сд 
	return 4; 
	else 
	return 8; //�����ַ� 
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

//bitTotal���� 
//�������ǰ���뵱��һ���ж�����ģʽ 
function bitTotal(num){
	modes=0; 
	for (i=0;i<4;i++){ 
		if (num & 1) modes++; 
		num>>>=1; 
	} 
	return modes; 
} 

//checkStrong���� 
//���������ǿ�ȼ��� 
function checkStrong(sPW){
	Modes=0; 
	for (i=0;i<sPW.length;i++){ 
		//����ÿһ���ַ������ͳ��һ���ж�����ģʽ. 
		Modes|=CharMode(sPW.charCodeAt(i)); 
	} 
	return bitTotal(Modes);
}
/**
 * ��ȡ�¼�
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


//�����ַ�����һ������2���ַ�
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

		//�����û�����ǩ��ʽ
		$("#inp_uname").attr("class","inp ipt-error");
		//��ʾ������ʾͼ��
		$("#uname_ico_err").show();
		//����������ʾ����div
		$("#div_uname_rule").hide();
		//���û���������div
		$("#div_uname_err").show();
	
		if(ret == 0){
		$("#div_uname_err_info").empty();
			$("#div_uname_err_info").append("�û�������Ϊ��");
		}
		else if(ret == -1){
			//��ʾ����Ĵ�������
			$("#div_uname_err_info").empty();
			$("#div_uname_err_info").append("�û������������ֿ�ͷ");
		}
		else if(ret == -2){
		$("#div_uname_err_info").empty();
			$("#div_uname_err_info").append("�Ϸ�����Ϊ6-18���ַ�");
		}
		else if(ret == -3){
		$("#div_uname_err_info").empty();
			$("#div_uname_err_info").append("�����֡�26��Ӣ����ĸ�����»�����ɵ��ַ��� ");
		}
		else if(ret == -4){
		$("#div_uname_err_info").empty();
			$("#div_uname_err_info").append("�û���ֻ�ܰ���_,Ӣ����ĸ,����");
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
		$("#div_password_err_info").html("������6��16λ�ַ�������");
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
			//����û����������Ƿ���ͬ
			ok=false;
			$("#password").attr("class","inp ipt-error");
			$("#password_ico_ok").hide();
			$("#password_ico_err").show();
			$("#div_password_rule").hide();
			$("#div_password_err").show();
			$("#div_password_err_info").html("��������벻�����û���һ��");
		}
	}
	
		
	/** �����֤�� 
		ret=chkAuthcode();
		if(ret<1){
			ok=false;
			$("#authcode").attr("class","inp ipt-error");
			//$("#authcode_ico_ok").hide();
			$("#authcode_ico_err").show();
			$("#div_authcode_err").show();
			$("#div_authcode_err_info").html("��֤�벻��Ϊ��");
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
					alert("�û����Ѿ����ڣ�");
				}
			});
		}
		else document.body.scrollTop=212;
		//else document.documentElement.scrollTop = 212;
		
		return ok;
}
//��ȡ�¼�
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
//�ж�����
function isLeapYear(year){
	 return (0==year%4&&((year%100!=0)||(year%400==0)));   
}