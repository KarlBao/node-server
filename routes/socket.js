const express = require('express')
const socketIO = require('socket.io')
const router = express.Router()
const sockets = require('./../socket')

/* GET users listing. */
router.use('/:name', function(req, res, next) {
  const name = req.params.name
  let socket = sockets[name]
  socket(socketIO)
})

module.exports = router;
