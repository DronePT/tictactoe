import React from 'react'
import shortid from 'shortid'
import PropTypes from 'prop-types'

// assets
import './style.css'

// components
import Slot from './components/Slot'

// helpers
const renderSlots = (board, onSlotUpdate) =>
  board.map((value, pos) => (
    <Slot key={shortid.generate()} position={pos} value={value} onUpdate={onSlotUpdate} />
  ))

const Game = ({ board, onSlotUpdate }) => (
  <div className="Game">{renderSlots(board, onSlotUpdate)}</div>
)

Game.propTypes = {
  board: PropTypes.arrayOf(PropTypes.number).isRequired,
  onSlotUpdate: PropTypes.func.isRequired,
}

export default Game
