Ext.namespace('Ext.tf');

Ext.tf.DWRComboSelfOption = Ext.extend(Ext.form.ComboBox, {
	
    emptyText : '请选择...',  //默认值 
    mode : 'local',  //必须                  
    autoLoad : true, 
	pojoRec : new Ext.data.Record.create([
                      {name: 'id', mapping: 'id'},  
                      {name: 'name', mapping: 'name'}
	              ]),
	              
	triggerAction: 'all',
    displayField:'name',
    valueField:'id',
    extraParam: undefined,
    async: false,
    initComponent:function() {
		Ext.tf.DWRCombo.superclass.initComponent.call(this);
    	this.store = new Ext.data.Store({
			    	    proxy: new Ext.ux.data.DWRProxy({
			    	        dwrFunction: eval(this.optionService),
                            async: this.async
			    	   }), 
			    	   reader: new Ext.data.ArrayReader({}, this.pojoRec)
    	});
	
       	if (this.extraParam) {
       		Ext.apply(this.store.baseParams, {extra: this.extraParam});
       	}
       	this.store.load();


 
    } 
});
 
Ext.reg('DWRComboSelfOption', Ext.tf.DWRComboSelfOption);
