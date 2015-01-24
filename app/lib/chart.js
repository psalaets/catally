var d3 = require('d3');

var lastData;

module.exports = {
  init: function(selector, data) {
    createChart(selector, data);
    lastData = data;
  },
  update: function(data) {
    updateChart(data);
    lastData = data;
  },
  resize: function(containerSelector) {
    setSize(containerSelector);
    resize();
  }
};

// based off of http://bl.ocks.org/mbostock/3885304
var margin = {top: 20, right: 20, bottom: 30, left: 20},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    x, y, xAxis, chart, svg;


function setSize(containerSelector) {
  width = parseInt(d3.select(containerSelector).style('width'), 10) - margin.left - margin.right;
  height = parseInt(d3.select(containerSelector).style('height'), 10) - margin.top - margin.bottom;

  console.log('setSize: width is now ' + width + ' and height is now ' + height)
}

function resize() {
  x.rangeRoundBands([0, width], .1);
  xAxis.scale(x).orient("bottom");

  y.range([height, 0]);

  chart.select('.x.axis')
    .attr('transform', function() {
      return "translate(0," + height + ")";
    })
    //.attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.attr('width', function() {
      return width + margin.left + margin.right;
    })
    //.attr("width", width + margin.left + margin.right)
    .attr('height', function() {
      return height + margin.top + margin.bottom;
    })

  updateChart(lastData);
}

function createChart(selector, data) {
  setSize(selector);

  x = d3.scale.ordinal()
      .domain(data.map(function(d) { return d.number; }))
      .rangeRoundBands([0, width], .1);

  y = d3.scale.linear()
      .domain([0, d3.max(data, function(d) { return d.percent; })])
      .range([height, 0]);

  xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  svg = d3.select(selector).append('svg')
      .attr('width', function() {
        return width + margin.left + margin.right;
      })
      //.attr("width", width + margin.left + margin.right)
      .attr('height', function() {
        return height + margin.top + margin.bottom;
      })
      //.attr("height", height + margin.top + margin.bottom)

  chart = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  chart.append("g")
      .attr("class", "x axis")
      .attr('transform', function() {
        return "translate(0," + height + ")";
      })
      //.attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  chart.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("fill", "#0f0")
      .attr("x", function(d) { return x(d.number); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.percent); })
      .attr("height", function(d) { return height - y(d.percent); });

  // labels
  chart.selectAll('text.label')
    .data(data)
    .enter()
    .append('text')
    .attr('class', 'label')
    .text(function(d) {
      // only show label for non-zero counts
      if (d.actual) {
        return d.actual;
      }
    })
    .attr('x', function(d) {
      // middle-ish of bar
      return x(d.number) + x.rangeBand() / 2;
    })
    .attr('y', function(d) {
      // slightly above bar
      return y(d.percent) - 5;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "14px")
    .attr('text-anchor', 'middle')
    .attr("fill", "black")
}

function updateChart(data) {
  // adjust y scale so max is always at top
  y.domain([0, d3.max(data, function(d) { return d.percent; })])

  // adjust bar
  chart.selectAll(".bar")
    .data(data)
    .transition()
    .duration(500)
    .ease('circle')
    .attr("y", function(d) { return y(d.percent); })
    .attr("height", function(d) { return height - y(d.percent); })
    .attr("x", function(d) { return x(d.number); })
    .attr("width", x.rangeBand());

  // adjust labels to stay with bars
  chart.selectAll('text.label')
    .data(data)
    .transition()
    .duration(500)
    .ease('circle')
    .text(function(d) {
      // only show label for non-zero counts
      if (d.actual) {
        return d.actual;
      }
    })
    .attr('x', function(d) {
      return x(d.number) + x.rangeBand() / 2;
    })
    .attr('y', function(d) {
      return y(d.percent) - 5;
    })
}