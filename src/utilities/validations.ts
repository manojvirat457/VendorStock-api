import Joi from 'joi';

const updateStockAndPriceSchema = Joi.object({
    code: Joi.string().required(),
    size: Joi.string().required(),
    quantity: Joi.number().integer().min(0).required(),
    price: Joi.number().min(0).required(),
    name: Joi.string()
});

const addStockSchema = Joi.object({
    code: Joi.string().required(),
    sizes: Joi.array().items(Joi.string()).min(1).required()
});


export {
    updateStockAndPriceSchema,
    addStockSchema
}

