class Matrix {
  constructor (numOfRows, numOfCols, placeholder = {}) {
    this.matrix = []
    this.numOfCols = numOfCols
    this.numOfRows = numOfRows
    let counter = 0
    for (let i = 0; i < numOfCols; i++) {
      let row = []
      for (let j = 0; j < numOfRows; j++) {
        let coord = {
          x: j,
          y: i
        }
        let _placeholder = Object.assign(coord, {id: counter}, placeholder)
        row.push(_placeholder)
        counter++
      }
      this.matrix.push(row)
    }
  }

  set (x, y, content) {
    this.matrix[y][x] = content
  }

  get (x, y) {
    return this.matrix[y][x]
  }
}

module.exports = Matrix