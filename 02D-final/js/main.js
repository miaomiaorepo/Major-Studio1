/*global d3*/

let data

function dataIsReady(csv) {
  data = csv
  //console.log(data)
  update()
}

d3.csv("data/freq_sent3.csv").then(dataIsReady)
