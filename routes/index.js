const express = require('express');
const router = express.Router();

// 合法路由入口
const validRouters = [
  'socket'
]

validRouters.forEach(route => {
  let routePath = `./${route}`
  router.use(`/${route}`, require(routePath))
})

module.exports = router;
