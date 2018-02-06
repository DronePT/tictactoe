const mongoose = require('mongoose')

const { Schema } = mongoose

const gameSchema = new Schema({
  name: String,
  board: {
    type: Array,
    default: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  turn: { type: Number, default: 0 },
  players: [],
  sepectators: [],
  winHistory: [],
})

/**
 * assign player index for frontend player distinction (between X's and O's)
 * @param {*} player player object
 * @param {*} players array of players in game
 */
const assignIndex = (player, players) => {
  const index = !players.find(p => p.index === 1) ? 1 : 2
  return { ...player, index }
}

/**
 * remove a player from database by his socket.io cient id
 * @param {*} socketId socket.io client id
 */
gameSchema.methods.removePlayerBySocketId = async function f(socketId) {
  const updated = this.players.filter(({ socket }) => socket !== socketId)

  await this.update({ players: updated })

  if (!updated.length) await this.remove()

  return updated
}

/**
 * add a player to game database:
 * @param {*} player player data object
 */
gameSchema.methods.addPlayer = async function f(player) {
  const playersInGame = this.players.length

  // find player in players array
  const p = this.players.find(({ name }) => name === player.name)

  // if player not found add it if slots still available
  if (!p && playersInGame < 2) {
    const playerWithIndex = assignIndex(player, this.players)
    await this.update({ $push: { players: playerWithIndex } })
    return playerWithIndex
  }

  // update players list with current updated player data
  const updated = this.players.map(up => (up.name !== player.name ? up : { ...up, ...player }))
  await this.update({ players: updated })

  const updatedPlayer = updated.find(({ name }) => name === player.name) || player

  return updatedPlayer
}

/**
 * find a game on database or create it if not found
 * @param {*} name room name for the game
 */
gameSchema.statics.findOrCreateByName = async function f(name) {
  const Game = this

  const res = await Game.findOne({ name })
  if (res) return res

  // if game not found create new one and assign random
  // player index nuber to start the game (between 1 - 2)
  const turn = Math.ceil(Math.random() * 2)

  const game = new Game({ name, turn })
  await game.save()

  return game
}

module.exports = mongoose.model('Game', gameSchema)
