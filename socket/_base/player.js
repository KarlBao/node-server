const path = require('path')
const Room = require('./room')

class Player {
  constructor (socket) {
    this.socket = socket
    this.room = null
    this.name = socket.id
  }

  /**
   * 进入房间
   * @param {Room} room 
   * @memberof Player
   */
  enter (room) {
    this.room = room
    room.enter(socket, this)
    socket.on('disconnect', () => {
      this.leave()
    })
  }

  /**
   * 离开房间
   * 玩家断线或触发 leave 事件时会自动调用
   * @memberof Player
   */
  leave () {
    this.room.leave(this.socket)
  }
}

module.exports = Player