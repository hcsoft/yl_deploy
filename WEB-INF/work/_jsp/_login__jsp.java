/*
 * JSP generated by Resin-4.0.32 (built Mon, 01 Oct 2012 03:05:04 PDT)
 */

package _jsp;
import javax.servlet.*;
import javax.servlet.jsp.*;
import javax.servlet.http.*;

public class _login__jsp extends com.caucho.jsp.JavaPage
{
  private static final java.util.HashMap<String,java.lang.reflect.Method> _jsp_functionMap = new java.util.HashMap<String,java.lang.reflect.Method>();
  private boolean _caucho_isDead;
  private boolean _caucho_isNotModified;
  private com.caucho.jsp.PageManager _jsp_pageManager;
  
  public void
  _jspService(javax.servlet.http.HttpServletRequest request,
              javax.servlet.http.HttpServletResponse response)
    throws java.io.IOException, javax.servlet.ServletException
  {
    com.caucho.server.webapp.WebApp _jsp_application = _caucho_getApplication();
    com.caucho.jsp.PageContextImpl pageContext = _jsp_pageManager.allocatePageContext(this, _jsp_application, request, response, null, null, 8192, true, false);

    TagState _jsp_state = null;

    try {
      _jspService(request, response, pageContext, _jsp_application, _jsp_state);
    } catch (java.lang.Throwable _jsp_e) {
      pageContext.handlePageException(_jsp_e);
    } finally {
      _jsp_pageManager.freePageContext(pageContext);
    }
  }
  
  private void
  _jspService(javax.servlet.http.HttpServletRequest request,
              javax.servlet.http.HttpServletResponse response,
              com.caucho.jsp.PageContextImpl pageContext,
              javax.servlet.ServletContext application,
              TagState _jsp_state)
    throws Throwable
  {
    javax.servlet.jsp.JspWriter out = pageContext.getOut();
    final javax.el.ELContext _jsp_env = pageContext.getELContext();
    javax.servlet.ServletConfig config = getServletConfig();
    javax.servlet.Servlet page = this;
    javax.servlet.jsp.tagext.JspTag _jsp_parent_tag = null;
    com.caucho.jsp.PageContextImpl _jsp_parentContext = pageContext;
    response.setContentType("text/html");
    response.setCharacterEncoding("utf-8");

    out.write(_jsp_string0, 0, _jsp_string0.length);
  }

  private com.caucho.make.DependencyContainer _caucho_depends
    = new com.caucho.make.DependencyContainer();

  public java.util.ArrayList<com.caucho.vfs.Dependency> _caucho_getDependList()
  {
    return _caucho_depends.getDependencies();
  }

  public void _caucho_addDepend(com.caucho.vfs.PersistentDependency depend)
  {
    super._caucho_addDepend(depend);
    _caucho_depends.add(depend);
  }

  protected void _caucho_setNeverModified(boolean isNotModified)
  {
    _caucho_isNotModified = true;
  }

  public boolean _caucho_isModified()
  {
    if (_caucho_isDead)
      return true;

    if (_caucho_isNotModified)
      return false;

    if (com.caucho.server.util.CauchoSystem.getVersionId() != -5369645020726623044L)
      return true;

    return _caucho_depends.isModified();
  }

  public long _caucho_lastModified()
  {
    return 0;
  }

  public void destroy()
  {
      _caucho_isDead = true;
      super.destroy();
    TagState tagState;
  }

  public void init(com.caucho.vfs.Path appDir)
    throws javax.servlet.ServletException
  {
    com.caucho.vfs.Path resinHome = com.caucho.server.util.CauchoSystem.getResinHome();
    com.caucho.vfs.MergePath mergePath = new com.caucho.vfs.MergePath();
    mergePath.addMergePath(appDir);
    mergePath.addMergePath(resinHome);
    com.caucho.loader.DynamicClassLoader loader;
    loader = (com.caucho.loader.DynamicClassLoader) getClass().getClassLoader();
    String resourcePath = loader.getResourcePathSpecificFirst();
    mergePath.addClassPath(resourcePath);
    com.caucho.vfs.Depend depend;
    depend = new com.caucho.vfs.Depend(appDir.lookup("login.jsp"), -7639146607925395339L, false);
    _caucho_depends.add(depend);
  }

  final static class TagState {

    void release()
    {
    }
  }

