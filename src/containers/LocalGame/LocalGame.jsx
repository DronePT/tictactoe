import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// assets
import './LocalGame.css'

// components
import { Header, CurrentTurn, Score, WinnerPopup, Game } from './../../components'
import Menu from './../../components/StartMenu/components/menu'
import MenuItem from './../../components/StartMenu/components/menu/item'

// redux actions
import {
  updateBoardPosition,
  updateGameTurn,
  resetBoard,
  dismissWinnerPopup,
} from './../../store/actions/localGame.actions'

const anyObject = [PropTypes.array, PropTypes.string, PropTypes.number, PropTypes.bool]

class LocalGame extends Component {
  static propTypes = {
    localGame: PropTypes.objectOf(PropTypes.oneOfType(anyObject)).isRequired,
    updateBoardPosition: PropTypes.func.isRequired,
    updateGameTurn: PropTypes.func.isRequired,
    resetBoard: PropTypes.func.isRequired,
    dismissWinnerPopup: PropTypes.func.isRequired,
  }

  constructor() {
    super()

    this.handleSlotUpdate = this.handleSlotUpdate.bind(this)
    this.handleWinnerDismiss = this.handleWinnerDismiss.bind(this)
  }

  // component lifecycles
  componentWillMount() {
    this.checkCurrentTurn()
  }

  componentWillUnmount() {
    this.resetBoard()
  }

  checkCurrentTurn() {
    const { turn } = this.props.localGame

    if (turn === 0) this.props.updateGameTurn()
  }

  resetBoard() {
    this.props.resetBoard()
  }

  handleSlotUpdate(slot) {
    this.props.updateBoardPosition(slot)
  }

  handleWinnerDismiss() {
    this.props.dismissWinnerPopup()
  }

  renderWinner() {
    const { showWinner, winsHistory } = this.props.localGame
    if (!showWinner || !winsHistory.length) return null

    // render last winner details
    return <WinnerPopup {...winsHistory[0]} onDismiss={this.handleWinnerDismiss} />
  }

  render() {
    const { board, turn, winsHistory } = this.props.localGame

    return (
      <div className="LocalGame">
        {this.renderWinner()}
        <Header>Local Tic Tac Toe Game</Header>
        <Menu>
          <MenuItem to="/">
            <i className="fas fa-chevron-left" /> Go back to main menu!
          </MenuItem>
        </Menu>
        <div className="LocalGame-body">
          <Game board={board} onSlotUpdate={this.handleSlotUpdate} />

          <div className="LocalGame-stats">
            <CurrentTurn player={turn} name={`Player ${turn}`} />
            <Score history={winsHistory} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ localGame }) => ({
  localGame,
})

const mapDispatchToProps = dispatcher => ({
  updateBoardPosition: updateBoardPosition(dispatcher),
  updateGameTurn: updateGameTurn(dispatcher),
  resetBoard: resetBoard(dispatcher),
  dismissWinnerPopup: dismissWinnerPopup(dispatcher),
})

export default connect(mapStateToProps, mapDispatchToProps)(LocalGame)
