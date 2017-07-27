// 处理正确业务的响应
module.exports = function (opts = {}) {
  return function (req, res, next) {
    if (!res.body) {
      res.body = ''
    }
    res.body = {
      code: 0,
      data: res.body,
      msg: 'ok'
    }
    res.send(res.body)
  }
}