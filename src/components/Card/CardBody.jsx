import React from 'react'
import PropTypes from 'prop-types'

const CardBody = ({ children }) => <div className="Card-body">{children}</div>

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CardBody
