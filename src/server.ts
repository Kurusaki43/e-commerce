import { connectDatabase } from '@config/db'
import app from './app'

const PORT = 5000

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
  await connectDatabase()
})
