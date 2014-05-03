'use strict';
angular.module('all', [ 'ui', 'ui.bootstrap' ]).filter('idcard', function() {
	return function(input) {
		var out = "";
		if (input) {
			for ( var i = 0; i < input.length; i++) {
				if(i==0){
					out = input.charAt(i);
				}else{
					out = out + " " + input.charAt(i);
				}
			}
		}
		return out;
	}
}).filter('blanks', function() {
	return function(input, blanks) {
		var stand = 1.75
		var unicode = 3.5
		var out = input;
		var len = 0;
		blanks = blanks * stand ;
		if (input && input.length > 0) {
			for (i = 0; i < input.length; i++) {
				if (input.charCodeAt(i) > 128) {
					len += unicode;
				}else if (input.charCodeAt(i) != 32) {
					len += stand;
				}else {
					len += 1;
				}
			}
		}
		var differ = (blanks - len).toFixed(0)
		if (len < blanks) {
			var before = ((differ) / 2).toFixed(0)
			var after = differ - before;
			for ( var i = 0; i < before; i++) {
				out = "&nbsp;" + out;
			}
			for ( var i = 0; i < after; i++) {
				out = out + "&nbsp;";
			}
		}
		return out;
	}
}).filter('checked', function() {
	return function(input, value) {
		var width = "18";
		var list = [value];
		if(value.indexOf("|")>=0){
			var values = value.split("|");
			value = values[0];
			width = values[1];
		}
		if(value.indexOf(",")>=0){
			list = value.split(",");
		}
		var flag = false;
		for(var i = 0 ; i <list.length;i++){
			if(list[i]==input){
				flag = true;
				break;
			}
		}
		if (flag) {
			return "<span style='font-weight:bold;width:"+width+"px;text-align:right'>√</span>";
		} else {
			return "<span style='width:"+width+"px;'></span>";
		}
	}
}).filter('equal', function() {
	return function(input, value) {
		return angular.equals(input,value)
	}
}).filter('denc', function() {
	return function(input) {
		if (input) {
			return denc(input);
		} else {
			return input;
		}
	}
}).filter('date2', function() {
	return function(input,ele) {
		var type='label';
		if(ele){
			type = ele;
		}
		if (input) {
			return"<"+type+" style='width:46px;text-align:center'>"+moment(input).format("YYYY")+"</"+type+">年" +
					"<"+type+" style='width:32px;text-align:center'>"+moment(input).format("MM")+"</"+type+">月" +
					"<"+type+" style='width:32px;text-align:center'>"+moment(input).format("DD")+"</"+type+">日"
		} else {
			return"<"+type+" style='width:46px;text-align:center'>&nbsp;</"+type+">年" +
			"<"+type+" style='width:32px;text-align:center'>&nbsp;</"+type+">月" +
			"<"+type+" style='width:32px;text-align:center'>&nbsp;</"+type+">日"
		}
	}
}).filter('date3', function() {
	return function(input,ele) {
		var type='label';
		if(ele){
			type = ele;
		}
		if (input) {
			return"<"+type+" style='text-align:center'>"+moment(input).format("YYYY")+"</"+type+">年" +
					"<"+type+" style='text-align:center'>"+moment(input).format("MM")+"</"+type+">月" +
					"<"+type+" style='text-align:center'>"+moment(input).format("DD")+"</"+type+">日"
		} else {
			return"<"+type+" style='text-align:center'>&nbsp;</"+type+">年" +
			"<"+type+" style='text-align:center'>&nbsp;</"+type+">月" +
			"<"+type+" style='text-align:center'>&nbsp;</"+type+">日"
		}
	}
}).filter('true', function() {
	return function(input, value) {
		var text="";
		var text1="";
		if(value.indexOf("|")>=0){
			var values = value.split("|");
			value = values[0];
			text = values[1];
			text1 = values[2];
		}
		if (input ==value) {
			return text;
		} else {
			return text1;
		}
	}
}).filter('limit', function() {
	return function(input, value) {
		if(input &&　input.length > value){
			return input.substring(0,value);
		}else{
			return input;
		}
	}
}).directive('ngUnChecked', function() {
    // return the directive link function. (compile function not needed)
    return function(scope, element, attrs) {
      // watch the expression, and update the UI on change.
//      scope.$watch(attrs.ngUnChecked, function(value) {
    	  console.log("!!!!!"+attrs.ngUnChecked)
    	  var flag = scope.$apply(attrs.ngUnChecked)
        if(flag){
        	element.attr("checked", false);
        }
//      });
    }
  });
