import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

async function bootstrap() {
  const app = express()
  const server = http.createServer(app)
  // socket.io setup
  const io = new Server(server)
  
  const port = 3000

  app.use(express.static('public'))

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  })

  io.on('connection',(socket)=>{
    console.log('A USER IS CONNECTED');
  })

  server.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
}

bootstrap()
