import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'

// assets
import './style.css'

// components
import Message from './Message'

class Chat extends Component {
  static defaultProps = {
    chat: [],
    onSubmitMessage: _ => console.warn('onSubmitMessage not set', _),
  }

  static propTypes = {
    chat: PropTypes.arrayOf(PropTypes.any),
    onSubmitMessage: PropTypes.func,
  }

  constructor() {
    super()

    this.handleChatInputChange = this.handleChatInputChange.bind(this)
    this.handleChatInputKeyPress = this.handleChatInputKeyPress.bind(this)
  }

  state = {
    message: '',
  }

  componentDidUpdate(prevProps) {
    this.updateChatScrollbar(prevProps)
  }

  handleChatInputKeyPress(event) {
    const key = event.which || event.keyCode

    // if key press is enter key submit the message
    if (key === 13) {
      this.props.onSubmitMessage(this.state.message)
      this.setState({ message: '' })
    }
  }

  handleChatInputChange(event) {
    const { value: message } = event.target
    this.setState({ message })
  }

  updateChatScrollbar(prevProps) {
    if (this.props.chat.length !== prevProps.chat.length && this.chatLog) {
      // wait for next tick and update chat scroll bar to bottom!
      setTimeout(() => {
        this.chatLog.scrollTop = this.chatLog.scrollHeight
      }, 0)
    }
  }

  renderChat() {
    const { chat } = this.props
    return chat.map(props => <Message key={`message-${shortid.generate()}`} {...props} />)
  }

  render() {
    const { message } = this.state

    return (
      <div className="RoomChat">
        <div
          className="RoomChat-log"
          ref={(e) => {
            this.chatLog = e
          }}
        >
          <div className="RoomChat-messages">{this.renderChat()}</div>
        </div>
        <div className="RoomChat-input">
          <input
            type="text"
            placeholder="Type your message and press enter"
            onChange={this.handleChatInputChange}
            onKeyPress={this.handleChatInputKeyPress}
            value={message}
          />
        </div>
      </div>
    )
  }
}

export default Chat
