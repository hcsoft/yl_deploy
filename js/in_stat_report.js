$(function(){
        //depends on g-val medObj;
        var $M = medObj;
        var mCtrl = $M.getCtrl('reportMonth');
        var ocl = mCtrl.valChanged();
        var fBtn = $('.fetch');
        mCtrl.valChanged(function(o,n){
            if (ocl) {
                ocl(o,n);
            }
            if (typeof n != 'undefined' && n != null && n != ''){
                fBtn.attr('disabled', false);
            } else {
                fBtn.attr('disabled', true);
            }
        });
        fBtn.click(function(){
            var dist = $M.getCtrl('districtNumber').val();
            var month = $M.getCtrl('reportMonth').val();
            $M.showDialog("<li>正在获取数据...</li>");
            StatService.stat(dist, month, {callback : function(d){
                   console.log("report got data from server");
                   $M.hideDialog();
                   var realMod = {};
                   for(var p in d) {
                    if (d.hasOwnProperty(p)){
                        if ( d[p] != null ) {
                            realMod[p] = d[p];
                        }
                    }
                   }
                   console.log(realMod);
                   $M.setModel(realMod); 
                },
                errorHandler : function(errStr, e){
                    $M.hideDialog();
                    $M.showDialog(errStr, true);
                    console.error(e);
                }
            });
        });
});
