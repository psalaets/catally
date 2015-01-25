var util = require('util');
var events = require('events');

util.inherits(Counter, events.EventEmitter);

module.exports = new Counter();

/**
* Events:
*   - change when one or more numbers change
*/
function Counter() {
  this.counts = {};
  for (var i = 2; i < 13; i++) {
    this.counts[i] = 0;
  }
}

var p = Counter.prototype;

p.increment = function increment(number) {
  this.counts[number] += 1;
  this.emit('change');
};

p.clear = function clear() {
  for (var key in this.counts) {
    this.counts[key] = 0;
  }
  this.emit('change');
};

Object.defineProperty(p, 'total', {
  get: function() {
    var total = 0;

    for (var key in this.counts) {
      total += this.counts[key];
    }

    return total;
  }
});

Object.defineProperty(p, 'chartData', {
  get: function() {
    var total = this.total;

    var chartData = [];

    for (var key in this.counts) {
      // prevent divide by 0
      var percent = total ? (this.counts[key] / total) * 100 : 0;

      chartData.push({
        number: key,
        actual: this.counts[key],
        percent: percent
      });
    }

    return chartData;
  }
});