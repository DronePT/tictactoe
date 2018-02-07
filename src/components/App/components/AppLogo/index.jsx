import React from 'react'

// assets
import './style.css'
import logo from './../../../../assets/images/logo.png'

const AppLogo = () => (
  <div className="app-logo">
    <img src={logo} alt="tic tac toe" onDragStart={e => e.preventDefault()} />
  </div>
)

export default AppLogo
