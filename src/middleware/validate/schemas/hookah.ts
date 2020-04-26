import Joi from '@hapi/joi';

export const GET_LIST_HOOKAHS = Joi.object({});

export const ADD_HOOKAH = Joi.object({
  title: Joi.string().min(1).max(45).required(),
  amount_tube: Joi.number().min(1).max(99).required(),
  bar_id: Joi.number()
});

export const REMOVE_HOOKAH = Joi.object({
  title: Joi.string().min(1).max(45).required(),
  amount_tube: Joi.number().min(1).max(99).required()
});