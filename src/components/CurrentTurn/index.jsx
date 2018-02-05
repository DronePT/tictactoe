import React from 'react'
import PropTypes from 'prop-types'

// assets
import './style.css'

// components
import { Player } from './../../components'

const CurrentTurn = ({ player, name }) => (
  <div className="CurrentTurn">
    <div className="CurrentTurn-header">Current Turn</div>
    <div className="CurrentTurn-body">
      <Player player={player} size="4x" />
    </div>
    <div className="CurrentTurn-footer">{name || `Player ${player}`}</div>
  </div>
)

CurrentTurn.defaultProps = {
  name: null,
}

CurrentTurn.propTypes = {
  player: PropTypes.number.isRequired,
  name: PropTypes.string,
}

export default CurrentTurn
