Ext.ux.JSLoader = function(options) {
  
  Ext.ux.JSLoader.scripts[++Ext.ux.JSLoader.index] = {
    url: options.url,
    success: true,
    options: options,
    onLoad: options.onLoad || Ext.emptyFn,
    onError: options.onError || Ext.ux.JSLoader.stdError
  };
  
  Ext.Ajax.request({
    url: options.url,
    scriptIndex: Ext.ux.JSLoader.index,
    success: function(response, options) {
      var script = 'Ext.ux.JSLoader.scripts[' + options.scriptIndex + ']';
      // 在load的脚本中如果有 _tab 控件，则设置其 url 的属性
      var tabUrl = 'if (!( typeof _tab == "undefined" || _tab === null )) { _tab.url = ' + script + '.url; _tab = null;}';
      var exec = 'try { ' + response.responseText + '; ' + tabUrl + ' } catch(e) { '+script+'.success = false; '+script+'.onError('+script+'.options, e); }; if ('+script+'.success) '+script+'.onLoad('+script+'.options);';
      window.setTimeout(exec, 0);
    },
    failure: function(response, options) {
      var script = Ext.ux.JSLoader.scripts[options.scriptIndex];
      script.success = false;
      script.onError(script.options, response.status);
    }
  });
  
}

Ext.ux.JSLoader.index = 0;
Ext.ux.JSLoader.scripts = [];

Ext.ux.JSLoader.stdError = function(options, e) {
  window.alert('Error loading script:\n\n' + options.url + '\n\n(status: ' + e + ')');
}