import React from 'react'
import PropTypes from 'prop-types'

const CardHeader = ({ children }) => <div className="Card-header">{children}</div>

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CardHeader
