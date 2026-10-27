import Joi from "joi";

export const PageFilterSchema = Joi.object({
    page: Joi.number().min(1).optional(),
    size: Joi.number().min(1).optional(),
})