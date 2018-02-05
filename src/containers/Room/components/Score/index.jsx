import React from 'react'
import PropTypes from 'prop-types'

// assets
import './style.css'

const Score = ({ players, history }) => {
  const [p1, p2] = players
  if (!p1 || !p2) return null

  const p1wins = history.filter(({ index }) => index === p1.index).length
  const p2wins = history.filter(({ index }) => index === p2.index).length

  return (
    <div className="RoomScore">
      <div className="player">
        <div className="score">{p1wins}</div>
        <span>{p1.name}</span>
      </div>
      <div className="versus">vs</div>
      <div className="player">
        <span>{p2.name}</span>
        <div className="score">{p2wins}</div>
      </div>
    </div>
  )
}

Score.defaultProps = {
  players: [],
  history: [],
}

Score.propTypes = {
  players: PropTypes.arrayOf(PropTypes.any),
  history: PropTypes.arrayOf(PropTypes.any),
}

export default Score
