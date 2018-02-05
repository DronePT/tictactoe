import React from 'react'
import PropTypes from 'prop-types'

// assets
import './style.css'

const ScoreLabel = ({ label, player, history }) => (
  <div className="Score-label">
    <span className="label">{label}</span>
    <span className="score">{history.filter(({ player: p }) => p === player).length}</span>
  </div>
)

ScoreLabel.propTypes = {
  label: PropTypes.string.isRequired,
  player: PropTypes.number.isRequired,
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const Score = ({ players, history }) => {
  const [p1 = 'Player 1', p2 = 'Player 2'] = players

  return (
    <div className="Score">
      <div className="Score-header">Score Board</div>
      <div className="Score-body">
        <ScoreLabel label={p1} player={1} history={history} />
        <ScoreLabel label={p2} player={2} history={history} />
        <ScoreLabel label="Ties" player={0} history={history} />
      </div>
    </div>
  )
}

Score.defaultProps = {
  players: [],
  history: [],
}

Score.propTypes = {
  players: PropTypes.arrayOf(PropTypes.string),
  history: PropTypes.arrayOf(PropTypes.object),
}

export default Score
