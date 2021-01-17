/* eslint-disable import/no-extraneous-dependencies */
const MongoMemoryServer = require('mongodb-memory-server-core').default
const path = require('path')
const fs = require('fs')

const mongod = new MongoMemoryServer({autoStart: true})

module.exports = async config => {
  if (!mongod.runningInstance) await mongod.start()
  const mongoConfig = {
    uri: await mongod.getConnectionString(),
    logUri: await mongod.getConnectionString(),
  }
  const buildDir = path.join(config.rootDir, 'build')
  if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir)
  fs.writeFileSync(
    path.join(buildDir, 'mongo-config.json'),
    JSON.stringify(mongoConfig, null, 2)
  )
  global.__MONGOD__ = mongod
}
