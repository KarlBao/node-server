const Gomoku = require('./gomoku')
let rooms = []

module.exports = function (socket, channel) {
  console.info(`[New Connection] : ${socket.id} connect to gomoku`)

  // 进入房间
  socket.on('enter', (roomId = 0) => {
    if (!rooms[roomId]) {
      rooms[roomId] = {
        game: new Gomoku(roomId)
      }
    }

    const game = rooms[roomId].game
    game.enter(socket, channel)
  })
}