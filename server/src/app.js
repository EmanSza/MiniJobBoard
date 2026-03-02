import express from 'express'

import mainRoute from './routes/main.js'
const app = express()

app.use("/", mainRoute)

export default app;