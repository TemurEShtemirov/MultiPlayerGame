import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

async function bootstrap() {
  const app = express()
  const server = http.createServer(app)
  // socket.io setup
  const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 })

  const port = 3000

  app.use(express.static('public'))

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  })

  const players = {}
  // const colors = ['yellow', 'green', 'orange', 'red', 'purple', 'pink']

  // function randomXToY(minVal, maxVal) {
  //   var randVal = minVal + Math.random() * (maxVal - minVal)
  //   return Math.round(randVal)
  // }
  io.on('connection', (socket) => {
    console.log('A USER IS CONNECTED')

    players[socket.id] = {
      x: 500 * Math.random(),
      y: 500 * Math.random()
      // x: randomXToY(101, 999),
      // y: randomXToY(101, 999)
      // color: colors[Math.floor(Math.random() * colors.length)]
    }

    io.emit('updatePlayers', players)

    socket.on('disconnect', (reason) => {
      console.log(reason)
      delete players[socket.id]
      io.emit('updatePlayers', players)
    })

    console.log(players)
  })

  server.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
}

bootstrap()
