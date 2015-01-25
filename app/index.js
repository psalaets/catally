var debounce = require('debounce');

require('./lib/bind-chits');
require('./lib/bind-dice');
require('./lib/bind-bottom-toolbar-buttons');

var counter = require('./lib/counter');
var chart = require('./lib/chart');

var resizeChart = debounce(function() {
  chart.resize('#chart');
}, 100);

window.addEventListener('resize', resizeChart);
window.addEventListener('orientationchange', resizeChart);

counter.chartData.then(function(data) {
  chart.init('#chart', data);
});

counter.on('change', function() {
  console.log('number changed')

  counter.chartData.then(function(data) {
    chart.update(data);
  });
});