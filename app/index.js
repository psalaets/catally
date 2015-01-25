require('./lib/init-fastclick');
require('./lib/bind-chits');
require('./lib/bind-roll-button');
require('./lib/bind-toggle-buttons');
require('./lib/bind-reset-button');
require('./lib/keyboard-shortcuts');

var debounce = require('debounce');

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
  counter.chartData.then(function(data) {
    chart.update(data);
  });
});