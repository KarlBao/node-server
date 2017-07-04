const express = require('express')
const app = express()
const socketServer = require('http').Server(app)
const sockets = require('./../socket')
const io = require('socket.io')(socketServer, {
  // options
})

console.info('Socket Service starts')

Object.keys(sockets).forEach(name => {
  const channel = io.of(name)
  channel.on('connection', sockets[name])
})

module.exports = socketServer