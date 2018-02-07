import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// assets
import './style.css'

// containers
import { LocalGame, OnlineGame } from './../../containers'

const GameBoard = () => (
  <div className="GameBoard">
    <Switch>
      <Route path="/game/local" component={LocalGame} />
      <Route path="/game/online/:room?" component={OnlineGame} />
      <Redirect to="/" />
    </Switch>
  </div>
)

export default GameBoard
