/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/first */
require('dotenv').config()

import express from 'express'
import glutenAdditiveRoute from './routes/glutenAdditiveRoute'

const app = express()

app.use('/glutenAdditive', glutenAdditiveRoute)

const port = process.env.PORT || 4000
app.listen(port, () => console.log('listening at ', port))
