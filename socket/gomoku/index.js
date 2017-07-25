const Gomoku = require('./gomoku')
const Room = require('./../_base/room')
const Player = require('./player')

module.exports = function (channel, socket) {
  let room = null
  let player = null
  socket.on('enter', (roomId = 0) => {
    roomId = Math.floor(Math.random() * 3)
    if (!Room.get(roomId)) {
      Room.create(channel, new Gomoku(), roomId)
    }
    room = Room.get(roomId)
    player = new Player(socket)
    player.enter(room)
  })

  socket.on('leave', () => {
    player.leave()
  })
}
