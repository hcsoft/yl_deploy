Ext.ns("Ext.tf");

Ext.tf.tuberSupervise = new Ext.tf.HealthPanel({
	title : '结核病督导记录',
	treeLoaderFn: UserMenuTreeService.getUserDistrictNodes,
	queryUrl : UserMenuTreeService.getTuberSupervise,
	deleteUrl : function(){
		var selections = this.grid.getSelections();
	    if ( selections.length > 0 ) {
	      var array = [];
	      
	      var pk = this.recordPk;
	      Ext.each(selections, function(v) {
	        array.push(v.get( pk ));
	      });
	    }
	    UserMenuTreeService.removeTubers(array,function(data){
	    	var msg = '';
	    	if(data != ''){
	    		msg = '由于编号' + data +　'下有督导记录，没有删除成功!'
	    	}else{
	    		msg = '删除成功！'
	    	}
	    	Ext.Msg.show({
    			title: '错误提示',
    			msg : msg,
    			buttons: Ext.Msg.OK,
    			icon: Ext.MessageBox.ERROR
    		});
	    });
//	    this.grid.selModel.clearSelections();
	    this.grid.getStore().reload();
	},
	detailUrl : '/tuberSupervise.html',
	queryType : 'demo',
    recordId : 'id',
    recordPk: 'id',
    readerConfig : [
                     {name:'id',mapping: 'id'},
                     {name:'name',mapping: 'name'},
                     {name:'sex', mapping: 'sex'},
                     {name:'birthday', mapping: 'age'},
                     {name:'typeForSick', mapping: 'typeForSick'},
                     {name:'timeForStart', mapping: 'timeForStart'}
                   ],
    gridCmConfig :
                   [
                     {"header" : "编号", "dataIndex" : "id"},
                     { "header" : "姓名", "dataIndex" : "name" }, 
                     { "header" : "性别", "dataIndex" : "sex" }, 
                     { "header" : "年龄", "dataIndex" : "birthday"}, 
                     { "header" : "病型", "dataIndex" : "typeForSick" }, 
                     { "header" : "始治日期", "dataIndex" : "timeForStart" , "renderer": Ext.util.Format.dateRenderer('Y-m-d')}
                   ]
});
_tab = ModuleMgr.register(Ext.tf.tuberSupervise);