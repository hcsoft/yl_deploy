function $F(_id) {
    return new $f(_id);
}

function $f(_id){
    this.observe = {};
    if (! (typeof _id == 'number')) {
        this.observe[_id] = true;
        this.expression = function(ctx){
            return ctx.getCtrl(_id).val();
        }
    } else {
        this.expression = function(){
            return _id;
        }
    }
    return this;
}

$f.merge = function(l,r){
 	return  $.extend({}, l,r);
}

$f.prototype.div = function(f) {
    this.observe = $f.merge(this.observe, f.observe);
    var oldExpr = this.expression;
    this.expression = function(ctx){
        return oldExpr(ctx) / f.expression(ctx);
    }
    return this;
};

$f.prototype.multi = function(f) {
    this.observe = $f.merge(this.observe, f.observe);
    var oldExpr = this.expression;
    this.expression = function(ctx){
        return oldExpr(ctx) * f.expression(ctx);
    }
    return this;
};

$f.prototype.hook = function(ctx, tgt){
    for (v in this.observe) {
       if (this.observe.hasOwnProperty(v)){
       var  c =  ctx.getCtrl(v);
       var vc = c.valChanged();
	   var self = this;
       c.valChanged(function(old, n) {
           if (vc) {
                vc(old, n);
            }
			var _v;
			try { _v = self.expression(ctx);
			} catch (e) {
				console.error(e);
			}
			if (!isNaN(_v)) {
				if (_v == Number.POSITIVE_INFINITY
					|| _v == Number.NEGATIVE_INFINITY ) {
					tgt.val('');
				} else {
					_v = _v.toFixed(2);
					tgt.val(_v); 
				}
				
			}
        });
       }
    }
}

$f.prototype.eval = function(){
    return this.expression();
};

