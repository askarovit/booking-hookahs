import { ResponseEntity } from 'shared/model/responce';
import { pool } from 'connector';

// eslint-disable-next-line  @typescript-eslint/no-unused-vars
export const errorHandler = async (err, req, res, next): Promise<void> => {
  const errors = 'Server Error.';
  const { message, sqlMessage } = err.err;

  if (sqlMessage) {
    const sqlError = pool.messageError(err.err.code);

    return res
            .status(!!sqlError ? 400: 500)
            .json(new ResponseEntity({ errors: sqlError || sqlMessage }));
  } else {
    res
      .status(500)
      .json(new ResponseEntity({ errors: message || errors }));
  }
};