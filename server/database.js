const mongoose = require('mongoose')

const { MONGODB_URI, MONGODB_DEBUG = false } = process.env

const defaultOptions = {
  promiseLibrary: global.Promise,
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 3,
}

const connect = (dbURI = MONGODB_URI, options = {}) => {
  mongoose.set('debug', MONGODB_DEBUG === 'true')

  mongoose.connection
    .once('open', _ => console.log(`Connected to database with success. [${MONGODB_URI}]`))
    .on('error', _ => console.log('Error connecting to database', _))
    .on('disconnect', _ => console.log('Database disconnected!', _))

  // Merge options with defaults
  const driverOptions = Object.assign(defaultOptions, options)

  // Use Promise from options (mongoose)
  mongoose.Promise = driverOptions.promiseLibrary

  // Connect
  mongoose.connect(dbURI, driverOptions)

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => process.exit(0))
  })

  return mongoose
}

module.exports = connect
