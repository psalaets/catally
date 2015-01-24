var d3 = require('d3');

module.exports = {
  init: function(selector, data) {
    createChart(selector, data);
  },
  update: function(data) {
    updateChart(data);
  }
};

// based off of http://bl.ocks.org/mbostock/3885304

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    x, y, xAxis, svg;

function createChart(selector, data) {
  x = d3.scale.ordinal()
      .domain(data.map(function(d) { return d.number; }))
      .rangeRoundBands([0, width], .1);

  y = d3.scale.linear()
      .domain([0, d3.max(data, function(d) { return d.actual; }) || 20])
      .range([height, 0]);

  xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  svg = d3.select(selector).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("fill", "#00f")
      .attr("x", function(d) { return x(d.number); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.actual); })
      .attr("height", function(d) { return height - y(d.actual); });
}

function updateChart(data) {
  svg.selectAll(".bar")
    .data(data)
    .transition()
    .duration(500)
    .ease('elastic')
    .attr("y", function(d) { return y(d.actual); })
    .attr("height", function(d) { return height - y(d.actual); });
}