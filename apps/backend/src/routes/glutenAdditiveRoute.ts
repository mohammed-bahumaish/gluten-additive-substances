import express from 'express'
import { GlutenAdditiveModel } from '../mongoModels'

const route = express.Router()
route.use(express.json())

route.get('/', async (_, res) => {
  const result = await GlutenAdditiveModel.find({})
  res.send(result)
})

route.post('/', async (req, res) => {
  const item = new GlutenAdditiveModel({
    number: req.body.number,
    description: req.body.description,
    category: req.body.category,
    status: req.body.status,
  })
  const data = await item.save()
  res.status(200).json({ code: 200, message: 'Item Added Successfully', data })
})

export default route
