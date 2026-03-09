import { cleanEnv, str, port } from 'envalid'
import dotenv from 'dotenv'

dotenv.config()

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
  PORT: port({ default: 5000 }),
  MONGO_URI: str(),
  LOG_LEVEL: str({ choices: ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'] }),
})

export default env
