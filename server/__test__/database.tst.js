// Leaving this here for now, incase we need to test database functions.
import database from '../src/Config/Database.js'

describe("Database", () => {
    test("should throw on invalid URI", async () => {
        const db = new database("mongodb://invalid:12345/test")
        await expect(db.connect()).rejects.toThrow()
    })

    test("should connect and disconnect successfully", async () => {
        // Already covered by setup.js but can be explicit
        const { MongoMemoryServer } = await import('mongodb-memory-server')
        const mongod = await MongoMemoryServer.create()
        const db = new database(mongod.getUri())
        
        await expect(db.connect()).resolves.not.toThrow()
        await db.disconnect()
        await mongod.stop()
    })
})