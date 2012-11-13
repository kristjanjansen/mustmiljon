var ds = new Miso.Dataset({
  importer : Miso.Dataset.Importers.GoogleSpreadsheet,
  parser : Miso.Dataset.Parsers.GoogleSpreadsheet,
  key : "0AjuiYlqIySuFdEV5cHdJdW5hbkhJdFdMM19LZTd1TEE",
  worksheet : "1",
  fast : true
});

var rows = []

ds.fetch({ 
  success : function() {

    ds.each(function(row, rowIndex) {
      if (row.disabled !== 'yes') {
        rows.push(row);
      }
    });

    $('#treemap').treemap(rows, {
      mouseenter: function (node, box) {
        $('.legend').html('<span class="label">' + node.label + '</span> <span class="value">' + (node.value / 1000000).toFixed(1) + '</span> miljonit €');
      },
      mouseleave: function (node, box) {
        $('.legend').html('');
      }
    });

    
  }
})
