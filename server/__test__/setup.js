import { MongoMemoryServer } from 'mongodb-memory-server'
import database from '../src/Config/Database.js'

let mongod;
let db;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()
    db = new database(uri)
    await db.connect()
})

afterAll(async () => {
    await db.disconnect()
    await mongod.stop()
})