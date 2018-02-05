import React from 'react'
import PropTypes from 'prop-types'

// const assets
import './Message.css'

const Message = ({ type, text, from }) => {
  const classname = ['ChatMessage']
  if (type) classname.push(`is-${type}`)

  const message = type === 'message' ? `${from}: ${text}` : text

  return <div className={classname.join(' ')}>{message}</div>
}

Message.defaultProps = {
  from: null,
}

Message.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  from: PropTypes.string,
}

export default Message
