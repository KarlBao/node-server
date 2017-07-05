class Matrix {
  constructor (numOfLine, numOfCol, placeholder = '') {
    this.matrix = []
    for (let i = 0; i < numOfCol; i++) {
      let col = []
      for (let j = 0; j < numOfLine; j++) {
        col.push(placeholder)
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