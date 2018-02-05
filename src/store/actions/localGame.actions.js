import types from './../types'

export const updateBoardPosition = dispatch => position =>
  dispatch({ type: types.UPDATE_LOCAL_BOARD_SLOT, payload: position })

export const updateGameTurn = dispatch => (player = 0) =>
  dispatch({ type: types.UPDATE_LOCAL_BOARD_SLOT, payload: player })

export const resetBoard = dispatch => () => dispatch({ type: types.RESET_LOCAL_BOARD })

export const dismissWinnerPopup = dispatch => () => dispatch({ type: types.DIMISS_WINNER_POPUP })
