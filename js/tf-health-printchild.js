Ext.ns("Ext.tf");
function getChildPrintCfg01(data,orgmap){
	//1.封面(封面 封底.jpg)
	var retprintcfg = {
		title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:title_intWidth,intHeight:title_intHeight,strContent:"1、封面"},
		data:[	]
	}
	var count =0;
	var pos = new Array();
	pos[count++] =  new Array("1.88cm","8.89cm","0.5cm","0.61cm");
	pos[count++] =  new Array("1.88cm","9.39cm","0.5cm","0.61cm");
	pos[count++] =  new Array("1.88cm","9.9cm","0.5cm","0.61cm");
	pos[count++] =  new Array("1.88cm","10.4cm","0.5cm","0.61cm");
	pos[count++] =  new Array("1.88cm","10.8cm","0.5cm","0.61cm");
	pos[count++] =  new Array("1.88cm","11.24cm","0.5cm","0.61cm");
	pos[count++] =  new Array("1.88cm","11.99cm","0.5cm","0.61cm");
	pos[count++] =  new Array("1.88cm","12.49cm","0.5cm","0.61cm");
	pos[count++] =  new Array("1.88cm","12.99cm","0.5cm","0.61cm");
	pos[count++] =  new Array("1.88cm","13.78cm","0.5cm","0.61cm");
	pos[count++] =  new Array("1.88cm","14.29cm","0.5cm","0.61cm");
	pos[count++] =  new Array("1.88cm","14.79cm","0.5cm","0.61cm");
	pos[count++] =  new Array("1.88cm","15.5cm","0.5cm","0.61cm");
	pos[count++] =  new Array("1.88cm","16.01cm","0.5cm","0.61cm");
	pos[count++] =  new Array("1.88cm","16.48cm","0.5cm","0.61cm");
	pos[count++] =  new Array("1.88cm","16.91cm","0.5cm","0.61cm");
	pos[count++] =  new Array("1.88cm","17.38cm","0.5cm","0.61cm");
	pos[count++] =  new Array("1.88cm","17.89cm","0.5cm","0.61cm");
	pos[count++] =  new Array("7.3cm","6.46cm","2.01cm","0.61cm");
	pos[count++] =  new Array("7.3cm","10.24cm","1.01cm","0.61cm");
	pos[count++] =  new Array("7.3cm","13.26cm","2.01cm","0.61cm");
	pos[count++] =  new Array("7.99cm","6.46cm","2.01cm","0.61cm");
	pos[count++] =  new Array("7.99cm","13.26cm","2.01cm","0.61cm");
	pos[count++] =  new Array("8.7cm","6.46cm","4cm","0.61cm");
	pos[count++] =  new Array("8.7cm","13.26cm","2.01cm","0.61cm");
	pos[count++] =  new Array("10cm","1.96cm","1.27cm","0.61cm");
	pos[count++] =  new Array("10cm","3.36cm","1.3cm","0.61cm");
	pos[count++] =  new Array("10cm","4.97cm","1.27cm","0.61cm");
	pos[count++] =  new Array("10cm","7.46cm","2.01cm","0.61cm");
	pos[count++] =  new Array("10cm","11.17cm","2.01cm","0.61cm");
	pos[count++] =  new Array("10cm","14.76cm","1.93cm","0.61cm");
	pos[count++] =  new Array("10.8cm","1.96cm","1.3cm","0.61cm");
	pos[count++] =  new Array("10.8cm","3.36cm","1.27cm","0.61cm");
	pos[count++] =  new Array("10.8cm","4.97cm","1.27cm","0.61cm");
	pos[count++] =  new Array("10.8cm","7.46cm","2.01cm","0.61cm");
	pos[count++] =  new Array("10.8cm","11.17cm","2.01cm","0.61cm");
	pos[count++] =  new Array("10.8cm","14.76cm","1.93cm","0.61cm");
	pos[count++] =  new Array("11.59cm","5.56cm","6.01cm","0.61cm");

	count = 0 ;
	var value=new Array();
	//	18位编号
	value[count++] = data.fileNo.substr(0,1);
	value[count++] = data.fileNo.substr(1,1);
	value[count++] = data.fileNo.substr(2,1);
	value[count++] = data.fileNo.substr(3,1);
	value[count++] = data.fileNo.substr(4,1);
	value[count++] = data.fileNo.substr(5,1);
	value[count++] = data.fileNo.substr(6,1);
	value[count++] = data.fileNo.substr(7,1);
	value[count++] = data.fileNo.substr(8,1);
	value[count++] = data.fileNo.substr(9,1);
	value[count++] = data.fileNo.substr(10,1);
	value[count++] = data.fileNo.substr(11,1);
	value[count++] = data.fileNo.substr(12,1);
	value[count++] = data.fileNo.substr(13,1);
	value[count++] = data.fileNo.substr(14,1); 
	value[count++] = data.fileNo.substr(15,1);
	value[count++] = data.fileNo.substr(16,1);
	value[count++] = data.fileNo.substr(17,1);
	
	value[count++] = data.name;//	姓名
	value[count++] = data.personalInfo.sex;//	性别
	value[count++] = data.personalInfo.allergies;//	过敏史
	value[count++] = "";//	母亲姓名
	value[count++] = "";//	父亲姓名
	value[count++] = Ext.util.Format.date(data.buildDate,"Y-m-d");//	建册-日期
	value[count++] = data.buildUnit;//	建册单位
	value[count++] = "";//	户籍-省
	value[count++] = "";//	市
	value[count++] = "";//	区
	value[count++] = "";//	街
	value[count++] = "";//	村
	value[count++] = data.residenceAddress;//	门牌号
	var orgnames = data.personalInfo.homeId.split("\n");
	value[count++] = orgnames[0];//	现住-省
	value[count++] = orgnames[1];//	市
	//value[count++] = orgmap.getNodeById(data.fileNo.substr(0,6));//	区
	value[count++] = orgnames[2];//	区
	value[count++] = data.township;//	街
	value[count++] = data.village;//	村
	value[count++] = data.address;//	门牌号
	value[count++] = g_tel;//	辖区妇保联系电话
	for(var i = 0 ; i < count ; i++){
		if(value[i] == null || value[i] == NaN || (value[i].toLowerCase && (value[i].toLowerCase() ==="null" || value[i].toLowerCase() ==="nan")) ){
			value[i] = "";
		}
		retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
	}
	return retprintcfg;
}

function getChildPrintCfg02(data,orgmap){
	//alert(printdata(data));
	//2.儿童基本档案(1-2.jpg)
	var retprintcfg = {
		title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:title_intWidth,intHeight:title_intHeight,strContent:"2、儿童基本档案"},
		data:[	]
	};
	var pos = new Array();
	var count = 0 ;
	pos[count++] =  new Array("17.04cm","2.83cm","2.01cm","0.61cm");
	pos[count++] =  new Array("17.04cm","4.52cm","1.01cm","0.61cm");
	pos[count++] =  new Array("17.04cm","5.61cm","1.01cm","0.61cm");
	pos[count++] =  new Array("17.04cm","6.72cm","1.01cm","0.61cm");
	pos[count++] =  new Array("17.04cm","7.73cm","1.01cm","0.61cm");
	pos[count++] =  new Array("17.04cm","11.32cm","1.01cm","0.61cm");
	pos[count++] =  new Array("17.04cm","13.31cm","0.5cm","0.61cm");
	pos[count++] =  new Array("17.04cm","16.93cm","1.01cm","0.61cm");
	pos[count++] =  new Array("17.04cm","18.92cm","0.5cm","0.61cm");
	pos[count++] =  new Array("17.81cm","4.42cm","1.01cm","0.61cm");
	pos[count++] =  new Array("17.81cm","6.32cm","1.01cm","0.61cm");
	pos[count++] =  new Array("17.81cm","7.62cm","0.5cm","0.61cm");
	pos[count++] =  new Array("17.81cm","11.32cm","2.01cm","0.61cm");
	pos[count++] =  new Array("17.81cm","13.12cm","0.5cm","0.61cm");
	pos[count++] =  new Array("17.81cm","16.62cm","1.51cm","0.61cm");
	pos[count++] =  new Array("17.81cm","18.92cm","0.5cm","0.61cm");
	pos[count++] =  new Array("18.31cm","2.91cm","1.01cm","0.61cm");
	pos[count++] =  new Array("18.31cm","7.01cm","2.01cm","0.61cm");
	pos[count++] =  new Array("18.31cm","11.43cm","2.01cm","0.61cm");
	pos[count++] =  new Array("18.31cm","16.22cm","0.5cm","0.61cm");
	pos[count++] =  new Array("18.31cm","17.52cm","0.5cm","0.61cm");
	pos[count++] =  new Array("18.31cm","18.81cm","0.5cm","0.61cm");
	pos[count++] =  new Array("19.02cm","3.12cm","0.5cm","0.61cm");
	pos[count++] =  new Array("19.02cm","6.51cm","0.5cm","0.61cm");
	pos[count++] =  new Array("19.02cm","10.53cm","0.5cm","0.61cm");
	pos[count++] =  new Array("19.02cm","12.33cm","0.5cm","0.61cm");
	pos[count++] =  new Array("19.02cm","13.52cm","0.5cm","0.61cm");
	pos[count++] =  new Array("19.02cm","14.71cm","0.5cm","0.61cm");
	pos[count++] =  new Array("19.61cm","3.81cm","9cm","0.61cm");
	pos[count++] =  new Array("21.11cm","2.51cm","2.01cm","0.61cm");
	pos[count++] =  new Array("21.11cm","4.52cm","2.01cm","0.61cm");
	pos[count++] =  new Array("21.11cm","6.51cm","3.6cm","0.61cm");
	pos[count++] =  new Array("21.11cm","10.03cm","3.49cm","0.61cm");
	pos[count++] =  new Array("21.72cm","2.51cm","2.01cm","0.61cm");
	pos[count++] =  new Array("21.72cm","4.52cm","2.01cm","0.61cm");
	pos[count++] =  new Array("21.72cm","6.51cm","3.6cm","0.61cm");
	pos[count++] =  new Array("21.72cm","10.03cm","3.49cm","0.61cm");
	pos[count++] =  new Array("22.91cm","4.23cm","0.5cm","0.61cm");
	pos[count++] =  new Array("22.91cm","5.42cm","0.5cm","0.61cm");
	pos[count++] =  new Array("22.91cm","8.41cm","0.5cm","0.61cm");
	pos[count++] =  new Array("22.91cm","11.32cm","0.5cm","0.61cm");
	pos[count++] =  new Array("22.91cm","12.73cm","0.5cm","0.61cm");
	pos[count++] =  new Array("22.91cm","14.02cm","0.5cm","0.61cm");
	pos[count++] =  new Array("22.91cm","15.53cm","0.5cm","0.61cm");
	pos[count++] =  new Array("23.52cm","3.52cm","0.5cm","0.61cm");
	pos[count++] =  new Array("23.52cm","5.13cm","0.5cm","0.61cm");
	pos[count++] =  new Array("23.52cm","7.12cm","6.01cm","0.61cm");
	pos[count++] =  new Array("24.13cm","4.52cm","0.5cm","0.61cm");
	pos[count++] =  new Array("24.13cm","5.53cm","0.5cm","0.61cm");
	pos[count++] =  new Array("24.13cm","6.93cm","0.5cm","0.61cm");
	pos[count++] =  new Array("24.13cm","7.91cm","0.5cm","0.61cm");
	pos[count++] =  new Array("24.13cm","8.73cm","0.5cm","0.61cm");
	pos[count++] =  new Array("24.13cm","10.72cm","0.5cm","0.61cm");
	pos[count++] =  new Array("24.13cm","12.62cm","0.5cm","0.61cm");
	pos[count++] =  new Array("24.71cm","1.32cm","0.5cm","0.61cm");
	pos[count++] =  new Array("24.71cm","3.62cm","6.01cm","0.61cm");
	pos[count++] =  new Array("25.32cm","2.83cm","0.5cm","0.61cm");
	pos[count++] =  new Array("25.32cm","3.81cm","0.5cm","0.61cm");
	pos[count++] =  new Array("25.32cm","6.32cm","6.01cm","0.61cm");
	pos[count++] =  new Array("25.82cm","4.52cm","0.5cm","0.61cm");
	pos[count++] =  new Array("25.82cm","5.93cm","0.5cm","0.61cm");
	pos[count++] =  new Array("25.82cm","8.63cm","6.01cm","0.61cm");
	pos[count++] =  new Array("26.41cm","3.81cm","0.5cm","0.61cm");
	pos[count++] =  new Array("26.41cm","4.92cm","0.5cm","0.61cm");
	pos[count++] =  new Array("26.41cm","7.33cm","6.01cm","0.61cm");



	var value = new Array();
	count=0
	//	出生日期
	value[count++] = Ext.util.Format.date(data.cert.birthday,"Y");
	value[count++] = Ext.util.Format.date(data.cert.birthday,"m");
	value[count++] = Ext.util.Format.date(data.cert.birthday,"d");
	value[count++] = Ext.util.Format.date(data.cert.birthday,"H");
	value[count++] = Ext.util.Format.date(data.cert.birthday,"i");
	if(data.cert.weight != null ){
		value[count++] = data.cert.weight;//	出生体重
		value[count++] = "";
	}else{
		value[count++] = "";
		value[count++] = "√";
	}
	if(data.cert.height != null ){
		value[count++] = data.cert.height;//	出生身长
		value[count++] = "";
	}else{
		value[count++] = "";
		value[count++] = "√";
	}
	
	if( data.birth.apgar01 != null  ||  data.birth.apgar02 != null ){
		value[count++] = data.birth.apgar01;//Apgar评分
		value[count++] = data.birth.apgar02;//Apgar评分
		value[count++] = "";
	}else{
		value[count++] = "";
		value[count++] = "";
		value[count++] = "√";
	}
	if(data.file.bloodTypeAbo != null ){
		value[count++] = data.file.bloodTypeAbo;//ABO血型
		value[count++] = "";
	}else{
		value[count++] = "";
		value[count++] = "√";
	}
	if(data.file.bloodTypeRh != null  ){
		value[count++] = data.file.bloodTypeRh;//RH血型
		value[count++] = "";
	}else{
		value[count++] = "";
		value[count++] = "√";
	}
	value[count++] = data.birth.borthWeekly;//出生孕周
	//	孕次
	value[count++] = "";
	//	产次
	value[count++] = "";
	//	胎数
	value[count++] = "";
	value[count++] = "";
	value[count++] = "";
	//	分娩方式
	if(data.birth.childbirthWay == "顺产"){
		//1.自然分娩
		value[count++] = "√";
		value[count++] = "";
		value[count++] = "";
		value[count++] = "";
		value[count++] = "";
		value[count++] = "";
	}else if(data.birth.childbirthWay == "臀产" || data.birthRecord.childbirthWay == "胎吸" ||  data.birthRecord.childbirthWay == "产钳"){
		//2.手术助产
		value[count++] = "";
		value[count++] = "√";
		if(data.birth.childbirthWay == "臀产")
			value[count++] = "√";
		else
			value[count++] = "";
		if(data.birth.childbirthWay == "胎吸")
			value[count++] = "√";
		else
			value[count++] = "";
		if(data.birth.childbirthWay == "产钳")
			value[count++] = "√";
		else
			value[count++] = "";
	}else if(data.birth.childbirthWay == "剖宫产"){
		//3.剖宫产
		value[count++] = "";
		value[count++] = "";
		value[count++] = "";
		value[count++] = "";
		value[count++] = "";
		value[count++] = "√";
	}
	//	助产机构名称
	value[count++] = data.birth.borthOrganization;
	//	父亲-生育年龄
	value[count++] = data.cert.fatherAge;
	//	民族
	value[count++] = data.cert.fatherNation;
	//	文化程度 无字段
	value[count++] = "";
	//	职业 无字段
	value[count++] = "";
	//	母亲-生育年龄
	value[count++] = data.cert.motherAge;
	//	民族
	value[count++] = data.cert.motherNation;
	//	文化程度 无字段
	value[count++] = "";
	//	职业 无字段
	value[count++] = "";
	//	母亲孕周异常情况 无字段 难取数
	value[count++] = "";
	value[count++] = "";
	value[count++] = "";
	value[count++] = "";
	value[count++] = "";
	value[count++] = "";
	value[count++] = "";
	value[count++] = "";
	value[count++] = "";
	value[count++] = "";
	//	小儿围产期异常情况 无字段
	value[count++] = "";
	value[count++] = "";
	value[count++] = "";
	value[count++] = "";
	value[count++] = "";
	value[count++] = "";
	value[count++] = "";
	value[count++] = "";
	value[count++] = "";
	//	出生缺陷
	if(data.birth.birthDefects === "无"){
		value[count++] = "√";
		value[count++] = "";
		value[count++] = "";
	}else{
		value[count++] = "";
		value[count++] = "√";
		value[count++] = data.birth.birthDefectsOther;
	}
	//	新生儿疾病筛查情况 只有 1. 已测2. 估计3. 未测,没有正常异常其他 diseaseScreening
	value[count++] = "";
	value[count++] = "";
	value[count++] = "";
	//	家庭遗传性疾病 无字段
	value[count++] = "";
	value[count++] = "";
	value[count++] = "";
	
	for(var i = 0 ; i < count ; i++){
		if(value[i] == null || value[i] == NaN || (value[i].toLowerCase && (value[i].toLowerCase() ==="null" || value[i].toLowerCase() ==="nan")) ){
			value[i] = "";
		}
		retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
	}
	return retprintcfg;
}

