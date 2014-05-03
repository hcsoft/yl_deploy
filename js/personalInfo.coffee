#是否孕产妇
window.printdata = (data, type, start) ->
  msg = ""
  if type is 0 or type is `undefined`
    for item of data
      msg = msg + item + "=" + data[item] + "\n"
  else if type is 1
    for item of data
      msg = msg + item + "=" + data[item] + "\n"  if typeof (item) is "function"
  else if type is 2
    for item of data
      msg = msg + item + "=" + data[item] + "\n"  if item.toLowerCase().indexOf(start.toLowerCase()) >= 0
  console.log msg
window.getDWRUrl = (geturl) ->
  "dwr/interface/" + geturl.substr(0, geturl.indexOf(".")) + ".js"
window.addHeadScript = (srcs, callback) ->
  window.personal_colsMaps.headscripts = new Array()  unless window.personal_colsMaps.headscripts
  i = 0

  while i < srcs.length
    unless window.personal_colsMaps.headscripts[srcs[i]]
      $("<script></script>").attr(
        src: getDWRUrl(srcs[i])
        type: "text/javascript"
        name: "script_autoload"
      ).appendTo $("head")
      window.personal_colsMaps.headscripts[srcs[i]] = true
    i++
  $(document).queue callback
window.addHeadScriptByKeyWord = (keyword, data, callback) ->
  srcs = new Array()
  count = 0
  m = 0

  while m < keyword.length
    urlreg = new RegExp(keyword[m] + "\\s*:\\s*([0-9a-zA-Z_\\.]+)", "g")
    urls = data.match(urlreg)
    i = 0

    while i < urls.length
      urls[i].match urlreg
      srcs[count++] = RegExp.$1
      i++
    m++
  addHeadScript srcs
window.getContext = (obj) ->
  html = ""
  unless typeof (obj) is "function"
    if typeof (obj) is "object"
      for item of obj
        html = html + getContext(obj[item])  if obj.hasOwnProperty(item)
    else
      html = obj
  html
window.clickCount = (obj)->
  $(obj.previousSibling).click();
window.changedata = (index, tablename) ->
  datamap = window.personal_colsMaps[tablename]
  if datamap.datas["" + index]
    setLabelVal datamap.datas["" + index], tablename, datamap.pre
  else
    func = eval(datamap.item.url)
    func
      id: datamap.item.idlist[index].trim()
    ,
      callback: (data) ->
        datamap.datas["" + index] = data
        setLabelVal data, tablename, datamap.pre

  true
window.subtabs_click = (obj, index, count) ->
  $.each $(obj).parent().parent().find("a"), (index, item) ->
    $(item).removeClass "subtab_current"

  $(obj).addClass "subtab_current"
  i = 0

  while i < count
    if i is index
      $("#" + $(obj).attr("tabname") + (i + 1)).css "display", "block"
    else
      $("#" + $(obj).attr("tabname") + (i + 1)).css "display", "none"
    i++
window.setLabelVal = (data, tablename, pre) ->
  listcols = window.personal_colsMaps[tablename].listcols
  datecols = window.personal_colsMaps[tablename].datecols
  
  #设置值
  for prop of data
    c = $("#" + pre + prop)
    if c and c.html
      if listcols[prop] and data[prop]? and data[prop] isnt `undefined`
        
        #处理列表list类型
        index = listcols[prop].ds
        map = getData(index)
        valuecol = undefined
        valuecol = "number"
        if data[prop][0] and typeof (data[prop][0]) is "object"
          if listcols[prop].id
            valuecol = listcols[prop].id
          else
            valuecol = 0
        if map
          _len = map.length - 1
          
          #alert(printdata(v)+"==="+data[prop]+"\n====="+typeof(v["number"]));
          spans = $.map(map, (v, i) ->
            number = undefined
            label = undefined
            if $.isArray(v)
              number = v[0]
              label = v[1]
            else
              number = v["number"]
              label = v["name"]
            label = ""  if label is `undefined` or label is "undefined"
            flag = false
            if typeof (data[prop]) is "string"
              flag = (data[prop] ==label)
            else if typeof (data[prop]) is "boolean"
              flag = true  if v["number"] is 1 and not data[prop]
              flag = true  if v["number"] is 2 and data[prop]
            else
              i = 0

              while i < data[prop].length
                if v["id"] is data[prop][i][valuecol]
                  flag = true
                  break
                i++
            if flag
              "<span><em class='list-selected'>" + number + ". </em><em class='list-label'>" + label + "</em></span>"
            else
              "<span><em>" + number + ". </em><em class='list-label'>" + label + "</em></span>"
          ).join("")
          c.html spans + "&nbsp;"
          $("span ->em").addClass "spanAlign"
      else if datecols[prop] and data[prop]
        #处理时间类型
        c.html Ext.util.Format.date(data[prop], "Y-m-d")
        c.addClass "readcontext"
      else if typeof (data[prop]) is "object"

      else unless typeof (data[prop]) is "function"
        
        #处理简单的字符串或数字类型
        c.html data[prop]
        c.addClass "readcontext"
