import dotenv from 'dotenv'

dotenv.config()

const CONFIG = {
  DB_URI: process.env.DB_URI || '',
  DB_CONNECTION_TIMEOUT_MS: Number(process.env.DB_CONNECTION_TIMEOUT_MS) || 5000,
  DB_NAME: process.env.DB_NAME || '',
  SALT_HASH: Number(process.env.SALT_HASH) || '',
  HASH_PASS_SECRET: process.env.HASH_PASS_SECRET || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  PORT: process.env.PORT || 3000,
}

export default CONFIG
