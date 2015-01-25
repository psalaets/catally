var util = require('util');
var events = require('events');

var storage = require('./storage');

util.inherits(Counter, events.EventEmitter);

module.exports = new Counter();

/**
* Events:
*   - change when one or more numbers change
*/
function Counter() {}

var p = Counter.prototype;

p.increment = function increment(number) {
  return storage.getCounts().then(function(counts) {
    return storage.setCount(number, counts[number] + 1);
  }).then(function() {
    this.emit('change');
  }.bind(this));
};

p.clear = function clear() {
  return storage.reset().then(function() {
    this.emit('change');
  });
};

Object.defineProperty(p, 'total', {
  get: function() {
    return storage.getCounts().then(function(counts) {
      return sumCounts(counts );
    });
  }
});

function sumCounts(counts) {
  var total = 0;

  for (var key in counts) {
    total += counts[key];
  }

  return total;
}

Object.defineProperty(p, 'chartData', {
  get: function() {
    return storage.getCounts().then(function(counts) {
      var total = sumCounts(counts);

      var chartData = [];

      for (var key in counts) {
        // prevent divide by 0
        var percent = total ? (counts[key] / total) * 100 : 0;

        chartData.push({
          number: key,
          actual: counts[key],
          percent: percent
        });
      }

      return chartData;
    });
  }
});