import 'module-alias/register'

import routes from '@bootstrap/routes/index.routes'
import express from 'express'

import { validateJsonFormat } from './middlewares'

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(validateJsonFormat)

server.use(routes)

server.listen(3000, () => console.log('Running on port 3000'))
