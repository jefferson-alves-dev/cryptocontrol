import dotenv from 'dotenv'

dotenv.config()

const CONFIG = {
  DB_URI: process.env.DB_URI || '',
  SALT_HASH: process.env.SALT_HASH || '',
  HASH_PASS_SECRET: process.env.HASH_PASS_SECRET || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  PORT: process.env.PORT || 3000,
}

export default CONFIG
