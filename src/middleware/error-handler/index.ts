import { ResponseEntity } from 'shared/model/responce';

export const errorHandler = async (err, req, res, next) => {
  const { message, sqlMessage } = err.err;
  console.log(`Handler Error|  ${ message | sqlMessage }`);
  res
    .status(500)
    .json(new ResponseEntity({ errors: `Server Error.` }));
};