const JWT = require('jsonwebtoken')
const APIError = require('./helpers/APIError')
const Game = require('./models/Game')

const { TOKEN_SECRET } = process.env

const createToken = (name, room) => JWT.sign({ name, room }, TOKEN_SECRET)

const createConnection = async (req, res, next) => {
  const { name, room } = req.body

  // TODO: do a better sanitize/validate request body
  if (!name || !room) return next(new APIError('name and room are required!'))

  // find room in database, if doesn't exists, create it
  const game = await Game.findOrCreateByName(room)

  // add player to game
  game.addPlayer({ name })

  const token = createToken(name, room)

  return res.json({ token, game })
}

module.exports = { createConnection }
