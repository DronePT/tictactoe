import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import shortid from 'shortid'

// required redux actions
import { connect as connectServer } from './../../store/actions/onlineGame.actions'

// required containers
import { CreateConnection, Room } from './../../containers'

class OnlineGame extends Component {
  static propTypes = {
    onlineGame: PropTypes.objectOf(PropTypes.any).isRequired,
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    connect: PropTypes.func.isRequired,
  }

  componentWillMount() {
    // this.connect()
  }

  connect() {
    const { match: { params }, onlineGame } = this.props

    if (!onlineGame.connected) {
      this.props.connect(shortid.generate(), params.room || 'default-room-name')
    }
  }

  renderProps() {
    return <pre>{JSON.stringify(this.props.onlineGame, null, 2)}</pre>
  }

  render() {
    const { connected } = this.props.onlineGame

    if (!connected) return <CreateConnection />

    return <Room />
  }
}

const mapStateToProps = ({ onlineGame }) => ({ onlineGame })
const dispatchActionsToProps = dispatcher => ({
  connect: connectServer(dispatcher),
})

export default connect(mapStateToProps, dispatchActionsToProps)(OnlineGame)
