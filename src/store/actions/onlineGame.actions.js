import types from './../types'
import server from './../../lib/serverClient'

export const connect = dispatch => async (name, room, _token = null) => {
  // create connection state dispatcher
  const dispatchConnection = payload => dispatch({ type: types.UPDATE_CONNECTION_STATUS, payload })

  // create chat message state dispatcher
  const dispatchChat = payload => dispatch({ type: types.UPDATE_CHAT, payload })

  // create websocket/socket.io connection
  await server.connect(name, room, _token)

  // extract user token identifer received from server API
  const { token } = server

  // handle websocket/socket.io connection
  server.socket.on('connect', () =>
    dispatchConnection({
      connected: true,
      id: server.id,
      token,
      name,
      room,
    }))

  // handle websocket/socket.io disconnections
  server.socket.on('disconnect', () =>
    dispatchConnection({
      connected: false,
      id: '',
      token: '',
      name: '',
      room: '',
    }))

  // application socket events

  // handle players joins to the room event
  server.socket.on('join', player =>
    dispatchChat({ type: 'action', text: `${player.name} has joined.` }))

  // handle new messages to chat event
  server.socket.on('message', payload => dispatchChat(payload))

  // handle player's moves
  server.socket.on('update-game', payload => dispatch({ type: types.UPDATE_ONLINE_BOARD, payload }))

  // handle game's end
  server.socket.on('game-end', () => dispatch({ type: types.UPDATE_GAME_END }))
}

// action to disconnect user from game/room.
export const disconnect = () => server.socket.disconnect('user_disconnect')

// update specific key of the state
export const updateStateKey = dispatch => (key, value) =>
  dispatch({ type: types.UPDATE_STATE_KEY, payload: { key, value } })

export const joinRoom = dispatch => (name) => {
  server.socket.emit('join-room', name)

  dispatch({ type: types.JOIN_ROOM, payload: name })
}

// send chat message to server
export const sendMessage = message => server.socket.emit('message', message)

// send to server player's move
export const sendBoardPosition = position => server.socket.emit('update-game', position)

// dismiss winner popup after game's end
export const dismissWinnerPopup = dispatch => () =>
  dispatch({ type: types.DIMISS_ONLINE_WINNER_POPUP })
