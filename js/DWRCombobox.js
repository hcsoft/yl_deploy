Ext.namespace('Ext.tf');

Ext.tf.DWRCombo = Ext.extend(Ext.form.ComboBox, {

	// 是否显示空的选择项，例如“请选择..."
	hasEmptyHeader : false,

	readOnly : false,
	emptyText : '请选择...', // 默认值
	mode : 'local', // 必须
	autoLoad : true,
	pojoRec : new Ext.data.Record.create([ {
		name : 'id',
		mapping : 'id'
	}, {
		name : 'name',
		mapping : 'name'
	} ]),
	// id : '',
	isDefaultVal : false,
	defaultVal : null,
	typeAhead : true,
	dwrFun : OptionProvider.getOptions,
	triggerAction : 'all',
	displayField : 'name',
	valueField : 'id',
	extraParam : undefined,
	whereParam : undefined,
	async : false,
	initComponent : function() {
		Ext.tf.DWRCombo.superclass.initComponent.call(this);
		this.store = new Ext.data.Store({
			proxy : new Ext.ux.data.DWRProxy({
				dwrFunction : this.dwrFun,
				async : this.async
			}),
			reader : new Ext.data.ArrayReader({}, this.pojoRec)
		});
		this.store.on('load', function(s, records) {
			if (this.hasEmptyHeader) {
				var record = new Ext.data.Record({
					id : "",
					name : this.emptyText
				});
				s.insert(0, [ record ]);
			}
			if (this.isDefaultVal) {
				this.setValue(this.defaultVal);
			}
		}, this);

		if (this.optionName && this.autoLoad) {
			if (this.extraParam) {
				Ext.apply(this.store.baseParams, {
					optName : this.optionName,
					extra : this.extraParam
				});
			} else if(this.whereParam){
				Ext.apply(this.store.baseParams, {
					optName : this.optionName,
					extra : this.whereParam,
					other : ''
				});
			}else {
				Ext.apply(this.store.baseParams, {
					optName : this.optionName
				});
			}
			this.store.load();
		}

	}
});

Ext.reg('DWRCombo', Ext.tf.DWRCombo);

Ext.tf.DWROptionCombo = Ext.extend(Ext.form.ComboBox, {

	// 是否显示空的选择项，例如“请选择..."
	hasEmptyHeader : false,
	optionName : this.optionName,
	readOnly : false,
	emptyText : '请选择...', // 默认值
	mode : 'local', // 必须
	autoLoad : true,
	pojoRec : new Ext.data.Record.create([ {
		name : 'id',
		mapping : 'id'
	}, {
		name : 'name',
		mapping : 'name'
	} ]),

	typeAhead : true,
	triggerAction : 'all',
	displayField : 'name',
	valueField : 'id',
	extraParam : undefined,
	async : false,
	initComponent : function() {
		Ext.tf.DWRCombo.superclass.initComponent.call(this);
		this.store = new Ext.data.Store({
			data : this.optionName,
			reader : new Ext.data.ArrayReader({}, this.pojoRec)
		});
		this.store.on('load', function(s, records) {
			if (this.hasEmptyHeader) {
				var record = new Ext.data.Record({
					id : "",
					name : this.emptyText
				});
				s.insert(0, [ record ]);
			}
		}, this);

	}
});

Ext.reg('DWROptionCombo', Ext.tf.DWROptionCombo);

