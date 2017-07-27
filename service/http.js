const express = require('express')
const routes = require('./../routes')

module.exports = function (server) {
  console.info('[Service] HTTP starts')
  // 挂在所有路由到HTTP服务
  Object.keys(routes).forEach(root => {
    server.use(`/${root}`, routes[root])
  })
}
