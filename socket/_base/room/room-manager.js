class RoomManager {
  constructor (room = null, game = null, players = {}) {
    this.room = room
    this.game = game
    this.players = players

    if (game.bindRoom) {
      game.bindRoom(room)
    }
  }

  addPlayer (socketId, player) {
    this.players[socketId] = player
  }

  removePlayer (socketId) {
    if(this.players[socketId]) {
      delete this.players[socketId]
    }
  }
}

module.exports = RoomManager
