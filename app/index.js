require('./lib/bind-chits');
require('./lib/bind-dice');

var counter = require('./lib/counter');
var chart = require('./lib/chart');



chart.init('#chart', counter.chartData);

counter.on('change:single', function(number) {
  console.log('number changed: ' + number)

  chart.update(counter.chartData);
});