import express from 'express'

import mainRoute from './Routes/Index.js'
import jobsRoute from './Routes/Jobs.js'

const app = express()

app.use("/", mainRoute)
app.use("/jobs", jobsRoute)

export default app;