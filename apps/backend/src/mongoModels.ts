/* eslint-disable no-console */
import mongoose from 'mongoose'

function throwExpression(errorMessage: string): never {
  throw new Error(errorMessage)
}

const url =
  process.env.mongodb ?? throwExpression('define mongodb environment variable')
if (url) mongoose.connect(url).catch(console.error)

const GlutenAdditiveSchema = new mongoose.Schema({
  number: String,
  description: String,
  category: String,
  status: String,
})

export const GlutenAdditiveModel =
  mongoose.models.GlutenAdditiveModel ||
  mongoose.model('GlutenAdditiveModel', GlutenAdditiveSchema)
