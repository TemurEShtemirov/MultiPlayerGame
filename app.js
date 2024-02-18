import express from 'express'
import http from 'http'

async function bootstrap() {
  const app = express()
  const server = http.createServer(app)
  const port = 3000

  app.use(express.static('public'))

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  })

  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
}

bootstrap()
