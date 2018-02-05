import React from 'react'
import PropTypes from 'prop-types'

// assets
import './style.css'

const StartMenuHeader = ({ children }) => <div className="startmenu-header">{children}</div>

StartMenuHeader.defaultProps = {
  children: null,
}

StartMenuHeader.propTypes = {
  children: PropTypes.node,
}

export default StartMenuHeader
