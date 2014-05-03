function denc(str){
	return str;
//    if(! str || !str.length){
//        return "";
//    }
//    var denclist = '$&@*!.:=>}€‚ƒˆ‰Š‹ŒŽ‘’•–àáâãäæççèéêëìßÞÝÜÛÜÛÚÙØÖÕÔÓÒÑÐÏÊÉÇÆÄÃ£Á';
//    var enclist =  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//    var result = "";
//    var tmpStr = "";
//    for (var i = 0; i < str.length; i++) {
//        tmpStr = str.substr(i,1);
//        if (tmpStr !== "%") {
//            var index = denclist.indexOf(tmpStr);
//            if (index<0) {
//                tmpStr = String.fromCharCode(tmpStr.charCodeAt(0) ^ 'c'.charCodeAt(0));
//            } else {
//                tmpStr = enclist.substr(index,1);
//            }
//        }
//        result = result + tmpStr;
//    }
//    return result;
}


function enc(str){
	return str;
//    if(! str || !str.length){
//        return "";
//    }
//    var denclist = '$&@*!.:=>}€‚ƒˆ‰Š‹ŒŽ‘’•–àáâãäæççèéêëìßÞÝÜÛÜÛÚÙØÖÕÔÓÒÑÐÏÊÉÇÆÄÃ£Á';
//    var enclist =  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//    var result = "";
//    var tmpStr = "";
//    for (var i = 0; i < str.length; i++) {
//        tmpStr = str.substr(i,1);
//        if (tmpStr !== "%") {
//            var index = enclist.indexOf(tmpStr);
//            if (index<0) {
//                tmpStr = String.fromCharCode(tmpStr.charCodeAt(0) ^ 'c'.charCodeAt(0));
//            } else {
//                tmpStr = denclist.substr(index,1);
//            }
//        }
//        result = result + tmpStr;
//    }
//    return result;
}