// array with all winning combinations
const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

/**
 * create player positions checker
 * @param {number} player - index number of player
 * @param {number[]} game - array of game board
 */
const createPlayerPositionAssertion = (player, game) => pos => pos.every(p => game[p] === player)

/**
 * iterate all win combinations and assert if position are all with same player id
 * @param {number} player - index number of player
 * @param {number[]} game - array of game board
 */
module.exports = (player = 1, game = []) => {
  const assertPositions = createPlayerPositionAssertion(player, game)

  return winCombinations.find(assertPositions)
}
