const ctrl = require('./controller')

module.exports = (io) => {
  // middleware to validate provided token
  io.use(ctrl.authenticate)

  io.on('connection', ctrl.handleConnection(io))
}