function getChildPrintCfg03(data,col){
	//3.新生儿访视记录表-第1页(3-4.jpg)
	var colspace = 2.9;
	var baseleft = 5+col*colspace;
	var retprintcfg = {
		title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:title_intWidth,intHeight:title_intHeight,strContent:"3、新生儿访视记录表-第1页"},
		data:[	]
	};
	var pos = new Array();
	var count = 0 ;
	pos[count++] =  new Array("16.59cm",baseleft+"cm","2.91cm","0.5cm");
	pos[count++] =  new Array("17.09cm",baseleft+"cm","2.91cm","0.5cm");
	pos[count++] =  new Array("17.59cm",baseleft+"cm","2.91cm","0.5cm");
	pos[count++] =  new Array("18.1cm",baseleft+"cm","2.91cm","0.5cm");
	pos[count++] =  new Array("18.6cm",baseleft+"cm","2.91cm","0.5cm");
	pos[count++] =  new Array("19.1cm",baseleft+"cm","2.91cm","0.5cm");
	pos[count++] =  new Array("19.61cm",baseleft+"cm","2.91cm","0.5cm");
	pos[count++] =  new Array("20.11cm",baseleft+"cm","2.91cm","0.5cm");
	pos[count++] =  new Array("20.61cm",baseleft+"cm","2.91cm","0.5cm");
	pos[count++] =  new Array("21.09cm",baseleft+"cm","2.91cm","0.5cm");
	pos[count++] =  new Array("21.59cm",baseleft+"cm","2.91cm","0.5cm");
	pos[count++] =  new Array("22.09cm",baseleft+"cm","2.91cm","0.5cm");
	pos[count++] =  new Array("22.6cm",baseleft+"cm","2.91cm","0.5cm");
	pos[count++] =  new Array("23.1cm",baseleft+"cm","2.91cm","0.5cm");
	pos[count++] =  new Array("23.6cm",baseleft+"cm","2.91cm","0.5cm");
	pos[count++] =  new Array("24.08cm",baseleft+"cm","2.91cm","0.5cm");
	pos[count++] =  new Array("24.5cm",baseleft+"cm","2.91cm","0.5cm");
	pos[count++] =  new Array("25cm",baseleft+"cm","2.91cm","0.5cm");
	pos[count++] =  new Array("25.48cm",baseleft+"cm","2.91cm","0.5cm");
	pos[count++] =  new Array("25.93cm",baseleft+"cm","2.91cm","0.5cm");


	var value = new Array();
	count=0;
	//	访视日期
	value[count++] = Ext.util.Format.date(data.child.visitDate,"Y-m-d");
	//	访视日龄
	value[count++] =  (data.child.visitDate.getTime()-data.child.birthday.getTime())/1000/60/60/24 + 1;
	//	听力筛查
	value[count++] = data.child.exam01;
	//	体重(公斤)
	value[count++] = data.child.exam02;
	//	身长(厘米)
	value[count++] = data.child.exam03;
	//	头围(厘米)
	value[count++] = "";
	//	喂养方式
	value[count++] = data.child.exam04;
	//	吃奶量(ml/次)
	value[count++] = data.child.exam30;
	//	吃奶次数(次/天)
	value[count++] = data.child.exam31;
	//	呕吐
	value[count++] = data.child.exam32;
	//	大便-性状
	value[count++] = data.child.exam33;
	//	大便-次数
	value[count++] = data.child.exam34;
	//	体温
	value[count++] = data.child.exam05;
	//	脉率
	value[count++] = data.child.exam07;
	//	呼吸频率
	value[count++] = data.child.exam06;
	//	面色
	value[count++] = data.child.faceColor;
	//	黄疸部位
	value[count++] = data.child.exam35;
	//	前囟
	value[count++] = (data.child.exam09 == null?0:data.child.exam09) +"cm×"+(data.child.exam10 == null?0:data.child.exam10 )+"cm";
	if(data.child.exam12==="未见异常"){
		value[count++] = data.child.exam12;	//	眼外观
	}else{
		value[count++] = data.child.exam12+" "+data.child.exam12other;	//	眼外观
	}
	if(data.child.exam13==="未见异常"){
		value[count++] = data.child.exam13;	//	耳外观
	}else{
		value[count++] = data.child.exam13+" "+data.child.exam13other;	//	耳外观
	}
	for(var i = 0 ; i < count ; i++){
		if(value[i] == null || value[i] == NaN || (value[i].toLowerCase && (value[i].toLowerCase() ==="null" || value[i].toLowerCase() ==="nan")) ){
			value[i] = "";
		}
		retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
	}
	return retprintcfg;
}

function getChildPrintCfg04(data,col){
	//4.新生儿访视记录表-第2页(5-6.jpg) 
	var colspace = 2.9;
	var baseleft = 5+col*colspace;
	var retprintcfg = {
		title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:title_intWidth,intHeight:title_intHeight,strContent:"4、新生儿访视记录表-第2页"},
		data:[	]
	};
	var pos = new Array();
	var count = 0 ;
	pos[count++] =  new Array("2cm",baseleft+"cm","2.9cm","0.5cm");
	pos[count++] =  new Array("2.5cm",baseleft+"cm","2.9cm","0.4cm");
	pos[count++] =  new Array("2.9cm",baseleft+"cm","2.9cm","0.4cm");
	pos[count++] =  new Array("3.3cm",baseleft+"cm","2.9cm","0.5cm");
	pos[count++] =  new Array("3.8cm",baseleft+"cm","2.9cm","0.4cm");
	pos[count++] =  new Array("4.2cm",baseleft+"cm","2.9cm","0.4cm");
	pos[count++] =  new Array("4.6cm",baseleft+"cm","2.9cm","0.5cm");
	pos[count++] =  new Array("5.1cm",baseleft+"cm","2.9cm","0.4cm");
	pos[count++] =  new Array("5.5cm",baseleft+"cm","2.9cm","0.4cm");
	pos[count++] =  new Array("5.9cm",baseleft+"cm","2.9cm","0.5cm");
	pos[count++] =  new Array("6.4cm",baseleft+"cm","2.9cm","0.4cm");
	pos[count++] =  new Array("6.8cm",baseleft+"cm","2.9cm","1.3cm");
	pos[count++] =  new Array("8.1cm",baseleft+"cm","2.9cm","0.5cm");
	pos[count++] =  new Array("8.6cm",baseleft+"cm","2.9cm","0.9cm");
	pos[count++] =  new Array("9.5cm",baseleft+"cm","2.9cm","1cm");
	pos[count++] =  new Array("10.5cm",baseleft+"cm","2.9cm","0.5cm");
	pos[count++] =  new Array("11cm",baseleft+"cm","2.9cm","0.4cm");
	var value = new Array();
	count=0
	if(data.child.exam14==="未见异常"){
		value[count++] = data.child.exam14;	//鼻
	}else{
		value[count++] = data.child.exam14+" "+data.child.exam14other;	//鼻
	}
	if(data.child.exam15 ==="未见异常"){
		value[count++]=data.child.exam15;//口腔
	}else{
		value[count++]=data.child.exam15+" "+data.child.exam15other;//口腔
	}
	if(data.child.exam16 ==="未见异常"){
		value[count++]=data.child.exam16;//心肺听诊
	}else{
		value[count++]=data.child.exam16+" "+data.child.exam16other;//心肺听诊
	}
	if(data.child.exam17 ==="未见异常"){
		value[count++]=data.child.exam17;//腹部触诊
	}else{
		value[count++]=data.child.exam17+" "+data.child.exam17other;//腹部触诊
	}
	if(data.child.exam18 !=="其他"){
		value[count++]=data.child.exam18;//脐带
	}else{
		value[count++]=data.child.exam18+" "+data.child.exam18other;//脐带
	}
	if(data.child.exam19 ==="未见异常"){
		value[count++]=data.child.exam19;//四肢活动程度
	}else{
		value[count++]=data.child.exam19+" "+data.child.exam19other;//四肢活动程度
	}
	if(data.child.exam20 ==="无"){
		value[count++]=data.child.exam20;//颈部包块
	}else{
		value[count++]=data.child.exam20+" "+data.child.exam20other;//颈部包块
	}
	if(data.child.babySkins !=="其他"){
		value[count++]=data.child.babySkins;//皮肤
	}else{
		value[count++]=data.child.babySkins+" "+data.child.babySkinsOther;//皮肤
	}
	if(data.child.exam22 ==="未见异常"){
		value[count++]=data.child.exam22;//肛门
	}else{
		value[count++]=data.child.exam22+" "+data.child.exam22other;//肛门
	}
	if(data.child.exam23 ==="未见异常"){
		value[count++]=data.child.exam23;//外生殖器
	}else{
		value[count++]=data.child.exam23+" "+data.child.exam23other;//外生殖器
	}
	if(data.child.exam24 ==="未见异常"){
		value[count++]=data.child.exam24;//脊柱
	}else{
		value[count++]=data.child.exam24+" "+data.child.exam24other;//脊柱
	}
	value[count++] = "";//行为神经判断
	value[count++] = "";//访视结果
	if(data.child.transfer==="1"){
		value[count++] = "有;原因:"+data.child.transReason+";机构:"+data.child.transUnit;//转诊建议
	}else{
		value[count++] = "无";//转诊建议
	}
	value[count++] = data.babyDirect;//指导
	value[count++] = Ext.util.Format.date(data.child.nextVisitDate,"Y-m-d")//下次随访日期
	value[count++] = data.child.visitDoctor;//随访医生签名

	for(var i = 0 ; i < count ; i++){
		if(value[i] == null || value[i] == NaN || (value[i].toLowerCase && (value[i].toLowerCase() ==="null" || value[i].toLowerCase() ==="nan" || value[i].toLowerCase().trim() ==="undefined")) ){
			value[i] = "";
		}
		retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
	}
	return retprintcfg;
}

