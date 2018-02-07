import React from 'react'
import PropTypes from 'prop-types'

// assets
import './style.css'

const Menu = ({ children }) => <ul className="menu">{children}</ul>

Menu.defaultProps = {
  children: null,
}

Menu.propTypes = {
  children: PropTypes.node,
}

export default Menu
