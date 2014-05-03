//打印纸张设定
var title_initTop = "0cm";
var title_intLeft = "0cm";
var title_intWidth = "20.8cm";
var title_intHeight = "28cm";
function getChildPrintCfg01(data){
    //1.封面(封面 封底.jpg)
    var retprintcfg = {
        title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:title_intWidth,intHeight:title_intHeight,strContent:"1、封面"},
        data:[  ]
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
    //  18位编号
    value[count++] = data.children.fileNo.substr(0,1);
    value[count++] = data.children.fileNo.substr(1,1);
    value[count++] = data.children.fileNo.substr(2,1);
    value[count++] = data.children.fileNo.substr(3,1);
    value[count++] = data.children.fileNo.substr(4,1);
    value[count++] = data.children.fileNo.substr(5,1);
    value[count++] = data.children.fileNo.substr(6,1);
    value[count++] = data.children.fileNo.substr(7,1);
    value[count++] = data.children.fileNo.substr(8,1);
    value[count++] = data.children.fileNo.substr(9,1);
    value[count++] = data.children.fileNo.substr(10,1);
    value[count++] = data.children.fileNo.substr(11,1);
    value[count++] = data.children.fileNo.substr(12,1);
    value[count++] = data.children.fileNo.substr(13,1);
    value[count++] = data.children.fileNo.substr(14,1); 
    value[count++] = data.children.fileNo.substr(15,1);
    value[count++] = data.children.fileNo.substr(16,1);
    value[count++] = data.children.fileNo.substr(17,1);
    
    value[count++] = data.children.name;//   姓名
    value[count++] = data.children.sex;//   性别
    value[count++] = data.children.allergiesHistory;// 过敏史
    value[count++] = data.children.motherName;//  母亲姓名
    value[count++] = data.children.fatherName;//  父亲姓名
    value[count++] = Ext.util.Format.date(data.children.buildDate,"Y-m-d");//    建册-日期
    value[count++] = data.children.buildUnit;//  建册单位
    value[count++] = data.children.residenceProvence;//  户籍-省
    value[count++] = data.children.residenceCity;//  市
    value[count++] = data.children.residenceCounty;//  区
    value[count++] = data.children.residenceTownship;//  街
    value[count++] = data.children.residenceVillage;//  村
    value[count++] = data.children.residenceGroup;//   门牌号
    value[count++] = data.children.addressProvence;//  现住-省
    value[count++] = data.children.addressCity;//  市
    value[count++] = data.children.addressCounty;//  区
    value[count++] = data.children.addressTownship;//  街
    value[count++] = data.children.addressVillage;//  村
    value[count++] = data.children.addressGroup;//   门牌号
    value[count++] = data.children.tel;//   辖区妇保联系电话
    for(var i = 0 ; i < count ; i++){
        if(value[i] == null || value[i] == NaN || (value[i].toLowerCase && (value[i].toLowerCase() ==="null" || value[i].toLowerCase() ==="nan")) ){
            value[i] = "";
        }
        retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
    }
    return retprintcfg;
}

