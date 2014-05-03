
	function formatDight(Dight, How) {
		var value = parseFloat(Dight);
		if (isNaN(Dight)) {
			value = 0;
		}
		value = new Number(Dight).toFixed(How);

		return parseFloat(value);
	}
	;
	function getNowTime() {
		// 取得当前时间
		var now = new Date();
		var year = now.getYear();
		var month = now.getMonth() + 1;
		var day = now.getDate();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		var nowdate = year + "-" + month + "-" + day + " " + hour + ":"
				+ minute + ":" + second;
		return nowdate;

	}

	function formatNumber(str) {
		var maxValue = (maxValue == null ? 999999999999.99 : maxValue);
		str = (isNaN(str) ? "0.00" : String(formatDight(
				(str > maxValue ? maxValue : str), 2)));

		var point = str.indexOf(".");
		if (point == -1) {
			str = str + ".00";
			point = str.indexOf(".");
		}
		var whole = str.substring(0, point);
		var fraction = str.substring(point + 1, str.length);
		while (fraction.length < 2) {
			fraction += "0";
		}
		return (whole.length == 0 ? "0" : whole) + "." + fraction;
	}
	;
	Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
	var combodata = [ [ '住院部', '01' ] ];
	var typedata = [ [ '职工医保', '01' ] ];
	var hisno = '30001';
	var namedata = [ [ '09', '杨希贤', '2009000458' ],
			[ '12', '柳如兰', '2009000459' ], [ '23', '马国定', '2009000462' ] ];
	var data09 = [ [ '22223', '2011-1-1 20:30:45', 600, 700, 100, 0, '职工医保' ],
			[ '22226', '2011-1-3 01:10:45', 700, 700, 0, 0, '职工医保' ] ];
	var data12 = [ [ '22229', '2011-1-3 21:10:45', 500, 500, 0, 0, '职工医保' ] ];
	var data23 = [ [ '22236', '2011-1-3 11:10:45', 700, 700, 0, 0, '职工医保' ] ];
	var typestore = new Ext.data.SimpleStore( {
		fields : [ 'type', 'code' ],
		data :typedata
	});
	var combostore = new Ext.data.SimpleStore( {
		fields : [ 'dept', 'code' ],
		data :combodata
	});

	var datastore = new Ext.data.SimpleStore( {
		fields : [ {
			name :'no'
		}, {
			name :'date',
			type :'date',
			dateFormat :'Y-n-j H:i:s'
		}, {
			name :'balance',
			type :'float'
		}, {
			name :'price',
			type :'float'
		}, {
			name :'addmoney',
			type :'float'
		}, {
			name :'getmoney',
			type :'float'
		}, {
			name :'type'
		} ]
	});
	// datastore.loadData(data09);

	var datagrid = new Ext.grid.GridPanel( {
		store :datastore,
		border : true,
		columns : [ {
			header :"结算单号",
			width :60,
			sortable :true,
			dataIndex :'no'
		}, {
			header :"制单时间",
			width :135,
			sortable :true,
			renderer :Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
			dataIndex :'date'
		}, {
			header :"结算时余额",
			width :100,
			sortable :true,
			renderer :formatNumber,
			dataIndex :'balance'
		}, {
			header :"结算金额",
			width :100,
			sortable :true,
			renderer :formatNumber,
			dataIndex :'price'
		}, {
			header :"应补金额",
			width :100,
			sortable :true,
			renderer :formatNumber,
			dataIndex :'addmoney'
		}, {
			header :"应退金额",
			width :100,
			sortable :true,
			renderer :formatNumber,
			dataIndex :'getmoney'
		}, {
			header :"类别",
			width :100,
			sortable :true,
			dataIndex :'type'
		} ],
		height :500,
		width :700
	});

	var namestore = new Ext.data.SimpleStore( {
		fields : [ {
			name :'bedno'
		}, {
			name :'name'
		}, {
			name :'hospitolno'
		} ]
	});
	namestore.loadData(namedata);

	var namegrid = new Ext.grid.GridPanel( {
		store :namestore,
		border : true,
		columns : [ {
			id :'bedno',
			header :"床号",
			width :50,
			sortable :true,
			dataIndex :'bedno'
		}, {
			header :"病人姓名",
			width :80,
			sortable :true,
			dataIndex :'name'
		}, {
			header :"住院号",
			width :120,
			sortable :true,
			dataIndex :'hospitolno'
		} ],
		height :450,
		width :270
	});
	// 绑定事件
	namegrid.on('rowclick', function(grid, row, event) {
		var bedno = grid.getSelectionModel().getSelected().get("bedno");
		Ext.getCmp("endmoney").enable();
		if (bedno == '09')
			datastore.loadData(data09);
		if (bedno == '12')
			datastore.loadData(data12);
		if (bedno == '23')
			datastore.loadData(data23);
	});

