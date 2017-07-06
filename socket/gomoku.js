const ChessBoard = require('./../controller/ChessBoard')

let board = null
let players = [
  {
    role: 1, // 黑子棋手
    socketId: null
  },
  {
    role: 2, // 白子棋手
    socketId: null
  }
]
module.exports = function (socket) {
  console.info(`New socket connection : ${socket.id}`)
  let role = 0 // 0: 观众, 1: 执黑子, 2: 执白子
  let player = players.find(player => {
    return player.socketId === null
  })
  if (player) {
    role = player.role
    player.socketId = socket.id
  }

  socket.on('init', data => {
    if (board === null) {
      board = new ChessBoard(10, 10, {chess: 0})
    }
    socket.emit('initRole', role)
    socket.emit('initChessBoard', board.matrix)
    // board.set(1, 1, {id: 1})
  })

  socket.on('putChess', coord => {
    if (player.role === 0) {
      // 观众没有权限
      return
    }
    let chess = player.role
    board.putChess(coord.x, coord.y, chess)
    socket.broadcast.emit('putChess', coord, chess)
  })

  socket.on('disconnect', () => {
    let player = players.find(player => {
      return player.socketId === socket.id
    })
    player.socketId = null
    console.info(`Disconnect : ${socket.id}`)
  })
}
