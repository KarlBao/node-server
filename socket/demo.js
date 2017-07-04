module.exports = function (socket) {
  console.info('New connection to socket: demo')
  socket.on('sayhi', (msg) => {
    console.log('Say Hi')
  })
}