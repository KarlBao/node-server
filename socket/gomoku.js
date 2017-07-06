const ChessBoard = require('./../controller/ChessBoard')

let board = null

module.exports = function (socket) {
  console.info(`New socket connection : ${socket.id}`)
  socket.on('init', data => {
    if (board === null) {
      board = new ChessBoard(10, 10, {chess: 0})
    }
    socket.emit('initChessBoard', board.matrix)
    // board.set(1, 1, {id: 1})
  })
}
