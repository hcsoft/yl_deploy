
var services = {
  get : ChildrenMediExam3Service.get,
  save : ChildrenMediExam3Service.save,
  propValidate : ChildrenMediExam3Service.hasAllThese
};

var cfg = [ {
  id : "name",
  xtype : "input",
  setting: {
    maxlen : 8,
    size : 8,
    width: 20,
    showOnly: true,
    asLabel: true,
    readonly: true
  }
}, {
  id : "districtNumber",
  xtype : "input",
  setting : {             
      showOnly : true,
      asLabel : true
  }
}, {
  id : "fileNo",
  xtype : "combo",
  setting : {
      ds :  {search:FileNumSearch.listCodePage, get:FileNumSearch.getItem},
      local : false,
      width : 100,
      model : {
          id : 0,
          code : 0,
          display : 1
      },
      showDisplay: false,
      roWhenSet : true,
      writeback : [{id:"name", col: 1}],
      mCodePrefixCtrlId : 'districtNumber',
      displayCols : [0,1,2,3],
      displayColNames : ["编号", "疾病", "", ""]
  },
  required : [true, "编号"]
}, {
  id : "visitDate",
  xtype : "input",
  setting : {
    format : 'date',
    maxlen : 8,
    size : 10
  }
}, {
  id : "weight",
  xtype : "input",
  setting: {
    maxlen : 5,
    size : 5,
    format:"num"
  }
}, {
  id : 'weightScore',
  xtype : 'list',
  setting : {
    ds : "172"
  }
}, {
  id : "height",
  xtype : "input",
  setting: {
    maxlen : 10,
    size : 10,
    format:"num"
  }
}, {
  id : 'heightScore',
  xtype : 'list',
  setting : {
    ds : "172"
  }
}, {
  id : 'body',
  xtype : 'list',
  setting : {
    ds : "89"
  }
}, {
  id : 'face',
  xtype : 'list',
  setting : {
    ds : '56'
  },
  requires : {
    valEq : "2",
    fields : [ "faceOther" ]
  }
}, {
  id : 'faceOther',
  xtype : 'input',
  setting : {
    disabled : true,
    maxlen : 10,
    size : 10
  }
}, {
  id : 'walk',
  xtype : 'list',
  setting : {
    ds : '35'
  },
  requires : {
    valEq : "2",
    fields : [ "walkOther" ]
  }
}, {
  id : 'walkOther',
  xtype : 'input',
  setting : {
    disabled : true,
    maxlen : 10,
    size : 10
  }
}, {
  id : 'eyes',
  xtype : 'list',
  setting : {
    ds : '96'
  },
  requires : {
    valEq : "2",
    fields : [ "eyesOther" ]
  }
}, {
  id : 'eyesOther',
  xtype : 'input',
  setting : {
    disabled : true,
    maxlen : 10,
    size : 10
  }
}, {
  id : 'ears',
  xtype : 'list',
  setting : {
    ds : '96'
  },
  requires : {
    valEq : "2",
    fields : [ "earsOther" ]
  }
}, {
  id : 'earsOther',
  xtype : 'input',
  setting : {
    disabled : true,
    maxlen : 10,
    size : 10
  }
}, {
  id : 'heart',
  xtype : 'list',
  setting : {
    ds : '96'
  },
  requires : {
    valEq : "2",
    fields : [ "heartOther" ]
  }
}, {
  id : 'heartOther',
  xtype : 'input',
  setting : {
    disabled : true,
    maxlen : 10,
    size : 10
  }
}, {
  id : 'liver',
  xtype : 'list',
  setting : {
    ds : '96'
  },
  requires : {
    valEq : "2",
    fields : [ "liverOther" ]
  }
}, {
  id : 'liverOther',
  xtype : 'input',
  setting : {
    disabled : true,
    maxlen : 10,
    size : 10
  }
}, {
  id : 'behaiviour',
  xtype : 'list',
  setting : {
    ds : '73'
  },
  requires : {
    valEq : "2",
    fields : [ "behaiviourOther" ]
  }
}, {
  id : 'behaiviourOther',
  xtype : 'input',
  setting : {
    disabled : true,
    maxlen : 10,
    size : 10
  }
}, {
  id : 'sociality',
  xtype : 'list',
  setting : {
    ds : '73'
  },
  requires : {
    valEq : "2",
    fields : [ "socialityOther" ]
  }
}, {
  id : 'socialityOther',
  xtype : 'input',
  setting : {
    disabled : true,
    maxlen : 10,
    size : 10
  }
}, {
  id : "checkSickness",
  xtype : "list",
  setting : {
    ds : "133",
    multi : true,
    save : "id",
    newlineStep : 6,
    forceNewline : true,
    mapping : {
      value : 'checkSicknessId'
    }
  },
  requires : {
    valEq : 9,
    fields : [ 'sicknessOther' ]
  }
}, {
  id : 'sicknessOther',
  xtype : 'input',
  setting : {
    disabled : true,
    maxlen : 10,
    size : 10
  }
}, {
  id : 'allergy',
  xtype : 'list',
  setting : {
    ds : '151'
  },
  requires : {
    valEq : "2",
    fields : [ "allergyOther" ]
  }
}, {
  id : 'allergyOther',
  xtype : 'input',
  setting : {
    disabled : true,
    maxlen : 30,
    size : 30
  }
}, {
  id : "other",
  xtype : "input",
  setting: {
    maxlen : 50,
    size : 50
  }
}, {
  id : 'transfer',
  xtype : 'list',
  setting : {
    ds : '151',
    save : 'isInputValue'
  },
  requires : {
    valEq : "2",
    fields : [ "transReason", "transUnit" ]
  }
}, {
  id : 'transReason',
  xtype : 'input',
  setting : {
    disabled : true,
    maxlen : 20,
    size : 20,
    caption : "转诊原因"
  }
}, {
  id : 'transUnit',
  xtype : 'input',
  setting : {
    disabled : true,
    maxlen : 20,
    size : 20,
    caption : "转诊机构及科室"
  }
}, {
  id : "checkDirect3",
  xtype : "list",
  setting : {
    ds : "157",
    multi : true,
    save : "id",
    newlineStep : 5,
    forceNewline : true,
    mapping : {
      value : 'checkDirect3id'
    }
  }
}, {
  id : "directOther",
  xtype : "input",
  setting: {
    maxlen : 30,
    size : 30
  }
}, {
  id : "visitDoctor",
  xtype : "input",
  setting: {
    maxlen : 10,
    size : 10
  }
}

];
