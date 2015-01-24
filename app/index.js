require('./lib/bind-chits');

var counter = require('./lib/counter');
var chart = require('./lib/chart');

counter.increment(4)
counter.increment(4)
counter.increment(3)
counter.increment(2)
counter.increment(4)

chart.init('#chart', counter.chartData);

counter.on('change:single', function(number) {
  console.log('number changed: ' + number)

  chart.update(counter.chartData);
});