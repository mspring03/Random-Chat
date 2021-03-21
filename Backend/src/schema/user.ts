import Joi from '@hapi/joi';
import { JoiAuthBearer } from '../middleware/validator';

export default {
  userCredential: Joi.object().keys({
    id: Joi.string().required().min(6),
    password: Joi.string().required().min(6),
  }),
  guest: Joi.object().keys({
    nickname: Joi.string().required().min(2)
  }),
  auth: Joi.object()
  .keys({
    authorization: JoiAuthBearer().required(),
  })
  .unknown(true),
  signup: Joi.object().keys({
      id: Joi.string().required().min(4),
      password: Joi.string().required().min(6),
      nickname: Joi.string().required().min(2),
      description: Joi.string().allow(null).allow('').optional(),
      tag: Joi.string().allow(null).allow('').optional(),
  })
}