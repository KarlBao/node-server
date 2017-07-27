const express = require('express')
let app = express() // 总服务

app.all('*', function(req, res, next) {
  // 对所有请求设置头信息
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

console.info('Server starts...')

module.exports = app
