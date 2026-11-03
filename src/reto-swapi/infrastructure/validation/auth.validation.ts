import Joi from 'joi';

const email = Joi.string().trim().email().max(254).required();
const password = Joi.string().min(8).max(72).required();

export const RegisterValidation = Joi.object({
    name: Joi.string().trim().min(1).max(100).required(),
    email,
    password,
}).required();

export const LoginValidation = Joi.object({
    email,
    password,
}).required();
