const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.string().required(),
    category: Joi.string().required(),
    countInStock: Joi.number().required(),
});

module.exports = productSchema;