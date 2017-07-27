const Gomoku = require('./gomoku')
const Room = require('./../_base/room')
const Player = require('./player')

module.exports = function (channel, socket) {
  let room = null
  let player = null
  socket.on('enter', (roomId = null) => {
    if (!Room.get(channel, roomId)) {
      Room.create(channel, new Gomoku(), roomId)
    }
    room = Room.get(channel, roomId)
    player = new Player(socket)
    player.enter(room)
  })

  socket.on('leave', () => {
    player.leave()
  })
}
