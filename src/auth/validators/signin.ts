import * as Joi from 'joi';

export const SignInValidator = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});