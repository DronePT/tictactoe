require('dotenv').config()

const http = require('http')
const socketio = require('socket.io')
const Express = require('express')

// middlewares
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = new Express()
const server = http.Server(app)
const io = socketio(server)

const connectDatabase = require('./database')
const startSocketioServer = require('./websocket/server')
const serveReactApp = require('./serveReactApp')
const api = require('./api')

// environment variables
const PORT = process.env.PORT || 1337
const isDev = process.env.NODE_ENV === 'development'

// apply cors for all origins
app.use(cors())

// parse json's request body
app.use(bodyParser.json())

// log requests
app.use(morgan(isDev ? 'dev' : 'combined'))

// assign api resources
app.use(api)

// serve routes related with react app
serveReactApp(app)

app.use((err, req, res, next) => {
  if (err.name !== 'APIError') return next(err)

  const { name: error, code, message } = err

  return res.status(code).json({ error, message })
})

// connect database
connectDatabase()

// start socket.io server for realtime communications
startSocketioServer(io)

server.listen(PORT, () => console.log(`Server running on port ${PORT}. (http://localhost:${PORT})`))
