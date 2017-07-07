const Matrix = require('./../_base/matrix')

class ChessBoard extends Matrix {
  putChess (x, y, chess) {
    let grid = this.get(x, y)
    grid.chess = chess
    this.set(x, y, grid)
  }
}

module.exports = ChessBoard