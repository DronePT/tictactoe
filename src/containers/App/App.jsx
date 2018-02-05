import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// assets
import './App.css'

// containers/components
import { StartMenu, GameBoard } from './../../containers'
import AppLogo from './components/AppLogo'

const App = () => (
  <div className="App">
    <AppLogo />

    <Switch>
      <Route path="/" exact component={StartMenu} />
      <Route path="/game" component={GameBoard} />

      <Redirect to="/" />
    </Switch>
  </div>
)

export default App
