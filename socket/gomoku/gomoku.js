const ChessBoard = require('./../../controller/gomoku/ChessBoard')
const Iterator = require('./../../utils/Iterator')
const Game = require('./../_base/game')

class Gomoku extends Game {
  constructor () {
    super()
    this.board = null
    this.currentTurn = -1
    this.turnIterator = new Iterator([1, 2])
  }

  onEnter (socket, player) {
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
      this._updatePlayerList()
    })

    /**
     * 加入棋局
     */
    socket.on('join', name => {
      player.join(name)
      this._updatePlayerList()

      if (this.room.getPlayers().some(player => player.role === 1) && this.room.getPlayers().some(player => player.role === 2)) {
        // 若1,2号选手都准备就绪，则开始比赛
        if (this.currentTurn === -1) {
          this.currentTurn = 1
          this.turnIterator = new Iterator([1,2]) // 重置iterator
          this.room.emit('setTurn', this.currentTurn)
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
      this.room.emit('setTurn', this.currentTurn)
    })
  }

  onLeave (socket, player) {
    if (player.role !== 0) {
      // 选手离开重置棋盘
      this.board = new ChessBoard()
      this.room.emit('initChessBoard', this.board.matrix)
      this.currentTurn = -1
      this.room.emit('setTurn', this.currentTurn)
    }
    this._updatePlayerList()
  }

  // 私有方法
  _updatePlayerList () {
    let allPlayers = this.room.getPlayers().map(player => {
      return {
        socketId: player.socket.id,
        name: player.name,
        chess: player.chess,
        role: player.role
      }
    })
    this.room.emit('updatePlayerList', allPlayers)
  }
}

module.exports = Gomoku
