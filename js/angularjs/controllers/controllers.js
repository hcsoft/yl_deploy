function MarryCheck($scope, $dialog,$routeParams,$location,$filter,$window) {
	// dwr.engine._async =false;
	$scope.namequeryoptions = [
	                 {name:'条形码', value:0},
	                 {name:'档案编号', value:1},
	                 {name:'姓名', value:2},
	                 {name:'身份证号', value:3},
	                 {name:'联系人', value:4}
	               ];
	$scope.womannameselect = 2;
	$scope.mannameselect = 2;
	$scope.districtdata = $window.top.districtdata;
	function exam_new (){
		CommonExamService.newExam("婚检",{
			callback:function(data){
				$scope.data = {},$scope.woman = {},$scope.man = {};
				$scope.data.base = {
					inputdate:data.today,
					examname:'婚检',
					checkdate:data.today,
					visitdate:data.today,
					inputpersonid:data.user.username
				};
				setPhoto("男方",null);
				setPhoto("女方",null);
				$scope.data.items = [{
					"女方_头像":"",
					"女方_血缘关系":"无",
					"女方_既往病史无":'true',
					"女方_手术史":"无",
					"女方_现病史":'无',
					"女方_痛经":'无',
					"女方_月经量":'多',
					"女方_既往婚育史":'无',
					"女方_与遗传有关的家族史无":'true',
					"女方_家族近亲婚配":'无',
					"女方_精神状态":"正常",
					"女方_特殊体态":"无",
					"女方_智力":"正常",
					"女方_特殊面容":"无",
					"女方_五官":"正常",
					"女方_皮肤毛发":"正常",
					"女方_辨色力":"正常",
					"女方_甲状腺":"正常",
					"女方_杂音":"无",
					"女方_肺":"正常",
					"女方_肝":"未及",
					"女方_四肢脊柱":"正常",
					"女方_阴毛":"正常",
					"女方_乳房":"正常",
					"女方_医学意见":"未发现医学上不宜结婚的情形",
					"女方_咨询指导结果":"接受指导意见",
					"女方_胸部透视":'未发现异常',
					"女方_HIV抗体":"陰性",
					"女方_尿糖":"陰性",
					"女方_梅毒":"陰性",
					"女方_淋球菌":"陰性",
					"女方_滴度":"未检测",
					"女方_特殊检查未见异常":'true',
					"女方_乙肝表面抗原检测":"陰性",
					"女方_尿HCG":"陰性",
					"女方_尿常规":"正常",
					"男方_头像":"",
					"男方_血缘关系":"无",
					"男方_既往病史无":'true',
					"男方_手术史":"无",
					"男方_现病史":'无',
					"男方_既往婚育史":'无',
					"男方_与遗传有关的家族史无":'true',
					"男方_家族近亲婚配":'无',
					"男方_精神状态":"正常",
					"男方_特殊体态":"无",
					"男方_智力":"正常",
					"男方_特殊面容":"无",
					"男方_五官":"正常",
					"男方_皮肤毛发":"正常",
					"男方_辨色力":"正常",
					"男方_甲状腺":"正常",
					"男方_杂音":"无",
					"男方_肺":"正常",
					"男方_肝":"未及",
					"男方_四肢脊柱":"正常",
					"男方_阴毛":"正常",
					"男方_医学意见":"未发现医学上不宜结婚的情形",
					"男方_咨询指导结果":"接受指导意见",
					"男方_胸部透视":'未发现异常',
					"男方_HIV抗体":"陰性",
					"男方_尿糖":"陰性",
					"男方_梅毒":"陰性",
					"男方_淋球菌":"陰性",
					"男方_滴度":"未检测",
					"男方_特殊检查未见异常":'true',
					"男方_喉结":"有",
					"男方_阴茎":"正常",
					"男方_包皮":"正常",
					"男方_睾丸":"双侧扪及",
					"男方_附睾双侧正常":'true',
					"男方_精索静脉曲张":"无",
					"男方_乙肝表面抗原检测":"陰性",
					"男方_尿常规":"正常"
					}];
				
			},
			async:false
		});
		$scope.alerts = [ ];
		
	}
	$scope.newExam = function(){
	    var btns = [{result:'cancel', label: '取消'}, {result:'ok', label: '确定', cssClass: 'btn-primary'}];
	    $dialog.messageBox("确认", '是否确定新建?', btns)
	      .open()
	      .then(function(result){
	    	  if(result=='ok'){
	    		  exam_new();
	    	  }
	    });
	}
	
	if("new" ==urlParam("opt")){
		exam_new();
		$("#exam_addpanel").dialog("open");
		$scope.womandistrictselect = $window.top.districtdata.nodemap[urlParam("district")].value;
		$scope.mandistrictselect = $window.top.districtdata.nodemap[urlParam("district")].value;
	}else if("open" ==urlParam("opt")){
		CommonExamService.loadExam(urlParam("id"),{
			callback:function(data){
				$scope.data = data;
				$scope.woman = $scope.data.woman;
				$scope.man = $scope.data.man;
				setPhoto("男方",$scope.data.items[0]['男方_头像']);
				setPhoto("女方",$scope.data.items[0]['女方_头像']);
				$scope.man.othersidename = $scope.woman.name;
				$scope.woman.othersidename = $scope.man.name;
				var womandistrict = $.trim($scope.data.woman.districtNumber);
				var mandistrict = $.trim($scope.data.man.districtNumber);
				$scope.womandistrictselect = $window.top.districtdata.nodemap[womandistrict].value;
				$scope.mandistrictselect = $window.top.districtdata.nodemap[mandistrict].value;
				//设置省市县乡
				$scope.woman['省'] = $window.top.districtMap[womandistrict.substring(0,2)];
				$scope.woman['市'] = $window.top.districtMap[womandistrict.substring(0,4)];
				$scope.woman['县'] = $window.top.districtMap[womandistrict.substring(0,6)];
				$scope.woman['乡镇'] = $window.top.districtMap[womandistrict.substring(0,9)];
				//设置省市县乡
				$scope.man['省'] = $window.top.districtMap[mandistrict.substring(0,2)];
				$scope.man['市'] = $window.top.districtMap[mandistrict.substring(0,4)];
				$scope.man['县'] = $window.top.districtMap[mandistrict.substring(0,6)];
				$scope.man['乡镇'] = $window.top.districtMap[mandistrict.substring(0,9)];
			},
			async:false
		});
		$scope.alerts = [ ];
		$("#exam_addpanel").dialog("open");
	}
	$scope.initSelection = function(element, callback){
		var id=$(element).val();
		if(id){
			var data = {id: id, text: id};
			callback(data);
		}
	}
	//TODO 输入框统一绑定回车事件
    $scope.save = function(){
		//TODO 页面校验
		if(!$scope.data.base.fileno){
			$scope.alerts.splice(0, 1);
			$scope.alerts.push({type:'error',msg: "请选择女方体检人员!"});
			return;
		}
		if(!$scope.data.items[0]["男方_编号"]){
			$scope.alerts.push({type:'error',msg: "请选择男方体检人员!"});
			return;
		}
		CommonExamService.saveExam($scope.data,{async:false,
			callback:function(data){
				$scope.data.base.id = data.base.id;
				$scope.data.items = data.items;
				$scope.alerts.splice(0, 1);
				$scope.alerts.push({type:'success',msg: "保存成功!"});
			}});
    }
	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};
    var phototmp = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+
                    'id="onlineTakePhoto" width="280" height="340"'+
                        'codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab">'+
                        '<param name="movie" value="onlineTakePhoto.swf" />'+
                        '<param name="quality" value="high" />'+
                        '<param name="bgcolor" value="#a6c9e2" />'+
                        '<param name="allowScriptAccess" value="sameDomain" />'+
                        '<embed src="/onlineTakePhoto.swf" quality="high" bgcolor="#a6c9e2"'+
                            'width="280" height="340" name="onlineTakePhoto" align="middle"'+
                            'play="true"'+
                            'loop="false"'+
                            'quality="high"'+
                            'allowScriptAccess="sameDomain"'+
                            'type="application/x-shockwave-flash"'+
                            'pluginspage="http://www.adobe.com/go/getflashplayer">'+
                        '</embed>'+
                    '</object>'+
					'<div class="modal-footer">'+
					'<a ng-click="close(result)" class="btn" >关闭</button>'+
					'</div>';

    $scope.opts = {
        backdrop: true,
        keyboard: true,
        backdropClick: true,
		dialogClass:'onlinedialog',
        template:  phototmp, // OR: templateUrl: 'path/to/view.html',
        controller: 'OnlinePhotoDialogController'
    };
	$scope.namemap = {"男":{},"女":{}};
	function queryName (query , type ){
		var typecode = type=="男" ? 11:12;
		var sexcode = type=="男" ? 'man':'woman';
		
		var district = $('#'+sexcode+'districtselect').attr("realvalue");
		var querytype = parseInt($('#'+sexcode+'nameselect').attr("realvalue"));
		var flag = false;
		if(querytype == 2 || querytype == 4){ //2是姓名,4是联系人,只要输入一位就进行查询
			if(query.term && query.term.length >=2){
				flag = true;
			}
		}else if (querytype == 3){ //3是身份证号,输入10位后开始查询
			if(query.term && query.term.length >=10){
				flag = true;
			}
		}else if (querytype == 0 || querytype ==1){ //0是条形码,1是档案编号 输入4位进行查询
			if(query.term && query.term.length >=4){
				flag = true;
			}
		}
		console.log(flag)
		console.log(query.term);
		console.log(query.term.length)
		if(flag){
			var listdata = null;
			var cachestr = "";
			if(querytype == 2 || querytype ==4){ //2是姓名,4是联系人,只要输入一位就进行查询
				cachestr = query.term.substring(0,2);
			}else if (querytype == 3){ //3是身份证号,输入10位后开始查询
				cachestr = query.term.substring(0,10);
			}else if (querytype == 0 || querytype ==1){ //0是条形码,1是档案编号 输入4位进行查询
				cachestr = query.term.substring(0,4);
			}
			if(!$scope.namemap[type][querytype]){
				$scope.namemap[type][querytype] = {};
			}
			if(!$scope.namemap[type][querytype][district]){
				$scope.namemap[type][querytype][district]={}
			}
			if($scope.namemap[type][querytype][district][cachestr]){
				var querydata = $scope.namemap[type][querytype][district][cachestr];
				listdata = {results: []};
				for(var i = 0 ;i <querydata.results.length;i++){
					if(querydata.results[i].text.indexOf(query.term)==0){
						listdata.results.push(querydata.results[i])
					}
				}
			}else{
				console.log(district+"%"+query.term)
				var querydata = {results: []}, i, j, s;
				FileNumSearch.listCodePageSize(0,0,district+"%"+query.term,true,querytype,typecode,{async:false,
					callback:function(data){
						s = "";
						for (var i = 0; i < data.res.length; i++) {
							s = s + query.term;
							querydata.results.push({id:  data.res[i][0], text: data.res[i][1] +" " + data.res[i][2] + " " + $filter("date")(data.res[i][3],'yyyyMMdd') +" " + data.res[i][7],data:data.res[i]});
						}
					}
				});
				listdata=querydata;
				$scope.namemap[type][querytype][district][cachestr] = querydata;
			}
			query.callback(listdata);
		}
	}
    $scope.womanchangeName = function(query){
		queryName(query,"女");
	};
    $scope.manchangeName = function(query){
		queryName(query,"男");
	};
	$scope.formatSelection=function(item){
		if(!item.data){
			return item.text;
		}else{
			//这里对数据进行填充
			var obj = null;
			var otherobj = null;
			if(item.data[2]=="女"){
				obj = $scope.woman;
				otherobj = $scope.man;
				//女方编号
				$scope.data.base.fileno = enc(item.data[0]);
				$scope.data.base.womanfileno = item.data[0];
			}else{
				//男方编号
				$scope.data.items[0]["男方_编号"] = enc(item.data[0])
				$scope.data.base.manfileno = item.data[0];
				obj = $scope.man;
				otherobj = $scope.woman;
			}
			otherobj.othersidename = item.data[1];
			obj.birthday = item.data[3];
			obj.idcard = denc(item.data[16]);
			obj.occupation = item.data[15];
			obj.education = item.data[14];
			obj.folk = item.data[12];
			$scope.data.items[0][item.data[2]+'方_国籍'] = "中国";
			obj.residenceAddress = item.data[17];
			obj.address = item.data[7];
			$scope.data.items[0][item.data[2]+'方_邮编'] = 678200;
			obj.workUnit = item.data[11];
			obj.linkmanTel = item.data[8];
			obj.address = item.data[7];
			item.text = item.data[1];
			var sexcode = item.data[2]=="男" ? 'man':'woman';
			var district = $('#'+sexcode+'districtselect').attr("realvalue");
			obj['省'] = $window.top.districtMap[district.substring(0,2)];
			obj['市'] = $window.top.districtMap[district.substring(0,4)];
			obj['县'] = $window.top.districtMap[district.substring(0,6)];
			obj['乡镇'] = $window.top.districtMap[district.substring(0,9)];
			return item.data[1];
		}
	};
	$scope.womanSearching=function(scope){
		//注:select2的事件似乎无法正常获取$scope更新后的内容,只能得到初始化的内容
		return "输入"+$('#womannameselect').find("option:selected").text()+"进行查询...";
	};
	$scope.manSearching=function(){
		return "输入"+ $('#mannameselect').find("option:selected").text()+"进行查询...";
	};
	$scope.dateitems = {
		cfg:[
			{parent:$scope.data.items[0] , item: '女方_末次月经时间'},
			{parent:$scope.data.items[0] , item: '女方_转诊日期'},
			{parent:$scope.data.items[0] , item: '女方_预约复诊日期'},
			{parent:$scope.data.items[0] , item: '女方_出具《婚前医学检查证明》日期'},
			{parent:$scope.data.base , item: 'inputdate'},
			{parent:$scope.data.base , item: 'checkdate'},
			{parent:$scope.data.base , item: 'visitdate'},
			{parent:$scope.data.items[0] , item: '男方_转诊日期'},
			{parent:$scope.data.items[0] , item: '男方_预约复诊日期'},
			{parent:$scope.data.items[0] , item: '男方_出具《婚前医学检查证明》日期'}
		]};
	function datestrWatch(scope){
		var retstr = "";
		for(var i = 0 ; i <scope.dateitems.cfg.length;i++){
			var item = scope.dateitems.cfg[i];
			if(item.parent[item.item] instanceof Date){
				item.parent[item.item] = $filter("date")(item.parent[item.item],'yyyyMMddHHmmss');
			}
			if(item.parent[item.item]){
				retstr = retstr+item.parent[item.item]+"|";
			}else{
				retstr = retstr+"|";
			}
		}
		return retstr;
	}
	$scope.$watch(datestrWatch, function(newValue, oldValue) { 
		if(oldValue && newValue){
			var olds = oldValue.split("|");
			var news = newValue.split("|");
			for(var i = 0 ; i <news.length;i++){
				var item = $scope.dateitems.cfg[i];
				if(item){
					if(news[i] && item.parent[item.item]){
						var init = item.parent[item.item];
						$scope.dateitems[item.item]=new Date(moment(init, "YYYYMMDDHHmmss"));
					}else{
						$scope.dateitems[item.item]=null;
					}
				}
			}
		}
	});
	
	function dateWatch(scope){
		var retstr = "";
		for(var i = 0 ; i <scope.dateitems.cfg.length;i++){
			var item = scope.dateitems.cfg[i];
			var watchitem = scope.dateitems[item.item];
			if(watchitem){
				retstr = retstr+$filter("date")(watchitem,'yyyyMMddHHmmss')+"|";
			}else{
				retstr = retstr+"|";
			}
		}
		return retstr;
	}
	
	$scope.$watch(dateWatch, function(newValue, oldValue) { 
		if(oldValue && newValue){
			var olds = oldValue.split("|");
			var news = newValue.split("|");
			for(var i = 0 ; i <news.length;i++){
				var item = $scope.dateitems.cfg[i];
				if(item){
					if(news[i]){
						item.parent[item.item] = unescape($filter("date")($scope.dateitems[item.item],'yyyyMMddHHmmss'));
					}else{
						item.parent[item.item] = null;
					}
				}
			}
		}
	});
	
	$scope.formatNoMatches=function(term){
		return "查询'"+term+"'无结果!";
	}
    $scope.onlinePhoto = function(id){
        var d = $dialog.dialog($scope.opts);
        d.open().then(function(result){
			PersonalInfoService.getHeadPicture({callback:function(data){
					if(data){
						setPhoto(id,data);
						$scope.data.items[0][id+'_头像'] =  data;
					}
				},
				async:false
			});
        });
    };
    function setPhoto(id,pic){
    	if(!$scope.headpic){
    		$scope.headpic = {};
    	}
    	if(pic && id){
	    	$scope.headpic[id+"_头像html"] = "<img class='onlinetd' width=120 height=120 src='/headPicture/" + pic+"'/>";
    	}else{
    		$scope.headpic[id+"_头像html"] = "<div class='onlinetd'>近期一寸<br>免冠正面<br>照片加盖<br>婚检专用章<br><font color=red>注:点击照相</font></div>";
    	}
    }
    
    function urlParam(name){
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec($location.path());
        return results[1] || null;
    }
    
    $scope.print = function(){
    	var printCss = "<html ><link rel='stylesheet' type='text/css' href='marry_check_info.css'/><style> body{ white-space:pre-wrap;}</style>";
		var html = printCss + '<body >' + $('#printpage1').html() + '</body></html>';
		$window.printObj.printHTML(html,'婚检','210mm','297mm',1);	
		html = printCss + '<body >' + $('#printpage1_2').html() + '</body></html>';
		$window.printObj.printHTML(html,'婚检','210mm','297mm',1);	
		html = printCss + '<body >' + $('#printpage1_3').html() + '</body></html>';
		$window.printObj.printHTML(html,'婚检','210mm','297mm',1);	
		html = printCss + '<body >' + $('#printpage1_4').html() + '</body></html>';
		$window.printObj.printHTML(html,'婚检','210mm','297mm',1);	
    }
    $scope.print1 = function(){
    	var printCss = "<link rel='stylesheet' type='text/css' href='marry_check_info.css'/>";
		var html = printCss + '<body>' + $('#printpage2').html() + '</body>';
		$window.printObj.printHTML1(html,'婚检','210mm','292mm',2);	
		html = printCss + '<body>' + $('#printpage2_2').html() + '</body>';
		$window.printObj.printHTML1(html,'婚检','210mm','292mm',2);	
    }
    $scope.exit = function(){
    	if($window.parent){
    		$window.parent.closeDialog();
    	}
    }
}

// the dialog is injected in the specified controller
function OnlinePhotoDialogController($scope, dialog){
  $scope.close = function(result){
    dialog.close(result);
  };
}