/* eslint-disable no-underscore-dangle */
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

route.put('/', async (req, res) => {
  const item = {
    number: req.body.number,
    description: req.body.description,
    category: req.body.category,
    status: req.body.status,
  }
  const data = await GlutenAdditiveModel.findByIdAndUpdate(
    req.body._id,
    { $set: item },
    { new: true },
  )
  res
    .status(200)
    .json({ code: 200, message: 'Item Updated Successfully', data })
})

route.delete('/:id', async (req, res) => {
  const data = await GlutenAdditiveModel.findByIdAndRemove(req.params.id)
  res.status(200).json({ code: 200, message: 'Item deleted', deleteItem: data })
})

export default route
