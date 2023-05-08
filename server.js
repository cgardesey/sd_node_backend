'use strict'

/*
|--------------------------------------------------------------------------
| Http server
|--------------------------------------------------------------------------
|
| This file bootstrap Adonisjs to start the HTTP server. You are free to
| customize the process of booting the http server.
|
| """ Loading ace commands """
|     At times you may want to load ace commands when starting the HTTP server.
|     Same can be done by chaining `loadCommands()` method after
|
| """ Preloading files """
|     Also you can preload files by calling `preLoad('path/to/file')` method.
|     Make sure to pass relative path from the project root.
*/
/*const cluster = require('cluster')

if (cluster.isMaster) {
    for (let i=0; i < 4; i ++) {
        cluster.fork()
    }
    require('@adonisjs/websocket/clusterPubSub')()
    return
}*/

const { Ignitor } = require('@adonisjs/ignitor')
const path = require('path')
const https = require('https')
const fs = require('fs')

// Certificate
let mypath = fs.readFileSync(path.join(__dirname, '../../../../etc/letsencrypt/live/2schooldirect.net/privkey.pem'))
console.log(`${mypath}`)

const options = {
  key: fs.readFileSync(path.join(__dirname, '../../../../etc/letsencrypt/live/2schooldirect.net/privkey.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../../../../etc/letsencrypt/live/2schooldirect.net/fullchain.pem'))
}

new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .wsServer() // boot the WebSocket server
  .fireHttpServer((handler) => {
    return https.createServer(options, handler)
  })
  .catch(console.error)
