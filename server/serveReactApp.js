const express = require('express')
const path = require('path')

module.exports = (app) => {
  // serve react app static assets
  app.use('/', express.static(path.resolve(__dirname, './../build')))

  // set * for react-router
  app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../build/index.html'))
  })
}
