class APIError extends Error {
  constructor(message, code = 400) {
    super(message)

    this.name = this.constructor.name
    this.code = code
  }
}

module.exports = APIError
