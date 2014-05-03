<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>昆明市公共卫生服务管理平台</title>
<link href="css/login-new.css" rel="stylesheet" type="text/css" />
<script type='text/javascript' src='/dwr/engine.js'></script>
<script type='text/javascript' src='/dwr/util.js'></script>
<script type='text/javascript' src='/dwr/interface/systemInformationUtils.js'></script>
<script type="text/javascript" src="js/angularjs/jquery/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="js/valideCode.js"></script>
</head>
<body>
	<div class="mbd">
		<div class="pnl">
			<form id="loginForm">
				<div class="input0">
					<font class='error'></font>
				</div>
				<div class="input1">
					<input id="j_username" name="j_username" type="text" class="txt1" />
				</div>
				<div class="input2">
					<input id="j_password" name="j_password" type="password" maxlength="18" class="txt1" />
				</div>
				<div class="input2">
					<input name="code" id='code' type="text" class="txt2" maxlength="4" />
					<input title="换一个" id="valideCode" readonly='true'></input>
				</div>
				<div class="input3">
					<a href="#" class="loginb" id="login_sure"></a>
					<a href="#" class="canclb" id="login_cancel"></a>
				</div>
				<div class="input3">
					<div class="fr">
						<a href="/download/install_lodop.exe">打印控件下载</a>
					</div>
					<div class="fr gg">
						<a href="/download/chrome_installer_552.210.exe">谷歌浏览器下载</a>
					</div>
				</div>
			</form>
		</div>
		<script>
			var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
			if (is_chrome) {

			} else {
				$(".pnl").hide();
				document
						.write("<div style='text-align:center;width:100%;margin:20px 0;color:#fff;'>系统不支持您目前使用的浏览器，请下载谷歌浏览器：<br><a style='color:red' href='/download/chrome_installer_552.210.exe'>谷歌浏览器下载</a> </div>")
			}
		</script>
	</div>
</body>
</html>
