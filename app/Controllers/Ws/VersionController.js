'use strict'

class VersionController {
  constructor({socket, request}) {
    this.socket = socket

    this.socket.broadcastToAll('message', {
      guid: this.guid
    })
    // console.log(`connected guid`)
  }
}

module.exports = VersionController
