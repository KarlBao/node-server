const express = require('express')
const app = express() // 总服务
const httpServer = require('./service/http')
const socketServer = require('./service/socket')
const routes = require('./routes')

app.use('/', httpServer)
// app.use(socketServer)

console.info('Server starts...')

module.exports = app
