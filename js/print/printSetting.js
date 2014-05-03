function printdata(data){
    var msg = "";
    for(var item in data){
        //if(item.toLowerCase().indexOf("n")>=0)
            msg = msg +item+"="+data[item]+"\n";
    }
    return msg;
}
//打印纸张设定
var title_initTop = "0cm";
var title_intLeft = "0cm";
var title_intWidth = "20.8cm";
var title_intHeight = "28cm";
function getPrintCfg01(data){
    //1.封面(封面 封底.jpg)
    var retprintcfg = {
        title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:"20.8cm",intHeight:"14cm",strContent:"1、封面"},
        data: new Array()
    }
    var count = 0;
    var pos = new Array();
    pos[count++]=new Array("1.75cm","8.39cm","0.5cm","0.79cm");
    pos[count++]=new Array("1.75cm","8.89cm","0.5cm","0.79cm");
    pos[count++]=new Array("1.75cm","9.39cm","0.5cm","0.79cm");
    pos[count++]=new Array("1.75cm","9.9cm","0.5cm","0.79cm");
    pos[count++]=new Array("1.75cm","10.4cm","0.5cm","0.79cm");
    pos[count++]=new Array("1.75cm","10.9cm","0.5cm","0.79cm");
    pos[count++]=new Array("1.75cm","11.69cm","0.5cm","0.79cm");
    pos[count++]=new Array("1.75cm","12.2cm","0.5cm","0.79cm");
    pos[count++]=new Array("1.75cm","12.7cm","0.5cm","0.79cm");
    pos[count++]=new Array("1.75cm","13.47cm","0.5cm","0.79cm");
    pos[count++]=new Array("1.75cm","13.97cm","0.5cm","0.79cm");
    pos[count++]=new Array("1.75cm","14.47cm","0.5cm","0.79cm");
    pos[count++]=new Array("1.75cm","15.24cm","0.5cm","0.79cm");
    pos[count++]=new Array("1.75cm","15.74cm","0.5cm","0.79cm");
    pos[count++]=new Array("1.75cm","16.22cm","0.5cm","0.79cm");
    pos[count++]=new Array("1.75cm","16.72cm","0.5cm","0.79cm");
    pos[count++]=new Array("1.75cm","17.22cm","0.5cm","0.79cm");
    pos[count++]=new Array("1.75cm","17.73cm","0.5cm","0.79cm");
    pos[count++]=new Array("8.1cm","2.38cm","3.49cm","0.79cm");
    pos[count++]=new Array("8.1cm","7.09cm","2.01cm","0.79cm");
    pos[count++]=new Array("8.1cm","10.19cm","4cm","0.79cm");
    pos[count++]=new Array("8.1cm","16.4cm","4cm","0.79cm");
    pos[count++]=new Array("8.76cm","2.09cm","2.01cm","0.79cm");
    pos[count++]=new Array("8.76cm","3.49cm","2.01cm","0.79cm");
    pos[count++]=new Array("8.76cm","5.79cm","4cm","0.79cm");
    pos[count++]=new Array("8.6cm","8.7cm","3.44cm","0.79cm");
    pos[count++]=new Array("8.6cm","12.09cm","3.52cm","0.69cm");
    pos[count++]=new Array("8.76cm","15.58cm","4cm","0.79cm");
    pos[count++]=new Array("9.42cm","2.09cm","2.01cm","0.79cm");
    pos[count++]=new Array("9.42cm","3.49cm","2.01cm","0.79cm");
    pos[count++]=new Array("9.42cm","5.79cm","4cm","0.79cm");
    pos[count++]=new Array("9.31cm","8.7cm","3.41cm","0.79cm");
    pos[count++]=new Array("9.31cm","12.09cm","3.6cm","0.79cm");
    pos[count++]=new Array("9.42cm","15.58cm","4cm","0.79cm");
    pos[count++]=new Array("10.24cm","3.39cm","4cm","0.79cm");
    pos[count++]=new Array("10.24cm","6.91cm","6.01cm","0.79cm");
    pos[count++]=new Array("10.24cm","15cm","2.01cm","0.79cm");
    pos[count++]=new Array("10.24cm","16.99cm","1.01cm","0.79cm");
    pos[count++]=new Array("10.24cm","18.28cm","1.01cm","0.79cm");
    pos[count++]=new Array("11.11cm","5.9cm","5cm","0.79cm");

    var risk = data.maternal.highRiskCode;
    if(risk){
        risk = "0"+risk.substring(0,risk.indexOf("、"));
        risk = risk.substring(risk.length-2,2);
    }
    
    var value = new Array();
    count = 0;
    value[count++] = data.file.fileNo.substr(0,1);
    value[count++] = data.file.fileNo.substr(1,1);
    value[count++] = data.file.fileNo.substr(2,1);
    value[count++] = data.file.fileNo.substr(3,1);
    value[count++] = data.file.fileNo.substr(4,1);
    value[count++] = data.file.fileNo.substr(5,1);
    value[count++] = data.file.fileNo.substr(6,1);
    value[count++] = data.file.fileNo.substr(7,1);
    value[count++] = data.file.fileNo.substr(8,1);
    value[count++] = data.file.fileNo.substr(9,1);
    value[count++] = data.file.fileNo.substr(10,1);
    value[count++] = data.file.fileNo.substr(11,1);
    value[count++] = data.file.fileNo.substr(12,1);
    value[count++] = data.file.fileNo.substr(13,1);
    value[count++] = data.file.fileNo.substr(14,1);
    value[count++] = data.file.fileNo.substr(15,1);
    value[count++] = data.file.fileNo.substr(16,1);
    value[count++] = data.file.fileNo.substr(17,1);
    value[count++] = data.file.name;
    value[count++] = parseInt(Ext.util.Format.date(new Date(),"Y"))-parseInt(Ext.util.Format.date(data.maternal.birthday,"Y") );
    value[count++] = data.maternal.tel;
    value[count++] = data.maternal.firstAidTel;
    value[count++] = data.maternal.addressProvence;
    value[count++] = data.maternal.addressCity;
    value[count++] = data.maternal.addressCounty;
    value[count++] = data.maternal.addressTownship;
    value[count++] = data.maternal.addressVillage;
    value[count++] = data.maternal.addressGroup;
    value[count++] = data.maternal.residenceProvence;
    value[count++] = data.maternal.residenceCity;
    value[count++] = data.maternal.residenceCounty;
    value[count++] = data.maternal.residenceTownship;
    value[count++] = data.maternal.residenceVillage;
    value[count++] = data.maternal.residenceGroup;
    value[count++] = risk;
    value[count++] = data.maternal.buildUnit;
    value[count++] = Ext.util.Format.date(data.maternal.buildDate,"Y");
    value[count++] = Ext.util.Format.date(data.maternal.buildDate,"m");
    value[count++] = Ext.util.Format.date(data.maternal.buildDate,"d");
    value[count++] = data.maternal.firstAidTel;
    
    for(var i = 0 ; i < count ; i++){
        if(value[i] == null || value[i] == NaN || (value[i].toLowerCase && (value[i].toLowerCase() ==="null" || value[i].toLowerCase() ==="nan")) ){
            value[i] = "";
        }
        retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
    }
    return retprintcfg;
}

