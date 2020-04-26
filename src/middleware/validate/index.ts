import { ResponseEntity } from 'shared/model/responce';
import * as schemas from './schemas';

enum METHOD_REQUEST {
    GET ='query',
    POST = 'body',
    PUT = 'body',
    PATCH = 'body'
}

export const validate = (schemaName: string): any => {
    return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
        let fn = descriptor.value;
        return {
            value: function(req, res) {
                const errors = validator(schemaName, req);
                if (errors) {
                    return res.status(400).json(new ResponseEntity({ errors }))
                }
                return fn.call(this, req, res)
            }
        };
    }
};

const validator = (name, req) => {
    const { error } = schemas[name].validate(req[METHOD_REQUEST[req.method]], { abortEarly: false });
    if (!error) {
        return ;
    }
    return error.details.map(err => err.message);
};