function getChildPrintCfg02(data){
    //alert(printdata(data));
    //2.儿童基本档案(1-2.jpg)
    var retprintcfg = {
        title:{intTop:title_initTop,intLeft:title_intLeft,intWidth:title_intWidth,intHeight:title_intHeight,strContent:"2、儿童基本档案"},
        data:[]
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
    var flagnum = 0;
    //  出生日期
    value[count++] = Ext.util.Format.date(data.children.birthday,"Y");
    value[count++] = Ext.util.Format.date(data.children.birthday,"m");
    value[count++] = Ext.util.Format.date(data.children.birthday,"d");
    value[count++] = Ext.util.Format.date(data.children.birthday,"H");
    value[count++] = Ext.util.Format.date(data.children.birthday,"i");
    if(data.children.weight != null ){
        value[count++] = data.children.weight;//    出生体重
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
    }
    if(data.children.height != null ){
        value[count++] = data.children.height;//    出生身长
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
    }
    
    if( data.children.apgarOneMinuts != null  ||  data.children.apgarFiveMinuts != null ){
        value[count++] = data.children.apgarOneMinuts;//Apgar评分
        value[count++] = data.children.apgarFiveMinuts;//Apgar评分
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "";
        value[count++] = "√";
    }
    if(data.children.abo != null ){
        value[count++] = data.children.abo;//ABO血型
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
    }
    if(data.children.rh != null  ){
        value[count++] = data.children.rh;//RH血型
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
    }
    value[count++] = data.children.weekly;//出生孕周
    //  孕次
    value[count++] = data.children.gravidity;
    //  产次
    value[count++] = data.children.parity;
    //  胎数
    flagnum = count;
    value[count++] = "";
    value[count++] = "";
    value[count++] = "";
    if(data.children.numberOfBirths == "单胎"){
        value[flagnum] = "√";
    }else if(data.children.numberOfBirths == "双胎"){
        value[flagnum+1] = "√";
    }else if(data.children.numberOfBirths == "多胎"){
        value[flagnum+2] = "√";
    }
    //  分娩方式
    if(data.children.bormWays == "顺产"){
        //1.自然分娩
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
    }else if(data.children.bormWays == "臀产" || data.children.bormWays == "胎吸" ||  data.children.bormWays == "产钳"){
        //2.手术助产
        value[count++] = "";
        value[count++] = "√";
        if(data.children.bormWays == "臀产")
            value[count++] = "√";
        else
            value[count++] = "";
        if(data.children.bormWays == "胎吸")
            value[count++] = "√";
        else
            value[count++] = "";
        if(data.children.bormWays == "产钳")
            value[count++] = "√";
        else
            value[count++] = "";
    }else if(data.children.bormWays == "剖宫产"){
        //3.剖宫产
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "";
        value[count++] = "√";
    }
    //  助产机构名称
    value[count++] = data.children.birthOrgName;
    //  父亲-生育年龄
    value[count++] = data.children.fatherAge;
    //  民族
    value[count++] = data.children.fatherNation;
    //  文化程度 无字段
    value[count++] = data.children.fatherEducational;
    //  职业 无字段
    value[count++] = data.children.fatherOccupation;
    //  母亲-生育年龄
    value[count++] = data.children.motherAge;
    //  民族
    value[count++] = data.children.motherNation;
    //  文化程度 无字段
    value[count++] = data.children.motherEducational;
    //  职业 无字段
    value[count++] = data.children.motherOccupation;
    //  母亲孕周异常情况 无字段 难取数
    flagnum = count;
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
    if(data.children.montherExceptions ==="无"){
        value[flagnum]="√";
    }else{
        value[flagnum+1]="√";
        if(data.children.montherException.indexOf("接受放射线及化学物质")>=0 ){
            value[flagnum+2]="√";
        }else if(data.children.montherException.indexOf("酒精中毒")>=0 ){
            value[flagnum+3]="√";
        }else if(data.children.montherException.indexOf("风疹")>=0 ){
            value[flagnum+4]="√";
        }else if(data.children.montherException.indexOf("糖尿病")>=0 ){
            value[flagnum+5]="√";
        }else if(data.children.montherException.indexOf("妊娠期高血压疾病")>=0 ){
            value[flagnum+6]="√";
        }else if(data.children.montherException.indexOf("中重度贫血")>=0 ){
            value[flagnum+7]="√";
        }else if(data.children.montherException.indexOf("其它")>=0 ){
            value[flagnum+8]="√";
            value[flagnum+9]=data.children.montherExceptionOhter;
        }
    }
    
    //  小儿围产期异常情况 无字段
    flagnum = count;
    value[count++] = "";
    value[count++] = "";
    value[count++] = "";
    value[count++] = "";
    value[count++] = "";
    value[count++] = "";
    value[count++] = "";
    value[count++] = "";
    value[count++] = "";
    if(data.children.childrenExceptions ==="无"){
        value[flagnum]="√";
    }else{
        value[flagnum+1]="√";
        if(data.children.childrenException.indexOf("窒息")>=0 ){
            value[flagnum+2]="√";
            if(data.children.childrenException1 ==="轻"){
                value[flagnum+3]="√";
            }else{
                value[flagnum+4]="√";
            }
        }else if(data.children.childrenException.indexOf("病理性黄疸")>=0 ){
            value[flagnum+5]="√";
        }else if(data.children.childrenException.indexOf("新生儿肺炎")>=0 ){
            value[flagnum+6]="√";
        }else if(data.children.childrenException.indexOf("其他")>=0 ){
            value[flagnum+7]="√";
            value[flagnum+8]=data.children.childrenExceptionOhter;
        }
    }
    //  出生缺陷
    if(data.children.birthDefect === "无"){
        value[count++] = "√";
        value[count++] = "";
        value[count++] = "";
    }else{
        value[count++] = "";
        value[count++] = "√";
        value[count++] = data.children.birthDefectOther;
    }
    //  新生儿疾病筛查情况 只有 1. 已测2. 估计3. 未测,没有正常异常其他 diseaseScreening
    flagnum = count;
    value[count++] = "";
    value[count++] = "";
    value[count++] = "";
    if(data.children.childIllScreening=="正常"){
        value[flagnum] = "√";
    }else if(data.children.childIllScreening=="异常"){
        value[flagnum+1] = "√";
        value[flagnum+2] = data.children.childIllScreeningOther;
    }
    //  家庭遗传性疾病 无字段
    flagnum = count;
    value[count++] = "";
    value[count++] = "";
    value[count++] = "";
    if(data.children.childHereditary=="无"){
        value[flagnum] = "√";
    }else if(data.children.childHereditary=="有"){
        value[flagnum+1] = "√";
        value[flagnum+2] = data.children.childHereditaryOther;
    }
    
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
        data:[  ]
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
    //  访视日期
    value[count++] = Ext.util.Format.date(data.child.visitDate,"Y-m-d");
    //  访视日龄
    value[count++] =  (data.child.visitDate.getTime()-data.child.birthday.getTime())/1000/60/60/24 + 1;
    //  听力筛查
    value[count++] = data.child.exam01;
    //  体重(公斤)
    value[count++] = data.child.exam02;
    //  身长(厘米)
    value[count++] = data.child.exam03;
    //  头围(厘米)
    value[count++] = "";
    //  喂养方式
    value[count++] = data.child.exam04;
    //  吃奶量(ml/次)
    value[count++] = data.child.exam30;
    //  吃奶次数(次/天)
    value[count++] = data.child.exam31;
    //  呕吐
    value[count++] = data.child.exam32;
    //  大便-性状
    value[count++] = data.child.exam33;
    //  大便-次数
    value[count++] = data.child.exam34;
    //  体温
    value[count++] = data.child.exam05;
    //  脉率
    value[count++] = data.child.exam07;
    //  呼吸频率
    value[count++] = data.child.exam06;
    //  面色
    value[count++] = data.child.faceColor;
    //  黄疸部位
    value[count++] = data.child.exam35;
    //  前囟
    value[count++] = (data.child.exam09 == null?0:data.child.exam09) +"cm×"+(data.child.exam10 == null?0:data.child.exam10 )+"cm";
    if(data.child.exam12==="未见异常"){
        value[count++] = data.child.exam12; //  眼外观
    }else{
        value[count++] = data.child.exam12+" "+data.child.exam12other;  //  眼外观
    }
    if(data.child.exam13==="未见异常"){
        value[count++] = data.child.exam13; //  耳外观
    }else{
        value[count++] = data.child.exam13+" "+data.child.exam13other;  //  耳外观
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
        data:[  ]
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
    pos[count++] =  new Array("10.8cm",baseleft+"cm","2.9cm","0.5cm");
    pos[count++] =  new Array("11.2cm",baseleft+"cm","2.9cm","0.4cm");
    var value = new Array();
    count=0
    if(data.child.exam14==="未见异常"){
        value[count++] = data.child.exam14; //鼻
    }else{
        value[count++] = data.child.exam14+" "+data.child.exam14other;  //鼻
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
    if(data.child.nextVisitDate)
        value[count++] = Ext.util.Format.date(data.child.nextVisitDate,"Y-m-d")//下次随访日期
    else
        value[count++] = "";
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
        data:[  ]
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
    value[count++] = data.child.checkItem;  //  月龄
    value[count++] = Ext.util.Format.date(data.child.visitDate,"Y-m-d")//随访日期
    value[count++] = data.child.weight; //  体重
    value[count++] = data.child.height; //  身长
    value[count++] = data.child.head;    //  头围
    value[count++] = data.child.evaluateChild;   //  体格发育评价-综合评估
    console.log(data)
    value[count++] = data.child.face;   //  面色
    if(data.child.exam01==="未见异常"){
        value[count++] = data.child.exam01; //  皮肤
    }else{
        value[count++] = data.child.exam01+" "+data.child.exam01other;  //  皮肤
    }
    if(data.child.exam02==="闭合"){
        value[count++] = data.child.exam02; //  前囟
    }else{
        value[count++] = data.child.exam02+""+data.child.exam03+"cm×"+data.child.exam04+"cm";   //  前囟
    }
    value[count++] = "";    //  颈部包块 无字段
    if(data.child.eyes==="未见异常"){
        value[count++] = data.child.eyes;   //  眼外观
    }else{
        value[count++] = data.child.eyes+" "+data.child.eyesOther;  //  眼外观
    }
    if(data.child.eyes==="未见异常"){
        value[count++] = data.child.ears;   //  耳外观
    }else{
        value[count++] = data.child.ears+" "+data.child.earsOther;  //  耳外观
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
        data:[  ]
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
    if(data.child1){
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
    }else{
        value[count++]="";
        value[count++]="";
    }
    if(data.child.exam15 ==="未见异常"){
        value[count++]=data.child.exam15;//口腔
    }else{
        value[count++]=data.child.exam15+" "+data.child.exam15Other;//口腔
    }
    if(data.child1){
        value[count++] = data.child1.mikTooth;//出牙数
    }else{
        value[count++]="";
    }
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
    value[count++] = data.child.pelvis;//先天性髋关节发育不良筛查结果
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
    value[count++] = data.child.nextVisitDate;//下次随访日期
    // if(data.child.nextVisitDate)
        // value[count++] = Ext.util.Format.date(data.child.nextVisitDate,"Y-m-d")//下次随访日期
    // else
        // value[count++] = ""
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
        data:[  ]
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
    
    value[count++] = data.child.checkItem;//    月龄
    value[count++] = Ext.util.Format.date(data.child.visitDate,"Y-m-d")//随访日期
    value[count++] = data.child.weight;//   体重
    value[count++] = data.child.height;//   身长
    value[count++] = "";//  头围
    value[count++] = data.child.evaluate;// 体格发育评价
    value[count++] = data.child.face;// 面色
    if(data.child.exam01==="未见异常"){
        value[count++] = data.child.exam01; //  皮肤
    }else{
        value[count++] = data.child.exam01+" "+data.child.exam01other;  //  皮肤
    }
    if(data.child.exam02==="闭合"){
        value[count++] = data.child.exam02; //  前囟
    }else{
        value[count++] = data.child.exam02+""+data.child.exam03+"cm×"+data.child.exam04+"cm";   //  前囟
    }
    value[count++] = "";    //  颈部包块 无字段
    if(data.child.eyes==="未见异常"){
        value[count++] = data.child.eyes;   //  眼外观
    }else{
        value[count++] = data.child.eyes+" "+data.child.eyesOther;  //  眼外观
    }
    if(data.child.eyes==="未见异常"){
        value[count++] = data.child.ears;   //  耳外观
    }else{
        value[count++] = data.child.ears+" "+data.child.earsOther;  //  耳外观
    }
    value[count++] = "";//听力-左
    value[count++] = "";//听力-右
    if(data.child1 ){
        if(data.child1.nose ==="未见异常"){
            value[count++]=data.child1.nose;//鼻部
        }else{
            value[count++]=data.child1.nose+" "+data.child1.noseother;//鼻部
        }
    }else{
        value[count++] ="";
    }
    if(data.child1 ){
        if( data.child1.throatFlat !="其它"){
            value[count++]=data.child1.throatFlat;//咽部,扁桃体
        }else{
            value[count++]=data.child1.throatFlat+" "+data.child1.throatFlatRemark;//咽部,扁桃体
        }
    }else{
        value[count++] ="";
    }
    if(data.child1 ){
        value[count++] = data.child1.mikTooth +" "+data.child1.decayedTooth;//出牙数/龋齿数
    }else{
        value[count++] = "";
    }
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
        data:[  ]
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
    value[count++] = data.child.nextVisitDate;//下次随访日期
    //value[count++] = Ext.util.Format.date(data.child.nextVisitDate,"Y-m-d")//下次随访日期
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
        data:[  ]
    };
    var pos = new Array();
    var count = 0 ;
    
    var value = new Array();
    count=0
    //  检查日期
    //  年龄
    //  过敏史
    //  既往病史
    //  儿童家长确认
    //  体重
    //  身长
    //  评价
    //  皮肤
    //  眼-左
    //  眼-右
    //  视力-左
    //  视力-右
    //  耳-左
    //  耳-右
    //  口腔-牙齿数
    //  口腔-龋齿数
    //  头颅
    //  胸廓
    //  脊柱四肢
    //  咽部
    //  心肺
    //  肝脾
    //  外生殖器
    //  其他
    //  血红蛋白
    //  丙氨酸氨基转移酶
    //  其他
    //  检查结果
    //  医生意见
    //  医生签名
    //  检查单位
    //  体检日期
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
        data:[  ]
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
    value[count++] = data.child.weight;//   体重
    value[count++] = data.child.height;//   身长
    value[count++] = data.child.body;// 体格发育评价
    value[count++] = data.child.sight;//    视力
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
    if(data.child.nextVisitDate)
        value[count++] = Ext.util.Format.date(data.child.nextVisitDate,"Y-m-d")//下次随访日期
    else
        value[count++] = ""
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
        data:[  ]
    };
    var pos = new Array();
    var count = 0 ;
    
    var value = new Array();
    count=0
    //  日期
    //  异常情况记录
    //  处理意见
    //  医生签名
    for(var i = 0 ; i < count ; i++){
        if(value[i] == null || value[i] == NaN || (value[i].toLowerCase && (value[i].toLowerCase() ==="null" || value[i].toLowerCase() ==="nan")) ){
            value[i] = "";
        }
        retprintcfg.data[i] = new Array(pos[i][0],pos[i][1],pos[i][2],pos[i][3],value[i]);
    }
    return retprintcfg;
}