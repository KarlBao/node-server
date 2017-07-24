const Gomoku = require('./gomoku')
const Room = require('./../_base/room')
const Player = require('./../../controller/gomoku/Player')

module.exports = function (channel, socket) {
  let room = null
  let player = null

  socket.on('enter', (roomId) => {
    if (!Room.get(roomId)) {
      Room.create(channel, new Gomoku(channel, roomId), roomId)
    }
    room = Room.get(roomId)
    player = new Player(socket)
    player.enter(room)
    room.enter(socket)
  })
}
