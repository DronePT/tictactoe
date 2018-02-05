import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// assets
import './Room.css'

// actions
import {
  sendMessage,
  sendBoardPosition,
  dismissWinnerPopup,
  disconnect,
} from './../../store/actions/onlineGame.actions'

// containers
import { Game } from './../../containers'

// components
import { Card as CardComponents, CurrentTurn, WinnerPopup, Button } from './../../components'
import Chat from './components/Chat'
import Score from './components/Score'

const { Card, CardHeader, CardBody } = CardComponents

class Room extends Component {
  static propTypes = {
    onlineGame: PropTypes.objectOf(PropTypes.any).isRequired,
    sendMessage: PropTypes.func.isRequired,
    sendBoardPosition: PropTypes.func.isRequired,
    dismissWinnerPopup: PropTypes.func.isRequired,
    disconnect: PropTypes.func.isRequired,
  }

  constructor() {
    super()

    this.handleSlotUpdate = this.handleSlotUpdate.bind(this)
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
    this.handleWinnerDismiss = this.handleWinnerDismiss.bind(this)
  }

  componentWillUnmount() {
    this.props.disconnect()
  }

  handleSlotUpdate(position) {
    this.props.sendBoardPosition(position)
  }

  handleMessageSubmit(message) {
    this.props.sendMessage(message)
  }

  handleWinnerDismiss() {
    this.props.dismissWinnerPopup()
  }

  renderProps() {
    return <pre>{JSON.stringify(this.props.onlineGame.winHistory, null, 2)}</pre>
  }

  renderWinner() {
    const { showWinner, winHistory } = this.props.onlineGame
    if (!showWinner || !winHistory.length) return null

    const winsHistory = winHistory.map(({ name, index: player }) => ({ name, player }))

    // render last winner details
    return <WinnerPopup {...winsHistory[0]} onDismiss={this.handleWinnerDismiss} />
  }

  render() {
    const {
      chat, room, board, turn, players, winHistory,
    } = this.props.onlineGame

    const player = players.find(p => p.index === turn)

    return (
      <Card>
        <CardHeader>
          <div className="Room-header">
            <span>Room {room}</span>
            <Button to="/">EXIT GAME</Button>
          </div>
        </CardHeader>
        <CardBody>
          {this.renderWinner()}
          <div className="Room">
            <div className="Room-content">
              <Score history={winHistory} players={players} />
              <div className="Room-game">
                <Game board={board} onSlotUpdate={this.handleSlotUpdate} />
              </div>
            </div>
            <div className="Room-menu">
              <Chat chat={chat} onSubmitMessage={this.handleMessageSubmit} />

              <div className="RoomMenu-current">
                <CurrentTurn player={turn} name={player ? player.name : `Player ${turn}`} />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = ({ onlineGame }) => ({ onlineGame })
const dispatchActionsToProps = dispatcher => ({
  disconnect,
  sendMessage,
  sendBoardPosition,
  dismissWinnerPopup: dismissWinnerPopup(dispatcher),
})

export default connect(mapStateToProps, dispatchActionsToProps)(Room)
