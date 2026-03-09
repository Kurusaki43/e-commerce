import { connectDatabase } from '@config/db'
import logger from '@config/logger'

import app from './app'

const PORT = 5000

app.listen(PORT, async () => {
  logger.info(`Server running on port ${PORT}`)
  await connectDatabase()
})
