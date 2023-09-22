import 'module-alias/register'

import routes from '@bootstrap/routes/index.routes'
import { MongoDBClientSingleton } from '@infra/database/clients'
import { MongoHelper } from '@infra/database/mongodb/helpers/MongoHelper'
import express from 'express'

import { validateJsonFormat } from './middlewares'

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(validateJsonFormat)

server.use(routes)

MongoDBClientSingleton.getInstance()
  .then(new MongoHelper().createIndexes)
  .then(() => {
    server.listen(3000, () => console.log('Running on port 3000'))
  })

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)

async function gracefulShutdown() {
  console.log('\nShutting down gracefully...')
  try {
    await MongoDBClientSingleton.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('Error during graceful shutdown:', error)
    process.exit(1)
  }
}
