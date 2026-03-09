import { httpLogger } from '@middlewares/httpLogger'
import express from 'express'

const app = express()

app.use(express.json())
app.use(httpLogger)

app.get('/health', (req, res) => {
  res.json({ status: 'OK' })
})

export default app
