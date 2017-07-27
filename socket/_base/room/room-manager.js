class RoomInfo {
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

class RoomManager {
  constructor () {
    this.rooms = {}
    this.nextRoomId = {} // 新建房间时自动分配的id
  }

  getNextRoomId (channelName) {
    if (!this.nextRoomId[channelName]) {
      this.nextRoomId[channelName] = 1
    }
    const roomId = this.nextRoomId[channelName]
    this.nextRoomId[channelName]++
    return roomId
  }

  addRoom (channelName, room, game) {
    const roomId = room.roomId
    if (!this.rooms[channelName]) {
      this.rooms[channelName] = {}
      console.info(`[RoomManager] : Create new channel ${channelName}.`)
    }

    if (!this.rooms[channelName][roomId]) {
      this.rooms[channelName][roomId] = new RoomInfo(room, game)
      console.info(`[RoomManager] : Create new room ${roomId} in channel ${channelName}.`)
    }

    return this.rooms[channelName][roomId]
  }

  getRoom (channelName, roomId) {
    if (this.rooms[channelName] && this.rooms[channelName][roomId]) {
      return this.rooms[channelName][roomId]
    } else {
      return false
    }
  }

  addPlayer (channelName, roomId, socketId, player) {
    if (this.getRoom(channelName, roomId)) {
      this.rooms[channelName][roomId].addPlayer(socketId, player)
      console.info(`[RoomManager] : add player ${socketId} to room ${roomId}`)
    }
  }

  removePlayer (channelName, roomId, socketId) {
    if (this.getRoom(channelName, roomId)) {
      this.rooms[channelName][roomId].removePlayer(socketId)
      console.info(`[RoomManager] : remove player ${socketId} from room ${roomId}`)
    }

    if (Object.keys(this.rooms[channelName][roomId].players).length === 0) {
      this._removeRoom(channelName, roomId)
    }
  }

  _removeRoom (channelName, roomId) {
    if (this.getRoom(channelName, roomId)) {
      delete this.rooms[channelName][roomId]
      console.info(`[RoomManager] : remove room ${roomId} from channel ${channelName}`)
    }

    if (Object.keys(this.rooms[channelName]).length === 0) {
      this._removeChannel(channelName)
    }
  }

  _removeChannel (channelName) {
    if (this.rooms[channelName]) {
      delete this.rooms[channelName]
      console.info(`[RoomManager] : remove channel ${channelName}`)
    }
  }
}

const roomManager = new RoomManager()
module.exports = roomManager
