(function(){
	doctorObj = {
		selectOrg : selectOrg,
		saveDoctors : saveDoctors,
		cancelDoctors : cancelDoctors
	}
	
	function selectOrg() {
		var $hospId = document.getElementById('hospId');
		var len = $hospId.length;
		if(len > 0){
			return;
		}else{
			PersonalInfoService.getOrg(function(data) {
				if (data != null) {
					for ( var i = 0; i < data.length; i++) {
						var option = document.createElement('option');
						option.value = data[i][0];
						option.text = data[i][1];
						try {
							$hospId.add(option, null); // standards compliant
						} catch (ex) {
							$hospId.add(option); // IE only
						}
					}
				}
			});
		}
	}
	
	function saveDoctors(){
		var $table = $('.addDoctors_Table');
		var $array = new Array();
		var i = 0;
		$(' input',$table).each(function(){
			var $this = $(this);
			var $type = $this.attr('type');
			var $val = $this.val();
			if($type == 'radio'){
				$type = $this.attr('checked');
				if($type){
					$array[i] = $val;
					i = i + 1;
				}
			}else{
				$array[i] = $val;
				i = i + 1;
			}
		});
		i = i + 1;
		$array[i] = $('#hospId').val();
		PersonalInfoService.saveDoctors($array,function(){
			Ext.Msg.alert('提示','保存成功!');
			cancelDoctors();
		});
	}
	
	
	function cancelDoctors(){
		var $table = $('.addDoctors_Table');
		$(' input',$table).each(function(){
			var $this = $(this);
			var $type = $this.attr('type');
			if($type == 'radio'){
				$('#male').attr('checked','checked');
			}else{
				$this.val('');
			}
		});
	}
})();