function getPrintCfg02(data){
    console.log("孕妇基本档案");
    console.log(data);
    //2.孕妇基本档案(1-2.jpg)
    var retprintcfg = {
        title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:title_intWidth,intHeight:title_intHeight,strContent:"2、孕妇基本档案"},
        data:new Array()
    };
    var count = 0;
    var pos = new Array();
    pos[count++] =  new Array("17.25cm","2.2cm","0.5cm","0.6cm"); //国籍
    pos[count++] =  new Array("17.25cm","3.2cm","0.5cm","0.6cm"); //其他
    pos[count++] =  new Array("17.25cm","5.3cm","3cm","0.6cm"); //其他名字
    pos[count++] =  new Array("17.25cm","12.4cm","3.5cm","0.6cm");//身份证,护照号
    pos[count++] =  new Array("18.02cm","2.9cm","3cm","0.6cm");//工作单位
    pos[count++] =  new Array("18.15cm","7.5cm","0.5cm","0.6cm");//户籍类别
    pos[count++] =  new Array("18.15cm","9.1cm","0.5cm","0.6cm");//户籍类别
    pos[count++] =  new Array("18.15cm","12.4cm","0.5cm","0.6cm");//居住地区 : 无对应字段,默认选择4.其他地区
    pos[count++] =  new Array("18.15cm","13.7cm","0.5cm","0.6cm");
    pos[count++] =  new Array("18.15cm","15.6cm","0.5cm","0.6cm");
    pos[count++] =  new Array("18.15cm","17cm","0.5cm","0.6cm");
    pos[count++] =  new Array("19cm","6.9cm","1cm","0.6cm");//卫生机构公里数 : 无对应字段
    pos[count++] =  new Array("19cm","10.7cm","1cm","0.6cm");
    pos[count++] =  new Array("19cm","12cm","1cm","0.6cm");
    pos[count++] =  new Array("18.92cm","14.1cm","1.56cm","0.6cm");//少数民族
    pos[count++] =  new Array("20cm","3.1cm","1cm","0.6cm");
    pos[count++] =  new Array("20cm","5.7cm","1cm","0.6cm");
    pos[count++] =  new Array("20cm","8cm","1cm","0.6cm");
    pos[count++] =  new Array("20cm","10.7cm","1cm","0.6cm"); 
    pos[count++] =  new Array("20cm","12cm","1cm","0.6cm");
    pos[count++] =  new Array("20.9cm","2.5cm","1cm","0.6cm");
    pos[count++] =  new Array("20.9cm","9.0cm","1cm","0.6cm");
    pos[count++] =  new Array("20.9cm","12.6cm","1cm","0.6cm");
    pos[count++] =  new Array("20.9cm","16.5cm","1cm","0.6cm");
    pos[count++] =  new Array("21.8cm","1.5cm","1cm","0.6cm");
    pos[count++] =  new Array("21.8cm","6.8cm","1cm","0.6cm");
    pos[count++] =  new Array("21.8cm","12.7cm","1cm","0.6cm");
    pos[count++] =  new Array("21.8cm","14.2cm","1cm","0.6cm");
    pos[count++] =  new Array("22.5cm","3cm","2cm","0.6cm");//产后休养地-省
    pos[count++] =  new Array("22.5cm","4.5cm","1cm","0.6cm");//市
    pos[count++] =  new Array("22.5cm","6.9cm","1.22cm","0.6cm");//区
    pos[count++] =  new Array("22.44cm","9.2cm","1.51cm","0.6cm");//街
    pos[count++] =  new Array("22.44cm","12.8cm","1.85cm","0.6cm");//村
    pos[count++] =  new Array("22.44cm","15.8cm","2.09cm","0.6cm");//门牌号
    pos[count++] =  new Array("23.3cm","3cm","3cm","0.6cm");//丈夫姓名
    pos[count++] =  new Array("23.3cm","6.6cm","1cm","0.6cm");//丈夫年龄
    pos[count++] =  new Array("23.3cm","10cm","4cm","0.6cm");//丈夫联系电话
    pos[count++] =  new Array("24.2cm","2.9cm","1cm","0.6cm");//丈夫文化程度 无字段 ,不填
    pos[count++] =  new Array("24.2cm","5.4cm","1cm","0.6cm");//丈夫文化程度 无字段 ,不填
    pos[count++] =  new Array("24.2cm","7.6cm","1cm","0.6cm");//丈夫文化程度 无字段 ,不填
    pos[count++] =  new Array("24.2cm","10.3cm","1cm","0.6cm");//丈夫文化程度 无字段 ,不填
    pos[count++] =  new Array("24.2cm","11.8cm","1cm","0.6cm");//丈夫文化程度 无字段 ,不填
    pos[count++] =  new Array("25cm","2.2cm","3cm","0.6cm");//丈夫职业 无字段 ,不填
    pos[count++] =  new Array("25cm","6.8cm","3cm","0.6cm");//丈夫职业 无字段 ,不填
    pos[count++] =  new Array("25cm","10.7cm","5cm","0.6cm");//丈夫工作单位 无字段 ,不填
    var flagNum = 0;
    var value = new Array();
    count = 0;
    flagNum = count;
    value[count++] =  ""; //国籍
    value[count++] =  ""; //其他
    value[count++] =  ""; //其他名字
    if(data.maternal.nationality === "中国"){
        value[flagNum] = "√";
    }else{
        value[flagNum+1] = "√";
        value[flagNum+2] = data.maternal.nationalityOther;
    }
    value[count++] =  data.file.personalInfo.idnumber;//身份证,护照号
    value[count++] =  data.file.personalInfo.workUnit;//工作单位
    flagNum = count;
    value[count++] =  "";//户籍类别
    value[count++] =  "";//户籍类别
    if(data.file.personalInfo.farmStatus==="是"){
        value[flagNum] =  "√";//户籍类别
    }else{
        value[flagNum+1] =  "√";//户籍类别
    }
    flagNum = count;
    value[count++] =  "";//居住地区 : 无对应字段,默认选择4.其他地区
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";
    if(data.maternal.areaOfResidence === "坝区"){
        value[flagNum] =  "√";
    }else if(data.maternal.areaOfResidence === "半山区"){
        value[flagNum+1] =  "√";
    }else if(data.maternal.areaOfResidence === "山区"){
        value[flagNum+2] =  "√";
    }else if(data.maternal.areaOfResidence === "其它地区"){
        value[flagNum+3] =  "√";
    }
    value[count++] =  data.maternal.distance == null ?"":data.maternal.distance;//卫生机构公里数 : 无对应字段
    //民族
    flagNum = count;
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";//少数民族
    if(data.file.personalInfo.folk==="汉族"){
        value[flagNum] =  "√";
    }else{
        value[flagNum+1] =  "√";
        value[flagNum+2] =  data.file.personalInfo.folkOther;//少数民族
    }
    //文化程度
    flagNum = count;
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";
    if(data.file.personalInfo.education==="文盲及半文盲" || data.file.personalInfo.education==="不详"){
        value[flagNum] =  "√";
    }else if(data.file.personalInfo.education==="小学" || data.file.personalInfo.education==="初中"){
        value[flagNum+1] =  "√";
    }else if(data.file.personalInfo.education==="高中/技校/中专"){
        value[flagNum+2] =  "√";
    }else if(data.file.personalInfo.education==="大学专科及以上"){
        value[flagNum+3] =  "√";
    }
    //职业
    flagNum = count;
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";
    if(data.file.personalInfo.occupation==="国家机关、党群组织、企业、事业单位负责人" ){
        value[flagNum] =  "√";
    }else if(data.file.personalInfo.occupation==="专业技术人员" ){
        value[flagNum+1] =  "√";
    }else if(data.file.personalInfo.occupation==="办事人员和有关人员"){
        value[flagNum+2] =  "√";
    }else if(data.file.personalInfo.occupation==="商业、服务业人员"){
        value[flagNum+3] =  "√";
    }else if(data.file.personalInfo.occupation==="农、林、牧、渔、水利业生产人员"){
        value[flagNum+4] =  "√";
    }else if(data.file.personalInfo.occupation==="生产、运输设备操作人员及有关人员"){
        value[flagNum+5] =  "√";
    }else if(data.file.personalInfo.occupation==="军人"){
        value[flagNum+6] =  "√";
    }else if(data.file.personalInfo.occupation==="不便分类的其他从业人员"){
        value[flagNum+7] =  "√";
    }
    value[count++] =  data.maternal.recuperateProvence;//产后休养地-省
    value[count++] =  data.maternal.recuperateCity;//市
    value[count++] =  data.maternal.recuperateCounty;//区
    value[count++] =  data.maternal.recuperateTownship;//街
    value[count++] =  data.maternal.recuperateVillage;//村
    value[count++] =  data.maternal.recuperateGroup;//门牌号
    value[count++] =  data.maternal.husbandName;//丈夫姓名
    value[count++] =  parseInt(Ext.util.Format.date(new Date(),"Y"))-parseInt(Ext.util.Format.date(data.maternal.husbandBirthday,"Y") );//丈夫年龄
    value[count++] =  data.maternal.husbandTel;//丈夫联系电话
    var flagnum = count;//丈夫文化程度 无字段 ,不填
    value[count++] =  "";//丈夫文化程度 无字段 ,不填
    value[count++] =  "";//丈夫文化程度 无字段 ,不填
    value[count++] =  "";//丈夫文化程度 无字段 ,不填
    value[count++] =  "";//丈夫文化程度 无字段 ,不填
    value[count++] =  "";//丈夫文化程度 无字段 ,不填
    if(data.maternal.husbandEducation==="文盲及半文盲" ){
        value[flagnum] = "√";
    }else if(data.maternal.husbandEducation==="小学及初中"){
        value[flagnum+1] = "√";
    }else if(data.maternal.husbandEducation==="高中/技校/中专"){
        value[flagnum+2] = "√";
    }else if(data.maternal.husbandEducation==="大学"){
        value[flagnum+3] = "√";
    }else if(data.maternal.husbandEducation==="研究生及以上"){
        value[flagnum+4] = "√";
    }

    value[count++] =  data.maternal.husbandOccupation;//丈夫职业 无字段 ,不填
    value[count++] =  data.maternal.husbandOccupationOther;//丈夫其他职业 无字段 ,不填
    value[count++] =  data.maternal.husbandWorkUnit;//丈夫工作单位 无字段 ,不填
    for(var i = 0 ; i < count ; i++){
        retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
    }
    return retprintcfg;
}

