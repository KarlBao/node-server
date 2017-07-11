const Matrix = require('./../_base/matrix')

class ChessBoard extends Matrix {
  constructor (numOfRows = 13, numOfCols = 13, placeholder = {chess: null}) {
    super(numOfRows, numOfCols, placeholder)
  }
  putChess (x, y, chess) {
    let grid = this.get(x, y)
    grid.chess = chess
    this.set(x, y, grid)
  }
}

module.exports = ChessBoard