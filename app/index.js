require('./lib/init-fastclick');

require('./lib/vm/chits').bind('.chit');
require('./lib/vm/dice').bind('roll-result');

require('./lib/bind-roll-button')('roll-button');
require('./lib/bind-toggle-buttons')('#bottom-bar .toolbar-button.toggle');
require('./lib/bind-reset-button')('reset-button');

require('./lib/keyboard-shortcuts');

var debounce = require('debounce');

var counter = require('./lib/counter');
var chart = require('./lib/chart');

// Chart reacts to viewport changes

var resizeChart = debounce(function() {
  chart.resize('#chart');
}, 100);

window.addEventListener('resize', resizeChart);
window.addEventListener('orientationchange', resizeChart);

// init chart with data

counter.chartData.then(function(data) {
  chart.init('#chart', data);
});

// Chart reacts to data changes

counter.on('change', function() {
  counter.chartData.then(function(data) {
    chart.update(data);
  });
});