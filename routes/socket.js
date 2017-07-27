const express = require('express')
const router = express.Router()
const roomManager = require('./../socket/_base/room/room-manager')

router.get('/rooms', (req, res, next) => {
  if (!req.query.channel) {
    next('Invalid params')
    return
  } else {
    const rooms = roomManager.rooms['/' + req.query.channel]
    console.info(roomManager.rooms)
    let data = []
    if (rooms) {
      data = Object.keys(rooms)
    }
    res.body = data
    next()
  }
})

router.post('/createRoom', (req, res, next) => {
  if (!req.query.channel) {
    next('Invalid params')
    return
  } else {
    const roomId = roomManager.getNextRoomId('/' + req.query.channel)
    res.body = {
      roomId: roomId
    }
    next()
  }
})
module.exports = router;