function getChildPrintCfg05(data,col){
	//5.1岁以内儿童健康检查记录表-第1页 (5-6.jpg)
	var colspace = 2.1;
	var baseleft = 5+col*colspace;
	var retprintcfg = {
		title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:title_intWidth,intHeight:title_intHeight,strContent:"5、1岁以内儿童健康检查记录表-第1页"},
		data:[	]
	};
	var pos = new Array();
	var count = 0 ;
	pos[count++] =  new Array("16.96cm",baseleft+"cm","2.09cm","0.79cm");
	pos[count++] =  new Array("17.75cm",baseleft+"cm","2.09cm","0.9cm");
	pos[count++] =  new Array("18.65cm",baseleft+"cm","2.09cm","0.79cm");
	pos[count++] =  new Array("19.45cm",baseleft+"cm","2.09cm","0.69cm");
	pos[count++] =  new Array("20.16cm",baseleft+"cm","2.09cm","1.01cm");
	pos[count++] =  new Array("20.96cm",baseleft+"cm","2.09cm","1.3cm");
	pos[count++] =  new Array("22.25cm",baseleft+"cm","2.09cm","0.79cm");
	pos[count++] =  new Array("23.05cm",baseleft+"cm","2.09cm","0.69cm");
	pos[count++] =  new Array("23.52cm",baseleft+"cm","2.09cm","0.66cm");
	pos[count++] =  new Array("24.55cm",baseleft+"cm","2.09cm","0.69cm");
	pos[count++] =  new Array("25.24cm",baseleft+"cm","2.09cm","0.79cm");
	pos[count++] =  new Array("26.06cm",baseleft+"cm","2.09cm","0.69cm");


	var value = new Array();
	count=0
	value[count++] = data.child.checkItem;	//	月龄
	value[count++] = Ext.util.Format.date(data.child.visitDate,"Y-m-d")//随访日期
	value[count++] = data.child.weight;	//	体重
	value[count++] = data.child.height;	//	身长
	value[count++] = "";	//	头围
	value[count++] = data.child.evaluate;	//	体格发育评价
	value[count++] = data.child.face;	//	面色
	if(data.child.exam01==="未见异常"){
		value[count++] = data.child.exam01;	//	皮肤
	}else{
		value[count++] = data.child.exam01+" "+data.child.exam01other;	//	皮肤
	}
	if(data.child.exam02==="闭合"){
		value[count++] = data.child.exam02;	//	前囟
	}else{
		value[count++] = data.child.exam02+""+data.child.exam03+"cm×"+data.child.exam04+"cm";	//	前囟
	}
	value[count++] = "";	//	颈部包块 无字段
	if(data.child.eyes==="未见异常"){
		value[count++] = data.child.eyes;	//	眼外观
	}else{
		value[count++] = data.child.eyes+" "+data.child.eyesOther;	//	眼外观
	}
	if(data.child.eyes==="未见异常"){
		value[count++] = data.child.ears;	//	耳外观
	}else{
		value[count++] = data.child.ears+" "+data.child.earsOther;	//	耳外观
	}

	for(var i = 0 ; i < count ; i++){
		if(value[i] == null || value[i] == NaN || (value[i].toLowerCase && (value[i].toLowerCase() ==="null" || value[i].toLowerCase() ==="nan" || value[i].toLowerCase().trim() ==="undefined")) ){
			value[i] = "";
		}
		retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
	}
	return retprintcfg;
}

function getChildPrintCfg06(data,col){
	//6.1岁以内儿童健康检查记录表-第2页(7-8.jpg)
	var colspace = 2.1;
	var baseleft = 5+col*colspace;
	var retprintcfg = {
		title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:title_intWidth,intHeight:title_intHeight,strContent:"6、1岁以内儿童健康检查记录表-第2页"},
		data:[	]
	};
	var pos = new Array();
	var count = 0 ;
	pos[count++] =  new Array("2.04cm",baseleft+"cm","2.09cm","0.61cm");
	pos[count++] =  new Array("2.65cm",baseleft+"cm","2.09cm","0.61cm");
	pos[count++] =  new Array("3.25cm",baseleft+"cm","2.09cm","0.61cm");
	pos[count++] =  new Array("3.86cm",baseleft+"cm","2.09cm","0.61cm");
	pos[count++] =  new Array("4.44cm",baseleft+"cm","2.09cm","0.5cm");
	pos[count++] =  new Array("4.95cm",baseleft+"cm","2.09cm","0.4cm");
	pos[count++] =  new Array("5.34cm",baseleft+"cm","2.09cm","0.61cm");
	pos[count++] =  new Array("5.95cm",baseleft+"cm","2.09cm","0.61cm");
	pos[count++] =  new Array("6.56cm",baseleft+"cm","2.09cm","0.5cm");
	pos[count++] =  new Array("7.04cm",baseleft+"cm","2.09cm","0.61cm");
	pos[count++] =  new Array("7.65cm",baseleft+"cm","2.09cm","1.01cm");
	pos[count++] =  new Array("8.65cm",baseleft+"cm","2.09cm","1.4cm");
	pos[count++] =  new Array("10.05cm",baseleft+"cm","2.09cm","0.61cm");
	pos[count++] =  new Array("10.66cm",baseleft+"cm","2.09cm","0.61cm");
	pos[count++] =  new Array("11.24cm",baseleft+"cm","2.09cm","0.5cm");
	pos[count++] =  new Array("11.75cm",baseleft+"cm","2.09cm","0.61cm");
	pos[count++] =  new Array("12.36cm",baseleft+"cm","2.09cm","0.61cm");
	pos[count++] =  new Array("16.3cm",baseleft+"cm","2.09cm","0.69cm");
	pos[count++] =  new Array("17.01cm",baseleft+"cm","2.09cm","1.11cm");
	pos[count++] =  new Array("18.1cm",baseleft+"cm","2.09cm","0.69cm");
	pos[count++] =  new Array("18.81cm",baseleft+"cm","2.09cm","0.64cm");
	pos[count++] =  new Array("19.47cm",baseleft+"cm","2.09cm","1.93cm");
	pos[count++] =  new Array("21.51cm",baseleft+"cm","2.09cm","0.69cm");
	pos[count++] =  new Array("22.2cm",baseleft+"cm","2.09cm","1.01cm");
	pos[count++] =  new Array("23.2cm",baseleft+"cm","2.09cm","1.01cm");
	pos[count++] =  new Array("24.21cm",baseleft+"cm","2.09cm","0.69cm");
	pos[count++] =  new Array("24.9cm",baseleft+"cm","2.09cm","0.69cm");
	pos[count++] =  new Array("25.61cm",baseleft+"cm","2.09cm","0.69cm");
	var value = new Array();
	count=0
	value[count++] = "";//听力-左
	value[count++] = "";//听力-右
	if(data.child1.nose ==="未见异常"){
		value[count++]=data.child1.nose;//鼻部
	}else{
		value[count++]=data.child1.nose+" "+data.child1.noseother;//鼻部
	}
	if(data.child1.throatFlat !="其它"){
		value[count++]=data.child1.throatFlat;//咽部,扁桃体
	}else{
		value[count++]=data.child1.throatFlat+" "+data.child1.throatFlatRemark;//咽部,扁桃体
	}
	if(data.child.exam15 ==="未见异常"){
		value[count++]=data.child.exam15;//口腔
	}else{
		value[count++]=data.child.exam15+" "+data.child.exam15Other;//口腔
	}
	value[count++] = data.child1.mikTooth;//出牙数
	if(data.child.heart ==="未见异常"){
		value[count++]=data.child.heart;//心肺
	}else{
		value[count++]=data.child.heart+" "+data.child.heartOther;//心肺
	}
	if(data.child.exam06 ==="未见异常"){
		value[count++]=data.child.exam06;//腹部
	}else{
		value[count++]=data.child.exam06+" "+data.child.exam06other;//腹部
	}
	if(data.child.exam07 ==="未见异常"){
		value[count++]=data.child.exam07;//脐部
	}else{
		value[count++]=data.child.exam07+" "+data.child.exam07other;//脐部
	}
	if(data.child.exam16 ==="未见异常"){
		value[count++]=data.child.exam16;//四肢
	}else{
		value[count++]=data.child.exam16+" "+data.child.exam16Other;//四肢
	}
	value[count++] = data.childrenMediExamExam09;//可疑佝偻病症状
	value[count++] = data.childrenMediExamExam10;//可疑佝偻病休征
	if(data.child.exam11 ==="未见异常"){
		value[count++]=data.child.exam11;//肛门/外生殖器
	}else{
		value[count++]=data.child.exam11+" "+data.child.exam11other;//肛门/外生殖器
	}
	value[count++] = "";//先天性髋关节发育不良筛查结果
	value[count++] = data.child.exam12;//血红蛋白值
	value[count++] = data.child.activityTime;//户外活动
	value[count++] = data.child.breastMilk;//喂养方式
	value[count++] = "";//吃奶量
	value[count++] = "";//辅食添加
	value[count++] = data.child.wdcount;//服用维生素类
	if(data.child.evaluate ==="通过"){
		value[count++]=data.child.evaluate;//发育评估
	}else{
		value[count++]=data.child.evaluate+" "+data.child.evaluateOther;//发育评估
	}
	value[count++] = data.child.state;//随访间患病情况 
	value[count++] = "";//体检结果
	if(data.child.transfer==="1"){
		value[count++] = "有;原因:"+data.child.transReason+";机构:"+data.child.transUnit;//转诊建议
	}else{
		value[count++] = "无";
	}
	value[count++] = data.child1.checkDirect;//指导
	value[count++] = data.child.nextVisitDate//下次随访日期
	value[count++] = data.org.name;//检查机构
	value[count++] = data.child.visitDoctor;//随访医生签名

	for(var i = 0 ; i < count ; i++){
		if(value[i] == null || value[i] == NaN || (value[i].toLowerCase && (value[i].toLowerCase() ==="null" || value[i].toLowerCase() ==="nan" || value[i].toLowerCase().trim() ==="undefined")) ){
			value[i] = "";
		}
		retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
	}
	return retprintcfg;
}

function getChildPrintCfg08(data,col){
	//8.1-2岁儿童健康检查记录表-第1页(9-10.jpg)
	var colspace = 2.1;
	var baseleft = 5+col*colspace;
	var retprintcfg = {
		title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:title_intWidth,intHeight:title_intHeight,strContent:"5、1-2岁儿童健康检查记录表打印"},
		data:[	]
	};
	var pos = new Array();
	var count = 0 ;
	pos[count++] =  new Array("3.7cm",baseleft+"cm","2.01cm","0.69cm");
	pos[count++] =  new Array("4.42cm",baseleft+"cm","2.01cm","0.69cm");
	pos[count++] =  new Array("5.03cm",baseleft+"cm","2.01cm","0.69cm");
	pos[count++] =  new Array("5.72cm",baseleft+"cm","2.01cm","0.69cm");
	pos[count++] =  new Array("6.43cm",baseleft+"cm","2.01cm","0.69cm");
	pos[count++] =  new Array("7.17cm",baseleft+"cm","2.01cm","1.11cm");
	pos[count++] =  new Array("8.23cm",baseleft+"cm","2.01cm","0.79cm");
	pos[count++] =  new Array("8.97cm",baseleft+"cm","2.01cm","0.79cm");
	pos[count++] =  new Array("9.87cm",baseleft+"cm","2.01cm","0.79cm");
	pos[count++] =  new Array("10.56cm",baseleft+"cm","2.01cm","0.79cm");
	pos[count++] =  new Array("11.48cm",baseleft+"cm","2.01cm","0.79cm");
	pos[count++] =  new Array("12.33cm",baseleft+"cm","2.01cm","0.79cm");
	pos[count++] =  new Array("16.93cm",baseleft+"cm","1.9cm","0.69cm");
	pos[count++] =  new Array("17.65cm",baseleft+"cm","1.9cm","0.69cm");
	pos[count++] =  new Array("18.31cm",baseleft+"cm","1.9cm","0.69cm");
	pos[count++] =  new Array("19cm",baseleft+"cm","1.9cm","0.69cm");
	pos[count++] =  new Array("19.76cm",baseleft+"cm","1.9cm","0.69cm");
	pos[count++] =  new Array("20.45cm",baseleft+"cm","1.9cm","0.69cm");
	pos[count++] =  new Array("21.14cm",baseleft+"cm","1.9cm","0.69cm");
	pos[count++] =  new Array("21.83cm",baseleft+"cm","1.9cm","0.69cm");
	pos[count++] =  new Array("22.54cm",baseleft+"cm","1.9cm","0.69cm");
	pos[count++] =  new Array("23.23cm",baseleft+"cm","1.9cm","1.11cm");
	pos[count++] =  new Array("24.34cm",baseleft+"cm","1.9cm","0.79cm");
	pos[count++] =  new Array("25.11cm",baseleft+"cm","1.9cm","0.69cm");
	pos[count++] =  new Array("25.82cm",baseleft+"cm","1.9cm","0.61cm");
	pos[count++] =  new Array("26.43cm",baseleft+"cm","1.9cm","0.69cm");


	var value = new Array();
	count=0
	
	value[count++] = data.child.checkItem;//	月龄
	value[count++] = Ext.util.Format.date(data.child.visitDate,"Y-m-d")//随访日期
	value[count++] = data.child.weight;//	体重
	value[count++] = data.child.height;//	身长
	value[count++] = "";//	头围
	value[count++] = data.child.evaluate;//	体格发育评价
	value[count++] = data.child.face;//	面色
	if(data.child.exam01==="未见异常"){
		value[count++] = data.child.exam01;	//	皮肤
	}else{
		value[count++] = data.child.exam01+" "+data.child.exam01other;	//	皮肤
	}
	if(data.child.exam02==="闭合"){
		value[count++] = data.child.exam02;	//	前囟
	}else{
		value[count++] = data.child.exam02+""+data.child.exam03+"cm×"+data.child.exam04+"cm";	//	前囟
	}
	value[count++] = "";	//	颈部包块 无字段
	if(data.child.eyes==="未见异常"){
		value[count++] = data.child.eyes;	//	眼外观
	}else{
		value[count++] = data.child.eyes+" "+data.child.eyesOther;	//	眼外观
	}
	if(data.child.eyes==="未见异常"){
		value[count++] = data.child.ears;	//	耳外观
	}else{
		value[count++] = data.child.ears+" "+data.child.earsOther;	//	耳外观
	}
	value[count++] = "";//听力-左
	value[count++] = "";//听力-右
	if(data.child1.nose ==="未见异常"){
		value[count++]=data.child1.nose;//鼻部
	}else{
		value[count++]=data.child1.nose+" "+data.child1.noseother;//鼻部
	}
	if(data.child1.throatFlat !="其它"){
		value[count++]=data.child1.throatFlat;//咽部,扁桃体
	}else{
		value[count++]=data.child1.throatFlat+" "+data.child1.throatFlatRemark;//咽部,扁桃体
	}
	value[count++] = data.child1.mikTooth +" "+data.child1.decayedTooth;//出牙数/龋齿数
	if(data.child.heart ==="未见异常"){
		value[count++]=data.child.heart;//心肺
	}else{
		value[count++]=data.child.heart+" "+data.child.heartOther;//心肺
	}
	if(data.child.exam06 ==="未见异常"){
		value[count++]=data.child.exam06;//腹部
	}else{
		value[count++]=data.child.exam06+" "+data.child.exam06other;//腹部
	}
	if(data.child.exam08 ==="未见异常"){
		value[count++]=data.child.exam08;//四肢
	}else{
		value[count++]=data.child.exam08+" "+data.child.exam08Other;//四肢
	}
	if(data.child.walk ==="未见异常"){
		value[count++]=data.child.walk;//步态
	}else{
		value[count++]=data.child.walk+" "+data.child.walkOther;//步态
	}
	value[count++] = data.child.exam10;//可疑佝偻病体征
	if(data.child.genitals ==="未见异常" || data.child.genitals == null ){
		value[count++]=data.child.genitals;//肛门/外生殖器 没填
	}else{
		value[count++]=data.child.genitals+" "+data.child.genitalsOther;//肛门/外生殖器  没填
	}
	value[count++] = data.child.exam12;//血红蛋白值
	value[count++] = data.child.activityTime;//户外活动
	value[count++] = data.child.wdcount;//服用维d
	for(var i = 0 ; i < count ; i++){
		if(value[i] == null || value[i] == NaN || (value[i].toLowerCase && (value[i].toLowerCase() ==="null" || value[i].toLowerCase() ==="nan"|| value[i].toLowerCase().trim() ==="undefined")) ){
			value[i] = "";
		}
		retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
	}
	return retprintcfg;
}

