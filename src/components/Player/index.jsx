import React from 'react'
import PropTypes from 'prop-types'

// assets
import './style.css'

const Player = ({ player = 0, size = null }) => {
  if (!player) return null

  const classname = ['Player']

  classname.push(player === 2 ? 'far fa-circle is-circle' : 'fas fa-times is-cross')

  if (size) classname.push(`fa-${size}`)

  return <i className={classname.join(' ')} />
}

Player.defaultProps = {
  player: 0,
  size: null,
}

Player.propTypes = {
  player: PropTypes.number,
  size: PropTypes.string,
}

export default Player
