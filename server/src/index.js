import 'dotenv/config'

import app from './App.js'

import database from './Config/Database.js'




(async () => {
       const db = new database(process.env.MONGO_URI)

    await db.connect()
    app.listen(3000, () => {
    console.log("Listening")
})
})();
