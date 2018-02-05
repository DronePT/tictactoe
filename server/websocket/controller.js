const JWT = require('jsonwebtoken')
const logger = require('./../helpers/logger')
const Game = require('./../models/Game')
const checkForWinner = require('./../../src/helpers/check-winner')

const { TOKEN_SECRET } = process.env

const verifyToken = token => JWT.verify(token, TOKEN_SECRET)
const decodeToken = token => JWT.decode(token)
const checkTie = (board = []) => board.every(s => s !== 0)

const createSocketLogger = id => (...args) => logger(`#${id}:`, ...args)

const createLeftRoom = (io, socket, user) => async (reason) => {
  const game = await Game.findOne({ name: user.room })
  if (!game) return

  const players = await game.removePlayerBySocketId(socket.id)

  io.to(user.room).emit('left', user)
  io.to(user.room).emit('update-game', { players })
}

const createJoinRoom = (io, socket, user) => async (room) => {
  try {
    // add socket to room
    socket.join(room)

    // find game room
    const game = await Game.findOrCreateByName(room)

    // add player to room
    const player = await game.addPlayer({ name: user.name, socket: socket.id })

    const {
      board, turn, players, winHistory,
    } = game

    io.to(room).emit('join', player)
    io.to(room).emit('update-game', {
      board,
      turn,
      players,
      winHistory,
    })

    logger(`- ${user.name} (${socket.id}) joined #${room}\n - database: `, player)
  } catch (error) {
    logger(error.stack)
  }
}

const authenticate = (socket, next) => {
  try {
    const { token } = socket.handshake.query

    verifyToken(token)

    return next()
  } catch (error) {
    logger(error)
    return next(new Error('Authentication Error'))
  }
}

const createMessageBroadcaster = (io, user) => (text) => {
  if (!text || !text.length) return
  const { name, room } = user
  const date = new Date()

  const message = {
    type: 'message',
    text,
    from: name,
    date,
  }
  logger(message)

  io.to(room).emit('message', message)
}

const updateGameAndEmit = ({ io, game, user }, update) => {
  const { players } = game
  io.to(user.room).emit('update-game', { ...update, players })

  return game.update(update)
}

const createGameUpdater = (io, user) => async (position) => {
  // get current game state
  const game = await Game.findOrCreateByName(user.room)
  const me = game.players.find(({ name }) => name === user.name)

  // if not in players list it is a spectator, so ignore it.
  if (!me) return false

  const { turn, board, winHistory } = game

  // ignore if not user turn's or slot position already played
  if (turn !== me.index || board[position] !== 0) return false

  // update new position in the current game board
  const newBoard = board.map((v, i) => (i !== position || v !== 0 ? v : me.index))

  // check for winner
  const winCombination = checkForWinner(me.index, newBoard)

  if (winCombination) {
    return updateGameAndEmit(
      { io, game, user },
      {
        board: new Array(9).fill(0),
        turn: me.index === 2 ? 1 : 2,
        winHistory: [{ ...me, combination: winCombination }, ...winHistory],
      },
    )
  }

  // check fo tie
  if (checkTie(newBoard)) {
    return updateGameAndEmit(
      { io, game, user },
      {
        board: new Array(9).fill(0),
        turn: me.index === 2 ? 1 : 2,
        winHistory: [{ index: 0, combination: [] }, ...winHistory],
      },
    )
  }

  return updateGameAndEmit(
    { io, game, user },
    {
      board: newBoard,
      turn: me.index === 2 ? 1 : 2,
    },
  )
}

const handleConnection = io => (socket) => {
  const { token } = socket.handshake.query
  const user = decodeToken(token)

  logger('new connection:', user)

  createSocketLogger(user)

  // const log = createSocketLogger(socket.id)
  const joinRoom = createJoinRoom(io, socket, user)
  const leftRoom = createLeftRoom(io, socket, user)
  const broadcastMessage = createMessageBroadcaster(io, user)
  const updateGame = createGameUpdater(io, user)

  joinRoom(user.room)

  // native events
  socket.on('disconnect', leftRoom)

  // our events
  socket.on('update-game', updateGame)
  socket.on('message', broadcastMessage)
  socket.on('join-room', joinRoom)
}

module.exports = {
  authenticate,
  handleConnection,
}
