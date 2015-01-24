var debounce = require('debounce');

require('./lib/bind-chits');
require('./lib/bind-dice');

var counter = require('./lib/counter');
var chart = require('./lib/chart');

var resizeChart = debounce(function() {
  chart.resize('#chart');
}, 100);

window.addEventListener('resize', resizeChart);
window.addEventListener('orientationchange', resizeChart);

chart.init('#chart', counter.chartData);

counter.on('change:single', function(number) {
  console.log('number changed: ' + number)

  chart.update(counter.chartData);
});