// 业务错误时，处理响应的中间件
module.exports = function (opts = {}) {
  return function (err, req, res, next) {
    if (!res.body) {
      res.body = ''
    }
    res.body = {
      code: -100,
      data: res.body,
      msg: err
    }
    res.send(res.body)
  }
}