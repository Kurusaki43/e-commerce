import { httpLogger } from '@middlewares/httpLogger'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
const app = express()

app.use(helmet())

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)

app.use(express.json({ limit: '10kb' }))

app.use(express.urlencoded({ extended: true }))

app.use(httpLogger)

app.get('/health', (req, res) => {
  res.json({ status: 'OK' })
})

export default app
