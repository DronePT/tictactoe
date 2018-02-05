import { updateState, saveState, getDefaultState } from './localGame.helper'

export default (state = getDefaultState(), action) => {
  const newState = updateState(state, action)

  // save state to local storage
  saveState(newState)

  return newState
}
