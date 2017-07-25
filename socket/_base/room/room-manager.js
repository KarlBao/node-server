class RoomManager {
  constructor (room = null, game = null, players = {}) {
    this.room = room
    this.game = game
    this.players = players

    if (game.bindRoom) {
      game.bindRoom(room)
    }
  }

  addPlayer (socket, player) {
    this.players[socket] = player
  }

  removePlayer (socket) {
    if(this.players[socket]) {
      delete this.players[socket]
    }
  }
}

module.exports = RoomManager
