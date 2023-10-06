import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function main() {
  try {
    await mongoose.connect(config.DATABASE_URL as string)
    console.log('Database Connected')

    app.listen(config.PORT, () => {
      console.log(`Example app listening on port ${config.PORT}`)
    })
  } catch (err) {
    console.log(err)
  }
}

main()
