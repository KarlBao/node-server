const config = require('./../config')
const validRoots = config.routes.root
let routers = {}

// 注册所有路由文件
validRoots.forEach(root => {
  routers[root] = require(`./${root}`)
})

module.exports = routers
