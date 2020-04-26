import Joi from '@hapi/joi';

export const GET_LIST_BAR = Joi.object({});

export const ADD_BAR = Joi.object({
  title: Joi.string().min(1).max(45).required()
});

export const REMOVE_BAR = Joi.object({
  title: Joi.string().min(1).max(45).required()
});
