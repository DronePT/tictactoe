const { Router } = require('express')
const ctrl = require('./api.controller')

const router = new Router()

router.post('/connect', ctrl.createConnection)

module.exports = router
