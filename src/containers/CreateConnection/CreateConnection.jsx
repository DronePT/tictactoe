import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// assets
import './CreateConnection.css'

// actions
import { updateStateKey, connect as connectServer } from './../../store/actions/onlineGame.actions'

// components
import { Button, Form, Card as CardComponents } from './../../components'

const {
  Card, CardHeader, CardBody, CardFooter,
} = CardComponents

class CreateConnection extends Component {
  static propTypes = {
    onlineGame: PropTypes.objectOf(PropTypes.any).isRequired,
    updateKey: PropTypes.func.isRequired,
    connect: PropTypes.func.isRequired,
  }

  constructor() {
    super()

    this.handleInput = this.handleInput.bind(this)
    this.handleConnectClick = this.handleConnectClick.bind(this)
  }

  componentWillMount() {
    this.tryReonnect()
  }

  handleConnectClick(event) {
    event.preventDefault()

    this.connect()
  }

  handleInput(event) {
    const { name, value } = event.target

    this.props.updateKey(name, value)
  }

  tryReonnect() {
    const { name, room, token } = this.props.onlineGame

    if (name.length && room.length && token.length) this.props.connect(name, room, token)
  }

  connect() {
    const { name, room } = this.props.onlineGame

    // check if name and room are filled
    if (!name.length || !room.length) return

    this.props.connect(name, room)
  }

  render() {
    const { name, room } = this.props.onlineGame

    return (
      <Card hasFooter>
        <CardHeader>Please enter your name and room to join:</CardHeader>

        <CardBody>
          <Form.TextInput label="Your name" name="name" onChange={this.handleInput} value={name} />
          <Form.TextInput label="Room" name="room" onChange={this.handleInput} value={room} />
        </CardBody>

        <CardFooter>
          <Button color="primary" onClick={this.handleConnectClick}>
            connect
          </Button>
          <Button to="/" color="gray">
            go back
          </Button>
        </CardFooter>
      </Card>
    )
  }
}

const mapStateToProps = ({ onlineGame }) => ({
  onlineGame,
})

const dispatchActionsToProps = dispatcher => ({
  updateKey: updateStateKey(dispatcher),
  connect: connectServer(dispatcher),
})

export default connect(mapStateToProps, dispatchActionsToProps)(CreateConnection)
