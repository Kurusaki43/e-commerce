import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import hpp from 'hpp'
import { httpLogger } from '@middlewares/httpLogger'
import env from '@config/env'

const app = express()
app.set('trust proxy', 1)
/*
----------------
Security
----------------
*/

app.use(helmet())

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
)

/*
----------------
Rate limiting
----------------
*/

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: env.RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
  }),
)

/*
----------------
Body parsers
----------------
*/

app.use(express.json({ limit: '10kb' }))

app.use(express.urlencoded({ extended: true, limit: '10kb' }))

/*
----------------
Sanitization
----------------
*/

app.use(mongoSanitize())

app.use(hpp())

/*
----------------
Cookies
----------------
*/

app.use(cookieParser())

/*
----------------
Performance
----------------
*/

app.use(compression())

/*
----------------
Logging
----------------
*/

app.use(httpLogger)

/*
----------------
Health check
----------------
*/

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK' })
})

export default app