function getChildPrintCfg10(data,col){
	//10.1-2岁儿童健康检查记录表-第2页(11-12.jpg)
	var colspace = 2.1;
	var baseleft = 5+col*colspace;
	var retprintcfg = {
		title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:title_intWidth,intHeight:title_intHeight,strContent:"1-2岁儿童健康检查记录表-第2页"},
		data:[	]
	};
	var pos = new Array();
	var count = 0 ;
	pos[count++] =  new Array("2.33cm",baseleft+"cm","1.9cm","0.79cm");
	pos[count++] =  new Array("3.15cm",baseleft+"cm","1.9cm","0.9cm");
	pos[count++] =  new Array("4.05cm",baseleft+"cm","1.9cm","3.41cm");
	pos[count++] =  new Array("7.43cm",baseleft+"cm","1.9cm","0.9cm");
	pos[count++] =  new Array("8.33cm",baseleft+"cm","1.9cm","1.01cm");
	pos[count++] =  new Array("9.34cm",baseleft+"cm","1.9cm","1.01cm");
	pos[count++] =  new Array("10.35cm",baseleft+"cm","1.9cm","0.9cm");
	pos[count++] =  new Array("11.24cm",baseleft+"cm","1.9cm","0.79cm");
	pos[count++] =  new Array("12.04cm",baseleft+"cm","1.9cm","0.79cm");


	var value = new Array();
	count=0;
	value[count++]=data.child.evaluate;//发育评估
	value[count++] = data.child.state;//两次随访间患病情况
	value[count++] = data.child.other;
	value[count++] = "";//体检结果
	if(data.child.transfer==="1"){
		value[count++] = "有;原因:"+data.child.transReason+";机构:"+data.child.transUnit;//转诊建议
	}else{
		value[count++] = "无";
	}
	value[count++] = data.checkDirect;//指导
	value[count++] = data.child.nextVisitDate//下次随访日期
	value[count++] = data.org.name;//检查机构
	value[count++] = data.child.visitDoctor;//随访医生签名
	for(var i = 0 ; i < count ; i++){
		if(value[i] == null || value[i] == NaN || (value[i].toLowerCase && (value[i].toLowerCase() ==="null" || value[i].toLowerCase() ==="nan")) ){
			value[i] = "";
		}
		retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
	}
	return retprintcfg;
}

function getChildPrintCfg11(data){
	//11.儿童入托儿园(所)健康检查记录表(11-12.jpg)
	var rowheight = 1.2;//行间隔高度
	var starttop = 3; 
	var startleft = 3;
	/**/
	var retprintcfg = {
		title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:title_intWidth,intHeight:title_intHeight,strContent:"儿童入托儿园(所)健康检查记录表"},
		data:[	]
	};
	var pos = new Array();
	var count = 0 ;
	
	var value = new Array();
	count=0
	//	检查日期
	//	年龄
	//	过敏史
	//	既往病史
	//	儿童家长确认
	//	体重
	//	身长
	//	评价
	//	皮肤
	//	眼-左
	//	眼-右
	//	视力-左
	//	视力-右
	//	耳-左
	//	耳-右
	//	口腔-牙齿数
	//	口腔-龋齿数
	//	头颅
	//	胸廓
	//	脊柱四肢
	//	咽部
	//	心肺
	//	肝脾
	//	外生殖器
	//	其他
	//	血红蛋白
	//	丙氨酸氨基转移酶
	//	其他
	//	检查结果
	//	医生意见
	//	医生签名
	//	检查单位
	//	体检日期
	for(var i = 0 ; i < count ; i++){
		if(value[i] == null || value[i] == NaN || (value[i].toLowerCase && (value[i].toLowerCase() ==="null" || value[i].toLowerCase() ==="nan")) ){
			value[i] = "";
		}
		retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
	}
	return retprintcfg;
}

function getChildPrintCfg12(data,col){
	//12.3-6岁儿童健康检查记录表-第1页(13-14.jpg)
	var colspace = 3.6;
	var baseleft = 1.8+col*colspace;
	/**/
	var retprintcfg = {
		title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:title_intWidth,intHeight:title_intHeight,strContent:"6、3-6岁儿童健康检查记录表-第1页"},
		data:[	]
	};
	var pos = new Array();
	var count = 0 ;
	pos[count++] =  new Array("3.62cm",baseleft+"cm","3.6cm","0.69cm");
	pos[count++] =  new Array("4.31cm",baseleft+"cm","3.6cm","0.69cm");
	pos[count++] =  new Array("5.03cm",baseleft+"cm","3.6cm","0.69cm");
	pos[count++] =  new Array("5.72cm",baseleft+"cm","3.6cm","1.11cm");
	pos[count++] =  new Array("6.83cm",baseleft+"cm","3.6cm","0.69cm");
	pos[count++] =  new Array("7.51cm",(baseleft+1)+"cm","0.5cm","0.61cm");
	pos[count++] =  new Array("7.51cm",(baseleft+2)+"cm","0.5cm","0.61cm");
	pos[count++] =  new Array("8.12cm",baseleft+"cm","3.6cm","0.69cm");
	pos[count++] =  new Array("8.81cm",baseleft+"cm","3.6cm","0.69cm");
	pos[count++] =  new Array("9.52cm",baseleft+"cm","3.6cm","0.69cm");
	pos[count++] =  new Array("10.21cm",baseleft+"cm","3.6cm","0.69cm");
	pos[count++] =  new Array("10.93cm",baseleft+"cm","3.6cm","1.9cm");
	pos[count++] =  new Array("16.09cm",baseleft+"cm","1.3cm","0.61cm");
	pos[count++] =  new Array("16.7cm",(baseleft+1.1)+"cm","1.3cm","0.61cm");
	pos[count++] =  new Array("17.28cm",(baseleft+1.1)+"cm","1.3cm","0.61cm");
	pos[count++] =  new Array("17.89cm",(baseleft+1.1)+"cm","1.3cm","0.5cm");
	pos[count++] =  new Array("18.36cm",(baseleft+1.1)+"cm","1.3cm","0.5cm");
	pos[count++] =  new Array("18.92cm",baseleft+"cm","3.6cm","1.69cm");
	pos[count++] =  new Array("20.61cm",baseleft+"cm","3.6cm","4cm");
	pos[count++] =  new Array("25.19cm",baseleft+"cm","3.6cm","0.79cm");
	pos[count++] =  new Array("25.98cm",baseleft+"cm","3.6cm","0.79cm");
	
	
	var value = new Array();
	count=0;
	value[count++] = Ext.util.Format.date(data.child.visitDate,"Y-m-d")//随访日期
	value[count++] = data.child.weight;//	体重
	value[count++] = data.child.height;//	身长
	value[count++] = data.child.body;//	体格发育评价
	value[count++] = data.child.sight;//	视力
	if(data.child.hearing ==="通过"){
		value[count++] = "√";
		value[count++] = "";
	}else{
		value[count++] = "";
		value[count++] = "√";
	}
	value[count++] = data.child.tooth +" "+data.child.caries;//牙数/龋齿数
	if(data.child.heart ==="未见异常"){
		value[count++]=data.child.heart;//心肺
	}else{
		value[count++]=data.child.heart+" "+data.child.heartOther;//心肺
	}
	if(data.child.venter ==="未见异常"){
		value[count++]=data.child.venter;//腹部
	}else{
		value[count++]=data.child.venter+" "+data.child.venterOther;//腹部
	}
	value[count++] = data.child.hemoglobin;//血红蛋白值
	value[count++] = data.child.other; //其他情况
	
	if(data.child.checkSickness ==="无"){
		value[count++] = "√";
		value[count++] = "";
		value[count++] = "";
		value[count++] = "";
		value[count++] = "";
	}else{
		value[count++] = "";
		value[count++] = data.child.pneumonia;//肺炎
		value[count++] = data.child.scour;//腹泻
		value[count++] = data.child.wound;//外伤
		value[count++] = data.child.checkSicknessOther;//其他
	}

	if(data.child.transfer == true){
		value[count++] = "有;原因:"+data.child.transReason+";机构:"+data.child.transUnit;//转诊建议
	}else{
		value[count++] = "无";
	}
	value[count++] = data.checkDirect;//指导
	value[count++] = data.child.nextVisitDate//下次随访日期
	value[count++] = data.child.visitDoctor;//随访医生签名
	
	for(var i = 0 ; i < count ; i++){
		if(value[i] == null || value[i] == NaN || (value[i].toLowerCase && (value[i].toLowerCase() ==="null" || value[i].toLowerCase() ==="nan")) ){
			value[i] = "";
		}
		retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
	}
	return retprintcfg;
}

