import React from 'react'

// components
import { Button } from './../../../../components'

const MenuItem = ({ to, children, ...props }) => (
  <li className="menu-item">
    <Button to={to} size="large" style={{ width: '100%' }} {...props}>
      {children}
    </Button>
  </li>
)

export default MenuItem
