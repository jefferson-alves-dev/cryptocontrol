import express from 'express'
import routes from './routes/index.routes'
const server = express()
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use(routes)

server.listen(3000, () => console.log('Running on port 3000'))