window.loadTriggerParameters = ["fileNo"]
window.services =
  get: PersonalInfoService.get
  save: PersonalInfoService.save

window.cfg = [
  id: "fileNo"
  xtype: "input"
  setting:
    maxlen: 18
    size: 18
    asLabel: true
,
  id: "paperFileNo"
  xtype: "input"
  setting:
    maxlen: 18
    size: 18
,
  id: "name"
  xtype: "input"
  setting:
    maxlen: 18
    size: 18

  required: [true, "姓名"]
,
  id: "barCode"
  xtype: "input"
  setting:
    maxlen: 18
    size: 18
,
  id: "sex"
  xtype: "list"
  setting:
    ds: "111"
    controlShow: 3
    controlShowVal: "bornStatus"

  required: [true, "性别"]
,
  id: "folk"
  xtype: "list"
  setting:
    ds: "57"
    isDefaultVal: true
    defaultVal: 0

  requires:
    valEq: "2"
    fields: ["folkOther"]
,
  id: "folkOther"
  xtype: "input"
  setting:
    disabled: true
    maxlen: 10
    size: 10
    caption: "其他民族"
,
  id: "idnumber"
  xtype: "input"
  setting:
    defaultVal: "533022"
    maxlen: 18
    size: 18
    calculateBirthday: true
    calculateBirthdayByIDNumber: ["birthday"]

  required: [true, "身份证号"]
,
  id: "birthday"
  xtype: "input"
  setting:
    format: "date"
    maxlen: 8
    size: 10

  required: [true, "出生日期"]
,
  id: "workUnit"
  xtype: "input"
  setting:
    maxlen: 19
    size: 19
    defaultVal: "无"
,
  id: "tel"
  xtype: "input"
  setting:
    maxlen: 30
    size: 15
,
  id: "linkman"
  xtype: "input"
  setting:
    maxlen: 10
    size: 10
,
  id: "linkmanTel"
  xtype: "input"
  setting:
    maxlen: 11
    size: 11
,
  id: "bloodTypeAbo"
  xtype: "list"
  setting:
    ds: "115"
,
  id: "maritalStatus"
  xtype: "list"
  setting:
    ds: "37"
,
  id: "farmStatus"
  xtype: "list"
  setting:
    ds: "171"
    isDefaultVal: true
    defaultVal: 0

  required: [true, "是否农业人口"]
,
  id: "townStatus"
  xtype: "list"
  setting:
    ds: "171"
    isDefaultVal: true
    defaultVal: 1

  required: [true, "是否城镇居民"]
,
  id: "allergiesHistory"
  xtype: "list"
  setting:
    ds: "34"
    multi: true
    save: "id"
    mapping:
      value: "allergiesId"

    controlShow: 0
    isDefaultVal: true
    defaultVal: 0

  requires:
    valEq: 5
    fields: ["allergiesOther"]
,
  id: "allergiesOther"
  xtype: "input"
  setting:
    disabled: true
    maxlen: 10
    size: 10
    caption: "其他药物过敏史"
,
  id: "exposeHistory"
  xtype: "list"
  setting:
    ds: "192"
    multi: true
    save: "id"
    mapping:
      value: "exposeId"

    controlShow: 0
    isDefaultVal: true
    defaultVal: 0
,
  id: "education"
  xtype: "list"
  setting:
    ds: "99"
,
  id: "bloodTypeRh"
  xtype: "list"
  setting:
    ds: "3"
    isDefaultVal: true
    defaultVal: 2
,
  id: "occupation"
  xtype: "list"
  setting:
    ds: "137"
    newlineStep: 1
    isDefaultVal: true
    defaultVal: 4
,
  id: "resideType"
  xtype: "list"
  setting:
    ds: "7"
    isDefaultVal: true
    defaultVal: 0
,
  id: "opshistory"
  xtype: "grid"
  setting:
    ds: "operations"
    displayCols: ["opsname", "opsdate"]
    displayColNames: ["名称", "时间"]
    colXtypes: ["input", "input"]
    colSettings: [{},
      format: "date",
        maxlen: 8
    ]
    required: ["opsname"]

  errCaption: "手术"
,
  id: "traumaHistory"
  xtype: "grid"
  setting:
    ds: "injuries"
    displayCols: ["traumaName", "traumaDate"]
    displayColNames: ["名称", "时间"]
    colXtypes: ["input", "input"]
    colSettings: [{},
      format: "date",
        maxlen: 8
    ]
    required: ["traumaName"]

  errCaption: "外伤"
,
  id: "bloodTrans"
  xtype: "grid"
  setting:
    ds: "bloodTrans"
    displayCols: ["reason", "transDate"]
    displayColNames: ["原因", "时间"]
    colXtypes: ["input", "input"]
    colSettings: [{}, {}]
    required: ["reason"]

  errCaption: "输血"
,
  id: "disabilityStatus"
  xtype: "list"
  setting:
    ds: "6"
    multi: true
    save: "id"
    mapping:
      value: "disabilityStatusId"

    newlineStep: 7
    controlShow: 0
    isDefaultVal: true
    defaultVal: 0

  requires:
    valEq: 8
    fields: ["disabilityStatusOther"]
,
  id: "disabilityStatusOther"
  xtype: "input"
  setting:
    maxlen: 10
    disabled: true
    size: 10
    caption: "其他残疾"
,
  id: "paymentMode"
  xtype: "list"
  setting:
    ds: "123"
    multi: true
    save: "id"
    mapping:
      value: "paymentModeId"

    newlineStep: 4
    isDefaultVal: true
    defaultVal: 2

  requires:
    valEq: 8
    fields: ["paymentModeOther"]
,
  id: "paymentModeOther"
  xtype: "input"
  setting:
    maxlen: 10
    disabled: true
    size: 10
    caption: "其他支付方式"
,
  id: "geneticHistory"
  xtype: "list"
  setting:
    ds: "151"
    isDefaultVal: true
    defaultVal: 0

  requires:
    valEq: 2
    fields: ["geneticHistoryOther"]
,
  id: "geneticHistoryOther"
  xtype: "input"
  setting:
    disabled: true
    maxlen: 10
    size: 10
    caption: "疾病名称"
,
  id: "diseaseHistory"
  xtype: "grid"
  setting:
    ds: "diseaseHistory"
    other_init_param: window.parent.other_init_param
    displayCols: ["diseaseId", "confirmDate", "remark"]
    displayColNames: ["疾病名称", "确诊时间", "疾病说明"]
    colXtypes: ["combo", "input", "input"]
    colSettings: [
      ds: "38"
      multi: false
      model:
        id: "number"
        code: "number"
        display: "name"

      displayCols: ["number", "name"]
      displayColNames: ["编号", "疾病"]
    ,
      format: "date",
        maxlen: 8,
    , {}]
    required: ["diseaseId"]

  errCaption: "疾病"
,
  id: "address"
  xtype: "input"
  setting:
    maxlen: 40
    size: 40
,
  id: "residenceAddress"
  xtype: "input"
  setting:
    maxlen: 40
    size: 40
,
  id: "tel0"
  xtype: "input"
  setting:
    maxlen: 18
    size: 18
,
  id: "township"
  xtype: "input"
  setting:
    maxlen: 18
    size: 18
    readonly: true
,
  id: "village"
  xtype: "input"
  setting:
    maxlen: 18
    size: 18
    readonly: true
,
  id: "buildUnit"
  xtype: "input"
  setting:
    maxlen: 18
    size: 18
,
  id: "districtNumber"
  xtype: "input"
  setting:
    readonly: true
,
  id: "buildPerson"
  xtype: "input"
  setting:
    maxlen: 18
    size: 18
,
  id: "doctor"
  xtype: "input"
  setting:
    maxlen: 18
    size: 18
,
  id: "buildDate"
  xtype: "input"
  setting:
    format: "date",
    maxlen: 8

  required: [true, "建档日期"]
,
  id: "matherHistory"
  xtype: "list"
  setting:
    ds: "148"
    multi: true
    save: "id"
    newlineStep: 5
    forceNewline: true
    mapping:
      value: "heredityId"

    controlShow: 0
    isDefaultVal: true
    defaultVal: 0

  requires:
    valEq: 12
    fields: ["mhistoryOther"]
,
  id: "mhistoryOther"
  xtype: "input"
  setting:
    maxlen: 10
    disabled: true
    size: 10
    caption: "残疾"
,
  id: "fatherHistory"
  xtype: "list"
  setting:
    ds: "148"
    multi: true
    save: "id"
    newlineStep: 5
    forceNewline: true
    mapping:
      value: "heredityId"

    controlShow: 0
    isDefaultVal: true
    defaultVal: 0

  requires:
    valEq: 12
    fields: ["fhistoryOther"]
,
  id: "fhistoryOther"
  xtype: "input"
  setting:
    maxlen: 10
    disabled: true
    size: 10
    caption: "其他"
,
  id: "brotherHistory"
  xtype: "list"
  setting:
    ds: "148"
    multi: true
    save: "id"
    newlineStep: 5
    forceNewline: true
    mapping:
      value: "heredityId"

    controlShow: 0
    isDefaultVal: true
    defaultVal: 0

  requires:
    valEq: 12
    fields: ["bhistoryOther"]
,
  id: "bhistoryOther"
  xtype: "input"
  setting:
    maxlen: 10
    disabled: true
    size: 10
    caption: "其他残疾"
,
  id: "familyHistory"
  xtype: "list"
  setting:
    ds: "148"
    multi: true
    save: "id"
    newlineStep: 5
    forceNewline: true
    mapping:
      value: "heredityId"

    controlShow: 0
    isDefaultVal: true
    defaultVal: 0

  requires:
    valEq: 12
    fields: ["fmHistoryOther"]
,
  id: "fmHistoryOther"
  xtype: "input"
  setting:
    maxlen: 10
    disabled: true
    size: 10
    caption: "其他残疾"
,
  id: "kitchen"
  xtype: "list"
  setting:
    ds: "1245"
    isDefaultVal: true
    defaultVal: 0
,
  id: "bunkers"
  xtype: "list"
  setting:
    ds: "1250"
    isDefaultVal: true
    defaultVal: 4
,
  id: "drinkingWater"
  xtype: "list"
  setting:
    ds: "1257"
    isDefaultVal: true
    defaultVal: 0
,
  id: "toilet"
  xtype: "list"
  setting:
    ds: "1264"
    isDefaultVal: true
    defaultVal: 4
,
  id: "poultry"
  xtype: "list"
  setting:
    ds: "1270"
    isDefaultVal: true
    defaultVal: 0
,
  id: "bornStatus"
  xtype: "list"
  setting:
    ds: "171"
    disabled: true
]
window.personal_colsMaps = {}
#for

