;(function () {
  const margin = { top: 20, right: 50, bottom: 50, left: 50 }

  const width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom

  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  const colorScale = d3.scaleOrdinal().range(d3.schemeAccent)

  const xPositionScale = d3
    .scaleBand()
    .domain(["Asia", "Europe", "Africa", "N. America", "S. America", "Oceania"])
    .range([0, width])
  const yPositionScale = d3.scaleLinear().domain([0, 100]).range([height, 0])

  d3.csv("life.csv")
    .then(ready)
    .catch(function (error) {
      console.log("Failed with", error)
    })

  function ready(datapoints) {
    console.log(datapoints)

    svg
      .selectAll("rect")
      .data(datapoints)
      .enter()
      .append("rect")
      .attr("x", d => xPositionScale(d.continent))
      .attr("y", d => yPositionScale(d.lifeExpect))
      .attr("width", xPositionScale.bandwidth())
      .attr("height", d => height - yPositionScale(d.lifeExpect))
      .attr("fill", d => colorScale(d.continent))
      .attr("stroke", "black")

    const yAxis = d3.axisLeft(yPositionScale)
    svg.append("g").attr("class", "axis y-axis").call(yAxis)

    const xAxis = d3.axisBottom(xPositionScale)
    svg
      .append("g")
      .attr("class", "axis x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
  }
})()
