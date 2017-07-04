const express = require('express')
const app = express()
const routes = require('./routes')

// 挂在所有路由到服务
Object.keys(routes).forEach(root => {
  app.use(`/${root}`, routes[root])
})

console.info('Server starts...')

module.exports = app
