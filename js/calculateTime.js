(function(){
	calculateTimeObj = {
		calculateWomanPreBirthTime : calculateWomanPreBirthTime,
		dateSub : dateSub,
		reduceDate : reduceDate,
		dateToStr : dateToStr,
		addZero : addZero,
		formatDate : formatDate
	}
	function addZero(val){
		if(val < 10)
			return '0' + val;
		return val;
	}
	
	function calculateWomanPreBirthTime(endTime,days){
		if(endTime != null && endTime != ''){
			var endTimeYear = parseFloat(endTime.substring(0,4));
			var endTimeMonth = endTime.substring(4,6)
			endTimeMonth = parseFloat(endTimeMonth);
			var endTimeDay = parseFloat(endTime.substring(6,8));
			var nextDate = new Date(endTimeYear,endTimeMonth - 1,endTimeDay + parseFloat(days));
			return nextDate.getFullYear() + '' + addZero(nextDate.getMonth() + 1) + addZero(nextDate.getDate());
		}
		return '';
	}
	
	function dateSub(d1,d2){
		if(d1 != null && d2 != null){
			return Math.floor((d1.getTime() - d2.getTime())/(24*60*60*1000));
		}
		return -1;
	}
	
	function reduceDate(date,months){
		date.setMonth(date.getMonth() - months);
		return date;
	}
	
	function dateToStr(date){
		return date.getFullYear() + '' + addZero(date.getMonth() + 1) + addZero(date.getDate());
	}
	function formatDate(date,sep){
		if(sep == null || sep == ''){
			return date.getFullYear() + '年' + addZero(date.getMonth() + 1) + '月' + addZero(date.getDate()) + '日';
		}
		return date.getFullYear() + sep + addZero(date.getMonth() + 1) + sep + addZero(date.getDate());
	}
})();