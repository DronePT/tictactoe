import types from './../types'
import server from './../../lib/serverClient'

export const connect = dispatch => async (name, room, _token = null) => {
  const dispatchConnection = payload => dispatch({ type: types.UPDATE_CONNECTION_STATUS, payload })
  const dispatchChat = payload => dispatch({ type: types.UPDATE_CHAT, payload })

  await server.connect(name, room, _token)

  const { token } = server

  server.socket.on('connect', () =>
    dispatchConnection({
      connected: true,
      id: server.id,
      token,
      name,
      room,
    }))

  server.socket.on('disconnect', () =>
    dispatchConnection({
      connected: false,
      id: '',
      token: '',
      name: '',
      room: '',
    }))

  // application socket events
  server.socket.on('join', player =>
    dispatchChat({ type: 'action', text: `${player.name} has joined.` }))

  server.socket.on('message', payload => dispatchChat(payload))

  server.socket.on('update-game', payload => dispatch({ type: types.UPDATE_ONLINE_BOARD, payload }))
}

export const disconnect = () => server.socket.disconnect('user_disconnect')

export const updateStateKey = dispatch => (key, value) =>
  dispatch({ type: types.UPDATE_STATE_KEY, payload: { key, value } })

export const joinRoom = dispatch => (name) => {
  server.socket.emit('join-room', name)

  dispatch({ type: types.JOIN_ROOM, payload: name })
}

export const sendMessage = message => server.socket.emit('message', message)

export const sendBoardPosition = position => server.socket.emit('update-game', position)

export const dismissWinnerPopup = dispatch => () =>
  dispatch({ type: types.DIMISS_ONLINE_WINNER_POPUP })
