const BasePlayer = require('./../_base/player')

class GomokuPlayer extends BasePlayer {
  constructor (socket) {
    super(socket)
    this.chess = null
    this.role = 0 // 默认观众身份
  }

  // 加入比赛
  join (name = 'Unknown') {
    const players = this.room.getPlayers()
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
}