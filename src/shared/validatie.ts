import * as joi from 'joi'

export const PipeSchema = joi.object({
  id: joi.string().required(),
  name: joi.string().min(3).max(10).required()
})
