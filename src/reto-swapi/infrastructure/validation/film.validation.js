const Joi = require('joi');

const PageFilterSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  size: Joi.number().integer().min(1).optional(),
});

const CreateFilmSchema = Joi.object({
  episode_id: Joi.number().integer().min(1).required(),
  title: Joi.string().trim().min(1).required(),
  opening_crawl: Joi.string().trim().min(1).required(),
  director: Joi.string().trim().min(1).required(),
  producer: Joi.string().trim().min(1).required(),
  release_date: Joi.string().trim().min(1).required(),
  characters: Joi.array().items(Joi.string().trim()).default([]),
  planets: Joi.array().items(Joi.string().trim()).default([]),
  starships: Joi.array().items(Joi.string().trim()).default([]),
  vehicles: Joi.array().items(Joi.string().trim()).default([]),
  species: Joi.array().items(Joi.string().trim()).default([]),
  created: Joi.string().trim().min(1).required(),
  edited: Joi.string().trim().min(1).required(),
  url: Joi.string().trim().min(1).required(),
});

module.exports = { CreateFilmSchema, PageFilterSchema };
