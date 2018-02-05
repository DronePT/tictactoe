/* global localStorage */
import types from './../types'
import getWinCombination from './../../helpers/check-winner'

/**
 * create new local game state
 * @param {number} startingPlayer - index number for starting player
 */
const resetLocalGameState = (options = {}) => {
  const { startingPlayer = 0, winsHistory = [], showWinner = false } = options

  return {
    board: new Array(9).fill(0),
    turn: startingPlayer === 0 ? Math.ceil(Math.random() * 2) : startingPlayer,
    winsHistory,
    showWinner,
  }
}

/**
 * update local board state with the new play
 * @param {object} state - local game state
 * @param {number} slot - the index number of slot to update
 */
const updateBoard = (state, slot) => {
  const board = [].concat(state.board)
  const player = state.turn

  // assign to board slot the current player id
  board[slot] = player

  return board
}

/**
 * check if board state is a tie game!
 * @param {array} board
 */
const checkTie = (board = []) => board.every(s => s !== 0)

/**
 * update the player turn for the local board.
 * @param {number} player - index number of the current player
 */
const updateTurnState = player => (player === 1 ? 2 : 1)

/**
 * update board with a winning player
 * @param {number} player - index number of player
 * @param {number[]} combination - array with slot indexes of winning combination
 * @param {number[]} history - array with score history
 */
const setWinnwer = (player, combination = [], history = []) =>
  resetLocalGameState({
    winsHistory: [{ player, combination }, ...history],
    showWinner: true,
  })

/**
 * update game board for a tie game
 * @param {number[]} winsHistory - array with score history
 */
const setTie = winsHistory => setWinnwer(0, [], winsHistory)

/**
 * update localGame board state and check for winners
 * @param {*} state
 * @param {*} payload
 */
const updateBoardState = (state, payload) => {
  const { turn: player, winsHistory } = state

  const board = updateBoard(state, payload)

  // check if player wins with this move, if so reset the game board
  const winCombination = getWinCombination(player, board)
  if (winCombination) return setWinnwer(player, winCombination, winsHistory)

  // check if there is no more moves, if so set as tie game
  if (checkTie(board)) return setTie(winsHistory)

  return {
    ...state,
    board,
    turn: updateTurnState(player),
  }
}

/**
 * save state to local storage for resume purposes.
 * @param {object} state - state object to save
 */
export const saveState = state => localStorage.setItem('state', JSON.stringify(state))

export const getDefaultState = () =>
  (localStorage.state ? JSON.parse(localStorage.state) : resetLocalGameState())

export const updateState = (state, { type, payload }) => {
  switch (type) {
    case types.UPDATE_LOCAL_BOARD_SLOT:
      return updateBoardState(state, payload)
    case types.UPDATE_LOCAL_BOARD_TURN:
      return {
        ...state,
        turn: payload,
      }
    case types.RESET_LOCAL_BOARD:
      return resetLocalGameState()
    case types.DIMISS_WINNER_POPUP:
      return {
        ...state,
        showWinner: false,
      }
    default:
      return state
  }
}
