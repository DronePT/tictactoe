import React, { Component } from 'react'
import PropTypes from 'prop-types'

// assets
import './style.css'

class WinnerPopup extends Component {
  static defaultProps = {
    name: null,
    onDismiss: _ => _,
    secondsToDismiss: 5,
  }

  static propTypes = {
    player: PropTypes.number.isRequired,
    secondsToDismiss: PropTypes.number,
    name: PropTypes.string,
    onDismiss: PropTypes.func,
  }

  constructor() {
    super()

    this.handleDismissClick = this.handleDismissClick.bind(this)
  }

  state = {
    dismissTimer: 0,
  }

  componentDidMount() {
    this.startDismissTimer()
  }

  startDismissTimer() {
    const { secondsToDismiss = 5 } = this.props

    // dismiss popup after X seconds
    const dismissTimer = setTimeout(this.dismiss.bind(this), secondsToDismiss * 1000)

    this.setState({ dismissTimer })
  }

  dismiss() {
    // clear timer an existing timer for dismiss
    const { dismissTimer } = this.state
    clearTimeout(dismissTimer)

    // emit dismiss event
    this.props.onDismiss()
  }

  handleDismissClick() {
    this.dismiss()
  }

  render() {
    const { player, name } = this.props
    const message = player === 0 ? "It's a tie!" : name || `Player ${player}`

    return (
      <div className="WinnerPopup">
        <button className="dismiss-button" onClick={this.handleDismissClick}>
          <i className="fas fa-times" /> <span>CLOSE</span>
        </button>

        <div className="trophy">
          <i className={`fas ${player === 0 ? 'fa-thumbs-up is-green' : 'fa-trophy'} fa-9x`} />
        </div>
        <div className="message">{message}</div>
      </div>
    )
  }
}

export default WinnerPopup
