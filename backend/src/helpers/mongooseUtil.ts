import mongoose, {Connection, ConnectionOptions} from 'mongoose'
import path from 'path'
import fs from 'fs'

export const rootdir = path.resolve(__dirname, '../..')

// get current in-memory-mongodb configuration for test
//for test
const getMongodUri = () => {
  return process.env.NODE_ENV === 'test'
    ? JSON.parse(fs.readFileSync(path.join(rootdir, 'build/mongo-config.json'), 'utf-8')).uri
    : `${process.env.MONGODB_SCHEMA}://\
${encodeURIComponent(process.env.MONGODB_USER!)}:${encodeURIComponent(process.env.MONGODB_PASS!)}\
@${process.env.MONGODB_HOST}\
${process.env.MONGODB_SCHEMA === 'mongodb+srv' ? '' : `:${process.env.MONGODB_PORT}`}\
/${process.env.MONGODB_OPTS || ''}`
}

let instanceConnection: Connection | undefined
export const mongooseConnect = () => {
    if (!instanceConnection) {
      try {
        const opt: ConnectionOptions = {
          useCreateIndex: true,
          useNewUrlParser: true,
          family: 4,
          useUnifiedTopology: true
        }
        mongoose.set('useCreateIndex', true)
        instanceConnection = mongoose.createConnection(getMongodUri(), opt).useDb(process.env.MONGODB_DB!)
      } catch (err) {
        console.error(err)
        instanceConnection = undefined
        throw err
      }
    }
    return instanceConnection
}

let closePromise: Promise<void> | undefined
export const mongooseDisconnect = () => {
  if (!closePromise) {
    try {
      closePromise = (async () => {
        await instanceConnection!.close()
        instanceConnection = undefined
      })()
    } catch (err) {
      console.error(err)
      closePromise = undefined
      throw err
    }
  }
  return closePromise
}

export const getMongooseConnection = () => {
    mongooseConnect()
    return instanceConnection!
}