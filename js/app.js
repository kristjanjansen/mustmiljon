var ds = new Miso.Dataset({
  importer : Miso.Dataset.Importers.GoogleSpreadsheet,
  parser : Miso.Dataset.Parsers.GoogleSpreadsheet,
  key : "0AjuiYlqIySuFdEV5cHdJdW5hbkhJdFdMM19LZTd1TEE",
  worksheet : "1",
  fast : true,
  comparator : function(r1, r2) {
      if (r1.value > r2.value) {return 1;}
      if (r1.value < r2.value) {return -1;}
      return 0;
  },
});

var baseRows = []
var stepRows = [];
var step = 1;

ds.fetch({ 
  success : function() {
    ds.each(function(row, rowIndex) {
      if (row.disabled !== 'yes') {
        baseRows.push(row);
      }
    });
    
    stepRows.push(baseRows[0]);
    
    drawTreemap(stepRows);

    $("#treemap").live("click", function(event) {
      stepRows = [];
      for (var i = 0; i < baseRows.length; i++) {
        if (i <= step)
          stepRows.push(baseRows[i])
      };
      drawTreemap(stepRows)
      step++
    });

  }
})



function drawTreemap(rows) {
  $('#treemap').treemap(rows, {
    mouseenter: function (node, box) {
      $('.legend').html('<span class="label">' + node.label + '</span> <span class="value">' + (node.value / 1000000).toFixed(1) + '</span> miljonit €');
    },
    mouseleave: function (node, box) {
      $('.legend').html('');
    }
  });
}