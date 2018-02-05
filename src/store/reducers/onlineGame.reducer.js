/* global localStorage */
import types from './../types'

const defaultState = {
  connected: false,
  id: '',
  token: localStorage.getItem('token') || '',
  name: localStorage.getItem('name') || '',
  room: localStorage.getItem('room') || '',
  board: new Array(9).fill(0),
  turn: 0,
  chat: [],
  winHistory: [],
  players: [],
  showWinner: false,
}

const updateConnection = (state) => {
  ['token', 'name', 'room'].forEach(key => localStorage.setItem(key, state[key]))
  return state
}

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case types.UPDATE_CONNECTION_STATUS:
      return updateConnection({ ...state, ...payload })
    case types.JOIN_ROOM:
      return { ...state, room: payload }
    case types.UPDATE_STATE_KEY:
      return { ...state, [payload.key]: payload.value }
    case types.UPDATE_CHAT:
      return { ...state, chat: [...state.chat, payload] }
    case types.UPDATE_ONLINE_BOARD:
      return { ...state, ...payload, showWinner: !!payload.winHistory && state.turn }
    case types.DIMISS_ONLINE_WINNER_POPUP:
      return { ...state, showWinner: false }
    default:
      return state
  }
}