function getPrintCfg03(data){
    var leftArray,topArray,widthArray,heightArray;
    var weight = parseFloat(data.firstVisit.weight);
    var height = parseFloat(data.firstVisit.height);
    var res = weight/(height*height/10000)
    //3.首次产前检查表-第1页(3-4.jpg)
    var retprintcfg = {
        title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:title_intWidth,intHeight:title_intHeight,strContent:"3、首次产前检查记录表第1页"},
        data:[  ]
    };
    var pos = new Array();
    var count = 0 ;
    pos[count++] =  new Array("16.8cm","3cm","1.5cm","0.6cm");//初检日期
    pos[count++] =  new Array("16.8cm","4.5cm","1cm","0.6cm");//初检日期
    pos[count++] =  new Array("16.8cm","5.6cm","1cm","0.6cm");//初检日期
    pos[count++] =  new Array("16.8cm","9.4cm","1cm","0.6cm");//初检孕周
    pos[count++] =  new Array("16.8cm","14.2cm","1cm","0.6cm");//基础血压
    pos[count++] =  new Array("16.8cm","15.2cm","1cm","0.6cm");
    pos[count++] =  new Array("17.4cm","3.7cm","1cm","0.6cm");//孕前情况-身高
    pos[count++] =  new Array("17.4cm","7.6cm","1cm","0.6cm");//孕前情况-体重
    pos[count++] =  new Array("17.4cm","11.1cm","1cm","0.6cm");//孕前情况-体质指数
    pos[count++] =  new Array("18.8cm","2.7cm","8cm","0.6cm");//现病史 无对应字段
    pos[count++] =  new Array("19.4cm","4.3cm","1cm","0.6cm");//月经史-初潮年龄 无对应字段
    pos[count++] =  new Array("19.4cm","6.4cm","1cm","0.6cm");//月经史-周期 无对应字段
    pos[count++] =  new Array("19.4cm","7.7cm","1cm","0.6cm");//月经史-周期 无对应字段
    pos[count++] =  new Array("19.9cm","4.2cm","1cm","0.6cm");//末次月经年月日
    pos[count++] =  new Array("19.9cm","5.6cm","1cm","0.6cm");//末次月经年月日
    pos[count++] =  new Array("19.9cm","6.7cm","1cm","0.6cm");//末次月经年月日

    pos[count++] =  new Array("19.9cm","10cm","1cm","0.6cm");//预产期年月日
    pos[count++] =  new Array("19.9cm","11.4cm","1cm","0.6cm");//预产期年月日
    pos[count++] =  new Array("19.9cm","12.5cm","1cm","0.6cm");//预产期年月日
    
    pos[count++] =  new Array("20.5cm","2.3cm","1cm","0.6cm");//孕次
    pos[count++] =  new Array("20.5cm","3.9cm","1cm","0.6cm");//产次
    pos[count++] =  new Array("20.5cm","8.2cm","1cm","0.6cm");//其中:阴道自然分娩次数
    pos[count++] =  new Array("20.5cm","11.6cm","1cm","0.6cm");//胎头吸引 无对应字段
    pos[count++] =  new Array("20.5cm","14.4cm","1cm","0.6cm");//产钳 无对应字段
    pos[count++] =  new Array("20.5cm","16.9cm","1cm","0.6cm");//臀位 无对应字段
    pos[count++] =  new Array("21.1cm","3.8cm","1cm","0.6cm");//剖宫产
    pos[count++] =  new Array("21.1cm","8cm","1cm","0.6cm");//末次分娩时间 无对应字段
    pos[count++] =  new Array("21.1cm","9.4cm","1cm","0.6cm");//末次分娩时间 无对应字段
    pos[count++] =  new Array("21.1cm","10.5cm","1cm","0.6cm");//末次分娩时间 无对应字段

    //既往史
    pos[count++] =  new Array("21.7cm","7.7cm","1cm","0.6cm");
    pos[count++] =  new Array("21.7cm","8.5cm","1cm","0.6cm");
    pos[count++] =  new Array("21.7cm","10.4cm","1cm","0.6cm");
    pos[count++] =  new Array("21.7cm","12.1cm","1cm","0.6cm");
    pos[count++] =  new Array("21.7cm","13.5cm","1cm","0.6cm");
    pos[count++] =  new Array("21.7cm","14.9cm","1cm","0.6cm");
    pos[count++] =  new Array("21.7cm","15.7cm","1cm","0.6cm");
    pos[count++] =  new Array("21.7cm","17.3cm","1cm","0.6cm");
    pos[count++] =  new Array("21.7cm","18.3cm","1cm","0.6cm");
    
    //家庭史
    pos[count++] =  new Array("22.4cm","7.5cm","1cm","0.6cm");
    pos[count++] =  new Array("22.4cm","8.4cm","1cm","0.6cm");
    pos[count++] =  new Array("22.4cm","10.7cm","1cm","0.6cm");
    pos[count++] =  new Array("22.4cm","12.6cm","1cm","0.6cm");
    pos[count++] =  new Array("22.4cm","13.9cm","1cm","0.6cm");
    
    //个人史
    pos[count++] =  new Array("23cm","7.5cm","1cm","0.6cm");
    pos[count++] =  new Array("23cm","8.4cm","1cm","0.6cm"); 
    pos[count++] =  new Array("23cm","9.5cm","1cm","0.6cm"); 
    pos[count++] =  new Array("23cm","10.1cm","1cm","0.6cm"); 
    pos[count++] =  new Array("23cm","12.3cm","1cm","0.6cm"); 
    pos[count++] =  new Array("23cm","15.1cm","1cm","0.6cm"); 
    pos[count++] =  new Array("23cm","16.8cm","1cm","0.6cm"); 
    pos[count++] =  new Array("23cm","18cm","1cm","0.6cm"); 
    
    //妇产科手术史 
    pos[count++] =  new Array("23.6cm","8.4cm","1cm","0.6cm");
    pos[count++] =  new Array("23.6cm","9.2cm","1cm","0.6cm");
    pos[count++] =  new Array("23.6cm","11cm","6cm","0.6cm");       
    //输血史
    pos[count++] =  new Array("24.3cm","7.5cm","1cm","0.6cm");
    pos[count++] =  new Array("24.3cm","8.4cm","1cm","0.6cm");
    pos[count++] =  new Array("24.3cm","10.7cm","1cm","0.6cm");
    pos[count++] =  new Array("24.3cm","12.2cm","1cm","0.6cm");
    pos[count++] =  new Array("24.3cm","13.3cm","1cm","0.6cm");
    
    //药物过敏史
    pos[count++] =  new Array("24.9cm","8.2cm","1cm","0.6cm");
    pos[count++] =  new Array("24.9cm","9cm","1cm","0.6cm");
    pos[count++] =  new Array("24.9cm","11.4cm","6cm","0.6cm");
    
    var value = new Array();
    count = 0;
    var flagnum = 0;
    value[count++] =  Ext.util.Format.date(data.firstVisit.visitDate,"Y");//初检日期
    value[count++] =  Ext.util.Format.date(data.firstVisit.visitDate,"m");//初检日期
    value[count++] =  Ext.util.Format.date(data.firstVisit.visitDate,"d");//初检日期
    value[count++] =  data.firstVisit.weeks;//初检孕周
    value[count++] =  data.firstVisit.diastolicPressure;//基础血压
    value[count++] =  data.firstVisit.systolicPressure;
    value[count++] =  data.firstVisit.height;//孕前情况-身高
    value[count++] =  data.firstVisit.weight;//孕前情况-体重
    value[count++] =  res.toFixed(2);//孕前情况-体质指数
    value[count++] =  data.firstVisit.presentIllnessHistory;//现病史 无对应字段
    value[count++] =  data.firstVisit.menarcheAge;//月经史-初潮年龄 无对应字段
    value[count++] =  data.firstVisit.cycleOne;//月经史-周期 无对应字段
    value[count++] =  data.firstVisit.cycleTwo;//月经史-周期 无对应字段
    value[count++] =  Ext.util.Format.date(data.firstVisit.lastMenses,"Y");//末次月经年月日
    value[count++] =  Ext.util.Format.date(data.firstVisit.lastMenses,"m");//末次月经年月日
    value[count++] =  Ext.util.Format.date(data.firstVisit.lastMenses,"d");//末次月经年月日

    value[count++] =  Ext.util.Format.date(data.firstVisit.edc,"Y");//预产期年月日
    value[count++] =  Ext.util.Format.date(data.firstVisit.edc,"m");//预产期年月日
    value[count++] =  Ext.util.Format.date(data.firstVisit.edc,"d");//预产期年月日
    
    value[count++] =  data.firstVisit.gravidity;//孕次
    value[count++] =  data.firstVisit.parity+data.firstVisit.parity1;//产次
    value[count++] =  data.firstVisit.parity;//其中:阴道自然分娩次数
    value[count++] =  data.firstVisit.vacuumExtraction;//胎头吸引 无对应字段
    value[count++] =  data.firstVisit.forceps;//产钳 无对应字段
    value[count++] =  data.firstVisit.breech;//臀位 无对应字段
    value[count++] =  data.firstVisit.parity1;//剖宫产
    value[count++] =  Ext.util.Format.date(data.firstVisit.endChildbirthDate,"Y");//末次分娩时间 无对应字段
    value[count++] =  Ext.util.Format.date(data.firstVisit.endChildbirthDate,"m");//末次分娩时间 无对应字段
    value[count++] =  Ext.util.Format.date(data.firstVisit.endChildbirthDate,"d");//末次分娩时间 无对应字段

    //既往史
    flagnum = count;
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";
    if(data.feme.femePastHistory==="无" ){
        value[flagnum] =  "√";
    }else{
        if(data.feme.femePastHistory.indexOf("心脏病")>=0 ){
            value[flagnum+1] =  "√";
        }
        if(data.feme.femePastHistory.indexOf("肾脏疾病")>=0 ){
            value[flagnum+2] =  "√";
        }
        if(data.feme.femePastHistory.indexOf("肝脏疾病")>=0 ){
            value[flagnum+3] =  "√";
        }
        if(data.feme.femePastHistory.indexOf("高血压")>=0 ){
            value[flagnum+4] =  "√";
        }
        if(data.feme.femePastHistory.indexOf("贫血")>=0 ){
            value[flagnum+5] =  "√";
        }
        if(data.feme.femePastHistory.indexOf("糖尿病")>=0 ){
            value[flagnum+6] =  "√";
        }
        if(data.feme.femePastHistory.indexOf("其他")>=0 ){
            value[flagnum+7] =  "√";
            value[flagnum+8] =  data.firstVisit.pastHistoryOther;
        }
    }
    //家庭史
    flagnum = count;
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";
    if(data.feme.femeFamilyHistory==="无" ){
        value[flagnum] =  "√";
    }else{
        if(data.feme.femeFamilyHistory.indexOf("遗传性疾病史")>=0 ){
            value[flagnum+1] =  "√";
        }
        if(data.feme.femeFamilyHistory.indexOf("精神疾病史")>=0 ){
            value[flagnum+2] =  "√";
        }
        if(data.feme.femeFamilyHistory.indexOf("其他")>=0 ){
            value[flagnum+3] =  "√";
            value[flagnum+4] =  data.firstVisit.familyHistoryOther;
        }
    }
    //个人史
    flagnum = count;
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  "";
    value[count++] =  ""; 
    value[count++] =  ""; 
    value[count++] =  "";
    if(data.feme.exam01==="无" ){
        value[flagnum] =  "√";
    }else{
        if(data.feme.exam01.indexOf("吸烟")>=0 ){
            value[flagnum+1] =  "√";
        }
        if(data.feme.exam01.indexOf("饮酒")>=0 ){
            value[flagnum+2] =  "√"; 
        }
        if(data.feme.exam01.indexOf("服用药物")>=0 ){
            value[flagnum+3] =  "√"; 
        }
        if(data.feme.exam01.indexOf("接触有毒有害物质")>=0 ){
            value[flagnum+4] =  "√";
        }
        if(data.feme.exam01.indexOf("接触放射线")>=0 ){
            value[flagnum+5] =  "√"; 
        }
        if(data.feme.exam01.indexOf("其他")>=0 ){
            value[flagnum+6] =  "√";
            value[flagnum+7] =  data.firstVisit.personalHistoryOther;
        }
    }
    //妇产科手术史 
    if(data.firstVisit.opshistory==="无" ){
        value[count++] =  "√";
        value[count++] =  "";
        value[count++] =  "";       
    }else{
        value[count++] =  "";
        value[count++] =  "√";
        value[count++] =  data.firstVisit.opshistoryOther;
    }   
    //输血史
    if(data.feme.exam03==="无" ){
        value[count++] =  "√";
        value[count++] =  "";
        value[count++] =  "";
        value[count++] =  "";
        value[count++] =  "";
    }else{
        value[count++] =  "";
        value[count++] =  "√";
        value[count++] =  data.feme.exam03.substr(0,4);
        value[count++] =  data.feme.exam03.substr(4,2);
        value[count++] =  data.feme.exam03.substr(6,2);
    }   
    //药物过敏史
    if(data.feme.exam02==="无" ){
        value[count++] =  "√";
        value[count++] =  "";
        value[count++] =  "";
    }else{
        value[count++] =  "";       
        value[count++] =  "√";      
        var allergies = data.feme.exam02;
        if(data.person.allergiesOther.length>0){
            allergies=data.person.allergiesOther;
        }
        value[count++] =  allergies;        
    }
    for(var i = 0 ; i < count ; i++){
        if(value[i] == null || value[i] == NaN || (value[i].toLowerCase && (value[i].toLowerCase() ==="null" || value[i].toLowerCase() ==="nan")) ){
            value[i] = "";
        }
        retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
    }
    return retprintcfg;
}

