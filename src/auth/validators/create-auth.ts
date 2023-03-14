import * as Joi from 'joi';

export const CreateAuthValidator = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});