module.exports = function (socket) {
  socket.on('sayhi', (msg) => {
    console.log('Say Hi')
  })
}