import { ResponseEntity } from 'shared/model/responce';

// eslint-disable-next-line  @typescript-eslint/no-unused-vars
export const errorHandler = async (err, req, res, next): Promise<void> => {
  const { message, sqlMessage } = err.err;
  console.log(`Handler Error|  ${ message | sqlMessage }`);
  res
    .status(500)
    .json(new ResponseEntity({ errors: `Server Error.` }));
};