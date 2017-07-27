const middleware = require('./../middlewares')
const config = require('./../config')
const validRoots = config.routes.root

let routers = {}

// 注册所有路由文件
validRoots.forEach(root => {
  routers[root] = require(`./${root}`)
  
  // 定义路由层中间件处理响应
  routers[root].use(middleware.responseHandler(), middleware.errorHandler())
})

module.exports = routers
