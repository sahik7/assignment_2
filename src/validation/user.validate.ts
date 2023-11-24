import Joi from "joi";


export const userJoiSchema = Joi.object({
    userId: Joi.number().required(),
    username: Joi.string().required().alphanum(),
    password: Joi.string().required(),
    fullName: Joi.object({
        firstName: Joi.string().required().regex(/^[a-zA-Z]+$/),
        lastName: Joi.string().required().regex(/^[a-zA-Z]+$/),
    }).required(),
    age: Joi.number().required(),
    email: Joi.string().required().email(),
    isActive: Joi.boolean().required().default(true),
    hobbies: Joi.array().items(Joi.string()),
    address: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
    }).required(),
    orders: Joi.array().items(
        Joi.object({
            productName: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
        })
    ),
});