formArray_jiesuan = new Ext.form.FormPanel( {
		id :'formArray_jiesuan',
		autoScroll :true,
		frame :true,
		labelAlign :'left',
		title :'出院结算',
		layout :'table',
		width :1000,
		height :550,
		align :"center",
		closable : true,
		border : true,
		layoutConfig : {
			columns :3
		},
		items : [ {
			layout :'form',
			border : true,
			items : [ new Ext.form.ComboBox( {
				id :'combo2',
				store :combostore,
				
				valueField :'code',
				displayField :'dept',
				mode :'local',
				forceSelection :true,
				selectOnFocus :true,
				fieldLabel :'部门'
			}), namegrid, new Ext.Button( {
				id :'endmoney',
				text :'结算',
				disabled :true
			}) ]
		}, {
			html :'<span style="width:10"></span>'
		}, {
			layout :'form',
			items : [ datagrid ]
		} ]
	});
	Ext.getCmp("endmoney").on(
			'click',
			function(btn, event) {
				var win = new Ext.Window( {
					width :800,
					height :250,
					buttons : [
							{
								text :'保存',
								handler : function() {
									var selectno = namegrid.getSelectionModel()
											.getSelected().get("bedno");
									if (selectno == '09') {
										data09.push( [ hisno++,getNowTime()]);
										datastore.loadData(data09);
									}
									if (selectno == '12') {
										data12.push( [ hisno++,getNowTime()]);
										datastore.loadData(data12);
									}
									if (selectno == '23') {
										data23.push( [ hisno++,getNowTime() ]);
										datastore.loadData(data23);
									}
									win.close();
								}
							}, {
								text :'取消',
								handler : function() {
									win.close();
								}
							} ],
					items : [ new Ext.Panel( {
						frame :true,
						height :250,
						layout :'column',
						items : [ {
							border :false,
							bodyborder :false,
							columnWidth :1,
							items : [ {
								layout :'table',
								layoutConfig : {
									columns :3
								},
								border :false,
								bodyborder :false,
								items : [ new Ext.form.Label( {
									html :'结算方式'
								}), new Ext.form.Radio( {
									boxLabel :'全部结算',
									name :'r1',
									inputValue :1
								}), new Ext.Panel( {
									layout :'table',
									layoutConfig : {
										columns :3
									},
									items : [ new Ext.form.Radio( {
										boxLabel :'分段结算，结算',
										name :'r2',
										inputValue :2
									}), new Ext.form.DateField( {
										border :false,
										bodyborder :false,
										format :'Y-m-d'
									}), new Ext.form.Label( {
										html :'日以前的单据'
									}) ]
								}) ]
							} ]
						}, {
							border :false,
							bodyborder :false,
							columnWidth :1,
							items : [ new Ext.form.ComboBox( {
								border :false,
								bodyborder :false,
								id :'typecode',
								store :typestore,
								valueField :'code',
								displayField :'type',
								mode :'local',
								forceSelection :true,
								selectOnFocus :true,
								fieldLabel :'支付方式'
							}) ]
						}, {
							border :false,
							bodyborder :false,
							columnWidth :.25,
							items : [ {
								border :false,
								bodyborder :false,
								html :'结算余额：'
							}, new Ext.form.TextField( {
								border :false,
								bodyborder :false,
								id :'balance'
							}) ]
						}, {
							border :false,
							bodyborder :false,
							columnWidth :.25,
							items : [ {
								border :false,
								bodyborder :false,
								html :'本次结算金额：'
							}, new Ext.form.TextField( {
								border :false,
								bodyborder :false,
								id :'price'
							}) ]
						}, {
							border :false,
							bodyborder :false,
							columnWidth :.25,
							items : [ {
								border :false,
								bodyborder :false,
								html :'应补现金：'
							}, new Ext.form.TextField( {
								border :false,
								bodyborder :false,
								id :'addmoney'
							}) ]
						}, {
							border :false,
							bodyborder :false,
							columnWidth :.25,
							items : [ {
								border :false,
								bodyborder :false,
								html :'应退现金：'
							}, new Ext.form.TextField( {
								border :false,
								bodyborder :false,
								id :'getmoney'
							}) ]
						}, {
							border :false,
							bodyborder :false,
							columnWidth :.25,
							items : [ {
								border :false,
								bodyborder :false,
								html :'统筹支付：'
							}, new Ext.form.TextField( {
								border :false,
								bodyborder :false,
								id :'allpay'
							}) ]
						}, {
							border :false,
							bodyborder :false,
							columnWidth :.25,
							items : [ {
								border :false,
								bodyborder :false,
								html :'个人支付：'
							}, new Ext.form.TextField( {
								border :false,
								bodyborder :false,
								id :'personpay'
							}) ]
						}, {
							border :false,
							bodyborder :false,
							columnWidth :.25,
							items : [ {
								border :false,
								bodyborder :false,
								html :'其中卡支付部分：'
							}, new Ext.form.TextField( {
								border :false,
								bodyborder :false,
								id :'cardpay'
							}) ]
						}, {
							border :false,
							bodyborder :false,
							columnWidth :.25,
							items : [ {
								border :false,
								bodyborder :false,
								html :'现金支付：'
							}, new Ext.form.TextField( {
								border :false,
								bodyborder :false,
								id :'cashpay'
							}) ]
						} ]
					}) ]
				});
				win.show();
				Ext.getCmp("typecode").setValue("01");
			});
	Ext.getCmp("combo2").setValue("01");
//	form.render("form-panel");
//	_tab = ModuleMgr.register(formArray_jiesuan);
	ModuleMgr.register(formArray_jiesuan);