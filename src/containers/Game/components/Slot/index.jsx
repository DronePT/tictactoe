import React, { Component } from 'react'
import PropTypes from 'prop-types'

// assets
import './style.css'

// components
import { Player } from './../../../../components'

class Slot extends Component {
  static defaultProps = {
    onUpdate: _ => _,
  }

  static propTypes = {
    value: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    onUpdate: PropTypes.func,
  }

  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  update() {
    const { position, value } = this.props

    // only update slot value in case of empty slot!
    if (value === 0) this.props.onUpdate(position)
  }

  handleClick(event) {
    event.preventDefault()
    this.update()
  }

  handleKeyPress(e) {
    const keyPressed = e.which || e.keyCode

    if ([13, 32].includes(keyPressed)) this.update()
  }

  renderPlayerIcon() {
    const { value } = this.props

    if (value === 0) return null

    return <i className={`${value === 2 ? 'far fa-circle' : 'fas fa-times'} fa-5x`} />
  }

  render() {
    const { position, value } = this.props
    const slotType = value === 1 ? 'is-cross' : 'is-circle'

    return (
      <div
        role="button"
        tabIndex={position + 1}
        className={`Slot pos-${position} ${slotType}`}
        onClick={this.handleClick}
        onKeyPress={this.handleKeyPress}
      >
        <Player player={value} size="4x" />
      </div>
    )
  }
}

export default Slot
