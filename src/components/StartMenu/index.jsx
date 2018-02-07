import React from 'react'
import './style.css'

// components
import Header from './../../components/Header'
import Menu from './components/menu'
import MenuItem from './components/menu/item'

const StartMenu = () => (
  <div className="start-menu">
    <Header>Tic Tac Toe Game</Header>

    <div className="start-menu-content">
      <Menu>
        <MenuItem to="/game/local">Local Game</MenuItem>
        <MenuItem to="/game/online">Online Game</MenuItem>
      </Menu>
    </div>
  </div>
)

export default StartMenu
