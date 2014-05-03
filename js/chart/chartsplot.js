
	var chartTools = {
		container: null,
		init: function (contentId) {
				$("#" + contentId).modal({
					overlayId: 'overlay-overlay',
					containerId: 'overlay-container',
					closeHTML: null,
					minHeight: 60,
					minWidth: "700px",
					opacity: 65, 
					position: ["2%","3%"],
					overlayClose: true,
					onOpen: function (d) {
							var self = this;
							self.container = d.container[0];
							d.overlay.fadeIn('slow', function () {
								$("#" + contentId, self.container).show();
								var title = $("#chartTitle", self.container);
								title.show();
								d.container.slideDown('slow', function () {
									setTimeout(function () {
										var h = $("#chartContent", self.container).height()
											+ title.height()
											+ 20; 
										var w = $("#chartContent", self.container).width()
											+ title.width()
											+ 100; 
										d.container.animate(
											{height: h,width:w}, 
											200,
											function () {
												$("div.close", self.container).show();
												$("#chartContent", self.container).show();
											}
										);
									}, 300);
								});
							})
						},
					onClose:function (d) {
						var self = this; 
						d.container.animate(
							{top:"-" + (d.container.height() + 20)},
							500,
							function () {
								self.close(); // 
							}
						);
					}
				});

		}

	};
	//chartTools.init("indi1Id","overlay-modal-content");