function getPrintCfg04(data){
    //4.首次产前检查表-第2页 (5-6.jpg)
    var retprintcfg = {
        title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:title_intWidth,intHeight:title_intHeight,strContent:"4、首次产前检查记录表第2页"},
        data:[  ]
    };
    var count =0;
    var pos = new Array();
    pos[count++] =  new Array("2.28cm","3.28cm","0.5cm","0.61cm");
    pos[count++] =  new Array("2.28cm","5.66cm","0.5cm","0.61cm");
    pos[count++] =  new Array("2.28cm","7.57cm","0.5cm","0.61cm");
    pos[count++] =  new Array("2.28cm","9.26cm","0.5cm","0.61cm");
    pos[count++] =  new Array("2.28cm","10.87cm","0.5cm","0.61cm");
    pos[count++] =  new Array("2.28cm","12.46cm","0.5cm","0.61cm");
    pos[count++] =  new Array("2.28cm","13.97cm","0.5cm","0.61cm");
    pos[count++] =  new Array("2.83cm","4.58cm","1.19cm","0.61cm");
    pos[count++] =  new Array("2.83cm","8.18cm","0.5cm","0.61cm");
    pos[count++] =  new Array("2.83cm","9.18cm","0.5cm","0.61cm");
    pos[count++] =  new Array("2.83cm","10.48cm","0.5cm","0.61cm");
    pos[count++] =  new Array("2.83cm","12.38cm","1.01cm","0.61cm");
    pos[count++] =  new Array("2.83cm","13.57cm","1.01cm","0.61cm");
    pos[count++] =  new Array("2.83cm","14.68cm","1.01cm","0.61cm");
    pos[count++] =  new Array("3.33cm","4.58cm","1.01cm","0.61cm");
    pos[count++] =  new Array("3.81cm","4.58cm","1.01cm","0.61cm");
    pos[count++] =  new Array("4.31cm","5.42cm","0.5cm","0.61cm");
    pos[count++] =  new Array("4.31cm","6.11cm","0.5cm","0.61cm");
    pos[count++] =  new Array("4.37cm","8.57cm","1.01cm","0.61cm");
    pos[count++] =  new Array("4.37cm","10.08cm","1.01cm","0.61cm");
    pos[count++] =  new Array("4.37cm","11.17cm","1.01cm","0.61cm");
    pos[count++] =  new Array("4.37cm","13.78cm","5cm","0.61cm");
    pos[count++] =  new Array("4.82cm","5.42cm","0.5cm","0.61cm");
    pos[count++] =  new Array("4.82cm","6.11cm","0.5cm","0.61cm");
    pos[count++] =  new Array("4.87cm","8.18cm","2.99cm","0.61cm");
    pos[count++] =  new Array("5.37cm","4.58cm","1.51cm","0.61cm");
    pos[count++] =  new Array("5.87cm","6.09cm","1.01cm","0.61cm");
    pos[count++] =  new Array("5.87cm","6.98cm","1.01cm","0.61cm");
    pos[count++] =  new Array("6.38cm","8.47cm","5cm","0.61cm");
    pos[count++] =  new Array("7.22cm","3.47cm","1.01cm","0.61cm");
    pos[count++] =  new Array("7.22cm","6.38cm","1.01cm","0.61cm");
    pos[count++] =  new Array("7.22cm","7.22cm","1.01cm","0.61cm");
    pos[count++] =  new Array("7.73cm","5.87cm","1.01cm","0.61cm");
    pos[count++] =  new Array("7.73cm","7.46cm","0.5cm","0.61cm");
    pos[count++] =  new Array("7.7cm","9.31cm","0.5cm","0.61cm");
    pos[count++] =  new Array("7.73cm","10.87cm","5cm","0.61cm");
    pos[count++] =  new Array("8.15cm","5.87cm","1.01cm","0.61cm");
    pos[count++] =  new Array("8.15cm","7.46cm","0.5cm","0.61cm");
    pos[count++] =  new Array("8.15cm","9.31cm","0.5cm","0.61cm");
    pos[count++] =  new Array("8.2cm","10.87cm","5cm","0.61cm");
    pos[count++] =  new Array("8.63cm","5.08cm","0.5cm","0.61cm");
    pos[count++] =  new Array("8.63cm","6.77cm","0.5cm","0.61cm");
    pos[count++] =  new Array("8.63cm","8.07cm","5cm","0.61cm");
    pos[count++] =  new Array("9.13cm","5.08cm","0.5cm","0.61cm");
    pos[count++] =  new Array("9.13cm","6.77cm","0.5cm","0.61cm");
    pos[count++] =  new Array("9.13cm","8.07cm","5cm","0.61cm");
    pos[count++] =  new Array("9.58cm","5.08cm","0.5cm","0.61cm");
    pos[count++] =  new Array("9.63cm","7.17cm","0.5cm","0.61cm");
    pos[count++] =  new Array("9.63cm","8.47cm","5cm","0.61cm");
    pos[count++] =  new Array("10.03cm","5.77cm","0.5cm","0.61cm");
    pos[count++] =  new Array("10.03cm","7.78cm","0.5cm","0.61cm");
    pos[count++] =  new Array("10.03cm","9.18cm","5cm","0.61cm");
    pos[count++] =  new Array("10.53cm","5.08cm","0.5cm","0.61cm");
    pos[count++] =  new Array("10.53cm","7.06cm","0.5cm","0.61cm");
    pos[count++] =  new Array("10.53cm","8.36cm","2.99cm","0.61cm");
    pos[count++] =  new Array("10.53cm","11.88cm","0.5cm","0.61cm");
    pos[count++] =  new Array("10.53cm","13.86cm","0.5cm","0.61cm");
    pos[count++] =  new Array("10.53cm","15.08cm","2.99cm","0.61cm");
    pos[count++] =  new Array("11.06cm","5.08cm","0.5cm","0.61cm");
    pos[count++] =  new Array("11.06cm","7.06cm","0.5cm","0.61cm");
    pos[count++] =  new Array("11.01cm","8.36cm","2.99cm","0.61cm");
    pos[count++] =  new Array("11.09cm","11.88cm","0.5cm","0.61cm");
    pos[count++] =  new Array("11.09cm","13.86cm","0.5cm","0.61cm");
    pos[count++] =  new Array("11.01cm","16.17cm","2.99cm","0.61cm");
    pos[count++] =  new Array("11.48cm","5.08cm","0.5cm","0.61cm");
    pos[count++] =  new Array("11.48cm","7.06cm","0.5cm","0.61cm");
    pos[count++] =  new Array("11.48cm","8.36cm","2.99cm","0.61cm");
    pos[count++] =  new Array("16.32cm","5.08cm","2.01cm","0.61cm");
    pos[count++] =  new Array("16.32cm","6.67cm","1.01cm","0.61cm");
    pos[count++] =  new Array("16.32cm","7.78cm","1.01cm","0.61cm");
    pos[count++] =  new Array("16.32cm","13.36cm","2.01cm","0.61cm");
    pos[count++] =  new Array("16.32cm","15.08cm","1.01cm","0.61cm");
    pos[count++] =  new Array("16.32cm","16.17cm","1.01cm","0.61cm");
    pos[count++] =  new Array("16.83cm","4.76cm","2.01cm","0.61cm");
    pos[count++] =  new Array("16.83cm","6.38cm","1.01cm","0.61cm");
    pos[count++] =  new Array("16.83cm","7.38cm","1.01cm","0.61cm");
    pos[count++] =  new Array("18.49cm","1.56cm","0.5cm","0.61cm");
    pos[count++] =  new Array("18.49cm","3.78cm","0.5cm","0.61cm");
    pos[count++] =  new Array("18.44cm","5.19cm","2.99cm","0.61cm");
    pos[count++] =  new Array("18.44cm","10.08cm","5cm","0.61cm");
    pos[count++] =  new Array("20.08cm","1.56cm","0.5cm","0.61cm");
    pos[count++] =  new Array("20.08cm","2.67cm","0.5cm","0.61cm");
    pos[count++] =  new Array("20.03cm","5.19cm","2.99cm","0.61cm");
    pos[count++] =  new Array("20.03cm","10.48cm","2.01cm","0.61cm");
    pos[count++] =  new Array("21.78cm","1.56cm","0.5cm","0.61cm");
    pos[count++] =  new Array("21.78cm","3.18cm","0.5cm","0.61cm");
    pos[count++] =  new Array("21.78cm","4.47cm","0.5cm","0.61cm");
    pos[count++] =  new Array("21.78cm","5.77cm","0.5cm","0.61cm");
    pos[count++] =  new Array("21.78cm","12.06cm","0.5cm","0.61cm");
    pos[count++] =  new Array("21.78cm","15.37cm","0.5cm","0.61cm");
    pos[count++] =  new Array("21.72cm","16.77cm","2.01cm","0.61cm");
    pos[count++] =  new Array("23.39cm","6.85cm","0.5cm","0.61cm");
    pos[count++] =  new Array("23.39cm","7.94cm","0.5cm","0.61cm");
    pos[count++] =  new Array("23.34cm","9.68cm","7.01cm","0.61cm");
    pos[count++] =  new Array("23.76cm","10.19cm","6.01cm","0.61cm");
    pos[count++] =  new Array("24.37cm","9.08cm","2.01cm","0.61cm");
    pos[count++] =  new Array("24.37cm","10.66cm","1.01cm","0.61cm");
    pos[count++] =  new Array("24.37cm","11.67cm","1.01cm","0.61cm");
    pos[count++] =  new Array("24.9cm","8.47cm","5cm","0.61cm");
    pos[count++] =  new Array("24.9cm","15.98cm","2.99cm","0.61cm");

    
    var value = new Array();
    count = 0 ;
    //避孕史 字段未填
    if(data.person.contraceptiveHistory && data.person.contraceptiveHistory.indexOf ){
        if(data.person.contraceptiveHistory.indexOf("外用避孕药") ){
            value[count++] =  "√";
        }else{
            value[count++] = "";
        }
        if(data.person.contraceptiveHistory.indexOf("体外射精") ){
            value[count++] =  "√";
        }else{
            value[count++] = "";
        }
        if(data.person.contraceptiveHistory.indexOf("安全期") ){
            value[count++] =  "√";
        }else{
            value[count++] = "";
        }
        if(data.person.contraceptiveHistory.indexOf("安全套") ){
            value[count++] =  "√";
        }else{
            value[count++] = "";
        }
        if(data.person.contraceptiveHistory.indexOf("避孕药") ){
            value[count++] =  "√";
        }else{
            value[count++] = "";
        }
        if(data.person.contraceptiveHistory.indexOf("其他") ){
            value[count++] =  "√";
            value[count++] = data.person.contraceptiveHistoryOther;
        }else{
            value[count++] = "";
            value[count++] = "";
        }
    }else{
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
    }
    //孕产史-流产 
    value[count++] = data.firstVisit.pregnant1;
    value[count++] = "";//未次流产类型-人流
    value[count++] = "";//未次流产类型-药流
    value[count++] = "";//未次流产类型-自然流产
    //末次流产时间 
    value[count++] = Ext.util.Format.date(data.firstVisit.endAbortionDate,"Y");
    value[count++] = Ext.util.Format.date(data.firstVisit.endAbortionDate,"m");
    value[count++] = Ext.util.Format.date(data.firstVisit.endAbortionDate,"d");
    //死胎,死产
    value[count++] = data.firstVisit.pregnant2;
    value[count++] = data.firstVisit.pregnant3;
    //新生儿死亡
    if(data.firstVisit.pregnant4===0 ){ 
        value[count++] = "√";
        value[count++] = "";
        //死亡时间,死亡原因
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        //死亡时间,死亡原因
        value[count++] = Ext.util.Format.date(data.firstVisit.newbornDeathDate,"Y");
        value[count++] = Ext.util.Format.date(data.firstVisit.newbornDeathDate,"m");
        value[count++] = Ext.util.Format.date(data.firstVisit.newbornDeathDate,"d");
        value[count++] = data.firstVisit.newbornDeathReason;
    }
    
    //出生缺陷儿 
    if(data.firstVisit.birthDefects==="无" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.firstVisit.birthDefectsName;
    }
    value[count++] = data.firstVisit.prematureBirth;//早产 无此字段
    value[count++] = data.firstVisit.survivalMale;//存活子女情况 无此字段
    value[count++] = data.firstVisit.survivalFemale;//存活子女情况 无此字段
    value[count++] = data.firstVisit.complicationHistory;//既往妊娠合并症及并发症 无此字段
    value[count++] = data.firstVisit.weight;//体重 
    value[count++] = data.firstVisit.diastolicPressure;//血压
    value[count++] = data.firstVisit.systolicPressure;//血压
    //体格检查心率
    value[count++] = data.firstVisit.heartRate;//呼吸次数
    if(data.firstVisit.exam01==="未见异常" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.firstVisit.exam01other;
    }
    //呼吸
    value[count++] = data.firstVisit.breathingRate;
    if(data.firstVisit.exam02==="未见异常" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.firstVisit.exam02other;
    }
    //肝脏 无此字段
    if(data.firstVisit.liver==="未见异常" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.firstVisit.liverOther;
    }
    //脾脏 无此字段 
    if(data.firstVisit.spleen==="未见异常" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.firstVisit.spleenOther;
    }
    //乳房 无此字段 
    if(data.firstVisit.breast==="未见异常" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.firstVisit.breastOther;
    }
    //其他检查 无此字段
    if(data.firstVisit.otherExam==="未见异常" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.firstVisit.otherExamOther;
    }
    //妇科检查-外阴
    if(data.firstVisit.exam03==="未见异常" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.firstVisit.exam03other;
    }
    //阴道
    if(data.firstVisit.exam04==="未见异常" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.firstVisit.exam04other;
    }
    //宫颈
    if(data.firstVisit.exam05==="未见异常" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.firstVisit.exam05other;
    }
    //子宫
    if(data.firstVisit.exam06==="未见异常" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.firstVisit.exam06other;
    }
    //附件
    if(data.firstVisit.exam07==="未见异常" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.firstVisit.exam07other;
    }
    //HIV抗体首次检测时间 exam28是检查结果,没检查时间
    value[count++] = Ext.util.Format.date(data.firstVisit.hivdetectDate,"Y");
    value[count++] = Ext.util.Format.date(data.firstVisit.hivdetectDate,"m");
    value[count++] = Ext.util.Format.date(data.firstVisit.hivdetectDate,"d");
    //梅毒血清学检测时间 exam27是检查结果,没检查时间
    value[count++] = Ext.util.Format.date(data.firstVisit.syphilisDetectDate,"Y");
    value[count++] = Ext.util.Format.date(data.firstVisit.syphilisDetectDate,"m");
    value[count++] = Ext.util.Format.date(data.firstVisit.syphilisDetectDate,"d");
    //乙肝病源学检测时间 hepatitis01-hepatitis05是检查结果,没检查时间
    value[count++] = Ext.util.Format.date(data.firstVisit.hepatitisBdetectDate,"Y");
    value[count++] = Ext.util.Format.date(data.firstVisit.hepatitisBdetectDate,"m");
    value[count++] = Ext.util.Format.date(data.firstVisit.hepatitisBdetectDate,"d");
    //总体评估 无诊断结果字段
    if(data.firstVisit.evaluation==="未见异常" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.firstVisit.beforeBornDirectOther;
    }
    value[count++] = data.firstVisit.diagnosisRemark;//诊断结果
    //高危因素判断 无高危评分字段
    if(data.firstVisit.highRisk==="否" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        var risk = data.firstVisit.highRiskRemark;
        risk = "0"+risk.substring(0,risk.indexOf("、"));
        risk = ("0"+data.firstVisit.highRiskRemark).substring(risk.length-2);
        value[count++] = "";
        value[count++] = "√";
        value[count++] = risk;
    }
    value[count++] = "";//高危评分 无字段
    //保健指导 
    if(data.feme.exam04.indexOf("个人卫生")>=0 ){
        value[count++] = "√";
    }else{
        value[count++] = "";
    }
    if(data.feme.exam04.indexOf("心理")>=0 ){
        value[count++] = "√";
    }else{
        value[count++] = "";
    }
    if(data.feme.exam04.indexOf("营养")>=0 ){
        value[count++] = "√";
    }else{
        value[count++] = "";
    }
    if(data.feme.exam04.indexOf("避免致畸因素和疾病对胚胎的不良影响")>=0 ){
        value[count++] = "√";
    }else{
        value[count++] = "";
    }
    if(data.feme.exam04.indexOf("产前筛查宣传告知")>=0 ){
        value[count++] = "√";
    }else{
        value[count++] = "";
    }
    if(data.feme.exam04.indexOf("其他")>=0 ){
        value[count++] = "√";
        value[count++] = data.firstVisit.beforeBornCheckDirectOther;
    }else{
        value[count++] = "";
        value[count++] = "";
    }
    //转诊
    if(data.firstVisit.transfer==="无" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.firstVisit.transReason;
        value[count++] = data.firstVisit.transUnit;//建议转入机构及科室
    }
    value[count++] = Ext.util.Format.date(data.firstVisit.nextVisitDate,"Y");//下次随访时间
    value[count++] = Ext.util.Format.date(data.firstVisit.nextVisitDate,"m");//下次随访时间
    value[count++] = Ext.util.Format.date(data.firstVisit.nextVisitDate,"d");//下次随访时间
    value[count++] = data.org.name;//检查单位 无此字段
    value[count++] = data.firstVisit.visitDoctor;//主治医师
    for(var i = 0 ; i < count ; i++){
        if(value[i] == null || value[i] == NaN || (value[i].toLowerCase && (value[i].toLowerCase() ==="null" || value[i].toLowerCase() ==="nan")) ){
            value[i] = "";
        }
        retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
    }
    return retprintcfg;
}

