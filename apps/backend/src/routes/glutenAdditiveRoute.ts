import express from 'express'
import { GlutenAdditiveModel } from '../mongoModels'

const route = express.Router()
route.use(express.json())

route.get('/api/data', async (req, res) => {
  const result = await GlutenAdditiveModel.find({})
  res.send(result)
})

export default route
