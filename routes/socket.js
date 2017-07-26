const express = require('express')
const router = express.Router()
const roomManager = require('./../socket/_base/room/room-manager')

router.get('/:channel/rooms', (req, res, next) => {
  const rooms = roomManager.rooms[req.params.channel]
  res.json(Object.keys(rooms))
})

module.exports = router;
