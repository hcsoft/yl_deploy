Ext.namespace('Ext.tf');

Ext.tf.CascadeComboBox = Ext.extend(Ext.form.ComboBox, {
    valueField: 'id',      
    displayField: 'name',
    emptyText:'请选择', 
    mode:'local',
    triggerAction:'all',
    disableCaching:false,
    autoLoad : true,
    autoSelect : true,
    extraParam: undefined,
    dwrFunction: undefined,
    parentId:undefined,
    serviceRec : new  Ext.data.Record.create([
                                         {name: 'id', mapping: 'taxorgcode'},  
                                         {name: 'parentId', mapping: 'parentId'},
                                         {name: 'name', mapping: 'taxorgname'}
                                ]),
    initComponent: function(){
       //在组件初始化期间调用的代码
       this.children = [];            
       //调用父类构造函数（必须）
       Ext.tf.CascadeComboBox.superclass.initComponent.apply(this, arguments);

       if (! this.dwrFunction) {
        this.dwrFunction = COptionProvider.getCascadeOpts;
       }

       //**设置数据源**
       this.store = new Ext.data.Store({  
             baseParams: this.params || {},  
             proxy: new Ext.ux.data.DWRProxy({
                    dwrFunction: this.dwrFunction
             }),

             reader: new Ext.data.ArrayReader({}, this.serviceRec)

            }); 

       if ( ! this.disableCaching)
       {
           this.store.genCacheKey = function(){
                var key = "";
                for (var i in this.baseParams)
                {
                    key += i + ":";
                    key += this.baseParams[i] + ":";
                }
                return key;
           };

           this.store.cache = {};

           this.store.on({
                'beforeLoad':{
                    fn: function(vstore, voptions){
                        var key = vstore.genCacheKey();
                        if (vstore.cache[key]) {
                            vstore.loadData(vstore.cache[key],false);
                            return false;
                        }
                        return true;
                    },
                    scope: this
                },
                'load' : {
                    fn : function( vstore, vrecords, voptions) {
                        var key = vstore.genCacheKey();
                        if (! vstore.cache[key]) {
                            vstore.cache[key]  = [];
                            for (var i = 0; i < vrecords.length; i++) {
                                vstore.cache[key].push(vrecords[i].data);
                            }
                        }

                    },
                    scope: this
                }
               });
       } //if diable caching
       else {
            this.store.on({
                'load' : {
                    fn : function(vstore, vrecords, voptions) {
                        if (vrecords.length == 1 && this.autoSelect) {
                           this.setValue(vrecords[0].data[this.valueField]);
                           this.fireEvent('select', this);
                        }
                    },
                    scope: this
                }
            });
       }

       if (this.parentId){
            var cmp = Ext.getCmp(this.parentId);
            if (cmp){
                cmp.addChild(this);
            }
       }
       
       if (this.autoLoad){
    	   this.reload();
       }

    },

    //设置默认值，并触发Select 事件
    setDefaultValue:function(v){
        this.setValue(v);
        this.fireEvent('select', this);
    },
    /**//** 向数据源添加request参数 */
    addParam:function(parameters){
            Ext.apply(this.store.baseParams, parameters);
    },
    
    listeners:{        
      select : function(combo, record,index){      
          if (combo.getValue() == combo.lastSelected) return;
          Ext.each(this.children, function(child){
                   child.cascadeClearValue();
                    //级联的子下拉框会多发送一个&parent=..的参数，后端据此可以做出判断如何加载数据
                   if (child.extraParam){
                       child.extraParam["parentId"] = combo.value;
                       child.addParam({extra:child.extraParam});  
                   } else {
                       child.addParam({parent:combo.value});  
                   }
                   child.reload();
          });   
          combo.lastSelected = combo.getValue();
       }      
   },   

   /**//** 添加下级级联的下拉框 */
   addChild:function(child){
       this.children.push(child);
       return this;
   },


   cascadeClearValue : function() {
          this.clearValue();
          Ext.each(this.children, function(child){
                   child.cascadeClearValue();
          });   
   },

   /**//** 重新加载数据源 */
   reload:function(){
      if(this.store)
           this.store.load();    
      if(this.defaultValue){
         this.setDefaultValue(this.defaultValue);
         this.defaultValue = null;   //默认值，只初始化一次
      }


      return this;
   }

});

Ext.reg('CCombo', Ext.tf.CascadeComboBox);
