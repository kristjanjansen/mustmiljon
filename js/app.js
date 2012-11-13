var ds = new Miso.Dataset({
  importer : Miso.Dataset.Importers.GoogleSpreadsheet,
  parser : Miso.Dataset.Parsers.GoogleSpreadsheet,
  key : "0AjuiYlqIySuFdEV5cHdJdW5hbkhJdFdMM19LZTd1TEE",
//  key : "0Asnl0xYK7V16dFpFVmZUUy1taXdFbUJGdGtVdFBXbFE",
  worksheet : "1",
  fast : true
});

var rows = []

ds.fetch({ 
  success : function() {

    ds.each(function(row, rowIndex) {
      rows.push(row);      
    });

      	$('#treemap').treemap(rows, {
  			nodeClass: function(node, box){
              	if(node.value <= 50){
              		return 'minor';
              	}
              	return 'major';
          	},
          	mouseenter: function (node, box) {
          		$('.legend').html(node.label);
          	},
          	mouseleave: function (node, box) {
          		$('.legend').html('');
          	}
  		});

    
  }
})
