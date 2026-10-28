import Joi from "joi";

export const PageFilterSchema = Joi.object({
    page: Joi.number().min(1).optional(),
    size: Joi.number().min(1).optional(),
})

export const CreateFilmSchema = Joi.object({
    episode_id: Joi.number().min(1).required(),
    title: Joi.string().trim().min(1).required(),
    opening_crawl: Joi.string().trim().min(1).required(),
    director: Joi.string().trim().min(1).required(),
    producer: Joi.string().trim().min(1).required(),
    release_date: Joi.string().trim().min(1).required(),
    characters: Joi.array().items(
        Joi.string().trim().optional()
    ),
    planets: Joi.array().items(
        Joi.string().trim().optional()
    ),
    starships: Joi.array().items(
        Joi.string().trim().optional()
    ),
    vehicles: Joi.array().items(
        Joi.string().trim().optional()
    ),
    species: Joi.array().items(
        Joi.string().trim().optional()
    ),
    created: Joi.string().trim().min(1).required(),
    edited: Joi.string().trim().min(1).required(),
    url: Joi.string().trim().min(1).required()
})