function getPrintCfg06(data,page,row){
    //6.产前检查记录表 第一页 和第二页的表格打印
    var starttop1 = 3.8;//第一页的起始行位置
    var starttop2 = 16.6;//第二页的起始行位置
    var rowheight = 0.9;//行间隔高度
    var starttop = 0; 
    var count = 0 ;
    if(page == "1"){
        starttop = starttop1+row*rowheight;
    }else{
        starttop = starttop2+row*rowheight;
    }
    var retprintcfg = {
        title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:title_intWidth,intHeight:title_intHeight,strContent:"6、产前检查记录表"},
        data:[  ]
    };
    var pos = new Array();
    pos[count++] =  new Array(""+starttop+"cm","1.53cm","1.03cm","0.9cm");
    pos[count++] =  new Array(""+starttop+"cm","2.67cm","0.69cm","0.9cm");
    pos[count++] =  new Array(""+starttop+"cm","3.31cm","0.79cm","0.9cm");
    pos[count++] =  new Array(""+starttop+"cm","4.1cm","0.79cm","0.9cm");
    pos[count++] =  new Array(""+starttop+"cm","5cm","0.79cm","0.9cm");
    pos[count++] =  new Array(""+starttop+"cm","5.69cm","0.71cm","0.9cm");
    pos[count++] =  new Array(""+starttop+"cm","6.51cm","0.79cm","0.9cm");
    pos[count++] =  new Array(""+starttop+"cm","7.3cm","0.79cm","0.9cm");
    pos[count++] =  new Array(""+starttop+"cm","7.99cm","0.71cm","0.9cm");
    pos[count++] =  new Array(""+starttop+"cm","8.81cm","0.79cm","0.9cm");
    pos[count++] =  new Array(""+starttop+"cm","9.55cm","0.79cm","0.9cm");
    pos[count++] =  new Array(""+starttop+"cm","10.29cm","0.69cm","0.9cm");
    pos[count++] =  new Array(""+starttop+"cm","11.11cm","0.79cm","0.9cm");
    pos[count++] =  new Array(""+starttop+"cm","11.91cm","1.9cm","0.9cm");
    pos[count++] =  new Array(""+starttop+"cm","13.81cm","1.53cm","0.9cm");
    pos[count++] =  new Array(""+starttop+"cm","15.64cm","1.01cm","0.9cm");
    pos[count++] =  new Array(""+starttop+"cm","16.8cm","1.4cm","0.9cm");
    pos[count++] =  new Array(""+starttop+"cm","18.2cm","1.01cm","0.9cm");

    
    var value = new Array();
    count = 0 ;
    value[count++] = Ext.util.Format.date(data.visit.visitDate,"Y-m-d");//日期
    value[count++] = data.visit.weeks;//孕周
    value[count++] = data.visit.diastolicPressure+"/"+data.visit.systolicPressure;//血压
    value[count++] = data.visit.cc;//主诉
    value[count++] = data.visit.weight;//体重
    value[count++] = data.visit.exam01;//宫高
    value[count++] = data.visit.exam02;//腹围
    value[count++] = data.visit.exam07;//胎位
    value[count++] = data.visit.exam03;//胎心(次/分)
    value[count++] = data.visit.edema;//浮肿
    value[count++] = data.visit.exam04;//血红蛋白
    value[count++] = data.visit.exam05;//尿蛋白
    value[count++] = data.visit.exam06;//其他辅助检查
    
    value[count++] = data.visit.diagnosisRemark;//诊断
    value[count++] = data.beforeBornDirect+" "+data.visit.beforeBornDirectOther ;//指导   
    value[count++] = Ext.util.Format.date(data.visit.nextVisitDate,"Y-m-d");//预约产检日期
    value[count++] = data.org.name;//检查单位
    value[count++] = data.visit.visitDoctor;//检查医生
    
    for(var i = 0 ; i < count ; i++){
        if(value[i] == null || value[i] == NaN || (value[i].toLowerCase && (value[i].toLowerCase() ==="null" || value[i].toLowerCase() ==="nan")) ){
            value[i] = "";
        }
        retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
    }
    return retprintcfg;
}

function getPrintCfg05(data,row){
    //5.孕期特殊情况记录表的表格打印
    var rowheight = 1.1;//行间隔高度
    var starttop = 2+row*rowheight; 
    var count = 0 ;
    var retprintcfg = {
        title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:title_intWidth,intHeight:title_intHeight,strContent:"6、产前检查记录表"},
        data:[  ]
    };
    var pos = new Array();
    pos[count++] =  new Array(""+starttop+"cm","1.7cm","1.5cm","1.1cm");
    pos[count++] =  new Array(""+starttop+"cm","3.2cm","7.4cm","1.1cm");
    pos[count++] =  new Array(""+starttop+"cm","10.6cm","6.9cm","1.1cm");
    pos[count++] =  new Array(""+starttop+"cm","17.4cm","1.6cm","1.1cm");
    var value = new Array();
    count = 0 ;
    value[count++] = "";//日期
    value[count++] = "";//特殊情况记录
    value[count++] = "";//处理意见
    value[count++] = "";//医生签名
    for(var i = 0 ; i < count ; i++){
        if(value[i] == null || value[i] == NaN || (value[i].toLowerCase && (value[i].toLowerCase() ==="null" || value[i].toLowerCase() ==="nan")) ){
            value[i] = "";
        }
        retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
    }
    return retprintcfg;
}

function getPrintCfg07(data){
    //7.产前检查记录表 第二页的转诊信息打印
    var retprintcfg = {
        title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:title_intWidth,intHeight:title_intHeight,strContent:"6、产前检查记录表-转诊信息"},
        data:[  ]
    };
    var count =0;
    var pos = new Array();
    pos[count++] =  new Array("22.33cm","7.65cm","0.5cm","0.61cm");
    pos[count++] =  new Array("22.33cm","8.55cm","0.5cm","0.61cm");
    pos[count++] =  new Array("22.33cm","10.27cm","2.99cm","0.61cm");
    pos[count++] =  new Array("22.33cm","15.45cm","2.01cm","0.61cm");
    pos[count++] =  new Array("22.33cm","16.96cm","1.01cm","0.61cm");
    pos[count++] =  new Array("22.33cm","17.86cm","1.01cm","0.61cm");
    pos[count++] =  new Array("22.86cm","9.66cm","7.01cm","0.61cm");
    pos[count++] =  new Array("23.44cm","8.26cm","0.5cm","0.61cm");
    pos[count++] =  new Array("23.44cm","10.05cm","0.5cm","0.61cm");
    pos[count++] =  new Array("23.44cm","11.14cm","0.5cm","0.61cm");
    pos[count++] =  new Array("23.44cm","12.46cm","0.5cm","0.61cm");
    pos[count++] =  new Array("23.44cm","13.76cm","0.5cm","0.61cm");
    pos[count++] =  new Array("23.44cm","15.56cm","0.5cm","0.61cm");
    pos[count++] =  new Array("23.44cm","17.46cm","0.5cm","0.61cm");
    pos[count++] =  new Array("24.05cm","6.64cm","0.5cm","0.61cm");
    pos[count++] =  new Array("24.55cm","8.94cm","0.5cm","0.61cm");
    pos[count++] =  new Array("24.55cm","11.06cm","0.5cm","0.61cm");
    pos[count++] =  new Array("24.55cm","14.05cm","0.5cm","0.61cm");
    pos[count++] =  new Array("24.55cm","16.14cm","0.5cm","0.61cm");
    pos[count++] =  new Array("25.06cm","11.46cm","2.01cm","0.61cm");
    pos[count++] =  new Array("25.06cm","14.26cm","2.01cm","0.61cm");
    pos[count++] =  new Array("25.06cm","17.14cm","2.01cm","0.61cm");
    pos[count++] =  new Array("25.66cm","8.04cm","2.01cm","0.61cm");
    count = 0 ;
    var value=new Array();
    //转诊
    if(data.visit.transfer==="无" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.visit.transReason;//转诊原因
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = data.visit.transUnit;//建议转入机构及科室
    }
    //保健指导 
    if(data.beforeBornDirect.indexOf("个人卫生")>=0 ){
        value[count++] = "√";
    }else{
        value[count++] = "";
    }
    if(data.beforeBornDirect.indexOf("膳食")>=0 ){
        value[count++] = "√";
    }else{
        value[count++] = "";
    }
    if(data.beforeBornDirect.indexOf("心理")>=0 ){
        value[count++] = "√";
    }else{
        value[count++] = "";
    }
    if(data.beforeBornDirect.indexOf("运动")>=0 ){
        value[count++] = "√";
    }else{
        value[count++] = "";
    }
    if(data.beforeBornDirect.indexOf("自我监护")>=0 ){
        value[count++] = "√"; 
    }else{
        value[count++] = "";
    }
    if(data.beforeBornDirect.indexOf("分娩准备")>=0 ){
        value[count++] = "√";
    }else{
        value[count++] = "";
    }
    if(data.beforeBornDirect.indexOf("母乳喂养")>=0 ){
        value[count++] = "√";
    }else{
        value[count++] = "";
    }
    if(data.beforeBornDirect.indexOf("其他")>=0 ){
        value[count++] = "√";
    }else{
        value[count++] = "";
    }
    // 计划分娩地点 无此字段
    value[count++] = "";
    value[count++] = "";
    value[count++] = "";
    value[count++] = "";
    //骨盆外测量(28周后) 无此字段
    value[count++] = data.beforeBornDirect.pelvis01;
    value[count++] = data.beforeBornDirect.pelvis02;
    value[count++] = data.beforeBornDirect.pelvis03;
    value[count++] = data.beforeBornDirect.pelvis04;
    for(var i = 0 ; i < count ; i++){
        if(value[i] == null || value[i] == NaN || (value[i].toLowerCase && (value[i].toLowerCase() ==="null" || value[i].toLowerCase() ==="nan")) ){
            value[i] = "";
        }
        retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
    }
    return retprintcfg;
}

