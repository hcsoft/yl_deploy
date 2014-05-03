(function() {
	certificateObj = {
		clearAllInput : clearAllInput,
		regExp : regExp,
		validNumber : validNumber,
		validNull : validNull,
		compareNumber : compareNumber
	}
	
	function clearAllInput(propId,tableId){
		var $this = $('#' + propId);
		$this.focus();
		$('#' + tableId + ' input').each(function(){
			$(this).val('');
		});
	}
	
	function regExp($currentEle){
		var reg =/^\d+$/;
		var $this = $currentEle.val();
		var matched = $this.match(reg);
		if(matched == null){
			$currentEle.val('');
//			$(this).focus();
		}else if($this == 0){
			$currentEle.val('');
		}
	}
	
	function validNumber(conditions){
		$('.' + conditions).each(function(){
			$(this).bind('blur',function(){
				regExp($(this));
			});
		})
	}
	
	function compareNumber(conditions,propId){
		$('.' + conditions).each(function(){
			var $this = $(this);
			$this.bind('blur',function(){
				regExp($this);
				var id = $this.attr('id');
				var val = $this.val();
				var len = id.length;
				var suffix = id.substring(len - 1,len);
				var prefVal = $('#' + propId + suffix).val();
				if(prefVal != ''){
					if(val < prefVal){
						$this.val('');
						$('#' + propId + suffix).val('');
					}
				}else{
					$this.val('');
				}
			});
		})
	}
	
	function validNull(val){
		if(val != null && val != '')
			return true;
		return false;
	}
})();