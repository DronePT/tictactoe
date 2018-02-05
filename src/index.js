/* global document */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

// styling
import 'minireset.css'
import './index.css'

// CRA service worker for offline caching
// import registerServiceWorker from './lib/registerServiceWorker'

// redux required reducer for store
import ticTacToeApp from './store'

// components/containers
import { App } from './containers'

const store = createStore(ticTacToeApp)

console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
)

// registerServiceWorker()
