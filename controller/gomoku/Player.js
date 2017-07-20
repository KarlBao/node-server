let players = {}

class Player {
  constructor (socket, roomId = 0) {
    this.socket = socket
    this.name = ''
    this.chess = null
    this.roomId = roomId
    this.enter()
  }

  // 进入房间
  enter () {
    this.role = 0 // 默认观众身份
    if (!players[this.roomId]) {
      players[this.roomId] = []
    }
    players[this.roomId].push(this)
  }

  // 加入比赛
  join (name = 'Unknown') {
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
    let index = players[this.roomId].indexOf(this)
    if (index > -1) {
      players[this.roomId].splice(index, 1)
    }
    if (players[this.roomId].length === 0) {
      delete players[this.roomId]
    }
  }

  getAll () {
    return players[this.roomId]
  }
}

module.exports = Player