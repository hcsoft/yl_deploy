(function(){
	Component = {
		createLabel : createLabel,
		createTextfield : createTextfield,
		createDatefield : createDatefield,
		createFieldset : createFieldset,
		createCheckBox : createCheckBox,
		setVisibleDetail : setVisibleDetail,
		getColumnsIndexDetail : getColumnsIndexDetail,
		createTextarea : createTextarea,
		createDwrCombo : createDwrCombo,
		createButton : createButton,
		createComboBox : createComboBox
	}
	
	function setVisibleDetail(gridName,colsVisibleTrue,colsVisibleFalse){
		for(var i = 0;i< colsVisibleTrue.length;i++){
			Ext.getCmp(gridName).getColumnModel().setHidden(colsVisibleTrue[i], true);
		}
		for(var i = 0;i< colsVisibleFalse.length;i++){
			Ext.getCmp(gridName).getColumnModel().setHidden(colsVisibleFalse[i], false);
		}
	}

	function getColumnsIndexDetail(gridName,colName){
		return Ext.getCmp(gridName).getColumnModel().getIndexById(colName)
	}
	
	function createLabel(id, name, x, y, text) {
		return new Ext.form.Label({
			id : id,
			name : name,
			x : x,
			y : y,
			html : text
		});
	}
	
	function createTextfield(id,name,x,y,width,disabled,value,listeners){
		if(!arguments[5]) disabled = false;
		if(!arguments[6]) value = null;
		if(!arguments[7]) listeners = null;
		return new Ext.form.TextField({
			id : id,
			name : name,
			x : x,
			y : y,
			width : width,
			disabled : disabled,
			value : value,
			listeners : listeners,
			enableKeyEvents : true
		});
	}
	
	function createDatefield(id,name,x,y,format,width,val,disabled){
		if(!arguments[7]) disabled = false;
		return new Ext.form.DateField({
			id : id,
			name : name,
			x : x,
			y : y,
			format : format,
			width : width,
			value : val,
			disabled : disabled
		});
	}
	
	function createFieldset(id,name,x,y,title,items,width,height){
		var panel = new Ext.Panel({
			layout : 'absolute',
			items : items,
			height : height
		});
		return new Ext.form.FieldSet({
			autoHeight:true,
			defaults: {width: width},
			id : id,
			name : name,
			x : x,
			y : y,
			title : title,
			items : panel
		});
	} 
	function createCheckBox(id,name,x,y,boxLabel,checked,val,clicks){
		return new Ext.form.Checkbox({
			boxLabel : boxLabel,
			checked : checked,
			id : id,
			name : name,
			x : x,
			y : y,
			value : val,
			listeners : {
				'check' : {
					fn : clicks
				}
			} 
		});
	}
	
	function createComboBox(id,name,x,y,store,displayField,valueField,defVal,mode,width,emptyText){
		return new Ext.form.ComboBox({
			x : x,
			y : y,
			id : id,
			name : name,
			store: store,
	        displayField:displayField,
	        valueField: valueField,
	        typeAhead: true,
	        mode: mode,
	        triggerAction: 'all',
	        selectOnFocus:true,
	        editable: false,
	        width: width,
	        value: defVal,
	        emptyText : emptyText 
		});
	}
	
	function createTextarea(id,name,x,y,height,width,value,disabled){
		if(!arguments[7]) disabled = false;
		return new Ext.form.TextArea({
			id : id,
			name : name,
			x : x,
			y : y,
			height : height,
			width : width,
			value : value,
			disabled : disabled
		});
	}
	
	function createDwrCombo(x,y,optionName,hiddenName,minListWidth,width,defaultVal,id,name,extraParam){
		if(!arguments[9]) extraParam = undefined;
		return new Ext.tf.DWRCombo({
			x : x,
			y : y,
			xtype : 'DWRCombo',
			optionName : optionName,
			hiddenName : hiddenName,
			hasEmptyHeader : true,
			minListWidth : minListWidth,
			width : width,
			isDefaultVal : true,
			defaultVal : defaultVal,
			id : id,
			name : name,
			extraParam : extraParam
		});
	}
	
	function createButton(id,name,x,y,iconCls,listeners,text){
		return new Ext.Panel({
			id : id,
			name : name,
			x : x,
			y : y,
			items : [{
				xtype : 'button',
				iconCls : iconCls,
				listeners : listeners,
				text : text
			}]
		});
	}
})();