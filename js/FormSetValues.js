        Ext.override(Ext.form.BasicForm, {
            setValues : function(values){
                if (this.fireEvent('beforeload', this, values) !== false) {
                    if(values instanceof Array){ // array of objects
                        for(var i = 0, len = values.length; i < len; i++){
                            var v = values[i];
                            var f = this.findField(v.id);
                            if(f){
                                f.setValue(v.value);
                                if(this.trackResetOnLoad){
                                    f.originalValue = f.getValue();
                                }
                            }
                        }
                    }else{ // object hash
                        var field, id;
                        for(id in values){
                            if(typeof values[id] == 'object' ){
                                //alert('obj');
                                var obj = values[id];
                                this.__setValue(id, obj);
                            }
                            if(typeof values[id] != 'function' && (field = this.findField(id))){
                                field.setValue(values[id]);
                                if(this.trackResetOnLoad){
                                    field.originalValue = field.getValue();
                                }
                            }
                        }
                    }
                }
                return this;
            },

            __setValue : function(id, obj) {
               if (typeof obj == 'object') {
                    for(_id in obj){
                        this.__setValue(id + "." + _id, obj[_id]);
                    }
               } else {
                    //alert('id is ' + id);
                    var field = this.findField(id);
                    if (field)
                        field.setValue(obj);
               }
            }
        });


