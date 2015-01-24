var util = require('util');
var events = require('events');

util.inherits(Counter, events.EventEmitter);

module.exports = new Counter();

/**
* Events:
*   - change:single when one number changes
*   - change:multiple  when more than one number changes
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
  this.emit('change:single', number);
};

p.clear = function clear() {
  for (var key in this.counts) {
    this.counts[key] = 0;
  }
  this.emit('change:multiple', Object.keys(this.counts));
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