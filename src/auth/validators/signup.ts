import * as Joi from 'joi';

export const SignUpValidator = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});