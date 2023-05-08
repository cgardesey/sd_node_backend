'use strict'

class GuidController {
    constructor({socket, request}) {
        this.socket = socket
        this.request = request
        this.guid = request.header('guid')

        /*this.socket.broadcastToAll('message', {
          guid: this.guid
        })*/
    }

  async onMessage(message) {
    // this.socket.broadcastToAll('message', message)
  }
}

module.exports = GuidController
