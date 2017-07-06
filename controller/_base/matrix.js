class Matrix {
  constructor (numOfRows, numOfCols, placeholder = {}) {
    this.matrix = []
    let counter = 0
    for (let i = 0; i < numOfCols; i++) {
      let col = []
      for (let j = 0; j < numOfRows; j++) {
        let coord = {
          x: i,
          y: j
        }
        let _placeholder = Object.assign(coord, {id: counter}, placeholder)
        col.push(_placeholder)
        counter++
      }
      this.matrix.push(col)
    }
  }

  set (x, y, content) {
    this.matrix[x][y] = content
  }

  get (x, y) {
    return this.matrix[x][y]
  }
}

module.exports = Matrix