let players = []

class Player {
  constructor (socket) {
    this.socket = socket
    this.name = ''
    this.chess = null
    this.enter()
  }

  // 进入房间
  enter () {
    this.role = 0 // 默认观众身份
    players.push(this)
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
    let index = players.indexOf(this)
    if (index > -1) {
      players.splice(index, 1)
    }
  }

  getAll () {
    return players
  }
}

module.exports = Player