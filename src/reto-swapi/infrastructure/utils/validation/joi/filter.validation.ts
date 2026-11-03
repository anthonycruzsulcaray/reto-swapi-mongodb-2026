import Joi from "joi";

export const FilterFieldValidation: Joi.ObjectSchema = Joi.object({
    field: Joi.string().required(),
    value: Joi.alternatives()
        .try(
            Joi.string(),
            Joi.number(),
            Joi.array().items(
                Joi.alternatives().try(Joi.string(), Joi.number(), Joi.boolean()),
            ),
        )
        .required(),
    condition: Joi.string()
        .valid(
            "eq",
            "neq",
            "gt",
            "gte",
            "lt",
            "lte",
            "like",
            "between",
            "in",
            "nin",
            "findInSet",
            "exists",
        )
        .optional(),
});

export const SortFieldValidation: Joi.ObjectSchema = Joi.object({
    field: Joi.string().required(),
    order: Joi.string().valid("asc", "desc").required(),
});

export const FilterRequestValidation: Joi.ObjectSchema = Joi.object({
    filters: Joi.array().items(FilterFieldValidation).optional(),
    sorts: Joi.array().items(SortFieldValidation).optional(),
    groupBy: Joi.array().items(Joi.string()).optional(),
    page: Joi.number().integer().min(1).optional(),
    size: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).optional(),
    fields: Joi.array().items(Joi.string()).optional(),
});
