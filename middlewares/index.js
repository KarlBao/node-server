const responseHandler = require('./response') // 处理正确响应的中间件
const errorHandler = require('./error') // 处理错误响应的中间件

module.exports = {
  responseHandler,
  errorHandler
}
