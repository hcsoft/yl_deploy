

/**
 * 填充日期
 * @param date
 * @returns
 */
function fillDate(date){
	if(date <= 9){
		date = '0' + date;
	}
	return date;
}
/**
 * 获得当前日期及星期
 */
function getDate(){
	var weekday = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	var currentDate = year + '-' + fillDate(month) + '-' + fillDate(day) + ' ' + fillDate(hours) 
		+ ':' + fillDate(minutes) + ':' + fillDate(seconds) + '&nbsp;&nbsp;' + weekday[date.getDay()];
	$('#showDate').html(currentDate);
	
}
//定时调用
window.setInterval(getDate,1000);
//页面加载完成后执行
$().ready(function(){
	getDate();
});