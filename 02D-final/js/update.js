/*global d3*/
function update() {
  const layoutData = layout(data)
  console.log(layoutData)

  //column width 60
  const head_year = ["2016", "2017", "2018", "2019", "2020", "2021", "2022"]
  const dx_list = [10, 70, 130, 190, 250, 310, 370]

  //add xisx = year
  d3.select("#chart_head")
    .selectAll("text")
    .data(head_year)
    .join("text")
    .attr("x", (d, i) => +dx_list[i] +22)
    .attr("y", 25)
    .text(d => d)

  d3.select("#chart")
    .selectAll("rect")
    .data(layoutData)
    .join("rect")
    .attr("x", function (d) {
      return d.x + 10
    })
    .attr("y", function (d) {
      return d.y
    })
    .attr("width", function (d) {
      return d.width
    })
    .attr("height", function (d) {
      return d.height
    })
    .attr("data_index", function (d) {
      return d["word_index"]
    })
    // .attr("class", function (d) {
    //   return d.className
    // })
    // .text(function (d) {
    //   return d.text
    // })
    .attr("fill", "#d3d3d3")
    // interaction
    .on("mouseover", handleMouseover)
    .on("mouseout", handleMouseout)
    .on("click", handelClick)

  //add xisx = year
}
