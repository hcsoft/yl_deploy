Ext.ns("app");
function printBirthCertificate(){
	var jsonPrint = {
			fullNamfOfbaby : '姓名',//新生儿姓名
			male : '男',
			female : '女',
			sex : '性别',
			years : '年',
			months : '月',
			day : '日',			
			hour : '时',
			minute : '分',
			province :'省',
			city : '市',
			county : '县',
			township : '乡',
			birthPlace :'出生地',
			weeks :'孕周',//孕周
			well : '良好',
			normal : '一般',
			weak : '差',
			weight : '体重',//体重
			height :'身长',//身长
			motherName :'母亲姓名',//母亲姓名
			motherAge :'年龄',//母亲年龄
			motherNationality :'国籍',//母亲国籍
			motherNation : '民族',//母亲民族
			motherIdCard : '身份证号',//母亲身份证号
			fatherName :'父亲姓名',//父亲姓名
			fatherAge : '年龄',//父亲年龄
			fatherNationality : '国籍',//父亲国籍
			fatherNation : '民族',//父亲民族
			fatherIdCard : '身份证号',//父亲身份证号
			generalHospital : '医院',
			MCHhospital : '妇幼保健院 ',
			home : '家庭',
			otherRemark : '其它',
			other : '其它描述',
			nameOfFacility : '接生机构',//接生机构
			issueYear :'年签发',
			issueMonth : '月签发',
			issueDay : '日签发',
			familyAddress : '家庭住址',//家庭住址
			widwife : '接生人员'//接生人员
		};
	printObj.printProtect(jsonPrint,0);
}

app.printProtect = new Ext.Panel({
	layout : 'table',
	defaultType: 'button',
	html : '<div class="printProtectICO" onclick="printBirthCertificate();">出生证明打印维护<div>'
});

ModuleMgr.register(app.printProtect);