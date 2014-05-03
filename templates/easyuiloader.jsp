<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html style="height:100%;width:100%;">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="/js/easyui/themes/hc/easyui.css">
		<link rel="stylesheet" type="text/css" href="/js/easyui/themes/icon.css">
        <!---->
        <script type="text/javascript" src="/js/easyui/jquery-1.8.0.min.js"></script>
		<script type="text/javascript" src="/js/jquery-validation/jquery.validate.js"></script>
		<script type="text/javascript" src="/js/jquery-validation/localization/messages_zh.js"></script>
        <script type="text/javascript" src="/js/easyui/jquery.easyui.min.js"></script>
        <script type="text/javascript" src="/js/easyui/locale/easyui-lang-zh_CN.js"></script>
        <script src="/js/angularjs/angular.min.js"></script>
		<script src="/js/angularjs/controllers/controllers.js"></script>
		<script type='text/javascript' src='/dwr/engine.js'></script>
		<script type='text/javascript' src='/dwr/util.js'></script>
		<script type='text/javascript' src='/dwr/interface/CommonExamService.js'></script>
        <script>
        // $(function(){
            // $.parser.parse();
        // })        </script>
    </head>
    <body ng-app>
        <div class="easyui-panel" 
        data-options="fit:true,href:'<%=request.getParameter ("url")%>',cache:false"></div>
    </body>
</html>