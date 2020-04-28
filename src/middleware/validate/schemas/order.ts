import Joi from '@hapi/joi';

export const GET_LIST_CUSTOMERS = Joi.object({});

export const MAKE_ORDER = Joi.object({
  customer: Joi.string().min(1).max(45).required(),
  date: Joi.date().greater('now').iso().required(),
  amountPeople: Joi.number().min(1).max(99).required()
});

export const GET_FREE_HOOKAHS = Joi.object({
  from: Joi.date().iso().required(),
  to: Joi.date().iso().greater(Joi.ref('from')).required(),
  amountPeople: Joi.number().min(1).max(99).required()
});