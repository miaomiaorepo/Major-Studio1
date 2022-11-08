/*global d3*/
function update() {
  const layoutData = layout(data)
  const colorScale = d3.scaleOrdinal().domain(layoutData).range(d3.schemeTableau10)

  //column width 60
  //create x axis data
  const head_year = ["2016", "2017", "2018", "2019", "2020", "2021", "2022"]
  const dx_list = [10, 70, 130, 190, 250, 310, 370]

  //add x axis
  d3.select("#chart_head")
    .selectAll("text")
    .data(head_year)
    .join("text")
    .attr("x", (d, i) => +dx_list[i] + 22)
    .attr("y", 25)
    .text(d => d)

  //add preset words
  const preset_list = [
    "countries",
    "COVID-19",
    "health",
    "children",
    "women",
    "water",
    "climate",
    "growth",
    "human",
    "Ukraine",
  ]
  const preset_y = [0, 30, 45, 60, 72, 125, 138, 184, 232, 328]

  d3.select("#preset-text")
    .selectAll("text")
    .data(preset_list)
    .join("text")
    .attr("x", 0)
    .attr("y", (d, i) => +preset_y[i] + 10)
    .text(d => d)
    .attr("fill", function (d) {
      return colorScale(d)
    })

  //creat groups
  function initializeGroup(g) {
    g.classed("word", true)

    g.append("rect").classed("wordArea", true)
    g.append("rect")
      .classed("sensorArea", true)
      .on("mouseover", handleMouseover)
      .on("mouseout", handleMouseout)
      .on("click", handelClick)
  }

  function updateGroup(d, i) {
    let g = d3.select(this)

    if (g.select("*").empty()) initializeGroup(g)

    g.attr("transform", "translate(" + (d.x + 10) + "," + d.y + ")")
      .attr("data_index", function (d) {
        return d["word_index"]
      })
      .attr("preset", d => d.preset)

    g.select(".sensorArea")
      .attr("width", function (d) {
        return d.sensorWidth
      })
      .attr("height", function (d) {
        return d.sensorHeight
      })
      .attr("fill-opacity", "0.0")

    g.select(".wordArea")
      .attr("width", function (d) {
        return d.width
      })
      .attr("height", function (d) {
        return d.height
      })
      .attr("fill", "#d3d3d3")
      .attr("data_index", function (d) {
        return d["word_index"]
      })
  }

  //draw rect for each g
  d3.select("#chart").selectAll("g").data(layoutData).join("g").each(updateGroup)

  //preset 10 words

  d3.selectAll("g[preset='yes']")
    .append("rect")
    .classed("preset", true)
    .attr("width", function (d) {
      return d.width
    })
    .attr("height", function (d) {
      return d.height
    })
    .attr("fill", function (d) {
      return colorScale(d["word_index"])
    })
  // .attr("data_index", function (d) {
  //   return d["word_index"]
  // })
  // .text(function (d) {
  //   return d["word_index"]
  // })

  // d3.select(".preset")
  //   .append("text")
  //   .attr("x", 0)
  //   .attr("y", 50)
  //   .text(function (d) {
  //     return d.word_index
  //   })
}
