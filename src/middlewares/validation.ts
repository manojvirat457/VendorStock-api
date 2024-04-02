import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

function validateSchema(schema: Joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        next();
    };
}

export { validateSchema }