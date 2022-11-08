/*global d3*/
//Initialize popup
let popup = Popup()

// add eventlistener
function handleMouseover(e, d) {
  let chart = d3.select("#chart")
  let word = d.word_index
  popup.point(this).html(word).draw()

  //unselected given light grey
  chart.selectAll(".wordArea").attr("fill", "#F4F4F4")
  chart.selectAll(".preset").remove()
  d3.select("#preset-text").selectAll("text").remove()

  //selected same key words group
  let rects = chart.selectAll("g[data_index='" + word + "']")
  //color wordArea to blue
  rects.selectAll(".wordArea").attr("fill", "#387dce")

  //connect selected words
  //creat xy coordinates for lines
  let rect_nodes = rects.nodes()

  rect_nodes.sort((a, b) => a.__data__.x - b.__data__.x)

  let pairs = d3.zip(rect_nodes, rect_nodes.slice(1))

  let lines = pairs.map(([src, dest]) => {
    let srcx = src.getAttribute("transform").replace("translate(", "").replace(")", "").split(",")[0]
    let srcy = src.getAttribute("transform").replace("translate(", "").replace(")", "").split(",")[1]
    let destx = dest.getAttribute("transform").replace("translate(", "").replace(")", "").split(",")[0]
    let desty = dest.getAttribute("transform").replace("translate(", "").replace(")", "").split(",")[1]
    return {
      x1: parseInt(srcx) + 30,
      y1: parseInt(srcy) + 2,
      x2: parseInt(destx),
      y2: parseInt(desty) + 2,
    }
  })

  //d3 draw lines between words
  chart
    .selectAll("line")
    .data(lines)
    .join("line")
    .attr("x1", d => d.x1)
    .attr("y1", d => d.y1)
    .attr("x2", d => d.x2)
    .attr("y2", d => d.y2)
    .style("stroke", "grey")
    .style("stroke-width", "1")

  //creat summary
  let textList = rect_nodes.map((x, idx) => {
    return {
      year: x.__data__.year,
      sentence: x.__data__.sentence,
      x: 400,
      y: 50 + 20 * idx,
      word: x.__data__.word_index,
    }
  })

  d3.select("#full-text")
    .selectAll("p")
    .data(textList)
    .join("p")
    .each(function (d) {
      // d3.select(this).html(null)
      d3.select(this).append("div").attr("class", "year").text(d.year)
      d3.select(this).append("div").attr("class", "sentence").text(d.sentence)
    })
}

// mouse out
function handleMouseout() {
  popup.hide()

  d3.select("#chart").selectAll("line").remove()
  d3.select("#full-text").selectAll("p").remove()

  //recover to unselected status
  d3.selectAll(".wordArea").attr("fill", "#d3d3d3")

  // preset color bars back
  const colorScale = d3.scaleOrdinal().domain(data).range(d3.schemeTableau10)

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
    .attr("data_index", function (d) {
      return d["word_index"]
    })

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
}

//download svg
function handelClick() {
  let svg = d3.select("#wrapper svg").attr("version", 1.1).attr("xmlns", "http://www.w3.org/2000/svg").node()
    .parentNode.innerHTML
  let dataUrl = "data:image/svg+xml," + encodeURIComponent(svg)

  var a = document.createElement("a")
  a.download = "sample.svg"
  a.href = dataUrl
  a.click()
}