function getPrintCfg08(data){
    //8.分娩记录 第1页(13-14.jpg)
    var retprintcfg = {
        title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:title_intWidth,intHeight:title_intHeight,strContent:"7、分娩记录打印"},
        data:[  ]
    };
    var count = 0 ;
    var pos = new Array();
    pos[count++] =  new Array("4.1cm","2.94cm","2.01cm","0.61cm");
    pos[count++] =  new Array("4.1cm","4.26cm","1.01cm","0.61cm");
    pos[count++] =  new Array("4.1cm","5.24cm","1.01cm","0.61cm");
    pos[count++] =  new Array("4.1cm","6.24cm","1.01cm","0.61cm");
    pos[count++] =  new Array("4.1cm","7.25cm","1.01cm","0.61cm");
    pos[count++] =  new Array("4.1cm","10.16cm","1.01cm","0.61cm");
    pos[count++] =  new Array("4.82cm","2.65cm","1.01cm","0.61cm");
    pos[count++] =  new Array("4.82cm","6.46cm","1.01cm","0.61cm");
    pos[count++] =  new Array("4.82cm","9.23cm","1.01cm","0.61cm");
    pos[count++] =  new Array("4.82cm","10.74cm","1.01cm","0.61cm");
    pos[count++] =  new Array("4.82cm","14.34cm","1.01cm","0.61cm");
    pos[count++] =  new Array("5.72cm","3.15cm","0.5cm","0.61cm");
    pos[count++] =  new Array("5.72cm","5.64cm","0.5cm","0.61cm");
    pos[count++] =  new Array("5.72cm","8.84cm","0.5cm","0.61cm");
    pos[count++] =  new Array("5.72cm","10.05cm","0.5cm","0.61cm");
    pos[count++] =  new Array("5.72cm","10.95cm","0.5cm","0.61cm");
    pos[count++] =  new Array("5.72cm","11.85cm","0.5cm","0.61cm");
    pos[count++] =  new Array("5.72cm","14.34cm","1.01cm","0.61cm");
    pos[count++] =  new Array("5.72cm","15.74cm","0.5cm","0.61cm");
    pos[count++] =  new Array("5.72cm","17.94cm","1.01cm","0.61cm");
    pos[count++] =  new Array("6.51cm","3.55cm","1.01cm","0.61cm");
    pos[count++] =  new Array("6.51cm","4.84cm","1.01cm","0.61cm");
    pos[count++] =  new Array("6.51cm","5.85cm","1.01cm","0.61cm");
    pos[count++] =  new Array("6.51cm","6.75cm","1.01cm","0.61cm");
    pos[count++] =  new Array("6.51cm","7.75cm","1.01cm","0.61cm");
    pos[count++] =  new Array("6.51cm","10.95cm","0.5cm","0.61cm");
    pos[count++] =  new Array("6.51cm","12.14cm","0.5cm","0.61cm");
    pos[count++] =  new Array("7.3cm","3.15cm","0.5cm","0.61cm");
    pos[count++] =  new Array("7.3cm","4.44cm","0.5cm","0.61cm");
    pos[count++] =  new Array("7.3cm","6.46cm","0.5cm","0.61cm");
    pos[count++] =  new Array("7.3cm","7.94cm","0.5cm","0.61cm");
    pos[count++] =  new Array("8.1cm","3.15cm","0.5cm","0.61cm");
    pos[count++] =  new Array("8.1cm","4.44cm","0.5cm","0.61cm");
    pos[count++] =  new Array("8.1cm","5.64cm","0.5cm","0.61cm");
    pos[count++] =  new Array("8.1cm","7.43cm","0.5cm","0.61cm");
    pos[count++] =  new Array("8.1cm","7.86cm","0.5cm","0.61cm");
    pos[count++] =  new Array("8.1cm","8.44cm","0.5cm","0.61cm");
    pos[count++] =  new Array("8.1cm","9.55cm","0.5cm","0.61cm");
    pos[count++] =  new Array("8.1cm","11.14cm","0.5cm","0.61cm");
    pos[count++] =  new Array("8.1cm","12.04cm","0.5cm","0.61cm");
    pos[count++] =  new Array("8.1cm","13.55cm","1.01cm","0.61cm");
    pos[count++] =  new Array("8.1cm","15.56cm","1.01cm","0.61cm");
    pos[count++] =  new Array("9cm","3.15cm","0.5cm","0.61cm");
    pos[count++] =  new Array("9cm","4.34cm","0.5cm","0.61cm");
    pos[count++] =  new Array("9cm","6.24cm","1.01cm","0.61cm");
    pos[count++] =  new Array("9cm","7.86cm","1.01cm","0.61cm");
    pos[count++] =  new Array("9.71cm","3.25cm","1.01cm","0.61cm");
    pos[count++] =  new Array("9.71cm","7.86cm","1.01cm","0.61cm");
    pos[count++] =  new Array("9.71cm","12.44cm","1.01cm","0.61cm");
    pos[count++] =  new Array("10.5cm","3.94cm","1.51cm","0.61cm");
    pos[count++] =  new Array("10.5cm","5.24cm","1.01cm","0.61cm");
    pos[count++] =  new Array("11.3cm","4.15cm","0.5cm","0.61cm");
    pos[count++] =  new Array("11.3cm","5.34cm","0.5cm","0.61cm");
    pos[count++] =  new Array("11.3cm","8.26cm","5cm","0.61cm");
    pos[count++] =  new Array("16.4cm","3.36cm","1.01cm","0.61cm");
    pos[count++] =  new Array("16.4cm","5.74cm","1.01cm","0.61cm");
    pos[count++] =  new Array("16.4cm","8.55cm","0.5cm","0.61cm");
    pos[count++] =  new Array("16.4cm","9.66cm","0.5cm","0.61cm");
    pos[count++] =  new Array("16.4cm","10.95cm","0.5cm","0.61cm");
    pos[count++] =  new Array("17.12cm","4.66cm","1.01cm","0.61cm");
    pos[count++] =  new Array("17.12cm","6.64cm","1.01cm","0.61cm");
    pos[count++] =  new Array("17.7cm","2.75cm","0.5cm","0.61cm");
    pos[count++] =  new Array("17.7cm","3.76cm","0.5cm","0.61cm");
    pos[count++] =  new Array("17.7cm","5.16cm","0.5cm","0.61cm");
    pos[count++] =  new Array("17.7cm","5.95cm","0.5cm","0.61cm");
    pos[count++] =  new Array("17.7cm","6.54cm","0.5cm","0.61cm");
    pos[count++] =  new Array("17.7cm","7.14cm","0.5cm","0.61cm");
    pos[count++] =  new Array("17.7cm","7.94cm","1.01cm","0.61cm");
    pos[count++] =  new Array("17.7cm","9.95cm","0.5cm","0.61cm");
    pos[count++] =  new Array("17.7cm","10.95cm","0.5cm","0.61cm");
    pos[count++] =  new Array("17.7cm","13.55cm","5cm","0.61cm");
    pos[count++] =  new Array("18.42cm","3.44cm","0.5cm","0.61cm");
    pos[count++] =  new Array("18.42cm","4.34cm","0.5cm","0.61cm");
    pos[count++] =  new Array("18.42cm","6.24cm","4cm","0.61cm");
    pos[count++] =  new Array("19.1cm","7.54cm","0.5cm","0.61cm");
    pos[count++] =  new Array("19.1cm","10.45cm","1.01cm","0.61cm");
    pos[count++] =  new Array("19.1cm","11.85cm","1.01cm","0.61cm");
    pos[count++] =  new Array("19.1cm","12.86cm","1.01cm","0.61cm");
    pos[count++] =  new Array("19.1cm","13.65cm","1.01cm","0.61cm");
    pos[count++] =  new Array("19.1cm","14.74cm","1.01cm","0.61cm");
    pos[count++] =  new Array("19.71cm","7.54cm","0.5cm","0.61cm");
    pos[count++] =  new Array("19.71cm","9.95cm","7.01cm","0.61cm");
    pos[count++] =  new Array("20.29cm","6.06cm","0.5cm","0.61cm");
    pos[count++] =  new Array("20.29cm","8.94cm","1.01cm","0.61cm");
    pos[count++] =  new Array("20.29cm","10.35cm","1.01cm","0.61cm");
    pos[count++] =  new Array("20.29cm","11.24cm","1.01cm","0.61cm");
    pos[count++] =  new Array("20.29cm","12.14cm","1.01cm","0.61cm");
    pos[count++] =  new Array("20.29cm","13.15cm","1.01cm","0.61cm");
    pos[count++] =  new Array("20.9cm","6.06cm","0.5cm","0.61cm");
    pos[count++] =  new Array("20.9cm","8.44cm","7.01cm","0.61cm");
    pos[count++] =  new Array("21.51cm","4.44cm","0.5cm","0.61cm");
    pos[count++] =  new Array("21.51cm","8.55cm","0.5cm","0.61cm");
    pos[count++] =  new Array("21.51cm","10.85cm","0.5cm","0.61cm");
    pos[count++] =  new Array("21.51cm","12.86cm","0.5cm","0.61cm");
    pos[count++] =  new Array("21.51cm","14.23cm","2.01cm","0.61cm");
    pos[count++] =  new Array("22.91cm","7.43cm","4cm","0.61cm");
    pos[count++] =  new Array("22.91cm","13.84cm","4cm","0.61cm");
    pos[count++] =  new Array("23.5cm","7.43cm","4cm","0.61cm");
    pos[count++] =  new Array("23.5cm","13.84cm","4cm","0.61cm");
    pos[count++] =  new Array("24.21cm","7.43cm","4cm","0.61cm");
    pos[count++] =  new Array("24.21cm","13.84cm","4cm","0.61cm");
    pos[count++] =  new Array("24.82cm","8.84cm","4cm","0.61cm");
    pos[count++] =  new Array("24.82cm","14.3cm","4cm","0.61cm");
    console.log("pos===="+count)
    var value = new Array();
    count = 0;
    //分娩时间
    value[count++] = Ext.util.Format.date(data.birthRecord.childbirthMonth,"Y");
    value[count++] = Ext.util.Format.date(data.birthRecord.childbirthMonth,"m");
    value[count++] = Ext.util.Format.date(data.birthRecord.childbirthMonth,"d");
    //小时和分钟未记录
    value[count++] = "";
    value[count++] = "";
    value[count++] = data.birthRecord.borthWeekly;//分娩孕周    
    //总产程 无此字段
    var total =  data.birthRecord.totalLaborHours;
    if(!total){
        total = 0;
    }
    if(data.birthRecord.totalLaborMinutes){
        var minutes = data.birthRecord.totalLaborMinutes/60 .toFixed(2);
        total = total +minutes;
    }
    value[count++] = total;
    var onlabor = data.birthRecord.oneLaborHours;
    if(!onlabor){
        onlabor = 0;
    }
    if(data.birthRecord.oneLaborMinutes){
        var minutes = data.birthRecord.oneLaborMinutes/60 .toFixed(2);
        onlabor = onlabor +minutes;
    }
    value[count++] = onlabor;
    value[count++] = data.birthRecord.twoLaborHours;
    value[count++] = data.birthRecord.twoLaborMinutes;
    value[count++] = data.birthRecord.threeLaborMinutes;
    //分娩方式
    if(data.birthRecord.childbirthWay == "顺产"){
        //1.自然分娩
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
    }else if(data.birthRecord.childbirthWay == "臀产" || data.birthRecord.childbirthWay == "胎吸" ||  data.birthRecord.childbirthWay == "产钳"){
        //2.手术助产
        value[count++] = "";
        value[count++] = "√";
        if( data.birthRecord.childbirthWay == "胎吸" ){
            value[count++] = "√";
            value[count++] = "";
            value[count++] = "";
        }else if( data.birthRecord.childbirthWay == "产钳"){
            value[count++] = "";
            value[count++] = "√";
            value[count++] = "";
        }else{
            value[count++] = "";
            value[count++] = "";
            value[count++] = "√";
        }
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
    }else if(data.birthRecord.childbirthWay == "剖宫产"){
        //3.剖宫产
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
    }else if(data.birthRecord.childbirthWay == "难产"){
        //其他
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.birthRecord.childbirthWay;
    }
    //胎盘娩出时间 无此字段
    value[count++] = Ext.util.Format.date(data.birthRecord.placentaParturitionDate,"Y");
    value[count++] = Ext.util.Format.date(data.birthRecord.placentaParturitionDate,"m");
    value[count++] = Ext.util.Format.date(data.birthRecord.placentaParturitionDate,"d");
    value[count++] = Ext.util.Format.date(data.birthRecord.placentaParturitionDate,"H");
    value[count++] = Ext.util.Format.date(data.birthRecord.placentaParturitionDate,"i");
    if(data.birthRecord.placentaParturitionWay ==="自然"){ //娩出方式
        value[count++] = "√";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
    }
    //是否完整 无此字段
    if(data.birthRecord.isComplete ==="完整"){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }
    //会阴情况 无此字段
    if(data.birthRecord.lacerationOfPerineum =="无"){
        //1.完整
        value[count++] = "√";
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
    }else if(data.birthRecord.lacerationOfPerineum =="Ⅰ" || data.birthRecord.lacerationOfPerineum =="Ⅱ" ||  data.birthRecord.lacerationOfPerineum =="Ⅲ"){
        //3.撕裂伤
        value[count++] = "";
        value[count++] = "";
        value[count++] = "√";
        if(data.birthRecord.lacerationOfPerineum =="Ⅰ" ){
            value[count++] = "√";
            value[count++] = "";
            value[count++] = "";
        }else if(data.birthRecord.lacerationOfPerineum =="Ⅱ"){
            value[count++] = "";
            value[count++] = "√";
            value[count++] = "";
        }else{
            value[count++] = "";
            value[count++] = "";
            value[count++] = "√";
        }
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
    }else{
        //4.切开
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
    }
    //宫颈裂伤 无此字段
    if(data.birthRecord.cervicalLaceration=="无"){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.birthRecord.cervicalLacerationPosition01;
        value[count++] = data.birthRecord.cervicalLacerationPosition02;
    }
    //分娩出血量
    value[count++] = data.birthRecord.flooding;
    //产后2小时出血量 无此字段
    value[count++] = data.birthRecord.bleeding01;
    //产后24小时出血量 无此字段
    value[count++] = data.birthRecord.bleeding02;
    //产后2小时血压 无此字段
    value[count++] = data.birthRecord.bloodPressure;
    value[count++] = "";
    //产后并发症 无此字段
    if(data.birthRecord.comorbidity ==="无"){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else if(data.birthRecord.comorbidity =="其它"){
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.birthRecord.comorbidityOther;
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.birthRecord.comorbidity;
    }   
    value[count++] = data.cert.weight;//新生儿-出生体重
    value[count++] = data.cert.height;//身长
    //性别
    if(data.cert.sex=="男"){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else if(data.cert.sex=="女"){
        value[count++] = "";
        value[count++] = "√";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "";
        value[count++] = "√";
    }
    //apgar评分 无此字段
    value[count++] = data.birthRecord.apgar01;
    value[count++] = data.birthRecord.apgar02;
    //窒息 无此字段
    if(data.birthRecord.suffocation=="无"){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        if(data.birthRecord.suffocationOther=="无"){
            value[count++] = "";
            value[count++] = "";
            value[count++] = "";
        }else if(data.birthRecord.suffocationOther=="I"){
            value[count++] = "√";
            value[count++] = "√";
            value[count++] = "";
        }else{
            value[count++] = "√";
            value[count++] = "";
            value[count++] = "√";
        }
        value[count++] = "";
        value[count++] = data.birthRecord.suffocationOther01;
    }
    //产伤 无此字段
    if(data.birthRecord.birthTrauma=="无"){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.birthRecord.birthTraumaOther;
    }
    //出生缺陷 无此字段
    if(data.birthRecord.birthDefects=="无"){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.birthRecord.birthDefectsOther;
    }
    //新生儿免疫接种 无此字段
    value[count++] = "";//第1针乙肝疫苗
    value[count++] = "";
    value[count++] = "";
    value[count++] = "";
    value[count++] = "";
    value[count++] = "";
    value[count++] = "";
    value[count++] = "";
    value[count++] = "";//卡介苗
    value[count++] = "";
    value[count++] = "";
    value[count++] = "";
    value[count++] = "";
    value[count++] = "";
    value[count++] = "";
    value[count++] = "";
    //新生儿疾病筛查 无此字段 diseaseScreening
    if(data.birthRecord.diseaseScreening && data.birthRecord.diseaseScreening.indexOf){
        if(data.birthRecord.diseaseScreening.indexOf("先天性甲状腺功能减低症")>0){
            value[count++] = "√";
            value[count++] = "";
            value[count++] = "";
            value[count++] = "";
            value[count++] = "";
        }else if(data.birthRecord.diseaseScreening.indexOf("苯丙酮尿症")>0){
            value[count++] = "";
            value[count++] = "√";
            value[count++] = "";
            value[count++] = "";
            value[count++] = "";
        }else if(data.birthRecord.diseaseScreening.indexOf("听力障碍")>0){
            value[count++] = "";
            value[count++] = "";
            value[count++] = "√";
            value[count++] = "";
            value[count++] = "";
        }else if(data.birthRecord.diseaseScreening.indexOf("其他")>0){
            value[count++] = "";
            value[count++] = "";
            value[count++] = "";
            value[count++] = "√";
            value[count++] = data.birthRecord.diseaseScreeningOther;
        }else{
            value[count++] = "";
            value[count++] = "";
            value[count++] = "";
            value[count++] = "";
            value[count++] = "";
        }
    }else{
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
    }
    //产妇出院诊断 无此字段
    value[count++] = data.birthRecord.dischargeDiagnosis01;
    value[count++] = "";
    value[count++] = "";
    //新生儿出院诊断 无此字段
    value[count++] = data.birthRecord.dischargeDiagnosis02;
    value[count++] = "";
    value[count++] = "";
    //接产单位 
    value[count++] = data.cert.borthOrganization;
    //接生者
    value[count++] = data.cert.widwife;
    console.log("value===="+count)
    for(var i = 0 ; i < count ; i++){
        if(value[i] == null || value[i] == NaN || (value[i].toLowerCase && (value[i].toLowerCase() ==="null" || value[i].toLowerCase() ==="nan")) ){
            value[i] = "";
        }
        retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
    }
    return retprintcfg;
}

function getPrintCfg10(data,rownum){
    //10.产后访视记录表(15-16.jpg)
    var rowheight = 1.7;//行间隔高度
    var starttop = 3.1+rownum*rowheight; 
    var startleft = 3;
    var retprintcfg = {
        title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:title_intWidth,intHeight:title_intHeight,strContent:"6、产前检查记录表"},
        data:[  ]
    };
    var count = 0 ;
    var pos = new Array();
    pos[count++] =  new Array(""+starttop+"cm","1.4cm","1.19cm","1.69cm");
    pos[count++] =  new Array(""+starttop+"cm","2.59cm","0.61cm","1.69cm");
    pos[count++] =  new Array(""+starttop+"cm","3.31cm","0.61cm","1.69cm");
    pos[count++] =  new Array(""+starttop+"cm","3.94cm","0.5cm","1.69cm");
    pos[count++] =  new Array(""+starttop+"cm","4.34cm","0.82cm","1.69cm");
    pos[count++] =  new Array(""+starttop+"cm","5.11cm","0.5cm","1.69cm");
    pos[count++] =  new Array(""+starttop+"cm","5.58cm","0.5cm","1.69cm");
    pos[count++] =  new Array(""+starttop+"cm","6.09cm","0.5cm","1.69cm");
    pos[count++] =  new Array(""+starttop+"cm","6.69cm","0.5cm","1.69cm");
    pos[count++] =  new Array(""+starttop+"cm","7.2cm","0.5cm","1.69cm");
    pos[count++] =  new Array(""+starttop+"cm","7.7cm","0.61cm","1.69cm");
    pos[count++] =  new Array(""+starttop+"cm","8.2cm","0.69cm","1.69cm");
    pos[count++] =  new Array(""+starttop+"cm","9cm","0.5cm","1.69cm");
    pos[count++] =  new Array(""+starttop+"cm","9.5cm","0.5cm","1.69cm");
    pos[count++] =  new Array(""+starttop+"cm","10cm","0.69cm","1.69cm");
    pos[count++] =  new Array(""+starttop+"cm","10.8cm","0.5cm","1.69cm");
    pos[count++] =  new Array(""+starttop+"cm","11.3cm","0.5cm","1.69cm");
    pos[count++] =  new Array(""+starttop+"cm","11.8cm","1.11cm","1.69cm");
    pos[count++] =  new Array(""+starttop+"cm","12.89cm","1.01cm","1.69cm");
    pos[count++] =  new Array(""+starttop+"cm","13.89cm","1.4cm","1.69cm");
    pos[count++] =  new Array(""+starttop+"cm","15.4cm","1.4cm","1.69cm");
    pos[count++] =  new Array(""+starttop+"cm","16.8cm","1.01cm","1.69cm");
    pos[count++] =  new Array(""+starttop+"cm","17.89cm","1.11cm","1.69cm");



    var value = new Array();
    count = 0;
    value[count++] = Ext.util.Format.date(data.visit.visitDate,"Y-m-d");//访视日期
    value[count++] = data.visit.item;//产后天数
    value[count++] = data.visit.bodyHeat;//体温
    value[count++] = data.visit.pulseRate;//脉搏次/分 无此字段
    value[count++] = data.visit.diastolicPressure+"/"+data.visit.systolicPressure;//血压
    if(data.visit.milk == "多"){//乳汁多  无此字段
        value[count++] = "√";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
    }
    if(data.visit.swelling === "无"){//红肿有  无此字段
        value[count++] = "√";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
    }
    if(data.visit.nipple === "无"){//乳头皲裂有  无此字段
        value[count++] = "√";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
    }   
    value[count++] = data.visit.palaceHeight;   //宫底高度  无此字段
    if(data.visit.woundHealing === "好"){//伤口愈合好  无此字段
        value[count++] = "√";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
    }
    value[count++] = data.visit.lochia; //恶露-色,量  无此字段
    value[count++] = "";    //恶露-异味-有  无此字段
    value[count++] = "";    //恶露-异味-无  无此字段
    value[count++] = data.visit.health; //健康情况
    value[count++] = data.visit.mind;//心理状况
    value[count++] = data.visit.other;//其他
    value[count++] = data.afterBornDirect+" "+data.visit.afterBornDirectOther;//指导 afterBornDirect,afterBornDirectOther
    value[count++] = Ext.util.Format.date(data.visit.nextVisitDate,"Y-m-d");//预约时间
    value[count++] = data.visit.visitDoctor;//检查医生
    for(var i = 0 ; i < count ; i++){
        if(value[i] == null || value[i] == NaN || (value[i].toLowerCase && (value[i].toLowerCase() ==="null" || value[i].toLowerCase() ==="nan")) ){
            value[i] = "";
        }
        retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
    }
    return retprintcfg;
}

