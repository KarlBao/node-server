const http = require('http')
const sockets = require('./../socket')
const socketIO = require('socket.io')

module.exports = function (socketServer) {
  console.info('[Service] Socket starts')
  const io = socketIO(socketServer, {
    // options
  })

  Object.keys(sockets).forEach(name => {
    const channel = io.of(`/${name}`)
    channel.on('connection', sockets[name])
    console.log(`[Socket] Channel '${name}' is ready`)
  })

  return socketServer
}