#增加标签页
queryjson = parseParams(window.location.search)
if queryjson.fileNo and queryjson.fileNo.length > 0
  PersonalInfoService.getExamInfo queryjson, (data) ->
    if data.length > 0
      window.personal_colsMaps = {}
      i = 0
      sortarray = []
      ordarray = {};
      
      while i < data.length
        ordarray[window.parseInt(data[i]["ord"])] = i
        sortarray[i]=window.parseInt(data[i]["ord"])
        i++
      sortNum =(a,b)->
        a-b
      sortarray.sort(sortNum)
      i = 0
      while i < data.length
        item = data[ordarray[sortarray[i]]]
        pre = item.tablename+item.ord+"_"
        $(".panes").append "<div class='span-22 last' id='#{pre}div_id'> </div>"
        $(".tabs").append "<li><a href=\"#\" style='color:blue !important;'>" + item.name + "(" + item.idlist.length + "次)" + "</a></li>"
        $("ul.tabs").tabs "div.panes > div",
          api: true
        $.ajax
          url: item.htmlurl
          dataType: "text"
          error: (req, stat, error) ->
            alert error
          scope: item
          success: (htmldata, stat) ->
            #$.getscript(getDWRUrl(this.scope.url));
            tablename = @scope.tablename+@scope.ord
            pre = tablename+ "_"
            addHeadScript new Array(@scope.url)
            regexp = /[i|I][d|D]\s*=\s*['|"](\w+)['|"]/g
            htmldata = htmldata.replace(regexp, "id='" + pre + "$1'")
            htmldata = htmldata.substr(htmldata.indexOf("\n"))
            $("##{pre}div_id").append htmldata
            i = 0
            $("##{pre}id_tabcount").addClass("tdspan")
            divstr = "<div style='display:none'>"
            htmlstr = "<ul class='middletabs'>"
            while i < @scope.idlist.length
              divstr += "<div class='hiddendiv'/>"
              if i is 0
                htmlstr += "<li><a href='#' onclick='changedata(#{i},\"#{tablename}\");'>第#{i+1}次检查记录</a></li>"
              else
                htmlstr += "<li><a href='#' onclick='changedata(#{i},\"#{tablename}\");'>第#{i+1}次检查记录</a></li>"
              i++
            htmlstr+="</ul>"
            divstr+="</div>"
            $("##{pre}id_tabcount").append(htmlstr)
            $("##{pre}id_tabcount").append(divstr)
            $("##{pre}id_subtabcount ul.subtabs").tabs("##{pre}div_id tr.trtab")
            $("##{pre}id_tabcount ul.middletabs").tabs("##{pre}div_id hiddendiv")
            window.personal_colsMaps[tablename] =
              datecols: {}
              listcols: {}
              pre: pre
              datas: {}
              cfg: {}
              item: @scope

            $.ajax
              url: @scope.listcol
              dataType: "text"
              error: (req, stat, error) ->
                alert error

              scope: @scope
              success: (jsdata, stat) ->
                
                #alert(htmldata)
                tablename = @scope.tablename+@scope.ord
                regexp = /var\s+(services)\s*=/g
                jsdata = jsdata.replace(regexp, "var " + tablename + "_services = ")
                regexp = /([var\s|,]\s*)(cfg)\s*=/g
                jsdata = jsdata.replace(regexp, "$1" + tablename + "_cfg = ")
                addHeadScriptByKeyWord new Array("search", "get"), jsdata
                eval jsdata
                serv = eval(tablename + "_services")
                cfg = eval(tablename + "_cfg")
                i = 0

                while i < cfg.length
                  if cfg[i].setting
                    if cfg[i].xtype is "list"
                      window.personal_colsMaps[tablename].listcols[cfg[i].id] =
                        ds: cfg[i].setting.ds
                        id: ((if cfg[i].setting.mapping then cfg[i].setting.mapping.value else null))
                    else window.personal_colsMaps[tablename].datecols[cfg[i].id] = true  if cfg[i].xtype is "input" and cfg[i].setting.format is "date"
                  i++
                func = eval(@scope.url)
                # console.log "id=====" + @scope.idlist[0]
                func
                  id: @scope.idlist[0].trim()
                ,
                  callback: (data) ->
                    window.personal_colsMaps[tablename].datas["0"] = data
                    setLabelVal data, tablename, window.personal_colsMaps[tablename].pre


          errorHandler: (errStr, e) ->
            hideDialog()
            showDialog "系统发生异常(PersonalInfo.js加载应用数据过程中)<br/>" + errStr, true
        i++