function getPrintCfg09(data){
    //10.产后访视记录表-指导和转诊内容(15-16.jpg)
    var retprintcfg = {
        title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:title_intWidth,intHeight:title_intHeight,strContent:"6、产前检查记录表"},
        data:[  ]
    };
    var count = 0 ;
    var pos = new Array();
    pos[count++] =  new Array("10cm","4.5cm","0.5cm","0.6cm");
    pos[count++] =  new Array("10cm","6.1cm","0.5cm","0.6cm");
    pos[count++] =  new Array("10cm","7.3cm","0.5cm","0.6cm");
    pos[count++] =  new Array("10cm","8.5cm","0.5cm","0.6cm");
    pos[count++] =  new Array("10cm","10.4cm","0.5cm","0.6cm");
    pos[count++] =  new Array("10cm","13.5cm","0.5cm","0.6cm");
    pos[count++] =  new Array("10cm","14.7cm","3cm","0.6cm");
    pos[count++] =  new Array("10.6cm","3.8cm","0.5cm","0.6cm");
    pos[count++] =  new Array("10.6cm","4.7cm","0.5cm","0.6cm");
    pos[count++] =  new Array("10.6cm","6.6cm","6cm","0.6cm");
    pos[count++] =  new Array("10.6cm","14.3cm","1cm","0.6cm");
    pos[count++] =  new Array("10.6cm","16cm","1cm","0.6cm");
    pos[count++] =  new Array("10.6cm","17.1cm","1cm","0.6cm");
    pos[count++] =  new Array("11.1cm","7cm","4cm","0.6cm");
    var value = new Array();
    count = 0;
    //指导内容 afterBornDirect
    if(data.afterBornDirect.indexOf("个人卫生")>=0 ){
        value[count++] = "√";
    }else{
        value[count++] = "";
    }
    if(data.afterBornDirect.indexOf("心理")>=0 ){
        value[count++] = "√";
    }else{
        value[count++] = "";
    }
    if(data.afterBornDirect.indexOf("营养")>=0 ){
        value[count++] = "√";
    }else{
        value[count++] = "";
    }
    if(data.afterBornDirect.indexOf("母乳喂养")>=0 ){
        value[count++] = "√";
    }else{
        value[count++] = "";
    }
    if(data.afterBornDirect.indexOf("新生儿护理与喂养")>=0 ){
        value[count++] = "√";
    }else{
        value[count++] = "";
    }
    if(data.afterBornDirect.indexOf("其他")>=0 ){
        value[count++] = "√";
        value[count++] = data.visit.afterBornDirectOther;
    }else{
        value[count++] = "";
        value[count++] = "";
    }
    //转诊
    alert(data.afterBornDirect.transfer)
    if(data.afterBornDirect.transfer==="无" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.afterBornDirect.transReason;
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = data.afterBornDirect.transUnit;//建议转入机构及科室
    }
    for(var i = 0 ; i < count ; i++){
        if(value[i] == null || value[i] == NaN || (value[i].toLowerCase && (value[i].toLowerCase() ==="null" || value[i].toLowerCase() ==="nan")) ){
            value[i] = "";
        }
        retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
    }
    return retprintcfg;
}

