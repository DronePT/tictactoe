import React from 'react'
import PropTypes from 'prop-types'

// assets
import './Card.css'

const Card = ({ children, hasFooter }) => {
  const classname = ['Card']

  if (hasFooter) classname.push('has-footer')

  return <div className={classname.join(' ')}>{children}</div>
}

Card.defaultProps = {
  hasFooter: false,
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  hasFooter: PropTypes.bool,
}

export default Card
