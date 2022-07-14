/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/first */
require('dotenv').config()

import express from 'express'
import cors from 'cors'
import glutenAdditiveRoute from './routes/glutenAdditiveRoute'

const app = express()
app.use(cors({ origin: true, credentials: true }))

app.use('/additive', glutenAdditiveRoute)

const port = process.env.PORT || 4000
app.listen(port, () => console.log('🚀 Running on port ', port))
