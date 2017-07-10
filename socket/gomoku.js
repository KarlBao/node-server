const ChessBoard = require('./../controller/gomoku/ChessBoard')
const Player = require('./../controller/gomoku/Player')
const Iterator = require('./../utils/Iterator')

let board = null
let currentTurn = -1
let turnIterator = new Iterator([1, 2])

module.exports = function (socket) {
  console.info(`[New Connection] : ${socket.id}`)
  
  let player = new Player(socket)
  player.join() // 进入房间即尝试加入比赛
  
  if (player.getAll().some(player => player.role === 1) && player.getAll().some(player => player.role === 2)) {
    // 1,2号选手都准备就绪
    if (currentTurn === -1) {
      currentTurn = 1
    }
  }

  socket.on('init', data => {
    // 如果当前没有棋局，初始化一个新的棋盘
    if (board === null) {
      board = new ChessBoard(10, 10, {chess: null})
    }
    // 分配玩家身份
    socket.emit('initRole', player.role)
    // 初始棋局
    socket.emit('initChessBoard', board.matrix)
    // 广播当前回合状态
    socket.broadcast.emit('switchTurn', currentTurn)
    socket.emit('switchTurn', currentTurn)
    // 刷新玩家列表
    let allPlayers = player.getAll().map(player => {
      return {
        socketId: player.socket.id,
        chess: player.chess,
        role: player.role
      }
    })
    socket.broadcast.emit('updatePlayerList', allPlayers)
    socket.emit('updatePlayerList', allPlayers)
  })

  socket.on('putChess', coord => {
    if (player.role !== currentTurn || player.chess === null) {
      return
    }
    board.putChess(coord.x, coord.y, player.chess)
    socket.broadcast.emit('putChess', coord, player.chess)

    currentTurn = turnIterator.next()
    socket.broadcast.emit('switchTurn', currentTurn)
    socket.emit('switchTurn', currentTurn)
  })

  socket.on('disconnect', () => {
    if (player.role !== 0) {
      // 选手离开重置棋盘
      board = new ChessBoard(10, 10, {chess: null})
      currentTurn = -1
      socket.broadcast.emit('initChessBoard', board.matrix)
      socket.broadcast.emit('switchTurn', currentTurn)
    }
    player.leave()
    console.info(`[Disconnect] : ${socket.id}`)
  })
}