function getChildPrintCfg14(data){
	//14.异常情况记录表(15-16.jpg)
	var rowheight = 1.2;//行间隔高度
	var starttop = 3; 
	var startleft = 3;
	/**/
	var retprintcfg = {
		title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:title_intWidth,intHeight:title_intHeight,strContent:"异常情况记录表"},
		data:[	]
	};
	var pos = new Array();
	var count = 0 ;
	
	var value = new Array();
	count=0
	//	日期
	//	异常情况记录
	//	处理意见
	//	医生签名
	for(var i = 0 ; i < count ; i++){
		if(value[i] == null || value[i] == NaN || (value[i].toLowerCase && (value[i].toLowerCase() ==="null" || value[i].toLowerCase() ==="nan")) ){
			value[i] = "";
		}
		retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
	}
	return retprintcfg;
}
/**/
Ext.tf.HealthPrintChildPanel = Ext.extend(Ext.Panel, {
	closable : true,
	currentNode : null, // 当前选择的树节点
	layout : 'fit',
	title : '档案',
	pageSize : 20,
	recordId : 'id',
	recordPk : 'id',
	orgmap:null,//机关
	panelId : 'app.residentPanel',
	
	// height:700,
	// 是否需要在最末级才能增加？
	checkLastLevel : true,

	// 设置查询url
	queryUrl : Ext.emptyFn,
	deleteUrl : Ext.emptyFn,
	dataExportUrl : Ext.emptyFn,
	treeLoaderFn : Ext.emptyFn,
	diseaseId : null,
	visitDoctor : null,
	getAddParams : function() {
		var node = this.getTreeSelNode();
		var districtNumber = node.id;
		var param = '?districtNumber=' + districtNumber;
		return param;
	},

	// 设置查询用的类别，比如档案，高血压等。。
	queryType : 'demo',
	detailUrl : '/personalInfo.html',
	readerConfig : [],
	gridCmConfig : [],
	gridViewConfig : {},
	initComponent : function() {
		this.build();
		Ext.tf.HealthPrintChildPanel.superclass.initComponent.call(this);
	},

	build : function() {
//		this.tbar = this.createActions();
		this.items = [ this.createPanel() ];
	},

	/**
	 * 编辑功能
	 */
	f_edit : function(record) {
		var fileNo = record.get(this.recordPk);
		var param = '?' + this.recordPk + '=' + fileNo;
		param = this.detailUrl + param;
		if (this.visitDoctor != null) {
			param = param + '&' + this.visitDoctor + '='
					+ escape(Ext.tf.currentUser.taxempname);
		}
		this.openWin(param);
	},

	/**
	 * 增加功能
	 */
	f_add : function(isSlient) {

		if (this.checkLastLevel) {
			// 判断是否是第五级别
			var node = this.getTreeSelNode();

			var level = node.attributes['data'].level;
			if (level != 5) {
				if (!isSlient) {
					Ext.Msg.alert('', '只有第五级行政区域才能增加记录！');
				}
				return;
			}
		}

		param = this.detailUrl + this.getAddParams();
		console.log(param);
		if (this.visitDoctor != null) {
			param = param + '&' + this.visitDoctor + '='
					+ escape(Ext.tf.currentUser.taxempname);
		}
		if (this.diseaseId != null) {
			// param = param +"&diseaseId="+this.diseaseId;
			this.openWin(param, {
				'diseaseId' : this.diseaseId,
				"confirmDate" : new Date()
			});
		} else {
			this.openWin(param);
		}

	},

	/**
	 * 打开编辑窗口
	 */
	openWin : function(targetUrl, param) {

		var win = new Ext.Window({
			modal : true,
			title : '录入记录',
			border : false
		// autoScroll : true
		});
		if (param != null) {
			window.other_init_param = param;
		}

		win.show();
		win.maximize();

		win.add({
			xtype : 'iframepanel',
			defaultSrc : targetUrl,
			// width: win.getInnerWidth() - 380,
			height: win.getInnerHeight(),
			title : '',
			loadMask : true,
			autoScroll : false,
			listeners : {
				message : function(f, data) {
					console.log("receive message...");
					console.log(data);
					if (data.data == 'quit') {
						win.close();
					} else if (data.data == 'saved') {
						this.load();
					}
				}.createDelegate(this)
			}
		});
		win.doLayout(true);
	},

	getTreeSelNode : function() {
		var selNode = this.currentNode;
		if (selNode) {
			// Ext.Msg.alert('', selNode.text);
		} else {
			Ext.Msg.show({
				icon : Ext.Msg.WARNING,
				buttons : Ext.Msg.OK,
				msg : '请先选择一个行政区域！'
			});
		}
		;
		return selNode;
	},
	createActions : function() {
		var store = new Ext.data.SimpleStore({
			fields : [ 'type', 'display' ],
			data : [ [ 'a.name', '姓名' ], [ 'c.highRisk', '高危筛选' ],
					[ 'a.inputDate', '录入日期' ], [ 'a.lastModifyDate', '修改日期' ],
					[ 'b.birthday', '出生日期' ], [ 'a.fileNo', '档案编码' ],
					[ 'b.idnumber', '身份证号' ], [ 'b.linkman', '联系人' ],
					[ 'a.paperFileNo', '纸质档案号' ], [ 'b.workUnit', '工作单位' ] ]
		});
		this.combo = new Ext.form.ComboBox({
			store : store,
			displayField : 'display',
			valueField : 'type',
			typeAhead : true,
			mode : 'local',
			triggerAction : 'all',
			selectOnFocus : true,
			editable : false,
			width : 100,
			value : 'a.name'
		});
		this.filterField = new Ext.form.TextField({
			fieldLabel : '',
			enableKeyEvents : true,
			listeners : {
				'keypress' : function(field, event) {
					if (event.getKey() == 13) {
						this.load(true);
					}
					;
				}.createDelegate(this)
			}
		});

		this.isFirst = new Ext.form.TextField({
			fieldLabel : '',
			id : 'isFirst',
			hidden : true
		});

		this.editFn = function() {
			var selections = this.grid.getSelections();
			if (selections.length == 1) {
				console.log(selections[0]);
				this.f_edit(selections[0]);
			}
		};

		this.editAction = new Ext.Action({
			text : '修改',
			iconCls : 'c_edit',
			handler : this.editFn.createDelegate(this)
		});
		/*
		UserMenuTreeService.getOrgMap(function(data){
				if(data){
					this.orgmap = data;
				}
			}.createDelegate(this));
		*/
		return [
				new Ext.Button({
					text: '打印',
					iconCls: 'c_print',
					menu: new Ext.menu.Menu({
						items: [{
							text : '1、封面打印',
							iconCls: 'c_print',
							handler : function(){
								var selections = this.grid.getSelections();
								if(selections.length > 0){
									var records = selections[0];
									var fileNo = records.get(this.recordPk);
									var param = '?' + this.recordPk + '=' + fileNo;
									var filterKey = "a."+this.recordPk;
									var filterValue = fileNo;
									var selNode = this.getTreeSelNode();
									if (selNode) {
										var cond = {
											district : selNode.id,
											filterKey : filterKey,
											filterValue : filterValue,
											isFirst : 1
										};
										console.log(cond);
										UserMenuTreeService.findChildHealthFiles(cond,function(data){
											if(data){
												printObj.printPreview(getChildPrintCfg01(data.data[0],this.menu),-2);
											}else{
												showError('该户没有儿童档案记录,无法打印！');
											}
										}.createDelegate(this))
									}
								}
							}.createDelegate(this)
						},
						{
							text : '2、儿童基本档案打印',
							iconCls: 'c_print',
							handler : function(){
								var selections = this.grid.getSelections();
								if(selections.length > 0){
									var records = selections[0];
									var fileNo = records.get(this.recordPk);
									var param = '?' + this.recordPk + '=' + fileNo;
									var filterKey = "a."+this.recordPk;
									var filterValue = fileNo;
									var selNode = this.getTreeSelNode();
									if (selNode) {
										var cond = {
											district : selNode.id,
											filterKey : filterKey,
											filterValue : filterValue,
											isFirst : 1
										};
										console.log(cond);
										UserMenuTreeService.findChildPrint1(cond,function(data){
											if(data && data.data[0]){
												printObj.printPreview(getChildPrintCfg02(data.data[0],this.menu),-2);
											}else{
												showError('该户没有医学出生证明记录,无法打印相关信息！');
											}
										}.createDelegate(this))
									}
								}
							}.createDelegate(this)
						},
						{
							text : '3、新生儿访视记录表打印',
							iconCls: 'c_print',
							handler : function(){
								var selections = this.grid.getSelections();
								if(selections.length > 0){
									var records = selections[0];
									var fileNo = records.get(this.recordPk);
									var param = '?' + this.recordPk + '=' + fileNo;
									var filterKey = "a."+this.recordPk;
									var filterValue = fileNo;
									var selNode = this.getTreeSelNode();
									if (selNode) {
										var cond = {
											district : selNode.id,
											filterKey : filterKey,
											filterValue : filterValue,
											isFirst : 1
										};
										console.log(cond);
										//查询
										var printpanel = Ext.extend(Ext.Panel, {
											closable : true,
											currentNode : null, // 当前选择的树节点
											layout : 'fit',
											border: false,
											pageSize : 20,
											recordId : 'child.id',
											recordPk : 'id',
											checkLastLevel : true,
											// 设置查询url
											queryUrl : UserMenuTreeService.findBabyVisitPrint,
											queryType : 'demo',
											readerConfig : [
															{name:'execOrgName', mapping: 'org.name'},
															{name:'id', mapping: 'child.id'},
															{name:'fileNo', mapping: 'file.fileNo'},
															{name:'name', mapping: 'file.name'},
															{name:'birthday', mapping: 'person.birthday'},
															{name:'highRisk', mapping: 'child.highRisk'},
															{name:'sex', mapping: 'file.sex'},
															{name:'visitDate', mapping: 'child.visitDate'},
															{name:'nextVisitDate', mapping: 'child.nextVisitDate'},
															{name:'visitDoctor', mapping: 'child.visitDoctor'},
															{name:'username', mapping: 'samTaxempcode.username'}
														   ],
											gridCmConfig :
														   [
															{ "header" : "执行机构", "dataIndex" : "execOrgName"}, 
															 { "header" : "编号", "dataIndex" : "fileNo", "width":130 },
															 { "header" : "姓名", "dataIndex" : "name" },
															 { "header" : "出生日期", "dataIndex" : "birthday",
																				 "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
															 { "header" : "高危", "dataIndex" : "highRisk" },
															 { "header" : "性别", "dataIndex" : "sex" },
															 { "header" : "随访日期", "dataIndex" : "visitDate",
																				 "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
															 { "header" : "下次随访日期", "dataIndex" : "nextVisitDate",
																				 "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
															 { "header" : "随访医生", "dataIndex" : "visitDoctor" },
															 { "header" : "录入人", "dataIndex" : "username" }
														   ],
											gridViewConfig : {},
											initComponent : function() {
												this.build();
												Ext.tf.HealthPanel.superclass.initComponent.call(this);
											},

											build : function() {
												this.items = [ this.createPanel() ];
											},
											load : function(isReset) {
												this.grid.getStore().reload();
												this.doLayout(true);
											},

											createPanel : function() {
												var reader = new Ext.data.JsonReader({
													totalProperty : "totalSize",
													root : "data",
													id : this.recordId
												}, Ext.data.Record.create(this.readerConfig));

												var store = new Ext.data.Store({
													autoLoad: true,
													proxy : new Ext.ux.data.DWRProxy({
														dwrFunction : this.queryUrl,
														listeners : {
															'beforeload' : function(dataProxy, params) {
																params[dataProxy.loadArgsKey] = [ cond, params ];
															}
														}
													}),
													reader : reader
												});

												this.pagingBar = new App.PagingToolbar({
													pageSize : this.pageSize,
													store : store,
													displayInfo : true,
													displayMsg : '{0} - {1} of {2}',
													emptyMsg : "没有记录"
												});
												var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
												this.gridCmConfig.unshift(sm);
												this.grid = new Ext.grid.GridPanel({
													bbar : this.pagingBar,
													layout : 'fit',
													border : false,
													height:403,
													store : store,
													cm : new Ext.grid.ColumnModel(this.gridCmConfig),
													viewConfig : this.gridViewConfig,
													sm : sm
												});
												this.grid.getView().on('refresh', function() {
													// 缺省选择grid的第一条记录
													var model = this.grid.getSelectionModel();
													if (model.getCount() == 0) {
														model.selectFirstRow();
													}
												}.createDelegate(this));
												/*行选择*/
												this.rowdata1 = [ 
													[1,"第一列"], 
													[2,"第二列"], 
													[3,"第三列"], 
													[4,"第四列"]
													];
												var rowstore = new Ext.data.SimpleStore({ 
													fields:[ 
													{name:"id"}, 
													{name:"name"}
													] 
												}); 
												var rowsm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
												var rowcm = new Ext.grid.ColumnModel([ 
														rowsm, 
														{header:"列数",dataIndex:"name"}
														]); 
												rowstore.loadData(this.rowdata1);
												this.rowgrid = new Ext.grid.GridPanel({ 
													cm:rowcm, 
													height:430,
													width:80,
													sm:rowsm, 
													store:rowstore, 
													loadMask:true 
													});
												/*页选择*/
												var pagedata = [ 
													[1,"第一页"], 
													[2,"第二页"]
													];
												var pagestore = new Ext.data.SimpleStore({ 
													fields:[ 
													{name:"id"}, 
													{name:"name"}
													] 
												}); 
												var pagesm = new Ext.grid.CheckboxSelectionModel({
														singleSelect:true});
												var pagecm = new Ext.grid.ColumnModel([ 
														pagesm, 
														{header:"页数",dataIndex:"name"}
														]); 
												pagestore.loadData(pagedata);
												this.pagegrid = new Ext.grid.GridPanel({ 
													cm:pagecm, 
													height:430,
													width:80,
													sm:pagesm, 
													store:pagestore, 
													loadMask:true
													});
												var panel = new Ext.Panel({
													layout : 'table',
													autoScroll : false,
													layoutConfig: {
														columns: 4
													},
													border:false,
													items : [  {
														title : '第一步：选择要打印的记录',
														region : 'east',
														colspan: 2,
														width : 626,
														height: 430,
														frame : false,
														border : true,
														items : [ this.grid ]
													},{
														region : 'center',
														frame : false,
														title : '第二步：<br>选择页数',
														split : false,
														collapsible : false,
													   
														width : 80,
														height:430,
														border : true,
														items : [ this.pagegrid ]
													},{
														region : 'center',
														frame : false,
														title : '第三步：<br>选择列数',
														split : false,
														collapsible : false,
													   
														width : 80,
														height:430,
														border : true,
														items : [ this.rowgrid ]
													},{
														region : 'south',
														colspan: 4,
														layout : 'table',
														frame : false,
														split : false,
														border : false,
														collapsible : false,
														height:8,
														border : false
													},{
														region : 'south',
														colspan: 4,
														layout : 'table',
														frame : false,
														split : false,
														border : false,
														collapsible : false,
														layoutConfig: {
															columns: 4
														},
														height:32,
														baseCls:"margin-top:10px",
														border : false,
														buttonAlign : "center", 
														items : [ 
														{
															border:false,
															width:300
														},{xtype:'button',
															iconCls: 'c_print',
															text:"打印",
															handler : function (){
																if(!this.grid.getSelectionModel().hasSelection()){
																	Ext.Msg.alert('提示', '请选择要打印的记录!');
																	return;
																}
																if(!this.pagegrid.getSelectionModel().hasSelection()){
																	Ext.Msg.alert('提示', '请选择页数!');
																	return;
																}
																if(!this.rowgrid.getSelectionModel().hasSelection()){
																	Ext.Msg.alert('提示', '请选择列数!');
																	return;
																}
																var pagenum = this.pagegrid.getSelectionModel().getSelected().json[0];
																var rownum = parseInt(this.rowgrid.getSelectionModel().getSelected().json[0]);
																if(pagenum =="1"){
																	printObj.printPreview(getChildPrintCfg03(this.grid.getSelectionModel().getSelected().json,rownum),-2);
																}else{
																	printObj.printPreview(getChildPrintCfg04(this.grid.getSelectionModel().getSelected().json,rownum),-2);
																}
															}.createDelegate(this)
														},
														{	border:false,width:20},
														{	xtype:'button',
															cls:"x-btn-text-icon",
															icon:"/resources/images/black/qtip/close.gif",
															text:"退出",
															scope :win,
															handler : function (){
																	win.close();
																}
														}
														]
													} ]
												});
												
												return panel;
											}
										});
										var ppanel = new printpanel();
										var win = new Ext.Window(
											{width:800,height:500,title:"3、新生儿访视记录表打印",layout : 'fit',items:[ppanel]}
										);
										win.show();
										win.doLayout(true);
										ppanel.grid.doLayout(true);
									}
								}
							}.createDelegate(this)
						},
						{
							text : '4、1岁以内儿童健康检查记录表打印',
							iconCls: 'c_print',
							handler : function(){
								var selections = this.grid.getSelections();
								if(selections.length > 0){
									var records = selections[0];
									var fileNo = records.get(this.recordPk);
									var param = '?' + this.recordPk + '=' + fileNo;
									var filterKey = "a."+this.recordPk;
									var filterValue = fileNo;
									var selNode = this.getTreeSelNode();
									if (selNode) {
										var cond = {
											district : selNode.id,
											filterKey : filterKey,
											filterValue : filterValue,
											isFirst : 1
										};
										console.log(cond);
										//查询
										UserMenuTreeService.findChildExam1print(cond,function(data){
											if(data){
												var printpanel = Ext.extend(Ext.Panel, {
                                                    closable : true,
                                                    currentNode : null, // 当前选择的树节点
                                                    layout : 'fit',
													border: false,
                                                    pageSize : 20,
                                                    recordId : 'child.id',
                                                    recordPk : 'id',
                                                    // 是否需要在最末级才能增加？
                                                    checkLastLevel : true,

                                                    // 设置查询url
                                                    queryUrl : UserMenuTreeService.findChildExam1print,

                                                    // 设置查询用的类别，比如档案，高血压等。。
                                                    queryType : 'demo',
                                                    readerConfig : [
                                                                    {name:'execOrgName', mapping: 'org.name'},
                                                                    {name:'id', mapping: 'child.id'},
                                                                    {name:'fileNo', mapping: 'file.fileNo'},
                                                                    {name:'name', mapping: 'file.name'},
                                                                    {name:'birthday', mapping: 'person.birthday'},
                                                                    {name:'sex', mapping: 'person.sex'},
                                                                    {name:'weeks', mapping: 'child.weeks'},
                                                                    {name:'item', mapping: 'child.item'},
                                                                    {name:'visitDate', mapping: 'child.visitDate'},
                                                                    {name:'nextVisitDate', mapping: 'child.nextVisitDate'},
                                                                    {name:'visitDoctor', mapping: 'child.visitDoctor'}
                                                                    
                                                                   ],
                                                    gridCmConfig :
                                                                   [
                                                                    { "header" : "执行机构", "dataIndex" : "execOrgName"}, 
                                                                     { "header" : "编号", "dataIndex" : "fileNo", "width":130 },
                                                                     { "header" : "姓名", "dataIndex" : "name" },
                                                                     { "header" : "项目", "dataIndex" : "item","renderer" : function(val){
                                                                         return  val ;
                                                                     }},
																	 { "header" : "随访日期", "dataIndex" : "visitDate",
                                                                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
																	{ "header" : "随访医生", "dataIndex" : "visitDoctor" },
																	{ "header" : "下次随访日期", "dataIndex" : "nextVisitDate",
                                                                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
                                                                     { "header" : "出生日期", "dataIndex" : "birthday",
                                                                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
                                                                                         { "header" : "高危", "dataIndex" : "highRisk" },   
                                                                     { "header" : "性别", "dataIndex" : "sex" },
                                                                     { "header" : "录入人", "dataIndex" : "username" }
                                                                   ],
                                                    gridViewConfig : {},
                                                    initComponent : function() {
                                                        this.build();
                                                        Ext.tf.HealthPanel.superclass.initComponent.call(this);
                                                    },

                                                    build : function() {
                                                //		this.tbar = this.createActions();
                                                        this.items = [ this.createPanel() ];
                                                    },
                                                    /*
                                                     * 查询数据, 如果树没有选择了节点，不执行
                                                     */
                                                    load : function(isReset) {
                                                        this.grid.getStore().reload();
                                                        this.doLayout(true);
                                                    },

                                                    createPanel : function() {
                                                        var reader = new Ext.data.JsonReader({
                                                            totalProperty : "totalSize",
                                                            root : "data",
                                                            id : this.recordId
                                                        }, Ext.data.Record.create(this.readerConfig));

                                                        var store = new Ext.data.Store({
															autoLoad: true,
                                                            proxy : new Ext.ux.data.DWRProxy({
                                                                dwrFunction : this.queryUrl,
                                                                listeners : {
                                                                    'beforeload' : function(dataProxy, params) {
																		params[dataProxy.loadArgsKey] = [ cond, params ];
                                                                    }
                                                                }
                                                            }),
                                                            reader : reader
                                                        });

                                                        this.pagingBar = new App.PagingToolbar({
                                                            pageSize : this.pageSize,
                                                            store : store,
                                                            displayInfo : true,
                                                            displayMsg : '{0} - {1} of {2}',
                                                            emptyMsg : "没有记录"
                                                        });
                                                        var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
                                                        this.gridCmConfig.unshift(sm);
                                                        this.grid = new Ext.grid.GridPanel({
                                                            //title : '请选择一个行政区划',
                                                            bbar : this.pagingBar,
                                                            layout : 'fit',
															border : false,
															height:403,
                                                            store : store,
                                                            cm : new Ext.grid.ColumnModel(this.gridCmConfig),
                                                            viewConfig : this.gridViewConfig,
                                                            sm : sm
                                                        });
                                                        this.grid.getView().on('refresh', function() {
                                                            // 缺省选择grid的第一条记录
                                                            var model = this.grid.getSelectionModel();
                                                            if (model.getCount() == 0) {
                                                                model.selectFirstRow();
                                                            }
                                                        }.createDelegate(this));
														/*行选择*/
														this.rowdata1 = [ 
															[1,"第一列"], 
															[2,"第二列"], 
															[3,"第三列"], 
															[4,"第四列"], 
															[4,"第五列"], 
															[4,"第六列"]
															];
														var rowstore = new Ext.data.SimpleStore({ 
															fields:[ 
															{name:"id"}, 
															{name:"name"}
															] 
														}); 
														var rowsm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
														var rowcm = new Ext.grid.ColumnModel([ 
																rowsm, 
																{header:"列数",dataIndex:"name"}
																]); 
														rowstore.loadData(this.rowdata1);
														this.rowgrid = new Ext.grid.GridPanel({ 
															cm:rowcm, 
															height:430,
															width:80,
															sm:rowsm, 
															store:rowstore, 
															loadMask:true 
															});
														/*页选择*/
														var pagedata = [ 
															[1,"第一页"], 
															[2,"第二页"]
															];
														var pagestore = new Ext.data.SimpleStore({ 
															fields:[ 
															{name:"id"}, 
															{name:"name"}
															] 
														}); 
														var pagesm = new Ext.grid.CheckboxSelectionModel({
																singleSelect:true});
														var pagecm = new Ext.grid.ColumnModel([ 
																pagesm, 
																{header:"页数",dataIndex:"name"}
																]); 
														pagestore.loadData(pagedata);
														this.pagegrid = new Ext.grid.GridPanel({ 
															cm:pagecm, 
															height:430,
															width:80,
															sm:pagesm, 
															store:pagestore, 
															loadMask:true,
															listeners:{
															"afterlayout":function (obj){
																	obj.getSelectionModel().selectFirstRow();
																}
															}
															});
														//
                                                        var panel = new Ext.Panel({
                                                            layout : 'table',
                                                            autoScroll : false,
															layoutConfig: {
																// The total column count must be specified here
																columns: 3
															},
															
															border:false,
                                                            //id : this.panelId,
                                                            items : [  {
                                                                title : '第一步：选择要打印的记录',
                                                                region : 'east',
                                                                //layout : 'fit',
                                                                width : 626,
                                                                height: 430,
                                                                frame : false,
                                                                border : true,
                                                                items : [ this.grid ]
                                                            },{
                                                                region : 'center',
                                                                //layout : 'fit',
                                                                frame : false,
                                                                title : '第二步：<br>选择页数',
                                                                split : false,
                                                                collapsible : false,
                                                               
                                                                width : 80,
                                                                height:430,
                                                                border : true,
                                                                items : [ this.pagegrid ]
                                                            },{
                                                                region : 'west',
                                                                //layout : 'fit',
                                                                frame : false,
                                                                title : '第三步：<br>选择列数',
                                                                split : false,
                                                                collapsible : false,
                                                   
                                                                width : 80,
                                                                height:430,
                                                                border : true,
                                                                items :[this.rowgrid]
                                                            },{
                                                                region : 'south',
																colspan: 3,
                                                                layout : 'table',
                                                                frame : false,
                                                                split : false,
																border : false,
                                                                collapsible : false,
                                                                layoutConfig: {
																	columns: 3
																},
                                                                height:8,
                                                                border : false
                                                            },{
                                                                region : 'south',
																colspan: 3,
                                                                layout : 'table',
                                                                frame : false,
                                                                split : false,
																border : false,
                                                                collapsible : false,
                                                                layoutConfig: {
																	columns: 5
																},
                                                                height:32,
																baseCls:"margin-top:10px",
                                                                border : false,
																buttonAlign : "center", 
                                                                items : [ 
																{
																	border:false,
																	width:300
																},{xtype:'button',
																	iconCls: 'c_print',
																	text:"打印检查记录",
																	handler : function (){
																		if(!this.grid.getSelectionModel().hasSelection()){
																			Ext.Msg.alert('提示', '请选择要打印的记录!');
																			return;
																		}
																		if(!this.pagegrid.getSelectionModel().hasSelection()){
																			Ext.Msg.alert('提示', '请选择页数!');
																			return;
																		}
																		if(!this.rowgrid.getSelectionModel().hasSelection()){
																			Ext.Msg.alert("提示","请选择列数!");
																			return;
																		}
																		var pagenum = this.pagegrid.getSelectionModel().getSelected().json[0];
																		var rownum = parseInt(this.rowgrid.getSelectionModel().getSelected().json[0]);
																		if(pagenum == "1"){
																			printObj.printPreview(getChildPrintCfg05(this.grid.getSelectionModel().getSelected().json,rownum),-2);
																		}else{
																			printObj.printPreview(getChildPrintCfg06(this.grid.getSelectionModel().getSelected().json,rownum),-2);
																		}
																	}.createDelegate(this)
																},
																{	border:false,width:20},
																{	xtype:'button',
																	cls:"x-btn-text-icon",
																	icon:"/resources/images/black/qtip/close.gif",
																	text:"退出",
																	scope :win,
																	handler : function (){
																			win.close();
																		}
																}
																//{border:false} 
																]
                                                            } ]
                                                        });
														
                                                        return panel;
                                                    }
                                                });
												var ppanel = new printpanel();
                                                var win = new Ext.Window(
                                                    {width:800,height:500,title:"1岁以内儿童健康检查表打印",layout : 'fit',items:[ppanel]}
                                                );
                                                win.show();
                                                win.doLayout(true);
												ppanel.grid.doLayout(true);
											}else{
												showError('该户没有1岁以内儿童健康检查信息,无法打印！');
											}
										}.createDelegate(this))
									}
								}
							}.createDelegate(this)
						},
						{
							text : '5、1-2岁儿童健康检查记录表打印',
							iconCls: 'c_print',
							handler : function(){
								var selections = this.grid.getSelections();
								if(selections.length > 0){
									var records = selections[0];
									var fileNo = records.get(this.recordPk);
									var param = '?' + this.recordPk + '=' + fileNo;
									var filterKey = "a."+this.recordPk;
									var filterValue = fileNo;
									var selNode = this.getTreeSelNode();
									if (selNode) {
										var cond = {
											district : selNode.id,
											filterKey : filterKey,
											filterValue : filterValue,
											isFirst : 1
										};
										console.log(cond);
										//查询
										UserMenuTreeService.findChildExam2print(cond,function(data){
											if(data){
												var printpanel = Ext.extend(Ext.Panel, {
                                                    closable : true,
                                                    currentNode : null, // 当前选择的树节点
                                                    layout : 'fit',
													border: false,
                                                    pageSize : 20,
                                                    recordId : 'child.id',
                                                    recordPk : 'id',
                                                    // 是否需要在最末级才能增加？
                                                    checkLastLevel : true,

                                                    // 设置查询url
                                                    queryUrl : UserMenuTreeService.findChildExam2print,

                                                    // 设置查询用的类别，比如档案，高血压等。。
                                                    queryType : 'demo',
                                                    readerConfig : [
                                                                    {name:'execOrgName', mapping: 'org.name'},
                                                                    {name:'id', mapping: 'child.id'},
                                                                    {name:'fileNo', mapping: 'file.fileNo'},
                                                                    {name:'name', mapping: 'file.name'},
                                                                    {name:'birthday', mapping: 'person.birthday'},
                                                                    {name:'sex', mapping: 'person.sex'},
                                                                    {name:'weeks', mapping: 'child.weeks'},
                                                                    {name:'item', mapping: 'child.item'},
                                                                    {name:'visitDate', mapping: 'child.visitDate'},
                                                                    {name:'nextVisitDate', mapping: 'child.nextVisitDate'},
                                                                    {name:'visitDoctor', mapping: 'child.visitDoctor'}
                                                                    
                                                                   ],
                                                    gridCmConfig :
                                                                   [
                                                                    { "header" : "执行机构", "dataIndex" : "execOrgName"}, 
                                                                     { "header" : "编号", "dataIndex" : "fileNo", "width":130 },
                                                                     { "header" : "姓名", "dataIndex" : "name" },
                                                                     { "header" : "项目", "dataIndex" : "item","renderer" : function(val){
                                                                         return val ;
                                                                     }},
																	 { "header" : "随访日期", "dataIndex" : "visitDate",
                                                                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
																	{ "header" : "随访医生", "dataIndex" : "visitDoctor" },
																	{ "header" : "下次随访日期", "dataIndex" : "nextVisitDate",
                                                                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
                                                                     { "header" : "出生日期", "dataIndex" : "birthday",
                                                                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
                                                                                         { "header" : "高危", "dataIndex" : "highRisk" },   
                                                                     { "header" : "性别", "dataIndex" : "sex" },
                                                                     { "header" : "录入人", "dataIndex" : "username" }
                                                                   ],
                                                    gridViewConfig : {},
                                                    initComponent : function() {
                                                        this.build();
                                                        Ext.tf.HealthPanel.superclass.initComponent.call(this);
                                                    },

                                                    build : function() {
                                                //		this.tbar = this.createActions();
                                                        this.items = [ this.createPanel() ];
                                                    },
                                                    /*
                                                     * 查询数据, 如果树没有选择了节点，不执行
                                                     */
                                                    load : function(isReset) {
                                                        this.grid.getStore().reload();
                                                        this.doLayout(true);
                                                    },

                                                    createPanel : function() {
                                                        var reader = new Ext.data.JsonReader({
                                                            totalProperty : "totalSize",
                                                            root : "data",
                                                            id : this.recordId
                                                        }, Ext.data.Record.create(this.readerConfig));

                                                        var store = new Ext.data.Store({
															autoLoad: true,
                                                            proxy : new Ext.ux.data.DWRProxy({
                                                                dwrFunction : this.queryUrl,
                                                                listeners : {
                                                                    'beforeload' : function(dataProxy, params) {
																		params[dataProxy.loadArgsKey] = [ cond, params ];
                                                                    }
                                                                }
                                                            }),
                                                            reader : reader
                                                        });

                                                        this.pagingBar = new App.PagingToolbar({
                                                            pageSize : this.pageSize,
                                                            store : store,
                                                            displayInfo : true,
                                                            displayMsg : '{0} - {1} of {2}',
                                                            emptyMsg : "没有记录"
                                                        });
                                                        var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
                                                        this.gridCmConfig.unshift(sm);
                                                        this.grid = new Ext.grid.GridPanel({
                                                            //title : '请选择一个行政区划',
                                                            bbar : this.pagingBar,
                                                            layout : 'fit',
															border : false,
															height:403,
                                                            store : store,
                                                            cm : new Ext.grid.ColumnModel(this.gridCmConfig),
                                                            viewConfig : this.gridViewConfig,
                                                            sm : sm
                                                        });
                                                        this.grid.getView().on('refresh', function() {
                                                            // 缺省选择grid的第一条记录
                                                            var model = this.grid.getSelectionModel();
                                                            if (model.getCount() == 0) {
                                                                model.selectFirstRow();
                                                            }
                                                        }.createDelegate(this));
														/*行选择*/
														this.rowdata1 = [ 
															[1,"第一列"], 
															[2,"第二列"], 
															[3,"第三列"], 
															[4,"第四列"], 
															[4,"第五列"], 
															[4,"第六列"]
															];
														var rowstore = new Ext.data.SimpleStore({ 
															fields:[ 
															{name:"id"}, 
															{name:"name"}
															] 
														}); 
														var rowsm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
														var rowcm = new Ext.grid.ColumnModel([ 
																rowsm, 
																{header:"列数",dataIndex:"name"} 
																]); 
														rowstore.loadData(this.rowdata1);
														this.rowgrid = new Ext.grid.GridPanel({ 
															cm:rowcm, 
															height:430,
															width:80,
															sm:rowsm, 
															store:rowstore, 
															loadMask:true 
															});
														/*页选择*/
														var pagedata = [ 
															[1,"第一页"], 
															[2,"第二页"]
															];
														var pagestore = new Ext.data.SimpleStore({ 
															fields:[ 
															{name:"id"}, 
															{name:"name"}
															] 
														}); 
														var pagesm = new Ext.grid.CheckboxSelectionModel({
																singleSelect:true});
														var pagecm = new Ext.grid.ColumnModel([ 
																pagesm, 
																{header:"页数",dataIndex:"name"} 
																]); 
														pagestore.loadData(pagedata);
														this.pagegrid = new Ext.grid.GridPanel({ 
															cm:pagecm, 
															height:430,
															width:80,
															sm:pagesm, 
															store:pagestore, 
															loadMask:true,
															listeners:{
															"afterlayout":function (obj){
																	obj.getSelectionModel().selectFirstRow();
																}
															}
															});
														//
                                                        var panel = new Ext.Panel({
                                                            layout : 'table',
                                                            autoScroll : false,
															layoutConfig: {
																// The total column count must be specified here
																columns: 3
															},
															
															border:false,
                                                            //id : this.panelId,
                                                            items : [  {
                                                                title : '第一步：选择要打印的记录',
                                                                region : 'east',
                                                                //layout : 'fit',
                                                                width : 626,
                                                                height: 430,
                                                                frame : false,
                                                                border : true,
                                                                items : [ this.grid ]
                                                            },{
                                                                region : 'center',
                                                                //layout : 'fit',
                                                                frame : false,
                                                                title : '第二步：<br>选择页数',
                                                                split : false,
                                                                collapsible : false,
                                                               
                                                                width : 80,
                                                                height:430,
                                                                border : true,
                                                                items : [ this.pagegrid ]
                                                            },{
                                                                region : 'west',
                                                                //layout : 'fit',
                                                                frame : false,
                                                                title : '第三步：<br>选择列数',
                                                                split : false,
                                                                collapsible : false,
                                                   
                                                                width : 80,
                                                                height:430,
                                                                border : true,
                                                                items :[this.rowgrid]
                                                            },{
                                                                region : 'south',
																colspan: 3,
                                                                layout : 'table',
                                                                frame : false,
                                                                split : false,
																border : false,
                                                                collapsible : false,
                                                                layoutConfig: {
																	columns: 3
																},
                                                                height:8,
                                                                border : false
                                                            },{
                                                                region : 'south',
																colspan: 3,
                                                                layout : 'table',
                                                                frame : false,
                                                                split : false,
																border : false,
                                                                collapsible : false,
                                                                layoutConfig: {
																	columns: 5
																},
                                                                height:32,
																baseCls:"margin-top:10px",
                                                                border : false,
																buttonAlign : "center", 
                                                                items : [ 
																{
																	border:false,
																	width:300
																},{xtype:'button',
																	iconCls: 'c_print',
																	text:"打印检查记录",
																	handler : function (){
																		if(!this.grid.getSelectionModel().hasSelection()){
																			Ext.Msg.alert('提示', '请选择要打印的记录!');
																			return;
																		}
																		if(!this.pagegrid.getSelectionModel().hasSelection()){
																			Ext.Msg.alert('提示', '请选择页数!');
																			return;
																		}
																		if(!this.rowgrid.getSelectionModel().hasSelection()){
																			Ext.Msg.alert("提示","请选择列数!");
																			return;
																		}
																		var pagenum = this.pagegrid.getSelectionModel().getSelected().json[0];
																		var rownum = parseInt(this.rowgrid.getSelectionModel().getSelected().json[0]);
																		if(pagenum == "1"){
																			printObj.printPreview(getChildPrintCfg08(this.grid.getSelectionModel().getSelected().json,rownum),-2);
																		}else{
																			printObj.printPreview(getChildPrintCfg10(this.grid.getSelectionModel().getSelected().json,rownum),-2);
																		}
																	}.createDelegate(this)
																},
																{	border:false,width:20},
																{	xtype:'button',
																	cls:"x-btn-text-icon",
																	icon:"/resources/images/black/qtip/close.gif",
																	text:"退出",
																	scope :win,
																	handler : function (){
																			win.close();
																		}
																}
																//{border:false} 
																]
                                                            } ]
                                                        });
														
                                                        return panel;
                                                    }
                                                });
												var ppanel = new printpanel();
                                                var win = new Ext.Window(
                                                    {width:800,height:500,title:"1-2岁儿童健康检查记录表打印",layout : 'fit',items:[ppanel]}
                                                );
                                                win.show();
                                                win.doLayout(true);
												ppanel.grid.doLayout(true);
											}else{
												showError('该户没有5、1-2岁儿童健康检查记录表信息,无法打印！');
											}
										}.createDelegate(this))
									}
								}
							}.createDelegate(this)
						},{
							text : '6、儿童入托儿园(所)健康检查表打印',
							iconCls: 'c_print',
							handler : function(){
								var selections = this.grid.getSelections();
								if(selections.length > 0){
									var records = selections[0];
									var fileNo = records.get(this.recordPk);
									var param = '?' + this.recordPk + '=' + fileNo;
									var filterKey = "a."+this.recordPk;
									var filterValue = fileNo;
									var selNode = this.getTreeSelNode();
									if (selNode) {
										var cond = {
											district : selNode.id,
											filterKey : filterKey,
											filterValue : filterValue,
											isFirst : 1
										};
										console.log(cond);
										//查询
										var printpanel = Ext.extend(Ext.Panel, {
											closable : true,
											currentNode : null, // 当前选择的树节点
											layout : 'fit',
											border: false,
											pageSize : 20,
											recordId : 'visit.id',
											recordPk : 'id',
											//panelId : 'print_childBirthRecordPanel',
											// 是否需要在最末级才能增加？
											checkLastLevel : true,

											// 设置查询url
											queryUrl : UserMenuTreeService.findVisitAfterBornRecords,
											// 设置查询用的类别，比如档案，高血压等。。
											queryType : 'demo',
											readerConfig : [
															{name:'execOrgName', mapping: 'org.name'},
															{name:'id', mapping: 'visit.id'},
															{name:'fileNo', mapping: 'file.fileNo'},
															{name:'name', mapping: 'file.name'},
															{name:'birthday', mapping: 'person.birthday'},
															{name:'highRisk', mapping: 'visit.highRisk'},
															{name:'visitDate', mapping: 'visit.visitDate'},
															{name:'result', mapping: 'visit.result'},
															{name:'nextVisitDate', mapping: 'visit.nextVisitDate'},
															{name:'visitDoctor', mapping: 'visit.visitDoctor'},
															{name:'username', mapping: 'samTaxempcode.username'}
														   ],
											gridCmConfig :
														   [
															 { "header" : "执行机构", "dataIndex" : "execOrgName"}, 
															 { "header" : "编号", "dataIndex" : "fileNo", "width":130 },
															 { "header" : "姓名", "dataIndex" : "name" },
															 { "header" : "出生日期", "dataIndex" : "birthday",
																				 "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
																				 { "header" : "高危", "dataIndex" : "highRisk" },
															 { "header" : "随访日期", "dataIndex" : "visitDate",
																				   "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
															 { "header" : "分类", "dataIndex" : "result" },
															 { "header" : "下次随访日期", "dataIndex" : "nextVisitDate",
																				 "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
															 { "header" : "随访医生", "dataIndex" : "visitDoctor" },
															 { "header" : "录入人", "dataIndex" : "username" }
														   ],
											gridViewConfig : {},
											initComponent : function() {
												this.build();
												Ext.tf.HealthPanel.superclass.initComponent.call(this);
											},

											build : function() {
												this.items = [ this.createPanel() ];
											},
											load : function(isReset) {
												this.grid.getStore().reload();
												this.doLayout(true);
											},

											createPanel : function() {
												var reader = new Ext.data.JsonReader({
													totalProperty : "totalSize",
													root : "data",
													id : this.recordId
												}, Ext.data.Record.create(this.readerConfig));
												var store = new Ext.data.Store({
													autoLoad: true,
													proxy : new Ext.ux.data.DWRProxy({
														dwrFunction : this.queryUrl,
														listeners : {
															'beforeload' : function(dataProxy, params) {
																params[dataProxy.loadArgsKey] = [ cond, params ];
															}
														}
													}),
													reader : reader
												});

												this.pagingBar = new App.PagingToolbar({
													pageSize : this.pageSize,
													store : store,
													displayInfo : true,
													displayMsg : '{0} - {1} of {2}',
													emptyMsg : "没有记录"
												});
												var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
												this.gridCmConfig.unshift(sm);
												this.grid = new Ext.grid.GridPanel({
													//title : '请选择一个行政区划',
													bbar : this.pagingBar,
													layout : 'fit',
													border : false,
													height:403,
													store : store,
													cm : new Ext.grid.ColumnModel(this.gridCmConfig),
													viewConfig : this.gridViewConfig,
													sm : sm
												});
												this.grid.getView().on('refresh', function() {
													// 缺省选择grid的第一条记录
													var model = this.grid.getSelectionModel();
													if (model.getCount() == 0) {
														model.selectFirstRow();
													}
												}.createDelegate(this));
												/*页选择*/
												var pagedata = [ 
													[1,"第一行"], 
													[2,"第二行"], 
													[3,"第三行"]
													];
												var pagestore = new Ext.data.SimpleStore({ 
													fields:[ 
													{name:"id"}, 
													{name:"name"}
													] 
												}); 
												var pagesm = new Ext.grid.CheckboxSelectionModel({
														singleSelect:true});
												var pagecm = new Ext.grid.ColumnModel([ 
														pagesm, 
														{header:"页数",dataIndex:"name"} 
														]); 
												pagestore.loadData(pagedata);
												this.pagegrid = new Ext.grid.GridPanel({ 
													cm:pagecm, 
													height:430,
													width:80,
													sm:pagesm, 
													store:pagestore, 
													loadMask:true
													});
												var panel = new Ext.Panel({
													layout : 'table',
													autoScroll : false,
													layoutConfig: {
														columns: 3
													},
													border:false,
													items : [  
													{
														title : '选择要打印的记录',
														region : 'east',
														colspan: 2,
														width : 626,
														height: 430,
														frame : false,
														border : true,
														items : [ this.grid ]
													},
													{
														region : 'center',
														frame : false,
														title : '第二步：<br>选择行数',
														split : false,
														collapsible : false,
													   
														width : 80,
														height:430,
														border : true,
														items : [ this.pagegrid ]
													},
													{
														region : 'south',
														colspan: 3,
														layout : 'table',
														frame : false,
														split : false,
														border : false,
														collapsible : false,
														height:8,
														border : false
													},
													{
														region : 'south',
														colspan: 3,
														layout : 'table',
														frame : false,
														split : false,
														border : false,
														collapsible : false,
														layoutConfig: {
															columns: 4
														},
														height:32,
														baseCls:"margin-top:10px",
														border : false,
														buttonAlign : "center", 
														items : [ 
														{
															border:false,
															width:300
														},
														{xtype:'button',
															iconCls: 'c_print',
															text:"打印",
															handler : function (){
																if(!this.grid.getSelectionModel().hasSelection()){
																	Ext.Msg.alert('提示', '请选择要打印的记录!');
																	return;
																}
																if(!this.pagegrid.getSelectionModel().hasSelection()){
																	Ext.Msg.alert('提示', '请选择行数!');
																	return;
																}
																var rownum = this.pagegrid.getSelectionModel().getSelected().json[0];
																printObj.printPreview(getChildPrintCfg10(this.grid.getSelectionModel().getSelected().json,rownum),-2);
															}.createDelegate(this)
														},
														{	border:false,width:20},
														{	xtype:'button',
															cls:"x-btn-text-icon",
															icon:"/resources/images/black/qtip/close.gif",
															text:"退出",
															scope :win,
															handler : function (){
																	win.close();
																}
														}
														//{border:false} 
														]
													} ]
												});
												
												return panel;
											}
										});
										var ppanel = new printpanel();
										var win = new Ext.Window(
											{width:720,height:500,title:"6、产后访视记录表",layout : 'fit',items:[ppanel]}
										);
										win.show();
										win.doLayout(true);
										ppanel.grid.doLayout(true);
									}
								}
							}.createDelegate(this)
						},{
							text : '7、3-6岁儿童健康检查记录表打印',
							iconCls: 'c_print',
							handler : function(){
								var selections = this.grid.getSelections();
								if(selections.length > 0){
									var records = selections[0];
									var fileNo = records.get(this.recordPk);
									var param = '?' + this.recordPk + '=' + fileNo;
									var filterKey = "a."+this.recordPk;
									var filterValue = fileNo;
									var selNode = this.getTreeSelNode();
									if (selNode) {
										var cond = {
											district : selNode.id,
											filterKey : filterKey,
											filterValue : filterValue,
											isFirst : 1
										};
										console.log(cond);
										//查询
										UserMenuTreeService.findChildExam3print(cond,function(data){
											if(data){
												var printpanel = Ext.extend(Ext.Panel, {
                                                    closable : true,
                                                    currentNode : null, // 当前选择的树节点
                                                    layout : 'fit',
													border: false,
                                                    pageSize : 20,
                                                    recordId : 'child.id',
                                                    recordPk : 'id',
                                                    // 是否需要在最末级才能增加？
                                                    checkLastLevel : true,

                                                    // 设置查询url
                                                    queryUrl : UserMenuTreeService.findChildExam3print,

                                                    // 设置查询用的类别，比如档案，高血压等。。
                                                    queryType : 'demo',
                                                    readerConfig : [
                                                                    {name:'execOrgName', mapping: 'org.name'},
                                                                    {name:'id', mapping: 'child.id'},
                                                                    {name:'fileNo', mapping: 'file.fileNo'},
                                                                    {name:'name', mapping: 'file.name'},
                                                                    {name:'birthday', mapping: 'person.birthday'},
                                                                    {name:'sex', mapping: 'person.sex'},
                                                                    {name:'weeks', mapping: 'child.weeks'},
                                                                    {name:'item', mapping: 'child.item'},
                                                                    {name:'visitDate', mapping: 'child.visitDate'},
                                                                    {name:'nextVisitDate', mapping: 'child.nextVisitDate'},
                                                                    {name:'visitDoctor', mapping: 'child.visitDoctor'}
                                                                    
                                                                   ],
                                                    gridCmConfig :
                                                                   [
                                                                    { "header" : "执行机构", "dataIndex" : "execOrgName"}, 
                                                                     { "header" : "编号", "dataIndex" : "fileNo", "width":130 },
                                                                     { "header" : "姓名", "dataIndex" : "name" },
                                                                     { "header" : "项目", "dataIndex" : "item","renderer" : function(val){
                                                                         return val ;
                                                                     }},
																	 { "header" : "随访日期", "dataIndex" : "visitDate",
                                                                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
																	{ "header" : "随访医生", "dataIndex" : "visitDoctor" },
																	{ "header" : "下次随访日期", "dataIndex" : "nextVisitDate",
                                                                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
                                                                     { "header" : "出生日期", "dataIndex" : "birthday",
                                                                                         "renderer": Ext.util.Format.dateRenderer('Y-m-d') },
                                                                                         { "header" : "高危", "dataIndex" : "highRisk" },   
                                                                     { "header" : "性别", "dataIndex" : "sex" },
                                                                     { "header" : "录入人", "dataIndex" : "username" }
                                                                   ],
                                                    gridViewConfig : {},
                                                    initComponent : function() {
                                                        this.build();
                                                        Ext.tf.HealthPanel.superclass.initComponent.call(this);
                                                    },

                                                    build : function() {
                                                //		this.tbar = this.createActions();
                                                        this.items = [ this.createPanel() ];
                                                    },
                                                    /*
                                                     * 查询数据, 如果树没有选择了节点，不执行
                                                     */
                                                    load : function(isReset) {
                                                        this.grid.getStore().reload();
                                                        this.doLayout(true);
                                                    },

                                                    createPanel : function() {
                                                        var reader = new Ext.data.JsonReader({
                                                            totalProperty : "totalSize",
                                                            root : "data",
                                                            id : this.recordId
                                                        }, Ext.data.Record.create(this.readerConfig));

                                                        var store = new Ext.data.Store({
															autoLoad: true,
                                                            proxy : new Ext.ux.data.DWRProxy({
                                                                dwrFunction : this.queryUrl,
                                                                listeners : {
                                                                    'beforeload' : function(dataProxy, params) {
																		params[dataProxy.loadArgsKey] = [ cond, params ];
                                                                    }
                                                                }
                                                            }),
                                                            reader : reader
                                                        });

                                                        this.pagingBar = new App.PagingToolbar({
                                                            pageSize : this.pageSize,
                                                            store : store,
                                                            displayInfo : true,
                                                            displayMsg : '{0} - {1} of {2}',
                                                            emptyMsg : "没有记录"
                                                        });
                                                        var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
                                                        this.gridCmConfig.unshift(sm);
                                                        this.grid = new Ext.grid.GridPanel({
                                                            //title : '请选择一个行政区划',
                                                            bbar : this.pagingBar,
                                                            layout : 'fit',
															border : false,
															height:403,
                                                            store : store,
                                                            cm : new Ext.grid.ColumnModel(this.gridCmConfig),
                                                            viewConfig : this.gridViewConfig,
                                                            sm : sm
                                                        });
                                                        this.grid.getView().on('refresh', function() {
                                                            // 缺省选择grid的第一条记录
                                                            var model = this.grid.getSelectionModel();
                                                            if (model.getCount() == 0) {
                                                                model.selectFirstRow();
                                                            }
                                                        }.createDelegate(this));
														/*页选择*/
														var pagedata = [ 
															[1,"第一列"], 
															[2,"第二列"], 
															[3,"第三列"], 
															[4,"第四列"]
															];
														var pagestore = new Ext.data.SimpleStore({ 
															fields:[ 
															{name:"id"}, 
															{name:"name"}
															] 
														}); 
														var pagesm = new Ext.grid.CheckboxSelectionModel({
																singleSelect:true});
														var pagecm = new Ext.grid.ColumnModel([ 
																pagesm, 
																{header:"页数",dataIndex:"name"}
																]); 
														pagestore.loadData(pagedata);
														this.pagegrid = new Ext.grid.GridPanel({ 
															cm:pagecm, 
															height:430,
															width:80,
															sm:pagesm, 
															store:pagestore, 
															loadMask:true,
															listeners:{
															"afterlayout":function (obj){
																	obj.getSelectionModel().selectFirstRow();
																}
															}
															});
														//
                                                        var panel = new Ext.Panel({
                                                            layout : 'table',
                                                            autoScroll : false,
															layoutConfig: {
																// The total column count must be specified here
																columns: 2
															},
															
															border:false,
                                                            //id : this.panelId,
                                                            items : [  {
                                                                title : '第一步：选择要打印的记录',
                                                                region : 'east',
                                                                //layout : 'fit',
                                                                width : 626,
                                                                height: 430,
                                                                frame : false,
                                                                border : true,
                                                                items : [ this.grid ]
                                                            },{
                                                                region : 'center',
                                                                //layout : 'fit',
                                                                frame : false,
                                                                title : '第二步：<br>选择列数',
                                                                split : false,
                                                                collapsible : false,
                                                               
                                                                width : 80,
                                                                height:430,
                                                                border : true,
                                                                items : [ this.pagegrid ]
                                                            },{
                                                                region : 'south',
																colspan: 2,
                                                                layout : 'table',
                                                                frame : false,
                                                                split : false,
																border : false,
                                                                collapsible : false,
                                                                layoutConfig: {
																	columns: 3
																},
                                                                height:8,
                                                                border : false
                                                            },{
                                                                region : 'south',
																colspan: 2,
                                                                layout : 'table',
                                                                frame : false,
                                                                split : false,
																border : false,
                                                                collapsible : false,
                                                                layoutConfig: {
																	columns: 5
																},
                                                                height:32,
																baseCls:"margin-top:10px",
                                                                border : false,
																buttonAlign : "center", 
                                                                items : [ 
																{
																	border:false,
																	width:300
																},{xtype:'button',
																	iconCls: 'c_print',
																	text:"打印",
																	handler : function (){
																		if(!this.grid.getSelectionModel().hasSelection()){
																			Ext.Msg.alert('提示', '请选择要打印的记录!');
																			return;
																		}
																		if(!this.pagegrid.getSelectionModel().hasSelection()){
																			Ext.Msg.alert('提示', '请选择列数!');
																			return;
																		}
																		var pagenum = parseInt(this.pagegrid.getSelectionModel().getSelected().json[0]);
																		printObj.printPreview(getChildPrintCfg12(this.grid.getSelectionModel().getSelected().json,pagenum),-2);
																	}.createDelegate(this)
																},
																{	border:false,width:20},
																{	xtype:'button',
																	cls:"x-btn-text-icon",
																	icon:"/resources/images/black/qtip/close.gif",
																	text:"退出",
																	scope :win,
																	handler : function (){
																			win.close();
																		}
																}
																//{border:false} 
																]
                                                            } ]
                                                        });
														
                                                        return panel;
                                                    }
                                                });
												var ppanel = new printpanel();
                                                var win = new Ext.Window(
                                                    {width:720,height:500,title:"3-6岁儿童健康检查记录表打印",layout : 'fit',items:[ppanel]}
                                                );
                                                win.show();
                                                win.doLayout(true);
												ppanel.grid.doLayout(true);
											}else{
												showError('该户没有3-6岁健康检查记录表信息,无法打印！');
											}
										}.createDelegate(this))
									}
								}
							}.createDelegate(this)
						}
						
						]
					})
				}),
				new Ext.Action({
					text : '增加',
					iconCls : 'c_add',
					handler : function() {
						var selNode = this.getTreeSelNode();
						if (selNode) {
							this.f_add();
						}
					}.createDelegate(this)
				}),
				this.editAction,
				new Ext.Action({
					text : '删除',
					iconCls : 'c_del',
					handler : function() {
						var selections = this.grid.getSelections();
						if (selections.length > 0) {
							var array = [];

							var pk = this.recordPk;
							Ext.each(selections, function(v) {
								array.push(v.get(pk));
							});

							var del = function(e) {
								if (e == "yes") {
									this.deleteUrl(array, {
										callback : function(data) {
											Ext.Msg.alert('', '删除成功！');
											this.load();
										}.createDelegate(this),
										errorHandler : function(msg) {
											console.log(msg);
											Ext.Msg.alert('', '删除出错！');
										}
									});
								}
							};
							Ext.MessageBox.confirm("提示", "确认要删除所选择的记录么？", del,
									this);
						}
					}.createDelegate(this)
				}),
				'-',
				this.combo,
				this.filterField,
				new Ext.Action({
					text : '查询',
					iconCls : 'c_query',
					handler : function() {
						this.load(true);
					}.createDelegate(this)
				}),

				new Ext.Action({
					text : '数据导出',
					iconCls : 'c_add',
					handler : function() {
						var selNode = this.getTreeSelNode();
						if (selNode) {
							var disNo = selNode.id;
							var id = this.panelId;
							Ext.getCmp(id).getEl().mask('导出数据加载中...');
							var filterKey = this.combo.getValue();
							var filterValue = this.filterField.getValue();
							this.dataExportUrl(disNo, filterKey, filterValue,
									function(data) {
										window.location.href = data;
										// UserMenuTreeService.removeDataExportFile(data);
										Ext.getCmp(id).getEl().unmask();
									});
						}
					}.createDelegate(this)
				}) ];
	},

	/*
	 * 取得行政树的节点 如果节点没有选中，提示信息，返回空 如果选中，再取得过滤条件，组合成查询条件，并返回之
	 */
	getParams : function() {
		var selNode = this.getTreeSelNode();
		if (selNode) {
			var filterKey = this.combo.getValue();
			var filterValue = this.filterField.getValue();
			var isFirst = this.isFirst.getValue();
			var cond = {
				district : selNode.id,
				filterKey : filterKey,
				filterValue : filterValue,
				isFirst : isFirst
			};
			console.log(cond);
			return cond;
		}
		return null;
	},

	/*
	 * 查询数据, 如果树没有选择了节点，不执行
	 */
	load : function(isReset) {
		var selNode = this.getTreeSelNode();
		if (selNode) {
			if (isReset) {
				this.pagingBar.changePage(1);
			}
			this.grid.getStore().reload();
			this.doLayout(true);
		}
	},

	createPanel : function() {
		var reader = new Ext.data.JsonReader({
			totalProperty : "totalSize",
			root : "data",
			id : this.recordId
		}, Ext.data.Record.create(this.readerConfig));

		var store = new Ext.data.Store({
			proxy : new Ext.ux.data.DWRProxy({
				dwrFunction : this.queryUrl,
				listeners : {
					'beforeload' : function(dataProxy, params) {
						var o = this.getParams();
						console.log("getParams: ")
						console.log(o);
						if (!params.limit)
							params.limit = this.pageSize;
						params[dataProxy.loadArgsKey] = [ o, params ];
					}.createDelegate(this)
				}
			}),
			reader : reader
		});

		this.pagingBar = new App.PagingToolbar({
			pageSize : this.pageSize,
			store : store,
			displayInfo : true,
			displayMsg : '{0} - {1} of {2}',
			emptyMsg : "没有记录"
		});
		var sm = new Ext.grid.CheckboxSelectionModel();
		this.gridCmConfig.unshift(sm);
		this.grid = new Ext.grid.GridPanel({
			title : '请选择一个行政区划',
			bbar : this.pagingBar,
			layout : 'fit',
			store : store,
			cm : new Ext.grid.ColumnModel(this.gridCmConfig),
			viewConfig : this.gridViewConfig,
			sm : sm
		});
		this.grid.getView().on('refresh', function() {
			// 缺省选择grid的第一条记录
			var model = this.grid.getSelectionModel();
			if (model.getCount() == 0) {
				model.selectFirstRow();
			}
		}.createDelegate(this));

//		this.grid.on('rowdblclick', this.editFn, this);
		this.grid.on('rowdblclick', function(){
			var selections = this.grid.getSelections();
			if (selections.length == 1) {
				console.log(selections[0]);
				this.f_edit(selections[0]);
			}
		}, this);

		this.menu = new Ext.tree.TreePanel({
			// height : 465,
			layout : 'fit',
			animate : true,
			enableDD : false,
			loader : new Ext.ux.DWRTreeLoader({
				dwrCall : this.treeLoaderFn
			}),
			lines : true,
			autoScroll : true,
			border : false,
			root : new Ext.tree.AsyncTreeNode({
				text : 'root',
				draggable : false,
				id : 'org'
			}),
			rootVisible : false
		});

		this.menu.getRootNode().on({
			append : {
				stopEvent : true,
				fn : function(t, me, n, index) {
					// 自动展开根节点的第一个孩子
					if (index == 0) {
						if (!n.leaf)
							n.expand();
						this.currentNode = n;
						this.isFirst.setValue(0);
						// this.load();
					}
				}.createDelegate(this)
			}
		});

		this.menu.on({
			click : {
				stopEvent : true,
				fn : function(n, e) {
					e.stopEvent();
					this.currentNode = n;
					this.isFirst.setValue(1);
					this.grid.setTitle(n.text);
					this.load();
				}.createDelegate(this)
			},
			dblclick : {
				fn : function(n, e) {
					this.f_add(true);
				}.createDelegate(this)
			}
		});

		var panel = new Ext.Panel({
			layout : 'border',
			autoScroll : true,
			id : this.panelId,
			tbar : this.createActions(),
			items : [ {
				region : 'west',
				layout : 'fit',
				frame : false,
				title : '行政区划',
				split : true,
				collapsible : true,
				layoutConfig : {
					animate : true
				},
				width : 200,
				minSize : 100,
				maxSize : 400,
				border : false,
				items : [ this.menu ]
			}, {
				region : 'center',
				layout : 'fit',
				frame : false,
				border : false,
				items : [ this.grid ]
			} ]
		});
		return panel;
	}
});