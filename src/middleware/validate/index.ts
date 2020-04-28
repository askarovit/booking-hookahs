import { ResponseEntity } from 'shared/model/responce';
import * as schemas from './schemas';

enum METHOD_REQUEST {
    GET ='query',
    POST = 'body',
    PUT = 'body',
    PATCH = 'body'
}

export const validate = (schemaName: string): Function => {
    return function (target: any, propertyName: string, descriptor: PropertyDescriptor): Record<string, any> {
        const fn = descriptor.value;
        return {
            value: function(req, res, next): Function {
                const errors = validator(schemaName, req);
                if (errors) {
                    return res.status(400).json(new ResponseEntity({ errors }))
                }
                return fn.call(this, req, res, next)
            }
        };
    }
};

const validator = (name, req): Array<string> => {
    const { error } = schemas[name].validate(req[METHOD_REQUEST[req.method]], { abortEarly: false });
    if (!error) {
        return;
    }
    return error.details.map(err => err.message);
};