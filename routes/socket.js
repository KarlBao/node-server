const express = require('express')
const router = express.Router()

/* GET users listing. */
router.use('/:name', function(req, res, next) {
  const name = req.params.name
  console.info('HTTP connection: ')
  console.info(name)
})

module.exports = router;
