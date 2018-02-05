/* global fetch */
import io from 'socket.io-client'
import { API_URI } from './../config'

class ServerClient {
  async connect(name, room, token = null) {
    this.name = name
    this.room = room
    this.token = token

    if (!this.token) await this.createToken(name, room)

    console.log('connecting', `${API_URI}/?token=${this.token}`)

    this.socket = io(`${API_URI}/?token=${this.token}`)

    return this
  }

  async createToken(name, room) {
    this.name = name
    this.room = room

    const result = await fetch(`${API_URI}/connect`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, room }),
    })

    const { token } = await result.json()

    this.token = token

    return this
  }

  get id() {
    return this.socket.id
  }
}

export default new ServerClient()
