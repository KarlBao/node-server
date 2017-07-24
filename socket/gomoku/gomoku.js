const ChessBoard = require('./../../controller/gomoku/ChessBoard')
const Iterator = require('./../../utils/Iterator')
const Game = require('./../_base/game')

class Gomoku extends Game {
  constructor (channel, roomId) {
    super(channel, roomId)
    this.board = null
    this.currentTurn = -1
    this.turnIterator = new Iterator([1, 2])
  }

  onEnter (socket, player) {
    // 广播当前回合状态
    const broadcastTurn = () => {
      this.room.emit('setTurn', this.currentTurn)
    }

    // 刷新玩家列表
    const updatePlayerList = () => {
      let allPlayers = this.room.players.map(player => {
        return {
          socketId: player.socket.id,
          name: player.name,
          chess: player.chess,
          role: player.role
        }
      })
      console.info(allPlayers)
      this.room.emit('updatePlayerList', allPlayers)
    }

    // 重置棋盘
    const resetChessBoard = () => {
      this.board = new ChessBoard()
      this.room.emit('initChessBoard', this.board.matrix)
    }

    /**
     * 初始化
     */
    socket.on('init', () => {
      // 如果当前没有棋局，初始化一个新的棋盘
      if (this.board === null) {
        this.board = new ChessBoard()
      }

      // 分配玩家初始信息
      socket.emit('setSocket', player.socket.id)

      // 广播当前棋盘
      socket.emit('initChessBoard', this.board.matrix)

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
        if (this.currentTurn === -1) {
          this.currentTurn = 1
          this.turnIterator = new Iterator([1,2]) // 重置iterator
          broadcastTurn()
        }
      }
    })

    socket.on('putChess', coord => {
      if (player.role !== this.currentTurn || player.chess === null) {
        return
      }
      this.board.putChess(coord.x, coord.y, player.chess)
      this.room.emit('putChess', coord, player.chess)

      if (this.board.checkWin(coord.x, coord.y) === true) {
        this.room.emit('getWinner', player.role)
      } else {
        this.currentTurn = this.turnIterator.next()
      }
      broadcastTurn()
    })

    socket.on('leave', () => {
      if (player.role !== 0) {
        // 选手离开重置棋盘
        resetChessBoard()
        this.currentTurn = -1
        broadcastTurn()
      }
      player.leave()
      updatePlayerList()
    })
  }
}

module.exports = Gomoku
