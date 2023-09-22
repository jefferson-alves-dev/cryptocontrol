import CONFIG from '@config/index'
import { Collection, Document, MongoClient } from 'mongodb'

import { MongoDBConnectionError } from '../mongodb/errors'

export class MongoDBClientSingleton {
  private static _instance: MongoClient | null = null
  private static readonly DATABASE_NAME = CONFIG.DB_NAME
  private static readonly DB_CONNECTION_TIMEOUT_MS = CONFIG.DB_CONNECTION_TIMEOUT_MS
  private static readonly uri: string = CONFIG.DB_URI

  private constructor() {}

  public static async getInstance(): Promise<MongoClient> {
    if (!MongoDBClientSingleton._instance) {
      try {
        const client = new MongoClient(this.uri, {
          serverSelectionTimeoutMS: MongoDBClientSingleton.DB_CONNECTION_TIMEOUT_MS,
        })
        await client.connect()
        MongoDBClientSingleton._instance = client
        console.log(`MongoDB connected successfully to the ${this.DATABASE_NAME} database`)
      } catch (error) {
        throw new MongoDBConnectionError('💥Error when trying to connect to MongoDB\n' + error)
      }
    }
    return MongoDBClientSingleton._instance
  }
  public static async getCollection<T extends Document = Document>(collectionName: string): Promise<Collection<T>> {
    const client = await this.getInstance()
    return client.db(MongoDBClientSingleton.DATABASE_NAME).collection<T>(collectionName)
  }

  public static async disconnect(): Promise<void> {
    if (MongoDBClientSingleton._instance) {
      await MongoDBClientSingleton._instance.close()
      MongoDBClientSingleton._instance = null
      console.log('MongoDB disconnected successfully')
    }
  }
}

export default MongoDBClientSingleton