Ext.tf.DWRInitcodeCombo = Ext.extend(Ext.form.ComboBox, {

	// 是否显示空的选择项，例如“请选择..."
	hasEmptyHeader : false,
	readOnly : false,
	emptyText : '请选择...', // 默认值
	mode : 'local', // 必须
	autoLoad : true,
	pojoRec : new Ext.data.Record.create([ {
		name : 'id',
		mapping : 'id'
	}, {
		name : 'name',
		mapping : 'name'
	} ]),

	typeAhead : true,
	dwrFun : OptionProvider.getWhereOptions,
	triggerAction : 'all',
	displayField : 'name',
	valueField : 'id',
	extraParam : undefined,
	async : false,
	initComponent : function() {
		Ext.tf.DWRCombo.superclass.initComponent.call(this);
		this.store = new Ext.data.Store({
			proxy : new Ext.ux.data.DWRProxy({
				dwrFunction : this.dwrFun,
				async : this.async
			}),
			reader : new Ext.data.ArrayReader({}, this.pojoRec)
		});
		this.store.on('load', function(s, records) {
			if (this.hasEmptyHeader) {
				var record = new Ext.data.Record({
					id : "",
					name : this.emptyText
				});
				s.insert(0, [ record ]);
			}
		}, this);

		if (this.optionName && this.autoLoad) {
			if (this.extraParam) {
				Ext.apply(this.store.baseParams, {
					optName : this.optionName,
					extra : this.extraParam
				});
			} else {
				Ext.apply(this.store.baseParams, {
					optName : this.optionName
				});
			}
			this.store.load();
		}

	}
});

Ext.reg('DWRInitcodeCombo', Ext.tf.DWRInitcodeCombo);

Ext.tf.DWRDrugCombo = Ext.extend(Ext.form.ComboBox, {

	// 是否显示空的选择项，例如“请选择..."
	hasEmptyHeader : false,
	readOnly : false,
	emptyText : '请选择...', // 默认值
	mode : 'local', // 必须
	autoLoad : true,
	pojoRec : new Ext.data.Record.create([ {
		name : 'Code',
		mapping : 'code',
		type : "string"
	}, {
		name : 'Name',
		mapping : 'name',
		type : "string"
	}, {
		name : 'RecType',
		mapping : 'recType',
		type : "string"
	}, {
		name : 'Spec',
		mapping : 'spec',
		type : "string"
	}, {
		name : 'Unit',
		mapping : 'unit',
		type : "string"
	}, {
		name : 'RetailPrice',
		mapping : 'retailPrice',
		type : "string"
	}, {
		name : 'uploadClassID',
		mapping : 'uploadClassID',
		type : "string"
	}, {
		name : 'uploadItemCode',
		mapping : 'uploadItemCode',
		type : "string"
	}, {
		name : 'uploadFeeTypeID',
		mapping : 'uploadFeeTypeID',
		type : "string"
	} ]),
	id : this.id,
	name : this.name,
	typeAhead : true,
	dwrFun : OptionProvider.getDrugOptions,
	triggerAction : 'all',
	displayField : 'Name',
	valueField : 'Name',
	extraParam : undefined,
	async : false,
	forceSelection : true,

	initComponent : function() {
		Ext.tf.DWRCombo.superclass.initComponent.call(this);
		this.store = new Ext.data.Store({
			proxy : new Ext.ux.data.DWRProxy({
				dwrFunction : this.dwrFun,
				async : this.async
			}),
			reader : new Ext.data.ArrayReader({}, this.pojoRec)
		});
		this.store.on('load', function(s, records) {
			if (this.hasEmptyHeader) {
				var record = new Ext.data.Record({
					id : "",
					name : this.emptyText
				});
				s.insert(0, [ record ]);
			}
		}, this);
		this.on('beforeselect', function(s, record, index) {
			this.ownerCt.findById("drugcode").setValue(record.data.Code);
			this.ownerCt.findById("type_id").setValue(record.data.RecType);
			this.ownerCt.findById("price").setValue(record.data.RetailPrice);
			this.ownerCt.findById("unit").setValue(record.data.Unit);
			this.ownerCt.findById("spec").setValue(record.data.spec);
			this.ownerCt.findById("uploadClassID").setValue(
					record.data.uploadClassID);
			this.ownerCt.findById("uploadItemCode").setValue(
					record.data.uploadItemCode);
			this.ownerCt.findById("uploadFeeTypeID").setValue(
					record.data.uploadFeeTypeID);
			return true;
		}, this);
		this.store.load();
	}
});
Ext.reg('DWRDrugCombo', Ext.tf.DWRDrugCombo);
