module.exports = function (socket) {
  console.info('in socket: demo')
  socket.on('sayhi', (msg) => {
    console.log('Say Hi')
  })
}