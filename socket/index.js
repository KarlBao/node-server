// const express = require('express')
// const socketApp = express()
// const server = require('http').createServer(socketApp)
// const io = require('socket.io')(server)

const demoSocket = require('./demo')

const sockets = {
  demo: demoSocket
}

module.exports = sockets