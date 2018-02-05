import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

// assets
import './style.css'

const Button = (props) => {
  const {
    to, color, size, children, ...rest
  } = props

  const classname = ['button']

  if (color) classname.push(`is-${color}`)
  if (size) classname.push(`is-${size}`)

  return to ? (
    <Link to={to} className={classname.join(' ')} {...rest} onDragStart={e => e.preventDefault()}>
      {children}
    </Link>
  ) : (
    <button className={classname.join(' ')} {...rest}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  to: undefined,
  color: 'primary',
  size: 'normal',
}

Button.propTypes = {
  to: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'gray']),
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  children: PropTypes.node.isRequired,
}

export default Button
