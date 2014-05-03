
/**
 * 通用功能
 */
CommonUtil=function(){
};

CommonUtil.prototype.myDateFormat = function(d,format){   
   var   o   =   {   
       "M+"   :   d.getMonth()+1,   //month   
       "d+"   :   d.getDate(),         //day   
       "h+"   :   d.getHours(),       //hour   
       "m+"   :   d.getMinutes(),   //minute   
       "s+"   :   d.getSeconds(),   //second   
       "q+"   :   Math.floor((d.getMonth()+3)/3),     //quarter   
       "S"   :   d.getMilliseconds()   //millisecond   
   }   
   if(/(y+)/.test(format))   format=format.replace(RegExp.$1,   
       (d.getFullYear()+"").substr(4   -   RegExp.$1.length));   
   for(var   k   in   o)if(new   RegExp("("+   k   +")").test(format))   
       format   =   format.replace(RegExp.$1,   
           RegExp.$1.length==1   ?   o[k]   :     
               ("00"+   o[k]).substr((""+   o[k]).length));   
   return   format;   
}; 

/**
 * 判断是否为空
 * @param {} value
 * @return {Boolean}
 */
CommonUtil.prototype.isNull=function(value){
	if(value==null||value==undefined||value=={}||value==[]||String(value).trim()==""){
		return true;
	}else{
		return false;
	}
}

CommonUtil.prototype.formatText=function(text,align){
	return "<div style='text-align:"+align+";'>"+text+"</div>";
}

/**
 * 格式化小数:xxx.xx%
 * @param {} value
 * @return {}
 */
CommonUtil.prototype.formatPercent=function(str){
	var dight=this.formatDight(str*100,6);
	return dight+"%";
}
/**
 * 格式化数字1000分位：xxx,xxx,xxx.xxx
 * @param {} str
 * @return {}
 */
CommonUtil.prototype.formatMoney=function(str) {
	str=(isNaN(str)?"0.00":String(str));
	
	var point = str.indexOf(".");
	if(point==-1)
	{
		str=str+".00";
		point = str.indexOf(".");
	}
	
	var whole = str.substring(0, point);

	var fraction =str.substring(point + 1,str.length);

	// alert(whole+"["+point+"]"+fraction);

	var formatString = "";

	for (var i = whole.length - 1; i >= 0; i = i - 3) {
		if (i - 2 > 0) {
			formatString = "," + whole.substring(i - 2, i + 1) + formatString;
		} else {
			formatString = whole.substring(0, i + 1) + formatString;
		}
	}
	while(fraction.length<2){
		fraction+="0";
	}
	
	return "<div style='text-align:right;'>"+(formatString.length==0?"0":formatString) + "." + fraction+"</div>";
}
/**
 * 格式化数字 12.99
 * @param {} str
 * @return {}
 */
CommonUtil.prototype.formatNumber=function(str,maxValue){
	maxValue=(maxValue==null?999999999999.99:maxValue);
	str=(isNaN(str)?"0.00":String(this.formatDight((str>maxValue?maxValue:str),2)));
	
	var point = str.indexOf(".");
	if(point==-1)
	{
		str=str+".00";
		point = str.indexOf(".");
	}
	var whole = str.substring(0, point);
	var fraction = str.substring(point + 1, str.length);
	while(fraction.length<2){fraction+="0";}
	return (whole.length==0?"0":whole)+"."+fraction;
}
/**
 * 四舍五入
 * @param {} Dight
 * @param {} How
 * @return {}
 */
CommonUtil.prototype.formatDight=function(Dight,How)   
{   
	Dight=Math.round(Dight*Math.pow(10,How))/Math.pow(10,How);
	return Dight;
}
/**
 * 格式化日期字符串
 * @param {} date
 * @param {} format
 * @return {}
 */
CommonUtil.prototype.formatDate=function(date,format){
	var rgExp = /\d{1,}/g;
	var nums=[];
	if(CommonUtil.isNull(format)){
		format="yyyy年mm月dd日";
	}
	for(var i=0;i<3;i++) {
		var num = rgExp.exec(date);
			//alert(rowno);
		if (num == null || num == undefined || num == "null") {
			break;
		}
		nums[i]=num;
	}
	format=format.replace("yyyy",nums[0]).replace("mm",nums[1]).replace("dd",nums[2]);
	return format;
}
/**
 * 比较日期 
 * date1 > date2 return true
 * @param {} date1
 * @param {} date2
 */
CommonUtil.prototype.compareDate=function(date1,date2){
	
	var   re=/^(\d{4})-(\d{1,2})-(\d{1,2})$/;   
	
	var   r=date1.match(re);   
	var   d=new   Date(r[1],r[2]-1,r[3]);   
	d.getFullYear()==r[1]&&d.getMonth()==r[2]-1&&d.getMonth()==r[3];   
	      
	      r=date2.match(re);     
	var   e=new   Date(r[1],r[2]-1,r[3]);   
	e.getFullYear()==r[1]&&d.getMonth()==r[2]-1&&d.getMonth()==r[3];   

//	println(date1+">"+date2+":"+(d>e));
	return d>e;
}

/**
 *获得序列号的通用方法
 */
CommonUtil.prototype.getSerialno=function(prefix,suffix){
	var date=new Date();
	return prefix+date.getFullYear()+date.getMonth()+date.getDate()+date.getHours()+date.getMinutes()+date.getSeconds()+date.getMilliseconds()+suffix;
}
var CommonUtil=new CommonUtil();