const ChessBoard = require('./../controller/ChessBoard')

let board = new ChessBoard(10, 10, {id: 0})

module.exports = function (socket) {
  console.info('New socket connection to channel : demo')
  socket.on('sayhi', (msg) => {
    console.info('say hi from client')
    socket.emit('sayhi', socket.id)
    // board.set(1, 1, {id: 1})
  })
}