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

  checkWin (x, y) {
    const chess = this.get(x, y).chess
    const lengthToWin = 5
    if (chess === null) { return false }

    const getContinuousLength = (xOffset, yOffset) => {
      let cx = x + xOffset
      let cy = y + yOffset
      let continuousLength = 0
      while (cx >= 0 && cx < this.numOfCols && cy >= 0 && cy < this.numOfRows && this.get(cx, cy).chess === chess) {
        continuousLength++
        cx = cx + xOffset
        cy = cy + yOffset
      }
      return continuousLength
    }

    if (getContinuousLength(-1, -1) + getContinuousLength(1, 1) + 1 >= lengthToWin
      || getContinuousLength(-1, 0) + getContinuousLength(1, 0) + 1 >= lengthToWin
      || getContinuousLength(-1, 1) + getContinuousLength(1, -1) + 1 >= lengthToWin
      || getContinuousLength(0, -1) + getContinuousLength(0, 1) + 1 >= lengthToWin
    ) {
      return true
    }
    return false
  }
}

module.exports = ChessBoard