  public java.util.HashMap<String,java.lang.reflect.Method> _caucho_getFunctionMap()
  {
    return _jsp_functionMap;
  }

  public void caucho_init(ServletConfig config)
  {
    try {
      com.caucho.server.webapp.WebApp webApp
        = (com.caucho.server.webapp.WebApp) config.getServletContext();
      init(config);
      if (com.caucho.jsp.JspManager.getCheckInterval() >= 0)
        _caucho_depends.setCheckInterval(com.caucho.jsp.JspManager.getCheckInterval());
      _jsp_pageManager = webApp.getJspApplicationContext().getPageManager();
      com.caucho.jsp.TaglibManager manager = webApp.getJspApplicationContext().getTaglibManager();
      com.caucho.jsp.PageContextImpl pageContext = new com.caucho.jsp.InitPageContextImpl(webApp, this);
    } catch (Exception e) {
      throw com.caucho.config.ConfigException.create(e);
    }
  }

  private final static char []_jsp_string0;
  static {
    _jsp_string0 = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\r\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\r\n<head>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\r\n<title>\u6606\u660e\u5e02\u516c\u5171\u536b\u751f\u670d\u52a1\u7ba1\u7406\u5e73\u53f0</title>\r\n<link href=\"css/login-new.css\" rel=\"stylesheet\" type=\"text/css\" />\r\n<script type='text/javascript' src='/dwr/engine.js'></script>\r\n<script type='text/javascript' src='/dwr/util.js'></script>\r\n<script type='text/javascript' src='/dwr/interface/systemInformationUtils.js'></script>\r\n<script type=\"text/javascript\" src=\"js/angularjs/jquery/jquery-1.9.1.min.js\"></script>\r\n<script type=\"text/javascript\" src=\"js/valideCode.js\"></script>\r\n</head>\r\n<body>\r\n	<div class=\"mbd\">\r\n		<div class=\"pnl\">\r\n			<form id=\"loginForm\">\r\n				<div class=\"input0\">\r\n					<font class='error'></font>\r\n				</div>\r\n				<div class=\"input1\">\r\n					<input id=\"j_username\" name=\"j_username\" type=\"text\" class=\"txt1\" />\r\n				</div>\r\n				<div class=\"input2\">\r\n					<input id=\"j_password\" name=\"j_password\" type=\"password\" maxlength=\"18\" class=\"txt1\" />\r\n				</div>\r\n				<div class=\"input2\">\r\n					<input name=\"code\" id='code' type=\"text\" class=\"txt2\" maxlength=\"4\" />\r\n					<input title=\"\u6362\u4e00\u4e2a\" id=\"valideCode\" readonly='true'></input>\r\n				</div>\r\n				<div class=\"input3\">\r\n					<a href=\"#\" class=\"loginb\" id=\"login_sure\"></a>\r\n					<a href=\"#\" class=\"canclb\" id=\"login_cancel\"></a>\r\n				</div>\r\n				<div class=\"input3\">\r\n					<div class=\"fr\">\r\n						<a href=\"/download/install_lodop.exe\">\u6253\u5370\u63a7\u4ef6\u4e0b\u8f7d</a>\r\n					</div>\r\n					<div class=\"fr gg\">\r\n						<a href=\"/download/chrome_installer_552.210.exe\">\u8c37\u6b4c\u6d4f\u89c8\u5668\u4e0b\u8f7d</a>\r\n					</div>\r\n				</div>\r\n			</form>\r\n		</div>\r\n		<script>\r\n			var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;\r\n			if (is_chrome) {\r\n\r\n			} else {\r\n				$(\".pnl\").hide();\r\n				document\r\n						.write(\"<div style='text-align:center;width:100%;margin:20px 0;color:#fff;'>\u7cfb\u7edf\u4e0d\u652f\u6301\u60a8\u76ee\u524d\u4f7f\u7528\u7684\u6d4f\u89c8\u5668\uff0c\u8bf7\u4e0b\u8f7d\u8c37\u6b4c\u6d4f\u89c8\u5668\uff1a<br><a style='color:red' href='/download/chrome_installer_552.210.exe'>\u8c37\u6b4c\u6d4f\u89c8\u5668\u4e0b\u8f7d</a> </div>\")\r\n			}\r\n		</script>\r\n	</div>\r\n</body>\r\n</html>\r\n".toCharArray();
  }
}
