const path = require('path')
const Room = require(path.resolve(__dirname, 'socket/_base/room'))
let players = {}

class Player {
  constructor (socket) {
    this.socket = socket
    this.room = null
    this.name = ''
    this.chess = null
    this.role = 0 // 默认观众身份
  }

  // 进入房间
  enter (room) {
    this.room = room
    room.enter(socket, this)
    // this.roomId = room.roomId
    // if (!players[this.roomId]) {
    //   players[this.roomId] = []
    // }
    // players[this.roomId].push(this)
  }

  // 加入比赛
  join (name = 'Unknown') {
    const players = this.getAll()
    if (!players.some(player => player.role === 1)) {
      this.role = 1
      this.chess = 1
    } else if (!players.some(player => player.role === 2)) {
      this.role = 2
      this.chess = 2
    } else {
      this.role = 0
      this.chess = null
    }
    this.name = name
  }

  // 离开房间
  leave () {
    this.room.leave(this.socket)
  }

  getAll () {
    const playersObj = this.room.getPlayers()
    const players = Object.keys(playersObj).map(socketId => playersObj[socketId])
    return players || []
  }
}

module.exports = Player