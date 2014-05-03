$(function(){    
	(function(){
		initPrintPage = {
			init : init	
		}
		
		function init(){
			$('.printMedicalExamBtn').click(function(){
				var json = UrlParse.parse();
				console.log(json);
				if(json.id != undefined){
					var id = json.id;
					PrintHealthFileAndExamClass.printMedicalExam(id);
				}
			});
		}
	})();
});