function getPrintCfg11(data){
    //11.8、产后42天检查记录表(15-16.jpg)
    var retprintcfg = {
        title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:title_intWidth,intHeight:title_intHeight,strContent:"8、产后42天检查记录表"},
        data:[  ]
    };
    var count = 0 ;
    var pos = new Array();
    pos[count++] =  new Array("17.09cm","2.99cm","1.01cm","0.61cm");
    pos[count++] =  new Array("17.09cm","4.42cm","1.01cm","0.61cm");
    pos[count++] =  new Array("17.09cm","5.27cm","1.01cm","0.61cm");
    pos[count++] =  new Array("17.09cm","7.73cm","1.01cm","0.61cm");
    pos[count++] =  new Array("17.09cm","10.21cm","1.01cm","0.61cm");
    pos[count++] =  new Array("17.09cm","12.78cm","1.01cm","0.61cm");
    pos[count++] =  new Array("17.09cm","13.68cm","1.01cm","0.61cm");
    pos[count++] =  new Array("17.78cm","3.81cm","0.5cm","0.61cm");
    pos[count++] =  new Array("17.78cm","5.03cm","0.5cm","0.61cm");
    pos[count++] =  new Array("17.78cm","6.32cm","10cm","0.61cm");
    pos[count++] =  new Array("18.47cm","3.81cm","0.5cm","0.61cm");
    pos[count++] =  new Array("18.47cm","5.03cm","0.5cm","0.61cm");
    pos[count++] =  new Array("18.47cm","6.32cm","10cm","0.61cm");
    pos[count++] =  new Array("19.18cm","2.33cm","0.5cm","0.61cm");
    pos[count++] =  new Array("19.18cm","4.23cm","0.5cm","0.61cm");
    pos[count++] =  new Array("19.18cm","5.61cm","4cm","0.61cm");
    pos[count++] =  new Array("19.18cm","10.48cm","0.5cm","0.61cm");
    pos[count++] =  new Array("19.18cm","12.36cm","0.5cm","0.61cm");
    pos[count++] =  new Array("19.18cm","13.92cm","4cm","0.61cm");
    pos[count++] =  new Array("19.79cm","2.33cm","0.5cm","0.61cm");
    pos[count++] =  new Array("19.79cm","4.23cm","0.5cm","0.61cm");
    pos[count++] =  new Array("19.79cm","5.61cm","4cm","0.61cm");
    pos[count++] =  new Array("19.79cm","10.48cm","0.5cm","0.61cm");
    pos[count++] =  new Array("19.79cm","12.36cm","0.5cm","0.61cm");
    pos[count++] =  new Array("19.79cm","13.92cm","4cm","0.61cm");
    pos[count++] =  new Array("20.48cm","2.33cm","0.5cm","0.61cm");
    pos[count++] =  new Array("20.48cm","4.23cm","0.5cm","0.61cm");
    pos[count++] =  new Array("20.48cm","5.61cm","4cm","0.61cm");
    pos[count++] =  new Array("20.48cm","10.48cm","0.5cm","0.61cm");
    pos[count++] =  new Array("20.48cm","12.36cm","0.5cm","0.61cm");
    pos[count++] =  new Array("20.48cm","13.92cm","4cm","0.61cm");
    pos[count++] =  new Array("21.17cm","3.33cm","0.5cm","0.61cm");
    pos[count++] =  new Array("21.17cm","5.21cm","0.5cm","0.61cm");
    pos[count++] =  new Array("21.17cm","6.51cm","2.99cm","0.61cm");
    pos[count++] =  new Array("21.17cm","10.61cm","7.99cm","0.61cm");
    pos[count++] =  new Array("21.88cm","2.35cm","0.5cm","0.61cm");
    pos[count++] =  new Array("21.88cm","3.86cm","0.5cm","0.61cm");
    pos[count++] =  new Array("21.88cm","5.72cm","7.99cm","0.61cm");
    pos[count++] =  new Array("22.57cm","2.96cm","0.5cm","0.61cm");
    pos[count++] =  new Array("22.57cm","4.5cm","0.5cm","0.61cm");
    pos[count++] =  new Array("22.57cm","5.79cm","0.5cm","0.61cm");
    pos[count++] =  new Array("22.57cm","8.6cm","0.5cm","0.61cm");
    pos[count++] =  new Array("22.57cm","10.13cm","5cm","0.61cm");
    pos[count++] =  new Array("23.28cm","2.35cm","0.5cm","0.61cm");
    pos[count++] =  new Array("23.28cm","3.57cm","0.5cm","0.61cm");
    pos[count++] =  new Array("23.28cm","5.93cm","4cm","0.61cm");
    pos[count++] =  new Array("23.28cm","11.51cm","1.01cm","0.61cm");
    pos[count++] =  new Array("23.28cm","12.91cm","1.01cm","0.61cm");
    pos[count++] =  new Array("23.28cm","13.92cm","1.01cm","0.61cm");
    pos[count++] =  new Array("23.89cm","4.63cm","7.01cm","0.61cm");
    pos[count++] =  new Array("24.58cm","3.12cm","6.01cm","0.61cm");
    pos[count++] =  new Array("24.58cm","10.32cm","2.01cm","0.61cm");


    var value = new Array();
    count = 0;
    //访视日期
    value[count++] = Ext.util.Format.date(data.visit.visitDate,"Y");
    value[count++] = Ext.util.Format.date(data.visit.visitDate,"m");
    value[count++] = Ext.util.Format.date(data.visit.visitDate,"d");
    //产后天数 无此字段
    value[count++] = data.visit.postnatalDays;
    //体重 无此字段
    value[count++] = data.visit.weight;
    //血压
    value[count++] = data.visit.diastolicPressure;
    value[count++] = data.visit.systolicPressure;
    //一般健康情况 
    value[count++] = "";
    value[count++] = "";
    value[count++] = data.visit.health;
    //一般心理状况
    value[count++] = "";
    value[count++] = "";
    value[count++] = data.visit.mind;
    //乳房
    if(data.visit.breast==="未见异常" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.visit.breastOther;
    }
    //恶露
    if(data.visit.lochia==="未见异常" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.visit.lochiaOther;
    }
    //子宫
    if(data.visit.metra==="未见异常" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.visit.metraOther;
    }
    //宫颈   无此字段cervix
    if(data.visit.cervix==="未见异常" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.visit.cervixOther;
    }
    //附件 无此字段
    if(data.visit.attachment==="未见异常" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.visit.attachmentOther;
    }
    //伤口 
    if(data.visit.wound==="未见异常" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.visit.woundOther;
    }
    //外阴 无此字段 vulva
    if(data.visit.vulva==="未见异常" ){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.visit.vulvaOther;
    }
    //其他
    value[count++] = data.visit.other;
    //分类
    if(data.visit.result ==="已恢复"){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.visit.resultOther;
    }
    //指导内容
    if(data.afterBornDirect.indexOf("性保健")>=0 ){
        value[count++] = "√";
    }else{
        value[count++] = "";
    }
    if(data.afterBornDirect.indexOf("避孕")>=0 ){
        value[count++] = "√";
    }else{
        value[count++] = "";
    }
    if(data.afterBornDirect.indexOf("婴儿喂养及营养")>=0 ){
        value[count++] = "√";
    }else{
        value[count++] = "";
    }
    if(data.afterBornDirect.indexOf("其他")>=0 ){
        value[count++] = "√";
        value[count++] = data.visit.afterBornDirectOther;
    }else{
        value[count++] = "";
        value[count++] = "";
    }
    //处理
    if(data.visit.transfer==="结案"){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
        //转诊日期 无此字段
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.visit.transReason;
        //转诊日期 无此字段
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
    }
    //建议转入机构及科室
    value[count++] = data.visit.transUnit;
    //检查单位
    value[count++] = data.org.name;
    //检查医生
    value[count++] = data.visit.visitDoctor;
    for(var i = 0 ; i < count ; i++){
        if(value[i] == null || value[i] == NaN || (value[i].toLowerCase && (value[i].toLowerCase() ==="null" || value[i].toLowerCase() ==="nan")) ){
            value[i] = "";
        }
        retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
    }
    return retprintcfg;
}


