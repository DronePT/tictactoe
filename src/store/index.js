import { combineReducers } from 'redux'

// reducers
import localGame from './reducers/localGame.reducer'
import onlineGame from './reducers/onlineGame.reducer'

const ticTacToeApp = combineReducers({
  localGame,
  onlineGame,
})

export default ticTacToeApp
