import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorlogger, logger } from './shared/logger'

async function main() {
  try {
    await mongoose.connect(config.DATABASE_URL as string)
    logger.info('Database Connected')

    app.listen(config.PORT, () => {
      logger.info(`Example app listening on port ${config.PORT}`)
    })
  } catch (err) {
    errorlogger.error(err)
  }
}

main()
