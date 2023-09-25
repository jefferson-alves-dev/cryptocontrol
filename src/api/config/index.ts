import dotenv from 'dotenv'

dotenv.config()

const CONFIG = {
  DB_URI: process.env.DB_URI || '',
  DB_CONNECTION_TIMEOUT_MS: Number(process.env.DB_CONNECTION_TIMEOUT_MS) || 5000,
  DB_NAME: process.env.DB_NAME || '',
  SALT_HASH: Number(process.env.SALT_HASH),
  HASH_PASS_SECRET: process.env.HASH_PASS_SECRET || '',
  PORT: process.env.PORT || 3000,
  TOKEN_SECRET: process.env.TOKEN_SECRET || '',
  TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION || '6h',
}

export default CONFIG
