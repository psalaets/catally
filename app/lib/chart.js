var d3 = require('d3');

// hack: hold on to last data array for refreshing d3 on a resize
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
var margin = {top: 30, right: 20, bottom: 30, left: 20},
    width, height, xScale, yScale, xAxis, chart, svg;

function setSize(containerSelector) {
  width = parseInt(d3.select(containerSelector).style('width'), 10) - margin.left - margin.right;
  height = parseInt(d3.select(containerSelector).style('height'), 10) - margin.top - margin.bottom;
}

function resize() {
  xScale.rangeRoundBands([0, width], .1);
  xAxis.scale(xScale).orient("bottom");

  yScale.range([height, 0]);

  chart.select('.x.axis')
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.attr("width", width + margin.left + margin.right)
    .attr('height', '100%');

  updateChart(lastData);
}

function createChart(selector, data) {
  setSize(selector);

  xScale = d3.scale.ordinal()
      .domain(data.map(function(d) { return d.number; }))
      .rangeRoundBands([0, width], .1);

  yScale = d3.scale.linear()
      .domain([0, d3.max(data, function(d) { return d.percent; })])
      .range([height, 0]);

  xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom");

  svg = d3.select(selector).append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)

  chart = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  chart.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return xScale(d.number); })
      .attr("width", xScale.rangeBand())
      .attr("y", function(d) { return yScale(d.percent); })
      .attr("height", function(d) { return height - yScale(d.percent); });

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
      return xScale(d.number) + xScale.rangeBand() / 2;
    })
    .attr('y', function(d) {
      // slightly above bar
      return yScale(d.percent) - 5;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "14px")
    .attr('text-anchor', 'middle')
    .attr("fill", "black")
}

function updateChart(data) {
  var transitionMillis = 300;
  var transitionEase = 'circle';

  // adjust y scale so max is always at top
  yScale.domain([0, d3.max(data, function(d) { return d.percent; })])

  // adjust bar
  chart.selectAll(".bar")
    .data(data)
    .transition()
    .duration(transitionMillis)
    .ease(transitionEase)
    .attr("y", function(d) { return yScale(d.percent); })
    .attr("height", function(d) { return height - yScale(d.percent); })
    .attr("x", function(d) { return xScale(d.number); })
    .attr("width", xScale.rangeBand());

  // adjust labels to stay with bars
  chart.selectAll('text.label')
    .data(data)
    .transition()
    .duration(transitionMillis)
    .ease(transitionEase)
    .text(function(d) {
      // only show label for non-zero counts
      if (d.actual) {
        return d.actual;
      }
    })
    .attr('x', function(d) {
      return xScale(d.number) + xScale.rangeBand() / 2;
    })
    .attr('y', function(d) {
      return yScale(d.percent) - 5;
    })
}