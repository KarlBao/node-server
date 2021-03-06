const http = require('http')
const sockets = require('./../socket')
const socketIO = require('socket.io')

module.exports = function (socketServer) {
  console.info('[Service] Socket starts')
  const io = socketIO(socketServer, {
    origins: '*:*'
  })

  Object.keys(sockets).forEach(name => {
    const channel = io.of(`/${name}`)
    channel.on('connection', socket => {
      sockets[name](channel, socket)
    })
    console.log(`[Socket] Channel '${name}' is ready`)
  })

  return socketServer
}