const ChessBoard = require('./../controller/gomoku/ChessBoard')
const Player = require('./../controller/gomoku/Player')
const Iterator = require('./../utils/Iterator')

let board = null
let currentTurn = -1
let turnIterator = new Iterator([1, 2])

module.exports = function (socket) {
  console.info(`[New Connection] : ${socket.id}`)
  
  let player = new Player(socket)
  
  // 广播当前回合状态
  function broadcastTurn () {
    socket.emit('setTurn', currentTurn)
    socket.broadcast.emit('setTurn', currentTurn)
  }

  // 刷新玩家列表
  function updatePlayerList () {
    let allPlayers = player.getAll().map(player => {
      return {
        socketId: player.socket.id,
        name: player.name,
        chess: player.chess,
        role: player.role
      }
    })
    socket.broadcast.emit('updatePlayerList', allPlayers)
    socket.emit('updatePlayerList', allPlayers)
  }

  // 重置棋盘
  function resetChessBoard () {
    board = new ChessBoard()
    socket.emit('initChessBoard', board.matrix)
    socket.broadcast.emit('initChessBoard', board.matrix)
  }
  /**
   * 进入房间
   */
  socket.on('enter', () => {
    // 如果当前没有棋局，初始化一个新的棋盘
    if (board === null) {
      board = new ChessBoard()
    }

    // 分配玩家初始信息
    socket.emit('setSocket', player.socket.id)

    // 广播当前棋盘
    socket.emit('initChessBoard', board.matrix)

    // 更新玩家列表
    updatePlayerList()
  })

  /**
   * 加入棋局
   */
  socket.on('join', name => {
    player.join(name)
    updatePlayerList()

    if (player.getAll().some(player => player.role === 1) && player.getAll().some(player => player.role === 2)) {
      // 若1,2号选手都准备就绪，则开始比赛
      if (currentTurn === -1) {
        currentTurn = 1
        turnIterator = new Iterator([1,2]) // 重置iterator
        broadcastTurn()
      }
    }
  })

  socket.on('putChess', coord => {
    if (player.role !== currentTurn || player.chess === null) {
      return
    }
    board.putChess(coord.x, coord.y, player.chess)
    socket.broadcast.emit('putChess', coord, player.chess)

    if (board.checkWin(coord.x, coord.y) === true) {
      socket.emit('getWinner', player.role)
      socket.broadcast.emit('getWinner', player.role)
    } else {
      currentTurn = turnIterator.next()
    }
    broadcastTurn()
  })

  socket.on('disconnect', () => {
    if (player.role !== 0) {
      // 选手离开重置棋盘
      resetChessBoard()
      currentTurn = -1
      broadcastTurn()
    }
    player.leave()
    updatePlayerList()
    console.info(`[Disconnect] : ${socket.id}`)
  })
}
