import React from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'

// assets
import './TextInput.css'

const TextInput = ({ id, label, ...props }) => {
  const inputId = id || `TextInput-${shortid.generate()}`
  const input = <input id={inputId} className="TextInput-input" {...props} />

  if (!label) return input

  return (
    <div className="TextInput">
      <label htmlFor={inputId}>{label}</label>
      {input}
    </div>
  )
}

TextInput.defaultProps = {
  label: '',
  id: null,
}

TextInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
}

export default TextInput
