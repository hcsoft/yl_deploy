jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
(function(){
    var med = ns('med');
    var validators = {};

    med.validator = function(name, func){
        if (arguments.length == 1){
            return validators[name];
        } else  {
            validators[name] = func;
        }
    }

    function VYearMonth(){
        function validateVal(v){
            var errRes = { valid : false, msg: "不是合理的年月数据格式" };
            if (typeof v == 'undefined' || v == '' || v.length != 6){
                return errRes;
            } else {
                var year = v.substring(0,4);
                var month = v.substring(4,6);
                var iY  = parseInt(year, 10);
                var iM  = parseInt(month, 10);
                if (isNaN(iY) || isNaN(iM)) {
                        return errRes;
                } else {
                    if (iY < 1000 || iY > 9999 || iM < 1 || iM > 12) {
                        return errRes;
                    }
                }
            } 
            return {valid: true, msg :""};
        }
        return {
            validateVal : validateVal,
            format : function(v){
                return v;
            }
        }

    }


    function VDate(){
         var arrayLookup = { '01' : 31,'03' : 31, 
                        '04' : 30,'05' : 31,
                        '06' : 30,'07' : 31,
                        '08' : 31,'09' : 30,
                        '10' : 31,'11' : 30,'12' : 31} ;
        function validateDate(y,m,d){

            var errMsg = [];
            var intDay = parseInt(d,10); 
            var intYear = parseInt(y, 10);

            if (intYear > 9999 || intYear < 1900) {
                errMsg.push("年份不合理");
            }

            //check if month value and day value agree
            if(arrayLookup[m] != null) {
              if(intDay <= arrayLookup[m] && intDay != 0){
                return errMsg; //found in lookup table, good date
              }else { 
                errMsg.push("日期非法");
                //return errMsg;
              }
            }            
            var intMonth = parseInt(m,10);
            if (intMonth == 2) { 
               if (intDay > 0 && intDay < 29) {
                 //  return true;
               }
               else if (intDay == 29) {
                 if ((intYear % 4 == 0) && (intYear % 100 != 0) || 
                     (intYear % 400 == 0)) {
                      // year div by 4 and ((not div by 100) or div by 400) ->ok
                   //  return true;
                 }    else {
                    errMsg.push("日期不复合闰年规则");
                 }
               } else {
                   errMsg.push("日期非法");
               }
            }  else {
                errMsg.push("月份非法");
            }
 
            
            return errMsg;
        }

        function validateVal(v) {
            var msg = "非法日期类型，参考格式： 20100112";
            var valid = (v.match(VDate.re) != null);
            if (valid) {
                var year = v.substring(0,4);
                var month = v.substring(4,6);
                var day = v.substring(6,8);

                var eMsg = validateDate(year, month, day);
                if (eMsg.length > 0 ) {
                    valid = false;
                    msg = eMsg.join("\n");
                }
                //console.error("date validation " + valid);
            } 
            return { valid : valid, msg : msg};
        }

        function padding(str, len, c){
            var res = str + "";
            while (res.length < len){
                res = c + "" + res;
            }
            return res;
        }

        return {
            validateVal : validateVal,
            format : function(v){
                if (v && typeof v == "object" || typeof v == "function") {
                    var month = v.getMonth() + 1
                    var day = v.getDate()
                    var year = v.getFullYear()
                    return year + "" + padding(month, 2 , '0') + padding(day, 2, '0');
                } else {
                    return v;
                }

            }
        }
    }

    VDate.re = /^\d{8}$/;

    function VInt(){
        function validateVal(v) {
            var valid = (v.match(VInt.re) != null);
            var msg = valid ? "" : "请输入整数类型";
            return { valid : valid, msg : msg};
        }

        return {
            validateVal : validateVal,
            preferCharValidate : true,
            format : function(v){
                return v;
            }
        }
    }

    VInt.re = /^\d+$/;

    function VNum(){
        function validateChar(v, c) {
            var valid = (v.match(VNum.charRe) != null);
            if (valid ){
                var idx = v.indexOf(".");
                if (idx == (v.length -1)  &&
                 (v.substring(0, v.length - 2)).indexOf(".") != -1)
                        valid = false;
            }
            var msg = valid ? "" : "请输入数字类型";
            return { valid : valid, msg : msg};
        }
        function validateVal(v) {
            var valid = (v.match(VNum.re) != null);
            var msg = valid ? "" : "请输入数字类型";
            return { valid : valid, msg : msg};
        }

        return {
            validateChar : validateChar,
            validateVal : validateVal,
            preferCharValidate : true,
            format : function(v){
                return v;
            }
        }
    }

    //VNum.re = /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/;
    VNum.re = /(^-?\d\d*\.\d\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/;
    VNum.charRe = /^(-)?(\d*)(\.?)(\d*)$/;

    function VRange(){
        function validateVal(v,min,max) {
            var valid = v >= min && v <= max;
            var msg = valid ? "" : "请输入" + min + "至" + max + "范围的值";
            return { valid : valid, msg : msg};
        }

        return {
            validateVal : validateVal,
            preferCharValidate : true,
            format : function(v){
                return v;
            }
        }
    }
    
    /*
    根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
        地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
        出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
        顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
        校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。

    出生日期计算方法。
        15位的身份证编码首先把出生年扩展为4位，简单的就是增加一个19或18,这样就包含了所有1800-1999年出生的人;
        2000年后出生的肯定都是18位的了没有这个烦恼，至于1800年前出生的,那啥那时应该还没身份证号这个东东，⊙﹏⊙b汗...
    下面是正则表达式:
     出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
     身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i            
     15位校验规则 6位地址编码+6位出生日期+3位顺序号
     18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位
     
     校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
                    公式(1)中： 
                    i----表示号码字符从由至左包括校验码在内的位置序号； 
                    ai----表示第i位置上的号码字符值； 
                    Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
                    i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
                    Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1

    */
    //身份证号合法性验证 
    //支持15位和18位身份证号
    //支持地址编码、出生日期、校验位验证
    function IDNumber(){
        function validateChar(v, c) {
            return { valid : true, msg : ""};
        }
        function validateVal(code) { 
            var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
            var tip = "";
            var pass= true;
            
            if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[x|X])?$/i.test(code)){
                tip = "身份证号格式错误";
                pass = false;
            }
            
           else if(!city[code.substr(0,2)]){
                tip = "地址编码错误";
                pass = false;
            }
            else{
                //18位身份证需要验证最后一位校验位
                if(code.length == 18){
                    code = code.split('');
                    //∑(ai×Wi)(mod 11)
                    //加权因子
                    var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                    //校验位
                    var parity = [ 1, 0 , 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                    var sum = 0;
                    var ai = 0;
                    var wi = 0;
                    for (var i = 0; i < 17; i++)
                    {
                        ai = code[i];
                        wi = factor[i];
                        sum += ai * wi;
                    }
                    var last = parity[sum % 11];
                    if(parity[sum % 11] != code[17].toUpperCase()){
                        tip = "校验位错误";
                        pass =false;
                    }
                }else if(code.length == 15){
                	
                }else{
                	tip = "格式或长度错误";
                    pass = false;
                }
            }
            //if(!pass) alert(tip);
            
            return { valid : pass, msg : tip};
            //return pass;
        }

        return {
            validateChar : validateChar,
            validateVal : validateVal,
            preferCharValidate : true,
            format : function(v){
                return v;
            }
        }
    }
        
    
    
    med.validator("date", VDate());
    med.validator("int", VInt());
    med.validator("num", VNum());
    med.validator("yearMonth", VYearMonth());

    med.validator("range", VRange());
    med.validator("idnumber", IDNumber());
 })()
