/*global d3*/
//Initialize popup
let popup = Popup()

// function getPopupEntry(d, type, label) {
//   if (!isNaN(d.popupData[type])) {
//     return "<div>" + label + ": " + d.popupData[type] + "%</div>"
//   }
//   return ""
// }

// function popupTemplate(d) {
//   let html = ""
//   html += "<h3>" + d.popupData.name + "</h3>"
//   html += getPopupEntry(d, "renewable", "Renewable")
//   html += getPopupEntry(d, "oilgascoal", "Oil, Gas & Coal")
//   html += getPopupEntry(d, "hydroelectric", "Hydroelectric")
//   html += getPopupEntry(d, "nuclear", "Nuclear")
//   return html
// }

// add eventlistener
function handleMouseover(e, d) {
  let chart = d3.select("#chart")
  let word = d.word_index
  popup.point(this).html(word).draw()
console.log(this)

  //unselected given light grey
  chart.selectAll("rect").attr("fill", "#F4F4F4")

  //selected same key words
  let rects = chart.selectAll("rect[data_index='" + word + "']")
  rects.attr("fill", "#387dce")

  //connect selected words
  //creat xy coordinates for lines
  let rect_nodes = rects.nodes()
  rect_nodes.sort((a, b) => a.__data__.x - b.__data__.x)
  let pairs = d3.zip(rect_nodes, rect_nodes.slice(1))
  let lines = pairs.map(([src, dest]) => {
    return {
      x1: parseInt(src.getAttribute("x")) + parseInt(src.getAttribute("width")),
      y1: parseInt(src.getAttribute("y")) + parseInt(src.getAttribute("height")) / 2,
      x2: parseInt(dest.getAttribute("x")),
      y2: parseInt(dest.getAttribute("y")) + parseInt(src.getAttribute("height")) / 2,
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
    }
  })
  /*
  d3.select("#summary")
    .selectAll("text .year")
    .data(textList)
    .join("text")
    .text(d => d.year)
    .attr("class", "year")
    .attr("font-size", "20px")
    .attr("x", d => d.x)
    .attr("y", d => d.y)
  d3.select("#summary")
    .selectAll("text .sentence")
    .data(textList)
    .join("text")
    .text(d => d.sentence)
    .attr("class", "sentence")
    .attr("x", d => d.x + 50)
    .attr("y", d => d.y)
    */
  d3.select("#full-text")
    .selectAll("p")
    .data(textList)
    .join("p")
    .each(function (d) {
      d3.select(this).append("div").attr("class", "year").text(d.year)
      d3.select(this).append("div").attr("class", "sentence").text(d.sentence)
    })
}

// mouse out
function handleMouseout() {
  popup.hide()
  d3.select("#chart").selectAll("rect").attr("fill", "#d3d3d3")
  d3.select("#chart").selectAll("line").remove()
  d3.select("#full-text").selectAll("p").remove()
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
