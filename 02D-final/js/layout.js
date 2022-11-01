/*global d3*/
function layout(data) {
  const cellWidth = config.width / config.numColumns
  const cellHeight = 5

  // let xOffset = 100
  // let yOffset = 5
  let wordWidth = 30
  let wordHeight = 3
  //let cellHeight = 5

  let layoutData = data.map(function (d, i) {
    let item = {}

    let column = i % config.numColumns
    let row = Math.floor(i / config.numColumns)

    item.x = cellWidth * column
    item.y = cellHeight * row

    item.width = wordWidth
    item.height = wordHeight
    item["word_index"] = d.word
    //item.className = d.year
    item.text = d.word
    item.sentence = d.text
    item.year = d.year

    return item
  })

  return layoutData
}
