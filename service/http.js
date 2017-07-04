const express = require('express')
const httpServer = express()
const routes = require('./../routes')

console.info('HTTP Service starts')
// 挂在所有路由到HTTP服务
Object.keys(routes).forEach(root => {
  httpServer.use(`/${root}`, routes[root])
})

module.exports = httpServer