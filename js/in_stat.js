
var services = {
    get : StatService.get,
    save : StatService.save,
    propValidate : StatService.hasAllThese
};

    var cfg = [
 {id: 'districtNumber', xtype: 'input', setting: {disabled: true} }
,{id: 'org', xtype: 'input', setting: {size: 30, maxlen: 50 } }
,{id: 'reporter', xtype: 'input', setting: {size: 10, maxlen: 10 } }
,{id: 'checker', xtype: 'input', setting: {size: 10, maxlen: 10 } }
,{id: 'tel', xtype: 'input'}
,{id: 'email', xtype: 'input'}
,{
  id: 'reportMonth',
  xtype: 'input',
  setting: {
    size: 8,
    maxlen:6,
    roWhenSet : true,
    format : 'yearMonth'
  },
  required: [true, '报告月份']
}
,{
  id: 'reportDate',
  xtype: 'input',
  setting: {
    defaultVal: new Date(),
    format: 'date',
    size: 10,
    maxlen:8
  },
  required: [true, '填表日期']
 }
,{id:'basicResNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'basicFloatNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'basicBirthNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'basicBabyNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'basicPregnantNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'basicChildNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'basicOldNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'basicHypNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'basicDiabNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'basicFuriousNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'basicDoctorNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'basicNurseNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'basicPhsicianNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'basicBedNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'fileNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'eduPaperCategoryNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'eduPaperNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'eduAvNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'eduAvCategoryNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'eduBarNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'eduBarReplaceNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'eduActivityNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'eduActivityPeopleNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'eduTalkNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'eduTalkPeopleNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'childFileNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'childBabyVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'childBabyMoonNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'childVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'pregnantEarlyNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'pregnantEarlyVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'pregnantMidOneVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'pregnantMidTwoVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'pregnantLateOneVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'pregnantLateTwoVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'pregnantNatalVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'pregnantNatalExamNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'pregnantNatalNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'oldFileNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'oldExamNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'vaccBabyNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'vaccNeedleNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'vaccHepatitisNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'vaccAbnormalNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'vaccInformNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'vaccHepatitisResupplyNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'infectANum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'infectBNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'infectCNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'infectTimelyNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'infectTransNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'infectInvestNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'infectVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'hypFirstExamNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'hypDiscoverNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'hypFileNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'hypVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'hypExamNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'hypControlNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'diabPeopleNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'diabDiscoverNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'diabFileNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'diabVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'diabExamNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'diabControlNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'furiousFileNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'furiousVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'furiousExamNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'furiousGoodNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearBasicResNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearBasicFloatNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearBasicBirthNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearBasicBabyNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearBasicPregnantNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearBasicChildNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearBasicOldNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearBasicHypNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearBasicDiabNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearBasicFuriousNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearBasicDoctorNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearBasicNurseNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearBasicPhsicianNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearBasicBedNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearFileNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearEduPaperCategoryNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearEduPaperNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearEduAvNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearEduAvCategoryNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearEduBarNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearEduBarReplaceNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearEduActivityNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearEduActivityPeopleNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearEduTalkNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearEduTalkPeopleNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearChildFileNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearChildBabyVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearChildBabyMoonNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearChildVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearPregnantEarlyNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearPregnantEarlyVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearPregnantMidOneVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearPregnantMidTwoVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearPregnantLateOneVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearPregnantLateTwoVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearPregnantNatalVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearPregnantNatalExamNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearPregnantNatalNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearOldFileNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearOldExamNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearVaccBabyNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearVaccNeedleNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearVaccHepatitisNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearVaccAbnormalNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearVaccInformNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearVaccHepatitisResupplyNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearInfectANum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearInfectBNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearInfectCNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearInfectTimelyNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearInfectTransNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearInfectInvestNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearInfectVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearHypFirstExamNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearHypDiscoverNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearHypFileNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearHypVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearHypExamNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearHypControlNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearDiabPeopleNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearDiabDiscoverNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearDiabFileNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearDiabVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearDiabExamNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearDiabControlNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearFuriousFileNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearFuriousVisitNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearFuriousExamNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
,{id:'yearFuriousGoodNum', xtype: 'input', setting: { size: 10, maxlen:10, format: 'int' } }
    ];
